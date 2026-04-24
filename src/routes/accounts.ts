// ============================================================
// src/routes/accounts.ts — X アカウント管理 (v2, OAuth 1.0a)
//
// 現行は Developer Portal で取得した Access Token / Secret を
// 手動入力する方式（ブラウザリダイレクトフロー不要）。
// Web版でも同じく、画面からユーザーが貼り付け → aesEncrypt で保存。
// 接続テストに getMe() を呼んで成功すれば is_active=1 / x_user_id/x_username を反映。
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, XAccountRow } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { aesEncrypt, aesDecrypt, nowJst } from '../lib/utils'
import { buildCredentialsFromAccount, getMe, XApiError } from '../lib/x-api'

const accountsApi = new Hono<AppEnv>()

// GET /api/admin/accounts — 自分のアカウント一覧
accountsApi.get('/api/admin/accounts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`
  ).bind(user.id).all()
  return c.json({ accounts: results || [] })
})

// POST /api/admin/accounts — 新規追加（Access Token / Secret 手動登録）
accountsApi.post('/api/admin/accounts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<{
    account_name: string
    access_token: string
    access_token_secret: string
    daily_post_limit?: number
  }>()
  if (!b.account_name) return c.json({ error: 'account_name required' }, 400)
  if (!b.access_token?.trim() || !b.access_token_secret?.trim()) {
    return c.json({ error: 'access_token and access_token_secret required' }, 400)
  }

  const encToken = await aesEncrypt(b.access_token.trim(), c.env.ENCRYPTION_KEY)
  const encSecret = await aesEncrypt(b.access_token_secret.trim(), c.env.ENCRYPTION_KEY)

  const r = await c.env.DB.prepare(
    `INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`
  ).bind(user.id, b.account_name, encToken, encSecret, b.daily_post_limit ?? 5).run()

  return c.json({ success: true, id: r.meta.last_row_id })
})

// POST /api/admin/accounts/:id/test — 接続テスト (getMe + x_user_id/x_username 反映)
accountsApi.post('/api/admin/accounts/:id/test', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const account = await c.env.DB.prepare(
    'SELECT * FROM x_accounts WHERE id=? AND user_id=?'
  ).bind(id, user.id).first<XAccountRow>()
  if (!account) return c.json({ success: false, error: 'not_found' }, 404)

  try {
    const creds = await buildCredentialsFromAccount(c.env, account)
    const me = await getMe(creds)
    if (me?.id) {
      await c.env.DB.prepare(
        `UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           updated_at=? WHERE id=?`
      ).bind(me.id, me.username || null, nowJst(), id).run()
    }
    return c.json({ success: true, me })
  } catch (e: any) {
    const statusCode = e instanceof XApiError ? e.statusCode : 0
    return c.json({ success: false, error: e.message, status_code: statusCode, error_type: (e as XApiError)?.errorType })
  }
})

// POST /api/admin/accounts/:id/current — サイドバーで「現在のアカウント」に設定
accountsApi.post('/api/admin/accounts/:id/current', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.batch([
    c.env.DB.prepare('UPDATE x_accounts SET is_current=0 WHERE user_id=?').bind(user.id),
    c.env.DB.prepare('UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?').bind(nowJst(), id, user.id),
  ])
  return c.json({ success: true })
})

// POST /api/admin/accounts/:id/toggle — 有効/停止切替
accountsApi.post('/api/admin/accounts/:id/toggle', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  await c.env.DB.prepare(
    "UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?"
  ).bind(nowJst(), id, user.id).run()
  return c.json({ success: true })
})

// PUT /api/admin/accounts/:id — 名前/上限の更新 + トークン差し替え
accountsApi.put('/api/admin/accounts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.json<any>()

  const updates: string[] = []
  const binds: any[] = []
  if (b.account_name) { updates.push('account_name=?'); binds.push(b.account_name) }
  if (b.daily_post_limit !== undefined) { updates.push('daily_post_limit=?'); binds.push(b.daily_post_limit) }
  if (b.access_token?.trim()) {
    const enc = await aesEncrypt(b.access_token.trim(), c.env.ENCRYPTION_KEY)
    updates.push('access_token=?'); binds.push(enc)
  }
  if (b.access_token_secret?.trim()) {
    const enc = await aesEncrypt(b.access_token_secret.trim(), c.env.ENCRYPTION_KEY)
    updates.push('access_token_secret=?'); binds.push(enc)
  }
  if (updates.length === 0) return c.json({ success: false, error: 'no_fields' })
  updates.push('updated_at=?')
  binds.push(nowJst(), id, user.id)

  await c.env.DB.prepare(
    `UPDATE x_accounts SET ${updates.join(', ')} WHERE id=? AND user_id=?`
  ).bind(...binds).run()
  return c.json({ success: true })
})

// DELETE /api/admin/accounts/:id
accountsApi.delete('/api/admin/accounts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare('DELETE FROM x_accounts WHERE id=? AND user_id=?')
    .bind(parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

export { accountsApi }
