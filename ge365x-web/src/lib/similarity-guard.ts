// ============================================================
// src/lib/similarity-guard.ts — 類似度ガード
// 現行 shared/similarity-guard.js 準拠
// ============================================================

import { bigrams, jaccardBigram, contentHash } from './safety-control'

export const SIMILARITY_THRESHOLD = 0.7

export async function createFingerprint(body: string): Promise<string> {
  const bg = [...bigrams(body)].slice(0, 200)
  const hash = await contentHash(body)
  return JSON.stringify({ bigrams: bg, content_hash: hash })
}

export async function saveFingerprint(
  env: { DB: D1Database },
  postId: number,
  accountId: number | null | undefined,
  fingerprint: string
): Promise<void> {
  await env.DB.prepare(
    'INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)'
  ).bind(postId, accountId ?? null, fingerprint).run()
}

export type UniquenessCheck = {
  pass: boolean
  blocked_reason: string | null
  scores: { post_id: number; similarity: number }[]
}

/**
 * 新規投稿が既存と重複しないかチェック
 * 対象: 同アカウントの直近5件（posted / approved / publishing）
 */
export async function checkUniqueness(
  env: { DB: D1Database },
  body: string,
  accountId: number | null | undefined,
  opts: { check_stage?: string; post_id?: number } = {}
): Promise<UniquenessCheck> {
  const out: UniquenessCheck = { pass: true, blocked_reason: null, scores: [] }
  if (!body || !accountId) return out

  const bindings: any[] = [accountId]
  let sql = `SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`
  if (opts.post_id) { sql += ' AND id != ?'; bindings.push(opts.post_id) }
  sql += ' ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5'

  const { results } = await env.DB.prepare(sql).bind(...bindings).all<any>()
  for (const p of results || []) {
    const sim = jaccardBigram(body, p.body || '')
    out.scores.push({ post_id: p.id, similarity: sim })
    if (sim >= SIMILARITY_THRESHOLD) {
      out.pass = false
      out.blocked_reason = `過去投稿(ID:${p.id})と類似度 ${sim.toFixed(2)} で重複`
      break
    }
  }
  return out
}
