// ============================================================
// src/routes/auth-api.ts — [AxisVault 流用 + license activate 追加]
// ログイン / 登録 / ログアウト / ライセンスキー アクティベート
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, UserRow, LicenseRow } from '../lib/types'
import {
  hashPassword, verifyPassword, signJWT, buildSetCookie,
  isValidLicenseKeyFormat, nowJst,
} from '../lib/utils'
import { authMiddleware, logAuthEvent, AUTH_COOKIE } from '../lib/auth'

const authApi = new Hono<AppEnv>()

// ---------- POST /api/auth/register ----------
authApi.post('/api/auth/register', async (c) => {
  const body = await c.req.json<{ email?: string; password?: string }>()
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 8) {
    return c.json({ error: 'invalid_input' }, 400)
  }

  // 招待制チェック
  const invite = await c.env.DB.prepare(
    "SELECT value FROM system_settings WHERE key='invite_only'"
  ).first<{ value: string }>()
  if (invite?.value === '1') return c.json({ error: 'invite_only' }, 403)

  const exists = await c.env.DB.prepare('SELECT 1 FROM users WHERE email = ?').bind(email).first()
  if (exists) return c.json({ error: 'email_taken' }, 409)

  const hash = await hashPassword(password)

  // trial 日数取得
  const tdRow = await c.env.DB.prepare(
    "SELECT value FROM system_settings WHERE key='trial_days'"
  ).first<{ value: string }>()
  const trialDays = parseInt(tdRow?.value ?? '14', 10)

  const reqApproval = await c.env.DB.prepare(
    "SELECT value FROM system_settings WHERE key='trial_require_approval'"
  ).first<{ value: string }>()
  const requireApproval = reqApproval?.value !== '0'

  const nowIso = nowJst()
  const ins = await c.env.DB.prepare(
    `INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`
  ).bind(email, hash, requireApproval ? 0 : 1, trialDays).run()

  const uid = ins.meta.last_row_id as number

  // subscription を trial で作成
  await c.env.DB.prepare(
    `INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`
  ).bind(uid, trialDays).run()

  await c.env.DB.prepare(
    `INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`
  ).bind(email, uid, trialDays).run()

  await logAuthEvent(c, 'register', { userId: uid, email })

  return c.json({
    ok: true,
    user_id: uid,
    approved: !requireApproval,
    message: requireApproval
      ? '登録を受け付けました。管理者による承認後にログインできます。'
      : '登録が完了しました。ログインしてください。',
  })
})

// ---------- POST /api/auth/login ----------
authApi.post('/api/auth/login', async (c) => {
  const body = await c.req.json<{ email?: string; password?: string }>()
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  if (!email || !password) return c.json({ error: 'invalid_input' }, 400)

  const user = await c.env.DB.prepare(
    'SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?'
  ).bind(email).first<UserRow>()
  if (!user) {
    await logAuthEvent(c, 'login_fail', { email, metadata: { reason: 'no_user' } })
    return c.json({ error: 'invalid_credentials' }, 401)
  }
  const ok = await verifyPassword(password, user.password_hash)
  if (!ok) {
    await logAuthEvent(c, 'login_fail', { userId: user.id, email, metadata: { reason: 'bad_password' } })
    return c.json({ error: 'invalid_credentials' }, 401)
  }
  if (user.is_approved === 0) {
    await logAuthEvent(c, 'login_blocked', { userId: user.id, email, metadata: { reason: 'not_approved' } })
    return c.json({ error: 'not_approved' }, 403)
  }

  const token = await signJWT(
    { uid: user.id, email: user.email, adm: user.is_admin === 1 },
    c.env.JWT_SECRET,
    60 * 60 * 24 * 7
  )
  const cookie = buildSetCookie(AUTH_COOKIE, token, { maxAge: 60 * 60 * 24 * 7 })

  await logAuthEvent(c, 'login_success', { userId: user.id, email })

  return new Response(
    JSON.stringify({ ok: true, user_id: user.id, email: user.email, is_admin: user.is_admin === 1 }),
    { headers: { 'content-type': 'application/json', 'set-cookie': cookie } }
  )
})

// ---------- POST /api/auth/logout ----------
authApi.post('/api/auth/logout', async (c) => {
  const user = c.get('user')
  if (user) await logAuthEvent(c, 'logout', { userId: user.id, email: user.email })
  const cookie = buildSetCookie(AUTH_COOKIE, '', { maxAge: 0 })
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json', 'set-cookie': cookie },
  })
})

// ---------- GET /api/auth/me ----------
authApi.get('/api/auth/me', authMiddleware, (c) => {
  return c.json({ ok: true, user: c.get('user') })
})

// ---------- POST /api/auth/license/activate ----------
//
// 指示書 §3-2 / §7 に従い、ライセンスキーを現在のユーザーに紐付け、
// user_subscriptions を plan_code の active に更新する。
//
authApi.post('/api/auth/license/activate', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { license_key } = await c.req.json<{ license_key?: string }>()
  if (!license_key || !isValidLicenseKeyFormat(license_key)) {
    return c.json({ error: 'invalid_license_format' }, 400)
  }

  const key = license_key.trim().toUpperCase()
  const license = await c.env.DB.prepare(
    'SELECT * FROM licenses WHERE license_key = ?'
  ).bind(key).first<LicenseRow>()

  if (!license) return c.json({ error: 'license_not_found' }, 404)
  if (license.is_active === 0) return c.json({ error: 'license_inactive' }, 409)
  if (license.expires_at && license.expires_at < nowJst())
    return c.json({ error: 'license_expired' }, 409)
  if (license.user_id && license.user_id !== user.id)
    return c.json({ error: 'license_already_used' }, 409)

  // ライセンスをユーザーに紐付け
  await c.env.DB.prepare(
    `UPDATE licenses
       SET user_id = ?, activated_at = COALESCE(activated_at, datetime('now','+9 hours')),
           updated_at = datetime('now','+9 hours')
     WHERE id = ?`
  ).bind(user.id, license.id).run()

  // subscription を更新（plan_code が licenses 側で指定されていれば適用）
  const planCode = license.plan_code || 'ge365x_standard'
  const statusAfter = license.license_type === 'trial' ? 'trial' : 'active'
  const periodEnd = license.expires_at
    ? license.expires_at
    : license.license_type === 'lifetime'
      ? '2099-12-31 23:59:59'
      : null

  await c.env.DB.prepare(
    `INSERT INTO user_subscriptions
       (user_id, plan_code, status, started_at, current_period_end, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'), ?, datetime('now','+9 hours'))
     ON CONFLICT(user_id) DO UPDATE SET
       plan_code = excluded.plan_code,
       status    = excluded.status,
       current_period_end = excluded.current_period_end,
       updated_at = datetime('now','+9 hours')`
  ).bind(user.id, planCode, statusAfter, periodEnd).run()

  // ユーザーが未承認なら、ライセンス投入で承認扱いにする（指示書 §7）
  await c.env.DB.prepare(
    `UPDATE users
       SET is_approved = 1, updated_at = datetime('now','+9 hours')
     WHERE id = ? AND is_approved = 0`
  ).bind(user.id).run()

  await c.env.DB.prepare(
    `INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent)
     VALUES (?, ?, 'activated', ?, ?)`
  ).bind(
    license.id,
    user.id,
    c.req.header('cf-connecting-ip') || '',
    c.req.header('user-agent') || ''
  ).run()

  await logAuthEvent(c, 'license_activate', {
    userId: user.id, email: user.email,
    metadata: { license_id: license.id, plan_code: planCode },
  })

  return c.json({
    ok: true,
    plan_code: planCode,
    status: statusAfter,
    license_type: license.license_type,
    expires_at: periodEnd,
  })
})

// ---------- POST /api/auth/password/change ----------
authApi.post('/api/auth/password/change', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { current_password, new_password } = await c.req.json<{
    current_password?: string; new_password?: string
  }>()
  if (!current_password || !new_password || new_password.length < 8)
    return c.json({ error: 'invalid_input' }, 400)

  const row = await c.env.DB.prepare('SELECT password_hash FROM users WHERE id = ?')
    .bind(user.id).first<{ password_hash: string }>()
  if (!row) return c.json({ error: 'user_not_found' }, 404)

  const ok = await verifyPassword(current_password, row.password_hash)
  if (!ok) return c.json({ error: 'invalid_credentials' }, 401)

  const hash = await hashPassword(new_password)
  await c.env.DB.prepare(
    "UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?"
  ).bind(hash, user.id).run()

  await logAuthEvent(c, 'password_change', { userId: user.id, email: user.email })
  return c.json({ ok: true })
})

export { authApi }
