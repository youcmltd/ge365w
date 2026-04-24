// ============================================================
// src/pages/shell.ts — 認証後の共通レイアウト (紺サイドバー+白コンテンツ)
// 現行 GE365x のデザインに完全準拠
// ============================================================

import { BRAND } from '../lib/html'
import type { AuthenticatedUser } from '../lib/types'

/**
 * サイドバー11項目定義（現行GE365x準拠）
 */
export type NavKey =
  | 'dashboard'
  | 'target'
  | 'voice'
  | 'pattern'
  | 'generate'
  | 'posts'
  | 'thread'
  | 'scheduled'
  | 'autopilot'
  | 'accounts'
  | 'api'
  | 'export'

export const NAV_ITEMS: { key: NavKey; label: string; icon: string; path: string }[] = [
  { key: 'dashboard', label: 'ダッシュボード',    icon: 'fa-gauge-high',            path: '/dashboard' },
  { key: 'target',    label: 'ターゲット設定',    icon: 'fa-bullseye',              path: '/dashboard/target' },
  { key: 'voice',     label: 'ブランドボイス',    icon: 'fa-palette',               path: '/dashboard/voice' },
  { key: 'pattern',   label: 'パターン別AI生成',  icon: 'fa-wand-magic-sparkles',   path: '/dashboard/pattern' },
  { key: 'generate',  label: 'AI生成2',           icon: 'fa-robot',                 path: '/dashboard/generate' },
  { key: 'posts',     label: 'X投稿管理',         icon: 'fa-brands fa-x-twitter',   path: '/dashboard/posts' },
  { key: 'thread',    label: 'ツリー投稿',         icon: 'fa-reply',                 path: '/dashboard/thread' },
  { key: 'scheduled', label: '予約状況',          icon: 'fa-calendar',              path: '/dashboard/scheduled' },
  { key: 'autopilot', label: 'オートパイロット',  icon: 'fa-plane-departure',       path: '/dashboard/autopilot' },
  { key: 'accounts',  label: 'アカウント管理',    icon: 'fa-users-gear',            path: '/dashboard/accounts' },
  { key: 'api',       label: 'API設定',           icon: 'fa-key',                   path: '/dashboard/api' },
  { key: 'export',    label: '一括ダウンロード',  icon: 'fa-download',              path: '/dashboard/export' },
]

/**
 * サイドバーHTML
 */
export function renderSidebar(active: NavKey, user: AuthenticatedUser): string {
  return `
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${BRAND.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${BRAND.name}</div>
        <div class="text-[10px] text-[#A7B6CE]">${BRAND.version}</div>
      </div>
    </div>
  </div>

  <nav class="flex-1 py-3 overflow-y-auto">
    ${NAV_ITEMS.map(item => `
      <a href="${item.path}" class="nav-item ${item.key === active ? 'active' : ''}">
        <i class="fas ${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `).join('')}
  </nav>

  <div class="px-3 py-3 border-t border-[#2A3B52]">
    <div class="text-[10px] text-[#A7B6CE] mb-2 px-1">現在のユーザー</div>
    <div class="bg-[#2A3B52] rounded-md p-2 text-xs">
      <div class="text-white truncate">${user.email}</div>
      <div class="flex items-center justify-between mt-1">
        <span class="pill pill-blue" style="background:rgba(96,165,250,.15);color:#93C5FD;border-color:rgba(96,165,250,.3)">${user.plan_code || '-'}</span>
        <button onclick="doLogout()" class="text-[#A7B6CE] hover:text-white text-xs"><i class="fas fa-right-from-bracket"></i></button>
      </div>
    </div>
  </div>
</aside>`
}

/**
 * サブヘッダー（現在アカウント切替 + JST時刻）
 */
export function renderSubHeader(accounts: { id: number; account_name: string; x_username: string | null }[], currentAccountId: number | null): string {
  return `
<div class="bg-white border-b border-line px-6 py-3 flex items-center justify-between gap-4">
  <div class="flex items-center gap-3">
    <label class="text-xs text-ink-muted">現在のアカウント:</label>
    <select class="inp" style="width:auto;min-width:12rem" id="acct-sw" onchange="switchAccount(this.value)">
      ${accounts.length === 0
        ? '<option value="">（未登録）</option>'
        : accounts.map(a => `<option value="${a.id}" ${currentAccountId === a.id ? 'selected' : ''}>@${a.x_username || a.account_name}</option>`).join('')}
    </select>
  </div>
  <div class="flex items-center gap-2 text-xs text-ink-muted">
    <span class="pill pill-ok"><i class="fas fa-circle text-[6px]"></i>Connected</span>
    <span id="jst-clock"></span>
  </div>
</div>
<script>
  (function() {
    function updateClock() {
      const el = document.getElementById('jst-clock');
      if (el) el.textContent = 'JST ' + new Date().toLocaleString('ja-JP');
    }
    updateClock();
    setInterval(updateClock, 30000);
  })();
</script>`
}

/**
 * チャットFAB + 共通フッタースクリプト
 */
export const COMMON_FOOTER = `
<button class="fab" onclick="toast && toast('Chatbot は次フェーズで実装','info')" title="AIチャットボット">
  <i class="fas fa-comment-dots text-xl"></i>
</button>
<div id="toast-host"></div>
<script>
  function doLogout() {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => { location.href = '/login'; });
  }
  function switchAccount(id) {
    if (!id) return;
    fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' })
      .then(() => location.reload());
  }
  function toast(msg, kind) {
    kind = kind || 'info';
    const host = document.getElementById('toast-host');
    if (!host) return;
    const bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
    const icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
    t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
    host.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
</script>
`

/**
 * 共通レイアウト全体を返す
 */
export function renderShell(opts: {
  active: NavKey
  user: AuthenticatedUser
  accounts: { id: number; account_name: string; x_username: string | null }[]
  currentAccountId: number | null
  pageBody: string
}): string {
  return `
<div class="min-h-screen flex bg-paper">
  ${renderSidebar(opts.active, opts.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${renderSubHeader(opts.accounts, opts.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${opts.pageBody}
    </div>
  </main>

  ${COMMON_FOOTER}
</div>`
}

/**
 * 「アカウント未選択」警告バナー（各タブで使用）
 */
export const NO_ACCOUNT_ALERT = `
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>アカウントが選択されていません。<a href="/dashboard/accounts" class="underline font-semibold">アカウント管理</a>で登録してください。</div>
</div>
`
