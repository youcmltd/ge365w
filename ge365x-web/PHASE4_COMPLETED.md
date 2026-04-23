# Phase 4 実ロジック移植 — 実装完了項目

前回「雛形＋TODO」だった以下ファイルを、**動作するロジック付き**で実装済み。

## 新規追加ファイル

### `src/lib/openai.ts`
- `openaiChat(apiKey, messages, opts)` — /v1/chat/completions の fetch 実装
- `geminiChat(apiKey, messages, opts)` — Gemini 互換の切替 layer
- `buildSystemPrompt({voice, profile, autopilot})` — Voice/Profile/Autopilot から system prompt を合成
- `generateAutopilotTweet({apiKey, system, topic})` — Autopilot 用の 1 件生成

### `src/lib/x-api.ts`
- `postTweet(accessToken, {text, reply_to_id, quote_tweet_id, media_ids})` — POST /2/tweets
- `deleteTweet`, `getMe`
- `buildAuthorizeUrl`, `exchangeCodeForToken`, `refreshAccessToken` — OAuth2.0 PKCE
- `generatePKCE()` — Web Crypto で challenge/verifier
- `computeJitterSec(mode, min, max)` — uniform/gaussian/human のジッター計算

### `src/routes/x-oauth.ts` （新規）
- `GET /api/auth/x/start` — ログイン済ユーザーを X 認可画面へ（PKCE+state を暗号化 Cookie に保存）
- `GET /api/auth/x/callback` — code → access_token 交換、`x_accounts` に暗号化保存
- `getValidAccessTokenForAccount(c, accountId)` — 自動リフレッシュ付きのトークン取得

## 置き換え（雛形 → 実装）

### `src/routes/x-posts.ts`
- `POST /api/x/tweet` — 暗号化トークン復号 → X API 送信 → post_logs 記録 → KPI upsert
- `POST /cron/tick` — pending キュー最大 5 件を acquire ロックしつつ消化
  - 成功: status=sent, tweet_id 記録, KPI +1
  - 失敗: attempts++, 3回で failed、それ未満は pending のまま

### `src/routes/autopilot.ts`
- `POST /api/autopilot/run-now` — Voice/Profile/topics から 1 件生成して post_queue に INSERT
- `POST /cron/autopilot-tick` — 全ユーザー分の Autopilot を 20 件まで回す
  - active_hours 外は skip、daily_post_count 超過は skip
  - 成功で next_run_at をジッター付きで更新

### `src/routes/chatbot.ts`
- `POST /api/chatbot` — OpenAI または Gemini を切替可能に。Voice/Profile を system prompt へ
- `POST /api/chatbot/generate-post` — 3案一括生成 → proposals を配列で返す
- セッション履歴の CRUD 完備

## 変更

### `src/index.tsx`
- Workers `export default` に `fetch` と `scheduled` を統合
- `scheduled(event, env, ctx)` で cron 値を判定して `/cron/tick` と `/cron/autopilot-tick` を内部 fetch

### `wrangler.jsonc`
- `triggers.crons` を 2 つ追加:
  - `*/1 * * * *` → 投稿キュー消化
  - `*/5 * * * *` → Autopilot 次ターン生成

## 動作フロー（エンドツーエンド）

```
[ユーザー]
  ├── /login でログイン
  ├── /dashboard → Xアカウントタブ → 「Xと連携」
  │     ├── GET /api/auth/x/start
  │     │     └── PKCE verifier/challenge 生成 → 暗号化 Cookie
  │     │     └── twitter.com/i/oauth2/authorize へ 302
  │     ├── X 側で承認
  │     └── GET /api/auth/x/callback
  │           ├── Cookie の state 照合
  │           ├── code → access_token 交換
  │           ├── getMe で username / user_id 取得
  │           └── x_accounts に AES-GCM 暗号化保存
  │
  ├── /dashboard → 新規投稿タブ → POST /api/posts
  │     └── post_queue に pending で INSERT
  │
  └── Cloudflare Cron (*/1 * * * *)
        └── scheduled → fetch /cron/tick
              ├── pending キューを 5 件 fetch
              ├── getValidAccessTokenForAccount (自動リフレッシュ)
              ├── postTweet() で X API 送信
              └── 結果を post_queue / post_logs / kpi_metrics に反映

[Autopilot]
  └── Cloudflare Cron (*/5 * * * *)
        └── scheduled → fetch /cron/autopilot-tick
              ├── is_enabled=1 かつ next_run_at 到来分を最大20件
              ├── Voice/Profile/topics で OpenAI chat completions
              ├── 生成テキストを 280 字トリム
              └── scheduled_at を jitter で未来に設定して post_queue へ
                  → 上記の /cron/tick で後ほど送信される
```

## 既存仕様との差分（補完が必要な場合の確認リスト）

- [ ] 現行 `shared/openai.js` のプロンプト構造と `lib/openai.ts` の `buildSystemPrompt` を比較
- [ ] 現行 `shared/x-api.js` のレート制限/エラーハンドリングで独自ロジックがあれば `lib/x-api.ts` に反映
- [ ] 現行 `web/routes/autopilot.js` の active_hours/jitter の扱いが想定通りか照合
- [ ] 現行の `DELIVERABLES.md` に記載されている仕様で漏れているものの確認

## 残課題（優先度順）

### 優先度 S
1. **初期管理者セットアップ用 `/setup` エンドポイント** — `ADMIN_PASSWORD` secret で初回のみパスワード設定可能に（今は SQL で昇格が必要）
2. **ダッシュボードの KPI タブを実データで描画** — 現状は固定値

### 優先度 A
3. **Stripe / PayPal Webhook の署名検証** — `subscription-api.ts` の TODO
4. **スレッド（連投）の送信ロジック** — `threads-x.ts` の `reply_to_id` 伝播
5. **メディアアップロード** — R2 バインディング追加と X media/upload v1.1 連携

### 優先度 B
6. **`admin.ts` の「投稿管理」タブに post_queue 編集機能**
7. **Telegram 通知** — 送信失敗時に `/cron/tick` から webhook 叩く
8. **競合トラッキング** — `competitors` テーブルの UI

## ファイル構成（最終）

```
ge365x-web/
├── wrangler.jsonc       (Cron Triggers 追加)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── seed.sql
├── DEPLOY.md
├── PHASE4_COMPLETED.md  ← 本ドキュメント
├── README.md
├── migrations/
│   ├── 0001_initial.sql
│   ├── 0002_features.sql
│   ├── 0010_subscriptions.sql
│   ├── 0011_trial_policy.sql
│   └── 0012_licenses.sql
├── public/static/style.css
└── src/
    ├── index.tsx                (fetch + scheduled)
    ├── lib/
    │   ├── auth.ts
    │   ├── html.ts
    │   ├── openai.ts            ★ Phase 4
    │   ├── types.ts
    │   ├── utils.ts
    │   └── x-api.ts             ★ Phase 4
    ├── pages/
    │   ├── admin.ts
    │   ├── dashboard.ts
    │   └── login.ts
    └── routes/
        ├── accounts.ts
        ├── auth-api.ts
        ├── autopilot.ts         ★ Phase 4 実装済
        ├── chatbot.ts           ★ Phase 4 実装済
        ├── drafts.ts
        ├── kpi.ts
        ├── logs.ts
        ├── media.ts
        ├── posts.ts
        ├── profiles.ts
        ├── settings.ts
        ├── subscription-api.ts
        ├── target.ts
        ├── threads-x.ts
        ├── voice.ts
        ├── x-oauth.ts           ★ Phase 4 新規
        └── x-posts.ts           ★ Phase 4 実装済
```
