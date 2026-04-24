-- ============================================================
-- 0001_initial.sql — ge365x-web 初期スキーマ (v2, 現行GE365x忠実移植版)
--
-- 現行 GE365x の shared/db.js / migrations/001_initial_x.sql を D1 向けに変換
-- カラム名・テーブル名は現行と完全一致（body/account_id/link_url/hashtags/post_mode 等）
-- 先頭に AxisVault 流用の users/sessions/auth_logs/system_settings を同梱
-- ============================================================

-- ------------------------------------------------------------
-- [AxisVault 流用] 認証基盤
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_approved INTEGER NOT NULL DEFAULT 0,
  is_admin INTEGER NOT NULL DEFAULT 0,
  trial_start TEXT,
  trial_end TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now', '+9 hours'))
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_approved ON users(is_approved);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

CREATE TABLE IF NOT EXISTS auth_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  email TEXT,
  event_type TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created ON auth_logs(created_at);

CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] X アカウント
-- 現行 x_accounts: account_name, x_user_id, x_username,
--   access_token(暗号化), access_token_secret(暗号化),
--   daily_post_count, daily_post_limit, last_posted_at,
--   account_health_score, is_active, is_current …
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS x_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,                           -- Web版で追加: 所有者（マルチテナント対応）
  account_name TEXT NOT NULL,
  x_user_id TEXT,
  x_username TEXT,
  access_token TEXT,                         -- encrypt() で暗号化済み
  access_token_secret TEXT,                  -- encrypt() で暗号化済み
  daily_post_count INTEGER DEFAULT 0,
  daily_post_limit INTEGER DEFAULT 5,
  last_posted_at TEXT,
  account_health_score INTEGER DEFAULT 100,
  health_status TEXT DEFAULT 'healthy',      -- healthy / caution / risk
  is_active INTEGER DEFAULT 1,
  is_current INTEGER DEFAULT 0,              -- サイドバーで現在選択中のアカウント
  last_daily_reset_date TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_x_accounts_user ON x_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_x_accounts_active ON x_accounts(is_active);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 投稿キュー
-- post_mode: body / scheduled_once / thread / recurring / recycle
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS post_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT DEFAULT 'x',
  account_id INTEGER,
  user_id INTEGER,                           -- Web版で追加
  body TEXT,                                 -- 本文（現行: body）
  link_url TEXT,                             -- リンク別管理
  hashtags TEXT,                             -- ハッシュタグ別管理
  theme TEXT,
  keywords TEXT,
  post_mode TEXT DEFAULT 'body',             -- body / 140 / scheduled_once / thread / recurring
  pattern_type TEXT,                         -- problem / before_after / contrarian / howto / numbers
  generation_type TEXT,                      -- general / ai_generated_post / pattern_generated_post
  source_type TEXT,                          -- manual_post / ai_generated_post / pattern_generated_post / autopilot / recycle
  content_hash TEXT,                         -- SHA-256 先頭16文字
  status TEXT DEFAULT 'pending',             -- pending / approved / rejected / publishing / posted / failed / cancelled
  external_post_id TEXT,                     -- 投稿後の tweet_id
  scheduled_at TEXT,
  base_scheduled_at TEXT,                    -- jitter 適用前の元時刻
  effective_scheduled_at TEXT,               -- jitter 適用後の最終時刻
  jitter_enabled INTEGER DEFAULT 1,
  jitter_minutes INTEGER DEFAULT 5,
  collision_avoidance_enabled INTEGER DEFAULT 1,
  min_spacing_seconds INTEGER DEFAULT 90,
  schedule_resolution_log TEXT,
  posted_at TEXT,
  error_message TEXT,
  -- recurring
  recurrence_type TEXT,
  recurrence_rule TEXT,
  recurrence_end_at TEXT,
  next_run_at TEXT,
  -- recycle
  recycle_rule TEXT,
  source_post_id INTEGER,
  min_engagement_score INTEGER DEFAULT 0,
  rewrite_mode TEXT,
  -- thread
  thread_parent_id INTEGER,
  thread_order INTEGER DEFAULT 0,
  thread_count INTEGER DEFAULT 0,
  -- media
  media_type TEXT,                           -- image / video
  media_file_path TEXT,
  media_json TEXT,                           -- JSON array of media_assets.id
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (account_id) REFERENCES x_accounts(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_post_queue_account ON post_queue(account_id);
CREATE INDEX IF NOT EXISTS idx_post_queue_user ON post_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_post_queue_status ON post_queue(status);
CREATE INDEX IF NOT EXISTS idx_post_queue_sched ON post_queue(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_post_queue_thread ON post_queue(thread_parent_id);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 投稿ログ（post_logs）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS post_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  record_id INTEGER,                         -- post_queue.id
  account_id INTEGER,
  user_id INTEGER,                           -- Web版で追加
  account_name TEXT,
  platform TEXT DEFAULT 'x',
  source_type TEXT,
  generation_type TEXT,
  post_mode TEXT,
  content TEXT,
  content_hash TEXT,
  link_url TEXT,
  media_type TEXT,
  media_upload_status TEXT,
  media_id TEXT,
  thread_parent_id INTEGER,
  thread_order INTEGER,
  thread_total_count INTEGER,
  recycle_source_post_id INTEGER,
  recycle_rule TEXT,
  scheduled_at TEXT,
  executed_at TEXT,
  posted_at TEXT,
  status TEXT,                               -- posted / failed
  error_message TEXT,
  api_response_summary TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);
CREATE INDEX IF NOT EXISTS idx_post_logs_account ON post_logs(account_id);
CREATE INDEX IF NOT EXISTS idx_post_logs_status ON post_logs(status);
CREATE INDEX IF NOT EXISTS idx_post_logs_created ON post_logs(created_at);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] オートパイロットジョブ
-- 1ジョブ = 1予約投稿（現行 autopilot.js 参照）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS autopilot_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reservation_no TEXT,                       -- '0001' 形式の連番
  account_id INTEGER,
  user_id INTEGER,                           -- Web版で追加
  channel_type TEXT DEFAULT 'x',
  content_mode TEXT DEFAULT 'problem',       -- パターンタイプ or 'freetext'
  theme TEXT,
  keywords TEXT,
  prompt_text TEXT,
  options_json TEXT DEFAULT '{}',
  title_memo TEXT,
  link_url TEXT,
  generate_at TEXT,                          -- 生成時刻（publish_at の 2 分前）
  publish_at TEXT,                           -- 投稿時刻
  status TEXT DEFAULT 'draft',               -- draft / configured / generated / publishing / posted / cancelled / error
  generated_post_id INTEGER,                 -- 生成された post_queue.id
  external_post_id TEXT,
  error_message TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (account_id) REFERENCES x_accounts(id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_autopilot_status ON autopilot_jobs(status);
CREATE INDEX IF NOT EXISTS idx_autopilot_generate ON autopilot_jobs(generate_at);
CREATE INDEX IF NOT EXISTS idx_autopilot_publish ON autopilot_jobs(publish_at);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] ターゲット設定
-- 28種テンプレ（age×gender×genre）を account_id 紐付けで保存
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS target_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id TEXT,                           -- 現行は TEXT（'default' も入る）
  user_id INTEGER,
  template_key TEXT,                         -- '30代_男性_FX' 等
  label TEXT,
  age_range TEXT,
  gender TEXT,
  genre TEXT,
  occupation TEXT,
  pains TEXT,
  desires TEXT,
  purchase_triggers TEXT,
  problem TEXT,
  goal TEXT,
  knowledge TEXT,
  is_default INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_target_account ON target_templates(account_id);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] ブランドボイス
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brand_voice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id TEXT,
  user_id INTEGER,
  voice_key TEXT,                            -- authority / empathy / provocative / story / problem_raise
  label TEXT,
  tone TEXT,
  worldview TEXT,
  personal_story TEXT,
  prohibited_words TEXT,                     -- 改行区切り
  sample_posts TEXT,
  is_default INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_brand_voice_account ON brand_voice(account_id);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] メディアアセット
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  account_id INTEGER,
  file_type TEXT,                            -- image / video
  mime_type TEXT,
  file_name TEXT,
  byte_size INTEGER,
  storage_path TEXT,                         -- /media/... (R2 key)
  x_media_id TEXT,                           -- X 側の media_id
  upload_status TEXT DEFAULT 'pending',      -- pending / ready / failed
  last_error TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_media_user ON media_assets(user_id);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 生成ログ
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS generation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  account_id INTEGER,
  brand_voice_id INTEGER,
  target_setting_id INTEGER,
  post_mode TEXT,
  generation_type TEXT,
  output_text TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 類似度ガード（fingerprint）
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS post_fingerprints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  account_id INTEGER,
  fingerprint TEXT,                          -- JSON: {bigrams: [...], content_hash: '...'}
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);
CREATE INDEX IF NOT EXISTS idx_fingerprints_account ON post_fingerprints(account_id);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 投稿ロック（排他制御）
-- メモリロックだが永続化したい場合用
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS post_locks (
  account_id INTEGER PRIMARY KEY,
  locked_at TEXT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES x_accounts(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] スケジュール監査
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schedule_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER,
  account_id INTEGER,
  audit_json TEXT,                           -- {base_at, effective_at, jitter_sec, collision_adjusted}
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] X API 設定（アプリ共通 Consumer Key/Secret）
-- Web版ではユーザー毎に持つことも可能にする
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS x_api_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  api_key TEXT,                              -- encrypt
  api_secret TEXT,                           -- encrypt
  bearer_token TEXT,                         -- encrypt
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- [GE365x 現行準拠] 健全性イベント
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS account_health_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER,
  event_type TEXT,                           -- error / rate_limit / similar / overpost / recovered
  delta INTEGER,                             -- 減点幅
  score_after INTEGER,
  status_after TEXT,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (account_id) REFERENCES x_accounts(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_health_events_account ON account_health_events(account_id);
