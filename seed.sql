-- ============================================================
-- seed.sql — 開発用シード (v2)
-- 本番投入禁止。ADMIN_PASSWORD secret 経由での初期化を推奨
-- ============================================================

-- 管理者（password_hash は placeholder）
INSERT OR IGNORE INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
VALUES ('admin@ge365x.local', '$PBKDF2$SEED_PLACEHOLDER', 1, 1,
        datetime('now','+9 hours'), datetime('now','+9 hours','+365 days'));

INSERT OR IGNORE INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
SELECT id, 'ge365x_pro', 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59'
FROM users WHERE email = 'admin@ge365x.local';

-- デモ用ライセンスキー 3 本
INSERT OR IGNORE INTO licenses (license_key, license_type, plan_code, is_active, note)
VALUES
  ('VPS-GE365X-DEMOFREE', 'trial',    'ge365x_free',     1, '開発用: Free'),
  ('VPS-GE365X-DEMOSTD1', 'paid',     'ge365x_standard', 1, '開発用: Standard'),
  ('VPS-GE365X-DEMOPRO1', 'lifetime', 'ge365x_pro',      1, '開発用: Pro永久');

-- デフォルトのターゲットとボイス（account_id='default' 相当）
INSERT OR IGNORE INTO target_templates
  (account_id, user_id, template_key, label, age_range, gender, genre, problem, goal, knowledge, is_default)
SELECT 'default', id, '40代_男性_投資', '40代男性/投資', '40代', '男性', '投資',
       '勝てない・資産が増えない', '安定して利益を出したい', '中級', 1
FROM users WHERE email = 'admin@ge365x.local';

INSERT OR IGNORE INTO brand_voice
  (account_id, user_id, voice_key, label, tone, worldview, is_default)
SELECT 'default', id, 'authority', '権威型',
       '専門家として断定的、簡潔、根拠ベース',
       'FXシステム開発者・トレーダー・瞑想インストラクター',
       1
FROM users WHERE email = 'admin@ge365x.local';

-- Chatbot KB 初期値（DEFAULT_KB が chatbot.ts 起動時に投入されるが、ここでも入れておく）
-- 実体は chatbot.ts の loadKB で上書きされる
