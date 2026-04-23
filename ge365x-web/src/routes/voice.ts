// ============================================================
// src/routes/voice.ts — ブランドボイス (v2)
// 現行 brand_voice テーブル直結
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { nowJst } from '../lib/utils'
import { VOICE_TEMPLATES } from '../lib/openai'

const voiceApi = new Hono<AppEnv>()

// GET /api/admin/voice/presets — 5種テンプレ
voiceApi.get('/api/admin/voice/presets', authMiddleware, (c) => {
  return c.json({ templates: VOICE_TEMPLATES })
})

voiceApi.get('/api/admin/voice', authMiddleware, async (c) => {
  const user = c.get('user')!
  const accountId = c.req.query('account_id') || 'default'
  const row = await c.env.DB.prepare(
    'SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1'
  ).bind(accountId, user.id).first()
  return c.json({ voice: row })
})

voiceApi.post('/api/admin/voice', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<any>()
  const acctStr = String(b.account_id ?? 'default')
  const now = nowJst()

  const existing = await c.env.DB.prepare(
    'SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1'
  ).bind(acctStr, user.id).first<{ id: number }>()

  if (existing) {
    await c.env.DB.prepare(
      `UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`
    ).bind(
      b.voice_key ?? null, b.label ?? null, b.tone ?? null, b.worldview ?? null,
      b.personal_story ?? null, b.prohibited_words ?? null, b.sample_posts ?? null,
      b.is_default ? 1 : 0, now, existing.id
    ).run()
    return c.json({ success: true, id: existing.id })
  } else {
    const r = await c.env.DB.prepare(
      `INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      acctStr, user.id,
      b.voice_key ?? null, b.label ?? null, b.tone ?? null, b.worldview ?? null,
      b.personal_story ?? null, b.prohibited_words ?? null, b.sample_posts ?? null,
      b.is_default ? 1 : 0
    ).run()
    return c.json({ success: true, id: r.meta.last_row_id })
  }
})

export { voiceApi }
