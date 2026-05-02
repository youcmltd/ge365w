};
  // 初回: ページロード2秒後（描画優先）
  setTimeout(runTick, 2000);
  // 以降: 5分毎
  setInterval(runTick, 5 * 60 * 1000);
  // Check scheduled posts often while the dashboard is open.
  setInterval(runTick, 30 * 1000);
};
// 自動起動
if (typeof document !== 'undefined') {
  fetch('/api/admin/thread/recent-posts').then(r => r.json()).then(j => {
    const items = (j.posts || []).filter(x => x.external_post_id).slice(0, 30);
    if (!sel) return;
    if (!items.length && j.error) {
      sel.innerHTML = '<option value="">— 取得失敗 —</option>';
      sel.style.display = '';
      toast('取得失敗: ' + j.error, 'err');
      return;
    }
    if (!items.length) {
      sel.innerHTML = '<option value="">— 投稿済みの記事が見つかりません —</option>';
      sel.style.display = '';
              <td>${t.is_active?'<span class="pill pill-ok">有効</span>':'<span class="pill pill-soft">停止</span>'}</td>
              <td class="text-right">
                <button class="btn btn-subtle btn-sm" onclick="testAcct(${t.id})"><i class="fas fa-vial"></i>接続テスト</button>
                <button class="btn btn-ghost btn-sm" onclick="openEditAcct(${t.id}, '${w(t.account_name).replace(/'/g,"&#39;")}')"><i class="fas fa-pen"></i>編集</button>
                <button class="btn btn-ghost btn-sm" onclick="openEditAcct(${t.id})" style="min-width:4.8rem;background:#fff;color:#1D4ED8;border-color:#BFDBFE"><i class="fas fa-pen"></i> 編集</button>
                <button class="btn btn-danger btn-sm" onclick="delAcct(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
<script>
function openAddAcct() { document.getElementById('add-acct-modal').style.display='flex'; }
function closeAddAcct() { document.getElementById('add-acct-modal').style.display='none'; }
function openEditAcct(id, name) {
async function openEditAcct(id) {
  const old = document.getElementById('edit-acct-modal');
  if (old) old.remove();
  let acct = null;
  try {
    const r = await fetch('/api/admin/accounts');
    const j = await r.json();
    acct = (j.accounts || []).find(a => Number(a.id) === Number(id));
  } catch (err) {}
  if (!acct) { toast('アカウント情報を取得できません','err'); return; }
  const name = escapeHtml(acct.account_name || acct.handle || acct.x_username || '');
  const modal = document.createElement('div');
  modal.id = 'edit-acct-modal';
  modal.style.cssText = 'display:flex;position:fixed;inset:0;background:rgba(0,0,0,.5);align-items:center;justify-content:center;z-index:55;padding:1rem';
at.get("/api/admin/thread/recent-posts",m,async e=>{
  const t=e.get("user");
  const acctId=e.req.query("account_id");
  const params=[t.id];
  let acctCond="";
  if(acctId){acctCond=" AND pq.account_id=?";params.push(Number(acctId))}
  // post_queue から status='posted' AND external_post_id がある最新30件
  const{results:rq}=await e.env.DB.prepare(`SELECT pq.id, pq.body AS content, pq.external_post_id, pq.posted_at, pq.account_id,
       xa.account_name AS joined_account_name, xa.x_username
     FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
    WHERE pq.user_id=? AND pq.status='posted' AND pq.external_post_id IS NOT NULL AND pq.external_post_id <> ''${acctCond}
    ORDER BY COALESCE(pq.posted_at, pq.updated_at, pq.created_at) DESC LIMIT 30`).bind(...params).all();
  // post_logs にカラムがある場合は併合（無くても動作する保険付き try-catch）
  let merged=[...(rq||[])];
  let acct=null;
  if(acctId){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=? LIMIT 1").bind(Number(acctId),t.id).first()}
  if(!acct){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first()}
  if(!acct){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first()}
  if(!acct)return e.json({posts:[],source:"x_live",error:"No active X account"});
  let creds;
  try{creds=await Ft(e.env,acct)}catch(err){return e.json({posts:[],source:"x_live",error:(err&&err.message)||"creds_failed"})}
  let xUserId=acct.x_user_id;
  let xUsername=acct.x_username||acct.account_name||"";
  try{
    const params2=[t.id];
    let acctCond2="";
    if(acctId){acctCond2=" AND pl.account_id=?";params2.push(Number(acctId))}
    const{results:rl}=await e.env.DB.prepare(`SELECT pl.id, pl.content, pl.external_post_id, pl.posted_at, pl.account_id,
         xa.account_name AS joined_account_name, xa.x_username
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id=xa.id
      WHERE pl.user_id=? AND pl.status='posted' AND pl.external_post_id IS NOT NULL AND pl.external_post_id <> ''${acctCond2}
      ORDER BY COALESCE(pl.posted_at, pl.created_at) DESC LIMIT 30`).bind(...params2).all();
    const seen=new Set(merged.map(r=>r.external_post_id));
    for(const r of(rl||[])){
      if(!seen.has(r.external_post_id)){seen.add(r.external_post_id);merged.push(r);}
    if(!xUserId){
      const me=await kn(creds);
      xUserId=me.id;
      xUsername=me.username||xUsername;
      await e.env.DB.prepare("UPDATE x_accounts SET x_user_id=?, x_username=?, updated_at=? WHERE id=?").bind(xUserId,xUsername,g(),acct.id).run().catch(()=>{});
    }
  }catch{}
  // api_response_summary にtweet_idがある場合のフォールバック取得
  if(merged.length===0){
    try{
      const{results:rl2}=await e.env.DB.prepare(`SELECT pl.id, pl.content, pl.api_response_summary, pl.posted_at, pl.account_id,
           xa.account_name AS joined_account_name, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id=xa.id
        WHERE pl.user_id=? AND pl.status='posted' AND pl.api_response_summary IS NOT NULL
        ORDER BY COALESCE(pl.posted_at, pl.created_at) DESC LIMIT 30`).bind(t.id).all();
      for(const r of(rl2||[])){
        try{
          const j=JSON.parse(r.api_response_summary||"{}");
          if(j.tweet_id){
            merged.push({...r, external_post_id: j.tweet_id});
          }
        }catch{}
      }
    }catch{}
    const timeline=await $t("GET","/users/"+encodeURIComponent(xUserId)+"/tweets?max_results=30&tweet.fields=created_at,conversation_id,referenced_tweets",void 0,creds);
    const posts=((timeline&&timeline.data)||[]).map(r=>({
      id:"live-"+r.id,
      content:r.text||"",
      external_post_id:r.id,
      posted_at:(r.created_at||"").replace("T"," ").replace("Z",""),
      created_at:r.created_at||"",
      account_id:acct.id,
      joined_account_name:acct.account_name,
      x_username:xUsername,
      source:"x_live"
    }));
    return e.json({posts,source:"x_live"});
  }catch(err){
    return e.json({posts:[],source:"x_live",error:(err&&err.message)||"x_recent_fetch_failed"});
  }
  merged.sort((a,b)=>(b.posted_at||"").localeCompare(a.posted_at||""));
  return e.json({posts:merged.slice(0,30)});
});
at.post("/api/admin/thread/post-now",m,async e=>{
  const t=e.get("user");
