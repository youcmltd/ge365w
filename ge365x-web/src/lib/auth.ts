// ============================================================
// src/lib/auth.ts — [AxisVault 流用] 認証ミドルウェア
// Cookie or Authorization ヘッダの JWT を検証して c.set('user', ...) する
// ブランド: GE365X
// ============================================================

import type { Context, Next } from 'hono'
import type { AppEnv, AuthenticatedUser, UserRow } from './types'
import { verifyJWT, getCookie } from './utils'

export const AUTH_COOKIE = 'ge365x_session'

function extractToken(c: Context<AppEnv>): string | null {
  const h = c.req.header('Authorization') || c.req.header('authorization')
  if (h && h.startsWith('Bearer ')) return h.slice(7)
  return getCookie(c.req.raw, AUTH_COOKIE)
}

/**
 * 認証必須ミドルウェア
 * - 未ログイン: 401
 * - 承認待ち(is_approved=0): 403
 */
export async function authMiddleware(c: Context<AppEnv>, next: Next) {
  const token = extractToken(c)
  if (!token) return c.json({ error: 'unauthenticated' }, 401)

  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload?.uid) return c.json({ error: 'invalid_token' }, 401)

  const row = await c.env.DB.prepare(
    'SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?'
  ).bind(payload.uid).first<UserRow>()
  if (!row) return c.json({ error: 'user_not_found' }, 401)
  if (row.is_approved === 0) return c.json({ error: 'not_approved' }, 403)

  // subscription を解決
  const sub = await c.env.DB.prepare(
    'SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?'
  ).bind(row.id).first<{ plan_code: string; status: string }>()

  const user: AuthenticatedUser = {
    id: row.id,
    email: row.email,
    is_admin: row.is_admin === 1,
    is_approved: row.is_approved === 1,
    plan_code: sub?.plan_code,
    subscription_status: sub?.status,
  }
  c.set('user', user)
  await next()
}

/**
 * 管理者必須ミドルウェア
 */
export async function adminMiddleware(c: Context<AppEnv>, next: Next) {
  // authMiddleware が先に通っている前提
  const user = c.get('user') as AuthenticatedUser | undefined
  if (!user) return c.json({ error: 'unauthenticated' }, 401)
  if (!user.is_admin) return c.json({ error: 'forbidden' }, 403)
  await next()
}

/**
 * アクティブサブスクリプション必須（有料機能のガード）
 * subscription.status が active / trial のみ通す
 */
export async function activeSubscriptionMiddleware(c: Context<AppEnv>, next: Next) {
  const user = c.get('user') as AuthenticatedUser | undefined
  if (!user) return c.json({ error: 'unauthenticated' }, 401)
  const ok = user.subscription_status === 'active' || user.subscription_status === 'trial'
  if (!ok) return c.json({ error: 'subscription_required', status: user.subscription_status }, 402)
  await next()
}

/**
 * 監査ログ記録
 */
export async function logAuthEvent(
  c: Context<AppEnv>,
  eventType: string,
  opts: { userId?: number; email?: string; metadata?: Record<string, any> } = {}
) {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || ''
  const ua = c.req.header('user-agent') || ''
  await c.env.DB.prepare(
    `INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(
      opts.userId ?? null,
      opts.email ?? null,
      eventType,
      ip,
      ua,
      opts.metadata ? JSON.stringify(opts.metadata) : null
    )
    .run()
}
