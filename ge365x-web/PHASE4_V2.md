# Phase 4 v2 — 現行 GE365x ソース完全照合版

TAKA さんから提供された 6 ファイル（openai.js / x-api.js / autopilot.js / chatbot.js / posts.js / DELIVERABLES.md）を精査し、**v1 で推測実装していた箇所を現行挙動に合わせて全面書き換え**しました。

## 重大な修正点

| 項目 | v1 (推測) | v2 (現行準拠) |
|---|---|---|
| **X API 認証** | OAuth 2.0 PKCE + リフレッシュトークン | **OAuth 1.0a User Context (HMAC-SHA1)** |
| **X API Base** | `api.twitter.com/2` | **`api.x.com/2`** |
| **Upload API** | v2 media | **`upload.x.com/1.1/media/upload.json` (INIT/APPEND/FINALIZE)** |
| **Chatbot** | OpenAI /v1/chat/completions | **ローカル JSON ナレッジベース + キーワードマッチ** |
| **Autopilot** | `autopilot_settings` (ユーザー設定) | **`autopilot_jobs` (1ジョブ=1予約投稿)** |
| **post_queue カラム名** | `content`, `x_account_id` | **`body`, `account_id`, `link_url`, `hashtags`, `post_mode`, `thread_parent_id`, `media_json`** |
| **投稿制御** | attempts で 3 回リトライ | **類似度 Jaccard 0.7 / 最低15分 / 日次上限 / リンク3回 / ハッシュタグ80%連続** |
| **健全性スコア** | 無し | **`account_health_score` 100点満点 / risk 30-59 / caution 60-79** |
| **ジッター** | uniform/gaussian/human 時間計算のみ | **resolveScheduleTime + 衝突回避 + min_spacing_seconds + audit ログ** |
| **スレッド** | `threads`/`thread_items` 別テーブル | **`post_queue` の thread_parent_id/thread_order/thread_count に統合** |

## ファイル一覧（v2）

### 新規・大改定
```
src/lib/openai.ts           ★ 全面書き換え (PATTERN_PROMPTS 5種 / TARGET 28種 / VOICE 5種 / NG語チェック / normalizePostText)
src/lib/x-api.ts            ★ 全面書き換え (OAuth 1.0a HMAC-SHA1 / api.x.com / uploadImage / uploadVideo)
src/lib/safety-control.ts   ★ 新規 (prePostCheck / contentHash / acquirePostLock / Jaccard bigram)
src/lib/jitter-service.ts   ★ 新規 (resolveScheduleTime / saveScheduleAudit)
src/lib/similarity-guard.ts ★ 新規 (checkUniqueness / createFingerprint)
src/lib/types.ts            ★ 全行数書き換え (現行スキーマに準拠)

src/routes/posts.ts         ★ 全面書き換え (/api/admin/posts 系 12 エンドポイント、現行 posts.js 完全準拠)
src/routes/autopilot.ts     ★ 全面書き換え (autopilot_jobs CRUD + /cron/autopilot-tick)
src/routes/chatbot.ts       ★ 全面書き換え (KB JSON + キーワードマッチ)
src/routes/x-posts.ts       ★ 書き直し (/cron/tick で OAuth1 経由送信、safety prePostCheck 統合)
src/routes/accounts.ts      ★ 書き直し (OAuth1 Access Token 手動登録 + /test で getMe 検証)

src/routes/drafts.ts        差し替え (body/link_url/hashtags/post_mode カラム)
src/routes/target.ts        差し替え (target_templates 直結 + TARGET_TEMPLATES プリセット)
src/routes/voice.ts         差し替え (brand_voice 直結 + VOICE_TEMPLATES プリセット)
src/routes/kpi.ts           差し替え (kpi_metrics: account_id + metric_date)
src/routes/logs.ts          差し替え (post_logs / generation_logs / account_health_events)
src/routes/media.ts         差し替え (R2 アップロード/配信)
```

### 削除
```
src/routes/x-oauth.ts       削除: OAuth 1.0a なのでリダイレクトフロー不要
src/routes/profiles.ts      削除: 現行に相当テーブルなし（target_templates / brand_voice に統合）
src/routes/settings.ts      削除: 個人設定は voice/target に集約
src/routes/threads-x.ts     削除: スレッドは post_queue 内の thread_* カラムで管理（posts.ts に統合済）
```

### マイグレーション (v2)
```
migrations/0001_initial.sql      ★ 全書き換え:
  users / sessions / auth_logs / system_settings (AxisVault流用)
  x_accounts (access_token, access_token_secret, account_health_score, is_current 等)
  post_queue (body, link_url, hashtags, post_mode, thread_parent_id, media_json, jitter_* 等)
  post_logs
  autopilot_jobs (reservation_no, content_mode, generate_at, publish_at 等)
  target_templates (28種テンプレの保存先)
  brand_voice (5種テンプレの保存先)
  media_assets
  generation_logs
  post_fingerprints / post_locks / schedule_audits
  x_api_settings / account_health_events

migrations/0002_features.sql     ★ 差し替え:
  post_templates / competitors / x_rate_limits / drafts / chatbot_kb / kpi_metrics
```

## 認証フロー (OAuth 1.0a)

現行 GE365x は**ブラウザリダイレクト不要**です：

1. ユーザーが X Developer Portal でアプリ登録
2. Consumer Key / Consumer Secret はアプリ共通 → `wrangler secret put X_API_KEY / X_API_SECRET`
3. Access Token / Access Token Secret をユーザー毎に取得（PIN フロー or Developer Portal の Authenticate as User）
4. Web 画面の [アカウント管理 → 新規追加] で 4 値を入力
5. サーバー側で `aesEncrypt` して `x_accounts.access_token` / `.access_token_secret` に保存
6. `POST /api/admin/accounts/:id/test` で `getMe()` 呼び出し → 成功で `x_user_id` / `x_username` 反映

これで OAuth コールバック URL の設定や PKCE フローが一切不要になります。

## 投稿フロー

### 手動投稿
```
[ユーザー] /dashboard → 新規投稿
  ↓ POST /api/admin/posts (body + account_id)
[DB] post_queue に pending
  ↓ POST /api/admin/posts/:id/post-now
  ├── prePostCheck (日次上限/15分/類似度/リンク/ハッシュタグ/health_status)
  ├── acquirePostLock (2分)
  ├── buildCredentialsFromAccount (aesDecrypt access_token)
  ├── normalizePostText (Markdown除去 + formatForXDisplay)
  ├── postToX (OAuth 1.0a HMAC-SHA1)
  ├── status='posted', external_post_id, x_accounts.daily_post_count++
  ├── post_logs に記録
  ├── sendTelegram
  └── releasePostLock
```

### 予約投稿
```
[ユーザー] → POST /api/admin/posts/:id/schedule
  ├── checkUniqueness (類似度 Jaccard 0.7)
  ├── resolveScheduleTime (jitter ±5分 + 衝突回避 min_spacing_seconds)
  ├── saveFingerprint
  ├── post_queue.status='approved', effective_scheduled_at=...
  └── saveScheduleAudit
  ↓
[Cron */1 * * * *] → POST /cron/tick
  ├── status IN ('pending','approved') AND effective_scheduled_at <= NOW を最大5件
  ├── 楽観ロック (status='publishing')
  ├── 各件について prePostCheck → postToX
  ├── 成功: status='posted', kpi_metrics.posts_sent++
  └── 失敗: status='failed', adjustHealthScore, kpi_metrics.posts_failed++
```

### Autopilot
```
[ユーザー] → POST /api/admin/autopilot/jobs
  └── autopilot_jobs に status='configured', generate_at (=publish_at - 2分)
  ↓
[Cron */5 * * * *] → POST /cron/autopilot-tick
  ├── generate_at <= NOW かつ status='configured' を最大5件
  ├── target_templates / brand_voice を取得
  ├── generatePatternPost or generateXPost (OpenAI)
  ├── post_queue に INSERT (source_type='autopilot', scheduled_at=publish_at)
  └── autopilot_jobs.status='generated', generated_post_id=...
  ↓
[Cron */1 * * * *] → /cron/tick (上記の予約投稿と同じ経路で送信)
```

## 安全制御（現行 DELIVERABLES.md §5 の仕様完全実装）

| 項目 | 閾値 | 実装 |
|---|---|---|
| 最低投稿間隔 | 15分 | `prePostCheck` で `too_frequent` (overridable) |
| 類似度 | Jaccard 0.7 | `checkUniqueness` + `prePostCheck` |
| 日次上限 | 5件/日 (設定可) | `prePostCheck` で `daily_limit_reached` |
| 同時投稿禁止 | 2分ロック | `acquirePostLock` (D1 `post_locks`) |
| 予約ジッター | ±5分 | `resolveScheduleTime` |
| 衝突回避 | min 90秒 | 同上 |
| リンク連投 | 同一3回/7日 | `prePostCheck` で `link_spam` |
| ハッシュタグ連投 | 80%一致×3連続 | `prePostCheck` で `hashtag_spam` |
| 健全性スコア | 100点満点 | `adjustHealthScore`: error -5, rate_limit -15 |
| risk (30-59) | 自動停止 | `prePostCheck` で `health_risk` |

## 未実装・次チャット以降

- [ ] `shared/config.js` の OPENAI_BASE_URL 等を env から読む統一ラッパ
- [ ] 画面 (pages/dashboard.ts / admin.ts) を新 API エンドポイントパス (`/api/admin/...`) に合わせる
- [ ] media_assets から X API media/upload への実連携（`post-now` 側の TODO）
- [ ] ダッシュボードの「サイドバー account 切替」(`is_current` フラグ操作)
- [ ] recurring 投稿の次回生成ロジック
- [ ] recycle（過去投稿からの再生成）

## デプロイ前の注意

1. **v1 のマイグレーションをローカルに適用済の場合は D1 を作り直す** (`wrangler d1 delete` → 再作成)
   - v2 はテーブル定義が大幅に変わっており、互換性無し
2. `.env` / Secrets の **X_API_KEY / X_API_SECRET は Consumer Key/Secret**（アプリ共通）
   - Access Token / Secret はユーザーがアカウント毎に画面から入力
3. `ENCRYPTION_KEY` を先に設定しないとアカウント登録時に暗号化失敗
4. 既存 v1 のコードが残っている場合は **一旦 `ge365x-web/` を空にしてから** 展開推奨
