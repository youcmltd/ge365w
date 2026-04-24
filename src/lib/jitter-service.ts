// ============================================================
// src/lib/jitter-service.ts — スケジュール時刻の微分散 + 衝突回避
// 現行 shared/jitter-service.js 準拠
//
// resolveScheduleTime(base_at, opts):
//   1) jitter_enabled なら ±jitter_minutes のランダム加減
//   2) collision_avoidance_enabled なら同一アカウント予約と min_spacing_seconds 以上空ける
//   3) effective_at と audit (JSON) を返す
// ============================================================

type ScheduleAudit = {
  base_at: string
  effective_at: string
  jitter_applied_seconds: number
  collision_adjusted_seconds: number
  ruleset: {
    jitter_enabled: boolean
    jitter_minutes: number
    collision_avoidance_enabled: boolean
    min_spacing_seconds: number
  }
}

function parseJstString(s: string): number {
  // 'YYYY-MM-DD HH:MM:SS' を JST として UTC ms に変換
  if (!s) return Date.now()
  const iso = s.replace(' ', 'T') + '+09:00'
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? Date.now() : ms
}

function formatJst(ms: number): string {
  return new Date(ms + 9 * 3600 * 1000 - new Date(ms).getTimezoneOffset() * 60 * 1000 - ms + ms)
    .toISOString().replace('T', ' ').slice(0, 19)
  // ↑ 単純に JST 固定で出す
}

function toJstString(ms: number): string {
  // ms を JST の 'YYYY-MM-DD HH:MM:SS' に整形
  const d = new Date(ms + 9 * 3600 * 1000)
  return d.toISOString().replace('T', ' ').slice(0, 19)
}

export type ResolveScheduleOptions = {
  jitter_enabled?: boolean
  jitter_minutes?: number
  collision_avoidance_enabled?: boolean
  min_spacing_seconds?: number
  account_id?: number | null
  exclude_id?: number | null
}

/**
 * 予約時刻を解決（jitter + collision 回避）
 * 現行 jitterSvc.resolveScheduleTime と同等の戻り値
 */
export async function resolveScheduleTime(
  env: { DB: D1Database },
  baseAt: string,
  opts: ResolveScheduleOptions
): Promise<{ effective_at: string; audit: ScheduleAudit }> {
  const jitterEnabled = opts.jitter_enabled !== false
  const jitterMinutes = opts.jitter_minutes ?? 5
  const collisionEnabled = opts.collision_avoidance_enabled !== false
  const minSpacing = opts.min_spacing_seconds ?? 90

  let ms = parseJstString(baseAt)
  let jitterSec = 0
  let collisionSec = 0

  // (1) jitter: ±jitter_minutes の範囲でランダム加減
  if (jitterEnabled && jitterMinutes > 0) {
    const delta = Math.floor((Math.random() * 2 - 1) * jitterMinutes * 60)
    jitterSec = delta
    ms += delta * 1000
  }

  // (2) collision 回避
  if (collisionEnabled && opts.account_id) {
    const jstStr = toJstString(ms)
    const bindings: any[] = [opts.account_id, jstStr, jstStr]
    let sql = `
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`
    if (opts.exclude_id) { sql += ' AND id != ?'; bindings.push(opts.exclude_id) }
    sql += ' ORDER BY sat ASC'
    const { results } = await env.DB.prepare(sql).bind(...bindings).all<any>()

    // 最低間隔を確保するため、衝突する時刻があれば後ろにずらす
    let moved = true
    let safety = 0
    while (moved && safety < 30) {
      moved = false
      for (const r of results || []) {
        const otherMs = parseJstString(r.sat)
        const gap = Math.abs(ms - otherMs) / 1000
        if (gap < minSpacing) {
          const adjust = (minSpacing - gap + 1) * 1000 * (ms >= otherMs ? 1 : -1)
          ms += adjust
          collisionSec += Math.floor(adjust / 1000)
          moved = true
        }
      }
      safety++
    }
  }

  const effective_at = toJstString(ms)
  const audit: ScheduleAudit = {
    base_at: baseAt,
    effective_at,
    jitter_applied_seconds: jitterSec,
    collision_adjusted_seconds: collisionSec,
    ruleset: {
      jitter_enabled: jitterEnabled,
      jitter_minutes: jitterMinutes,
      collision_avoidance_enabled: collisionEnabled,
      min_spacing_seconds: minSpacing,
    },
  }
  return { effective_at, audit }
}

/**
 * スケジュール監査ログを保存
 */
export async function saveScheduleAudit(
  env: { DB: D1Database },
  postId: number,
  accountId: number | null | undefined,
  audit: ScheduleAudit
): Promise<void> {
  await env.DB.prepare(
    'INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)'
  ).bind(postId, accountId ?? null, JSON.stringify(audit)).run()
}
