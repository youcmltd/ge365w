// ============================================================
// src/routes/posts.ts — X Posts API (v2, 現行 posts.js 忠実移植)
//
// 現行 web/routes/posts.js と同じエンドポイント群を実装:
//   GET    /api/admin/posts                 - 一覧（フィルタ付）
//   GET    /api/admin/posts/:id             - 単体
//   POST   /api/admin/posts                 - 作成（全タイプ）
//   POST   /api/admin/posts/generate        - AI 生成
//   POST   /api/admin/posts/:id/approve     - 承認
//   POST   /api/admin/posts/:id/reject      - 却下
//   POST   /api/admin/posts/:id/schedule    - 予約（jitter+衝突回避）
//   POST   /api/admin/posts/:id/post-now    - 即時投稿
//   PUT    /api/admin/posts/:id             - 更新
//   DELETE /api/admin/posts/:id             - 削除
//   POST   /api/admin/posts/:id/cancel      - キャンセル
//   GET    /api/admin/posts-scheduled       - カレンダー用（AP込み）
//   POST   /api/admin/posts/thread          - スレッド作成
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, PostQueueRow, XAccountRow, TargetTemplateRow, BrandVoiceRow } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import {
  generateXPost, generatePatternPost, normalizePostText,
} from '../lib/openai'
import {
  contentHash, prePostCheck, acquirePostLock, releasePostLock, adjustHealthScore,
} from '../lib/safety-control'
import {
  resolveScheduleTime, saveScheduleAudit,
} from '../lib/jitter-service'
import {
  checkUniqueness, createFingerprint, saveFingerprint,
} from '../lib/similarity-guard'
import {
  buildCredentialsFromAccount, postToX, postToXWithMedia, XApiRateLimitError,
} from '../lib/x-api'
import { nowJst } from '../lib/utils'

const postsApi = new Hono<AppEnv>()

// ---------- ヘルパ: ターゲット/ボイス取得 ----------
async function getTargetAndVoice(
  env: AppEnv['Bindings'],
  userId: number,
  accountId: number | null
): Promise<{ target: TargetTemplateRow | null; voice: BrandVoiceRow | null }> {
  const acctStr = String(accountId ?? 'default')

  let target = await env.DB.prepare(
    'SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1'
  ).bind(acctStr, userId).first<TargetTemplateRow>()
  if (!target) {
    target = await env.DB.prepare(
      'SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1'
    ).bind(userId).first<TargetTemplateRow>()
  }

  let voice = await env.DB.prepare(
    'SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1'
  ).bind(acctStr, userId).first<BrandVoiceRow>()
  if (!voice) {
    voice = await env.DB.prepare(
      'SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1'
    ).bind(userId).first<BrandVoiceRow>()
  }
  return { target, voice }
}

// ---------- ヘルパ: Telegram 通知 ----------
async function sendTelegram(env: AppEnv['Bindings'], text: string): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return
  try {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    })
  } catch {}
}

// ---------- ヘルパ: post_logs に記録 ----------
async function logPost(
  env: AppEnv['Bindings'],
  data: Partial<{
    record_id: number; account_id: number | null; user_id: number | null; account_name: string
    source_type: string; generation_type: string | null; post_mode: string; content: string
    content_hash: string; link_url: string | null; media_type: string | null
    media_upload_status: string | null; media_id: string | null
    thread_parent_id: number | null; thread_order: number | null; thread_total_count: number | null
    recycle_source_post_id: number | null; recycle_rule: string | null
    scheduled_at: string | null; executed_at: string; posted_at: string | null
    status: string; error_message: string | null; api_response_summary: string | null
  }>
): Promise<void> {
  try {
    await env.DB.prepare(
      `INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.record_id ?? null, data.account_id ?? null, data.user_id ?? null, data.account_name ?? '',
      data.source_type ?? '', data.generation_type ?? null, data.post_mode ?? 'body',
      data.content ?? '', data.content_hash ?? '', data.link_url ?? '',
      data.media_type ?? null, data.media_upload_status ?? null, data.media_id ?? null,
      data.thread_parent_id ?? null, data.thread_order ?? null, data.thread_total_count ?? null,
      data.recycle_source_post_id ?? null, data.recycle_rule ?? null,
      data.scheduled_at ?? null, data.executed_at ?? nowJst(), data.posted_at ?? null,
      data.status ?? 'posted', data.error_message ?? null, data.api_response_summary ?? null
    ).run()
  } catch (e) {
    console.error('[PostLog]', (e as Error).message)
  }
}

// ============================================================
// エンドポイント
// ============================================================

// GET /api/admin/posts
postsApi.get('/api/admin/posts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const status = c.req.query('status')
  const accountId = c.req.query('account_id')
  const postMode = c.req.query('post_mode')
  const page = parseInt(c.req.query('page') || '1', 10)
  const lim = 50
  const off = (page - 1) * lim

  let where = "WHERE pq.platform='x' AND pq.user_id = ?"
  const params: any[] = [user.id]
  if (status && status !== 'all') { where += ' AND pq.status = ?'; params.push(status) }
  if (accountId) { where += ' AND pq.account_id = ?'; params.push(Number(accountId)) }
  if (postMode && postMode !== 'all') { where += ' AND pq.post_mode = ?'; params.push(postMode) }

  const { results: posts } = await c.env.DB.prepare(
    `SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${where} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`
  ).bind(...params, lim, off).all()

  const count = await c.env.DB.prepare(
    `SELECT COUNT(*) AS total FROM post_queue pq ${where}`
  ).bind(...params).first<{ total: number }>()

  return c.json({ posts: posts || [], total: count?.total ?? 0, page })
})

// GET /api/admin/posts/:id
postsApi.get('/api/admin/posts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const post = await c.env.DB.prepare(
    `SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`
  ).bind(id, user.id).first<any>()
  if (!post) return c.json({ error: 'Not found' }, 404)
  return c.json({ post })
})

// POST /api/admin/posts
postsApi.post('/api/admin/posts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const b = await c.req.json<any>()
  if (!b.body) return c.json({ error: 'body is required' }, 400)
  const now = nowJst()
  const hash = await contentHash(b.body)

  // 予約単発の重複チェック
  if (b.scheduled_at && b.post_mode === 'scheduled_once') {
    const dup = await c.env.DB.prepare(
      `SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
         AND body=? AND COALESCE(link_url,'')=COALESCE(?,'') AND scheduled_at=? AND post_mode='scheduled_once'
         AND status NOT IN ('cancelled','failed')`
    ).bind(user.id, b.account_id || null, b.body, b.link_url || '', b.scheduled_at).first<any>()
    if (dup) return c.json({ success: false, error: `Same content/time already exists (ID:${dup.id})` })
  }

  const r = await c.env.DB.prepare(
    `INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, hashtags,
        post_mode, status, scheduled_at, content_hash, generation_type, source_type,
        recurrence_type, recurrence_rule, recurrence_end_at, next_run_at,
        recycle_rule, source_post_id, min_engagement_score, rewrite_mode,
        thread_parent_id, thread_order, thread_count, media_type, media_file_path,
        created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?, ?,
             ?, ?)`
  ).bind(
    user.id, b.account_id ?? null, b.body, b.link_url ?? null, b.hashtags ?? null,
    b.post_mode ?? 'body', b.status ?? 'pending', b.scheduled_at ?? null, hash,
    b.generation_type ?? null, b.source_type ?? 'manual_post',
    b.recurrence_type ?? null, b.recurrence_rule ?? null, b.recurrence_end_at ?? null, b.next_run_at ?? null,
    b.recycle_rule ?? null, b.source_post_id ?? null, b.min_engagement_score ?? 0, b.rewrite_mode ?? null,
    b.thread_parent_id ?? null, b.thread_order ?? 0, b.thread_count ?? 0,
    b.media_type ?? null, b.media_file_path ?? null,
    now, now
  ).run()
  return c.json({ success: true, id: r.meta.last_row_id })
})

// POST /api/admin/posts/generate
postsApi.post('/api/admin/posts/generate', authMiddleware, async (c) => {
  const user = c.get('user')!
  const apiKey = c.env.OPENAI_API_KEY
  const { theme, keywords, count, pattern_type, post_mode, link_url, hashtags, footer_text, account_id, generation_type } = await c.req.json<any>()
  if (!theme) return c.json({ error: 'theme required' }, 400)
  if (!apiKey) return c.json({ error: 'OPENAI_API_KEY not set' }, 500)

  let assignId = account_id ?? null
  if (!assignId) {
    const d = await c.env.DB.prepare(
      'SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1'
    ).bind(user.id).first<{ id: number }>()
    assignId = d?.id ?? null
  }

  const { target, voice } = await getTargetAndVoice(c.env, user.id, assignId)
  const now = nowJst()
  const generated: any[] = []
  try {
    const times = Math.min(count || 1, 10)
    for (let i = 0; i < times; i++) {
      const mode = post_mode || 'body'
      let finalBody: string
      if (pattern_type) {
        finalBody = await generatePatternPost(apiKey, pattern_type, theme, keywords || '', target, voice, mode)
      } else {
        finalBody = await generateXPost(apiKey, theme, keywords || '', target, voice, mode)
      }
      if (footer_text) finalBody = finalBody.trimEnd() + '\n\n' + (footer_text as string).trim()
      const hash = await contentHash(finalBody)
      const r = await c.env.DB.prepare(
        `INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
      ).bind(
        user.id, assignId, theme, keywords || '', finalBody, link_url || null, hashtags || null, mode,
        pattern_type || null, hash, generation_type || pattern_type || 'general',
        pattern_type ? 'pattern_generated_post' : 'ai_generated_post', now, now
      ).run()
      generated.push({ id: r.meta.last_row_id, body: finalBody, link_url: link_url || '', post_mode: mode })

      // 生成ログ
      try {
        await c.env.DB.prepare(
          `INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          user.id, assignId, voice?.id ?? null, target?.id ?? null, mode,
          pattern_type || 'general', finalBody.slice(0, 500)
        ).run()
      } catch {}
    }
    return c.json({ success: true, generated, count: generated.length })
  } catch (e: any) {
    return c.json({ error: 'AI error: ' + e.message }, 500)
  }
})

// POST /api/admin/posts/:id/approve
postsApi.post('/api/admin/posts/:id/approve', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    "UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?"
  ).bind(nowJst(), parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// POST /api/admin/posts/:id/reject
postsApi.post('/api/admin/posts/:id/reject', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    "UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?"
  ).bind(nowJst(), parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// POST /api/admin/posts/:id/schedule — jitter + 衝突回避
postsApi.post('/api/admin/posts/:id/schedule', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const {
    scheduled_at,
    jitter_enabled = true,
    jitter_minutes = 5,
    collision_avoidance_enabled = true,
    min_spacing_seconds = 90,
  } = await c.req.json<any>()
  if (!scheduled_at) return c.json({ error: 'scheduled_at required' }, 400)

  const post = await c.env.DB.prepare(
    'SELECT * FROM post_queue WHERE id=? AND user_id=?'
  ).bind(id, user.id).first<PostQueueRow>()
  if (!post) return c.json({ success: false, error: 'Not found' }, 404)

  // 類似度チェック
  const simResult = await checkUniqueness(c.env, post.body || '', post.account_id ?? null, {
    check_stage: 'before_save', post_id: post.id,
  })
  if (!simResult.pass) {
    return c.json({
      success: false, error: '類似: ' + simResult.blocked_reason,
      similarity_blocked: true, scores: simResult.scores,
    })
  }

  // jitter + 衝突回避
  const { effective_at, audit } = await resolveScheduleTime(c.env, scheduled_at, {
    jitter_enabled, jitter_minutes, collision_avoidance_enabled, min_spacing_seconds,
    account_id: post.account_id, exclude_id: post.id,
  })

  // fingerprint 保存
  const fp = await createFingerprint(post.body || '')
  await saveFingerprint(c.env, post.id, post.account_id, fp)

  await c.env.DB.prepare(
    `UPDATE post_queue SET
       status='approved', base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=?`
  ).bind(
    scheduled_at, effective_at, effective_at,
    jitter_enabled ? 1 : 0, jitter_minutes, collision_avoidance_enabled ? 1 : 0, min_spacing_seconds,
    JSON.stringify(audit), nowJst(), id
  ).run()

  await saveScheduleAudit(c.env, post.id, post.account_id, audit)

  return c.json({
    success: true,
    base_scheduled_at: scheduled_at,
    effective_scheduled_at: effective_at,
    scheduled_at: effective_at,
    audit,
  })
})

// POST /api/admin/posts/:id/post-now
postsApi.post('/api/admin/posts/:id/post-now', authMiddleware, async (c) => {
  const user = c.get('user')!
  const postId = parseInt(c.req.param('id'), 10)
  const force_override = (await c.req.json<any>().catch(() => ({}))).force_override === true

  const post = await c.env.DB.prepare(
    'SELECT * FROM post_queue WHERE id=? AND user_id=?'
  ).bind(postId, user.id).first<PostQueueRow>()
  if (!post) return c.json({ success: false, error: 'Not found' }, 404)

  // アカウント解決
  let account: XAccountRow | null = null
  if (post.account_id) {
    account = await c.env.DB.prepare(
      'SELECT * FROM x_accounts WHERE id=? AND user_id=?'
    ).bind(post.account_id, user.id).first<XAccountRow>()
  }
  if (!account) {
    account = await c.env.DB.prepare(
      'SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1'
    ).bind(user.id).first<XAccountRow>()
    if (account) {
      await c.env.DB.prepare('UPDATE post_queue SET account_id=? WHERE id=?').bind(account.id, postId).run()
    }
  }
  if (!account) return c.json({ success: false, error: 'No active X account' })

  // 事前チェック
  const check = await prePostCheck(c.env, account.id, post.body || '', post.link_url, post.hashtags)
  const blockErrors = check.errors.filter((e) => !(force_override && e.overridable))
  if (blockErrors.length > 0) {
    const overridable = check.errors.find((e) => e.overridable)
    if (overridable && !force_override) {
      return c.json({ success: false, error: overridable.message, overridable: true, cooldown_override: true })
    }
    return c.json({ success: false, error: 'Safety: ' + blockErrors.map((e) => e.message).join('; ') })
  }

  // 排他ロック取得
  if (!(await acquirePostLock(c.env, account.id))) {
    return c.json({ success: false, error: 'Account busy' })
  }

  try {
    await c.env.DB.prepare(
      "UPDATE post_queue SET status='publishing', updated_at=? WHERE id=?"
    ).bind(nowJst(), postId).run()

    const creds = await buildCredentialsFromAccount(c.env, account)
    let fullText = normalizePostText(post.body || '', post.post_mode)
    if (post.link_url) fullText += '\n' + post.link_url
    if (post.hashtags) fullText += '\n' + post.hashtags

    // メディア処理（media_json があれば media_assets から取り出す）
    // TODO: R2 から buffer を fetch して uploadImage/uploadVideo を呼ぶ
    const xMediaIds: string[] = []
    if (post.media_json) {
      try {
        const localIds: number[] = JSON.parse(post.media_json)
        for (const mid of (localIds || []).slice(0, 4)) {
          const asset = await c.env.DB.prepare(
            'SELECT * FROM media_assets WHERE id=? AND user_id=?'
          ).bind(mid, user.id).first<any>()
          if (asset?.x_media_id) xMediaIds.push(asset.x_media_id)
          // R2 から buffer を取って uploadImage/uploadVideo する実装はメディア管理 ticket で
        }
      } catch {}
    }

    const result = xMediaIds.length > 0
      ? await postToXWithMedia(creds, fullText, xMediaIds, null)
      : await postToX(creds, fullText)

    // 成功記録
    await c.env.DB.prepare(
      "UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?"
    ).bind(result.id || '', nowJst(), nowJst(), postId).run()

    await c.env.DB.prepare(
      `UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+1,
         last_daily_reset_date = DATE('now','+9 hours'), updated_at=? WHERE id=?`
    ).bind(nowJst(), nowJst(), account.id).run()

    await logPost(c.env, {
      record_id: postId, account_id: account.id, user_id: user.id,
      account_name: account.account_name,
      source_type: post.source_type || 'manual_post',
      generation_type: post.generation_type,
      post_mode: post.post_mode, content: post.body || '',
      content_hash: post.content_hash || '', link_url: post.link_url,
      posted_at: nowJst(), status: 'posted',
      api_response_summary: JSON.stringify({ tweet_id: result.id }),
    })

    await sendTelegram(c.env, `X posted @${account.x_username || account.account_name} ID:${result.id}`)
    return c.json({ success: true, tweet_id: result.id })
  } catch (err: any) {
    await c.env.DB.prepare(
      "UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?"
    ).bind(err.message, nowJst(), postId).run()

    await logPost(c.env, {
      record_id: postId, account_id: account.id, user_id: user.id,
      account_name: account.account_name,
      source_type: post.source_type, post_mode: post.post_mode,
      content: post.body || '', content_hash: post.content_hash || '',
      status: 'failed', error_message: err.message,
    })

    // 健全性スコア減算
    if (err instanceof XApiRateLimitError) {
      await adjustHealthScore(c.env, account.id, 'rate_limit', -15)
    } else {
      await adjustHealthScore(c.env, account.id, 'error', -5, { message: err.message })
    }

    await sendTelegram(c.env, `X post FAILED #${postId} ${err.message}`)
    return c.json({ success: false, error: err.message })
  } finally {
    await releasePostLock(c.env, account.id)
  }
})

// PUT /api/admin/posts/:id
postsApi.put('/api/admin/posts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const b = await c.req.json<any>()
  const now = nowJst()
  const hash = b.body ? await contentHash(b.body) : null

  // 部分更新パターン
  if (b.media_json !== undefined && b.body === undefined) {
    await c.env.DB.prepare(
      'UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?'
    ).bind(b.media_json, now, id, user.id).run()
    return c.json({ success: true })
  }
  if (b.account_id !== undefined && b.body === undefined) {
    await c.env.DB.prepare(
      'UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?'
    ).bind(b.account_id, now, id, user.id).run()
    return c.json({ success: true })
  }

  await c.env.DB.prepare(
    `UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`
  ).bind(
    b.body, b.link_url ?? null, b.hashtags ?? null, b.scheduled_at ?? null, b.post_mode ?? 'body',
    b.media_json ?? null, hash,
    b.recurrence_type ?? null, b.recurrence_rule ?? null, b.next_run_at ?? null, b.recurrence_end_at ?? null,
    now, id, user.id
  ).run()
  return c.json({ success: true })
})

// DELETE /api/admin/posts/:id
postsApi.delete('/api/admin/posts/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare('DELETE FROM post_queue WHERE id=? AND user_id=?')
    .bind(parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// POST /api/admin/posts/:id/cancel
postsApi.post('/api/admin/posts/:id/cancel', authMiddleware, async (c) => {
  const user = c.get('user')!
  await c.env.DB.prepare(
    "UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?"
  ).bind(nowJst(), parseInt(c.req.param('id'), 10), user.id).run()
  return c.json({ success: true })
})

// GET /api/admin/posts-scheduled — カレンダー用（AP込み）
postsApi.get('/api/admin/posts-scheduled', authMiddleware, async (c) => {
  const user = c.get('user')!
  const accountId = c.req.query('account_id')
  const binds: any[] = [user.id]
  let where = "WHERE pq.platform='x' AND pq.user_id=? AND pq.scheduled_at IS NOT NULL AND pq.status NOT IN ('cancelled','rejected')"
  if (accountId) { where += ' AND pq.account_id=?'; binds.push(Number(accountId)) }

  const { results: posts } = await c.env.DB.prepare(
    `SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${where} ORDER BY pq.scheduled_at ASC`
  ).bind(...binds).all()

  const apBinds: any[] = [user.id]
  let apWhere = "WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL"
  if (accountId) { apWhere += ' AND aj.account_id=?'; apBinds.push(Number(accountId)) }

  const { results: apJobs } = await c.env.DB.prepare(
    `SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${apWhere} ORDER BY aj.publish_at ASC`
  ).bind(...apBinds).all<any>()

  const apFormatted = (apJobs || []).map((j: any) => ({
    ...j, post_mode: 'body', id: 'ap-' + j.id,
  }))

  const merged = [...(posts || []), ...apFormatted].sort((a: any, b: any) =>
    (a.scheduled_at || '').localeCompare(b.scheduled_at || '')
  )
  return c.json({ posts: merged })
})

// POST /api/admin/posts/thread
postsApi.post('/api/admin/posts/thread', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { tweets, link_url, account_id } = await c.req.json<{
    tweets: { body: string; link_url?: string }[]; link_url?: string; account_id?: number
  }>()
  if (!tweets || !Array.isArray(tweets) || tweets.length < 2) {
    return c.json({ error: 'Thread requires 2+ tweets' }, 400)
  }
  const now = nowJst()
  const parentHash = await contentHash(tweets[0].body)

  const parentRes = await c.env.DB.prepare(
    `INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, 'manual_post', 'pending', ?, ?)`
  ).bind(
    user.id, account_id ?? null, tweets[0].body,
    tweets[0].link_url ?? link_url ?? null, tweets.length, parentHash, now, now
  ).run()
  const parentId = parentRes.meta.last_row_id as number
  const ids: number[] = [parentId]

  for (let i = 1; i < tweets.length; i++) {
    const h = await contentHash(tweets[i].body)
    const r = await c.env.DB.prepare(
      `INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, 'manual_post', 'pending', ?, ?)`
    ).bind(
      user.id, account_id ?? null, tweets[i].body, tweets[i].link_url ?? null,
      parentId, i, h, now, now
    ).run()
    ids.push(r.meta.last_row_id as number)
  }
  return c.json({ success: true, parent_id: parentId, ids })
})

export { postsApi }
