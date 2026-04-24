// ============================================================
// src/routes/drafts.ts — 下書き (v2)
// 0002_features.sql の drafts テーブル (body, link_url, hashtags, post_mode)
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { nowJst } from '../lib/utils'

const draftsApi = new Hono<AppEnv>()

draftsApi.get('/api/admin/drafts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`
  ).bind(user.id).all()
  return c.json({ drafts: results || [] })
})

draftsApi.post('/api/admin/drafts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<any>()
  if (!b.body) return c.json({ error: 'body required' }, 400)
  const r = await c.env.DB.prepare(
    `INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    user.id, b.account_id ?? null, b.title ?? null,
    b.body, b.link_url ?? null, b.hashtags ?? null, b.post_mode ?? 'body'
  ).run()
  return c.json({ success: true, id: r.meta.last_row_id })
})

draftsApi.put('/api/admin/drafts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.json<any>()
  await c.env.DB.prepare(
    `UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`
  ).bind(
    b.title ?? null, b.body ?? null, b.link_url ?? null, b.hashtags ?? null,
    b.post_mode ?? null, b.account_id ?? null, nowJst(), id, user.id
  ).run()
  return c.json({ success: true })
})

draftsApi.delete('/api/admin/drafts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare('DELETE FROM drafts WHERE id=? AND user_id=?')
    .bind(parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

export { draftsApi }
