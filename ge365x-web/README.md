# ge365x-web

GE365x（X/Twitter 自動投稿）を Cloudflare Workers + Hono + D1 に移植した Web 版。

## 技術スタック
- **Runtime**: Cloudflare Pages / Workers
- **Framework**: [Hono](https://hono.dev/) 4.x
- **DB**: Cloudflare D1 (SQLite 互換)
- **Build**: Vite + `@hono/vite-build`
- **CI/CD**: Wrangler

## ディレクトリ
```
ge365x-web/
├── wrangler.jsonc            # Cloudflare 設定（要: D1 ID を実値に）
├── package.json
├── vite.config.ts
├── tsconfig.json
├── seed.sql                  # 開発用シード
├── migrations/               # D1 マイグレーション
│   ├── 0001_initial.sql      # users + GE365x 本体
│   ├── 0002_features.sql     # テンプレ/スレッド/レート制限
│   ├── 0010_subscriptions.sql# サブスク (AxisVault流用)
│   ├── 0011_trial_policy.sql # トライアル方針 (AxisVault流用)
│   └── 0012_licenses.sql     # ライセンス (WalletManager流用)
├── public/static/style.css
└── src/
    ├── index.tsx             # Hono エントリ・ルート結合
    ├── lib/
    │   ├── auth.ts           # JWT 認証ミドルウェア
    │   ├── html.ts           # ブランド + layout()
    │   ├── types.ts          # AppEnv
    │   └── utils.ts          # PBKDF2 / AES-GCM / JWT / ライセンス生成
    ├── pages/
    │   ├── login.ts          # Login + Register + ライセンスタブ
    │   ├── dashboard.ts      # ユーザーダッシュボード (9タブ)
    │   └── admin.ts          # 管理画面 (7タブ)
    └── routes/
        ├── auth-api.ts       # /api/auth/*
        ├── subscription-api.ts
        ├── accounts.ts       # X アカウント CRUD
        ├── posts.ts          # 投稿キュー CRUD
        ├── x-posts.ts        # X API v2 実送信（cron tick）
        ├── drafts.ts
        ├── profiles.ts       # キャラクター/system prompt
        ├── chatbot.ts        # OpenAI /v1/chat/completions
        ├── media.ts
        ├── autopilot.ts
        ├── settings.ts       # jitter 等の個人設定
        ├── kpi.ts
        ├── logs.ts
        ├── target.ts
        ├── voice.ts          # 文体
        └── threads-x.ts      # 連投スレッド
```

## セットアップ

```bash
cd ge365x-web
npm install

# D1 DB を Cloudflare に作成（初回のみ）
npx wrangler d1 create ge365x-web-production
# => 出力された database_id を wrangler.jsonc に貼る

# Secrets を設定（本番）
npx wrangler secret put JWT_SECRET
npx wrangler secret put ENCRYPTION_KEY        # AES-GCM 32バイト相当（ランダム文字列32文字）
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put X_API_KEY
npx wrangler secret put X_API_SECRET
npx wrangler secret put X_BEARER_TOKEN
npx wrangler secret put X_CLIENT_ID           # OAuth2.0
npx wrangler secret put X_CLIENT_SECRET
# 任意:
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_SECRET
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put GEMINI_API_KEY

# マイグレーション
npm run db:migrate:local       # ローカル dev 用
npm run db:seed                # 開発用シード

# 開発
npm run dev                    # Vite dev server
# または
npm run dev:sandbox            # wrangler pages dev で実行

# 本番デプロイ
npm run db:migrate:prod
npm run deploy
```

## 初期管理者の作成

`seed.sql` の placeholder ハッシュは無効値なのでそのままではログインできません。
本番では以下どちらかで管理者を作成してください：

**方法1**: 通常登録後に SQL で is_admin=1 に更新
```sql
UPDATE users SET is_admin=1, is_approved=1 WHERE email='your@admin.example.com';
```

**方法2**: 初回セットアップ用の `/setup` エンドポイントを実装して `ADMIN_PASSWORD` secret を使う（未実装）

## ライセンスキー運用

| 書式 | 例 |
|---|---|
| `VPS-GE365X-XXXXXXXX` | `VPS-GE365X-AB23KXQM` |

- 管理画面 `/admin` → ライセンスタブ → 「新規発行」で一括発行
- ユーザーは `/login` → ライセンスタブでアクティベート
- アクティベートで `user_subscriptions` が対応プランで `active` になる
- `license_type = 'lifetime'` は `current_period_end = '2099-12-31'` として保存

## 現行 (Express版) から未移植の機能

以下は雛形だけ置いて **中身を次チャットで詰める** 予定:

| ファイル | 未実装の主な中身 |
|---|---|
| `routes/x-posts.ts` | `/cron/tick` の実装（pending キュー処理）、メディアアップロード |
| `routes/autopilot.ts` | `/api/autopilot/run-now` の 1-iteration 実装 |
| `routes/media.ts` | R2 バインディングを使ったアップロード処理 |
| `routes/kpi.ts` | `/api/kpi/recompute` の集計ロジック |
| `routes/subscription-api.ts` | Stripe / PayPal Webhook 署名検証と実処理 |
| `routes/threads-x.ts` | 送信時の連投ロジック（reply_to_id 伝播） |

ユーザー登録時の `is_approved` は `system_settings.trial_require_approval` で制御。

## 次のステップ
1. `wrangler d1 create` で D1 を作り、`database_id` を `wrangler.jsonc` に反映
2. 上記の secrets をすべて投入
3. `npm run dev` → `/login` でトップが表示されることを確認
4. 現行 `web/routes/*.js` から未実装部分を順次移植（1ファイルずつチャットで詰める）
