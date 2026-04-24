// ============================================================
// src/lib/types.ts — Hono AppEnv & Row 型定義（v2）
// 現行 GE365x スキーマ準拠
// ============================================================

export type AppEnv = {
  Bindings: {
    DB: D1Database

    // --- 認証・暗号化 ---
    JWT_SECRET: string
    ENCRYPTION_KEY: string
    ADMIN_PASSWORD?: string

    // --- OpenAI / Gemini ---
    OPENAI_API_KEY?: string
    OPENAI_MODEL?: string
    OPENAI_BASE_URL?: string
    GEMINI_API_KEY?: string

    // --- 決済 ---
    STRIPE_SECRET_KEY?: string
    STRIPE_WEBHOOK_SECRET?: string
    PAYPAL_CLIENT_ID?: string
    PAYPAL_SECRET?: string
    PAYPAL_MODE?: string

    // --- 通知 ---
    TELEGRAM_BOT_TOKEN?: string
    TELEGRAM_CHAT_ID?: string

    // --- X (Twitter) API 1.0a - Consumer (App-level) ---
    X_API_KEY?: string           // Consumer Key
    X_API_SECRET?: string        // Consumer Secret
    X_BEARER_TOKEN?: string      // 一部の read-only に使う

    // R2 (メディア用、任意)
    MEDIA_BUCKET?: R2Bucket
  }
  Variables: {
    user?: AuthenticatedUser
  }
}

export type AuthenticatedUser = {
  id: number
  email: string
  is_admin: boolean
  is_approved: boolean
  plan_code?: string
  subscription_status?: string
}

export type UserRow = {
  id: number
  email: string
  password_hash: string
  is_approved: number
  is_admin: number
  trial_start: string | null
  trial_end: string | null
  created_at: string
  updated_at: string
}

export type XAccountRow = {
  id: number
  user_id: number | null
  account_name: string
  x_user_id: string | null
  x_username: string | null
  access_token: string | null          // aesEncrypt 済
  access_token_secret: string | null   // aesEncrypt 済
  daily_post_count: number
  daily_post_limit: number
  last_posted_at: string | null
  account_health_score: number
  health_status: string                // healthy / caution / risk
  is_active: number
  is_current: number
  last_daily_reset_date: string | null
  created_at: string
  updated_at: string
}

export type PostQueueRow = {
  id: number
  platform: string
  account_id: number | null
  user_id: number | null
  body: string | null
  link_url: string | null
  hashtags: string | null
  theme: string | null
  keywords: string | null
  post_mode: string                    // body / 140 / scheduled_once / thread / recurring
  pattern_type: string | null
  generation_type: string | null
  source_type: string | null
  content_hash: string | null
  status: string                       // pending / approved / rejected / publishing / posted / failed / cancelled
  external_post_id: string | null
  scheduled_at: string | null
  base_scheduled_at: string | null
  effective_scheduled_at: string | null
  jitter_enabled: number
  jitter_minutes: number
  collision_avoidance_enabled: number
  min_spacing_seconds: number
  schedule_resolution_log: string | null
  posted_at: string | null
  error_message: string | null
  recurrence_type: string | null
  recurrence_rule: string | null
  recurrence_end_at: string | null
  next_run_at: string | null
  recycle_rule: string | null
  source_post_id: number | null
  min_engagement_score: number
  rewrite_mode: string | null
  thread_parent_id: number | null
  thread_order: number
  thread_count: number
  media_type: string | null
  media_file_path: string | null
  media_json: string | null
  created_at: string
  updated_at: string
}

export type AutopilotJobRow = {
  id: number
  reservation_no: string | null
  account_id: number | null
  user_id: number | null
  channel_type: string
  content_mode: string
  theme: string | null
  keywords: string | null
  prompt_text: string | null
  options_json: string
  title_memo: string | null
  link_url: string | null
  generate_at: string | null
  publish_at: string | null
  status: string                       // draft / configured / generated / publishing / posted / cancelled / error
  generated_post_id: number | null
  external_post_id: string | null
  error_message: string | null
  created_at: string
  updated_at: string
}

export type TargetTemplateRow = {
  id: number
  account_id: string | null
  user_id: number | null
  template_key: string | null
  label: string | null
  age_range: string | null
  gender: string | null
  genre: string | null
  occupation: string | null
  pains: string | null
  desires: string | null
  purchase_triggers: string | null
  problem: string | null
  goal: string | null
  knowledge: string | null
  is_default: number
}

export type BrandVoiceRow = {
  id: number
  account_id: string | null
  user_id: number | null
  voice_key: string | null
  label: string | null
  tone: string | null
  worldview: string | null
  personal_story: string | null
  prohibited_words: string | null
  sample_posts: string | null
  is_default: number
}

export type LicenseRow = {
  id: number
  license_key: string
  license_type: string
  plan_code: string | null
  user_id: number | null
  is_active: number
  activated_at: string | null
  expires_at: string | null
  issued_by: number | null
  note: string | null
  created_at: string
  updated_at: string
}
