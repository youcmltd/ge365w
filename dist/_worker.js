var Zs=Object.defineProperty;var Ht=e=>{throw TypeError(e)};var Qs=(e,t,s)=>t in e?Zs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var h=(e,t,s)=>Qs(e,typeof t!="symbol"?t+"":t,s),xt=(e,t,s)=>t.has(e)||Ht("Cannot "+s);var u=(e,t,s)=>(xt(e,t,"read from private field"),s?s.call(e):t.get(e)),E=(e,t,s)=>t.has(e)?Ht("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),f=(e,t,s,a)=>(xt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),x=(e,t,s)=>(xt(e,t,"access private method"),s);var Ut=(e,t,s,a)=>({set _(n){f(e,t,n,s)},get _(){return u(e,t,a)}});var Wt=(e,t,s)=>(a,n)=>{let i=-1;return r(0);async function r(o){if(o<=i)throw new Error("next() called multiple times");i=o;let c,d=!1,l;if(e[o]?(l=e[o][0][0],a.req.routeIndex=o):l=o===e.length&&n||void 0,l)try{c=await l(a,()=>r(o+1))}catch(p){if(p instanceof Error&&t)a.error=p,c=await t(p,a),d=!0;else throw p}else a.finalized===!1&&s&&(c=await s(a));return c&&(a.finalized===!1||d)&&(a.res=c),a}},ea=Symbol(),ta=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,i=(e instanceof vs?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?sa(e,{all:s,dot:a}):{}};async function sa(e,t){const s=await e.formData();return s?aa(s,t):{}}function aa(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?na(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(ia(s,a,n),delete s[a])}),s}var na=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},ia=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let a=e;const n=t.split(".");n.forEach((i,r)=>{r===n.length-1?a[i]=s:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},_s=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ra=e=>{const{groups:t,path:s}=oa(e),a=_s(s);return ca(a,t)},oa=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},ca=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},it={},da=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return it[a]||(s[2]?it[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:it[a]=[e,s[1],!0]),it[a]}return null},jt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},ms=e=>jt(e,decodeURI),hs=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const i=t.indexOf("?",a),r=t.indexOf("#",a),o=i===-1?r===-1?void 0:r:r===-1?i:Math.min(i,r),c=t.slice(s,o);return ms(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63||n===35)break}return t.slice(s,a)},la=e=>{const t=hs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Ie=(e,t,...s)=>(s.length&&(t=Ie(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),fs=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const i=n.replace("?","");a+="/"+i,s.push(a)}else a+="/"+n}),s.filter((n,i,r)=>r.indexOf(n)===i)},wt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?jt(e,gs):e):e,bs=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const o=e.charCodeAt(r+t.length+1);if(o===61){const c=r+t.length+2,d=e.indexOf("&",c);return wt(e.slice(c,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";r=e.indexOf(`&${t}`,r+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const r=e.indexOf("&",i+1);let o=e.indexOf("=",i);o>r&&r!==-1&&(o=-1);let c=e.slice(i+1,o===-1?r===-1?void 0:r:o);if(a&&(c=wt(c)),i=r,c==="")continue;let d;o===-1?d="":(d=e.slice(o+1,r===-1?void 0:r),a&&(d=wt(d))),s?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(d)):n[c]??(n[c]=d)}return t?n[t]:n},ua=bs,pa=(e,t)=>bs(e,t,!0),gs=decodeURIComponent,Yt=e=>jt(e,gs),Ce,J,re,Es,ys,At,ce,os,vs=(os=class{constructor(e,t="/",s=[[]]){E(this,re);h(this,"raw");E(this,Ce);E(this,J);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});E(this,ce,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,f(this,J,s),f(this,Ce,{})}param(e){return e?x(this,re,Es).call(this,e):x(this,re,ys).call(this)}query(e){return ua(this.url,e)}queries(e){return pa(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){return ta(this,e)}json(){return u(this,ce).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,ce).call(this,"text")}arrayBuffer(){return u(this,ce).call(this,"arrayBuffer")}blob(){return u(this,ce).call(this,"blob")}formData(){return u(this,ce).call(this,"formData")}addValidatedData(e,t){u(this,Ce)[e]=t}valid(e){return u(this,Ce)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ea](){return u(this,J)}get matchedRoutes(){return u(this,J)[0].map(([[,e]])=>e)}get routePath(){return u(this,J)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ce=new WeakMap,J=new WeakMap,re=new WeakSet,Es=function(e){const t=u(this,J)[0][this.routeIndex][1][e],s=x(this,re,At).call(this,t);return s&&/\%/.test(s)?Yt(s):s},ys=function(){const e={},t=Object.keys(u(this,J)[0][this.routeIndex][1]);for(const s of t){const a=x(this,re,At).call(this,u(this,J)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?Yt(a):a)}return e},At=function(e){return u(this,J)[1]?u(this,J)[1][e]:e},ce=new WeakMap,os),_a={Stringify:1},xs=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(o=>o({phase:t,buffer:n,context:a}))).then(o=>Promise.all(o.filter(Boolean).map(c=>xs(c,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},ma="text/plain; charset=UTF-8",St=(e,t)=>({"Content-Type":e,...t}),Ye=(e,t)=>new Response(e,t),Xe,Ge,te,Be,se,$,ze,$e,Me,ye,Ze,Qe,de,Le,cs,ha=(cs=class{constructor(e,t){E(this,de);E(this,Xe);E(this,Ge);h(this,"env",{});E(this,te);h(this,"finalized",!1);h(this,"error");E(this,Be);E(this,se);E(this,$);E(this,ze);E(this,$e);E(this,Me);E(this,ye);E(this,Ze);E(this,Qe);h(this,"render",(...e)=>(u(this,$e)??f(this,$e,t=>this.html(t)),u(this,$e).call(this,...e)));h(this,"setLayout",e=>f(this,ze,e));h(this,"getLayout",()=>u(this,ze));h(this,"setRenderer",e=>{f(this,$e,e)});h(this,"header",(e,t,s)=>{this.finalized&&f(this,$,Ye(u(this,$).body,u(this,$)));const a=u(this,$)?u(this,$).headers:u(this,ye)??f(this,ye,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});h(this,"status",e=>{f(this,Be,e)});h(this,"set",(e,t)=>{u(this,te)??f(this,te,new Map),u(this,te).set(e,t)});h(this,"get",e=>u(this,te)?u(this,te).get(e):void 0);h(this,"newResponse",(...e)=>x(this,de,Le).call(this,...e));h(this,"body",(e,t,s)=>x(this,de,Le).call(this,e,t,s));h(this,"text",(e,t,s)=>!u(this,ye)&&!u(this,Be)&&!t&&!s&&!this.finalized?new Response(e):x(this,de,Le).call(this,e,t,St(ma,s)));h(this,"json",(e,t,s)=>x(this,de,Le).call(this,JSON.stringify(e),t,St("application/json",s)));h(this,"html",(e,t,s)=>{const a=n=>x(this,de,Le).call(this,n,t,St("text/html; charset=UTF-8",s));return typeof e=="object"?xs(e,_a.Stringify,!1,{}).then(a):a(e)});h(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});h(this,"notFound",()=>(u(this,Me)??f(this,Me,()=>Ye()),u(this,Me).call(this,this)));f(this,Xe,e),t&&(f(this,se,t.executionCtx),this.env=t.env,f(this,Me,t.notFoundHandler),f(this,Qe,t.path),f(this,Ze,t.matchResult))}get req(){return u(this,Ge)??f(this,Ge,new vs(u(this,Xe),u(this,Qe),u(this,Ze))),u(this,Ge)}get event(){if(u(this,se)&&"respondWith"in u(this,se))return u(this,se);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,se))return u(this,se);throw Error("This context has no ExecutionContext")}get res(){return u(this,$)||f(this,$,Ye(null,{headers:u(this,ye)??f(this,ye,new Headers)}))}set res(e){if(u(this,$)&&e){e=Ye(e.body,e);for(const[t,s]of u(this,$).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=u(this,$).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}f(this,$,e),this.finalized=!0}get var(){return u(this,te)?Object.fromEntries(u(this,te)):{}}},Xe=new WeakMap,Ge=new WeakMap,te=new WeakMap,Be=new WeakMap,se=new WeakMap,$=new WeakMap,ze=new WeakMap,$e=new WeakMap,Me=new WeakMap,ye=new WeakMap,Ze=new WeakMap,Qe=new WeakMap,de=new WeakSet,Le=function(e,t,s){const a=u(this,$)?new Headers(u(this,$).headers):u(this,ye)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,o]of i)r.toLowerCase()==="set-cookie"?a.append(r,o):a.set(r,o)}if(s)for(const[i,r]of Object.entries(s))if(typeof r=="string")a.set(i,r);else{a.delete(i);for(const o of r)a.append(i,o)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Be);return Ye(e,{status:n,headers:a})},cs),O="ALL",fa="all",ba=["get","post","put","delete","options","patch"],ws="Can not add a route since the matcher is already built.",Ss=class extends Error{},ga="__COMPOSED_HANDLER",va=e=>e.text("404 Not Found",404),Jt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},V,j,Ts,X,ve,rt,ot,qe,Ea=(qe=class{constructor(t={}){E(this,j);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");E(this,V,"/");h(this,"routes",[]);E(this,X,va);h(this,"errorHandler",Jt);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(f(this,X,t),this));h(this,"fetch",(t,...s)=>x(this,j,ot).call(this,t,s[1],s[0],t.method));h(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Ie("/",t)}`,s),a,n)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,j,ot).call(this,t.request,t,void 0,t.request.method))})});[...ba,fa].forEach(i=>{this[i]=(r,...o)=>(typeof r=="string"?f(this,V,r):x(this,j,ve).call(this,i,u(this,V),r),o.forEach(c=>{x(this,j,ve).call(this,i,u(this,V),c)}),this)}),this.on=(i,r,...o)=>{for(const c of[r].flat()){f(this,V,c);for(const d of[i].flat())o.map(l=>{x(this,j,ve).call(this,d.toUpperCase(),u(this,V),l)})}return this},this.use=(i,...r)=>(typeof i=="string"?f(this,V,i):(f(this,V,"*"),r.unshift(i)),r.forEach(o=>{x(this,j,ve).call(this,O,u(this,V),o)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??hs:la}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var r;let i;s.errorHandler===Jt?i=n.handler:(i=async(o,c)=>(await Wt([],s.errorHandler)(o,()=>n.handler(o,c))).res,i[ga]=n.handler),x(r=a,j,ve).call(r,n.method,n.path,i)}),this}basePath(t){const s=x(this,j,Ts).call(this);return s._basePath=Ie(this._basePath,t),s}mount(t,s,a){let n,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?n=c=>c:n=a.replaceRequest));const r=i?c=>{const d=i(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};n||(n=(()=>{const c=Ie(this._basePath,t),d=c==="/"?0:c.length;return l=>{const p=new URL(l.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,l)}})());const o=async(c,d)=>{const l=await s(n(c.req.raw),...r(c));if(l)return l;await d()};return x(this,j,ve).call(this,O,Ie(t,"*"),o),this}},V=new WeakMap,j=new WeakSet,Ts=function(){const t=new qe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,X,u(this,X)),t.routes=this.routes,t},X=new WeakMap,ve=function(t,s,a){t=t.toUpperCase(),s=Ie(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},rt=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},ot=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await x(this,j,ot).call(this,t,s,a,"GET")))();const i=this.getPath(t,{env:a}),r=this.router.match(n,i),o=new ha(t,{path:i,matchResult:r,env:a,executionCtx:s,notFoundHandler:u(this,X)});if(r[0].length===1){let d;try{d=r[0][0][0][0](o,async()=>{o.res=await u(this,X).call(this,o)})}catch(l){return x(this,j,rt).call(this,l,o)}return d instanceof Promise?d.then(l=>l||(o.finalized?o.res:u(this,X).call(this,o))).catch(l=>x(this,j,rt).call(this,l,o)):d??u(this,X).call(this,o)}const c=Wt(r[0],this.errorHandler,u(this,X));return(async()=>{try{const d=await c(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return x(this,j,rt).call(this,d,o)}})()},qe),ks=[];function ya(e,t){const s=this.buildAllMatchers(),a=((n,i)=>{const r=s[n]||s[O],o=r[2][i];if(o)return o;const c=i.match(r[0]);if(!c)return[[],ks];const d=c.indexOf("",1);return[r[1][d],c]});return this.match=a,a(e,t)}var lt="[^/]+",Ke=".*",Ve="(?:|/.*)",Ne=Symbol(),xa=new Set(".\\+*[^]$()");function wa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ke||e===Ve?1:t===Ke||t===Ve?-1:e===lt?1:t===lt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var xe,we,G,ke,Sa=(ke=class{constructor(){E(this,xe);E(this,we);E(this,G,Object.create(null))}insert(t,s,a,n,i){if(t.length===0){if(u(this,xe)!==void 0)throw Ne;if(i)return;f(this,xe,s);return}const[r,...o]=t,c=r==="*"?o.length===0?["","",Ke]:["","",lt]:r==="/*"?["","",Ve]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const l=c[1];let p=c[2]||lt;if(l&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Ne;if(d=u(this,G)[p],!d){if(Object.keys(u(this,G)).some(m=>m!==Ke&&m!==Ve))throw Ne;if(i)return;d=u(this,G)[p]=new ke,l!==""&&f(d,we,n.varIndex++)}!i&&l!==""&&a.push([l,u(d,we)])}else if(d=u(this,G)[r],!d){if(Object.keys(u(this,G)).some(l=>l.length>1&&l!==Ke&&l!==Ve))throw Ne;if(i)return;d=u(this,G)[r]=new ke}d.insert(o,s,a,n,i)}buildRegExpStr(){const s=Object.keys(u(this,G)).sort(wa).map(a=>{const n=u(this,G)[a];return(typeof u(n,we)=="number"?`(${a})@${u(n,we)}`:xa.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof u(this,xe)=="number"&&s.unshift(`#${u(this,xe)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},xe=new WeakMap,we=new WeakMap,G=new WeakMap,ke),ht,et,ds,Ta=(ds=class{constructor(){E(this,ht,{varIndex:0});E(this,et,new Sa)}insert(e,t,s){const a=[],n=[];for(let r=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const d=`@\\${r}`;return n[r]=[d,c],r++,o=!0,d}),!o)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[o]=n[r];for(let c=i.length-1;c>=0;c--)if(i[c].indexOf(o)!==-1){i[c]=i[c].replace(o,n[r][1]);break}}return u(this,et).insert(i,t,a,u(this,ht),s),a}buildRegExp(){let e=u(this,et).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,r)=>i!==void 0?(s[++t]=Number(i),"$()"):(r!==void 0&&(a[Number(r)]=++t),"")),[new RegExp(`^${e}`),s,a]}},ht=new WeakMap,et=new WeakMap,ds),ka=[/^$/,[],Object.create(null)],ct=Object.create(null);function As(e){return ct[e]??(ct[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Aa(){ct=Object.create(null)}function Da(e){var d;const t=new Ta,s=[];if(e.length===0)return ka;const a=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,p],[m,b])=>l?1:m?-1:p.length-b.length),n=Object.create(null);for(let l=0,p=-1,m=a.length;l<m;l++){const[b,v,k]=a[l];b?n[v]=[k.map(([A])=>[A,Object.create(null)]),ks]:p++;let y;try{y=t.insert(v,p,b)}catch(A){throw A===Ne?new Ss(v):A}b||(s[p]=k.map(([A,S])=>{const C=Object.create(null);for(S-=1;S>=0;S--){const[F,B]=y[S];C[F]=B}return[A,C]}))}const[i,r,o]=t.buildRegExp();for(let l=0,p=s.length;l<p;l++)for(let m=0,b=s[l].length;m<b;m++){const v=(d=s[l][m])==null?void 0:d[1];if(!v)continue;const k=Object.keys(v);for(let y=0,A=k.length;y<A;y++)v[k[y]]=o[v[k[y]]]}const c=[];for(const l in r)c[l]=s[r[l]];return[i,c,n]}function je(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(As(s).test(t))return[...e[s]]}}var le,ue,ft,Ds,ls,Ra=(ls=class{constructor(){E(this,ft);h(this,"name","RegExpRouter");E(this,le);E(this,ue);h(this,"match",ya);f(this,le,{[O]:Object.create(null)}),f(this,ue,{[O]:Object.create(null)})}add(e,t,s){var o;const a=u(this,le),n=u(this,ue);if(!a||!n)throw new Error(ws);a[e]||[a,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[O]).forEach(d=>{c[e][d]=[...c[O][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=As(t);e===O?Object.keys(a).forEach(d=>{var l;(l=a[d])[t]||(l[t]=je(a[d],t)||je(a[O],t)||[])}):(o=a[e])[t]||(o[t]=je(a[e],t)||je(a[O],t)||[]),Object.keys(a).forEach(d=>{(e===O||e===d)&&Object.keys(a[d]).forEach(l=>{c.test(l)&&a[d][l].push([s,i])})}),Object.keys(n).forEach(d=>{(e===O||e===d)&&Object.keys(n[d]).forEach(l=>c.test(l)&&n[d][l].push([s,i]))});return}const r=fs(t)||[t];for(let c=0,d=r.length;c<d;c++){const l=r[c];Object.keys(n).forEach(p=>{var m;(e===O||e===p)&&((m=n[p])[l]||(m[l]=[...je(a[p],l)||je(a[O],l)||[]]),n[p][l].push([s,i-d+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,ue)).concat(Object.keys(u(this,le))).forEach(t=>{e[t]||(e[t]=x(this,ft,Ds).call(this,t))}),f(this,le,f(this,ue,void 0)),Aa(),e}},le=new WeakMap,ue=new WeakMap,ft=new WeakSet,Ds=function(e){const t=[];let s=e===O;return[u(this,le),u(this,ue)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(i=>[i,a[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==O&&t.push(...Object.keys(a[O]).map(i=>[i,a[O][i]]))}),s?Da(t):null},ls),pe,ae,us,Oa=(us=class{constructor(e){h(this,"name","SmartRouter");E(this,pe,[]);E(this,ae,[]);f(this,pe,e.routers)}add(e,t,s){if(!u(this,ae))throw new Error(ws);u(this,ae).push([e,t,s])}match(e,t){if(!u(this,ae))throw new Error("Fatal error");const s=u(this,pe),a=u(this,ae),n=s.length;let i=0,r;for(;i<n;i++){const o=s[i];try{for(let c=0,d=a.length;c<d;c++)o.add(...a[c]);r=o.match(e,t)}catch(c){if(c instanceof Ss)continue;throw c}this.match=o.match.bind(o),f(this,pe,[o]),f(this,ae,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(u(this,ae)||u(this,pe).length!==1)throw new Error("No active router has been determined yet.");return u(this,pe)[0]}},pe=new WeakMap,ae=new WeakMap,us),Je=Object.create(null),ja=e=>{for(const t in e)return!0;return!1},_e,L,Se,Pe,I,ne,Ee,Fe,Ia=(Fe=class{constructor(t,s,a){E(this,ne);E(this,_e);E(this,L);E(this,Se);E(this,Pe,0);E(this,I,Je);if(f(this,L,a||Object.create(null)),f(this,_e,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},f(this,_e,[n])}f(this,Se,[])}insert(t,s,a){f(this,Pe,++Ut(this,Pe)._);let n=this;const i=ra(s),r=[];for(let o=0,c=i.length;o<c;o++){const d=i[o],l=i[o+1],p=da(d,l),m=Array.isArray(p)?p[0]:d;if(m in u(n,L)){n=u(n,L)[m],p&&r.push(p[1]);continue}u(n,L)[m]=new Fe,p&&(u(n,Se).push(p),r.push(p[1])),n=u(n,L)[m]}return u(n,_e).push({[t]:{handler:a,possibleKeys:r.filter((o,c,d)=>d.indexOf(o)===c),score:u(this,Pe)}}),n}search(t,s){var l;const a=[];f(this,I,Je);let i=[this];const r=_s(s),o=[],c=r.length;let d=null;for(let p=0;p<c;p++){const m=r[p],b=p===c-1,v=[];for(let y=0,A=i.length;y<A;y++){const S=i[y],C=u(S,L)[m];C&&(f(C,I,u(S,I)),b?(u(C,L)["*"]&&x(this,ne,Ee).call(this,a,u(C,L)["*"],t,u(S,I)),x(this,ne,Ee).call(this,a,C,t,u(S,I))):v.push(C));for(let F=0,B=u(S,Se).length;F<B;F++){const nt=u(S,Se)[F],Q=u(S,I)===Je?{}:{...u(S,I)};if(nt==="*"){const Re=u(S,L)["*"];Re&&(x(this,ne,Ee).call(this,a,Re,t,u(S,I)),f(Re,I,Q),v.push(Re));continue}const[zs,Ft,Ue]=nt;if(!m&&!(Ue instanceof RegExp))continue;const ee=u(S,L)[zs];if(Ue instanceof RegExp){if(d===null){d=new Array(c);let Oe=s[0]==="/"?1:0;for(let We=0;We<c;We++)d[We]=Oe,Oe+=r[We].length+1}const Re=s.substring(d[p]),yt=Ue.exec(Re);if(yt){if(Q[Ft]=yt[0],x(this,ne,Ee).call(this,a,ee,t,u(S,I),Q),ja(u(ee,L))){f(ee,I,Q);const Oe=((l=yt[0].match(/\//))==null?void 0:l.length)??0;(o[Oe]||(o[Oe]=[])).push(ee)}continue}}(Ue===!0||Ue.test(m))&&(Q[Ft]=m,b?(x(this,ne,Ee).call(this,a,ee,t,Q,u(S,I)),u(ee,L)["*"]&&x(this,ne,Ee).call(this,a,u(ee,L)["*"],t,Q,u(S,I))):(f(ee,I,Q),v.push(ee)))}}const k=o.shift();i=k?v.concat(k):v}return a.length>1&&a.sort((p,m)=>p.score-m.score),[a.map(({handler:p,params:m})=>[p,m])]}},_e=new WeakMap,L=new WeakMap,Se=new WeakMap,Pe=new WeakMap,I=new WeakMap,ne=new WeakSet,Ee=function(t,s,a,n,i){for(let r=0,o=u(s,_e).length;r<o;r++){const c=u(s,_e)[r],d=c[a]||c[O],l={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),n!==Je||i&&i!==Je))for(let p=0,m=d.possibleKeys.length;p<m;p++){const b=d.possibleKeys[p],v=l[d.score];d.params[b]=i!=null&&i[b]&&!v?i[b]:n[b]??(i==null?void 0:i[b]),l[d.score]=!0}}},Fe),Te,ps,La=(ps=class{constructor(){h(this,"name","TrieRouter");E(this,Te);f(this,Te,new Ia)}add(e,t,s){const a=fs(t);if(a){for(let n=0,i=a.length;n<i;n++)u(this,Te).insert(e,a[n],s);return}u(this,Te).insert(e,t,s)}match(e,t){return u(this,Te).search(e,t)}},Te=new WeakMap,ps),D=class extends Ea{constructor(e={}){super(e),this.router=e.router??new Oa({routers:[new Ra,new La]})}},Na=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Kt=(e,t=Ba)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1].toLowerCase()];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},Ca={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ba=Ca,$a=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},Rs={br:".br",zstd:".zst",gzip:".gz"},Ma=Object.keys(Rs),qa="index.html",Pa=e=>{const t=e.root??"./",s=e.path,a=e.join??$a;return async(n,i)=>{var l,p,m,b;if(n.finalized)return i();let r;if(e.path)r=e.path;else try{if(r=ms(n.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r))throw new Error}catch{return await((l=e.onNotFound)==null?void 0:l.call(e,n.req.path,n)),i()}let o=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(o)&&(o=a(o,qa));const c=e.getContent;let d=await c(o,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const v=e.mimes&&Kt(o,e.mimes)||Kt(o);if(n.header("Content-Type",v||"application/octet-stream"),e.precompressed&&(!v||Na.test(v))){const k=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(y=>y.trim()));for(const y of Ma){if(!k.has(y))continue;const A=await c(o+Rs[y],n);if(A){d=A,n.header("Content-Encoding",y),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,o,n)),n.body(d)}await((b=e.onNotFound)==null?void 0:b.call(e,o,n)),await i()}},Fa=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e];if(!n)return null;const i=await a.get(n,{type:"stream"});return i||null},Ha=e=>async function(s,a){return Pa({...e,getContent:async i=>Fa(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Ua=e=>Ha(e);const z={name:"Growth-engine365X",version:"ver1.00",tagline:"X (Twitter) 自動投稿プラットフォーム",longName:"X (Twitter) 自動投稿プラットフォーム",icon:"fa-bolt"},Wa=`
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdn.tailwindcss.com"><\/script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          sidebar:  { DEFAULT:'#1E2A3B', hover:'#2A3B52', active:'#2F4A7A' },
          accent:   { DEFAULT:'#2563EB', hover:'#1D4ED8', light:'#EFF6FF' },
          paper:    { DEFAULT:'#F7F8FB', card:'#FFFFFF', soft:'#F1F3F7' },
          ink:      { DEFAULT:'#1F2937', muted:'#6B7280', faint:'#9CA3AF' },
          line:     { DEFAULT:'#E5E7EB', soft:'#F1F3F7' },
        },
        fontFamily: {
          sans: ['"Noto Sans JP"', 'Inter', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
      },
    },
  }
<\/script>
<link rel="stylesheet" href="/static/style.css">
`,Ya="bg-paper text-ink min-h-screen font-sans antialiased";function It(e,t,s={}){return`<!DOCTYPE html>
<html lang="ja">
<head>
${Wa}
<title>${e} — ${z.name}</title>
</head>
<body class="${s.bodyClass??Ya}">
${t}
</body>
</html>`}const Os=new D;Os.get("/login",e=>{const t=`
<main class="min-h-screen flex items-center justify-center px-4 py-12 bg-paper">
  <div class="w-full max-w-md">
    <!-- ブランドロゴ -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 mb-3">
        <div class="w-11 h-11 rounded-xl bg-sidebar flex items-center justify-center">
          <i class="fas ${z.icon} text-white text-xl"></i>
        </div>
        <div class="text-left">
          <div class="text-xl font-bold text-ink tracking-tight">${z.name}</div>
          <div class="text-xs text-ink-muted">${z.tagline}</div>
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
      © ${new Date().getFullYear()} ${z.name}
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
`;return e.html(It("ログイン",t))});const ie=new TextEncoder,js=new TextDecoder;function ut(e){let t="";for(let s=0;s<e.length;s++)t+=String.fromCharCode(e[s]);return btoa(t)}function pt(e){const t=atob(e),s=new Uint8Array(t.length);for(let a=0;a<t.length;a++)s[a]=t.charCodeAt(a);return s}function Tt(e){return ut(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Vt(e){const t="=".repeat((4-e.length%4)%4);return pt((e+t).replace(/-/g,"+").replace(/_/g,"/"))}function Lt(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),t}const Xt=1e5,Ja=32;async function Is(e){const t=Lt(16),s=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),a=await crypto.subtle.deriveBits({name:"PBKDF2",salt:t,iterations:Xt,hash:"SHA-256"},s,Ja*8);return`pbkdf2$${Xt}$${ut(t)}$${ut(new Uint8Array(a))}`}async function Ls(e,t){try{const[s,a,n,i]=t.split("$");if(s!=="pbkdf2")return!1;const r=parseInt(a,10),o=pt(n),c=pt(i),d=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),l=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:o,iterations:r,hash:"SHA-256"},d,c.length*8));return Ka(l,c)}catch{return!1}}function Ka(e,t){if(e.length!==t.length)return!1;let s=0;for(let a=0;a<e.length;a++)s|=e[a]^t[a];return s===0}async function Ns(e){return crypto.subtle.importKey("raw",ie.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign","verify"])}async function Va(e,t,s=3600*24*7){const a=Math.floor(Date.now()/1e3),n={iat:a,exp:a+s,...e},i=Tt(ie.encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),r=Tt(ie.encode(JSON.stringify(n))),o=`${i}.${r}`,c=await Ns(t),d=new Uint8Array(await crypto.subtle.sign("HMAC",c,ie.encode(o)));return`${o}.${Tt(d)}`}async function Xa(e,t){try{const[s,a,n]=e.split(".");if(!s||!a||!n)return null;const i=await Ns(t);if(!await crypto.subtle.verify("HMAC",i,Vt(n),ie.encode(`${s}.${a}`)))return null;const o=JSON.parse(js.decode(Vt(a)));return o.exp&&o.exp<Math.floor(Date.now()/1e3)?null:o}catch{return null}}async function Cs(e){const t=ie.encode(e),s=t.length>=32?t.slice(0,32):new Uint8Array(await crypto.subtle.digest("SHA-256",t));return crypto.subtle.importKey("raw",s,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function me(e,t){const s=Lt(12),a=await Cs(t),n=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:s},a,ie.encode(e))),i=new Uint8Array(s.length+n.length);return i.set(s),i.set(n,s.length),ut(i)}async function Dt(e,t){const s=pt(e),a=s.slice(0,12),n=s.slice(12),i=await Cs(t),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:a},i,n);return js.decode(r)}const Gt="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function zt(e="VPS-GE365X"){const t=Lt(8);let s="";for(let a=0;a<8;a++)s+=Gt[t[a]%Gt.length];return`${e}-${s}`}function Ga(e){return/^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(e.trim())}function g(){return new Date(Date.now()+324e5).toISOString().replace("T"," ").slice(0,19)}function za(e,t){const a=(e.headers.get("cookie")||"").split(";").map(n=>n.trim()).find(n=>n.startsWith(t+"="));return a?decodeURIComponent(a.slice(t.length+1)):null}function Bs(e,t,s={}){const a=[`${e}=${encodeURIComponent(t)}`];return a.push(`Path=${s.path??"/"}`),s.maxAge!==void 0&&a.push(`Max-Age=${s.maxAge}`),s.httpOnly!==!1&&a.push("HttpOnly"),s.secure!==!1&&a.push("Secure"),a.push(`SameSite=${s.sameSite??"Lax"}`),a.join("; ")}const Nt="ge365x_session";function Za(e){const t=e.req.header("Authorization")||e.req.header("authorization");return t&&t.startsWith("Bearer ")?t.slice(7):za(e.req.raw,Nt)}async function _(e,t){const s=Za(e);if(!s)return e.json({error:"unauthenticated"},401);const a=await Xa(s,e.env.JWT_SECRET);if(!(a!=null&&a.uid))return e.json({error:"invalid_token"},401);const n=await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(a.uid).first();if(!n)return e.json({error:"user_not_found"},401);if(n.is_approved===0)return e.json({error:"not_approved"},403);const i=await e.env.DB.prepare("SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first(),r={id:n.id,email:n.email,is_admin:n.is_admin===1,is_approved:n.is_approved===1,plan_code:i==null?void 0:i.plan_code,subscription_status:i==null?void 0:i.status};e.set("user",r),await t()}async function R(e,t){const s=e.get("user");if(!s)return e.json({error:"unauthenticated"},401);if(!s.is_admin)return e.json({error:"forbidden"},403);await t()}async function Z(e,t,s={}){const a=e.req.header("cf-connecting-ip")||e.req.header("x-forwarded-for")||"",n=e.req.header("user-agent")||"";await e.env.DB.prepare(`INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(s.userId??null,s.email??null,t,a,n,s.metadata?JSON.stringify(s.metadata):null).run()}const Qa=[{key:"dashboard",label:"ダッシュボード",icon:"fa-gauge-high",path:"/dashboard"},{key:"target",label:"ターゲット設定",icon:"fa-bullseye",path:"/dashboard/target"},{key:"voice",label:"ブランドボイス",icon:"fa-palette",path:"/dashboard/voice"},{key:"pattern",label:"パターン別AI生成",icon:"fa-wand-magic-sparkles",path:"/dashboard/pattern"},{key:"generate",label:"AI生成2",icon:"fa-robot",path:"/dashboard/generate"},{key:"posts",label:"X投稿管理",icon:"fa-brands fa-x-twitter",path:"/dashboard/posts"},{key:"thread",label:"ツリー投稿",icon:"fa-reply",path:"/dashboard/thread"},{key:"scheduled",label:"予約状況",icon:"fa-calendar",path:"/dashboard/scheduled"},{key:"autopilot",label:"オートパイロット",icon:"fa-plane-departure",path:"/dashboard/autopilot"},{key:"accounts",label:"アカウント管理",icon:"fa-users-gear",path:"/dashboard/accounts"},{key:"api",label:"API設定",icon:"fa-key",path:"/dashboard/api"},{key:"export",label:"一括ダウンロード",icon:"fa-download",path:"/dashboard/export"}];function en(e,t){return`
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${z.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${z.name}</div>
        <div class="text-[10px] text-[#A7B6CE]">${z.version}</div>
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
      if (el) el.textContent = 'JST ' + new Date().toLocaleString('ja-JP');
    }
    updateClock();
    setInterval(updateClock, 30000);
  })();
<\/script>`}const sn=`
<button class="fab" onclick="toast && toast('Chatbot は次フェーズで実装','info')" title="AIチャットボット">
  <i class="fas fa-comment-dots text-xl"></i>
</button>
<div id="toast-host"></div>
<script>
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
`;function an(e){return`
<div class="min-h-screen flex bg-paper">
  ${en(e.active,e.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${tn(e.accounts,e.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${e.pageBody}
    </div>
  </main>

  ${sn}
</div>`}const he=`
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>アカウントが選択されていません。<a href="/dashboard/accounts" class="underline font-semibold">アカウント管理</a>で登録してください。</div>
</div>
`;function w(e){return(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Ct(e){return{pending:'<span class="pill pill-warn">未承認</span>',approved:'<span class="pill pill-blue">承認済</span>',publishing:'<span class="pill pill-blue">送信中</span>',posted:'<span class="pill pill-ok">投稿済</span>',failed:'<span class="pill pill-err">失敗</span>',cancelled:'<span class="pill pill-soft">キャンセル</span>'}[e||""]||`<span class="pill pill-soft">${e||"—"}</span>`}function nn(e){const{stats:t,health:s,recentLogs:a}=e;return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-gauge-high"></i>ダッシュボード</h1>
    <p class="section-desc">今日の投稿状況とアカウント健全性を一覧できます。</p>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="card card-sm"><div class="text-xs text-ink-muted">Xアカウント</div><div class="text-2xl font-bold text-ink mt-1">${t.accounts}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日の投稿</div><div class="text-2xl font-bold text-ink mt-1">${t.today}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">予約中</div><div class="text-2xl font-bold text-ink mt-1">${t.pending}</div></div>
    <div class="card card-sm"><div class="text-xs text-ink-muted">本日失敗</div><div class="text-2xl font-bold text-red-600 mt-1">${t.failed}</div></div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-heart-pulse text-red-500"></i> アカウント健全性</h3>
      ${s.length===0?`
        <div class="text-ink-muted text-sm text-center py-6">アカウント未登録</div>
      `:s.map(n=>`
        <div class="flex items-center justify-between py-2 border-b border-line/50 last:border-0">
          <div>
            <div class="text-sm font-semibold text-ink">@${w(n.x_username||n.account_name)}</div>
            <div class="text-xs text-ink-muted">${n.is_active?"稼働中":"停止中"}</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-xl font-bold ${n.account_health_score>=80?"text-emerald-600":n.account_health_score>=60?"text-amber-600":"text-red-600"}">${n.account_health_score??100}</div>
            <span class="pill ${n.health_status==="risk"?"pill-err":n.health_status==="caution"?"pill-warn":"pill-ok"}">${n.health_status||"healthy"}</span>
          </div>
        </div>
      `).join("")}
    </div>
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
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-ink">ターゲットテンプレート</h3>
      <button class="example-btn" onclick="fillTargetExample()"><i class="fas fa-pencil"></i>使用例</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
      <div>
        <label class="field-label"><i class="fas fa-briefcase icon-yellow"></i>職業</label>
        <input type="text" id="tg-occ" class="inp" value="${w(t.occupation)}" placeholder="例: 会社員 / フリーランス">
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>痛み・悩み</label>
      <textarea id="tg-pains" class="inp" placeholder="読者が抱えている具体的な悩み・痛みを書く">${w(t.pains)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>欲求・願望</label>
      <textarea id="tg-desires" class="inp" placeholder="読者が「こうなりたい」と思っている理想像">${w(t.desires)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>行動トリガー（反応するきっかけ）</label>
      <textarea id="tg-trigger" class="inp" placeholder="この読者がアクションを起こす瞬間・キーワード">${w(t.purchase_triggers)}</textarea>
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
<\/script>`}function on(e){const t=e.voice||{},s=[{k:"authority",l:"権威型",t:"専門家として断定的に、簡潔に、根拠を示して書く。"},{k:"empathy",l:"共感型",t:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{k:"provocative",l:"煽り型",t:"問題を鋭く突き、危機感を持たせる書き方にする。"},{k:"story",l:"ストーリー型",t:"体験談や変化の流れを感じさせる構成で書く。"},{k:"problem_raise",l:"問題提起型",t:"最初に課題を提示し、その原因と解決策を示す。"}];return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>ブランドボイス</h1>
    <p class="section-desc">あなたの発信スタイル・口調・世界観を定義します。AI生成時にトーンとして注入されます。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h3 class="font-bold text-ink">ボイスプロファイル</h3>
      <div class="flex gap-1 flex-wrap">
        ${s.map(a=>`<button class="example-btn" onclick="loadVoicePreset('${a.k}','${a.t.replace(/'/g,"\\'")}')">${a.l}</button>`).join("")}
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-microphone icon-blue"></i>口調</label>
      <input type="text" id="vc-tone" class="inp" value="${w(t.tone)}" placeholder="例: 専門家として断定的に、簡潔に、根拠を示して書く">
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-globe icon-green"></i>世界観</label>
      <textarea id="vc-world" class="inp" placeholder="あなたが見ている世界、伝えたい価値観">${w(t.worldview)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-book icon-purple"></i>個人ストーリー（任意）</label>
      <textarea id="vc-story" class="inp" placeholder="過去の体験や転機。AI が自然に織り交ぜます">${w(t.personal_story)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-ban icon-red"></i>禁止ワード（改行区切り）</label>
      <textarea id="vc-ng" class="inp" placeholder="絶対に使わないワード">${w(t.prohibited_words)}</textarea>
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
<\/script>`}function cn(e){var s,a,n;const t=[["problem","問題提起型","fa-circle-question"],["before_after","ビフォーアフター型","fa-right-left"],["contrarian","逆張り型","fa-rotate-left"],["howto","HowTo実演型","fa-list-ol"],["numbers","数字インパクト型","fa-hashtag"]];return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-wand-magic-sparkles"></i>パターン別AI生成</h1>
    <p class="section-desc">5種類の投稿パターンから選んで、テーマに沿った投稿案を複数生成します。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="card lg:col-span-2 space-y-4">
      <div>
        <label class="field-label"><i class="fas fa-shapes icon-purple"></i>投稿パターン</label>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          ${t.map(([i,r,o])=>`
            <label class="flex flex-col items-center gap-1 p-3 border border-line rounded-lg cursor-pointer hover:bg-paper-soft has-[:checked]:border-accent has-[:checked]:bg-accent-light has-[:checked]:text-accent transition-all">
              <input type="radio" name="patt" value="${i}" class="sr-only" ${i==="problem"?"checked":""}>
              <i class="fas ${o} text-lg"></i>
              <span class="text-xs font-semibold text-center">${r}</span>
            </label>
          `).join("")}
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
          <div class="text-ink">${w(((s=e.target)==null?void 0:s.age_range)||"未設定")} / ${w(((a=e.target)==null?void 0:a.gender)||"-")}</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">ブランドボイス</div>
          <div class="text-ink text-xs">${w((((n=e.voice)==null?void 0:n.tone)||"未設定").slice(0,50))}...</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">投稿先アカウント</div>
          <div class="text-ink">${e.currentAcct?"@"+w(e.currentAcct.x_username||e.currentAcct.account_name):"未選択"}</div>
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
<\/script>`}function dn(e){return`
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
<\/script>`}function ln(e){const{month:t,y:s,m:a,posts:n,stats:i}=e;return`
<div class="space-y-4">
  ${e.hasAccount?"":e.noAccountAlert}
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
              <td class="max-w-md"><div class="truncate">${w((r.body||"").slice(0,80))}</div></td>
              <td>${r.post_mode==="140"?"140文字":r.post_mode==="thread"?"スレッド":"フル文章"}</td>
              <td>${Ct(r.status)}</td>
              <td class="text-xs">@${w(r.x_username||"-")}</td>
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
<script>
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
<\/script>`}function un(e){return`
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
      ${pn(1)}
    </div>
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <button class="btn btn-ghost" onclick="addReply()"><i class="fas fa-plus"></i>返信追加</button>
      <button class="btn" style="background:#10B981;color:#fff;border-color:#10B981" onclick="submitNow()"><i class="fas fa-paper-plane"></i>今すぐ投稿</button>
      <button class="btn btn-primary" onclick="submitSchedule()"><i class="fas fa-calendar"></i>予約投稿</button>
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
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${t.thread_parent_id||"-"}</span> ${Ct(t.status)}</div>
        <div class="text-sm whitespace-pre-line">${w((t.body||"").slice(0,200))}</div>
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
<\/script>`}function pn(e){return`
    <div class="reply-item">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">返信 ${e}</label>
      </div>
      <textarea class="inp th-reply" placeholder="返信${e}の本文を入力" maxlength="280"></textarea>
    </div>`}function _n(e){return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-calendar"></i>予約状況</h1>
    <p class="section-desc">予約済みの投稿・オートパイロットジョブを一覧できます。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card" style="padding:0">
    <table class="data">
      <thead><tr><th>予約日時</th><th>アカウント</th><th>本文</th><th>状態</th></tr></thead>
      <tbody>
        ${e.scheduled.length===0?'<tr><td colspan="4" class="text-center text-ink-muted py-10">予約なし</td></tr>':e.scheduled.map(t=>`
            <tr>
              <td class="text-xs font-mono">${t.scheduled_at||"-"}</td>
              <td class="text-xs">@${w(t.x_username||"-")}</td>
              <td class="text-xs max-w-md"><div class="truncate">${w((t.body||"").slice(0,80))}</div></td>
              <td>${Ct(t.status)}</td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  </div>
</div>`}function mn(e){return`
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
        ${e.jobs.length===0?'<tr><td colspan="8" class="text-center text-ink-muted py-10">予約がまだありません</td></tr>':e.jobs.map((t,s)=>`
            <tr>
              <td class="text-xs text-ink-faint">${t.reservation_no||String(s+1).padStart(4,"0")}</td>
              <td class="text-xs">${t.generate_at||"—"}</td>
              <td class="text-xs">${t.publish_at||"—"}</td>
              <td class="text-xs">@${w(t.x_username||"-")}</td>
              <td><span class="pill pill-soft">${w(t.content_mode||"-")}</span></td>
              <td class="text-xs max-w-xs truncate">${w(t.theme||"—")}</td>
              <td><span class="pill ${t.status==="error"?"pill-err":t.status==="posted"?"pill-ok":"pill-blue"}">${w(t.status)}</span></td>
              <td class="text-right">
                <button class="btn btn-danger btn-sm" onclick="delApJob(${t.id})"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `).join("")}
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
            ${e.accounts.map(t=>`<option value="${t.id}">@${w(t.x_username||t.account_name)}</option>`).join("")}
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
<\/script>`}function hn(e){return`
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
              <td class="font-semibold">${w(t.account_name)}</td>
              <td class="text-accent">@${w(t.x_username||"未認証")}</td>
              <td><span class="font-bold ${t.account_health_score>=80?"text-emerald-600":t.account_health_score>=60?"text-amber-600":"text-red-600"}">${t.account_health_score??100}</span> <span class="pill ${t.health_status==="risk"?"pill-err":t.health_status==="caution"?"pill-warn":"pill-ok"} ml-1">${t.health_status||"healthy"}</span></td>
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
<\/script>`}function fn(e){const t=[{key:"posts",label:"投稿キュー",desc:"全投稿データ（予約・投稿済・失敗含む）",icon:"fa-brands fa-x-twitter",color:"text-blue-600"},{key:"logs",label:"投稿ログ",desc:"投稿実行の全履歴（成功・失敗）",icon:"fa-clipboard-list",color:"text-emerald-600"},{key:"generations",label:"AI生成ログ",desc:"AI生成されたテキストの記録",icon:"fa-robot",color:"text-purple-600"},{key:"autopilot",label:"オートパイロット",desc:"予約ジョブの一覧",icon:"fa-plane-departure",color:"text-amber-600"},{key:"drafts",label:"下書き",desc:"保存済みの下書きデータ",icon:"fa-file-pen",color:"text-sky-600"},{key:"kpi",label:"KPI",desc:"日別投稿数・失敗数の統計",icon:"fa-chart-line",color:"text-rose-600"},{key:"accounts",label:"Xアカウント",desc:"アカウント情報（トークン除外）",icon:"fa-users-gear",color:"text-indigo-600"},{key:"targets",label:"ターゲット設定",desc:"ターゲットテンプレート",icon:"fa-bullseye",color:"text-orange-600"},{key:"voices",label:"ブランドボイス",desc:"ボイスプロファイル",icon:"fa-palette",color:"text-pink-600"}],s=[{key:"admin/users",label:"ユーザー一覧",desc:"全ユーザー（プラン・承認状態含む）",icon:"fa-users",color:"text-blue-600"},{key:"admin/licenses",label:"ライセンス",desc:"ライセンスキーの全データ",icon:"fa-key",color:"text-amber-600"},{key:"admin/subs",label:"サブスクリプション",desc:"全契約情報",icon:"fa-credit-card",color:"text-emerald-600"},{key:"admin/audit",label:"監査ログ",desc:"認証・操作ログ",icon:"fa-shield-halved",color:"text-red-600"}];return`
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
      <input type="text" id="api-xk" class="inp input-mono" value="${w(t.api_key||"")}">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>Consumer Secret (API Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" value="${w(t.api_secret||"")}">
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
<\/script>`}const H=new D;async function gn(e,t){const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`).bind(t.id).all(),a=(s||[]).map(i=>({id:i.id,account_name:i.account_name,x_username:i.x_username})),n=(s||[]).find(i=>i.is_current===1);return{accounts:a,currentAccountId:(n==null?void 0:n.id)??null}}H.get("/",e=>e.redirect("/login"));async function K(e,t,s){const a=e.get("user"),{accounts:n,currentAccountId:i}=await gn(e,a),r=n.length>0&&i!==null,o=await Promise.resolve(s({user:a,hasAccount:r,accounts:n,currentAccountId:i})),c=an({active:t,user:a,accounts:n,currentAccountId:i,pageBody:o});return e.html(It("GE365x",c))}H.get("/dashboard",_,async e=>K(e,"dashboard",async({user:t,hasAccount:s})=>{const a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?").bind(t.id).first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'").bind(t.id).first(),i=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved')").bind(t.id).first(),r=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')").bind(t.id).first(),{results:o}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id`).bind(t.id).all(),{results:c}=await e.env.DB.prepare(`SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`).bind(t.id).all();return nn({stats:{accounts:(a==null?void 0:a.n)??0,today:(n==null?void 0:n.n)??0,pending:(i==null?void 0:i.n)??0,failed:(r==null?void 0:r.n)??0},health:o||[],recentLogs:c||[]})}));H.get("/dashboard/target",_,async e=>K(e,"target",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return rn({target:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/voice",_,async e=>K(e,"voice",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return on({voice:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/pattern",_,async e=>K(e,"pattern",async({user:t,hasAccount:s,currentAccountId:a,accounts:n})=>{const i=String(a??"default"),r=await e.env.DB.prepare("SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),o=await e.env.DB.prepare("SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),c=n.find(d=>d.id===a);return cn({hasAccount:s,noAccountAlert:he,target:r,voice:o,currentAcct:c})}));H.get("/dashboard/generate",_,async e=>K(e,"generate",({hasAccount:t})=>dn({hasAccount:t,noAccountAlert:he})));H.get("/dashboard/posts",_,async e=>K(e,"posts",async({user:t,hasAccount:s})=>{const n=e.req.query("month")||new Date().toISOString().slice(0,7),[i,r]=n.split("-"),{results:o}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`).bind(t.id,n).all(),c=(o||[]).length,d=(o||[]).filter(m=>m.status==="pending"||m.status==="approved").length,l=(o||[]).filter(m=>m.status==="posted").length,p=(o||[]).filter(m=>m.status==="failed").length;return ln({hasAccount:s,noAccountAlert:he,month:n,y:i,m:parseInt(r,10),posts:o||[],stats:{total:c,pending:d,posted:l,failed:p}})}));H.get("/dashboard/thread",_,async e=>K(e,"thread",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`).bind(t.id).all();return un({hasAccount:s,noAccountAlert:he,history:a||[]})}));H.get("/dashboard/scheduled",_,async e=>K(e,"scheduled",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`).bind(t.id).all();return _n({hasAccount:s,noAccountAlert:he,scheduled:a||[]})}));H.get("/dashboard/autopilot",_,async e=>K(e,"autopilot",async({user:t,hasAccount:s,accounts:a})=>{const{results:n}=await e.env.DB.prepare(`SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`).bind(t.id).all();return mn({hasAccount:s,noAccountAlert:he,accounts:a,jobs:n||[]})}));H.get("/dashboard/accounts",_,async e=>K(e,"accounts",async({user:t})=>{const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return hn({accounts:s||[]})}));H.get("/dashboard/api",_,async e=>K(e,"api",async({user:t})=>{const s=await e.env.DB.prepare("SELECT * FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first();return bn({settings:s})}));H.get("/dashboard/export",_,async e=>K(e,"export",({user:t})=>fn({isAdmin:t.is_admin})));const q=new D;q.get("/admin",_,R,e=>{const t=`
<div class="min-h-screen flex flex-col">
  <!-- ヘッダ -->
  <header class="border-b border-brand-800/40 bg-surface-raised/80 backdrop-blur">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="brand-logo w-10 h-10 rounded-xl flex items-center justify-center">
          <i class="fas ${z.icon} text-white"></i>
        </div>
        <div>
          <div class="text-white font-bold tracking-tight">${z.name} <span class="text-brand-400 text-xs font-normal">管理</span></div>
          <div class="text-brand-400 text-xs">${z.longName}</div>
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
      <td class="text-xs">\${p.x_username || '-'}</td>
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
      <td>@\${a.x_username || '-'}</td>
      <td>\${a.is_active ? '<span class="pill pill-active">有効</span>' : '<span class="pill pill-inactive">停止</span>'}</td>
      <td class="text-xs text-brand-300">\${a.last_posted_at || '-'}</td>
      <td class="text-xs text-brand-300">\${a.account_health_score || '-'}</td>
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
  const form = document.getElementById('settings-form');
  form.innerHTML = (j.settings || []).map(s => \`
    <div class="flex items-center gap-3">
      <div class="flex-1">
        <div class="text-white font-medium">\${s.key}</div>
        <div class="text-xs text-brand-400">\${s.description || ''}</div>
      </div>
      <input type="text" id="setting-\${s.key}" class="input-field w-64" value="\${s.value || ''}">
      <button onclick="saveSetting('\${s.key}')" class="btn-primary"><i class="fas fa-save"></i></button>
    </div>
  \`).join('');
}
async function saveSetting(key) {
  const value = document.getElementById('setting-' + key).value;
  await fetch('/api/admin/settings', {
    method: 'POST', headers: {'content-type':'application/json'},
    body: JSON.stringify({ key, value }),
  });
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
`;return e.html(It("管理画面",t))});q.get("/api/admin/users",_,R,async e=>{const t=e.req.query("filter")||"all",s=[];t==="pending"&&s.push("u.is_approved = 0"),t==="approved"&&s.push("u.is_approved = 1"),t==="admin"&&s.push("u.is_admin = 1");const a=`
    SELECT u.id, u.email, u.is_approved, u.is_admin, u.trial_start, u.trial_end, u.created_at,
           s.plan_code, s.status AS sub_status
      FROM users u
      LEFT JOIN user_subscriptions s ON s.user_id = u.id
      ${s.length?"WHERE "+s.join(" AND "):""}
      ORDER BY u.id DESC
      LIMIT 200`,{results:n}=await e.env.DB.prepare(a).all();return e.json({users:n||[]})});q.post("/api/admin/users/:id/approve",_,R,async e=>{const t=parseInt(e.req.param("id"),10),{is_approved:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_approved=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_approval",{userId:e.get("user").id,metadata:{target_user_id:t,is_approved:s}}),e.json({ok:!0})});q.post("/api/admin/users/:id/admin",_,R,async e=>{const t=parseInt(e.req.param("id"),10),{is_admin:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_admin=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_admin",{userId:e.get("user").id,metadata:{target_user_id:t,is_admin:s}}),e.json({ok:!0})});q.get("/api/admin/licenses",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.*, u.email AS user_email
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 500`).all();return e.json({licenses:t||[]})});q.post("/api/admin/licenses/issue",_,R,async e=>{const t=e.get("user"),{plan_code:s,license_type:a,expires_at:n,count:i=1,note:r}=await e.req.json();if(i<1||i>100)return e.json({error:"invalid_count"},400);const o=[];for(let c=0;c<i;c++){let d=zt("VPS-GE365X");for(let l=0;l<3&&await e.env.DB.prepare("SELECT 1 FROM licenses WHERE license_key=?").bind(d).first();l++)d=zt("VPS-GE365X");await e.env.DB.prepare(`INSERT INTO licenses (license_key, license_type, plan_code, is_active, expires_at, issued_by, note)
       VALUES (?, ?, ?, 1, ?, ?, ?)`).bind(d,a,s,n?n+" 23:59:59":null,t.id,r||null).run(),o.push(d)}return await Z(e,"admin_issue_license",{userId:t.id,metadata:{count:i,plan_code:s,license_type:a}}),e.json({ok:!0,keys:o})});q.post("/api/admin/licenses/:id/revoke",_,R,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=0, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type)
     VALUES (?, ?, 'revoked')`).bind(t,e.get("user").id).run(),e.json({ok:!0})});q.post("/api/admin/licenses/:id/reactivate",_,R,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),e.json({ok:!0})});q.get("/api/admin/subscriptions",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.*, u.email AS user_email
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 300`).all();return e.json({subscriptions:t||[]})});q.get("/api/admin/posts/summary",_,R,async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue").first(),s=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE status='pending'").first(),a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='success'").first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='failed'").first(),{results:i}=await e.env.DB.prepare(`SELECT pl.created_at, pl.content, pl.status,
            u.email, x.x_username
       FROM post_logs pl
       LEFT JOIN users u  ON u.id = pl.user_id
       LEFT JOIN x_accounts x ON x.id = pl.account_id
       ORDER BY pl.created_at DESC LIMIT 100`).all();return e.json({stats:[{label:"全キュー",value:(t==null?void 0:t.n)??0},{label:"pending",value:(s==null?void 0:s.n)??0},{label:"成功",value:(a==null?void 0:a.n)??0},{label:"失敗",value:(n==null?void 0:n.n)??0}],recent:i||[]})});q.get("/api/admin/x-accounts",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT xa.id, xa.x_username, xa.is_active, xa.last_posted_at, xa.account_health_score,
            u.email AS user_email
       FROM x_accounts xa
       LEFT JOIN users u ON u.id = xa.user_id
       ORDER BY xa.id DESC LIMIT 500`).all();return e.json({accounts:t||[]})});q.get("/api/admin/audit-logs",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 300`).all();return e.json({logs:t||[]})});q.get("/api/admin/settings",_,R,async e=>{const{results:t}=await e.env.DB.prepare("SELECT key, value, description FROM system_settings ORDER BY key").all();return e.json({settings:t||[]})});q.post("/api/admin/settings",_,R,async e=>{const{key:t,value:s}=await e.req.json();return await e.env.DB.prepare(`INSERT INTO system_settings (key, value, updated_at)
     VALUES (?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s).run(),e.json({ok:!0})});const De=new D;De.post("/api/auth/register",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='invite_only'").first();if((n==null?void 0:n.value)==="1")return e.json({error:"invite_only"},403);if(await e.env.DB.prepare("SELECT 1 FROM users WHERE email = ?").bind(s).first())return e.json({error:"email_taken"},409);const r=await Is(a),o=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first(),c=parseInt((o==null?void 0:o.value)??"14",10),d=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_require_approval'").first(),l=(d==null?void 0:d.value)!=="0";g();const m=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,r,l?0:1,c).run()).meta.last_row_id;return await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(m,c).run(),await e.env.DB.prepare(`INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,m,c).run(),await Z(e,"register",{userId:m,email:s}),e.json({ok:!0,user_id:m,approved:!l,message:l?"登録を受け付けました。管理者による承認後にログインできます。":"登録が完了しました。ログインしてください。"})});De.post("/api/auth/login",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!s||!a)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?").bind(s).first();if(!n)return await Z(e,"login_fail",{email:s,metadata:{reason:"no_user"}}),e.json({error:"invalid_credentials"},401);if(!await Ls(a,n.password_hash))return await Z(e,"login_fail",{userId:n.id,email:s,metadata:{reason:"bad_password"}}),e.json({error:"invalid_credentials"},401);if(n.is_approved===0)return await Z(e,"login_blocked",{userId:n.id,email:s,metadata:{reason:"not_approved"}}),e.json({error:"not_approved"},403);const r=await Va({uid:n.id,email:n.email,adm:n.is_admin===1},e.env.JWT_SECRET,3600*24*7),o=Bs(Nt,r,{maxAge:3600*24*7});return await Z(e,"login_success",{userId:n.id,email:s}),new Response(JSON.stringify({ok:!0,user_id:n.id,email:n.email,is_admin:n.is_admin===1}),{headers:{"content-type":"application/json","set-cookie":o}})});De.post("/api/auth/logout",async e=>{const t=e.get("user");t&&await Z(e,"logout",{userId:t.id,email:t.email});const s=Bs(Nt,"",{maxAge:0});return new Response(JSON.stringify({ok:!0}),{headers:{"content-type":"application/json","set-cookie":s}})});De.get("/api/auth/me",_,e=>e.json({ok:!0,user:e.get("user")}));De.post("/api/auth/license/activate",_,async e=>{const t=e.get("user"),{license_key:s}=await e.req.json();if(!s||!Ga(s))return e.json({error:"invalid_license_format"},400);const a=s.trim().toUpperCase(),n=await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(a).first();if(!n)return e.json({error:"license_not_found"},404);if(n.is_active===0)return e.json({error:"license_inactive"},409);if(n.expires_at&&n.expires_at<g())return e.json({error:"license_expired"},409);if(n.user_id&&n.user_id!==t.id)return e.json({error:"license_already_used"},409);await e.env.DB.prepare(`UPDATE licenses
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
     WHERE id = ? AND is_approved = 0`).bind(t.id).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type, ip_address, user_agent)
     VALUES (?, ?, 'activated', ?, ?)`).bind(n.id,t.id,e.req.header("cf-connecting-ip")||"",e.req.header("user-agent")||"").run(),await Z(e,"license_activate",{userId:t.id,email:t.email,metadata:{license_id:n.id,plan_code:i}}),e.json({ok:!0,plan_code:i,status:r,license_type:n.license_type,expires_at:o})});De.post("/api/auth/password/change",_,async e=>{const t=e.get("user"),{current_password:s,new_password:a}=await e.req.json();if(!s||!a||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(t.id).first();if(!n)return e.json({error:"user_not_found"},404);if(!await Ls(s,n.password_hash))return e.json({error:"invalid_credentials"},401);const r=await Is(a);return await e.env.DB.prepare("UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(r,t.id).run(),await Z(e,"password_change",{userId:t.id,email:t.email}),e.json({ok:!0})});const fe=new D;fe.get("/api/subscription/plans",async e=>{const{results:t}=await e.env.DB.prepare(`SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`).all(),s=(t||[]).map(a=>({...a,features:a.features?JSON.parse(a.features):[]}));return e.json({plans:s})});fe.get("/api/subscription/me",_,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`).bind(t.id).first();return s?e.json({subscription:{...s,features:s.features?JSON.parse(s.features):[]}}):e.json({subscription:null})});fe.post("/api/subscription/cancel",_,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});fe.post("/api/subscription/reactivate",_,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});fe.get("/api/subscription/payments",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`).bind(t.id).all();return e.json({payments:s||[]})});fe.post("/api/subscription/stripe/checkout",_,async e=>e.env.STRIPE_SECRET_KEY?e.json({error:"not_implemented_yet"},501):e.json({error:"stripe_not_configured"},501));fe.post("/api/subscription/webhook/stripe",async e=>e.json({received:!0}));const Zt=new TextEncoder,vn="https://api.x.com/2";class M extends Error{constructor(s,a=0,n="api_error"){super(s);h(this,"statusCode");h(this,"errorType");this.name="XApiError",this.statusCode=a,this.errorType=n}}class Bt extends M{constructor(s){super("Rate limited by X API (429)",429,"rate_limit");h(this,"resetAtEpoch");this.name="XApiRateLimitError",this.resetAtEpoch=s}}function oe(e){return encodeURIComponent(e).replace(/[!'()*]/g,t=>"%"+t.charCodeAt(0).toString(16).toUpperCase())}function En(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),[...t].map(s=>s.toString(16).padStart(2,"0")).join("")}function yn(){return En(16)}async function xn(e,t){const s=await crypto.subtle.importKey("raw",Zt.encode(e),{name:"HMAC",hash:"SHA-1"},!1,["sign"]),a=await crypto.subtle.sign("HMAC",s,Zt.encode(t)),n=new Uint8Array(a);let i="";for(let r=0;r<n.length;r++)i+=String.fromCharCode(n[r]);return btoa(i)}async function wn(e,t,s,a){const n={oauth_consumer_key:s.consumerKey,oauth_nonce:yn(),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.floor(Date.now()/1e3).toString(),oauth_token:s.accessToken,oauth_version:"1.0"},i=new URL(t),r={...n};i.searchParams.forEach((m,b)=>{r[b]=m});const o=Object.keys(r).sort().map(m=>`${oe(m)}=${oe(r[m])}`).join("&"),c=[e.toUpperCase(),oe(`${i.origin}${i.pathname}`),oe(o)].join("&"),d=`${oe(s.consumerSecret)}&${oe(s.accessTokenSecret)}`,l=await xn(d,c);return n.oauth_signature=l,`OAuth ${Object.keys(n).sort().map(m=>`${oe(m)}="${oe(n[m])}"`).join(", ")}`}async function $t(e,t,s,a){const n=`${vn}${t}`,i=await wn(e,n,a),r={method:e,headers:{authorization:i,"content-type":"application/json"},signal:AbortSignal.timeout(3e4)};s!==void 0&&(r.body=JSON.stringify(s));const o=await fetch(n,r);if(o.status===429){const c=o.headers.get("x-rate-limit-reset");throw new Bt(c?Number(c):void 0)}if(!o.ok){const c=await o.text();throw new M(`X API ${e} ${t} failed: ${o.status} ${c.slice(0,500)}`,o.status,"api_error")}return o.status===204?{}:o.json()}async function $s(e,t){var a,n;const s=await $t("POST","/tweets",{text:t},e);return{id:((a=s==null?void 0:s.data)==null?void 0:a.id)||"",text:((n=s==null?void 0:s.data)==null?void 0:n.text)||t}}async function Ms(e,t,s,a){var r,o;const n={text:t};s&&s.length&&(n.media={media_ids:s.slice(0,4)});const i=await $t("POST","/tweets",n,e);return{id:((r=i==null?void 0:i.data)==null?void 0:r.id)||"",text:((o=i==null?void 0:i.data)==null?void 0:o.text)||t}}async function Sn(e){var s,a,n,i;if(!e)throw new M("credentials未設定",0,"missing_credentials");if(!((s=e.consumerKey)!=null&&s.trim()))throw new M("API Key未設定",0,"missing_credentials");if(!((a=e.consumerSecret)!=null&&a.trim()))throw new M("API Secret未設定",0,"missing_credentials");if(!((n=e.accessToken)!=null&&n.trim()))throw new M("Access Token未設定",0,"missing_token");if(!((i=e.accessTokenSecret)!=null&&i.trim()))throw new M("Access Token Secret未設定",0,"missing_token");const t=await $t("GET","/users/me?user.fields=profile_image_url,public_metrics",void 0,e);return t==null?void 0:t.data}async function Mt(e,t,s){var o,c;const a=((s==null?void 0:s.apiKey)??e.X_API_KEY??"").trim(),n=((s==null?void 0:s.apiSecret)??e.X_API_SECRET??"").trim();if(!a||!n)throw new M("X API Key/Secret 未設定",0,"no_api_key");if(!((o=t==null?void 0:t.access_token)!=null&&o.trim()))throw new M("Access Token 未設定",0,"no_token");if(!((c=t==null?void 0:t.access_token_secret)!=null&&c.trim()))throw new M("Access Token Secret 未設定",0,"no_token_secret");let i,r;try{i=await Dt(t.access_token,e.ENCRYPTION_KEY)}catch{throw new M("Access Token の復号に失敗",0,"decrypt_failed")}try{r=await Dt(t.access_token_secret,e.ENCRYPTION_KEY)}catch{throw new M("Access Token Secret の復号に失敗",0,"decrypt_failed")}if(!i.trim())throw new M("Access Token が空",0,"decrypt_failed");if(!r.trim())throw new M("Access Token Secret が空",0,"decrypt_failed");return{consumerKey:a,consumerSecret:n,accessToken:i,accessTokenSecret:r}}const be=new D;be.get("/api/admin/accounts",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return e.json({accounts:s||[]})});be.post("/api/admin/accounts",_,async e=>{var r,o;const t=e.get("user"),s=await e.req.json();if(!s.account_name)return e.json({error:"account_name required"},400);if(!((r=s.access_token)!=null&&r.trim())||!((o=s.access_token_secret)!=null&&o.trim()))return e.json({error:"access_token and access_token_secret required"},400);const a=await me(s.access_token.trim(),e.env.ENCRYPTION_KEY),n=await me(s.access_token_secret.trim(),e.env.ENCRYPTION_KEY),i=await e.env.DB.prepare(`INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`).bind(t.id,s.account_name,a,n,s.daily_post_limit??5).run();return e.json({success:!0,id:i.meta.last_row_id})});be.post("/api/admin/accounts/:id/test",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(s,t.id).first();if(!a)return e.json({success:!1,error:"not_found"},404);try{const n=await Mt(e.env,a),i=await Sn(n);return i!=null&&i.id&&await e.env.DB.prepare(`UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           updated_at=? WHERE id=?`).bind(i.id,i.username||null,g(),s).run(),e.json({success:!0,me:i})}catch(n){const i=n instanceof M?n.statusCode:0;return e.json({success:!1,error:n.message,status_code:i,error_type:n==null?void 0:n.errorType})}});be.post("/api/admin/accounts/:id/current",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id),e.env.DB.prepare("UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?").bind(g(),s,t.id)]),e.json({success:!0})});be.post("/api/admin/accounts/:id/toggle",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?").bind(g(),s,t.id).run(),e.json({success:!0})});be.put("/api/admin/accounts/:id",_,async e=>{var r,o;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=[],i=[];if(a.account_name&&(n.push("account_name=?"),i.push(a.account_name)),a.daily_post_limit!==void 0&&(n.push("daily_post_limit=?"),i.push(a.daily_post_limit)),(r=a.access_token)!=null&&r.trim()){const c=await me(a.access_token.trim(),e.env.ENCRYPTION_KEY);n.push("access_token=?"),i.push(c)}if((o=a.access_token_secret)!=null&&o.trim()){const c=await me(a.access_token_secret.trim(),e.env.ENCRYPTION_KEY);n.push("access_token_secret=?"),i.push(c)}return n.length===0?e.json({success:!1,error:"no_fields"}):(n.push("updated_at=?"),i.push(g(),s,t.id),await e.env.DB.prepare(`UPDATE x_accounts SET ${n.join(", ")} WHERE id=? AND user_id=?`).bind(...i).run(),e.json({success:!0}))});be.delete("/api/admin/accounts/:id",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM x_accounts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const Tn=["20代","30代","40代","50代"],kn=["男性","女性"],An=["美容","健康","副業","投資","AI活用","ダイエット","お金"],Dn={美容:"老化・肌荒れ・見た目の変化",健康:"疲れやすい・体力低下・不調",副業:"時間がない・何から始めるか不明",投資:"勝てない・資産が増えない",AI活用:"手作業が多い・効率が悪い",ダイエット:"リバウンド・続かない",お金:"貯まらない・将来不安"},Rn={美容:"若々しくなりたい",健康:"元気に過ごしたい",副業:"収益化したい",投資:"安定して利益を出したい",AI活用:"業務を自動化したい",ダイエット:"理想の体型になりたい",お金:"経済的自由を得たい"},qs=[];for(const e of Tn)for(const t of kn)for(const s of An)qs.push({key:`${e}_${t}_${s}`,label:`${e}${t}/${s}`,gender:t,age_range:e,genre:s,problem:Dn[s]||`${s}に悩んでいる`,goal:Rn[s]||`${s}で成果を出したい`,knowledge:"一般"});const On=[{key:"authority",label:"権威型",instruction:"専門家として断定的に、簡潔に、根拠を示して書く。"},{key:"empathy",label:"共感型",instruction:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{key:"provocative",label:"煽り型",instruction:"問題を鋭く突き、危機感を持たせる書き方にする。"},{key:"story",label:"ストーリー型",instruction:"体験談や変化の流れを感じさせる構成で書く。"},{key:"problem_raise",label:"問題提起型",instruction:"最初に課題を提示し、その原因と解決策を示す。"}],Rt={problem:{name:"問題提起型",instruction:`【問題提起型】
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
5.CTA`}};async function Ps(e,t){var r,o,c;const s=t.model||"gpt-4o-mini",a=t.maxTokens||4e3,n=t.temperature??.7,i=t.baseUrl||"https://api.openai.com/v1";for(let d=1;d<=3;d++)try{const l=await fetch(`${i}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${t.apiKey}`,"content-type":"application/json"},body:JSON.stringify({model:s,messages:e,max_tokens:a,temperature:n}),signal:AbortSignal.timeout(12e4)});if(!l.ok){const m=await l.text();if(l.status>=500&&d<3){await new Promise(b=>setTimeout(b,2e3*d));continue}throw new Error(`OpenAI API error: ${l.status} ${m.slice(0,500)}`)}const p=await l.json();return((c=(o=(r=p==null?void 0:p.choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:c.content)||""}catch(l){if(((l==null?void 0:l.name)==="TimeoutError"||(l==null?void 0:l.name)==="AbortError")&&d<3){await new Promise(m=>setTimeout(m,2e3*d));continue}throw l}return""}function Fs(e){let t=`以下のルールを厳守してX(Twitter)投稿文を生成してください。
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
Markdown記号(#,##)禁止。見出しは「■」。番号リスト禁止。自然な文章で。箇条書きは「・」のみ。`;let a="";e.patternType&&Rt[e.patternType]&&(a=`
【投稿パターン（構造のみ）】
${Rt[e.patternType].instruction}`);let n=`テーマ: ${e.theme||""}${e.keywords?`
キーワード: ${e.keywords}`:""}`;e.postMode==="140"?n+=`
140文字以内のX投稿を作成。簡潔かつインパクト重視。ハッシュタグは含めない。`:n+=`
X投稿用のフル文章を作成。読みやすく改行を入れる。ハッシュタグは含めない。`,e.cta&&(n+=`
CTA: ${e.cta}`),e.userInput&&(n+=`
追加指示: ${e.userInput}`);const i=t+a+s;return{messages:[{role:"system",content:i},{role:"user",content:n}],systemPrompt:i,userPrompt:n}}async function Hs(e,t,s,a,n,i="body"){const{messages:r}=Fs({theme:t,keywords:s,brandVoice:n,targetDna:a,postMode:i||"body"}),o=await Ps(r,{apiKey:e,temperature:.8});return bt(o,i)}async function Us(e,t,s,a,n,i,r="body"){if(!Rt[t])throw new Error(`未対応のパターン: ${t}`);const{messages:o}=Fs({theme:s,keywords:a,brandVoice:i,targetDna:n,patternType:t,postMode:r||"body"}),c=await Ps(o,{apiKey:e,temperature:.8});return bt(c,r)}function bt(e,t){if(!e)return"";let s=e.replace(/^#{1,4}\s*/gm,"").replace(/^[▪️■●•\-\*]+\s*/gm,"").replace(/^\d+\.\s/gm,"").replace(/^(Step\d+)[:\s]/gim,"").replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm,"・").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\n{3,}/g,`

`).trim();return s=jn(s),t==="140"&&s.length>140&&(s=s.slice(0,137)+"..."),s}function jn(e){if(!e)return"";const t=e.split(`
`).length,s=e.replace(/\n/g,"").length;if(t>3||s<40)return e;const a=e.split(new RegExp("(?<=[。！？!?\\n])","g")).filter(r=>r.trim());if(a.length<=1)return e;let n="",i=0;for(let r=0;r<a.length;r++){const o=a[r].trim();if(o){if(/^https?:\/\//.test(o)||/^#/.test(o)||/^@/.test(o)){n&&!n.endsWith(`
`)&&(n+=`
`),n+=o,i=0;continue}n+=o,i++,i>=2&&r<a.length-1?(n+=`

`,i=0):r<a.length-1&&!o.endsWith(`
`)&&(n+=`
`)}}return n.replace(/\n{3,}/g,`

`).trim()}const In=new TextEncoder;async function Ae(e){const t=await crypto.subtle.digest("SHA-256",In.encode(e||""));return[...new Uint8Array(t)].slice(0,8).map(a=>a.toString(16).padStart(2,"0")).join("")}function Ot(e){const t=(e||"").replace(/\s+/g,"").slice(0,2e3),s=new Set;for(let a=0;a<t.length-1;a++)s.add(t.slice(a,a+2));return s}function Ws(e,t){const s=Ot(e),a=Ot(t);if(s.size===0&&a.size===0)return 0;let n=0;for(const r of s)a.has(r)&&n++;const i=s.size+a.size-n;return i===0?0:n/i}const Ln=120*1e3;async function Ys(e,t){const s=new Date().toISOString(),a=new Date(Date.now()-Ln).toISOString(),n=await e.DB.prepare("SELECT account_id, locked_at FROM post_locks WHERE account_id = ?").bind(t).first();return n&&n.locked_at>a?!1:(await e.DB.prepare(`INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`).bind(t,s).run(),!0)}async function Js(e,t){await e.DB.prepare("DELETE FROM post_locks WHERE account_id = ?").bind(t).run()}async function Ks(e,t,s,a,n){const i={ok:!0,errors:[],warnings:[]},r=await e.DB.prepare("SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?").bind(t).first();if(!r)return i.ok=!1,i.errors.push({code:"account_not_found",message:"アカウントが存在しません"}),i;const o=new Date(Date.now()+9*3600*1e3).toISOString().slice(0,10);let c=r.daily_post_count||0;if(r.last_daily_reset_date!==o&&(c=0),c>=(r.daily_post_limit||5)&&i.errors.push({code:"daily_limit_reached",message:`日次投稿上限 (${r.daily_post_limit}) に達しています`}),r.last_posted_at){const l=Date.parse(r.last_posted_at.replace(" ","T")+"+09:00");if(!Number.isNaN(l)){const p=(Date.now()-l)/6e4;p<15&&i.errors.push({code:"too_frequent",message:`前回投稿から ${Math.floor(p)} 分しか経過していません（最低 15 分）`,overridable:!0})}}const{results:d}=await e.DB.prepare(`SELECT id, body FROM post_queue
       WHERE account_id = ? AND status IN ('posted','approved','publishing')
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`).bind(t).all();for(const l of d||[]){const p=Ws(s,l.body||"");if(p>=.7){i.errors.push({code:"too_similar",message:`過去投稿 (ID: ${l.id}) と類似度 ${p.toFixed(2)} で重複`});break}}if(a){const l=await e.DB.prepare(`SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`).bind(t,a).first();((l==null?void 0:l.n)??0)>=3&&i.errors.push({code:"link_spam",message:`同一リンクを過去7日で${l==null?void 0:l.n}回使用しています`})}if(n){const l=Qt(n);if(l.size>0){const{results:p}=await e.DB.prepare(`SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`).bind(t).all();(p||[]).length>=3&&(p||[]).every(b=>{const k=[...Qt(b.hashtags||"")].filter(A=>l.has(A)).length;return(l.size===0?0:k/l.size)>=.8})&&i.errors.push({code:"hashtag_spam",message:"同一ハッシュタグセットが 3 回連続で 80%以上一致しています"})}}return r.health_status==="risk"&&i.errors.push({code:"health_risk",message:"アカウント健全性スコアが危険域です。投稿を控えてください。"}),i.ok=i.errors.length===0,i}function Qt(e){return new Set((e||"").split(/[\s,]+/).map(t=>t.trim().replace(/^#/,"").toLowerCase()).filter(Boolean))}async function _t(e,t,s,a,n){const i=await e.DB.prepare("SELECT account_health_score FROM x_accounts WHERE id = ?").bind(t).first();if(!i)return{score_after:100,status_after:"healthy"};let r=Math.max(0,Math.min(100,(i.account_health_score??100)+a));const o=r>=80?"healthy":r>=60?"caution":"risk";return await e.DB.prepare("UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?").bind(r,o,t).run(),await e.DB.prepare(`INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(t,s,a,r,o,n?JSON.stringify(n):null).run(),{score_after:r,status_after:o}}function es(e){if(!e)return Date.now();const t=e.replace(" ","T")+"+09:00",s=Date.parse(t);return Number.isNaN(s)?Date.now():s}function ts(e){return new Date(e+324e5).toISOString().replace("T"," ").slice(0,19)}async function Nn(e,t,s){const a=s.jitter_enabled!==!1,n=s.jitter_minutes??5,i=s.collision_avoidance_enabled!==!1,r=s.min_spacing_seconds??90;let o=es(t),c=0,d=0;if(a&&n>0){const m=Math.floor((Math.random()*2-1)*n*60);c=m,o+=m*1e3}if(i&&s.account_id){const m=ts(o),b=[s.account_id,m,m];let v=`
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`;s.exclude_id&&(v+=" AND id != ?",b.push(s.exclude_id)),v+=" ORDER BY sat ASC";const{results:k}=await e.DB.prepare(v).bind(...b).all();let y=!0,A=0;for(;y&&A<30;){y=!1;for(const S of k||[]){const C=es(S.sat),F=Math.abs(o-C)/1e3;if(F<r){const B=(r-F+1)*1e3*(o>=C?1:-1);o+=B,d+=Math.floor(B/1e3),y=!0}}A++}}const l=ts(o);return{effective_at:l,audit:{base_at:t,effective_at:l,jitter_applied_seconds:c,collision_adjusted_seconds:d,ruleset:{jitter_enabled:a,jitter_minutes:n,collision_avoidance_enabled:i,min_spacing_seconds:r}}}}async function Cn(e,t,s,a){await e.DB.prepare("INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)").bind(t,s??null,JSON.stringify(a)).run()}const Bn=.7;async function $n(e){const t=[...Ot(e)].slice(0,200),s=await Ae(e);return JSON.stringify({bigrams:t,content_hash:s})}async function Mn(e,t,s,a){await e.DB.prepare("INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)").bind(t,s??null,a).run()}async function qn(e,t,s,a={}){const n={pass:!0,blocked_reason:null,scores:[]};if(!t||!s)return n;const i=[s];let r=`SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`;a.post_id&&(r+=" AND id != ?",i.push(a.post_id)),r+=" ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5";const{results:o}=await e.DB.prepare(r).bind(...i).all();for(const c of o||[]){const d=Ws(t,c.body||"");if(n.scores.push({post_id:c.id,similarity:d}),d>=Bn){n.pass=!1,n.blocked_reason=`過去投稿(ID:${c.id})と類似度 ${d.toFixed(2)} で重複`;break}}return n}const U=new D;async function Pn(e,t,s){const a=String(s??"default");let n=await e.DB.prepare("SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();n||(n=await e.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first());let i=await e.DB.prepare("SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();return i||(i=await e.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first()),{target:n,voice:i}}async function ss(e,t){if(!(!e.TELEGRAM_BOT_TOKEN||!e.TELEGRAM_CHAT_ID))try{await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:e.TELEGRAM_CHAT_ID,text:t,parse_mode:"HTML"})})}catch{}}async function as(e,t){try{await e.DB.prepare(`INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.record_id??null,t.account_id??null,t.user_id??null,t.account_name??"",t.source_type??"",t.generation_type??null,t.post_mode??"body",t.content??"",t.content_hash??"",t.link_url??"",t.media_type??null,t.media_upload_status??null,t.media_id??null,t.thread_parent_id??null,t.thread_order??null,t.thread_total_count??null,t.recycle_source_post_id??null,t.recycle_rule??null,t.scheduled_at??null,t.executed_at??g(),t.posted_at??null,t.status??"posted",t.error_message??null,t.api_response_summary??null).run()}catch(s){console.error("[PostLog]",s.message)}}U.get("/api/admin/posts",_,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=e.req.query("post_mode"),i=parseInt(e.req.query("page")||"1",10),r=50,o=(i-1)*r;let c="WHERE pq.platform='x' AND pq.user_id = ?";const d=[t.id];s&&s!=="all"&&(c+=" AND pq.status = ?",d.push(s)),a&&(c+=" AND pq.account_id = ?",d.push(Number(a))),n&&n!=="all"&&(c+=" AND pq.post_mode = ?",d.push(n));const{results:l}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${c} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`).bind(...d,r,o).all(),p=await e.env.DB.prepare(`SELECT COUNT(*) AS total FROM post_queue pq ${c}`).bind(...d).first();return e.json({posts:l||[],total:(p==null?void 0:p.total)??0,page:i})});U.get("/api/admin/posts/:id",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`).bind(s,t.id).first();return a?e.json({post:a}):e.json({error:"Not found"},404)});U.post("/api/admin/posts",_,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body is required"},400);const a=g(),n=await Ae(s.body);if(s.scheduled_at&&s.post_mode==="scheduled_once"){const r=await e.env.DB.prepare(`SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
         AND body=? AND COALESCE(link_url,'')=COALESCE(?,'') AND scheduled_at=? AND post_mode='scheduled_once'
         AND status NOT IN ('cancelled','failed')`).bind(t.id,s.account_id||null,s.body,s.link_url||"",s.scheduled_at).first();if(r)return e.json({success:!1,error:`Same content/time already exists (ID:${r.id})`})}const i=await e.env.DB.prepare(`INSERT INTO post_queue
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
             ?, ?)`).bind(t.id,s.account_id??null,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body",s.status??"pending",s.scheduled_at??null,n,s.generation_type??null,s.source_type??"manual_post",s.recurrence_type??null,s.recurrence_rule??null,s.recurrence_end_at??null,s.next_run_at??null,s.recycle_rule??null,s.source_post_id??null,s.min_engagement_score??0,s.rewrite_mode??null,s.thread_parent_id??null,s.thread_order??0,s.thread_count??0,s.media_type??null,s.media_file_path??null,a,a).run();return e.json({success:!0,id:i.meta.last_row_id})});U.post("/api/admin/posts/generate",_,async e=>{const t=e.get("user"),s=e.env.OPENAI_API_KEY,{theme:a,keywords:n,count:i,pattern_type:r,post_mode:o,link_url:c,hashtags:d,footer_text:l,account_id:p,generation_type:m}=await e.req.json();if(!a)return e.json({error:"theme required"},400);if(!s)return e.json({error:"OPENAI_API_KEY not set"},500);let b=p??null;if(!b){const S=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();b=(S==null?void 0:S.id)??null}const{target:v,voice:k}=await Pn(e.env,t.id,b),y=g(),A=[];try{const S=Math.min(i||1,10);for(let C=0;C<S;C++){const F=o||"body";let B;r?B=await Us(s,r,a,n||"",v,k,F):B=await Hs(s,a,n||"",v,k,F),l&&(B=B.trimEnd()+`

`+l.trim());const nt=await Ae(B),Q=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`).bind(t.id,b,a,n||"",B,c||null,d||null,F,r||null,nt,m||r||"general",r?"pattern_generated_post":"ai_generated_post",y,y).run();A.push({id:Q.meta.last_row_id,body:B,link_url:c||"",post_mode:F});try{await e.env.DB.prepare(`INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,b,(k==null?void 0:k.id)??null,(v==null?void 0:v.id)??null,F,r||"general",B.slice(0,500)).run()}catch{}}return e.json({success:!0,generated:A,count:A.length})}catch(S){return e.json({error:"AI error: "+S.message},500)}});U.post("/api/admin/posts/:id/approve",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/reject",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/schedule",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),{scheduled_at:a,jitter_enabled:n=!0,jitter_minutes:i=5,collision_avoidance_enabled:r=!0,min_spacing_seconds:o=90}=await e.req.json();if(!a)return e.json({error:"scheduled_at required"},400);const c=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();if(!c)return e.json({success:!1,error:"Not found"},404);const d=await qn(e.env,c.body||"",c.account_id??null,{post_id:c.id});if(!d.pass)return e.json({success:!1,error:"類似: "+d.blocked_reason,similarity_blocked:!0,scores:d.scores});const{effective_at:l,audit:p}=await Nn(e.env,a,{jitter_enabled:n,jitter_minutes:i,collision_avoidance_enabled:r,min_spacing_seconds:o,account_id:c.account_id,exclude_id:c.id}),m=await $n(c.body||"");return await Mn(e.env,c.id,c.account_id,m),await e.env.DB.prepare(`UPDATE post_queue SET
       status='approved', base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=?`).bind(a,l,l,n?1:0,i,r?1:0,o,JSON.stringify(p),g(),s).run(),await Cn(e.env,c.id,c.account_id,p),e.json({success:!0,base_scheduled_at:a,effective_scheduled_at:l,scheduled_at:l,audit:p})});U.post("/api/admin/posts/:id/post-now",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=(await e.req.json().catch(()=>({}))).force_override===!0,n=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();if(!n)return e.json({success:!1,error:"Not found"},404);let i=null;if(n.account_id&&(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id,t.id).first()),i||(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first(),i&&await e.env.DB.prepare("UPDATE post_queue SET account_id=? WHERE id=?").bind(i.id,s).run()),!i)return e.json({success:!1,error:"No active X account"});const r=await Ks(e.env,i.id,n.body||"",n.link_url,n.hashtags),o=r.errors.filter(c=>!(a&&c.overridable));if(o.length>0){const c=r.errors.find(d=>d.overridable);return c&&!a?e.json({success:!1,error:c.message,overridable:!0,cooldown_override:!0}):e.json({success:!1,error:"Safety: "+o.map(d=>d.message).join("; ")})}if(!await Ys(e.env,i.id))return e.json({success:!1,error:"Account busy"});try{await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=?").bind(g(),s).run();const c=await Mt(e.env,i);let d=bt(n.body||"",n.post_mode);n.link_url&&(d+=`
`+n.link_url),n.hashtags&&(d+=`
`+n.hashtags);const l=[];if(n.media_json)try{const m=JSON.parse(n.media_json);for(const b of(m||[]).slice(0,4)){const v=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(b,t.id).first();v!=null&&v.x_media_id&&l.push(v.x_media_id)}}catch{}const p=l.length>0?await Ms(c,d,l,null):await $s(c,d);return await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(p.id||"",g(),g(),s).run(),await e.env.DB.prepare(`UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+1,
         last_daily_reset_date = DATE('now','+9 hours'), updated_at=? WHERE id=?`).bind(g(),g(),i.id).run(),await as(e.env,{record_id:s,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type||"manual_post",generation_type:n.generation_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",link_url:n.link_url,posted_at:g(),status:"posted",api_response_summary:JSON.stringify({tweet_id:p.id})}),await ss(e.env,`X posted @${i.x_username||i.account_name} ID:${p.id}`),e.json({success:!0,tweet_id:p.id})}catch(c){return await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(c.message,g(),s).run(),await as(e.env,{record_id:s,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",status:"failed",error_message:c.message}),c instanceof Bt?await _t(e.env,i.id,"rate_limit",-15):await _t(e.env,i.id,"error",-5,{message:c.message}),await ss(e.env,`X post FAILED #${s} ${c.message}`),e.json({success:!1,error:c.message})}finally{await Js(e.env,i.id)}});U.put("/api/admin/posts/:id",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g(),i=a.body?await Ae(a.body):null;return a.media_json!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?").bind(a.media_json,n,s,t.id).run(),e.json({success:!0})):a.account_id!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(a.account_id,n,s,t.id).run(),e.json({success:!0})):(await e.env.DB.prepare(`UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`).bind(a.body,a.link_url??null,a.hashtags??null,a.scheduled_at??null,a.post_mode??"body",a.media_json??null,i,a.recurrence_type??null,a.recurrence_rule??null,a.next_run_at??null,a.recurrence_end_at??null,n,s,t.id).run(),e.json({success:!0}))});U.delete("/api/admin/posts/:id",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM post_queue WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/cancel",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.get("/api/admin/posts-scheduled",_,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=[t.id];let n="WHERE pq.platform='x' AND pq.user_id=? AND pq.scheduled_at IS NOT NULL AND pq.status NOT IN ('cancelled','rejected')";s&&(n+=" AND pq.account_id=?",a.push(Number(s)));const{results:i}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${n} ORDER BY pq.scheduled_at ASC`).bind(...a).all(),r=[t.id];let o="WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL";s&&(o+=" AND aj.account_id=?",r.push(Number(s)));const{results:c}=await e.env.DB.prepare(`SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${o} ORDER BY aj.publish_at ASC`).bind(...r).all(),d=(c||[]).map(p=>({...p,post_mode:"body",id:"ap-"+p.id})),l=[...i||[],...d].sort((p,m)=>(p.scheduled_at||"").localeCompare(m.scheduled_at||""));return e.json({posts:l})});U.post("/api/admin/posts/thread",_,async e=>{const t=e.get("user"),{tweets:s,link_url:a,account_id:n}=await e.req.json();if(!s||!Array.isArray(s)||s.length<2)return e.json({error:"Thread requires 2+ tweets"},400);const i=g(),r=await Ae(s[0].body),c=(await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[0].body,s[0].link_url??a??null,s.length,r,i,i).run()).meta.last_row_id,d=[c];for(let l=1;l<s.length;l++){const p=await Ae(s[l].body),m=await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[l].body,s[l].link_url??null,c,l,p,i,i).run();d.push(m.meta.last_row_id)}return e.json({success:!0,parent_id:c,ids:d})});const Vs=new D,Fn=5;Vs.post("/cron/tick",async e=>{const t=g(),{results:s}=await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved')
        AND (
              COALESCE(effective_scheduled_at, scheduled_at) IS NULL
           OR COALESCE(effective_scheduled_at, scheduled_at) <= datetime('now','+9 hours')
        )
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT ?`).bind(Fn).all();let a=0,n=0,i=0;for(const r of s||[]){const o=await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved')").bind(t,r.id).run();if(!(!o.success||o.meta.changes===0)){a++;try{if(!r.account_id)throw new Error("account_id is null");const c=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=?").bind(r.account_id).first();if(!c)throw new Error("account_not_found");const d=await Ks(e.env,c.id,r.body||"",r.link_url,r.hashtags);if(!d.ok)throw new Error("safety: "+d.errors.map(l=>l.message).join("; "));if(!await Ys(e.env,c.id))throw new Error("account_busy");try{const l=await Mt(e.env,c);let p=bt(r.body||"",r.post_mode);r.link_url&&(p+=`
`+r.link_url),r.hashtags&&(p+=`
`+r.hashtags);const m=[];if(r.media_json)try{const v=JSON.parse(r.media_json);for(const k of(v||[]).slice(0,4)){const y=await e.env.DB.prepare("SELECT x_media_id FROM media_assets WHERE id=?").bind(k).first();y!=null&&y.x_media_id&&m.push(y.x_media_id)}}catch{}const b=m.length>0?await Ms(l,p,m,null):await $s(l,p);await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(b.id||"",g(),g(),r.id).run(),await e.env.DB.prepare(`UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`).bind(g(),g(),c.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`).bind(r.id,c.id,r.user_id,c.account_name,r.source_type,r.generation_type,r.post_mode,r.body||"",r.content_hash||"",r.link_url||"",g(),g(),JSON.stringify({tweet_id:b.id})).run(),await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`).bind(c.id,r.user_id).run(),n++}finally{await Js(e.env,c.id)}}catch(c){const d=(c==null?void 0:c.message)||"unknown_error";await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(d,g(),r.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 'failed', ?, ?)`).bind(r.id,r.account_id,r.user_id,r.source_type,r.post_mode,r.body||"",r.content_hash||"",d,g()).run(),r.account_id&&(c instanceof Bt?await _t(e.env,r.account_id,"rate_limit",-15):await _t(e.env,r.account_id,"error",-5,{message:d})),r.account_id&&await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`).bind(r.account_id,r.user_id).run(),i++}}}return e.json({ok:!0,processed:a,success:n,failed:i,now:t})});const ge=new D;ge.get("/api/admin/autopilot/jobs",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`).bind(t.id).all(),{results:a}=await e.env.DB.prepare("SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1").bind(t.id).all();return e.json({jobs:s||[],accounts:a||[]})});ge.get("/api/admin/autopilot/jobs/:id",_,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).first();return s?e.json(s):e.json({error:"not found"})});ge.post("/api/admin/autopilot/jobs",_,async e=>{const t=e.get("user"),s=await e.req.json(),a=g(),n=(s.publish_at||s.generate_at||a).slice(0,10),i=await e.env.DB.prepare(`SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND account_id=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status NOT IN ('cancelled')`).bind(t.id,s.account_id||0,n).first();if(((i==null?void 0:i.cnt)??0)>=10)return e.json({success:!1,error:"この日は既に10件の予約があります"});const r=await e.env.DB.prepare("SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs").first(),o=String(((r==null?void 0:r.mx)??0)+1).padStart(4,"0");let c=s.generate_at??null;if(s.publish_at&&!s.generate_at)try{const p=new Date(s.publish_at.replace(" ","T"));p.setMinutes(p.getMinutes()-2),c=p.toISOString().replace("T"," ").slice(0,19)}catch{}const d=c||s.publish_at?"configured":"draft",l=await e.env.DB.prepare(`INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(o,t.id,s.account_id??null,s.content_mode||"problem",s.theme||"",s.keywords||"",s.prompt_text||"",s.options_json||"{}",s.title_memo||"",s.link_url||"",c,s.publish_at||null,d,a,a).run();return e.json({success:!0,id:l.meta.last_row_id,reservation_no:o})});ge.put("/api/admin/autopilot/jobs/:id",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g();let i=a.generate_at??null;if(a.publish_at&&!a.generate_at)try{const o=new Date(a.publish_at.replace(" ","T"));o.setMinutes(o.getMinutes()-2),i=o.toISOString().replace("T"," ").slice(0,19)}catch{}const r=i||a.publish_at?"configured":"draft";return await e.env.DB.prepare(`UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(a.content_mode||"problem",a.theme||"",a.keywords||"",a.prompt_text||"",a.options_json||"{}",a.title_memo||"",a.link_url||"",i,a.publish_at||null,r,n,s,t.id).run(),e.json({success:!0})});ge.delete("/api/admin/autopilot/jobs/:id",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ge.post("/api/admin/autopilot/jobs/:id/cancel",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ge.post("/cron/autopilot-tick",async e=>{if(!e.env.OPENAI_API_KEY)return e.json({ok:!0,skipped:"no_openai_key"});const{results:t}=await e.env.DB.prepare(`SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND generate_at IS NOT NULL
         AND generate_at <= datetime('now','+9 hours')
       ORDER BY generate_at ASC LIMIT 5`).all();let s=0;for(const a of t||[])try{const n=String(a.account_id??"default");let i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();i||(i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();r||(r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let o;a.content_mode&&a.content_mode!=="freetext"?o=await Us(e.env.OPENAI_API_KEY,a.content_mode,a.theme||"",a.keywords||"",i,r,"body"):o=await Hs(e.env.OPENAI_API_KEY,a.theme||"",a.keywords||"",i,r,"body");const c=await Ae(o),d=g(),l=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, 'body', ?, ?, ?, ?, ?, 'autopilot', 'approved', ?, ?)`).bind(a.user_id,a.account_id,o,a.link_url,a.publish_at,a.publish_at,a.publish_at,c,a.content_mode,d,d).run();await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?").bind(l.meta.last_row_id,d,a.id).run(),s++}catch(n){await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?").bind((n==null?void 0:n.message)||"unknown_error",g(),a.id).run()}return e.json({ok:!0,generated:s,total:(t||[]).length})});const ns={topics:[{title:"投稿の基本",keywords:["投稿","ポスト","ツイート","post","tweet"],answer:"[新規投稿] タブから本文を入力し「投稿キューへ」で予約できます。即時投稿は [今すぐ投稿] ボタンから。"},{title:"オートパイロット",keywords:["オートパイロット","autopilot","自動投稿","自動"],answer:"[オートパイロット] タブでジョブを作成すると、指定時刻に OpenAI が投稿案を生成しキューに入ります。"},{title:"アカウント連携",keywords:["連携","アカウント","追加","OAuth","トークン"],answer:"X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、[アカウント管理] から追加してください。OAuth 1.0a User Context を使用します。"},{title:"ライセンス",keywords:["ライセンス","認証","license","VPS-GE365X"],answer:"ログイン画面の [ライセンス] タブから VPS-GE365X-XXXXXXXX 形式のキーを入力するとプランが有効化されます。"},{title:"類似度制御",keywords:["類似","重複","ブロック","similarity"],answer:"同一アカウントの直近5件と Jaccard係数 0.7 以上の類似があると投稿がブロックされます。"},{title:"投稿間隔",keywords:["間隔","時間","cooldown","spacing"],answer:"最低投稿間隔は15分、推奨は30〜120分のランダム。jitter で ±5分の微分散も付与されます。"}],default_response:"該当するトピックが見つかりませんでした。[アカウント管理][投稿][オートパイロット][ライセンス] 等のキーワードで試してください。"},tt=new D;async function qt(e){const t=await e.DB.prepare("SELECT json_data FROM chatbot_kb WHERE id = 1").first();if(t!=null&&t.json_data)try{return JSON.parse(t.json_data)}catch{}return await e.DB.prepare("INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)").bind(JSON.stringify(ns)).run(),ns}tt.get("/api/admin/chatbot/topics",_,async e=>{const t=await qt(e.env);return e.json({topics:(t.topics||[]).map((s,a)=>({id:a,title:s.title,keywords:s.keywords}))})});tt.post("/api/admin/chatbot/ask",_,async e=>{const t=await qt(e.env),a=((await e.req.json().catch(()=>({}))).question||"").toLowerCase().trim();if(!a)return e.json({answer:t.default_response});let n=null,i=0;for(const r of t.topics||[]){let o=0;for(const c of r.keywords||[])a.includes(c.toLowerCase())&&(o+=c.length);o>i&&(i=o,n=r)}return n?e.json({answer:n.answer,title:n.title,matched:!0}):e.json({answer:t.default_response,matched:!1})});tt.get("/api/admin/chatbot/topic/:id",_,async e=>{const s=((await qt(e.env)).topics||[])[parseInt(e.req.param("id"),10)];return s?e.json({topic:s}):e.json({error:"トピック未登録"},404)});tt.put("/api/admin/chatbot/kb",_,R,async e=>{const t=await e.req.json();return!t||!Array.isArray(t.topics)?e.json({error:"invalid_kb"},400):(await e.env.DB.prepare(`INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`).bind(JSON.stringify(t)).run(),e.json({success:!0,topic_count:t.topics.length}))});const st=new D;st.get("/api/admin/drafts",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`).bind(t.id).all();return e.json({drafts:s||[]})});st.post("/api/admin/drafts",_,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body required"},400);const a=await e.env.DB.prepare(`INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,s.account_id??null,s.title??null,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body").run();return e.json({success:!0,id:a.meta.last_row_id})});st.put("/api/admin/drafts/:id",_,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json();return await e.env.DB.prepare(`UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`).bind(a.title??null,a.body??null,a.link_url??null,a.hashtags??null,a.post_mode??null,a.account_id??null,g(),s,t.id).run(),e.json({success:!0})});st.delete("/api/admin/drafts/:id",_,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM drafts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const at=new D;at.get("/api/admin/media",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`).bind(t.id).all();return e.json({assets:s||[]})});at.post("/api/admin/media",_,async e=>{const t=e.get("user");if(!e.env.MEDIA_BUCKET)return e.json({error:"R2 bucket (MEDIA_BUCKET) not configured"},501);const a=(await e.req.parseBody()).file;if(!a)return e.json({error:"file required"},400);const n=a.type.startsWith("video/")?"video":"image",i=`u${t.id}/${Date.now()}-${a.name}`;await e.env.MEDIA_BUCKET.put(i,await a.arrayBuffer(),{httpMetadata:{contentType:a.type}});const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status)
     VALUES (?, ?, ?, ?, ?, ?, 'ready')`).bind(t.id,n,a.type,a.name,a.size,`/media/${i}`).run();return e.json({success:!0,id:r.meta.last_row_id,storage_path:`/media/${i}`})});at.delete("/api/admin/media/:id",_,async e=>{var n;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT storage_path FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).first();if((n=a==null?void 0:a.storage_path)!=null&&n.startsWith("/media/")&&e.env.MEDIA_BUCKET){const i=a.storage_path.slice(7);await e.env.MEDIA_BUCKET.delete(i).catch(()=>{})}return await e.env.DB.prepare("DELETE FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).run(),e.json({success:!0})});at.get("/media/*",async e=>{if(!e.env.MEDIA_BUCKET)return e.notFound();const t=e.req.path.replace(/^\/media\//,""),s=await e.env.MEDIA_BUCKET.get(t);if(!s)return e.notFound();const a=new Headers;return s.writeHttpMetadata(a),a.set("etag",s.httpEtag),new Response(s.body,{headers:a})});const Pt=new D;Pt.get("/api/admin/kpi",_,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=parseInt(e.req.query("days")||"30",10),n=[t.id,a];let i="WHERE km.user_id = ? AND km.metric_date >= date('now','+9 hours','-' || ? || ' days')";s&&(i+=" AND km.account_id = ?",n.push(Number(s)));const{results:r}=await e.env.DB.prepare(`SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${i} ORDER BY km.metric_date DESC, km.account_id ASC`).bind(...n).all();return e.json({metrics:r||[]})});Pt.get("/api/admin/kpi/summary",_,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`).bind(t.id).first(),a=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`).bind(t.id).first();return e.json({today:{sent:(s==null?void 0:s.sent)??0,failed:(s==null?void 0:s.failed)??0},week:{sent:(a==null?void 0:a.sent)??0,failed:(a==null?void 0:a.failed)??0}})});const gt=new D;gt.get("/api/admin/logs/posts",_,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=[t.id];let i="WHERE pl.user_id = ?";s&&s!=="all"&&(i+=" AND pl.status = ?",n.push(s)),a&&(i+=" AND pl.account_id = ?",n.push(Number(a)));const{results:r}=await e.env.DB.prepare(`SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${i} ORDER BY pl.id DESC LIMIT 300`).bind(...n).all();return e.json({logs:r||[]})});gt.get("/api/admin/logs/generations",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});gt.get("/api/admin/logs/health",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});const vt=new D;vt.get("/api/admin/target/presets",_,e=>e.json({templates:qs}));vt.get("/api/admin/target",_,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({target:a})});vt.post("/api/admin/target",_,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`).bind(s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const Et=new D;Et.get("/api/admin/voice/presets",_,e=>e.json({templates:On}));Et.get("/api/admin/voice",_,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({voice:a})});Et.post("/api/admin/voice",_,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`).bind(s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const He=new D;He.get("/api/admin/api-settings",_,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first(),a=await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id')").all(),n={};for(const d of a.results||[])n[d.key]=d.value;const i=s!=null&&s.api_key?await dt(s.api_key,e.env.ENCRYPTION_KEY):"",r=s!=null&&s.api_secret?"••••••••":"",o=n.openai_api_key?"••••••••":"",c=n.telegram_bot_token?"••••••••":"";return e.json({api_key:i,api_secret:r,openai_key:o,openai_model:n.openai_model||"gpt-4o-mini",telegram_token:c,telegram_chat_id:n.telegram_chat_id||""})});He.post("/api/admin/api-settings/x",_,async e=>{const t=e.get("user"),{api_key:s,api_secret:a}=await e.req.json();if(!s||s.includes("•"))return e.json({success:!1,error:"api_key required"},400);const n=await me(s.trim(),e.env.ENCRYPTION_KEY),i=a&&!a.includes("•")?await me(a.trim(),e.env.ENCRYPTION_KEY):null;return await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first()?i?await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,i,t.id).run():await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,t.id).run():await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)").bind(t.id,n,i||"").run(),e.json({success:!0})});He.post("/api/admin/api-settings/openai",_,async e=>{const{openai_key:t,openai_model:s}=await e.req.json();if(t&&!t.includes("•")){const a=await me(t.trim(),e.env.ENCRYPTION_KEY);await mt(e,"openai_api_key",a,"OpenAI API Key (AES暗号化)")}return s&&await mt(e,"openai_model",s,"OpenAI モデル名"),e.json({success:!0})});He.post("/api/admin/api-settings/telegram",_,async e=>{const{telegram_token:t,telegram_chat_id:s}=await e.req.json();if(t&&!t.includes("•")){const a=await me(t.trim(),e.env.ENCRYPTION_KEY);await mt(e,"telegram_bot_token",a,"Telegram Bot Token (AES暗号化)")}return s&&await mt(e,"telegram_chat_id",s,"Telegram Chat ID"),e.json({success:!0})});He.post("/api/admin/api-settings/:kind/test",_,async e=>{const t=e.req.param("kind"),s=e.get("user");try{if(t==="x"){const a=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(s.id).first();if(!(a!=null&&a.api_key))return e.json({success:!1,error:"X API Key 未設定"});const n=await dt(a.api_key,e.env.ENCRYPTION_KEY);return e.json({success:!!n,message:n?"Consumer Key 正常に復号できました":"復号失敗"})}if(t==="openai"){const a=await kt(e,"openai_api_key");if(!a)return e.json({success:!1,error:"OpenAI Key 未設定"});const n=await dt(a,e.env.ENCRYPTION_KEY);if(!n)return e.json({success:!1,error:"復号失敗"});const i=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}});return i.ok?e.json({success:!0,message:"OpenAI 接続OK"}):e.json({success:!1,error:`OpenAI API ${i.status}`})}if(t==="telegram"){const a=await kt(e,"telegram_bot_token"),n=await kt(e,"telegram_chat_id");if(!a||!n)return e.json({success:!1,error:"Telegram 未設定"});const i=await dt(a,e.env.ENCRYPTION_KEY);if(!i)return e.json({success:!1,error:"復号失敗"});const o=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:n,text:"✅ GE365x-web: Telegram 接続テスト成功"})})).json();return o!=null&&o.ok?e.json({success:!0,message:"Telegram 送信成功"}):e.json({success:!1,error:(o==null?void 0:o.description)||"Telegram 送信失敗"})}return e.json({success:!1,error:"unknown kind"},400)}catch(a){return e.json({success:!1,error:(a==null?void 0:a.message)||String(a)})}});async function mt(e,t,s,a){await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s,a).run()}async function kt(e,t){const s=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(t).first();return(s==null?void 0:s.value)||null}async function dt(e,t){try{return await Dt(e,t)}catch{return""}}const N=new D;function is(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}function W(e,t){const a=e.map(is).join(","),n=t.map(i=>e.map(r=>is(i[r])).join(","));return"\uFEFF"+a+`
`+n.join(`
`)}function Y(e,t){return new Response(e,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function Xs(e,t){return new Response(JSON.stringify(e,null,2),{headers:{"content-type":"application/json; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function P(){const e=new Date,t=s=>String(s).padStart(2,"0");return`${e.getFullYear()}${t(e.getMonth()+1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`}N.get("/api/admin/export/posts",_,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("month");let n="WHERE pq.platform='x' AND pq.user_id = ?";const i=[t.id];s&&s!=="all"&&(n+=" AND pq.status = ?",i.push(s)),a&&(n+=" AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?",i.push(a));const{results:r}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${n} ORDER BY pq.id DESC LIMIT 10000`).bind(...i).all(),c=W(["id","body","link_url","hashtags","post_mode","status","account_name","x_username","generation_type","source_type","pattern_type","scheduled_at","effective_scheduled_at","posted_at","external_post_id","error_message","recurrence_type","recurrence_rule","thread_parent_id","thread_order","thread_count","media_type","jitter_enabled","jitter_minutes","created_at","updated_at"],r||[]);return Y(c,`ge365x_posts_${P()}.csv`)});N.get("/api/admin/export/logs",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","record_id","account_name","platform","source_type","generation_type","post_mode","content","content_hash","link_url","media_type","media_upload_status","media_id","thread_parent_id","thread_order","thread_total_count","scheduled_at","executed_at","posted_at","status","error_message","api_response_summary","created_at"],s||[]);return Y(n,`ge365x_post_logs_${P()}.csv`)});N.get("/api/admin/export/generations",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","brand_voice_id","target_setting_id","post_mode","generation_type","output_text","created_at"],s||[]);return Y(n,`ge365x_generation_logs_${P()}.csv`)});N.get("/api/admin/export/autopilot",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","reservation_no","account_id","account_name","x_username","channel_type","content_mode","theme","keywords","prompt_text","title_memo","link_url","generate_at","publish_at","status","generated_post_id","external_post_id","error_message","created_at","updated_at"],s||[]);return Y(n,`ge365x_autopilot_${P()}.csv`)});N.get("/api/admin/export/drafts",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`).bind(t.id).all(),n=W(["id","account_id","title","body","link_url","hashtags","post_mode","created_at","updated_at"],s||[]);return Y(n,`ge365x_drafts_${P()}.csv`)});N.get("/api/admin/export/kpi",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","metric_date","posts_sent","posts_failed","impressions","engagements","followers_gained","created_at","updated_at"],s||[]);return Y(n,`ge365x_kpi_${P()}.csv`)});N.get("/api/admin/export/accounts",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_name","x_user_id","x_username","daily_post_count","daily_post_limit","last_posted_at","account_health_score","health_status","is_active","is_current","last_daily_reset_date","created_at","updated_at"],s||[]);return Y(n,`ge365x_accounts_${P()}.csv`)});N.get("/api/admin/export/targets",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","template_key","label","age_range","gender","genre","occupation","pains","desires","purchase_triggers","problem","goal","knowledge","is_default"],s||[]);return Y(n,`ge365x_targets_${P()}.csv`)});N.get("/api/admin/export/voices",_,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","voice_key","label","tone","worldview","personal_story","prohibited_words","sample_posts","is_default"],s||[]);return Y(n,`ge365x_voices_${P()}.csv`)});N.get("/api/admin/export/all",_,async e=>{const t=e.get("user"),s=t.id,[a,n,i,r,o,c,d,l,p]=await Promise.all([e.env.DB.prepare(`SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`).bind(s).all(),e.env.DB.prepare("SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000").bind(s).all(),e.env.DB.prepare("SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(s).all(),e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC").bind(s).all(),e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC").bind(s).all()]),m={exported_at:new Date().toISOString(),user:{id:t.id,email:t.email},posts:a.results||[],post_logs:n.results||[],generation_logs:i.results||[],autopilot_jobs:r.results||[],drafts:o.results||[],kpi_metrics:c.results||[],x_accounts:d.results||[],target_templates:l.results||[],brand_voices:p.results||[]};return Xs(m,`ge365x_all_data_${P()}.json`)});N.get("/api/admin/export/admin/users",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`).all(),a=W(["id","email","is_approved","is_admin","trial_start","trial_end","created_at","updated_at","plan_code","sub_status","current_period_end"],t||[]);return Y(a,`ge365x_admin_users_${P()}.csv`)});N.get("/api/admin/export/admin/licenses",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`).all(),a=W(["id","license_key","license_type","plan_code","user_id","user_email","is_active","activated_at","expires_at","issued_by","note","created_at","updated_at"],t||[]);return Y(a,`ge365x_admin_licenses_${P()}.csv`)});N.get("/api/admin/export/admin/subs",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`).all(),a=W(["id","user_id","user_email","plan_code","status","started_at","current_period_end","cancel_at_period_end","updated_at"],t||[]);return Y(a,`ge365x_admin_subs_${P()}.csv`)});N.get("/api/admin/export/admin/audit",_,R,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(),a=W(["id","user_id","email","event_type","ip_address","user_agent","metadata","created_at"],t||[]);return Y(a,`ge365x_admin_audit_${P()}.csv`)});N.get("/api/admin/export/admin/all",_,R,async e=>{const[t,s,a,n,i,r,o]=await Promise.all([e.env.DB.prepare(`SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
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
         FROM x_accounts ORDER BY id DESC LIMIT 10000`).all()]),c={exported_at:new Date().toISOString(),users:t.results||[],user_subscriptions:s.results||[],licenses:a.results||[],auth_logs:n.results||[],post_queue:i.results||[],post_logs:r.results||[],x_accounts:o.results||[]};return Xs(c,`ge365x_admin_all_${P()}.json`)});const T=new D;T.use("/static/*",Ua({root:"./",manifest:{}}));T.get("/healthz",e=>e.json({ok:!0,service:"ge365x-web",time:new Date().toISOString()}));T.route("/",Os);T.route("/",H);T.route("/",q);T.route("/",De);T.route("/",fe);T.route("/",be);T.route("/",U);T.route("/",Vs);T.route("/",ge);T.route("/",tt);T.route("/",st);T.route("/",at);T.route("/",Pt);T.route("/",gt);T.route("/",vt);T.route("/",Et);T.route("/",He);T.route("/",N);T.notFound(e=>e.json({error:"not_found",path:e.req.path},404));T.onError((e,t)=>(console.error("[ge365x-web] error:",e),t.json({error:"internal_error",message:e.message},500)));const Hn={fetch:T.fetch,async scheduled(e,t,s){const a=e.cron;(!a||a==="*/1 * * * *")&&s.waitUntil(T.fetch(new Request("https://internal/cron/tick",{method:"POST"}),t,s).catch(n=>console.error("[tick]",n))),a==="*/5 * * * *"&&s.waitUntil(T.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}),t,s).catch(n=>console.error("[autopilot-tick]",n)))}},rs=new D,Un=Object.assign({"/src/index.tsx":Hn});let Gs=!1;for(const[,e]of Object.entries(Un))e&&(rs.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),rs.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Gs=!0);if(!Gs)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{rs as default};
