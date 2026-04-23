// ============================================================
// src/routes/api-settings.ts — API設定画面（X API/OpenAI/Telegram）保存・接続テスト
// x_api_settings テーブル + system_settings に保存
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { aesEncrypt, aesDecrypt } from '../lib/utils'

const apiSettingsApi = new Hono<AppEnv>()

// GET /api/admin/api-settings — 自分の API 設定取得
apiSettingsApi.get('/api/admin/api-settings', authMiddleware, async (c) => {
  const user = c.get('user')!
  const x = await c.env.DB.prepare(
    'SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1'
  ).bind(user.id).first<{ api_key: string | null; api_secret: string | null }>()

  const sysRows = await c.env.DB.prepare(
    "SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id')"
  ).all<{ key: string; value: string }>()
  const sys: Record<string, string> = {}
  for (const r of sysRows.results || []) sys[r.key] = r.value

  const apiKey = x?.api_key ? await safeDecrypt(x.api_key, c.env.ENCRYPTION_KEY) : ''
  const apiSecret = x?.api_secret ? '••••••••' : ''
  const openaiKey = sys.openai_api_key ? '••••••••' : ''
  const telegramToken = sys.telegram_bot_token ? '••••••••' : ''

  return c.json({
    api_key: apiKey,
    api_secret: apiSecret,
    openai_key: openaiKey,
    openai_model: sys.openai_model || 'gpt-4o-mini',
    telegram_token: telegramToken,
    telegram_chat_id: sys.telegram_chat_id || '',
  })
})

// POST /api/admin/api-settings/x — X API Consumer Key/Secret 保存
apiSettingsApi.post('/api/admin/api-settings/x', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { api_key, api_secret } = await c.req.json<{ api_key: string; api_secret: string }>()
  if (!api_key || api_key.includes('•')) return c.json({ success: false, error: 'api_key required' }, 400)

  const encKey = await aesEncrypt(api_key.trim(), c.env.ENCRYPTION_KEY)
  const encSecret = api_secret && !api_secret.includes('•')
    ? await aesEncrypt(api_secret.trim(), c.env.ENCRYPTION_KEY)
    : null

  const existing = await c.env.DB.prepare('SELECT id FROM x_api_settings WHERE user_id = ?').bind(user.id).first()
  if (existing) {
    if (encSecret) {
      await c.env.DB.prepare(
        `UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?`
      ).bind(encKey, encSecret, user.id).run()
    } else {
      await c.env.DB.prepare(
        `UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?`
      ).bind(encKey, user.id).run()
    }
  } else {
    await c.env.DB.prepare(
      `INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)`
    ).bind(user.id, encKey, encSecret || '').run()
  }

  return c.json({ success: true })
})

// POST /api/admin/api-settings/openai
apiSettingsApi.post('/api/admin/api-settings/openai', authMiddleware, async (c) => {
  const { openai_key, openai_model } = await c.req.json<{ openai_key: string; openai_model: string }>()

  if (openai_key && !openai_key.includes('•')) {
    const enc = await aesEncrypt(openai_key.trim(), c.env.ENCRYPTION_KEY)
    await upsertSetting(c, 'openai_api_key', enc, 'OpenAI API Key (AES暗号化)')
  }
  if (openai_model) {
    await upsertSetting(c, 'openai_model', openai_model, 'OpenAI モデル名')
  }
  return c.json({ success: true })
})

// POST /api/admin/api-settings/telegram
apiSettingsApi.post('/api/admin/api-settings/telegram', authMiddleware, async (c) => {
  const { telegram_token, telegram_chat_id } = await c.req.json<{ telegram_token: string; telegram_chat_id: string }>()

  if (telegram_token && !telegram_token.includes('•')) {
    const enc = await aesEncrypt(telegram_token.trim(), c.env.ENCRYPTION_KEY)
    await upsertSetting(c, 'telegram_bot_token', enc, 'Telegram Bot Token (AES暗号化)')
  }
  if (telegram_chat_id) {
    await upsertSetting(c, 'telegram_chat_id', telegram_chat_id, 'Telegram Chat ID')
  }
  return c.json({ success: true })
})

// POST /api/admin/api-settings/:kind/test — 接続テスト
apiSettingsApi.post('/api/admin/api-settings/:kind/test', authMiddleware, async (c) => {
  const kind = c.req.param('kind')
  const user = c.get('user')!
  try {
    if (kind === 'x') {
      const row = await c.env.DB.prepare(
        'SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1'
      ).bind(user.id).first<{ api_key: string; api_secret: string }>()
      if (!row?.api_key) return c.json({ success: false, error: 'X API Key 未設定' })
      const k = await safeDecrypt(row.api_key, c.env.ENCRYPTION_KEY)
      return c.json({ success: !!k, message: k ? 'Consumer Key 正常に復号できました' : '復号失敗' })
    }
    if (kind === 'openai') {
      const enc = await getSetting(c, 'openai_api_key')
      if (!enc) return c.json({ success: false, error: 'OpenAI Key 未設定' })
      const key = await safeDecrypt(enc, c.env.ENCRYPTION_KEY)
      if (!key) return c.json({ success: false, error: '復号失敗' })
      const r = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!r.ok) return c.json({ success: false, error: `OpenAI API ${r.status}` })
      return c.json({ success: true, message: 'OpenAI 接続OK' })
    }
    if (kind === 'telegram') {
      const encTok = await getSetting(c, 'telegram_bot_token')
      const chat = await getSetting(c, 'telegram_chat_id')
      if (!encTok || !chat) return c.json({ success: false, error: 'Telegram 未設定' })
      const tok = await safeDecrypt(encTok, c.env.ENCRYPTION_KEY)
      if (!tok) return c.json({ success: false, error: '復号失敗' })
      const r = await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text: '✅ GE365x-web: Telegram 接続テスト成功' }),
      })
      const j = await r.json() as any
      if (!j?.ok) return c.json({ success: false, error: j?.description || 'Telegram 送信失敗' })
      return c.json({ success: true, message: 'Telegram 送信成功' })
    }
    return c.json({ success: false, error: 'unknown kind' }, 400)
  } catch (e: any) {
    return c.json({ success: false, error: e?.message || String(e) })
  }
})

async function upsertSetting(c: any, key: string, value: string, description: string) {
  await c.env.DB.prepare(
    `INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`
  ).bind(key, value, description).run()
}

async function getSetting(c: any, key: string): Promise<string | null> {
  const r = await c.env.DB.prepare('SELECT value FROM system_settings WHERE key = ?').bind(key).first<{ value: string }>()
  return r?.value || null
}

async function safeDecrypt(ciphertext: string, key: string): Promise<string> {
  try {
    return await aesDecrypt(ciphertext, key)
  } catch {
    return ''
  }
}

export { apiSettingsApi }
