// ============================================================
// src/lib/openai.ts — OpenAI ヘルパー（X版）
//
// 現行 shared/openai.js を Cloudflare Workers 互換に TypeScript 化。
// PATTERN_PROMPTS / TARGET_TEMPLATES / VOICE_TEMPLATES / KEYWORD_GENRE_MAP /
// buildGenerationPrompt / generateXPost / generatePatternPost /
// normalizePostText / formatForXDisplay / generateWithNgCheck / autoSelectTarget
// はすべて現行と等価。
// ============================================================

// ═══ ターゲットテンプレート ═══
const _TT_AGES = ['20代', '30代', '40代', '50代']
const _TT_GENDERS = ['男性', '女性']
const _TT_GENRES = ['美容', '健康', '副業', '投資', 'AI活用', 'ダイエット', 'お金']
const _TT_PROBLEMS: Record<string, string> = {
  '美容': '老化・肌荒れ・見た目の変化',
  '健康': '疲れやすい・体力低下・不調',
  '副業': '時間がない・何から始めるか不明',
  '投資': '勝てない・資産が増えない',
  'AI活用': '手作業が多い・効率が悪い',
  'ダイエット': 'リバウンド・続かない',
  'お金': '貯まらない・将来不安',
}
const _TT_GOALS: Record<string, string> = {
  '美容': '若々しくなりたい',
  '健康': '元気に過ごしたい',
  '副業': '収益化したい',
  '投資': '安定して利益を出したい',
  'AI活用': '業務を自動化したい',
  'ダイエット': '理想の体型になりたい',
  'お金': '経済的自由を得たい',
}

export type TargetTemplate = {
  key: string
  label: string
  gender: string
  age_range: string
  genre: string
  problem: string
  goal: string
  knowledge: string
}

export const TARGET_TEMPLATES: TargetTemplate[] = []
for (const age of _TT_AGES) {
  for (const gender of _TT_GENDERS) {
    for (const genre of _TT_GENRES) {
      TARGET_TEMPLATES.push({
        key: `${age}_${gender}_${genre}`,
        label: `${age}${gender}/${genre}`,
        gender, age_range: age, genre,
        problem: _TT_PROBLEMS[genre] || `${genre}に悩んでいる`,
        goal: _TT_GOALS[genre] || `${genre}で成果を出したい`,
        knowledge: '一般',
      })
    }
  }
}

export const VOICE_TEMPLATES = [
  { key: 'authority',     label: '権威型',      instruction: '専門家として断定的に、簡潔に、根拠を示して書く。' },
  { key: 'empathy',       label: '共感型',      instruction: '読者の悩みに寄り添い、共感を起点に語りかけるように書く。' },
  { key: 'provocative',   label: '煽り型',      instruction: '問題を鋭く突き、危機感を持たせる書き方にする。' },
  { key: 'story',         label: 'ストーリー型', instruction: '体験談や変化の流れを感じさせる構成で書く。' },
  { key: 'problem_raise', label: '問題提起型',   instruction: '最初に課題を提示し、その原因と解決策を示す。' },
]

export const KEYWORD_GENRE_MAP: Record<string, string> = {
  '美容,老化,たるみ,シミ,アンチエイジング,肌': '美容',
  'FX,EA,自動売買,トレード,投資,株,NISA,資産': '投資',
  '副業,在宅,主婦,収益化,アフィリエイト': '副業',
  '筋トレ,ダイエット,痩せ,体型,運動': 'ダイエット',
  'AI,自動化,ChatGPT,効率,ツール': 'AI活用',
  '健康,疲れ,更年期,体力,サプリ': '健康',
  'お金,貯金,節約,家計,ローン': 'お金',
}

export function autoSelectTarget(
  theme: string,
  keywords: string,
  lastUsedKey?: string
): TargetTemplate {
  const text = `${theme || ''} ${keywords || ''}`.toLowerCase()
  let matchedGenre: string | null = null
  for (const [kws, genre] of Object.entries(KEYWORD_GENRE_MAP)) {
    if (kws.split(',').some((w) => text.includes(w.toLowerCase()))) {
      matchedGenre = genre
      break
    }
  }
  let candidates = matchedGenre
    ? TARGET_TEMPLATES.filter((t) => t.genre === matchedGenre)
    : TARGET_TEMPLATES
  if (candidates.length === 0) candidates = TARGET_TEMPLATES
  const filtered = candidates.filter((t) => t.key !== lastUsedKey)
  const pool = filtered.length > 0 ? filtered : candidates
  return pool[Math.floor(Math.random() * pool.length)]
}

// ═══ パターンプロンプト（現行 shared/openai.js と完全一致） ═══
export const PATTERN_PROMPTS: Record<string, { name: string; instruction: string }> = {
  problem: {
    name: '問題提起型',
    instruction: '【問題提起型】\n1.冒頭で読者の痛みを突く質問\n2.具体的な3つの「あるある」\n3.「実はそれ○○が原因」と核心\n4.解決の方向性\n5.CTAで次のステップへ\n※最後まで書き切ること',
  },
  before_after: {
    name: 'ビフォーアフター型',
    instruction: '【変化が伝わる構成】\n冒頭で過去の悩みや状態を自然に描写し、きっかけや行動を示し、現在の変化や成果を伝え、最後に学びや提案を入れてください。\n「Before:」「After:」のラベルを使わず、自然な語り口で変化のストーリーを伝えること。\n毎回異なる言い回し・展開にし、同じテンプレート構文を繰り返さないこと。',
  },
  contrarian: {
    name: '逆張り型',
    instruction: '【逆張り型】\n1.「○○すべき」の常識提示\n2.「実は逆」とひっくり返す\n3.根拠\n4.代替案\n5.CTA',
  },
  howto: {
    name: 'HowTo実演型',
    instruction: '【HowTo実演型】\n1.「○○する方法」宣言\n2.Step1→2→3\n3.各ステップ具体例\n4.ワンポイント\n5.CTA',
  },
  numbers: {
    name: '数字インパクト型',
    instruction: '【数字インパクト型】\n1.冒頭にインパクト数字\n2.背景\n3.なぜその数字か\n4.読者が同じ結果を得る条件\n5.CTA',
  },
}

// ═══ OpenAI API 呼び出し ═══

type OpenAIOpts = {
  apiKey: string
  model?: string
  maxTokens?: number
  temperature?: number
  baseUrl?: string
}

export async function callOpenAI(
  messages: { role: string; content: string }[],
  opts: OpenAIOpts
): Promise<string> {
  const model = opts.model || 'gpt-4o-mini'
  const maxTokens = opts.maxTokens || 4000
  const temperature = opts.temperature ?? 0.7
  const baseUrl = opts.baseUrl || 'https://api.openai.com/v1'

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { authorization: `Bearer ${opts.apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
        signal: AbortSignal.timeout(120000),
      })
      if (!res.ok) {
        const err = await res.text()
        if (res.status >= 500 && attempt < 3) {
          await new Promise((r) => setTimeout(r, 2000 * attempt))
          continue
        }
        throw new Error(`OpenAI API error: ${res.status} ${err.slice(0, 500)}`)
      }
      const data = await res.json<any>()
      return data?.choices?.[0]?.message?.content || ''
    } catch (e: any) {
      const retryable = e?.name === 'TimeoutError' || e?.name === 'AbortError'
      if (retryable && attempt < 3) {
        await new Promise((r) => setTimeout(r, 2000 * attempt))
        continue
      }
      throw e
    }
  }
  return ''
}

// ═══ NG語チェック + 再生成 ═══
export async function generateWithNgCheck(
  messages: { role: string; content: string }[],
  ngWords: string,
  opts: OpenAIOpts
): Promise<{ text: string; blocked: string[]; retried: boolean }> {
  const ngList = (ngWords || '').split(/[,、\n]/).map((w) => w.trim()).filter(Boolean)
  let msgs = messages
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await callOpenAI(msgs, opts)
    if (ngList.length === 0) return { text: result, blocked: [], retried: attempt > 0 }
    const blocked = ngList.filter((w) => result.includes(w))
    if (blocked.length === 0) return { text: result, blocked: [], retried: attempt > 0 }
    msgs = [
      ...msgs,
      { role: 'assistant', content: result },
      { role: 'user', content: `以下の語句を使わずに書き直してください: ${blocked.join(', ')}` },
    ]
  }
  const final = await callOpenAI(msgs, opts)
  return { text: final, blocked: [], retried: true }
}

// ═══ X向けプロンプト構築 ═══
export type BrandVoice = {
  tone?: string | null
  worldview?: string | null
  personal_story?: string | null
  prohibited_words?: string | null
}

export type TargetDna = {
  age_range?: string | null
  gender?: string | null
  occupation?: string | null
  pains?: string | null
  desires?: string | null
  purchase_triggers?: string | null
}

export type BuildPromptArgs = {
  platform?: string
  theme?: string
  keywords?: string
  cta?: string
  brandVoice?: BrandVoice | null
  targetDna?: TargetDna | null
  patternType?: string | null
  userInput?: string
  postMode?: string | null   // 'body' | '140'
}

export function buildGenerationPrompt(args: BuildPromptArgs): {
  messages: { role: string; content: string }[]
  systemPrompt: string
  userPrompt: string
} {
  let systemPrompt = '以下のルールを厳守してX(Twitter)投稿文を生成してください。\n'

  // ブランドボイス
  if (args.brandVoice && typeof args.brandVoice === 'object') {
    systemPrompt += '\n【ブランドボイス】\n'
    if (args.brandVoice.tone) systemPrompt += `口調: ${args.brandVoice.tone}\n`
    if (args.brandVoice.worldview) systemPrompt += `世界観: ${args.brandVoice.worldview}\n`
    if (args.brandVoice.personal_story) systemPrompt += `個人ストーリー: ${args.brandVoice.personal_story}\n`
    if (args.brandVoice.prohibited_words) {
      systemPrompt += `禁止ワード: ${args.brandVoice.prohibited_words.replace(/\n/g, ', ')}\n`
    }
    systemPrompt += '上記の口調・世界観を必ず守ること。\n'
  } else {
    systemPrompt += '口調: 丁寧・簡潔・実用重視\n'
  }

  // ターゲット
  if (args.targetDna && typeof args.targetDna === 'object') {
    const td = args.targetDna
    systemPrompt += '\n【ターゲット読者】\n'
    if (td.age_range) systemPrompt += `年齢層: ${td.age_range}\n`
    if (td.gender) systemPrompt += `性別: ${td.gender}\n`
    if (td.occupation) systemPrompt += `職業: ${td.occupation}\n`
    if (td.pains) systemPrompt += `悩み: ${td.pains.replace(/\n/g, ' / ')}\n`
    if (td.desires) systemPrompt += `欲求: ${td.desires.replace(/\n/g, ' / ')}\n`
    if (td.purchase_triggers) systemPrompt += `行動トリガー: ${td.purchase_triggers.replace(/\n/g, ' / ')}\n`
    systemPrompt += 'この読者が自然に反応する語彙・例えを使うこと。\n'
  }

  // パターン
  const NO_MD = '\nMarkdown記号(#,##)禁止。見出しは「■」。番号リスト禁止。自然な文章で。箇条書きは「・」のみ。'
  let patternInstruction = ''
  if (args.patternType && PATTERN_PROMPTS[args.patternType]) {
    patternInstruction = `\n【投稿パターン（構造のみ）】\n${PATTERN_PROMPTS[args.patternType].instruction}`
  }

  // ユーザー条件
  let userPrompt = `テーマ: ${args.theme || ''}${args.keywords ? `\nキーワード: ${args.keywords}` : ''}`
  if (args.postMode === '140') {
    userPrompt += '\n140文字以内のX投稿を作成。簡潔かつインパクト重視。ハッシュタグは含めない。'
  } else {
    userPrompt += '\nX投稿用のフル文章を作成。読みやすく改行を入れる。ハッシュタグは含めない。'
  }
  if (args.cta) userPrompt += `\nCTA: ${args.cta}`
  if (args.userInput) userPrompt += `\n追加指示: ${args.userInput}`

  const finalSystem = systemPrompt + patternInstruction + NO_MD
  return {
    messages: [
      { role: 'system', content: finalSystem },
      { role: 'user', content: userPrompt },
    ],
    systemPrompt: finalSystem,
    userPrompt,
  }
}

// ═══ X投稿生成 ═══
export async function generateXPost(
  apiKey: string,
  theme: string,
  keywords: string,
  target: TargetDna | null,
  voice: BrandVoice | null,
  postMode: string | null = 'body'
): Promise<string> {
  const { messages } = buildGenerationPrompt({
    platform: 'x', theme, keywords, brandVoice: voice, targetDna: target, postMode: postMode || 'body',
  })
  const result = await callOpenAI(messages, { apiKey, temperature: 0.8 })
  return normalizePostText(result, postMode)
}

export async function generatePatternPost(
  apiKey: string,
  patternType: string,
  theme: string,
  keywords: string,
  target: TargetDna | null,
  voice: BrandVoice | null,
  postMode: string | null = 'body'
): Promise<string> {
  if (!PATTERN_PROMPTS[patternType]) throw new Error(`未対応のパターン: ${patternType}`)
  const { messages } = buildGenerationPrompt({
    platform: 'x', theme, keywords, brandVoice: voice, targetDna: target, patternType,
    postMode: postMode || 'body',
  })
  const result = await callOpenAI(messages, { apiKey, temperature: 0.8 })
  return normalizePostText(result, postMode)
}

// ═══ テキスト整形 ═══
export function normalizePostText(text: string, postMode?: string | null): string {
  if (!text) return ''
  let t = text
    .replace(/^#{1,4}\s*/gm, '')
    .replace(/^[▪️■●•\-\*]+\s*/gm, '')
    .replace(/^\d+\.\s/gm, '')
    .replace(/^(Step\d+)[:\s]/gim, '')
    .replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm, '・')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  t = formatForXDisplay(t)

  if (postMode === '140' && t.length > 140) t = t.slice(0, 137) + '...'
  return t
}

export function formatForXDisplay(text: string): string {
  if (!text) return ''
  const lineCount = text.split('\n').length
  const charCount = text.replace(/\n/g, '').length
  if (lineCount > 3 || charCount < 40) return text

  const sentences = text.split(/(?<=[。！？!?\n])/g).filter((s) => s.trim())
  if (sentences.length <= 1) return text

  let result = ''
  let lineInParagraph = 0
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i].trim()
    if (!s) continue

    if (/^https?:\/\//.test(s) || /^#/.test(s) || /^@/.test(s)) {
      if (result && !result.endsWith('\n')) result += '\n'
      result += s
      lineInParagraph = 0
      continue
    }

    result += s
    lineInParagraph++

    if (lineInParagraph >= 2 && i < sentences.length - 1) {
      result += '\n\n'
      lineInParagraph = 0
    } else if (i < sentences.length - 1 && !s.endsWith('\n')) {
      result += '\n'
    }
  }
  return result.replace(/\n{3,}/g, '\n\n').trim()
}
