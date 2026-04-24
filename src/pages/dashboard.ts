// ============================================================
// src/pages/dashboard.ts — ユーザーダッシュボード (v3, 11タブ構成)
// 現行 GE365x のUIに完全準拠 (白基調 + 紺サイドバー)
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, AuthenticatedUser, XAccountRow } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { layout } from '../lib/html'
import { renderShell, NO_ACCOUNT_ALERT, type NavKey } from './shell'
import {
  renderDashboardPage,
  renderTargetPage,
  renderVoicePage,
  renderPatternPage,
  renderGeneratePage,
  renderPostsPage,
  renderThreadPage,
  renderScheduledPage,
  renderAutopilotPage,
  renderAccountsPage,
  renderApiPage,
  renderExportPage,
} from './dashboard-tabs'

const dashboardPage = new Hono<AppEnv>()

// ============================================================
// Helper: 現在のアカウント一覧を取得
// ============================================================
async function loadAccountsForUser(c: any, user: AuthenticatedUser) {
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`
  ).bind(user.id).all<{ id: number; account_name: string; x_username: string | null; is_current: number }>()
  const accounts = (results || []).map(r => ({
    id: r.id,
    account_name: r.account_name,
    x_username: r.x_username,
  }))
  const current = (results || []).find(r => r.is_current === 1)
  return { accounts, currentAccountId: current?.id ?? null }
}

// ============================================================
// Root: / → /login or /dashboard
// ============================================================
dashboardPage.get('/', (c) => c.redirect('/login'))

// ============================================================
// 各タブのレンダ
// ============================================================
async function renderTab(c: any, active: NavKey, bodyBuilder: (ctx: {
  user: AuthenticatedUser
  hasAccount: boolean
  accounts: { id: number; account_name: string; x_username: string | null }[]
  currentAccountId: number | null
}) => string | Promise<string>) {
  const user = c.get('user')! as AuthenticatedUser
  const { accounts, currentAccountId } = await loadAccountsForUser(c, user)
  const hasAccount = accounts.length > 0 && currentAccountId !== null

  const pageBody = await Promise.resolve(bodyBuilder({ user, hasAccount, accounts, currentAccountId }))
  const shell = renderShell({ active, user, accounts, currentAccountId, pageBody })
  return c.html(layout('GE365x', shell))
}

// ============================================================
// タブルート
// ============================================================

dashboardPage.get('/dashboard', authMiddleware, async (c) => {
  return renderTab(c, 'dashboard', async ({ user, hasAccount }) => {
    // 集計
    const accounts = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?')
      .bind(user.id).first<{ n: number }>()
    const today = await c.env.DB.prepare(
      "SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'"
    ).bind(user.id).first<{ n: number }>()
    const pending = await c.env.DB.prepare(
      "SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved')"
    ).bind(user.id).first<{ n: number }>()
    const failed = await c.env.DB.prepare(
      "SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')"
    ).bind(user.id).first<{ n: number }>()

    const { results: healthRows } = await c.env.DB.prepare(
      `SELECT id, account_name, x_username, account_health_score, health_status, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id`
    ).bind(user.id).all<XAccountRow>()

    const { results: recentLogs } = await c.env.DB.prepare(
      `SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`
    ).bind(user.id).all<any>()

    return renderDashboardPage({
      stats: {
        accounts: accounts?.n ?? 0,
        today: today?.n ?? 0,
        pending: pending?.n ?? 0,
        failed: failed?.n ?? 0,
      },
      health: healthRows || [],
      recentLogs: recentLogs || [],
      hasAccount,
    })
  })
})

dashboardPage.get('/dashboard/target', authMiddleware, async (c) => {
  return renderTab(c, 'target', async ({ user, currentAccountId, hasAccount }) => {
    const acctStr = String(currentAccountId ?? 'default')
    const row = await c.env.DB.prepare(
      'SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1'
    ).bind(acctStr, user.id).first()
    return renderTargetPage({ target: row, hasAccount, noAccountAlert: NO_ACCOUNT_ALERT })
  })
})

dashboardPage.get('/dashboard/voice', authMiddleware, async (c) => {
  return renderTab(c, 'voice', async ({ user, currentAccountId, hasAccount }) => {
    const acctStr = String(currentAccountId ?? 'default')
    const row = await c.env.DB.prepare(
      'SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1'
    ).bind(acctStr, user.id).first()
    return renderVoicePage({ voice: row, hasAccount, noAccountAlert: NO_ACCOUNT_ALERT })
  })
})

dashboardPage.get('/dashboard/pattern', authMiddleware, async (c) => {
  return renderTab(c, 'pattern', async ({ user, hasAccount, currentAccountId, accounts }) => {
    // 現在のtarget, voice を取得して表示用
    const acctStr = String(currentAccountId ?? 'default')
    const target = await c.env.DB.prepare(
      'SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1'
    ).bind(acctStr, user.id).first<{ age_range: string | null; gender: string | null }>()
    const voice = await c.env.DB.prepare(
      'SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1'
    ).bind(acctStr, user.id).first<{ tone: string | null }>()
    const currentAcct = accounts.find(a => a.id === currentAccountId)
    return renderPatternPage({
      hasAccount, noAccountAlert: NO_ACCOUNT_ALERT,
      target, voice, currentAcct,
    })
  })
})

dashboardPage.get('/dashboard/generate', authMiddleware, async (c) => {
  return renderTab(c, 'generate', ({ hasAccount }) =>
    renderGeneratePage({ hasAccount, noAccountAlert: NO_ACCOUNT_ALERT })
  )
})

dashboardPage.get('/dashboard/posts', authMiddleware, async (c) => {
  return renderTab(c, 'posts', async ({ user, hasAccount }) => {
    // 月パラメタ（?month=YYYY-MM）
    const monthParam = c.req.query('month')
    const month = monthParam || new Date().toISOString().slice(0, 7)
    const [y, m] = month.split('-')

    // 当月の投稿を取得
    const { results: posts } = await c.env.DB.prepare(
      `SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`
    ).bind(user.id, month).all<any>()

    const total = (posts || []).length
    const pending = (posts || []).filter((p: any) => p.status === 'pending' || p.status === 'approved').length
    const posted = (posts || []).filter((p: any) => p.status === 'posted').length
    const failed = (posts || []).filter((p: any) => p.status === 'failed').length

    return renderPostsPage({
      hasAccount, noAccountAlert: NO_ACCOUNT_ALERT,
      month, y, m: parseInt(m, 10),
      posts: posts || [],
      stats: { total, pending, posted, failed },
    })
  })
})

dashboardPage.get('/dashboard/thread', authMiddleware, async (c) => {
  return renderTab(c, 'thread', async ({ user, hasAccount }) => {
    // 現在は post_queue の post_mode='thread' 系を「返信履歴」代わりに表示
    const { results: history } = await c.env.DB.prepare(
      `SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`
    ).bind(user.id).all<any>()

    return renderThreadPage({
      hasAccount, noAccountAlert: NO_ACCOUNT_ALERT,
      history: history || [],
    })
  })
})

dashboardPage.get('/dashboard/scheduled', authMiddleware, async (c) => {
  return renderTab(c, 'scheduled', async ({ user, hasAccount }) => {
    const { results: scheduled } = await c.env.DB.prepare(
      `SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`
    ).bind(user.id).all<any>()

    return renderScheduledPage({
      hasAccount, noAccountAlert: NO_ACCOUNT_ALERT,
      scheduled: scheduled || [],
    })
  })
})

dashboardPage.get('/dashboard/autopilot', authMiddleware, async (c) => {
  return renderTab(c, 'autopilot', async ({ user, hasAccount, accounts }) => {
    const { results: jobs } = await c.env.DB.prepare(
      `SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`
    ).bind(user.id).all<any>()

    return renderAutopilotPage({
      hasAccount, noAccountAlert: NO_ACCOUNT_ALERT,
      accounts, jobs: jobs || [],
    })
  })
})

dashboardPage.get('/dashboard/accounts', authMiddleware, async (c) => {
  return renderTab(c, 'accounts', async ({ user }) => {
    const { results: accts } = await c.env.DB.prepare(
      `SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`
    ).bind(user.id).all<any>()

    return renderAccountsPage({ accounts: accts || [] })
  })
})

dashboardPage.get('/dashboard/api', authMiddleware, async (c) => {
  return renderTab(c, 'api', async ({ user }) => {
    // x_api_settings はテナント毎
    const settings = await c.env.DB.prepare(
      'SELECT * FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1'
    ).bind(user.id).first<any>()

    return renderApiPage({ settings })
  })
})

dashboardPage.get('/dashboard/export', authMiddleware, async (c) => {
  return renderTab(c, 'export', ({ user }) => {
    return renderExportPage({ isAdmin: user.is_admin })
  })
})

export { dashboardPage }
