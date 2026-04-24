-- ============================================================
-- 0012_licenses.sql — [WalletManager 流用]
-- ライセンスキー（VPS-GE365X-XXXXXXXX）管理
-- 現行 shared/license.js のマシンID認証 → Webアカウント紐付けに置き換え
-- ============================================================

CREATE TABLE IF NOT EXISTS licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  license_key TEXT NOT NULL UNIQUE,        -- VPS-GE365X-XXXXXXXX
  license_type TEXT NOT NULL DEFAULT 'paid', -- paid / trial / lifetime / comp（招待）
  plan_code TEXT,                          -- 紐付けるプラン（subscription_plans.code）
  user_id INTEGER,                         -- アクティベート済ユーザー
  is_active INTEGER DEFAULT 1,
  activated_at TEXT,
  expires_at TEXT,                         -- 期限。NULL = 無期限
  issued_by INTEGER,                       -- 発行した管理者 user_id
  note TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  updated_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (issued_by) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (plan_code) REFERENCES subscription_plans(code)
);

CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_user ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_active ON licenses(is_active);

-- ライセンスのアクティベート履歴（監査用）
CREATE TABLE IF NOT EXISTS license_activations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  license_id INTEGER NOT NULL,
  user_id INTEGER,
  event_type TEXT NOT NULL,                -- activated / deactivated / transferred / revoked
  ip_address TEXT,
  user_agent TEXT,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now', '+9 hours')),
  FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
