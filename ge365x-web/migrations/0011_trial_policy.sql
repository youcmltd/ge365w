-- ============================================================
-- 0011_trial_policy.sql — [AxisVault 流用]
-- トライアル方針と管理
-- ============================================================

-- システム全体のトライアル設定（management で変更可）
INSERT INTO system_settings (key, value, description) VALUES
  ('trial_enabled',      '1',  'トライアル機能の有効フラグ (1=ON / 0=OFF)'),
  ('trial_days',         '14', '新規登録時に付与するトライアル日数'),
  ('trial_plan_code',    'ge365x_standard', 'トライアル中に相当する機能セット'),
  ('trial_require_approval', '1', '登録直後に管理者承認を必須とする (1=ON / 0=OFF)'),
  ('invite_only',        '0',  'クローズド運用の切替 (1=招待制 / 0=自由登録)')
ON CONFLICT(key) DO NOTHING;

-- トライアル消化履歴（同一メアドでの再試行検知）
CREATE TABLE IF NOT EXISTS trial_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  user_id INTEGER,
  trial_start TEXT NOT NULL,
  trial_end TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now', '+9 hours'))
);

CREATE INDEX IF NOT EXISTS idx_trial_email ON trial_history(email);
