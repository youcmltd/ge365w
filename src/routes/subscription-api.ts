// ============================================================
// src/routes/subscription-api.ts — [AxisVault 流用]
// プラン一覧 / 現在の契約状態 / プラン変更 / Stripe・PayPal 連携の入り口
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'

const subscriptionApi = new Hono<AppEnv>()

// ---------- GET /api/subscription/plans ----------
subscriptionApi.get('/api/subscription/plans', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`
  ).all()
  const plans = (results || []).map((p: any) => ({
    ...p,
    features: p.features ? JSON.parse(p.features) : [],
  }))
  return c.json({ plans })
})

// ---------- GET /api/subscription/me ----------
subscriptionApi.get('/api/subscription/me', authMiddleware, async (c) => {
  const user = c.get('user')!
  const row = await c.env.DB.prepare(
    `SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`
  ).bind(user.id).first<any>()

  if (!row) return c.json({ subscription: null })
  return c.json({
    subscription: {
      ...row,
      features: row.features ? JSON.parse(row.features) : [],
    },
  })
})

// ---------- POST /api/subscription/cancel ----------
subscriptionApi.post('/api/subscription/cancel', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    `UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`
  ).bind(user.id).run()

  // TODO: Stripe/PayPal 側のキャンセル API も呼び出す（fetch ベースで）
  return c.json({ ok: true })
})

// ---------- POST /api/subscription/reactivate ----------
subscriptionApi.post('/api/subscription/reactivate', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    `UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`
  ).bind(user.id).run()
  return c.json({ ok: true })
})

// ---------- GET /api/subscription/payments ----------
subscriptionApi.get('/api/subscription/payments', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`
  ).bind(user.id).all()
  return c.json({ payments: results || [] })
})

// ---------- POST /api/subscription/stripe/checkout ----------
// Stripe Checkout セッション作成（実装はシークレットが揃ってから）
subscriptionApi.post('/api/subscription/stripe/checkout', authMiddleware, async (c) => {
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ error: 'stripe_not_configured' }, 501)
  }
  // TODO: fetch 経由で Stripe API を呼ぶ。Node SDK は Workers では使えないため、
  //       HTTPS 直接叩きで実装する。
  return c.json({ error: 'not_implemented_yet' }, 501)
})

// ---------- POST /api/subscription/webhook/stripe ----------
subscriptionApi.post('/api/subscription/webhook/stripe', async (c) => {
  // TODO: Stripe Webhook 署名検証を Web Crypto API で行う
  //       (Node: crypto.createHmac → Web: crypto.subtle.sign('HMAC'))
  return c.json({ received: true })
})

export { subscriptionApi }
