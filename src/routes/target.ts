// ============================================================
// src/routes/target.ts — ターゲット設定 (v2)
// 現行 target_templates テーブル直結
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { nowJst } from '../lib/utils'
import { TARGET_TEMPLATES } from '../lib/openai'

const targetApi = new Hono<AppEnv>()

// GET /api/admin/target/presets — 28種テンプレ
targetApi.get('/api/admin/target/presets', authMiddleware, (c) => {
  return c.json({ templates: TARGET_TEMPLATES })
})

// GET /api/admin/target?account_id=... — 保存済を取得
targetApi.get('/api/admin/target', authMiddleware, async (c) => {
  const user = c.get('user')!
  const accountId = c.req.query('account_id') || 'default'
  const row = await c.env.DB.prepare(
    'SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1'
  ).bind(accountId, user.id).first()
  return c.json({ target: row })
})

// POST /api/admin/target — upsert
targetApi.post('/api/admin/target', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<any>()
  const acctStr = String(b.account_id ?? 'default')
  const now = nowJst()

  const existing = await c.env.DB.prepare(
    'SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1'
  ).bind(acctStr, user.id).first<{ id: number }>()

  if (existing) {
    await c.env.DB.prepare(
      `UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`
    ).bind(
      b.template_key ?? null, b.label ?? null, b.age_range ?? null, b.gender ?? null,
      b.genre ?? null, b.occupation ?? null,
      b.pains ?? null, b.desires ?? null, b.purchase_triggers ?? null,
      b.problem ?? null, b.goal ?? null, b.knowledge ?? null,
      b.is_default ? 1 : 0, now, existing.id
    ).run()
    return c.json({ success: true, id: existing.id })
  } else {
    const r = await c.env.DB.prepare(
      `INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      acctStr, user.id,
      b.template_key ?? null, b.label ?? null, b.age_range ?? null, b.gender ?? null,
      b.genre ?? null, b.occupation ?? null,
      b.pains ?? null, b.desires ?? null, b.purchase_triggers ?? null,
      b.problem ?? null, b.goal ?? null, b.knowledge ?? null,
      b.is_default ? 1 : 0
    ).run()
    return c.json({ success: true, id: r.meta.last_row_id })
  }
})

export { targetApi }
