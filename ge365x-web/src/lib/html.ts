// ============================================================
// src/lib/html.ts — 共通ヘッダ / ブランド設定 (v3, 現行GE365x準拠)
// 配色: 白基調 + 紺サイドバー + 青アクセント
// ============================================================

export const BRAND = {
  name: 'Growth-engine365X',
  shortName: 'GE365x',
  version: 'ver1.00',
  tagline: 'X (Twitter) 自動投稿プラットフォーム',
  icon: 'fa-bolt',

  // サイドバー（紺）
  sidebar: '#1E2A3B',
  sidebarHover: '#2A3B52',
  sidebarActive: '#2F4A7A',
  sidebarText: '#A7B6CE',

  // アクセント（青）
  accent: '#2563EB',
  accentHover: '#1D4ED8',
  accentLight: '#EFF6FF',

  // 背景
  paper: '#F7F8FB',
  paperSoft: '#F1F3F7',
  card: '#FFFFFF',

  // テキスト
  text: '#1F2937',
  textMuted: '#6B7280',
  textFaint: '#9CA3AF',
  line: '#E5E7EB',
}

export const COMMON_HEAD = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          sidebar:  { DEFAULT:'#1E2A3B', hover:'#2A3B52', active:'#2F4A7A' },
          accent:   { DEFAULT:'#2563EB', hover:'#1D4ED8', light:'#EFF6FF' },
          paper:    { DEFAULT:'#F7F8FB', card:'#FFFFFF', soft:'#F1F3F7' },
          ink:      { DEFAULT:'#1F2937', muted:'#6B7280', faint:'#9CA3AF' },
          line:     { DEFAULT:'#E5E7EB', soft:'#F1F3F7' },
        },
        fontFamily: {
          sans: ['"Noto Sans JP"', 'Inter', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
      },
    },
  }
</script>
<link rel="stylesheet" href="/static/style.css">
`

export const COMMON_BODY_CLASS = 'bg-paper text-ink min-h-screen font-sans antialiased'

/**
 * ページ全体をラップするヘルパ
 */
export function layout(title: string, bodyHtml: string, opts: { bodyClass?: string } = {}): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
${COMMON_HEAD}
<title>${title} — ${BRAND.name}</title>
</head>
<body class="${opts.bodyClass ?? COMMON_BODY_CLASS}">
${bodyHtml}
</body>
</html>`
}
