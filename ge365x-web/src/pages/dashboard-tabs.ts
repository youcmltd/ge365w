// ============================================================
// src/pages/dashboard-tabs.ts — 11タブそれぞれのHTMLレンダ関数
// 現行 GE365x のUIにピクセル単位で準拠
// ============================================================

function escapeHtml(s: string | null | undefined): string {
  return (s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c] as string)
}

function statusPill(s: string | null): string {
  const map: Record<string, string> = {
    pending:    '<span class="pill pill-warn">未承認</span>',
    approved:   '<span class="pill pill-blue">承認済</span>',
    publishing: '<span class="pill pill-blue">送信中</span>',
    posted:     '<span class="pill pill-ok">投稿済</span>',
    failed:     '<span class="pill pill-err">失敗</span>',
    cancelled:  '<span class="pill pill-soft">キャンセル</span>',
  }
  return map[s || ''] || `<span class="pill pill-soft">${s || '—'}</span>`
}

// ============================================================
// 1. ダッシュボード（概要）
// ============================================================
export function renderDashboardPage(args: {
  stats: { accounts: number; today: number; pending: number; failed: number }
  health: any[]
  recentLogs: any[]
  hasAccount: boolean
}): string {
  const { stats, health, recentLogs } = args
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-gauge-high"></i>ダッシュボード</h1>
    <p class="section-desc">今日の投稿状況とアカウント健全性を一覧できます。</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="card card-sm"><div class="text-xs text-ink-muted">Xアカウント</div><div class="text-2xl font-bold text-ink mt-1">${stats.accounts}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日の投稿</div><div class="text-2xl font-bold text-ink mt-1">${stats.today}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">予約中</div><div class="text-2xl font-bold text-ink mt-1">${stats.pending}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日失敗</div><div class="text-2xl font-bold text-red-600 mt-1">${stats.failed}</div></div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-heart-pulse text-red-500"></i> アカウント健全性</h3>
      ${health.length === 0 ? `
        <div class="text-ink-muted text-sm text-center py-6">アカウント未登録</div>
      ` : health.map(a => `
        <div class="flex items-center justify-between py-2 border-b border-line/50 last:border-0">
          <div>
            <div class="text-sm font-semibold text-ink">@${escapeHtml(a.x_username || a.account_name)}</div>
            <div class="text-xs text-ink-muted">${a.is_active ? '稼働中' : '停止中'}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-xl font-bold ${a.account_health_score >= 80 ? 'text-emerald-600' : a.account_health_score >= 60 ? 'text-amber-600' : 'text-red-600'}">${a.account_health_score ?? 100}</div>
            <span class="pill ${a.health_status === 'risk' ? 'pill-err' : a.health_status === 'caution' ? 'pill-warn' : 'pill-ok'}">${a.health_status || 'healthy'}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-clock-rotate-left text-accent"></i> 直近の投稿ログ</h3>
      ${recentLogs.length === 0 ? `
        <div class="text-ink-muted text-sm text-center py-6">投稿ログなし</div>
      ` : recentLogs.map(p => `
        <div class="py-2 border-b border-line/50 last:border-0">
          <div class="text-sm text-ink truncate">${escapeHtml((p.content || '').slice(0, 80))}...</div>
          <div class="text-xs text-ink-muted mt-0.5">@${escapeHtml(p.x_username || '-')} · ${p.posted_at || '-'}</div>
        </div>
      `).join('')}
    </div>
  </div>
</div>`
}

// ============================================================
// 2. ターゲット設定
// ============================================================
export function renderTargetPage(args: { target: any; hasAccount: boolean; noAccountAlert: string }): string {
  const t = args.target || {}
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-bullseye"></i>ターゲット設定</h1>
    <p class="section-desc">投稿のターゲット読者を設定します。AI生成時に自動でプロンプトに注入されます。</p>
  </div>
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-ink">ターゲットテンプレート</h3>
      <button class="example-btn" onclick="fillTargetExample()"><i class="fas fa-pencil"></i>使用例</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="field-label"><i class="fas fa-child icon-purple"></i>年齢層</label>
        <input type="text" id="tg-age" class="inp" value="${escapeHtml(t.age_range)}" placeholder="例: 25~40代">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-venus-mars icon-purple"></i>性別</label>
        <select id="tg-gender" class="inp">
          <option value="">指定なし</option>
          <option value="男性" ${t.gender === '男性' ? 'selected' : ''}>男性</option>
          <option value="女性" ${t.gender === '女性' ? 'selected' : ''}>女性</option>
          <option value="その他" ${t.gender === 'その他' ? 'selected' : ''}>その他</option>
        </select>
      </div>
      <div>
        <label class="field-label"><i class="fas fa-briefcase icon-yellow"></i>職業</label>
        <input type="text" id="tg-occ" class="inp" value="${escapeHtml(t.occupation)}" placeholder="例: 会社員 / フリーランス">
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>痛み・悩み</label>
      <textarea id="tg-pains" class="inp" placeholder="読者が抱えている具体的な悩み・痛みを書く">${escapeHtml(t.pains)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>欲求・願望</label>
      <textarea id="tg-desires" class="inp" placeholder="読者が「こうなりたい」と思っている理想像">${escapeHtml(t.desires)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>行動トリガー（反応するきっかけ）</label>
      <textarea id="tg-trigger" class="inp" placeholder="この読者がアクションを起こす瞬間・キーワード">${escapeHtml(t.purchase_triggers)}</textarea>
    </div>
    <button class="btn btn-primary" onclick="saveTarget()"><i class="fas fa-save"></i>保存</button>
    <span id="tg-msg" class="text-xs ml-2"></span>
  </div>
</div>
<script>
function fillTargetExample() {
  document.getElementById('tg-age').value = '30~50代';
  document.getElementById('tg-gender').value = '男性';
  document.getElementById('tg-occ').value = 'サラリーマン / 経営者';
  document.getElementById('tg-pains').value = '老後資金が不安。\\n投資で失敗続き。\\n時間がなくて副業が続かない。';
  document.getElementById('tg-desires').value = '月10万円の安定した副収入。\\n経済的自由を得たい。';
  document.getElementById('tg-trigger').value = '「自動化」「再現性」「実績」という言葉に反応する。';
}
async function saveTarget() {
  const body = {
    age_range: document.getElementById('tg-age').value,
    gender: document.getElementById('tg-gender').value,
    occupation: document.getElementById('tg-occ').value,
    pains: document.getElementById('tg-pains').value,
    desires: document.getElementById('tg-desires').value,
    purchase_triggers: document.getElementById('tg-trigger').value,
  };
  const r = await fetch('/api/admin/target', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  const msg = document.getElementById('tg-msg');
  if (j.success) { msg.textContent = '保存しました'; msg.className = 'text-xs ml-2 text-emerald-600'; }
  else { msg.textContent = '保存失敗: ' + (j.error || ''); msg.className = 'text-xs ml-2 text-red-600'; }
}
</script>`
}

// ============================================================
// 3. ブランドボイス
// ============================================================
export function renderVoicePage(args: { voice: any; hasAccount: boolean; noAccountAlert: string }): string {
  const v = args.voice || {}
  const presets = [
    { k: 'authority',     l: '権威型',      t: '専門家として断定的に、簡潔に、根拠を示して書く。' },
    { k: 'empathy',       l: '共感型',      t: '読者の悩みに寄り添い、共感を起点に語りかけるように書く。' },
    { k: 'provocative',   l: '煽り型',      t: '問題を鋭く突き、危機感を持たせる書き方にする。' },
    { k: 'story',         l: 'ストーリー型', t: '体験談や変化の流れを感じさせる構成で書く。' },
    { k: 'problem_raise', l: '問題提起型',   t: '最初に課題を提示し、その原因と解決策を示す。' },
  ]
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>ブランドボイス</h1>
    <p class="section-desc">あなたの発信スタイル・口調・世界観を定義します。AI生成時にトーンとして注入されます。</p>
  </div>
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div class="card">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h3 class="font-bold text-ink">ボイスプロファイル</h3>
      <div class="flex gap-1 flex-wrap">
        ${presets.map(p => `<button class="example-btn" onclick="loadVoicePreset('${p.k}','${p.t.replace(/'/g,"\\'")}')">${p.l}</button>`).join('')}
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-microphone icon-blue"></i>口調</label>
      <input type="text" id="vc-tone" class="inp" value="${escapeHtml(v.tone)}" placeholder="例: 専門家として断定的に、簡潔に、根拠を示して書く">
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-globe icon-green"></i>世界観</label>
      <textarea id="vc-world" class="inp" placeholder="あなたが見ている世界、伝えたい価値観">${escapeHtml(v.worldview)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-book icon-purple"></i>個人ストーリー（任意）</label>
      <textarea id="vc-story" class="inp" placeholder="過去の体験や転機。AI が自然に織り交ぜます">${escapeHtml(v.personal_story)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-ban icon-red"></i>禁止ワード（改行区切り）</label>
      <textarea id="vc-ng" class="inp" placeholder="絶対に使わないワード">${escapeHtml(v.prohibited_words)}</textarea>
    </div>
    <button class="btn btn-primary" onclick="saveVoice()"><i class="fas fa-save"></i>保存</button>
    <span id="vc-msg" class="text-xs ml-2"></span>
  </div>
</div>
<script>
function loadVoicePreset(key, tone) {
  document.getElementById('vc-tone').value = tone;
  toast('プリセットを読み込みました');
}
async function saveVoice() {
  const body = {
    tone: document.getElementById('vc-tone').value,
    worldview: document.getElementById('vc-world').value,
    personal_story: document.getElementById('vc-story').value,
    prohibited_words: document.getElementById('vc-ng').value,
  };
  const r = await fetch('/api/admin/voice', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  const msg = document.getElementById('vc-msg');
  if (j.success) { msg.textContent = '保存しました'; msg.className = 'text-xs ml-2 text-emerald-600'; }
  else { msg.textContent = '保存失敗'; msg.className = 'text-xs ml-2 text-red-600'; }
}
</script>`
}

// ============================================================
// 4. パターン別AI生成
// ============================================================
export function renderPatternPage(args: {
  hasAccount: boolean; noAccountAlert: string;
  target: any; voice: any;
  currentAcct: { id: number; account_name: string; x_username: string | null } | undefined
}): string {
  const patterns = [
    ['problem','問題提起型','fa-circle-question'],
    ['before_after','ビフォーアフター型','fa-right-left'],
    ['contrarian','逆張り型','fa-rotate-left'],
    ['howto','HowTo実演型','fa-list-ol'],
    ['numbers','数字インパクト型','fa-hashtag'],
  ]
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-wand-magic-sparkles"></i>パターン別AI生成</h1>
    <p class="section-desc">5種類の投稿パターンから選んで、テーマに沿った投稿案を複数生成します。</p>
  </div>
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="card lg:col-span-2 space-y-4">
      <div>
        <label class="field-label"><i class="fas fa-shapes icon-purple"></i>投稿パターン</label>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          ${patterns.map(([k,l,ic]) => `
            <label class="flex flex-col items-center gap-1 p-3 border border-line rounded-lg cursor-pointer hover:bg-paper-soft has-[:checked]:border-accent has-[:checked]:bg-accent-light has-[:checked]:text-accent transition-all">
              <input type="radio" name="patt" value="${k}" class="sr-only" ${k === 'problem' ? 'checked' : ''}>
              <i class="fas ${ic} text-lg"></i>
              <span class="text-xs font-semibold text-center">${l}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="field-label"><i class="fas fa-heading icon-blue"></i>テーマ</label>
          <input type="text" id="pa-theme" class="inp" placeholder="例: FXで月10万円稼ぐ方法">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-tags icon-green"></i>キーワード</label>
          <input type="text" id="pa-kw" class="inp" placeholder="例: 自動売買, EA, システムトレード">
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="field-label"><i class="fas fa-align-left icon-blue"></i>投稿モード</label>
          <select id="pa-mode" class="inp">
            <option value="body">フル文章</option>
            <option value="140">140文字以内</option>
          </select>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-link icon-blue"></i>リンクURL（任意）</label>
          <input type="url" id="pa-link" class="inp" placeholder="https://...">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-hashtag icon-green"></i>ハッシュタグ（任意）</label>
          <input type="text" id="pa-tag" class="inp" placeholder="#FX #システムトレード">
        </div>
      </div>
      <div>
        <label class="field-label"><i class="fas fa-list-ol icon-yellow"></i>生成件数</label>
        <select id="pa-count" class="inp" style="width:8rem">
          <option value="1">1件</option><option value="3" selected>3件</option>
          <option value="5">5件</option><option value="10">10件</option>
        </select>
      </div>
      <button class="btn btn-primary" onclick="doPatternGenerate()"><i class="fas fa-wand-magic-sparkles"></i>AI生成</button>
    </div>
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-info text-accent"></i> 現在の設定</h3>
      <div class="space-y-2 text-sm">
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">ターゲット</div>
          <div class="text-ink">${escapeHtml(args.target?.age_range || '未設定')} / ${escapeHtml(args.target?.gender || '-')}</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">ブランドボイス</div>
          <div class="text-ink text-xs">${escapeHtml((args.voice?.tone || '未設定').slice(0, 50))}...</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">投稿先アカウント</div>
          <div class="text-ink">${args.currentAcct ? '@' + escapeHtml(args.currentAcct.x_username || args.currentAcct.account_name) : '未選択'}</div>
        </div>
      </div>
    </div>
  </div>
  <div id="pa-results"></div>
</div>
<script>
async function doPatternGenerate() {
  const patt = document.querySelector('input[name="patt"]:checked').value;
  const theme = document.getElementById('pa-theme').value.trim();
  if (!theme) { toast('テーマを入力してください', 'err'); return; }
  const body = {
    theme,
    keywords: document.getElementById('pa-kw').value,
    pattern_type: patt,
    post_mode: document.getElementById('pa-mode').value,
    link_url: document.getElementById('pa-link').value,
    hashtags: document.getElementById('pa-tag').value,
    count: parseInt(document.getElementById('pa-count').value, 10),
  };
  const r = await fetch('/api/admin/posts/generate', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  if (!j.success) { toast('生成失敗: ' + (j.error || ''), 'err'); return; }
  const root = document.getElementById('pa-results');
  root.innerHTML = '<div class="mt-4"><h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-check text-emerald-600"></i> 生成結果 ' + j.generated.length + '件</h3><div class="space-y-3">' +
    j.generated.map(g => '<div class="card card-sm"><div class="whitespace-pre-line text-sm leading-relaxed text-ink">' + (g.body || '').replace(/</g,'&lt;') + '</div><div class="text-xs text-ink-muted mt-2">' + (g.body||'').length + ' 文字</div></div>').join('') +
    '</div></div>';
  toast(j.generated.length + '件生成しました', 'ok');
}
</script>`
}

// ============================================================
// 5. AI生成2（自由プロンプト）
// ============================================================
export function renderGeneratePage(args: { hasAccount: boolean; noAccountAlert: string }): string {
  return `
<div class="space-y-4">
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div>
    <h1 class="section-title"><i class="fas fa-robot"></i>AI生成2</h1>
  </div>
  <div class="card space-y-5">
    <h3 class="font-bold text-ink">X投稿生成</h3>
    <div>
      <label class="field-label"><i class="fas fa-pencil icon-blue"></i>プロンプト <span class="text-red-500">*</span></label>
      <textarea id="ge-prompt" class="inp" style="min-height:9rem" placeholder="例: AI自動化で副業収益を作る方法について140字以内の投稿を作成"></textarea>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-list-ol icon-yellow"></i>生成数</label>
      <select id="ge-count" class="inp" style="width:8rem">
        <option>1件</option><option selected>3件</option><option>5件</option>
      </select>
    </div>
    <div class="border border-line rounded-lg p-4 bg-paper-soft">
      <div class="font-semibold text-accent mb-3"><i class="fas fa-sliders"></i> 投稿オプション</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="field-label"><i class="fas fa-signature icon-blue"></i>投稿末尾の追記（任意）</label>
          <input type="text" id="ge-footer" class="inp" placeholder="例: 詳しくはプロフリンクから👇">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-link icon-blue"></i>URL（任意）</label>
          <input type="url" id="ge-url" class="inp" placeholder="https://">
        </div>
      </div>
      <div class="mt-3">
        <label class="field-label"><i class="fas fa-align-left icon-blue"></i>本文モード</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ge-mode" value="body" checked class="accent-accent"><span class="text-sm">本文</span></label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ge-mode" value="140" class="accent-accent"><span class="text-sm">140文字以内</span></label>
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-stretch">
      <button class="btn btn-primary flex-1 justify-center" style="padding:.85rem 1rem;font-size:.95rem;font-weight:600" onclick="doGen2()"><i class="fas fa-pencil"></i>AI生成</button>
      <button class="btn btn-ghost" onclick="toast('下書き保存:実装中','info')"><i class="fas fa-save"></i>下書き保存</button>
      <button class="btn btn-ghost" onclick="toast('下書き再開:実装中','info')"><i class="fas fa-folder-open"></i>下書き再開</button>
    </div>
    <div id="ge-results"></div>
  </div>
</div>
<script>
async function doGen2() {
  const prompt = document.getElementById('ge-prompt').value.trim();
  if (!prompt) { toast('プロンプトを入力してください','err'); return; }
  const count = parseInt(document.getElementById('ge-count').value, 10) || 3;
  const mode = document.querySelector('input[name="ge-mode"]:checked').value;
  const footer = document.getElementById('ge-footer').value;
  const url = document.getElementById('ge-url').value;
  const r = await fetch('/api/admin/posts/generate', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({ theme: prompt, count, post_mode: mode, footer_text: footer, link_url: url }),
  });
  const j = await r.json();
  if (!j.success) { toast('生成失敗: ' + (j.error||''),'err'); return; }
  document.getElementById('ge-results').innerHTML = '<div class="mt-4 space-y-3">' +
    j.generated.map(g => '<div class="card card-sm"><div class="whitespace-pre-line text-sm text-ink">' + (g.body||'').replace(/</g,'&lt;') + '</div></div>').join('') + '</div>';
  toast(j.generated.length + '件生成しました','ok');
}
</script>`
}

// ============================================================
// 6. X投稿管理（月次ナビ + 統計行 + 一括削除）
// ============================================================
export function renderPostsPage(args: {
  hasAccount: boolean; noAccountAlert: string;
  month: string; y: string; m: number;
  posts: any[];
  stats: { total: number; pending: number; posted: number; failed: number };
}): string {
  const { month, y, m, posts, stats } = args
  return `
<div class="space-y-4">
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div>
    <h1 class="section-title"><i class="fa-brands fa-x-twitter"></i>X投稿管理</h1>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost" onclick="navMonth(-1)"><i class="fas fa-chevron-left"></i></button>
      <span class="text-lg font-bold text-ink px-2">${y}年 ${m}月</span>
      <button class="btn btn-ghost" onclick="navMonth(1)"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-primary btn-sm" onclick="thisMonth()">当月</button>
    </div>
    <button class="btn btn-danger" onclick="bulkDel()" id="bulk-del-btn" disabled><i class="fas fa-trash"></i>一括削除</button>
  </div>
  <div class="flex items-center gap-6 text-sm">
    <div>合計: <span class="font-bold">${stats.total}件</span></div>
    <div>未投稿: <span class="font-bold text-amber-600">${stats.pending}件</span></div>
    <div>投稿済: <span class="font-bold text-emerald-600">${stats.posted}件</span></div>
    <div>失敗: <span class="font-bold text-red-600">${stats.failed}件</span></div>
  </div>
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr>
        <th style="width:40px"><input type="checkbox" onchange="checkAll(this.checked)"></th>
        <th>ID</th><th>本文</th><th>モード</th><th>状態</th><th>アカウント</th><th></th>
      </tr></thead>
      <tbody>
        ${posts.length === 0 ? `<tr><td colspan="7" class="text-center text-ink-muted py-10">この月の投稿データがありません</td></tr>` :
          posts.map(p => `
            <tr>
              <td><input type="checkbox" class="post-chk" value="${p.id}" onchange="updateBulk()"></td>
              <td class="font-mono text-xs text-ink-faint">${p.id}</td>
              <td class="max-w-md"><div class="truncate">${escapeHtml((p.body||'').slice(0,80))}</div></td>
              <td>${p.post_mode === '140' ? '140文字' : p.post_mode === 'thread' ? 'スレッド' : 'フル文章'}</td>
              <td>${statusPill(p.status)}</td>
              <td class="text-xs">@${escapeHtml(p.x_username || '-')}</td>
              <td class="text-right">
                ${p.status !== 'posted' ? `<button class="btn btn-subtle btn-sm" onclick="postNow(${p.id})" title="今すぐ投稿"><i class="fa-brands fa-x-twitter"></i></button>` : ''}
                <button class="btn btn-danger btn-sm" onclick="delPost(${p.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>
</div>
<script>
function navMonth(delta) {
  const [y, m] = '${month}'.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  location.href = '/dashboard/posts?month=' + d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
function thisMonth() { location.href = '/dashboard/posts'; }
function checkAll(v) {
  document.querySelectorAll('.post-chk').forEach(c => c.checked = v);
  updateBulk();
}
function updateBulk() {
  const n = document.querySelectorAll('.post-chk:checked').length;
  document.getElementById('bulk-del-btn').disabled = n === 0;
}
async function bulkDel() {
  const ids = [...document.querySelectorAll('.post-chk:checked')].map(c => parseInt(c.value, 10));
  if (!ids.length || !confirm(ids.length + '件を削除しますか?')) return;
  for (const id of ids) {
    await fetch('/api/admin/posts/' + id, { method: 'DELETE' });
  }
  toast(ids.length + '件削除しました', 'ok');
  location.reload();
}
async function postNow(id) {
  const r = await fetch('/api/admin/posts/' + id + '/post-now', { method: 'POST', headers:{'content-type':'application/json'}, body: '{}' });
  const j = await r.json();
  if (j.success) { toast('投稿しました', 'ok'); location.reload(); }
  else toast('失敗: ' + (j.error||''), 'err');
}
async function delPost(id) {
  if (!confirm('削除しますか?')) return;
  await fetch('/api/admin/posts/' + id, { method: 'DELETE' });
  location.reload();
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
function statusPill(s) {
  const map = {pending:'pill-warn',approved:'pill-blue',publishing:'pill-blue',posted:'pill-ok',failed:'pill-err',cancelled:'pill-soft'};
  const txt = {pending:'未承認',approved:'承認済',publishing:'送信中',posted:'投稿済',failed:'失敗',cancelled:'キャンセル'}[s] || s;
  return '<span class="pill ' + (map[s]||'pill-soft') + '">' + txt + '</span>';
}
</script>`
}

// ============================================================
// 7. ツリー投稿（既存投稿へのコメント追加）
// ============================================================
export function renderThreadPage(args: {
  hasAccount: boolean; noAccountAlert: string;
  history: any[];
}): string {
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-reply"></i>ツリー投稿（既存投稿へのコメント追加）</h1>
  </div>
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-reply text-accent"></i> コメント先投稿を選択 <span class="text-xs text-red-500 font-normal">（必須）</span></h3>
    <div class="alert alert-warn mb-3">
      <div class="text-xs leading-relaxed">コメントを追加したい既存のX投稿を選んでください。未選択では投稿できません。</div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="loadRecent()"><i class="fas fa-rotate"></i>直近の投稿を取得</button>
      <span class="text-xs text-ink-muted">または</span>
      <input type="text" id="th-target-id" class="inp" style="width:20rem;font-family:monospace" placeholder="x post_id を直接入力" oninput="updateTarget()">
    </div>
    <div id="th-target-info" class="mt-3">
      <div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> コメント先が未選択です</div>
    </div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-comment-dots text-accent"></i> 返信本文 <span class="text-xs text-ink-muted font-normal">（1件以上）</span></h3>
    <div id="th-replies" class="space-y-4">
      ${renderReplyItem(1)}
    </div>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="addReply()"><i class="fas fa-plus"></i>返信追加</button>
      <button class="btn" style="background:#10B981;color:#fff;border-color:#10B981" onclick="submitNow()"><i class="fas fa-paper-plane"></i>今すぐ投稿</button>
      <button class="btn btn-primary" onclick="submitSchedule()"><i class="fas fa-calendar"></i>予約投稿</button>
    </div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">返信履歴</h3>
    ${args.history.length === 0 ? `
      <div class="text-center text-ink-muted py-10">
        <i class="fas fa-inbox text-3xl mb-2 text-ink-faint"></i>
        <div>返信投稿はまだありません</div>
      </div>
    ` : args.history.map(r => `
      <div class="border border-line rounded-lg p-3 mb-2">
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${r.thread_parent_id || '-'}</span> ${statusPill(r.status)}</div>
        <div class="text-sm whitespace-pre-line">${escapeHtml((r.body || '').slice(0, 200))}</div>
      </div>
    `).join('')}
  </div>
</div>
<script>
function renderReplyItemJs(n) {
  return '<div class="reply-item"><div class="flex items-center justify-between mb-1"><label class="text-sm font-semibold text-accent">返信 ' + n + '</label>' +
    (n > 1 ? '<button class="btn btn-danger btn-sm" onclick="this.closest(\\'.reply-item\\').remove();renumber()"><i class="fas fa-times"></i></button>' : '') +
    '</div><textarea class="inp th-reply" placeholder="返信' + n + 'の本文を入力" maxlength="280"></textarea></div>';
}
function addReply() {
  const list = document.getElementById('th-replies');
  const n = list.children.length + 1;
  list.insertAdjacentHTML('beforeend', renderReplyItemJs(n));
}
function renumber() {
  [...document.getElementById('th-replies').children].forEach((el, i) => {
    const lbl = el.querySelector('label'); if (lbl) lbl.textContent = '返信 ' + (i+1);
  });
}
function loadRecent() {
  fetch('/api/admin/logs/posts?status=success').then(r => r.json()).then(j => {
    const p = (j.logs || []).find(x => x.tweet_id);
    if (p && p.tweet_id) {
      document.getElementById('th-target-id').value = p.tweet_id;
      updateTarget();
      toast('直近の投稿IDを取得しました','ok');
    } else {
      toast('直近の投稿が見つかりません','err');
    }
  });
}
function updateTarget() {
  const v = document.getElementById('th-target-id').value.trim();
  const el = document.getElementById('th-target-info');
  if (!v) el.innerHTML = '<div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> コメント先が未選択です</div>';
  else el.innerHTML = '<div class="text-xs text-emerald-700"><i class="fas fa-check"></i> コメント先: <span class="font-mono">' + escapeHtml(v) + '</span></div>';
}
function collect() {
  const tid = document.getElementById('th-target-id').value.trim();
  if (!tid) { toast('コメント先を選択してください','err'); return null; }
  const items = [...document.querySelectorAll('.th-reply')].map(t => t.value.trim()).filter(Boolean);
  if (!items.length) { toast('返信本文を入力してください','err'); return null; }
  return { target_tweet_id: tid, tweets: items.map(body => ({ body })) };
}
async function submitNow() {
  const d = collect(); if (!d) return;
  // TODO: 実APIでツリー送信
  toast('実装中: ツリー送信は次フェーズで実装','info');
}
async function submitSchedule() {
  const d = collect(); if (!d) return;
  toast('実装中: 予約は次フェーズで実装','info');
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
</script>`
}

function renderReplyItem(n: number): string {
  return `
    <div class="reply-item">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">返信 ${n}</label>
      </div>
      <textarea class="inp th-reply" placeholder="返信${n}の本文を入力" maxlength="280"></textarea>
    </div>`
}

// ============================================================
// 8. 予約状況
// ============================================================
export function renderScheduledPage(args: {
  hasAccount: boolean; noAccountAlert: string;
  scheduled: any[];
}): string {
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-calendar"></i>予約状況</h1>
    <p class="section-desc">予約済みの投稿・オートパイロットジョブを一覧できます。</p>
  </div>
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr><th>予約日時</th><th>アカウント</th><th>本文</th><th>状態</th></tr></thead>
      <tbody>
        ${args.scheduled.length === 0 ? `<tr><td colspan="4" class="text-center text-ink-muted py-10">予約なし</td></tr>` :
          args.scheduled.map(p => `
            <tr>
              <td class="text-xs font-mono">${p.scheduled_at || '-'}</td>
              <td class="text-xs">@${escapeHtml(p.x_username || '-')}</td>
              <td class="text-xs max-w-md"><div class="truncate">${escapeHtml((p.body||'').slice(0,80))}</div></td>
              <td>${statusPill(p.status)}</td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>
</div>`
}

// ============================================================
// 9. オートパイロット
// ============================================================
export function renderAutopilotPage(args: {
  hasAccount: boolean; noAccountAlert: string;
  accounts: any[]; jobs: any[];
}): string {
  return `
<div class="space-y-4">
  ${!args.hasAccount ? args.noAccountAlert : ''}
  <div>
    <h1 class="section-title"><i class="fas fa-plane-departure"></i>オートパイロット</h1>
    <p class="section-desc">カレンダー予約枠に対して、生成方式・内容・投稿設定を事前登録できます。</p>
  </div>
  <div class="flex justify-end">
    <button class="btn btn-primary" onclick="openApModal()"><i class="fas fa-plus"></i>新規作成</button>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">予約一覧</h3>
    <table class="data">
      <thead><tr><th>No</th><th>生成日時</th><th>投稿日時</th><th>アカウント</th><th>生成方式</th><th>テーマ</th><th>状態</th><th></th></tr></thead>
      <tbody>
        ${args.jobs.length === 0 ? `<tr><td colspan="8" class="text-center text-ink-muted py-10">予約がまだありません</td></tr>` :
          args.jobs.map((j: any, idx: number) => `
            <tr>
              <td class="text-xs text-ink-faint">${j.reservation_no || String(idx+1).padStart(4,'0')}</td>
              <td class="text-xs">${j.generate_at || '—'}</td>
              <td class="text-xs">${j.publish_at || '—'}</td>
              <td class="text-xs">@${escapeHtml(j.x_username || '-')}</td>
              <td><span class="pill pill-soft">${escapeHtml(j.content_mode || '-')}</span></td>
              <td class="text-xs max-w-xs truncate">${escapeHtml(j.theme || '—')}</td>
              <td><span class="pill ${j.status === 'error' ? 'pill-err' : j.status === 'posted' ? 'pill-ok' : 'pill-blue'}">${escapeHtml(j.status)}</span></td>
              <td class="text-right">
                <button class="btn btn-danger btn-sm" onclick="delApJob(${j.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>

  <!-- モーダル -->
  <div id="ap-modal" class="hide fixed inset-0 bg-black/50 items-center justify-center z-50 p-4" style="overflow-y:auto">
    <div class="bg-white rounded-xl max-w-xl w-full p-6 my-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">オートパイロット新規作成</h3>
        <button onclick="closeApModal()" class="text-ink-muted hover:text-ink"><i class="fas fa-xmark text-xl"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label"><i class="fas fa-user-circle icon-blue"></i>アカウント</label>
          <select id="ap-account" class="inp">
            <option value="">—</option>
            ${args.accounts.map(a => `<option value="${a.id}">@${escapeHtml(a.x_username || a.account_name)}</option>`).join('')}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="field-label"><i class="fas fa-calendar icon-purple"></i>生成日時</label>
            <input type="datetime-local" id="ap-gen" class="inp">
          </div>
          <div>
            <label class="field-label"><i class="fas fa-paper-plane icon-green"></i>投稿日時</label>
            <input type="datetime-local" id="ap-pub" class="inp" onchange="deriveGenAt()">
          </div>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-shapes icon-purple"></i>生成方式</label>
          <select id="ap-mode" class="inp">
            <option value="problem" selected>問題提起型</option>
            <option value="before_after">ビフォーアフター型</option>
            <option value="contrarian">逆張り型</option>
            <option value="howto">HowTo実演型</option>
            <option value="numbers">数字インパクト型</option>
            <option value="freetext">自由入力</option>
          </select>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-heading icon-blue"></i>テーマ <span class="text-red-500">*</span></label>
          <input type="text" id="ap-theme" class="inp" placeholder="例: AI自動化で副業収益を作る方法">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-tags icon-green"></i>キーワード</label>
          <input type="text" id="ap-kw" class="inp" placeholder="例: AI, 自動化, 副業">
        </div>
        <div class="border border-line rounded-lg p-3 bg-paper-soft">
          <div class="font-semibold text-accent mb-2"><i class="fas fa-sliders"></i> 投稿オプション</div>
          <div class="space-y-2">
            <input type="text" id="ap-footer" class="inp" placeholder="投稿末尾追記">
            <input type="url" id="ap-url" class="inp" placeholder="URL">
            <div class="flex gap-4">
              <label class="flex items-center gap-2"><input type="radio" name="ap-pm" value="body" checked><span class="text-sm">本文</span></label>
              <label class="flex items-center gap-2"><input type="radio" name="ap-pm" value="140"><span class="text-sm">140文字</span></label>
            </div>
          </div>
        </div>
        <div class="flex gap-2 pt-2 justify-end">
          <button class="btn btn-ghost" onclick="closeApModal()">キャンセル</button>
          <button class="btn btn-primary" onclick="submitApJob()"><i class="fas fa-check"></i>作成</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
function openApModal() { const m=document.getElementById('ap-modal'); m.classList.remove('hide'); m.style.display='flex'; }
function closeApModal() { const m=document.getElementById('ap-modal'); m.classList.add('hide'); m.style.display='none'; }
function deriveGenAt() {
  const pub = document.getElementById('ap-pub').value;
  if (!pub || document.getElementById('ap-gen').value) return;
  const d = new Date(pub); d.setMinutes(d.getMinutes() - 2);
  const pad = n => String(n).padStart(2,'0');
  document.getElementById('ap-gen').value = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
}
async function submitApJob() {
  const body = {
    account_id: parseInt(document.getElementById('ap-account').value, 10) || null,
    generate_at: document.getElementById('ap-gen').value.replace('T',' '),
    publish_at: document.getElementById('ap-pub').value.replace('T',' '),
    content_mode: document.getElementById('ap-mode').value,
    theme: document.getElementById('ap-theme').value.trim(),
    keywords: document.getElementById('ap-kw').value,
    link_url: document.getElementById('ap-url').value,
  };
  if (!body.theme) { toast('テーマを入力','err'); return; }
  const r = await fetch('/api/admin/autopilot/jobs', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.success) { toast('作成しました','ok'); location.reload(); } else toast('失敗','err');
}
async function delApJob(id) {
  if (!confirm('削除しますか?')) return;
  await fetch('/api/admin/autopilot/jobs/' + id, { method:'DELETE' });
  location.reload();
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
</script>`
}

// ============================================================
// 10. アカウント管理
// ============================================================
export function renderAccountsPage(args: { accounts: any[] }): string {
  return `
<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="section-title"><i class="fas fa-users-gear"></i>アカウント管理</h1>
      <p class="section-desc">Xアカウントの登録・トークン管理・健全性を確認します。</p>
    </div>
    <button class="btn btn-primary" onclick="openAddAcct()"><i class="fas fa-plus"></i>アカウント追加</button>
  </div>
  ${args.accounts.length === 0 ? `
    <div class="alert alert-info">
      <i class="fas fa-info-circle mt-0.5"></i>
      <div>Xアカウント未登録。X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、上の「アカウント追加」から登録してください。<br>
      <span class="text-xs opacity-70">※ OAuth 1.0a User Context 認証のため、ブラウザリダイレクトは不要です</span></div>
    </div>
  ` : `
    <div class="card" style="padding:0">
      <table class="data">
        <thead><tr><th>アカウント名</th><th>@handle</th><th>健全性</th><th>日次</th><th>最終投稿</th><th>状態</th><th></th></tr></thead>
        <tbody>
          ${args.accounts.map(a => `
            <tr>
              <td class="font-semibold">${escapeHtml(a.account_name)}</td>
              <td class="text-accent">@${escapeHtml(a.x_username || '未認証')}</td>
              <td><span class="font-bold ${a.account_health_score >= 80 ? 'text-emerald-600' : a.account_health_score >= 60 ? 'text-amber-600' : 'text-red-600'}">${a.account_health_score ?? 100}</span> <span class="pill ${a.health_status === 'risk' ? 'pill-err' : a.health_status === 'caution' ? 'pill-warn' : 'pill-ok'} ml-1">${a.health_status || 'healthy'}</span></td>
              <td class="text-xs">${a.daily_post_count ?? 0} / ${a.daily_post_limit ?? 5}</td>
              <td class="text-xs text-ink-muted">${a.last_posted_at || '-'}</td>
              <td>${a.is_active ? '<span class="pill pill-ok">有効</span>' : '<span class="pill pill-soft">停止</span>'}</td>
              <td class="text-right">
                <button class="btn btn-subtle btn-sm" onclick="testAcct(${a.id})"><i class="fas fa-vial"></i>接続テスト</button>
                <button class="btn btn-danger btn-sm" onclick="delAcct(${a.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `}

  <div id="add-acct-modal" class="hide fixed inset-0 bg-black/50 items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-lg w-full p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Xアカウント追加</h3>
        <button onclick="closeAddAcct()" class="text-ink-muted"><i class="fas fa-xmark text-xl"></i></button>
      </div>
      <div class="space-y-3">
        <div class="alert alert-info text-xs">X Developer Portal → User authentication settings → OAuth 1.0a → Keys and tokens</div>
        <div>
          <label class="field-label"><i class="fas fa-tag icon-blue"></i>アカウント表示名</label>
          <input type="text" id="na-name" class="inp" placeholder="例: KATO メイン">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>Access Token</label>
          <input type="text" id="na-token" class="inp input-mono" placeholder="1234567890-xxxxx">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>Access Token Secret</label>
          <input type="password" id="na-secret" class="inp input-mono">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-gauge icon-red"></i>日次投稿上限</label>
          <input type="number" id="na-limit" class="inp" value="5">
        </div>
        <div class="flex gap-2 pt-2">
          <button class="btn btn-ghost flex-1" onclick="closeAddAcct()">キャンセル</button>
          <button class="btn btn-primary flex-1" onclick="submitAddAcct()"><i class="fas fa-check"></i>追加</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
function openAddAcct() { const m=document.getElementById('add-acct-modal'); m.classList.remove('hide'); m.style.display='flex'; }
function closeAddAcct() { const m=document.getElementById('add-acct-modal'); m.classList.add('hide'); m.style.display='none'; }
async function submitAddAcct() {
  const body = {
    account_name: document.getElementById('na-name').value.trim(),
    access_token: document.getElementById('na-token').value.trim(),
    access_token_secret: document.getElementById('na-secret').value.trim(),
    daily_post_limit: parseInt(document.getElementById('na-limit').value, 10) || 5,
  };
  if (!body.account_name || !body.access_token || !body.access_token_secret) { toast('全て入力してください','err'); return; }
  const r = await fetch('/api/admin/accounts', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.success) { toast('追加しました','ok'); location.reload(); } else toast('失敗','err');
}
async function testAcct(id) {
  const r = await fetch('/api/admin/accounts/' + id + '/test', { method:'POST' });
  const j = await r.json();
  if (j.success) { toast('接続OK: @' + (j.me?.username || 'ok'),'ok'); location.reload(); }
  else toast('接続NG: ' + (j.error || ''),'err');
}
async function delAcct(id) {
  if (!confirm('削除しますか?')) return;
  await fetch('/api/admin/accounts/' + id, { method:'DELETE' });
  location.reload();
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
</script>`
}

// ============================================================
// 11. API設定
// ============================================================
export function renderApiPage(args: { settings: any }): string {
  const s = args.settings || {}
  return `
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-key"></i>API設定</h1>
    <p class="section-desc">X API (Consumer Key/Secret)・OpenAI・Telegram の設定を行います。</p>
  </div>
  <div class="card space-y-4">
    <h3 class="font-bold text-ink"><i class="fa-brands fa-x-twitter"></i> X API（アプリ共通）</h3>
    <div class="alert alert-info">
      <i class="fas fa-info-circle mt-0.5"></i>
      <div>Consumer Key / Secret はアプリ共通です。ユーザー毎の Access Token は <a href="/dashboard/accounts" class="underline">アカウント管理</a> で登録してください。</div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>Consumer Key (API Key)</label>
      <input type="text" id="api-xk" class="inp input-mono" value="${escapeHtml(s.api_key || '')}">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>Consumer Secret (API Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" value="${escapeHtml(s.api_secret || '')}">
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary" onclick="saveApi()"><i class="fas fa-save"></i>保存</button>
    </div>
    <span id="api-msg" class="text-xs"></span>
  </div>
</div>
<script>
async function saveApi() {
  toast('X API設定保存:次フェーズで本実装','info');
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
</script>`
}
