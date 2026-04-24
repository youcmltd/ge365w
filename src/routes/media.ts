// ============================================================
// src/routes/media.ts — メディア管理 (v2)
// R2 バインディング (MEDIA_BUCKET) が未設定の場合は URL 登録のみ
// ============================================================

import { Hono } from 'hono'
import type { AppEnv } from '../lib/types'
import { authMiddleware } from '../lib/auth'
import { nowJst } from '../lib/utils'

const mediaApi = new Hono<AppEnv>()

mediaApi.get('/api/admin/media', authMiddleware, async (c) => {
  const user = c.get('user')!
  const { results } = await c.env.DB.prepare(
    `SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`
  ).bind(user.id).all()
  return c.json({ assets: results || [] })
})

// POST /api/admin/media — R2 へアップロード (multipart/form-data)
mediaApi.post('/api/admin/media', authMiddleware, async (c) => {
  const user = c.get('user')!
  if (!c.env.MEDIA_BUCKET) {
    return c.json({ error: 'R2 bucket (MEDIA_BUCKET) not configured' }, 501)
  }
  const form = await c.req.parseBody()
  const file = form.file as File | undefined
  if (!file) return c.json({ error: 'file required' }, 400)

  const kind = file.type.startsWith('video/') ? 'video' : 'image'
  const key = `u${user.id}/${Date.now()}-${file.name}`
  await c.env.MEDIA_BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  })

  const r = await c.env.DB.prepare(
    `INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status)
     VALUES (?, ?, ?, ?, ?, ?, 'ready')`
  ).bind(user.id, kind, file.type, file.name, file.size, `/media/${key}`).run()
  return c.json({ success: true, id: r.meta.last_row_id, storage_path: `/media/${key}` })
})

mediaApi.delete('/api/admin/media/:id', authMiddleware, async (c) => {
  const user = c.get('user')!
  const id = parseInt(c.req.param('id'), 10)
  const asset = await c.env.DB.prepare(
    'SELECT storage_path FROM media_assets WHERE id=? AND user_id=?'
  ).bind(id, user.id).first<{ storage_path: string | null }>()
  if (asset?.storage_path?.startsWith('/media/') && c.env.MEDIA_BUCKET) {
    const key = asset.storage_path.slice('/media/'.length)
    await c.env.MEDIA_BUCKET.delete(key).catch(() => {})
  }
  await c.env.DB.prepare('DELETE FROM media_assets WHERE id=? AND user_id=?')
    .bind(id, user.id).run()
  return c.json({ success: true })
})

// GET /media/:key — R2 配信（認証不要でも良いかは運用次第）
mediaApi.get('/media/*', async (c) => {
  if (!c.env.MEDIA_BUCKET) return c.notFound()
  const key = c.req.path.replace(/^\/media\//, '')
  const obj = await c.env.MEDIA_BUCKET.get(key)
  if (!obj) return c.notFound()
  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('etag', obj.httpEtag)
  return new Response(obj.body, { headers })
})

export { mediaApi }
