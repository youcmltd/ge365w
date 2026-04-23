// ============================================================
// src/routes/x-posts.ts — Cron 消化 (v2, OAuth 1.0a User Context)
//
// 毎分の /cron/tick が pending/approved のキューを拾って X に送信する。
// post-now はフロント側の同名エンドポイント経由で posts.ts が担当。
// ============================================================

import { Hono } from 'hono'
import type { AppEnv, PostQueueRow, XAccountRow } from '../lib/types'
import { nowJst } from '../lib/utils'
import { normalizePostText } from '../lib/openai'
import {
  buildCredentialsFromAccount, postToX, postToXWithMedia, XApiRateLimitError,
} from '../lib/x-api'
import {
  prePostCheck, acquirePostLock, releasePostLock, adjustHealthScore,
} from '../lib/safety-control'

const xPostsApi = new Hono<AppEnv>()

const BATCH_SIZE = 5
const MAX_ATTEMPTS = 3

// POST /cron/tick — Cloudflare Cron から呼ばれる
xPostsApi.post('/cron/tick', async (c) => {
  const nowStr = nowJst()

  // effective_scheduled_at or scheduled_at が NOW 以下、status が pending/approved
  const { results: queue } = await c.env.DB.prepare(
    `SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved')
        AND (
              COALESCE(effective_scheduled_at, scheduled_at) IS NULL
           OR COALESCE(effective_scheduled_at, scheduled_at) <= datetime('now','+9 hours')
        )
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT ?`
  ).bind(BATCH_SIZE).all<PostQueueRow>()

  let processed = 0
  let success = 0
  let failed = 0

  for (const post of queue || []) {
    // acquire 楽観ロック (status='publishing')
    const lock = await c.env.DB.prepare(
      "UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved')"
    ).bind(nowStr, post.id).run()
    if (!lock.success || lock.meta.changes === 0) continue
    processed++

    try {
      if (!post.account_id) throw new Error('account_id is null')
      const account = await c.env.DB.prepare('SELECT * FROM x_accounts WHERE id=?')
        .bind(post.account_id).first<XAccountRow>()
      if (!account) throw new Error('account_not_found')

      // 事前チェック（pre-post check）
      const check = await prePostCheck(c.env, account.id, post.body || '', post.link_url, post.hashtags)
      if (!check.ok) {
        throw new Error('safety: ' + check.errors.map((e) => e.message).join('; '))
      }

      // アカウント個別ロック
      if (!(await acquirePostLock(c.env, account.id))) throw new Error('account_busy')

      try {
        const creds = await buildCredentialsFromAccount(c.env, account)
        let fullText = normalizePostText(post.body || '', post.post_mode)
        if (post.link_url) fullText += '\n' + post.link_url
        if (post.hashtags) fullText += '\n' + post.hashtags

        // 既にアップロード済の x_media_id を集める
        const xMediaIds: string[] = []
        if (post.media_json) {
          try {
            const ids: number[] = JSON.parse(post.media_json)
            for (const mid of (ids || []).slice(0, 4)) {
              const asset = await c.env.DB.prepare('SELECT x_media_id FROM media_assets WHERE id=?')
                .bind(mid).first<{ x_media_id: string | null }>()
              if (asset?.x_media_id) xMediaIds.push(asset.x_media_id)
            }
          } catch {}
        }

        const result = xMediaIds.length > 0
          ? await postToXWithMedia(creds, fullText, xMediaIds, null)
          : await postToX(creds, fullText)

        // 成功
        await c.env.DB.prepare(
          "UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?"
        ).bind(result.id || '', nowJst(), nowJst(), post.id).run()

        await c.env.DB.prepare(
          `UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`
        ).bind(nowJst(), nowJst(), account.id).run()

        // post_logs
        await c.env.DB.prepare(
          `INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`
        ).bind(
          post.id, account.id, post.user_id, account.account_name,
          post.source_type, post.generation_type, post.post_mode,
          post.body || '', post.content_hash || '', post.link_url || '',
          nowJst(), nowJst(), JSON.stringify({ tweet_id: result.id })
        ).run()

        // KPI
        await c.env.DB.prepare(
          `INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`
        ).bind(account.id, post.user_id).run()

        success++
      } finally {
        await releasePostLock(c.env, account.id)
      }
    } catch (e: any) {
      const errMsg = e?.message || 'unknown_error'
      // 失敗記録
      await c.env.DB.prepare(
        "UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?"
      ).bind(errMsg, nowJst(), post.id).run()

      await c.env.DB.prepare(
        `INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 'failed', ?, ?)`
      ).bind(
        post.id, post.account_id, post.user_id,
        post.source_type, post.post_mode, post.body || '', post.content_hash || '',
        errMsg, nowJst()
      ).run()

      // 健全性スコア
      if (post.account_id) {
        if (e instanceof XApiRateLimitError) {
          await adjustHealthScore(c.env, post.account_id, 'rate_limit', -15)
        } else {
          await adjustHealthScore(c.env, post.account_id, 'error', -5, { message: errMsg })
        }
      }

      // KPI (failed)
      if (post.account_id) {
        await c.env.DB.prepare(
          `INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`
        ).bind(post.account_id, post.user_id).run()
      }

      failed++
    }
  }

  return c.json({ ok: true, processed, success, failed, now: nowStr })
})

export { xPostsApi }
