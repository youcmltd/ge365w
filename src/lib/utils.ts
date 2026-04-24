// ============================================================
// src/lib/utils.ts — [AxisVault 流用] Web Crypto ユーティリティ
// ハッシュ / 検証 / 乱数 / AES-GCM / ライセンスキー生成
// ============================================================

const te = new TextEncoder()
const td = new TextDecoder()

// ---------- base64 ----------
export function b64encode(bytes: Uint8Array): string {
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s)
}
export function b64decode(str: string): Uint8Array {
  const bin = atob(str)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}
export function b64urlEncode(bytes: Uint8Array): string {
  return b64encode(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
export function b64urlDecode(str: string): Uint8Array {
  const pad = '='.repeat((4 - (str.length % 4)) % 4)
  return b64decode((str + pad).replace(/-/g, '+').replace(/_/g, '/'))
}

// ---------- 乱数 ----------
export function randomBytes(n: number): Uint8Array {
  const a = new Uint8Array(n)
  crypto.getRandomValues(a)
  return a
}
export function randomHex(n: number): string {
  return [...randomBytes(n)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// ---------- PBKDF2 パスワードハッシュ ----------
const PBKDF2_ITER = 100_000
const PBKDF2_KEYLEN = 32

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const baseKey = await crypto.subtle.importKey(
    'raw',
    te.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITER, hash: 'SHA-256' },
    baseKey,
    PBKDF2_KEYLEN * 8
  )
  return `pbkdf2$${PBKDF2_ITER}$${b64encode(salt)}$${b64encode(new Uint8Array(bits))}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [algo, iterStr, saltB64, hashB64] = stored.split('$')
    if (algo !== 'pbkdf2') return false
    const iter = parseInt(iterStr, 10)
    const salt = b64decode(saltB64)
    const expected = b64decode(hashB64)
    const baseKey = await crypto.subtle.importKey(
      'raw',
      te.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    )
    const bits = new Uint8Array(
      await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' },
        baseKey,
        expected.length * 8
      )
    )
    return timingSafeEqual(bits, expected)
  } catch {
    return false
  }
}

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

// ---------- HMAC (JWT) ----------
async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    te.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function signJWT(
  payload: Record<string, any>,
  secret: string,
  expiresInSec = 60 * 60 * 24 * 7
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const body = { iat: now, exp: now + expiresInSec, ...payload }
  const header = b64urlEncode(te.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const payloadB64 = b64urlEncode(te.encode(JSON.stringify(body)))
  const signingInput = `${header}.${payloadB64}`
  const key = await hmacKey(secret)
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, te.encode(signingInput)))
  return `${signingInput}.${b64urlEncode(sig)}`
}

export async function verifyJWT(token: string, secret: string): Promise<any | null> {
  try {
    const [h, p, s] = token.split('.')
    if (!h || !p || !s) return null
    const key = await hmacKey(secret)
    const ok = await crypto.subtle.verify('HMAC', key, b64urlDecode(s), te.encode(`${h}.${p}`))
    if (!ok) return null
    const payload = JSON.parse(td.decode(b64urlDecode(p)))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

// ---------- AES-GCM (X トークン暗号化用) ----------
async function aesKey(keyMaterial: string): Promise<CryptoKey> {
  // 32バイト固定。短ければ SHA-256 で伸ばす
  const raw = te.encode(keyMaterial)
  const material = raw.length >= 32
    ? raw.slice(0, 32)
    : new Uint8Array(await crypto.subtle.digest('SHA-256', raw))
  return crypto.subtle.importKey('raw', material, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
}

export async function aesEncrypt(plaintext: string, keyMaterial: string): Promise<string> {
  const iv = randomBytes(12)
  const key = await aesKey(keyMaterial)
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, te.encode(plaintext))
  )
  const out = new Uint8Array(iv.length + cipher.length)
  out.set(iv)
  out.set(cipher, iv.length)
  return b64encode(out)
}

export async function aesDecrypt(blob: string, keyMaterial: string): Promise<string> {
  const raw = b64decode(blob)
  const iv = raw.slice(0, 12)
  const cipher = raw.slice(12)
  const key = await aesKey(keyMaterial)
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher)
  return td.decode(plain)
}

// ---------- ライセンスキー生成 ----------
// 書式: VPS-GE365X-XXXXXXXX  （大文字英数、類似文字を除外）
const LICENSE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 0/O/1/I を除外
export function generateLicenseKey(prefix = 'VPS-GE365X'): string {
  const bytes = randomBytes(8)
  let code = ''
  for (let i = 0; i < 8; i++) code += LICENSE_ALPHABET[bytes[i] % LICENSE_ALPHABET.length]
  return `${prefix}-${code}`
}
export function isValidLicenseKeyFormat(key: string): boolean {
  return /^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(key.trim())
}

// ---------- misc ----------
export function nowJst(): string {
  // D1/SQLite 互換の '+9h' 表現と一致する文字列
  const d = new Date(Date.now() + 9 * 60 * 60 * 1000)
  return d.toISOString().replace('T', ' ').slice(0, 19)
}

export function json(data: any, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json; charset=utf-8', ...(init?.headers || {}) },
  })
}

export function getCookie(req: Request, name: string): string | null {
  const cookie = req.headers.get('cookie') || ''
  const hit = cookie.split(';').map((s) => s.trim()).find((s) => s.startsWith(name + '='))
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null
}

export function buildSetCookie(name: string, value: string, opts: {
  maxAge?: number; path?: string; httpOnly?: boolean; secure?: boolean; sameSite?: 'Lax'|'Strict'|'None'
} = {}): string {
  const parts = [`${name}=${encodeURIComponent(value)}`]
  parts.push(`Path=${opts.path ?? '/'}`)
  if (opts.maxAge !== undefined) parts.push(`Max-Age=${opts.maxAge}`)
  if (opts.httpOnly !== false) parts.push('HttpOnly')
  if (opts.secure !== false) parts.push('Secure')
  parts.push(`SameSite=${opts.sameSite ?? 'Lax'}`)
  return parts.join('; ')
}
