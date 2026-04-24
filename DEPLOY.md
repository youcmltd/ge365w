# ge365x-web デプロイ手順（Cloudflare Pages）

**プロジェクト名**: `ge365w`
**本番URL**: https://ge365w.pages.dev
**GitHub**: https://github.com/youcmltd/ge365w

---

## 0. 前提
- Cloudflare アカウント: `Youcm.ltd@gmail.com`
- ローカル: Node.js 20 以降、npm、git
- `wrangler` CLI は devDependency として入るので個別インストール不要
- D1: `ge365x-web-production` (44b03d54-c23e-4258-a4f9-00ce397594b6) マイグレーション5本適用済み
- Secrets: `JWT_SECRET`, `ENCRYPTION_KEY` 投入済み

---

## 1. ローカルセットアップ（ダウンロード後）

```bash
# ZIPを展開した場合
cd ge365x-web
npm install

# GitHubから取得する場合
git clone https://github.com/youcmltd/ge365w.git
cd ge365w/ge365x-web
npm install
```

---

## 2. D1 データベース作成

```bash
cd ~/projects/ge365x-web
npm install

# D1 を作る（本番用）
npx wrangler d1 create ge365x-web-production
# => 出力の database_id をコピー
```

出力例：
```
✅ Successfully created DB 'ge365x-web-production'
[[d1_databases]]
binding = "DB"
database_name = "ge365x-web-production"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

この `database_id` を **`wrangler.jsonc` の `d1_databases[0].database_id`** に貼り付けて commit。

---

## 3. マイグレーション投入

```bash
# ローカル検証用
npm run db:migrate:local
npm run db:seed

# 本番
npm run db:migrate:prod
# 本番に seed は流さない（デフォルトライセンスが漏れるので NG）
```

---

## 4. Secrets の投入（本番）

```bash
# 必須
npx wrangler secret put JWT_SECRET          # 任意のランダム64文字
npx wrangler secret put ENCRYPTION_KEY      # AES-GCM 用 32バイト相当のランダム文字列

# 運用で必要になったら
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put OPENAI_MODEL        # 例: gpt-4o-mini （vars でも可）
npx wrangler secret put X_API_KEY
npx wrangler secret put X_API_SECRET
npx wrangler secret put X_BEARER_TOKEN
npx wrangler secret put X_CLIENT_ID
npx wrangler secret put X_CLIENT_SECRET

# 決済連携する場合
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_SECRET

# 通知する場合
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

**`JWT_SECRET` と `ENCRYPTION_KEY` の生成例**:
```bash
# Linux/Mac
openssl rand -base64 48
# Node (クロスプラットフォーム)
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

---

## 5. デプロイ

```bash
npm run deploy
# => 内部的に:
#    vite build -> dist/ 生成
#    wrangler pages deploy dist
```

プロジェクト名は `ge365w` で設定済み。

成功すると、以下の URL で公開される:
```
https://ge365w.pages.dev
```

### 重要: エクスポート機能が404の場合
最新コードをデプロイするには:
```bash
cd ge365x-web
npm run deploy
```
これにより一括ダウンロード・API設定等の新機能が有効になります。

---

## 6. 初回管理者の作成

`seed.sql` の管理者は placeholder ハッシュなのでログイン不可。以下どちらかで初期化：

### 方法A: SQL で直接昇格
1. `/login` でメアド `you@example.com` / 任意パスワードで新規登録
2. D1 コンソールで昇格:
```bash
npx wrangler d1 execute ge365x-web-production --remote --command \
  "UPDATE users SET is_admin=1, is_approved=1 WHERE email='you@example.com'"

# subscription も Pro に昇格（任意）
npx wrangler d1 execute ge365x-web-production --remote --command \
  "UPDATE user_subscriptions SET plan_code='ge365x_pro', status='active', current_period_end='2099-12-31' WHERE user_id=(SELECT id FROM users WHERE email='you@example.com')"
```

### 方法B: ライセンスキーで昇格（sub は動くが admin フラグは付かない）
事前に `/admin` が使えないので、方法A を推奨。

---

## 7. カスタムドメイン（任意）

Cloudflare ダッシュボード → ge365x-web → Custom domains → Set up a custom domain
→ `ge365x.example.com` など

DNS は同じアカウント配下なら自動で通る。

---

## 8. Cron Triggers（投稿自動送信用）

`wrangler.jsonc` に以下を追加（将来 `x-posts.ts` の `/cron/tick` を完成させた後）:

```jsonc
"triggers": {
  "crons": ["*/1 * * * *"]   // 毎分
}
```

そして `src/index.tsx` にフックを追加:

```typescript
export default {
  async fetch(req, env, ctx) { return app.fetch(req, env, ctx) },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(fetch('https://ge365x-web.pages.dev/cron/tick', {method:'POST'}))
  }
}
```

---

## 9. 動作確認チェックリスト

- [ ] `https://ge365x-web.pages.dev/healthz` が `{ok:true,...}` を返す
- [ ] `/login` の3タブ（ログイン/新規登録/ライセンス）が表示される
- [ ] 新規登録 → D1 に users 行が入る
- [ ] 管理者昇格 → `/admin` で 7タブが表示される
- [ ] `/admin` のライセンスタブで「新規発行」が動く（`VPS-GE365X-XXXXXXXX` 形式）
- [ ] 発行したキーで `/login?tab=license` からアクティベート成功
- [ ] アクティベート後、`user_subscriptions` が対応プランで active になる

---

## 10. トラブルシューティング

| 症状 | 対処 |
|---|---|
| `D1_ERROR: no such table` | `npm run db:migrate:prod` を打ち忘れ |
| `unauthenticated` ループ | `JWT_SECRET` 未設定 |
| ライセンス認証で `license_already_used` | 別のユーザーが既に使っている。 `/admin` で `user_id` を NULL に戻せば再利用可能 |
| `subscription_required` 402 | sub.status が trial/active 以外。 `/admin` で手動変更 |
| CORS エラー | 同一オリジンで動くので通常発生しない。発生時は `hono/cors` middleware を追加 |

---

## 11. 全エンドポイント一覧（97件）

### ページルート (15)
| メソッド | パス | 説明 |
|---|---|---|
| GET | `/healthz` | ヘルスチェック |
| GET | `/login` | ログイン/登録画面 |
| GET | `/dashboard` | ダッシュボード（概要） |
| GET | `/dashboard/target` | ターゲット設定 |
| GET | `/dashboard/voice` | ブランドボイス |
| GET | `/dashboard/pattern` | パターンAI生成 |
| GET | `/dashboard/generate` | AI生成 |
| GET | `/dashboard/posts` | 投稿管理 |
| GET | `/dashboard/thread` | スレッド返信 |
| GET | `/dashboard/scheduled` | 予約投稿 |
| GET | `/dashboard/autopilot` | オートパイロット |
| GET | `/dashboard/accounts` | アカウント管理 |
| GET | `/dashboard/api` | API設定 |
| GET | `/dashboard/export` | 一括ダウンロード |
| GET | `/admin` | 管理者画面 |

### 認証API (6)
| メソッド | パス | 説明 |
|---|---|---|
| POST | `/api/auth/register` | 新規登録 |
| POST | `/api/auth/login` | ログイン |
| POST | `/api/auth/logout` | ログアウト |
| GET | `/api/auth/me` | 現在のユーザー情報 |
| POST | `/api/auth/license/activate` | ライセンス認証 |
| POST | `/api/auth/password/change` | パスワード変更 |

### エクスポートAPI (15)
| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/admin/export/posts` | 投稿キュー CSV |
| GET | `/api/admin/export/logs` | 投稿ログ CSV |
| GET | `/api/admin/export/generations` | AI生成ログ CSV |
| GET | `/api/admin/export/autopilot` | オートパイロット CSV |
| GET | `/api/admin/export/drafts` | 下書き CSV |
| GET | `/api/admin/export/kpi` | KPI CSV |
| GET | `/api/admin/export/accounts` | Xアカウント CSV |
| GET | `/api/admin/export/targets` | ターゲット CSV |
| GET | `/api/admin/export/voices` | ブランドボイス CSV |
| GET | `/api/admin/export/all` | 全データ JSON |
| GET | `/api/admin/export/admin/users` | 管理者:ユーザー CSV |
| GET | `/api/admin/export/admin/licenses` | 管理者:ライセンス CSV |
| GET | `/api/admin/export/admin/subs` | 管理者:サブスク CSV |
| GET | `/api/admin/export/admin/audit` | 管理者:監査ログ CSV |
| GET | `/api/admin/export/admin/all` | 管理者:全データ JSON |

### ソースファイル構成 (31ファイル, 7,065行)
```
src/index.tsx                    (104行) エントリポイント
src/lib/auth.ts                  (100行) 認証ミドルウェア
src/lib/html.ts                  ( 83行) 共通HTML/ブランド
src/lib/jitter-service.ts        (141行) 投稿時間ジッター
src/lib/openai.ts                (374行) OpenAI連携
src/lib/plan-gate.ts             ( 57行) プラン別機能ゲート
src/lib/safety-control.ts        (242行) 安全制御
src/lib/similarity-guard.ts      ( 64行) 類似投稿チェック
src/lib/types.ts                 (200行) 型定義
src/lib/utils.ts                 (209行) ユーティリティ
src/lib/x-api.ts                 (379行) X(Twitter) API
src/pages/admin.ts               (681行) 管理者画面
src/pages/dashboard-tabs.ts     (1108行) ダッシュボード全タブ
src/pages/dashboard.ts           (266行) ダッシュボードルーティング
src/pages/login.ts               (210行) ログイン画面
src/pages/shell.ts               (178行) 共通レイアウト
src/routes/accounts.ts           (140行) アカウント管理API
src/routes/api-settings.ts       (166行) API設定API
src/routes/auth-api.ts           (243行) 認証API
src/routes/autopilot.ts          (234行) オートパイロットAPI
src/routes/chatbot.ts            (126行) チャットボットAPI
src/routes/drafts.ts             ( 64行) 下書きAPI
src/routes/export.ts             (491行) エクスポートAPI
src/routes/kpi.ts                ( 47行) KPI API
src/routes/logs.ts               ( 54行) ログAPI
src/routes/media.ts              ( 73行) メディアAPI
src/routes/posts.ts              (610行) 投稿API
src/routes/subscription-api.ts   (103行) サブスクAPI
src/routes/target.ts             ( 73行) ターゲットAPI
src/routes/voice.ts              ( 66行) ブランドボイスAPI
src/routes/x-posts.ts            (179行) X投稿Cron処理
```
