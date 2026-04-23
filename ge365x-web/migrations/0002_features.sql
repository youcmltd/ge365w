-- ============================================================
-- 0002_features.sql — ge365x-web 追加機能 (v2)
-- 現行 002_advanced_features_x.sql 由来 + Web版固有テーブル
-- ============================================================

-- 投稿テンプレート（プリセット本文）
CREATE TABLE IF NOT EXISTS post_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  account_id INTEGER,
  name TEXT NOT NULL,
  body TEXT NOT NULL,
  variables TEXT,
  category TEXT,
  is_shared INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 競合ベンチマーク
CREATE TABLE IF NOT EXISTS competitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  x_username TEXT NOT NULL,
  note TEXT,
  last_checked_at TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- X API レート制限記録
CREATE TABLE IF NOT EXISTS x_rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  endpoint TEXT NOT NULL,
  remaining INTEGER,
  limit_count INTEGER,
  reset_at TEXT,
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (account_id) REFERENCES x_accounts(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_account ON x_rate_limits(account_id);

-- 下書き
CREATE TABLE IF NOT EXISTS drafts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_id INTEGER,
  title TEXT,
  body TEXT NOT NULL,
  link_url TEXT,
  hashtags TEXT,
  post_mode TEXT DEFAULT 'body',
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chatbot ナレッジベース（JSON は D1 に単レコードで保存し、ファイル不要化）
CREATE TABLE IF NOT EXISTS chatbot_kb (
  id INTEGER PRIMARY KEY CHECK (id = 1),     -- 常に1行のみ
  json_data TEXT NOT NULL,                   -- { topics: [...], default_response: '...' }
  updated_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

-- KPI 集計
CREATE TABLE IF NOT EXISTS kpi_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER NOT NULL,
  user_id INTEGER,
  metric_date TEXT NOT NULL,
  posts_sent INTEGER DEFAULT 0,
  posts_failed INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  retweets INTEGER DEFAULT 0,
  replies INTEGER DEFAULT 0,
  follower_delta INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now', '+9 hours'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_kpi_acc_date ON kpi_metrics(account_id, metric_date);
