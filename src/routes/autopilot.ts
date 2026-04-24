// ============================================================
// src/routes/autopilot.ts — オートパイロット API (v2, 現行完全準拠)
//
// 現行 web/routes/autopilot.js と同じエンドポイント:
//   GET    /api/admin/autopilot/jobs
//   GET    /api/admin/autopilot/jobs/:id
//   POST   /api/admin/autopilot/jobs
//   PUT    /api/admin/autopilot/jobs/:id
//   DELETE /api/admin/autopilot/jobs/:id
//   POST   /api/admin/autopilot/jobs/:id/cancel
//
// 追加 (Web版):
//   POST   /cron/autopilot-tick  — Cloudflare Cron から呼ばれる
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, AutopilotJobRow } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { nowJst } from '../lib/utils'
import { generatePatternPost, generateXPost } from '../lib/openai'
import { contentHash } from '../lib/safety-control'

const autopilotApi = new Hono<AppEnv>()

// GET /api/admin/autopilot/jobs
autopilotApi.get('/api/admin/autopilot/jobs', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results: jobs } = await c.env.DB.prepare(
    `SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`
  ).bind(user.id).all()
  const { results: accounts } = await c.env.DB.prepare(
    'SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1'
  ).bind(user.id).all()
  return c.json({ jobs: jobs || [], accounts: accounts || [] })
})

// GET /api/admin/autopilot/jobs/:id
autopilotApi.get('/api/admin/autopilot/jobs/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const job = await c.env.DB.prepare(
    'SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?'
  ).bind(parseInt(c.req.param('id'), 10), user.id).first()
  if (!job) return c.json({ error: 'not found' })
  return c.json(job)
})

// POST /api/admin/autopilot/jobs
autopilotApi.post('/api/admin/autopilot/jobs', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<any>()
  const now = nowJst()
  const targetDate = ((b.publish_at || b.generate_at || now) as string).slice(0, 10)

  // 同一アカウント×日で 10件まで
  const dayCount = await c.env.DB.prepare(
    `SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND account_id=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status NOT IN ('cancelled')`
  ).bind(user.id, b.account_id || 0, targetDate).first<{ cnt: number }>()
  if ((dayCount?.cnt ?? 0) >= 10) {
    return c.json({ success: false, error: 'この日は既に10件の予約があります' })
  }

  // 連番
  const maxNo = await c.env.DB.prepare(
    'SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs'
  ).first<{ mx: number | null }>()
  const nextNo = String(((maxNo?.mx ?? 0) as number) + 1).padStart(4, '0')

  // publish_at だけあれば generate_at を 2 分前に
  let finalGenAt: string | null = b.generate_at ?? null
  if (b.publish_at && !b.generate_at) {
    try {
      const d = new Date((b.publish_at as string).replace(' ', 'T'))
      d.setMinutes(d.getMinutes() - 2)
      finalGenAt = d.toISOString().replace('T', ' ').slice(0, 19)
    } catch {}
  }
  const status = (finalGenAt || b.publish_at) ? 'configured' : 'draft'

  const r = await c.env.DB.prepare(
    `INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    nextNo, user.id, b.account_id ?? null,
    b.content_mode || 'problem', b.theme || '', b.keywords || '', b.prompt_text || '',
    b.options_json || '{}', b.title_memo || '', b.link_url || '',
    finalGenAt, b.publish_at || null, status, now, now
  ).run()
  return c.json({ success: true, id: r.meta.last_row_id, reservation_no: nextNo })
})

// PUT /api/admin/autopilot/jobs/:id
autopilotApi.put('/api/admin/autopilot/jobs/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.json<any>()
  const now = nowJst()

  let finalGenAt: string | null = b.generate_at ?? null
  if (b.publish_at && !b.generate_at) {
    try {
      const d = new Date((b.publish_at as string).replace(' ', 'T'))
      d.setMinutes(d.getMinutes() - 2)
      finalGenAt = d.toISOString().replace('T', ' ').slice(0, 19)
    } catch {}
  }
  const status = (finalGenAt || b.publish_at) ? 'configured' : 'draft'

  await c.env.DB.prepare(
    `UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`
  ).bind(
    b.content_mode || 'problem', b.theme || '', b.keywords || '', b.prompt_text || '',
    b.options_json || '{}', b.title_memo || '', b.link_url || '',
    finalGenAt, b.publish_at || null, status, now, id, user.id
  ).run()
  return c.json({ success: true })
})

// DELETE /api/admin/autopilot/jobs/:id
autopilotApi.delete('/api/admin/autopilot/jobs/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare('DELETE FROM autopilot_jobs WHERE id=? AND user_id=?')
    .bind(parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// POST /api/admin/autopilot/jobs/:id/cancel
autopilotApi.post('/api/admin/autopilot/jobs/:id/cancel', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    "UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?"
  ).bind(nowJst(), parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// ============================================================
// POST /cron/autopilot-tick — Cron から呼ばれる
//
// generate_at <= NOW かつ status='configured' のジョブを取り、
//   1) ターゲット/ボイスを取得
//   2) OpenAI でツイート本文を生成
//   3) post_queue に INSERT（scheduled_at = publish_at, status='approved', source_type='autopilot'）
//   4) autopilot_jobs を status='generated', generated_post_id=? に更新
//
// /cron/tick 側で publish_at 到来時に送信される想定
// ============================================================
autopilotApi.post('/cron/autopilot-tick', async (c) => {
  if (!c.env.OPENAI_API_KEY) return c.json({ ok: true, skipped: 'no_openai_key' })

  const { results: jobs } = await c.env.DB.prepare(
    `SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND generate_at IS NOT NULL
         AND generate_at <= datetime('now','+9 hours')
       ORDER BY generate_at ASC LIMIT 5`
  ).all<AutopilotJobRow>()

  let generated = 0
  for (const job of jobs || []) {
    try {
      // ターゲット/ボイス
      const acctStr = String(job.account_id ?? 'default')
      let target = await c.env.DB.prepare(
        'SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1'
      ).bind(acctStr, job.user_id).first<any>()
      if (!target) {
        target = await c.env.DB.prepare(
          'SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1'
        ).bind(job.user_id).first<any>()
      }
      let voice = await c.env.DB.prepare(
        'SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1'
      ).bind(acctStr, job.user_id).first<any>()
      if (!voice) {
        voice = await c.env.DB.prepare(
          'SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1'
        ).bind(job.user_id).first<any>()
      }

      // 生成
      let body: string
      if (job.content_mode && job.content_mode !== 'freetext') {
        body = await generatePatternPost(
          c.env.OPENAI_API_KEY, job.content_mode,
          job.theme || '', job.keywords || '',
          target, voice, 'body'
        )
      } else {
        body = await generateXPost(
          c.env.OPENAI_API_KEY,
          job.theme || '', job.keywords || '',
          target, voice, 'body'
        )
      }

      const hash = await contentHash(body)
      const nowStr = nowJst()

      const r = await c.env.DB.prepare(
        `INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, 'body', ?, ?, ?, ?, ?, 'autopilot', 'approved', ?, ?)`
      ).bind(
        job.user_id, job.account_id, body, job.link_url, job.publish_at,
        job.publish_at, job.publish_at, hash, job.content_mode, nowStr, nowStr
      ).run()

      await c.env.DB.prepare(
        "UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?"
      ).bind(r.meta.last_row_id, nowStr, job.id).run()

      generated++
    } catch (e: any) {
      await c.env.DB.prepare(
        "UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?"
      ).bind(e?.message || 'unknown_error', nowJst(), job.id).run()
    }
  }
  return c.json({ ok: true, generated, total: (jobs || []).length })
})

export { autopilotApi }
