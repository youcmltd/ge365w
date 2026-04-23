// ============================================================
// src/routes/chatbot.ts — Chatbot (AI Bot) API (v2, 現行完全準拠)
//
// 現行 web/routes/chatbot.js はローカル JSON ナレッジベースの
// キーワードマッチ。D1 では chatbot_kb テーブル(1行)に JSON を保存。
//
// 現行エンドポイント:
//   GET  /api/admin/chatbot/topics
//   POST /api/admin/chatbot/ask
//   GET  /api/admin/chatbot/topic/:id
//
// Web版で追加:
//   PUT  /api/admin/chatbot/kb  — 管理者が KB JSON を丸ごと更新
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware, adminMiddleware } from '../lib/auth'

type KB = {
  topics: { title: string; keywords: string[]; answer: string }[]
  default_response: string
}

const DEFAULT_KB: KB = {
  topics: [
    {
      title: '投稿の基本',
      keywords: ['投稿', 'ポスト', 'ツイート', 'post', 'tweet'],
      answer: '[新規投稿] タブから本文を入力し「投稿キューへ」で予約できます。即時投稿は [今すぐ投稿] ボタンから。',
    },
    {
      title: 'オートパイロット',
      keywords: ['オートパイロット', 'autopilot', '自動投稿', '自動'],
      answer: '[オートパイロット] タブでジョブを作成すると、指定時刻に OpenAI が投稿案を生成しキューに入ります。',
    },
    {
      title: 'アカウント連携',
      keywords: ['連携', 'アカウント', '追加', 'OAuth', 'トークン'],
      answer: 'X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、[アカウント管理] から追加してください。OAuth 1.0a User Context を使用します。',
    },
    {
      title: 'ライセンス',
      keywords: ['ライセンス', '認証', 'license', 'VPS-GE365X'],
      answer: 'ログイン画面の [ライセンス] タブから VPS-GE365X-XXXXXXXX 形式のキーを入力するとプランが有効化されます。',
    },
    {
      title: '類似度制御',
      keywords: ['類似', '重複', 'ブロック', 'similarity'],
      answer: '同一アカウントの直近5件と Jaccard係数 0.7 以上の類似があると投稿がブロックされます。',
    },
    {
      title: '投稿間隔',
      keywords: ['間隔', '時間', 'cooldown', 'spacing'],
      answer: '最低投稿間隔は15分、推奨は30〜120分のランダム。jitter で ±5分の微分散も付与されます。',
    },
  ],
  default_response: '該当するトピックが見つかりませんでした。[アカウント管理][投稿][オートパイロット][ライセンス] 等のキーワードで試してください。',
}

const chatbotApi = new Hono<AppEnv>()

async function loadKB(env: AppEnv['Bindings']): Promise<KB> {
  const row = await env.DB.prepare('SELECT json_data FROM chatbot_kb WHERE id = 1').first<{ json_data: string }>()
  if (row?.json_data) {
    try { return JSON.parse(row.json_data) as KB } catch {}
  }
  // 初回起動時は DEFAULT_KB を投入
  await env.DB.prepare(
    "INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)"
  ).bind(JSON.stringify(DEFAULT_KB)).run()
  return DEFAULT_KB
}

// GET /api/admin/chatbot/topics
chatbotApi.get('/api/admin/chatbot/topics', authMiddleware, async (c) => {
  const kb = await loadKB(c.env)
  return c.json({
    topics: (kb.topics || []).map((t, i) => ({ id: i, title: t.title, keywords: t.keywords })),
  })
})

// POST /api/admin/chatbot/ask
chatbotApi.post('/api/admin/chatbot/ask', authMiddleware, async (c) => {
  const kb = await loadKB(c.env)
  const body = await c.req.json<{ question?: string; context?: string }>().catch(() => ({}))
  const q = (body.question || '').toLowerCase().trim()
  if (!q) return c.json({ answer: kb.default_response })

  let bestMatch: KB['topics'][number] | null = null
  let bestScore = 0
  for (const t of kb.topics || []) {
    let score = 0
    for (const kw of t.keywords || []) {
      if (q.includes(kw.toLowerCase())) score += kw.length
    }
    if (score > bestScore) { bestScore = score; bestMatch = t }
  }

  if (bestMatch) {
    return c.json({ answer: bestMatch.answer, title: bestMatch.title, matched: true })
  }
  return c.json({ answer: kb.default_response, matched: false })
})

// GET /api/admin/chatbot/topic/:id
chatbotApi.get('/api/admin/chatbot/topic/:id', authMiddleware, async (c) => {
  const kb = await loadKB(c.env)
  const t = (kb.topics || [])[parseInt(c.req.param('id'), 10)]
  if (!t) return c.json({ error: 'トピック未登録' }, 404)
  return c.json({ topic: t })
})

// PUT /api/admin/chatbot/kb — 管理者が KB を更新
chatbotApi.put('/api/admin/chatbot/kb', authMiddleware, adminMiddleware, async (c) => {
  const body = await c.req.json<KB>()
  if (!body || !Array.isArray(body.topics)) return c.json({ error: 'invalid_kb' }, 400)
  await c.env.DB.prepare(
    `INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`
  ).bind(JSON.stringify(body)).run()
  return c.json({ success: true, topic_count: body.topics.length })
})

export { chatbotApi }
