var Zs=Object.defineProperty;var Ut=e=>{throw TypeError(e)};var Qs=(e,t,s)=>t in e?Zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var h=(e,t,s)=>Qs(e,typeof t!="symbol"?t+"":t,s),xt=(e,t,s)=>t.has(e)||Ut("Cannot "+s);var u=(e,t,s)=>(xt(e,t,"read from private field"),s?s.call(e):t.get(e)),y=(e,t,s)=>t.has(e)?Ut("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),f=(e,t,s,a)=>(xt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),x=(e,t,s)=>(xt(e,t,"access private method"),s);var Wt=(e,t,s,a)=>({set _(n){f(e,t,n,s)},get _(){return u(e,t,a)}});var Yt=(e,t,s)=>(a,n)=>{let i=-1;return r(0);async function r(o){if(o<=i)throw new Error("next() called multiple times");i=o;let d,l=!1,c;if(e[o]?(c=e[o][0][0],a.req.routeIndex=o):c=o===e.length&&n||void 0,c)try{d=await c(a,()=>r(o+1))}catch(p){if(p instanceof Error&&t)a.error=p,d=await t(p,a),l=!0;else throw p}else a.finalized===!1&&s&&(d=await s(a));return d&&(a.finalized===!1||l)&&(a.res=d),a}},ea=Symbol(),ta=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,i=(e instanceof ys?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?sa(e,{all:s,dot:a}):{}};async function sa(e,t){const s=await e.formData();return s?aa(s,t):{}}function aa(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?na(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(ia(s,a,n),delete s[a])}),s}var na=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},ia=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let a=e;const n=t.split(".");n.forEach((i,r)=>{r===n.length-1?a[i]=s:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},_s=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ra=e=>{const{groups:t,path:s}=oa(e),a=_s(s);return da(a,t)},oa=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},da=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},it={},la=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return it[a]||(s[2]?it[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:it[a]=[e,s[1],!0]),it[a]}return null},jt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},hs=e=>jt(e,decodeURI),fs=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const i=t.indexOf("?",a),r=t.indexOf("#",a),o=i===-1?r===-1?void 0:r:r===-1?i:Math.min(i,r),d=t.slice(s,o);return hs(d.includes("%25")?d.replace(/%25/g,"%2525"):d)}else if(n===63||n===35)break}return t.slice(s,a)},ca=e=>{const t=fs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ie=(e,t,...s)=>(s.length&&(t=Ie(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),bs=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const i=n.replace("?","");a+="/"+i,s.push(a)}else a+="/"+n}),s.filter((n,i,r)=>r.indexOf(n)===i)},wt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?jt(e,vs):e):e,gs=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const o=e.charCodeAt(r+t.length+1);if(o===61){const d=r+t.length+2,l=e.indexOf("&",d);return wt(e.slice(d,l===-1?void 0:l))}else if(o==38||isNaN(o))return"";r=e.indexOf(`&${t}`,r+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const r=e.indexOf("&",i+1);let o=e.indexOf("=",i);o>r&&r!==-1&&(o=-1);let d=e.slice(i+1,o===-1?r===-1?void 0:r:o);if(a&&(d=wt(d)),i=r,d==="")continue;let l;o===-1?l="":(l=e.slice(o+1,r===-1?void 0:r),a&&(l=wt(l))),s?(n[d]&&Array.isArray(n[d])||(n[d]=[]),n[d].push(l)):n[d]??(n[d]=l)}return t?n[t]:n},ua=gs,pa=(e,t)=>gs(e,t,!0),vs=decodeURIComponent,Jt=e=>jt(e,vs),Ne,J,re,Es,xs,Dt,de,ds,ys=(ds=class{constructor(e,t="/",s=[[]]){y(this,re);h(this,"raw");y(this,Ne);y(this,J);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});y(this,de,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,f(this,J,s),f(this,Ne,{})}param(e){return e?x(this,re,Es).call(this,e):x(this,re,xs).call(this)}query(e){return ua(this.url,e)}queries(e){return pa(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){return ta(this,e)}json(){return u(this,de).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,de).call(this,"text")}arrayBuffer(){return u(this,de).call(this,"arrayBuffer")}blob(){return u(this,de).call(this,"blob")}formData(){return u(this,de).call(this,"formData")}addValidatedData(e,t){u(this,Ne)[e]=t}valid(e){return u(this,Ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ea](){return u(this,J)}get matchedRoutes(){return u(this,J)[0].map(([[,e]])=>e)}get routePath(){return u(this,J)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ne=new WeakMap,J=new WeakMap,re=new WeakSet,Es=function(e){const t=u(this,J)[0][this.routeIndex][1][e],s=x(this,re,Dt).call(this,t);return s&&/\%/.test(s)?Jt(s):s},xs=function(){const e={},t=Object.keys(u(this,J)[0][this.routeIndex][1]);for(const s of t){const a=x(this,re,Dt).call(this,u(this,J)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?Jt(a):a)}return e},Dt=function(e){return u(this,J)[1]?u(this,J)[1][e]:e},de=new WeakMap,ds),ma={Stringify:1},ws=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(o=>o({phase:t,buffer:n,context:a}))).then(o=>Promise.all(o.filter(Boolean).map(d=>ws(d,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},_a="text/plain; charset=UTF-8",kt=(e,t)=>({"Content-Type":e,...t}),Ye=(e,t)=>new Response(e,t),Ve,Xe,te,Le,se,M,Ge,Me,$e,xe,Ze,Qe,le,Ce,ls,ha=(ls=class{constructor(e,t){y(this,le);y(this,Ve);y(this,Xe);h(this,"env",{});y(this,te);h(this,"finalized",!1);h(this,"error");y(this,Le);y(this,se);y(this,M);y(this,Ge);y(this,Me);y(this,$e);y(this,xe);y(this,Ze);y(this,Qe);h(this,"render",(...e)=>(u(this,Me)??f(this,Me,t=>this.html(t)),u(this,Me).call(this,...e)));h(this,"setLayout",e=>f(this,Ge,e));h(this,"getLayout",()=>u(this,Ge));h(this,"setRenderer",e=>{f(this,Me,e)});h(this,"header",(e,t,s)=>{this.finalized&&f(this,M,Ye(u(this,M).body,u(this,M)));const a=u(this,M)?u(this,M).headers:u(this,xe)??f(this,xe,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});h(this,"status",e=>{f(this,Le,e)});h(this,"set",(e,t)=>{u(this,te)??f(this,te,new Map),u(this,te).set(e,t)});h(this,"get",e=>u(this,te)?u(this,te).get(e):void 0);h(this,"newResponse",(...e)=>x(this,le,Ce).call(this,...e));h(this,"body",(e,t,s)=>x(this,le,Ce).call(this,e,t,s));h(this,"text",(e,t,s)=>!u(this,xe)&&!u(this,Le)&&!t&&!s&&!this.finalized?new Response(e):x(this,le,Ce).call(this,e,t,kt(_a,s)));h(this,"json",(e,t,s)=>x(this,le,Ce).call(this,JSON.stringify(e),t,kt("application/json",s)));h(this,"html",(e,t,s)=>{const a=n=>x(this,le,Ce).call(this,n,t,kt("text/html; charset=UTF-8",s));return typeof e=="object"?ws(e,ma.Stringify,!1,{}).then(a):a(e)});h(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});h(this,"notFound",()=>(u(this,$e)??f(this,$e,()=>Ye()),u(this,$e).call(this,this)));f(this,Ve,e),t&&(f(this,se,t.executionCtx),this.env=t.env,f(this,$e,t.notFoundHandler),f(this,Qe,t.path),f(this,Ze,t.matchResult))}get req(){return u(this,Xe)??f(this,Xe,new ys(u(this,Ve),u(this,Qe),u(this,Ze))),u(this,Xe)}get event(){if(u(this,se)&&"respondWith"in u(this,se))return u(this,se);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,se))return u(this,se);throw Error("This context has no ExecutionContext")}get res(){return u(this,M)||f(this,M,Ye(null,{headers:u(this,xe)??f(this,xe,new Headers)}))}set res(e){if(u(this,M)&&e){e=Ye(e.body,e);for(const[t,s]of u(this,M).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=u(this,M).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}f(this,M,e),this.finalized=!0}get var(){return u(this,te)?Object.fromEntries(u(this,te)):{}}},Ve=new WeakMap,Xe=new WeakMap,te=new WeakMap,Le=new WeakMap,se=new WeakMap,M=new WeakMap,Ge=new WeakMap,Me=new WeakMap,$e=new WeakMap,xe=new WeakMap,Ze=new WeakMap,Qe=new WeakMap,le=new WeakSet,Ce=function(e,t,s){const a=u(this,M)?new Headers(u(this,M).headers):u(this,xe)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,o]of i)r.toLowerCase()==="set-cookie"?a.append(r,o):a.set(r,o)}if(s)for(const[i,r]of Object.entries(s))if(typeof r=="string")a.set(i,r);else{a.delete(i);for(const o of r)a.append(i,o)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Le);return Ye(e,{status:n,headers:a})},ls),O="ALL",fa="all",ba=["get","post","put","delete","options","patch"],ks="Can not add a route since the matcher is already built.",Ss=class extends Error{},ga="__COMPOSED_HANDLER",va=e=>e.text("404 Not Found",404),Kt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},z,j,Ts,V,ye,rt,ot,Fe,ya=(Fe=class{constructor(t={}){y(this,j);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");y(this,z,"/");h(this,"routes",[]);y(this,V,va);h(this,"errorHandler",Kt);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(f(this,V,t),this));h(this,"fetch",(t,...s)=>x(this,j,ot).call(this,t,s[1],s[0],t.method));h(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ie("/",t)}`,s),a,n)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,j,ot).call(this,t.request,t,void 0,t.request.method))})});[...ba,fa].forEach(i=>{this[i]=(r,...o)=>(typeof r=="string"?f(this,z,r):x(this,j,ye).call(this,i,u(this,z),r),o.forEach(d=>{x(this,j,ye).call(this,i,u(this,z),d)}),this)}),this.on=(i,r,...o)=>{for(const d of[r].flat()){f(this,z,d);for(const l of[i].flat())o.map(c=>{x(this,j,ye).call(this,l.toUpperCase(),u(this,z),c)})}return this},this.use=(i,...r)=>(typeof i=="string"?f(this,z,i):(f(this,z,"*"),r.unshift(i)),r.forEach(o=>{x(this,j,ye).call(this,O,u(this,z),o)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??fs:ca}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var r;let i;s.errorHandler===Kt?i=n.handler:(i=async(o,d)=>(await Yt([],s.errorHandler)(o,()=>n.handler(o,d))).res,i[ga]=n.handler),x(r=a,j,ye).call(r,n.method,n.path,i)}),this}basePath(t){const s=x(this,j,Ts).call(this);return s._basePath=Ie(this._basePath,t),s}mount(t,s,a){let n,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?n=d=>d:n=a.replaceRequest));const r=i?d=>{const l=i(d);return Array.isArray(l)?l:[l]}:d=>{let l;try{l=d.executionCtx}catch{}return[d.env,l]};n||(n=(()=>{const d=Ie(this._basePath,t),l=d==="/"?0:d.length;return c=>{const p=new URL(c.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,c)}})());const o=async(d,l)=>{const c=await s(n(d.req.raw),...r(d));if(c)return c;await l()};return x(this,j,ye).call(this,O,Ie(t,"*"),o),this}},z=new WeakMap,j=new WeakSet,Ts=function(){const t=new Fe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,V,u(this,V)),t.routes=this.routes,t},V=new WeakMap,ye=function(t,s,a){t=t.toUpperCase(),s=Ie(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},rt=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},ot=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await x(this,j,ot).call(this,t,s,a,"GET")))();const i=this.getPath(t,{env:a}),r=this.router.match(n,i),o=new ha(t,{path:i,matchResult:r,env:a,executionCtx:s,notFoundHandler:u(this,V)});if(r[0].length===1){let l;try{l=r[0][0][0][0](o,async()=>{o.res=await u(this,V).call(this,o)})}catch(c){return x(this,j,rt).call(this,c,o)}return l instanceof Promise?l.then(c=>c||(o.finalized?o.res:u(this,V).call(this,o))).catch(c=>x(this,j,rt).call(this,c,o)):l??u(this,V).call(this,o)}const d=Yt(r[0],this.errorHandler,u(this,V));return(async()=>{try{const l=await d(o);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return x(this,j,rt).call(this,l,o)}})()},Fe),Ds=[];function Ea(e,t){const s=this.buildAllMatchers(),a=((n,i)=>{const r=s[n]||s[O],o=r[2][i];if(o)return o;const d=i.match(r[0]);if(!d)return[[],Ds];const l=d.indexOf("",1);return[r[1][l],d]});return this.match=a,a(e,t)}var ct="[^/]+",Ke=".*",ze="(?:|/.*)",Be=Symbol(),xa=new Set(".\\+*[^]$()");function wa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ke||e===ze?1:t===Ke||t===ze?-1:e===ct?1:t===ct?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var we,ke,X,De,ka=(De=class{constructor(){y(this,we);y(this,ke);y(this,X,Object.create(null))}insert(t,s,a,n,i){if(t.length===0){if(u(this,we)!==void 0)throw Be;if(i)return;f(this,we,s);return}const[r,...o]=t,d=r==="*"?o.length===0?["","",Ke]:["","",ct]:r==="/*"?["","",ze]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(d){const c=d[1];let p=d[2]||ct;if(c&&d[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Be;if(l=u(this,X)[p],!l){if(Object.keys(u(this,X)).some(_=>_!==Ke&&_!==ze))throw Be;if(i)return;l=u(this,X)[p]=new De,c!==""&&f(l,ke,n.varIndex++)}!i&&c!==""&&a.push([c,u(l,ke)])}else if(l=u(this,X)[r],!l){if(Object.keys(u(this,X)).some(c=>c.length>1&&c!==Ke&&c!==ze))throw Be;if(i)return;l=u(this,X)[r]=new De}l.insert(o,s,a,n,i)}buildRegExpStr(){const s=Object.keys(u(this,X)).sort(wa).map(a=>{const n=u(this,X)[a];return(typeof u(n,ke)=="number"?`(${a})@${u(n,ke)}`:xa.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof u(this,we)=="number"&&s.unshift(`#${u(this,we)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},we=new WeakMap,ke=new WeakMap,X=new WeakMap,De),ht,et,cs,Sa=(cs=class{constructor(){y(this,ht,{varIndex:0});y(this,et,new ka)}insert(e,t,s){const a=[],n=[];for(let r=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,d=>{const l=`@\\${r}`;return n[r]=[l,d],r++,o=!0,l}),!o)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[o]=n[r];for(let d=i.length-1;d>=0;d--)if(i[d].indexOf(o)!==-1){i[d]=i[d].replace(o,n[r][1]);break}}return u(this,et).insert(i,t,a,u(this,ht),s),a}buildRegExp(){let e=u(this,et).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,r)=>i!==void 0?(s[++t]=Number(i),"$()"):(r!==void 0&&(a[Number(r)]=++t),"")),[new RegExp(`^${e}`),s,a]}},ht=new WeakMap,et=new WeakMap,cs),Ta=[/^$/,[],Object.create(null)],dt=Object.create(null);function As(e){return dt[e]??(dt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Da(){dt=Object.create(null)}function Aa(e){var l;const t=new Sa,s=[];if(e.length===0)return Ta;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,p],[_,b])=>c?1:_?-1:p.length-b.length),n=Object.create(null);for(let c=0,p=-1,_=a.length;c<_;c++){const[b,v,T]=a[c];b?n[v]=[T.map(([D])=>[D,Object.create(null)]),Ds]:p++;let E;try{E=t.insert(v,p,b)}catch(D){throw D===Be?new Ss(v):D}b||(s[p]=T.map(([D,k])=>{const N=Object.create(null);for(k-=1;k>=0;k--){const[P,L]=E[k];N[P]=L}return[D,N]}))}const[i,r,o]=t.buildRegExp();for(let c=0,p=s.length;c<p;c++)for(let _=0,b=s[c].length;_<b;_++){const v=(l=s[c][_])==null?void 0:l[1];if(!v)continue;const T=Object.keys(v);for(let E=0,D=T.length;E<D;E++)v[T[E]]=o[v[T[E]]]}const d=[];for(const c in r)d[c]=s[r[c]];return[i,d,n]}function je(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(As(s).test(t))return[...e[s]]}}var ce,ue,ft,Rs,us,Ra=(us=class{constructor(){y(this,ft);h(this,"name","RegExpRouter");y(this,ce);y(this,ue);h(this,"match",Ea);f(this,ce,{[O]:Object.create(null)}),f(this,ue,{[O]:Object.create(null)})}add(e,t,s){var o;const a=u(this,ce),n=u(this,ue);if(!a||!n)throw new Error(ks);a[e]||[a,n].forEach(d=>{d[e]=Object.create(null),Object.keys(d[O]).forEach(l=>{d[e][l]=[...d[O][l]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const d=As(t);e===O?Object.keys(a).forEach(l=>{var c;(c=a[l])[t]||(c[t]=je(a[l],t)||je(a[O],t)||[])}):(o=a[e])[t]||(o[t]=je(a[e],t)||je(a[O],t)||[]),Object.keys(a).forEach(l=>{(e===O||e===l)&&Object.keys(a[l]).forEach(c=>{d.test(c)&&a[l][c].push([s,i])})}),Object.keys(n).forEach(l=>{(e===O||e===l)&&Object.keys(n[l]).forEach(c=>d.test(c)&&n[l][c].push([s,i]))});return}const r=bs(t)||[t];for(let d=0,l=r.length;d<l;d++){const c=r[d];Object.keys(n).forEach(p=>{var _;(e===O||e===p)&&((_=n[p])[c]||(_[c]=[...je(a[p],c)||je(a[O],c)||[]]),n[p][c].push([s,i-l+d+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,ue)).concat(Object.keys(u(this,ce))).forEach(t=>{e[t]||(e[t]=x(this,ft,Rs).call(this,t))}),f(this,ce,f(this,ue,void 0)),Da(),e}},ce=new WeakMap,ue=new WeakMap,ft=new WeakSet,Rs=function(e){const t=[];let s=e===O;return[u(this,ce),u(this,ue)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(i=>[i,a[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==O&&t.push(...Object.keys(a[O]).map(i=>[i,a[O][i]]))}),s?Aa(t):null},us),pe,ae,ps,Oa=(ps=class{constructor(e){h(this,"name","SmartRouter");y(this,pe,[]);y(this,ae,[]);f(this,pe,e.routers)}add(e,t,s){if(!u(this,ae))throw new Error(ks);u(this,ae).push([e,t,s])}match(e,t){if(!u(this,ae))throw new Error("Fatal error");const s=u(this,pe),a=u(this,ae),n=s.length;let i=0,r;for(;i<n;i++){const o=s[i];try{for(let d=0,l=a.length;d<l;d++)o.add(...a[d]);r=o.match(e,t)}catch(d){if(d instanceof Ss)continue;throw d}this.match=o.match.bind(o),f(this,pe,[o]),f(this,ae,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(u(this,ae)||u(this,pe).length!==1)throw new Error("No active router has been determined yet.");return u(this,pe)[0]}},pe=new WeakMap,ae=new WeakMap,ps),Je=Object.create(null),ja=e=>{for(const t in e)return!0;return!1},me,C,Se,qe,I,ne,Ee,Pe,Ia=(Pe=class{constructor(t,s,a){y(this,ne);y(this,me);y(this,C);y(this,Se);y(this,qe,0);y(this,I,Je);if(f(this,C,a||Object.create(null)),f(this,me,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},f(this,me,[n])}f(this,Se,[])}insert(t,s,a){f(this,qe,++Wt(this,qe)._);let n=this;const i=ra(s),r=[];for(let o=0,d=i.length;o<d;o++){const l=i[o],c=i[o+1],p=la(l,c),_=Array.isArray(p)?p[0]:l;if(_ in u(n,C)){n=u(n,C)[_],p&&r.push(p[1]);continue}u(n,C)[_]=new Pe,p&&(u(n,Se).push(p),r.push(p[1])),n=u(n,C)[_]}return u(n,me).push({[t]:{handler:a,possibleKeys:r.filter((o,d,l)=>l.indexOf(o)===d),score:u(this,qe)}}),n}search(t,s){var c;const a=[];f(this,I,Je);let i=[this];const r=_s(s),o=[],d=r.length;let l=null;for(let p=0;p<d;p++){const _=r[p],b=p===d-1,v=[];for(let E=0,D=i.length;E<D;E++){const k=i[E],N=u(k,C)[_];N&&(f(N,I,u(k,I)),b?(u(N,C)["*"]&&x(this,ne,Ee).call(this,a,u(N,C)["*"],t,u(k,I)),x(this,ne,Ee).call(this,a,N,t,u(k,I))):v.push(N));for(let P=0,L=u(k,Se).length;P<L;P++){const nt=u(k,Se)[P],Q=u(k,I)===Je?{}:{...u(k,I)};if(nt==="*"){const Re=u(k,C)["*"];Re&&(x(this,ne,Ee).call(this,a,Re,t,u(k,I)),f(Re,I,Q),v.push(Re));continue}const[Gs,Ht,Ue]=nt;if(!_&&!(Ue instanceof RegExp))continue;const ee=u(k,C)[Gs];if(Ue instanceof RegExp){if(l===null){l=new Array(d);let Oe=s[0]==="/"?1:0;for(let We=0;We<d;We++)l[We]=Oe,Oe+=r[We].length+1}const Re=s.substring(l[p]),Et=Ue.exec(Re);if(Et){if(Q[Ht]=Et[0],x(this,ne,Ee).call(this,a,ee,t,u(k,I),Q),ja(u(ee,C))){f(ee,I,Q);const Oe=((c=Et[0].match(/\//))==null?void 0:c.length)??0;(o[Oe]||(o[Oe]=[])).push(ee)}continue}}(Ue===!0||Ue.test(_))&&(Q[Ht]=_,b?(x(this,ne,Ee).call(this,a,ee,t,Q,u(k,I)),u(ee,C)["*"]&&x(this,ne,Ee).call(this,a,u(ee,C)["*"],t,Q,u(k,I))):(f(ee,I,Q),v.push(ee)))}}const T=o.shift();i=T?v.concat(T):v}return a.length>1&&a.sort((p,_)=>p.score-_.score),[a.map(({handler:p,params:_})=>[p,_])]}},me=new WeakMap,C=new WeakMap,Se=new WeakMap,qe=new WeakMap,I=new WeakMap,ne=new WeakSet,Ee=function(t,s,a,n,i){for(let r=0,o=u(s,me).length;r<o;r++){const d=u(s,me)[r],l=d[a]||d[O],c={};if(l!==void 0&&(l.params=Object.create(null),t.push(l),n!==Je||i&&i!==Je))for(let p=0,_=l.possibleKeys.length;p<_;p++){const b=l.possibleKeys[p],v=c[l.score];l.params[b]=i!=null&&i[b]&&!v?i[b]:n[b]??(i==null?void 0:i[b]),c[l.score]=!0}}},Pe),Te,ms,Ca=(ms=class{constructor(){h(this,"name","TrieRouter");y(this,Te);f(this,Te,new Ia)}add(e,t,s){const a=bs(t);if(a){for(let n=0,i=a.length;n<i;n++)u(this,Te).insert(e,a[n],s);return}u(this,Te).insert(e,t,s)}match(e,t){return u(this,Te).search(e,t)}},Te=new WeakMap,ms),A=class extends ya{constructor(e={}){super(e),this.router=e.router??new Oa({routers:[new Ra,new Ca]})}},Ba=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,zt=(e,t=La)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1].toLowerCase()];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Na={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},La=Na,Ma=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},Os={br:".br",zstd:".zst",gzip:".gz"},$a=Object.keys(Os),Fa="index.html",qa=e=>{const t=e.root??"./",s=e.path,a=e.join??Ma;return async(n,i)=>{var c,p,_,b;if(n.finalized)return i();let r;if(e.path)r=e.path;else try{if(r=hs(n.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r))throw new Error}catch{return await((c=e.onNotFound)==null?void 0:c.call(e,n.req.path,n)),i()}let o=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(o)&&(o=a(o,Fa));const d=e.getContent;let l=await d(o,n);if(l instanceof Response)return n.newResponse(l.body,l);if(l){const v=e.mimes&&zt(o,e.mimes)||zt(o);if(n.header("Content-Type",v||"application/octet-stream"),e.precompressed&&(!v||Ba.test(v))){const T=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(E=>E.trim()));for(const E of $a){if(!T.has(E))continue;const D=await d(o+Os[E],n);if(D){l=D,n.header("Content-Encoding",E),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((_=e.onFound)==null?void 0:_.call(e,o,n)),n.body(l)}await((b=e.onNotFound)==null?void 0:b.call(e,o,n)),await i()}},Pa=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e];if(!n)return null;const i=await a.get(n,{type:"stream"});return i||null},Ha=e=>async function(s,a){return qa({...e,getContent:async i=>Pa(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Ua=e=>Ha(e);const G={name:"Growth-engine365X",version:"ver1.0",tagline:"X 自動投稿プラットフォーム",longName:"X 自動投稿プラットフォーム",icon:"fa-bolt"},Wa=`
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
html,body{margin:0;padding:0;background:var(--paper);color:var(--ink);font-family:'Noto Sans JP',Inter,system-ui,sans-serif;font-size:14px;line-height:1.5;min-height:100vh}

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
.text-xs{font-size:.75rem;line-height:1rem}
.text-sm{font-size:.875rem;line-height:1.25rem}
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
  display:block;width:100%;padding:.625rem .875rem;border-radius:.5rem;
  background:#fff;border:1px solid var(--line);color:var(--ink);
  font-size:.95rem;font-family:inherit;outline:none;
  transition:border-color .15s,box-shadow .15s;
}
.inp::placeholder{color:var(--ink-faint)}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
textarea.inp{min-height:6rem;resize:vertical;line-height:1.6}
select.inp{cursor:pointer}
.input-mono{font-family:'JetBrains Mono',monospace;letter-spacing:.05em}

/* ===== ボタン ===== */
.btn{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.55rem 1rem;border-radius:.4rem;
  font-size:.92rem;font-weight:500;font-family:inherit;
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
.btn-sm{padding:.4rem .7rem;font-size:.8rem}

/* ===== カード ===== */
.card{background:#fff;border:1px solid var(--line);border-radius:.75rem;padding:1.5rem;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.card-sm{padding:1rem}

/* ===== サイドバー ===== */
aside.w-56{
  width:14rem;background:var(--sidebar);
  flex-shrink:0;display:flex;flex-direction:column;min-height:100vh;
}
.nav-item{
  display:flex;align-items:center;gap:.7rem;
  padding:.6rem .85rem;border-radius:.4rem;
  font-size:.85rem;font-weight:500;color:#A7B6CE;
  cursor:pointer;transition:background .15s,color .15s;
  margin:2px .5rem;text-decoration:none;
}
.nav-item:hover{background:var(--sidebar-hover);color:#fff}
.nav-item.active{background:var(--sidebar-active);color:#fff;box-shadow:inset 3px 0 0 #60A5FA}
.nav-item i{width:1.2rem;text-align:center;font-size:1rem;opacity:.9;flex-shrink:0}

/* ===== ラベル ===== */
.field-label{display:flex;align-items:center;gap:.4rem;font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.4rem}
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
.example-btn{display:inline-flex;align-items:center;gap:.25rem;padding:.25rem .625rem;border-radius:.25rem;background:var(--accent-light);color:var(--accent-hover);border:1px solid rgba(239,246,255,.8);font-size:.75rem;font-weight:500;font-family:inherit;cursor:pointer;transition:background .15s}
.example-btn:hover{background:rgba(37,99,235,.1)}

/* ===== セクションタイトル ===== */
.section-title{display:flex;align-items:center;gap:.6rem;font-size:1.4rem;font-weight:700;color:var(--ink);margin:0 0 .35rem}
.section-title i{color:var(--accent)}
.section-desc{font-size:.85rem;color:var(--ink-muted);margin:.25rem 0 0}

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
html, body { font-size: 14px; }

/* Tailwindレスポンシブグリッド（CDNでカバーされるが念のため） */
@media(min-width:768px){.md:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(min-width:1024px){.lg:col-span-2{grid-column:span 2/span 2}}
@media(min-width:1024px){.lg:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}

/* sr-only (アクセシビリティ) */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}

/* p-3, gap-6 */
.p-3{padding:.75rem}.gap-6{gap:1.5rem}

/* ===== 管理画面 (/admin) 専用スタイル ===== */
.bg-surface{background:#FFFFFF}
.bg-surface-raised{background:#F8FAFC}
.text-brand-400{color:#64748B}
.border-brand-800\/40{border-color:#E5E7EB}
.bg-surface-raised\/80{background:rgba(248,250,252,.95)}
.brand-logo{background:linear-gradient(135deg,#1E40AF,#2563EB)}
/* 管理画面 中央寄せ強制 + 幅を狭める */
body.admin-body{background:#F1F5F9}
body.admin-body .min-h-screen{max-width:100%;margin:0 auto}
body.admin-body header > div,
body.admin-body nav > div,
body.admin-body main{margin-left:auto!important;margin-right:auto!important;width:100%}
body.admin-body main{max-width:64rem!important;padding-left:1.5rem;padding-right:1.5rem}
body.admin-body header > div,
body.admin-body nav > div{max-width:64rem;padding-left:1.5rem;padding-right:1.5rem}
body.admin-body nav{border-bottom:1px solid #E5E7EB}
body.admin-body section{max-width:64rem;margin:0 auto}
.tab-trigger{padding:.55rem 1rem;border-radius:.4rem .4rem 0 0;font-size:.9rem;font-weight:600;color:#64748B;background:transparent;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;white-space:nowrap}
.tab-trigger:hover{color:#1E40AF;background:#F1F5F9}
.tab-trigger.active{color:#1E40AF;border-bottom-color:#2563EB;background:#EFF6FF}
.data-table{width:100%;border-collapse:collapse;font-size:.88rem}
.data-table thead th{text-align:left;padding:.7rem .85rem;background:#F1F5F9;color:#1F2937;font-weight:600;font-size:.85rem;border-bottom:1px solid #E5E7EB}
.data-table tbody td{padding:.7rem .85rem;border-bottom:1px solid #F1F5F9;color:#1F2937;vertical-align:middle}
.data-table tbody tr:hover{background:#F8FAFC}
.input-field{display:block;width:100%;padding:.5rem .75rem;border-radius:.4rem;background:#fff;border:1px solid #E5E7EB;color:#1F2937;font-size:.88rem;font-family:inherit;outline:none;transition:border-color .15s}
.input-field:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.btn-ghost.text-xs{padding:.3rem .55rem;font-size:.72rem}
/* 管理画面 .text-white を実色に */
header.bg-surface-raised\/80 .text-white{color:#1F2937}
nav.bg-surface .text-white{color:#1F2937}
section .text-white{color:#1F2937}
body.admin-body header .text-white{color:#1F2937!important}
body.admin-body h2.text-white,body.admin-body h3.text-white{color:#1F2937!important}
.hidden-force{display:none!important}
.pill-warn{background:#FEF3C7;color:#92400E;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-ok{background:#ECFDF5;color:#065F46;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-blue{background:#EFF6FF;color:#1D4ED8;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-soft{background:#F3F4F6;color:#6B7280;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}
.pill-err{background:#FEF2F2;color:#991B1B;padding:.15rem .5rem;border-radius:.25rem;font-size:.72rem;font-weight:600}

/* ===== モバイル レスポンシブ ===== */
.mobile-menu-toggle{display:none;position:fixed;top:.6rem;left:.6rem;z-index:60;background:var(--sidebar);color:#fff;border:none;border-radius:.4rem;width:2.5rem;height:2.5rem;cursor:pointer;font-size:1.1rem;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.mobile-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:45}
@media(max-width:767px){
  html,body{font-size:14px}
  .mobile-menu-toggle{display:flex;align-items:center;justify-content:center}
  aside.w-56{position:fixed;top:0;left:0;height:100vh;z-index:50;transform:translateX(-100%);transition:transform .25s ease}
  aside.w-56.is-open{transform:translateX(0)}
  body.menu-open .mobile-overlay{display:block}
  main,.flex-1{padding-left:0!important}
  main{padding-top:3.5rem!important;padding-left:.75rem!important;padding-right:.75rem!important}
  .card{padding:1rem}
  .section-title{font-size:1.15rem}
  .section-desc{font-size:.78rem}
  .grid-cols-1.md\:grid-cols-2,.grid-cols-1.md\:grid-cols-3,.grid-cols-1.md\:grid-cols-4,.grid-cols-1.md\:grid-cols-5{grid-template-columns:1fr!important}
  table.data{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .btn{padding:.55rem .8rem;font-size:.85rem}
  .inp{font-size:16px;padding:.55rem .7rem}
  /* パターン別AI生成 5カードを2列に */
  #patt-grid{grid-template-columns:repeat(2,1fr)!important}
  #voice-grid{grid-template-columns:repeat(2,1fr)!important}
}
@media(max-width:480px){
  #patt-grid,#voice-grid{grid-template-columns:1fr 1fr!important}
}

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
</style>
`,Ya="bg-paper text-ink min-h-screen font-sans antialiased";function It(e,t,s={}){return`<!DOCTYPE html>
<html lang="ja">
<head>
${Wa}
<title>${e} — ${G.name}</title>
<script>
// 早期グローバル定義: 各ページscriptで toast() を直接呼べるように
window.toast = window.toast || function(msg, kind) {
  kind = kind || 'info';
  var host = document.getElementById('toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    if (document.body) document.body.appendChild(host);
    else { document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(host); }); }
  }
  var bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
  var icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
  t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
  host.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3000);
};
window.doLogout = window.doLogout || function() {
  fetch('/api/auth/logout', { method: 'POST' }).then(function(){ location.href = '/login'; });
};
window.switchAccount = window.switchAccount || function(id) {
  if (!id) return;
  fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' }).then(function(){ location.reload(); });
};
// JST固定で datetime-local 用の値 (YYYY-MM-DDTHH:MM) を生成
// addMinutes: 何分後の時刻にするか (デフォルト0=現在のJST時刻)
// 注意: <input type="datetime-local"> はブラウザTZでvalueを解釈するため、
//       ブラウザTZがJSTでない場合は表示がズレる。本関数はブラウザTZ補正済の値を返す。
window.jstNowDatetimeLocal = function(addMinutes) {
  var nowMs = Date.now() + ((addMinutes||0) * 60 * 1000);
  // サーバー時刻オフセットがあれば補正
  if (typeof window.serverTimeOffsetMs === 'number') nowMs += window.serverTimeOffsetMs;
  var parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date(nowMs)).reduce(function(acc, p){
    acc[p.type] = p.value;
    return acc;
  }, {});
  return parts.year+'-'+parts.month+'-'+parts.day+'T'+parts.hour+':'+parts.minute;
};
// datetime-local の値 (ローカルTZで解釈される) を JST文字列に変換するヘルパー
window.datetimeLocalToJst = function(dtValue) {
  if (!dtValue) return '';
  var m = String(dtValue).trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (m) return m[1]+'-'+m[2]+'-'+m[3]+' '+m[4]+':'+m[5]+':'+(m[6]||'00');
  return String(dtValue).replace('T',' ');
};

// ★ 自動 cron キッカー: ユーザーがダッシュボードを開くたびに、裏で /cron/tick を呼ぶ
//    Cloudflare cron triggers が未設定/未稼働でも、ユーザーが画面を開けば予約投稿が実行される。
//    多数のユーザーが利用するシステムでは誰かしらがダッシュボードを開いているため、
//    実質的に常時動作する。実行頻度は1ページにつき初回(2秒後)+5分毎の間隔。
//    認証必須エンドポイントなのでログイン中のユーザーしか起動できず、安全。
window.__autoCronStart = function() {
  if (window.__autoCronStarted) return;
  window.__autoCronStarted = true;
  // ログイン画面・管理画面は除外
  var path = location.pathname;
  if (path === '/login' || path.indexOf('/admin') === 0 || path === '/') return;
  // サーバー時刻同期（ブラウザとサーバーのズレ取得）
  fetch('/api/server-time').then(function(r){ return r.json(); }).then(function(j){
    if (j && j.now_ms) {
      window.serverTimeOffsetMs = j.now_ms - Date.now();
    }
  }).catch(function(){});
  // tick 起動関数（バックグラウンド実行、結果は無視）
  var runTick = function() {
    fetch('/api/admin/cron/run-autopilot', { method:'POST', headers:{'content-type':'application/json'}, body:'{}' })
      .then(function(r){ return r.json(); })
      .catch(function(){ return {}; })
      .then(function(ap){
        var apPosted = ap && ap.post_result ? ap.post_result : null;
        if (apPosted && ((apPosted.processed||0) > 0 || (apPosted.success||0) > 0 || (apPosted.failed||0) > 0)) {
          return { success: true, result: apPosted };
        }
        return fetch('/api/admin/cron/run-tick', { method:'POST', headers:{'content-type':'application/json'}, body:'{}' });
      })
      .then(function(r){ return typeof r.json === 'function' ? r.json() : r; })
      .then(function(j){
        var res = (j && (j.post_result || j.result)) || {};
        if (j && j.success && res) {
          var processed = res.processed || 0;
          var success = res.success || 0;
          if (processed > 0 && success > 0 && typeof toast === 'function') {
            toast('予約投稿 ' + success + ' 件を実行しました', 'ok');
            setTimeout(function(){ location.reload(); }, 1200);
          }
        }
      })
      .catch(function(){});
  };
  // 初回: ページロード2秒後（描画優先）
  setTimeout(runTick, 2000);
  // Check scheduled posts often while the dashboard is open.
  setInterval(runTick, 30 * 1000);
};
// 自動起動
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ window.__autoCronStart(); });
  } else {
    window.__autoCronStart();
  }
}
// グローバル名前空間の var として再宣言（各ページ <script> から直接 toast() を呼べるよう var 宣言）
var toast = window.toast;
var doLogout = window.doLogout;
var switchAccount = window.switchAccount;
<\/script>
</head>
<body class="${s.bodyClass??Ya}">
${t}
</body>
</html>`}const js=new A;js.get("/login",e=>{const t=`
<main class="min-h-screen flex items-center justify-center px-4 py-12 bg-paper">
  <div class="w-full max-w-md">
    <!-- ブランドロゴ -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 mb-3">
        <div class="w-11 h-11 rounded-xl bg-sidebar flex items-center justify-center">
          <i class="fas ${G.icon} text-white text-xl"></i>
        </div>
        <div class="text-left">
          <div class="text-xl font-bold text-ink tracking-tight">${G.name}</div>
          <div class="text-xs text-ink-muted">${G.tagline}</div>
        </div>
      </div>
    </div>

    <!-- タブ付きカード -->
    <div class="login-card">
      <div class="flex gap-1 mb-6 p-1 bg-paper rounded-lg">
        <button onclick="showTab('login')"    id="tab-login"    class="flex-1 py-2 text-sm rounded-md bg-white text-accent shadow-sm font-semibold">ログイン</button>
        <button onclick="showTab('register')" id="tab-register" class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink">新規登録</button>
        <a href="/license" id="tab-license" class="flex-1 py-2 text-sm rounded-md text-ink-muted hover:text-ink text-center no-underline">ライセンス</a>
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
            購入者用のライセンス認証は専用画面に分けました。<br>
            <a href="/license" class="underline font-semibold">ライセンス認証画面を開く</a>
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
      © ${new Date().getFullYear()} ${G.name}
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
        trial_expired: 'トライアル期間が終了しています。管理者に連絡するか、ライセンスを更新してください',
        subscription_expired: '利用期限が終了しています。管理者に連絡してください',
        invalid_input: '入力内容を確認してください',
      };
      showError('login-error', map[j.error] || 'ログインに失敗しました');
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
    showSuccess('register-success', j.message || '無料トライアル登録を受け付けました');
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
`;return e.html(It("ログイン",t))});js.get("/license",e=>{const t=`
<main class="min-h-screen flex items-center justify-center px-4 py-12 bg-paper">
  <div class="login-card w-full max-w-md">
    <div class="text-center mb-6">
      <div class="w-14 h-14 mx-auto rounded-xl bg-accent flex items-center justify-center mb-3">
        <i class="fas fa-key text-white text-xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-ink">ライセンス認証</h1>
      <p class="text-ink-muted text-sm mt-1">購入者用の専用認証画面です。ライセンスキーで自動承認します。</p>
    </div>
    <form id="license-auto-form" class="space-y-4" onsubmit="return doLicenseAuto(event)">
      <div>
        <label class="field-label"><i class="fas fa-envelope icon-blue"></i>メールアドレス</label>
        <input type="email" id="lic-email" class="inp" required autocomplete="email">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-lock icon-yellow"></i>パスワード <span class="text-ink-faint">(8文字以上)</span></label>
        <input type="password" id="lic-password" class="inp" required minlength="8" autocomplete="new-password">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-key icon-yellow"></i>ライセンスキー</label>
        <input type="text" id="lic-key" class="inp input-mono" style="text-transform:uppercase" placeholder="VPS-GE365X-XXXXXXXX" required pattern="VPS-GE365X-[A-Za-z0-9]{6,12}">
      </div>
      <button type="submit" class="btn btn-primary w-full justify-center"><i class="fas fa-circle-check"></i>認証して開始</button>
      <div id="license-auto-error" class="text-red-600 text-xs text-center hide"></div>
      <div id="license-auto-success" class="text-emerald-700 text-xs text-center hide"></div>
    </form>
    <div class="divider"></div>
    <p class="text-center text-xs text-ink-muted"><a href="/login" class="text-accent underline">ログイン画面へ戻る</a></p>
  </div>
</main>
<script>
function licMsg(id,msg){const el=document.getElementById(id);el.textContent=msg;el.classList.remove('hide')}
async function doLicenseAuto(e){
  e.preventDefault();
  const email=document.getElementById('lic-email').value.trim();
  const password=document.getElementById('lic-password').value;
  const license_key=document.getElementById('lic-key').value.trim().toUpperCase();
  ['license-auto-error','license-auto-success'].forEach(id=>document.getElementById(id).classList.add('hide'));
  try{
    const r=await fetch('/api/auth/license/auto-activate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password,license_key})});
    const j=await r.json();
    if(!r.ok){const map={invalid_input:'入力内容を確認してください',invalid_credentials:'既存アカウントのパスワードが違います',invalid_license_format:'ライセンスキーの形式が違います',license_not_found:'ライセンスキーが見つかりません',license_inactive:'このライセンスは無効です',license_expired:'このライセンスは期限切れです',license_already_used:'このライセンスは別のアカウントで使用済みです'};licMsg('license-auto-error',map[j.error]||'認証に失敗しました');return false}
    licMsg('license-auto-success','認証が完了しました。ダッシュボードへ移動します');
    setTimeout(()=>{location.href='/dashboard'},900);
  }catch(err){licMsg('license-auto-error','通信エラー: '+err.message)}
  return false;
}
<\/script>`;return e.html(It("ライセンス認証",t))});const ie=new TextEncoder,Is=new TextDecoder;function ut(e){let t="";for(let s=0;s<e.length;s++)t+=String.fromCharCode(e[s]);return btoa(t)}function pt(e){const t=atob(e),s=new Uint8Array(t.length);for(let a=0;a<t.length;a++)s[a]=t.charCodeAt(a);return s}function St(e){return ut(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Vt(e){const t="=".repeat((4-e.length%4)%4);return pt((e+t).replace(/-/g,"+").replace(/_/g,"/"))}function Ct(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),t}const Xt=1e5,Ja=32;async function Bt(e){const t=Ct(16),s=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),a=await crypto.subtle.deriveBits({name:"PBKDF2",salt:t,iterations:Xt,hash:"SHA-256"},s,Ja*8);return`pbkdf2$${Xt}$${ut(t)}$${ut(new Uint8Array(a))}`}async function Cs(e,t){try{const[s,a,n,i]=t.split("$");if(s!=="pbkdf2")return!1;const r=parseInt(a,10),o=pt(n),d=pt(i),l=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),c=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:o,iterations:r,hash:"SHA-256"},l,d.length*8));return Ka(c,d)}catch{return!1}}function Ka(e,t){if(e.length!==t.length)return!1;let s=0;for(let a=0;a<e.length;a++)s|=e[a]^t[a];return s===0}async function Bs(e){return crypto.subtle.importKey("raw",ie.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign","verify"])}async function za(e,t,s=3600*24*7){const a=Math.floor(Date.now()/1e3),n={iat:a,exp:a+s,...e},i=St(ie.encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),r=St(ie.encode(JSON.stringify(n))),o=`${i}.${r}`,d=await Bs(t),l=new Uint8Array(await crypto.subtle.sign("HMAC",d,ie.encode(o)));return`${o}.${St(l)}`}async function Va(e,t){try{const[s,a,n]=e.split(".");if(!s||!a||!n)return null;const i=await Bs(t);if(!await crypto.subtle.verify("HMAC",i,Vt(n),ie.encode(`${s}.${a}`)))return null;const o=JSON.parse(Is.decode(Vt(a)));return o.exp&&o.exp<Math.floor(Date.now()/1e3)?null:o}catch{return null}}async function Ns(e){const t=ie.encode(e),s=t.length>=32?t.slice(0,32):new Uint8Array(await crypto.subtle.digest("SHA-256",t));return crypto.subtle.importKey("raw",s,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function _e(e,t){const s=Ct(12),a=await Ns(t),n=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:s},a,ie.encode(e))),i=new Uint8Array(s.length+n.length);return i.set(s),i.set(n,s.length),ut(i)}async function At(e,t){const s=pt(e),a=s.slice(0,12),n=s.slice(12),i=await Ns(t),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:a},i,n);return Is.decode(r)}const Gt="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function Zt(e="VPS-GE365X"){const t=Ct(8);let s="";for(let a=0;a<8;a++)s+=Gt[t[a]%Gt.length];return`${e}-${s}`}function Xa(e){return/^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(e.trim())}function g(){return new Date(Date.now()+324e5).toISOString().replace("T"," ").slice(0,19)}function Ga(e,t){const a=(e.headers.get("cookie")||"").split(";").map(n=>n.trim()).find(n=>n.startsWith(t+"="));return a?decodeURIComponent(a.slice(t.length+1)):null}function Ls(e,t,s={}){const a=[`${e}=${encodeURIComponent(t)}`];return a.push(`Path=${s.path??"/"}`),s.maxAge!==void 0&&a.push(`Max-Age=${s.maxAge}`),s.httpOnly!==!1&&a.push("HttpOnly"),s.secure!==!1&&a.push("Secure"),a.push(`SameSite=${s.sameSite??"Lax"}`),a.join("; ")}const Nt="ge365x_session";function Za(e){const t=e.req.header("Authorization")||e.req.header("authorization");return t&&t.startsWith("Bearer ")?t.slice(7):Ga(e.req.raw,Nt)}async function m(e,t){const s=Za(e);if(!s)return e.json({error:"unauthenticated"},401);const a=await Va(s,e.env.JWT_SECRET);if(!(a!=null&&a.uid))return e.json({error:"invalid_token"},401);try{const sess=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind("user_session_iat:"+a.uid).first();if(sess&&sess.value){const validFrom=parseInt(sess.value,10);if(a.iat&&a.iat<validFrom)return e.json({error:"session_replaced",message:"別の端末でログインされたためセッションが無効化されました"},401)}}catch{}const n=await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(a.uid).first();if(!n)return e.json({error:"user_not_found"},401);if(n.is_approved===0){const pre=await e.env.DB.prepare("SELECT status,current_period_end FROM user_subscriptions WHERE user_id = ?").bind(n.id).first();if(pre&&pre.status==="trial"&&(!pre.current_period_end||pre.current_period_end>=g())){await e.env.DB.prepare("UPDATE users SET is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(n.id).run();n.is_approved=1}else return e.json({error:"not_approved"},403)}const i=await e.env.DB.prepare("SELECT plan_code,status,current_period_end FROM user_subscriptions WHERE user_id = ?").bind(n.id).first();const exp=(i&&i.current_period_end)||n.trial_end||null;if(!n.is_admin&&exp&&exp<g()){try{await e.env.DB.prepare("UPDATE user_subscriptions SET status='expired', updated_at=datetime('now','+9 hours') WHERE user_id=? AND status IN ('trial','active')").bind(n.id).run()}catch{}return e.json({error:(i&&i.status)==="trial"?"trial_expired":"subscription_expired",message:"利用期限が終了しています。管理者へ連絡するか、ライセンスを更新してください。"},403)}const r={id:n.id,email:n.email,is_admin:n.is_admin===1,is_approved:n.is_approved===1,plan_code:i==null?void 0:i.plan_code,subscription_status:i==null?void 0:i.status,current_period_end:i==null?void 0:i.current_period_end,trial_end:n.trial_end};e.set("user",r),await t()}async function R(e,t){const s=e.get("user");if(!s)return e.json({error:"unauthenticated"},401);if(!s.is_admin)return e.json({error:"forbidden"},403);await t()}async function Z(e,t,s={}){const a=e.req.header("cf-connecting-ip")||e.req.header("x-forwarded-for")||"",n=e.req.header("user-agent")||"";await e.env.DB.prepare(`INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(s.userId??null,s.email??null,t,a,n,s.metadata?JSON.stringify(s.metadata):null).run()}const Qa=[{key:"dashboard",label:"ダッシュボード",icon:"fa-gauge-high",path:"/dashboard"},{key:"target",label:"ターゲット設定",icon:"fa-bullseye",path:"/dashboard/target"},{key:"voice",label:"ブランドボイス",icon:"fa-palette",path:"/dashboard/voice"},{key:"pattern",label:"パターン別AI生成",icon:"fa-wand-magic-sparkles",path:"/dashboard/pattern"},{key:"generate",label:"AI生成2",icon:"fa-pen-to-square",path:"/dashboard/generate"},{key:"posts",label:"X投稿管理",icon:"fa-brands fa-x-twitter",path:"/dashboard/posts"},{key:"thread",label:"ツリー投稿",icon:"fa-reply",path:"/dashboard/thread"},{key:"scheduled",label:"予約状況",icon:"fa-calendar",path:"/dashboard/scheduled"},{key:"autopilot",label:"オートパイロット",icon:"fa-plane-departure",path:"/dashboard/autopilot"},{key:"accounts",label:"アカウント管理",icon:"fa-users-gear",path:"/dashboard/accounts"},{key:"api",label:"API設定",icon:"fa-key",path:"/dashboard/api"},{key:"export",label:"一括ダウンロード",icon:"fa-download",path:"/dashboard/export"}];function en(e,t){return`
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${G.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${G.name}</div>
        <div class="text-[10px] text-white">${G.version}</div>
      </div>
    </div>
  </div>

  <nav class="flex-1 py-3 overflow-y-auto">
    ${Qa.map(s=>`
      <a href="${s.path}" class="nav-item ${s.key===e?"active":""}">
        <i class="fas ${s.icon}"></i>
        <span>${s.label}</span>
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
</aside>`}function tn(e,t){return`
<div class="bg-white border-b border-line px-6 py-3 flex items-center justify-between gap-4">
  <div class="flex items-center gap-3">
    <label class="text-xs text-ink-muted">現在のアカウント:</label>
    <select class="inp" style="width:auto;min-width:12rem" id="acct-sw" onchange="switchAccount(this.value)">
      ${e.length===0?'<option value="">（未登録）</option>':e.map(s=>`<option value="${s.id}" ${t===s.id?"selected":""}>@${s.x_username||s.account_name}</option>`).join("")}
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
      if (!el) return;
      // ブラウザタイムゾーン非依存のJST固定表示
      const ms = Date.now() + (9 * 60 * 60 * 1000);
      const d = new Date(ms);
      const pad = function(n){ return String(n).padStart(2,'0'); };
      const y = d.getUTCFullYear();
      const mo = pad(d.getUTCMonth()+1);
      const da = pad(d.getUTCDate());
      const h = pad(d.getUTCHours());
      const mi = pad(d.getUTCMinutes());
      const se = pad(d.getUTCSeconds());
      el.textContent = 'JST ' + y + '/' + mo + '/' + da + ' ' + h + ':' + mi + ':' + se;
    }
    updateClock();
    setInterval(updateClock, 1000);
  })();
<\/script>`}const sn=`
<div id="toast-host"></div>
<script>
  window.doLogout = function() {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => { location.href = '/login'; });
  };
  window.switchAccount = function(id) {
    if (!id) return;
    fetch('/api/admin/accounts/' + id + '/current', { method: 'POST' })
      .then(() => location.reload());
  };
  window.toast = function(msg, kind) {
    kind = kind || 'info';
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      document.body.appendChild(host);
    }
    var bg = kind === 'ok' ? '#065F46' : kind === 'err' ? '#991B1B' : '#1F2937';
    var icon = kind === 'ok' ? 'fa-check' : kind === 'err' ? 'fa-xmark' : 'fa-info-circle';
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:1rem;right:1rem;z-index:100;background:' + bg + ';color:#fff;padding:.65rem 1rem;border-radius:.45rem;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;';
    t.innerHTML = '<i class="fas ' + icon + '"></i>' + msg;
    host.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  };
<\/script>
`;function an(e){return`
${sn}
<button class="mobile-menu-toggle" onclick="(function(){var a=document.querySelector('aside.w-56');var b=document.body;a.classList.toggle('is-open');b.classList.toggle('menu-open');})()" aria-label="メニュー" type="button"><i class="fas fa-bars"></i></button>
<div class="mobile-overlay" onclick="document.querySelector('aside.w-56').classList.remove('is-open');document.body.classList.remove('menu-open');"></div>
<div class="min-h-screen flex bg-paper">
  ${en(e.active,e.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${tn(e.accounts,e.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${e.pageBody}
    </div>
  </main>
</div>

<!-- AIサポートチャットボタン -->
<button id="ai-chat-btn" type="button" onclick="aiChatToggle()" style="position:fixed;bottom:1.25rem;right:1.25rem;z-index:60;background:#2563EB;color:#fff;border:none;width:3.4rem;height:3.4rem;border-radius:50%;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,.4);font-size:1.4rem" aria-label="AIサポート"><i class="fas fa-robot"></i></button>

<!-- AIサポートチャット窓 -->
<div id="ai-chat-modal" style="display:none;position:fixed;bottom:5.25rem;right:1.25rem;z-index:65;width:22rem;max-width:calc(100vw - 2rem);max-height:32rem;background:#fff;border:1px solid var(--line);border-radius:.75rem;box-shadow:0 8px 32px rgba(0,0,0,.18);overflow:hidden;flex-direction:column">
  <div style="background:linear-gradient(135deg,#2563EB,#1E40AF);color:#fff;padding:.75rem 1rem;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:.5rem;font-weight:600"><i class="fas fa-robot"></i>AIサポート</div>
    <button onclick="aiChatToggle()" type="button" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1.1rem"><i class="fas fa-xmark"></i></button>
  </div>
  <div id="ai-chat-log" style="flex:1;overflow-y:auto;padding:.75rem;background:#F9FAFB;min-height:14rem;max-height:22rem;font-size:.85rem">
    <div style="background:#EFF6FF;color:#1E40AF;padding:.6rem .8rem;border-radius:.6rem;margin-bottom:.5rem">こんにちは！GE365xの使い方をご案内します。下の「よくある質問」から選ぶか、メッセージを直接入力してください。</div>
    <div id="ai-chat-topics" style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem"></div>
  </div>
  <div style="padding:.5rem;border-top:1px solid var(--line);display:flex;gap:.4rem">
    <input type="text" id="ai-chat-input" placeholder="質問を入力..." style="flex:1;padding:.5rem .7rem;border:1px solid var(--line);border-radius:.4rem;font-size:.85rem;outline:none" onkeydown="if(event.key==='Enter')aiChatSend()">
    <button type="button" onclick="aiChatSend()" style="background:#2563EB;color:#fff;border:none;border-radius:.4rem;padding:0 .8rem;cursor:pointer"><i class="fas fa-paper-plane"></i></button>
  </div>
</div>

<script>
window.aiChatToggle = function() {
  const m = document.getElementById('ai-chat-modal');
  const isShown = m.style.display === 'flex';
  m.style.display = isShown ? 'none' : 'flex';
  if (!isShown && !window.__aiTopicsLoaded) {
    window.__aiTopicsLoaded = true;
    fetch('/api/admin/chatbot/topics').then(r => r.json()).then(j => {
      const root = document.getElementById('ai-chat-topics');
      if (!root) return;
      root.innerHTML = (j.topics || []).map(t =>
        '<button type="button" onclick="aiChatAsk(\\''+t.title.replace(/\\'/g,'\\\\\\'')+'\\')" style="background:#fff;border:1px solid #DBEAFE;color:#1D4ED8;padding:.3rem .55rem;border-radius:.5rem;font-size:.72rem;cursor:pointer">' + t.title + '</button>'
      ).join('');
    }).catch(()=>{});
  }
};
window.aiChatAppend = function(text, isUser) {
  const log = document.getElementById('ai-chat-log');
  const div = document.createElement('div');
  div.style.cssText = isUser
    ? 'background:#2563EB;color:#fff;padding:.55rem .75rem;border-radius:.55rem;margin-bottom:.45rem;margin-left:2rem;text-align:right;white-space:pre-wrap'
    : 'background:#fff;color:#111827;border:1px solid var(--line);padding:.55rem .75rem;border-radius:.55rem;margin-bottom:.45rem;margin-right:2rem;white-space:pre-wrap';
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
};
window.aiChatAsk = async function(question) {
  aiChatAppend(question, true);
  try {
    const r = await fetch('/api/admin/chatbot/ask',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question})});
    const j = await r.json();
    aiChatAppend((j.title?'【'+j.title+'】\\n':'') + (j.answer || '回答が見つかりませんでした'), false);
  } catch(e) { aiChatAppend('通信エラー: '+e.message, false); }
};
window.aiChatSend = function() {
  const inp = document.getElementById('ai-chat-input');
  const v = inp.value.trim();
  if (!v) return;
  inp.value = '';
  aiChatAsk(v);
};
<\/script>
`;}const he=`
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>アカウントが選択されていません。<a href="/dashboard/accounts" class="underline font-semibold">アカウント管理</a>で登録してください。</div>
</div>
`;function w(e){return(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Lt(e,scheduled){const status=e||"";if(status==="approved"||status==="scheduled"||(status==="pending"&&scheduled))return'<span class="pill pill-blue">予約済</span>';return{pending:'<span class="pill pill-soft">下書き</span>',publishing:'<span class="pill pill-blue">送信中</span>',posted:'<span class="pill pill-ok">投稿済</span>',failed:'<span class="pill pill-err">失敗</span>',cancelled:'<span class="pill pill-soft">キャンセル</span>',draft:'<span class="pill pill-soft">下書き</span>'}[status]||`<span class="pill pill-soft">${status||"未投稿"}</span>`}function nn(e){const{stats:t,health:s,recentLogs:a}=e;return`
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

  <!-- 予約投稿の即時チェックボタン（誰でもワンクリックで予約処理を強制実行） -->
  <div class="card" style="background:#EFF6FF;border:1px solid #BFDBFE">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
      <div>
        <h3 class="font-bold text-ink" style="margin:0 0 .35rem 0"><i class="fas fa-bolt text-accent"></i> 予約投稿を今すぐチェック</h3>
        <p class="text-xs text-ink-muted" style="margin:0">予約時刻を過ぎた投稿が反映されない時にクリックしてください。サーバーは1分毎に自動チェックしますが、即時確認したい時に使えます。</p>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="runCronTickNow(this)"><i class="fas fa-play"></i>X投稿を今すぐチェック</button>
        <button class="btn btn-ghost" onclick="runCronAutopilotNow(this)"><i class="fas fa-plane"></i>オートパイロットを今すぐチェック</button>
      </div>
    </div>
    <div id="cron-result" style="margin-top:.6rem;font-size:.85rem"></div>
  </div>

  <script>
  window.runCronTickNow = async function(btn) {
    const out = document.getElementById('cron-result');
    if (btn) btn.disabled = true;
    out.innerHTML = '<span style="color:#6B7280"><i class="fas fa-spinner fa-spin"></i> 実行中...</span>';
    try {
      const r = await fetch('/api/admin/cron/run-tick', {method:'POST'});
      const j = await r.json();
      if (j.success) {
        const res = j.result || {};
        out.innerHTML = '<span style="color:#059669"><i class="fas fa-check"></i> 完了: 処理 ' + (res.processed||0) + ' 件 / 成功 ' + (res.success||0) + ' 件 / 失敗 ' + (res.failed||0) + ' 件</span>';
        toast('予約投稿チェック完了 (成功 ' + (res.success||0) + ' 件)','ok');
        if ((res.success||0) > 0) setTimeout(()=>location.reload(), 1500);
      } else {
        out.innerHTML = '<span style="color:#dc2626"><i class="fas fa-xmark"></i> 失敗: ' + (j.error||'unknown') + '</span>';
        toast('チェック失敗','err');
      }
    } catch(e) {
      out.innerHTML = '<span style="color:#dc2626">エラー: ' + e.message + '</span>';
    } finally {
      if (btn) btn.disabled = false;
    }
  };
  window.runCronAutopilotNow = async function(btn) {
    const out = document.getElementById('cron-result');
    if (btn) btn.disabled = true;
    out.innerHTML = '<span style="color:#6B7280"><i class="fas fa-spinner fa-spin"></i> 実行中...</span>';
    try {
      const r = await fetch('/api/admin/cron/run-autopilot', {method:'POST'});
      const j = await r.json();
      if (j.success) {
        const gen = j.result || {};
        const res = j.post_result || {};
        out.innerHTML = '<span style="color:#059669"><i class="fas fa-check"></i> オートパイロット完了: 生成 ' + (gen.generated||0) + ' 件 / 投稿処理 ' + (res.processed||0) + ' 件 / 成功 ' + (res.success||0) + ' 件 / 失敗 ' + (res.failed||0) + ' 件</span>';
        toast('オートパイロットチェック完了','ok');
        if ((res.success||0) > 0) setTimeout(()=>location.reload(), 1500);
      } else {
        out.innerHTML = '<span style="color:#dc2626"><i class="fas fa-xmark"></i> 失敗: ' + (j.error||'unknown') + '</span>';
      }
    } catch(e) {
      out.innerHTML = '<span style="color:#dc2626">エラー: ' + e.message + '</span>';
    } finally {
      if (btn) btn.disabled = false;
    }
  };
  </script>

  <div class="grid grid-cols-1 gap-4">
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-clock-rotate-left text-accent"></i> 直近の投稿ログ</h3>
      ${a.length===0?`
        <div class="text-ink-muted text-sm text-center py-6">投稿ログなし</div>
      `:a.map(n=>`
        <div class="py-2 border-b border-line/50 last:border-0">
          <div class="text-sm text-ink truncate">${w((n.content||"").slice(0,80))}...</div>
          <div class="text-xs text-ink-muted mt-0.5">@${w(n.x_username||"-")} · ${n.posted_at||"-"}</div>
        </div>
      `).join("")}
    </div>
  </div>
</div>`}function rn(e){const t=e.target||{};return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-bullseye"></i>ターゲット設定</h1>
    <p class="section-desc">投稿のターゲット読者を設定します。AI生成時に自動でプロンプトに注入されます。</p>
  </div>
  
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-ink">ターゲットテンプレート</h3>
      <button class="example-btn" onclick="fillTargetExample()"><i class="fas fa-pencil"></i>使用例</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:.75rem">
      <div>
        <label class="field-label"><i class="fas fa-child icon-purple"></i>年齢層</label>
        <input type="text" id="tg-age" class="inp" value="${w(t.age_range)}" placeholder="例: 25~40代">
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
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-briefcase icon-yellow"></i>職業</label>
      <input type="text" id="tg-occ" class="inp" value="${w(t.occupation)}" placeholder="例: 会社員 / フリーランス">
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>痛み・悩み</label>
      <textarea id="tg-pains" class="inp" rows="3" style="min-height:5rem" placeholder="読者が抱えている具体的な悩み・痛みを書く">${w(t.pains)}</textarea>
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>欲求・願望</label>
      <textarea id="tg-desires" class="inp" rows="3" style="min-height:5rem" placeholder="読者が「こうなりたい」と思っている理想像">${w(t.desires)}</textarea>
    </div>
    <div class="mb-3">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>行動トリガー（反応するきっかけ）</label>
      <textarea id="tg-trigger" class="inp" rows="3" style="min-height:5rem" placeholder="この読者がアクションを起こす瞬間・キーワード">${w(t.purchase_triggers)}</textarea>
    </div>
    <div style="display:flex;align-items:center;gap:.5rem;padding-top:.5rem">
      <button class="btn btn-primary" onclick="saveTarget()" style="padding:.85rem 2.5rem;font-size:1rem;font-weight:700"><i class="fas fa-save"></i>保存</button>
      <span id="tg-msg" class="text-xs"></span>
    </div>
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
<\/script>`}function on(e){const t=e.voice||{},s=[{k:"authority",l:"権威型",sub:"専門家として断定",t:"専門家として断定的に、簡潔に、根拠を示して書く。",icon:"fa-user-tie"},{k:"empathy",l:"共感型",sub:"寄り添う",t:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。",icon:"fa-heart"},{k:"provocative",l:"煽り型",sub:"危機感を訴く",t:"問題を鋭く突き、危機感を持たせる書き方にする。",icon:"fa-bolt"},{k:"story",l:"ストーリー型",sub:"物語で伝える",t:"体験談や変化の流れを感じさせる構成で書く。",icon:"fa-book-open"},{k:"problem_raise",l:"問題提起型",sub:"課題から提示",t:"最初に課題を提示し、その原因と解決策を示す。",icon:"fa-circle-question"}];const cur=t.voice_key||"authority";return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>ブランドボイス</h1>
    <p class="section-desc">5つのボイススタイルから選んでください。AI生成時にトーンとして注入されます。</p>
  </div>

  <div class="card space-y-4">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem" id="voice-grid">
      ${s.map(a=>`
        <div onclick="selectVoice(this,'${a.k}','${a.t.replace(/'/g,"\\'")}')" data-val="${a.k}"
          style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1.1rem .5rem;border:2px solid ${cur===a.k?"var(--accent, #2563EB)":"var(--line)"};border-radius:.625rem;cursor:pointer;background:${cur===a.k?"var(--accent-light, #EFF6FF)":"#fff"};color:${cur===a.k?"var(--accent, #2563EB)":"var(--ink)"};transition:all .15s;text-align:center">
          <i class="fas ${a.icon}" style="font-size:1.35rem"></i>
          <span style="font-size:.85rem;font-weight:700;line-height:1.2">${a.l}</span>
          <span style="font-size:.7rem;color:#6B7280;font-weight:400">${a.sub}</span>
        </div>
      `).join("")}
    </div>
    <input type="hidden" id="vc-key" value="${cur}">

    <div>
      <label class="field-label">口調</label>
      <input type="text" id="vc-tone" class="inp" value="${w(t.tone)}" placeholder="例: 専門家として断定的に、簡潔に、根拠を示して書く">
    </div>
    <div>
      <label class="field-label">世界観</label>
      <textarea id="vc-world" class="inp" placeholder="あなたが見ている世界、伝えたい価値観">${w(t.worldview)}</textarea>
    </div>
    <div>
      <label class="field-label">個人ストーリー（任意）</label>
      <textarea id="vc-story" class="inp" placeholder="過去の体験や転機。AI が自然に織り交ぜます">${w(t.personal_story)}</textarea>
    </div>
    <div>
      <label class="field-label">禁止ワード（改行区切り）</label>
      <textarea id="vc-ng" class="inp" placeholder="絶対に使わないワード">${w(t.prohibited_words)}</textarea>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;padding-top:.5rem">
      <button class="btn btn-primary" onclick="saveVoice()" style="padding:.85rem 2.5rem;font-size:1rem;font-weight:700"><i class="fas fa-save"></i>保存</button>
      <span id="vc-msg" style="font-size:.85rem;align-self:center"></span>
    </div>
  </div>
</div>
<script>
function selectVoice(el, key, tone) {
  document.querySelectorAll('#voice-grid > div').forEach(d => {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
  });
  el.style.borderColor = 'var(--accent, #2563EB)';
  el.style.background = 'var(--accent-light, #EFF6FF)';
  el.style.color = 'var(--accent, #2563EB)';
  document.getElementById('vc-key').value = key;
  if (tone && !document.getElementById('vc-tone').value.trim()) {
    document.getElementById('vc-tone').value = tone;
  }
}
window.selectVoice = selectVoice;

async function saveVoice() {
  const body = {
    voice_key: document.getElementById('vc-key').value,
    tone: document.getElementById('vc-tone').value,
    worldview: document.getElementById('vc-world').value,
    personal_story: document.getElementById('vc-story').value,
    prohibited_words: document.getElementById('vc-ng').value,
  };
  const r = await fetch('/api/admin/voice', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
  const j = await r.json();
  const msg = document.getElementById('vc-msg');
  if (j.success) { msg.textContent = '✓ 保存しました'; msg.style.color = '#059669'; toast('保存しました','ok'); }
  else { msg.textContent = '✗ 保存失敗'; msg.style.color = '#dc2626'; toast('保存失敗','err'); }
}
window.saveVoice = saveVoice;
<\/script>`}function dn(e){var s,a,n;const t=[["problem","問題提起型","fa-circle-question","痛みを突く"],["before_after","ビフォーアフター型","fa-right-left","変化を見せる"],["contrarian","逆張り型","fa-rotate-left","常識を覆す"],["howto","HowTo実演型","fa-list-ol","手順で見せる"],["numbers","数字インパクト型","fa-hashtag","数字で訴く"]];return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-wand-magic-sparkles"></i>パターン別AI生成</h1>
    <p class="section-desc">5つの投稿パターンから選んでAI生成。生成後の各カードに画像・動画を個別設定して投稿。</p>
  </div>

  <div class="card space-y-4">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem" id="patt-grid">
      ${t.map(([i,r,o,p],d)=>`
        <div onclick="selectPatt(this,'${i}')" data-val="${i}"
          style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;padding:1.1rem .5rem;border:2px solid ${d===0?"var(--accent, #2563EB)":"var(--line)"};border-radius:.625rem;cursor:pointer;background:${d===0?"var(--accent-light, #EFF6FF)":"#fff"};color:${d===0?"var(--accent, #2563EB)":"var(--ink)"};transition:all .15s;text-align:center">
          <i class="fas ${o}" style="font-size:1.35rem"></i>
          <span style="font-size:.85rem;font-weight:700;line-height:1.2">${r}</span>
          <span style="font-size:.7rem;color:#6B7280;font-weight:400">${p}</span>
        </div>
      `).join("")}
    </div>
    <input type="hidden" id="patt-val" value="problem">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="field-label">テーマ <span style="color:#dc2626">*</span></label>
        <input type="text" id="pa-theme" class="inp" placeholder="例: AI自動化で1日15分運用">
      </div>
      <div>
        <label class="field-label">キーワード</label>
        <input type="text" id="pa-kw" class="inp" placeholder="例: AI, 自動化, 時短, 仕組み">
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:.75rem">
      <label class="field-label" style="margin:0">生成数</label>
      <select id="pa-count" class="inp" style="width:6rem">
        <option value="1">1件</option><option value="2">2件</option><option value="3" selected>3件</option><option value="4">4件</option><option value="5">5件</option><option value="6">6件</option><option value="7">7件</option><option value="8">8件</option><option value="9">9件</option><option value="10">10件</option>
      </select>
    </div>

    <div style="border:1px solid var(--line);border-radius:.5rem;padding:1rem;background:var(--paper-soft)">
      <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem"><i class="fas fa-sliders"></i> 投稿オプション</div>
      <div class="space-y-3">
        <div>
          <label class="field-label">投稿末尾の追記（任意）</label>
          <input type="text" id="pa-footer" class="inp" placeholder="例: 詳しくはプロフリンクから👇">
        </div>
        <div>
          <label class="field-label">URL（任意）</label>
          <input type="url" id="pa-link" class="inp" placeholder="https://">
        </div>
        <div>
          <label class="field-label">本文モード</label>
          <div style="display:flex;gap:1.5rem;margin-top:.25rem">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="pa-mode" value="body" checked><span style="font-size:.9rem">本文（生成そのまま）</span></label>
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="pa-mode" value="140"><span style="font-size:.9rem">140文字以内</span></label>
          </div>
        </div>
      </div>
    </div>

    <input type="hidden" id="pa-tag" value="">

    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" style="flex:1;justify-content:center;padding:.75rem" onclick="doPatternGenerate()"><i class="fas fa-wand-magic-sparkles"></i>選択パターンでAI生成</button>
      <button class="btn btn-ghost" onclick="paSaveDraft()"><i class="fas fa-floppy-disk"></i>下書き保存</button>
      <button class="btn btn-ghost" onclick="paLoadDraft()"><i class="fas fa-folder-open"></i>下書き再開</button>
    </div>
  </div>

  <div id="pa-results"></div>
</div>
<script>
function selectPatt(el, val) {
  document.querySelectorAll('#patt-grid > div').forEach(d => {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
    d.dataset.selected = '0';
  });
  el.style.borderColor = 'var(--accent, #2563EB)';
  el.style.background = 'var(--accent-light, #EFF6FF)';
  el.style.color = 'var(--accent, #2563EB)';
  el.dataset.selected = '1';
  document.getElementById('patt-val').value = val;
}
window.selectPatt = selectPatt;

function paResultCardHtml(g) {
  const id = g.id;
  const body = (g.body || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const patt = g.pattern_type || '';
  const pattLabels = {problem:'問題提起型',before_after:'ビフォーアフター型',contrarian:'逆張り型',howto:'HowTo実演型',numbers:'数字インパクト型'};
  const pattLabel = pattLabels[patt] || patt || '';
  return '<div class="card card-sm" id="pa-card-'+id+'" data-pid="'+id+'" style="margin-bottom:.75rem;padding:1rem;border:1px solid var(--line);border-radius:.5rem;background:#fff">' +
    (pattLabel?'<div style="font-size:.7rem;color:#2563EB;background:#EFF6FF;display:inline-block;padding:.15rem .5rem;border-radius:.25rem;margin-bottom:.5rem;font-weight:600">'+pattLabel+'</div>':'') +
    '<div class="whitespace-pre-line text-sm leading-relaxed text-ink" style="white-space:pre-line">' + body + '</div>' +
    '<div class="text-xs text-ink-muted mt-2">' + (g.body||'').length + ' 文字</div>' +
    '<div id="pa-media-'+id+'" style="margin-top:.5rem;display:flex;gap:.25rem;flex-wrap:wrap"></div>' +
    '<div style="display:flex;gap:.4rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'image\\')"><i class="fas fa-image"></i>画像</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'video\\')"><i class="fas fa-film"></i>動画</button>' +
      '<input type="datetime-local" id="pa-sched-'+id+'" class="inp" style="width:13rem;padding:.4rem .5rem;font-size:.85rem">' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paSchedule('+id+')"><i class="fas fa-calendar-plus"></i>日時予約</button>' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paPostNow('+id+')" style="background:#059669;border-color:#059669"><i class="fa-brands fa-x-twitter"></i>今すぐ投稿</button>' +
      '<span id="pa-status-'+id+'" class="text-xs"></span>' +
    '</div>' +
  '</div>';
}
window.paResultCardHtml = paResultCardHtml;

window.paAttachedMedia = window.paAttachedMedia || {};

function paRenderMedia(pid) {
  const el = document.getElementById('pa-media-'+pid); if (!el) return;
  const arr = window.paAttachedMedia[pid] || [];
  el.innerHTML = arr.map(m =>
    '<div style="display:flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem">' +
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>' +
      '<span style="max-width:10rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>' +
      '<button type="button" onclick="paRemoveMedia('+pid+','+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>' +
    '</div>'
  ).join('');
}
window.paRenderMedia = paRenderMedia;

window.paRemoveMedia = function(pid, mid) {
  const arr = window.paAttachedMedia[pid] || [];
  window.paAttachedMedia[pid] = arr.filter(m => m.id !== mid);
  paRenderMedia(pid);
  paSyncMediaToPost(pid);
};

async function paSyncMediaToPost(pid) {
  const arr = window.paAttachedMedia[pid] || [];
  const ids = arr.map(m => m.id);
  await fetch('/api/admin/posts/'+pid+'/attach-media', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({media_ids: ids})
  });
}
window.paSyncMediaToPost = paSyncMediaToPost;

window.paAttachImageUrl = function(pid) {
  const u = prompt('画像のURLを入力してください'); if (!u) return;
  paAddRemoteMedia(pid, u, 'image');
};
window.paAttachVideoUrl = function(pid) {
  const u = prompt('動画のURLを入力してください'); if (!u) return;
  paAddRemoteMedia(pid, u, 'video');
};
window.paAttachAny = async function(pid, kind) {
  window.paAttachedMedia = window.paAttachedMedia || {};
  window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
  if (window.paAttachedMedia[pid].length >= 4) { toast('添付は最大4件まで','err'); return; }
  // フォルダを直接開く（ファイルピッカー）
  if (kind === 'image') paAttachImageFile(pid);
  else paAttachVideoFile(pid);
};
async function paAddRemoteMedia(pid, url, ftype) {
  try {
    const r = await fetch('/api/admin/media/url', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({url, file_type: ftype})
    });
    const j = await r.json();
    if (!j.success) { toast('登録失敗: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
    if (window.paAttachedMedia[pid].length >= 4) { toast('添付は最大4件まで','err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: ftype, name: url.split('/').pop()||'remote'});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast('添付しました','ok');
  } catch (e) { toast('エラー: '+e.message,'err'); }
}

function paPickFile(accept) {
  return new Promise(res => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = accept;
    inp.onchange = () => res(inp.files && inp.files[0] || null);
    inp.click();
  });
}
window.paAttachImageFile = async function(pid) {
  const f = await paPickFile('image/*'); if (!f) return;
  paUploadFile(pid, f, 'image');
};
window.paAttachVideoFile = async function(pid) {
  const f = await paPickFile('video/*'); if (!f) return;
  paUploadFile(pid, f, 'video');
};
async function paUploadFile(pid, file, ftype) {
  try {
    const fd = new FormData(); fd.append('file', file);
    toast('アップロード中...','info');
    const r = await fetch('/api/admin/media', {method:'POST', body: fd});
    const j = await r.json();
    if (!j.success) { toast('アップロード失敗: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
    if (window.paAttachedMedia[pid].length >= 4) { toast('添付は最大4件まで','err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: ftype, name: file.name});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast('添付しました','ok');
  } catch (e) { toast('エラー: '+e.message,'err'); }
}

window.paSchedule = async function(pid) {
  const dt = document.getElementById('pa-sched-'+pid).value;
  if (!dt) { toast('予約日時を入力してください','err'); return; }
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '予約中...'; stEl.style.color='#6B7280';
  await paSyncMediaToPost(pid);
  const scheduledAt = datetimeLocalToJst(dt);
  const r = await fetch('/api/admin/posts/'+pid+'/schedule', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({scheduled_at: scheduledAt})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='予約完了 ('+(j.effective_scheduled_at||scheduledAt)+')'; stEl.style.color='#059669'; toast('予約完了','ok'); }
  else { stEl.textContent='失敗: '+(j.error||''); stEl.style.color='#dc2626'; toast('予約失敗: '+(j.error||''),'err'); }
};

window.paPostNow = async function(pid) {
  if (!confirm('この投稿を今すぐXに投稿しますか？')) return;
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '投稿中...'; stEl.style.color='#6B7280';
  await paSyncMediaToPost(pid);
  const r = await fetch('/api/admin/posts/'+pid+'/post-now', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='投稿完了 (ID:'+(j.tweet_id||'-')+')'; stEl.style.color='#059669'; toast('投稿しました','ok'); }
  else { stEl.textContent='失敗: '+(j.error||''); stEl.style.color='#dc2626'; toast('投稿失敗: '+(j.error||''),'err'); }
};

async function doPatternGenerate_legacy_unused() { /* removed */ }

function paSaveDraft() {
  const draft = {
    pattern: document.getElementById('patt-val').value,
    theme: document.getElementById('pa-theme').value,
    kw: document.getElementById('pa-kw').value,
    count: document.getElementById('pa-count').value,
    footer: document.getElementById('pa-footer') ? document.getElementById('pa-footer').value : '',
    link: document.getElementById('pa-link').value,
    mode: (document.querySelector('input[name="pa-mode"]:checked')||{}).value || 'body',
  };
  try { sessionStorage.setItem('pa_draft', JSON.stringify(draft)); toast('下書きを保存しました','ok'); }
  catch(e) { toast('保存失敗: '+e.message,'err'); }
}
window.paSaveDraft = paSaveDraft;
function paLoadDraft() {
  try {
    const raw = sessionStorage.getItem('pa_draft');
    if (!raw) { toast('保存された下書きがありません','info'); return; }
    const d = JSON.parse(raw);
    if (d.theme) document.getElementById('pa-theme').value = d.theme;
    if (d.kw) document.getElementById('pa-kw').value = d.kw;
    if (d.count) document.getElementById('pa-count').value = d.count;
    if (d.footer && document.getElementById('pa-footer')) document.getElementById('pa-footer').value = d.footer;
    if (d.link) document.getElementById('pa-link').value = d.link;
    if (d.mode) {
      const r = document.querySelector('input[name="pa-mode"][value="'+d.mode+'"]');
      if (r) r.checked = true;
    }
    if (d.pattern) {
      const cell = document.querySelector('#patt-grid > div[data-val="'+d.pattern+'"]');
      if (cell) selectPatt(cell, d.pattern);
    }
    toast('下書きを再開しました','ok');
  } catch(e) { toast('読込失敗: '+e.message,'err'); }
}
window.paLoadDraft = paLoadDraft;

async function doPatternGenerate() {
  const patt = document.getElementById('patt-val').value;
  const theme = document.getElementById('pa-theme').value.trim();
  if (!theme) { toast('テーマを入力してください', 'err'); return; }
  const cntVal = parseInt(document.getElementById('pa-count').value, 10) || 1;
  const cnt = Math.min(Math.max(cntVal, 1), 10);
  const modeEl = document.querySelector('input[name="pa-mode"]:checked');
  const postMode = modeEl ? modeEl.value : 'body';
  const footer = document.getElementById('pa-footer') ? document.getElementById('pa-footer').value : '';
  const body = {
    theme,
    keywords: document.getElementById('pa-kw').value,
    pattern_type: patt,
    post_mode: postMode,
    link_url: document.getElementById('pa-link').value,
    hashtags: document.getElementById('pa-tag').value,
    footer: footer,
    count: cnt,
  };
  const root = document.getElementById('pa-results');
  root.innerHTML = '<div class="text-sm text-ink-muted" style="padding:.5rem"><i class="fas fa-spinner fa-spin"></i> 生成中... ('+cnt+'件)</div>';
  try {
    const r = await fetch('/api/admin/posts/generate', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
    const j = await r.json();
    if (!j.success) { root.innerHTML='<div class="text-sm" style="color:#dc2626;padding:.5rem">生成失敗: ' + (j.error || '') + '</div>'; toast('生成失敗: ' + (j.error || ''), 'err'); return; }
    root.innerHTML = '<div class="mt-4"><h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-check text-emerald-600"></i> 生成結果 ' + j.generated.length + '件</h3><div>' +
      j.generated.map(g => paResultCardHtml(Object.assign({pattern_type: patt}, g))).join('') +
    '</div></div>';
    toast(j.generated.length + '件生成しました', 'ok');
  } catch(e) {
    root.innerHTML='<div class="text-sm" style="color:#dc2626;padding:.5rem">エラー: '+e.message+'</div>';
    toast('エラー: '+e.message,'err');
  }
}
window.doPatternGenerate = doPatternGenerate;
<\/script>`}function ln(e){return`
<div class="space-y-4">
  
  <div>
    <h1 class="section-title"><i class="fas fa-pen-to-square"></i>AI生成2</h1>
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
        <option value="1">1件</option><option value="2">2件</option><option value="3" selected>3件</option><option value="4">4件</option><option value="5">5件</option><option value="6">6件</option><option value="7">7件</option><option value="8">8件</option><option value="9">9件</option><option value="10">10件</option>
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
// AI生成2 でも paResultCardHtml/paAttachAny等を使うため、最小限の関数を定義
window.paAttachedMedia = window.paAttachedMedia || {};
function paResultCardHtml(g) {
  const id = g.id;
  const body = (g.body || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const patt = g.pattern_type || '';
  const pattLabels = {problem:'問題提起型',before_after:'ビフォーアフター型',contrarian:'逆張り型',howto:'HowTo実演型',numbers:'数字インパクト型'};
  const pattLabel = pattLabels[patt] || patt || '';
  return '<div class="card card-sm" id="pa-card-'+id+'" data-pid="'+id+'" style="margin-bottom:.75rem;padding:1rem;border:1px solid var(--line);border-radius:.5rem;background:#fff">' +
    (pattLabel?'<div style="font-size:.7rem;color:#2563EB;background:#EFF6FF;display:inline-block;padding:.15rem .5rem;border-radius:.25rem;margin-bottom:.5rem;font-weight:600">'+pattLabel+'</div>':'') +
    '<div class="whitespace-pre-line text-sm leading-relaxed text-ink" style="white-space:pre-line">' + body + '</div>' +
    '<div class="text-xs text-ink-muted mt-2">' + (g.body||'').length + ' 文字</div>' +
    '<div id="pa-media-'+id+'" style="margin-top:.5rem;display:flex;gap:.25rem;flex-wrap:wrap"></div>' +
    '<div style="display:flex;gap:.4rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'image\\')"><i class="fas fa-image"></i>画像</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" onclick="paAttachAny('+id+',\\'video\\')"><i class="fas fa-film"></i>動画</button>' +
      '<input type="datetime-local" id="pa-sched-'+id+'" class="inp" style="width:13rem;padding:.4rem .5rem;font-size:.85rem">' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paSchedule('+id+')"><i class="fas fa-calendar-plus"></i>日時予約</button>' +
      '<button class="btn btn-primary btn-sm" type="button" onclick="paPostNow('+id+')" style="background:#059669;border-color:#059669"><i class="fa-brands fa-x-twitter"></i>今すぐ投稿</button>' +
      '<span id="pa-status-'+id+'" class="text-xs"></span>' +
    '</div>' +
  '</div>';
}
function paRenderMedia(pid) {
  const el = document.getElementById('pa-media-'+pid); if (!el) return;
  const arr = window.paAttachedMedia[pid] || [];
  el.innerHTML = arr.map(m =>
    '<div style="display:flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem">' +
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>' +
      '<span style="max-width:10rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>' +
      '<button type="button" onclick="paRemoveMedia('+pid+','+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>' +
    '</div>'
  ).join('');
}
window.paRemoveMedia = function(pid, mid) {
  const arr = window.paAttachedMedia[pid] || [];
  window.paAttachedMedia[pid] = arr.filter(m => m.id !== mid);
  paRenderMedia(pid);
  paSyncMediaToPost(pid);
};
async function paSyncMediaToPost(pid) {
  const arr = window.paAttachedMedia[pid] || [];
  const ids = arr.map(m => m.id);
  await fetch('/api/admin/posts/'+pid+'/attach-media', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({media_ids: ids})
  });
}
window.paAttachAny = async function(pid, kind) {
  window.paAttachedMedia[pid] = window.paAttachedMedia[pid] || [];
  if (window.paAttachedMedia[pid].length >= 4) { toast('添付は最大4件まで','err'); return; }
  // フォルダを直接開く（ファイルピッカー）
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('アップロード中...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('アップロード失敗: '+(j.error||''),'err'); return; }
    window.paAttachedMedia[pid].push({id: j.id, type: kind, name: f.name});
    paRenderMedia(pid);
    await paSyncMediaToPost(pid);
    toast(kind==='image'?'画像を添付しました':'動画を添付しました','ok');
  };
  inp.click();
};
window.paSchedule = async function(pid) {
  const dt = document.getElementById('pa-sched-'+pid).value;
  if (!dt) { toast('予約日時を入力してください','err'); return; }
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '予約中...'; stEl.style.color='#6B7280';
  const scheduledAt = datetimeLocalToJst(dt);
  const r = await fetch('/api/admin/posts/'+pid+'/schedule', {
    method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({scheduled_at: scheduledAt})
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='予約完了'; stEl.style.color='#059669'; toast('予約完了','ok'); }
  else { stEl.textContent='失敗: '+(j.error||''); stEl.style.color='#dc2626'; toast('予約失敗','err'); }
};
window.paPostNow = async function(pid) {
  if (!confirm('この投稿を今すぐXに投稿しますか？')) return;
  const stEl = document.getElementById('pa-status-'+pid);
  stEl.textContent = '投稿中...'; stEl.style.color='#6B7280';
  const r = await fetch('/api/admin/posts/'+pid+'/post-now', {
    method:'POST', headers:{'content-type':'application/json'}, body:'{}'
  });
  const j = await r.json();
  if (j.success) { stEl.textContent='投稿完了'; stEl.style.color='#059669'; toast('投稿しました','ok'); }
  else { stEl.textContent='失敗: '+(j.error||''); stEl.style.color='#dc2626'; toast('投稿失敗: '+(j.error||''),'err'); }
};

async function doGen2() {
  const prompt = document.getElementById('ge-prompt').value.trim();
  if (!prompt) { toast('プロンプトを入力してください','err'); return; }
  const count = parseInt(document.getElementById('ge-count').value, 10) || 3;
  const mode = document.querySelector('input[name="ge-mode"]:checked').value;
  const footer = document.getElementById('ge-footer').value;
  const url = document.getElementById('ge-url').value;
  const root = document.getElementById('ge-results');
  root.innerHTML = '<div class="text-sm text-ink-muted" style="padding:.5rem"><i class="fas fa-spinner fa-spin"></i> 生成中... ('+count+'件)</div>';
  try {
    const r = await fetch('/api/admin/posts/generate', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ theme: prompt, count, post_mode: mode, footer_text: footer, link_url: url }),
    });
    const j = await r.json();
    if (!j.success) { root.innerHTML = '<div style="color:#dc2626;padding:.5rem">生成失敗: '+(j.error||'')+'</div>'; toast('生成失敗: ' + (j.error||''),'err'); return; }
    root.innerHTML = '<div class="mt-4"><h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-check text-emerald-600"></i> 生成結果 '+j.generated.length+'件</h3><div>' +
      j.generated.map(g => (typeof paResultCardHtml==='function' ? paResultCardHtml(g) : '<div class="card card-sm"><div class="whitespace-pre-line text-sm text-ink">' + (g.body||'').replace(/</g,'&lt;') + '</div></div>')).join('') +
    '</div></div>';
    toast(j.generated.length + '件生成しました','ok');
  } catch(e) {
    root.innerHTML = '<div style="color:#dc2626;padding:.5rem">エラー: '+e.message+'</div>';
    toast('エラー: '+e.message,'err');
  }
}
<\/script>`}function cn(e){const{month:t,y:s,m:a,posts:n,stats:i}=e;return`
<div class="space-y-4">
  
  <div>
    <h1 class="section-title"><i class="fa-brands fa-x-twitter"></i>X投稿管理</h1>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost" onclick="navMonth(-1)"><i class="fas fa-chevron-left"></i></button>
      <span class="text-lg font-bold text-ink px-2">${s}年 ${a}月</span>
      <button class="btn btn-ghost" onclick="navMonth(1)"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-primary btn-sm" onclick="thisMonth()">当月</button>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary" onclick="openSchedModal()"><i class="fas fa-plus"></i>新規予約投稿</button>
      <button class="btn btn-ghost" onclick="dlExportPosts()" title="投稿データをCSVダウンロード"><i class="fas fa-download"></i>CSV</button>
      <button class="btn btn-danger" onclick="bulkDel()" id="bulk-del-btn" disabled><i class="fas fa-trash"></i>一括削除</button>
    </div>
  </div>
  <div class="flex items-center gap-6 text-sm">
    <div>合計: <span class="font-bold">${i.total}件</span></div>
    <div>投稿済: <span class="font-bold text-emerald-600">${i.posted}件</span></div>
    <div>未投稿: <span class="font-bold text-amber-600">${i.pending}件</span></div>
    <div>下書き: <span class="font-bold text-ink-muted">${i.draft||0}件</span></div>
    <div>予約済: <span class="font-bold text-blue-600">${i.scheduled||0}件</span></div>
    <div>失敗: <span class="font-bold text-red-600">${i.failed}件</span></div>
  </div>
  <div style="display:flex;gap:.4rem;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:.5rem">
    <button type="button" class="btn btn-sm xst-tab xst-active" data-st="all" onclick="filterPosts(this,'all')"><i class="fas fa-list"></i>すべて</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="posted" onclick="filterPosts(this,'posted')"><i class="fas fa-check"></i>投稿済</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="pending" onclick="filterPosts(this,'pending')"><i class="fas fa-clock"></i>未投稿</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="draft" onclick="filterPosts(this,'draft')"><i class="fas fa-file-pen"></i>下書き</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="scheduled" onclick="filterPosts(this,'scheduled')"><i class="fas fa-calendar-check"></i>予約済</button>
    <button type="button" class="btn btn-sm xst-tab" data-st="failed" onclick="filterPosts(this,'failed')"><i class="fas fa-triangle-exclamation"></i>失敗</button>
    <style>.xst-tab{background:#fff;border:1px solid var(--line);color:var(--ink-muted)}.xst-tab.xst-active{background:var(--accent);color:#fff;border-color:var(--accent)}</style>
  </div>
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr>
        <th style="width:40px"><input type="checkbox" onchange="checkAll(this.checked)"></th>
        <th>ID</th><th>本文</th><th>モード</th><th>予約日時</th><th>状態</th><th>アカウント</th><th></th>
      </tr></thead>
      <tbody>
        ${n.length===0?'<tr><td colspan="8" class="text-center text-ink-muted py-10">この月の投稿データがありません</td></tr>':n.map(r=>`
            <tr data-status="${r.status||""}" data-scheduled="${r.scheduled_at?"1":"0"}" class="post-row">
              <td><input type="checkbox" class="post-chk" value="${r.id}" onchange="updateBulk()"></td>
              <td class="font-mono text-xs text-ink-faint">${r.id}</td>
              <td style="max-width:44rem;white-space:normal;word-break:break-word"><div>${w((r.body||"").slice(0,120))}</div>${r.error_message?`<div class="text-xs" style="color:#b91c1c;margin-top:.25rem;line-height:1.45;white-space:normal;word-break:break-word">⚠ ${w(r.error_message||"")}</div>`:""}</td>
              <td>${r.post_mode==="140"?"140文字":r.post_mode==="thread"?"スレッド":"フル文章"}</td>
              <td class="text-xs font-mono">${r.scheduled_at||"—"}</td>
              <td>${Lt(r.status, r.scheduled_at)}</td>
              <td class="text-xs">@${w(r.x_username||"-")}</td>
              <td class="text-right">
                ${r.status!=="posted"?`<button class="btn btn-subtle btn-sm" onclick="postNow(${r.id})" title="今すぐ投稿"><i class="fa-brands fa-x-twitter"></i>今すぐ投稿</button>`:""}
                ${r.status!=="posted"?`<button class="btn btn-ghost btn-sm" onclick="openSchedRowModal(${r.id})" title="予約日時を設定" style="background:#FEF3C7;color:#92400E;border-color:#FDE68A"><i class="fas fa-calendar-plus"></i>予約投稿</button>`:""}
                <button class="btn btn-danger btn-sm" onclick="delPost(${r.id})"><i class="fas fa-trash"></i>削除</button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>

  <!-- 新規予約投稿モーダル -->
  <div id="post-sched-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.5);overflow-y:auto;padding:1rem;align-items:flex-start;justify-content:center">
    <div style="background:#fff;border-radius:.75rem;max-width:38rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
        <h3 style="font-size:1.05rem;font-weight:700">新規予約投稿</h3>
        <button onclick="closeSchedModal()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label">本文 <span style="color:#dc2626">*</span></label>
          <textarea id="ps-body" class="inp" style="min-height:7rem" placeholder="ツイート本文（最大280文字）" maxlength="280"></textarea>
        </div>
        <div>
          <label class="field-label">予約日時 <span style="color:#dc2626">*</span></label>
          <input type="datetime-local" id="ps-when" class="inp">
        </div>
        <div>
          <label class="field-label">URL（任意）</label>
          <input type="url" id="ps-url" class="inp" placeholder="https://">
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.75rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.5rem"><i class="fas fa-photo-film"></i> メディア添付（任意・最大4件）</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">
            <button type="button" class="btn btn-ghost btn-sm" onclick="psAttachAny('image')"><i class="fas fa-image"></i>画像</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="psAttachAny('video')"><i class="fas fa-film"></i>動画</button>
          </div>
          <div id="ps-media-list" style="display:flex;flex-wrap:wrap"></div>
        </div>
        <div style="display:flex;gap:.5rem;padding-top:.5rem;justify-content:flex-end">
          <button type="button" class="btn btn-ghost" onclick="closeSchedModal()">キャンセル</button>
          <button type="button" class="btn btn-primary" onclick="submitScheduledPost()"><i class="fas fa-calendar-plus"></i>予約登録</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
window.filterPosts = function(btn, st) {
  document.querySelectorAll('.xst-tab').forEach(b => b.classList.remove('xst-active'));
  btn.classList.add('xst-active');
  document.querySelectorAll('tr.post-row').forEach(tr => {
    const s = tr.getAttribute('data-status') || '';
    const sched = tr.getAttribute('data-scheduled') === '1';
    let show = false;
    if (st === 'all') show = true;
    else if (st === 'posted') show = (s === 'posted');
    else if (st === 'failed') show = (s === 'failed' || s === 'rejected' || s === 'error');
    else if (st === 'draft') show = (s === 'draft');
    else if (st === 'scheduled') show = ((s === 'approved' || s === 'scheduled' || s === 'pending' || s === 'publishing') && sched);
    else if (st === 'pending') show = ((s === 'pending' || s === 'approved' || s === 'scheduled') && !sched);
    tr.style.display = show ? '' : 'none';
  });
};
window.openSchedRowModal = function(postId) {
  // 既存モーダルを削除
  const old = document.getElementById('row-sched-modal');
  if (old) old.remove();

  // 現在時刻をJST固定でデフォルト値に
  const def = jstNowDatetimeLocal(0);

  const modal = document.createElement('div');
  modal.id = 'row-sched-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-calendar-plus"></i> 予約日時を設定</h3>' +
        '<button onclick="document.getElementById(\\'row-sched-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">投稿ID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + postId + '</code></div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">予約日時 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="row-sched-when" class="inp" value="' + def + '">' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'row-sched-modal\\').remove()">キャンセル</button>' +
        '<button type="button" class="btn btn-primary" onclick="submitRowSched(' + postId + ')"><i class="fas fa-check"></i>予約登録</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
};

window.submitRowSched = async function(postId) {
  const dt = document.getElementById('row-sched-when').value;
  if (!dt) { toast('予約日時を選択してください','err'); return; }
  const scheduledAt = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/posts/'+postId+'/schedule', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({scheduled_at: scheduledAt})
    });
    const j = await r.json();
    if (j.success) {
      toast('予約しました ('+(j.effective_scheduled_at||scheduledAt)+')','ok');
      document.getElementById('row-sched-modal').remove();
      setTimeout(()=>location.reload(),900);
    } else toast('予約失敗: '+(j.error||''),'err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
};
window.openSchedModal = function() {
  window.psMedia = [];
  psRenderMedia();
  document.getElementById('ps-body').value = '';
  document.getElementById('ps-when').value = jstNowDatetimeLocal(0);
  document.getElementById('ps-url').value = '';
  const m = document.getElementById('post-sched-modal');
  m.style.display = 'flex';
};
window.closeSchedModal = function() { document.getElementById('post-sched-modal').style.display = 'none'; };
window.psMedia = [];
function psRenderMedia() {
  const el = document.getElementById('ps-media-list'); if (!el) return;
  el.innerHTML = (window.psMedia||[]).map(m =>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.15rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" onclick="psRemoveMedia('+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.psRemoveMedia = function(mid) { window.psMedia = (window.psMedia||[]).filter(m => m.id !== mid); psRenderMedia(); };
window.psAttachAny = async function(kind) {
  if ((window.psMedia||[]).length >= 4) { toast('添付は最大4件まで','err'); return; }
  // フォルダを直接開く（ファイルピッカー）
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('アップロード中...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('アップロード失敗','err'); return; }
    window.psMedia.push({id:j.id, type:kind, name:f.name});
    psRenderMedia();
    toast(kind==='image'?'画像を添付しました':'動画を添付しました','ok');
  };
  inp.click();
};
window.submitScheduledPost = async function() {
  const body = document.getElementById('ps-body').value.trim();
  const when = document.getElementById('ps-when').value;
  if (!body) { toast('本文を入力してください','err'); return; }
  if (!when) { toast('予約日時を入力してください','err'); return; }
  const scheduledAt = datetimeLocalToJst(when);
  try {
    const r = await fetch('/api/admin/posts',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
      body, scheduled_at: scheduledAt, status:'scheduled', post_mode:'body',
      link_url: document.getElementById('ps-url').value || null,
      source_type:'manual_scheduled',
    })});
    const j = await r.json();
    if (!j.success) { toast('登録失敗: '+(j.error||''),'err'); return; }
    if ((window.psMedia||[]).length > 0) {
      await fetch('/api/admin/posts/'+j.id+'/attach-media',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({media_ids:window.psMedia.map(m=>m.id)})});
    }
    toast('予約投稿を登録しました','ok');
    closeSchedModal();
    setTimeout(()=>location.reload(), 800);
  } catch(e) { toast('エラー: '+e.message,'err'); }
};

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
  if (j.success) { toast('投稿しました', 'ok'); setTimeout(()=>location.reload(), 800); }
  else toast('失敗: ' + (j.error||''), 'err');
}
window.postNow = postNow;
async function delPost(id) {
  if (!confirm('削除しますか?')) return;
  const r = await fetch('/api/admin/posts/' + id, { method: 'DELETE' });
  const j = await r.json().catch(()=>({success:true}));
  if (j.success !== false) { toast('削除しました', 'ok'); setTimeout(()=>location.reload(), 600); }
  else toast('削除失敗: ' + (j.error||''), 'err');
}
window.delPost = delPost;
window.checkAll = function(checked) {
  document.querySelectorAll('.post-chk').forEach(c => c.checked = checked);
  updateBulk();
};
window.updateBulk = function() {
  const n = document.querySelectorAll('.post-chk:checked').length;
  const btn = document.getElementById('bulk-del-btn');
  if (btn) btn.disabled = n === 0;
};
window.bulkDel = async function() {
  const ids = [...document.querySelectorAll('.post-chk:checked')].map(c => c.value);
  if (!ids.length) return;
  if (!confirm(ids.length + '件を削除しますか?')) return;
  await Promise.all(ids.map(id => fetch('/api/admin/posts/' + id, { method:'DELETE' })));
  toast(ids.length + '件を削除しました', 'ok');
  setTimeout(()=>location.reload(), 600);
};
window.dlExportPosts = function() {
  location.href = '/api/admin/export/posts.csv';
};
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
function statusPill(s) {
  const map = {pending:'pill-soft',approved:'pill-blue',scheduled:'pill-blue',publishing:'pill-blue',posted:'pill-ok',failed:'pill-err',cancelled:'pill-soft',draft:'pill-soft'};
  const txt = {pending:'下書き',approved:'予約済',scheduled:'予約済',publishing:'送信中',posted:'投稿済',failed:'失敗',cancelled:'キャンセル',draft:'下書き'}[s] || s;
  return '<span class="pill ' + (map[s]||'pill-soft') + '">' + txt + '</span>';
}
<\/script>`}function un(e){return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-reply"></i>ツリー投稿（既存投稿へのコメント追加）</h1>
  </div>
  
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-reply text-accent"></i> コメント先投稿を選択 <span class="text-xs text-red-500 font-normal">（必須）</span></h3>
    <div class="alert alert-warn mb-3">
      <div class="text-xs leading-relaxed">コメントを追加したい既存のX投稿を選んでください。未選択では投稿できません。</div>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="loadRecent()"><i class="fas fa-rotate"></i>直近の投稿を取得</button>
      <select id="th-target-pick" class="inp" style="width:30rem;display:none" onchange="onPickTarget(this.value)">
        <option value="">— 直近の投稿から選択 —</option>
      </select>
      <input type="hidden" id="th-target-id" value="">
    </div>
    <div id="th-target-info" class="mt-3">
      <div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> コメント先が未選択です</div>
    </div>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3"><i class="fas fa-comment-dots text-accent"></i> 返信本文 <span class="text-xs text-ink-muted font-normal">（1件以上）</span></h3>
    <div id="th-replies" class="space-y-4">
      ${pn(1)}
    </div>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="addReply()"><i class="fas fa-plus"></i>返信追加</button>
      <span class="text-xs text-ink-muted" style="margin-left:.5rem">最大10件 / 各返信に画像・動画を最大4件添付可</span>
      <span style="flex:1"></span>
      <button class="btn" style="background:#10B981;color:#fff;border-color:#10B981" onclick="submitNow()"><i class="fas fa-paper-plane"></i>今すぐ投稿</button>
      <button class="btn btn-primary" onclick="submitSchedule()"><i class="fas fa-calendar"></i>予約投稿</button>
      <button class="btn btn-ghost" onclick="saveDraft()"><i class="fas fa-floppy-disk"></i>下書き保存</button>
      <button class="btn btn-ghost" onclick="previewThread()"><i class="fas fa-eye"></i>プレビュー</button>
    </div>
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
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${t.thread_parent_id||"-"}</span> ${Lt(t.status)}</div>
        <div class="text-sm whitespace-pre-line">${w((t.body||"").slice(0,200))}</div>
      </div>
    `).join("")}
  </div>
</div>
<script>
function renderReplyItemJs(n) {
  return '<div class="reply-item" data-idx="'+n+'">' +
    '<div class="flex items-center justify-between mb-1">' +
      '<label class="text-sm font-semibold text-accent">返信 '+n+'</label>' +
      (n > 1 ? '<button class="btn btn-danger btn-sm" type="button" onclick="removeReplyItem(this)"><i class="fas fa-times"></i></button>' : '') +
    '</div>' +
    '<textarea class="inp th-reply" placeholder="返信'+n+'の本文を入力" maxlength="280"></textarea>' +
    '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem">' +
      '<button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,\\'image\\')"><i class="fas fa-image"></i>画像</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,\\'video\\')"><i class="fas fa-film"></i>動画</button>' +
    '</div>' +
    '<div class="th-media-list" style="display:flex;flex-wrap:wrap;margin-top:.3rem"></div>' +
  '</div>';
}
function addReply() {
  const list = document.getElementById('th-replies');
  if (list.children.length >= 10) { toast('返信は最大10件までです','err'); return; }
  const n = list.children.length + 1;
  list.insertAdjacentHTML('beforeend', renderReplyItemJs(n));
}
window.addReply = addReply;
function removeReplyItem(btn){
  const item = btn.closest('.reply-item');
  if (item) item.remove();
  renumber();
}
window.removeReplyItem = removeReplyItem;
function renumber() {
  [...document.getElementById('th-replies').children].forEach((el, i) => {
    const lbl = el.querySelector('label'); if (lbl) lbl.textContent = '返信 ' + (i+1);
    el.dataset.idx = i+1;
  });
}
function loadRecent() {
  const sel = document.getElementById('th-target-pick');
  if (sel) sel.innerHTML = '<option value="">読込中...</option>';
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
      toast('投稿済み記事が見つかりません','err');
      return;
    }
    sel.innerHTML = '<option value="">— 直近の投稿から選択 ('+items.length+'件) —</option>' +
      items.map(it => {
        const id = String(it.external_post_id || '').replace(/[^0-9]/g, '');
        if (!id) return "";
        const acct = it.x_username || it.joined_account_name || '';
        const txt = (it.content || '').slice(0, 40).replace(/\\n/g,' ').replace(/</g,'&lt;');
        const dt = (it.posted_at || it.created_at || '').slice(5, 16);
        return '<option value="' + id + '">[' + dt + '] @' + acct + ': ' + txt + '...</option>';
      }).join('');
    sel.style.display = '';
    toast('直近 ' + items.length + ' 件を取得しました','ok');
  }).catch(e => {
    if (sel) sel.innerHTML = '<option value="">— 取得失敗 —</option>';
    toast('取得失敗: ' + e.message, 'err');
  });
}
window.loadRecent = loadRecent;
window.onPickTarget = function(id) {
  document.getElementById('th-target-id').value = id || '';
  updateTarget();
};

// 返信アイテムごとの添付メディア
function thRenderItemMedia(item){
  const arr = item._media || [];
  const list = item.querySelector('.th-media-list');
  if (!list) return;
  list.innerHTML = arr.map(m =>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.1rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" data-mid="'+m.id+'" onclick="thRemoveItemMedia(this)" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.thRemoveItemMedia = function(btn){
  const item = btn.closest('.reply-item');
  const mid = parseInt(btn.dataset.mid, 10);
  item._media = (item._media||[]).filter(m => m.id !== mid);
  thRenderItemMedia(item);
};
window.thAttachUrl = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1返信あたり最大4件','err'); return; }
  const u = prompt(kind==='image'?'画像のURLを入力':'動画のURLを入力'); if (!u) return;
  const r = await fetch('/api/admin/media/url',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:u, file_type:kind})});
  const j = await r.json();
  if(!j.success){ toast('登録失敗: '+(j.error||''),'err'); return; }
  item._media.push({id:j.id, type:kind, name:u.split('/').pop()||'remote'});
  thRenderItemMedia(item);
};
window.thAttachAny = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1返信あたり最大4件','err'); return; }
  // フォルダを直接開く（ファイルピッカー）
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('アップロード中...','info');
    try {
      const r = await fetch('/api/admin/media',{method:'POST', body: fd});
      const j = await r.json();
      if(!j.success){ toast('アップロード失敗: '+(j.error||''),'err'); return; }
      item._media.push({id:j.id, type:kind, name:f.name});
      thRenderItemMedia(item);
      toast(kind==='image'?'画像を添付しました':'動画を添付しました','ok');
    } catch(e) { toast('エラー: '+e.message,'err'); }
  };
  inp.click();
};
window.thAttachFile = async function(btn, kind){
  const item = btn.closest('.reply-item');
  item._media = item._media || [];
  if (item._media.length >= 4) { toast('1返信あたり最大4件','err'); return; }
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('アップロード中...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('アップロード失敗: '+(j.error||''),'err'); return; }
    item._media.push({id:j.id, type:kind, name:f.name});
    thRenderItemMedia(item);
  };
  inp.click();
};

function saveDraft() { toast('下書きを保存しました（簡易）','info'); }
window.saveDraft = saveDraft;
function previewThread() {
  const d = collect(); if (!d) return;
  const total = d.tweets.reduce((a,t)=>a+(t.media_ids||[]).length,0);

  // 既存のプレビュー要素を削除
  const old = document.getElementById('th-preview-modal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'th-preview-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';

  const safeId = (d.target_tweet_id || '').replace(/[^0-9a-zA-Z]/g, '');
  let html = '<div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">';
  html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">';
  html += '<h3 style="font-size:1.1rem;font-weight:700"><i class="fas fa-eye"></i> ツリー投稿プレビュー</h3>';
  html += '<button onclick="document.getElementById(\\'th-preview-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>';
  html += '</div>';
  html += '<div style="font-size:.8rem;color:#6B7280;margin-bottom:.75rem">コメント先 ID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + safeId + '</code> / 返信 ' + d.tweets.length + ' 件 / 添付 ' + total + ' 件</div>';

  d.tweets.forEach((t, i) => {
    html += '<div style="position:relative;padding:.85rem 1rem;border:1px solid #E5E7EB;border-radius:.5rem;margin-bottom:.6rem;background:#F9FAFB">';
    html += '<div style="font-size:.7rem;color:#2563EB;font-weight:700;margin-bottom:.35rem">返信 ' + (i+1) + '</div>';
    const txt = (t.body || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\n/g,'<br>');
    html += '<div style="font-size:.92rem;line-height:1.55;color:#1F2937;white-space:pre-line">' + txt + '</div>';
    html += '<div style="font-size:.7rem;color:#9CA3AF;margin-top:.4rem">' + (t.body||'').length + ' 文字' + ((t.media_ids||[]).length > 0 ? ' / メディア ' + t.media_ids.length + ' 件添付' : '') + '</div>';
    html += '</div>';
    if (i < d.tweets.length - 1) {
      html += '<div style="text-align:center;color:#9CA3AF;margin:-.2rem 0 .2rem"><i class="fas fa-arrow-down"></i></div>';
    }
  });

  html += '<div style="display:flex;justify-content:flex-end;margin-top:1rem;padding-top:.75rem;border-top:1px solid #E5E7EB">';
  html += '<button type="button" onclick="document.getElementById(\\'th-preview-modal\\').remove()" class="btn btn-primary">閉じる</button>';
  html += '</div>';
  html += '</div>';

  modal.innerHTML = html;
  document.body.appendChild(modal);
}
window.previewThread = previewThread;

function updateTarget() {
  const v = document.getElementById('th-target-id').value.trim();
  const el = document.getElementById('th-target-info');
  if (!v) el.innerHTML = '<div class="text-xs text-red-600"><i class="fas fa-triangle-exclamation"></i> コメント先が未選択です</div>';
  else el.innerHTML = '<div class="text-xs text-emerald-700"><i class="fas fa-check"></i> コメント先: <span class="font-mono">' + escapeHtml(v) + '</span></div>';
}
window.updateTarget = updateTarget;

function collect() {
  const tid = document.getElementById('th-target-id').value.trim().replace(/[^0-9]/g, '');
  const items = [...document.querySelectorAll('#th-replies .reply-item')];
  const tweets = items.map(it => {
    const ta = it.querySelector('.th-reply');
    const body = (ta ? ta.value : '').trim();
    const media_ids = (it._media || []).map(m => m.id);
    return { body, media_ids };
  }).filter(t => t.body.length > 0);
  if (!tweets.length) { toast('返信本文を入力してください','err'); return null; }
  if (tweets.length > 10) { toast('返信は最大10件までです','err'); return null; }
  return { target_tweet_id: tid, tweets };
}

async function submitNow() {
  const d = collect(); if (!d) return;
  if (!confirm(d.tweets.length+'件のツリー投稿を実行しますか？')) return;
  toast('送信中...','info');
  try {
    const r = await fetch('/api/admin/thread/post-now',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});
    const j = await r.json();
    if (j.success) { toast('送信完了('+(j.posted||d.tweets.length)+'件)','ok'); setTimeout(()=>location.reload(),1500); }
    else toast('送信失敗: '+(j.error||''),'err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
}
window.submitNow = submitNow;

async function submitSchedule() {
  const d = collect(); if (!d) return;
  // 既存のモーダルを削除
  const old = document.getElementById('th-sched-modal');
  if (old) old.remove();
  // 現在時刻をJST固定でデフォルト値に
  const def = jstNowDatetimeLocal(0);
  const modal = document.createElement('div');
  modal.id = 'th-sched-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-calendar-plus"></i> ツリー投稿の予約日時</h3>' +
        '<button onclick="document.getElementById(\\'th-sched-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">' + d.tweets.length + '件の返信を予約します</div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">予約日時 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="th-sched-when" class="inp" value="' + def + '">' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'th-sched-modal\\').remove()">キャンセル</button>' +
        '<button type="button" class="btn btn-primary" onclick="confirmThSchedule()"><i class="fas fa-check"></i>予約登録</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  // 予約データを一時保存
  window.__pendingThSchedData = d;
}
window.submitSchedule = submitSchedule;
window.confirmThSchedule = async function() {
  const dt = document.getElementById('th-sched-when').value;
  if (!dt) { toast('予約日時を選択してください','err'); return; }
  const d = window.__pendingThSchedData;
  if (!d) { toast('予約データが見つかりません','err'); return; }
  d.scheduled_at = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/thread/schedule',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});
    const j = await r.json();
    if (j.success) {
      toast('予約しました ('+d.scheduled_at+')','ok');
      const m = document.getElementById('th-sched-modal'); if (m) m.remove();
      setTimeout(()=>location.reload(),1200);
    } else toast('予約失敗: '+(j.error||''),'err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
};

function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`}function pn(e){return`
    <div class="reply-item" data-idx="${e}">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">返信 ${e}</label>
        ${e>1?`<button class="btn btn-danger btn-sm" onclick="removeReplyItem(this)" type="button"><i class="fas fa-times"></i></button>`:""}
      </div>
      <textarea class="inp th-reply" placeholder="返信${e}の本文を入力" maxlength="280"></textarea>
      <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.4rem">
        <button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,'image')"><i class="fas fa-image"></i>画像</button>
        <button type="button" class="btn btn-ghost btn-sm" onclick="thAttachAny(this,'video')"><i class="fas fa-film"></i>動画</button>
      </div>
      <div class="th-media-list" style="display:flex;flex-wrap:wrap;margin-top:.3rem"></div>
    </div>`}function mn(e){return`
<div class="space-y-4">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <h1 class="section-title"><i class="fas fa-calendar"></i>予約状況</h1>
      <p class="section-desc">予約済み投稿・オートパイロットジョブの確認</p>
    </div>
    <div style="display:flex;gap:.5rem">
      <button id="btn-cal" class="btn btn-primary btn-sm" onclick="setView('cal')"><i class="fas fa-calendar"></i>カレンダー</button>
      <button id="btn-list" class="btn btn-ghost btn-sm" onclick="setView('list')"><i class="fas fa-list"></i>一覧</button>
    </div>
  </div>
  

  <div id="sc-cal-view">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" onclick="prevMonth()"><i class="fas fa-chevron-left"></i></button>
      <span id="sc-month-label" style="font-size:1rem;font-weight:700;min-width:7rem;text-align:center"></span>
      <button class="btn btn-ghost btn-sm" onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-subtle btn-sm" onclick="goToday()">今日</button>
      <span id="sc-status" style="font-size:.75rem;color:var(--ink-muted)"></span>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:.75rem;overflow:hidden">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--paper-soft);border-bottom:1px solid var(--line)">
        ${["日","月","火","水","木","金","土"].map((s,a)=>`
          <div style="padding:.5rem;text-align:center;font-size:.75rem;font-weight:600;color:${a===0?"#ef4444":a===6?"#2563EB":"var(--ink-muted)"}">${s}</div>
        `).join("")}
      </div>
      <div id="sc-cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr)"><div style="grid-column:1 / span 7;padding:2rem;text-align:center;color:var(--ink-muted);font-size:.85rem"><i class="fas fa-spinner fa-spin"></i> 読み込み中...</div></div>
    </div>
    <div id="sc-empty-cal" style="display:none;padding:1rem;text-align:center;color:var(--ink-muted);font-size:.85rem">予約投稿はありません</div>
  </div>

  <div id="sc-list-view" style="display:none">
    <div class="card" style="padding:0">
      <table class="data" style="width:100%">
        <thead><tr><th>予約日時</th><th>種別</th><th>アカウント</th><th>本文</th><th>状態</th><th></th></tr></thead>
        <tbody id="sc-list-body">
          <tr><td colspan="6" style="text-align:center;color:var(--ink-muted);padding:2.5rem"><i class="fas fa-spinner fa-spin"></i> 読み込み中...</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- 日付クリックモーダル -->
<div id="sc-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.4);align-items:center;justify-content:center;padding:1rem">
  <div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;max-height:90vh;overflow:auto;padding:1.25rem;position:relative">
    <button onclick="scCloseModal()" style="position:absolute;top:.75rem;right:.75rem;background:none;border:none;font-size:1.25rem;cursor:pointer;color:#6B7280"><i class="fas fa-xmark"></i></button>
    <h3 id="sc-modal-title" style="font-size:1rem;font-weight:700;margin-bottom:1rem"></h3>
    <div id="sc-modal-body"></div>
  </div>
</div>

<script>
(function(){
  let SCHEDULED = [];
  let curYear, curMonth, scLoaded = false;
  const now = new Date();
  curYear = now.getFullYear();
  curMonth = now.getMonth();

  function setView(v) {
    document.getElementById('sc-cal-view').style.display = v==='cal'?'block':'none';
    document.getElementById('sc-list-view').style.display = v==='list'?'block':'none';
    document.getElementById('btn-cal').className = v==='cal'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
    document.getElementById('btn-list').className = v==='list'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
  }
  window.setView = setView;

  async function loadSchedule() {
    const stEl = document.getElementById('sc-status');
    if (stEl) stEl.textContent = '読み込み中...';
    try {
      const r = await fetch('/api/admin/posts-scheduled');
      if (!r.ok) throw new Error('HTTP '+r.status);
      const j = await r.json();
      SCHEDULED = j.posts || [];
      scLoaded = true;
      if (stEl) stEl.textContent = '';
      buildCalendar();
      buildList();
    } catch(e) {
      if (stEl) { stEl.textContent = '予約状況を取得できませんでした'; stEl.style.color='#dc2626'; }
      const grid = document.getElementById('sc-cal-grid');
      if (grid) grid.innerHTML = '<div style="grid-column:1 / span 7;padding:2rem;text-align:center;color:#dc2626;font-size:.85rem">予約状況を取得できませんでした</div>';
      const lb = document.getElementById('sc-list-body');
      if (lb) lb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#dc2626;padding:2.5rem">予約状況を取得できませんでした</td></tr>';
    }
  }
  window.reloadSchedule = loadSchedule;

  function statusBadge(s) {
    const map = {posted:['投稿済','#065F46','#ECFDF5'],failed:['失敗','#991B1B','#FEF2F2'],pending:['下書き','#6B7280','#F3F4F6'],approved:['予約済','#1D4ED8','#EFF6FF'],scheduled:['予約済','#1D4ED8','#EFF6FF'],draft:['下書き','#6B7280','#F3F4F6'],cancelled:['取消','#6B7280','#F3F4F6'],canceled:['取消','#6B7280','#F3F4F6'],publishing:['投稿中','#92400E','#FFFBEB'],configured:['予約済','#1D4ED8','#EFF6FF']};
    const m = map[s] || [s||'-','#6B7280','#F3F4F6'];
    return '<span style="display:inline-block;padding:.1rem .5rem;font-size:.7rem;border-radius:.25rem;color:'+m[1]+';background:'+m[2]+';font-weight:600">'+m[0]+'</span>';
  }

  function srcLabel(s) {
    if (s==='autopilot') return '<span style="font-size:.65rem;background:#FEF3C7;color:#92400E;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">AP</span>';
    if (s==='pattern_generated_post'||s==='pattern_ai') return '<span style="font-size:.65rem;background:#EDE9FE;color:#6D28D9;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">パターン</span>';
    return '';
  }

  function buildCalendar() {
    const lbl = document.getElementById('sc-month-label');
    if (lbl) lbl.textContent = curYear + '年 ' + (curMonth+1) + '月';
    const grid = document.getElementById('sc-cal-grid');
    if (!grid) return;
    const first = new Date(curYear, curMonth, 1);
    const lastDay = new Date(curYear, curMonth+1, 0).getDate();
    const startDow = first.getDay();
    const today = new Date();
    const todayStr = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');

    const byDate = {};
    SCHEDULED.forEach(p => {
      const d = (p.scheduled_at||'').slice(0,10);
      if (!d) return;
      if (!byDate[d]) byDate[d] = [];
      byDate[d].push(p);
    });

    const monthHasAny = Object.keys(byDate).some(k => k.startsWith(curYear+'-'+String(curMonth+1).padStart(2,'0')));
    const emptyEl = document.getElementById('sc-empty-cal');
    if (emptyEl) emptyEl.style.display = (scLoaded && !monthHasAny) ? 'block':'none';

    let html = '';
    let day = 1 - startDow;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const isCurrentMonth = day >= 1 && day <= lastDay;
        const dateStr = isCurrentMonth ? curYear+'-'+String(curMonth+1).padStart(2,'0')+'-'+String(day).padStart(2,'0') : '';
        const isToday = dateStr === todayStr;
        const posts = byDate[dateStr] || [];
        const textColor = col===0?'#ef4444':col===6?'#2563EB':'var(--ink)';
        const cursor = isCurrentMonth ? 'cursor:pointer;' : '';
        const click = isCurrentMonth ? ' onclick="scOpenDay(\\''+dateStr+'\\')"' : '';
        html += '<div'+click+' style="position:relative;min-height:7rem;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:.375rem;background:' + (isToday?'#EFF6FF':'#fff') + ';' + cursor + '">';
        if (isCurrentMonth) {
          html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">';
          html += '<span style="font-size:.8rem;font-weight:'+(isToday?'700':'400')+';color:'+textColor+'">' + day + '</span>';
          html += '<button type="button" onclick="event.stopPropagation();scNewAP(\\''+dateStr+'\\')" title="この日にオートパイロット新規作成" style="background:#F3F4F6;border:1px solid var(--line);border-radius:.25rem;padding:0 .35rem;font-size:.7rem;color:#6B7280;cursor:pointer;line-height:1.2"><i class="fas fa-plus"></i></button>';
          html += '</div>';
          if (posts.length > 0) html += '<div style="margin-bottom:2px"><span style="font-size:.65rem;background:#1D4ED8;color:#fff;border-radius:.75rem;padding:0 .4rem;font-weight:600">'+posts.length+'件</span></div>';
          // 縦5×横4=20件まで表示。グリッド2列で密度を高める
          html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1px">';
          posts.slice(0,10).forEach(p => {
            const color = p.status==='posted'?'#065F46':p.status==='failed'?'#991B1B':'#1D4ED8';
            const bg = p.status==='posted'?'#ECFDF5':p.status==='failed'?'#FEF2F2':p.source_type==='autopilot'?'#FEF3C7':'#EFF6FF';
            const label = p.source_type==='autopilot' ? '[AP]' : '';
            const timeStr = (p.scheduled_at||'').slice(11,16) || '--:--';
            html += '<div style="background:'+bg+';color:'+color+';font-size:.6rem;padding:1px 3px;border-radius:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.2" title="'+timeStr+' '+((p.body||'').replace(/"/g,"&quot;")).slice(0,80)+'">' + '<span style="font-weight:700;font-family:monospace">' + timeStr + '</span> ' + label + '</div>';
          });
          html += '</div>';
          if (posts.length > 10) html += '<div style="font-size:.65rem;color:var(--ink-muted)">+' + (posts.length-10) + '件</div>';
        }
        html += '</div>';
        day++;
      }
      if (day > lastDay && row >= 3) break;
    }
    grid.innerHTML = html;
  }

  function buildList() {
    const tb = document.getElementById('sc-list-body');
    if (!tb) return;
    if (SCHEDULED.length === 0) {
      tb.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--ink-muted);padding:2.5rem">予約投稿はありません</td></tr>';
      return;
    }
    tb.innerHTML = SCHEDULED.map(p => {
      const isAP = p.source_type==='autopilot' || (typeof p.id==='string' && p.id.indexOf('ap-')===0);
      return '<tr>' +
        '<td style="font-size:.75rem;font-family:monospace">'+(p.scheduled_at||'-')+'</td>' +
        '<td style="font-size:.7rem">'+(isAP?'<span style="background:#FEF3C7;color:#92400E;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">AP</span>':'<span style="background:#EFF6FF;color:#1D4ED8;padding:.1rem .35rem;border-radius:.25rem;font-weight:600">予約</span>')+'</td>' +
        '<td style="font-size:.75rem">@'+(p.x_username||p.account_name||'-')+'</td>' +
        '<td style="font-size:.75rem;max-width:18rem"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(p.body||'').slice(0,80).replace(/</g,'&lt;')+'</div></td>' +
        '<td>'+statusBadge(p.status)+'</td>' +
        '<td style="white-space:nowrap">' +
          (isAP ? '' : '<button class="btn btn-ghost btn-sm" onclick="scEditPost(\\''+p.id+'\\')"><i class="fas fa-pen"></i></button>') +
          '<button class="btn btn-danger btn-sm" onclick="scDeletePost(\\''+p.id+'\\')"><i class="fas fa-trash"></i></button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.prevMonth = function() { curMonth--; if(curMonth<0){curMonth=11;curYear--;} buildCalendar(); };
  window.nextMonth = function() { curMonth++; if(curMonth>11){curMonth=0;curYear++;} buildCalendar(); };
  window.goToday = function() { const n=new Date(); curYear=n.getFullYear(); curMonth=n.getMonth(); buildCalendar(); };

  window.scOpenDay = function(dateStr) {
    const posts = SCHEDULED.filter(p => (p.scheduled_at||'').slice(0,10) === dateStr);
    document.getElementById('sc-modal-title').textContent = dateStr + ' の予約 ('+posts.length+'件)';
    const body = document.getElementById('sc-modal-body');
    if (posts.length === 0) {
      body.innerHTML = '<div style="text-align:center;padding:1.5rem;color:#6B7280">この日に予約はありません</div>';
    } else {
      body.innerHTML = posts.map(p => {
        const isAP = p.source_type==='autopilot' || (typeof p.id==='string' && p.id.indexOf('ap-')===0);
        return '<div style="border:1px solid var(--line);border-radius:.5rem;padding:.75rem;margin-bottom:.5rem">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.5rem">' +
            '<div style="font-size:.75rem;font-family:monospace;color:#6B7280">'+(p.scheduled_at||'-')+' '+srcLabel(p.source_type)+'</div>' +
            '<div>'+statusBadge(p.status)+'</div>' +
          '</div>' +
          '<div style="font-size:.85rem;white-space:pre-wrap;color:#111827;margin-bottom:.5rem">'+(p.body||'').replace(/</g,'&lt;')+'</div>' +
          '<div style="font-size:.7rem;color:#6B7280;margin-bottom:.5rem">@'+(p.x_username||p.account_name||'-')+(isAP?' (オートパイロット)':'')+'</div>' +
          '<div style="display:flex;gap:.4rem;flex-wrap:wrap">' +
            (isAP ? '' : '<button class="btn btn-ghost btn-sm" onclick="scEditPost(\\''+p.id+'\\')"><i class="fas fa-pen"></i>編集</button>') +
            '<button class="btn btn-danger btn-sm" onclick="scDeletePost(\\''+p.id+'\\')"><i class="fas fa-trash"></i>削除</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    const m = document.getElementById('sc-modal');
    m.style.display = 'flex';
  };
  window.scCloseModal = function() { document.getElementById('sc-modal').style.display = 'none'; };

  window.scNewAP = function(dateStr) {
    // オートパイロット画面に日付クエリ付きで遷移
    location.href = '/dashboard/autopilot?date=' + encodeURIComponent(dateStr) + '&new=1';
  };

  window.scEditPost = function(pid) {
    const p = SCHEDULED.find(x => String(x.id) === String(pid));
    if (!p) return;
    if (typeof p.id==='string' && p.id.indexOf('ap-')===0) { toast('オートパイロットは編集不可','info'); return; }
    const body = document.getElementById('sc-modal-body');
    body.innerHTML = '<div>' +
      '<label class="field-label">本文</label>' +
      '<textarea id="sc-edit-body" class="inp" style="min-height:6rem">'+(p.body||'').replace(/</g,'&lt;')+'</textarea>' +
      '<label class="field-label" style="margin-top:.75rem">予約日時</label>' +
      '<input type="datetime-local" id="sc-edit-at" class="inp" value="'+(p.scheduled_at||'').replace(' ','T').slice(0,16)+'">' +
      '<div style="display:flex;gap:.5rem;margin-top:.75rem">' +
        '<button class="btn btn-primary" onclick="scSaveEdit('+p.id+')"><i class="fas fa-save"></i>保存</button>' +
        '<button class="btn btn-ghost" onclick="scCloseModal()"><i class="fas fa-times"></i>閉じる</button>' +
      '</div>' +
    '</div>';
    document.getElementById('sc-modal-title').textContent = '予約 #'+p.id+' の編集';
    document.getElementById('sc-modal').style.display = 'flex';
  };

  window.scSaveEdit = async function(pid) {
    const newBody = document.getElementById('sc-edit-body').value;
    const newAt = document.getElementById('sc-edit-at').value;
    const at = newAt ? newAt.replace('T',' ') + ':00' : null;
    try {
      const r = await fetch('/api/admin/posts/'+pid, {
        method:'PUT', headers:{'content-type':'application/json'},
        body: JSON.stringify({body: newBody, scheduled_at: at, post_mode: 'body'})
      });
      const j = await r.json();
      if (j.success) { toast('保存しました','ok'); scCloseModal(); loadSchedule(); }
      else toast('保存失敗: '+(j.error||''),'err');
    } catch(e) { toast('エラー: '+e.message,'err'); }
  };

  window.scDeletePost = async function(pid) {
    if (!confirm('この予約を削除しますか？')) return;
    try {
      const isAP = typeof pid==='string' && pid.indexOf('ap-')===0;
      let url, opts;
      if (isAP) {
        const apid = pid.replace('ap-','');
        url = '/api/admin/autopilot/jobs/'+apid;
        opts = {method:'DELETE'};
      } else {
        url = '/api/admin/posts/'+pid+'/cancel';
        opts = {method:'POST'};
      }
      const r = await fetch(url, opts);
      const j = await r.json();
      if (j.success || j.ok) { toast('削除しました','ok'); scCloseModal(); loadSchedule(); }
      else toast('削除失敗: '+(j.error||''),'err');
    } catch(e) { toast('エラー: '+e.message,'err'); }
  };

  window.cancelPost = function(id) { return scDeletePost(id); };

  document.addEventListener('DOMContentLoaded', loadSchedule);
  if (document.readyState !== 'loading') loadSchedule();
})();
<\/script>`}function _n(e){return`
<div class="space-y-4">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
    <div>
      <h1 class="section-title"><i class="fas fa-plane-departure"></i>オートパイロット</h1>
      <p class="section-desc">カレンダー予約枠に対して、生成方式・内容・投稿設定を事前登録できます。</p>
    </div>
    <button class="btn btn-primary" onclick="openApModal()"><i class="fas fa-plus"></i>新規作成</button>
  </div>
  <div class="card">
    <h3 class="font-bold text-ink mb-3">予約一覧</h3>
    <table class="data">
      <thead><tr><th>No</th><th>生成日時</th><th>投稿日時</th><th>アカウント</th><th>生成方式</th><th>テーマ</th><th>状態</th><th></th></tr></thead>
      <tbody>
        ${e.jobs.length===0?'<tr><td colspan="8" class="text-center text-ink-muted py-10">予約がまだありません</td></tr>':e.jobs.map((t,s)=>`
            <tr>
              <td class="text-xs text-ink-faint">${t.reservation_no||String(s+1).padStart(4,"0")}</td>
              <td class="text-xs">${t.generate_at||"—"}</td>
              <td class="text-xs">${t.publish_at||"—"}</td>
              <td class="text-xs">@${w(t.x_username||"-")}</td>
              <td><span class="pill pill-soft">${w(t.content_mode||"-")}</span></td>
              <td class="text-xs" style="max-width:42rem;white-space:normal;word-break:break-word">${w(t.theme||"—")}${t.error_message?`<div style="font-size:.72rem;color:#dc2626;margin-top:.25rem;line-height:1.45;white-space:normal;word-break:break-word">⚠ ${w(t.error_message||"")}</div>`:""}</td>
              <td>${(()=>{const st=t.status||"";if(st==="posted")return'<span class="pill pill-ok">投稿済</span>';if(st==="generated")return'<span class="pill pill-blue">予約中</span>';if(st==="error"||st==="failed")return'<span class="pill pill-err">失敗</span>';if(st==="draft")return'<span class="pill pill-soft">下書保存</span>';return'<span class="pill pill-blue">未投稿</span>'})()}</td>
              <td class="text-right">
                ${(t.status!=="posted")?`<button class="btn btn-primary btn-sm" onclick="retryApJob(${t.id})" title="再投稿（投稿日時を再設定して即時実行）"><i class="fas fa-rotate-right"></i>再投稿</button>`:""}
                <button class="btn btn-danger btn-sm" onclick="delApJob(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>

  <!-- モーダル -->
  <div id="ap-modal" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.5);overflow-y:auto;padding:1rem;align-items:flex-start;justify-content:center">
    <div style="background:#fff;border-radius:.75rem;max-width:42rem;width:100%;padding:1.5rem;margin:2rem auto;position:relative">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
        <h3 style="font-size:1.05rem;font-weight:700">オートパイロット新規作成</h3>
        <button onclick="closeApModal()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>
      </div>
      <div style="margin-bottom:.75rem">
        <button type="button" class="btn btn-ghost btn-sm" onclick="apLoadDraft()"><i class="fas fa-folder-open"></i>下書きから再開</button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="field-label">アカウント</label>
          <select id="ap-account" class="inp">
            <option value="">—</option>
            ${e.accounts.map(t=>`<option value="${t.id}">@${w(t.x_username||t.account_name)}</option>`).join("")}
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="field-label">生成日時</label>
            <input type="datetime-local" id="ap-gen" class="inp">
          </div>
          <div>
            <label class="field-label">投稿日時</label>
            <input type="datetime-local" id="ap-pub" class="inp" onchange="deriveGenAt()">
          </div>
        </div>
        <div>
          <label class="field-label">生成方式</label>
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
          <label class="field-label">テーマ <span style="color:#dc2626">*</span></label>
          <input type="text" id="ap-theme" class="inp" placeholder="例: AI自動化で副業収益を作る方法">
        </div>
        <div>
          <label class="field-label">キーワード</label>
          <input type="text" id="ap-kw" class="inp" placeholder="例: AI, 自動化, 副業">
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.875rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem">投稿オプション</div>
          <div class="space-y-2">
            <div>
              <label class="field-label">投稿末尾追記</label>
              <input type="text" id="ap-footer" class="inp" placeholder="例: 詳しくはプロフリンクから👇">
            </div>
            <div>
              <label class="field-label">URL</label>
              <input type="url" id="ap-url" class="inp" placeholder="https://">
            </div>
            <div>
              <label class="field-label">本文モード</label>
              <div style="display:flex;gap:1rem;margin-top:.25rem">
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="ap-pm" value="body" checked><span style="font-size:.9rem">本文</span></label>
                <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer"><input type="radio" name="ap-pm" value="140"><span style="font-size:.9rem">140文字</span></label>
              </div>
            </div>
          </div>
        </div>
        <div style="border:1px solid var(--line);border-radius:.5rem;padding:.875rem;background:var(--paper-soft)">
          <div style="font-weight:600;color:var(--accent);margin-bottom:.625rem"><i class="fas fa-photo-film"></i> メディア添付（任意・最大4件）</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">
            <button type="button" class="btn btn-ghost btn-sm" onclick="apAttachAny('image')"><i class="fas fa-image"></i>画像</button>
            <button type="button" class="btn btn-ghost btn-sm" onclick="apAttachAny('video')"><i class="fas fa-film"></i>動画</button>
          </div>
          <div id="ap-media-list" style="display:flex;flex-wrap:wrap"></div>
        </div>
        <div style="display:flex;gap:.5rem;padding-top:.5rem;justify-content:flex-end">
          <button type="button" class="btn btn-ghost" onclick="apSaveDraft()"><i class="fas fa-floppy-disk"></i>下書き保存</button>
          <button type="button" class="btn btn-ghost" onclick="closeApModal()">キャンセル</button>
          <button type="button" class="btn btn-primary" onclick="submitApJob()"><i class="fas fa-check"></i>作成</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
function openApModal() {
  window.apMedia = window.apMedia || [];
  apRenderMedia();
  const m=document.getElementById('ap-modal');
  m.style.display='flex';
  m.style.alignItems='flex-start';
  m.style.justifyContent='center';
}
function closeApModal() { document.getElementById('ap-modal').style.display='none'; }
window.openApModal = openApModal;
window.closeApModal = closeApModal;
function deriveGenAt() {
  const pub = document.getElementById('ap-pub').value;
  if (!pub || document.getElementById('ap-gen').value) return;
  document.getElementById('ap-gen').value = pub;
}
window.deriveGenAt = deriveGenAt;

window.apMedia = [];
function apRenderMedia(){
  const el=document.getElementById('ap-media-list'); if(!el) return;
  el.innerHTML = (window.apMedia||[]).map(m=>
    '<div style="display:inline-flex;align-items:center;gap:.25rem;background:#F3F4F6;border-radius:.25rem;padding:.15rem .4rem;font-size:.7rem;margin:.15rem">'+
      '<i class="fas '+(m.type==='video'?'fa-film':'fa-image')+'"></i>'+
      '<span style="max-width:9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+(m.name||'').replace(/"/g,'&quot;')+'">'+(m.name||'media')+'</span>'+
      '<button type="button" onclick="apRemoveMedia('+m.id+')" style="background:none;border:none;cursor:pointer;color:#dc2626"><i class="fas fa-xmark"></i></button>'+
    '</div>'
  ).join('');
}
window.apRemoveMedia = function(mid){ window.apMedia = (window.apMedia||[]).filter(m=>m.id!==mid); apRenderMedia(); };

// 画像/動画 ボタン: 直接ファイルピッカーを開く
window.apAttachAny = async function(kind){
  if((window.apMedia||[]).length>=4){ toast('添付は最大4件まで','err'); return; }
  const inp = document.createElement('input'); inp.type='file'; inp.accept = kind==='image'?'image/*':'video/*';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0]; if(!f) return;
    const fd = new FormData(); fd.append('file', f);
    toast('アップロード中...','info');
    const r = await fetch('/api/admin/media',{method:'POST', body: fd});
    const j = await r.json();
    if(!j.success){ toast('アップロード失敗: '+(j.error||''),'err'); return; }
    window.apMedia = window.apMedia || [];
    window.apMedia.push({id:j.id, type:kind, name:f.name});
    apRenderMedia();
    toast(kind==='image'?'画像を添付しました':'動画を添付しました','ok');
  };
  inp.click();
};

window.apSaveDraft = function(){
  const d = {
    account: document.getElementById('ap-account').value,
    gen: document.getElementById('ap-gen').value,
    pub: document.getElementById('ap-pub').value,
    mode: document.getElementById('ap-mode').value,
    theme: document.getElementById('ap-theme').value,
    kw: document.getElementById('ap-kw').value,
    footer: document.getElementById('ap-footer').value,
    url: document.getElementById('ap-url').value,
    pm: (document.querySelector('input[name="ap-pm"]:checked')||{}).value || 'body',
    media: window.apMedia || [],
  };
  try { sessionStorage.setItem('ap_draft', JSON.stringify(d)); toast('下書きを保存しました','ok'); }
  catch(e) { toast('保存失敗: '+e.message,'err'); }
};
window.apLoadDraft = function(){
  try {
    const raw = sessionStorage.getItem('ap_draft');
    if (!raw) { toast('保存された下書きがありません','info'); return; }
    const d = JSON.parse(raw);
    if (d.account) document.getElementById('ap-account').value = d.account;
    if (d.gen) document.getElementById('ap-gen').value = d.gen;
    if (d.pub) document.getElementById('ap-pub').value = d.pub;
    if (d.mode) document.getElementById('ap-mode').value = d.mode;
    if (d.theme) document.getElementById('ap-theme').value = d.theme;
    if (d.kw) document.getElementById('ap-kw').value = d.kw;
    if (d.footer) document.getElementById('ap-footer').value = d.footer;
    if (d.url) document.getElementById('ap-url').value = d.url;
    if (d.pm) { const r=document.querySelector('input[name="ap-pm"][value="'+d.pm+'"]'); if(r)r.checked=true; }
    window.apMedia = Array.isArray(d.media) ? d.media : [];
    apRenderMedia();
    toast('下書きを再開しました','ok');
  } catch(e) { toast('読込失敗: '+e.message,'err'); }
};

async function submitApJob() {
  const apPostMode = (document.querySelector('input[name="ap-pm"]:checked')||{}).value || 'body';
  const body = {
    account_id: parseInt(document.getElementById('ap-account').value, 10) || null,
    generate_at: document.getElementById('ap-gen').value ? datetimeLocalToJst(document.getElementById('ap-gen').value) : '',
    publish_at: datetimeLocalToJst(document.getElementById('ap-pub').value),
    content_mode: document.getElementById('ap-mode').value,
    theme: document.getElementById('ap-theme').value.trim(),
    keywords: document.getElementById('ap-kw').value,
    link_url: document.getElementById('ap-url').value,
    post_mode: apPostMode,
    options_json: JSON.stringify({post_mode: apPostMode}),
    media_ids: (window.apMedia||[]).map(m=>m.id),
  };
  if (!body.theme) { toast('テーマを入力','err'); return; }
  if (!body.publish_at) { toast('投稿日時を入力','err'); return; }
  if (!body.account_id) { toast('アカウントを選択','err'); return; }
  try {
    const r = await fetch('/api/admin/autopilot/jobs', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
    const j = await r.json();
    if (j.success) { toast('作成しました','ok'); closeApModal(); setTimeout(()=>location.reload(), 600); }
    else toast('失敗: '+(j.error||''),'err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
}
window.submitApJob = submitApJob;
async function delApJob(id) {
  if (!confirm('削除しますか?')) return;
  try {
    const r = await fetch('/api/admin/autopilot/jobs/' + id, { method:'DELETE' });
    const j = await r.json();
    if (j.success) location.reload();
    else toast('削除失敗','err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
}
window.delApJob = delApJob;
async function retryApJob(id) {
  // 既存のモーダルを削除
  const old = document.getElementById('ap-retry-modal');
  if (old) old.remove();
  // 5分後をJST固定でデフォルト値に
  const def = jstNowDatetimeLocal(0);
  const modal = document.createElement('div');
  modal.id = 'ap-retry-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:1rem';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:28rem;width:100%;padding:1.5rem;margin:5rem auto;position:relative">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">' +
        '<h3 style="font-size:1.05rem;font-weight:700"><i class="fas fa-rotate-right"></i> 再投稿 — 投稿日時</h3>' +
        '<button onclick="document.getElementById(\\'ap-retry-modal\\').remove()" type="button" style="background:none;border:none;cursor:pointer;color:#6B7280;font-size:1.25rem"><i class="fas fa-xmark"></i></button>' +
      '</div>' +
      '<div style="font-size:.82rem;color:#6B7280;margin-bottom:.75rem">ジョブID: <code style="background:#F3F4F6;padding:.1rem .35rem;border-radius:.25rem">' + id + '</code></div>' +
      '<div style="margin-bottom:1rem">' +
        '<label class="field-label">新しい投稿日時 <span style="color:#dc2626">*</span></label>' +
        '<input type="datetime-local" id="ap-retry-when" class="inp" value="' + def + '">' +
        '<div style="font-size:.7rem;color:#6B7280;margin-top:.3rem">\u6307\u5b9a\u3057\u305f\u6642\u523b\u306b\u6295\u7a3f\u3057\u307e\u3059</div>' +
      '</div>' +
      '<div style="display:flex;gap:.5rem;justify-content:flex-end">' +
        '<button type="button" class="btn btn-ghost" onclick="document.getElementById(\\'ap-retry-modal\\').remove()">キャンセル</button>' +
        '<button type="button" class="btn btn-primary" onclick="confirmApRetry(' + id + ')"><i class="fas fa-check"></i>再投稿</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
}
window.retryApJob = retryApJob;
window.confirmApRetry = async function(id) {
  const dt = document.getElementById('ap-retry-when').value;
  if (!dt) { toast('投稿日時を選択してください','err'); return; }
  const publishAt = datetimeLocalToJst(dt);
  try {
    const r = await fetch('/api/admin/autopilot/jobs/' + id + '/retry', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ publish_at: publishAt })
    });
    const j = await r.json();
    if (j.success) {
      toast('再投稿予約しました ('+(j.publish_at||publishAt)+')','ok');
      const m = document.getElementById('ap-retry-modal'); if (m) m.remove();
      setTimeout(()=>location.reload(),900);
    } else toast('失敗: ' + (j.error||''),'err');
  } catch(e) { toast('エラー: '+e.message,'err'); }
};

// URL ?new=1 で自動的にモーダルを開き、?date=YYYY-MM-DD を投稿日時に反映
(function autoOpenAP(){
  try {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === '1') {
      setTimeout(()=>{
        openApModal();
        const dateStr = params.get('date');
        if (dateStr) {
          const pubEl = document.getElementById('ap-pub');
          if (pubEl) {
            pubEl.value = dateStr + 'T09:00';
            deriveGenAt();
          }
        }
      }, 100);
    }
  } catch(e) {}
})();

function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`}function hn(e){return`
<div class="space-y-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="section-title"><i class="fas fa-users-gear"></i>アカウント管理</h1>
      <p class="section-desc">Xアカウントの登録・トークン管理を行います。</p>
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
        <thead><tr><th>アカウント名</th><th>@handle</th><th>最終投稿</th><th>状態</th><th></th></tr></thead>
        <tbody>
          ${e.accounts.map(t=>`
            <tr>
              <td class="font-semibold">${w(t.account_name)}</td>
              <td class="text-accent">@${w(t.x_username||"未認証")}</td>
              <td class="text-xs text-ink-muted">${t.last_posted_at||"-"}</td>
              <td>${t.is_active?'<span class="pill pill-ok">有効</span>':'<span class="pill pill-soft">停止</span>'}</td>
              <td class="text-right">
                <button class="btn btn-subtle btn-sm" onclick="testAcct(${t.id})"><i class="fas fa-vial"></i>接続テスト</button>
                <button class="btn btn-ghost btn-sm" onclick="openEditAcct(${t.id})" style="min-width:4.8rem;background:#fff;color:#1D4ED8;border-color:#BFDBFE"><i class="fas fa-pen"></i> 編集</button>
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
  modal.innerHTML =
    '<div style="background:#fff;border-radius:.75rem;max-width:32rem;width:100%;padding:1.5rem">' +
      '<div class="flex items-center justify-between mb-4">' +
        '<h3 class="text-lg font-bold">Xアカウント編集</h3>' +
        '<button onclick="document.getElementById(\\'edit-acct-modal\\').remove()" class="text-ink-muted"><i class="fas fa-xmark text-xl"></i></button>' +
      '</div>' +
      '<div class="space-y-3">' +
        '<div><label class="field-label">表示名</label><input type="text" id="ea-name" class="inp" value="' + name + '"></div>' +
        '<div class="alert alert-info text-xs">Access Token / Secret は変更する場合だけ入力してください。X Developer Portalで再生成した2つを同時に更新します。</div>' +
        '<div><label class="field-label">Access Token</label><input type="text" id="ea-token" class="inp input-mono" placeholder="新しいトークン（変更時のみ）"></div>' +
        '<div><label class="field-label">Access Token Secret</label><input type="password" id="ea-secret" class="inp input-mono" placeholder="新しいSecret（変更時のみ）"></div>' +
        '<div class="flex gap-2 pt-2">' +
          '<button class="btn btn-ghost flex-1" onclick="document.getElementById(\\'edit-acct-modal\\').remove()">キャンセル</button>' +
          '<button class="btn btn-primary flex-1" onclick="submitEditAcct(' + id + ')"><i class="fas fa-check"></i>保存</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
}
async function submitAddAcct() {
  const body = {
    account_name: document.getElementById('na-name').value.trim(),
    access_token: document.getElementById('na-token').value.trim(),
    access_token_secret: document.getElementById('na-secret').value.trim(),
  };
  if (!body.account_name || !body.access_token || !body.access_token_secret) { toast('全て入力してください','err'); return; }
  const r = await fetch('/api/admin/accounts', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.success) { toast('追加しました','ok'); location.reload(); } else toast('失敗','err');
}
async function submitEditAcct(id) {
  const body = { account_name: document.getElementById('ea-name').value.trim() };
  const token = document.getElementById('ea-token').value.trim();
  const secret = document.getElementById('ea-secret').value.trim();
  if (token) body.access_token = token;
  if (secret) body.access_token_secret = secret;
  if (!body.account_name) { toast('表示名を入力してください','err'); return; }
  const r = await fetch('/api/admin/accounts/' + id, { method:'PUT', headers:{'content-type':'application/json'}, body: JSON.stringify(body) });
  const j = await r.json();
  if (j.success) { toast('保存しました','ok'); location.reload(); } else toast('失敗: '+(j.error||''),'err');
}
async function testAcct(id) {
  const r = await fetch('/api/admin/accounts/' + id + '/test', { method:'POST' });
  const j = await r.json();
  if (j.success) { toast((j.message || ('接続OK: @' + (j.me?.username || 'ok'))),'ok'); location.reload(); }
  else toast('接続NG: ' + (j.error || ''),'err');
}
async function delAcct(id) {
  if (!confirm('削除しますか?')) return;
  await fetch('/api/admin/accounts/' + id, { method:'DELETE' });
  location.reload();
}
function escapeHtml(s) { return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
<\/script>`}function fn(e){const t=[{key:"posts",label:"投稿キュー",desc:"全投稿データ（予約・投稿済・失敗含む）",icon:"fa-brands fa-x-twitter",color:"text-blue-600"},{key:"logs",label:"投稿ログ",desc:"投稿実行の全履歴（成功・失敗）",icon:"fa-clipboard-list",color:"text-emerald-600"},{key:"drafts",label:"下書き",desc:"保存済みの下書きデータ",icon:"fa-file-pen",color:"text-sky-600"},{key:"kpi",label:"KPI",desc:"日別投稿数・失敗数の統計",icon:"fa-chart-line",color:"text-rose-600"},{key:"accounts",label:"Xアカウント",desc:"アカウント情報（トークン除外）",icon:"fa-users-gear",color:"text-indigo-600"}],s=[{key:"admin/users",label:"ユーザー一覧",desc:"全ユーザー（プラン・承認状態含む）",icon:"fa-users",color:"text-blue-600"},{key:"admin/licenses",label:"ライセンス",desc:"ライセンスキーの全データ",icon:"fa-key",color:"text-amber-600"},{key:"admin/subs",label:"サブスクリプション",desc:"全契約情報",icon:"fa-credit-card",color:"text-emerald-600"},{key:"admin/audit",label:"監査ログ",desc:"認証・操作ログ",icon:"fa-shield-halved",color:"text-red-600"}];return`
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
      ${t.map(a=>`
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${a.icon} ${a.color}"></i>
                <span class="font-semibold text-sm text-ink">${a.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${a.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${a.key}')" title="${a.label}をCSVでダウンロード">
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
      ${s.map(a=>`
        <div class="border border-line rounded-lg p-4 hover:border-accent hover:bg-accent-light/30 transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <i class="fas ${a.icon} ${a.color}"></i>
                <span class="font-semibold text-sm text-ink">${a.label}</span>
              </div>
              <p class="text-xs text-ink-muted">${a.desc}</p>
            </div>
            <button class="btn btn-ghost btn-sm flex-shrink-0" onclick="dlExport('${a.key}')" title="${a.label}をCSVでダウンロード">
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
<\/script>`}function bn(e){const t=e.settings||{};return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-key"></i>API設定</h1>
    <p class="section-desc">X API / OpenAI / Google Gemini / Telegram の設定を行います。</p>
  </div>

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-x-twitter"></i> X API設定（OAuth 1.0a User Context）</h3>
    <div class="alert alert-warn">
      <i class="fas fa-triangle-exclamation" style="margin-top:2px"></i>
      <div style="font-size:.82rem">重要: App permissions を「Read」から「Read and Write」に変更した場合、必ず「Keys and tokens」タブで <strong>Access Token &amp; Secret を Regenerate（再発行）</strong> してください。</div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key (Consumer Key)</label>
      <input type="text" id="api-xk" class="inp input-mono" placeholder="${t.api_key_set?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Secret (Consumer Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" placeholder="${t.api_secret_set?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:.75rem">
      <div>
        <label class="field-label"><i class="fas fa-id-card icon-blue"></i>OAuth2 Client ID</label>
        <input type="text" id="api-xcid" class="inp input-mono" placeholder="X Developer Portal の Client ID" value="${t.oauth2_client_id||""}">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-user-lock icon-blue"></i>OAuth2 Client Secret</label>
        <input type="password" id="api-xcsec" class="inp input-mono" placeholder="${t.oauth2_client_secret_set?"設定済み（変更する場合のみ入力）":"Web App/Automated App の Client Secret"}" value="">
      </div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-user-lock icon-blue"></i>OAuth2 User Access Token (tweet.write)</label>
      <input type="password" id="api-xoauth2" class="inp input-mono" placeholder="${t.oauth2_user_token_set?"設定済み（変更する場合のみ入力）":"通常は下のOAuth2認証ボタンで自動保存"}" value="">
      <div style="font-size:.75rem;color:var(--ink-muted);margin-top:.25rem">投稿にはBearer Tokenではなく、tweet.write付きのユーザーAccess Tokenが必要です。</div>
    </div>
    <div class="soft-panel" style="padding:.75rem;border-radius:.5rem;background:#F8FAFC;border:1px solid var(--border)">
      <div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.35rem">Developer Portal に登録するCallback URL</div>
      <code id="x-oauth-callback" style="display:block;font-size:.78rem;word-break:break-all;color:#111827;background:#fff;border:1px solid var(--border);padding:.45rem;border-radius:.35rem"></code>
      <button type="button" class="btn btn-subtle btn-sm" style="margin-top:.5rem" onclick="location.href='/api/admin/x/oauth2/start'"><i class="fa-brands fa-x-twitter"></i> X OAuth2認証を開始</button>
    </div>
    <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveXApi()"><i class="fas fa-save"></i>保存</button>
      <button class="btn btn-ghost" onclick="testApi('x')"><i class="fas fa-plug"></i>接続テスト</button>
      <button class="btn btn-ghost" onclick="testXPostPermission()"><i class="fa-brands fa-x-twitter"></i>投稿権限テスト（投稿→削除）</button>
      <span id="xapi-status" style="font-size:.8rem;color:var(--ink-muted)">未接続確認（保存後に「接続テスト」を実行してください）</span>
      <span id="xpost-status" style="font-size:.8rem;color:var(--ink-muted)"></span>
    </div>
  </div>

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

  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-telegram" style="color:#2AABEE"></i> Telegram 通知設定</h3>
    <p style="font-size:.82rem;color:var(--ink-muted)">投稿成功・失敗を Telegram に通知します（任意）。</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div>
        <label class="field-label"><i class="fas fa-robot icon-blue"></i>Bot Token</label>
        <input type="password" id="api-tg-tok" class="inp input-mono" placeholder="${t.telegram_bot_token?"✓ 設定済み（変更する場合は新しいキーを入力）":"未設定"}" value="">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-hashtag icon-blue"></i>Chat ID</label>
        <input type="text" id="api-tg-chat" class="inp input-mono" placeholder="例: -1001234567890" value="${w(t.telegram_chat_id||"")}" pattern="-?[0-9]+">
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
function setStatus(id,msg,ok){const el=document.getElementById(id);if(el){el.textContent=msg;el.style.color=ok?'#059669':'#DC2626';}}
setTimeout(()=>{const cb=document.getElementById('x-oauth-callback');if(cb)cb.textContent=location.origin+'/api/admin/x/oauth2/callback';},0);
async function saveXApi(){
  const r=await fetch('/api/admin/api-settings/x',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({api_key:document.getElementById('api-xk').value,api_secret:document.getElementById('api-xs').value,oauth2_client_id:document.getElementById('api-xcid')?document.getElementById('api-xcid').value:'',oauth2_client_secret:document.getElementById('api-xcsec')?document.getElementById('api-xcsec').value:'',oauth2_user_token:document.getElementById('api-xoauth2')?document.getElementById('api-xoauth2').value:''})});
  const j=await r.json();
  if(j.success){toast('X API設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
window.saveXApi = saveXApi;
async function saveOpenAI(){
  const key=document.getElementById('api-oai').value.trim();
  const r=await fetch('/api/admin/api-settings/openai',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({openai_key:key,openai_model:document.getElementById('api-model').value})});
  const j=await r.json();
  if(j.success){toast('OpenAI設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
window.saveOpenAI = saveOpenAI;
async function saveGemini(){
  const key=document.getElementById('api-gem').value.trim();
  const r=await fetch('/api/admin/api-settings/gemini',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({gemini_key:key,gemini_model:document.getElementById('api-gem-model').value})});
  const j=await r.json();
  if(j.success){toast('Gemini設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
window.saveGemini = saveGemini;
async function saveTelegram(){
  const chatId = document.getElementById('api-tg-chat').value.trim();
  if (chatId && !/^-?[0-9]+$/.test(chatId)) {
    toast('Chat IDは数字のみ（例: -1001234567890）','err'); return;
  }
  const r=await fetch('/api/admin/api-settings/telegram',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({telegram_token:document.getElementById('api-tg-tok').value,telegram_chat_id:chatId})});
  const j=await r.json();
  if(j.success){toast('Telegram設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
window.saveTelegram = saveTelegram;
async function testXPostPermission(){
  if(!confirm('公開のテスト投稿を1件作成し、成功後すぐ削除します。実行しますか？'))return;
  setStatus('xpost-status','投稿権限テスト中...',true);
  try{
    const r=await fetch('/api/admin/x/post-permission-test',{method:'POST'});
    const j=await r.json();
    if(j.success){setStatus('xpost-status','OK: '+(j.tweet_id?('ID '+j.tweet_id):'')+(j.deleted?' / 削除済':' / 削除未確認'),true);toast('投稿権限テスト成功','ok');}
    else{setStatus('xpost-status','NG: '+(j.error||'投稿権限テスト失敗'),false);toast('投稿権限テスト失敗','err');}
  }catch(e){setStatus('xpost-status','NG: ネットワークエラー',false);toast('投稿権限テスト失敗','err');}
}
window.testXPostPermission = testXPostPermission;
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
window.testApi = testApi;
<\/script>`}const H=new A;async function gn(e,t){const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`).bind(t.id).all(),a=(s||[]).map(i=>({id:i.id,account_name:i.account_name,x_username:i.x_username})),n=(s||[]).find(i=>i.is_current===1);return{accounts:a,currentAccountId:(n==null?void 0:n.id)??null}}H.get("/",e=>e.redirect("/login"));async function K(e,t,s){const a=e.get("user"),{accounts:n,currentAccountId:i}=await gn(e,a),r=n.length>0&&i!==null,o=await Promise.resolve(s({user:a,hasAccount:r,accounts:n,currentAccountId:i})),d=an({active:t,user:a,accounts:n,currentAccountId:i,pageBody:o});return e.html(It("GE365x",d))}H.get("/dashboard",m,async e=>K(e,"dashboard",async({user:t,hasAccount:s})=>{const a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?").bind(t.id).first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'").bind(t.id).first(),i=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved','scheduled')").bind(t.id).first(),r=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')").bind(t.id).first(),{results:o}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id`).bind(t.id).all(),{results:d}=await e.env.DB.prepare(`SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`).bind(t.id).all();return nn({stats:{accounts:(a==null?void 0:a.n)??0,today:(n==null?void 0:n.n)??0,pending:(i==null?void 0:i.n)??0,failed:(r==null?void 0:r.n)??0},health:o||[],recentLogs:d||[]})}));H.get("/dashboard/target",m,async e=>K(e,"target",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return rn({target:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/voice",m,async e=>K(e,"voice",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return on({voice:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/pattern",m,async e=>K(e,"pattern",async({user:t,hasAccount:s,currentAccountId:a,accounts:n})=>{const i=String(a??"default"),r=await e.env.DB.prepare("SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),o=await e.env.DB.prepare("SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),d=n.find(l=>l.id===a);return dn({hasAccount:s,noAccountAlert:he,target:r,voice:o,currentAcct:d})}));H.get("/dashboard/generate",m,async e=>K(e,"generate",({hasAccount:t})=>ln({hasAccount:t,noAccountAlert:he})));H.get("/dashboard/posts",m,async e=>K(e,"posts",async({user:t,hasAccount:s})=>{const n=e.req.query("month")||new Date().toISOString().slice(0,7),[i,r]=n.split("-"),{results:o}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, pq.scheduled_at, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`).bind(t.id,n).all(),d=(o||[]).length,c=(o||[]).filter(_=>_.status==="posted").length,p=(o||[]).filter(_=>_.status==="failed"||_.status==="rejected"||_.status==="error").length,sched=(o||[]).filter(_=>(_.status==="approved"||_.status==="pending"||_.status==="publishing")&&_.scheduled_at).length,drft=(o||[]).filter(_=>_.status==="draft").length,l=(o||[]).filter(_=>(_.status==="pending"||_.status==="approved")&&!_.scheduled_at).length;return cn({hasAccount:s,noAccountAlert:he,month:n,y:i,m:parseInt(r,10),posts:o||[],stats:{total:d,pending:l,posted:c,failed:p,scheduled:sched,draft:drft}})}));H.get("/dashboard/thread",m,async e=>K(e,"thread",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`).bind(t.id).all();return un({hasAccount:s,noAccountAlert:he,history:a||[]})}));H.get("/dashboard/scheduled",m,async e=>K(e,"scheduled",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`).bind(t.id).all();return mn({hasAccount:s,noAccountAlert:he,scheduled:a||[]})}));H.get("/dashboard/autopilot",m,async e=>K(e,"autopilot",async({user:t,hasAccount:s,accounts:a})=>{const{results:n}=await e.env.DB.prepare(`SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`).bind(t.id).all();return _n({hasAccount:s,noAccountAlert:he,accounts:a,jobs:n||[]})}));H.get("/dashboard/accounts",m,async e=>K(e,"accounts",async({user:t})=>{const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return hn({accounts:s||[]})}));H.get("/dashboard/api",m,async e=>K(e,"api",async({user:t})=>{const s=await e.env.DB.prepare("SELECT * FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first();let xKeyDec="",xSecDec="";if(s){try{xKeyDec=s.api_key?await lt(s.api_key,e.env.ENCRYPTION_KEY):""}catch{}try{xSecDec=s.api_secret?await lt(s.api_secret,e.env.ENCRYPTION_KEY):""}catch{}}const{results:ss}=await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','gemini_api_key','gemini_model','telegram_bot_token','telegram_chat_id','x_oauth2_user_token','x_oauth2_client_id','x_oauth2_client_secret')").all();const sm={};for(const r of(ss||[]))sm[r.key]=r.value;return bn({settings:{api_key:xKeyDec,api_secret:xSecDec,api_key_set:!!xKeyDec,api_secret_set:!!xSecDec,openai_api_key:sm.openai_api_key||"",openai_model:sm.openai_model||"",gemini_api_key:sm.gemini_api_key||"",gemini_model:sm.gemini_model||"",telegram_bot_token:sm.telegram_bot_token||"",telegram_chat_id:sm.telegram_chat_id||"",oauth2_user_token_set:!!sm.x_oauth2_user_token,oauth2_client_id:sm.x_oauth2_client_id||"",oauth2_client_secret_set:!!sm.x_oauth2_client_secret}})}));H.get("/dashboard/export",m,async e=>K(e,"export",({user:t})=>fn({isAdmin:t.is_admin})));const F=new A;
const __GE365X_MANUAL=[
{title:"X API設定の手順",keywords:["api","x api","oauth","oauth1","oauth2","設定","投稿権限"],answer:`このWEB版は、OAuth2のユーザーAccess Tokenが保存されている場合はOAuth2で /2/tweets へ投稿し、未設定または失敗した場合はOAuth 1.0a User Contextへフォールバックします。画像・動画アップロードはOAuth 1.0a署名の経路も使うため、一般ユーザーには両方の設定を推奨します。\n\n必要な値は、API Key / API Secret、Access Token / Access Token Secret、OAuth2 Client ID、必要に応じてOAuth2 Client Secretです。X公式では、OAuth 1.0aはAPI key/secretとAccess token/secretでユーザーとしてリクエストを署名すると説明されています。OAuth2はAuthorization Code with PKCEを有効化し、tweet.writeなどのscopeを付けたユーザーAccess Tokenを取得します。\n\n手順: 1. X Developer PortalでProject/Appを作成します。2. User authentication settingsを開きます。3. App permissionsをRead and Writeにします。4. OAuth 1.0aとOAuth2を有効化します。5. Callback URLに、この画面に表示される /api/admin/x/oauth2/callback を完全一致で登録します。6. Keys and tokensでAPI Key/Secret、Access Token/Secretを発行します。7. API設定画面に保存します。8. OAuth2認証を開始し、Xで許可します。9. 接続テスト、投稿権限テストを順に実行します。\n\n公式資料: https://docs.x.com/fundamentals/authentication/oauth-1-0a/overview / https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code / https://docs.x.com/x-api/posts/manage-tweets/quickstart`},
{title:"初回セットアップ",keywords:["初回","セットアップ","はじめて","登録","ログイン"],answer:`無料トライアルはログイン画面の「無料トライアル登録」から登録すると自動承認され、そのまま利用できます。購入者は /license のライセンス認証画面でメール、パスワード、ライセンスキーを入力すると自動承認されます。ログイン後、API設定、Xアカウント管理、ターゲット設定、ブランドボイスの順に設定してください。最低限必要なのはX API設定とXアカウント管理です。`},
{title:"投稿の作り方",keywords:["投稿","生成","140","フル","予約","今すぐ"],answer:`X投稿管理またはオートパイロットから投稿を作成します。140文字を選ぶと1投稿に収まる短文、フル文章を選ぶと長文投稿用の文章になります。内容を確認し、今すぐ投稿または予約投稿を選びます。予約投稿はCron Triggerが有効なら自動で実行されます。`},
{title:"ツリー投稿",keywords:["ツリー","返信","コメント","id","画像","動画"],answer:`ツリー投稿では、まず返信先となる自分の投稿を選びます。表示された投稿IDは数字の文字列として扱われます。返信本文を1件ずつ入力し、必要なら画像や動画を添付します。最大10件まで予約できます。予約時間になると、1件目は選んだ投稿IDへ返信し、2件目以降は直前の返信IDへつながります。`},
{title:"トライアルとライセンス",keywords:["トライアル","ライセンス","期限","7日","登録フォーム"],answer:`無料トライアル登録では、管理画面のシステム設定にあるトライアル日数が使われます。登録は自動承認です。7日に設定すると、登録日から7日後に利用期限が切れます。購入者は /license の専用認証画面でライセンスキーを入力すると、自動で承認・ログインできます。期限切れ後はログインとAPI利用が止まります。`}
];function __manualPick(q){const n=String(q||"").toLowerCase();let best=__GE365X_MANUAL[0],score=-1;for(const item of __GE365X_MANUAL){const s=item.keywords.reduce((a,k)=>a+(n.includes(String(k).toLowerCase())?1:0),0);if(s>score){best=item;score=s}}return best}function __manualHtml(){return `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GE365X 初心者マニュアル</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Noto Sans JP',sans-serif;background:#f7f8fb;color:#1f2937;line-height:1.8;margin:0}.wrap{max-width:920px;margin:0 auto;padding:32px 18px}.card{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:20px;margin:14px 0}h1{font-size:28px}h2{font-size:20px;margin:0 0 8px}a{color:#2563eb}</style></head><body><main class="wrap"><h1>Growth-engine365X 初心者マニュアル</h1><p>初めて使う人向けに、設定から投稿までの流れを順番にまとめています。</p>${__GE365X_MANUAL.map(x=>`<section class="card"><h2>${w(x.title)}</h2><p>${w(x.answer).replace(/\n/g,"<br>")}</p></section>`).join("")}<section class="card"><h2>公式リンク</h2><p><a href="https://docs.x.com/fundamentals/authentication/oauth-1-0a/overview">OAuth 1.0a公式</a><br><a href="https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code">OAuth2 PKCE公式</a><br><a href="https://docs.x.com/x-api/posts/manage-tweets/quickstart">投稿API公式Quickstart</a></p></section></main></body></html>`}
F.get("/manual",e=>e.html(__manualHtml()));F.get("/api/admin/manual",m,e=>e.json({sections:__GE365X_MANUAL}));F.get("/api/admin/chatbot/topics",m,e=>e.json({topics:__GE365X_MANUAL.map((x,i)=>({id:i,title:x.title}))}));F.post("/api/admin/chatbot/ask",m,async e=>{const body=await e.req.json().catch(()=>({}));const item=__manualPick(body.question||"");return e.json({title:item.title,answer:item.answer})});F.get("/api/server-time",e=>e.json({now:g(),now_ms:Date.now(),build:"ver1.0"}));
// 手動cron起動: ブラウザから /api/admin/cron/run-tick を叩くと即時実行（cron triggers が動かない時の救済）
F.post("/api/admin/cron/run-tick",m,async e=>{
  try {
    let apj=null;
    try{
      const ap=await S.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}), e.env, e.executionCtx);
      apj=await ap.json().catch(()=>({}));
    }catch(apErr){apj={ok:false,error:(apErr&&apErr.message)||"autopilot_tick_failed"}}
    const r = await S.fetch(new Request("https://internal/cron/tick",{method:"POST"}), e.env, e.executionCtx);
    const j = await r.json().catch(()=>({}));
    return e.json({success:true, kind:'scheduler', autopilot_result: apj, result: j});
  } catch(err) {
    return e.json({success:false, error: err.message}, 500);
  }
});
F.post("/api/admin/cron/run-autopilot",m,async e=>{
  try {
    const r = await S.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}), e.env, e.executionCtx);
    const j = await r.json().catch(()=>({}));
    const tick = await S.fetch(new Request("https://internal/cron/tick",{method:"POST"}), e.env, e.executionCtx);
    const tickJson = await tick.json().catch(()=>({}));
    return e.json({success:true, kind:'autopilot', result: j, post_result: tickJson});
  } catch(err) {
    return e.json({success:false, error: err.message}, 500);
  }
});
F.get("/admin",m,R,e=>{const t=`
<div class="min-h-screen flex flex-col">
  <!-- ヘッダ -->
  <header class="border-b border-brand-800/40 bg-surface-raised/80 backdrop-blur">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="brand-logo w-10 h-10 rounded-xl flex items-center justify-center">
          <i class="fas ${G.icon} text-white"></i>
        </div>
        <div>
          <div class="text-white font-bold tracking-tight">${G.name} <span class="text-brand-400 text-xs font-normal">管理</span></div>
          <div class="text-brand-400 text-xs">${G.longName}</div>
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
      <button onclick="showSection('posts')"     id="nav-posts"     class="tab-trigger">投稿管理</button>
      <button onclick="showSection('accounts')"  id="nav-accounts"  class="tab-trigger">Xアカウント</button>
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

    <!-- === 投稿管理 === -->
    <section id="section-posts" class="space-y-4 hidden-force">
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

    <!-- === Xアカウント === -->
    <section id="section-accounts" class="space-y-4 hidden-force">
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
const sections = ['users','licenses','subs','posts','accounts','audit','settings'];
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
  const r = await fetch('/api/admin/settings');
  const j = await r.json();
  // トライアル日数設定のみ表示（管理画面では他の設定項目は表示しない）
  const allowedKeys = ['trial_days'];
  const filtered = (j.settings || []).filter(s => allowedKeys.includes(s.key));
  // trial_days がレスポンスに無い場合はデフォルト14日として追加
  if (!filtered.find(s => s.key === 'trial_days')) {
    filtered.push({ key: 'trial_days', value: '14', description: '新規登録時に付与するトライアル日数' });
  }
  const form = document.getElementById('settings-form');
  form.innerHTML = filtered.map(s => \`
    <div class="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm" style="border:1px solid #E5E7EB">
      <div class="flex-1">
        <div class="font-bold text-lg" style="color:#1F2937">\${s.key === 'trial_days' ? 'トライアル日数' : s.key}</div>
        <div class="text-sm" style="color:#6B7280">\${s.description || '新規登録時に付与するトライアル日数'}</div>
      </div>
      <input type="number" min="0" id="setting-\${s.key}" class="input-field" style="width:8rem;font-size:1rem" value="\${s.value || '14'}">
      <span style="color:#6B7280">日</span>
      <button onclick="saveSetting('\${s.key}')" class="btn-primary" style="padding:.5rem 1.25rem;background:#2563EB;color:#fff;border-radius:.4rem;border:none;cursor:pointer;font-weight:600"><i class="fas fa-save"></i> 保存</button>
    </div>
  \`).join('');
}
async function saveSetting(key) {
  const value = document.getElementById('setting-' + key).value;
  const r = await fetch('/api/admin/settings', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ key, value }),
  });
  const j = await r.json();
  if (j.success) alert('保存しました: ' + (key === 'trial_days' ? 'トライアル日数 = ' + value + '日' : key));
  else alert('保存失敗: ' + (j.error || 'unknown'));
}

// ---------- 一括ダウンロード ----------
function dlAdminExport(key) {
  const url = '/api/admin/export/' + key;
  fetch(url).then(r => {
    if (!r.ok) throw new Error('ダウンロード失敗 (' + r.status + ')');
    const cd = r.headers.get('content-disposition') || '';
    const match = cd.match(/filename="?([^"]+)"?/);
    const filename = match ? match[1] : 'ge365x_' + key.replace('/', '_') + '.' + (key.includes('all') ? 'json' : 'csv');
    return r.blob().then(blob => ({ blob, filename }));
  }).then(({ blob, filename }) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }).catch(e => alert(e.message));
}

// 起動時
showSection('users');
<\/script>
`;return e.html(It("管理画面",t,{bodyClass:"bg-paper text-ink min-h-screen font-sans antialiased admin-body"}))});F.get("/api/admin/users",m,R,async e=>{await e.env.DB.prepare(`UPDATE users SET is_approved=1, updated_at=datetime('now','+9 hours') WHERE is_approved=0 AND id IN (SELECT user_id FROM user_subscriptions WHERE status='trial' AND (current_period_end IS NULL OR current_period_end >= datetime('now','+9 hours')))`).run().catch(()=>{});const t=e.req.query("filter")||"all",s=[];t==="pending"&&s.push("u.is_approved = 0"),t==="approved"&&s.push("u.is_approved = 1"),t==="admin"&&s.push("u.is_admin = 1");const a=`
    SELECT u.id, u.email, u.is_approved, u.is_admin, u.trial_start, u.trial_end, u.created_at,
           s.plan_code, s.status AS sub_status
      FROM users u
      LEFT JOIN user_subscriptions s ON s.user_id = u.id
      ${s.length?"WHERE "+s.join(" AND "):""}
      ORDER BY u.id DESC
      LIMIT 200`,{results:n}=await e.env.DB.prepare(a).all();return e.json({users:n||[]})});F.post("/api/admin/users/:id/approve",m,R,async e=>{const t=parseInt(e.req.param("id"),10),{is_approved:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_approved=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_approval",{userId:e.get("user").id,metadata:{target_user_id:t,is_approved:s}}),e.json({ok:!0})});F.post("/api/admin/users/:id/admin",m,R,async e=>{const t=parseInt(e.req.param("id"),10),{is_admin:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_admin=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_admin",{userId:e.get("user").id,metadata:{target_user_id:t,is_admin:s}}),e.json({ok:!0})});F.get("/api/admin/licenses",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.*, u.email AS user_email
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 500`).all();return e.json({licenses:t||[]})});F.post("/api/admin/licenses/issue",m,R,async e=>{const t=e.get("user"),{plan_code:s,license_type:a,expires_at:n,count:i=1,note:r}=await e.req.json();if(i<1||i>100)return e.json({error:"invalid_count"},400);let exp=n||null;if(!exp&&a==="trial"){const td=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first();const days=Math.max(0,parseInt((td==null?void 0:td.value)??"14",10)||0);exp=new Date(Date.now()+324e5+days*864e5).toISOString().slice(0,10)}const o=[];for(let d=0;d<i;d++){let l=Zt("VPS-GE365X");for(let c=0;c<3&&await e.env.DB.prepare("SELECT 1 FROM licenses WHERE license_key=?").bind(l).first();c++)l=Zt("VPS-GE365X");await e.env.DB.prepare(`INSERT INTO licenses (license_key, license_type, plan_code, is_active, expires_at, issued_by, note)
       VALUES (?, ?, ?, 1, ?, ?, ?)`).bind(l,a,s,exp?exp+" 23:59:59":null,t.id,r||null).run(),o.push(l)}return await Z(e,"admin_issue_license",{userId:t.id,metadata:{count:i,plan_code:s,license_type:a}}),e.json({ok:!0,keys:o})});F.post("/api/admin/licenses/:id/revoke",m,R,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=0, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type)
     VALUES (?, ?, 'revoked')`).bind(t,e.get("user").id).run(),e.json({ok:!0})});F.post("/api/admin/licenses/:id/reactivate",m,R,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),e.json({ok:!0})});F.get("/api/admin/subscriptions",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.*, u.email AS user_email
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 300`).all();return e.json({subscriptions:t||[]})});F.get("/api/admin/posts/summary",m,R,async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue").first(),s=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE status='pending'").first(),a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='success'").first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='failed'").first(),{results:i}=await e.env.DB.prepare(`SELECT pl.created_at, pl.content, pl.status,
            u.email, x.x_screen_name
       FROM post_logs pl
       LEFT JOIN users u  ON u.id = pl.user_id
       LEFT JOIN x_accounts x ON x.id = pl.x_account_id
       ORDER BY pl.created_at DESC LIMIT 100`).all();return e.json({stats:[{label:"全キュー",value:(t==null?void 0:t.n)??0},{label:"pending",value:(s==null?void 0:s.n)??0},{label:"成功",value:(a==null?void 0:a.n)??0},{label:"失敗",value:(n==null?void 0:n.n)??0}],recent:i||[]})});F.get("/api/admin/x-accounts",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT xa.id, xa.x_screen_name, xa.is_active, xa.last_used_at, xa.token_expires_at,
            u.email AS user_email
       FROM x_accounts xa
       LEFT JOIN users u ON u.id = xa.user_id
       ORDER BY xa.id DESC LIMIT 500`).all();return e.json({accounts:t||[]})});F.get("/api/admin/audit-logs",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 300`).all();return e.json({logs:t||[]})});F.get("/api/admin/settings",m,R,async e=>{const{results:t}=await e.env.DB.prepare("SELECT key, value, description FROM system_settings ORDER BY key").all();return e.json({settings:t||[]})});F.post("/api/admin/settings",m,R,async e=>{const{key:t,value:s}=await e.req.json();return await e.env.DB.prepare(`INSERT INTO system_settings (key, value, updated_at)
     VALUES (?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s).run(),e.json({ok:!0})});const fe=new A;fe.post("/api/auth/register",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='invite_only'").first();if((n==null?void 0:n.value)==="1")return e.json({error:"invite_only"},403);if(await e.env.DB.prepare("SELECT 1 FROM users WHERE email = ?").bind(s).first())return e.json({error:"email_taken"},409);const r=await Bt(a),o=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first(),d=Math.max(0,parseInt((o==null?void 0:o.value)??"14",10)||0);const _=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,r,1,d).run()).meta.last_row_id;return await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(_,d).run(),await e.env.DB.prepare(`INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,_,d).run(),await Z(e,"register",{userId:_,email:s}),e.json({ok:!0,user_id:_,approved:true,message:"無料トライアル登録が完了しました。ログインしてください。"})});fe.post("/api/auth/login",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!s||!a)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?").bind(s).first();if(!n)return await Z(e,"login_fail",{email:s,metadata:{reason:"no_user"}}),e.json({error:"invalid_credentials"},401);if(!await Cs(a,n.password_hash))return await Z(e,"login_fail",{userId:n.id,email:s,metadata:{reason:"bad_password"}}),e.json({error:"invalid_credentials"},401);let sub=await e.env.DB.prepare("SELECT status,current_period_end FROM user_subscriptions WHERE user_id = ?").bind(n.id).first();if(n.is_approved===0){if(sub&&sub.status==="trial"&&(!sub.current_period_end||sub.current_period_end>=g())){await e.env.DB.prepare("UPDATE users SET is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(n.id).run();n.is_approved=1}else return await Z(e,"login_blocked",{userId:n.id,email:s,metadata:{reason:"not_approved"}}),e.json({error:"not_approved"},403)}if(!n.is_admin){const exp=(sub&&sub.current_period_end)||n.trial_end||null;if(exp&&exp<g()){try{await e.env.DB.prepare("UPDATE user_subscriptions SET status='expired', updated_at=datetime('now','+9 hours') WHERE user_id=? AND status IN ('trial','active')").bind(n.id).run()}catch{}return await Z(e,"login_blocked",{userId:n.id,email:s,metadata:{reason:"expired"}}),e.json({error:(sub&&sub.status)==="trial"?"trial_expired":"subscription_expired"},403)}}const nowIat=Math.floor(Date.now()/1e3);await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
       VALUES (?, ?, ?, datetime('now','+9 hours'))
       ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind("user_session_iat:"+n.id,String(nowIat),"User session iat (single-device enforcement)").run().catch(()=>{});const r=await za({uid:n.id,email:n.email,adm:n.is_admin===1,iat:nowIat},e.env.JWT_SECRET,3600*24*7),o=Ls(Nt,r,{maxAge:3600*24*7});return await Z(e,"login_success",{userId:n.id,email:s}),new Response(JSON.stringify({ok:!0,user_id:n.id,email:n.email,is_admin:n.is_admin===1}),{headers:{"content-type":"application/json","set-cookie":o}})});fe.post("/api/auth/logout",async e=>{const t=e.get("user");t&&await Z(e,"logout",{userId:t.id,email:t.email});const s=Ls(Nt,"",{maxAge:0});return new Response(JSON.stringify({ok:!0}),{headers:{"content-type":"application/json","set-cookie":s}})});fe.get("/api/auth/me",m,e=>e.json({ok:!0,user:e.get("user")}));fe.post("/api/auth/license/auto-activate",async e=>{const body=await e.req.json().catch(()=>({})),email=(body.email||"").trim().toLowerCase(),password=body.password||"",rawKey=(body.license_key||"").trim().toUpperCase();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||password.length<8)return e.json({error:"invalid_input"},400);if(!rawKey||!Xa(rawKey))return e.json({error:"invalid_license_format"},400);const lic=await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(rawKey).first();if(!lic)return e.json({error:"license_not_found"},404);if(lic.is_active===0)return e.json({error:"license_inactive"},409);if(lic.expires_at&&lic.expires_at<g())return e.json({error:"license_expired"},409);let user=await e.env.DB.prepare("SELECT id,email,password_hash,is_admin FROM users WHERE email = ?").bind(email).first();let userId;if(user){if(!await Cs(password,user.password_hash))return e.json({error:"invalid_credentials"},401);if(lic.user_id&&lic.user_id!==user.id)return e.json({error:"license_already_used"},409);userId=user.id;await e.env.DB.prepare("UPDATE users SET is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(userId).run()}else{if(lic.user_id)return e.json({error:"license_already_used"},409);const hash=await Bt(password),trialEnd=lic.license_type==="trial"&&lic.expires_at?lic.expires_at:null;userId=(await e.env.DB.prepare("INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end) VALUES (?, ?, 1, 0, datetime('now','+9 hours'), ?)").bind(email,hash,trialEnd).run()).meta.last_row_id;user={id:userId,email,is_admin:0}}await e.env.DB.prepare("UPDATE licenses SET user_id=?, activated_at=COALESCE(activated_at, datetime('now','+9 hours')), updated_at=datetime('now','+9 hours') WHERE id=?").bind(userId,lic.id).run();const plan=lic.plan_code||"ge365x_standard",status=lic.license_type==="trial"?"trial":"active",periodEnd=lic.expires_at?lic.expires_at:lic.license_type==="lifetime"?"2099-12-31 23:59:59":null;await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end, updated_at) VALUES (?, ?, ?, datetime('now','+9 hours'), ?, datetime('now','+9 hours')) ON CONFLICT(user_id) DO UPDATE SET plan_code=excluded.plan_code,status=excluded.status,current_period_end=excluded.current_period_end,updated_at=datetime('now','+9 hours')`).bind(userId,plan,status,periodEnd).run();if(lic.license_type==="trial"&&periodEnd)await e.env.DB.prepare("UPDATE users SET trial_end=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(periodEnd,userId).run();await e.env.DB.prepare("INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent) VALUES (?, ?, 'activated', ?, ?)").bind(lic.id,userId,e.req.header("cf-connecting-ip")||"",e.req.header("user-agent")||"").run();const nowIat=Math.floor(Date.now()/1e3);await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at) VALUES (?, ?, ?, datetime('now','+9 hours')) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind("user_session_iat:"+userId,String(nowIat),"User session iat (license auto activation)").run().catch(()=>{});const token=await za({uid:userId,email,adm:false,iat:nowIat},e.env.JWT_SECRET,3600*24*7),cookie=Ls(Nt,token,{maxAge:3600*24*7});await Z(e,"license_auto_activate",{userId,email,metadata:{license_id:lic.id,plan_code:plan,license_type:lic.license_type}});return new Response(JSON.stringify({ok:true,user_id:userId,email,plan_code:plan,status,expires_at:periodEnd}),{status:200,headers:{"content-type":"application/json","set-cookie":cookie}})});fe.post("/api/auth/license/activate",m,async e=>{const t=e.get("user"),{license_key:s}=await e.req.json();if(!s||!Xa(s))return e.json({error:"invalid_license_format"},400);const a=s.trim().toUpperCase(),n=await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(a).first();if(!n)return e.json({error:"license_not_found"},404);if(n.is_active===0)return e.json({error:"license_inactive"},409);if(n.expires_at&&n.expires_at<g())return e.json({error:"license_expired"},409);if(n.user_id&&n.user_id!==t.id)return e.json({error:"license_already_used"},409);await e.env.DB.prepare(`UPDATE licenses
       SET user_id = ?, activated_at = COALESCE(activated_at, datetime('now','+9 hours')),
           updated_at = datetime('now','+9 hours')
     WHERE id = ?`).bind(t.id,n.id).run();const i=n.plan_code||"ge365x_standard",r=n.license_type==="trial"?"trial":"active",o=n.expires_at?n.expires_at:n.license_type==="lifetime"?"2099-12-31 23:59:59":null;return await e.env.DB.prepare(`INSERT INTO user_subscriptions
       (user_id, plan_code, status, started_at, current_period_end, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'), ?, datetime('now','+9 hours'))
     ON CONFLICT(user_id) DO UPDATE SET
       plan_code = excluded.plan_code,
       status    = excluded.status,
       current_period_end = excluded.current_period_end,
       updated_at = datetime('now','+9 hours')`).bind(t.id,i,r,o).run(),await e.env.DB.prepare(`UPDATE users
       SET is_approved = 1, updated_at = datetime('now','+9 hours')
     WHERE id = ? AND is_approved = 0`).bind(t.id).run(),n.license_type==="trial"&&o&&await e.env.DB.prepare("UPDATE users SET trial_end=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(o,t.id).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent)
     VALUES (?, ?, 'activated', ?, ?)`).bind(n.id,t.id,e.req.header("cf-connecting-ip")||"",e.req.header("user-agent")||"").run(),await Z(e,"license_activate",{userId:t.id,email:t.email,metadata:{license_id:n.id,plan_code:i}}),e.json({ok:!0,plan_code:i,status:r,license_type:n.license_type,expires_at:o})});fe.post("/api/auth/password/change",m,async e=>{const t=e.get("user"),{current_password:s,new_password:a}=await e.req.json();if(!s||!a||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(t.id).first();if(!n)return e.json({error:"user_not_found"},404);if(!await Cs(s,n.password_hash))return e.json({error:"invalid_credentials"},401);const r=await Bt(a);return await e.env.DB.prepare("UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(r,t.id).run(),await Z(e,"password_change",{userId:t.id,email:t.email}),e.json({ok:!0})});fe.get("/setup",async e=>{const t=e.req.query("token")||"",s=e.env.ADMIN_PASSWORD||"";if(!s||t!==s)return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f7f8fb}
.card{background:#fff;border-radius:12px;padding:2rem;max-width:420px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,.08);text-align:center}
h2{color:#dc2626;margin:0 0 .5rem}p{color:#6b7280;font-size:.9rem}</style></head>
<body><div class="card"><h2>❌ 認証失敗</h2>
<p>URLに正しい token を付けてください。<br>例: /setup?token=（ADMIN_PASSWORDの値）</p></div></body></html>`,403);const a="admin@ge365x.local",i=await Bt("Ge365x@Admin!"),r=await e.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(a).first();if(r)await e.env.DB.prepare("UPDATE users SET password_hash=?, is_admin=1, is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(i,r.id).run(),await e.env.DB.prepare("UPDATE user_subscriptions SET plan_code='ge365x_pro', status='active', current_period_end='2099-12-31 23:59:59' WHERE user_id=?").bind(r.id).run();else{const d=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
       VALUES (?, ?, 1, 1, datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(a,i).run()).meta.last_row_id;await e.env.DB.prepare(`INSERT OR REPLACE INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
       VALUES (?, 'ge365x_pro', 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(d).run()}return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
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
<tr><td>メールアドレス</td><td>${a}</td></tr>
<tr><td>パスワード</td><td>Ge365x@Admin!</td></tr>
<tr><td>権限</td><td>Admin / Pro</td></tr>
</table>
<a class="btn" href="/login">→ ログイン画面へ</a>
<div class="warn">⚠️ ログイン後すぐにパスワードを変更してください<br>このURLは設定後も有効なため、token を知らない人には教えないでください</div>
</div></body></html>`)});const be=new A;be.get("/api/subscription/plans",async e=>{const{results:t}=await e.env.DB.prepare(`SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`).all(),s=(t||[]).map(a=>({...a,features:a.features?JSON.parse(a.features):[]}));return e.json({plans:s})});be.get("/api/subscription/me",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`).bind(t.id).first();return s?e.json({subscription:{...s,features:s.features?JSON.parse(s.features):[]}}):e.json({subscription:null})});be.post("/api/subscription/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});be.post("/api/subscription/reactivate",m,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});be.get("/api/subscription/payments",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`).bind(t.id).all();return e.json({payments:s||[]})});be.post("/api/subscription/stripe/checkout",m,async e=>e.env.STRIPE_SECRET_KEY?e.json({error:"not_implemented_yet"},501):e.json({error:"stripe_not_configured"},501));be.post("/api/subscription/webhook/stripe",async e=>e.json({received:!0}));const Qt=new TextEncoder,vn="https://api.x.com/2",vnAlt="https://api.twitter.com/2";class $ extends Error{constructor(s,a=0,n="api_error"){super(s);h(this,"statusCode");h(this,"errorType");this.name="XApiError",this.statusCode=a,this.errorType=n}}class Mt extends ${constructor(s){super("Rate limited by X API (429)",429,"rate_limit");h(this,"resetAtEpoch");this.name="XApiRateLimitError",this.resetAtEpoch=s}}function oe(e){return encodeURIComponent(e).replace(/[!'()*]/g,t=>"%"+t.charCodeAt(0).toString(16).toUpperCase())}function yn(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),[...t].map(s=>s.toString(16).padStart(2,"0")).join("")}function En(){return yn(16)}async function xn(e,t){const s=await crypto.subtle.importKey("raw",Qt.encode(e),{name:"HMAC",hash:"SHA-1"},!1,["sign"]),a=await crypto.subtle.sign("HMAC",s,Qt.encode(t)),n=new Uint8Array(a);let i="";for(let r=0;r<n.length;r++)i+=String.fromCharCode(n[r]);return btoa(i)}async function wn(e,t,s,a){const n={oauth_consumer_key:s.consumerKey,oauth_nonce:En(),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.floor(Date.now()/1e3).toString(),oauth_token:s.accessToken,oauth_version:"1.0"},i=new URL(t),r={...n};i.searchParams.forEach((_,b)=>{r[b]=_});const o=Object.keys(r).sort().map(_=>`${oe(_)}=${oe(r[_])}`).join("&"),d=[e.toUpperCase(),oe(`${i.origin}${i.pathname}`),oe(o)].join("&"),l=`${oe(s.consumerSecret)}&${oe(s.accessTokenSecret)}`,c=await xn(l,d);return n.oauth_signature=c,`OAuth ${Object.keys(n).sort().map(_=>`${oe(_)}="${oe(n[_])}"`).join(", ")}`}async function $t(e,t,s,a){
  const bases=(e==="POST"&&t==="/tweets")?[vn,vnAlt]:[vn];
  let lastErr=null;
  for(const base of [...new Set(bases)]){
    const n=`${base}${t}`;
    const i=await wn(e,n,a),r={method:e,headers:{authorization:i,"content-type":"application/json"},signal:AbortSignal.timeout(3e4)};
    s!==void 0&&(r.body=JSON.stringify(s));
    const o=await fetch(n,r);
    if(o.status===429){const d=o.headers.get("x-rate-limit-reset");throw new Mt(d?Number(d):void 0)}
    if(!o.ok){
      const d=await o.text();let detail=d.slice(0,500);
      try{const j=JSON.parse(d);if(j.detail)detail=j.detail;else if(j.errors&&j.errors[0])detail=j.errors[0].message||j.errors[0].detail||detail;else if(j.title)detail=j.title}catch{}
      let hint="";
      if(o.status===401)hint="（401 Unauthorized: X Developer Portalで App permissions を Read+Write に変更後、Keys and tokens タブで Access Token & Secret を再生成してください。再生成後の新しいトークンをアカウント管理に登録し直す必要があります）";
      else if(o.status===403)hint="（403 Forbidden: 投稿権限なし。X Developer Portal の User authentication settings を Read and write に変更後、Access Token & Secret を Regenerate し、API設定とアカウント管理を保存し直してください。build:fix-20260504-reserve-v24）";
      lastErr=new $(`X API ${e} ${t} failed via ${base}: ${o.status} ${detail}${hint}`,o.status,"api_error");
      if(e==="POST"&&t==="/tweets"&&(o.status===403||o.status===404||o.status===453))continue;
      throw lastErr;
    }
    return o.status===204?{}:o.json();
  }
  throw lastErr||new $(`X API ${e} ${t} failed`,0,"api_error");
}
function __xDetailFromRaw(raw){let detail=String(raw||"").slice(0,500);try{const j=JSON.parse(raw);detail=j.detail||(j.errors&&j.errors[0]&&(j.errors[0].message||j.errors[0].detail))||j.title||detail}catch{}return detail}
function __xShouldFallbackV11(err){const m=String((err&&err.message)||err||"");const sc=(err&&err.statusCode)||0;return sc===403||sc===404||sc===453||new RegExp("POST /tweets failed: 403|You are not permitted|client-not-enrolled|Unsupported Authentication","i").test(m)}
async function xV11_statusUpdate(creds,params){const url="https://api.twitter.com/1.1/statuses/update.json";const clean={};for(const k of Object.keys(params||{})){if(params[k]!==void 0&&params[k]!==null&&String(params[k])!=="")clean[k]=String(params[k])}const auth=await xMU_oauth("POST",url,creds,clean);const body=Object.keys(clean).map(k=>encodeURIComponent(k)+"="+encodeURIComponent(clean[k])).join("&");const r=await fetch(url,{method:"POST",headers:{authorization:auth,"content-type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(3e4)});const raw=await r.text();if(!r.ok){const detail=__xDetailFromRaw(raw);throw new $(`X API v1.1 statuses/update failed: ${r.status} ${detail}`,r.status,"api_error_v11")}let j={};try{j=JSON.parse(raw)}catch{}return{id:j.id_str||String(j.id||""),text:j.full_text||j.text||clean.status||""}}
function __xLooksAppOnlyBearer(token){return /^A{8,}/.test(String(token||""))}
async function xOAuth2PostTweet(creds,text,mediaIds,replyToId){const token=(creds&&creds.oauth2AccessToken||"").trim();if(!token)throw new $("OAuth2 User Access Token 未設定",0,"oauth2_missing");if(__xLooksAppOnlyBearer(token))throw new $("OAuth2にApp-only Bearer Tokenが保存されています。投稿にはAPI設定の『X OAuth2認証を開始』で取得したtweet.write付きユーザーAccess Tokenが必要です。",403,"oauth2_app_only_bearer");const body={text};if(replyToId)body.reply={in_reply_to_tweet_id:replyToId};if(mediaIds&&mediaIds.length>0)body.media={media_ids:mediaIds.slice(0,4)};let last=null;for(const base of [vn,vnAlt]){const r=await fetch(`${base}/tweets`,{method:"POST",headers:{authorization:"Bearer "+token,"content-type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(3e4)});const raw=await r.text();if(r.ok){let j={};try{j=JSON.parse(raw)}catch{}return{id:((j.data||{}).id)||"",text:((j.data||{}).text)||text}}last=new $(`X API OAuth2 POST /tweets failed via ${base}: ${r.status} ${__xDetailFromRaw(raw)}`,r.status,"api_error_oauth2")}throw last||new $("X API OAuth2 POST /tweets failed",0,"api_error_oauth2")}
async function xOAuth2Me(creds){const token=(creds&&creds.oauth2AccessToken||"").trim();if(!token)throw new $("OAuth2 User Access Token未設定",0,"oauth2_missing");const r=await fetch(`${vn}/users/me?user.fields=profile_image_url,public_metrics`,{headers:{authorization:"Bearer "+token},signal:AbortSignal.timeout(3e4)});const raw=await r.text();if(!r.ok)throw new $(`X API OAuth2 GET /users/me failed: ${r.status} ${__xDetailFromRaw(raw)}`,r.status,"api_error_oauth2_me");let j={};try{j=JSON.parse(raw)}catch{}return j.data}
async function __postTweetWithFallback(creds,text,mediaIds,replyToId){let oauth2Err=null;if(creds&&creds.oauth2AccessToken){try{return await xOAuth2PostTweet(creds,text,mediaIds,replyToId)}catch(e){oauth2Err=e}}try{if(replyToId)return mediaIds&&mediaIds.length>0?await $sReplyV2(creds,text,replyToId,mediaIds):await $sReplyV2(creds,text,replyToId);return mediaIds&&mediaIds.length>0?await $sV2(creds,text,mediaIds,null):await MsV2(creds,text)}catch(err){if(!__xShouldFallbackV11(err)){if(oauth2Err)err.message=`OAuth2失敗=${oauth2Err.message} / OAuth1失敗=${err.message}`;throw err}const params={status:text};if(mediaIds&&mediaIds.length>0)params.media_ids=mediaIds.slice(0,4).join(",");if(replyToId){params.in_reply_to_status_id=replyToId;params.auto_populate_reply_metadata="true"}try{return await xV11_statusUpdate(creds,params)}catch(err2){const msg=`v13 fallback実行: ${oauth2Err?"OAuth2失敗="+oauth2Err.message+" / ":""}v2投稿失敗 -> v1.1投稿も失敗。v2=${err.message} / v1.1=${err2.message}`;throw new $(msg,err2 instanceof $?err2.statusCode:err.statusCode,"api_error_both")}}}
async function MsV2(e,t){var a,n;const s=await $t("POST","/tweets",{text:t},e);return{id:((a=s==null?void 0:s.data)==null?void 0:a.id)||"",text:((n=s==null?void 0:s.data)==null?void 0:n.text)||t}}
async function $sV2(e,t,s,a){var r,o;const n={text:t};s&&s.length&&(n.media={media_ids:s.slice(0,4)});const i=await $t("POST","/tweets",n,e);return{id:((r=i==null?void 0:i.data)==null?void 0:r.id)||"",text:((o=i==null?void 0:i.data)==null?void 0:o.text)||t}}
async function $sReplyV2(e,t,parentId,s){var r,o;const n={text:t,reply:{in_reply_to_tweet_id:parentId}};s&&s.length&&(n.media={media_ids:s.slice(0,4)});const i=await $t("POST","/tweets",n,e);return{id:((r=i==null?void 0:i.data)==null?void 0:r.id)||"",text:((o=i==null?void 0:i.data)==null?void 0:o.text)||t}}
async function Ms(e,t){return __postTweetWithFallback(e,t,[],null)}
async function $s(e,t,s,a){return __postTweetWithFallback(e,t,s||[],null)}
async function $sReply(e,t,parentId,s){return __postTweetWithFallback(e,t,s||[],parentId)}
async function __xOAuth1PostTweetApiX(creds,text,mediaIds,replyToId){
  const url=`${vn}/tweets`;
  const body={text};
  if(replyToId)body.reply={in_reply_to_tweet_id:replyToId};
  if(mediaIds&&mediaIds.length>0)body.media={media_ids:mediaIds.slice(0,4)};
  const auth=await wn("POST",url,creds);
  const r=await fetch(url,{method:"POST",headers:{authorization:auth,"content-type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(3e4)});
  const raw=await r.text();
  if(!r.ok)throw new $(`OAuth1 POST /2/tweets failed: ${r.status} ${__xDetailFromRaw(raw)}`,r.status,"api_error_oauth1_post");
  let j={};try{j=JSON.parse(raw)}catch{}
  return{id:((j.data||{}).id)||"",text:((j.data||{}).text)||text};
}
async function __xDeleteTweetStrict(creds,tweetId){
  const id=String(tweetId||"").trim();
  if(!id)throw new $("tweet_id missing",0,"tweet_id_missing");
  const url=`${vn}/tweets/${id}`;
  const errors=[];
  if(creds&&creds.oauth2AccessToken){
    const r=await fetch(url,{method:"DELETE",headers:{authorization:"Bearer "+creds.oauth2AccessToken},signal:AbortSignal.timeout(3e4)});
    const raw=await r.text();
    if(r.ok)return true;
    errors.push(`OAuth2 DELETE ${r.status} ${__xDetailFromRaw(raw)}`);
  }
  const auth=await wn("DELETE",url,creds);
  const r=await fetch(url,{method:"DELETE",headers:{authorization:auth},signal:AbortSignal.timeout(3e4)});
  const raw=await r.text();
  if(r.ok)return true;
  errors.push(`OAuth1 DELETE ${r.status} ${__xDetailFromRaw(raw)}`);
  throw new $(`DELETE /2/tweets/${id} failed: ${errors.join(" / ")}`,r.status,"api_error_delete_tweet");
}
function __xTextWeight(text){let w=0;for(const ch of String(text||"")){const cp=ch.codePointAt(0);w+=cp>255?2:1}return w}
function __xNormalizeTweetText(text){return String(text||"").replace(/\r\n/g,"\n").replace(/\r/g,"\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,"").replace(/\n{4,}/g,"\n\n").trim()}
function __xClipWeighted(text,maxWeight){let out="",w=0;for(const ch of String(text||"")){const cw=ch.codePointAt(0)>255?2:1;if(w+cw>maxWeight)break;out+=ch;w+=cw}return out.trim()}
function __xSplitTweetText(text,maxWeight=280){const clean=__xNormalizeTweetText(text);if(__xTextWeight(clean)<=maxWeight)return[clean];const units=clean.split(/(?<=[。！？!?]\s*)|\n{2,}/).map(s=>s.trim()).filter(Boolean);const chunks=[];let cur="";for(const unit of units.length?units:[clean]){const part=unit.trim();if(!part)continue;const next=cur?cur+"\n"+part:part;if(__xTextWeight(next)<=maxWeight){cur=next;continue}if(cur){chunks.push(cur);cur=""}if(__xTextWeight(part)<=maxWeight){cur=part;continue}let rest=part;while(__xTextWeight(rest)>maxWeight){const piece=__xClipWeighted(rest,maxWeight);chunks.push(piece);rest=rest.slice(piece.length).trim()}cur=rest}if(cur)chunks.push(cur);return chunks.filter(Boolean)}
function __xFallbackTweetText(text){
  let clean=__xNormalizeTweetText(text);
  const finance=/FX|投資|資産運用|利益|収益|稼|儲|口座|XM|お金|貯金|資金計画/i.test(clean);
  const suffix=(finance?"\n\n投資判断はご自身で確認してください。":"")+"\n\n投稿メモ: "+g().slice(5,16);
  const base=__xClipWeighted(clean,260-__xTextWeight(suffix));
  return __xNormalizeTweetText(base+suffix);
}
async function __xPostTweetOne(creds,text,mediaIds,replyToId){
  const errors=[];
  if(creds&&creds.oauth2AccessToken){
    try{
      const token=(creds.oauth2AccessToken||"").trim();
      if(__xLooksAppOnlyBearer(token))throw new $("OAuth2にApp-only Bearer Tokenが保存されています。投稿にはtweet.write付きユーザーAccess Tokenが必要です。",403,"oauth2_app_only_bearer");
      const body={text};if(replyToId)body.reply={in_reply_to_tweet_id:replyToId};if(mediaIds&&mediaIds.length>0)body.media={media_ids:mediaIds.slice(0,4)};
      const r=await fetch(`${vn}/tweets`,{method:"POST",headers:{authorization:"Bearer "+token,"content-type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(3e4)});
      const raw=await r.text();if(r.ok){let j={};try{j=JSON.parse(raw)}catch{}return{id:((j.data||{}).id)||"",text:((j.data||{}).text)||text}};
      throw new $(`OAuth2 POST /2/tweets failed: ${r.status} ${__xDetailFromRaw(raw)}`,r.status,"api_error_oauth2");
    }catch(e){errors.push("OAuth2="+(((e&&e.message)||String(e)).slice(0,900)))}
  }
  try{return await __xOAuth1PostTweetApiX(creds,text,mediaIds,replyToId)}
  catch(e){errors.push("OAuth1="+(((e&&e.message)||String(e)).slice(0,900)));throw new $(`v14投稿失敗: ${errors.join(" / ")}`,e instanceof $?e.statusCode:0,"api_error_strict_post")}
}
async function __xPostOneWithRetry(creds,text,mediaIds,replyToId){
  const clean=__xNormalizeTweetText(text);
  try{return await __xPostTweetOne(creds,clean,mediaIds,replyToId)}
  catch(e){
    const msg=(e&&e.message)||String(e);
    if((e&&e.statusCode)===403||/not permitted|duplicate|forbidden/i.test(msg)){
      const alt=__xFallbackTweetText(clean);
      if(alt&&alt!==clean)return await __xPostTweetOne(creds,alt,mediaIds,replyToId);
    }
    throw e;
  }
}
async function __xPostTweetStrict(creds,text,mediaIds,replyToId){
  const clean=__xNormalizeTweetText(text);
  if(!clean)throw new $("投稿本文が空です",400,"empty_tweet");
  const chunks=__xSplitTweetText(clean,280);
  if(chunks.length<=1){const one=await __xPostOneWithRetry(creds,clean,mediaIds,replyToId);return{...one,last_id:one.id,all_ids:one.id?[one.id]:[],split_count:1}}
  let parent=replyToId||null,first=null,ids=[];
  for(let idx=0;idx<chunks.length;idx++){
    const prefix=`${idx+1}/${chunks.length} `;
    const part=prefix+__xClipWeighted(chunks[idx],250-__xTextWeight(prefix));
    const out=await __xPostOneWithRetry(creds,part,idx===0?mediaIds:[],parent);
    if(!first)first=out;
    if(out&&out.id)ids.push(out.id);
    parent=out.id;
  }
  return first?{...first,last_id:parent||first.id,all_ids:ids,split_count:ids.length}:{id:"",text:clean,last_id:"",all_ids:[],split_count:0};
}
__postTweetWithFallback=__xPostTweetStrict;
Ms=async function(e,t){return __xPostTweetStrict(e,t,[],null)};
$s=async function(e,t,s,a){return __xPostTweetStrict(e,t,s||[],null)};
$sReply=async function(e,t,parentId,s){return __xPostTweetStrict(e,t,s||[],parentId)};
async function kn(e){var s,a,n,i;if(!e)throw new $("credentials未設定",0,"missing_credentials");if(!((s=e.consumerKey)!=null&&s.trim()))throw new $("API Key未設定",0,"missing_credentials");if(!((a=e.consumerSecret)!=null&&a.trim()))throw new $("API Secret未設定",0,"missing_credentials");if(!((n=e.accessToken)!=null&&n.trim()))throw new $("Access Token未設定",0,"missing_token");if(!((i=e.accessTokenSecret)!=null&&i.trim()))throw new $("Access Token Secret未設定",0,"missing_token");const t=await $t("GET","/users/me?user.fields=profile_image_url,public_metrics",void 0,e);return t==null?void 0:t.data}async function Ft(e,t,s){var o,d;let a=((s==null?void 0:s.apiKey)??e.X_API_KEY??"").trim();let n=((s==null?void 0:s.apiSecret)??e.X_API_SECRET??"").trim();if((!a||!n)&&e.DB&&t&&t.user_id){try{const row=await e.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.user_id).first();if(row){if(!a&&row.api_key){try{a=(await At(row.api_key,e.ENCRYPTION_KEY)).trim()}catch{}}if(!n&&row.api_secret){try{n=(await At(row.api_secret,e.ENCRYPTION_KEY)).trim()}catch{}}}}catch{}}if(!a||!n)throw new $("X API Key/Secret 未設定",0,"no_api_key");if(!((o=t==null?void 0:t.access_token)!=null&&o.trim()))throw new $("Access Token 未設定",0,"no_token");if(!((d=t==null?void 0:t.access_token_secret)!=null&&d.trim()))throw new $("Access Token Secret 未設定",0,"no_token_secret");let i,r;try{i=await At(t.access_token,e.ENCRYPTION_KEY)}catch{throw new $("Access Token の復号に失敗",0,"decrypt_failed")}try{r=await At(t.access_token_secret,e.ENCRYPTION_KEY)}catch{throw new $("Access Token Secret の復号に失敗",0,"decrypt_failed")}if(!i.trim())throw new $("Access Token が空",0,"decrypt_failed");if(!r.trim())throw new $("Access Token Secret が空",0,"decrypt_failed");return{consumerKey:a,consumerSecret:n,accessToken:i,accessTokenSecret:r}}
async function __xReadSetting(env,key){try{const r=await env.DB.prepare("SELECT value FROM system_settings WHERE key=?").bind(key).first();return r&&r.value?r.value:""}catch{return""}}
async function __xPutSetting(env,key,value,description){await env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(key,value,description||"").run()}
function __xBasicAuth(clientId,clientSecret){return"Basic "+btoa(`${clientId}:${clientSecret}`)}
async function __xRefreshOAuth2Token(env){
  const clientId=(await __xReadSetting(env,"x_oauth2_client_id")).trim();
  const secEnc=await __xReadSetting(env,"x_oauth2_client_secret");
  const refreshEnc=await __xReadSetting(env,"x_oauth2_refresh_token");
  if(!clientId||!refreshEnc)throw new $("OAuth2 refresh token未設定。API設定からX OAuth2認証をやり直してください。",0,"oauth2_refresh_missing");
  let clientSecret="",refreshToken="";
  try{clientSecret=secEnc?await At(secEnc,env.ENCRYPTION_KEY):""}catch{}
  try{refreshToken=await At(refreshEnc,env.ENCRYPTION_KEY)}catch{throw new $("OAuth2 refresh token復号失敗。API設定からX OAuth2認証をやり直してください。",0,"oauth2_refresh_decrypt_failed")}
  const body=new URLSearchParams({refresh_token:refreshToken,grant_type:"refresh_token",client_id:clientId});
  const headers={"content-type":"application/x-www-form-urlencoded"};
  if(clientSecret)headers.authorization=__xBasicAuth(clientId,clientSecret);
  const r=await fetch("https://api.x.com/2/oauth2/token",{method:"POST",headers,body,signal:AbortSignal.timeout(3e4)});
  const raw=await r.text();let j={};try{j=JSON.parse(raw)}catch{}
  if(!r.ok||!j.access_token)throw new $(`OAuth2 refresh failed: ${r.status} ${__xDetailFromRaw(raw)}`,r.status,"oauth2_refresh_failed");
  await __xPutSetting(env,"x_oauth2_user_token",await _e(j.access_token,env.ENCRYPTION_KEY),"X OAuth2 User Access Token (tweet.write)");
  if(j.refresh_token)await __xPutSetting(env,"x_oauth2_refresh_token",await _e(j.refresh_token,env.ENCRYPTION_KEY),"X OAuth2 Refresh Token");
  if(j.expires_in)await __xPutSetting(env,"x_oauth2_expires_at",String(Math.floor(Date.now()/1e3)+Number(j.expires_in)),"X OAuth2 Access Token expiry");
  return j.access_token;
}
async function __xStoredOAuth2AccessToken(env){
  const enc=await __xReadSetting(env,"x_oauth2_user_token");
  if(!enc)return"";
  const exp=parseInt(await __xReadSetting(env,"x_oauth2_expires_at")||"0",10);
  if(exp&&Math.floor(Date.now()/1e3)>exp-120)return await __xRefreshOAuth2Token(env);
  try{return(await At(enc,env.ENCRYPTION_KEY)).trim()}catch{return""}
}
async function __resolveXApiPair(env,account,override){
  const hasOverride=!!(override&&((override.apiKey||"").trim()||(override.apiSecret||"").trim()));
  let apiKey=hasOverride?((override.apiKey||"").trim()):"";
  let apiSecret=hasOverride?((override.apiSecret||"").trim()):"";
  let usedStored=false;
  if(!hasOverride&&env.DB&&account&&account.user_id){
    try{
      const row=await env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(account.user_id).first();
      if(row&&(row.api_key||row.api_secret)){
        usedStored=true;
        if(row.api_key)apiKey=(await At(row.api_key,env.ENCRYPTION_KEY)).trim();
        if(row.api_secret)apiSecret=(await At(row.api_secret,env.ENCRYPTION_KEY)).trim();
      }
    }catch{}
  }
  if(!usedStored&&!hasOverride){
    apiKey=(env.X_API_KEY||"").trim();
    apiSecret=(env.X_API_SECRET||"").trim();
  }
  return{apiKey,apiSecret};
}
Ft=async function(env,account,override){
  const pair=await __resolveXApiPair(env,account,override);
  if(!pair.apiKey||!pair.apiSecret)throw new $("X API Key/Secret 未設定（X API設定で同じDeveloper AppのConsumer KeyとConsumer Secretを両方保存してください）",0,"no_api_key");
  if(!((account==null?void 0:account.access_token)||"").trim())throw new $("Access Token 未設定",0,"no_token");
  if(!((account==null?void 0:account.access_token_secret)||"").trim())throw new $("Access Token Secret 未設定",0,"no_token_secret");
  let accessToken,accessTokenSecret;
  try{accessToken=await At(account.access_token,env.ENCRYPTION_KEY)}catch{throw new $("Access Token の復号に失敗",0,"decrypt_failed")}
  try{accessTokenSecret=await At(account.access_token_secret,env.ENCRYPTION_KEY)}catch{throw new $("Access Token Secret の復号に失敗",0,"decrypt_failed")}
  if(!accessToken.trim())throw new $("Access Token が空",0,"decrypt_failed");
  if(!accessTokenSecret.trim())throw new $("Access Token Secret が空",0,"decrypt_failed");
  const oauth2AccessToken=await __xStoredOAuth2AccessToken(env);return{consumerKey:pair.apiKey,consumerSecret:pair.apiSecret,accessToken,accessTokenSecret,oauth2AccessToken};
};
async function __resolvePostingAccount(env,userId,storedAccountId){
  let current=null,stored=null;
  if(env.DB&&userId){
    try{current=await env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 ORDER BY id DESC LIMIT 1").bind(userId).first()}catch{}
    if(storedAccountId){try{stored=await env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=? AND is_active=1 LIMIT 1").bind(storedAccountId,userId).first()}catch{}}
    if(!current){try{current=await env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id DESC LIMIT 1").bind(userId).first()}catch{}}
  }
  return current||stored||null;
}
async function __syncCurrentAccountToPost(env,postId,userId,storedAccountId){
  const acct=await __resolvePostingAccount(env,userId,storedAccountId);
  if(acct&&postId&&acct.id!==storedAccountId){
    try{await env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(acct.id,g(),postId,userId).run()}catch{}
  }
  return acct;
}
async function __xWritePreflight(creds){
  if(creds&&creds.oauth2AccessToken){
    if(__xLooksAppOnlyBearer(creds.oauth2AccessToken))throw new $("OAuth2にApp-only Bearer Tokenが保存されています。投稿にはAPI設定の『X OAuth2認証を開始』で取得したtweet.write付きユーザーAccess Tokenが必要です。",403,"oauth2_app_only_bearer");
    const r=await fetch(`${vn}/tweets`,{method:"POST",headers:{authorization:"Bearer "+creds.oauth2AccessToken,"content-type":"application/json"},body:JSON.stringify({text:""}),signal:AbortSignal.timeout(3e4)});
    const raw=await r.text();
    if(r.status===400)return{ok:true,status:400,mode:"oauth2"};
    const detail=__xDetailFromRaw(raw);
    throw new $(`X OAuth2 POST /2/tweets preflight ${r.status} ${detail}`,r.status,"write_preflight_failed");
  }
  const url=`${vn}/tweets`;
  const auth=await wn("POST",url,creds);
  const r=await fetch(url,{method:"POST",headers:{authorization:auth,"content-type":"application/json"},body:JSON.stringify({text:""}),signal:AbortSignal.timeout(3e4)});
  const raw=await r.text();
  if(r.status===400)return{ok:true,status:400};
  let detail=raw.slice(0,300);
  try{const j=JSON.parse(raw);detail=j.detail||(j.errors&&j.errors[0]&&(j.errors[0].message||j.errors[0].detail))||j.title||detail}catch{}
  if(r.status===401)throw new $("X API投稿条件NG: Access Token/Secret と Consumer Key/Secret の組み合わせが一致していません。X Developer Portalで同じAppのRead and Write権限トークンを再生成して保存してください。",401,"write_preflight_failed");
  if(r.status===403)throw new $("X API投稿条件NG: このApp/Tokenは投稿権限がありません。Developer Portalで App permissions を Read and Write にしてから Access Token/Secret を再生成し、X API設定とXアカウント管理を保存し直してください。",403,"write_preflight_failed");
  throw new $(`X API投稿条件NG: POST /2/tweets preflight ${r.status} ${detail}`,r.status,"write_preflight_failed");
}
const xMU_URL="https://upload.twitter.com/1.1/media/upload.json";
__xWritePreflight=async function(creds){
  if(creds&&creds.oauth2AccessToken&&__xLooksAppOnlyBearer(creds.oauth2AccessToken))throw new $("OAuth2にApp-only Bearer Tokenが保存されています。投稿にはtweet.write付きのユーザーAccess Tokenが必要です。",403,"oauth2_app_only_bearer");
  return{ok:true,mode:"read_only",message:"空POSTによる投稿権限判定は廃止しました。接続テストは読み取り確認のみです。投稿権限は投稿権限テストまたは実投稿で確認してください。"};
};
async function xMU_oauth(method,url,creds,bodyParams){
  const oa={oauth_consumer_key:creds.consumerKey,oauth_nonce:En(),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.floor(Date.now()/1e3).toString(),oauth_token:creds.accessToken,oauth_version:"1.0"};
  const u=new URL(url);const ap={...oa};
  u.searchParams.forEach((v,k)=>{ap[k]=v});
  if(bodyParams)for(const k of Object.keys(bodyParams))ap[k]=bodyParams[k];
  const ps=Object.keys(ap).sort().map(k=>`${oe(k)}=${oe(ap[k])}`).join("&");
  const bs=[method.toUpperCase(),oe(`${u.origin}${u.pathname}`),oe(ps)].join("&");
  const sk=`${oe(creds.consumerSecret)}&${oe(creds.accessTokenSecret)}`;
  oa.oauth_signature=await xn(sk,bs);
  return `OAuth ${Object.keys(oa).sort().map(k=>`${oe(k)}="${oe(oa[k])}"`).join(", ")}`;
}
async function xMU_image(creds,bytes){
  const u8=new Uint8Array(bytes);let bin="";const CH=8192;
  for(let i=0;i<u8.length;i+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));
  const b64=btoa(bin);
  const auth=await xMU_oauth("POST",xMU_URL,creds,{media_data:b64});
  const body="media_data="+encodeURIComponent(b64);
  const r=await fetch(xMU_URL,{method:"POST",headers:{authorization:auth,"content-type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(6e4)});
  if(!r.ok){const t=await r.text();throw new $(`X media upload failed: ${r.status} ${t.slice(0,300)}`,r.status,"media_upload_failed")}
  const j=await r.json();return j.media_id_string||String(j.media_id||"");
}
async function xMU_video_init(creds,size,mime){
  const params={command:"INIT",total_bytes:String(size),media_type:mime,media_category:"tweet_video"};
  const auth=await xMU_oauth("POST",xMU_URL,creds,params);
  const body=Object.keys(params).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const r=await fetch(xMU_URL,{method:"POST",headers:{authorization:auth,"content-type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(3e4)});
  if(!r.ok){const t=await r.text();throw new $(`X media INIT failed: ${r.status} ${t.slice(0,300)}`,r.status,"media_init_failed")}
  const j=await r.json();return j.media_id_string||String(j.media_id||"");
}
async function xMU_video_append(creds,mediaId,bytes,segIdx){
  const u8=new Uint8Array(bytes);let bin="";const CH=8192;
  for(let i=0;i<u8.length;i+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));
  const b64=btoa(bin);
  const params={command:"APPEND",media_id:mediaId,media_data:b64,segment_index:String(segIdx)};
  const auth=await xMU_oauth("POST",xMU_URL,creds,params);
  const body=Object.keys(params).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");
  const r=await fetch(xMU_URL,{method:"POST",headers:{authorization:auth,"content-type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(6e4)});
  if(!r.ok){const t=await r.text();throw new $(`X media APPEND failed: ${r.status} ${t.slice(0,300)}`,r.status,"media_append_failed")}
}
async function xMU_video_status(creds,mediaId){const params={command:"STATUS",media_id:mediaId};const auth=await xMU_oauth("GET",xMU_URL,creds,params);const qs=Object.keys(params).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");const r=await fetch(`${xMU_URL}?${qs}`,{method:"GET",headers:{authorization:auth},signal:AbortSignal.timeout(3e4)});if(!r.ok){const t=await r.text();throw new $(`X media STATUS failed: ${r.status} ${t.slice(0,300)}`,r.status,"media_status_failed")}return await r.json()}async function xMU_waitVideoReady(creds,mediaId,info){let pi=info||null;for(let i=0;i<12;i++){if(!pi)return;const state=String(pi.state||"").toLowerCase();if(state==="succeeded")return;if(state==="failed")throw new $(`X media processing failed: ${(pi.error&&pi.error.message)||"unknown"}`,400,"media_processing_failed");const sec=Math.min(Math.max(Number(pi.check_after_secs||2),1),5);await new Promise(res=>setTimeout(res,sec*1000));const j=await xMU_video_status(creds,mediaId);pi=j.processing_info||null}}async function xMU_video_finalize(creds,mediaId){const params={command:"FINALIZE",media_id:mediaId};const auth=await xMU_oauth("POST",xMU_URL,creds,params);const body=Object.keys(params).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");const r=await fetch(xMU_URL,{method:"POST",headers:{authorization:auth,"content-type":"application/x-www-form-urlencoded"},body,signal:AbortSignal.timeout(3e4)});if(!r.ok){const t=await r.text();throw new $(`X media FINALIZE failed: ${r.status} ${t.slice(0,300)}`,r.status,"media_finalize_failed")}const j=await r.json();await xMU_waitVideoReady(creds,mediaId,j.processing_info);return j}
async function xMU_video(creds,bytes,mime){
  const id=await xMU_video_init(creds,bytes.byteLength,mime);
  const CHUNK=1024*1024*4;const u8=new Uint8Array(bytes);let seg=0;
  for(let off=0;off<u8.length;off+=CHUNK){
    const slice=u8.slice(off,Math.min(off+CHUNK,u8.length));
    await xMU_video_append(creds,id,slice.buffer,seg);seg++;
  }
  await xMU_video_finalize(creds,id);
  return id;
}
async function xMU_upload(creds,bytes,mime){
  if(mime&&mime.startsWith("video/"))return xMU_video(creds,bytes,mime);
  return xMU_image(creds,bytes);
}
async function readMediaBytes(env,asset){
  if(!asset||!asset.storage_path)return{bytes:null,mime:asset&&asset.mime_type||"application/octet-stream"};
  const sp=asset.storage_path;
  if(sp.startsWith("data:")){
    const m=sp.match(/^data:([^;]+);base64,(.+)$/);
    if(!m)return{bytes:null,mime:asset.mime_type||"application/octet-stream"};
    const bin=atob(m[2]);const u8=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
    return{bytes:u8.buffer,mime:m[1]||asset.mime_type||"image/jpeg"};
  }
  if(sp.startsWith("/media/")){
    if(!env.MEDIA_BUCKET)return{bytes:null,mime:asset.mime_type||"image/jpeg"};
    const obj=await env.MEDIA_BUCKET.get(sp.slice(7));
    if(!obj)return{bytes:null,mime:asset.mime_type||"image/jpeg"};
    return{bytes:await obj.arrayBuffer(),mime:asset.mime_type||(obj.httpMetadata&&obj.httpMetadata.contentType)||"image/jpeg"};
  }
  if(/^https?:/i.test(sp)){
    const rr=await fetch(sp,{signal:AbortSignal.timeout(3e4)});
    if(!rr.ok)return{bytes:null,mime:asset.mime_type||"image/jpeg"};
    return{bytes:await rr.arrayBuffer(),mime:asset.mime_type||rr.headers.get("content-type")||"image/jpeg"};
  }
  return{bytes:null,mime:asset.mime_type||"application/octet-stream"};
}
const ge=new A;ge.get("/api/admin/accounts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return e.json({accounts:s||[]})});ge.post("/api/admin/accounts",m,async e=>{var r,o;const t=e.get("user"),s=await e.req.json();if(!s.account_name)return e.json({error:"account_name required"},400);if(!((r=s.access_token)!=null&&r.trim())||!((o=s.access_token_secret)!=null&&o.trim()))return e.json({error:"access_token and access_token_secret required"},400);const a=await _e(s.access_token.trim(),e.env.ENCRYPTION_KEY),n=await _e(s.access_token_secret.trim(),e.env.ENCRYPTION_KEY),i=await e.env.DB.prepare(`INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active, is_current)
     VALUES (?, ?, ?, ?, ?, 1, 1)`).bind(t.id,s.account_name,a,n,s.daily_post_limit??20).run();const newId=i.meta.last_row_id;await e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=? AND id<>?").bind(t.id,newId).run();return e.json({success:!0,id:newId})});ge.post("/api/admin/accounts/:id/test",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(s,t.id).first();if(!a)return e.json({success:!1,error:"not_found"},404);try{const n=await Ft(e.env,a),i=n.oauth2AccessToken?await xOAuth2Me(n).catch(()=>kn(n)):await kn(n);await __xWritePreflight(n);return i!=null&&i.id&&await e.env.DB.prepare(`UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           is_current=1, updated_at=? WHERE id=?`).bind(i.id,i.username||null,g(),s).run(),await e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=? AND id<>?").bind(t.id,s).run(),e.json({success:!0,me:i,message:"X接続OK。読み取り接続のみ確認しました。投稿権限はAPI設定の「投稿権限テスト（投稿→削除）」で確認してください。"})}catch(n){const i=n instanceof $?n.statusCode:0;return e.json({success:!1,error:n.message,status_code:i,error_type:n==null?void 0:n.errorType})}});ge.post("/api/admin/accounts/:id/current",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id),e.env.DB.prepare("UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?").bind(g(),s,t.id)]),e.json({success:!0})});ge.post("/api/admin/accounts/:id/toggle",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?").bind(g(),s,t.id).run(),e.json({success:!0})});ge.put("/api/admin/accounts/:id",m,async e=>{var r,o;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=[],i=[];if(a.account_name&&(n.push("account_name=?"),i.push(a.account_name)),a.daily_post_limit!==void 0&&(n.push("daily_post_limit=?"),i.push(a.daily_post_limit)),(r=a.access_token)!=null&&r.trim()){const d=await _e(a.access_token.trim(),e.env.ENCRYPTION_KEY);n.push("access_token=?"),i.push(d)}if((o=a.access_token_secret)!=null&&o.trim()){const d=await _e(a.access_token_secret.trim(),e.env.ENCRYPTION_KEY);n.push("access_token_secret=?"),i.push(d)}return n.length===0?e.json({success:!1,error:"no_fields"}):(n.push("updated_at=?"),i.push(g(),s,t.id),await e.env.DB.prepare(`UPDATE x_accounts SET ${n.join(", ")} WHERE id=? AND user_id=?`).bind(...i).run(),((a.access_token&&a.access_token.trim())||(a.access_token_secret&&a.access_token_secret.trim()))&&await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id),e.env.DB.prepare("UPDATE x_accounts SET is_current=1, is_active=1, updated_at=? WHERE id=? AND user_id=?").bind(g(),s,t.id)]),e.json({success:!0}))});ge.delete("/api/admin/accounts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM x_accounts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const Sn=["20代","30代","40代","50代"],Tn=["男性","女性"],Dn=["美容","健康","副業","投資","AI活用","ダイエット","お金"],An={美容:"老化・肌荒れ・見た目の変化",健康:"疲れやすい・体力低下・不調",副業:"時間がない・何から始めるか不明",投資:"勝てない・資産が増えない",AI活用:"手作業が多い・効率が悪い",ダイエット:"リバウンド・続かない",お金:"貯まらない・将来不安"},Rn={美容:"若々しくなりたい",健康:"元気に過ごしたい",副業:"収益化したい",投資:"安定して利益を出したい",AI活用:"業務を自動化したい",ダイエット:"理想の体型になりたい",お金:"経済的自由を得たい"},Fs=[];for(const e of Sn)for(const t of Tn)for(const s of Dn)Fs.push({key:`${e}_${t}_${s}`,label:`${e}${t}/${s}`,gender:t,age_range:e,genre:s,problem:An[s]||`${s}に悩んでいる`,goal:Rn[s]||`${s}で成果を出したい`,knowledge:"一般"});const On=[{key:"authority",label:"権威型",instruction:"専門家として断定的に、簡潔に、根拠を示して書く。"},{key:"empathy",label:"共感型",instruction:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{key:"provocative",label:"煽り型",instruction:"問題を鋭く突き、危機感を持たせる書き方にする。"},{key:"story",label:"ストーリー型",instruction:"体験談や変化の流れを感じさせる構成で書く。"},{key:"problem_raise",label:"問題提起型",instruction:"最初に課題を提示し、その原因と解決策を示す。"}],Rt={problem:{name:"問題提起型",instruction:`【問題提起型】
1.冒頭で読者の痛みを突く質問
2.具体的な状況を一つの自然な文として描写（箇条書きにせず、流れる日本語で）
3.「実はそれ○○が原因」と核心
4.解決の方向性
5.CTAで次のステップへ
※最後まで書き切ること
※箇条書き(・,●,▪,•)は一切使わず、自然な日本語の文章のみで書く`},before_after:{name:"ビフォーアフター型",instruction:`【変化が伝わる構成】
冒頭で過去の悩みや状態を自然に描写し、きっかけや行動を示し、現在の変化や成果を伝え、最後に学びや提案を入れてください。
「Before:」「After:」のラベルを使わず、自然な語り口で変化のストーリーを伝えること。
毎回異なる言い回し・展開にし、同じテンプレート構文を繰り返さないこと。
※箇条書き(・,●,▪,•)は一切使わず、自然な日本語の文章のみで書く`},contrarian:{name:"逆張り型",instruction:`【逆張り型】
1.「○○すべき」の常識提示
2.「実は逆」とひっくり返す
3.根拠
4.代替案
5.CTA
※箇条書き(・,●,▪,•)は一切使わず、自然な日本語の文章のみで書く`},howto:{name:"HowTo実演型",instruction:`【HowTo実演型】
1.「○○する方法」宣言
2.Step1→2→3を自然な文章で繋げて説明
3.各ステップ具体例
4.ワンポイント
5.CTA
※箇条書き(・,●,▪,•)は一切使わず、自然な日本語の文章のみで書く`},numbers:{name:"数字インパクト型",instruction:`【数字インパクト型】
1.冒頭にインパクト数字
2.背景
3.なぜその数字か
4.読者が同じ結果を得る条件
5.CTA
※箇条書き(・,●,▪,•)は一切使わず、自然な日本語の文章のみで書く`}};async function qs(e,t){var r,o,d;const s=t.model||"gpt-4o-mini",a=t.maxTokens||4e3,n=t.temperature??.7,i=t.baseUrl||"https://api.openai.com/v1";for(let l=1;l<=3;l++)try{const c=await fetch(`${i}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${t.apiKey}`,"content-type":"application/json"},body:JSON.stringify({model:s,messages:e,max_tokens:a,temperature:n}),signal:AbortSignal.timeout(12e4)});if(!c.ok){const _=await c.text();if(c.status>=500&&l<3){await new Promise(b=>setTimeout(b,2e3*l));continue}throw new Error(`OpenAI API error: ${c.status} ${_.slice(0,500)}`)}const p=await c.json();return((d=(o=(r=p==null?void 0:p.choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:d.content)||""}catch(c){if(((c==null?void 0:c.name)==="TimeoutError"||(c==null?void 0:c.name)==="AbortError")&&l<3){await new Promise(_=>setTimeout(_,2e3*l));continue}throw c}return""}function Ps(e){let t=`以下のルールを厳守してX(Twitter)投稿文を生成してください。
`;if(e.brandVoice&&typeof e.brandVoice=="object"?(t+=`
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
`}const s=`
Markdown記号(#,##)禁止。見出しは「■」。番号リスト禁止。箇条書き(・,●,▪,•など)は使わず、自然な日本語の文章のみで書く。AI生成っぽい定型文や羅列を避け、人間が書いたような流れる文章にする。`;let a="";e.patternType&&Rt[e.patternType]&&(a=`
【投稿パターン（構造のみ）】
${Rt[e.patternType].instruction}`);let n=`テーマ: ${e.theme||""}${e.keywords?`
キーワード: ${e.keywords}`:""}`;e.postMode==="140"?n+=`
140文字以内のX投稿を作成。改行は句点ごとの自然な区切りだけにし、文節や単語の途中で改行しない。簡潔かつインパクト重視。ハッシュタグは含めない。`:n+=`
X投稿用のフル文章を作成。句点ごとの自然な段落のみで改行し、単語や文節の途中で改行しない。ハッシュタグは含めない。`,e.cta&&(n+=`
CTA: ${e.cta}`),e.userInput&&(n+=`
追加指示: ${e.userInput}`);const i=t+a+s;return{messages:[{role:"system",content:i},{role:"user",content:n}],systemPrompt:i,userPrompt:n}}async function Hs(e,t,s,a,n,i="body"){const{messages:r}=Ps({theme:t,keywords:s,brandVoice:n,targetDna:a,postMode:i||"body"}),o=await qs(r,{apiKey:e,temperature:.8});return bt(o,i)}async function Us(e,t,s,a,n,i,r="body"){if(!Rt[t])throw new Error(`未対応のパターン: ${t}`);const{messages:o}=Ps({theme:s,keywords:a,brandVoice:i,targetDna:n,patternType:t,postMode:r||"body"}),d=await qs(o,{apiKey:e,temperature:.8});return bt(d,r)}function __limitChars(text,max){const arr=[...String(text||"").trim()];if(arr.length<=max)return arr.join("");const keep=Math.max(0,max-1);return arr.slice(0,keep).join("").replace(/\s+$/g,"")+"…"}function __limitCharsAndWeight(text,maxChars=140,maxWeight=260){let out="",chars=0,weight=0;for(const ch of String(text||"").trim()){const cw=ch.codePointAt(0)>255?2:1;if(chars+1>maxChars||weight+cw>maxWeight)break;out+=ch;chars++;weight+=cw}return out.trim()}function __cleanGeneratedText(e){return String(e||"").replace(/^#{1,4}\s*/gm,"").replace(/^[▪️■●•・\-\*]+\s*/gm,"").replace(/^\d+\.\s/gm,"").replace(/^(Step\d+)[:\s]/gim,"").replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\r\n/g,"\n").replace(/\r/g,"\n").replace(/\n{3,}/g,"\n\n").trim()}function __compact140Text(e){const base=__limitCharsAndWeight(__cleanGeneratedText(e).replace(/\s*\n+\s*/g,"").replace(/[ \t]+/g," ").replace(/\s+([、。！？!?])/g,"$1").trim(),140,260);const parts=base.split(/(?<=[。！？!?])/g).map(v=>v.trim()).filter(Boolean);if(parts.length<=1)return base;const lines=[];let buf="";for(const part of parts){const next=buf?buf+part:part;if(buf&&lines.length<2&&[...next].length>52){lines.push(buf);buf=part}else buf=next}if(buf)lines.push(buf);return __limitCharsAndWeight(lines.join("\n"),140,260)}function bt(e,t){if(!e)return"";const s=__cleanGeneratedText(e);if(t==="140")return __compact140Text(s);return jn(insertBreaks20(s))}function insertBreaks20(text){if(!text)return"";const out=[];for(const rawPara of String(text).replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(/\n{2,}/)){const para=rawPara.replace(/\s*\n\s*/g," ").replace(/[ \t]+/g," ").trim();if(!para)continue;if(/^https?:\/\//i.test(para)||/^#/.test(para)||/^@/.test(para)){out.push(para);continue}const parts=para.split(/(?<=[。！？!?])/g).map(v=>v.trim()).filter(Boolean);let buf="";for(const part of parts.length?parts:[para]){const next=buf?buf+part:part;if(buf&&[...next].length>70){out.push(buf);buf=part}else buf=next}if(buf)out.push(buf)}return out.join("\n").replace(/\n{3,}/g,"\n\n").trim()}function jn(e){return e||""}const In=new TextEncoder;async function Ae(e){const t=await crypto.subtle.digest("SHA-256",In.encode(e||""));return[...new Uint8Array(t)].slice(0,8).map(a=>a.toString(16).padStart(2,"0")).join("")}function Ot(e){const t=(e||"").replace(/\s+/g,"").slice(0,2e3),s=new Set;for(let a=0;a<t.length-1;a++)s.add(t.slice(a,a+2));return s}function Ws(e,t){const s=Ot(e),a=Ot(t);if(s.size===0&&a.size===0)return 0;let n=0;for(const r of s)a.has(r)&&n++;const i=s.size+a.size-n;return i===0?0:n/i}const Cn=15*1e3;async function Ys(e,t){const s=new Date().toISOString(),a=new Date(Date.now()-Cn).toISOString(),n=await e.DB.prepare("SELECT account_id, locked_at FROM post_locks WHERE account_id = ?").bind(t).first();return n&&n.locked_at>a?!1:(await e.DB.prepare(`INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`).bind(t,s).run(),!0)}async function Js(e,t){await e.DB.prepare("DELETE FROM post_locks WHERE account_id = ?").bind(t).run()}async function Ks(e,t,s,a,n){const i={ok:!0,errors:[],warnings:[]},r=await e.DB.prepare("SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?").bind(t).first();if(!r)return i.ok=!1,i.errors.push({code:"account_not_found",message:"アカウントが存在しません"}),i;const o=new Date(Date.now()+9*3600*1e3).toISOString().slice(0,10),dailyLimit=20,todayPosted=await e.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE account_id=? AND status='posted' AND DATE(COALESCE(posted_at, created_at))=DATE('now','+9 hours')").bind(t).first();let d=(todayPosted==null?void 0:todayPosted.n)||0;if(d>=dailyLimit)i.errors.push({code:"daily_post_limit",message:"1日の投稿上限は成功投稿20件です"});const{results:l}=await e.DB.prepare(`SELECT id, body FROM post_queue
       WHERE account_id = ? AND status = 'posted'
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`).bind(t).all();if((s||"").length>20)for(const c of l||[]){if((c.body||"").length<=20)continue;const p=Ws(s,c.body||"");if(p>=.98){i.errors.push({code:"too_similar",message:`過去投稿 (ID: ${c.id}) と完全に同一の文章です`});break}}if(a){const c=await e.DB.prepare(`SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`).bind(t,a).first();((c==null?void 0:c.n)??0)>=3&&i.errors.push({code:"link_spam",message:`同一リンクを過去7日で${c==null?void 0:c.n}回使用しています`})}if(n){const c=es(n);if(c.size>0){const{results:p}=await e.DB.prepare(`SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`).bind(t).all();(p||[]).length>=3&&(p||[]).every(b=>{const T=[...es(b.hashtags||"")].filter(D=>c.has(D)).length;return(c.size===0?0:T/c.size)>=.8})&&i.errors.push({code:"hashtag_spam",message:"同一ハッシュタグセットが 3 回連続で 80%以上一致しています"})}}return r.health_status==="risk"&&i.warnings.push({code:"health_risk",message:"Account health is low, but posting will continue."}),i.ok=i.errors.length===0,i}function es(e){return new Set((e||"").split(/[\s,]+/).map(t=>t.trim().replace(/^#/,"").toLowerCase()).filter(Boolean))}async function mt(e,t,s,a,n){const i=await e.DB.prepare("SELECT account_health_score FROM x_accounts WHERE id = ?").bind(t).first();if(!i)return{score_after:100,status_after:"healthy"};let r=Math.max(0,Math.min(100,(i.account_health_score??100)+a));const o=r>=80?"healthy":r>=60?"caution":"risk";return await e.DB.prepare("UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?").bind(r,o,t).run(),await e.DB.prepare(`INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(t,s,a,r,o,n?JSON.stringify(n):null).run(),{score_after:r,status_after:o}}function ts(e){if(!e)return Date.now();const raw=String(e).trim().replace(/\//g,"-").replace("T"," "),t=raw.replace(" ","T")+"+09:00",s=Date.parse(t);return Number.isNaN(s)?Date.now():s}function ss(e){return new Date(e+324e5).toISOString().replace("T"," ").slice(0,19)}async function Bn(e,t,s){const a=s.jitter_enabled!==!1,n=s.jitter_minutes??5,i=s.collision_avoidance_enabled!==!1,r=s.min_spacing_seconds??90;let o=ts(t),d=0,l=0;if(a&&n>0){const _=Math.floor((Math.random()*2-1)*n*60);d=_,o+=_*1e3}if(i&&s.account_id){const _=ss(o),b=[s.account_id,_,_];let v=`
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`;s.exclude_id&&(v+=" AND id != ?",b.push(s.exclude_id)),v+=" ORDER BY sat ASC";const{results:T}=await e.DB.prepare(v).bind(...b).all();let E=!0,D=0;for(;E&&D<30;){E=!1;for(const k of T||[]){const N=ts(k.sat),P=Math.abs(o-N)/1e3;if(P<r){const L=(r-P+1)*1e3*(o>=N?1:-1);o+=L,l+=Math.floor(L/1e3),E=!0}}D++}}const c=ss(o);return{effective_at:c,audit:{base_at:t,effective_at:c,jitter_applied_seconds:d,collision_adjusted_seconds:l,ruleset:{jitter_enabled:a,jitter_minutes:n,collision_avoidance_enabled:i,min_spacing_seconds:r}}}}async function Nn(e,t,s,a){await e.DB.prepare("INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)").bind(t,s??null,JSON.stringify(a)).run()}const Ln=.98;async function Mn(e){const t=[...Ot(e)].slice(0,200),s=await Ae(e);return JSON.stringify({bigrams:t,content_hash:s})}async function $n(e,t,s,a){await e.DB.prepare("INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)").bind(t,s??null,a).run()}async function Fn(e,t,s,a={}){const n={pass:!0,blocked_reason:null,scores:[]};if(!t||!s)return n;const i=[s];let r=`SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`;a.post_id&&(r+=" AND id != ?",i.push(a.post_id)),r+=" ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5";const{results:o}=await e.DB.prepare(r).bind(...i).all();for(const d of o||[]){const l=Ws(t,d.body||"");if(n.scores.push({post_id:d.id,similarity:l}),l>=Ln){n.pass=!1,n.blocked_reason=`過去投稿(ID:${d.id})と類似度 ${l.toFixed(2)} で重複`;break}}return n}const U=new A;async function qn(e,t,s){const a=String(s??"default");let n=await e.DB.prepare("SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();n||(n=await e.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first());let i=await e.DB.prepare("SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();return i||(i=await e.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first()),{target:n,voice:i}}async function as(e,t){if(!(!e.TELEGRAM_BOT_TOKEN||!e.TELEGRAM_CHAT_ID))try{await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:e.TELEGRAM_CHAT_ID,text:t,parse_mode:"HTML"})})}catch{}}async function ns(e,t){try{await e.DB.prepare(`INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.record_id??null,t.account_id??null,t.user_id??null,t.account_name??"",t.source_type??"",t.generation_type??null,t.post_mode??"body",t.content??"",t.content_hash??"",t.link_url??"",t.media_type??null,t.media_upload_status??null,t.media_id??null,t.thread_parent_id??null,t.thread_order??null,t.thread_total_count??null,t.recycle_source_post_id??null,t.recycle_rule??null,t.scheduled_at??null,t.executed_at??g(),t.posted_at??null,t.status??"posted",t.error_message??null,t.api_response_summary??null).run()}catch(s){console.error("[PostLog]",s.message)}}U.get("/api/admin/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=e.req.query("post_mode"),i=parseInt(e.req.query("page")||"1",10),r=50,o=(i-1)*r;let d="WHERE pq.platform='x' AND pq.user_id = ?";const l=[t.id];s&&s!=="all"&&(d+=" AND pq.status = ?",l.push(s)),a&&(d+=" AND pq.account_id = ?",l.push(Number(a))),n&&n!=="all"&&(d+=" AND pq.post_mode = ?",l.push(n));const{results:c}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${d} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`).bind(...l,r,o).all(),p=await e.env.DB.prepare(`SELECT COUNT(*) AS total FROM post_queue pq ${d}`).bind(...l).first();return e.json({posts:c||[],total:(p==null?void 0:p.total)??0,page:i})});U.get("/api/admin/posts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`).bind(s,t.id).first();return a?e.json({post:a}):e.json({error:"Not found"},404)});U.post("/api/admin/posts",m,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body is required"},400);const a=g(),n=await Ae(s.body);
// account_id が無い場合は is_current=1 を優先取得
let acctId=s.account_id??null;
if(!acctId){
  let r=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();
  if(!r)r=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  acctId=(r==null?void 0:r.id)??null;
}
// effective_scheduled_at は scheduled_at で初期化（cron tickがCOALESCEで使うため）
const effSched=s.scheduled_at??null;
if(s.scheduled_at&&s.post_mode==="scheduled_once"){const r=await e.env.DB.prepare(`SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
         AND body=? AND COALESCE(link_url,'')=COALESCE(?,'') AND scheduled_at=? AND post_mode='scheduled_once'
         AND status NOT IN ('cancelled','failed')`).bind(t.id,s.account_id||null,s.body,s.link_url||"",s.scheduled_at).first();if(r)return e.json({success:!1,error:`Same content/time already exists (ID:${r.id})`})}const i=await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, hashtags,
        post_mode, status, scheduled_at, effective_scheduled_at, content_hash, generation_type, source_type,
        recurrence_type, recurrence_rule, recurrence_end_at, next_run_at,
        recycle_rule, source_post_id, min_engagement_score, rewrite_mode,
        thread_parent_id, thread_order, thread_count, media_type, media_file_path,
        created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?, ?, ?, ?,
             ?, ?)`).bind(t.id,acctId,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body",s.status??"pending",s.scheduled_at??null,effSched,n,s.generation_type??null,s.source_type??"manual_post",s.recurrence_type??null,s.recurrence_rule??null,s.recurrence_end_at??null,s.next_run_at??null,s.recycle_rule??null,s.source_post_id??null,s.min_engagement_score??0,s.rewrite_mode??null,s.thread_parent_id??null,s.thread_order??0,s.thread_count??0,s.media_type??null,s.media_file_path??null,a,a).run();return e.json({success:!0,id:i.meta.last_row_id})});U.post("/api/admin/posts/generate",m,async e=>{const t=e.get("user");let s=e.env.OPENAI_API_KEY;if(!s){try{const enc=await Tt(e,"openai_api_key");if(enc){s=await lt(enc,e.env.ENCRYPTION_KEY)}}catch{}}const{theme:a,keywords:n,count:i,pattern_type:r,post_mode:o,link_url:d,hashtags:l,footer_text:c,account_id:p,generation_type:_}=await e.req.json();if(!a)return e.json({error:"theme required"},400);if(!s)return e.json({error:"OpenAI API Key 未設定（API設定画面で保存してください）"},500);let b=p??null;if(!b){let k=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(t.id).first();if(!k)k=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();b=(k==null?void 0:k.id)??null}const{target:v,voice:T}=await qn(e.env,t.id,b),E=g(),D=[];try{const k=Math.min(i||1,10);for(let N=0;N<k;N++){const P=o||"body";let L;r?L=await Us(s,r,a,n||"",v,T,P):L=await Hs(s,a,n||"",v,T,P),c&&(L=L.trimEnd()+`

`+c.trim());const nt=await Ae(L),Q=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`).bind(t.id,b,a,n||"",L,d||null,l||null,P,r||null,nt,_||r||"general",r?"pattern_generated_post":"ai_generated_post",E,E).run();D.push({id:Q.meta.last_row_id,body:L,link_url:d||"",post_mode:P});try{await e.env.DB.prepare(`INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,b,(T==null?void 0:T.id)??null,(v==null?void 0:v.id)??null,P,r||"general",L.slice(0,500)).run()}catch{}}return e.json({success:!0,generated:D,count:D.length})}catch(k){return e.json({error:"AI error: "+k.message},500)}});U.post("/api/admin/posts/:id/approve",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/reject",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/schedule",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),{scheduled_at:a,jitter_enabled:n=!1,jitter_minutes:i=0,collision_avoidance_enabled:r=!1,min_spacing_seconds:o=0}=await e.req.json();if(!a)return e.json({error:"scheduled_at required"},400);const d=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();if(!d)return e.json({success:!1,error:"Not found"},404);const acct=await __syncCurrentAccountToPost(e.env,d.id,t.id,d.account_id);const accountId=acct?acct.id:d.account_id;const skipSimilarity=d.status==="failed"||d.post_mode==="thread"||d.source_type==="thread";const l=skipSimilarity?{pass:!0,scores:[]}:await Fn(e.env,d.body||"",accountId??null,{post_id:d.id});if(!l.pass)return e.json({success:!1,error:"similarity: "+l.blocked_reason,similarity_blocked:!0,scores:l.scores});const{effective_at:c,audit:p}=await Bn(e.env,a,{jitter_enabled:n,jitter_minutes:i,collision_avoidance_enabled:r,min_spacing_seconds:o,account_id:accountId,exclude_id:d.id}),_=await Mn(d.body||"");return await $n(e.env,d.id,accountId,_),await e.env.DB.prepare(`UPDATE post_queue SET
       account_id=?, status='scheduled', error_message=NULL, external_post_id=NULL, posted_at=NULL, base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(accountId,a,c,c,n?1:0,i,r?1:0,o,JSON.stringify(p),g(),s,t.id).run(),await Nn(e.env,d.id,accountId,p),e.json({success:!0,base_scheduled_at:a,effective_scheduled_at:c,scheduled_at:c,account_id:accountId,audit:p})});U.post("/api/admin/posts/:id/post-now",m,async e=>{
  const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=(await e.req.json().catch(()=>({}))).force_override===!0,n=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();
  if(!n)return e.json({success:!1,error:"Not found"},404);
  let i=await __syncCurrentAccountToPost(e.env,n.id,t.id,n.account_id);
  if(!i)return e.json({success:!1,error:"No active X account"});
  const r=await Ks(e.env,i.id,n.body||"",n.link_url,n.hashtags),o=r.errors.filter(d=>!(a&&d.overridable));
  if(o.length>0){const d=r.errors.find(l=>l.overridable);return d&&!a?e.json({success:!1,error:d.message,overridable:!0,cooldown_override:!0}):e.json({success:!1,error:"Safety: "+o.map(l=>l.message).join("; ")})}
  if(!await Ys(e.env,i.id))return e.json({success:!1,error:"Account busy"});
  const postedIds=[];
  let currentPostRow=n;
  try{
    const d=await Ft(e.env,i);
    const makeText=row=>{let txt=bt(row.body||"",row.post_mode);row.link_url&&(txt+="\n"+row.link_url);row.hashtags&&(txt+="\n"+row.hashtags);return txt};
    const mediaIds=async row=>{const mids=[];if(row.media_json)try{const arr=JSON.parse(row.media_json);for(const mid of(arr||[]).slice(0,4)){const asset=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(mid,t.id).first();if(asset){if(!asset.x_media_id){try{const mb=await readMediaBytes(e.env,asset);if(mb.bytes){const xid=await xMU_upload(d,mb.bytes,mb.mime);await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid,g(),asset.id).run();mids.push(xid)}}catch(uErr){console.error("[mediaUp-now]",uErr&&uErr.message)}}else mids.push(asset.x_media_id)}}}catch{}return mids};
    const resolveReply=async row=>{if(!row.thread_parent_id)return null;const tp=String(row.thread_parent_id).trim();if(tp.startsWith("x:")){const xid=__xCleanTweetId(tp.slice(2));return xid||null}if(tp.startsWith("prev:")){const prevId=parseInt(tp.slice(5),10);if(prevId){const prev=await e.env.DB.prepare("SELECT external_post_id FROM post_queue WHERE id=? AND user_id=?").bind(prevId,t.id).first();if(prev&&prev.external_post_id)return __xCleanTweetId(prev.external_post_id);throw new Error("Parent reply is not posted yet (post_queue id="+prevId+")")}}else if(/^\d+$/.test(tp)){if(tp.length>=16)return (await __xRecoverExactTweetIdFromLogs(e.env,t.id,row.account_id||i.id,tp))||tp;const prev=await e.env.DB.prepare("SELECT external_post_id FROM post_queue WHERE id=? AND user_id=?").bind(Number(tp),t.id).first();return prev&&prev.external_post_id?__xCleanTweetId(prev.external_post_id):tp}return null};
    const postRow=async(row,replyTo)=>{await e.env.DB.prepare("UPDATE post_queue SET status='publishing', account_id=COALESCE(account_id,?), updated_at=? WHERE id=? AND user_id=?").bind(i.id,g(),row.id,t.id).run();const mids=await mediaIds(row),txt=makeText(row),out=replyTo?(mids.length>0?await $sReply(d,txt,replyTo,mids):await $sReply(d,txt,replyTo)):(mids.length>0?await $s(d,txt,mids,null):await Ms(d,txt));const outId=(out&&out.id)||"",tailId=(out&&out.last_id)||outId,storeId=row.post_mode==="thread"?tailId:outId;await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(storeId,g(),g(),row.id).run();await ns(e.env,{record_id:row.id,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:row.source_type||"manual_post",generation_type:row.generation_type,post_mode:row.post_mode==="thread"?"thread":row.post_mode,content:row.body||"",content_hash:row.content_hash||"",link_url:row.link_url,thread_parent_id:replyTo||row.thread_parent_id||null,thread_order:row.thread_order??null,thread_total_count:row.thread_count??null,posted_at:g(),status:"posted",api_response_summary:JSON.stringify({tweet_id:outId,last_tweet_id:tailId,split_count:out.split_count||1})});postedIds.push(outId);return tailId||replyTo};
    let rows=[n];
    if(n.post_mode==="thread"&&!n.thread_parent_id){const q=await e.env.DB.prepare("SELECT * FROM post_queue WHERE user_id=? AND id!=? AND post_mode='thread' AND status!='posted' AND (thread_parent_id=? OR thread_parent_id=?) ORDER BY COALESCE(thread_order,0) ASC, id ASC").bind(t.id,s,String(s),"prev:"+s).all();if((q.results||[]).length>0)rows=[n,...q.results]}
    let replyTo=(rows.length===1&&n.thread_parent_id)?await resolveReply(n):null;
    for(const row of rows){currentPostRow=row;replyTo=await postRow(row,replyTo)}
    await e.env.DB.prepare("UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+?, last_daily_reset_date=DATE('now','+9 hours'), updated_at=? WHERE id=?").bind(g(),rows.length,g(),i.id).run();
    await as(e.env,"X posted @"+(i.x_username||i.account_name)+" ID:"+(postedIds[0]||""));
    return e.json({success:!0,tweet_id:postedIds[0]||"",thread_posted:postedIds.length});
  }catch(d){
    const msg="v14 post-now account="+i.id+" @"+(i.x_username||i.account_name||"")+": "+(d.message||String(d));
    const failedRow=currentPostRow||n;
    await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(msg,g(),failedRow.id||s).run();
    await ns(e.env,{record_id:failedRow.id||s,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:failedRow.source_type||n.source_type,post_mode:failedRow.post_mode||n.post_mode,content:failedRow.body||"",content_hash:failedRow.content_hash||"",status:"failed",error_message:msg});
    d instanceof Mt?await mt(e.env,i.id,"rate_limit",-15):await mt(e.env,i.id,"error",-5,{message:msg});
    await as(e.env,"X post FAILED #"+s+" "+msg);
    return e.json({success:!1,error:msg});
  }finally{await Js(e.env,i.id)}
});U.put("/api/admin/posts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g(),i=a.body?await Ae(a.body):null;return a.media_json!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?").bind(a.media_json,n,s,t.id).run(),e.json({success:!0})):a.account_id!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(a.account_id,n,s,t.id).run(),e.json({success:!0})):(await e.env.DB.prepare(`UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`).bind(a.body,a.link_url??null,a.hashtags??null,a.scheduled_at??null,a.post_mode??"body",a.media_json??null,i,a.recurrence_type??null,a.recurrence_rule??null,a.next_run_at??null,a.recurrence_end_at??null,n,s,t.id).run(),e.json({success:!0}))});U.delete("/api/admin/posts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM post_queue WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.get("/api/admin/posts-scheduled",m,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=[t.id];let n="WHERE pq.platform='x' AND pq.user_id=? AND pq.scheduled_at IS NOT NULL AND pq.status NOT IN ('cancelled','rejected')";s&&(n+=" AND pq.account_id=?",a.push(Number(s)));const{results:i}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${n} ORDER BY pq.scheduled_at ASC`).bind(...a).all(),r=[t.id];let o="WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL";s&&(o+=" AND aj.account_id=?",r.push(Number(s)));const{results:d}=await e.env.DB.prepare(`SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${o} ORDER BY aj.publish_at ASC`).bind(...r).all(),l=(d||[]).map(p=>({...p,post_mode:"body",id:"ap-"+p.id})),c=[...i||[],...l].sort((p,_)=>(p.scheduled_at||"").localeCompare(_.scheduled_at||""));return e.json({posts:c})});U.post("/api/admin/posts/thread",m,async e=>{const t=e.get("user"),{tweets:s,link_url:a,account_id:n}=await e.req.json();if(!s||!Array.isArray(s)||s.length<2)return e.json({error:"Thread requires 2+ tweets"},400);const i=g(),r=await Ae(s[0].body),d=(await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[0].body,s[0].link_url??a??null,s.length,r,i,i).run()).meta.last_row_id,l=[d];for(let c=1;c<s.length;c++){const p=await Ae(s[c].body),_=await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[c].body,s[c].link_url??null,"prev:"+l[l.length-1],c,p,i,i).run();l.push(_.meta.last_row_id)}return e.json({success:!0,parent_id:d,ids:l})});const zs=new A,Pn=50;zs.post("/cron/tick",async e=>{const t=g(),{results:s}=await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved','scheduled')
        AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
        AND datetime(replace(replace(COALESCE(effective_scheduled_at, scheduled_at),'T',' '),'/','-')) <= datetime('now','+9 hours')
      ORDER BY datetime(replace(replace(COALESCE(effective_scheduled_at, scheduled_at),'T',' '),'/','-')) ASC, COALESCE(thread_order, 0) ASC
      LIMIT ?`).bind(Pn).all();let a=0,n=0,i=0;for(const r of s||[]){const o=await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved','scheduled')").bind(t,r.id).run();if(!(!o.success||o.meta.changes===0)){a++;try{
var __cronReplyToId="";
// account_id NULLの場合: is_current=1 → 任意のアクティブアカウント の順で fallback
let acctRow=await __syncCurrentAccountToPost(e.env,r.id,r.user_id,r.account_id);
if(!acctRow)throw new Error("account_not_found (user has no active X account)");
r.account_id=acctRow.id;
const d=acctRow;const isThreadPost=r.post_mode==="thread"||r.source_type==="thread"||!!r.thread_parent_id;const l=isThreadPost?{ok:!0,errors:[]}:await Ks(e.env,d.id,r.body||"",r.link_url,r.hashtags);if(!l.ok)throw new Error("safety: "+l.errors.map(c=>c.message).join("; "));if(!await Ys(e.env,d.id)){
  // ロック取得失敗 = 同アカウント別投稿が処理中。リトライ可能エラーとして status を approved に戻す（次回 cron tick で再試行）
  await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=?").bind(g(),r.id).run();
  continue;
}try{const c=await Ft(e.env,d);let p=bt(r.body||"",r.post_mode);r.link_url&&(p+=`
`+r.link_url),r.hashtags&&(p+=`
`+r.hashtags);const _=[];if(r.media_json)try{const v=JSON.parse(r.media_json);for(const T of(v||[]).slice(0,4)){const E=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(T,r.user_id).first();if(E){if(!E.x_media_id){try{const{bytes,mime}=await readMediaBytes(e.env,E);if(bytes){const xid=await xMU_upload(c,bytes,mime);await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid,g(),E.id).run();_.push(xid)}}catch(uErr){console.error("[mediaUp-cron]",uErr&&uErr.message)}}else _.push(E.x_media_id)}}}catch{}// thread_parent_id を解決
let replyToId=null;if(r.thread_parent_id){const tp=String(r.thread_parent_id).trim();if(tp.startsWith("x:")){replyToId=__xCleanTweetId(tp.slice(2))}else if(tp.startsWith("prev:")){const prevId=parseInt(tp.slice(5),10);if(prevId){const prev=await e.env.DB.prepare("SELECT external_post_id,status,error_message FROM post_queue WHERE id=? AND user_id=?").bind(prevId,r.user_id).first();if(prev&&prev.external_post_id)replyToId=__xCleanTweetId(prev.external_post_id);else if(prev&&["failed","cancelled","rejected"].includes(prev.status)){await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind("thread_parent_failed: "+(prev.error_message||prev.status),g(),r.id).run();continue}else{await e.env.DB.prepare("UPDATE post_queue SET status='scheduled', updated_at=? WHERE id=?").bind(g(),r.id).run();continue}}}else if(/^\d+$/.test(tp)){if(tp.length>=16){replyToId=(await __xRecoverExactTweetIdFromLogs(e.env,r.user_id,r.account_id,tp))||tp}else{const prev=await e.env.DB.prepare("SELECT external_post_id,status,error_message FROM post_queue WHERE id=? AND user_id=?").bind(Number(tp),r.user_id).first();if(prev&&prev.external_post_id)replyToId=__xCleanTweetId(prev.external_post_id);else if(prev&&["failed","cancelled","rejected"].includes(prev.status)){await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind("thread_parent_failed: "+(prev.error_message||prev.status),g(),r.id).run();continue}else replyToId=tp}}}__cronReplyToId=replyToId||"";const b=replyToId?(_.length>0?await $sReply(c,p,replyToId,_):await $sReply(c,p,replyToId)):(_.length>0?await $s(c,p,_,null):await Ms(c,p));const bx=(b&&b.id)||"",btail=(b&&b.last_id)||bx,bstore=r.post_mode==="thread"?btail:bx;await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(bstore,g(),g(),r.id).run(),
// autopilot_jobs に紐づく投稿の場合は autopilot_jobs.status='posted' にも同期
await e.env.DB.prepare("UPDATE autopilot_jobs SET status='posted', updated_at=? WHERE generated_post_id=? AND user_id=?").bind(g(),r.id,r.user_id).run(),
await e.env.DB.prepare(`UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`).bind(g(),g(),d.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`).bind(r.id,d.id,r.user_id,d.account_name,r.source_type,r.generation_type,r.post_mode,r.body||"",r.content_hash||"",r.link_url||"",g(),g(),JSON.stringify({tweet_id:bx,last_tweet_id:btail,split_count:b.split_count||1})).run(),await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`).bind(d.id,r.user_id).run(),n++}finally{await Js(e.env,d.id)}}catch(d){const l="v23 cron account="+(r.account_id||"")+" post="+((r&&r.id)||"")+" reply_to="+(__cronReplyToId||"")+": "+__xFriendlyPostError(d);await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(l,g(),r.id).run(),
// autopilot_jobs に紐づく投稿の場合は autopilot_jobs.status='error' にも同期
await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE generated_post_id=? AND user_id=?").bind(l,g(),r.id,r.user_id).run(),
await e.env.DB.prepare(`INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            thread_parent_id, thread_order, thread_total_count, status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, 'failed', ?, ?)`).bind(r.id,r.account_id,r.user_id,r.source_type,r.post_mode,r.body||"",r.content_hash||"",r.thread_parent_id||__cronReplyToId||"",r.thread_order??null,r.thread_count??null,l,g()).run(),r.account_id&&(d instanceof Mt?await mt(e.env,r.account_id,"rate_limit",-15):await mt(e.env,r.account_id,"error",-5,{message:l})),r.account_id&&await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`).bind(r.account_id,r.user_id).run(),i++}}}return e.json({ok:!0,processed:a,success:n,failed:i,now:t})});const ve=new A;ve.get("/api/admin/autopilot/jobs",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`).bind(t.id).all(),{results:a}=await e.env.DB.prepare("SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1").bind(t.id).all();return e.json({jobs:s||[],accounts:a||[]})});ve.get("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).first();return s?e.json(s):e.json({error:"not found"})});ve.post("/api/admin/autopilot/jobs",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=g(),n=(s.publish_at||s.generate_at||a).slice(0,10),i=await e.env.DB.prepare(`SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND COALESCE(account_id,0)=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status IN ('configured','generated')`).bind(t.id,s.account_id||0,n).first();if(((i==null?void 0:i.cnt)??0)>=20)return e.json({success:!1,error:"This day already has 20 active reservations"});const r=await e.env.DB.prepare("SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs").first(),o=String(((r==null?void 0:r.mx)??0)+1).padStart(4,"0");let d=s.generate_at||s.publish_at||null;const l=d||s.publish_at?"configured":"draft";let optsJson=s.options_json||"{}";try{let o2=typeof optsJson==="string"?JSON.parse(optsJson):optsJson;if(!o2||typeof o2!=="object"||Array.isArray(o2))o2={};if(s.post_mode)o2.post_mode=s.post_mode;if(Array.isArray(s.media_ids)&&s.media_ids.length>0)o2.media_ids=s.media_ids.slice(0,4);optsJson=JSON.stringify(o2)}catch{const o2={};if(s.post_mode)o2.post_mode=s.post_mode;if(Array.isArray(s.media_ids)&&s.media_ids.length>0)o2.media_ids=s.media_ids.slice(0,4);optsJson=JSON.stringify(o2)}const c=await e.env.DB.prepare(`INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(o,t.id,s.account_id??null,s.content_mode||"problem",s.theme||"",s.keywords||"",s.prompt_text||"",optsJson,s.title_memo||"",s.link_url||"",d,s.publish_at||null,l,a,a).run();return e.json({success:!0,id:c.meta.last_row_id,reservation_no:o})});ve.put("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g();let i=a.generate_at||a.publish_at||null;const r=i||a.publish_at?"configured":"draft";return await e.env.DB.prepare(`UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(a.content_mode||"problem",a.theme||"",a.keywords||"",a.prompt_text||"",a.options_json||"{}",a.title_memo||"",a.link_url||"",i,a.publish_at||null,r,n,s,t.id).run(),e.json({success:!0})});ve.delete("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ve.post("/api/admin/autopilot/jobs/:id/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ve.post("/api/admin/autopilot/jobs/:id/retry",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);const job=await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(s,t.id).first();if(!job)return e.json({success:!1,error:"not_found"},404);
// リクエストボディからpublish_atを取得（無ければ5分後）
const reqBody=await e.req.json().catch(()=>({}));
const pad=n=>String(n).padStart(2,"0");
const offsetJst=9*60*60*1000;
let newPublishAt=reqBody.publish_at||null;
if(!newPublishAt){
  const np=new Date(Date.now()+5*60*1000+offsetJst);
  newPublishAt=np.getUTCFullYear()+"-"+pad(np.getUTCMonth()+1)+"-"+pad(np.getUTCDate())+" "+pad(np.getUTCHours())+":"+pad(np.getUTCMinutes())+":"+pad(np.getUTCSeconds());
}
// generate_at uses the same time as publish_at so the UI never shifts it
let newGenAt=newPublishAt;
// 生成済み記事がある場合は post_queue を直接 approved + 新しい予約時刻でreset
const retryAcct=await __resolvePostingAccount(e.env,t.id,job.account_id);
const retryAccountId=retryAcct?retryAcct.id:job.account_id;
if(job.generated_post_id){
  await e.env.DB.prepare("UPDATE post_queue SET account_id=?, status='scheduled', scheduled_at=?, effective_scheduled_at=?, base_scheduled_at=?, error_message=NULL, external_post_id=NULL, posted_at=NULL, updated_at=? WHERE id=? AND user_id=?").bind(retryAccountId,newPublishAt,newPublishAt,newPublishAt,g(),job.generated_post_id,t.id).run();
  // autopilot_jobs も予約状態に戻す
  await e.env.DB.prepare("UPDATE autopilot_jobs SET account_id=?, status='generated', publish_at=?, error_message=NULL, updated_at=? WHERE id=? AND user_id=?").bind(retryAccountId,newPublishAt,g(),s,t.id).run();
  return e.json({success:!0,mode:"post_queue_reset",publish_at:newPublishAt,post_queue_id:job.generated_post_id});
}
// それ以外（configured/error）: autopilot_jobs を再生成待ちに戻す
await e.env.DB.prepare("UPDATE autopilot_jobs SET account_id=?, status='configured', generate_at=?, publish_at=?, error_message=NULL, generated_post_id=NULL, updated_at=? WHERE id=? AND user_id=?").bind(retryAccountId,newGenAt,newPublishAt,g(),s,t.id).run();return e.json({success:!0,mode:"regenerate",next_at:newGenAt,publish_at:newPublishAt})});ve.post("/cron/autopilot-tick",async e=>{let openaiKey=e.env.OPENAI_API_KEY;if(!openaiKey){try{const enc=await Tt(e,"openai_api_key");if(enc)openaiKey=await lt(enc,e.env.ENCRYPTION_KEY)}catch{}}if(!openaiKey)return e.json({ok:!0,skipped:"no_openai_key"});const{results:t}=await e.env.DB.prepare(`SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND (
              (generate_at IS NOT NULL AND generate_at <= datetime('now','+9 hours'))
           OR (publish_at IS NOT NULL AND publish_at <= datetime('now','+9 hours'))
         )
       ORDER BY COALESCE(generate_at, publish_at) ASC LIMIT 5`).all();let s=0;for(const a of t||[])try{const n=String(a.account_id??"default");let i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();i||(i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();r||(r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let opts={};try{opts=a.options_json?JSON.parse(a.options_json):{}}catch{opts={}}if(!opts||typeof opts!=="object"||Array.isArray(opts))opts={};const postMode=opts.post_mode==="140"?"140":"body";let o;a.content_mode&&a.content_mode!=="freetext"?o=await Us(openaiKey,a.content_mode,a.theme||"",a.keywords||"",i,r,postMode):o=await Hs(openaiKey,a.theme||"",a.keywords||"",i,r,postMode);const d=await Ae(o),l=g();let mediaJsonStr=null,mediaTypeStr=null;try{if(Array.isArray(opts.media_ids)&&opts.media_ids.length>0){mediaJsonStr=JSON.stringify(opts.media_ids.slice(0,4));const ft=await e.env.DB.prepare("SELECT file_type FROM media_assets WHERE id=? AND user_id=?").bind(opts.media_ids[0],a.user_id).first();mediaTypeStr=(ft==null?void 0:ft.file_type)||null}}catch{}const c=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, media_json, media_type, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'autopilot', 'scheduled', ?, ?, ?, ?)`).bind(a.user_id,a.account_id,o,a.link_url,postMode,a.publish_at,a.publish_at,a.publish_at,d,a.content_mode,mediaJsonStr,mediaTypeStr,l,l).run();await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?").bind(c.meta.last_row_id,l,a.id).run(),s++}catch(n){await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?").bind((n==null?void 0:n.message)||"unknown_error",g(),a.id).run()}return e.json({ok:!0,generated:s,total:(t||[]).length})});const is={topics:[{title:"投稿の基本",keywords:["投稿","ポスト","ツイート","post","tweet"],answer:"[新規投稿] タブから本文を入力し「投稿キューへ」で予約できます。即時投稿は [今すぐ投稿] ボタンから。"},{title:"オートパイロット",keywords:["オートパイロット","autopilot","自動投稿","自動"],answer:"[オートパイロット] タブでジョブを作成すると、指定時刻に OpenAI が投稿案を生成しキューに入ります。"},{title:"アカウント連携",keywords:["連携","アカウント","追加","OAuth","トークン"],answer:"X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、[アカウント管理] から追加してください。OAuth 1.0a User Context を使用します。"},{title:"ライセンス",keywords:["ライセンス","認証","license","VPS-GE365X"],answer:"ログイン画面の [ライセンス] タブから VPS-GE365X-XXXXXXXX 形式のキーを入力するとプランが有効化されます。"},{title:"類似度制御",keywords:["類似","重複","ブロック","similarity"],answer:"同一アカウントの直近5件と Jaccard係数 0.7 以上の類似があると投稿がブロックされます。"},{title:"投稿間隔",keywords:["間隔","時間","cooldown","spacing"],answer:"最低投稿間隔は15分、推奨は30〜120分のランダム。jitter で ±5分の微分散も付与されます。"}],default_response:"該当するトピックが見つかりませんでした。[アカウント管理][投稿][オートパイロット][ライセンス] 等のキーワードで試してください。"},tt=new A;async function qt(e){const t=await e.DB.prepare("SELECT json_data FROM chatbot_kb WHERE id = 1").first();if(t!=null&&t.json_data)try{return JSON.parse(t.json_data)}catch{}return await e.DB.prepare("INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)").bind(JSON.stringify(is)).run(),is}tt.get("/api/admin/chatbot/topics",m,async e=>{const t=await qt(e.env);return e.json({topics:(t.topics||[]).map((s,a)=>({id:a,title:s.title,keywords:s.keywords}))})});tt.post("/api/admin/chatbot/ask",m,async e=>{const t=await qt(e.env),a=((await e.req.json().catch(()=>({}))).question||"").toLowerCase().trim();if(!a)return e.json({answer:t.default_response});let n=null,i=0;for(const r of t.topics||[]){let o=0;for(const d of r.keywords||[])a.includes(d.toLowerCase())&&(o+=d.length);o>i&&(i=o,n=r)}return n?e.json({answer:n.answer,title:n.title,matched:!0}):e.json({answer:t.default_response,matched:!1})});tt.get("/api/admin/chatbot/topic/:id",m,async e=>{const s=((await qt(e.env)).topics||[])[parseInt(e.req.param("id"),10)];return s?e.json({topic:s}):e.json({error:"トピック未登録"},404)});tt.put("/api/admin/chatbot/kb",m,R,async e=>{const t=await e.req.json();return!t||!Array.isArray(t.topics)?e.json({error:"invalid_kb"},400):(await e.env.DB.prepare(`INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`).bind(JSON.stringify(t)).run(),e.json({success:!0,topic_count:t.topics.length}))});const st=new A;st.get("/api/admin/drafts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`).bind(t.id).all();return e.json({drafts:s||[]})});st.post("/api/admin/drafts",m,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body required"},400);const a=await e.env.DB.prepare(`INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,s.account_id??null,s.title??null,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body").run();return e.json({success:!0,id:a.meta.last_row_id})});st.put("/api/admin/drafts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json();return await e.env.DB.prepare(`UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`).bind(a.title??null,a.body??null,a.link_url??null,a.hashtags??null,a.post_mode??null,a.account_id??null,g(),s,t.id).run(),e.json({success:!0})});st.delete("/api/admin/drafts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM drafts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const at=new A;at.get("/api/admin/media",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`).bind(t.id).all();return e.json({assets:s||[]})});at.post("/api/admin/media",m,async e=>{const t=e.get("user");try{const fb=await e.req.parseBody();const a=fb.file;if(!a||typeof a==="string")return e.json({success:!1,error:"file required"},400);const mime=a.type||"application/octet-stream";const n=mime.startsWith("video/")?"video":"image";const sz=a.size||0;if(sz>20*1024*1024)return e.json({success:!1,error:"ファイルサイズが大きすぎます (20MB上限)"},413);const fileName=a.name||"upload.bin";if(e.env.MEDIA_BUCKET){const i=`u${t.id}/${Date.now()}-${fileName.replace(/[^\w.\-]/g,"_")}`;await e.env.MEDIA_BUCKET.put(i,await a.arrayBuffer(),{httpMetadata:{contentType:mime}});const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id,n,mime,fileName,sz,`/media/${i}`,g(),g()).run();return e.json({success:!0,id:r.meta.last_row_id,storage_path:`/media/${i}`})}else{const buf=await a.arrayBuffer();const u8=new Uint8Array(buf);let bin="";const CH=8192;for(let i=0;i<u8.length;i+=CH)bin+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));const b64="data:"+mime+";base64,"+btoa(bin);const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id,n,mime,fileName,sz,b64,g(),g()).run();return e.json({success:!0,id:r.meta.last_row_id,storage_path:"data:..."})}}catch(err){console.error("[media-upload]",err);return e.json({success:!1,error:(err&&err.message)||"upload error"},500)}});at.delete("/api/admin/media/:id",m,async e=>{var n;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT storage_path FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).first();if((n=a==null?void 0:a.storage_path)!=null&&n.startsWith("/media/")&&e.env.MEDIA_BUCKET){const i=a.storage_path.slice(7);await e.env.MEDIA_BUCKET.delete(i).catch(()=>{})}return await e.env.DB.prepare("DELETE FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).run(),e.json({success:!0})});
at.post("/api/admin/media/url",m,async e=>{
  const t=e.get("user");const{url:u,file_type:ft}=await e.req.json().catch(()=>({}));
  if(!u||typeof u!=="string"||!/^https?:\/\//i.test(u))return e.json({error:"valid url required"},400);
  const tt=g();
  const ft2=ft||(/\.(mp4|mov|m4v|webm)(\?|$)/i.test(u)?"video":"image");
  const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'ready', ?, ?)`).bind(t.id,ft2,ft2==="video"?"video/mp4":"image/jpeg",u.split("/").pop()||"remote",0,u,tt,tt).run();
  return e.json({success:!0,id:r.meta.last_row_id,storage_path:u});
});
at.post("/api/admin/media/:id/x-upload",m,async e=>{
  const t=e.get("user");const sid=parseInt(e.req.param("id"),10);
  const{account_id:aid}=await e.req.json().catch(()=>({}));
  const asset=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(sid,t.id).first();
  if(!asset)return e.json({error:"asset not found"},404);
  if(asset.x_media_id)return e.json({success:!0,x_media_id:asset.x_media_id,cached:!0});
  let acct=null;
  if(aid)acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(aid,t.id).first();
  if(!acct)acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first();
  if(!acct)acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if(!acct)return e.json({error:"No active X account"},400);
  let bytes,mime;
  try{
    if(asset.storage_path&&asset.storage_path.startsWith("/media/")){
      if(!e.env.MEDIA_BUCKET)return e.json({error:"R2 not configured"},501);
      const key=asset.storage_path.slice(7);
      const obj=await e.env.MEDIA_BUCKET.get(key);
      if(!obj)return e.json({error:"object not found in R2"},404);
      bytes=await obj.arrayBuffer();mime=asset.mime_type||(obj.httpMetadata&&obj.httpMetadata.contentType)||"image/jpeg";
    }else if(asset.storage_path&&/^https?:/i.test(asset.storage_path)){
      const r=await fetch(asset.storage_path,{signal:AbortSignal.timeout(3e4)});
      if(!r.ok)return e.json({error:"failed to fetch remote media: "+r.status},400);
      bytes=await r.arrayBuffer();mime=asset.mime_type||r.headers.get("content-type")||"image/jpeg";
    }else return e.json({error:"unsupported storage_path"},400);
  }catch(err){return e.json({error:"media fetch error: "+err.message},500)}
  try{
    const creds=await Ft(e.env,acct);
    const xMid=await xMU_upload(creds,bytes,mime);
    await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=? AND user_id=?").bind(xMid,g(),sid,t.id).run();
    return e.json({success:!0,x_media_id:xMid});
  }catch(err){
    await e.env.DB.prepare("UPDATE media_assets SET upload_status='failed', last_error=?, updated_at=? WHERE id=? AND user_id=?").bind((err&&err.message)||"unknown",g(),sid,t.id).run();
    return e.json({success:!1,error:(err&&err.message)||"upload error"},500);
  }
});
at.post("/api/admin/posts/:id/attach-media",m,async e=>{
  const t=e.get("user");const pid=parseInt(e.req.param("id"),10);
  const{media_ids:mids}=await e.req.json().catch(()=>({media_ids:[]}));
  if(!Array.isArray(mids))return e.json({error:"media_ids must be array"},400);
  const post=await e.env.DB.prepare("SELECT id, media_json FROM post_queue WHERE id=? AND user_id=?").bind(pid,t.id).first();
  if(!post)return e.json({error:"post not found"},404);
  let mediaType=null;
  if(mids.length>0){
    const f=await e.env.DB.prepare("SELECT file_type FROM media_assets WHERE id=? AND user_id=?").bind(mids[0],t.id).first();
    mediaType=(f==null?void 0:f.file_type)||null;
  }
  await e.env.DB.prepare("UPDATE post_queue SET media_json=?, media_type=?, updated_at=? WHERE id=? AND user_id=?").bind(JSON.stringify(mids.slice(0,4)),mediaType,g(),pid,t.id).run();
  return e.json({success:!0});
});
at.get("/api/admin/thread/recent-posts",m,async e=>{
  const t=e.get("user");
  const acctId=e.req.query("account_id");
  let acct=null;
  if(acctId){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=? LIMIT 1").bind(Number(acctId),t.id).first()}
  if(!acct){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first()}
  if(!acct){acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first()}
  if(!acct)return e.json({posts:[],source:"local_log+x_live",error:"No active X account"});
  const localPosts=[];
  try{
    const{results:rows}=await e.env.DB.prepare(`SELECT pl.id AS log_id, pl.record_id, pl.content, pl.api_response_summary,
             pl.posted_at, pl.executed_at, pl.created_at, pl.account_id,
             xa.x_username, xa.account_name AS joined_account_name
        FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id=pl.account_id
       WHERE pl.user_id=? AND pl.platform='x' AND pl.status='posted'
         AND pl.api_response_summary IS NOT NULL AND pl.api_response_summary LIKE '%tweet_id%'
         AND (pl.account_id=? OR ? IS NULL)
       ORDER BY COALESCE(pl.posted_at, pl.executed_at, pl.created_at) DESC LIMIT 30`).bind(t.id,acct.id,acct.id).all();
    for(const row of rows||[]){
      const xid=__xExtractPostLogTweetId(row);
      if(!xid)continue;
      localPosts.push({
        id:"log-"+xid,
        content:row.content||"",
        external_post_id:xid,
        posted_at:row.posted_at||row.executed_at||row.created_at||"",
        created_at:row.created_at||"",
        account_id:row.account_id||acct.id,
        joined_account_name:row.joined_account_name||acct.account_name,
        x_username:row.x_username||acct.x_username||acct.account_name||"",
        source:"local_log"
      });
    }
  }catch(logErr){console.error("[thread-recent-local]",logErr&&logErr.message)}
  let creds;
  try{creds=await Ft(e.env,acct)}catch(err){return e.json({posts:localPosts,source:"local_log",warning:(err&&err.message)||"creds_failed"})}
  let xUserId=acct.x_user_id;
  let xUsername=acct.x_username||acct.account_name||"";
  try{
    if(!xUserId){
      const me=await kn(creds);
      xUserId=me.id;
      xUsername=me.username||xUsername;
      await e.env.DB.prepare("UPDATE x_accounts SET x_user_id=?, x_username=?, updated_at=? WHERE id=?").bind(xUserId,xUsername,g(),acct.id).run().catch(()=>{});
    }
    const timeline=await $t("GET","/users/"+encodeURIComponent(xUserId)+"/tweets?max_results=30&exclude=retweets,replies&tweet.fields=created_at,conversation_id,referenced_tweets,reply_settings",void 0,creds);
    const livePosts=((timeline&&timeline.data)||[]).filter(r=>!((r.referenced_tweets||[]).some(x=>x&&x.type==="replied_to"))).map(r=>({
      id:"live-"+r.id,
      content:r.text||"",
      external_post_id:__xCleanTweetId(r.id),
      posted_at:(r.created_at||"").replace("T"," ").replace("Z",""),
      created_at:r.created_at||"",
      account_id:acct.id,
      joined_account_name:acct.account_name,
      x_username:xUsername,
      source:"x_live",
      reply_settings:r.reply_settings||""
    }));
    const seen=new Set,posts=[];
    for(const item of localPosts.concat(livePosts)){
      const xid=__xCleanTweetId(item.external_post_id);
      if(!xid||seen.has(xid))continue;
      item.external_post_id=xid;
      seen.add(xid);
      posts.push(item);
      if(posts.length>=30)break;
    }
    return e.json({posts,source:"local_log+x_live"});
  }catch(err){
    return e.json({posts:localPosts,source:"local_log",warning:(err&&err.message)||"x_recent_fetch_failed"});
  }
});
function __xFriendlyPostError(err){const msg=((err&&err.message)||String(err||"unknown_error")).trim();if(/Reply to this conversation is not allowed/i.test(msg))return "reply_restricted: 指定した投稿IDは返信制限により、このアカウントからコメントできません。自分の投稿ID、返信が全員に許可された投稿ID、または@FxTendiemanがメンションされ返信可能な投稿IDを指定してください。 raw="+msg;if(/401 Unauthorized/i.test(msg))return "x_auth_401: Xのユーザー認証トークンが無効です。API設定の投稿権限テストで再認証してください。 raw="+msg;if(/403/i.test(msg)&&/not permitted|Forbidden|投稿権限なし/i.test(msg))return "x_auth_403: Xの投稿権限が不足しています。Developer PortalをRead and writeにした後、Access Token & Secretを再生成し、API設定とアカウント管理を保存し直してください。 raw="+msg;return msg||"unknown_error"}function __xCleanTweetId(e){return String(e||"").trim().replace(/[^0-9]/g,"")}function __xThreadParentExternalId(e){const id=__xCleanTweetId(e);return id?"x:"+id:""}function __xExtractPostLogTweetId(row){try{const j=JSON.parse(String((row&&row.api_response_summary)||"{}"));return __xCleanTweetId(j.tweet_id||j.last_tweet_id||"")}catch{return""}}async function __xRecoverExactTweetIdFromLogs(env,userId,accountId,candidate){const want=__xCleanTweetId(candidate);if(!want)return"";try{const params=[userId];let acctSql="";if(accountId){acctSql=" AND (pl.account_id=? OR pl.account_id IS NULL)";params.push(accountId)}const{results:rows}=await env.DB.prepare(`SELECT pl.api_response_summary FROM post_logs pl WHERE pl.user_id=? AND pl.platform='x' AND pl.status='posted' AND pl.api_response_summary IS NOT NULL AND pl.api_response_summary LIKE '%tweet_id%'${acctSql} ORDER BY pl.id DESC LIMIT 80`).bind(...params).all();for(const row of rows||[]){let j={};try{j=JSON.parse(String((row&&row.api_response_summary)||"{}"))}catch{}for(const raw of[j.tweet_id,j.last_tweet_id]){const exact=__xCleanTweetId(raw);if(!exact)continue;if(exact===want)return exact;try{if(String(Number(exact))===want)return exact}catch{}}}}catch(err){console.error("[x-id-recover]",err&&err.message)}return""}function __threadMediaIds(it){let raw=[];if(it&&Array.isArray(it.media_ids))raw=it.media_ids;else if(it&&Array.isArray(it.media_json))raw=it.media_json;else if(it&&typeof it.media_json==="string")try{raw=JSON.parse(it.media_json)}catch{}return(raw||[]).map(v=>parseInt(v,10)).filter(v=>Number.isFinite(v)&&v>0).filter((v,i,a)=>a.indexOf(v)===i).slice(0,4)}async function __threadMediaPlan(env,userId,ids){const images=[],videos=[];for(const mid of ids||[]){const asset=await env.DB.prepare("SELECT id,file_type,mime_type FROM media_assets WHERE id=? AND user_id=?").bind(mid,userId).first();if(!asset)continue;const ft=String(asset.file_type||"").toLowerCase(),mt=String(asset.mime_type||"").toLowerCase();if(ft==="video"||mt.startsWith("video/"))videos.push(asset.id);else images.push(asset.id)}if(videos.length>0)return{ids:[videos[0]],type:"video"};return{ids:images.slice(0,4),type:images.length>0?"image":null}}
at.post("/api/admin/thread/post-now",m,async e=>{
  const t=e.get("user");
  const{target_tweet_id:rawTid,tweets:arr}=await e.req.json().catch(()=>({}));
  const tid=__xCleanTweetId(rawTid);
  const tweets=Array.isArray(arr)?arr.map(it=>({body:String((it&&it.body)||"").trim(),media_ids:__threadMediaIds(it)})).filter(it=>it.body.length>0||it.media_ids.length>0):[];
  if(tweets.length===0)return e.json({success:!1,error:"tweets are required"},400);
  if(tweets.length>10)return e.json({success:!1,error:"max 10 replies"},400);
  const acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first()||await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if(!acct)return e.json({success:!1,error:"No active X account"},400);
  let creds;try{creds=await Ft(e.env,acct)}catch(err){return e.json({success:!1,error:(err&&err.message)||"creds_failed"},400)}
  let parent=tid||null;const posted=[];const errs=[];
  for(let i=0;i<tweets.length;i++){
    const it=tweets[i];
    const mediaPlan=await __threadMediaPlan(e.env,t.id,it.media_ids);it.media_ids=mediaPlan.ids;const xMids=[];
    if(mediaPlan.ids.length>0){
      for(const mid of mediaPlan.ids){
        const v=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(mid,t.id).first();
        if(!v)continue;
        if(v.x_media_id){xMids.push(v.x_media_id);continue;}
        try{
          const{bytes,mime}=await readMediaBytes(e.env,v);
          if(bytes){
            const xid=await xMU_upload(creds,bytes,mime);
            await e.env.DB.prepare("UPDATE media_assets SET x_media_id=?, upload_status='uploaded', updated_at=? WHERE id=?").bind(xid,g(),v.id).run();
            xMids.push(xid);
          }else{console.error("[thread-mediaUp] no bytes for media id="+mid+" path="+v.storage_path)}
        }catch(uErr){console.error("[thread-mediaUp]",uErr&&uErr.message,"media id="+mid)}
      }
    }
    try{
      const replyTo=parent;
      const r=replyTo?(xMids.length>0?await $sReply(creds,it.body,replyTo,xMids):await $sReply(creds,it.body,replyTo)):(xMids.length>0?await $s(creds,it.body,xMids,null):await Ms(creds,it.body));
      const tailId=(r&&r.last_id)||r.id;
      posted.push({index:i,id:r.id,last_id:tailId,split_count:r.split_count||1});parent=tailId;
      const tt=g();
      await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, post_mode, scheduled_at, effective_scheduled_at,
          status, source_type, thread_parent_id, thread_order, thread_count, external_post_id, posted_at, media_json, media_type, created_at, updated_at)
         VALUES ('x', ?, ?, ?, 'thread', ?, ?, 'posted', 'thread', ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
           t.id, acct.id, it.body, tt, tt, replyTo, i, tweets.length, tailId, tt,
          xMids.length>0?JSON.stringify(it.media_ids.slice(0,4)):null,
          xMids.length>0?mediaPlan.type:null, tt, tt
        ).run().catch(()=>{});
    }catch(err){
      errs.push({index:i,error:__xFriendlyPostError(err),parent_id:parent||""});
      break;
    }
  }
  return e.json({success:errs.length===0,posted:posted.length,errors:errs,results:posted,root_target_id:tid||null});
});
at.post("/api/admin/thread/schedule",m,async e=>{
  const t=e.get("user");
  const{target_tweet_id:rawTid,tweets:arr,scheduled_at:sched}=await e.req.json().catch(()=>({}));
  const tid=__xCleanTweetId(rawTid);
  const tweets=Array.isArray(arr)?arr.map(it=>({body:String((it&&it.body)||"").trim(),media_ids:__threadMediaIds(it)})).filter(it=>it.body.length>0||it.media_ids.length>0):[];
  if(tweets.length===0)return e.json({success:!1,error:"tweets are required"},400);
  if(!sched)return e.json({success:!1,error:"scheduled_at required"},400);
  if(tweets.length>10)return e.json({success:!1,error:"max 10 replies"},400);
  const acct=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_current=1 LIMIT 1").bind(t.id).first()||await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();
  if(!acct)return e.json({success:!1,error:"No active X account"},400);
  const day=String(sched).slice(0,10);
  const active=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND COALESCE(account_id,0)=COALESCE(?,0) AND SUBSTR(COALESCE(effective_scheduled_at, scheduled_at),1,10)=? AND status IN ('pending','approved','scheduled','publishing')").bind(t.id,acct.id,day).first();
  if((((active==null?void 0:active.n)??0)+tweets.length)>20)return e.json({success:!1,error:"This day already has 20 active reservations"},400);
  const tt=g();const ids=[];
  for(let i=0;i<tweets.length;i++){
    const it=tweets[i];
    const mediaPlan=await __threadMediaPlan(e.env,t.id,it.media_ids);it.media_ids=mediaPlan.ids;const mediaJson=mediaPlan.ids.length>0?JSON.stringify(mediaPlan.ids):null;
    const r=await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, post_mode, scheduled_at, effective_scheduled_at,
       status, source_type, thread_parent_id, thread_order, thread_count, media_json, media_type, created_at, updated_at)
       VALUES ('x', ?, ?, ?, 'thread', ?, ?, 'scheduled', 'thread', ?, ?, ?, ?, ?, ?, ?)`).bind(
        t.id, acct.id, it.body, sched, sched, i===0?(__xThreadParentExternalId(tid)||null):"prev:"+(ids[i-1]||""), i, tweets.length,
        mediaJson, mediaPlan.type, tt, tt
      ).run();
    ids.push(r.meta.last_row_id);
  }
  return e.json({success:!0,ids,root_target_id:tid||null});
});
at.get("/media/*",async e=>{if(!e.env.MEDIA_BUCKET)return e.notFound();const t=e.req.path.replace(/^\/media\//,""),s=await e.env.MEDIA_BUCKET.get(t);if(!s)return e.notFound();const a=new Headers;return s.writeHttpMetadata(a),a.set("etag",s.httpEtag),new Response(s.body,{headers:a})});const Pt=new A;Pt.get("/api/admin/kpi",m,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=parseInt(e.req.query("days")||"30",10),n=[t.id,a];let i="WHERE km.user_id = ? AND km.metric_date >= date('now','+9 hours','-' || ? || ' days')";s&&(i+=" AND km.account_id = ?",n.push(Number(s)));const{results:r}=await e.env.DB.prepare(`SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${i} ORDER BY km.metric_date DESC, km.account_id ASC`).bind(...n).all();return e.json({metrics:r||[]})});Pt.get("/api/admin/kpi/summary",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`).bind(t.id).first(),a=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`).bind(t.id).first();return e.json({today:{sent:(s==null?void 0:s.sent)??0,failed:(s==null?void 0:s.failed)??0},week:{sent:(a==null?void 0:a.sent)??0,failed:(a==null?void 0:a.failed)??0}})});const gt=new A;gt.get("/api/admin/posts/recent-posted",m,async e=>{const t=e.get("user");const{results:r}=await e.env.DB.prepare(`SELECT pq.id, pq.body AS content, pq.external_post_id, pq.posted_at, pq.created_at, xa.x_username, xa.account_name AS joined_account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
       WHERE pq.user_id = ? AND pq.status='posted' AND pq.external_post_id IS NOT NULL AND pq.external_post_id != ''
       ORDER BY COALESCE(pq.posted_at, pq.created_at) DESC LIMIT 30`).bind(t.id).all();return e.json({logs:r||[]})});gt.get("/api/admin/logs/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=[t.id];let i="WHERE pl.user_id = ?";s&&s!=="all"&&(i+=" AND pl.status = ?",n.push(s)),a&&(i+=" AND pl.account_id = ?",n.push(Number(a)));const{results:r}=await e.env.DB.prepare(`SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${i} ORDER BY pl.id DESC LIMIT 300`).bind(...n).all();return e.json({logs:r||[]})});gt.get("/api/admin/logs/generations",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});gt.get("/api/admin/logs/health",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});const vt=new A;vt.get("/api/admin/target/presets",m,e=>e.json({templates:Fs}));vt.get("/api/admin/target",m,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({target:a})});vt.post("/api/admin/target",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`).bind(s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const yt=new A;yt.get("/api/admin/voice/presets",m,e=>e.json({templates:On}));yt.get("/api/admin/voice",m,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({voice:a})});yt.post("/api/admin/voice",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`).bind(s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const He=new A;He.get("/api/admin/api-settings",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first(),a=await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id')").all(),n={};for(const l of a.results||[])n[l.key]=l.value;const i=s!=null&&s.api_key?await lt(s.api_key,e.env.ENCRYPTION_KEY):"",r=s!=null&&s.api_secret?"••••••••":"",o=n.openai_api_key?"••••••••":"",d=n.telegram_bot_token?"••••••••":"";return e.json({api_key:i,api_secret:r,openai_key:o,openai_model:n.openai_model||"gpt-4o-mini",telegram_token:d,telegram_chat_id:n.telegram_chat_id||""})});He.post("/api/admin/api-settings/x",m,async e=>{const t=e.get("user"),{api_key:s,api_secret:a,oauth2_client_id:cid,oauth2_client_secret:csec,oauth2_user_token:oauth2Token}=await e.req.json();const newKey=s&&!s.includes("•")?s.trim():null;const newSecret=a&&!a.includes("•")?a.trim():null;const newClientId=cid&&!cid.includes("•")?cid.trim():null;const newClientSecret=csec&&!csec.includes("•")?csec.trim():null;const newOauth2=oauth2Token&&!oauth2Token.includes("•")&&oauth2Token.trim()?oauth2Token.trim():null;if(!newKey&&!newSecret&&!newClientId&&!newClientSecret&&!newOauth2){const ex=await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first();if(!ex)return e.json({success:!1,error:"少なくともAPI Keyを入力してください"},400);return e.json({success:!0,unchanged:!0})}const encKey=newKey?await _e(newKey,e.env.ENCRYPTION_KEY):null;const encSec=newSecret?await _e(newSecret,e.env.ENCRYPTION_KEY):null;const exist=await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first();if(exist){if(encKey&&encSec)await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encKey,encSec,t.id).run();else if(encKey)await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encKey,t.id).run();else if(encSec)await e.env.DB.prepare("UPDATE x_api_settings SET api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(encSec,t.id).run();}else{if(!encKey)return e.json({success:!1,error:"API Keyを入力してください"},400);await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)").bind(t.id,encKey,encSec||"").run()}if(newClientId)await _t(e,"x_oauth2_client_id",newClientId,"X OAuth2 Client ID");if(newClientSecret)await _t(e,"x_oauth2_client_secret",await _e(newClientSecret,e.env.ENCRYPTION_KEY),"X OAuth2 Client Secret");if(newOauth2){const encOauth2=await _e(newOauth2,e.env.ENCRYPTION_KEY);await _t(e,"x_oauth2_user_token",encOauth2,"X OAuth2 User Access Token (tweet.write)")}return e.json({success:!0})});He.get("/api/admin/x/oauth2/start",m,async e=>{try{const clientId=(await __xReadSetting(e.env,"x_oauth2_client_id")).trim();if(!clientId)return e.text("OAuth2 Client ID未設定。API設定でClient IDを保存してください。",400);const origin=new URL(e.req.url).origin,redirectUri=origin+"/api/admin/x/oauth2/callback";const state=St(Ct(24)),verifier=St(Ct(48));const digest=new Uint8Array(await crypto.subtle.digest("SHA-256",ie.encode(verifier)));const challenge=St(digest);const scope="tweet.read tweet.write users.read offline.access";const u=new URL("https://x.com/i/oauth2/authorize");u.searchParams.set("response_type","code");u.searchParams.set("client_id",clientId);u.searchParams.set("redirect_uri",redirectUri);u.searchParams.set("scope",scope);u.searchParams.set("state",state);u.searchParams.set("code_challenge",challenge);u.searchParams.set("code_challenge_method","S256");e.header("Set-Cookie",Ls("x_oauth2_state",state,{maxAge:600,sameSite:"Lax"}),{append:true});e.header("Set-Cookie",Ls("x_oauth2_verifier",verifier,{maxAge:600,sameSite:"Lax"}),{append:true});return e.redirect(u.toString())}catch(err){return e.text((err&&err.message)||String(err),500)}});He.get("/api/admin/x/oauth2/callback",m,async e=>{try{const qState=e.req.query("state")||"",code=e.req.query("code")||"",cState=Ga(e.req.raw,"x_oauth2_state")||"",verifier=Ga(e.req.raw,"x_oauth2_verifier")||"";if(!code)return e.text("X OAuth2認証コードがありません。",400);if(!qState||!cState||qState!==cState||!verifier)return e.text("X OAuth2 state検証に失敗しました。もう一度API設定から認証してください。",400);const clientId=(await __xReadSetting(e.env,"x_oauth2_client_id")).trim();const secEnc=await __xReadSetting(e.env,"x_oauth2_client_secret");let clientSecret="";try{clientSecret=secEnc?await At(secEnc,e.env.ENCRYPTION_KEY):""}catch{}const redirectUri=new URL(e.req.url).origin+"/api/admin/x/oauth2/callback";const body=new URLSearchParams({code,grant_type:"authorization_code",client_id:clientId,redirect_uri:redirectUri,code_verifier:verifier});const headers={"content-type":"application/x-www-form-urlencoded"};if(clientSecret)headers.authorization=__xBasicAuth(clientId,clientSecret);const r=await fetch("https://api.x.com/2/oauth2/token",{method:"POST",headers,body,signal:AbortSignal.timeout(3e4)});const raw=await r.text();let j={};try{j=JSON.parse(raw)}catch{}if(!r.ok||!j.access_token)return e.text("OAuth2 token取得失敗: "+r.status+" "+__xDetailFromRaw(raw),400);await __xPutSetting(e.env,"x_oauth2_user_token",await _e(j.access_token,e.env.ENCRYPTION_KEY),"X OAuth2 User Access Token (tweet.write)");if(j.refresh_token)await __xPutSetting(e.env,"x_oauth2_refresh_token",await _e(j.refresh_token,e.env.ENCRYPTION_KEY),"X OAuth2 Refresh Token");if(j.expires_in)await __xPutSetting(e.env,"x_oauth2_expires_at",String(Math.floor(Date.now()/1e3)+Number(j.expires_in)),"X OAuth2 Access Token expiry");e.header("Set-Cookie",Ls("x_oauth2_state","",{maxAge:0,sameSite:"Lax"}),{append:true});e.header("Set-Cookie",Ls("x_oauth2_verifier","",{maxAge:0,sameSite:"Lax"}),{append:true});return e.redirect("/dashboard/api?x_oauth2=ok")}catch(err){return e.text((err&&err.message)||String(err),500)}});He.post("/api/admin/api-settings/openai",m,async e=>{const{openai_key:t,openai_model:s}=await e.req.json();if(t&&!t.includes("•")){const a=await _e(t.trim(),e.env.ENCRYPTION_KEY);await _t(e,"openai_api_key",a,"OpenAI API Key (AES暗号化)")}return s&&await _t(e,"openai_model",s,"OpenAI モデル名"),e.json({success:!0})});He.post("/api/admin/api-settings/gemini",m,async e=>{const{gemini_key:t,gemini_model:s}=await e.req.json();if(t&&!t.includes("•")){const a=await _e(t.trim(),e.env.ENCRYPTION_KEY);await _t(e,"gemini_api_key",a,"Gemini API Key (AES暗号化)")}return s&&await _t(e,"gemini_model",s,"Gemini モデル名"),e.json({success:!0})});He.post("/api/admin/api-settings/telegram",m,async e=>{const{telegram_token:t,telegram_chat_id:s}=await e.req.json();if(t&&!t.includes("•")){const a=await _e(t.trim(),e.env.ENCRYPTION_KEY);await _t(e,"telegram_bot_token",a,"Telegram Bot Token (AES暗号化)")}return s&&await _t(e,"telegram_chat_id",s,"Telegram Chat ID"),e.json({success:!0})});He.post("/api/admin/api-settings/:kind/test",m,async e=>{const t=e.req.param("kind"),s=e.get("user");try{if(t==="x"){const a=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(s.id).first();if(!(a!=null&&a.api_key)||!(a!=null&&a.api_secret))return e.json({success:!1,error:"X API settings NG: save both Consumer Key and Consumer Secret"});const apiKey=await lt(a.api_key,e.env.ENCRYPTION_KEY),apiSecret=await lt(a.api_secret,e.env.ENCRYPTION_KEY);if(!apiKey||!apiSecret)return e.json({success:!1,error:"X API settings NG: Consumer Key/Secret decrypt failed"});let acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(s.id).first();if(!acct)acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(s.id).first();if(!acct)return e.json({success:!1,error:"X account NG: save Access Token and Access Token Secret"});const creds=await Ft(e.env,acct,{apiKey,apiSecret});const me=creds.oauth2AccessToken?await xOAuth2Me(creds).catch(()=>kn(creds)):await kn(creds);await __xWritePreflight(creds);return e.json({success:!0,message:"X接続OK @"+((me&&me.username)||acct.x_username||acct.account_name)+"。読み取り接続のみ確認しました。投稿権限は「投稿権限テスト（投稿→削除）」で確認してください。"})}if(t==="openai"){const a=await Tt(e,"openai_api_key");if(!a)return e.json({success:!1,error:"OpenAI Key 未設定"});const n=await lt(a,e.env.ENCRYPTION_KEY);if(!n)return e.json({success:!1,error:"復号失敗"});const i=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}});return i.ok?e.json({success:!0,message:"OpenAI 接続OK"}):e.json({success:!1,error:`OpenAI API ${i.status}`})}if(t==="gemini"){const a=await Tt(e,"gemini_api_key");if(!a)return e.json({success:!1,error:"Gemini Key 未設定"});const n=await lt(a,e.env.ENCRYPTION_KEY);if(!n)return e.json({success:!1,error:"復号失敗"});const i=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${n}`);return i.ok?e.json({success:!0,message:"Gemini 接続OK"}):e.json({success:!1,error:`Gemini API ${i.status}`})}if(t==="telegram"){const a=await Tt(e,"telegram_bot_token"),n=await Tt(e,"telegram_chat_id");if(!a||!n)return e.json({success:!1,error:"Telegram 未設定"});const i=await lt(a,e.env.ENCRYPTION_KEY);if(!i)return e.json({success:!1,error:"復号失敗"});const o=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:n,text:"✅ GE365x-web: Telegram 接続テスト成功"})})).json();return o!=null&&o.ok?e.json({success:!0,message:"Telegram 送信成功"}):e.json({success:!1,error:(o==null?void 0:o.description)||"Telegram 送信失敗"})}return e.json({success:!1,error:"unknown kind"},400)}catch(a){return e.json({success:!1,error:(a==null?void 0:a.message)||String(a)})}});He.post("/api/admin/x/post-permission-test",m,async e=>{const user=e.get("user");try{const setting=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(user.id).first();if(!(setting&&setting.api_key&&setting.api_secret))return e.json({success:false,error:"X API設定にConsumer KeyとConsumer Secretを保存してください"},400);const apiKey=await lt(setting.api_key,e.env.ENCRYPTION_KEY),apiSecret=await lt(setting.api_secret,e.env.ENCRYPTION_KEY);if(!apiKey||!apiSecret)return e.json({success:false,error:"X API Key/Secretの復号に失敗しました。API設定を保存し直してください"},400);let acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_current=1 AND is_active=1 LIMIT 1").bind(user.id).first();if(!acct)acct=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(user.id).first();if(!acct)return e.json({success:false,error:"Xアカウント管理にAccess TokenとAccess Token Secretを保存してください"},400);const creds=await Ft(e.env,acct,{apiKey,apiSecret});let me=null;try{me=creds.oauth2AccessToken?await xOAuth2Me(creds).catch(()=>kn(creds)):await kn(creds)}catch{}const text="GE365X 投稿権限テスト "+g()+" "+En().slice(0,8);const posted=await __xPostTweetStrict(creds,text,[],null);let deleted=false,delete_error="";try{await __xDeleteTweetStrict(creds,posted.id);deleted=true}catch(delErr){delete_error=(delErr&&delErr.message)||String(delErr)}return e.json({success:true,message:"投稿権限OK",tweet_id:posted.id,deleted,delete_error,username:(me&&me.username)||acct.x_username||acct.account_name})}catch(err){return e.json({success:false,error:(err&&err.message)||String(err),status_code:err instanceof $?err.statusCode:0,error_type:(err&&err.errorType)||""})}});async function _t(e,t,s,a){await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s,a).run()}async function Tt(e,t){const s=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(t).first();return(s==null?void 0:s.value)||null}async function lt(e,t){try{return await At(e,t)}catch{return""}}const B=new A;function rs(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}function W(e,t){const a=e.map(rs).join(","),n=t.map(i=>e.map(r=>rs(i[r])).join(","));return"\uFEFF"+a+`
`+n.join(`
`)}function Y(e,t){return new Response(e,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function Vs(e,t){return new Response(JSON.stringify(e,null,2),{headers:{"content-type":"application/json; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function q(){const e=new Date,t=s=>String(s).padStart(2,"0");return`${e.getFullYear()}${t(e.getMonth()+1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`}B.get("/api/admin/export/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("month");let n="WHERE pq.platform='x' AND pq.user_id = ?";const i=[t.id];s&&s!=="all"&&(n+=" AND pq.status = ?",i.push(s)),a&&(n+=" AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?",i.push(a));const{results:r}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${n} ORDER BY pq.id DESC LIMIT 10000`).bind(...i).all(),d=W(["id","body","link_url","hashtags","post_mode","status","account_name","x_username","generation_type","source_type","pattern_type","scheduled_at","effective_scheduled_at","posted_at","external_post_id","error_message","recurrence_type","recurrence_rule","thread_parent_id","thread_order","thread_count","media_type","jitter_enabled","jitter_minutes","created_at","updated_at"],r||[]);return Y(d,`ge365x_posts_${q()}.csv`)});B.get("/api/admin/export/logs",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","record_id","account_name","platform","source_type","generation_type","post_mode","content","content_hash","link_url","media_type","media_upload_status","media_id","thread_parent_id","thread_order","thread_total_count","scheduled_at","executed_at","posted_at","status","error_message","api_response_summary","created_at"],s||[]);return Y(n,`ge365x_post_logs_${q()}.csv`)});B.get("/api/admin/export/generations",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","brand_voice_id","target_setting_id","post_mode","generation_type","output_text","created_at"],s||[]);return Y(n,`ge365x_generation_logs_${q()}.csv`)});B.get("/api/admin/export/autopilot",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","reservation_no","account_id","account_name","x_username","channel_type","content_mode","theme","keywords","prompt_text","title_memo","link_url","generate_at","publish_at","status","generated_post_id","external_post_id","error_message","created_at","updated_at"],s||[]);return Y(n,`ge365x_autopilot_${q()}.csv`)});B.get("/api/admin/export/drafts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`).bind(t.id).all(),n=W(["id","account_id","title","body","link_url","hashtags","post_mode","created_at","updated_at"],s||[]);return Y(n,`ge365x_drafts_${q()}.csv`)});B.get("/api/admin/export/kpi",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","metric_date","posts_sent","posts_failed","impressions","engagements","followers_gained","created_at","updated_at"],s||[]);return Y(n,`ge365x_kpi_${q()}.csv`)});B.get("/api/admin/export/accounts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_name","x_user_id","x_username","daily_post_count","daily_post_limit","last_posted_at","account_health_score","health_status","is_active","is_current","last_daily_reset_date","created_at","updated_at"],s||[]);return Y(n,`ge365x_accounts_${q()}.csv`)});B.get("/api/admin/export/targets",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","template_key","label","age_range","gender","genre","occupation","pains","desires","purchase_triggers","problem","goal","knowledge","is_default"],s||[]);return Y(n,`ge365x_targets_${q()}.csv`)});B.get("/api/admin/export/voices",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","voice_key","label","tone","worldview","personal_story","prohibited_words","sample_posts","is_default"],s||[]);return Y(n,`ge365x_voices_${q()}.csv`)});B.get("/api/admin/export/all",m,async e=>{const t=e.get("user"),s=t.id,[a,n,i,r,o,d,l,c,p]=await Promise.all([e.env.DB.prepare(`SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`).bind(s).all(),e.env.DB.prepare("SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000").bind(s).all(),e.env.DB.prepare("SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(s).all(),e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC").bind(s).all(),e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC").bind(s).all()]),_={exported_at:new Date().toISOString(),user:{id:t.id,email:t.email},posts:a.results||[],post_logs:n.results||[],generation_logs:i.results||[],autopilot_jobs:r.results||[],drafts:o.results||[],kpi_metrics:d.results||[],x_accounts:l.results||[],target_templates:c.results||[],brand_voices:p.results||[]};return Vs(_,`ge365x_all_data_${q()}.json`)});B.get("/api/admin/export/admin/users",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`).all(),a=W(["id","email","is_approved","is_admin","trial_start","trial_end","created_at","updated_at","plan_code","sub_status","current_period_end"],t||[]);return Y(a,`ge365x_admin_users_${q()}.csv`)});B.get("/api/admin/export/admin/licenses",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`).all(),a=W(["id","license_key","license_type","plan_code","user_id","user_email","is_active","activated_at","expires_at","issued_by","note","created_at","updated_at"],t||[]);return Y(a,`ge365x_admin_licenses_${q()}.csv`)});B.get("/api/admin/export/admin/subs",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.created_at, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`).all(),a=W(["id","user_id","user_email","plan_code","status","started_at","current_period_end","cancel_at_period_end","created_at","updated_at"],t||[]);return Y(a,`ge365x_admin_subs_${q()}.csv`)});B.get("/api/admin/export/admin/audit",m,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(),a=W(["id","user_id","email","event_type","ip_address","user_agent","metadata","created_at"],t||[]);return Y(a,`ge365x_admin_audit_${q()}.csv`)});B.get("/api/admin/export/admin/all",m,R,async e=>{const[t,s,a,n,i,r,o]=await Promise.all([e.env.DB.prepare(`SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
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
         FROM x_accounts ORDER BY id DESC LIMIT 10000`).all()]),d={exported_at:new Date().toISOString(),users:t.results||[],user_subscriptions:s.results||[],licenses:a.results||[],auth_logs:n.results||[],post_queue:i.results||[],post_logs:r.results||[],x_accounts:o.results||[]};return Vs(d,`ge365x_admin_all_${q()}.json`)});const S=new A;S.use("*",async(e,t)=>{await t();e.header("Cache-Control","no-store, no-cache, must-revalidate, max-age=0");e.header("Pragma","no-cache");});S.use("/static/*",Ua({root:"./",manifest:{}}));S.get("/healthz",e=>e.json({ok:!0,service:"ge365x-web",time:new Date().toISOString(),build:"ver1.0"}));S.route("/",js);S.route("/",H);S.route("/",F);S.route("/",fe);S.route("/",be);S.route("/",ge);S.route("/",U);S.route("/",zs);S.route("/",ve);S.route("/",tt);S.route("/",st);S.route("/",at);S.route("/",Pt);S.route("/",gt);S.route("/",vt);S.route("/",yt);S.route("/",He);S.route("/",B);S.notFound(e=>e.json({error:"not_found",path:e.req.path},404));S.onError((e,t)=>(console.error("[ge365x-web] error:",e),t.json({error:"internal_error",message:e.message},500)));const Hn={fetch:S.fetch,async scheduled(e,t,s){const a=e.cron;(!a||a==="*/1 * * * *")&&s.waitUntil(S.fetch(new Request("https://internal/cron/tick",{method:"POST"}),t,s).catch(n=>console.error("[tick]",n))),a==="*/5 * * * *"&&s.waitUntil(S.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}),t,s).catch(n=>console.error("[autopilot-tick]",n)))}},os=new A,Un=Object.assign({"/src/index.tsx":Hn});let Xs=!1;for(const[,e]of Object.entries(Un))e&&(os.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),os.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Xs=!0);if(!Xs)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");
// ★重大バグ修正: 元のコードは os だけを export しており、Hn.scheduled (cron handler) が
//   Cloudflare Workers のスケジューラに到達せず、予約投稿が一切実行されなかった。
//   ここで fetch / scheduled の両方を export してスケジューラを有効化する。
const __wrappedDefault = {
  fetch(req, env, ctx) { return os.fetch(req, env, ctx); },
  scheduled(controller, env, ctx) {
    const cron = controller && controller.cron;
    const run = async () => {
      console.log("[scheduled] cron:", cron || "(manual)");
      await S.fetch(new Request("https://internal/cron/autopilot-tick", { method: "POST" }), env, ctx);
      await S.fetch(new Request("https://internal/cron/tick", { method: "POST" }), env, ctx);
    };
    if (ctx && ctx.waitUntil) return ctx.waitUntil(run().catch(err => console.error("[scheduled]", err)));
    return run();
  }
};
export { __wrappedDefault as default };
