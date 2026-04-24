// ============================================================
// src/routes/export.ts — 一括ダウンロード（CSV エクスポート）
//
// ユーザー向け:
//   GET /api/admin/export/posts           - 投稿キュー CSV
//   GET /api/admin/export/logs            - 投稿ログ CSV
//   GET /api/admin/export/generations     - AI生成ログ CSV
//   GET /api/admin/export/autopilot       - オートパイロットジョブ CSV
//   GET /api/admin/export/drafts          - 下書き CSV
//   GET /api/admin/export/kpi             - KPI CSV
//   GET /api/admin/export/accounts        - Xアカウント CSV (トークン除外)
//   GET /api/admin/export/targets         - ターゲット設定 CSV
//   GET /api/admin/export/voices          - ブランドボイス CSV
//   GET /api/admin/export/all             - 全データ一括 JSON
//
// 管理者向け:
//   GET /api/admin/export/admin/users     - ユーザー一覧 CSV
//   GET /api/admin/export/admin/licenses  - ライセンス CSV
//   GET /api/admin/export/admin/subs      - サブスクリプション CSV
//   GET /api/admin/export/admin/audit     - 監査ログ CSV
//   GET /api/admin/export/admin/all       - 管理者全データ JSON
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware, adminMiddleware } from '../lib/auth'

const exportApi = new Hono<AppEnv>()

// ---------- CSV ヘルパ ----------

/** 値を CSV セルとして安全にエスケープ */
function csvCell(val: unknown): string {
  if (val === null || val === undefined) return ''
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

/** 行配列 → CSV 文字列（BOM 付き UTF-8 でExcel対応） */
function toCsv(headers: string[], rows: Record<string, unknown>[]): string {
  const BOM = '\uFEFF'
  const headerLine = headers.map(csvCell).join(',')
  const dataLines = rows.map(row =>
    headers.map(h => csvCell(row[h])).join(',')
  )
  return BOM + headerLine + '\n' + dataLines.join('\n')
}

/** CSV レスポンスを生成 */
function csvResponse(csv: string, filename: string): Response {
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  })
}

/** JSON ダウンロードレスポンスを生成 */
function jsonDownloadResponse(data: unknown, filename: string): Response {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  })
}

/** 日時サフィックスを生成 */
function dateSuffix(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`
}

// ============================================================
// ユーザー向けエクスポート
// ============================================================

// --- 投稿キュー ---
exportApi.get('/api/admin/export/posts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const status = c.req.query('status')
  const month = c.req.query('month')

  let where = "WHERE pq.platform='x' AND pq.user_id = ?"
  const params: unknown[] = [user.id]
  if (status && status !== 'all') { where += ' AND pq.status = ?'; params.push(status) }
  if (month) {
    where += " AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?"
    params.push(month)
  }

  const { results } = await c.env.DB.prepare(
    `SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${where} ORDER BY pq.id DESC LIMIT 10000`
  ).bind(...params).all()

  const headers = [
    'id', 'body', 'link_url', 'hashtags', 'post_mode', 'status',
    'account_name', 'x_username',
    'generation_type', 'source_type', 'pattern_type',
    'scheduled_at', 'effective_scheduled_at', 'posted_at',
    'external_post_id', 'error_message',
    'recurrence_type', 'recurrence_rule',
    'thread_parent_id', 'thread_order', 'thread_count',
    'media_type', 'jitter_enabled', 'jitter_minutes',
    'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_posts_${dateSuffix()}.csv`)
})

// --- 投稿ログ ---
exportApi.get('/api/admin/export/logs', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`
  ).bind(user.id).all()

  const headers = [
    'id', 'record_id', 'account_name', 'platform',
    'source_type', 'generation_type', 'post_mode',
    'content', 'content_hash', 'link_url',
    'media_type', 'media_upload_status', 'media_id',
    'thread_parent_id', 'thread_order', 'thread_total_count',
    'scheduled_at', 'executed_at', 'posted_at',
    'status', 'error_message', 'api_response_summary',
    'created_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_post_logs_${dateSuffix()}.csv`)
})

// --- AI生成ログ ---
exportApi.get('/api/admin/export/generations', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`
  ).bind(user.id).all()

  const headers = [
    'id', 'account_id', 'account_name', 'x_username',
    'brand_voice_id', 'target_setting_id',
    'post_mode', 'generation_type', 'output_text',
    'created_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_generation_logs_${dateSuffix()}.csv`)
})

// --- オートパイロット ---
exportApi.get('/api/admin/export/autopilot', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`
  ).bind(user.id).all()

  const headers = [
    'id', 'reservation_no', 'account_id', 'account_name', 'x_username',
    'channel_type', 'content_mode', 'theme', 'keywords', 'prompt_text',
    'title_memo', 'link_url',
    'generate_at', 'publish_at', 'status',
    'generated_post_id', 'external_post_id', 'error_message',
    'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_autopilot_${dateSuffix()}.csv`)
})

// --- 下書き ---
exportApi.get('/api/admin/export/drafts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`
  ).bind(user.id).all()

  const headers = ['id', 'account_id', 'title', 'body', 'link_url', 'hashtags', 'post_mode', 'created_at', 'updated_at']
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_drafts_${dateSuffix()}.csv`)
})

// --- KPI ---
exportApi.get('/api/admin/export/kpi', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`
  ).bind(user.id).all()

  const headers = [
    'id', 'account_id', 'account_name', 'x_username',
    'metric_date', 'posts_sent', 'posts_failed',
    'impressions', 'engagements', 'followers_gained',
    'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_kpi_${dateSuffix()}.csv`)
})

// --- Xアカウント (トークン情報は除外) ---
exportApi.get('/api/admin/export/accounts', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`
  ).bind(user.id).all()

  const headers = [
    'id', 'account_name', 'x_user_id', 'x_username',
    'daily_post_count', 'daily_post_limit', 'last_posted_at',
    'account_health_score', 'health_status', 'is_active', 'is_current',
    'last_daily_reset_date', 'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_accounts_${dateSuffix()}.csv`)
})

// --- ターゲット設定 ---
exportApi.get('/api/admin/export/targets', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`
  ).bind(user.id).all()

  const headers = [
    'id', 'account_id', 'template_key', 'label', 'age_range', 'gender', 'genre', 'occupation',
    'pains', 'desires', 'purchase_triggers', 'problem', 'goal', 'knowledge', 'is_default',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_targets_${dateSuffix()}.csv`)
})

// --- ブランドボイス ---
exportApi.get('/api/admin/export/voices', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`
  ).bind(user.id).all()

  const headers = [
    'id', 'account_id', 'voice_key', 'label', 'tone', 'worldview', 'personal_story',
    'prohibited_words', 'sample_posts', 'is_default',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_voices_${dateSuffix()}.csv`)
})

// --- 全データ一括 JSON ---
exportApi.get('/api/admin/export/all', authMiddleware, async (c) => {
  const user = c.get('user')!
  const uid = user.id

  const [posts, logs, gens, autopilot, drafts, kpi, accounts, targets, voices] = await Promise.all([
    c.env.DB.prepare(
      `SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC`
    ).bind(uid).all(),
    c.env.DB.prepare(
      `SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC`
    ).bind(uid).all(),
  ])

  const data = {
    exported_at: new Date().toISOString(),
    user: { id: user.id, email: user.email },
    posts: posts.results || [],
    post_logs: logs.results || [],
    generation_logs: gens.results || [],
    autopilot_jobs: autopilot.results || [],
    drafts: drafts.results || [],
    kpi_metrics: kpi.results || [],
    x_accounts: accounts.results || [],
    target_templates: targets.results || [],
    brand_voices: voices.results || [],
  }

  return jsonDownloadResponse(data, `ge365x_all_data_${dateSuffix()}.json`)
})

// ============================================================
// 管理者向けエクスポート
// ============================================================

// --- ユーザー一覧 ---
exportApi.get('/api/admin/export/admin/users', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`
  ).all()

  const headers = [
    'id', 'email', 'is_approved', 'is_admin',
    'trial_start', 'trial_end', 'created_at', 'updated_at',
    'plan_code', 'sub_status', 'current_period_end',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_admin_users_${dateSuffix()}.csv`)
})

// --- ライセンス ---
exportApi.get('/api/admin/export/admin/licenses', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`
  ).all()

  const headers = [
    'id', 'license_key', 'license_type', 'plan_code',
    'user_id', 'user_email',
    'is_active', 'activated_at', 'expires_at',
    'issued_by', 'note', 'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_admin_licenses_${dateSuffix()}.csv`)
})

// --- サブスクリプション ---
exportApi.get('/api/admin/export/admin/subs', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.created_at, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`
  ).all()

  const headers = [
    'id', 'user_id', 'user_email',
    'plan_code', 'status', 'started_at', 'current_period_end',
    'cancel_at_period_end', 'created_at', 'updated_at',
  ]
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_admin_subs_${dateSuffix()}.csv`)
})

// --- 監査ログ ---
exportApi.get('/api/admin/export/admin/audit', authMiddleware, adminMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`
  ).all()

  const headers = ['id', 'user_id', 'email', 'event_type', 'ip_address', 'user_agent', 'metadata', 'created_at']
  const csv = toCsv(headers, (results || []) as Record<string, unknown>[])
  return csvResponse(csv, `ge365x_admin_audit_${dateSuffix()}.csv`)
})

// --- 管理者全データ JSON ---
exportApi.get('/api/admin/export/admin/all', authMiddleware, adminMiddleware, async (c) => {
  const [users, subs, licenses, logs, posts, postLogs, accounts] = await Promise.all([
    c.env.DB.prepare(
      `SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
         FROM users ORDER BY id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT s.*, u.email AS user_email
         FROM user_subscriptions s LEFT JOIN users u ON u.id = s.user_id
         ORDER BY s.id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT l.*, u.email AS user_email
         FROM licenses l LEFT JOIN users u ON u.id = l.user_id
         ORDER BY l.id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT id, user_id, email, event_type, ip_address, metadata, created_at
         FROM auth_logs ORDER BY id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT pq.id, pq.user_id, pq.account_id, pq.body, pq.status, pq.post_mode,
              pq.scheduled_at, pq.posted_at, pq.created_at
         FROM post_queue pq ORDER BY pq.id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT id, record_id, user_id, account_id, account_name,
              content, status, posted_at, error_message, created_at
         FROM post_logs ORDER BY id DESC LIMIT 10000`
    ).all(),
    c.env.DB.prepare(
      `SELECT id, user_id, account_name, x_username, account_health_score,
              health_status, is_active, created_at
         FROM x_accounts ORDER BY id DESC LIMIT 10000`
    ).all(),
  ])

  const data = {
    exported_at: new Date().toISOString(),
    users: users.results || [],
    user_subscriptions: subs.results || [],
    licenses: licenses.results || [],
    auth_logs: logs.results || [],
    post_queue: posts.results || [],
    post_logs: postLogs.results || [],
    x_accounts: accounts.results || [],
  }

  return jsonDownloadResponse(data, `ge365x_admin_all_${dateSuffix()}.json`)
})

export { exportApi }
