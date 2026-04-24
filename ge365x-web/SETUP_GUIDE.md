# GE365x-web セットアップガイド

## Growth-engine365X — WEB版 (Cloudflare Pages + D1)

---

## 🚀 クイックスタート

### 1. 前提条件

- **Node.js** 18+ / npm 9+
- **Wrangler CLI**: `npm install -g wrangler`
- **Cloudflare アカウント** (Pages + D1)
- **X Developer Portal** アカウント (OAuth 1.0a)
- **OpenAI API キー** (AI生成機能に必要)

### 2. インストール

```bash
cd ge365x-web
npm install
```

### 3. Cloudflare D1 データベース作成

```bash
# 新規 D1 DB を作成
npx wrangler d1 create ge365x-web-production

# 表示される database_id を wrangler.jsonc にコピー
```

`wrangler.jsonc` の `database_id` を更新:

```jsonc
{
  "d1_databases": [{
    "binding": "DB",
    "database_name": "ge365x-web-production",
    "database_id": "あなたのDB_ID"
  }]
}
```

### 4. マイグレーション実行

```bash
# ローカル開発用
npm run db:migrate:local

# 本番用
npm run db:migrate:prod
```

### 5. シークレット設定 (本番)

```bash
npx wrangler secret put JWT_SECRET
npx wrangler secret put ENCRYPTION_KEY
npx wrangler secret put OPENAI_API_KEY

# X API (Consumer Key/Secret は管理画面から設定可能)
npx wrangler secret put X_API_KEY
npx wrangler secret put X_API_SECRET

# オプション
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put STRIPE_SECRET_KEY
```

### 6. ローカル開発

```bash
npm run dev           # Vite + Hono 開発サーバー
# または
npm run dev:sandbox   # wrangler pages dev (D1ローカルDB使用)
```

ブラウザで `http://localhost:5173/login` を開いてください。

### 7. 本番デプロイ

```bash
npm run deploy
# = npm run build && npx wrangler pages deploy dist
```

### 8. 初期管理者設定

```bash
# D1コンソールまたはwranglerで管理者権限を付与
npx wrangler d1 execute ge365x-web-production \
  --command "UPDATE users SET is_admin=1, is_approved=1 WHERE email='your@email.com';"
```

---

## 📂 プロジェクト構成

```
ge365x-web/
├── src/
│   ├── index.tsx             # エントリポイント (ルート登録, cron)
│   ├── lib/
│   │   ├── auth.ts           # JWT認証 / ミドルウェア
│   │   ├── html.ts           # ブランド設定 / 共通ヘッド
│   │   ├── types.ts          # TypeScript 型定義
│   │   ├── utils.ts          # 暗号化 / ハッシュ / JWT
│   │   ├── openai.ts         # OpenAI API / プロンプト / テンプレート
│   │   ├── x-api.ts          # X API v2 (OAuth 1.0a)
│   │   ├── safety-control.ts # 投稿制御 (重複/間隔/ロック)
│   │   ├── similarity-guard.ts # 類似度チェック
│   │   ├── jitter-service.ts # 投稿時刻ジッター
│   │   └── plan-gate.ts      # プラン別機能ゲート
│   ├── pages/
│   │   ├── login.ts          # ログイン / 登録 / ライセンス認証
│   │   ├── dashboard.ts      # ダッシュボードルーター (12タブ)
│   │   ├── dashboard-tabs.ts # 各タブのHTMLレンダー
│   │   ├── shell.ts          # サイドバー / レイアウト
│   │   └── admin.ts          # 管理者画面
│   └── routes/
│       ├── auth-api.ts       # 認証 API
│       ├── accounts.ts       # Xアカウント管理 API
│       ├── posts.ts          # 投稿管理 API (CRUD + AI生成)
│       ├── x-posts.ts        # Cron投稿処理
│       ├── autopilot.ts      # オートパイロット API
│       ├── drafts.ts         # 下書き API
│       ├── chatbot.ts        # チャットボット API
│       ├── media.ts          # メディア管理 (R2)
│       ├── kpi.ts            # KPI指標 API
│       ├── logs.ts           # ログ API
│       ├── target.ts         # ターゲット設定 API
│       ├── voice.ts          # ブランドボイス API
│       ├── api-settings.ts   # API設定 (X/OpenAI/Telegram)
│       ├── subscription-api.ts # サブスクリプション API
│       └── export.ts         # 一括ダウンロード (CSV/JSON)
├── migrations/               # D1 マイグレーション (5本)
├── public/static/style.css   # 共通CSS
├── wrangler.jsonc            # Cloudflare 設定
├── package.json              # 依存関係
├── vite.config.ts            # ビルド設定
└── tsconfig.json             # TypeScript 設定
```

---

## 🎯 全機能一覧 (12タブ + 管理画面)

### ダッシュボード (12タブ)
| タブ | パス | 機能 |
|------|------|------|
| ダッシュボード | /dashboard | 統計・アカウント健全性・直近ログ |
| ターゲット設定 | /dashboard/target | 読者ペルソナ (28種テンプレート) |
| ブランドボイス | /dashboard/voice | 口調・世界観 (5種テンプレート) |
| パターン別AI生成 | /dashboard/pattern | 5パターン投稿生成 |
| AI生成2 | /dashboard/generate | フリープロンプト生成 |
| X投稿管理 | /dashboard/posts | 投稿CRUD・承認・即時投稿 |
| ツリー投稿 | /dashboard/thread | スレッド投稿 |
| 予約状況 | /dashboard/scheduled | 予約済み投稿一覧 |
| オートパイロット | /dashboard/autopilot | 自動投稿ジョブ管理 |
| アカウント管理 | /dashboard/accounts | Xアカウント追加・テスト |
| API設定 | /dashboard/api | X/OpenAI/Telegram設定・テスト |
| 一括ダウンロード | /dashboard/export | 全データCSV/JSONダウンロード |

### 管理者画面 (/admin)
- ユーザー管理 (承認・管理者権限)
- ライセンス管理 (発行・無効化・再有効化)
- サブスクリプション管理
- 投稿統計
- Xアカウント一覧
- 監査ログ
- システム設定
- 管理者用一括ダウンロード

### API エンドポイント (全82エンドポイント)
- 認証: 登録/ログイン/ログアウト/ライセンス認証/パスワード変更
- 投稿: CRUD/AI生成/承認/即時投稿/スレッド
- アカウント: 追加/テスト/切替/削除
- オートパイロット: ジョブCRUD/キャンセル/Cron処理
- エクスポート: 15種CSV/JSONダウンロード
- KPI/ログ/チャットボット/メディア/サブスクリプション

### Cron ジョブ
- **毎分**: `post_queue` 消化 (X API 投稿)
- **5分毎**: オートパイロット生成 (OpenAI → キュー)

---

## 🔐 セキュリティ

- JWT認証 (HMAC-SHA256, 7日間有効)
- PBKDF2 パスワードハッシュ (100,000回)
- AES-GCM トークン暗号化
- 投稿制御: 日次上限/15分間隔/類似度0.7閾値/リンクスパム防止
- アカウント健全性スコア (100点制)
- 監査ログ (全認証イベント記録)
- CSRF保護 (Cookie SameSite=Lax)

---

## 📝 ライセンスキー形式

`VPS-GE365X-XXXXXXXX` (大文字英数, O/0/I/1除外)

管理画面 → ライセンスタブから発行。ユーザーはログイン画面のライセンスタブで認証。

---

## ⚡ npm スクリプト

```bash
npm run dev             # Vite開発サーバー
npm run build           # 本番ビルド
npm run preview         # wrangler pages dev dist
npm run deploy          # ビルド+Cloudflare Pages デプロイ
npm run dev:sandbox     # ローカルD1付き開発
npm run db:migrate:local # ローカルDB マイグレーション
npm run db:migrate:prod  # 本番DB マイグレーション
npm run db:seed         # シードデータ投入
npm run db:reset        # DBリセット+マイグレーション+シード
npm run typecheck       # TypeScript 型チェック
```
