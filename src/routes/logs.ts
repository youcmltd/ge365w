// ============================================================
// src/routes/logs.ts — 投稿ログ閲覧 (v2)
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'

const logsApi = new Hono<AppEnv>()

// GET /api/admin/logs/posts
logsApi.get('/api/admin/logs/posts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const status = c.req.query('status')
  const accountId = c.req.query('account_id')

  const binds: any[] = [user.id]
  let where = 'WHERE pl.user_id = ?'
  if (status && status !== 'all') { where += ' AND pl.status = ?'; binds.push(status) }
  if (accountId) { where += ' AND pl.account_id = ?'; binds.push(Number(accountId)) }

  const { results } = await c.env.DB.prepare(
    `SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${where} ORDER BY pl.id DESC LIMIT 300`
  ).bind(...binds).all()
  return c.json({ logs: results || [] })
})

// GET /api/admin/logs/generations
logsApi.get('/api/admin/logs/generations', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`
  ).bind(user.id).all()
  return c.json({ logs: results || [] })
})

// GET /api/admin/logs/health
logsApi.get('/api/admin/logs/health', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`
  ).bind(user.id).all()
  return c.json({ logs: results || [] })
})

export { logsApi }
