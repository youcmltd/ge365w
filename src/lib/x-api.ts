// ============================================================
// src/lib/x-api.ts — X API v2 クライアント（OAuth 1.0a User Context）
//
// 現行 shared/x-api.js を Cloudflare Workers 互換に移植。
// Base URL: https://api.x.com/2 （api.twitter.com ではない）
// Upload:   https://upload.x.com/1.1/media/upload.json
// 署名:     HMAC-SHA1 (Web Crypto API)
// ============================================================

const te = new TextEncoder()

export const X_API_BASE = 'https://api.x.com/2'
export const X_UPLOAD_BASE = 'https://upload.x.com/1.1'

export class XApiError extends Error {
  statusCode: number
  errorType: string
  constructor(message: string, statusCode = 0, errorType = 'api_error') {
    super(message)
    this.name = 'XApiError'
    this.statusCode = statusCode
    this.errorType = errorType
  }
}

export class XApiRateLimitError extends XApiError {
  resetAtEpoch?: number
  constructor(resetAtEpoch?: number) {
    super('Rate limited by X API (429)', 429, 'rate_limit')
    this.name = 'XApiRateLimitError'
    this.resetAtEpoch = resetAtEpoch
  }
}

export type OAuth1Credentials = {
  consumerKey: string
  consumerSecret: string
  accessToken: string
  accessTokenSecret: string
}

// ---------------- OAuth 1.0a 署名 ----------------

export function percentEncode(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) =>
    '%' + c.charCodeAt(0).toString(16).toUpperCase()
  )
}

function randomHexStr(n: number): string {
  const a = new Uint8Array(n)
  crypto.getRandomValues(a)
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function generateNonce(): string {
  return randomHexStr(16)
}

async function hmacSha1Base64(key: string, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    te.encode(key),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, te.encode(data))
  const bytes = new Uint8Array(sig)
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s)
}

/**
 * OAuth 1.0a Authorization ヘッダ構築
 * 現行 shared/x-api.js の buildOAuth1Header と同等
 */
export async function buildOAuth1Header(
  method: string,
  url: string,
  creds: OAuth1Credentials,
  extraBodyParams?: Record<string, string>
): Promise<string> {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: creds.consumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: creds.accessToken,
    oauth_version: '1.0',
  }

  const urlObj = new URL(url)
  const allParams: Record<string, string> = { ...oauthParams }
  urlObj.searchParams.forEach((v, k) => { allParams[k] = v })
  if (extraBodyParams) {
    for (const [k, v] of Object.entries(extraBodyParams)) {
      if (v !== undefined && v !== null) allParams[k] = String(v)
    }
  }

  const paramString = Object.keys(allParams)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(allParams[k])}`)
    .join('&')

  const baseString = [
    method.toUpperCase(),
    percentEncode(`${urlObj.origin}${urlObj.pathname}`),
    percentEncode(paramString),
  ].join('&')

  const signingKey = `${percentEncode(creds.consumerSecret)}&${percentEncode(creds.accessTokenSecret)}`
  const signature = await hmacSha1Base64(signingKey, baseString)
  oauthParams.oauth_signature = signature

  const headerParts = Object.keys(oauthParams)
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(', ')

  return `OAuth ${headerParts}`
}

// ---------------- X API 共通リクエスト ----------------

async function xApiRequest(
  method: string,
  path: string,
  body: any,
  creds: OAuth1Credentials
): Promise<any> {
  const url = `${X_API_BASE}${path}`
  const authHeader = await buildOAuth1Header(method, url, creds)

  const init: RequestInit = {
    method,
    headers: {
      authorization: authHeader,
      'content-type': 'application/json',
    },
    signal: AbortSignal.timeout(30000),
  }
  if (body !== undefined) init.body = JSON.stringify(body)

  const res = await fetch(url, init)

  if (res.status === 429) {
    const resetAt = res.headers.get('x-rate-limit-reset')
    throw new XApiRateLimitError(resetAt ? Number(resetAt) : undefined)
  }
  if (!res.ok) {
    const errText = await res.text()
    throw new XApiError(
      `X API ${method} ${path} failed: ${res.status} ${errText.slice(0, 500)}`,
      res.status,
      'api_error'
    )
  }
  if (res.status === 204) return {}
  return res.json()
}

// ---------------- 公開 API ----------------

export async function postToX(creds: OAuth1Credentials, text: string) {
  const data = await xApiRequest('POST', '/tweets', { text }, creds)
  return { id: (data as any)?.data?.id || '', text: (data as any)?.data?.text || text }
}

export async function postToXWithMedia(
  creds: OAuth1Credentials,
  text: string,
  mediaIds?: string[] | null,
  replyToId?: string | null
) {
  const body: any = { text }
  if (mediaIds && mediaIds.length) body.media = { media_ids: mediaIds.slice(0, 4) }
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId }
  const data = await xApiRequest('POST', '/tweets', body, creds)
  return { id: (data as any)?.data?.id || '', text: (data as any)?.data?.text || text }
}

export async function deleteTweet(creds: OAuth1Credentials, tweetId: string) {
  await xApiRequest('DELETE', `/tweets/${tweetId}`, undefined, creds)
}

/**
 * 自分の情報取得 — OAuth 1.0a User Context のみで実行
 * Bearer Token では /users/me は動かない
 */
export async function getMe(creds: OAuth1Credentials) {
  // 事前検証
  if (!creds) throw new XApiError('credentials未設定', 0, 'missing_credentials')
  if (!creds.consumerKey?.trim()) throw new XApiError('API Key未設定', 0, 'missing_credentials')
  if (!creds.consumerSecret?.trim()) throw new XApiError('API Secret未設定', 0, 'missing_credentials')
  if (!creds.accessToken?.trim()) throw new XApiError('Access Token未設定', 0, 'missing_token')
  if (!creds.accessTokenSecret?.trim()) throw new XApiError('Access Token Secret未設定', 0, 'missing_token')

  const data = await xApiRequest(
    'GET',
    '/users/me?user.fields=profile_image_url,public_metrics',
    undefined,
    creds
  )
  return (data as any)?.data
}

/**
 * ユーザーの最近のツイート取得（類似度チェック用）
 */
export async function getUserRecentTweets(
  creds: OAuth1Credentials,
  userId: string,
  maxResults = 20
): Promise<any[]> {
  const data = await xApiRequest(
    'GET',
    `/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,text,in_reply_to_user_id&exclude=replies,retweets`,
    undefined,
    creds
  )
  return (data as any)?.data || []
}

// ---------------- メディアアップロード（Upload API 1.1） ----------------

async function uploadApiRequest(
  method: string,
  path: string,
  creds: OAuth1Credentials,
  queryParams: Record<string, string> | null,
  bodyParams: Record<string, string | number> | null,
  multipartBody: FormData | null
): Promise<any> {
  const urlObj = new URL(`${X_UPLOAD_BASE}${path}`)
  if (queryParams) Object.entries(queryParams).forEach(([k, v]) => urlObj.searchParams.set(k, v))
  const fullUrl = urlObj.toString()

  // OAuth1 署名: form body (application/x-www-form-urlencoded) はシグネチャに含める、multipart は含めない
  const bodyParamsStr: Record<string, string> = {}
  if (bodyParams && !multipartBody) {
    for (const [k, v] of Object.entries(bodyParams)) bodyParamsStr[k] = String(v)
  }
  const authHeader = await buildOAuth1Header(method, fullUrl, creds, bodyParamsStr)

  const init: RequestInit = { method: method.toUpperCase(), headers: { authorization: authHeader } }
  if (multipartBody) {
    init.body = multipartBody
    // content-type は undici が自動で multipart/form-data; boundary=... を付ける
  } else if (bodyParams) {
    init.body = Object.entries(bodyParams).map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    ).join('&')
    ;(init.headers as any)['content-type'] = 'application/x-www-form-urlencoded'
  }

  const res = await fetch(fullUrl, init)
  if (!res.ok) {
    const t = await res.text()
    throw new XApiError(
      `X Upload ${method} ${path} failed: ${res.status} ${t.slice(0, 300)}`,
      res.status,
      'media_upload_failed'
    )
  }
  if (res.status === 204) return {}
  return res.json()
}

/**
 * 画像アップロード（5MB 以下）
 */
export async function uploadImage(
  creds: OAuth1Credentials,
  fileBuffer: ArrayBuffer | Uint8Array,
  mimeType: string
): Promise<{ media_id: string; size: number }> {
  const buf = fileBuffer instanceof Uint8Array ? fileBuffer : new Uint8Array(fileBuffer)
  const form = new FormData()
  form.append('media', new Blob([buf], { type: mimeType }))
  const data = await uploadApiRequest('POST', '/media/upload.json', creds, null, null, form)
  return { media_id: (data as any).media_id_string || String((data as any).media_id), size: (data as any).size }
}

/**
 * 動画アップロード（Chunked: INIT → APPEND → FINALIZE → STATUS）
 */
export async function uploadVideo(
  creds: OAuth1Credentials,
  fileBuffer: ArrayBuffer | Uint8Array,
  mimeType: string
): Promise<{ media_id: string; size: number }> {
  const buf = fileBuffer instanceof Uint8Array ? fileBuffer : new Uint8Array(fileBuffer)
  const total = buf.length

  // INIT
  const initData = await uploadApiRequest(
    'POST', '/media/upload.json', creds, null,
    { command: 'INIT', total_bytes: total, media_type: mimeType, media_category: 'tweet_video' },
    null
  )
  const mediaId = initData.media_id_string || String(initData.media_id)

  // APPEND（4MB チャンク）
  const CHUNK = 4 * 1024 * 1024
  let seg = 0
  for (let offset = 0; offset < total; offset += CHUNK) {
    const chunk = buf.slice(offset, Math.min(offset + CHUNK, total))
    const form = new FormData()
    form.append('command', 'APPEND')
    form.append('media_id', mediaId)
    form.append('segment_index', String(seg))
    form.append('media', new Blob([chunk], { type: mimeType }))
    await uploadApiRequest('POST', '/media/upload.json', creds, null, null, form)
    seg++
  }

  // FINALIZE
  const fin = await uploadApiRequest(
    'POST', '/media/upload.json', creds, null,
    { command: 'FINALIZE', media_id: mediaId }, null
  )

  // STATUS polling
  if ((fin as any).processing_info) {
    let attempts = 0
    while (attempts < 30) {
      await new Promise((r) => setTimeout(r, ((fin as any).processing_info.check_after_secs || 5) * 1000))
      const status = await uploadApiRequest(
        'GET', '/media/upload.json', creds,
        { command: 'STATUS', media_id: mediaId }, null, null
      )
      const pi = (status as any).processing_info
      if (!pi || pi.state === 'succeeded') break
      if (pi.state === 'failed') {
        throw new XApiError('動画処理失敗: ' + (pi.error?.message || ''), 0, 'video_process_failed')
      }
      attempts++
    }
  }
  return { media_id: mediaId, size: total }
}

// ---------------- 便利関数: DB アカウントから creds を復号して組立 ----------------

import { aesDecrypt } from './utils'

export async function buildCredentialsFromAccount(
  env: { ENCRYPTION_KEY: string; X_API_KEY?: string; X_API_SECRET?: string },
  account: { access_token: string | null; access_token_secret: string | null },
  overrideConsumer?: { apiKey?: string; apiSecret?: string }
): Promise<OAuth1Credentials> {
  const consumerKey = (overrideConsumer?.apiKey ?? env.X_API_KEY ?? '').trim()
  const consumerSecret = (overrideConsumer?.apiSecret ?? env.X_API_SECRET ?? '').trim()
  if (!consumerKey || !consumerSecret) {
    throw new XApiError('X API Key/Secret 未設定', 0, 'no_api_key')
  }
  if (!account?.access_token?.trim()) throw new XApiError('Access Token 未設定', 0, 'no_token')
  if (!account?.access_token_secret?.trim()) throw new XApiError('Access Token Secret 未設定', 0, 'no_token_secret')

  let token: string
  let tokenSecret: string
  try {
    token = await aesDecrypt(account.access_token, env.ENCRYPTION_KEY)
  } catch {
    throw new XApiError('Access Token の復号に失敗', 0, 'decrypt_failed')
  }
  try {
    tokenSecret = await aesDecrypt(account.access_token_secret, env.ENCRYPTION_KEY)
  } catch {
    throw new XApiError('Access Token Secret の復号に失敗', 0, 'decrypt_failed')
  }
  if (!token.trim()) throw new XApiError('Access Token が空', 0, 'decrypt_failed')
  if (!tokenSecret.trim()) throw new XApiError('Access Token Secret が空', 0, 'decrypt_failed')

  return { consumerKey, consumerSecret, accessToken: token, accessTokenSecret: tokenSecret }
}
