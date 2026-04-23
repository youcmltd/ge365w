# Phase 5 — UI v3 実装 (白基調 + 紺サイドバー + 青アクセント)

TAKA さんから提供された 4 枚のスクショ（ターゲット設定/ツリー投稿/X投稿管理/AI生成2/オートパイロット新規作成）の仕様に完全準拠した UI を実装しました。

## 変更サマリ

| ファイル | 変更 |
|---|---|
| `src/lib/html.ts` | ブランドカラーを white/navy/blue 系に全面差替 (BRAND 定数再定義) |
| `public/static/style.css` | 全スタイル書き直し。紺サイドバー + 白カード + 青アクセント |
| `src/pages/login.ts` | 白基調にリブランド (タブ付きカード・アイコン付きフィールド) |
| `src/pages/shell.ts` | **新規**: サイドバー 11 項目 + サブヘッダ + 共通フッターの共通レイアウト |
| `src/pages/dashboard.ts` | 全面書き直し。11 タブそれぞれのルートを `/dashboard/<key>` で定義 |
| `src/pages/dashboard-tabs.ts` | **新規**: 11 タブの HTML レンダ関数群 |

## サイドバー 11 項目 (現行 GE365x 完全準拠)

```
1. ダッシュボード    /dashboard
2. ターゲット設定    /dashboard/target
3. ブランドボイス    /dashboard/voice
4. パターン別AI生成  /dashboard/pattern
5. AI生成2           /dashboard/generate  (アイコン: fa-robot)
6. X投稿管理         /dashboard/posts
7. ツリー投稿         /dashboard/thread    (既存投稿へのコメント追加)
8. 予約状況          /dashboard/scheduled
9. オートパイロット  /dashboard/autopilot  (アイコン: fa-plane-departure)
10. アカウント管理   /dashboard/accounts
11. API設定          /dashboard/api
```

## カラースキーム

| 用途 | 値 |
|---|---|
| サイドバー | `#1E2A3B` (bg-sidebar) |
| サイドバー hover | `#2A3B52` (bg-sidebar-hover) |
| サイドバー active | `#2F4A7A` (bg-sidebar-active) |
| アクセント青 | `#2563EB` (bg-accent) |
| アクセント hover | `#1D4ED8` (bg-accent-hover) |
| アクセント薄 | `#EFF6FF` (bg-accent-light) |
| 背景 paper | `#F7F8FB` (bg-paper) |
| カード | `#FFFFFF` (bg-white) |
| テキスト | `#1F2937` (text-ink) |
| テキスト muted | `#6B7280` (text-ink-muted) |
| テキスト faint | `#9CA3AF` (text-ink-faint) |
| 罫線 | `#E5E7EB` (border-line) |

## スクショとの対応

| スクショ | 反映済 |
|---|---|
| ターゲット設定 (年齢層/性別/職業/痛み/欲求/トリガー + 「使用例」ボタン) | ✅ `renderTargetPage` |
| ツリー投稿 (コメント先選択必須 + 返信本文複数 + 返信履歴) | ✅ `renderThreadPage` |
| X投稿管理 (月次ナビ/統計行/チェックボックス/一括削除/当月ボタン) | ✅ `renderPostsPage` |
| AI生成2 (プロンプト + 投稿オプション + 巨大青AI生成ボタン + 下書き保存/再開) | ✅ `renderGeneratePage` |
| オートパイロット新規作成モーダル (アカウント/生成日時/投稿日時/生成方式/テーマ/キーワード/本文モード/下書きから再開) | ✅ `renderAutopilotPage` |

## 次フェーズ (Phase 6) でやること

UI 骨組みは全て揃いました。次は Mock プレビューで確認済の挙動を v2 API に接続する実動作化：

- [ ] `shell.ts` で `switchAccount()` → `/api/admin/accounts/:id/current` が実在するか（→ `routes/accounts.ts` に追加済み）
- [ ] AI生成2 の下書き保存/再開を drafts テーブル接続
- [ ] ツリー投稿の送信ロジック (連鎖 reply_to_id)
- [ ] オートパイロット autopilot_jobs 作成 → 実生成フロー (`/cron/autopilot-tick`)
- [ ] 予約状況に autopilot_jobs の scheduled も統合表示
- [ ] API設定保存 (x_api_settings テーブル)
- [ ] Chatbot モーダル (FAB 押下でスライドイン)

## ビルド / 動作確認

```bash
cd ge365x-web
npm install
npm run dev  # localhost で確認
```

`/login` → admin 昇格後に `/dashboard/*` 系 11 タブがすべて表示されます。
