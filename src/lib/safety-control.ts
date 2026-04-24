// ============================================================
// src/lib/safety-control.ts — 投稿制御ロジック
// 現行 shared/safety-control.js をベースに Hono/D1 に移植
//
// - contentHash(body): SHA-256 先頭16文字
// - prePostCheck: 日次上限 / 15分間隔 / 類似度 / リンク連投 / ハッシュタグ連投
// - acquirePostLock / releasePostLock: 2分ロック（D1 post_locks テーブル）
// - jaccardBigram: 類似度計算
// ============================================================

const te = new TextEncoder()

export type PrePostCheckResult = {
  ok: boolean
  errors: { code: string; message: string; overridable?: boolean }[]
  warnings: string[]
}

export async function contentHash(body: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', te.encode(body || ''))
  const bytes = new Uint8Array(buf)
  return [...bytes].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('')
  // 16 文字（8 バイト = 16 hex chars）
}

// ---------- Jaccard bigram 類似度 ----------
export function bigrams(text: string): Set<string> {
  const t = (text || '').replace(/\s+/g, '').slice(0, 2000)
  const out = new Set<string>()
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2))
  return out
}

export function jaccardBigram(a: string, b: string): number {
  const A = bigrams(a)
  const B = bigrams(b)
  if (A.size === 0 && B.size === 0) return 0
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  const union = A.size + B.size - inter
  return union === 0 ? 0 : inter / union
}

// ---------- 投稿ロック（D1 ベース） ----------
const LOCK_DURATION_MS = 2 * 60 * 1000 // 2 分

export async function acquirePostLock(env: { DB: D1Database }, accountId: number): Promise<boolean> {
  const now = new Date().toISOString()
  const threshold = new Date(Date.now() - LOCK_DURATION_MS).toISOString()

  // 既存ロックが新しければ失敗、古ければ上書き
  const existing = await env.DB.prepare(
    'SELECT account_id, locked_at FROM post_locks WHERE account_id = ?'
  ).bind(accountId).first<{ locked_at: string }>()

  if (existing && existing.locked_at > threshold) return false

  await env.DB.prepare(
    `INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`
  ).bind(accountId, now).run()
  return true
}

export async function releasePostLock(env: { DB: D1Database }, accountId: number): Promise<void> {
  await env.DB.prepare('DELETE FROM post_locks WHERE account_id = ?').bind(accountId).run()
}

// ---------- 事前チェック ----------
//
// 現行 shared/safety-control.js の prePostCheck 準拠:
//   1) 日次投稿上限超過 → blocking
//   2) 直近15分以内に投稿済み → blocking（overridable=true: 強制投稿可）
//   3) 直近5件との類似度 ≥ 0.7 → blocking
//   4) 同一リンク 3回以上 → blocking
//   5) 同一ハッシュタグが 3連続で 80%以上一致 → blocking
//
export async function prePostCheck(
  env: { DB: D1Database },
  accountId: number,
  body: string,
  linkUrl?: string | null,
  hashtags?: string | null
): Promise<PrePostCheckResult> {
  const result: PrePostCheckResult = { ok: true, errors: [], warnings: [] }

  // アカウント情報
  const acc = await env.DB.prepare(
    'SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?'
  ).bind(accountId).first<any>()
  if (!acc) {
    result.ok = false
    result.errors.push({ code: 'account_not_found', message: 'アカウントが存在しません' })
    return result
  }

  // 日次リセット判定（JST）
  const todayJst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10)
  let effectiveCount = acc.daily_post_count || 0
  if (acc.last_daily_reset_date !== todayJst) {
    effectiveCount = 0  // 起点が今日でない → 事実上 0
  }

  // (1) 日次上限
  if (effectiveCount >= (acc.daily_post_limit || 5)) {
    result.errors.push({
      code: 'daily_limit_reached',
      message: `日次投稿上限 (${acc.daily_post_limit}) に達しています`,
    })
  }

  // (2) 最低投稿間隔 15 分
  if (acc.last_posted_at) {
    const lastMs = Date.parse(acc.last_posted_at.replace(' ', 'T') + '+09:00')
    if (!Number.isNaN(lastMs)) {
      const diffMin = (Date.now() - lastMs) / 60000
      if (diffMin < 15) {
        result.errors.push({
          code: 'too_frequent',
          message: `前回投稿から ${Math.floor(diffMin)} 分しか経過していません（最低 15 分）`,
          overridable: true,
        })
      }
    }
  }

  // (3) 類似度チェック（直近5件）
  const { results: recent } = await env.DB.prepare(
    `SELECT id, body FROM post_queue
       WHERE account_id = ? AND status IN ('posted','approved','publishing')
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`
  ).bind(accountId).all<any>()
  for (const p of recent || []) {
    const sim = jaccardBigram(body, p.body || '')
    if (sim >= 0.7) {
      result.errors.push({
        code: 'too_similar',
        message: `過去投稿 (ID: ${p.id}) と類似度 ${sim.toFixed(2)} で重複`,
      })
      break
    }
  }

  // (4) 同一リンク 3 回以上
  if (linkUrl) {
    const cnt = await env.DB.prepare(
      `SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`
    ).bind(accountId, linkUrl).first<{ n: number }>()
    if ((cnt?.n ?? 0) >= 3) {
      result.errors.push({
        code: 'link_spam',
        message: `同一リンクを過去7日で${cnt?.n}回使用しています`,
      })
    }
  }

  // (5) ハッシュタグ連投チェック（現行は 80% 一致で 3 連続時）
  if (hashtags) {
    const tagSet = parseHashtags(hashtags)
    if (tagSet.size > 0) {
      const { results: recentTags } = await env.DB.prepare(
        `SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`
      ).bind(accountId).all<any>()
      if ((recentTags || []).length >= 3) {
        const matches = (recentTags || []).every((r: any) => {
          const s = parseHashtags(r.hashtags || '')
          const inter = [...s].filter((x) => tagSet.has(x)).length
          const similarity = tagSet.size === 0 ? 0 : inter / tagSet.size
          return similarity >= 0.8
        })
        if (matches) {
          result.errors.push({
            code: 'hashtag_spam',
            message: '同一ハッシュタグセットが 3 回連続で 80%以上一致しています',
          })
        }
      }
    }
  }

  // (6) 健全性ステータスによる抑止
  if (acc.health_status === 'risk') {
    result.errors.push({
      code: 'health_risk',
      message: 'アカウント健全性スコアが危険域です。投稿を控えてください。',
    })
  }

  result.ok = result.errors.length === 0
  return result
}

function parseHashtags(s: string): Set<string> {
  return new Set(
    (s || '')
      .split(/[\s,]+/)
      .map((x) => x.trim().replace(/^#/, '').toLowerCase())
      .filter(Boolean)
  )
}

// ---------- 健全性スコア減算 ----------
//
// 現行 account_health_score (100点満点):
//   エラー率: max -40
//   429 rate limit: 1回につき -15
//   類似投稿率: max -30
//   過投稿(15件超): -10
// 30〜59: risk, 60〜79: caution
//
export async function adjustHealthScore(
  env: { DB: D1Database },
  accountId: number,
  eventType: 'error' | 'rate_limit' | 'similar' | 'overpost' | 'recovered',
  delta: number,
  metadata?: Record<string, any>
): Promise<{ score_after: number; status_after: 'healthy' | 'caution' | 'risk' }> {
  const acc = await env.DB.prepare(
    'SELECT account_health_score FROM x_accounts WHERE id = ?'
  ).bind(accountId).first<{ account_health_score: number }>()
  if (!acc) return { score_after: 100, status_after: 'healthy' }

  let newScore = Math.max(0, Math.min(100, (acc.account_health_score ?? 100) + delta))
  const status: 'healthy' | 'caution' | 'risk' =
    newScore >= 80 ? 'healthy' : newScore >= 60 ? 'caution' : 'risk'

  await env.DB.prepare(
    `UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?`
  ).bind(newScore, status, accountId).run()

  await env.DB.prepare(
    `INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(accountId, eventType, delta, newScore, status, metadata ? JSON.stringify(metadata) : null).run()

  return { score_after: newScore, status_after: status }
}
