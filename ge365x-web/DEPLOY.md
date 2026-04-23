# ge365x-web デプロイ手順（Cloudflare Pages）

既存の `growth-engine-365`, `wallet-manager-v2` と同じアカウント（`Youcm.ltd@gmail.com's Account`）に **4つ目のプロジェクト**として並べる前提。

---

## 0. 前提
- Cloudflare アカウント: `Youcm.ltd@gmail.com`
- ローカル: Node.js 20 以降、npm、git
- `wrangler` CLI は devDependency として入るので個別インストール不要

---

## 1. リポジトリとして切り出し

```bash
# このチャット成果物から ge365x-web ディレクトリだけを取り出す
cp -r ge365x-web ~/projects/ge365x-web
cd ~/projects/ge365x-web

git init
git add .
git commit -m "initial import from designer2 scaffold"

# GitHub リポジトリ作成後
git remote add origin git@github.com:YOUR_ORG/ge365x-web.git
git push -u origin main
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

初回はプロジェクト名を尋ねられるので `ge365x-web` と答える。

成功すると、以下のような URL で公開される:
```
https://ge365x-web.pages.dev
```

Cloudflare ダッシュボードの Workers & Pages に 4つ目として並ぶことを確認。

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
