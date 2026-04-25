var ds=Object.defineProperty;var Vt=e=>{throw TypeError(e)};var cs=(e,t,a)=>t in e?ds(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var _=(e,t,a)=>cs(e,typeof t!="symbol"?t+"":t,a),Ot=(e,t,a)=>t.has(e)||Vt("Cannot "+a);var u=(e,t,a)=>(Ot(e,t,"read from private field"),a?a.call(e):t.get(e)),E=(e,t,a)=>t.has(e)?Vt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),b=(e,t,a,s)=>(Ot(e,t,"write to private field"),s?s.call(e,a):t.set(e,a),a),k=(e,t,a)=>(Ot(e,t,"access private method"),a);var Gt=(e,t,a,s)=>({set _(n){b(e,t,n,a)},get _(){return u(e,t,s)}});var Xt=(e,t,a)=>(s,n)=>{let i=-1;return r(0);async function r(l){if(l<=i)throw new Error("next() called multiple times");i=l;let o,d=!1,c;if(e[l]?(c=e[l][0][0],s.req.routeIndex=l):c=l===e.length&&n||void 0,c)try{o=await c(s,()=>r(l+1))}catch(p){if(p instanceof Error&&t)s.error=p,o=await t(p,s),d=!0;else throw p}else s.finalized===!1&&a&&(o=await a(s));return o&&(s.finalized===!1||d)&&(s.res=o),s}},ps=Symbol(),us=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,i=(e instanceof ka?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?ms(e,{all:a,dot:s}):{}};async function ms(e,t){const a=await e.formData();return a?fs(a,t):{}}function fs(e,t){const a=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?hs(a,n,s):a[n]=s}),t.dot&&Object.entries(a).forEach(([s,n])=>{s.includes(".")&&(gs(a,s,n),delete a[s])}),a}var hs=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},gs=(e,t,a)=>{if(/(?:^|\.)__proto__\./.test(t))return;let s=e;const n=t.split(".");n.forEach((i,r)=>{r===n.length-1?s[i]=a:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},ba=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},_s=e=>{const{groups:t,path:a}=bs(e),s=ba(a);return vs(s,t)},bs=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const n=`@${s}`;return t.push([n,a]),n}),{groups:t,path:e}},vs=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[a][1]);break}}return e},mt={},ys=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return mt[s]||(a[2]?mt[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:mt[s]=[e,a[1],!0]),mt[s]}return null},Ft=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},va=e=>Ft(e,decodeURI),ya=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let s=a;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const i=t.indexOf("?",s),r=t.indexOf("#",s),l=i===-1?r===-1?void 0:r:r===-1?i:Math.min(i,r),o=t.slice(a,l);return va(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(n===63||n===35)break}return t.slice(a,s)},xs=e=>{const t=ya(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Re=(e,t,...a)=>(a.length&&(t=Re(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),xa=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){a.length===0&&s===""?a.push("/"):a.push(s);const i=n.replace("?","");s+="/"+i,a.push(s)}else s+="/"+n}),a.filter((n,i,r)=>r.indexOf(n)===i)},Rt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Ft(e,wa):e):e,Ea=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const l=e.charCodeAt(r+t.length+1);if(l===61){const o=r+t.length+2,d=e.indexOf("&",o);return Rt(e.slice(o,d===-1?void 0:d))}else if(l==38||isNaN(l))return"";r=e.indexOf(`&${t}`,r+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const r=e.indexOf("&",i+1);let l=e.indexOf("=",i);l>r&&r!==-1&&(l=-1);let o=e.slice(i+1,l===-1?r===-1?void 0:r:l);if(s&&(o=Rt(o)),i=r,o==="")continue;let d;l===-1?d="":(d=e.slice(l+1,r===-1?void 0:r),s&&(d=Rt(d))),a?(n[o]&&Array.isArray(n[o])||(n[o]=[]),n[o].push(d)):n[o]??(n[o]=d)}return t?n[t]:n},Es=Ea,ws=(e,t)=>Ea(e,t,!0),wa=decodeURIComponent,Zt=e=>Ft(e,wa),Le,z,oe,Sa,Ta,Ct,le,ua,ka=(ua=class{constructor(e,t="/",a=[[]]){E(this,oe);_(this,"raw");E(this,Le);E(this,z);_(this,"routeIndex",0);_(this,"path");_(this,"bodyCache",{});E(this,le,e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,b(this,z,a),b(this,Le,{})}param(e){return e?k(this,oe,Sa).call(this,e):k(this,oe,Ta).call(this)}query(e){return Es(this.url,e)}queries(e){return ws(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){return us(this,e)}json(){return u(this,le).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,le).call(this,"text")}arrayBuffer(){return u(this,le).call(this,"arrayBuffer")}blob(){return u(this,le).call(this,"blob")}formData(){return u(this,le).call(this,"formData")}addValidatedData(e,t){u(this,Le)[e]=t}valid(e){return u(this,Le)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ps](){return u(this,z)}get matchedRoutes(){return u(this,z)[0].map(([[,e]])=>e)}get routePath(){return u(this,z)[0].map(([[,e]])=>e)[this.routeIndex].path}},Le=new WeakMap,z=new WeakMap,oe=new WeakSet,Sa=function(e){const t=u(this,z)[0][this.routeIndex][1][e],a=k(this,oe,Ct).call(this,t);return a&&/\%/.test(a)?Zt(a):a},Ta=function(){const e={},t=Object.keys(u(this,z)[0][this.routeIndex][1]);for(const a of t){const s=k(this,oe,Ct).call(this,u(this,z)[0][this.routeIndex][1][a]);s!==void 0&&(e[a]=/\%/.test(s)?Zt(s):s)}return e},Ct=function(e){return u(this,z)[1]?u(this,z)[1][e]:e},le=new WeakMap,ua),ks={Stringify:1},Aa=async(e,t,a,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(l=>l({phase:t,buffer:n,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(o=>Aa(o,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Ss="text/plain; charset=UTF-8",Bt=(e,t)=>({"Content-Type":e,...t}),Ke=(e,t)=>new Response(e,t),tt,at,te,Me,ae,F,st,Fe,$e,ve,nt,it,de,Be,ma,Ts=(ma=class{constructor(e,t){E(this,de);E(this,tt);E(this,at);_(this,"env",{});E(this,te);_(this,"finalized",!1);_(this,"error");E(this,Me);E(this,ae);E(this,F);E(this,st);E(this,Fe);E(this,$e);E(this,ve);E(this,nt);E(this,it);_(this,"render",(...e)=>(u(this,Fe)??b(this,Fe,t=>this.html(t)),u(this,Fe).call(this,...e)));_(this,"setLayout",e=>b(this,st,e));_(this,"getLayout",()=>u(this,st));_(this,"setRenderer",e=>{b(this,Fe,e)});_(this,"header",(e,t,a)=>{this.finalized&&b(this,F,Ke(u(this,F).body,u(this,F)));const s=u(this,F)?u(this,F).headers:u(this,ve)??b(this,ve,new Headers);t===void 0?s.delete(e):a!=null&&a.append?s.append(e,t):s.set(e,t)});_(this,"status",e=>{b(this,Me,e)});_(this,"set",(e,t)=>{u(this,te)??b(this,te,new Map),u(this,te).set(e,t)});_(this,"get",e=>u(this,te)?u(this,te).get(e):void 0);_(this,"newResponse",(...e)=>k(this,de,Be).call(this,...e));_(this,"body",(e,t,a)=>k(this,de,Be).call(this,e,t,a));_(this,"text",(e,t,a)=>!u(this,ve)&&!u(this,Me)&&!t&&!a&&!this.finalized?new Response(e):k(this,de,Be).call(this,e,t,Bt(Ss,a)));_(this,"json",(e,t,a)=>k(this,de,Be).call(this,JSON.stringify(e),t,Bt("application/json",a)));_(this,"html",(e,t,a)=>{const s=n=>k(this,de,Be).call(this,n,t,Bt("text/html; charset=UTF-8",a));return typeof e=="object"?Aa(e,ks.Stringify,!1,{}).then(s):s(e)});_(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});_(this,"notFound",()=>(u(this,$e)??b(this,$e,()=>Ke()),u(this,$e).call(this,this)));b(this,tt,e),t&&(b(this,ae,t.executionCtx),this.env=t.env,b(this,$e,t.notFoundHandler),b(this,it,t.path),b(this,nt,t.matchResult))}get req(){return u(this,at)??b(this,at,new ka(u(this,tt),u(this,it),u(this,nt))),u(this,at)}get event(){if(u(this,ae)&&"respondWith"in u(this,ae))return u(this,ae);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,ae))return u(this,ae);throw Error("This context has no ExecutionContext")}get res(){return u(this,F)||b(this,F,Ke(null,{headers:u(this,ve)??b(this,ve,new Headers)}))}set res(e){if(u(this,F)&&e){e=Ke(e.body,e);for(const[t,a]of u(this,F).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=u(this,F).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,a)}b(this,F,e),this.finalized=!0}get var(){return u(this,te)?Object.fromEntries(u(this,te)):{}}},tt=new WeakMap,at=new WeakMap,te=new WeakMap,Me=new WeakMap,ae=new WeakMap,F=new WeakMap,st=new WeakMap,Fe=new WeakMap,$e=new WeakMap,ve=new WeakMap,nt=new WeakMap,it=new WeakMap,de=new WeakSet,Be=function(e,t,a){const s=u(this,F)?new Headers(u(this,F).headers):u(this,ve)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,l]of i)r.toLowerCase()==="set-cookie"?s.append(r,l):s.set(r,l)}if(a)for(const[i,r]of Object.entries(a))if(typeof r=="string")s.set(i,r);else{s.delete(i);for(const l of r)s.append(i,l)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Me);return Ke(e,{status:n,headers:s})},ma),O="ALL",As="all",Is=["get","post","put","delete","options","patch"],Ia="Can not add a route since the matcher is already built.",Da=class extends Error{},Ds="__COMPOSED_HANDLER",js=e=>e.text("404 Not Found",404),Qt=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},K,R,ja,J,_e,ht,gt,Pe,Os=(Pe=class{constructor(t={}){E(this,R);_(this,"get");_(this,"post");_(this,"put");_(this,"delete");_(this,"options");_(this,"patch");_(this,"all");_(this,"on");_(this,"use");_(this,"router");_(this,"getPath");_(this,"_basePath","/");E(this,K,"/");_(this,"routes",[]);E(this,J,js);_(this,"errorHandler",Qt);_(this,"onError",t=>(this.errorHandler=t,this));_(this,"notFound",t=>(b(this,J,t),this));_(this,"fetch",(t,...a)=>k(this,R,gt).call(this,t,a[1],a[0],t.method));_(this,"request",(t,a,s,n)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Re("/",t)}`,a),s,n)));_(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(k(this,R,gt).call(this,t.request,t,void 0,t.request.method))})});[...Is,As].forEach(i=>{this[i]=(r,...l)=>(typeof r=="string"?b(this,K,r):k(this,R,_e).call(this,i,u(this,K),r),l.forEach(o=>{k(this,R,_e).call(this,i,u(this,K),o)}),this)}),this.on=(i,r,...l)=>{for(const o of[r].flat()){b(this,K,o);for(const d of[i].flat())l.map(c=>{k(this,R,_e).call(this,d.toUpperCase(),u(this,K),c)})}return this},this.use=(i,...r)=>(typeof i=="string"?b(this,K,i):(b(this,K,"*"),r.unshift(i)),r.forEach(l=>{k(this,R,_e).call(this,O,u(this,K),l)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??ya:xs}route(t,a){const s=this.basePath(t);return a.routes.map(n=>{var r;let i;a.errorHandler===Qt?i=n.handler:(i=async(l,o)=>(await Xt([],a.errorHandler)(l,()=>n.handler(l,o))).res,i[Ds]=n.handler),k(r=s,R,_e).call(r,n.method,n.path,i)}),this}basePath(t){const a=k(this,R,ja).call(this);return a._basePath=Re(this._basePath,t),a}mount(t,a,s){let n,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?n=o=>o:n=s.replaceRequest));const r=i?o=>{const d=i(o);return Array.isArray(d)?d:[d]}:o=>{let d;try{d=o.executionCtx}catch{}return[o.env,d]};n||(n=(()=>{const o=Re(this._basePath,t),d=o==="/"?0:o.length;return c=>{const p=new URL(c.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,c)}})());const l=async(o,d)=>{const c=await a(n(o.req.raw),...r(o));if(c)return c;await d()};return k(this,R,_e).call(this,O,Re(t,"*"),l),this}},K=new WeakMap,R=new WeakSet,ja=function(){const t=new Pe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,b(t,J,u(this,J)),t.routes=this.routes,t},J=new WeakMap,_e=function(t,a,s){t=t.toUpperCase(),a=Re(this._basePath,a);const n={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,n]),this.routes.push(n)},ht=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},gt=function(t,a,s,n){if(n==="HEAD")return(async()=>new Response(null,await k(this,R,gt).call(this,t,a,s,"GET")))();const i=this.getPath(t,{env:s}),r=this.router.match(n,i),l=new Ts(t,{path:i,matchResult:r,env:s,executionCtx:a,notFoundHandler:u(this,J)});if(r[0].length===1){let d;try{d=r[0][0][0][0](l,async()=>{l.res=await u(this,J).call(this,l)})}catch(c){return k(this,R,ht).call(this,c,l)}return d instanceof Promise?d.then(c=>c||(l.finalized?l.res:u(this,J).call(this,l))).catch(c=>k(this,R,ht).call(this,c,l)):d??u(this,J).call(this,l)}const o=Xt(r[0],this.errorHandler,u(this,J));return(async()=>{try{const d=await o(l);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return k(this,R,ht).call(this,d,l)}})()},Pe),Oa=[];function Rs(e,t){const a=this.buildAllMatchers(),s=((n,i)=>{const r=a[n]||a[O],l=r[2][i];if(l)return l;const o=i.match(r[0]);if(!o)return[[],Oa];const d=o.indexOf("",1);return[r[1][d],o]});return this.match=s,s(e,t)}var vt="[^/]+",Ge=".*",Xe="(?:|/.*)",Ce=Symbol(),Bs=new Set(".\\+*[^]$()");function Cs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ge||e===Xe?1:t===Ge||t===Xe?-1:e===vt?1:t===vt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ye,xe,V,ke,Ns=(ke=class{constructor(){E(this,ye);E(this,xe);E(this,V,Object.create(null))}insert(t,a,s,n,i){if(t.length===0){if(u(this,ye)!==void 0)throw Ce;if(i)return;b(this,ye,a);return}const[r,...l]=t,o=r==="*"?l.length===0?["","",Ge]:["","",vt]:r==="/*"?["","",Xe]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(o){const c=o[1];let p=o[2]||vt;if(c&&o[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Ce;if(d=u(this,V)[p],!d){if(Object.keys(u(this,V)).some(m=>m!==Ge&&m!==Xe))throw Ce;if(i)return;d=u(this,V)[p]=new ke,c!==""&&b(d,xe,n.varIndex++)}!i&&c!==""&&s.push([c,u(d,xe)])}else if(d=u(this,V)[r],!d){if(Object.keys(u(this,V)).some(c=>c.length>1&&c!==Ge&&c!==Xe))throw Ce;if(i)return;d=u(this,V)[r]=new ke}d.insert(l,a,s,n,i)}buildRegExpStr(){const a=Object.keys(u(this,V)).sort(Cs).map(s=>{const n=u(this,V)[s];return(typeof u(n,xe)=="number"?`(${s})@${u(n,xe)}`:Bs.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof u(this,ye)=="number"&&a.unshift(`#${u(this,ye)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},ye=new WeakMap,xe=new WeakMap,V=new WeakMap,ke),xt,rt,fa,Ls=(fa=class{constructor(){E(this,xt,{varIndex:0});E(this,rt,new Ns)}insert(e,t,a){const s=[],n=[];for(let r=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,o=>{const d=`@\\${r}`;return n[r]=[d,o],r++,l=!0,d}),!l)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[l]=n[r];for(let o=i.length-1;o>=0;o--)if(i[o].indexOf(l)!==-1){i[o]=i[o].replace(l,n[r][1]);break}}return u(this,rt).insert(i,t,s,u(this,xt),a),s}buildRegExp(){let e=u(this,rt).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,r)=>i!==void 0?(a[++t]=Number(i),"$()"):(r!==void 0&&(s[Number(r)]=++t),"")),[new RegExp(`^${e}`),a,s]}},xt=new WeakMap,rt=new WeakMap,fa),Ms=[/^$/,[],Object.create(null)],_t=Object.create(null);function Ra(e){return _t[e]??(_t[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Fs(){_t=Object.create(null)}function $s(e){var d;const t=new Ls,a=[];if(e.length===0)return Ms;const s=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,p],[m,h])=>c?1:m?-1:p.length-h.length),n=Object.create(null);for(let c=0,p=-1,m=s.length;c<m;c++){const[h,g,v]=s[c];h?n[g]=[v.map(([T])=>[T,Object.create(null)]),Oa]:p++;let x;try{x=t.insert(g,p,h)}catch(T){throw T===Ce?new Da(g):T}h||(a[p]=v.map(([T,w])=>{const I=Object.create(null);for(w-=1;w>=0;w--){const[j,C]=x[w];I[j]=C}return[T,I]}))}const[i,r,l]=t.buildRegExp();for(let c=0,p=a.length;c<p;c++)for(let m=0,h=a[c].length;m<h;m++){const g=(d=a[c][m])==null?void 0:d[1];if(!g)continue;const v=Object.keys(g);for(let x=0,T=v.length;x<T;x++)g[v[x]]=l[g[v[x]]]}const o=[];for(const c in r)o[c]=a[r[c]];return[i,o,n]}function Oe(e,t){if(e){for(const a of Object.keys(e).sort((s,n)=>n.length-s.length))if(Ra(a).test(t))return[...e[a]]}}var ce,pe,Et,Ba,ha,Ps=(ha=class{constructor(){E(this,Et);_(this,"name","RegExpRouter");E(this,ce);E(this,pe);_(this,"match",Rs);b(this,ce,{[O]:Object.create(null)}),b(this,pe,{[O]:Object.create(null)})}add(e,t,a){var l;const s=u(this,ce),n=u(this,pe);if(!s||!n)throw new Error(Ia);s[e]||[s,n].forEach(o=>{o[e]=Object.create(null),Object.keys(o[O]).forEach(d=>{o[e][d]=[...o[O][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const o=Ra(t);e===O?Object.keys(s).forEach(d=>{var c;(c=s[d])[t]||(c[t]=Oe(s[d],t)||Oe(s[O],t)||[])}):(l=s[e])[t]||(l[t]=Oe(s[e],t)||Oe(s[O],t)||[]),Object.keys(s).forEach(d=>{(e===O||e===d)&&Object.keys(s[d]).forEach(c=>{o.test(c)&&s[d][c].push([a,i])})}),Object.keys(n).forEach(d=>{(e===O||e===d)&&Object.keys(n[d]).forEach(c=>o.test(c)&&n[d][c].push([a,i]))});return}const r=xa(t)||[t];for(let o=0,d=r.length;o<d;o++){const c=r[o];Object.keys(n).forEach(p=>{var m;(e===O||e===p)&&((m=n[p])[c]||(m[c]=[...Oe(s[p],c)||Oe(s[O],c)||[]]),n[p][c].push([a,i-d+o+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,pe)).concat(Object.keys(u(this,ce))).forEach(t=>{e[t]||(e[t]=k(this,Et,Ba).call(this,t))}),b(this,ce,b(this,pe,void 0)),Fs(),e}},ce=new WeakMap,pe=new WeakMap,Et=new WeakSet,Ba=function(e){const t=[];let a=e===O;return[u(this,ce),u(this,pe)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];n.length!==0?(a||(a=!0),t.push(...n)):e!==O&&t.push(...Object.keys(s[O]).map(i=>[i,s[O][i]]))}),a?$s(t):null},ha),ue,se,ga,qs=(ga=class{constructor(e){_(this,"name","SmartRouter");E(this,ue,[]);E(this,se,[]);b(this,ue,e.routers)}add(e,t,a){if(!u(this,se))throw new Error(Ia);u(this,se).push([e,t,a])}match(e,t){if(!u(this,se))throw new Error("Fatal error");const a=u(this,ue),s=u(this,se),n=a.length;let i=0,r;for(;i<n;i++){const l=a[i];try{for(let o=0,d=s.length;o<d;o++)l.add(...s[o]);r=l.match(e,t)}catch(o){if(o instanceof Da)continue;throw o}this.match=l.match.bind(l),b(this,ue,[l]),b(this,se,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(u(this,se)||u(this,ue).length!==1)throw new Error("No active router has been determined yet.");return u(this,ue)[0]}},ue=new WeakMap,se=new WeakMap,ga),Je=Object.create(null),Hs=e=>{for(const t in e)return!0;return!1},me,L,Ee,qe,N,ne,be,He,Us=(He=class{constructor(t,a,s){E(this,ne);E(this,me);E(this,L);E(this,Ee);E(this,qe,0);E(this,N,Je);if(b(this,L,s||Object.create(null)),b(this,me,[]),t&&a){const n=Object.create(null);n[t]={handler:a,possibleKeys:[],score:0},b(this,me,[n])}b(this,Ee,[])}insert(t,a,s){b(this,qe,++Gt(this,qe)._);let n=this;const i=_s(a),r=[];for(let l=0,o=i.length;l<o;l++){const d=i[l],c=i[l+1],p=ys(d,c),m=Array.isArray(p)?p[0]:d;if(m in u(n,L)){n=u(n,L)[m],p&&r.push(p[1]);continue}u(n,L)[m]=new He,p&&(u(n,Ee).push(p),r.push(p[1])),n=u(n,L)[m]}return u(n,me).push({[t]:{handler:s,possibleKeys:r.filter((l,o,d)=>d.indexOf(l)===o),score:u(this,qe)}}),n}search(t,a){var c;const s=[];b(this,N,Je);let i=[this];const r=ba(a),l=[],o=r.length;let d=null;for(let p=0;p<o;p++){const m=r[p],h=p===o-1,g=[];for(let x=0,T=i.length;x<T;x++){const w=i[x],I=u(w,L)[m];I&&(b(I,N,u(w,N)),h?(u(I,L)["*"]&&k(this,ne,be).call(this,s,u(I,L)["*"],t,u(w,N)),k(this,ne,be).call(this,s,I,t,u(w,N))):g.push(I));for(let j=0,C=u(w,Ee).length;j<C;j++){const ut=u(w,Ee)[j],G=u(w,N)===Je?{}:{...u(w,N)};if(ut==="*"){const De=u(w,L)["*"];De&&(k(this,ne,be).call(this,s,De,t,u(w,N)),b(De,N,G),g.push(De));continue}const[ls,Jt,ze]=ut;if(!m&&!(ze instanceof RegExp))continue;const Q=u(w,L)[ls];if(ze instanceof RegExp){if(d===null){d=new Array(o);let je=a[0]==="/"?1:0;for(let Ye=0;Ye<o;Ye++)d[Ye]=je,je+=r[Ye].length+1}const De=a.substring(d[p]),jt=ze.exec(De);if(jt){if(G[Jt]=jt[0],k(this,ne,be).call(this,s,Q,t,u(w,N),G),Hs(u(Q,L))){b(Q,N,G);const je=((c=jt[0].match(/\//))==null?void 0:c.length)??0;(l[je]||(l[je]=[])).push(Q)}continue}}(ze===!0||ze.test(m))&&(G[Jt]=m,h?(k(this,ne,be).call(this,s,Q,t,G,u(w,N)),u(Q,L)["*"]&&k(this,ne,be).call(this,s,u(Q,L)["*"],t,G,u(w,N))):(b(Q,N,G),g.push(Q)))}}const v=l.shift();i=v?g.concat(v):g}return s.length>1&&s.sort((p,m)=>p.score-m.score),[s.map(({handler:p,params:m})=>[p,m])]}},me=new WeakMap,L=new WeakMap,Ee=new WeakMap,qe=new WeakMap,N=new WeakMap,ne=new WeakSet,be=function(t,a,s,n,i){for(let r=0,l=u(a,me).length;r<l;r++){const o=u(a,me)[r],d=o[s]||o[O],c={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),n!==Je||i&&i!==Je))for(let p=0,m=d.possibleKeys.length;p<m;p++){const h=d.possibleKeys[p],g=c[d.score];d.params[h]=i!=null&&i[h]&&!g?i[h]:n[h]??(i==null?void 0:i[h]),c[d.score]=!0}}},He),we,_a,Ws=(_a=class{constructor(){_(this,"name","TrieRouter");E(this,we);b(this,we,new Us)}add(e,t,a){const s=xa(t);if(s){for(let n=0,i=s.length;n<i;n++)u(this,we).insert(e,s[n],a);return}u(this,we).insert(e,t,a)}match(e,t){return u(this,we).search(e,t)}},we=new WeakMap,_a),D=class extends Os{constructor(e={}){super(e),this.router=e.router??new qs({routers:[new Ps,new Ws]})}},zs=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ea=(e,t=Ks)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let n=t[s[1].toLowerCase()];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Ys={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ks=Ys,Js=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const a=t.split("/"),s=[];for(const n of a)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},Ca={br:".br",zstd:".zst",gzip:".gz"},Vs=Object.keys(Ca),Gs="index.html",Xs=e=>{const t=e.root??"./",a=e.path,s=e.join??Js;return async(n,i)=>{var c,p,m,h;if(n.finalized)return i();let r;if(e.path)r=e.path;else try{if(r=va(n.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r))throw new Error}catch{return await((c=e.onNotFound)==null?void 0:c.call(e,n.req.path,n)),i()}let l=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(l)&&(l=s(l,Gs));const o=e.getContent;let d=await o(l,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const g=e.mimes&&ea(l,e.mimes)||ea(l);if(n.header("Content-Type",g||"application/octet-stream"),e.precompressed&&(!g||zs.test(g))){const v=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(x=>x.trim()));for(const x of Vs){if(!v.has(x))continue;const T=await o(l+Ca[x],n);if(T){d=T,n.header("Content-Encoding",x),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,l,n)),n.body(d)}await((h=e.onNotFound)==null?void 0:h.call(e,l,n)),await i()}},Zs=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=a[e];if(!n)return null;const i=await s.get(n,{type:"stream"});return i||null},Qs=e=>async function(a,s){return Xs({...e,getContent:async i=>Zs(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},en=e=>Qs(e);const H={name:"Growth-engine365X",version:"ver1.00",tagline:"X (Twitter) 自動投稿プラットフォーム",longName:"X (Twitter) 自動投稿プラットフォーム",icon:"fa-bolt"},tn=`
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root{
  --sidebar:#1E2A3B;--sidebar-hover:#2A3B52;--sidebar-active:#2F4A7A;
  --accent:#2563EB;--accent-hover:#1D4ED8;--accent-light:#EFF6FF;
  --paper:#F7F8FB;--paper-soft:#F1F3F7;--card:#FFFFFF;
  --ink:#1F2937;--ink-muted:#6B7280;--ink-faint:#9CA3AF;--line:#E5E7EB;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:'Noto Sans JP',Inter,system-ui,sans-serif;font-size:15px;line-height:1.55;min-height:100vh}

/* ===== レイアウト ===== */
.min-h-screen{min-height:100vh}
.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1 1 0%}
.flex-shrink-0{flex-shrink:0}.flex-wrap{flex-wrap:wrap}.min-w-0{min-width:0}
.items-center{align-items:center}.items-start{align-items:flex-start}
.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}
.grid{display:grid}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(min-width:768px){.md:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media(min-width:1024px){.lg:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
.overflow-y-auto{overflow-y:auto}.overflow-hidden{overflow:hidden}
.space-y-4>*+*{margin-top:1rem}.space-y-3>*+*{margin-top:.75rem}.space-y-2>*+*{margin-top:.5rem}
.fixed{position:fixed}.relative{position:relative}.absolute{position:absolute}
.inset-0{top:0;right:0;bottom:0;left:0}
.z-50{z-index:50}.z-40{z-index:40}

/* ===== サイズ ===== */
.w-full{width:100%}.h-full{height:100%}
.w-56{width:14rem}.w-8{width:2rem}.h-8{height:2rem}
.w-13{width:3.25rem}.h-13{height:3.25rem}
.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}

/* ===== スペーシング ===== */
.p-2{padding:.5rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-8{padding:2rem}
.px-1{padding-left:.25rem;padding-right:.25rem}
.px-3{padding-left:.75rem;padding-right:.75rem}
.px-4{padding-left:1rem;padding-right:1rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-2{padding-top:.5rem;padding-bottom:.5rem}
.py-3{padding-top:.75rem;padding-bottom:.75rem}
.py-4{padding-top:1rem;padding-bottom:1rem}
.py-6{padding-top:1.5rem;padding-bottom:1.5rem}
.py-10{padding-top:2.5rem;padding-bottom:2.5rem}
.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}
.mt-0.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}
.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-2{margin-right:.5rem}.ml-auto{margin-left:auto}
.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}

/* ===== テキスト ===== */
.text-xs{font-size:.78rem;line-height:1.1rem}
.text-sm{font-size:.9rem;line-height:1.3rem}
.text-base{font-size:1rem;line-height:1.5rem}
.text-lg{font-size:1.125rem;line-height:1.75rem}
.text-xl{font-size:1.25rem;line-height:1.75rem}
.text-2xl{font-size:1.5rem;line-height:2rem}
.text-[10px]{font-size:10px}
.text-[6px]{font-size:6px}
.font-medium{font-weight:500}.font-semibold{font-weight:600}.font-bold{font-weight:700}
.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}
.leading-relaxed{line-height:1.625}.underline{text-decoration:underline}
.uppercase{text-transform:uppercase}.tracking-wider{letter-spacing:.05em}
.whitespace-pre-wrap{white-space:pre-wrap}
.font-mono{font-family:'JetBrains Mono',monospace}

/* ===== カラー ===== */
.text-white{color:#fff}
.text-ink{color:var(--ink)}.text-ink-muted{color:var(--ink-muted)}.text-ink-faint{color:var(--ink-faint)}
.text-accent{color:var(--accent)}
.text-[#A7B6CE]{color:#A7B6CE}
.text-red-500{color:#EF4444}.text-red-600{color:#DC2626}.text-red-700{color:#B91C1C}
.text-amber-600{color:#D97706}.text-amber-800{color:#92400E}
.text-emerald-600{color:#059669}.text-emerald-700{color:#047857}.text-emerald-800{color:#065F46}
.text-blue-500{color:#3B82F6}
.bg-white{background:#fff}.bg-paper{background:var(--paper)}.bg-paper-soft{background:var(--paper-soft)}
.bg-accent{background:var(--accent)}
.bg-[#2F4A7A]{background:#2F4A7A}
.bg-sidebar{background:var(--sidebar)}
.bg-black/50{background:rgba(0,0,0,.5)}

/* ===== ボーダー ===== */
.border{border:1px solid var(--line)}.border-b{border-bottom:1px solid var(--line)}.border-t{border-top:1px solid var(--line)}.border-r{border-right:1px solid var(--line)}
.border-line{border-color:var(--line)}
.border-[#2A3B52]{border-color:#2A3B52}
.rounded{border-radius:.25rem}.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}
.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}
.shadow-sm{box-shadow:0 1px 2px rgba(0,0,0,.05)}
.shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04)}

/* ===== ユーティリティ ===== */
.cursor-pointer{cursor:pointer}
.hidden{display:none!important}.hide{display:none!important}.block{display:block}.inline-block{display:inline-block}.inline-flex{display:inline-flex}
.opacity-50{opacity:.5}.select-all{user-select:all}
.divider{height:1px;background:var(--line);margin:1rem 0}
.last:border-0:last-child{border-bottom:none!important}
.hover:text-white:hover{color:#fff}

/* ===== 入力 ===== */
.inp{
  display:block;width:100%;padding:.5rem .75rem;border-radius:.5rem;
  background:#fff;border:1px solid var(--line);color:var(--ink);
  font-size:.875rem;font-family:inherit;outline:none;
  transition:border-color .15s,box-shadow .15s;
}
.inp::placeholder{color:var(--ink-faint)}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
textarea.inp{min-height:6rem;resize:vertical;line-height:1.6}
select.inp{cursor:pointer}
.input-mono{font-family:'JetBrains Mono',monospace;letter-spacing:.05em}

/* ===== ボタン ===== */
.btn{
  display:inline-flex;align-items:center;gap:.375rem;
  padding:.5rem .875rem;border-radius:.375rem;
  font-size:.9rem;font-weight:500;font-family:inherit;
  cursor:pointer;transition:all .15s;border:1px solid transparent;
  line-height:1.25;white-space:nowrap;text-decoration:none;
}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.btn-primary:hover{background:var(--accent-hover)}
.btn-ghost{background:#fff;color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{background:var(--paper-soft);border-color:var(--ink-faint)}
.btn-subtle{background:var(--accent-light);color:var(--accent-hover);border-color:rgba(239,246,255,.5)}
.btn-subtle:hover{background:rgba(37,99,235,.1)}
.btn-danger{background:#fff;color:#B91C1C;border-color:#FECACA}
.btn-danger:hover{background:#FEF2F2}
.btn-sm{padding:.375rem .625rem;font-size:.75rem}

/* ===== カード ===== */
.card{background:#fff;border:1px solid var(--line);border-radius:.75rem;padding:1.5rem;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.card-sm{padding:1rem}

/* ===== サイドバー ===== */
aside.w-56{
  width:14rem;background:var(--sidebar);
  flex-shrink:0;display:flex;flex-direction:column;min-height:100vh;
}
.nav-item{
  display:flex;align-items:center;gap:.625rem;
  padding:.55rem .75rem;border-radius:.375rem;
  font-size:.8rem;font-weight:500;color:#A7B6CE;
  cursor:pointer;transition:background .15s,color .15s;
  margin:2px .5rem;text-decoration:none;
}
.nav-item:hover{background:var(--sidebar-hover);color:#fff}
.nav-item.active{background:var(--sidebar-active);color:#fff;box-shadow:inset 3px 0 0 #60A5FA}
.nav-item i{width:1.1rem;text-align:center;font-size:.9rem;opacity:.9;flex-shrink:0}

/* ===== ラベル ===== */
.field-label{display:flex;align-items:center;gap:.375rem;font-size:.75rem;font-weight:600;color:var(--ink);margin-bottom:.375rem}
.field-label i.icon-red{color:#EF4444}.field-label i.icon-blue{color:#3B82F6}
.field-label i.icon-yellow{color:#F59E0B}.field-label i.icon-purple{color:#8B5CF6}.field-label i.icon-green{color:#10B981}

/* ===== バッジ ===== */
.pill{display:inline-flex;align-items:center;gap:.25rem;padding:.125rem .5rem;border-radius:9999px;font-size:.75rem;font-weight:600;border:1px solid transparent;white-space:nowrap}
.pill-ok{background:#ECFDF5;color:#065F46;border-color:#A7F3D0}
.pill-warn{background:#FFFBEB;color:#92400E;border-color:#FDE68A}
.pill-err{background:#FEF2F2;color:#991B1B;border-color:#FECACA}
.pill-soft{background:var(--paper-soft);color:var(--ink-muted);border-color:var(--line)}
.pill-blue{background:var(--accent-light);color:var(--accent-hover);border-color:rgba(239,246,255,.8)}

/* ===== アラート ===== */
.alert{display:flex;align-items:flex-start;gap:.5rem;padding:.75rem 1rem;border-radius:.375rem;font-size:.875rem;line-height:1.625;border:1px solid transparent}
.alert-warn{background:#FFFBEB;border-color:#FCD34D;color:#78350F}
.alert-ok{background:#ECFDF5;border-color:#6EE7B7;color:#064E3B}
.alert-err{background:#FEF2F2;border-color:#FECACA;color:#7F1D1D}
.alert-info{background:var(--accent-light);border-color:var(--accent-light);color:var(--accent-hover)}

/* ===== テーブル ===== */
table.data{width:100%;border-collapse:collapse;font-size:.875rem}
table.data thead th{padding:.625rem .75rem;text-align:left;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-muted);background:var(--paper-soft);border-bottom:1px solid var(--line)}
table.data tbody td{padding:.625rem .75rem;border-bottom:1px solid rgba(229,231,235,.6);color:var(--ink);vertical-align:middle}
table.data tbody tr:hover{background:#F9FAFB}

/* ===== FAB ===== */
.fab{position:fixed;bottom:1.5rem;right:1.5rem;width:3.25rem;height:3.25rem;border-radius:9999px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(37,99,235,.35);cursor:pointer;border:none;transition:transform .15s,background .15s;z-index:40}
.fab:hover{transform:scale(1.05);background:var(--accent-hover)}

/* ===== 使用例ボタン ===== */
.example-btn{display:inline-flex;align-items:center;gap:.375rem;padding:.45rem 1rem;border-radius:.375rem;background:var(--accent-light);color:var(--accent-hover);border:1px solid rgba(37,99,235,.25);font-size:.84rem;font-weight:600;font-family:inherit;cursor:pointer;transition:all .15s}
.example-btn:hover{background:rgba(37,99,235,.1)}

/* ===== セクションタイトル ===== */
.section-title{display:flex;align-items:center;gap:.5rem;font-size:1.125rem;font-weight:700;color:var(--ink);margin:0 0 .25rem}
.section-title i{color:var(--accent)}
.section-desc{font-size:.75rem;color:var(--ink-muted);margin:.25rem 0 0}

/* ===== ログインカード ===== */
.login-card{background:#fff;border:1px solid var(--line);border-radius:1rem;padding:2rem;box-shadow:0 20px 40px rgba(0,0,0,.1)}

/* ===== タブ ===== */
.tab-btn{display:inline-flex;align-items:center;gap:.375rem;padding:.5rem 1rem;font-size:.8rem;font-weight:500;font-family:inherit;cursor:pointer;border:none;border-bottom:2px solid transparent;background:transparent;color:var(--ink-muted);transition:color .15s,border-color .15s}
.tab-btn.active{color:var(--accent);border-bottom-color:var(--accent)}
.tab-btn:hover:not(.active){color:var(--ink)}
.tab-pane{display:none}.tab-pane.active{display:block}

/* ===== モーダル ===== */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:50}
.modal-box{background:#fff;border-radius:.75rem;padding:1.5rem;width:100%;max-width:32rem;box-shadow:0 25px 50px rgba(0,0,0,.25)}

/* ===== スクロールバー ===== */
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#94A3B8}

/* ===== 追加: レスポンシブ・サイズ修正 ===== */
html, body { font-size: 15px; }

/* Tailwindレスポンシブグリッド（CDNでカバーされるが念のため） */
@media(min-width:768px){.md:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(min-width:1024px){.lg:col-span-2{grid-column:span 2/span 2}}
@media(min-width:1024px){.lg:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}

/* sr-only (アクセシビリティ) */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}

/* p-3, gap-6 */
.p-3{padding:.75rem}.gap-6{gap:1.5rem}

/* hover系 */
.hover:bg-paper-soft:hover{background:var(--paper-soft)}
.hover:bg-accent-light:hover{background:var(--accent-light)}
.hover:border-accent:hover{border-color:var(--accent)}
.hover:text-ink:hover{color:var(--ink)}

/* bg-accent-light, border-accent, text-accent (単独クラス) */
.bg-accent-light{background:var(--accent-light)}
.border-accent{border-color:var(--accent)}
.border-0{border:none}

/* サイドバー幅確保 */
aside.w-56{
  width:14rem !important;
  min-width:14rem !important;
  flex-shrink:0 !important;
}

/* ナビゲーション縦並び保証 */
nav.flex-1 { display:flex !important; flex-direction:column; }

/* カード内余白 */
.card { padding:1.25rem; }

/* テーブルセル余白 */
table.data tbody td { padding:.5rem .75rem; }

/* モバイル対応 */
@media(max-width:640px){
  .flex-wrap{ flex-wrap:wrap }
  aside.w-56{ width:12rem !important; min-width:12rem !important }
}

/* ===== レスポンシブ（モバイル対応） ===== */
@media(max-width:768px){
  aside.w-56{position:fixed;left:0;top:0;bottom:0;z-index:100;transform:translateX(-100%);transition:transform .25s ease}
  aside.w-56.open{transform:translateX(0)}
  .mobile-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99}
  .mobile-overlay.open{display:block!important}
  main{margin-left:0!important}
  .mobile-menu-btn{display:flex!important}
  .p-6{padding:1rem}
  .card{padding:1rem}
  table.data thead th:nth-child(n+4){display:none}
  table.data tbody td:nth-child(n+4){display:none}
}
@media(min-width:769px){.mobile-menu-btn{display:none!important}}
.mobile-menu-btn{display:none;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1.1rem;padding:0}
</style>
`,an="bg-paper text-ink min-h-screen font-sans antialiased";function $t(e,t,a={}){return`<!DOCTYPE html>
<html lang="ja">
<head>
${tn}
<title>${e} — ${H.name}</title>
</head>
<body class="${a.bodyClass??an}">
${t}
</body>
</html>`}const Na=new D;Na.get("/login",e=>{const t=`
<main class="min-h-screen flex items-center justify-center px-4 py-12 bg-paper">
  <div class="w-full max-w-md">
    <!-- ブランドロゴ -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 mb-3">
        <div class="w-11 h-11 rounded-xl bg-sidebar flex items-center justify-center">
          <i class="fas ${H.icon} text-white text-xl"></i>
        </div>
        <div class="text-left">
          <div class="text-xl font-bold text-ink tracking-tight">${H.name}</div>
          <div class="text-xs text-ink-muted">${H.tagline}</div>
        </div>
      </div>
    </div>

    <!-- タブ付きカード -->
    <div class="login-card">
      <div class="flex gap-1 mb-6 p-1 bg-paper rounded-lg">
        <button onclick="showTab('login')"    id="tab-login"    class="flex-1 py-2 text-sm rounded-md bg-white text-accent shadow-sm font-semibold">ログイン</button>
        <button onclick="showTab('register')" id="tab-register" class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink">新規登録</button>
        <button onclick="showTab('license')"  id="tab-license"  class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink">ライセンス</button>
      </div>

      <!-- ログイン -->
      <form id="login-form" class="space-y-4" onsubmit="return doLogin(event)">
        <div>
          <label class="field-label"><i class="fas fa-envelope icon-blue"></i>メールアドレス</label>
          <input type="email" id="login-email" class="inp" required autocomplete="email">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-lock icon-yellow"></i>パスワード</label>
          <input type="password" id="login-password" class="inp" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-arrow-right-to-bracket"></i>ログイン
        </button>
        <div id="login-error" class="text-red-600 text-xs text-center hide"></div>
      </form>

      <!-- 新規登録 -->
      <form id="register-form" class="space-y-4 hide" onsubmit="return doRegister(event)">
        <div>
          <label class="field-label"><i class="fas fa-envelope icon-blue"></i>メールアドレス</label>
          <input type="email" id="reg-email" class="inp" required>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-lock icon-yellow"></i>パスワード <span class="text-ink-faint">(8文字以上)</span></label>
          <input type="password" id="reg-password" class="inp" required minlength="8">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-user-plus"></i>登録
        </button>
        <div id="register-error" class="text-red-600 text-xs text-center hide"></div>
        <div id="register-success" class="text-emerald-700 text-xs text-center hide"></div>
      </form>

      <!-- ライセンスキー認証 -->
      <form id="license-form" class="space-y-4 hide" onsubmit="return doLicenseActivate(event)">
        <div class="alert alert-info">
          <i class="fas fa-info-circle mt-0.5"></i>
          <div class="text-xs">
            ログイン済アカウントにライセンスキーを紐付けます。<br>
            未ログインの場合は、先にログインまたは新規登録してください。
          </div>
        </div>
        <div>
          <label class="field-label"><i class="fas fa-key icon-yellow"></i>ライセンスキー</label>
          <input type="text" id="license-key" class="inp input-mono" style="text-transform:uppercase"
                 placeholder="VPS-GE365X-XXXXXXXX" required
                 pattern="VPS-GE365X-[A-Za-z0-9]{6,12}">
        </div>
        <button type="submit" class="btn btn-primary w-full justify-center">
          <i class="fas fa-key"></i>ライセンスを認証
        </button>
        <div id="license-error" class="text-red-600 text-xs text-center hide"></div>
        <div id="license-success" class="text-emerald-700 text-xs text-center hide"></div>
      </form>
    </div>

    <p class="text-center text-ink-faint text-xs mt-6">
      © ${new Date().getFullYear()} ${H.name}
    </p>
    <p style="text-align:center;margin-top:.75rem">
      <a href="/license-request" style="font-size:.78rem;color:var(--accent);text-decoration:none">
        <i class="fas fa-id-card"></i> 新規ライセンス申請はこちら
      </a>
    </p>
  </div>
</main>

<script>
function showTab(name) {
  ['login','register','license'].forEach(n => {
    const tab = document.getElementById('tab-' + n);
    if (n === name) {
      tab.className = 'flex-1 py-2 text-sm rounded-md bg-white text-accent shadow-sm font-semibold';
    } else {
      tab.className = 'flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink';
    }
    document.getElementById(n + '-form').classList.toggle('hide', n !== name);
  });
  ['login-error','register-error','register-success','license-error','license-success']
    .forEach(id => { const el = document.getElementById(id); if (el) el.classList.add('hide'); });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hide');
}
function showSuccess(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hide');
}

async function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  try {
    const r = await fetch('/api/auth/login', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        invalid_credentials: 'メールアドレスまたはパスワードが違います',
        not_approved: '管理者による承認待ちです',
        invalid_input: '入力内容を確認してください',
        trial_expired: '無料お試し期間が終了いたしました。',
      };
      showError('login-error', j.message || map[j.error] || 'ログインに失敗しました');
      return false;
    }
    location.href = j.is_admin ? '/admin' : '/dashboard';
  } catch (err) {
    showError('login-error', '通信エラー: ' + err.message);
  }
  return false;
}

async function doRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  try {
    const r = await fetch('/api/auth/register', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        email_taken: 'このメールアドレスは既に登録されています',
        invite_only: '現在は招待制です。管理者へご連絡ください。',
        invalid_input: '入力内容を確認してください',
      };
      showError('register-error', map[j.error] || '登録に失敗しました');
      return false;
    }
    showSuccess('register-success', j.message || '登録しました');
  } catch (err) {
    showError('register-error', '通信エラー: ' + err.message);
  }
  return false;
}

async function doLicenseActivate(e) {
  e.preventDefault();
  const license_key = document.getElementById('license-key').value.trim().toUpperCase();
  try {
    const r = await fetch('/api/auth/license/activate', {
      method: 'POST', headers: {'content-type':'application/json'},
      body: JSON.stringify({ license_key }),
    });
    const j = await r.json();
    if (!r.ok) {
      const map = {
        unauthenticated: '先にログインしてください',
        invalid_license_format: 'ライセンスキーの書式が不正です',
        license_not_found: 'ライセンスキーが見つかりません',
        license_inactive: 'このライセンスは無効化されています',
        license_expired: 'このライセンスは期限切れです',
        license_already_used: 'このライセンスは他のアカウントで使用中です',
      };
      showError('license-error', map[j.error] || 'アクティベートに失敗しました');
      return false;
    }
    showSuccess('license-success', \`認証完了: \${j.plan_code} / \${j.status}\`);
    setTimeout(() => { location.href = '/dashboard'; }, 1200);
  } catch (err) {
    showError('license-error', '通信エラー: ' + err.message);
  }
  return false;
}
<\/script>
`;return e.html($t("ログイン",t))});const re=new TextEncoder,La=new TextDecoder;function Ze(e){let t="";for(let a=0;a<e.length;a++)t+=String.fromCharCode(e[a]);return btoa(t)}function Qe(e){const t=atob(e),a=new Uint8Array(t.length);for(let s=0;s<t.length;s++)a[s]=t.charCodeAt(s);return a}function bt(e){return Ze(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Nt(e){const t="=".repeat((4-e.length%4)%4);return Qe((e+t).replace(/-/g,"+").replace(/_/g,"/"))}function ot(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),t}function sn(e){return[...ot(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const ta=1e5,nn=32;async function wt(e){const t=ot(16),a=await crypto.subtle.importKey("raw",re.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),s=await crypto.subtle.deriveBits({name:"PBKDF2",salt:t,iterations:ta,hash:"SHA-256"},a,nn*8);return`pbkdf2$${ta}$${Ze(t)}$${Ze(new Uint8Array(s))}`}async function Pt(e,t){try{const[a,s,n,i]=t.split("$");if(a!=="pbkdf2")return!1;const r=parseInt(s,10),l=Qe(n),o=Qe(i),d=await crypto.subtle.importKey("raw",re.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),c=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:l,iterations:r,hash:"SHA-256"},d,o.length*8));return Ma(c,o)}catch{return!1}}function Ma(e,t){if(e.length!==t.length)return!1;let a=0;for(let s=0;s<e.length;s++)a|=e[s]^t[s];return a===0}async function Fa(e){return crypto.subtle.importKey("raw",re.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign","verify"])}async function $a(e,t,a=3600*24*7){const s=Math.floor(Date.now()/1e3),n={iat:s,exp:s+a,...e},i=bt(re.encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),r=bt(re.encode(JSON.stringify(n))),l=`${i}.${r}`,o=await Fa(t),d=new Uint8Array(await crypto.subtle.sign("HMAC",o,re.encode(l)));return`${l}.${bt(d)}`}async function Pa(e,t){try{const[a,s,n]=e.split(".");if(!a||!s||!n)return null;const i=await Fa(t);if(!await crypto.subtle.verify("HMAC",i,Nt(n),re.encode(`${a}.${s}`)))return null;const l=JSON.parse(La.decode(Nt(s)));return l.exp&&l.exp<Math.floor(Date.now()/1e3)?null:l}catch{return null}}async function qa(e){const t=re.encode(e),a=t.length>=32?t.slice(0,32):new Uint8Array(await crypto.subtle.digest("SHA-256",t));return crypto.subtle.importKey("raw",a,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function X(e,t){const a=ot(12),s=await qa(t),n=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:a},s,re.encode(e))),i=new Uint8Array(a.length+n.length);return i.set(a),i.set(n,a.length),Ze(i)}async function et(e,t){const a=Qe(e),s=a.slice(0,12),n=a.slice(12),i=await qa(t),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:s},i,n);return La.decode(r)}const aa="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function rn(e="VPS-GE365X"){const t=ot(8);let a="";for(let s=0;s<8;s++)a+=aa[t[s]%aa.length];return`${e}-${a}`}function Ha(e){return/^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(e.trim())}function y(){return new Date(Date.now()+324e5).toISOString().replace("T"," ").slice(0,19)}function on(e,t){return new Response(JSON.stringify(e),{...t,headers:{"content-type":"application/json; charset=utf-8",...(t==null?void 0:t.headers)||{}}})}function Ua(e,t){const s=(e.headers.get("cookie")||"").split(";").map(n=>n.trim()).find(n=>n.startsWith(t+"="));return s?decodeURIComponent(s.slice(t.length+1)):null}function qt(e,t,a={}){const s=[`${e}=${encodeURIComponent(t)}`];return s.push(`Path=${a.path??"/"}`),a.maxAge!==void 0&&s.push(`Max-Age=${a.maxAge}`),a.httpOnly!==!1&&s.push("HttpOnly"),a.secure!==!1&&s.push("Secure"),s.push(`SameSite=${a.sameSite??"Lax"}`),s.join("; ")}const lt=Object.freeze(Object.defineProperty({__proto__:null,aesDecrypt:et,aesEncrypt:X,b64decode:Qe,b64encode:Ze,b64urlDecode:Nt,b64urlEncode:bt,buildSetCookie:qt,generateLicenseKey:rn,getCookie:Ua,hashPassword:wt,isValidLicenseKeyFormat:Ha,json:on,nowJst:y,randomBytes:ot,randomHex:sn,signJWT:$a,timingSafeEqual:Ma,verifyJWT:Pa,verifyPassword:Pt},Symbol.toStringTag,{value:"Module"})),Ht="ge365x_session";function ln(e){const t=e.req.header("Authorization")||e.req.header("authorization");return t&&t.startsWith("Bearer ")?t.slice(7):Ua(e.req.raw,Ht)}async function f(e,t){const a=ln(e);if(!a)return e.json({error:"unauthenticated"},401);const s=await Pa(a,e.env.JWT_SECRET);if(!(s!=null&&s.uid))return e.json({error:"invalid_token"},401);const n=await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(s.uid).first();if(!n)return e.json({error:"user_not_found"},401);if(n.is_approved===0)return e.json({error:"not_approved"},403);if(n.is_admin===0&&n.trial_end){const l=new Date,o=new Date(n.trial_end.replace(" ","T")+(n.trial_end.includes("+")?"":"+09:00"));if(!await e.env.DB.prepare("SELECT status FROM user_subscriptions WHERE user_id = ? AND status='active' LIMIT 1").bind(n.id).first()&&l>o)return e.json({error:"trial_expired",message:"無料お試し期間が終了いたしました。"},403)}const i=await e.env.DB.prepare("SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first(),r={id:n.id,email:n.email,is_admin:n.is_admin===1,is_approved:n.is_approved===1,plan_code:i==null?void 0:i.plan_code,subscription_status:i==null?void 0:i.status};e.set("user",r),await t()}async function Te(e,t){const a=e.get("user");if(!a)return e.json({error:"unauthenticated"},401);if(!a.is_admin)return e.json({error:"forbidden"},403);await t()}async function ie(e,t,a={}){const s=e.req.header("cf-connecting-ip")||e.req.header("x-forwarded-for")||"",n=e.req.header("user-agent")||"";await e.env.DB.prepare(`INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(a.userId??null,a.email??null,t,s,n,a.metadata?JSON.stringify(a.metadata):null).run()}const dn=[{key:"dashboard",label:"ダッシュボード",icon:"fa-gauge-high",path:"/dashboard"},{key:"target",label:"ターゲット設定",icon:"fa-bullseye",path:"/dashboard/target"},{key:"voice",label:"ブランドボイス",icon:"fa-palette",path:"/dashboard/voice"},{key:"pattern",label:"パターン別AI生成",icon:"fa-wand-magic-sparkles",path:"/dashboard/pattern"},{key:"generate",label:"AI生成2",icon:"fa-robot",path:"/dashboard/generate"},{key:"posts",label:"X投稿管理",icon:"fa-brands fa-x-twitter",path:"/dashboard/posts"},{key:"thread",label:"ツリー投稿",icon:"fa-reply",path:"/dashboard/thread"},{key:"scheduled",label:"予約状況",icon:"fa-calendar",path:"/dashboard/scheduled"},{key:"autopilot",label:"オートパイロット",icon:"fa-plane-departure",path:"/dashboard/autopilot"},{key:"accounts",label:"アカウント管理",icon:"fa-users-gear",path:"/dashboard/accounts"},{key:"api",label:"API設定",icon:"fa-key",path:"/dashboard/api"},{key:"export",label:"一括ダウンロード",icon:"fa-download",path:"/dashboard/export"}];function cn(e,t){return`
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${H.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${H.name}</div>
        <div style="font-size:11px;color:#A7B6CE;margin-top:2px;font-weight:400;letter-spacing:.02em">${H.version}</div>
      </div>
    </div>
  </div>

  <nav class="flex-1 py-3 overflow-y-auto">
    ${dn.map(a=>`
      <a href="${a.path}" class="nav-item ${a.key===e?"active":""}">
        <i class="fas ${a.icon}"></i>
        <span>${a.label}</span>
      </a>
    `).join("")}
  </nav>

  <div class="px-3 py-3 border-t border-[#2A3B52]">
    <div class="text-[10px] text-[#A7B6CE] mb-2 px-1">現在のユーザー</div>
    <div class="bg-[#2A3B52] rounded-md p-2 text-xs">
      <div class="text-white truncate">${t.email}</div>
      <div class="flex items-center justify-between mt-1">
        <span class="pill pill-blue" style="background:rgba(96,165,250,.15);color:#93C5FD;border-color:rgba(96,165,250,.3)">${t.plan_code||"-"}</span>
        <button onclick="doLogout()" class="text-[#A7B6CE] hover:text-white text-xs"><i class="fas fa-right-from-bracket"></i></button>
      </div>
    </div>
  </div>
</aside>`}function pn(e,t){return`
<div class="bg-white border-b border-line px-6 py-3 flex items-center justify-between gap-4" style="position:sticky;top:0;z-index:10">
  <div class="flex items-center gap-3">
    <button class="mobile-menu-btn" onclick="toggleSidebar()" title="メニュー"><i class="fas fa-bars"></i></button>
    <label class="text-xs text-ink-muted">現在のアカウント:</label>
    <select class="inp" style="width:auto;min-width:12rem" id="acct-sw" onchange="switchAccount(this.value)">
      ${e.length===0?'<option value="">（未登録）</option>':e.map(a=>`<option value="${a.id}" ${t===a.id?"selected":""}>@${a.x_username||a.account_name}</option>`).join("")}
    </select>
  </div>
  <div class="flex items-center gap-2 text-xs text-ink-muted">
    <span class="pill pill-ok"><i class="fas fa-circle text-[6px]"></i>Connected</span>
    <span id="jst-clock"></span>
  </div>
</div>
<script>
  (function() {
    function updateClock() {
      const el = document.getElementById('jst-clock');
      if (el) el.textContent = 'JST ' + new Date().toLocaleString('ja-JP');
    }
    updateClock();
    setInterval(updateClock, 30000);
  })();
<\/script>`}const un=`
<!-- AIチャットボット -->
<button class="fab" onclick="toggleChatbot()" title="AIチャットボット" id="chat-fab">
  <i class="fas fa-comment-dots" style="font-size:1.25rem"></i>
</button>
<div id="chatbot-panel" style="display:none;position:fixed;bottom:5.5rem;right:1.5rem;width:22rem;max-height:32rem;background:#fff;border:1px solid var(--line);border-radius:.75rem;box-shadow:0 20px 40px rgba(0,0,0,.15);z-index:50;flex-direction:column;overflow:hidden">
  <div style="background:var(--sidebar);color:#fff;padding:.75rem 1rem;display:flex;align-items:center;justify-content:space-between;border-radius:.75rem .75rem 0 0">
    <span style="font-weight:600;font-size:.9rem"><i class="fas fa-robot" style="margin-right:.375rem"></i>AI アシスタント</span>
    <button onclick="toggleChatbot()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1rem"><i class="fas fa-times"></i></button>
  </div>
  <div id="chat-messages" style="flex:1;overflow-y:auto;padding:.75rem;max-height:20rem;display:flex;flex-direction:column;gap:.5rem">
    <div style="background:var(--paper-soft);border-radius:.5rem;padding:.5rem .75rem;font-size:.82rem;color:var(--ink);max-width:85%">
      こんにちは！AIアシスタントです。各設定や使い方についてご質問ください。初めての方も安心して使えるよう、設定手順や機能の使い方を丁寧にご説明します。
    </div>
  </div>
  <div style="padding:.5rem .75rem;border-top:1px solid var(--line);display:flex;gap:.375rem">
    <input type="text" id="chat-input" placeholder="メッセージを入力..." style="flex:1;padding:.4rem .6rem;border:1px solid var(--line);border-radius:.375rem;font-size:.82rem;outline:none;font-family:inherit" onkeydown="if(event.key==='Enter')sendChat()">
    <button onclick="sendChat()" style="padding:.4rem .75rem;background:var(--accent);color:#fff;border:none;border-radius:.375rem;cursor:pointer;font-size:.82rem"><i class="fas fa-paper-plane"></i></button>
  </div>
</div>
<div id="toast-host"></div>
<div id="mobile-overlay" class="mobile-overlay" onclick="toggleSidebar()"></div>
<script>
  function toggleChatbot() {
    const panel = document.getElementById('chatbot-panel');
    const fab = document.getElementById('chat-fab');
    const isOpen = panel.style.display === 'flex';
    panel.style.display = isOpen ? 'none' : 'flex';
    fab.style.background = isOpen ? 'var(--accent)' : 'var(--sidebar)';
  }
  async function sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    const msgs = document.getElementById('chat-messages');
    // ユーザーメッセージ
    msgs.innerHTML += '<div style="background:var(--accent);color:#fff;border-radius:.5rem;padding:.5rem .75rem;font-size:.82rem;max-width:85%;align-self:flex-end;margin-left:auto">' + msg.replace(/</g,'&lt;') + '</div>';
    msgs.scrollTop = msgs.scrollHeight;
    // AI応答
    const thinking = document.createElement('div');
    thinking.style.cssText = 'background:var(--paper-soft);border-radius:.5rem;padding:.5rem .75rem;font-size:.82rem;color:var(--ink-muted);max-width:85%';
    thinking.textContent = '考え中...';
    msgs.appendChild(thinking);
    msgs.scrollTop = msgs.scrollHeight;
    try {
      const r = await fetch('/api/admin/chatbot', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ message: msg })
      });
      const j = await r.json();
      thinking.style.color = 'var(--ink)';
      thinking.textContent = j.reply || j.message || '応答を取得できませんでした';
    } catch(e) {
      thinking.textContent = 'エラーが発生しました。OpenAI APIキーを設定してください。';
    }
    msgs.scrollTop = msgs.scrollHeight;
  }
  function toggleSidebar() {
    const sidebar = document.querySelector('aside.w-56');
    const overlay = document.getElementById('mobile-overlay');
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    if (overlay) overlay.classList.toggle('open', !isOpen);
  }
  function doLogout() {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => { location.href = '/login'; });
  }
  function switchAccount(id) {
    if (!id) return;
    fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' })
      .then(() => location.reload());
  }
  function toast(msg, kind) {
    kind = kind || 'info';
    const host = document.getElementById('toast-host');
    if (!host) return;
    const bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
    const icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
    t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
    host.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
<\/script>
`;function mn(e){return`
<div class="min-h-screen flex bg-paper">
  ${cn(e.active,e.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${pn(e.accounts,e.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${e.pageBody}
    </div>
  </main>

  ${un}
</div>`}const Ae=`
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>アカウントが選択されていません。<a href="/dashboard/accounts" class="underline font-semibold">アカウント管理</a>で登録してください。</div>
</div>
`;function A(e){return(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Wa(e){return{pending:'<span class="pill pill-warn">未承認</span>',approved:'<span class="pill pill-blue">承認済</span>',publishing:'<span class="pill pill-blue">送信中</span>',posted:'<span class="pill pill-ok">投稿済</span>',failed:'<span class="pill pill-err">失敗</span>',cancelled:'<span class="pill pill-soft">キャンセル</span>'}[e||""]||`<span class="pill pill-soft">${e||"—"}</span>`}function fn(e){const{stats:t,recentLogs:a}=e;return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-gauge-high"></i>ダッシュボード</h1>
    <p class="section-desc">今日の投稿状況を一覧できます。</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="card card-sm"><div class="text-xs text-ink-muted">Xアカウント</div><div class="text-2xl font-bold text-ink mt-1">${t.accounts}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日の投稿</div><div class="text-2xl font-bold text-ink mt-1">${t.today}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">予約中</div><div class="text-2xl font-bold text-ink mt-1">${t.pending}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日失敗</div><div class="text-2xl font-bold text-red-600 mt-1">${t.failed}</div></div>
  </div>

  <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-clock-rotate-left text-accent"></i> 直近の投稿ログ</h3>
      ${a.length===0?`
        <div class="text-ink-muted text-sm text-center py-6">投稿ログなし</div>
      `:a.map(s=>`
        <div class="py-2 border-b border-line/50 last:border-0">
          <div class="text-sm text-ink truncate">${A((s.content||"").slice(0,80))}...</div>
          <div class="text-xs text-ink-muted mt-0.5">@${A(s.x_username||"-")} · ${s.posted_at||"-"}</div>
        </div>
      `).join("")}
    </div>
  </div>
</div>`}function hn(e){const t=e.target||{};return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-bullseye"></i>ターゲット設定</h1>
    <p class="section-desc">投稿のターゲット読者を設定します。AI生成時に自動でプロンプトに注入されます。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-ink">ターゲットテンプレート</h3>
      <button class="example-btn" onclick="fillTargetExample()"><i class="fas fa-pencil"></i>使用例</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="field-label"><i class="fas fa-child icon-purple"></i>年齢層</label>
        <input type="text" id="tg-age" class="inp" value="${A(t.age_range)}" placeholder="例: 25~40代">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-venus-mars icon-purple"></i>性別</label>
        <select id="tg-gender" class="inp">
          <option value="">指定なし</option>
          <option value="男性" ${t.gender==="男性"?"selected":""}>男性</option>
          <option value="女性" ${t.gender==="女性"?"selected":""}>女性</option>
          <option value="その他" ${t.gender==="その他"?"selected":""}>その他</option>
        </select>
      </div>
      <div>
        <label class="field-label"><i class="fas fa-briefcase icon-yellow"></i>職業</label>
        <input type="text" id="tg-occ" class="inp" value="${A(t.occupation)}" placeholder="例: 会社員 / フリーランス">
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>痛み・悩み</label>
      <textarea id="tg-pains" class="inp" placeholder="読者が抱えている具体的な悩み・痛みを書く">${A(t.pains)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>欲求・願望</label>
      <textarea id="tg-desires" class="inp" placeholder="読者が「こうなりたい」と思っている理想像">${A(t.desires)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>行動トリガー（反応するきっかけ）</label>
      <textarea id="tg-trigger" class="inp" placeholder="この読者がアクションを起こす瞬間・キーワード">${A(t.purchase_triggers)}</textarea>
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
<\/script>`}function gn(e){const t=e.voice||{},a=[{k:"authority",l:"権威型",t:"専門家として断定的に、簡潔に、根拠を示して書く。"},{k:"empathy",l:"共感型",t:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{k:"provocative",l:"煽り型",t:"問題を鋭く突き、危機感を持たせる書き方にする。"},{k:"story",l:"ストーリー型",t:"体験談や変化の流れを感じさせる構成で書く。"},{k:"problem_raise",l:"問題提起型",t:"最初に課題を提示し、その原因と解決策を示す。"}];return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>ブランドボイス</h1>
    <p class="section-desc">あなたの発信スタイル・口調・世界観を定義します。AI生成時にトーンとして注入されます。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card">
    <div style="margin-bottom:1.25rem">
      <h3 style="font-size:1rem;font-weight:700;color:var(--ink);margin:0 0 .875rem">ボイスプロファイル</h3>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:flex-start;padding:.75rem 1rem;background:var(--paper-soft);border-radius:.5rem;border:1px solid var(--line)">
        <span style="font-size:.78rem;color:var(--ink-muted);align-self:center">プリセット→</span>
        ${a.map(s=>`<button style="padding:.45rem 1rem;border-radius:.375rem;background:var(--accent-light);color:var(--accent-hover);border:1px solid rgba(37,99,235,.3);font-size:.85rem;font-weight:600;cursor:pointer;white-space:nowrap" onclick="loadVoicePreset('${s.k}','${s.t.replace(/'/g,"\\'")}')">${s.l}</button>`).join("")}
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-microphone icon-blue"></i>口調</label>
      <input type="text" id="vc-tone" class="inp" value="${A(t.tone)}" placeholder="例: 専門家として断定的に、簡潔に、根拠を示して書く">
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-globe icon-green"></i>世界観</label>
      <textarea id="vc-world" class="inp" placeholder="あなたが見ている世界、伝えたい価値観">${A(t.worldview)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-book icon-purple"></i>個人ストーリー（任意）</label>
      <textarea id="vc-story" class="inp" placeholder="過去の体験や転機。AI が自然に織り交ぜます">${A(t.personal_story)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-ban icon-red"></i>禁止ワード（改行区切り）</label>
      <textarea id="vc-ng" class="inp" placeholder="絶対に使わないワード">${A(t.prohibited_words)}</textarea>
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
<\/script>`}function _n(e){const t=[["problem","問題提起型","fa-triangle-exclamation","痛みを突く"],["before_after","ビフォーアフター型","fa-arrows-left-right","変化を見せる"],["reverse","逆張り型","fa-rotate-left","常識を覆す"],["howto","How To 実演型","fa-list-ol","手順で見せる"],["impact","数字インパクト型","fa-hashtag","数字で訴く"]];return`
<div style="max-width:900px">
  ${e.hasAccount?"":e.noAccountAlert}

  <div style="margin-bottom:1.5rem">
    <h1 class="section-title"><i class="fas fa-wand-magic-sparkles"></i>パターン別AI生成</h1>
    <p class="section-desc">5つの投稿パターンから選んでAI生成。生成後の各カードに画像・動画を個別設定して投稿。</p>
  </div>

  <!-- パターン選択 -->
  <div class="card" style="margin-bottom:1.25rem">
    <div class="field-label" style="margin-bottom:.875rem"><i class="fas fa-palette icon-blue"></i>投稿パターンを選択</div>
    <div id="patt-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:.625rem">
      ${t.map(([a,s,n,i],r)=>`
        <div onclick="selectPatt(this,'${a}')"
          style="display:flex;flex-direction:column;align-items:center;gap:.375rem;
            padding:.875rem .5rem;border:2px solid ${r===0?"var(--accent)":"var(--line)"};
            border-radius:.625rem;cursor:pointer;text-align:center;
            background:${r===0?"var(--accent-light)":"#fff"};
            color:${r===0?"var(--accent)":"var(--ink)"};
            transition:all .15s">
          <i class="fas ${n}" style="font-size:1.35rem"></i>
          <span style="font-size:.82rem;font-weight:700;line-height:1.2">${s}</span>
          <span style="font-size:.7rem;color:${r===0?"var(--accent-hover)":"var(--ink-muted)"}">${i}</span>
        </div>
      `).join("")}
    </div>
    <input type="hidden" id="patt-val" value="problem">
  </div>

  <!-- 入力フォーム -->
  <div class="card" style="margin-bottom:1.25rem">
    <!-- テーマ・キーワード横並び -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
      <div>
        <label class="field-label"><i class="fas fa-heading icon-blue"></i>テーマ <span style="color:#ef4444">*</span></label>
        <input type="text" id="pa-theme" class="inp" placeholder="例: AI自動化で1日15分運用">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-tags icon-green"></i>キーワード</label>
        <input type="text" id="pa-kw" class="inp" placeholder="例: AI, 自動化, 時短, 仕組み">
      </div>
    </div>

    <!-- 生成数 -->
    <div style="margin-bottom:1rem">
      <label class="field-label"><i class="fas fa-list-ol icon-purple"></i>生成数</label>
      <select id="pa-count" class="inp" style="width:10rem">
        <option value="1">1件</option>
        <option value="2">2件</option>
        <option value="3" selected>3件</option>
        <option value="4">4件</option>
        <option value="5">5件</option>
        <option value="6">6件</option>
        <option value="7">7件</option>
        <option value="8">8件</option>
        <option value="9">9件</option>
        <option value="10">10件</option>
      </select>
    </div>

    <!-- 投稿オプション -->
    <div style="background:var(--accent-light);border-radius:.5rem;padding:1rem;border:1px solid rgba(37,99,235,.15)">
      <div class="field-label" style="margin-bottom:.75rem"><i class="fas fa-sliders icon-blue"></i>投稿オプション</div>
      <div style="display:grid;gap:.75rem">
        <div>
          <label class="field-label"><i class="fas fa-pen-nib icon-blue"></i>投稿末尾の追記（任意）</label>
          <input type="text" id="pa-footer" class="inp" placeholder="例: 詳しくはプロフリンクから">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-link icon-blue"></i>URL（任意）</label>
          <input type="url" id="pa-url" class="inp" placeholder="https://...">
        </div>
        <div>
          <label class="field-label"><i class="fas fa-align-left icon-blue"></i>本文モード</label>
          <div style="display:flex;gap:1.5rem;align-items:center">
            <label style="display:flex;align-items:center;gap:.375rem;cursor:pointer;font-size:.875rem">
              <input type="radio" name="pa-mode" value="body" checked> 本文（生成そのまま）
            </label>
            <label style="display:flex;align-items:center;gap:.375rem;cursor:pointer;font-size:.875rem">
              <input type="radio" name="pa-mode" value="140"> 140文字以内
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- メディア -->
  <div class="card" style="margin-bottom:1.25rem">
    <label class="field-label" style="margin-bottom:.75rem"><i class="fas fa-photo-film icon-purple"></i>メディア（任意）</label>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
      <label class="btn btn-ghost" style="cursor:pointer;margin:0">
        <i class="fas fa-image"></i>画像
        <input type="file" id="pa-img" accept="image/*" multiple class="hide" onchange="previewPaMedia(this,'image')">
      </label>
      <label class="btn btn-ghost" style="cursor:pointer;margin:0">
        <i class="fas fa-video"></i>動画
        <input type="file" id="pa-vid" accept="video/*" class="hide" onchange="previewPaMedia(this,'video')">
      </label>
      <span id="pa-media-name" style="font-size:.78rem;color:var(--ink-muted)"></span>
      <button class="btn btn-danger btn-sm hide" id="pa-media-clear" onclick="clearPaMedia()"><i class="fas fa-times"></i></button>
    </div>
    <div id="pa-media-preview" style="margin-top:.5rem;display:flex;gap:.375rem;flex-wrap:wrap"></div>
  </div>

  <!-- 生成ボタン -->
  <button class="btn btn-primary" onclick="doPatternGenerate()"
    style="width:100%;justify-content:center;padding:.875rem;font-size:1rem;font-weight:700">
    <i class="fas fa-wand-magic-sparkles"></i>選択パターンでAI生成
  </button>

  <div id="pa-results" style="margin-top:1.5rem"></div>

  <!-- 現在の設定 -->
  <div class="card" style="margin-top:1.25rem;background:var(--paper-soft)">
    <div class="field-label" style="margin-bottom:.5rem"><i class="fas fa-circle-info icon-blue"></i>現在の設定</div>
    <div style="font-size:.78rem;color:var(--ink-muted)">
      ターゲット・ブランドボイスが設定されている場合、自動的にAI生成に反映されます。
      設定は各設定ページから変更できます。
    </div>
  </div>
</div>
<script>
function selectPatt(el, val) {
  document.querySelectorAll('#patt-grid > div').forEach(function(d) {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
    var sub = d.querySelector('span:last-child');
    if (sub) sub.style.color = 'var(--ink-muted)';
  });
  el.style.borderColor = 'var(--accent)';
  el.style.background = 'var(--accent-light)';
  el.style.color = 'var(--accent)';
  var sub = el.querySelector('span:last-child');
  if (sub) sub.style.color = 'var(--accent-hover)';
  document.getElementById('patt-val').value = val;
}
function previewPaMedia(input, type) {
  var files = input.files; if (!files.length) return;
  var prev = document.getElementById('pa-media-preview');
  var name = document.getElementById('pa-media-name');
  var clr = document.getElementById('pa-media-clear');
  if (type === 'image') {
    var html = '';
    for (var i = 0; i < files.length; i++) {
      html += '<img src="' + URL.createObjectURL(files[i]) + '" style="height:60px;border-radius:4px;border:1px solid var(--line)">';
    }
    prev.innerHTML = html;
    name.textContent = files.length + '枚';
  } else {
    prev.innerHTML = '<span style="font-size:.78rem;color:var(--ink-muted)"><i class="fas fa-video"></i> ' + files[0].name + '</span>';
    name.textContent = '動画選択済';
  }
  clr.classList.remove('hide');
}
function clearPaMedia() {
  document.getElementById('pa-img').value = '';
  document.getElementById('pa-vid').value = '';
  document.getElementById('pa-media-preview').innerHTML = '';
  document.getElementById('pa-media-name').textContent = '';
  document.getElementById('pa-media-clear').classList.add('hide');
}
async function doPatternGenerate() {
  var theme = document.getElementById('pa-theme').value.trim();
  if (!theme) { toast('テーマを入力してください', 'err'); return; }
  var patt = document.getElementById('patt-val').value;
  var kw = document.getElementById('pa-kw').value;
  var count = parseInt(document.getElementById('pa-count').value, 10) || 3;
  var mode = document.querySelector('input[name="pa-mode"]:checked').value;
  var footer = document.getElementById('pa-footer').value;
  var url = document.getElementById('pa-url').value;
  // メディア収集
  var mediaImages = [];
  var imgInput = document.getElementById('pa-img');
  if (imgInput && imgInput.files && imgInput.files.length) {
    for (var i = 0; i < imgInput.files.length; i++) {
      var b64 = await fileToBase64(imgInput.files[i]);
      mediaImages.push({ name: imgInput.files[i].name, type: imgInput.files[i].type, data: b64 });
    }
  }
  var resultsDiv = document.getElementById('pa-results');
  resultsDiv.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--ink-muted)"><i class="fas fa-spinner fa-spin"></i> 生成中...</div>';
  var r = await fetch('/api/admin/posts/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ theme: theme, count: count, pattern_type: patt, keywords: kw, post_mode: mode, footer_text: footer, link_url: url, media_images: mediaImages }),
  });
  var j = await r.json();
  if (!j.success) { toast('生成失敗: ' + (j.error || ''), 'err'); resultsDiv.innerHTML = ''; return; }
  resultsDiv.innerHTML = (j.posts || []).map(function(p, i) {
    return '<div class="card" style="margin-bottom:.75rem">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem">' +
        '<span class="pill pill-blue">' + (i+1) + '/' + j.posts.length + '</span>' +
        '<div style="display:flex;gap:.5rem">' +
          '<button onclick="postNowFromGen(' + p.id + ')" class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i>今すぐ投稿</button>' +
          '<button onclick="addToQueue(' + p.id + ')" class="btn btn-ghost btn-sm"><i class="fas fa-plus"></i>キューへ追加</button>' +
        '</div>' +
      '</div>' +
      '<div style="white-space:pre-wrap;font-size:.875rem;line-height:1.7">' + (p.body || '').replace(/</g,'&lt;') + '</div>' +
      (p.word_count ? '<div style="font-size:.72rem;color:var(--ink-muted);margin-top:.5rem">' + p.word_count + '文字</div>' : '') +
    '</div>';
  }).join('');
}
async function fileToBase64(file) {
  return new Promise(function(res) {
    var fr = new FileReader();
    fr.onload = function(e) { res(e.target.result); };
    fr.readAsDataURL(file);
  });
}
async function postNowFromGen(id) {
  var r = await fetch('/api/admin/posts/' + id + '/post-now', { method: 'POST', body: '{}', headers: {'content-type':'application/json'} });
  var j = await r.json();
  if (j.success) toast('投稿しました', 'ok');
  else toast('失敗: ' + (j.error || ''), 'err');
}
async function addToQueue(id) {
  toast('キューに追加済みです', 'ok');
}
<\/script>
`}function bn(e){return`
<div class="space-y-4">
  ${e.hasAccount?"":e.noAccountAlert}
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
      <select id="ge-count" class="inp" style="width:8rem" onchange="this.dataset.val=this.value">
        <option value="1">1件</option>
        <option value="2">2件</option>
        <option value="3" selected>3件</option>
        <option value="4">4件</option>
        <option value="5">5件</option>
        <option value="6">6件</option>
        <option value="7">7件</option>
        <option value="8">8件</option>
        <option value="9">9件</option>
        <option value="10">10件</option>
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
    <div>
      <label class="field-label"><i class="fas fa-photo-film icon-purple"></i>メディア（任意）</label>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
        <label class="btn btn-ghost" style="cursor:pointer"><i class="fas fa-image"></i>画像を追加
          <input type="file" id="ge-img" accept="image/*" multiple class="hide" onchange="previewGenMedia(this,'image')">
        </label>
        <label class="btn btn-ghost" style="cursor:pointer"><i class="fas fa-video"></i>動画を追加
          <input type="file" id="ge-vid" accept="video/*" class="hide" onchange="previewGenMedia(this,'video')">
        </label>
        <span id="ge-media-name" style="font-size:.8rem;color:var(--ink-muted)"></span>
        <button class="btn btn-danger btn-sm hide" id="ge-media-clear" onclick="clearGenMedia()"><i class="fas fa-times"></i></button>
      </div>
      <div id="ge-media-preview" style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap"></div>
    </div>
    <div class="flex gap-2 items-stretch">
      <button class="btn btn-primary flex-1 justify-center" style="padding:.85rem 1rem;font-size:.95rem;font-weight:600" onclick="doGen2()"><i class="fas fa-pencil"></i>AI生成</button>
      <button class="btn btn-ghost" onclick="toast('下書き保存:実装中','info')"><i class="fas fa-save"></i>下書き保存</button>
    </div>
    <div id="ge-results"></div>
  </div>
</div>
<script>
function previewGenMedia(input, type) {
  const files = input.files; if (!files.length) return;
  const prev = document.getElementById('ge-media-preview');
  const name = document.getElementById('ge-media-name');
  const clr = document.getElementById('ge-media-clear');
  if (type === 'image') {
    let html = '';
    for (const f of files) {
      html += '<img src="'+URL.createObjectURL(f)+'" style="height:72px;border-radius:4px;border:1px solid var(--line)">';
    }
    prev.innerHTML = html;
    name.textContent = files.length + '枚選択';
  } else {
    prev.innerHTML = '<div style="display:flex;align-items:center;gap:.5rem;background:var(--paper-soft);padding:.5rem .75rem;border-radius:.5rem"><i class="fas fa-video" style="color:var(--accent)"></i><span style="font-size:.8rem">'+files[0].name+'</span></div>';
    name.textContent = '動画選択済';
  }
  clr.classList.remove('hide');
}
function clearGenMedia() {
  document.getElementById('ge-img').value='';
  document.getElementById('ge-vid').value='';
  document.getElementById('ge-media-preview').innerHTML='';
  document.getElementById('ge-media-name').textContent='';
  document.getElementById('ge-media-clear').classList.add('hide');
}
async function doGen2() {
  const prompt = document.getElementById('ge-prompt').value.trim();
  if (!prompt) { toast('プロンプトを入力してください','err'); return; }
  const count = parseInt(document.getElementById('ge-count').value.replace('件',''), 10) || 3;
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
<\/script>`}function vn(e){const{month:t,y:a,m:s,posts:n,stats:i}=e;return`
<div class="space-y-4">
  ${e.hasAccount?"":e.noAccountAlert}
  <div>
    <h1 class="section-title"><i class="fa-brands fa-x-twitter"></i>X投稿管理</h1>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost" onclick="navMonth(-1)"><i class="fas fa-chevron-left"></i></button>
      <span class="text-lg font-bold text-ink px-2">${a}年 ${s}月</span>
      <button class="btn btn-ghost" onclick="navMonth(1)"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-primary btn-sm" onclick="thisMonth()">当月</button>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary btn-sm" onclick="document.getElementById('new-post-panel').style.display=document.getElementById('new-post-panel').style.display==='none'?'block':'none'"><i class="fas fa-plus"></i>新規作成</button>
      <button class="btn btn-ghost" onclick="dlExportPosts()" title="投稿データをCSVダウンロード"><i class="fas fa-download"></i>CSV</button>
      <button class="btn btn-danger" onclick="bulkDel()" id="bulk-del-btn" disabled><i class="fas fa-trash"></i>一括削除</button>
    </div>
  </div>
  <div class="flex items-center gap-6 text-sm">
    <div>合計: <span class="font-bold">${i.total}件</span></div>
    <div>未投稿: <span class="font-bold text-amber-600">${i.pending}件</span></div>
    <div>投稿済: <span class="font-bold text-emerald-600">${i.posted}件</span></div>
    <div>失敗: <span class="font-bold text-red-600">${i.failed}件</span></div>
  </div>
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr>
        <th style="width:40px"><input type="checkbox" onchange="checkAll(this.checked)"></th>
        <th>ID</th><th>本文</th><th>モード</th><th>状態</th><th>アカウント</th><th></th>
      </tr></thead>
      <tbody>
        ${n.length===0?'<tr><td colspan="7" class="text-center text-ink-muted py-10">この月の投稿データがありません</td></tr>':n.map(r=>`
            <tr>
              <td><input type="checkbox" class="post-chk" value="${r.id}" onchange="updateBulk()"></td>
              <td class="font-mono text-xs text-ink-faint">${r.id}</td>
              <td class="max-w-md"><div class="truncate">${A((r.body||"").slice(0,80))}</div></td>
              <td>${r.post_mode==="140"?"140文字":r.post_mode==="thread"?"スレッド":"フル文章"}</td>
              <td>${Wa(r.status)}</td>
              <td class="text-xs">@${A(r.x_username||"-")}</td>
              <td class="text-right">
                ${r.status!=="posted"?`<button class="btn btn-subtle btn-sm" onclick="postNow(${r.id})" title="今すぐ投稿"><i class="fa-brands fa-x-twitter"></i></button>`:""}
                <button class="btn btn-danger btn-sm" onclick="delPost(${r.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>
</div>

<!-- 新規投稿作成パネル -->
<div class="card" id="new-post-panel" style="display:none">
  <h3 style="font-size:.95rem;font-weight:700;margin:0 0 1rem;color:var(--ink)">
    <i class="fas fa-pen" style="color:var(--accent)"></i> 新規投稿作成
  </h3>
  <div class="space-y-3">
    <div>
      <label class="field-label"><i class="fas fa-align-left icon-blue"></i>投稿本文</label>
      <textarea id="new-post-body" class="inp" rows="4" placeholder="投稿内容を入力（最大140文字またはフル文章）"></textarea>
      <div style="font-size:.75rem;color:var(--ink-muted);margin-top:.25rem" id="new-post-count">0文字</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div>
        <label class="field-label"><i class="fas fa-link icon-blue"></i>URL（任意）</label>
        <input type="url" id="new-post-url" class="inp" placeholder="https://...">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-hashtag icon-blue"></i>ハッシュタグ（任意）</label>
        <input type="text" id="new-post-tags" class="inp" placeholder="#FX #自動売買">
      </div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-calendar icon-purple"></i>予約日時（空欄=今すぐ投稿）</label>
      <input type="datetime-local" id="new-post-scheduled" class="inp" style="max-width:20rem">
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="submitNewPost()"><i class="fas fa-paper-plane"></i>投稿 / 予約</button>
      <button class="btn btn-ghost" onclick="document.getElementById('new-post-panel').style.display='none'"><i class="fas fa-times"></i>閉じる</button>
    </div>
  </div>
</div>

<script>
// 新規投稿パネルの文字数カウント
document.addEventListener('DOMContentLoaded', function() {
  var ta = document.getElementById('new-post-body');
  var cnt = document.getElementById('new-post-count');
  if (ta && cnt) ta.addEventListener('input', function() {
    cnt.textContent = ta.value.length + '文字';
    cnt.style.color = ta.value.length > 140 ? '#ef4444' : 'var(--ink-muted)';
  });
});
async function submitNewPost() {
  var body = (document.getElementById('new-post-body').value || '').trim();
  if (!body) { toast('本文を入力してください', 'err'); return; }
  var url = document.getElementById('new-post-url').value;
  var tags = document.getElementById('new-post-tags').value;
  var scheduledAt = document.getElementById('new-post-scheduled').value;
  var endpoint = scheduledAt ? '/api/admin/posts/schedule' : '/api/admin/posts/publish';
  var payload = {
    body: body,
    link_url: url || null,
    hashtags: tags || null,
    scheduled_at: scheduledAt ? scheduledAt.replace('T', ' ') : null,
  };
  var r = await fetch(endpoint, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(payload) });
  var j = await r.json();
  if (j.success || j.ok) {
    toast(scheduledAt ? '予約しました' : '投稿しました', 'ok');
    document.getElementById('new-post-panel').style.display = 'none';
    document.getElementById('new-post-body').value = '';
    setTimeout(function() { location.reload(); }, 800);
  } else {
    toast('失敗: ' + (j.error || j.message || '不明なエラー'), 'err');
  }
}
function dlExportPosts() {
  const url = '/api/admin/export/posts?month=${t}';
  fetch(url).then(r => {
    if (!r.ok) throw new Error('ダウンロード失敗');
    const cd = r.headers.get('content-disposition') || '';
    const match = cd.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'ge365x_posts.csv';
    return r.blob().then(blob => ({ blob, filename }));
  }).then(({ blob, filename }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast(filename + ' をダウンロードしました', 'ok');
  }).catch(e => toast(e.message, 'err'));
}
function navMonth(delta) {
  const [y, m] = '${t}'.split('-').map(Number);
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
<\/script>`}function yn(e){return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-reply"></i>ツリー投稿（既存投稿へのコメント追加）</h1>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
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
      ${xn(1)}
    </div>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="addReply()"><i class="fas fa-plus"></i>返信追加</button>
      <label class="btn btn-ghost" style="cursor:pointer">
        <i class="fas fa-image"></i>画像
        <input type="file" id="th-img" accept="image/*" class="hide" onchange="previewThMedia(this,'image')">
      </label>
      <label class="btn btn-ghost" style="cursor:pointer">
        <i class="fas fa-video"></i>動画
        <input type="file" id="th-vid" accept="video/*" class="hide" onchange="previewThMedia(this,'video')">
      </label>
      <button class="btn" style="background:#10B981;color:#fff;border-color:#10B981" onclick="submitNow()"><i class="fas fa-paper-plane"></i>今すぐ投稿</button>
      <button class="btn btn-primary" onclick="submitSchedule()"><i class="fas fa-calendar"></i>予約投稿</button>
      <button class="btn btn-ghost" onclick="saveDraft()"><i class="fas fa-floppy-disk"></i>下書き保存</button>
      <button class="btn btn-ghost" onclick="previewThread()"><i class="fas fa-eye"></i>プレビュー</button>
    </div>
    <div id="th-media-preview" style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap"></div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">返信履歴</h3>
    ${e.history.length===0?`
      <div class="text-center text-ink-muted py-10">
        <i class="fas fa-inbox text-3xl mb-2 text-ink-faint"></i>
        <div>返信投稿はまだありません</div>
      </div>
    `:e.history.map(t=>`
      <div class="border border-line rounded-lg p-3 mb-2">
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${t.thread_parent_id||"-"}</span> ${Wa(t.status)}</div>
        <div class="text-sm whitespace-pre-line">${A((t.body||"").slice(0,200))}</div>
      </div>
    `).join("")}
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
function previewThMedia(input, type) {
  const f = input.files[0]; if (!f) return;
  const prev = document.getElementById('th-media-preview');
  if (type === 'image') {
    const url = URL.createObjectURL(f);
    prev.innerHTML = '<div style="position:relative;display:inline-block"><img src="'+url+'" style="height:80px;border-radius:4px;border:1px solid var(--line)"><button onclick="clearThMedia()" style="position:absolute;top:-6px;right:-6px;background:#ef4444;color:#fff;border:none;border-radius:50%;width:18px;height:18px;cursor:pointer;font-size:10px">×</button></div>';
  } else {
    prev.innerHTML = '<div style="display:flex;align-items:center;gap:.5rem;background:var(--paper-soft);padding:.5rem;border-radius:.5rem"><i class="fas fa-video" style="color:var(--accent)"></i><span style="font-size:.8rem">'+f.name+'</span><button onclick="clearThMedia()" style="background:#ef4444;color:#fff;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:.7rem">削除</button></div>';
  }
  toast((type==='image'?'画像':'動画')+'を選択しました', 'ok');
}
function clearThMedia() {
  document.getElementById('th-img').value='';
  document.getElementById('th-vid').value='';
  document.getElementById('th-media-preview').innerHTML='';
}
function saveDraft() { toast('下書きを保存しました（実装中）','info'); }
function previewThread() { toast('プレビュー（実装中）','info'); }
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
<\/script>`}function xn(e){return`
    <div class="reply-item">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">返信 ${e}</label>
      </div>
      <textarea class="inp th-reply" placeholder="返信${e}の本文を入力" maxlength="280"></textarea>
    </div>`}function En(e){return`
<div class="space-y-4">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <h1 class="section-title"><i class="fas fa-calendar"></i>予約状況</h1>
      <p class="section-desc">予約済み投稿・オートパイロットジョブ</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button id="btn-cal" class="btn btn-primary btn-sm" onclick="scSetView('cal')"><i class="fas fa-calendar"></i>カレンダー</button>
      <button id="btn-list" class="btn btn-ghost btn-sm" onclick="scSetView('list')"><i class="fas fa-list"></i>一覧</button>
    </div>
  </div>
  <!-- アカウント未登録アラートはカレンダーでは表示しない -->

  <div id="sc-cal-view" style="display:block">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" onclick="scPrevMonth()"><i class="fas fa-chevron-left"></i></button>
      <span id="sc-month-label" style="font-size:1rem;font-weight:700;min-width:8rem;text-align:center">--</span>
      <button class="btn btn-ghost btn-sm" onclick="scNextMonth()"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-subtle btn-sm" onclick="scGoToday()">今日</button>
      <button class="btn btn-primary btn-sm" onclick="scRefresh()"><i class="fas fa-rotate"></i>更新</button>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:.75rem;overflow:hidden">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--paper-soft);border-bottom:1px solid var(--line)">
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:#ef4444">日</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:var(--ink-muted)">月</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:var(--ink-muted)">火</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:var(--ink-muted)">水</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:var(--ink-muted)">木</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:var(--ink-muted)">金</div>
        <div style="padding:.5rem;text-align:center;font-size:.78rem;font-weight:600;color:#2563EB">土</div>
      </div>
      <div id="sc-cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr);min-height:200px">
        <div id="sc-loading" style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--ink-muted)">読込中...</div>
      </div>
    </div>
  </div>

  <div id="sc-list-view" style="display:none">
    <div class="card" style="padding:0;overflow:auto">
      <table class="data">
        <thead><tr><th>予約日時</th><th>アカウント</th><th>本文</th><th>状態</th><th></th></tr></thead>
        <tbody id="sc-list-body"></tbody>
      </table>
    </div>
  </div>
</div>
<script>
(function() {
  'use strict';
  var _data = [];
  var _year = new Date().getFullYear();
  var _month = new Date().getMonth();

  function pad(n) { return String(n).padStart(2, '0'); }

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function load(cb) {
    fetch('/api/admin/posts-scheduled', { credentials: 'include' })
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(j) {
        _data = j.posts || [];
        cb(null);
      })
      .catch(function(e) {
        _data = [];
        cb(e);
      });
  }

  function renderGrid() {
    var lbl = document.getElementById('sc-month-label');
    var grid = document.getElementById('sc-cal-grid');
    if (!grid) return;

    if (lbl) lbl.textContent = _year + '年 ' + (_month + 1) + '月';

    var today = new Date();
    var todayStr = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    var byDate = {};
    _data.forEach(function(p) {
      var d = ((p.scheduled_at || p.publish_at || '')).slice(0, 10);
      if (!d) return;
      if (!byDate[d]) byDate[d] = [];
      byDate[d].push(p);
    });

    var first = new Date(_year, _month, 1);
    var lastDay = new Date(_year, _month + 1, 0).getDate();
    var startDow = first.getDay();

    var html = '';
    var day = 1 - startDow;
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 7; col++) {
        var inMonth = day >= 1 && day <= lastDay;
        var ds = inMonth ? _year + '-' + pad(_month + 1) + '-' + pad(day) : '';
        var isToday = (ds === todayStr);
        var posts = inMonth ? (byDate[ds] || []) : [];
        var sunSat = col === 0 ? '#ef4444' : col === 6 ? '#2563EB' : 'var(--ink)';
        var bg = isToday ? '#EFF6FF' : '#fff';

        html += '<div style="min-height:5.5rem;border-right:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;padding:.375rem;background:' + bg + '">';
        if (inMonth) {
          html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">';
          html += '<span style="font-size:.82rem;font-weight:' + (isToday ? '700' : '400') + ';color:' + sunSat + '">' + day + '</span>';
          html += '<button onclick="scAddFromCal('' + ds + '')" style="width:18px;height:18px;border-radius:50%;background:#F3F4F6;border:1px solid #E5E7EB;cursor:pointer;font-size:11px;line-height:1;color:#6B7280">+</button>';
          html += '</div>';
          for (var pi = 0; pi < Math.min(posts.length, 3); pi++) {
            var p = posts[pi];
            var st = p.status || 'pending';
            var pbg = st === 'posted' ? '#ECFDF5' : st === 'failed' ? '#FEF2F2' : '#EFF6FF';
            var pfc = st === 'posted' ? '#065F46' : st === 'failed' ? '#991B1B' : '#1D4ED8';
            var txt = esc((p.body || p.theme || '投稿').slice(0, 18));
            html += '<div style="background:' + pbg + ';color:' + pfc + ';font-size:.65rem;padding:2px 4px;border-radius:3px;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer" title="' + esc(p.body || p.theme || '') + '">' + txt + '</div>';
          }
          if (posts.length > 3) {
            html += '<div style="font-size:.65rem;color:#6B7280">+' + (posts.length - 3) + '件</div>';
          }
        }
        html += '</div>';
        day++;
      }
      if (day > lastDay && row >= 3) break;
    }

    grid.innerHTML = html || '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:#6B7280">予約投稿はありません</div>';
  }

  function renderList() {
    var tbody = document.getElementById('sc-list-body');
    if (!tbody) return;
    if (!_data.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:#6B7280">予約投稿はありません</td></tr>';
      return;
    }
    tbody.innerHTML = _data.map(function(p) {
      var st = p.status || 'pending';
      var bg = st === 'posted' ? '#ECFDF5' : st === 'failed' ? '#FEF2F2' : '#EFF6FF';
      var fc = st === 'posted' ? '#065F46' : st === 'failed' ? '#991B1B' : '#1D4ED8';
      return '<tr>' +
        '<td style="font-size:.78rem;font-family:monospace">' + esc(p.scheduled_at || p.publish_at || '-') + '</td>' +
        '<td style="font-size:.78rem">@' + esc(p.x_username || p.account_name || '-') + '</td>' +
        '<td style="font-size:.78rem;max-width:20rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc((p.body || p.theme || '').slice(0, 80)) + '</td>' +
        '<td><span style="font-size:.72rem;padding:2px 7px;border-radius:4px;background:' + bg + ';color:' + fc + '">' + esc(st) + '</span></td>' +
        '<td><button onclick="scCancel(' + (p.id || 0) + ')" style="padding:2px 8px;background:#FEF2F2;color:#991B1B;border:1px solid #FECACA;border-radius:4px;cursor:pointer;font-size:.75rem">×</button></td>' +
      '</tr>';
    }).join('');
  }

  window.scSetView = function(v) {
    document.getElementById('sc-cal-view').style.display = v === 'cal' ? 'block' : 'none';
    document.getElementById('sc-list-view').style.display = v === 'list' ? 'block' : 'none';
    document.getElementById('btn-cal').className = v === 'cal' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
    document.getElementById('btn-list').className = v === 'list' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
    if (v === 'list') renderList();
  };
  window.scPrevMonth = function() { _month--; if (_month < 0) { _month = 11; _year--; } renderGrid(); };
  window.scNextMonth = function() { _month++; if (_month > 11) { _month = 0; _year++; } renderGrid(); };
  window.scGoToday = function() { var n = new Date(); _year = n.getFullYear(); _month = n.getMonth(); renderGrid(); };
  window.scRefresh = function() { load(function() { renderGrid(); renderList(); if (window.toast) window.toast('更新しました', 'ok'); }); };
  window.scCancel = function(id) {
    if (!id || !confirm('この予約をキャンセルしますか？')) return;
    fetch('/api/admin/posts/' + id + '/cancel', { method: 'POST', credentials: 'include' })
      .then(function(r) { return r.json(); })
      .then(function(j) {
        if (j.success || j.ok) { window.scRefresh(); }
        else if (window.toast) window.toast('失敗: ' + (j.error || ''), 'err');
      });
  };
  window.scAddFromCal = function(dateStr) {
    var modal = document.getElementById('ap-modal');
    if (modal) {
      var ga = document.getElementById('ap-generate-at');
      var pa = document.getElementById('ap-publish-at');
      if (ga) ga.value = dateStr + 'T09:00';
      if (pa) pa.value = dateStr + 'T12:00';
      modal.style.display = 'flex';
    } else {
      sessionStorage.setItem('ap_prefill_date', dateStr);
      location.href = '/dashboard/autopilot';
    }
  };

  // 初期化
  load(function(err) {
    if (err) {
      var g = document.getElementById('sc-cal-grid');
      if (g) g.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:#DC2626">データ取得エラー: ' + String(err.message || err) + '</div>';
    } else {
      renderGrid();
    }
  });
})();
<\/script>
`}function wn(e){return`
<div class="space-y-4">
  ${e.hasAccount?"":e.noAccountAlert}
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
        ${e.jobs.length===0?'<tr><td colspan="8" class="text-center text-ink-muted py-10">予約がまだありません</td></tr>':e.jobs.map((t,a)=>`
            <tr>
              <td class="text-xs text-ink-faint">${t.reservation_no||String(a+1).padStart(4,"0")}</td>
              <td class="text-xs">${t.generate_at||"—"}</td>
              <td class="text-xs">${t.publish_at||"—"}</td>
              <td class="text-xs">@${A(t.x_username||"-")}</td>
              <td><span class="pill pill-soft">${A(t.content_mode||"-")}</span></td>
              <td class="text-xs max-w-xs truncate">${A(t.theme||"—")}</td>
              <td><span class="pill ${t.status==="error"?"pill-err":t.status==="posted"?"pill-ok":"pill-blue"}">${A(t.status)}</span></td>
              <td class="text-right">
                <button class="btn btn-danger btn-sm" onclick="delApJob(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>

  <!-- モーダル -->
  <div id="ap-modal" style="display:none;position:fixed;inset:0;z-index:50;padding:1rem;overflow-y:auto;background:rgba(0,0,0,.5);align-items:flex-start;justify-content:center">
    <div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;padding:1.5rem;margin:2rem auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">オートパイロット新規作成</h3>
        <button onclick="closeApModal()" class="text-ink-muted hover:text-ink"><i class="fas fa-xmark text-xl"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label"><i class="fas fa-user-circle icon-blue"></i>アカウント</label>
          <select id="ap-account" class="inp">
            <option value="">—</option>
            ${e.accounts.map(t=>`<option value="${t.id}">@${A(t.x_username||t.account_name)}</option>`).join("")}
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
        <div>
          <label class="field-label"><i class="fas fa-photo-film icon-purple"></i>メディア（任意）</label>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin-bottom:.5rem">
            <label class="btn btn-ghost btn-sm" style="cursor:pointer;margin:0">
              <i class="fas fa-image"></i>画像選択（複数可）
              <input type="file" id="ap-img" accept="image/jpeg,image/png,image/gif,image/webp" multiple style="position:absolute;opacity:0;width:0;height:0" onchange="previewApMedia(this,'image')">
            </label>
            <label class="btn btn-ghost btn-sm" style="cursor:pointer;margin:0">
              <i class="fas fa-video"></i>動画選択
              <input type="file" id="ap-vid" accept="video/mp4,video/quicktime,video/x-msvideo" style="position:absolute;opacity:0;width:0;height:0" onchange="previewApMedia(this,'video')">
            </label>
            <span id="ap-media-name" style="font-size:.78rem;color:var(--ink-muted)"></span>
            <button type="button" id="ap-media-clear" onclick="clearApMedia()" style="display:none;padding:.25rem .5rem;background:#FEF2F2;color:#991B1B;border:1px solid #FECACA;border-radius:.25rem;cursor:pointer;font-size:.75rem"><i class="fas fa-times"></i></button>
          </div>
          <div id="ap-media-preview" style="display:flex;gap:.375rem;flex-wrap:wrap"></div>
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
function previewApMedia(input, type) {
  const files=input.files; if(!files.length) return;
  const prev=document.getElementById('ap-media-preview');
  const name=document.getElementById('ap-media-name');
  const clr=document.getElementById('ap-media-clear');
  if(type==='image'){
    let html='';
    for(const f of files){html+='<img src="'+URL.createObjectURL(f)+'" style="height:60px;border-radius:4px;border:1px solid var(--line)">';}
    prev.innerHTML=html; name.textContent=files.length+'枚';
  } else {
    prev.innerHTML='<span style="font-size:.78rem;color:var(--ink-muted)"><i class="fas fa-video"></i> '+files[0].name+'</span>';
    name.textContent='動画選択済';
  }
  clr.classList.remove('hide');
}
function clearApMedia(){
  document.getElementById('ap-img').value='';
  document.getElementById('ap-vid').value='';
  document.getElementById('ap-media-preview').innerHTML='';
  document.getElementById('ap-media-name').textContent='';
  document.getElementById('ap-media-clear').classList.add('hide');
}
function openApModal() { const m=document.getElementById('ap-modal'); m.style.display='flex'; }
function closeApModal() { document.getElementById('ap-modal').style.display='none'; }
function deriveGenAt() {
  const pub = document.getElementById('ap-pub').value;
  if (!pub || document.getElementById('ap-gen').value) return;
  const d = new Date(pub); d.setMinutes(d.getMinutes() - 2);
  const pad = n => String(n).padStart(2,'0');
  document.getElementById('ap-gen').value = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
}
async function fileToBase64(file) {
  return new Promise(function(res) {
    var fr = new FileReader();
    fr.onload = function(e) { res(e.target.result); };
    fr.readAsDataURL(file);
  });
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
    footer_text: document.getElementById('ap-footer').value,
    media_images: [],
    media_video: null,
  };
  if (!body.theme) { toast('テーマを入力','err'); return; }
  // 画像を base64 に変換して options_json に含める
  var imgInput = document.getElementById('ap-img');
  if (imgInput && imgInput.files && imgInput.files.length) {
    for (var i = 0; i < imgInput.files.length; i++) {
      var b64 = await fileToBase64(imgInput.files[i]);
      body.media_images.push({ name: imgInput.files[i].name, type: imgInput.files[i].type, data: b64 });
    }
  }
  var vidInput = document.getElementById('ap-vid');
  if (vidInput && vidInput.files && vidInput.files[0]) {
    body.media_video = await fileToBase64(vidInput.files[0]);
    body.media_video_name = vidInput.files[0].name;
    body.media_video_type = vidInput.files[0].type;
  }
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
<\/script>`}function kn(e){return`
<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="section-title"><i class="fas fa-users-gear"></i>アカウント管理</h1>
      <p class="section-desc">Xアカウントの登録・トークン管理・健全性を確認します。</p>
    </div>
    <button class="btn btn-primary" onclick="openAddAcct()"><i class="fas fa-plus"></i>アカウント追加</button>
  </div>
  ${e.accounts.length===0?`
    <div class="alert alert-info">
      <i class="fas fa-info-circle mt-0.5"></i>
      <div>Xアカウント未登録。X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、上の「アカウント追加」から登録してください。<br>
      <span class="text-xs opacity-70">※ OAuth 1.0a User Context 認証のため、ブラウザリダイレクトは不要です</span></div>
    </div>
  `:`
    <div class="card" style="padding:0">
      <table class="data">
        <thead><tr><th>アカウント名</th><th>@handle</th><th>健全性</th><th>日次</th><th>最終投稿</th><th>状態</th><th></th></tr></thead>
        <tbody>
          ${e.accounts.map(t=>`
            <tr>
              <td class="font-semibold">${A(t.account_name)}</td>
              <td class="text-accent">@${A(t.x_username||"未認証")}</td>
              <td><span class="font-bold ${t.account_health_score>=80?"text-emerald-600":t.account_health_score>=60?"text-amber-600":"text-red-600"}"></span> <span class="pill ${t.health_status==="risk"?"pill-err":t.health_status==="caution"?"pill-warn":"pill-ok"} ml-1">${t.health_status||"healthy"}</span></td>
              <td class="text-xs">${t.daily_post_count??0} / ${t.daily_post_limit??5}</td>
              <td class="text-xs text-ink-muted">${t.last_posted_at||"-"}</td>
              <td>${t.is_active?'<span class="pill pill-ok">有効</span>':'<span class="pill pill-soft">停止</span>'}</td>
              <td class="text-right">
                <button class="btn btn-subtle btn-sm" onclick="testAcct(${t.id})"><i class="fas fa-vial"></i>接続テスト</button>
                <button class="btn btn-danger btn-sm" onclick="delAcct(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}

  <div id="add-acct-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);align-items:center;justify-content:center;z-index:50;padding:1rem">
    <div style="background:#fff;border-radius:.75rem;max-width:32rem;width:100%;padding:1.5rem">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Xアカウント追加</h3>
        <button onclick="closeAddAcct()" class="text-ink-muted"><i class="fas fa-xmark text-xl"></i></button>
      </div>
      <div class="space-y-3">
        <div class="alert alert-info text-xs">X Developer Portal → User authentication settings → OAuth 1.0a → Keys and tokens</div>
        <div>
          <label class="field-label"><i class="fas fa-tag icon-blue"></i>アカウント表示名</label>
          <input type="text" id="na-name" class="inp" placeholder="例: @accounts">
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
function openAddAcct() { document.getElementById('add-acct-modal').style.display='flex'; }
function closeAddAcct() { document.getElementById('add-acct-modal').style.display='none'; }
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
<\/script>`}function Sn(e){const t=[{key:"posts",label:"投稿キュー",desc:"全投稿データ（予約・投稿済・失敗含む）",icon:"fa-brands fa-x-twitter",color:"text-blue-600"},{key:"logs",label:"投稿ログ",desc:"投稿実行の全履歴（成功・失敗）",icon:"fa-clipboard-list",color:"text-emerald-600"},{key:"generations",label:"AI生成ログ",desc:"AI生成されたテキストの記録",icon:"fa-robot",color:"text-purple-600"},{key:"autopilot",label:"オートパイロット",desc:"予約ジョブの一覧",icon:"fa-plane-departure",color:"text-amber-600"},{key:"drafts",label:"下書き",desc:"保存済みの下書きデータ",icon:"fa-file-pen",color:"text-sky-600"},{key:"kpi",label:"KPI",desc:"日別投稿数・失敗数の統計",icon:"fa-chart-line",color:"text-rose-600"},{key:"accounts",label:"Xアカウント",desc:"アカウント情報（トークン除外）",icon:"fa-users-gear",color:"text-indigo-600"},{key:"targets",label:"ターゲット設定",desc:"ターゲットテンプレート",icon:"fa-bullseye",color:"text-orange-600"},{key:"voices",label:"ブランドボイス",desc:"ボイスプロファイル",icon:"fa-palette",color:"text-pink-600"}],a=[{key:"admin/users",label:"ユーザー一覧",desc:"全ユーザー（プラン・承認状態含む）",icon:"fa-users",color:"text-blue-600"},{key:"admin/licenses",label:"ライセンス",desc:"ライセンスキーの全データ",icon:"fa-key",color:"text-amber-600"},{key:"admin/subs",label:"サブスクリプション",desc:"全契約情報",icon:"fa-credit-card",color:"text-emerald-600"},{key:"admin/audit",label:"監査ログ",desc:"認証・操作ログ",icon:"fa-shield-halved",color:"text-red-600"}];return`
<div class="space-y-6">
  <div>
    <h1 class="section-title"><i class="fas fa-download"></i>一括ダウンロード</h1>
    <p class="section-desc">各データをCSV形式でダウンロードできます。ExcelやGoogleスプレッドシートで開けます。</p>
  </div>

  <!-- 全データ一括 -->
  <div class="card">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-bold text-ink"><i class="fas fa-box-archive text-accent"></i> 全データ一括</h3>
        <p class="text-xs text-ink-muted mt-1">全データをJSON形式で一括ダウンロードします（バックアップ用途）</p>
      </div>
      <button class="btn btn-primary" onclick="dlExport('all')">
        <i class="fas fa-download"></i>全データ JSON
      </button>
    </div>
  </div>

  <!-- 個別ダウンロード -->
  <div class="card">
    <h3 class="font-bold text-ink mb-4"><i class="fas fa-file-csv text-accent"></i> 個別ダウンロード（CSV）</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${t.map(s=>`
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${s.icon} ${s.color}"></i>
                <span class="font-semibold text-sm text-ink">${s.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${s.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${s.key}')" title="${s.label}をCSVでダウンロード">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  </div>

  ${e.isAdmin?`
  <!-- 管理者向け -->
  <div class="card">
    <h3 class="font-bold text-ink mb-1"><i class="fas fa-shield-halved text-red-500"></i> 管理者エクスポート</h3>
    <p class="text-xs text-ink-muted mb-4">管理者のみがダウンロードできるシステム全体のデータです。</p>
    <div class="flex items-center gap-3 mb-4">
      <button class="btn btn-primary" onclick="dlExport('admin/all')">
        <i class="fas fa-download"></i>管理者全データ JSON
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${a.map(s=>`
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${s.icon} ${s.color}"></i>
                <span class="font-semibold text-sm text-ink">${s.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${s.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${s.key}')" title="${s.label}をCSVでダウンロード">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
  `:""}

  <!-- 使い方 -->
  <div class="card bg-paper-soft">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-info text-accent"></i> 使い方</h3>
    <ul class="text-sm text-ink-muted space-y-2">
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>CSVファイルはBOM付きUTF-8で出力されるため、Excelで直接開いても文字化けしません。</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>各CSVは最大10,000件までエクスポートされます。</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-check text-emerald-500 mt-0.5"></i>
        <span>「全データJSON」はバックアップ目的で、全テーブルのデータをまとめてダウンロードします。</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-lock text-amber-500 mt-0.5"></i>
        <span>Xアカウントのアクセストークンはセキュリティ上エクスポートされません。</span>
      </li>
    </ul>
  </div>
</div>
<script>
function dlExport(key) {
  toast('ダウンロード開始...', 'info');
  const url = '/api/admin/export/' + key;
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('ダウンロード失敗 (' + r.status + ')');
      const cd = r.headers.get('content-disposition') || '';
      const match = cd.match(/filename="?([^"]+)"?/);
      const filename = match ? match[1] : 'ge365x_export.' + (key.includes('all') ? 'json' : 'csv');
      return r.blob().then(blob => ({ blob, filename }));
    })
    .then(({ blob, filename }) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      toast(filename + ' をダウンロードしました', 'ok');
    })
    .catch(e => toast(e.message, 'err'));
}
<\/script>`}function Tn(e){const t=e.settings||{};return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-key"></i>API設定</h1>
    <p class="section-desc">X API / OpenAI / Google Gemini / Telegram の設定を行います。</p>
  </div>

  <!-- X API -->
  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-x-twitter"></i> X API設定（OAuth 1.0a User Context）</h3>
    <div class="alert alert-warn">
      <i class="fas fa-triangle-exclamation" style="margin-top:2px"></i>
      <div style="font-size:.82rem">重要: App permissions を「Read」から「Read and Write」に変更した場合、必ず「Keys and tokens」タブで <strong>Access Token &amp; Secret を Regenerate（再発行）</strong> してください。再発行しないと権限が Read のままで 403 Forbidden や 401 Unauthorized になります。Bearer Token は /users/me の接続確認には使用しません。</div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key (Consumer Key)</label>
      <input type="text" id="api-xk" class="inp input-mono" placeholder="未設定" value="${A(t.api_key||"")}">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Secret (Consumer Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" placeholder="未設定" value="${A(t.api_secret||"")}">
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveXApi()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('x')"><i class="fas fa-plug"></i>接続テスト</button>
      <span id="xapi-status" style="font-size:.8rem;color:var(--ink-muted)">未接続確認（保存後に「接続テスト」を実行してください)</span>
    </div>
  </div>

  <!-- OpenAI -->
  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fas fa-circle-nodes" style="color:#10A37F"></i> OpenAI API設定</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">AI記事生成に使用するOpenAI APIキーを設定します。</p>
    <div>
      <label class="field-label"><i class="fas fa-key icon-green"></i>OpenAI API Key</label>
      <input type="password" id="api-oai" class="inp input-mono" placeholder="${t.openai_api_key?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-microchip icon-blue"></i>モデル</label>
      <select id="api-model" class="inp" style="max-width:16rem">
        <option value="gpt-4o-mini" ${(t.openai_model||"gpt-4o-mini")==="gpt-4o-mini"?"selected":""}>gpt-4o-mini（推奨・低コスト）</option>
        <option value="gpt-4o" ${(t.openai_model||"")==="gpt-4o"?"selected":""}>gpt-4o（高性能）</option>
        <option value="gpt-4-turbo" ${(t.openai_model||"")==="gpt-4-turbo"?"selected":""}>gpt-4-turbo</option>
      </select>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveOpenAI()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('openai')"><i class="fas fa-plug"></i>接続テスト</button>
      <span id="oai-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

  <!-- Google Gemini -->
  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fas fa-gem" style="color:#4285F4"></i> Google Gemini API設定</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">Google AI Studio で取得した API キーを入力してください。</p>
    <div>
      <label class="field-label"><i class="fas fa-key icon-blue"></i>Gemini API Key</label>
      <input type="password" id="api-gem" class="inp input-mono" placeholder="${t.gemini_api_key?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-microchip icon-blue"></i>モデル</label>
      <select id="api-gem-model" class="inp" style="max-width:16rem">
        <option value="gemini-1.5-flash" ${(t.gemini_model||"gemini-1.5-flash")==="gemini-1.5-flash"?"selected":""}>gemini-1.5-flash（推奨）</option>
        <option value="gemini-1.5-pro" ${(t.gemini_model||"")==="gemini-1.5-pro"?"selected":""}>gemini-1.5-pro</option>
        <option value="gemini-2.0-flash" ${(t.gemini_model||"")==="gemini-2.0-flash"?"selected":""}>gemini-2.0-flash</option>
      </select>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveGemini()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('gemini')"><i class="fas fa-plug"></i>接続テスト</button>
      <span id="gem-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

  <!-- Telegram -->
  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-telegram" style="color:#2AABEE"></i> Telegram 通知設定</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">投稿成功・失敗をTelegramに通知します（任意）。</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div>
        <label class="field-label"><i class="fas fa-robot icon-blue"></i>Bot Token</label>
        <input type="password" id="api-tg-tok" class="inp input-mono" placeholder="${t.telegram_bot_token?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-hash icon-blue"></i>Chat ID</label>
        <input type="text" id="api-tg-chat" class="inp input-mono" placeholder="例: -1001234567890" value="${A(t.telegram_chat_id||"")}" pattern="-?[0-9]+">
      </div>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveTelegram()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('telegram')"><i class="fas fa-paper-plane"></i>テスト送信</button>
      <span id="tg-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>
</div>
<script>
function escHtml(s){return(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c])}
function setStatus(id,msg,ok){const el=document.getElementById(id);if(el){el.textContent=msg;el.style.color=ok?'#059669':'#DC2626';}}

async function saveXApi(){
  const r=await fetch('/api/admin/api-settings/x',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({api_key:document.getElementById('api-xk').value,api_secret:document.getElementById('api-xs').value})});
  const j=await r.json();
  if(j.success){toast('X API設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function saveOpenAI(){
  const key=document.getElementById('api-oai').value.trim();
  if(!key){toast('変更なし（保存済みのキーはそのまま使用されます）','info');return;}
  const r=await fetch('/api/admin/api-settings/openai',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({openai_key:key,openai_model:document.getElementById('api-model').value})});
  const j=await r.json();
  if(j.success){toast('OpenAI設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function saveGemini(){
  const key=document.getElementById('api-gem').value.trim();
  if(!key){toast('変更なし（保存済みのキーはそのまま使用されます）','info');return;}
  const r=await fetch('/api/admin/api-settings/gemini',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({gemini_key:key,gemini_model:document.getElementById('api-gem-model').value})});
  const j=await r.json();
  if(j.success){toast('Gemini設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function saveTelegram(){
  const chatId = document.getElementById('api-tg-chat').value.trim();
  if (chatId && !/^-?[0-9]+$/.test(chatId)) {
    toast('Chat IDは数字のみ（例: -1001234567890）','err'); return;
  }
  const r=await fetch('/api/admin/api-settings/telegram',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({telegram_token:document.getElementById('api-tg-tok').value,telegram_chat_id:document.getElementById('api-tg-chat').value})});
  const j=await r.json();
  if(j.success){toast('Telegram設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function testApi(kind){
  const statusId = kind==='x'?'xapi-status':kind==='openai'?'oai-status':kind==='gemini'?'gem-status':'tg-status';
  setStatus(statusId,'テスト中...', true);
  try {
    const r=await fetch('/api/admin/api-settings/'+kind+'/test',{method:'POST'});
    const j=await r.json();
    if(j.success||j.ok){setStatus(statusId,'✓ 接続OK: '+(j.message||j.username||''),true);}
    else{setStatus(statusId,'✗ '+(j.error||'接続失敗'),false);}
  } catch(e){setStatus(statusId,'✗ ネットワークエラー',false);}
}
<\/script>`}const q=new D;async function An(e,t){const{results:a}=await e.env.DB.prepare(`SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`).bind(t.id).all(),s=(a||[]).map(i=>({id:i.id,account_name:i.account_name,x_username:i.x_username})),n=(a||[]).find(i=>i.is_current===1)||(a||[])[0];return{accounts:s,currentAccountId:(n==null?void 0:n.id)??null}}q.get("/",e=>e.redirect("/login"));async function Y(e,t,a){const s=e.get("user"),{accounts:n,currentAccountId:i}=await An(e,s),r=n.length>0,l=await Promise.resolve(a({user:s,hasAccount:r,accounts:n,currentAccountId:i})),o=mn({active:t,user:s,accounts:n,currentAccountId:i,pageBody:l});return e.html($t("GE365x",o))}q.get("/dashboard",f,async e=>Y(e,"dashboard",async({user:t,hasAccount:a})=>{const s=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?").bind(t.id).first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'").bind(t.id).first(),i=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved')").bind(t.id).first(),r=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')").bind(t.id).first(),{results:l}=await e.env.DB.prepare(`SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`).bind(t.id).all();return fn({stats:{accounts:(s==null?void 0:s.n)??0,today:(n==null?void 0:n.n)??0,pending:(i==null?void 0:i.n)??0,failed:(r==null?void 0:r.n)??0},recentLogs:l||[]})}));q.get("/dashboard/target",f,async e=>Y(e,"target",async({user:t,currentAccountId:a,hasAccount:s})=>{const n=String(a??"default"),i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return hn({target:i,hasAccount:s,noAccountAlert:Ae})}));q.get("/dashboard/voice",f,async e=>Y(e,"voice",async({user:t,currentAccountId:a,hasAccount:s})=>{const n=String(a??"default"),i=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return gn({voice:i,hasAccount:s,noAccountAlert:Ae})}));q.get("/dashboard/pattern",f,async e=>Y(e,"pattern",async({user:t,hasAccount:a,currentAccountId:s,accounts:n})=>{const i=String(s??"default");return await e.env.DB.prepare("SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),await e.env.DB.prepare("SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),n.find(r=>r.id===s),_n({hasAccount:a,noAccountAlert:Ae})}));q.get("/dashboard/generate",f,async e=>Y(e,"generate",({hasAccount:t})=>bn({hasAccount:t,noAccountAlert:Ae})));q.get("/dashboard/posts",f,async e=>Y(e,"posts",async({user:t,hasAccount:a})=>{const n=e.req.query("month")||new Date().toISOString().slice(0,7),[i,r]=n.split("-"),{results:l}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`).bind(t.id,n).all(),o=(l||[]).length,d=(l||[]).filter(m=>m.status==="pending"||m.status==="approved").length,c=(l||[]).filter(m=>m.status==="posted").length,p=(l||[]).filter(m=>m.status==="failed").length;return vn({hasAccount:a,noAccountAlert:Ae,month:n,y:i,m:parseInt(r,10),posts:l||[],stats:{total:o,pending:d,posted:c,failed:p}})}));q.get("/dashboard/thread",f,async e=>Y(e,"thread",async({user:t,hasAccount:a})=>{const{results:s}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`).bind(t.id).all();return yn({hasAccount:a,noAccountAlert:Ae,history:s||[]})}));q.get("/dashboard/scheduled",f,async e=>Y(e,"scheduled",async({user:t})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`).bind(t.id).all();return En()}));q.get("/dashboard/autopilot",f,async e=>Y(e,"autopilot",async({user:t,hasAccount:a,accounts:s})=>{const{results:n}=await e.env.DB.prepare(`SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`).bind(t.id).all();return wn({hasAccount:a,noAccountAlert:Ae,accounts:s,jobs:n||[]})}));q.get("/dashboard/accounts",f,async e=>Y(e,"accounts",async({user:t})=>{const{results:a}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return kn({accounts:a||[]})}));q.get("/dashboard/api",f,async e=>Y(e,"api",async({user:t})=>{const{aesDecrypt:a}=await Promise.resolve().then(()=>lt),s=async g=>{const v=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key=?").bind(g).first();if(!(v!=null&&v.value))return"";try{return await a(v.value,e.env.ENCRYPTION_KEY)}catch{return""}},n=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? LIMIT 1").bind(t.id).first();let i="",r="";if(n!=null&&n.api_key)try{const g=await a(n.api_key,e.env.ENCRYPTION_KEY);i=g?g.slice(0,6)+"••••":""}catch{}if(n!=null&&n.api_secret)try{const g=await a(n.api_secret,e.env.ENCRYPTION_KEY);r=g?g.slice(0,4)+"••••":""}catch{}const l=await s("openai_api_key"),o=await s("openai_model"),d=await s("gemini_api_key"),c=await s("gemini_model"),p=await s("telegram_bot_token"),m=await s("telegram_chat_id");return Tn({settings:{api_key:i,api_secret:r,openai_api_key:!!l,openai_model:o||"gpt-4o-mini",gemini_api_key:!!d,gemini_model:c||"gemini-1.5-flash",telegram_bot_token:!!p,telegram_chat_id:m||""}})}));q.get("/dashboard/export",f,async e=>Y(e,"export",({user:t})=>Sn({isAdmin:t.is_admin})));const za=new D;za.get("/admin",f,Te,e=>{const t=`
<div class="min-h-screen flex flex-col">
  <!-- ヘッダ -->
  <header class="border-b border-brand-800/40 bg-surface-raised/80 backdrop-blur">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="brand-logo w-10 h-10 rounded-xl flex items-center justify-center">
          <i class="fas ${H.icon} text-white"></i>
        </div>
        <div>
          <div class="text-white font-bold tracking-tight">${H.name} <span class="text-brand-400 text-xs font-normal">管理</span></div>
          <div class="text-brand-400 text-xs">${H.longName}</div>
        </div>
      </div>
      <div class="flex items-center gap-3 text-sm">
        <button onclick="dlAdminExport('admin/all')" class="btn-ghost" title="管理者全データJSON"><i class="fas fa-download"></i>全データDL</button>
        <a href="/dashboard" class="btn-ghost"><i class="fas fa-gauge"></i>ダッシュボード</a>
        <button onclick="doLogout()" class="btn-ghost"><i class="fas fa-right-from-bracket"></i>ログアウト</button>
      </div>
    </div>
  </header>

  <!-- タブ -->
  <nav class="border-b border-brand-800/40 bg-surface">
    <div class="max-w-7xl mx-auto flex gap-1 px-6 py-2 overflow-x-auto">
      <button onclick="showSection('users')"     id="nav-users"     class="tab-trigger active">ユーザー</button>
      <button onclick="showSection('licenses')"  id="nav-licenses"  class="tab-trigger">ライセンス</button>
      <button onclick="showSection('subs')"      id="nav-subs"      class="tab-trigger">サブスクリプション</button>
      <button onclick="showSection('audit')"     id="nav-audit"     class="tab-trigger">監査ログ</button>
      <button onclick="showSection('settings')"  id="nav-settings"  class="tab-trigger">システム設定</button>
    </div>
  </nav>

  <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">

    <!-- === ユーザー === -->
    <section id="section-users" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">ユーザー一覧</h2>
        <div class="flex gap-2">
          <select id="users-filter" class="input-field w-auto" onchange="loadUsers()">
            <option value="all">全て</option>
            <option value="pending">承認待ち</option>
            <option value="approved">承認済</option>
            <option value="admin">管理者</option>
          </select>
          <button onclick="loadUsers()" class="btn-ghost"><i class="fas fa-rotate"></i></button>
          <button onclick="dlAdminExport('admin/users')" class="btn-ghost" title="ユーザー一覧CSV"><i class="fas fa-download"></i></button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table" id="users-table">
          <thead><tr>
            <th>ID</th><th>メール</th><th>承認</th><th>管理者</th><th>プラン</th>
            <th>ステータス</th><th>トライアル終了</th><th>登録日</th><th>操作</th>
          </tr></thead>
          <tbody id="users-tbody"><tr><td colspan="9" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === ライセンス === -->
    <section id="section-licenses" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">ライセンスキー管理</h2>
        <div class="flex gap-2">
          <button onclick="dlAdminExport('admin/licenses')" class="btn-ghost" title="ライセンスCSV"><i class="fas fa-download"></i></button>
          <button onclick="openIssueLicenseModal()" class="btn-primary">
            <i class="fas fa-plus"></i>新規発行
          </button>
        </div>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>キー</th><th>種別</th><th>プラン</th><th>状態</th>
            <th>ユーザー</th><th>有効期限</th><th>発行日</th><th>操作</th>
          </tr></thead>
          <tbody id="licenses-tbody"><tr><td colspan="9" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>

      <!-- 発行モーダル -->
      <div id="issue-license-modal" class="fixed inset-0 bg-black/70 hidden items-center justify-center z-50 p-4">
        <div class="card max-w-md w-full">
          <h3 class="text-lg font-bold text-white mb-4">新規ライセンス発行</h3>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-brand-300 mb-1 block">プラン</label>
              <select id="issue-plan" class="input-field">
                <option value="ge365x_free">Free</option>
                <option value="ge365x_standard" selected>Standard</option>
                <option value="ge365x_pro">Pro</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">種別</label>
              <select id="issue-type" class="input-field">
                <option value="paid" selected>paid（有料）</option>
                <option value="trial">trial（試用）</option>
                <option value="lifetime">lifetime（永久）</option>
                <option value="comp">comp（招待）</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">有効期限（省略可）</label>
              <input type="date" id="issue-expires" class="input-field">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">発行数</label>
              <input type="number" id="issue-count" class="input-field" value="1" min="1" max="100">
            </div>
            <div>
              <label class="text-sm text-brand-300 mb-1 block">メモ</label>
              <input type="text" id="issue-note" class="input-field" placeholder="用途・顧客名など">
            </div>
            <div class="flex gap-2">
              <button onclick="closeIssueLicenseModal()" class="btn-ghost flex-1">キャンセル</button>
              <button onclick="submitIssueLicense()" class="btn-primary flex-1">
                <i class="fas fa-key"></i>発行
              </button>
            </div>
            <div id="issue-result" class="hidden bg-surface border border-brand-700/40 rounded-lg p-3 font-mono text-xs text-brand-200"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- === サブスク === -->
    <section id="section-subs" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">サブスクリプション</h2>
        <button onclick="dlAdminExport('admin/subs')" class="btn-ghost" title="サブスクリプションCSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>ユーザー</th><th>プラン</th><th>状態</th>
            <th>開始</th><th>期限</th><th>自動更新</th>
          </tr></thead>
          <tbody id="subs-tbody"><tr><td colspan="7" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === 投稿管理（削除済み） ===
    <section id="section-posts" style="display:none!important">
      <h2 class="text-xl font-bold text-white">投稿キュー / ログ</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" id="posts-stats"></div>
      <div class="card overflow-x-auto">
        <h3 class="text-white font-semibold mb-3">最近の投稿ログ</h3>
        <table class="data-table">
          <thead><tr>
            <th>時刻</th><th>ユーザー</th><th>アカウント</th><th>本文</th><th>状態</th>
          </tr></thead>
          <tbody id="posts-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === Xアカウント（削除済み） ===
    <section id="section-accounts" style="display:none!important">
      <h2 class="text-xl font-bold text-white">X アカウント</h2>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>ID</th><th>ユーザー</th><th>@handle</th><th>状態</th>
            <th>最終使用</th><th>トークン期限</th>
          </tr></thead>
          <tbody id="accounts-tbody"><tr><td colspan="6" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === 監査ログ === -->
    <section id="section-audit" class="space-y-4 hidden-force">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">認証・監査ログ</h2>
        <button onclick="dlAdminExport('admin/audit')" class="btn-ghost" title="監査ログCSV"><i class="fas fa-download"></i></button>
      </div>
      <div class="card overflow-x-auto">
        <table class="data-table">
          <thead><tr>
            <th>時刻</th><th>ユーザー</th><th>イベント</th><th>IP</th><th>User Agent</th>
          </tr></thead>
          <tbody id="audit-tbody"><tr><td colspan="5" class="text-center text-brand-400 py-8">読込中...</td></tr></tbody>
        </table>
      </div>
    </section>

    <!-- === システム設定 === -->
    <section id="section-settings" class="space-y-4 hidden-force">
      <h2 class="text-xl font-bold text-white">システム設定</h2>
      <div class="card">
        <div class="space-y-4" id="settings-form"></div>
      </div>
    </section>

  </main>
</div>

<script>
const sections = ['users','licenses','subs','audit','settings'];
const loaders = {
  users: loadUsers, licenses: loadLicenses, subs: loadSubs,
  posts: loadPosts, accounts: loadAccounts, audit: loadAudit, settings: loadSettings
};

function showSection(name) {
  sections.forEach(s => {
    document.getElementById('nav-' + s).classList.toggle('active', s === name);
    document.getElementById('section-' + s).classList.toggle('hidden-force', s !== name);
  });
  if (loaders[name]) loaders[name]();
}

async function doLogout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  location.href = '/login';
}

// ---------- ユーザー ----------
async function loadUsers() {
  const filter = document.getElementById('users-filter').value;
  const r = await fetch('/api/admin/users?filter=' + filter);
  const j = await r.json();
  const tbody = document.getElementById('users-tbody');
  if (!j.users || !j.users.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-brand-400 py-6">対象なし</td></tr>';
    return;
  }
  tbody.innerHTML = j.users.map(u => \`
    <tr>
      <td class="text-brand-300">\${u.id}</td>
      <td>\${u.email}</td>
      <td>\${u.is_approved ? '<span class="pill pill-active">承認済</span>' : '<span class="pill pill-pending">保留</span>'}</td>
      <td>\${u.is_admin ? '<i class="fas fa-shield text-brand-400"></i>' : ''}</td>
      <td class="text-xs">\${u.plan_code || '-'}</td>
      <td>\${u.sub_status ? '<span class="pill pill-active">'+u.sub_status+'</span>' : '-'}</td>
      <td class="text-xs text-brand-300">\${u.trial_end || '-'}</td>
      <td class="text-xs text-brand-300">\${u.created_at}</td>
      <td class="flex gap-1">
        \${u.is_approved
          ? \`<button onclick="toggleApprove(\${u.id},0)" class="btn-ghost text-xs"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="toggleApprove(\${u.id},1)" class="btn-primary text-xs"><i class="fas fa-check"></i></button>\`}
        <button onclick="toggleAdmin(\${u.id},\${u.is_admin?0:1})" class="btn-ghost text-xs">
          <i class="fas fa-shield"></i>
        </button>
      </td>
    </tr>
  \`).join('');
}
async function toggleApprove(id, to) {
  await fetch(\`/api/admin/users/\${id}/approve\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_approved: to }) });
  loadUsers();
}
async function toggleAdmin(id, to) {
  await fetch(\`/api/admin/users/\${id}/admin\`, {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ is_admin: to }) });
  loadUsers();
}

// ---------- ライセンス ----------
async function loadLicenses() {
  const r = await fetch('/api/admin/licenses');
  const j = await r.json();
  const tbody = document.getElementById('licenses-tbody');
  if (!j.licenses || !j.licenses.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-brand-400 py-6">発行済キーなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.licenses.map(l => \`
    <tr>
      <td class="text-brand-300">\${l.id}</td>
      <td class="font-mono text-xs">\${l.license_key}</td>
      <td><span class="pill pill-inactive">\${l.license_type}</span></td>
      <td class="text-xs">\${l.plan_code || '-'}</td>
      <td>\${l.is_active ? '<span class="pill pill-active">有効</span>' : '<span class="pill pill-inactive">無効</span>'}</td>
      <td class="text-xs">\${l.user_email || '-'}</td>
      <td class="text-xs text-brand-300">\${l.expires_at || '無期限'}</td>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td class="flex gap-1">
        <button onclick="copyKey('\${l.license_key}')" class="btn-ghost text-xs" title="コピー"><i class="fas fa-copy"></i></button>
        \${l.is_active
          ? \`<button onclick="revokeLicense(\${l.id})" class="btn-danger text-xs" title="無効化"><i class="fas fa-ban"></i></button>\`
          : \`<button onclick="reactivateLicense(\${l.id})" class="btn-ghost text-xs" title="再有効化"><i class="fas fa-check"></i></button>\`}
      </td>
    </tr>
  \`).join('');
}
function copyKey(k) { navigator.clipboard.writeText(k); }
function openIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.remove('hidden');
  document.getElementById('issue-license-modal').classList.add('flex');
  document.getElementById('issue-result').classList.add('hidden');
}
function closeIssueLicenseModal() {
  document.getElementById('issue-license-modal').classList.add('hidden');
  document.getElementById('issue-license-modal').classList.remove('flex');
}
async function submitIssueLicense() {
  const body = {
    plan_code: document.getElementById('issue-plan').value,
    license_type: document.getElementById('issue-type').value,
    expires_at: document.getElementById('issue-expires').value || null,
    count: parseInt(document.getElementById('issue-count').value, 10) || 1,
    note: document.getElementById('issue-note').value || null,
  };
  const r = await fetch('/api/admin/licenses/issue', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok) { alert('発行失敗: ' + (j.error || '')); return; }
  const el = document.getElementById('issue-result');
  el.textContent = (j.keys || []).join('\\n');
  el.classList.remove('hidden');
  loadLicenses();
}
async function revokeLicense(id) {
  if (!confirm('このライセンスを無効化しますか？')) return;
  await fetch(\`/api/admin/licenses/\${id}/revoke\`, { method: 'POST' });
  loadLicenses();
}
async function reactivateLicense(id) {
  await fetch(\`/api/admin/licenses/\${id}/reactivate\`, { method: 'POST' });
  loadLicenses();
}

// ---------- サブスク ----------
async function loadSubs() {
  const r = await fetch('/api/admin/subscriptions');
  const j = await r.json();
  const tbody = document.getElementById('subs-tbody');
  if (!j.subscriptions || !j.subscriptions.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-brand-400 py-6">契約なし</td></tr>';
    return;
  }
  tbody.innerHTML = j.subscriptions.map(s => \`
    <tr>
      <td class="text-brand-300">\${s.id}</td>
      <td>\${s.user_email}</td>
      <td>\${s.plan_code}</td>
      <td><span class="pill pill-\${s.status==='active'?'active':'inactive'}">\${s.status}</span></td>
      <td class="text-xs text-brand-300">\${s.started_at || '-'}</td>
      <td class="text-xs text-brand-300">\${s.current_period_end || '-'}</td>
      <td>\${s.cancel_at_period_end ? '<span class="pill pill-pending">停止予定</span>' : '-'}</td>
    </tr>
  \`).join('');
}

// ---------- 投稿 ----------
async function loadPosts() {
  const r = await fetch('/api/admin/posts/summary');
  const j = await r.json();
  const stats = document.getElementById('posts-stats');
  stats.innerHTML = (j.stats || []).map(s => \`
    <div class="card text-center">
      <div class="text-xs text-brand-400 uppercase tracking-wider">\${s.label}</div>
      <div class="text-2xl font-bold text-white mt-1">\${s.value}</div>
    </div>
  \`).join('');
  const tbody = document.getElementById('posts-tbody');
  if (!j.recent || !j.recent.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">ログなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.recent.map(p => \`
    <tr>
      <td class="text-xs text-brand-300">\${p.created_at}</td>
      <td class="text-xs">\${p.email || '-'}</td>
      <td class="text-xs">\${p.x_screen_name || '-'}</td>
      <td class="text-xs max-w-md truncate">\${p.content || ''}</td>
      <td><span class="pill pill-\${p.status==='success'?'active':(p.status==='failed'?'error':'inactive')}">\${p.status}</span></td>
    </tr>
  \`).join('');
}

// ---------- Xアカウント ----------
async function loadAccounts() {
  const r = await fetch('/api/admin/x-accounts');
  const j = await r.json();
  const tbody = document.getElementById('accounts-tbody');
  if (!j.accounts || !j.accounts.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-brand-400 py-6">アカウントなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.accounts.map(a => \`
    <tr>
      <td class="text-brand-300">\${a.id}</td>
      <td class="text-xs">\${a.user_email}</td>
      <td>@\${a.x_screen_name || '-'}</td>
      <td>\${a.is_active ? '<span class="pill pill-active">有効</span>' : '<span class="pill pill-inactive">停止</span>'}</td>
      <td class="text-xs text-brand-300">\${a.last_used_at || '-'}</td>
      <td class="text-xs text-brand-300">\${a.token_expires_at || '-'}</td>
    </tr>
  \`).join('');
}

// ---------- 監査 ----------
async function loadAudit() {
  const r = await fetch('/api/admin/audit-logs');
  const j = await r.json();
  const tbody = document.getElementById('audit-tbody');
  if (!j.logs || !j.logs.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-brand-400 py-6">ログなし</td></tr>';
    return;
  }
  tbody.innerHTML = j.logs.map(l => \`
    <tr>
      <td class="text-xs text-brand-300">\${l.created_at}</td>
      <td class="text-xs">\${l.email || '-'}</td>
      <td><span class="pill pill-inactive">\${l.event_type}</span></td>
      <td class="text-xs text-brand-300">\${l.ip_address || ''}</td>
      <td class="text-xs text-brand-400 truncate max-w-xs">\${(l.user_agent||'').slice(0,60)}</td>
    </tr>
  \`).join('');
}

// ---------- 設定 ----------
async function loadSettings() {
  var r = await fetch('/api/admin/settings');
  var j = await r.json();
  var td = j.trial_days || 7;
  var form = document.getElementById('settings-form');
  form.innerHTML =
    '<div style="margin-bottom:1rem">' +
      '<h3 style="color:#F9FAFB;font-size:1rem;font-weight:700;margin:0 0 .375rem">トライアル設定</h3>' +
      '<p style="color:#9CA3AF;font-size:.82rem;margin:0">新規会員に付与するトライアル期間を設定します。保存後、新規登録から有効になります。</p>' +
    '</div>' +
    '<div style="display:flex;align-items:flex-end;gap:1rem;flex-wrap:wrap">' +
      '<div>' +
        '<div style="color:#F9FAFB;font-weight:600;margin-bottom:.375rem">トライアル日数</div>' +
        '<div style="color:#9CA3AF;font-size:.78rem;margin-bottom:.5rem">現在: ' + td + '日（新規登録時のデフォルト）</div>' +
        '<div style="display:flex;align-items:center;gap:.5rem">' +
          '<input type="number" id="trial-days-input" class="input-field" value="' + td + '" min="1" max="365" style="width:6rem">' +
          '<span style="color:#9CA3AF;font-size:.82rem">日</span>' +
        '</div>' +
      '</div>' +
      '<button onclick="saveTrialDays()" class="btn-primary" style="display:inline-flex;align-items:center;gap:.375rem">' +
        '<i class="fas fa-save"></i>保存' +
      '</button>' +
    '</div>' +
    '<div id="trial-save-msg" style="font-size:.82rem;margin-top:.5rem"></div>';
}

async function saveTrialDays() {
  const val = parseInt(document.getElementById('trial-days-input').value, 10);
  if (!val || val < 1 || val > 365) {
    document.getElementById('trial-save-msg').innerHTML = '<span style="color:#EF4444">1〜365の数値を入力してください</span>';
    return;
  }
  const r = await fetch('/api/admin/settings', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({ key: 'trial_days', value: String(val) })
  });
  const j = await r.json();
  if (j.ok) {
    document.getElementById('trial-save-msg').innerHTML = '<span style="color:#6EE7B7">✓ 保存しました（新規登録から有効）</span>';
    setTimeout(() => loadSettings(), 1000);
  } else {
    document.getElementById('trial-save-msg').innerHTML = '<span style="color:#EF4444">保存失敗</span>';
  }
}
<\/script>
`;return e.html($t("管理画面",`<style>
:root{--brand:#2563EB;--brand-dark:#1E2A3B;--brand-400:#A7B6CE;--surface:#1E2A3B;--surface-raised:#243347;--line:#2A3B52}
*{box-sizing:border-box}
body{background:#111827;color:#F9FAFB;font-family:'Noto Sans JP',Inter,sans-serif;font-size:14px;margin:0}
.brand-logo{background:linear-gradient(135deg,#2563EB,#7C3AED)}
.btn-ghost{display:inline-flex;align-items:center;gap:.375rem;padding:.4rem .875rem;border-radius:.375rem;font-size:.82rem;font-weight:500;cursor:pointer;border:1px solid #2A3B52;background:transparent;color:#D1D5DB;font-family:inherit;text-decoration:none;transition:all .15s}
.btn-ghost:hover{background:#1F2937;border-color:#4B5563;color:#fff}
.btn-primary{display:inline-flex;align-items:center;gap:.375rem;padding:.4rem .875rem;border-radius:.375rem;font-size:.82rem;font-weight:600;cursor:pointer;border:none;background:#2563EB;color:#fff;font-family:inherit;transition:all .15s}
.btn-primary:hover{background:#1D4ED8}
.tab-trigger{display:inline-flex;align-items:center;gap:.375rem;padding:.5rem 1rem;font-size:.82rem;font-weight:500;cursor:pointer;border:none;border-bottom:2px solid transparent;background:transparent;color:#9CA3AF;font-family:inherit;white-space:nowrap;transition:all .15s}
.tab-trigger:hover{color:#F9FAFB}
.tab-trigger.active{color:#60A5FA;border-bottom-color:#2563EB}
.card{background:#1F2937;border:1px solid #2A3B52;border-radius:.75rem;padding:1.25rem}
.data-table{width:100%;border-collapse:collapse;font-size:.82rem}
.data-table th{padding:.5rem .75rem;text-align:left;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:#9CA3AF;background:#111827;border-bottom:1px solid #2A3B52}
.data-table td{padding:.5rem .75rem;border-bottom:1px solid #1F2937;color:#D1D5DB;vertical-align:middle}
.data-table tr:hover td{background:#1F2937}
.input-field{display:block;width:100%;padding:.4rem .75rem;border-radius:.375rem;background:#111827;border:1px solid #374151;color:#F9FAFB;font-size:.82rem;font-family:inherit;outline:none}
.input-field:focus{border-color:#2563EB;box-shadow:0 0 0 2px rgba(37,99,235,.2)}
.pill{display:inline-flex;align-items:center;padding:.125rem .5rem;border-radius:9999px;font-size:.72rem;font-weight:600;border:1px solid transparent;white-space:nowrap}
.pill-active{background:#064E3B;color:#6EE7B7;border-color:#065F46}
.pill-inactive{background:#1F2937;color:#9CA3AF;border-color:#374151}
.pill-pending{background:#78350F;color:#FCD34D;border-color:#92400E}
.hidden-force{display:none!important}
.flex{display:flex}.flex-1{flex:1 1 0%}.items-center{align-items:center}.justify-between{justify-content:space-between}
.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}
.space-y-4>*+*{margin-top:1rem}
.text-white{color:#fff}.text-xl{font-size:1.2rem}.text-xs{font-size:.72rem}.text-sm{font-size:.82rem}
.font-bold{font-weight:700}.font-medium{font-weight:500}
.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}
.mb-4{margin-bottom:1rem}.mt-4{margin-top:1rem}
.w-10{width:2.5rem}.h-10{height:2.5rem}.rounded-xl{border-radius:.75rem}
.overflow-x-auto{overflow-x:auto}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}
.border-b{border-bottom:1px solid #2A3B52}.min-h-screen{min-height:100vh}
select{cursor:pointer;background:#111827;border:1px solid #374151;color:#F9FAFB;border-radius:.375rem;padding:.3rem .5rem;font-family:inherit;font-size:.82rem}
</style>`+t))});const Z=new D;Z.post("/api/auth/register",async e=>{const t=await e.req.json(),a=(t.email||"").trim().toLowerCase(),s=t.password||"";if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a)||s.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='invite_only'").first();if((n==null?void 0:n.value)==="1")return e.json({error:"invite_only"},403);if(await e.env.DB.prepare("SELECT 1 FROM users WHERE email = ?").bind(a).first())return e.json({error:"email_taken"},409);const r=await wt(s),l=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first(),o=parseInt((l==null?void 0:l.value)??"7",10),d=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_require_approval'").first(),c=(d==null?void 0:d.value)!=="0";y();const m=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(a,r,c?0:1,o).run()).meta.last_row_id;return await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(m,o).run(),await e.env.DB.prepare(`INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(a,m,o).run(),await ie(e,"register",{userId:m,email:a}),e.json({ok:!0,user_id:m,approved:!c,message:c?"登録を受け付けました。管理者による承認後にログインできます。":"登録が完了しました。ログインしてください。"})});Z.post("/api/auth/login",async e=>{const t=await e.req.json(),a=(t.email||"").trim().toLowerCase(),s=t.password||"";if(!a||!s)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?").bind(a).first();if(!n)return await ie(e,"login_fail",{email:a,metadata:{reason:"no_user"}}),e.json({error:"invalid_credentials"},401);if(!await Pt(s,n.password_hash))return await ie(e,"login_fail",{userId:n.id,email:a,metadata:{reason:"bad_password"}}),e.json({error:"invalid_credentials"},401);if(n.is_approved===0)return await ie(e,"login_blocked",{userId:n.id,email:a,metadata:{reason:"not_approved"}}),e.json({error:"not_approved"},403);const r=n.trial_end;if(r&&!n.is_admin){const d=new Date,c=new Date(r.replace(" ","T")),p=await e.env.DB.prepare("SELECT status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first();if((p==null?void 0:p.status)!=="active"&&d>c)return await ie(e,"trial_expired",{userId:n.id,email:a}),e.json({error:"trial_expired",message:"無料お試し期間が終了いたしました。"},403)}const l=await $a({uid:n.id,email:n.email,adm:n.is_admin===1},e.env.JWT_SECRET,3600*24*7),o=qt(Ht,l,{maxAge:3600*24*7});return await ie(e,"login_success",{userId:n.id,email:a}),new Response(JSON.stringify({ok:!0,user_id:n.id,email:n.email,is_admin:n.is_admin===1}),{headers:{"content-type":"application/json","set-cookie":o}})});Z.post("/api/auth/logout",async e=>{const t=e.get("user");t&&await ie(e,"logout",{userId:t.id,email:t.email});const a=qt(Ht,"",{maxAge:0});return new Response(JSON.stringify({ok:!0}),{headers:{"content-type":"application/json","set-cookie":a}})});Z.get("/api/auth/me",f,e=>e.json({ok:!0,user:e.get("user")}));Z.post("/api/auth/license/activate",f,async e=>{const t=e.get("user"),{license_key:a}=await e.req.json();if(!a||!Ha(a))return e.json({error:"invalid_license_format"},400);const s=a.trim().toUpperCase(),n=await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(s).first();if(!n)return e.json({error:"license_not_found"},404);if(n.is_active===0)return e.json({error:"license_inactive"},409);if(n.expires_at&&n.expires_at<y())return e.json({error:"license_expired"},409);if(n.user_id&&n.user_id!==t.id)return e.json({error:"license_already_used"},409);await e.env.DB.prepare(`UPDATE licenses
       SET user_id = ?, activated_at = COALESCE(activated_at, datetime('now','+9 hours')),
           updated_at = datetime('now','+9 hours')
     WHERE id = ?`).bind(t.id,n.id).run();const i=n.plan_code||"ge365x_standard",r=n.license_type==="trial"?"trial":"active",l=n.expires_at?n.expires_at:n.license_type==="lifetime"?"2099-12-31 23:59:59":null;return await e.env.DB.prepare(`INSERT INTO user_subscriptions
       (user_id, plan_code, status, started_at, current_period_end, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'), ?, datetime('now','+9 hours'))
     ON CONFLICT(user_id) DO UPDATE SET
       plan_code = excluded.plan_code,
       status    = excluded.status,
       current_period_end = excluded.current_period_end,
       updated_at = datetime('now','+9 hours')`).bind(t.id,i,r,l).run(),await e.env.DB.prepare(`UPDATE users
       SET is_approved = 1, updated_at = datetime('now','+9 hours')
     WHERE id = ? AND is_approved = 0`).bind(t.id).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent)
     VALUES (?, ?, 'activated', ?, ?)`).bind(n.id,t.id,e.req.header("cf-connecting-ip")||"",e.req.header("user-agent")||"").run(),await ie(e,"license_activate",{userId:t.id,email:t.email,metadata:{license_id:n.id,plan_code:i}}),e.json({ok:!0,plan_code:i,status:r,license_type:n.license_type,expires_at:l})});Z.post("/api/auth/password/change",f,async e=>{const t=e.get("user"),{current_password:a,new_password:s}=await e.req.json();if(!a||!s||s.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(t.id).first();if(!n)return e.json({error:"user_not_found"},404);if(!await Pt(a,n.password_hash))return e.json({error:"invalid_credentials"},401);const r=await wt(s);return await e.env.DB.prepare("UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(r,t.id).run(),await ie(e,"password_change",{userId:t.id,email:t.email}),e.json({ok:!0})});Z.get("/license-request",async e=>{const t=e.req.query("msg")||"",a=e.req.query("ok")||"";return e.html(`<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ライセンス申請 — ${H.name}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
*{box-sizing:border-box}body{margin:0;background:#F7F8FB;font-family:'Noto Sans JP',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
.card{background:#fff;border-radius:1rem;padding:2rem;max-width:28rem;width:100%;box-shadow:0 20px 40px rgba(0,0,0,.1);border:1px solid #E5E7EB}
h1{font-size:1.25rem;font-weight:700;color:#1F2937;margin:0 0 .375rem}
p{font-size:.85rem;color:#6B7280;margin:0 0 1.5rem}
label{display:block;font-size:.78rem;font-weight:600;color:#374151;margin-bottom:.375rem}
input{display:block;width:100%;padding:.5rem .75rem;border:1px solid #E5E7EB;border-radius:.5rem;font-size:.875rem;font-family:inherit;outline:none;transition:border .15s}
input:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.btn{display:block;width:100%;padding:.65rem;background:#2563EB;color:#fff;border:none;border-radius:.5rem;font-size:.9rem;font-weight:600;cursor:pointer;font-family:inherit;margin-top:1.25rem;transition:background .15s}
.btn:hover{background:#1D4ED8}
.msg{padding:.625rem 1rem;border-radius:.375rem;font-size:.82rem;margin-bottom:1rem}
.msg-ok{background:#ECFDF5;color:#065F46;border:1px solid #A7F3D0}
.msg-err{background:#FEF2F2;color:#991B1B;border:1px solid #FECACA}
.mb-4{margin-bottom:1rem}
a{color:#2563EB;font-size:.82rem}
</style></head>
<body>
<div class="card">
  <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem">
    <div style="width:2.5rem;height:2.5rem;background:#2563EB;border-radius:.5rem;display:flex;align-items:center;justify-content:center">
      <i class="fas fa-bolt" style="color:#fff;font-size:1.1rem"></i>
    </div>
    <div>
      <h1>${H.name}</h1>
      <p style="margin:0;font-size:.75rem;color:#6B7280">ライセンス申請フォーム</p>
    </div>
  </div>
  ${a?'<div class="msg msg-ok"><i class="fas fa-check-circle"></i> '+a+"</div>":""}
  ${t?'<div class="msg msg-err"><i class="fas fa-exclamation-circle"></i> '+t+"</div>":""}
  <form method="POST" action="/api/auth/license/request">
    <div class="mb-4">
      <label>お名前</label>
      <input type="text" name="name" placeholder="例: 山田 太郎" required>
    </div>
    <div class="mb-4">
      <label>メールアドレス</label>
      <input type="email" name="email" placeholder="example@email.com" required>
    </div>

    <button type="submit" class="btn"><i class="fas fa-paper-plane"></i> 申請する</button>
  </form>
  <div style="text-align:center;margin-top:1rem">
    <a href="/login">← ログイン画面へ戻る</a>
  </div>
</div>
</body></html>`)});Z.post("/api/auth/license/request",async e=>{const t=await e.req.parseBody(),a=String(t.name||"").trim(),s=String(t.email||"").trim(),n="";if(!a||!s)return e.redirect("/license-request?msg=名前とメールアドレスは必須です");if(!/^[^@]+@[^@]+\.[^@]+$/.test(s))return e.redirect("/license-request?msg=有効なメールアドレスを入力してください");const i=e.env.DB,r=await i.prepare("SELECT id, is_approved FROM users WHERE email = ?").bind(s).first();if(r&&r.is_approved)return e.redirect("/license-request?msg=このメールアドレスは既に登録・承認済みです。ログインしてください。");let l=r==null?void 0:r.id;if(!l){const c=Math.random().toString(36).slice(2,10)+"Aa1!",{hashPassword:p}=await Promise.resolve().then(()=>lt),m=await p(c);l=(await i.prepare("INSERT INTO users (email, password_hash, is_approved, is_admin) VALUES (?, ?, 0, 0)").bind(s,m).run()).meta.last_row_id,await i.prepare("INSERT OR REPLACE INTO system_settings (key, value, description) VALUES (?,?,?)").bind("license_request_"+s,JSON.stringify({name:a,email:s,tmpPass:c,requested_at:new Date().toISOString(),license_key:n}),"ライセンス申請").run()}const o=await i.prepare("SELECT value FROM system_settings WHERE key='telegram_bot_token'").first(),d=await i.prepare("SELECT value FROM system_settings WHERE key='telegram_chat_id'").first();return o!=null&&o.value&&(d!=null&&d.value)&&fetch("https://api.telegram.org/bot"+o.value+"/sendMessage",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:d.value,text:`📋 新規ライセンス申請
名前: `+a+`
メール: `+s+`
キー: なし`})}).catch(()=>{}),e.redirect("/license-request?ok=申請を受け付けました。管理者が確認後、ログイン情報をお送りします。")});Z.get("/setup",async e=>{const t=e.req.query("token")||"",a=e.env.ADMIN_PASSWORD||"";if(!a||t!==a)return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f7f8fb}
.card{background:#fff;border-radius:12px;padding:2rem;max-width:420px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,.08);text-align:center}
h2{color:#dc2626;margin:0 0 .5rem}p{color:#6b7280;font-size:.9rem}</style></head>
<body><div class="card"><h2>❌ 認証失敗</h2>
<p>URLに正しい token を付けてください。<br>例: /setup?token=（ADMIN_PASSWORDの値）</p></div></body></html>`,403);const s="admin@ge365x.local",i=await wt("Ge365x@Admin!"),r=await e.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(s).first();if(r)await e.env.DB.prepare("UPDATE users SET password_hash=?, is_admin=1, is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(i,r.id).run(),await e.env.DB.prepare("UPDATE user_subscriptions SET plan_code='ge365x_pro', status='active', current_period_end='2099-12-31 23:59:59' WHERE user_id=?").bind(r.id).run();else{const o=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
       VALUES (?, ?, 1, 1, datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(s,i).run()).meta.last_row_id;await e.env.DB.prepare(`INSERT OR REPLACE INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
       VALUES (?, 'ge365x_pro', 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(o).run()}return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup 完了</title><style>
body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f0fdf4}
.card{background:#fff;border-radius:16px;padding:2.5rem;max-width:480px;width:100%;box-shadow:0 4px 20px rgba(0,0,0,.1);text-align:center}
h2{color:#16a34a;margin:0 0 1rem;font-size:1.5rem}.icon{font-size:3rem;margin-bottom:.5rem}
table{width:100%;border-collapse:collapse;margin:1.2rem 0;text-align:left}
td{padding:8px 12px;font-size:.9rem;border-bottom:1px solid #e5e7eb}
td:first-child{color:#6b7280;width:40%}
td:last-child{font-family:monospace;font-weight:600;color:#1f2937;background:#f8fafc;border-radius:4px}
.btn{display:block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;margin-top:1.5rem;font-weight:600;font-size:1rem}
.warn{background:#fef3c7;border-radius:8px;padding:10px 14px;font-size:.8rem;color:#92400e;margin-top:1rem}</style></head>
<body><div class="card">
<div class="icon">✅</div>
<h2>管理者アカウント設定完了</h2>
<p style="color:#6b7280;font-size:.9rem">以下の情報でログインしてください</p>
<table>
<tr><td>メールアドレス</td><td>${s}</td></tr>
<tr><td>パスワード</td><td>Ge365x@Admin!</td></tr>
<tr><td>権限</td><td>Admin / Pro</td></tr>
</table>
<a class="btn" href="/login">→ ログイン画面へ</a>
<div class="warn">⚠️ ログイン後すぐにパスワードを変更してください<br>このURLは設定後も有効なため、token を知らない人には教えないでください</div>
</div></body></html>`)});const fe=new D;fe.get("/api/subscription/plans",async e=>{const{results:t}=await e.env.DB.prepare(`SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`).all(),a=(t||[]).map(s=>({...s,features:s.features?JSON.parse(s.features):[]}));return e.json({plans:a})});fe.get("/api/subscription/me",f,async e=>{const t=e.get("user"),a=await e.env.DB.prepare(`SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`).bind(t.id).first();return a?e.json({subscription:{...a,features:a.features?JSON.parse(a.features):[]}}):e.json({subscription:null})});fe.post("/api/subscription/cancel",f,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});fe.post("/api/subscription/reactivate",f,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});fe.get("/api/subscription/payments",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`).bind(t.id).all();return e.json({payments:a||[]})});fe.post("/api/subscription/stripe/checkout",f,async e=>e.env.STRIPE_SECRET_KEY?e.json({error:"not_implemented_yet"},501):e.json({error:"stripe_not_configured"},501));fe.post("/api/subscription/webhook/stripe",async e=>e.json({received:!0}));const sa=new TextEncoder,Ya="https://api.x.com/2",Ka="https://upload.x.com/1.1";class B extends Error{constructor(a,s=0,n="api_error"){super(a);_(this,"statusCode");_(this,"errorType");this.name="XApiError",this.statusCode=s,this.errorType=n}}class kt extends B{constructor(a){super("Rate limited by X API (429)",429,"rate_limit");_(this,"resetAtEpoch");this.name="XApiRateLimitError",this.resetAtEpoch=a}}function ee(e){return encodeURIComponent(e).replace(/[!'()*]/g,t=>"%"+t.charCodeAt(0).toString(16).toUpperCase())}function In(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),[...t].map(a=>a.toString(16).padStart(2,"0")).join("")}function Dn(){return In(16)}async function jn(e,t){const a=await crypto.subtle.importKey("raw",sa.encode(e),{name:"HMAC",hash:"SHA-1"},!1,["sign"]),s=await crypto.subtle.sign("HMAC",a,sa.encode(t)),n=new Uint8Array(s);let i="";for(let r=0;r<n.length;r++)i+=String.fromCharCode(n[r]);return btoa(i)}async function Ut(e,t,a,s){const n={oauth_consumer_key:a.consumerKey,oauth_nonce:Dn(),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.floor(Date.now()/1e3).toString(),oauth_token:a.accessToken,oauth_version:"1.0"},i=new URL(t),r={...n};if(i.searchParams.forEach((m,h)=>{r[h]=m}),s)for(const[m,h]of Object.entries(s))h!=null&&(r[m]=String(h));const l=Object.keys(r).sort().map(m=>`${ee(m)}=${ee(r[m])}`).join("&"),o=[e.toUpperCase(),ee(`${i.origin}${i.pathname}`),ee(l)].join("&"),d=`${ee(a.consumerSecret)}&${ee(a.accessTokenSecret)}`,c=await jn(d,o);return n.oauth_signature=c,`OAuth ${Object.keys(n).sort().map(m=>`${ee(m)}="${ee(n[m])}"`).join(", ")}`}async function dt(e,t,a,s){const n=`${Ya}${t}`,i=await Ut(e,n,s),r={method:e,headers:{authorization:i,"content-type":"application/json"},signal:AbortSignal.timeout(3e4)};a!==void 0&&(r.body=JSON.stringify(a));const l=await fetch(n,r);if(l.status===429){const o=l.headers.get("x-rate-limit-reset");throw new kt(o?Number(o):void 0)}if(!l.ok){const o=await l.text();throw new B(`X API ${e} ${t} failed: ${l.status} ${o.slice(0,500)}`,l.status,"api_error")}return l.status===204?{}:l.json()}async function Wt(e,t){var s,n;const a=await dt("POST","/tweets",{text:t},e);return{id:((s=a==null?void 0:a.data)==null?void 0:s.id)||"",text:((n=a==null?void 0:a.data)==null?void 0:n.text)||t}}async function zt(e,t,a,s){var r,l;const n={text:t};a&&a.length&&(n.media={media_ids:a.slice(0,4)}),s&&(n.reply={in_reply_to_tweet_id:s});const i=await dt("POST","/tweets",n,e);return{id:((r=i==null?void 0:i.data)==null?void 0:r.id)||"",text:((l=i==null?void 0:i.data)==null?void 0:l.text)||t}}async function On(e,t){await dt("DELETE",`/tweets/${t}`,void 0,e)}async function Ja(e){var a,s,n,i;if(!e)throw new B("credentials未設定",0,"missing_credentials");if(!((a=e.consumerKey)!=null&&a.trim()))throw new B("API Key未設定",0,"missing_credentials");if(!((s=e.consumerSecret)!=null&&s.trim()))throw new B("API Secret未設定",0,"missing_credentials");if(!((n=e.accessToken)!=null&&n.trim()))throw new B("Access Token未設定",0,"missing_token");if(!((i=e.accessTokenSecret)!=null&&i.trim()))throw new B("Access Token Secret未設定",0,"missing_token");const t=await dt("GET","/users/me?user.fields=profile_image_url,public_metrics",void 0,e);return t==null?void 0:t.data}async function Rn(e,t,a=20){const s=await dt("GET",`/users/${t}/tweets?max_results=${a}&tweet.fields=created_at,text,in_reply_to_user_id&exclude=replies,retweets`,void 0,e);return(s==null?void 0:s.data)||[]}async function Ve(e,t,a,s,n,i){const r=new URL(`${Ka}${t}`);s&&Object.entries(s).forEach(([m,h])=>r.searchParams.set(m,h));const l=r.toString(),o={};if(n&&!i)for(const[m,h]of Object.entries(n))o[m]=String(h);const d=await Ut(e,l,a,o),c={method:e.toUpperCase(),headers:{authorization:d}};i?c.body=i:n&&(c.body=Object.entries(n).map(([m,h])=>`${encodeURIComponent(m)}=${encodeURIComponent(String(h))}`).join("&"),c.headers["content-type"]="application/x-www-form-urlencoded");const p=await fetch(l,c);if(!p.ok){const m=await p.text();throw new B(`X Upload ${e} ${t} failed: ${p.status} ${m.slice(0,300)}`,p.status,"media_upload_failed")}return p.status===204?{}:p.json()}async function Bn(e,t,a){const s=t instanceof Uint8Array?t:new Uint8Array(t),n=new FormData;n.append("media",new Blob([s],{type:a}));const i=await Ve("POST","/media/upload.json",e,null,null,n);return{media_id:i.media_id_string||String(i.media_id),size:i.size}}async function Cn(e,t,a){var c;const s=t instanceof Uint8Array?t:new Uint8Array(t),n=s.length,i=await Ve("POST","/media/upload.json",e,null,{command:"INIT",total_bytes:n,media_type:a,media_category:"tweet_video"},null),r=i.media_id_string||String(i.media_id),l=4*1024*1024;let o=0;for(let p=0;p<n;p+=l){const m=s.slice(p,Math.min(p+l,n)),h=new FormData;h.append("command","APPEND"),h.append("media_id",r),h.append("segment_index",String(o)),h.append("media",new Blob([m],{type:a})),await Ve("POST","/media/upload.json",e,null,null,h),o++}const d=await Ve("POST","/media/upload.json",e,null,{command:"FINALIZE",media_id:r},null);if(d.processing_info){let p=0;for(;p<30;){await new Promise(g=>setTimeout(g,(d.processing_info.check_after_secs||5)*1e3));const h=(await Ve("GET","/media/upload.json",e,{command:"STATUS",media_id:r},null,null)).processing_info;if(!h||h.state==="succeeded")break;if(h.state==="failed")throw new B("動画処理失敗: "+(((c=h.error)==null?void 0:c.message)||""),0,"video_process_failed");p++}}return{media_id:r,size:n}}async function St(e,t,a){var l,o;const s=((a==null?void 0:a.apiKey)??e.X_API_KEY??"").trim(),n=((a==null?void 0:a.apiSecret)??e.X_API_SECRET??"").trim();if(!s||!n)throw new B("X API Key/Secret 未設定",0,"no_api_key");if(!((l=t==null?void 0:t.access_token)!=null&&l.trim()))throw new B("Access Token 未設定",0,"no_token");if(!((o=t==null?void 0:t.access_token_secret)!=null&&o.trim()))throw new B("Access Token Secret 未設定",0,"no_token_secret");let i,r;try{i=await et(t.access_token,e.ENCRYPTION_KEY)}catch{throw new B("Access Token の復号に失敗",0,"decrypt_failed")}try{r=await et(t.access_token_secret,e.ENCRYPTION_KEY)}catch{throw new B("Access Token Secret の復号に失敗",0,"decrypt_failed")}if(!i.trim())throw new B("Access Token が空",0,"decrypt_failed");if(!r.trim())throw new B("Access Token Secret が空",0,"decrypt_failed");return{consumerKey:s,consumerSecret:n,accessToken:i,accessTokenSecret:r}}const Va=Object.freeze(Object.defineProperty({__proto__:null,XApiError:B,XApiRateLimitError:kt,X_API_BASE:Ya,X_UPLOAD_BASE:Ka,buildCredentialsFromAccount:St,buildOAuth1Header:Ut,deleteTweet:On,getMe:Ja,getUserRecentTweets:Rn,percentEncode:ee,postToX:Wt,postToXWithMedia:zt,uploadImage:Bn,uploadVideo:Cn},Symbol.toStringTag,{value:"Module"}));async function na(e,t){if(!e)return"";try{return await et(e,t)}catch{return""}}const he=new D;he.get("/api/admin/accounts",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return e.json({accounts:a||[]})});he.post("/api/admin/accounts",f,async e=>{var o,d;const t=e.get("user"),a=await e.req.json();if(!a.account_name)return e.json({error:"account_name required"},400);if(!((o=a.access_token)!=null&&o.trim())||!((d=a.access_token_secret)!=null&&d.trim()))return e.json({error:"access_token and access_token_secret required"},400);const s=await X(a.access_token.trim(),e.env.ENCRYPTION_KEY),n=await X(a.access_token_secret.trim(),e.env.ENCRYPTION_KEY),i=await e.env.DB.prepare("SELECT COUNT(*) AS cnt FROM x_accounts WHERE user_id=? AND is_active=1").bind(t.id).first(),r=((i==null?void 0:i.cnt)??0)===0?1:0;r&&await e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id).run();const l=await e.env.DB.prepare(`INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active, is_current)
     VALUES (?, ?, ?, ?, ?, 1, ?)`).bind(t.id,a.account_name,s,n,a.daily_post_limit??5,r).run();return e.json({success:!0,id:l.meta.last_row_id})});he.post("/api/admin/accounts/:id/test",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(a,t.id).first();if(!s)return e.json({success:!1,error:"not_found"},404);try{const n=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id=? LIMIT 1").bind(t.id).first(),i=n!=null&&n.api_key?{apiKey:await na(n.api_key,e.env.ENCRYPTION_KEY),apiSecret:await na(n.api_secret||"",e.env.ENCRYPTION_KEY)}:void 0,r=await St(e.env,s,i),l=await Ja(r);return l!=null&&l.id&&await e.env.DB.prepare(`UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           updated_at=? WHERE id=?`).bind(l.id,l.username||null,y(),a).run(),e.json({success:!0,me:l})}catch(n){const i=n instanceof B?n.statusCode:0;return e.json({success:!1,error:n.message,status_code:i,error_type:n==null?void 0:n.errorType})}});he.post("/api/admin/accounts/:id/current",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10);return await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id),e.env.DB.prepare("UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?").bind(y(),a,t.id)]),e.json({success:!0})});he.post("/api/admin/accounts/:id/toggle",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?").bind(y(),a,t.id).run(),e.json({success:!0})});he.put("/api/admin/accounts/:id",f,async e=>{var r,l;const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.req.json(),n=[],i=[];if(s.account_name&&(n.push("account_name=?"),i.push(s.account_name)),s.daily_post_limit!==void 0&&(n.push("daily_post_limit=?"),i.push(s.daily_post_limit)),(r=s.access_token)!=null&&r.trim()){const o=await X(s.access_token.trim(),e.env.ENCRYPTION_KEY);n.push("access_token=?"),i.push(o)}if((l=s.access_token_secret)!=null&&l.trim()){const o=await X(s.access_token_secret.trim(),e.env.ENCRYPTION_KEY);n.push("access_token_secret=?"),i.push(o)}return n.length===0?e.json({success:!1,error:"no_fields"}):(n.push("updated_at=?"),i.push(y(),a,t.id),await e.env.DB.prepare(`UPDATE x_accounts SET ${n.join(", ")} WHERE id=? AND user_id=?`).bind(...i).run(),e.json({success:!0}))});he.delete("/api/admin/accounts/:id",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM x_accounts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const Nn=["20代","30代","40代","50代"],Ln=["男性","女性"],Mn=["美容","健康","副業","投資","AI活用","ダイエット","お金"],Fn={美容:"老化・肌荒れ・見た目の変化",健康:"疲れやすい・体力低下・不調",副業:"時間がない・何から始めるか不明",投資:"勝てない・資産が増えない",AI活用:"手作業が多い・効率が悪い",ダイエット:"リバウンド・続かない",お金:"貯まらない・将来不安"},$n={美容:"若々しくなりたい",健康:"元気に過ごしたい",副業:"収益化したい",投資:"安定して利益を出したい",AI活用:"業務を自動化したい",ダイエット:"理想の体型になりたい",お金:"経済的自由を得たい"},Ga=[];for(const e of Nn)for(const t of Ln)for(const a of Mn)Ga.push({key:`${e}_${t}_${a}`,label:`${e}${t}/${a}`,gender:t,age_range:e,genre:a,problem:Fn[a]||`${a}に悩んでいる`,goal:$n[a]||`${a}で成果を出したい`,knowledge:"一般"});const Pn=[{key:"authority",label:"権威型",instruction:"専門家として断定的に、簡潔に、根拠を示して書く。"},{key:"empathy",label:"共感型",instruction:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{key:"provocative",label:"煽り型",instruction:"問題を鋭く突き、危機感を持たせる書き方にする。"},{key:"story",label:"ストーリー型",instruction:"体験談や変化の流れを感じさせる構成で書く。"},{key:"problem_raise",label:"問題提起型",instruction:"最初に課題を提示し、その原因と解決策を示す。"}],Lt={problem:{name:"問題提起型",instruction:`【問題提起型】
1.冒頭で読者の痛みを突く質問
2.具体的な3つの「あるある」
3.「実はそれ○○が原因」と核心
4.解決の方向性
5.CTAで次のステップへ
※最後まで書き切ること`},before_after:{name:"ビフォーアフター型",instruction:`【変化が伝わる構成】
冒頭で過去の悩みや状態を自然に描写し、きっかけや行動を示し、現在の変化や成果を伝え、最後に学びや提案を入れてください。
「Before:」「After:」のラベルを使わず、自然な語り口で変化のストーリーを伝えること。
毎回異なる言い回し・展開にし、同じテンプレート構文を繰り返さないこと。`},contrarian:{name:"逆張り型",instruction:`【逆張り型】
1.「○○すべき」の常識提示
2.「実は逆」とひっくり返す
3.根拠
4.代替案
5.CTA`},howto:{name:"HowTo実演型",instruction:`【HowTo実演型】
1.「○○する方法」宣言
2.Step1→2→3
3.各ステップ具体例
4.ワンポイント
5.CTA`},numbers:{name:"数字インパクト型",instruction:`【数字インパクト型】
1.冒頭にインパクト数字
2.背景
3.なぜその数字か
4.読者が同じ結果を得る条件
5.CTA`}};async function Xa(e,t){var r,l,o;const a=t.model||"gpt-4o-mini",s=t.maxTokens||4e3,n=t.temperature??.7,i=t.baseUrl||"https://api.openai.com/v1";for(let d=1;d<=3;d++)try{const c=await fetch(`${i}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${t.apiKey}`,"content-type":"application/json"},body:JSON.stringify({model:a,messages:e,max_tokens:s,temperature:n}),signal:AbortSignal.timeout(12e4)});if(!c.ok){const m=await c.text();if(c.status>=500&&d<3){await new Promise(h=>setTimeout(h,2e3*d));continue}throw new Error(`OpenAI API error: ${c.status} ${m.slice(0,500)}`)}const p=await c.json();return((o=(l=(r=p==null?void 0:p.choices)==null?void 0:r[0])==null?void 0:l.message)==null?void 0:o.content)||""}catch(c){if(((c==null?void 0:c.name)==="TimeoutError"||(c==null?void 0:c.name)==="AbortError")&&d<3){await new Promise(m=>setTimeout(m,2e3*d));continue}throw c}return""}function Za(e){let t=`以下のルールを厳守してX(Twitter)投稿文を生成してください。
`;if(t+=`【改行ルール】スマートフォンでの読みやすさを最優先にしてください。
`,t+=`・1つの文が終わったら必ず改行を入れること
`,t+=`・20〜25文字を目安に改行すること（句読点の位置を優先）
`,t+=`・箇条書きは各項目を必ず改行で区切ること
`,t+=`・1行が長くなりすぎないよう注意すること
`,e.brandVoice&&typeof e.brandVoice=="object"?(t+=`
【ブランドボイス】
`,e.brandVoice.tone&&(t+=`口調: ${e.brandVoice.tone}
`),e.brandVoice.worldview&&(t+=`世界観: ${e.brandVoice.worldview}
`),e.brandVoice.personal_story&&(t+=`個人ストーリー: ${e.brandVoice.personal_story}
`),e.brandVoice.prohibited_words&&(t+=`禁止ワード: ${e.brandVoice.prohibited_words.replace(/\n/g,", ")}
`),t+=`上記の口調・世界観を必ず守ること。
`):t+=`口調: 丁寧・簡潔・実用重視
`,e.targetDna&&typeof e.targetDna=="object"){const r=e.targetDna;t+=`
【ターゲット読者】
`,r.age_range&&(t+=`年齢層: ${r.age_range}
`),r.gender&&(t+=`性別: ${r.gender}
`),r.occupation&&(t+=`職業: ${r.occupation}
`),r.pains&&(t+=`悩み: ${r.pains.replace(/\n/g," / ")}
`),r.desires&&(t+=`欲求: ${r.desires.replace(/\n/g," / ")}
`),r.purchase_triggers&&(t+=`行動トリガー: ${r.purchase_triggers.replace(/\n/g," / ")}
`),t+=`この読者が自然に反応する語彙・例えを使うこと。
`}const a=`
Markdown記号(#,##)禁止。見出しは「■」。番号リスト禁止。自然な文章で。箇条書きは「・」のみ。`;let s="";e.patternType&&Lt[e.patternType]&&(s=`
【投稿パターン（構造のみ）】
${Lt[e.patternType].instruction}`);let n=`テーマ: ${e.theme||""}${e.keywords?`
キーワード: ${e.keywords}`:""}`;e.postMode==="140"?n+=`
140文字以内のX投稿を作成。簡潔かつインパクト重視。ハッシュタグは含めない。`:n+=`
X投稿用のフル文章を作成。読みやすく改行を入れる。ハッシュタグは含めない。`,e.cta&&(n+=`
CTA: ${e.cta}`),e.userInput&&(n+=`
追加指示: ${e.userInput}`);const i=t+s+a;return{messages:[{role:"system",content:i},{role:"user",content:n}],systemPrompt:i,userPrompt:n}}function qn(e){if(!e)return e;let t=e;return t=t.replace(/([\u3002\uff01\uff1f!?])/g,`$1
`),t=t.replace(/\n{3,}/g,`

`),t.trim()}async function Qa(e,t,a,s,n,i="body"){const{messages:r}=Za({theme:t,keywords:a,brandVoice:n,targetDna:s,postMode:i||"body"}),l=await Xa(r,{apiKey:e,temperature:.8});return Tt(l,i)}async function es(e,t,a,s,n,i,r="body"){if(!Lt[t])throw new Error(`未対応のパターン: ${t}`);const{messages:l}=Za({theme:a,keywords:s,brandVoice:i,targetDna:n,patternType:t,postMode:r||"body"}),o=await Xa(l,{apiKey:e,temperature:.8});return Tt(o,r)}function Tt(e,t){if(!e)return"";let a=e.replace(/^#{1,4}\s*/gm,"").replace(/^[▪️■●•\-\*]+\s*/gm,"").replace(/^\d+\.\s/gm,"").replace(/^(Step\d+)[:\s]/gim,"").replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm,"・").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\n{3,}/g,`

`).trim();return a=Hn(a),t==="140"&&a.length>140&&(a=a.slice(0,137)+"..."),a}function Hn(e){if(!e)return"";const t=e.split(`
`).length,a=e.replace(/\n/g,"").length;if(t>3||a<40)return e;const s=e.split(new RegExp("(?<=[。！？!?\\n])","g")).filter(r=>r.trim());if(s.length<=1)return e;let n="",i=0;for(let r=0;r<s.length;r++){const l=s[r].trim();if(l){if(/^https?:\/\//.test(l)||/^#/.test(l)||/^@/.test(l)){n&&!n.endsWith(`
`)&&(n+=`
`),n+=l,i=0;continue}n+=l,i++,i>=2&&r<s.length-1?(n+=`

`,i=0):r<s.length-1&&!l.endsWith(`
`)&&(n+=`
`)}}return n.replace(/\n{3,}/g,`

`).trim()}const Un=new TextEncoder;async function Se(e){const t=await crypto.subtle.digest("SHA-256",Un.encode(e||""));return[...new Uint8Array(t)].slice(0,8).map(s=>s.toString(16).padStart(2,"0")).join("")}function Mt(e){const t=(e||"").replace(/\s+/g,"").slice(0,2e3),a=new Set;for(let s=0;s<t.length-1;s++)a.add(t.slice(s,s+2));return a}function ts(e,t){const a=Mt(e),s=Mt(t);if(a.size===0&&s.size===0)return 0;let n=0;for(const r of a)s.has(r)&&n++;const i=a.size+s.size-n;return i===0?0:n/i}const Wn=120*1e3;async function as(e,t){const a=new Date().toISOString(),s=new Date(Date.now()-Wn).toISOString(),n=await e.DB.prepare("SELECT account_id, locked_at FROM post_locks WHERE account_id = ?").bind(t).first();return n&&n.locked_at>s?!1:(await e.DB.prepare(`INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`).bind(t,a).run(),!0)}async function ss(e,t){await e.DB.prepare("DELETE FROM post_locks WHERE account_id = ?").bind(t).run()}async function ns(e,t,a,s,n){const i={ok:!0,errors:[],warnings:[]},r=await e.DB.prepare("SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?").bind(t).first();if(!r)return i.ok=!1,i.errors.push({code:"account_not_found",message:"アカウントが存在しません"}),i;const l=new Date(Date.now()+9*3600*1e3).toISOString().slice(0,10);let o=r.daily_post_count||0;if(r.last_daily_reset_date!==l&&(o=0),o>=(r.daily_post_limit||5)&&i.errors.push({code:"daily_limit_reached",message:`日次投稿上限 (${r.daily_post_limit}) に達しています`}),r.last_posted_at){const c=Date.parse(r.last_posted_at.replace(" ","T")+"+09:00");if(!Number.isNaN(c)){const p=(Date.now()-c)/6e4;p<15&&i.errors.push({code:"too_frequent",message:`前回投稿から ${Math.floor(p)} 分しか経過していません（最低 15 分）`,overridable:!0})}}const{results:d}=await e.DB.prepare(`SELECT id, body FROM post_queue
       WHERE account_id = ? AND status IN ('posted','approved','publishing')
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`).bind(t).all();for(const c of d||[]){const p=ts(a,c.body||"");if(p>=.7){i.errors.push({code:"too_similar",message:`過去投稿 (ID: ${c.id}) と類似度 ${p.toFixed(2)} で重複`});break}}if(s){const c=await e.DB.prepare(`SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`).bind(t,s).first();((c==null?void 0:c.n)??0)>=3&&i.errors.push({code:"link_spam",message:`同一リンクを過去7日で${c==null?void 0:c.n}回使用しています`})}if(n){const c=ia(n);if(c.size>0){const{results:p}=await e.DB.prepare(`SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`).bind(t).all();(p||[]).length>=3&&(p||[]).every(h=>{const v=[...ia(h.hashtags||"")].filter(T=>c.has(T)).length;return(c.size===0?0:v/c.size)>=.8})&&i.errors.push({code:"hashtag_spam",message:"同一ハッシュタグセットが 3 回連続で 80%以上一致しています"})}}return r.health_status==="risk"&&i.errors.push({code:"health_risk",message:"アカウント健全性スコアが危険域です。投稿を控えてください。"}),i.ok=i.errors.length===0,i}function ia(e){return new Set((e||"").split(/[\s,]+/).map(t=>t.trim().replace(/^#/,"").toLowerCase()).filter(Boolean))}async function yt(e,t,a,s,n){const i=await e.DB.prepare("SELECT account_health_score FROM x_accounts WHERE id = ?").bind(t).first();if(!i)return{score_after:100,status_after:"healthy"};let r=Math.max(0,Math.min(100,(i.account_health_score??100)+s));const l=r>=80?"healthy":r>=60?"caution":"risk";return await e.DB.prepare("UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?").bind(r,l,t).run(),await e.DB.prepare(`INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(t,a,s,r,l,n?JSON.stringify(n):null).run(),{score_after:r,status_after:l}}function ra(e){if(!e)return Date.now();const t=e.replace(" ","T")+"+09:00",a=Date.parse(t);return Number.isNaN(a)?Date.now():a}function oa(e){return new Date(e+324e5).toISOString().replace("T"," ").slice(0,19)}async function zn(e,t,a){const s=a.jitter_enabled!==!1,n=a.jitter_minutes??5,i=a.collision_avoidance_enabled!==!1,r=a.min_spacing_seconds??90;let l=ra(t),o=0,d=0;if(s&&n>0){const m=Math.floor((Math.random()*2-1)*n*60);o=m,l+=m*1e3}if(i&&a.account_id){const m=oa(l),h=[a.account_id,m,m];let g=`
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`;a.exclude_id&&(g+=" AND id != ?",h.push(a.exclude_id)),g+=" ORDER BY sat ASC";const{results:v}=await e.DB.prepare(g).bind(...h).all();let x=!0,T=0;for(;x&&T<30;){x=!1;for(const w of v||[]){const I=ra(w.sat),j=Math.abs(l-I)/1e3;if(j<r){const C=(r-j+1)*1e3*(l>=I?1:-1);l+=C,d+=Math.floor(C/1e3),x=!0}}T++}}const c=oa(l);return{effective_at:c,audit:{base_at:t,effective_at:c,jitter_applied_seconds:o,collision_adjusted_seconds:d,ruleset:{jitter_enabled:s,jitter_minutes:n,collision_avoidance_enabled:i,min_spacing_seconds:r}}}}async function Yn(e,t,a,s){await e.DB.prepare("INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)").bind(t,a??null,JSON.stringify(s)).run()}const Kn=.7;async function Jn(e){const t=[...Mt(e)].slice(0,200),a=await Se(e);return JSON.stringify({bigrams:t,content_hash:a})}async function Vn(e,t,a,s){await e.DB.prepare("INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)").bind(t,a??null,s).run()}async function Gn(e,t,a,s={}){const n={pass:!0,blocked_reason:null,scores:[]};if(!t||!a)return n;const i=[a];let r=`SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`;s.post_id&&(r+=" AND id != ?",i.push(s.post_id)),r+=" ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5";const{results:l}=await e.DB.prepare(r).bind(...i).all();for(const o of l||[]){const d=ts(t,o.body||"");if(n.scores.push({post_id:o.id,similarity:d}),d>=Kn){n.pass=!1,n.blocked_reason=`過去投稿(ID:${o.id})と類似度 ${d.toFixed(2)} で重複`;break}}return n}const $=new D;async function Xn(e,t,a){const s=String(a??"default");let n=await e.DB.prepare("SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(s,t).first();n||(n=await e.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first());let i=await e.DB.prepare("SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(s,t).first();return i||(i=await e.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first()),{target:n,voice:i}}async function Zn(e,t){if(!(!e.TELEGRAM_BOT_TOKEN||!e.TELEGRAM_CHAT_ID))try{await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:e.TELEGRAM_CHAT_ID,text:t,parse_mode:"HTML"})})}catch{}}async function la(e,t){try{await e.DB.prepare(`INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.record_id??null,t.account_id??null,t.user_id??null,t.account_name??"",t.source_type??"",t.generation_type??null,t.post_mode??"body",t.content??"",t.content_hash??"",t.link_url??"",t.media_type??null,t.media_upload_status??null,t.media_id??null,t.thread_parent_id??null,t.thread_order??null,t.thread_total_count??null,t.recycle_source_post_id??null,t.recycle_rule??null,t.scheduled_at??null,t.executed_at??y(),t.posted_at??null,t.status??"posted",t.error_message??null,t.api_response_summary??null).run()}catch(a){console.error("[PostLog]",a.message)}}$.get("/api/admin/posts",f,async e=>{const t=e.get("user"),a=e.req.query("status"),s=e.req.query("account_id"),n=e.req.query("post_mode"),i=parseInt(e.req.query("page")||"1",10),r=50,l=(i-1)*r;let o="WHERE pq.platform='x' AND pq.user_id = ?";const d=[t.id];a&&a!=="all"&&(o+=" AND pq.status = ?",d.push(a)),s&&(o+=" AND pq.account_id = ?",d.push(Number(s))),n&&n!=="all"&&(o+=" AND pq.post_mode = ?",d.push(n));const{results:c}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${o} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`).bind(...d,r,l).all(),p=await e.env.DB.prepare(`SELECT COUNT(*) AS total FROM post_queue pq ${o}`).bind(...d).first();return e.json({posts:c||[],total:(p==null?void 0:p.total)??0,page:i})});$.get("/api/admin/posts/:id",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`).bind(a,t.id).first();return s?e.json({post:s}):e.json({error:"Not found"},404)});$.post("/api/admin/posts",f,async e=>{const t=e.get("user"),a=await e.req.json();if(!a.body)return e.json({error:"body is required"},400);const s=y(),n=await Se(a.body);if(a.scheduled_at&&a.post_mode==="scheduled_once"){const r=await e.env.DB.prepare(`SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
         AND body=? AND COALESCE(link_url,'')=COALESCE(?,'') AND scheduled_at=? AND post_mode='scheduled_once'
         AND status NOT IN ('cancelled','failed')`).bind(t.id,a.account_id||null,a.body,a.link_url||"",a.scheduled_at).first();if(r)return e.json({success:!1,error:`Same content/time already exists (ID:${r.id})`})}const i=await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, hashtags,
        post_mode, status, scheduled_at, content_hash, generation_type, source_type,
        recurrence_type, recurrence_rule, recurrence_end_at, next_run_at,
        recycle_rule, source_post_id, min_engagement_score, rewrite_mode,
        thread_parent_id, thread_order, thread_count, media_type, media_file_path,
        created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?, ?,
             ?, ?)`).bind(t.id,a.account_id??null,a.body,a.link_url??null,a.hashtags??null,a.post_mode??"body",a.status??"pending",a.scheduled_at??null,n,a.generation_type??null,a.source_type??"manual_post",a.recurrence_type??null,a.recurrence_rule??null,a.recurrence_end_at??null,a.next_run_at??null,a.recycle_rule??null,a.source_post_id??null,a.min_engagement_score??0,a.rewrite_mode??null,a.thread_parent_id??null,a.thread_order??0,a.thread_count??0,a.media_type??null,a.media_file_path??null,s,s).run();return e.json({success:!0,id:i.meta.last_row_id})});$.post("/api/admin/posts/generate",f,async e=>{const t=e.get("user"),{theme:a,keywords:s,count:n,pattern_type:i,post_mode:r,link_url:l,hashtags:o,footer_text:d,account_id:c,generation_type:p}=await e.req.json();if(!a)return e.json({error:"theme required"},400);let m=e.env.OPENAI_API_KEY||"";try{const w=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='openai_api_key' LIMIT 1").first();if(w!=null&&w.value){const{aesDecrypt:I}=await Promise.resolve().then(()=>lt),j=await I(w.value,e.env.ENCRYPTION_KEY);j&&(m=j)}}catch{}if(!m)return e.json({error:"OpenAI APIキーが設定されていません。API設定画面から設定してください。"},400);let h=c??null;if(!h){const w=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();h=(w==null?void 0:w.id)??null}const{target:g,voice:v}=await Xn(e.env,t.id,h),x=y(),T=[];try{const w=Math.min(n||1,10);for(let I=0;I<w;I++){const j=r||"body";let C;i?C=await es(m,i,a,s||"",g,v,j):C=await Qa(m,a,s||"",g,v,j),C=qn(C),d&&(C=C.trimEnd()+`

`+d.trim());const ut=await Se(C),G=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`).bind(t.id,h,a,s||"",C,l||null,o||null,j,i||null,ut,p||i||"general",i?"pattern_generated_post":"ai_generated_post",x,x).run();T.push({id:G.meta.last_row_id,body:C,link_url:l||"",post_mode:j});try{await e.env.DB.prepare(`INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,h,(v==null?void 0:v.id)??null,(g==null?void 0:g.id)??null,j,i||"general",C.slice(0,500)).run()}catch{}}return e.json({success:!0,generated:T,count:T.length})}catch(w){return e.json({error:"AI error: "+w.message},500)}});$.post("/api/admin/posts/:id/approve",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?").bind(y(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});$.post("/api/admin/posts/:id/reject",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?").bind(y(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});$.post("/api/admin/posts/:id/schedule",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),{scheduled_at:s,jitter_enabled:n=!0,jitter_minutes:i=5,collision_avoidance_enabled:r=!0,min_spacing_seconds:l=90}=await e.req.json();if(!s)return e.json({error:"scheduled_at required"},400);const o=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(a,t.id).first();if(!o)return e.json({success:!1,error:"Not found"},404);const d=await Gn(e.env,o.body||"",o.account_id??null,{post_id:o.id});if(!d.pass)return e.json({success:!1,error:"類似: "+d.blocked_reason,similarity_blocked:!0,scores:d.scores});const{effective_at:c,audit:p}=await zn(e.env,s,{jitter_enabled:n,jitter_minutes:i,collision_avoidance_enabled:r,min_spacing_seconds:l,account_id:o.account_id,exclude_id:o.id}),m=await Jn(o.body||"");return await Vn(e.env,o.id,o.account_id,m),await e.env.DB.prepare(`UPDATE post_queue SET
       status='approved', base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=?`).bind(s,c,c,n?1:0,i,r?1:0,l,JSON.stringify(p),y(),a).run(),await Yn(e.env,o.id,o.account_id,p),e.json({success:!0,base_scheduled_at:s,effective_scheduled_at:c,scheduled_at:c,audit:p})});$.post("/api/admin/posts/:id/post-now",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=(await e.req.json().catch(()=>({}))).force_override===!0,n=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(a,t.id).first();if(!n)return e.json({success:!1,error:"Not found"},404);let i=null;if(n.account_id&&(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id,t.id).first()),i||(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first(),i&&await e.env.DB.prepare("UPDATE post_queue SET account_id=? WHERE id=?").bind(i.id,a).run()),!i)return e.json({success:!1,error:"No active X account"});const r=await ns(e.env,i.id,n.body||"",n.link_url,n.hashtags),l=r.errors.filter(o=>!(s&&o.overridable));if(l.length>0){const o=r.errors.find(d=>d.overridable);return o&&!s?e.json({success:!1,error:o.message,overridable:!0,cooldown_override:!0}):e.json({success:!1,error:"Safety: "+l.map(d=>d.message).join("; ")})}if(!await as(e.env,i.id))return e.json({success:!1,error:"Account busy"});try{await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=?").bind(y(),a).run();let o;try{const g=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id=? LIMIT 1").bind(t.id).first();if(g!=null&&g.api_key){const{aesDecrypt:v}=await Promise.resolve().then(()=>lt);o={apiKey:await v(g.api_key,e.env.ENCRYPTION_KEY),apiSecret:g.api_secret?await v(g.api_secret,e.env.ENCRYPTION_KEY):""}}}catch{}const d=await St(e.env,i,o);let c=Tt(n.body||"",n.post_mode);n.link_url&&(c+=`
`+n.link_url),n.hashtags&&(c+=`
`+n.hashtags);const p=[],m=n.options_json?(()=>{try{return JSON.parse(String(n.options_json))}catch{return{}}})():{};if(m.media_images&&Array.isArray(m.media_images)&&m.media_images.length>0){const{uploadImage:g}=await Promise.resolve().then(()=>Va);for(const v of m.media_images.slice(0,4))try{if(v.data&&typeof v.data=="string"){const x=v.data.includes(",")?v.data.split(",")[1]:v.data,T=v.type||"image/jpeg",w=Uint8Array.from(atob(x),j=>j.charCodeAt(0)),I=await g(d,w,T);I!=null&&I.media_id_string&&p.push(I.media_id_string)}}catch(x){console.error("Media upload failed:",x.message)}}if(m.media_json)try{const g=JSON.parse(m.media_json);for(const v of(g||[]).slice(0,4)){const x=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(v,t.id).first();x!=null&&x.x_media_id&&p.push(x.x_media_id)}}catch{}const h=p.length>0?await zt(d,c,p,null):await Wt(d,c);return await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(h.id||"",y(),y(),a).run(),await e.env.DB.prepare(`UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+1,
         last_daily_reset_date = DATE('now','+9 hours'), updated_at=? WHERE id=?`).bind(y(),y(),i.id).run(),await la(e.env,{record_id:a,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type||"manual_post",generation_type:n.generation_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",link_url:n.link_url,posted_at:y(),status:"posted",api_response_summary:JSON.stringify({tweet_id:h.id})}),e.json({success:!0,tweet_id:h.id})}catch(o){return await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(o.message,y(),a).run(),await la(e.env,{record_id:a,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",status:"failed",error_message:o.message}),o instanceof kt?await yt(e.env,i.id,"rate_limit",-15):await yt(e.env,i.id,"error",-5,{message:o.message}),await Zn(e.env,`X post FAILED #${a} ${o.message}`),e.json({success:!1,error:o.message})}finally{await ss(e.env,i.id)}});$.put("/api/admin/posts/:id",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.req.json(),n=y(),i=s.body?await Se(s.body):null;return s.media_json!==void 0&&s.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?").bind(s.media_json,n,a,t.id).run(),e.json({success:!0})):s.account_id!==void 0&&s.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(s.account_id,n,a,t.id).run(),e.json({success:!0})):(await e.env.DB.prepare(`UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`).bind(s.body,s.link_url??null,s.hashtags??null,s.scheduled_at??null,s.post_mode??"body",s.media_json??null,i,s.recurrence_type??null,s.recurrence_rule??null,s.next_run_at??null,s.recurrence_end_at??null,n,a,t.id).run(),e.json({success:!0}))});$.delete("/api/admin/posts/:id",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM post_queue WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});$.post("/api/admin/posts/:id/cancel",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(y(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});$.get("/api/admin/posts-scheduled",f,async e=>{const t=e.get("user"),a=e.req.query("account_id"),s=[t.id];let n="WHERE pq.platform='x' AND pq.user_id=? AND (pq.scheduled_at IS NOT NULL OR pq.status='pending') AND pq.status NOT IN ('cancelled','rejected','posted')";a&&(n+=" AND pq.account_id=?",s.push(Number(a)));const{results:i}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${n} ORDER BY pq.scheduled_at ASC`).bind(...s).all(),r=[t.id];let l="WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL";a&&(l+=" AND aj.account_id=?",r.push(Number(a)));const{results:o}=await e.env.DB.prepare(`SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${l} ORDER BY aj.publish_at ASC`).bind(...r).all(),d=(o||[]).map(p=>({...p,post_mode:"body",id:"ap-"+p.id})),c=[...i||[],...d].sort((p,m)=>(p.scheduled_at||"").localeCompare(m.scheduled_at||""));return e.json({posts:c})});$.post("/api/admin/posts/schedule",f,async e=>{var r;const t=e.get("user"),a=await e.req.json();if(!a.body&&!a.theme)return e.json({success:!1,error:"本文が必要です"},400);if(!a.scheduled_at)return e.json({success:!1,error:"予約日時が必要です"},400);const s=a.account_id||null,n=s?await e.env.DB.prepare("SELECT id FROM x_accounts WHERE id=? AND user_id=? AND is_active=1").bind(s,t.id).first():await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 LIMIT 1").bind(t.id).first(),{results:i}=await e.env.DB.prepare(`INSERT INTO post_queue (user_id, account_id, platform, body, link_url, hashtags, scheduled_at, status, post_mode, source_type, created_at, updated_at)
     VALUES (?, ?, 'x', ?, ?, ?, ?, 'pending', 'body', 'manual_schedule', datetime('now','+9 hours'), datetime('now','+9 hours'))
     RETURNING id`).bind(t.id,(n==null?void 0:n.id)||null,a.body||a.theme||"",a.link_url||null,a.hashtags||null,a.scheduled_at).all();return e.json({success:!0,post_id:(r=i==null?void 0:i[0])==null?void 0:r.id})});$.post("/api/admin/posts/thread",f,async e=>{const t=e.get("user"),{tweets:a,link_url:s,account_id:n}=await e.req.json();if(!a||!Array.isArray(a)||a.length<2)return e.json({error:"Thread requires 2+ tweets"},400);const i=y(),r=await Se(a[0].body),o=(await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,a[0].body,a[0].link_url??s??null,a.length,r,i,i).run()).meta.last_row_id,d=[o];for(let c=1;c<a.length;c++){const p=await Se(a[c].body),m=await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,a[c].body,a[c].link_url??null,o,c,p,i,i).run();d.push(m.meta.last_row_id)}return e.json({success:!0,parent_id:o,ids:d})});const is=new D,Qn=5;is.post("/cron/tick",async e=>{const t=y(),{results:a}=await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved')
        AND (
              COALESCE(effective_scheduled_at, scheduled_at) IS NULL
           OR COALESCE(effective_scheduled_at, scheduled_at) <= datetime('now','+9 hours')
        )
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT ?`).bind(Qn).all();let s=0,n=0,i=0;for(const r of a||[]){const l=await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved')").bind(t,r.id).run();if(!(!l.success||l.meta.changes===0)){s++;try{if(!r.account_id)throw new Error("account_id is null");const o=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=?").bind(r.account_id).first();if(!o)throw new Error("account_not_found");const d=await ns(e.env,o.id,r.body||"",r.link_url,r.hashtags);if(!d.ok)throw new Error("safety: "+d.errors.map(c=>c.message).join("; "));if(!await as(e.env,o.id))throw new Error("account_busy");try{const c=await St(e.env,o);let p=Tt(r.body||"",r.post_mode);r.link_url&&(p+=`
`+r.link_url),r.hashtags&&(p+=`
`+r.hashtags);const m=[];if(r.media_json)try{const g=JSON.parse(r.media_json);for(const v of(g||[]).slice(0,4)){const x=await e.env.DB.prepare("SELECT x_media_id FROM media_assets WHERE id=?").bind(v).first();x!=null&&x.x_media_id&&m.push(x.x_media_id)}}catch{}const h=m.length>0?await zt(c,p,m,null):await Wt(c,p);await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(h.id||"",y(),y(),r.id).run(),await e.env.DB.prepare(`UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`).bind(y(),y(),o.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`).bind(r.id,o.id,r.user_id,o.account_name,r.source_type,r.generation_type,r.post_mode,r.body||"",r.content_hash||"",r.link_url||"",y(),y(),JSON.stringify({tweet_id:h.id})).run(),await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`).bind(o.id,r.user_id).run(),n++}finally{await ss(e.env,o.id)}}catch(o){const d=(o==null?void 0:o.message)||"unknown_error";await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(d,y(),r.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 'failed', ?, ?)`).bind(r.id,r.account_id,r.user_id,r.source_type,r.post_mode,r.body||"",r.content_hash||"",d,y()).run(),r.account_id&&(o instanceof kt?await yt(e.env,r.account_id,"rate_limit",-15):await yt(e.env,r.account_id,"error",-5,{message:d})),r.account_id&&await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`).bind(r.account_id,r.user_id).run(),i++}}}return e.json({ok:!0,processed:s,success:n,failed:i,now:t})});const ge=new D;ge.get("/api/admin/autopilot/jobs",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`).bind(t.id).all(),{results:s}=await e.env.DB.prepare("SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1").bind(t.id).all();return e.json({jobs:a||[],accounts:s||[]})});ge.get("/api/admin/autopilot/jobs/:id",f,async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).first();return a?e.json(a):e.json({error:"not found"})});ge.post("/api/admin/autopilot/jobs",f,async e=>{var p;const t=e.get("user"),a=await e.req.json(),s=y(),n=(a.publish_at||a.generate_at||s).slice(0,10),i=await e.env.DB.prepare(`SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND account_id=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status NOT IN ('cancelled')`).bind(t.id,a.account_id||0,n).first();if(((i==null?void 0:i.cnt)??0)>=10)return e.json({success:!1,error:"この日は既に10件の予約があります"});const r=await e.env.DB.prepare("SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs").first(),l=String(((r==null?void 0:r.mx)??0)+1).padStart(4,"0");let o=a.generate_at??null;if(a.publish_at&&!a.generate_at)try{const m=new Date(a.publish_at.replace(" ","T"));m.setMinutes(m.getMinutes()-2),o=m.toISOString().replace("T"," ").slice(0,19)}catch{}const d=o||a.publish_at?"configured":"draft",c=await e.env.DB.prepare(`INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(l,t.id,a.account_id??null,a.content_mode||"problem",a.theme||"",a.keywords||"",a.prompt_text||"",JSON.stringify({...a.options_json?typeof a.options_json=="string"?JSON.parse(a.options_json):a.options_json:{},...a.footer_text?{footer_text:a.footer_text}:{},...(p=a.media_images)!=null&&p.length?{media_images:a.media_images}:{},...a.media_video?{media_video:a.media_video,media_video_name:a.media_video_name,media_video_type:a.media_video_type}:{}}),a.title_memo||"",a.link_url||"",o,a.publish_at||null,d,s,s).run();return e.json({success:!0,id:c.meta.last_row_id,reservation_no:l})});ge.put("/api/admin/autopilot/jobs/:id",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.req.json(),n=y();let i=s.generate_at??null;if(s.publish_at&&!s.generate_at)try{const l=new Date(s.publish_at.replace(" ","T"));l.setMinutes(l.getMinutes()-2),i=l.toISOString().replace("T"," ").slice(0,19)}catch{}const r=i||s.publish_at?"configured":"draft";return await e.env.DB.prepare(`UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(s.content_mode||"problem",s.theme||"",s.keywords||"",s.prompt_text||"",s.options_json||"{}",s.title_memo||"",s.link_url||"",i,s.publish_at||null,r,n,a,t.id).run(),e.json({success:!0})});ge.delete("/api/admin/autopilot/jobs/:id",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ge.post("/api/admin/autopilot/jobs/:id/cancel",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(y(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ge.post("/cron/autopilot-tick",async e=>{if(!e.env.OPENAI_API_KEY)return e.json({ok:!0,skipped:"no_openai_key"});const{results:t}=await e.env.DB.prepare(`SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND generate_at IS NOT NULL
         AND generate_at <= datetime('now','+9 hours')
       ORDER BY generate_at ASC LIMIT 5`).all();let a=0;for(const s of t||[])try{const n=String(s.account_id??"default");let i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,s.user_id).first();i||(i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(s.user_id).first());let r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,s.user_id).first();r||(r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(s.user_id).first());let l;s.content_mode&&s.content_mode!=="freetext"?l=await es(e.env.OPENAI_API_KEY,s.content_mode,s.theme||"",s.keywords||"",i,r,"body"):l=await Qa(e.env.OPENAI_API_KEY,s.theme||"",s.keywords||"",i,r,"body");const o=await Se(l),d=y(),c=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, 'body', ?, ?, ?, ?, ?, 'autopilot', 'approved', ?, ?)`).bind(s.user_id,s.account_id,l,s.link_url,s.publish_at,s.publish_at,s.publish_at,o,s.content_mode,d,d).run();await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?").bind(c.meta.last_row_id,d,s.id).run(),a++}catch(n){await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?").bind((n==null?void 0:n.message)||"unknown_error",y(),s.id).run()}return e.json({ok:!0,generated:a,total:(t||[]).length})});const da={topics:[{title:"投稿の基本",keywords:["投稿","ポスト","ツイート","post","tweet"],answer:"[新規投稿] タブから本文を入力し「投稿キューへ」で予約できます。即時投稿は [今すぐ投稿] ボタンから。"},{title:"オートパイロット",keywords:["オートパイロット","autopilot","自動投稿","自動"],answer:"[オートパイロット] タブでジョブを作成すると、指定時刻に OpenAI が投稿案を生成しキューに入ります。"},{title:"アカウント連携",keywords:["連携","アカウント","追加","OAuth","トークン"],answer:"X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、[アカウント管理] から追加してください。OAuth 1.0a User Context を使用します。"},{title:"ライセンス",keywords:["ライセンス","認証","license","VPS-GE365X"],answer:"ログイン画面の [ライセンス] タブから VPS-GE365X-XXXXXXXX 形式のキーを入力するとプランが有効化されます。"},{title:"類似度制御",keywords:["類似","重複","ブロック","similarity"],answer:"同一アカウントの直近5件と Jaccard係数 0.7 以上の類似があると投稿がブロックされます。"},{title:"投稿間隔",keywords:["間隔","時間","cooldown","spacing"],answer:"最低投稿間隔は15分、推奨は30〜120分のランダム。jitter で ±5分の微分散も付与されます。"}],default_response:"該当するトピックが見つかりませんでした。[アカウント管理][投稿][オートパイロット][ライセンス] 等のキーワードで試してください。"},We=new D;async function Yt(e){const t=await e.DB.prepare("SELECT json_data FROM chatbot_kb WHERE id = 1").first();if(t!=null&&t.json_data)try{return JSON.parse(t.json_data)}catch{}return await e.DB.prepare("INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)").bind(JSON.stringify(da)).run(),da}We.get("/api/admin/chatbot/topics",f,async e=>{const t=await Yt(e.env);return e.json({topics:(t.topics||[]).map((a,s)=>({id:s,title:a.title,keywords:a.keywords}))})});We.post("/api/admin/chatbot/ask",f,async e=>{const t=await Yt(e.env),s=((await e.req.json().catch(()=>({}))).question||"").toLowerCase().trim();if(!s)return e.json({answer:t.default_response});let n=null,i=0;for(const r of t.topics||[]){let l=0;for(const o of r.keywords||[])s.includes(o.toLowerCase())&&(l+=o.length);l>i&&(i=l,n=r)}return n?e.json({answer:n.answer,title:n.title,matched:!0}):e.json({answer:t.default_response,matched:!1})});We.get("/api/admin/chatbot/topic/:id",f,async e=>{const a=((await Yt(e.env)).topics||[])[parseInt(e.req.param("id"),10)];return a?e.json({topic:a}):e.json({error:"トピック未登録"},404)});We.put("/api/admin/chatbot/kb",f,Te,async e=>{const t=await e.req.json();return!t||!Array.isArray(t.topics)?e.json({error:"invalid_kb"},400):(await e.env.DB.prepare(`INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`).bind(JSON.stringify(t)).run(),e.json({success:!0,topic_count:t.topics.length}))});We.post("/api/admin/chatbot",f,async e=>{var r,l,o;const t=e.get("user"),{message:a}=await e.req.json();if(!a)return e.json({reply:"メッセージが空です"},400);const s=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key=?").bind("openai_api_key_"+t.id).first();if(!(s!=null&&s.value))return e.json({reply:"OpenAI APIキーが設定されていません。API設定ページから設定してください。"});const{decryptValue:n}=await Promise.resolve().then(()=>lt),i=await n(s.value,e.env.ENCRYPTION_KEY);try{const p=((o=(l=(r=(await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+i},body:JSON.stringify({model:e.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"あなたはGrowth-engine365XのAIアシスタントです。X(Twitter)の投稿戦略、AI生成、オートパイロット設定について日本語で簡潔にアドバイスしてください。"},{role:"user",content:a}],max_tokens:500})})).json()).choices)==null?void 0:r[0])==null?void 0:l.message)==null?void 0:o.content)||"応答を取得できませんでした";return e.json({reply:p})}catch(d){return e.json({reply:"AI応答エラー: "+d.message})}});const ct=new D;ct.get("/api/admin/drafts",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`).bind(t.id).all();return e.json({drafts:a||[]})});ct.post("/api/admin/drafts",f,async e=>{const t=e.get("user"),a=await e.req.json();if(!a.body)return e.json({error:"body required"},400);const s=await e.env.DB.prepare(`INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,a.account_id??null,a.title??null,a.body,a.link_url??null,a.hashtags??null,a.post_mode??"body").run();return e.json({success:!0,id:s.meta.last_row_id})});ct.put("/api/admin/drafts/:id",f,async e=>{const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.req.json();return await e.env.DB.prepare(`UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`).bind(s.title??null,s.body??null,s.link_url??null,s.hashtags??null,s.post_mode??null,s.account_id??null,y(),a,t.id).run(),e.json({success:!0})});ct.delete("/api/admin/drafts/:id",f,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM drafts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const pt=new D;pt.get("/api/admin/media",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`).bind(t.id).all();return e.json({assets:a||[]})});pt.post("/api/admin/media",f,async e=>{const t=e.get("user");if(!e.env.MEDIA_BUCKET)return e.json({error:"R2 bucket (MEDIA_BUCKET) not configured"},501);const s=(await e.req.parseBody()).file;if(!s)return e.json({error:"file required"},400);const n=s.type.startsWith("video/")?"video":"image",i=`u${t.id}/${Date.now()}-${s.name}`;await e.env.MEDIA_BUCKET.put(i,await s.arrayBuffer(),{httpMetadata:{contentType:s.type}});const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status)
     VALUES (?, ?, ?, ?, ?, ?, 'ready')`).bind(t.id,n,s.type,s.name,s.size,`/media/${i}`).run();return e.json({success:!0,id:r.meta.last_row_id,storage_path:`/media/${i}`})});pt.delete("/api/admin/media/:id",f,async e=>{var n;const t=e.get("user"),a=parseInt(e.req.param("id"),10),s=await e.env.DB.prepare("SELECT storage_path FROM media_assets WHERE id=? AND user_id=?").bind(a,t.id).first();if((n=s==null?void 0:s.storage_path)!=null&&n.startsWith("/media/")&&e.env.MEDIA_BUCKET){const i=s.storage_path.slice(7);await e.env.MEDIA_BUCKET.delete(i).catch(()=>{})}return await e.env.DB.prepare("DELETE FROM media_assets WHERE id=? AND user_id=?").bind(a,t.id).run(),e.json({success:!0})});pt.get("/media/*",async e=>{if(!e.env.MEDIA_BUCKET)return e.notFound();const t=e.req.path.replace(/^\/media\//,""),a=await e.env.MEDIA_BUCKET.get(t);if(!a)return e.notFound();const s=new Headers;return a.writeHttpMetadata(s),s.set("etag",a.httpEtag),new Response(a.body,{headers:s})});const Kt=new D;Kt.get("/api/admin/kpi",f,async e=>{const t=e.get("user"),a=e.req.query("account_id"),s=parseInt(e.req.query("days")||"30",10),n=[t.id,s];let i="WHERE km.user_id = ? AND km.metric_date >= date('now','+9 hours','-' || ? || ' days')";a&&(i+=" AND km.account_id = ?",n.push(Number(a)));const{results:r}=await e.env.DB.prepare(`SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${i} ORDER BY km.metric_date DESC, km.account_id ASC`).bind(...n).all();return e.json({metrics:r||[]})});Kt.get("/api/admin/kpi/summary",f,async e=>{const t=e.get("user"),a=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`).bind(t.id).first(),s=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`).bind(t.id).first();return e.json({today:{sent:(a==null?void 0:a.sent)??0,failed:(a==null?void 0:a.failed)??0},week:{sent:(s==null?void 0:s.sent)??0,failed:(s==null?void 0:s.failed)??0}})});const At=new D;At.get("/api/admin/logs/posts",f,async e=>{const t=e.get("user"),a=e.req.query("status"),s=e.req.query("account_id"),n=[t.id];let i="WHERE pl.user_id = ?";a&&a!=="all"&&(i+=" AND pl.status = ?",n.push(a)),s&&(i+=" AND pl.account_id = ?",n.push(Number(s)));const{results:r}=await e.env.DB.prepare(`SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${i} ORDER BY pl.id DESC LIMIT 300`).bind(...n).all();return e.json({logs:r||[]})});At.get("/api/admin/logs/generations",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:a||[]})});At.get("/api/admin/logs/health",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:a||[]})});const It=new D;It.get("/api/admin/target/presets",f,e=>e.json({templates:Ga}));It.get("/api/admin/target",f,async e=>{const t=e.get("user"),a=e.req.query("account_id")||"default",s=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();return e.json({target:s})});It.post("/api/admin/target",f,async e=>{const t=e.get("user"),a=await e.req.json(),s=String(a.account_id??"default"),n=y(),i=await e.env.DB.prepare("SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`).bind(a.template_key??null,a.label??null,a.age_range??null,a.gender??null,a.genre??null,a.occupation??null,a.pains??null,a.desires??null,a.purchase_triggers??null,a.problem??null,a.goal??null,a.knowledge??null,a.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,t.id,a.template_key??null,a.label??null,a.age_range??null,a.gender??null,a.genre??null,a.occupation??null,a.pains??null,a.desires??null,a.purchase_triggers??null,a.problem??null,a.goal??null,a.knowledge??null,a.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const Dt=new D;Dt.get("/api/admin/voice/presets",f,e=>e.json({templates:Pn}));Dt.get("/api/admin/voice",f,async e=>{const t=e.get("user"),a=e.req.query("account_id")||"default",s=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();return e.json({voice:s})});Dt.post("/api/admin/voice",f,async e=>{const t=e.get("user"),a=await e.req.json(),s=String(a.account_id??"default"),n=y(),i=await e.env.DB.prepare("SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`).bind(a.voice_key??null,a.label??null,a.tone??null,a.worldview??null,a.personal_story??null,a.prohibited_words??null,a.sample_posts??null,a.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(s,t.id,a.voice_key??null,a.label??null,a.tone??null,a.worldview??null,a.personal_story??null,a.prohibited_words??null,a.sample_posts??null,a.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const Ie=new D;Ie.get("/api/admin/api-settings",f,async e=>{const t=e.get("user"),a=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first(),s=await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id')").all(),n={};for(const d of s.results||[])n[d.key]=d.value;const i=a!=null&&a.api_key?await Ne(a.api_key,e.env.ENCRYPTION_KEY):"",r=a!=null&&a.api_secret?"••••••••":"",l=n.openai_api_key?"••••••••":"",o=n.telegram_bot_token?"••••••••":"";return e.json({api_key:i,api_secret:r,openai_key:l,openai_model:n.openai_model||"gpt-4o-mini",telegram_token:o,telegram_chat_id:n.telegram_chat_id||""})});Ie.post("/api/admin/api-settings/x",f,async e=>{const t=e.get("user"),{api_key:a,api_secret:s}=await e.req.json();if(!a||a.includes("•"))return e.json({success:!1,error:"api_key required"},400);const n=await X(a.trim(),e.env.ENCRYPTION_KEY),i=s&&!s.includes("•")?await X(s.trim(),e.env.ENCRYPTION_KEY):null;return await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first()?i?await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,i,t.id).run():await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,t.id).run():await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)").bind(t.id,n,i||"").run(),e.json({success:!0})});Ie.post("/api/admin/api-settings/openai",f,async e=>{const{openai_key:t,openai_model:a}=await e.req.json();if(t&&!t.includes("•")){const s=await X(t.trim(),e.env.ENCRYPTION_KEY);await Ue(e,"openai_api_key",s,"OpenAI API Key (AES暗号化)")}return a&&await Ue(e,"openai_model",a,"OpenAI モデル名"),e.json({success:!0})});Ie.post("/api/admin/api-settings/telegram",f,async e=>{const{telegram_token:t,telegram_chat_id:a}=await e.req.json();if(t&&!t.includes("•")){const s=await X(t.trim(),e.env.ENCRYPTION_KEY);await Ue(e,"telegram_bot_token",s,"Telegram Bot Token (AES暗号化)")}return a&&await Ue(e,"telegram_chat_id",a,"Telegram Chat ID"),e.json({success:!0})});Ie.post("/api/admin/api-settings/:kind/test",f,async e=>{var s;const t=e.req.param("kind"),a=e.get("user");try{if(t==="x"){const n=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(a.id).first();if(!(n!=null&&n.api_key))return e.json({success:!1,error:"X API Key が未設定です。先にAPIキーを保存してください。"});const i=await Ne(n.api_key,e.env.ENCRYPTION_KEY),r=n.api_secret?await Ne(n.api_secret,e.env.ENCRYPTION_KEY):"";if(!i)return e.json({success:!1,error:"Consumer Key の復号に失敗しました"});const l=await e.env.DB.prepare("SELECT access_token, access_token_secret, x_username FROM x_accounts WHERE user_id=? AND is_active=1 LIMIT 1").bind(a.id).first();if(!(l!=null&&l.access_token))return e.json({success:!0,message:"Consumer Key を復号できました（アカウント登録後に実投稿テストできます）"});try{const{buildCredentialsFromAccount:o,getMe:d}=await Promise.resolve().then(()=>Va),c=await o(e.env,l,{apiKey:i,apiSecret:r}),p=await d(c);return e.json({success:!0,message:"接続OK: @"+(p.username||((s=p.data)==null?void 0:s.username)||"unknown")})}catch(o){return e.json({success:!1,error:"接続失敗: "+(o.message||String(o))})}}if(t==="openai"){const n=await ft(e,"openai_api_key");if(!n)return e.json({success:!1,error:"OpenAI Key 未設定"});const i=await Ne(n,e.env.ENCRYPTION_KEY);if(!i)return e.json({success:!1,error:"復号失敗"});const r=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${i}`}});return r.ok?e.json({success:!0,message:"OpenAI 接続OK"}):e.json({success:!1,error:`OpenAI API ${r.status}`})}if(t==="gemini"){const n=await ft(e,"gemini_api_key");if(!n)return e.json({success:!1,error:"Gemini Key 未設定"});const i=await Ne(n,e.env.ENCRYPTION_KEY);if(!i)return e.json({success:!1,error:"復号失敗"});const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${i}`);return r.ok?e.json({success:!0,message:"Gemini 接続OK"}):e.json({success:!1,error:`Gemini API ${r.status}`})}if(t==="telegram"){const n=await ft(e,"telegram_bot_token"),i=await ft(e,"telegram_chat_id");if(!n||!i)return e.json({success:!1,error:"Telegram 未設定"});const r=await Ne(n,e.env.ENCRYPTION_KEY);if(!r)return e.json({success:!1,error:"復号失敗"});const o=await(await fetch(`https://api.telegram.org/bot${r}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:i,text:"✅ GE365x-web: Telegram 接続テスト成功"})})).json();return o!=null&&o.ok?e.json({success:!0,message:"Telegram 送信成功"}):e.json({success:!1,error:(o==null?void 0:o.description)||"Telegram 送信失敗"})}return e.json({success:!1,error:"unknown kind"},400)}catch(n){return e.json({success:!1,error:(n==null?void 0:n.message)||String(n)})}});async function Ue(e,t,a,s){await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,a,s).run()}async function ft(e,t){const a=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(t).first();return(a==null?void 0:a.value)||null}async function Ne(e,t){try{return await et(e,t)}catch{return""}}Ie.post("/api/admin/api-settings/gemini",f,async e=>{e.get("user");const t=await e.req.json(),a=t.gemini_key,s=t.gemini_model;if(!a||a.includes("•"))return e.json({success:!1,error:"api_key required"},400);const n=await X(a.trim(),e.env.ENCRYPTION_KEY);return await Ue(e,"gemini_api_key",n,"Gemini API Key (AES暗号化)"),s&&await Ue(e,"gemini_model",s,"Gemini モデル名"),e.json({success:!0})});const M=new D;function ca(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}function U(e,t){const s=e.map(ca).join(","),n=t.map(i=>e.map(r=>ca(i[r])).join(","));return"\uFEFF"+s+`
`+n.join(`
`)}function W(e,t){return new Response(e,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function rs(e,t){return new Response(JSON.stringify(e,null,2),{headers:{"content-type":"application/json; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function P(){const e=new Date,t=a=>String(a).padStart(2,"0");return`${e.getFullYear()}${t(e.getMonth()+1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`}M.get("/api/admin/export/posts",f,async e=>{const t=e.get("user"),a=e.req.query("status"),s=e.req.query("month");let n="WHERE pq.platform='x' AND pq.user_id = ?";const i=[t.id];a&&a!=="all"&&(n+=" AND pq.status = ?",i.push(a)),s&&(n+=" AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?",i.push(s));const{results:r}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${n} ORDER BY pq.id DESC LIMIT 10000`).bind(...i).all(),o=U(["id","body","link_url","hashtags","post_mode","status","account_name","x_username","generation_type","source_type","pattern_type","scheduled_at","effective_scheduled_at","posted_at","external_post_id","error_message","recurrence_type","recurrence_rule","thread_parent_id","thread_order","thread_count","media_type","jitter_enabled","jitter_minutes","created_at","updated_at"],r||[]);return W(o,`ge365x_posts_${P()}.csv`)});M.get("/api/admin/export/logs",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`).bind(t.id).all(),n=U(["id","record_id","account_name","platform","source_type","generation_type","post_mode","content","content_hash","link_url","media_type","media_upload_status","media_id","thread_parent_id","thread_order","thread_total_count","scheduled_at","executed_at","posted_at","status","error_message","api_response_summary","created_at"],a||[]);return W(n,`ge365x_post_logs_${P()}.csv`)});M.get("/api/admin/export/generations",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`).bind(t.id).all(),n=U(["id","account_id","account_name","x_username","brand_voice_id","target_setting_id","post_mode","generation_type","output_text","created_at"],a||[]);return W(n,`ge365x_generation_logs_${P()}.csv`)});M.get("/api/admin/export/autopilot",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`).bind(t.id).all(),n=U(["id","reservation_no","account_id","account_name","x_username","channel_type","content_mode","theme","keywords","prompt_text","title_memo","link_url","generate_at","publish_at","status","generated_post_id","external_post_id","error_message","created_at","updated_at"],a||[]);return W(n,`ge365x_autopilot_${P()}.csv`)});M.get("/api/admin/export/drafts",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`).bind(t.id).all(),n=U(["id","account_id","title","body","link_url","hashtags","post_mode","created_at","updated_at"],a||[]);return W(n,`ge365x_drafts_${P()}.csv`)});M.get("/api/admin/export/kpi",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`).bind(t.id).all(),n=U(["id","account_id","account_name","x_username","metric_date","posts_sent","posts_failed","impressions","engagements","followers_gained","created_at","updated_at"],a||[]);return W(n,`ge365x_kpi_${P()}.csv`)});M.get("/api/admin/export/accounts",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=U(["id","account_name","x_user_id","x_username","daily_post_count","daily_post_limit","last_posted_at","account_health_score","health_status","is_active","is_current","last_daily_reset_date","created_at","updated_at"],a||[]);return W(n,`ge365x_accounts_${P()}.csv`)});M.get("/api/admin/export/targets",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=U(["id","account_id","template_key","label","age_range","gender","genre","occupation","pains","desires","purchase_triggers","problem","goal","knowledge","is_default"],a||[]);return W(n,`ge365x_targets_${P()}.csv`)});M.get("/api/admin/export/voices",f,async e=>{const t=e.get("user"),{results:a}=await e.env.DB.prepare(`SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=U(["id","account_id","voice_key","label","tone","worldview","personal_story","prohibited_words","sample_posts","is_default"],a||[]);return W(n,`ge365x_voices_${P()}.csv`)});M.get("/api/admin/export/all",f,async e=>{const t=e.get("user"),a=t.id,[s,n,i,r,l,o,d,c,p]=await Promise.all([e.env.DB.prepare(`SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`).bind(a).all(),e.env.DB.prepare("SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(a).all(),e.env.DB.prepare("SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(a).all(),e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(a).all(),e.env.DB.prepare("SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000").bind(a).all(),e.env.DB.prepare("SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000").bind(a).all(),e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(a).all(),e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC").bind(a).all(),e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC").bind(a).all()]),m={exported_at:new Date().toISOString(),user:{id:t.id,email:t.email},posts:s.results||[],post_logs:n.results||[],generation_logs:i.results||[],autopilot_jobs:r.results||[],drafts:l.results||[],kpi_metrics:o.results||[],x_accounts:d.results||[],target_templates:c.results||[],brand_voices:p.results||[]};return rs(m,`ge365x_all_data_${P()}.json`)});M.get("/api/admin/export/admin/users",f,Te,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`).all(),s=U(["id","email","is_approved","is_admin","trial_start","trial_end","created_at","updated_at","plan_code","sub_status","current_period_end"],t||[]);return W(s,`ge365x_admin_users_${P()}.csv`)});M.get("/api/admin/export/admin/licenses",f,Te,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`).all(),s=U(["id","license_key","license_type","plan_code","user_id","user_email","is_active","activated_at","expires_at","issued_by","note","created_at","updated_at"],t||[]);return W(s,`ge365x_admin_licenses_${P()}.csv`)});M.get("/api/admin/export/admin/subs",f,Te,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.created_at, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`).all(),s=U(["id","user_id","user_email","plan_code","status","started_at","current_period_end","cancel_at_period_end","created_at","updated_at"],t||[]);return W(s,`ge365x_admin_subs_${P()}.csv`)});M.get("/api/admin/export/admin/audit",f,Te,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(),s=U(["id","user_id","email","event_type","ip_address","user_agent","metadata","created_at"],t||[]);return W(s,`ge365x_admin_audit_${P()}.csv`)});M.get("/api/admin/export/admin/all",f,Te,async e=>{const[t,a,s,n,i,r,l]=await Promise.all([e.env.DB.prepare(`SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
         FROM users ORDER BY id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT s.*, u.email AS user_email
         FROM user_subscriptions s LEFT JOIN users u ON u.id = s.user_id
         ORDER BY s.id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT l.*, u.email AS user_email
         FROM licenses l LEFT JOIN users u ON u.id = l.user_id
         ORDER BY l.id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, metadata, created_at
         FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT pq.id, pq.user_id, pq.account_id, pq.body, pq.status, pq.post_mode,
              pq.scheduled_at, pq.posted_at, pq.created_at
         FROM post_queue pq ORDER BY pq.id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT id, record_id, user_id, account_id, account_name,
              content, status, posted_at, error_message, created_at
         FROM post_logs ORDER BY id DESC LIMIT 10000`).all(),e.env.DB.prepare(`SELECT id, user_id, account_name, x_username, account_health_score,
              health_status, is_active, created_at
         FROM x_accounts ORDER BY id DESC LIMIT 10000`).all()]),o={exported_at:new Date().toISOString(),users:t.results||[],user_subscriptions:a.results||[],licenses:s.results||[],auth_logs:n.results||[],post_queue:i.results||[],post_logs:r.results||[],x_accounts:l.results||[]};return rs(o,`ge365x_admin_all_${P()}.json`)});const S=new D;S.use("/static/*",en({root:"./",manifest:{}}));S.get("/healthz",e=>e.json({ok:!0,service:"ge365x-web",time:new Date().toISOString()}));S.route("/",Na);S.route("/",q);S.route("/",za);S.route("/",Z);S.route("/",fe);S.route("/",he);S.route("/",$);S.route("/",is);S.route("/",ge);S.route("/",We);S.route("/",ct);S.route("/",pt);S.route("/",Kt);S.route("/",At);S.route("/",It);S.route("/",Dt);S.route("/",Ie);S.route("/",M);S.notFound(e=>e.json({error:"not_found",path:e.req.path},404));S.onError((e,t)=>(console.error("[ge365x-web] error:",e),t.json({error:"internal_error",message:e.message},500)));const ei={fetch:S.fetch,async scheduled(e,t,a){const s=e.cron;(!s||s==="*/1 * * * *")&&a.waitUntil(S.fetch(new Request("https://internal/cron/tick",{method:"POST"}),t,a).catch(n=>console.error("[tick]",n))),s==="*/5 * * * *"&&a.waitUntil(S.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}),t,a).catch(n=>console.error("[autopilot-tick]",n)))}},pa=new D,ti=Object.assign({"/src/index.tsx":ei});let os=!1;for(const[,e]of Object.entries(ti))e&&(pa.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),pa.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),os=!0);if(!os)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{pa as default};
