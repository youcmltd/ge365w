// ============================================================
// src/routes/kpi.ts — KPI (v2)
// kpi_metrics テーブル: account_id + metric_date で upsert 済
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'

const kpiApi = new Hono<AppEnv>()

// GET /api/admin/kpi?account_id=...&days=30
kpiApi.get('/api/admin/kpi', authMiddleware, async (c) => {
  const user = c.get('user')!
  const accountId = c.req.query('account_id')
  const days = parseInt(c.req.query('days') || '30', 10)

  const binds: any[] = [user.id, days]
  let where = 'WHERE km.user_id = ? AND km.metric_date >= date(\'now\',\'+9 hours\',\'-\' || ? || \' days\')'
  if (accountId) { where += ' AND km.account_id = ?'; binds.push(Number(accountId)) }

  const { results } = await c.env.DB.prepare(
    `SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${where} ORDER BY km.metric_date DESC, km.account_id ASC`
  ).bind(...binds).all()
  return c.json({ metrics: results || [] })
})

// GET /api/admin/kpi/summary — ダッシュボード用サマリ
kpiApi.get('/api/admin/kpi/summary', authMiddleware, async (c) => {
  const user = c.get('user')!
  const today = await c.env.DB.prepare(
    `SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`
  ).bind(user.id).first<{ sent: number | null; failed: number | null }>()
  const week = await c.env.DB.prepare(
    `SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`
  ).bind(user.id).first<{ sent: number | null; failed: number | null }>()
  return c.json({
    today: { sent: today?.sent ?? 0, failed: today?.failed ?? 0 },
    week:  { sent: week?.sent  ?? 0, failed: week?.failed  ?? 0 },
  })
})

export { kpiApi }
