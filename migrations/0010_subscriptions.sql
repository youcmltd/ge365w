-- ============================================================
-- 0010_subscriptions.sql — [AxisVault 流用]
-- サブスクリプション/決済基盤（プラン名を GE365x 向けに変更）
-- ============================================================

CREATE TABLE IF NOT EXISTS subscription_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,              -- ge365x_free / ge365x_standard / ge365x_pro
  name TEXT NOT NULL,                     -- 表示名
  description TEXT,
  monthly_price_jpy INTEGER DEFAULT 0,
  yearly_price_jpy INTEGER DEFAULT 0,
  daily_post_limit INTEGER DEFAULT 0,     -- 0 = 無制限
  x_account_limit INTEGER DEFAULT 1,
  openai_token_monthly INTEGER DEFAULT 0,
  features TEXT,                          -- JSON array of feature flags
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  plan_code TEXT NOT NULL DEFAULT 'ge365x_free',
  status TEXT NOT NULL DEFAULT 'trial',   -- trial / active / cancelled / expired / past_due
  started_at TEXT,
  current_period_end TEXT,
  cancel_at_period_end INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  paypal_subscription_id TEXT,
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_code) REFERENCES subscription_plans(code)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON user_subscriptions(status);

CREATE TABLE IF NOT EXISTS payment_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount_jpy INTEGER NOT NULL,
  currency TEXT DEFAULT 'JPY',
  provider TEXT NOT NULL,                 -- stripe / paypal / license
  external_id TEXT,                       -- payment intent id 等
  status TEXT NOT NULL,                   -- succeeded / failed / refunded
  plan_code TEXT,
  metadata TEXT,                          -- JSON
  paid_at TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_payment_user ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment_history(status);

CREATE TABLE IF NOT EXISTS rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scope TEXT NOT NULL,                    -- 'user:<id>' / 'ip:<addr>' / 'global'
  action TEXT NOT NULL,                   -- 'login' / 'post' / 'openai' 等
  counter INTEGER DEFAULT 1,
  window_started_at TEXT NOT NULL DEFAULT (datetime('now', '+9 hours')),
  window_seconds INTEGER DEFAULT 60,
  updated_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_rate_limits_scope_action ON rate_limits(scope, action);

-- 初期プラン投入
INSERT INTO subscription_plans
  (code, name, description, monthly_price_jpy, yearly_price_jpy, daily_post_limit, x_account_limit, openai_token_monthly, features, sort_order)
VALUES
  ('ge365x_free',     'GE365x Free',     '無料プラン（試用）',         0,      0,     3, 1,    50000,  '["basic_post","manual_only"]', 1),
  ('ge365x_standard', 'GE365x Standard', 'スタンダード（個人運用向け）', 9800,  98000, 50, 3,   500000, '["autopilot","templates","drafts","chatbot"]', 2),
  ('ge365x_pro',      'GE365x Pro',      'プロ（運用代行・複数アカウント）', 29800, 298000, 0, 10, 2000000, '["autopilot","templates","drafts","chatbot","threads","competitors","priority_support"]', 3)
ON CONFLICT(code) DO NOTHING;
