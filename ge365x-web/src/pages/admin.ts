// ============================================================
// src/pages/admin.ts — [AxisVault 流用 + ライセンス管理タブ追加]
// 管理者画面：ユーザー/ライセンス/サブスク/投稿ログ
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, LicenseRow } from '../lib/types'
import { authMiddleware, adminMiddleware, logAuthEvent } from '../lib/auth'
import { BRAND, layout } from '../lib/html'
import { generateLicenseKey, nowJst } from '../lib/utils'

const adminPage = new Hono<AppEnv>()

// ============================================================
// HTML ページ
// ============================================================
adminPage.get('/admin', authMiddleware, adminMiddleware, (c) => {
  const body = `
<div class="min-h-screen flex flex-col">
  <!-- ヘッダ -->
  <header class="border-b border-brand-800/40 bg-surface-raised/80 backdrop-blur">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="brand-logo w-10 h-10 rounded-xl flex items-center justify-center">
          <i class="fas ${BRAND.icon} text-white"></i>
        </div>
        <div>
          <div class="text-white font-bold tracking-tight">${BRAND.name} <span class="text-brand-400 text-xs font-normal">管理</span></div>
          <div class="text-brand-400 text-xs">${BRAND.longName}</div>
        </div>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <button onclick="dlAdminExport('admin/all')" class="btn-ghost" title="管理者全データJSON"><i class="fas fa-download"></i>全データDL</button>
        <a href="/dashboard" class="btn-ghost"><i class="fas fa-gauge"></i>ダッシュボード</a>
        <button onclick="doLogout()" class="btn-ghost"><i class="fas fa-right-from-bracket"></i>ログアウト</button>
      </div>
    </div>
  </header>

  <!-- タブ -->
  <nav class="border-b border-brand-800/40 bg-surface">
    <div class="max-w-7xl mx-auto flex gap-1 px-6 py-2 overflow-x-auto">
      <button onclick="showSection('users')"     id="nav-users"     class="tab-trigger active">ユーザー</button>
      <button onclick="showSection('licenses')"  id="nav-licenses"  class="tab-trigger">ライセンス</button>
      <button onclick="showSection('subs')"      id="nav-subs"      class="tab-trigger">サブスクリプション</button>
      <button onclick="showSection('posts')"     id="nav-posts"     class="tab-trigger">投稿管理</button>
      <button onclick="showSection('accounts')"  id="nav-accounts"  class="tab-trigger">Xアカウント</button>
      <button onclick="showSection('audit')"     id="nav-audit"     class="tab-trigger">監査ログ</button>
      <button onclick="showSection('settings')"  id="nav-settings"  class="tab-trigger">システム設定</button>
    </div>
  </nav>

  <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

    <!-- === ユーザー === -->
    <section id="section-users" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">ユーザー一覧</h2>
        <div class="flex gap-2">
          <select id="users-filter" class="input-field w-auto" onchange="loadUsers()">
            <option value="all">全て</option>
            <option value="pending">承認待ち</option>
            <option value="approved">承認済</option>
            <option value="admin">管理者</option>
          </select>
          <button onclick="loadUsers()" class="btn-ghost"><i class="fas fa-rotate"></i></button>
          <button onclick="dlAdminExport('admin/users')" class="btn-ghost" title="ユーザー一覧CSV"><i class="fas fa-download"></i></button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table" id="users-table">
          <thead><tr>
            <th>ID</th><th>メール</th><th>承認</th><th>管理者</th><th>プラン</th>
            <th>ステータス</th><th>トライアル終了</th><th>登録日</th><th>操作</th>
          </tr></thead>
          <tbody id="users-tbody"><tr><td colspan="9" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === ライセンス === -->
    <section id="section-licenses" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">ライセンスキー管理</h2>
        <div class="flex gap-2">
          <button onclick="dlAdminExport('admin/licenses')" class="btn-ghost" title="ライセンスCSV"><i class="fas fa-download"></i></button>
          <button onclick="openIssueLicenseModal()" class="btn-primary">
            <i class="fas fa-plus"></i>新規発行
          </button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>キー</th><th>種別</th><th>プラン</th><th>状態</th>
            <th>ユーザー</th><th>有効期限</th><th>発行日</th><th>操作</th>
          </tr></thead>
          <tbody id="licenses-tbody"><tr><td colspan="9" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>

      <!-- 発行モーダル -->
      <div id="issue-license-modal" class="fixed inset-0 bg-black/70 hidden items-center justify-center z-50 p-4">
        <div class="card max-w-md w-full">
          <h3 class="text-lg font-bold text-white mb-4">新規ライセンス発行</h3>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-brand-300 mb-1 block">プラン</label>
              <select id="issue-plan" class="input-field">
                <option value="ge365x_free">Free</option>
                <option value="ge365x_standard" selected>Standard</option>
                <option value="ge365x_pro">Pro</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">種別</label>
              <select id="issue-type" class="input-field">
                <option value="paid" selected>paid（有料）</option>
                <option value="trial">trial（試用）</option>
                <option value="lifetime">lifetime（永久）</option>
                <option value="comp">comp（招待）</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">有効期限（省略可）</label>
              <input type="date" id="issue-expires" class="input-field">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">発行数</label>
              <input type="number" id="issue-count" class="input-field" value="1" min="1" max="100">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">メモ</label>
              <input type="text" id="issue-note" class="input-field" placeholder="用途・顧客名など">
            </div>
            <div class="flex gap-2">
              <button onclick="closeIssueLicenseModal()" class="btn-ghost flex-1">キャンセル</button>
              <button onclick="submitIssueLicense()" class="btn-primary flex-1">
                <i class="fas fa-key"></i>発行
              </button>
            </div>
            <div id="issue-result" class="hidden bg-surface border border-brand-700/40 rounded-lg p-3 font-mono text-xs text-brand-200"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- === サブスク === -->
    <section id="section-subs" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">サブスクリプション</h2>
        <button onclick="dlAdminExport('admin/subs')" class="btn-ghost" title="サブスクリプションCSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>ユーザー</th><th>プラン</th><th>状態</th>
            <th>開始</th><th>期限</th><th>自動更新</th>
          </tr></thead>
          <tbody id="subs-tbody"><tr><td colspan="7" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === 投稿管理 === -->
    <section id="section-posts" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">投稿キュー / ログ</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" id="posts-stats"></div>
      <div class="card overflow-x-auto">
        <h3 class="text-white font-semibold mb-3">最近の投稿ログ</h3>
        <table class="data-table">
          <thead><tr>
            <th>時刻</th><th>ユーザー</th><th>アカウント</th><th>本文</th><th>状態</th>
          </tr></thead>
          <tbody id="posts-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === Xアカウント === -->
    <section id="section-accounts" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">X アカウント</h2>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>ユーザー</th><th>@handle</th><th>状態</th>
            <th>最終使用</th><th>トークン期限</th>
          </tr></thead>
          <tbody id="accounts-tbody"><tr><td colspan="6" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === 監査ログ === -->
    <section id="section-audit" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">認証・監査ログ</h2>
        <button onclick="dlAdminExport('admin/audit')" class="btn-ghost" title="監査ログCSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>時刻</th><th>ユーザー</th><th>イベント</th><th>IP</th><th>User Agent</th>
          </tr></thead>
          <tbody id="audit-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === システム設定 === -->
    <section id="section-settings" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">システム設定</h2>
      <div class="card">
        <div class="space-y-4" id="settings-form"></div>
      </div>
    </section>

  </main>
</div>

<script>
const sections = ['users','licenses','subs','posts','accounts','audit','settings'];
const loaders = {
  users: loadUsers, licenses: loadLicenses, subs: loadSubs,
  posts: loadPosts, accounts: loadAccounts, audit: loadAudit, settings: loadSettings
};

function showSection(name) {
  sections.forEach(s => {
    document.getElementById('nav-' + s).classList.toggle('active', s === name);
    document.getElementById('section-' + s).classList.toggle('hidden-force', s !== name);
  });
  if (loaders[name]) loaders[name]();
}

async function doLogout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  location.href = '/login';
}

// ---------- ユーザー ----------
async function loadUsers() {
  const filter = document.getElementById('users-filter').value;
  const r = await fetch('/api/admin/users?filter=' + filter);
  const j = await r.json();
  const tbody = document.getElementById('users-tbody');
  if (!j.users || !j.users.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-brand-400 py-6">対象なし</td></tr>';
    return;
  }
  tbody.innerHTML = j.users.map(u => \`
    <tr>
      <td class="text-brand-300">\${u.id}</td>
      <td>\${u.email}</td>
      <td>\${u.is_approved ? '<span class="pill pill-active">承認済</span>' : '<span class="pill pill-pending">保留</span>'}</td>
      <td>\${u.is_admin ? '<i class="fas fa-shield text-brand-400"></i>' : ''}</td>
      <td class="text-xs">\${u.plan_code || '-'}</td>
      <td>\${u.sub_status ? '<span class="pill pill-active">'+u.sub_status+'</span>' : '-'}</td>
      <td class="text-xs text-brand-300">\${u.trial_end || '-'}</td>
      <td class="text-xs text-brand-300">\${u.created_at}</td>
      <td class="flex gap-1">
        \${u.is_approved
          ? \`<button onclick="toggleApprove(\${u.id},0)" class="btn-ghost text-xs"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="toggleApprove(\${u.id},1)" class="btn-primary text-xs"><i class="fas fa-check"></i></button>\`}
        <button onclick="toggleAdmin(\${u.id},\${u.is_admin?0:1})" class="btn-ghost text-xs">
          <i class="fas fa-shield"></i>
        </button>
      </td>
    </tr>
  \`).join('');
}
async function toggleApprove(id, to) {
  await fetch(\`/api/admin/users/\${id}/approve\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_approved: to }) });
  loadUsers();
}
async function toggleAdmin(id, to) {
  await fetch(\`/api/admin/users/\${id}/admin\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_admin: to }) });
  loadUsers();
}

// ---------- ライセンス ----------
async function loadLicenses() {
  const r = await fetch('/api/admin/licenses');
  const j = await r.json();
  const tbody = document.getElementById('licenses-tbody');
  if (!j.licenses || !j.licenses.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-brand-400 py-6">発行済キーなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.licenses.map(l => \`
    <tr>
      <td class="text-brand-300">\${l.id}</td>
      <td class="font-mono text-xs">\${l.license_key}</td>
      <td><span class="pill pill-inactive">\${l.license_type}</span></td>
      <td class="text-xs">\${l.plan_code || '-'}</td>
      <td>\${l.is_active ? '<span class="pill pill-active">有効</span>' : '<span class="pill pill-inactive">無効</span>'}</td>
      <td class="text-xs">\${l.user_email || '-'}</td>
      <td class="text-xs text-brand-300">\${l.expires_at || '無期限'}</td>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td class="flex gap-1">
        <button onclick="copyKey('\${l.license_key}')" class="btn-ghost text-xs" title="コピー"><i class="fas fa-copy"></i></button>
        \${l.is_active
          ? \`<button onclick="revokeLicense(\${l.id})" class="btn-danger text-xs" title="無効化"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="reactivateLicense(\${l.id})" class="btn-ghost text-xs" title="再有効化"><i class="fas fa-check"></i></button>\`}
      </td>
    </tr>
  \`).join('');
}
function copyKey(k) { navigator.clipboard.writeText(k); }
function openIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.remove('hidden');
  document.getElementById('issue-license-modal').classList.add('flex');
  document.getElementById('issue-result').classList.add('hidden');
}
function closeIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.add('hidden');
  document.getElementById('issue-license-modal').classList.remove('flex');
}
async function submitIssueLicense() {
  const body = {
    plan_code: document.getElementById('issue-plan').value,
    license_type: document.getElementById('issue-type').value,
    expires_at: document.getElementById('issue-expires').value || null,
    count: parseInt(document.getElementById('issue-count').value, 10) || 1,
    note: document.getElementById('issue-note').value || null,
  };
  const r = await fetch('/api/admin/licenses/issue', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok) { alert('発行失敗: ' + (j.error || '')); return; }
  const el = document.getElementById('issue-result');
  el.textContent = (j.keys || []).join('\\n');
  el.classList.remove('hidden');
  loadLicenses();
}
async function revokeLicense(id) {
  if (!confirm('このライセンスを無効化しますか？')) return;
  await fetch(\`/api/admin/licenses/\${id}/revoke\`, { method: 'POST' });
  loadLicenses();
}
async function reactivateLicense(id) {
  await fetch(\`/api/admin/licenses/\${id}/reactivate\`, { method: 'POST' });
  loadLicenses();
}

// ---------- サブスク ----------
async function loadSubs() {
  const r = await fetch('/api/admin/subscriptions');
  const j = await r.json();
  const tbody = document.getElementById('subs-tbody');
  if (!j.subscriptions || !j.subscriptions.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-brand-400 py-6">契約なし</td></tr>';
    return;
  }
  tbody.innerHTML = j.subscriptions.map(s => \`
    <tr>
      <td class="text-brand-300">\${s.id}</td>
      <td>\${s.user_email}</td>
      <td>\${s.plan_code}</td>
      <td><span class="pill pill-\${s.status==='active'?'active':'inactive'}">\${s.status}</span></td>
      <td class="text-xs text-brand-300">\${s.started_at || '-'}</td>
      <td class="text-xs text-brand-300">\${s.current_period_end || '-'}</td>
      <td>\${s.cancel_at_period_end ? '<span class="pill pill-pending">停止予定</span>' : '-'}</td>
    </tr>
  \`).join('');
}

// ---------- 投稿 ----------
async function loadPosts() {
  const r = await fetch('/api/admin/posts/summary');
  const j = await r.json();
  const stats = document.getElementById('posts-stats');
  stats.innerHTML = (j.stats || []).map(s => \`
    <div class="card text-center">
      <div class="text-xs text-brand-400 uppercase tracking-wider">\${s.label}</div>
      <div class="text-2xl font-bold text-white mt-1">\${s.value}</div>
    </div>
  \`).join('');
  const tbody = document.getElementById('posts-tbody');
  if (!j.recent || !j.recent.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">ログなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.recent.map(p => \`
    <tr>
      <td class="text-xs text-brand-300">\${p.created_at}</td>
      <td class="text-xs">\${p.email || '-'}</td>
      <td class="text-xs">\${p.x_screen_name || '-'}</td>
      <td class="text-xs max-w-md truncate">\${p.content || ''}</td>
      <td><span class="pill pill-\${p.status==='success'?'active':(p.status==='failed'?'error':'inactive')}">\${p.status}</span></td>
    </tr>
  \`).join('');
}

// ---------- Xアカウント ----------
async function loadAccounts() {
  const r = await fetch('/api/admin/x-accounts');
  const j = await r.json();
  const tbody = document.getElementById('accounts-tbody');
  if (!j.accounts || !j.accounts.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-brand-400 py-6">アカウントなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.accounts.map(a => \`
    <tr>
      <td class="text-brand-300">\${a.id}</td>
      <td class="text-xs">\${a.user_email}</td>
      <td>@\${a.x_screen_name || '-'}</td>
      <td>\${a.is_active ? '<span class="pill pill-active">有効</span>' : '<span class="pill pill-inactive">停止</span>'}</td>
      <td class="text-xs text-brand-300">\${a.last_used_at || '-'}</td>
      <td class="text-xs text-brand-300">\${a.token_expires_at || '-'}</td>
    </tr>
  \`).join('');
}

// ---------- 監査 ----------
async function loadAudit() {
  const r = await fetch('/api/admin/audit-logs');
  const j = await r.json();
  const tbody = document.getElementById('audit-tbody');
  if (!j.logs || !j.logs.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">ログなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.logs.map(l => \`
    <tr>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td class="text-xs">\${l.email || '-'}</td>
      <td><span class="pill pill-inactive">\${l.event_type}</span></td>
      <td class="text-xs text-brand-300">\${l.ip_address || ''}</td>
      <td class="text-xs text-brand-400 truncate max-w-xs">\${(l.user_agent||'').slice(0,60)}</td>
    </tr>
  \`).join('');
}

// ---------- 設定 ----------
async function loadSettings() {
  const r = await fetch('/api/admin/settings');
  const j = await r.json();
  const form = document.getElementById('settings-form');
  form.innerHTML = (j.settings || []).map(s => \`
    <div class="flex items-center gap-3">
      <div class="flex-1">
        <div class="text-white font-medium">\${s.key}</div>
        <div class="text-xs text-brand-400">\${s.description || ''}</div>
      </div>
      <input type="text" id="setting-\${s.key}" class="input-field w-64" value="\${s.value || ''}">
      <button onclick="saveSetting('\${s.key}')" class="btn-primary"><i class="fas fa-save"></i></button>
    </div>
  \`).join('');
}
async function saveSetting(key) {
  const value = document.getElementById('setting-' + key).value;
  await fetch('/api/admin/settings', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ key, value }),
  });
}

// ---------- 一括ダウンロード ----------
function dlAdminExport(key) {
  const url = '/api/admin/export/' + key;
  fetch(url).then(r => {
    if (!r.ok) throw new Error('ダウンロード失敗 (' + r.status + ')');
    const cd = r.headers.get('content-disposition') || '';
    const match = cd.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'ge365x_' + key.replace('/', '_') + '.' + (key.includes('all') ? 'json' : 'csv');
    return r.blob().then(blob => ({ blob, filename }));
  }).then(({ blob, filename }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }).catch(e => alert(e.message));
}

// 起動時
showSection('users');
</script>
`
  return c.html(layout('管理画面', body))
})

// ============================================================
// 管理用 JSON API
// ============================================================

// ---------- users ----------
adminPage.get('/api/admin/users', authMiddleware, adminMiddleware, async (c) => {
  const filter = c.req.query('filter') || 'all'
  const where: string[] = []
  if (filter === 'pending')  where.push('u.is_approved = 0')
  if (filter === 'approved') where.push('u.is_approved = 1')
  if (filter === 'admin')    where.push('u.is_admin = 1')
  const sql = `
    SELECT u.id, u.email, u.is_approved, u.is_admin, u.trial_start, u.trial_end, u.created_at,
           s.plan_code, s.status AS sub_status
      FROM users u
      LEFT JOIN user_subscriptions s ON s.user_id = u.id
      ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY u.id DESC
      LIMIT 200`
  const { results } = await c.env.DB.prepare(sql).all()
  return c.json({ users: results || [] })
})

adminPage.post('/api/admin/users/:id/approve', authMiddleware, adminMiddleware, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const { is_approved } = await c.req.json<{ is_approved: number }>()
  await c.env.DB.prepare(
    "UPDATE users SET is_approved=?, updated_at=datetime('now','+9 hours') WHERE id=?"
  ).bind(is_approved, id).run()
  await logAuthEvent(c, 'admin_toggle_approval', {
    userId: c.get('user')!.id, metadata: { target_user_id: id, is_approved }
  })
  return c.json({ ok: true })
})

adminPage.post('/api/admin/users/:id/admin', authMiddleware, adminMiddleware, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  const { is_admin } = await c.req.json<{ is_admin: number }>()
  await c.env.DB.prepare(
    "UPDATE users SET is_admin=?, updated_at=datetime('now','+9 hours') WHERE id=?"
  ).bind(is_admin, id).run()
  await logAuthEvent(c, 'admin_toggle_admin', {
    userId: c.get('user')!.id, metadata: { target_user_id: id, is_admin }
  })
  return c.json({ ok: true })
})

// ---------- licenses ----------
adminPage.get('/api/admin/licenses', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT l.*, u.email AS user_email
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 500`
  ).all()
  return c.json({ licenses: results || [] })
})

adminPage.post('/api/admin/licenses/issue', authMiddleware, adminMiddleware, async (c) => {
  const admin = c.get('user')!
  const { plan_code, license_type, expires_at, count = 1, note } = await c.req.json<{
    plan_code: string; license_type: string; expires_at?: string | null; count?: number; note?: string | null
  }>()
  if (count < 1 || count > 100) return c.json({ error: 'invalid_count' }, 400)

  const keys: string[] = []
  for (let i = 0; i < count; i++) {
    let key = generateLicenseKey('VPS-GE365X')
    // 衝突チェック（確率はほぼ無いが念のため）
    for (let retry = 0; retry < 3; retry++) {
      const hit = await c.env.DB.prepare('SELECT 1 FROM licenses WHERE license_key=?')
        .bind(key).first()
      if (!hit) break
      key = generateLicenseKey('VPS-GE365X')
    }
    await c.env.DB.prepare(
      `INSERT INTO licenses (license_key, license_type, plan_code, is_active, expires_at, issued_by, note)
       VALUES (?, ?, ?, 1, ?, ?, ?)`
    ).bind(
      key, license_type, plan_code,
      expires_at ? expires_at + ' 23:59:59' : null,
      admin.id, note || null
    ).run()
    keys.push(key)
  }

  await logAuthEvent(c, 'admin_issue_license', {
    userId: admin.id, metadata: { count, plan_code, license_type }
  })
  return c.json({ ok: true, keys })
})

adminPage.post('/api/admin/licenses/:id/revoke', authMiddleware, adminMiddleware, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare(
    "UPDATE licenses SET is_active=0, updated_at=datetime('now','+9 hours') WHERE id=?"
  ).bind(id).run()
  await c.env.DB.prepare(
    `INSERT INTO license_activations (license_id, user_id, event_type)
     VALUES (?, ?, 'revoked')`
  ).bind(id, c.get('user')!.id).run()
  return c.json({ ok: true })
})

adminPage.post('/api/admin/licenses/:id/reactivate', authMiddleware, adminMiddleware, async (c) => {
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare(
    "UPDATE licenses SET is_active=1, updated_at=datetime('now','+9 hours') WHERE id=?"
  ).bind(id).run()
  return c.json({ ok: true })
})

// ---------- subscriptions ----------
adminPage.get('/api/admin/subscriptions', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT s.*, u.email AS user_email
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 300`
  ).all()
  return c.json({ subscriptions: results || [] })
})

// ---------- posts ----------
adminPage.get('/api/admin/posts/summary', authMiddleware, adminMiddleware, async (c) => {
  const total   = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM post_queue').first<{ n: number }>()
  const pending = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE status='pending'").first<{ n: number }>()
  const success = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='success'").first<{ n: number }>()
  const failed  = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='failed'").first<{ n: number }>()

  const { results: recent } = await c.env.DB.prepare(
    `SELECT pl.created_at, pl.content, pl.status,
            u.email, x.x_screen_name
       FROM post_logs pl
       LEFT JOIN users u  ON u.id = pl.user_id
       LEFT JOIN x_accounts x ON x.id = pl.x_account_id
       ORDER BY pl.created_at DESC LIMIT 100`
  ).all()

  return c.json({
    stats: [
      { label: '全キュー',  value: total?.n   ?? 0 },
      { label: 'pending', value: pending?.n ?? 0 },
      { label: '成功',     value: success?.n ?? 0 },
      { label: '失敗',     value: failed?.n  ?? 0 },
    ],
    recent: recent || [],
  })
})

// ---------- x-accounts ----------
adminPage.get('/api/admin/x-accounts', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT xa.id, xa.x_screen_name, xa.is_active, xa.last_used_at, xa.token_expires_at,
            u.email AS user_email
       FROM x_accounts xa
       LEFT JOIN users u ON u.id = xa.user_id
       ORDER BY xa.id DESC LIMIT 500`
  ).all()
  return c.json({ accounts: results || [] })
})

// ---------- audit-logs ----------
adminPage.get('/api/admin/audit-logs', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 300`
  ).all()
  return c.json({ logs: results || [] })
})

// ---------- settings ----------
adminPage.get('/api/admin/settings', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT key, value, description FROM system_settings ORDER BY key'
  ).all()
  return c.json({ settings: results || [] })
})

adminPage.post('/api/admin/settings', authMiddleware, adminMiddleware, async (c) => {
  const { key, value } = await c.req.json<{ key: string; value: string }>()
  await c.env.DB.prepare(
    `INSERT INTO system_settings (key, value, updated_at)
     VALUES (?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`
  ).bind(key, value).run()
  return c.json({ ok: true })
})

export { adminPage }
