// ============================================================
// src/index.tsx — ge365x-web エントリ (v2, 現行GE365x完全準拠)
// ============================================================

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import type { AppEnv } from './lib/types'

// ----- ページ -----
import { loginPage } from './pages/login'
import { dashboardPage } from './pages/dashboard'
import { adminPage } from './pages/admin'

// ----- 認証・会員 (AxisVault 流用) -----
import { authApi } from './routes/auth-api'
import { subscriptionApi } from './routes/subscription-api'

// ----- GE365x 本体 -----
import { accountsApi } from './routes/accounts'
import { postsApi } from './routes/posts'
import { xPostsApi } from './routes/x-posts'
import { autopilotApi } from './routes/autopilot'
import { chatbotApi } from './routes/chatbot'

// ----- 補助ルート -----
import { draftsApi } from './routes/drafts'
import { mediaApi } from './routes/media'
import { kpiApi } from './routes/kpi'
import { logsApi } from './routes/logs'
import { targetApi } from './routes/target'
import { voiceApi } from './routes/voice'

const app = new Hono<AppEnv>()

// 静的
app.use('/static/*', serveStatic({ root: './', manifest: {} }))

// ヘルスチェック
app.get('/healthz', (c) => c.json({ ok: true, service: 'ge365x-web', time: new Date().toISOString() }))

// ページ
app.route('/', loginPage)
app.route('/', dashboardPage)
app.route('/', adminPage)

// API: 認証・会員
app.route('/', authApi)
app.route('/', subscriptionApi)

// API: GE365x 本体
app.route('/', accountsApi)
app.route('/', postsApi)
app.route('/', xPostsApi)
app.route('/', autopilotApi)
app.route('/', chatbotApi)

// API: 補助
app.route('/', draftsApi)
app.route('/', mediaApi)
app.route('/', kpiApi)
app.route('/', logsApi)
app.route('/', targetApi)
app.route('/', voiceApi)

// 404 / 500
app.notFound((c) => c.json({ error: 'not_found', path: c.req.path }, 404))
app.onError((err, c) => {
  console.error('[ge365x-web] error:', err)
  return c.json({ error: 'internal_error', message: err.message }, 500)
})

// ============================================================
// Workers エントリ (fetch + scheduled)
// ============================================================
export default {
  fetch: app.fetch,

  async scheduled(event: ScheduledEvent, env: AppEnv['Bindings'], ctx: ExecutionContext) {
    const cron = (event as any).cron as string | undefined

    // 毎分: post_queue 消化
    if (!cron || cron === '*/1 * * * *') {
      ctx.waitUntil(
        app.fetch(new Request('https://internal/cron/tick', { method: 'POST' }), env, ctx as any)
          .catch((e) => console.error('[tick]', e))
      )
    }
    // 5分毎: autopilot 生成
    if (cron === '*/5 * * * *') {
      ctx.waitUntil(
        app.fetch(new Request('https://internal/cron/autopilot-tick', { method: 'POST' }), env, ctx as any)
          .catch((e) => console.error('[autopilot-tick]', e))
      )
    }
  },
}
