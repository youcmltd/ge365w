// ============================================================
// src/lib/plan-gate.ts — プラン別機能ゲート（将来拡張用）
//
// 現在は全機能を開放。Stripe/PayPal 実装後に
// サブスクリプション状態に応じたゲート処理を追加する。
// ============================================================

export type PlanFeature =
  | 'autopilot'
  | 'thread'
  | 'media_upload'
  | 'bulk_export'
  | 'chatbot'
  | 'kpi_detail'

const FREE_FEATURES: PlanFeature[] = ['bulk_export']
const STANDARD_FEATURES: PlanFeature[] = ['autopilot', 'thread', 'media_upload', 'bulk_export', 'chatbot', 'kpi_detail']
const PRO_FEATURES: PlanFeature[] = [...STANDARD_FEATURES]

const PLAN_MAP: Record<string, PlanFeature[]> = {
  ge365x_free: FREE_FEATURES,
  ge365x_standard: STANDARD_FEATURES,
  ge365x_pro: PRO_FEATURES,
}

/**
 * ユーザーのプランコードで指定機能が利用可能かチェック
 * 現在は常に true を返す（全機能開放状態）
 */
export function canUseFeature(planCode: string | null | undefined, feature: PlanFeature): boolean {
  // Phase 5+: Stripe/PayPal 連携後に厳密制御を有効化
  // const features = PLAN_MAP[planCode || 'ge365x_free'] || FREE_FEATURES
  // return features.includes(feature)
  return true
}

/**
 * プランのデイリー投稿上限を返す
 */
export function getPlanDailyLimit(planCode: string | null | undefined): number {
  switch (planCode) {
    case 'ge365x_pro': return 50
    case 'ge365x_standard': return 20
    default: return 5
  }
}

/**
 * プランの X アカウント上限を返す
 */
export function getPlanAccountLimit(planCode: string | null | undefined): number {
  switch (planCode) {
    case 'ge365x_pro': return 10
    case 'ge365x_standard': return 3
    default: return 1
  }
}
