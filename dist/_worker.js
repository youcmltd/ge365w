var na=Object.defineProperty;var Jt=e=>{throw TypeError(e)};var ia=(e,t,s)=>t in e?na(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var h=(e,t,s)=>ia(e,typeof t!="symbol"?t+"":t,s),Tt=(e,t,s)=>t.has(e)||Jt("Cannot "+s);var u=(e,t,s)=>(Tt(e,t,"read from private field"),s?s.call(e):t.get(e)),y=(e,t,s)=>t.has(e)?Jt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),_=(e,t,s,a)=>(Tt(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),w=(e,t,s)=>(Tt(e,t,"access private method"),s);var Kt=(e,t,s,a)=>({set _(n){_(e,t,n,s)},get _(){return u(e,t,a)}});var Vt=(e,t,s)=>(a,n)=>{let i=-1;return r(0);async function r(o){if(o<=i)throw new Error("next() called multiple times");i=o;let l,d=!1,c;if(e[o]?(c=e[o][0][0],a.req.routeIndex=o):c=o===e.length&&n||void 0,c)try{l=await c(a,()=>r(o+1))}catch(p){if(p instanceof Error&&t)a.error=p,l=await t(p,a),d=!0;else throw p}else a.finalized===!1&&s&&(l=await s(a));return l&&(a.finalized===!1||d)&&(a.res=l),a}},ra=Symbol(),oa=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,i=(e instanceof xs?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?la(e,{all:s,dot:a}):{}};async function la(e,t){const s=await e.formData();return s?da(s,t):{}}function da(e,t){const s=Object.create(null);return e.forEach((a,n)=>{t.all||n.endsWith("[]")?ca(s,n,a):s[n]=a}),t.dot&&Object.entries(s).forEach(([a,n])=>{a.includes(".")&&(ua(s,a,n),delete s[a])}),s}var ca=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},ua=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let a=e;const n=t.split(".");n.forEach((i,r)=>{r===n.length-1?a[i]=s:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},_s=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},pa=e=>{const{groups:t,path:s}=ma(e),a=_s(s);return fa(a,t)},ma=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const n=`@${a}`;return t.push([n,s]),n}),{groups:t,path:e}},fa=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(a)){e[n]=e[n].replace(a,t[s][1]);break}}return e},ot={},ha=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return ot[a]||(s[2]?ot[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:ot[a]=[e,s[1],!0]),ot[a]}return null},Lt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},gs=e=>Lt(e,decodeURI),bs=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const n=t.charCodeAt(a);if(n===37){const i=t.indexOf("?",a),r=t.indexOf("#",a),o=i===-1?r===-1?void 0:r:r===-1?i:Math.min(i,r),l=t.slice(s,o);return gs(l.includes("%25")?l.replace(/%25/g,"%2525"):l)}else if(n===63||n===35)break}return t.slice(s,a)},_a=e=>{const t=bs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},Be=(e,t,...s)=>(s.length&&(t=Be(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),vs=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))a+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&a===""?s.push("/"):s.push(a);const i=n.replace("?","");a+="/"+i,s.push(a)}else a+="/"+n}),s.filter((n,i,r)=>r.indexOf(n)===i)},At=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Lt(e,Es):e):e,ys=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let r=e.indexOf("?",8);if(r===-1)return;for(e.startsWith(t,r+1)||(r=e.indexOf(`&${t}`,r+1));r!==-1;){const o=e.charCodeAt(r+t.length+1);if(o===61){const l=r+t.length+2,d=e.indexOf("&",l);return At(e.slice(l,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";r=e.indexOf(`&${t}`,r+1)}if(a=/[%+]/.test(e),!a)return}const n={};a??(a=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const r=e.indexOf("&",i+1);let o=e.indexOf("=",i);o>r&&r!==-1&&(o=-1);let l=e.slice(i+1,o===-1?r===-1?void 0:r:o);if(a&&(l=At(l)),i=r,l==="")continue;let d;o===-1?d="":(d=e.slice(o+1,r===-1?void 0:r),a&&(d=At(d))),s?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},ga=ys,ba=(e,t)=>ys(e,t,!0),Es=decodeURIComponent,Xt=e=>Lt(e,Es),Ne,z,oe,ws,ks,Ot,de,cs,xs=(cs=class{constructor(e,t="/",s=[[]]){y(this,oe);h(this,"raw");y(this,Ne);y(this,z);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});y(this,de,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,_(this,z,s),_(this,Ne,{})}param(e){return e?w(this,oe,ws).call(this,e):w(this,oe,ks).call(this)}query(e){return ga(this.url,e)}queries(e){return ba(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){return oa(this,e)}json(){return u(this,de).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,de).call(this,"text")}arrayBuffer(){return u(this,de).call(this,"arrayBuffer")}blob(){return u(this,de).call(this,"blob")}formData(){return u(this,de).call(this,"formData")}addValidatedData(e,t){u(this,Ne)[e]=t}valid(e){return u(this,Ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ra](){return u(this,z)}get matchedRoutes(){return u(this,z)[0].map(([[,e]])=>e)}get routePath(){return u(this,z)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ne=new WeakMap,z=new WeakMap,oe=new WeakSet,ws=function(e){const t=u(this,z)[0][this.routeIndex][1][e],s=w(this,oe,Ot).call(this,t);return s&&/\%/.test(s)?Xt(s):s},ks=function(){const e={},t=Object.keys(u(this,z)[0][this.routeIndex][1]);for(const s of t){const a=w(this,oe,Ot).call(this,u(this,z)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?Xt(a):a)}return e},Ot=function(e){return u(this,z)[1]?u(this,z)[1][e]:e},de=new WeakMap,cs),va={Stringify:1},Ss=async(e,t,s,a,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(o=>o({phase:t,buffer:n,context:a}))).then(o=>Promise.all(o.filter(Boolean).map(l=>Ss(l,t,!1,a,n))).then(()=>n[0]))):Promise.resolve(e)},ya="text/plain; charset=UTF-8",Dt=(e,t)=>({"Content-Type":e,...t}),ze=(e,t)=>new Response(e,t),Ze,Qe,te,Me,se,M,et,$e,Fe,xe,tt,st,ce,Ce,us,Ea=(us=class{constructor(e,t){y(this,ce);y(this,Ze);y(this,Qe);h(this,"env",{});y(this,te);h(this,"finalized",!1);h(this,"error");y(this,Me);y(this,se);y(this,M);y(this,et);y(this,$e);y(this,Fe);y(this,xe);y(this,tt);y(this,st);h(this,"render",(...e)=>(u(this,$e)??_(this,$e,t=>this.html(t)),u(this,$e).call(this,...e)));h(this,"setLayout",e=>_(this,et,e));h(this,"getLayout",()=>u(this,et));h(this,"setRenderer",e=>{_(this,$e,e)});h(this,"header",(e,t,s)=>{this.finalized&&_(this,M,ze(u(this,M).body,u(this,M)));const a=u(this,M)?u(this,M).headers:u(this,xe)??_(this,xe,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});h(this,"status",e=>{_(this,Me,e)});h(this,"set",(e,t)=>{u(this,te)??_(this,te,new Map),u(this,te).set(e,t)});h(this,"get",e=>u(this,te)?u(this,te).get(e):void 0);h(this,"newResponse",(...e)=>w(this,ce,Ce).call(this,...e));h(this,"body",(e,t,s)=>w(this,ce,Ce).call(this,e,t,s));h(this,"text",(e,t,s)=>!u(this,xe)&&!u(this,Me)&&!t&&!s&&!this.finalized?new Response(e):w(this,ce,Ce).call(this,e,t,Dt(ya,s)));h(this,"json",(e,t,s)=>w(this,ce,Ce).call(this,JSON.stringify(e),t,Dt("application/json",s)));h(this,"html",(e,t,s)=>{const a=n=>w(this,ce,Ce).call(this,n,t,Dt("text/html; charset=UTF-8",s));return typeof e=="object"?Ss(e,va.Stringify,!1,{}).then(a):a(e)});h(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});h(this,"notFound",()=>(u(this,Fe)??_(this,Fe,()=>ze()),u(this,Fe).call(this,this)));_(this,Ze,e),t&&(_(this,se,t.executionCtx),this.env=t.env,_(this,Fe,t.notFoundHandler),_(this,st,t.path),_(this,tt,t.matchResult))}get req(){return u(this,Qe)??_(this,Qe,new xs(u(this,Ze),u(this,st),u(this,tt))),u(this,Qe)}get event(){if(u(this,se)&&"respondWith"in u(this,se))return u(this,se);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,se))return u(this,se);throw Error("This context has no ExecutionContext")}get res(){return u(this,M)||_(this,M,ze(null,{headers:u(this,xe)??_(this,xe,new Headers)}))}set res(e){if(u(this,M)&&e){e=ze(e.body,e);for(const[t,s]of u(this,M).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=u(this,M).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of a)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}_(this,M,e),this.finalized=!0}get var(){return u(this,te)?Object.fromEntries(u(this,te)):{}}},Ze=new WeakMap,Qe=new WeakMap,te=new WeakMap,Me=new WeakMap,se=new WeakMap,M=new WeakMap,et=new WeakMap,$e=new WeakMap,Fe=new WeakMap,xe=new WeakMap,tt=new WeakMap,st=new WeakMap,ce=new WeakSet,Ce=function(e,t,s){const a=u(this,M)?new Headers(u(this,M).headers):u(this,xe)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[r,o]of i)r.toLowerCase()==="set-cookie"?a.append(r,o):a.set(r,o)}if(s)for(const[i,r]of Object.entries(s))if(typeof r=="string")a.set(i,r);else{a.delete(i);for(const o of r)a.append(i,o)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Me);return ze(e,{status:n,headers:a})},us),O="ALL",xa="all",wa=["get","post","put","delete","options","patch"],Ts="Can not add a route since the matcher is already built.",As=class extends Error{},ka="__COMPOSED_HANDLER",Sa=e=>e.text("404 Not Found",404),Gt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},K,R,Ds,V,ye,lt,dt,Pe,Ta=(Pe=class{constructor(t={}){y(this,R);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");y(this,K,"/");h(this,"routes",[]);y(this,V,Sa);h(this,"errorHandler",Gt);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(_(this,V,t),this));h(this,"fetch",(t,...s)=>w(this,R,dt).call(this,t,s[1],s[0],t.method));h(this,"request",(t,s,a,n)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Be("/",t)}`,s),a,n)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(w(this,R,dt).call(this,t.request,t,void 0,t.request.method))})});[...wa,xa].forEach(i=>{this[i]=(r,...o)=>(typeof r=="string"?_(this,K,r):w(this,R,ye).call(this,i,u(this,K),r),o.forEach(l=>{w(this,R,ye).call(this,i,u(this,K),l)}),this)}),this.on=(i,r,...o)=>{for(const l of[r].flat()){_(this,K,l);for(const d of[i].flat())o.map(c=>{w(this,R,ye).call(this,d.toUpperCase(),u(this,K),c)})}return this},this.use=(i,...r)=>(typeof i=="string"?_(this,K,i):(_(this,K,"*"),r.unshift(i)),r.forEach(o=>{w(this,R,ye).call(this,O,u(this,K),o)}),this);const{strict:a,...n}=t;Object.assign(this,n),this.getPath=a??!0?t.getPath??bs:_a}route(t,s){const a=this.basePath(t);return s.routes.map(n=>{var r;let i;s.errorHandler===Gt?i=n.handler:(i=async(o,l)=>(await Vt([],s.errorHandler)(o,()=>n.handler(o,l))).res,i[ka]=n.handler),w(r=a,R,ye).call(r,n.method,n.path,i)}),this}basePath(t){const s=w(this,R,Ds).call(this);return s._basePath=Be(this._basePath,t),s}mount(t,s,a){let n,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?n=l=>l:n=a.replaceRequest));const r=i?l=>{const d=i(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=Be(this._basePath,t),d=l==="/"?0:l.length;return c=>{const p=new URL(c.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,c)}})());const o=async(l,d)=>{const c=await s(n(l.req.raw),...r(l));if(c)return c;await d()};return w(this,R,ye).call(this,O,Be(t,"*"),o),this}},K=new WeakMap,R=new WeakSet,Ds=function(){const t=new Pe({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,_(t,V,u(this,V)),t.routes=this.routes,t},V=new WeakMap,ye=function(t,s,a){t=t.toUpperCase(),s=Be(this._basePath,s);const n={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},lt=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},dt=function(t,s,a,n){if(n==="HEAD")return(async()=>new Response(null,await w(this,R,dt).call(this,t,s,a,"GET")))();const i=this.getPath(t,{env:a}),r=this.router.match(n,i),o=new Ea(t,{path:i,matchResult:r,env:a,executionCtx:s,notFoundHandler:u(this,V)});if(r[0].length===1){let d;try{d=r[0][0][0][0](o,async()=>{o.res=await u(this,V).call(this,o)})}catch(c){return w(this,R,lt).call(this,c,o)}return d instanceof Promise?d.then(c=>c||(o.finalized?o.res:u(this,V).call(this,o))).catch(c=>w(this,R,lt).call(this,c,o)):d??u(this,V).call(this,o)}const l=Vt(r[0],this.errorHandler,u(this,V));return(async()=>{try{const d=await l(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return w(this,R,lt).call(this,d,o)}})()},Pe),Is=[];function Aa(e,t){const s=this.buildAllMatchers(),a=((n,i)=>{const r=s[n]||s[O],o=r[2][i];if(o)return o;const l=i.match(r[0]);if(!l)return[[],Is];const d=l.indexOf("",1);return[r[1][d],l]});return this.match=a,a(e,t)}var mt="[^/]+",Ke=".*",Ve="(?:|/.*)",Le=Symbol(),Da=new Set(".\\+*[^]$()");function Ia(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ke||e===Ve?1:t===Ke||t===Ve?-1:e===mt?1:t===mt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var we,ke,X,Ae,Oa=(Ae=class{constructor(){y(this,we);y(this,ke);y(this,X,Object.create(null))}insert(t,s,a,n,i){if(t.length===0){if(u(this,we)!==void 0)throw Le;if(i)return;_(this,we,s);return}const[r,...o]=t,l=r==="*"?o.length===0?["","",Ke]:["","",mt]:r==="/*"?["","",Ve]:r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let p=l[2]||mt;if(c&&l[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw Le;if(d=u(this,X)[p],!d){if(Object.keys(u(this,X)).some(f=>f!==Ke&&f!==Ve))throw Le;if(i)return;d=u(this,X)[p]=new Ae,c!==""&&_(d,ke,n.varIndex++)}!i&&c!==""&&a.push([c,u(d,ke)])}else if(d=u(this,X)[r],!d){if(Object.keys(u(this,X)).some(c=>c.length>1&&c!==Ke&&c!==Ve))throw Le;if(i)return;d=u(this,X)[r]=new Ae}d.insert(o,s,a,n,i)}buildRegExpStr(){const s=Object.keys(u(this,X)).sort(Ia).map(a=>{const n=u(this,X)[a];return(typeof u(n,ke)=="number"?`(${a})@${u(n,ke)}`:Da.has(a)?`\\${a}`:a)+n.buildRegExpStr()});return typeof u(this,we)=="number"&&s.unshift(`#${u(this,we)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},we=new WeakMap,ke=new WeakMap,X=new WeakMap,Ae),gt,at,ps,Ra=(ps=class{constructor(){y(this,gt,{varIndex:0});y(this,at,new Oa)}insert(e,t,s){const a=[],n=[];for(let r=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${r}`;return n[r]=[d,l],r++,o=!0,d}),!o)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let r=n.length-1;r>=0;r--){const[o]=n[r];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(o)!==-1){i[l]=i[l].replace(o,n[r][1]);break}}return u(this,at).insert(i,t,a,u(this,gt),s),a}buildRegExp(){let e=u(this,at).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,r)=>i!==void 0?(s[++t]=Number(i),"$()"):(r!==void 0&&(a[Number(r)]=++t),"")),[new RegExp(`^${e}`),s,a]}},gt=new WeakMap,at=new WeakMap,ps),ja=[/^$/,[],Object.create(null)],ct=Object.create(null);function Os(e){return ct[e]??(ct[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Ba(){ct=Object.create(null)}function Ca(e){var d;const t=new Ra,s=[];if(e.length===0)return ja;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,p],[f,b])=>c?1:f?-1:p.length-b.length),n=Object.create(null);for(let c=0,p=-1,f=a.length;c<f;c++){const[b,v,T]=a[c];b?n[v]=[T.map(([A])=>[A,Object.create(null)]),Is]:p++;let x;try{x=t.insert(v,p,b)}catch(A){throw A===Le?new As(v):A}b||(s[p]=T.map(([A,k])=>{const L=Object.create(null);for(k-=1;k>=0;k--){const[q,N]=x[k];L[q]=N}return[A,L]}))}const[i,r,o]=t.buildRegExp();for(let c=0,p=s.length;c<p;c++)for(let f=0,b=s[c].length;f<b;f++){const v=(d=s[c][f])==null?void 0:d[1];if(!v)continue;const T=Object.keys(v);for(let x=0,A=T.length;x<A;x++)v[T[x]]=o[v[T[x]]]}const l=[];for(const c in r)l[c]=s[r[c]];return[i,l,n]}function je(e,t){if(e){for(const s of Object.keys(e).sort((a,n)=>n.length-a.length))if(Os(s).test(t))return[...e[s]]}}var ue,pe,bt,Rs,ms,La=(ms=class{constructor(){y(this,bt);h(this,"name","RegExpRouter");y(this,ue);y(this,pe);h(this,"match",Aa);_(this,ue,{[O]:Object.create(null)}),_(this,pe,{[O]:Object.create(null)})}add(e,t,s){var o;const a=u(this,ue),n=u(this,pe);if(!a||!n)throw new Error(Ts);a[e]||[a,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[O]).forEach(d=>{l[e][d]=[...l[O][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Os(t);e===O?Object.keys(a).forEach(d=>{var c;(c=a[d])[t]||(c[t]=je(a[d],t)||je(a[O],t)||[])}):(o=a[e])[t]||(o[t]=je(a[e],t)||je(a[O],t)||[]),Object.keys(a).forEach(d=>{(e===O||e===d)&&Object.keys(a[d]).forEach(c=>{l.test(c)&&a[d][c].push([s,i])})}),Object.keys(n).forEach(d=>{(e===O||e===d)&&Object.keys(n[d]).forEach(c=>l.test(c)&&n[d][c].push([s,i]))});return}const r=vs(t)||[t];for(let l=0,d=r.length;l<d;l++){const c=r[l];Object.keys(n).forEach(p=>{var f;(e===O||e===p)&&((f=n[p])[c]||(f[c]=[...je(a[p],c)||je(a[O],c)||[]]),n[p][c].push([s,i-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,pe)).concat(Object.keys(u(this,ue))).forEach(t=>{e[t]||(e[t]=w(this,bt,Rs).call(this,t))}),_(this,ue,_(this,pe,void 0)),Ba(),e}},ue=new WeakMap,pe=new WeakMap,bt=new WeakSet,Rs=function(e){const t=[];let s=e===O;return[u(this,ue),u(this,pe)].forEach(a=>{const n=a[e]?Object.keys(a[e]).map(i=>[i,a[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==O&&t.push(...Object.keys(a[O]).map(i=>[i,a[O][i]]))}),s?Ca(t):null},ms),me,ae,fs,Na=(fs=class{constructor(e){h(this,"name","SmartRouter");y(this,me,[]);y(this,ae,[]);_(this,me,e.routers)}add(e,t,s){if(!u(this,ae))throw new Error(Ts);u(this,ae).push([e,t,s])}match(e,t){if(!u(this,ae))throw new Error("Fatal error");const s=u(this,me),a=u(this,ae),n=s.length;let i=0,r;for(;i<n;i++){const o=s[i];try{for(let l=0,d=a.length;l<d;l++)o.add(...a[l]);r=o.match(e,t)}catch(l){if(l instanceof As)continue;throw l}this.match=o.match.bind(o),_(this,me,[o]),_(this,ae,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,r}get activeRouter(){if(u(this,ae)||u(this,me).length!==1)throw new Error("No active router has been determined yet.");return u(this,me)[0]}},me=new WeakMap,ae=new WeakMap,fs),Je=Object.create(null),Ma=e=>{for(const t in e)return!0;return!1},fe,B,Se,qe,j,ne,Ee,He,$a=(He=class{constructor(t,s,a){y(this,ne);y(this,fe);y(this,B);y(this,Se);y(this,qe,0);y(this,j,Je);if(_(this,B,a||Object.create(null)),_(this,fe,[]),t&&s){const n=Object.create(null);n[t]={handler:s,possibleKeys:[],score:0},_(this,fe,[n])}_(this,Se,[])}insert(t,s,a){_(this,qe,++Kt(this,qe)._);let n=this;const i=pa(s),r=[];for(let o=0,l=i.length;o<l;o++){const d=i[o],c=i[o+1],p=ha(d,c),f=Array.isArray(p)?p[0]:d;if(f in u(n,B)){n=u(n,B)[f],p&&r.push(p[1]);continue}u(n,B)[f]=new He,p&&(u(n,Se).push(p),r.push(p[1])),n=u(n,B)[f]}return u(n,fe).push({[t]:{handler:a,possibleKeys:r.filter((o,l,d)=>d.indexOf(o)===l),score:u(this,qe)}}),n}search(t,s){var c;const a=[];_(this,j,Je);let i=[this];const r=_s(s),o=[],l=r.length;let d=null;for(let p=0;p<l;p++){const f=r[p],b=p===l-1,v=[];for(let x=0,A=i.length;x<A;x++){const k=i[x],L=u(k,B)[f];L&&(_(L,j,u(k,j)),b?(u(L,B)["*"]&&w(this,ne,Ee).call(this,a,u(L,B)["*"],t,u(k,j)),w(this,ne,Ee).call(this,a,L,t,u(k,j))):v.push(L));for(let q=0,N=u(k,Se).length;q<N;q++){const rt=u(k,Se)[q],Q=u(k,j)===Je?{}:{...u(k,j)};if(rt==="*"){const Oe=u(k,B)["*"];Oe&&(w(this,ne,Ee).call(this,a,Oe,t,u(k,j)),_(Oe,j,Q),v.push(Oe));continue}const[aa,zt,We]=rt;if(!f&&!(We instanceof RegExp))continue;const ee=u(k,B)[aa];if(We instanceof RegExp){if(d===null){d=new Array(l);let Re=s[0]==="/"?1:0;for(let Ye=0;Ye<l;Ye++)d[Ye]=Re,Re+=r[Ye].length+1}const Oe=s.substring(d[p]),St=We.exec(Oe);if(St){if(Q[zt]=St[0],w(this,ne,Ee).call(this,a,ee,t,u(k,j),Q),Ma(u(ee,B))){_(ee,j,Q);const Re=((c=St[0].match(/\//))==null?void 0:c.length)??0;(o[Re]||(o[Re]=[])).push(ee)}continue}}(We===!0||We.test(f))&&(Q[zt]=f,b?(w(this,ne,Ee).call(this,a,ee,t,Q,u(k,j)),u(ee,B)["*"]&&w(this,ne,Ee).call(this,a,u(ee,B)["*"],t,Q,u(k,j))):(_(ee,j,Q),v.push(ee)))}}const T=o.shift();i=T?v.concat(T):v}return a.length>1&&a.sort((p,f)=>p.score-f.score),[a.map(({handler:p,params:f})=>[p,f])]}},fe=new WeakMap,B=new WeakMap,Se=new WeakMap,qe=new WeakMap,j=new WeakMap,ne=new WeakSet,Ee=function(t,s,a,n,i){for(let r=0,o=u(s,fe).length;r<o;r++){const l=u(s,fe)[r],d=l[a]||l[O],c={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),n!==Je||i&&i!==Je))for(let p=0,f=d.possibleKeys.length;p<f;p++){const b=d.possibleKeys[p],v=c[d.score];d.params[b]=i!=null&&i[b]&&!v?i[b]:n[b]??(i==null?void 0:i[b]),c[d.score]=!0}}},He),Te,hs,Fa=(hs=class{constructor(){h(this,"name","TrieRouter");y(this,Te);_(this,Te,new $a)}add(e,t,s){const a=vs(t);if(a){for(let n=0,i=a.length;n<i;n++)u(this,Te).insert(e,a[n],s);return}u(this,Te).insert(e,t,s)}match(e,t){return u(this,Te).search(e,t)}},Te=new WeakMap,hs),D=class extends Ta{constructor(e={}){super(e),this.router=e.router??new Na({routers:[new La,new Fa]})}},Pa=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Zt=(e,t=Ha)=>{const s=/\.([a-zA-Z0-9]+?)$/,a=e.match(s);if(!a)return;let n=t[a[1].toLowerCase()];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},qa={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ha=qa,Ua=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),a=[];for(const n of s)n===".."&&a.length>0&&a.at(-1)!==".."?a.pop():n!=="."&&a.push(n);return a.join("/")||"."},js={br:".br",zstd:".zst",gzip:".gz"},Wa=Object.keys(js),Ya="index.html",za=e=>{const t=e.root??"./",s=e.path,a=e.join??Ua;return async(n,i)=>{var c,p,f,b;if(n.finalized)return i();let r;if(e.path)r=e.path;else try{if(r=gs(n.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}/.test(r))throw new Error}catch{return await((c=e.onNotFound)==null?void 0:c.call(e,n.req.path,n)),i()}let o=a(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(r):r);e.isDir&&await e.isDir(o)&&(o=a(o,Ya));const l=e.getContent;let d=await l(o,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const v=e.mimes&&Zt(o,e.mimes)||Zt(o);if(n.header("Content-Type",v||"application/octet-stream"),e.precompressed&&(!v||Pa.test(v))){const T=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(x=>x.trim()));for(const x of Wa){if(!T.has(x))continue;const A=await l(o+js[x],n);if(A){d=A,n.header("Content-Encoding",x),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((f=e.onFound)==null?void 0:f.call(e,o,n)),n.body(d)}await((b=e.onNotFound)==null?void 0:b.call(e,o,n)),await i()}},Ja=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const n=s[e];if(!n)return null;const i=await a.get(n,{type:"stream"});return i||null},Ka=e=>async function(s,a){return za({...e,getContent:async i=>Ja(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,a)},Va=e=>Ka(e);const G={name:"Growth-engine365X",version:"ver1.00",tagline:"X (Twitter) 自動投稿プラットフォーム",longName:"X (Twitter) 自動投稿プラットフォーム",icon:"fa-bolt"},Xa=`
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
  font-size:.875rem;font-weight:500;font-family:inherit;
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
</style>
`,Ga="bg-paper text-ink min-h-screen font-sans antialiased";function Nt(e,t,s={}){return`<!DOCTYPE html>
<html lang="ja">
<head>
${Xa}
<title>${e} — ${G.name}</title>
</head>
<body class="${s.bodyClass??Ga}">
${t}
</body>
</html>`}const Bs=new D;Bs.get("/login",e=>{const t=`
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
`;return e.html(Nt("ログイン",t))});const ie=new TextEncoder,Cs=new TextDecoder;function Xe(e){let t="";for(let s=0;s<e.length;s++)t+=String.fromCharCode(e[s]);return btoa(t)}function Ge(e){const t=atob(e),s=new Uint8Array(t.length);for(let a=0;a<t.length;a++)s[a]=t.charCodeAt(a);return s}function ut(e){return Xe(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Rt(e){const t="=".repeat((4-e.length%4)%4);return Ge((e+t).replace(/-/g,"+").replace(/_/g,"/"))}function vt(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),t}const Qt=1e5,Za=32;async function yt(e){const t=vt(16),s=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),a=await crypto.subtle.deriveBits({name:"PBKDF2",salt:t,iterations:Qt,hash:"SHA-256"},s,Za*8);return`pbkdf2$${Qt}$${Xe(t)}$${Xe(new Uint8Array(a))}`}async function Mt(e,t){try{const[s,a,n,i]=t.split("$");if(s!=="pbkdf2")return!1;const r=parseInt(a,10),o=Ge(n),l=Ge(i),d=await crypto.subtle.importKey("raw",ie.encode(e),{name:"PBKDF2"},!1,["deriveBits"]),c=new Uint8Array(await crypto.subtle.deriveBits({name:"PBKDF2",salt:o,iterations:r,hash:"SHA-256"},d,l.length*8));return Ls(c,l)}catch{return!1}}function Ls(e,t){if(e.length!==t.length)return!1;let s=0;for(let a=0;a<e.length;a++)s|=e[a]^t[a];return s===0}async function Ns(e){return crypto.subtle.importKey("raw",ie.encode(e),{name:"HMAC",hash:"SHA-256"},!1,["sign","verify"])}async function Ms(e,t,s=3600*24*7){const a=Math.floor(Date.now()/1e3),n={iat:a,exp:a+s,...e},i=ut(ie.encode(JSON.stringify({alg:"HS256",typ:"JWT"}))),r=ut(ie.encode(JSON.stringify(n))),o=`${i}.${r}`,l=await Ns(t),d=new Uint8Array(await crypto.subtle.sign("HMAC",l,ie.encode(o)));return`${o}.${ut(d)}`}async function $s(e,t){try{const[s,a,n]=e.split(".");if(!s||!a||!n)return null;const i=await Ns(t);if(!await crypto.subtle.verify("HMAC",i,Rt(n),ie.encode(`${s}.${a}`)))return null;const o=JSON.parse(Cs.decode(Rt(a)));return o.exp&&o.exp<Math.floor(Date.now()/1e3)?null:o}catch{return null}}async function Fs(e){const t=ie.encode(e),s=t.length>=32?t.slice(0,32):new Uint8Array(await crypto.subtle.digest("SHA-256",t));return crypto.subtle.importKey("raw",s,{name:"AES-GCM"},!1,["encrypt","decrypt"])}async function re(e,t){const s=vt(12),a=await Fs(t),n=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv:s},a,ie.encode(e))),i=new Uint8Array(s.length+n.length);return i.set(s),i.set(n,s.length),Xe(i)}async function ft(e,t){const s=Ge(e),a=s.slice(0,12),n=s.slice(12),i=await Fs(t),r=await crypto.subtle.decrypt({name:"AES-GCM",iv:a},i,n);return Cs.decode(r)}const es="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function jt(e="VPS-GE365X"){const t=vt(8);let s="";for(let a=0;a<8;a++)s+=es[t[a]%es.length];return`${e}-${s}`}function Ps(e){return/^VPS-GE365X-[A-Z0-9]{6,12}$/i.test(e.trim())}function g(){return new Date(Date.now()+324e5).toISOString().replace("T"," ").slice(0,19)}function qs(e,t){const a=(e.headers.get("cookie")||"").split(";").map(n=>n.trim()).find(n=>n.startsWith(t+"="));return a?decodeURIComponent(a.slice(t.length+1)):null}function $t(e,t,s={}){const a=[`${e}=${encodeURIComponent(t)}`];return a.push(`Path=${s.path??"/"}`),s.maxAge!==void 0&&a.push(`Max-Age=${s.maxAge}`),s.httpOnly!==!1&&a.push("HttpOnly"),s.secure!==!1&&a.push("Secure"),a.push(`SameSite=${s.sameSite??"Lax"}`),a.join("; ")}const Hs=Object.freeze(Object.defineProperty({__proto__:null,aesDecrypt:ft,aesEncrypt:re,b64decode:Ge,b64encode:Xe,b64urlDecode:Rt,b64urlEncode:ut,buildSetCookie:$t,generateLicenseKey:jt,getCookie:qs,hashPassword:yt,isValidLicenseKeyFormat:Ps,nowJst:g,randomBytes:vt,signJWT:Ms,timingSafeEqual:Ls,verifyJWT:$s,verifyPassword:Mt},Symbol.toStringTag,{value:"Module"})),Ft="ge365x_session";function Qa(e){const t=e.req.header("Authorization")||e.req.header("authorization");return t&&t.startsWith("Bearer ")?t.slice(7):qs(e.req.raw,Ft)}async function m(e,t){const s=Qa(e);if(!s)return e.json({error:"unauthenticated"},401);const a=await $s(s,e.env.JWT_SECRET);if(!(a!=null&&a.uid))return e.json({error:"invalid_token"},401);const n=await e.env.DB.prepare("SELECT id,email,is_approved,is_admin,trial_start,trial_end FROM users WHERE id = ?").bind(a.uid).first();if(!n)return e.json({error:"user_not_found"},401);if(n.is_approved===0)return e.json({error:"not_approved"},403);const i=await e.env.DB.prepare("SELECT plan_code,status FROM user_subscriptions WHERE user_id = ?").bind(n.id).first(),r={id:n.id,email:n.email,is_admin:n.is_admin===1,is_approved:n.is_approved===1,plan_code:i==null?void 0:i.plan_code,subscription_status:i==null?void 0:i.status};e.set("user",r),await t()}async function I(e,t){const s=e.get("user");if(!s)return e.json({error:"unauthenticated"},401);if(!s.is_admin)return e.json({error:"forbidden"},403);await t()}async function Z(e,t,s={}){const a=e.req.header("cf-connecting-ip")||e.req.header("x-forwarded-for")||"",n=e.req.header("user-agent")||"";await e.env.DB.prepare(`INSERT INTO auth_logs (user_id, email, event_type, ip_address, user_agent, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(s.userId??null,s.email??null,t,a,n,s.metadata?JSON.stringify(s.metadata):null).run()}const en=[{key:"dashboard",label:"ダッシュボード",icon:"fa-gauge-high",path:"/dashboard"},{key:"target",label:"ターゲット設定",icon:"fa-bullseye",path:"/dashboard/target"},{key:"voice",label:"ブランドボイス",icon:"fa-palette",path:"/dashboard/voice"},{key:"pattern",label:"パターン別AI生成",icon:"fa-wand-magic-sparkles",path:"/dashboard/pattern"},{key:"generate",label:"AI生成2",icon:"fa-robot",path:"/dashboard/generate"},{key:"posts",label:"X投稿管理",icon:"fa-brands fa-x-twitter",path:"/dashboard/posts"},{key:"thread",label:"ツリー投稿",icon:"fa-reply",path:"/dashboard/thread"},{key:"scheduled",label:"予約状況",icon:"fa-calendar",path:"/dashboard/scheduled"},{key:"autopilot",label:"オートパイロット",icon:"fa-plane-departure",path:"/dashboard/autopilot"},{key:"accounts",label:"アカウント管理",icon:"fa-users-gear",path:"/dashboard/accounts"},{key:"api",label:"API設定",icon:"fa-key",path:"/dashboard/api"},{key:"export",label:"一括ダウンロード",icon:"fa-download",path:"/dashboard/export"}];function tn(e,t){return`
<aside class="w-56 bg-sidebar flex-shrink-0 flex flex-col">
  <div class="px-4 py-4 border-b border-[#2A3B52]">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-md bg-[#2F4A7A] flex items-center justify-center">
        <i class="fas ${G.icon} text-white text-sm"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white font-bold text-sm truncate">${G.name}</div>
        <div class="text-[10px] text-[#A7B6CE]">${G.version}</div>
      </div>
    </div>
  </div>

  <nav class="flex-1 py-3 overflow-y-auto">
    ${en.map(s=>`
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
</aside>`}function sn(e,t){return`
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
<\/script>`}const an=`
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
      こんにちは！GE365xのAIアシスタントです。投稿の改善・生成・設定についてご質問ください。
    </div>
  </div>
  <div style="padding:.5rem .75rem;border-top:1px solid var(--line);display:flex;gap:.375rem">
    <input type="text" id="chat-input" placeholder="メッセージを入力..." style="flex:1;padding:.4rem .6rem;border:1px solid var(--line);border-radius:.375rem;font-size:.82rem;outline:none;font-family:inherit" onkeydown="if(event.key==='Enter')sendChat()">
    <button onclick="sendChat()" style="padding:.4rem .75rem;background:var(--accent);color:#fff;border:none;border-radius:.375rem;cursor:pointer;font-size:.82rem"><i class="fas fa-paper-plane"></i></button>
  </div>
</div>
<div id="toast-host"></div>
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
`;function nn(e){return`
<div class="min-h-screen flex bg-paper">
  ${tn(e.active,e.user)}

  <main class="flex-1 min-w-0 flex flex-col">
    ${sn(e.accounts,e.currentAccountId)}
    <div class="flex-1 p-6 overflow-y-auto">
      ${e.pageBody}
    </div>
  </main>

  ${an}
</div>`}const he=`
<div class="alert alert-warn">
  <i class="fas fa-triangle-exclamation mt-0.5"></i>
  <div>アカウントが選択されていません。<a href="/dashboard/accounts" class="underline font-semibold">アカウント管理</a>で登録してください。</div>
</div>
`;function E(e){return(e||"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Pt(e){return{pending:'<span class="pill pill-warn">未承認</span>',approved:'<span class="pill pill-blue">承認済</span>',publishing:'<span class="pill pill-blue">送信中</span>',posted:'<span class="pill pill-ok">投稿済</span>',failed:'<span class="pill pill-err">失敗</span>',cancelled:'<span class="pill pill-soft">キャンセル</span>'}[e||""]||`<span class="pill pill-soft">${e||"—"}</span>`}function rn(e){const{stats:t,health:s,recentLogs:a}=e;return`
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
            <div class="text-sm font-semibold text-ink">@${E(n.x_username||n.account_name)}</div>
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
          <div class="text-sm text-ink truncate">${E((n.content||"").slice(0,80))}...</div>
          <div class="text-xs text-ink-muted mt-0.5">@${E(n.x_username||"-")} · ${n.posted_at||"-"}</div>
        </div>
      `).join("")}
    </div>
  </div>
</div>`}function on(e){const t=e.target||{};return`
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
        <input type="text" id="tg-age" class="inp" value="${E(t.age_range)}" placeholder="例: 25~40代">
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
        <input type="text" id="tg-occ" class="inp" value="${E(t.occupation)}" placeholder="例: 会社員 / フリーランス">
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-heart icon-red"></i>痛み・悩み</label>
      <textarea id="tg-pains" class="inp" placeholder="読者が抱えている具体的な悩み・痛みを書く">${E(t.pains)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-star icon-yellow"></i>欲求・願望</label>
      <textarea id="tg-desires" class="inp" placeholder="読者が「こうなりたい」と思っている理想像">${E(t.desires)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-bolt icon-yellow"></i>行動トリガー（反応するきっかけ）</label>
      <textarea id="tg-trigger" class="inp" placeholder="この読者がアクションを起こす瞬間・キーワード">${E(t.purchase_triggers)}</textarea>
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
<\/script>`}function ln(e){const t=e.voice||{},s=[{k:"authority",l:"権威型",t:"専門家として断定的に、簡潔に、根拠を示して書く。"},{k:"empathy",l:"共感型",t:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{k:"provocative",l:"煽り型",t:"問題を鋭く突き、危機感を持たせる書き方にする。"},{k:"story",l:"ストーリー型",t:"体験談や変化の流れを感じさせる構成で書く。"},{k:"problem_raise",l:"問題提起型",t:"最初に課題を提示し、その原因と解決策を示す。"}];return`
<div class="space-y-4">
  <div>
    <h1 class="section-title"><i class="fas fa-palette"></i>ブランドボイス</h1>
    <p class="section-desc">あなたの発信スタイル・口調・世界観を定義します。AI生成時にトーンとして注入されます。</p>
  </div>
  ${e.hasAccount?"":e.noAccountAlert}
  <div class="card">
    <div style="margin-bottom:1.25rem">
      <h3 style="font-size:1rem;font-weight:700;color:var(--ink);margin:0 0 .875rem">ボイスプロファイル</h3>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;padding:.75rem 1rem;background:var(--paper-soft);border-radius:.5rem;border:1px solid var(--line)">
        <span style="font-size:.78rem;color:var(--ink-muted);align-self:center">プリセット→</span>
        ${s.map(a=>`<button style="padding:.45rem 1rem;border-radius:.375rem;background:var(--accent-light);color:var(--accent-hover);border:1px solid rgba(37,99,235,.3);font-size:.85rem;font-weight:600;cursor:pointer;white-space:nowrap" onclick="loadVoicePreset('${a.k}','${a.t.replace(/'/g,"\\'")}')">${a.l}</button>`).join("")}
      </div>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-microphone icon-blue"></i>口調</label>
      <input type="text" id="vc-tone" class="inp" value="${E(t.tone)}" placeholder="例: 専門家として断定的に、簡潔に、根拠を示して書く">
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-globe icon-green"></i>世界観</label>
      <textarea id="vc-world" class="inp" placeholder="あなたが見ている世界、伝えたい価値観">${E(t.worldview)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-book icon-purple"></i>個人ストーリー（任意）</label>
      <textarea id="vc-story" class="inp" placeholder="過去の体験や転機。AI が自然に織り交ぜます">${E(t.personal_story)}</textarea>
    </div>
    <div class="mb-4">
      <label class="field-label"><i class="fas fa-ban icon-red"></i>禁止ワード（改行区切り）</label>
      <textarea id="vc-ng" class="inp" placeholder="絶対に使わないワード">${E(t.prohibited_words)}</textarea>
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
<\/script>`}function dn(e){var s,a,n;const t=[["problem","問題提起型","fa-circle-question"],["before_after","ビフォーアフター型","fa-right-left"],["contrarian","逆張り型","fa-rotate-left"],["howto","HowTo実演型","fa-list-ol"],["numbers","数字インパクト型","fa-hashtag"]];return`
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
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:.5rem" id="patt-grid">
          ${t.map(([i,r,o],l)=>`
            <div onclick="selectPatt(this,'${i}')" data-val="${i}"
              style="display:flex;flex-direction:column;align-items:center;gap:.375rem;padding:.75rem .5rem;border:2px solid ${l===0?"var(--accent)":"var(--line)"};border-radius:.5rem;cursor:pointer;background:${l===0?"var(--accent-light)":"#fff"};color:${l===0?"var(--accent)":"var(--ink)"};transition:all .15s;text-align:center">
              <i class="fas ${o}" style="font-size:1.1rem"></i>
              <span style="font-size:.72rem;font-weight:600;line-height:1.2">${r}</span>
            </div>
          `).join("")}
        </div>
        <input type="hidden" id="patt-val" value="problem">
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
      <div>
        <label class="field-label"><i class="fas fa-photo-film icon-purple"></i>メディア（任意）</label>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
          <label class="btn btn-ghost btn-sm" style="cursor:pointer"><i class="fas fa-image"></i>画像
            <input type="file" id="pa-img" accept="image/*" multiple class="hide" onchange="previewPaMedia(this,'image')">
          </label>
          <label class="btn btn-ghost btn-sm" style="cursor:pointer"><i class="fas fa-video"></i>動画
            <input type="file" id="pa-vid" accept="video/*" class="hide" onchange="previewPaMedia(this,'video')">
          </label>
          <span id="pa-media-name" style="font-size:.78rem;color:var(--ink-muted)"></span>
          <button class="btn btn-danger btn-sm hide" id="pa-media-clear" onclick="clearPaMedia()"><i class="fas fa-times"></i></button>
        </div>
        <div id="pa-media-preview" style="margin-top:.375rem;display:flex;gap:.375rem;flex-wrap:wrap"></div>
      </div>
      <button class="btn btn-primary" onclick="doPatternGenerate()"><i class="fas fa-wand-magic-sparkles"></i>AI生成</button>
    </div>
    <div class="card">
      <h3 class="font-bold text-ink mb-3"><i class="fas fa-circle-info text-accent"></i> 現在の設定</h3>
      <div class="space-y-2 text-sm">
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">ターゲット</div>
          <div class="text-ink">${E(((s=e.target)==null?void 0:s.age_range)||"未設定")} / ${E(((a=e.target)==null?void 0:a.gender)||"-")}</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">ブランドボイス</div>
          <div class="text-ink text-xs">${E((((n=e.voice)==null?void 0:n.tone)||"未設定").slice(0,50))}...</div>
        </div>
        <div class="p-2 bg-paper-soft rounded-md">
          <div class="text-xs text-ink-muted">投稿先アカウント</div>
          <div class="text-ink">${e.currentAcct?"@"+E(e.currentAcct.x_username||e.currentAcct.account_name):"未選択"}</div>
        </div>
      </div>
    </div>
  </div>
  <div id="pa-results"></div>
</div>
<script>
function previewPaMedia(input, type) {
  const files = input.files; if (!files.length) return;
  const prev = document.getElementById('pa-media-preview');
  const name = document.getElementById('pa-media-name');
  const clr = document.getElementById('pa-media-clear');
  if (type === 'image') {
    let html='';
    for(const f of files){html+='<img src="'+URL.createObjectURL(f)+'" style="height:60px;border-radius:4px;border:1px solid var(--line)">';}
    prev.innerHTML=html; name.textContent=files.length+'枚';
  } else {
    prev.innerHTML='<span style="font-size:.78rem;color:var(--ink-muted)"><i class="fas fa-video"></i> '+files[0].name+'</span>';
    name.textContent='動画選択済';
  }
  clr.classList.remove('hide');
}
function clearPaMedia(){
  document.getElementById('pa-img').value='';
  document.getElementById('pa-vid').value='';
  document.getElementById('pa-media-preview').innerHTML='';
  document.getElementById('pa-media-name').textContent='';
  document.getElementById('pa-media-clear').classList.add('hide');
}
function selectPatt(el, val) {
  document.querySelectorAll('#patt-grid > div').forEach(d => {
    d.style.borderColor = 'var(--line)';
    d.style.background = '#fff';
    d.style.color = 'var(--ink)';
  });
  el.style.borderColor = 'var(--accent)';
  el.style.background = 'var(--accent-light)';
  el.style.color = 'var(--accent)';
  document.getElementById('patt-val').value = val;
}
async function doPatternGenerate() {
  const patt = document.getElementById('patt-val').value;
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
<\/script>`}function cn(e){return`
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
<\/script>`}function un(e){const{month:t,y:s,m:a,posts:n,stats:i}=e;return`
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
              <td class="max-w-md"><div class="truncate">${E((r.body||"").slice(0,80))}</div></td>
              <td>${r.post_mode==="140"?"140文字":r.post_mode==="thread"?"スレッド":"フル文章"}</td>
              <td>${Pt(r.status)}</td>
              <td class="text-xs">@${E(r.x_username||"-")}</td>
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
<\/script>`}function pn(e){return`
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
      ${mn(1)}
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
        <div class="text-xs text-ink-muted mb-1">Parent: <span class="font-mono text-accent">${t.thread_parent_id||"-"}</span> ${Pt(t.status)}</div>
        <div class="text-sm whitespace-pre-line">${E((t.body||"").slice(0,200))}</div>
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
<\/script>`}function mn(e){return`
    <div class="reply-item">
      <div class="flex items-center justify-between mb-1">
        <label class="text-sm font-semibold text-accent">返信 ${e}</label>
      </div>
      <textarea class="inp th-reply" placeholder="返信${e}の本文を入力" maxlength="280"></textarea>
    </div>`}function fn(e){const t=JSON.stringify(e.scheduled||[]).replace(/`/g,"\\`").replace(/<\/script>/gi,"<\\/script>");return`
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
  ${e.hasAccount?"":e.noAccountAlert}

  <!-- カレンダービュー -->
  <div id="sc-cal-view">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem">
      <button class="btn btn-ghost btn-sm" onclick="prevMonth()"><i class="fas fa-chevron-left"></i></button>
      <span id="sc-month-label" style="font-size:1rem;font-weight:700;min-width:7rem;text-align:center"></span>
      <button class="btn btn-ghost btn-sm" onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
      <button class="btn btn-subtle btn-sm" onclick="goToday()">今日</button>
    </div>
    <div style="background:#fff;border:1px solid var(--line);border-radius:.75rem;overflow:hidden">
      <div style="display:grid;grid-template-columns:repeat(7,1fr);background:var(--paper-soft);border-bottom:1px solid var(--line)">
        ${["日","月","火","水","木","金","土"].map((s,a)=>`
          <div style="padding:.5rem;text-align:center;font-size:.75rem;font-weight:600;color:${a===0?"#ef4444":a===6?"#2563EB":"var(--ink-muted)"}">${s}</div>
        `).join("")}
      </div>
      <div id="sc-cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr)"></div>
    </div>
  </div>

  <!-- 一覧ビュー -->
  <div id="sc-list-view" style="display:none">
    <div class="card" style="padding:0">
      <table class="data">
        <thead><tr><th>予約日時</th><th>アカウント</th><th>本文</th><th>状態</th><th></th></tr></thead>
        <tbody id="sc-list-body">
          ${e.scheduled.length===0?'<tr><td colspan="5" style="text-align:center;color:var(--ink-muted);padding:2.5rem">予約なし</td></tr>':e.scheduled.map(s=>`
              <tr>
                <td style="font-size:.75rem;font-family:monospace">${s.scheduled_at||"-"}</td>
                <td style="font-size:.75rem">@${E(s.x_username||"-")}</td>
                <td style="font-size:.75rem;max-width:20rem"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${E((s.body||"").slice(0,80))}</div></td>
                <td>${Pt(s.status)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="cancelPost(${s.id})"><i class="fas fa-xmark"></i></button></td>
              </tr>
            `).join("")}
        </tbody>
      </table>
    </div>
  </div>
</div>
<script>
(function(){
  const SCHEDULED = ${t};
  let curYear, curMonth;
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

    // 予約をdateにグループ化
    const byDate = {};
    SCHEDULED.forEach(p => {
      const d = (p.scheduled_at||'').slice(0,10);
      if (!byDate[d]) byDate[d] = [];
      byDate[d].push(p);
    });

    let html = '';
    let day = 1 - startDow;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        const isCurrentMonth = day >= 1 && day <= lastDay;
        const dateStr = isCurrentMonth ? curYear+'-'+String(curMonth+1).padStart(2,'0')+'-'+String(day).padStart(2,'0') : '';
        const isToday = dateStr === todayStr;
        const posts = byDate[dateStr] || [];
        const textColor = col===0?'#ef4444':col===6?'#2563EB':'var(--ink)';
        html += '<div style="min-height:5.5rem;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:.375rem;background:' + (isToday?'#EFF6FF':'#fff') + '">';
        if (isCurrentMonth) {
          html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">';
          html += '<span style="font-size:.8rem;font-weight:'+(isToday?'700':'400')+';color:'+textColor+'">' + day + '</span>';
          html += '<button onclick="openApFromCal('' + dateStr + '')" style="width:18px;height:18px;border-radius:50%;background:var(--paper-soft);border:1px solid var(--line);cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;padding:0;color:var(--ink-muted)" title="オートパイロット追加">+</button>';
          html += '</div>';
          posts.slice(0,3).forEach(p => {
            const color = p.status==='posted'?'#065F46':p.status==='failed'?'#991B1B':'#1D4ED8';
            const bg = p.status==='posted'?'#ECFDF5':p.status==='failed'?'#FEF2F2':'#EFF6FF';
            html += '<div style="background:'+bg+';color:'+color+';font-size:.65rem;padding:2px 4px;border-radius:3px;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+((p.body||'').replace(/"/g,"&quot;")).slice(0,80)+'">' + ((p.body||'').slice(0,18)||'投稿') + '</div>';
          });
          if (posts.length > 3) html += '<div style="font-size:.65rem;color:var(--ink-muted)">+' + (posts.length-3) + '件</div>';
        }
        html += '</div>';
        day++;
      }
      if (day > lastDay && row >= 3) break;
    }
    grid.innerHTML = html;
  }

  window.prevMonth = function() { curMonth--; if(curMonth<0){curMonth=11;curYear--;} buildCalendar(); };
  window.nextMonth = function() { curMonth++; if(curMonth>11){curMonth=0;curYear++;} buildCalendar(); };
  window.goToday = function() { const n=new Date(); curYear=n.getFullYear(); curMonth=n.getMonth(); buildCalendar(); };
  window.cancelPost = function(id) {
    if(!confirm('この予約をキャンセルしますか？')) return;
    fetch('/api/admin/posts/'+id+'/cancel',{method:'POST'}).then(r=>r.json()).then(j=>{
      if(j.success||j.ok) { toast('キャンセルしました','ok'); setTimeout(()=>location.reload(),800); }
      else toast('失敗: '+(j.error||''),'err');
    });
  };

  window.openApFromCal = function(dateStr) {
    // オートパイロットページのモーダルを開く（同ページ内にある場合）
    const modal = document.getElementById('ap-modal');
    if (modal) {
      // 日付をgenerate_atとpublish_atに設定
      const genEl = document.getElementById('ap-generate-at');
      const pubEl = document.getElementById('ap-publish-at');
      if (genEl) genEl.value = dateStr + 'T09:00';
      if (pubEl) pubEl.value = dateStr + 'T12:00';
      modal.style.display = 'flex';
    } else {
      // オートパイロットページに遷移してモーダルを開く
      sessionStorage.setItem('ap_prefill_date', dateStr);
      location.href = '/dashboard/autopilot';
    }
  };
  // Hono SSRでは DOMContentLoaded が既に発火済みの場合があるため両方対応
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildCalendar);
  } else {
    // 次フレームで実行（要素が確実に存在するタイミング）
    requestAnimationFrame(function() { setTimeout(buildCalendar, 0); });
  }
})();
<\/script>`}function hn(e){return`
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
              <td class="text-xs">@${E(t.x_username||"-")}</td>
              <td><span class="pill pill-soft">${E(t.content_mode||"-")}</span></td>
              <td class="text-xs max-w-xs truncate">${E(t.theme||"—")}</td>
              <td><span class="pill ${t.status==="error"?"pill-err":t.status==="posted"?"pill-ok":"pill-blue"}">${E(t.status)}</span></td>
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
            ${e.accounts.map(t=>`<option value="${t.id}">@${E(t.x_username||t.account_name)}</option>`).join("")}
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
<\/script>`}function _n(e){return`
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
              <td class="font-semibold">${E(t.account_name)}</td>
              <td class="text-accent">@${E(t.x_username||"未認証")}</td>
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
<\/script>`}function gn(e){const t=[{key:"posts",label:"投稿キュー",desc:"全投稿データ（予約・投稿済・失敗含む）",icon:"fa-brands fa-x-twitter",color:"text-blue-600"},{key:"logs",label:"投稿ログ",desc:"投稿実行の全履歴（成功・失敗）",icon:"fa-clipboard-list",color:"text-emerald-600"},{key:"generations",label:"AI生成ログ",desc:"AI生成されたテキストの記録",icon:"fa-robot",color:"text-purple-600"},{key:"autopilot",label:"オートパイロット",desc:"予約ジョブの一覧",icon:"fa-plane-departure",color:"text-amber-600"},{key:"drafts",label:"下書き",desc:"保存済みの下書きデータ",icon:"fa-file-pen",color:"text-sky-600"},{key:"kpi",label:"KPI",desc:"日別投稿数・失敗数の統計",icon:"fa-chart-line",color:"text-rose-600"},{key:"accounts",label:"Xアカウント",desc:"アカウント情報（トークン除外）",icon:"fa-users-gear",color:"text-indigo-600"},{key:"targets",label:"ターゲット設定",desc:"ターゲットテンプレート",icon:"fa-bullseye",color:"text-orange-600"},{key:"voices",label:"ブランドボイス",desc:"ボイスプロファイル",icon:"fa-palette",color:"text-pink-600"}],s=[{key:"admin/users",label:"ユーザー一覧",desc:"全ユーザー（プラン・承認状態含む）",icon:"fa-users",color:"text-blue-600"},{key:"admin/licenses",label:"ライセンス",desc:"ライセンスキーの全データ",icon:"fa-key",color:"text-amber-600"},{key:"admin/subs",label:"サブスクリプション",desc:"全契約情報",icon:"fa-credit-card",color:"text-emerald-600"},{key:"admin/audit",label:"監査ログ",desc:"認証・操作ログ",icon:"fa-shield-halved",color:"text-red-600"}];return`
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

  <!-- X API -->
  <div class="card space-y-4">
    <h3 class="font-bold text-ink" style="font-size:1rem"><i class="fa-brands fa-x-twitter"></i> X API設定（OAuth 1.0a User Context）</h3>
    <div class="alert alert-warn">
      <i class="fas fa-triangle-exclamation" style="margin-top:2px"></i>
      <div style="font-size:.82rem">重要: App permissions を「Read」から「Read and Write」に変更した場合、必ず「Keys and tokens」タブで <strong>Access Token &amp; Secret を Regenerate（再発行）</strong> してください。再発行しないと権限が Read のままで 403 Forbidden や 401 Unauthorized になります。Bearer Token は /users/me の接続確認には使用しません。</div>
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Key (Consumer Key)</label>
      <input type="text" id="api-xk" class="inp input-mono" placeholder="未設定" value="${E(t.api_key||"")}">
    </div>
    <div>
      <label class="field-label"><i class="fas fa-key icon-yellow"></i>API Secret (Consumer Secret)</label>
      <input type="password" id="api-xs" class="inp input-mono" placeholder="未設定" value="${E(t.api_secret||"")}">
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
      <input type="password" id="api-oai" class="inp input-mono" placeholder="未設定" value="${E(t.openai_api_key?"••••••••":"")}">
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
      <input type="password" id="api-gem" class="inp input-mono" placeholder="未設定" value="${E(t.gemini_api_key?"••••••••":"")}">
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
        <input type="password" id="api-tg-tok" class="inp input-mono" placeholder="未設定" value="${E(t.telegram_bot_token?"••••••••":"")}">
      </div>
      <div>
        <label class="field-label"><i class="fas fa-hash icon-blue"></i>Chat ID</label>
        <input type="text" id="api-tg-chat" class="inp input-mono" placeholder="-100XXXXXXXXXX" value="${E(t.telegram_chat_id||"")}">
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
  const key=document.getElementById('api-oai').value;
  if(key.includes('•')){toast('変更がありません','info');return;}
  const r=await fetch('/api/admin/api-settings/openai',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({api_key:key,model:document.getElementById('api-model').value})});
  const j=await r.json();
  if(j.success){toast('OpenAI設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function saveGemini(){
  const key=document.getElementById('api-gem').value;
  if(key.includes('•')){toast('変更がありません','info');return;}
  const r=await fetch('/api/admin/api-settings/gemini',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({api_key:key,model:document.getElementById('api-gem-model').value})});
  const j=await r.json();
  if(j.success){toast('Gemini設定を保存しました','ok');}else{toast('保存失敗: '+(j.error||''),'err');}
}
async function saveTelegram(){
  const r=await fetch('/api/admin/api-settings/telegram',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({bot_token:document.getElementById('api-tg-tok').value,chat_id:document.getElementById('api-tg-chat').value})});
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
<\/script>`}const H=new D;async function vn(e,t){const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, is_current
       FROM x_accounts WHERE user_id = ? AND is_active = 1 ORDER BY id`).bind(t.id).all(),a=(s||[]).map(i=>({id:i.id,account_name:i.account_name,x_username:i.x_username})),n=(s||[]).find(i=>i.is_current===1);return{accounts:a,currentAccountId:(n==null?void 0:n.id)??null}}H.get("/",e=>e.redirect("/login"));async function J(e,t,s){const a=e.get("user"),{accounts:n,currentAccountId:i}=await vn(e,a),r=n.length>0&&i!==null,o=await Promise.resolve(s({user:a,hasAccount:r,accounts:n,currentAccountId:i})),l=nn({active:t,user:a,accounts:n,currentAccountId:i,pageBody:o});return e.html(Nt("GE365x",l))}H.get("/dashboard",m,async e=>J(e,"dashboard",async({user:t,hasAccount:s})=>{const a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM x_accounts WHERE user_id=?").bind(t.id).first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND DATE(created_at)=DATE('now','+9 hours') AND status='posted'").bind(t.id).first(),i=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE user_id=? AND status IN ('pending','approved')").bind(t.id).first(),r=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE user_id=? AND status='failed' AND DATE(created_at)=DATE('now','+9 hours')").bind(t.id).first(),{results:o}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id`).bind(t.id).all(),{results:l}=await e.env.DB.prepare(`SELECT pl.content, pl.status, pl.posted_at, xa.x_username
         FROM post_logs pl LEFT JOIN x_accounts xa ON xa.id = pl.account_id
         WHERE pl.user_id = ? AND pl.status = 'posted'
         ORDER BY pl.id DESC LIMIT 5`).bind(t.id).all();return rn({stats:{accounts:(a==null?void 0:a.n)??0,today:(n==null?void 0:n.n)??0,pending:(i==null?void 0:i.n)??0,failed:(r==null?void 0:r.n)??0},health:o||[],recentLogs:l||[]})}));H.get("/dashboard/target",m,async e=>J(e,"target",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return on({target:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/voice",m,async e=>J(e,"voice",async({user:t,currentAccountId:s,hasAccount:a})=>{const n=String(s??"default"),i=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,t.id).first();return ln({voice:i,hasAccount:a,noAccountAlert:he})}));H.get("/dashboard/pattern",m,async e=>J(e,"pattern",async({user:t,hasAccount:s,currentAccountId:a,accounts:n})=>{const i=String(a??"default"),r=await e.env.DB.prepare("SELECT age_range, gender FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),o=await e.env.DB.prepare("SELECT tone FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(i,t.id).first(),l=n.find(d=>d.id===a);return dn({hasAccount:s,noAccountAlert:he,target:r,voice:o,currentAcct:l})}));H.get("/dashboard/generate",m,async e=>J(e,"generate",({hasAccount:t})=>cn({hasAccount:t,noAccountAlert:he})));H.get("/dashboard/posts",m,async e=>J(e,"posts",async({user:t,hasAccount:s})=>{const n=e.req.query("month")||new Date().toISOString().slice(0,7),[i,r]=n.split("-"),{results:o}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.post_mode, pq.status, pq.account_id, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ?
          AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?
        ORDER BY pq.id DESC LIMIT 200`).bind(t.id,n).all(),l=(o||[]).length,d=(o||[]).filter(f=>f.status==="pending"||f.status==="approved").length,c=(o||[]).filter(f=>f.status==="posted").length,p=(o||[]).filter(f=>f.status==="failed").length;return un({hasAccount:s,noAccountAlert:he,month:n,y:i,m:parseInt(r,10),posts:o||[],stats:{total:l,pending:d,posted:c,failed:p}})}));H.get("/dashboard/thread",m,async e=>J(e,"thread",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.status, pq.posted_at, pq.created_at, pq.thread_parent_id
         FROM post_queue pq
        WHERE pq.user_id = ? AND pq.post_mode = 'thread' AND pq.thread_parent_id IS NOT NULL
        ORDER BY pq.id DESC LIMIT 30`).bind(t.id).all();return pn({hasAccount:s,noAccountAlert:he,history:a||[]})}));H.get("/dashboard/scheduled",m,async e=>J(e,"scheduled",async({user:t,hasAccount:s})=>{const{results:a}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.scheduled_at, pq.status, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON xa.id = pq.account_id
        WHERE pq.user_id = ? AND pq.scheduled_at IS NOT NULL
          AND pq.status NOT IN ('cancelled','rejected')
        ORDER BY pq.scheduled_at ASC LIMIT 100`).bind(t.id).all();return fn({hasAccount:s,noAccountAlert:he,scheduled:a||[]})}));H.get("/dashboard/autopilot",m,async e=>J(e,"autopilot",async({user:t,hasAccount:s,accounts:a})=>{const{results:n}=await e.env.DB.prepare(`SELECT aj.*, xa.x_username FROM autopilot_jobs aj
         LEFT JOIN x_accounts xa ON xa.id = aj.account_id
        WHERE aj.user_id = ?
        ORDER BY COALESCE(aj.publish_at, aj.generate_at, aj.created_at) DESC LIMIT 50`).bind(t.id).all();return hn({hasAccount:s,noAccountAlert:he,accounts:a,jobs:n||[]})}));H.get("/dashboard/accounts",m,async e=>J(e,"accounts",async({user:t})=>{const{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_username, account_health_score, health_status,
              daily_post_count, daily_post_limit, last_posted_at, is_active
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return _n({accounts:s||[]})}));H.get("/dashboard/api",m,async e=>J(e,"api",async({user:t})=>{const s=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? LIMIT 1").bind(t.id).first(),a=async i=>{const r=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key=?").bind(i).first();return!!(r!=null&&r.value)},n={api_key:s!=null&&s.api_key?"••••••":"",api_secret:s!=null&&s.api_secret?"••••••":"",openai_api_key:await a("openai_api_key_"+t.id),gemini_api_key:await a("gemini_api_key_"+t.id),telegram_bot_token:await a("telegram_bot_token_"+t.id),telegram_chat_id:""};return bn({settings:n})}));H.get("/dashboard/export",m,async e=>J(e,"export",({user:t})=>gn({isAdmin:t.is_admin})));const F=new D;F.get("/admin",m,I,e=>{const t=`
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
`;return e.html(Nt("管理画面",t))});F.get("/api/admin/users",m,I,async e=>{const t=e.req.query("filter")||"all",s=[];t==="pending"&&s.push("u.is_approved = 0"),t==="approved"&&s.push("u.is_approved = 1"),t==="admin"&&s.push("u.is_admin = 1");const a=`
    SELECT u.id, u.email, u.is_approved, u.is_admin, u.trial_start, u.trial_end, u.created_at,
           s.plan_code, s.status AS sub_status
      FROM users u
      LEFT JOIN user_subscriptions s ON s.user_id = u.id
      ${s.length?"WHERE "+s.join(" AND "):""}
      ORDER BY u.id DESC
      LIMIT 200`,{results:n}=await e.env.DB.prepare(a).all();return e.json({users:n||[]})});F.post("/api/admin/users/:id/approve",m,I,async e=>{const t=parseInt(e.req.param("id"),10),{is_approved:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_approved=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_approval",{userId:e.get("user").id,metadata:{target_user_id:t,is_approved:s}}),e.json({ok:!0})});F.post("/api/admin/users/:id/admin",m,I,async e=>{const t=parseInt(e.req.param("id"),10),{is_admin:s}=await e.req.json();return await e.env.DB.prepare("UPDATE users SET is_admin=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(s,t).run(),await Z(e,"admin_toggle_admin",{userId:e.get("user").id,metadata:{target_user_id:t,is_admin:s}}),e.json({ok:!0})});F.get("/api/admin/licenses",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.*, u.email AS user_email
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 500`).all();return e.json({licenses:t||[]})});F.post("/api/admin/licenses/issue",m,I,async e=>{const t=e.get("user"),{plan_code:s,license_type:a,expires_at:n,count:i=1,note:r}=await e.req.json();if(i<1||i>100)return e.json({error:"invalid_count"},400);const o=[];for(let l=0;l<i;l++){let d=jt("VPS-GE365X");for(let c=0;c<3&&await e.env.DB.prepare("SELECT 1 FROM licenses WHERE license_key=?").bind(d).first();c++)d=jt("VPS-GE365X");await e.env.DB.prepare(`INSERT INTO licenses (license_key, license_type, plan_code, is_active, expires_at, issued_by, note)
       VALUES (?, ?, ?, 1, ?, ?, ?)`).bind(d,a,s,n?n+" 23:59:59":null,t.id,r||null).run(),o.push(d)}return await Z(e,"admin_issue_license",{userId:t.id,metadata:{count:i,plan_code:s,license_type:a}}),e.json({ok:!0,keys:o})});F.post("/api/admin/licenses/:id/revoke",m,I,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=0, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),await e.env.DB.prepare(`INSERT INTO license_activations (license_id, user_id, event_type)
     VALUES (?, ?, 'revoked')`).bind(t,e.get("user").id).run(),e.json({ok:!0})});F.post("/api/admin/licenses/:id/reactivate",m,I,async e=>{const t=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE licenses SET is_active=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(t).run(),e.json({ok:!0})});F.get("/api/admin/subscriptions",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.*, u.email AS user_email
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 300`).all();return e.json({subscriptions:t||[]})});F.get("/api/admin/posts/summary",m,I,async e=>{const t=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue").first(),s=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_queue WHERE status='pending'").first(),a=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='success'").first(),n=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM post_logs WHERE status='failed'").first(),{results:i}=await e.env.DB.prepare(`SELECT pl.created_at, pl.content, pl.status,
            u.email, x.x_screen_name
       FROM post_logs pl
       LEFT JOIN users u  ON u.id = pl.user_id
       LEFT JOIN x_accounts x ON x.id = pl.x_account_id
       ORDER BY pl.created_at DESC LIMIT 100`).all();return e.json({stats:[{label:"全キュー",value:(t==null?void 0:t.n)??0},{label:"pending",value:(s==null?void 0:s.n)??0},{label:"成功",value:(a==null?void 0:a.n)??0},{label:"失敗",value:(n==null?void 0:n.n)??0}],recent:i||[]})});F.get("/api/admin/x-accounts",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT xa.id, xa.x_screen_name, xa.is_active, xa.last_used_at, xa.token_expires_at,
            u.email AS user_email
       FROM x_accounts xa
       LEFT JOIN users u ON u.id = xa.user_id
       ORDER BY xa.id DESC LIMIT 500`).all();return e.json({accounts:t||[]})});F.get("/api/admin/audit-logs",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 300`).all();return e.json({logs:t||[]})});F.get("/api/admin/settings",m,I,async e=>{const{results:t}=await e.env.DB.prepare("SELECT key, value, description FROM system_settings ORDER BY key").all();return e.json({settings:t||[]})});F.post("/api/admin/settings",m,I,async e=>{const{key:t,value:s}=await e.req.json();return await e.env.DB.prepare(`INSERT INTO system_settings (key, value, updated_at)
     VALUES (?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s).run(),e.json({ok:!0})});const _e=new D;_e.post("/api/auth/register",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='invite_only'").first();if((n==null?void 0:n.value)==="1")return e.json({error:"invite_only"},403);if(await e.env.DB.prepare("SELECT 1 FROM users WHERE email = ?").bind(s).first())return e.json({error:"email_taken"},409);const r=await yt(a),o=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_days'").first(),l=parseInt((o==null?void 0:o.value)??"14",10),d=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key='trial_require_approval'").first(),c=(d==null?void 0:d.value)!=="0";g();const f=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
     VALUES (?, ?, ?, 0, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,r,c?0:1,l).run()).meta.last_row_id;return await e.env.DB.prepare(`INSERT INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
     VALUES (?, 'ge365x_free', 'trial', datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(f,l).run(),await e.env.DB.prepare(`INSERT INTO trial_history (email, user_id, trial_start, trial_end)
     VALUES (?, ?, datetime('now','+9 hours'),
             datetime('now','+9 hours', '+' || ? || ' days'))`).bind(s,f,l).run(),await Z(e,"register",{userId:f,email:s}),e.json({ok:!0,user_id:f,approved:!c,message:c?"登録を受け付けました。管理者による承認後にログインできます。":"登録が完了しました。ログインしてください。"})});_e.post("/api/auth/login",async e=>{const t=await e.req.json(),s=(t.email||"").trim().toLowerCase(),a=t.password||"";if(!s||!a)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT id,email,password_hash,is_approved,is_admin FROM users WHERE email = ?").bind(s).first();if(!n)return await Z(e,"login_fail",{email:s,metadata:{reason:"no_user"}}),e.json({error:"invalid_credentials"},401);if(!await Mt(a,n.password_hash))return await Z(e,"login_fail",{userId:n.id,email:s,metadata:{reason:"bad_password"}}),e.json({error:"invalid_credentials"},401);if(n.is_approved===0)return await Z(e,"login_blocked",{userId:n.id,email:s,metadata:{reason:"not_approved"}}),e.json({error:"not_approved"},403);const r=await Ms({uid:n.id,email:n.email,adm:n.is_admin===1},e.env.JWT_SECRET,3600*24*7),o=$t(Ft,r,{maxAge:3600*24*7});return await Z(e,"login_success",{userId:n.id,email:s}),new Response(JSON.stringify({ok:!0,user_id:n.id,email:n.email,is_admin:n.is_admin===1}),{headers:{"content-type":"application/json","set-cookie":o}})});_e.post("/api/auth/logout",async e=>{const t=e.get("user");t&&await Z(e,"logout",{userId:t.id,email:t.email});const s=$t(Ft,"",{maxAge:0});return new Response(JSON.stringify({ok:!0}),{headers:{"content-type":"application/json","set-cookie":s}})});_e.get("/api/auth/me",m,e=>e.json({ok:!0,user:e.get("user")}));_e.post("/api/auth/license/activate",m,async e=>{const t=e.get("user"),{license_key:s}=await e.req.json();if(!s||!Ps(s))return e.json({error:"invalid_license_format"},400);const a=s.trim().toUpperCase(),n=await e.env.DB.prepare("SELECT * FROM licenses WHERE license_key = ?").bind(a).first();if(!n)return e.json({error:"license_not_found"},404);if(n.is_active===0)return e.json({error:"license_inactive"},409);if(n.expires_at&&n.expires_at<g())return e.json({error:"license_expired"},409);if(n.user_id&&n.user_id!==t.id)return e.json({error:"license_already_used"},409);await e.env.DB.prepare(`UPDATE licenses
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
     VALUES (?, ?, 'activated', ?, ?)`).bind(n.id,t.id,e.req.header("cf-connecting-ip")||"",e.req.header("user-agent")||"").run(),await Z(e,"license_activate",{userId:t.id,email:t.email,metadata:{license_id:n.id,plan_code:i}}),e.json({ok:!0,plan_code:i,status:r,license_type:n.license_type,expires_at:o})});_e.post("/api/auth/password/change",m,async e=>{const t=e.get("user"),{current_password:s,new_password:a}=await e.req.json();if(!s||!a||a.length<8)return e.json({error:"invalid_input"},400);const n=await e.env.DB.prepare("SELECT password_hash FROM users WHERE id = ?").bind(t.id).first();if(!n)return e.json({error:"user_not_found"},404);if(!await Mt(s,n.password_hash))return e.json({error:"invalid_credentials"},401);const r=await yt(a);return await e.env.DB.prepare("UPDATE users SET password_hash=?, updated_at=datetime('now','+9 hours') WHERE id=?").bind(r,t.id).run(),await Z(e,"password_change",{userId:t.id,email:t.email}),e.json({ok:!0})});_e.get("/setup",async e=>{const t=e.req.query("token")||"",s=e.env.ADMIN_PASSWORD||"";if(!s||t!==s)return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
<title>Setup</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f7f8fb}
.card{background:#fff;border-radius:12px;padding:2rem;max-width:420px;width:100%;box-shadow:0 2px 12px rgba(0,0,0,.08);text-align:center}
h2{color:#dc2626;margin:0 0 .5rem}p{color:#6b7280;font-size:.9rem}</style></head>
<body><div class="card"><h2>❌ 認証失敗</h2>
<p>URLに正しい token を付けてください。<br>例: /setup?token=（ADMIN_PASSWORDの値）</p></div></body></html>`,403);const a="admin@ge365x.local",i=await yt("Ge365x@Admin!"),r=await e.env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(a).first();if(r)await e.env.DB.prepare("UPDATE users SET password_hash=?, is_admin=1, is_approved=1, updated_at=datetime('now','+9 hours') WHERE id=?").bind(i,r.id).run(),await e.env.DB.prepare("UPDATE user_subscriptions SET plan_code='ge365x_pro', status='active', current_period_end='2099-12-31 23:59:59' WHERE user_id=?").bind(r.id).run();else{const l=(await e.env.DB.prepare(`INSERT INTO users (email, password_hash, is_approved, is_admin, trial_start, trial_end)
       VALUES (?, ?, 1, 1, datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(a,i).run()).meta.last_row_id;await e.env.DB.prepare(`INSERT OR REPLACE INTO user_subscriptions (user_id, plan_code, status, started_at, current_period_end)
       VALUES (?, 'ge365x_pro', 'active', datetime('now','+9 hours'), '2099-12-31 23:59:59')`).bind(l).run()}return e.html(`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8">
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
</div></body></html>`)});const ge=new D;ge.get("/api/subscription/plans",async e=>{const{results:t}=await e.env.DB.prepare(`SELECT code, name, description, monthly_price_jpy, yearly_price_jpy,
            daily_post_limit, x_account_limit, openai_token_monthly, features
       FROM subscription_plans
      WHERE is_active = 1
      ORDER BY sort_order ASC`).all(),s=(t||[]).map(a=>({...a,features:a.features?JSON.parse(a.features):[]}));return e.json({plans:s})});ge.get("/api/subscription/me",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT s.plan_code, s.status, s.started_at, s.current_period_end, s.cancel_at_period_end,
            p.name AS plan_name, p.monthly_price_jpy, p.daily_post_limit, p.x_account_limit, p.features
       FROM user_subscriptions s
       LEFT JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ?`).bind(t.id).first();return s?e.json({subscription:{...s,features:s.features?JSON.parse(s.features):[]}}):e.json({subscription:null})});ge.post("/api/subscription/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 1, updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});ge.post("/api/subscription/reactivate",m,async e=>{const t=e.get("user");return await e.env.DB.prepare(`UPDATE user_subscriptions
       SET cancel_at_period_end = 0, status = 'active', updated_at = datetime('now','+9 hours')
     WHERE user_id = ?`).bind(t.id).run(),e.json({ok:!0})});ge.get("/api/subscription/payments",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, amount_jpy, currency, provider, external_id, status, plan_code, paid_at, created_at
       FROM payment_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50`).bind(t.id).all();return e.json({payments:s||[]})});ge.post("/api/subscription/stripe/checkout",m,async e=>e.env.STRIPE_SECRET_KEY?e.json({error:"not_implemented_yet"},501):e.json({error:"stripe_not_configured"},501));ge.post("/api/subscription/webhook/stripe",async e=>e.json({received:!0}));const ts=new TextEncoder,yn="https://api.x.com/2";class $ extends Error{constructor(s,a=0,n="api_error"){super(s);h(this,"statusCode");h(this,"errorType");this.name="XApiError",this.statusCode=a,this.errorType=n}}class qt extends ${constructor(s){super("Rate limited by X API (429)",429,"rate_limit");h(this,"resetAtEpoch");this.name="XApiRateLimitError",this.resetAtEpoch=s}}function le(e){return encodeURIComponent(e).replace(/[!'()*]/g,t=>"%"+t.charCodeAt(0).toString(16).toUpperCase())}function En(e){const t=new Uint8Array(e);return crypto.getRandomValues(t),[...t].map(s=>s.toString(16).padStart(2,"0")).join("")}function xn(){return En(16)}async function wn(e,t){const s=await crypto.subtle.importKey("raw",ts.encode(e),{name:"HMAC",hash:"SHA-1"},!1,["sign"]),a=await crypto.subtle.sign("HMAC",s,ts.encode(t)),n=new Uint8Array(a);let i="";for(let r=0;r<n.length;r++)i+=String.fromCharCode(n[r]);return btoa(i)}async function kn(e,t,s,a){const n={oauth_consumer_key:s.consumerKey,oauth_nonce:xn(),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.floor(Date.now()/1e3).toString(),oauth_token:s.accessToken,oauth_version:"1.0"},i=new URL(t),r={...n};i.searchParams.forEach((f,b)=>{r[b]=f});const o=Object.keys(r).sort().map(f=>`${le(f)}=${le(r[f])}`).join("&"),l=[e.toUpperCase(),le(`${i.origin}${i.pathname}`),le(o)].join("&"),d=`${le(s.consumerSecret)}&${le(s.accessTokenSecret)}`,c=await wn(d,l);return n.oauth_signature=c,`OAuth ${Object.keys(n).sort().map(f=>`${le(f)}="${le(n[f])}"`).join(", ")}`}async function Ht(e,t,s,a){const n=`${yn}${t}`,i=await kn(e,n,a),r={method:e,headers:{authorization:i,"content-type":"application/json"},signal:AbortSignal.timeout(3e4)};s!==void 0&&(r.body=JSON.stringify(s));const o=await fetch(n,r);if(o.status===429){const l=o.headers.get("x-rate-limit-reset");throw new qt(l?Number(l):void 0)}if(!o.ok){const l=await o.text();throw new $(`X API ${e} ${t} failed: ${o.status} ${l.slice(0,500)}`,o.status,"api_error")}return o.status===204?{}:o.json()}async function Us(e,t){var a,n;const s=await Ht("POST","/tweets",{text:t},e);return{id:((a=s==null?void 0:s.data)==null?void 0:a.id)||"",text:((n=s==null?void 0:s.data)==null?void 0:n.text)||t}}async function Ws(e,t,s,a){var r,o;const n={text:t};s&&s.length&&(n.media={media_ids:s.slice(0,4)});const i=await Ht("POST","/tweets",n,e);return{id:((r=i==null?void 0:i.data)==null?void 0:r.id)||"",text:((o=i==null?void 0:i.data)==null?void 0:o.text)||t}}async function Sn(e){var s,a,n,i;if(!e)throw new $("credentials未設定",0,"missing_credentials");if(!((s=e.consumerKey)!=null&&s.trim()))throw new $("API Key未設定",0,"missing_credentials");if(!((a=e.consumerSecret)!=null&&a.trim()))throw new $("API Secret未設定",0,"missing_credentials");if(!((n=e.accessToken)!=null&&n.trim()))throw new $("Access Token未設定",0,"missing_token");if(!((i=e.accessTokenSecret)!=null&&i.trim()))throw new $("Access Token Secret未設定",0,"missing_token");const t=await Ht("GET","/users/me?user.fields=profile_image_url,public_metrics",void 0,e);return t==null?void 0:t.data}async function Ut(e,t,s){var o,l;const a=((s==null?void 0:s.apiKey)??e.X_API_KEY??"").trim(),n=((s==null?void 0:s.apiSecret)??e.X_API_SECRET??"").trim();if(!a||!n)throw new $("X API Key/Secret 未設定",0,"no_api_key");if(!((o=t==null?void 0:t.access_token)!=null&&o.trim()))throw new $("Access Token 未設定",0,"no_token");if(!((l=t==null?void 0:t.access_token_secret)!=null&&l.trim()))throw new $("Access Token Secret 未設定",0,"no_token_secret");let i,r;try{i=await ft(t.access_token,e.ENCRYPTION_KEY)}catch{throw new $("Access Token の復号に失敗",0,"decrypt_failed")}try{r=await ft(t.access_token_secret,e.ENCRYPTION_KEY)}catch{throw new $("Access Token Secret の復号に失敗",0,"decrypt_failed")}if(!i.trim())throw new $("Access Token が空",0,"decrypt_failed");if(!r.trim())throw new $("Access Token Secret が空",0,"decrypt_failed");return{consumerKey:a,consumerSecret:n,accessToken:i,accessTokenSecret:r}}const be=new D;be.get("/api/admin/accounts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current, created_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all();return e.json({accounts:s||[]})});be.post("/api/admin/accounts",m,async e=>{var r,o;const t=e.get("user"),s=await e.req.json();if(!s.account_name)return e.json({error:"account_name required"},400);if(!((r=s.access_token)!=null&&r.trim())||!((o=s.access_token_secret)!=null&&o.trim()))return e.json({error:"access_token and access_token_secret required"},400);const a=await re(s.access_token.trim(),e.env.ENCRYPTION_KEY),n=await re(s.access_token_secret.trim(),e.env.ENCRYPTION_KEY),i=await e.env.DB.prepare(`INSERT INTO x_accounts
       (user_id, account_name, access_token, access_token_secret, daily_post_limit, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`).bind(t.id,s.account_name,a,n,s.daily_post_limit??5).run();return e.json({success:!0,id:i.meta.last_row_id})});be.post("/api/admin/accounts/:id/test",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(s,t.id).first();if(!a)return e.json({success:!1,error:"not_found"},404);try{const n=await Ut(e.env,a),i=await Sn(n);return i!=null&&i.id&&await e.env.DB.prepare(`UPDATE x_accounts SET x_user_id=?, x_username=?, is_active=1,
           account_health_score = MAX(account_health_score, 80),
           health_status = CASE WHEN account_health_score >= 80 THEN 'healthy' ELSE health_status END,
           updated_at=? WHERE id=?`).bind(i.id,i.username||null,g(),s).run(),e.json({success:!0,me:i})}catch(n){const i=n instanceof $?n.statusCode:0;return e.json({success:!1,error:n.message,status_code:i,error_type:n==null?void 0:n.errorType})}});be.post("/api/admin/accounts/:id/current",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.batch([e.env.DB.prepare("UPDATE x_accounts SET is_current=0 WHERE user_id=?").bind(t.id),e.env.DB.prepare("UPDATE x_accounts SET is_current=1, updated_at=? WHERE id=? AND user_id=?").bind(g(),s,t.id)]),e.json({success:!0})});be.post("/api/admin/accounts/:id/toggle",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10);return await e.env.DB.prepare("UPDATE x_accounts SET is_active = 1 - is_active, updated_at = ? WHERE id=? AND user_id=?").bind(g(),s,t.id).run(),e.json({success:!0})});be.put("/api/admin/accounts/:id",m,async e=>{var r,o;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=[],i=[];if(a.account_name&&(n.push("account_name=?"),i.push(a.account_name)),a.daily_post_limit!==void 0&&(n.push("daily_post_limit=?"),i.push(a.daily_post_limit)),(r=a.access_token)!=null&&r.trim()){const l=await re(a.access_token.trim(),e.env.ENCRYPTION_KEY);n.push("access_token=?"),i.push(l)}if((o=a.access_token_secret)!=null&&o.trim()){const l=await re(a.access_token_secret.trim(),e.env.ENCRYPTION_KEY);n.push("access_token_secret=?"),i.push(l)}return n.length===0?e.json({success:!1,error:"no_fields"}):(n.push("updated_at=?"),i.push(g(),s,t.id),await e.env.DB.prepare(`UPDATE x_accounts SET ${n.join(", ")} WHERE id=? AND user_id=?`).bind(...i).run(),e.json({success:!0}))});be.delete("/api/admin/accounts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM x_accounts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const Tn=["20代","30代","40代","50代"],An=["男性","女性"],Dn=["美容","健康","副業","投資","AI活用","ダイエット","お金"],In={美容:"老化・肌荒れ・見た目の変化",健康:"疲れやすい・体力低下・不調",副業:"時間がない・何から始めるか不明",投資:"勝てない・資産が増えない",AI活用:"手作業が多い・効率が悪い",ダイエット:"リバウンド・続かない",お金:"貯まらない・将来不安"},On={美容:"若々しくなりたい",健康:"元気に過ごしたい",副業:"収益化したい",投資:"安定して利益を出したい",AI活用:"業務を自動化したい",ダイエット:"理想の体型になりたい",お金:"経済的自由を得たい"},Ys=[];for(const e of Tn)for(const t of An)for(const s of Dn)Ys.push({key:`${e}_${t}_${s}`,label:`${e}${t}/${s}`,gender:t,age_range:e,genre:s,problem:In[s]||`${s}に悩んでいる`,goal:On[s]||`${s}で成果を出したい`,knowledge:"一般"});const Rn=[{key:"authority",label:"権威型",instruction:"専門家として断定的に、簡潔に、根拠を示して書く。"},{key:"empathy",label:"共感型",instruction:"読者の悩みに寄り添い、共感を起点に語りかけるように書く。"},{key:"provocative",label:"煽り型",instruction:"問題を鋭く突き、危機感を持たせる書き方にする。"},{key:"story",label:"ストーリー型",instruction:"体験談や変化の流れを感じさせる構成で書く。"},{key:"problem_raise",label:"問題提起型",instruction:"最初に課題を提示し、その原因と解決策を示す。"}],Bt={problem:{name:"問題提起型",instruction:`【問題提起型】
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
5.CTA`}};async function zs(e,t){var r,o,l;const s=t.model||"gpt-4o-mini",a=t.maxTokens||4e3,n=t.temperature??.7,i=t.baseUrl||"https://api.openai.com/v1";for(let d=1;d<=3;d++)try{const c=await fetch(`${i}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${t.apiKey}`,"content-type":"application/json"},body:JSON.stringify({model:s,messages:e,max_tokens:a,temperature:n}),signal:AbortSignal.timeout(12e4)});if(!c.ok){const f=await c.text();if(c.status>=500&&d<3){await new Promise(b=>setTimeout(b,2e3*d));continue}throw new Error(`OpenAI API error: ${c.status} ${f.slice(0,500)}`)}const p=await c.json();return((l=(o=(r=p==null?void 0:p.choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:l.content)||""}catch(c){if(((c==null?void 0:c.name)==="TimeoutError"||(c==null?void 0:c.name)==="AbortError")&&d<3){await new Promise(f=>setTimeout(f,2e3*d));continue}throw c}return""}function Js(e){let t=`以下のルールを厳守してX(Twitter)投稿文を生成してください。
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
Markdown記号(#,##)禁止。見出しは「■」。番号リスト禁止。自然な文章で。箇条書きは「・」のみ。`;let a="";e.patternType&&Bt[e.patternType]&&(a=`
【投稿パターン（構造のみ）】
${Bt[e.patternType].instruction}`);let n=`テーマ: ${e.theme||""}${e.keywords?`
キーワード: ${e.keywords}`:""}`;e.postMode==="140"?n+=`
140文字以内のX投稿を作成。簡潔かつインパクト重視。ハッシュタグは含めない。`:n+=`
X投稿用のフル文章を作成。読みやすく改行を入れる。ハッシュタグは含めない。`,e.cta&&(n+=`
CTA: ${e.cta}`),e.userInput&&(n+=`
追加指示: ${e.userInput}`);const i=t+a+s;return{messages:[{role:"system",content:i},{role:"user",content:n}],systemPrompt:i,userPrompt:n}}async function Ks(e,t,s,a,n,i="body"){const{messages:r}=Js({theme:t,keywords:s,brandVoice:n,targetDna:a,postMode:i||"body"}),o=await zs(r,{apiKey:e,temperature:.8});return Et(o,i)}async function Vs(e,t,s,a,n,i,r="body"){if(!Bt[t])throw new Error(`未対応のパターン: ${t}`);const{messages:o}=Js({theme:s,keywords:a,brandVoice:i,targetDna:n,patternType:t,postMode:r||"body"}),l=await zs(o,{apiKey:e,temperature:.8});return Et(l,r)}function Et(e,t){if(!e)return"";let s=e.replace(/^#{1,4}\s*/gm,"").replace(/^[▪️■●•\-\*]+\s*/gm,"").replace(/^\d+\.\s/gm,"").replace(/^(Step\d+)[:\s]/gim,"").replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm,"・").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\n{3,}/g,`

`).trim();return s=jn(s),t==="140"&&s.length>140&&(s=s.slice(0,137)+"..."),s}function jn(e){if(!e)return"";const t=e.split(`
`).length,s=e.replace(/\n/g,"").length;if(t>3||s<40)return e;const a=e.split(new RegExp("(?<=[。！？!?\\n])","g")).filter(r=>r.trim());if(a.length<=1)return e;let n="",i=0;for(let r=0;r<a.length;r++){const o=a[r].trim();if(o){if(/^https?:\/\//.test(o)||/^#/.test(o)||/^@/.test(o)){n&&!n.endsWith(`
`)&&(n+=`
`),n+=o,i=0;continue}n+=o,i++,i>=2&&r<a.length-1?(n+=`

`,i=0):r<a.length-1&&!o.endsWith(`
`)&&(n+=`
`)}}return n.replace(/\n{3,}/g,`

`).trim()}const Bn=new TextEncoder;async function De(e){const t=await crypto.subtle.digest("SHA-256",Bn.encode(e||""));return[...new Uint8Array(t)].slice(0,8).map(a=>a.toString(16).padStart(2,"0")).join("")}function Ct(e){const t=(e||"").replace(/\s+/g,"").slice(0,2e3),s=new Set;for(let a=0;a<t.length-1;a++)s.add(t.slice(a,a+2));return s}function Xs(e,t){const s=Ct(e),a=Ct(t);if(s.size===0&&a.size===0)return 0;let n=0;for(const r of s)a.has(r)&&n++;const i=s.size+a.size-n;return i===0?0:n/i}const Cn=120*1e3;async function Gs(e,t){const s=new Date().toISOString(),a=new Date(Date.now()-Cn).toISOString(),n=await e.DB.prepare("SELECT account_id, locked_at FROM post_locks WHERE account_id = ?").bind(t).first();return n&&n.locked_at>a?!1:(await e.DB.prepare(`INSERT INTO post_locks (account_id, locked_at) VALUES (?, ?)
     ON CONFLICT(account_id) DO UPDATE SET locked_at = excluded.locked_at`).bind(t,s).run(),!0)}async function Zs(e,t){await e.DB.prepare("DELETE FROM post_locks WHERE account_id = ?").bind(t).run()}async function Qs(e,t,s,a,n){const i={ok:!0,errors:[],warnings:[]},r=await e.DB.prepare("SELECT daily_post_count, daily_post_limit, last_posted_at, last_daily_reset_date, health_status FROM x_accounts WHERE id = ?").bind(t).first();if(!r)return i.ok=!1,i.errors.push({code:"account_not_found",message:"アカウントが存在しません"}),i;const o=new Date(Date.now()+9*3600*1e3).toISOString().slice(0,10);let l=r.daily_post_count||0;if(r.last_daily_reset_date!==o&&(l=0),l>=(r.daily_post_limit||5)&&i.errors.push({code:"daily_limit_reached",message:`日次投稿上限 (${r.daily_post_limit}) に達しています`}),r.last_posted_at){const c=Date.parse(r.last_posted_at.replace(" ","T")+"+09:00");if(!Number.isNaN(c)){const p=(Date.now()-c)/6e4;p<15&&i.errors.push({code:"too_frequent",message:`前回投稿から ${Math.floor(p)} 分しか経過していません（最低 15 分）`,overridable:!0})}}const{results:d}=await e.DB.prepare(`SELECT id, body FROM post_queue
       WHERE account_id = ? AND status IN ('posted','approved','publishing')
       ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC
       LIMIT 5`).bind(t).all();for(const c of d||[]){const p=Xs(s,c.body||"");if(p>=.7){i.errors.push({code:"too_similar",message:`過去投稿 (ID: ${c.id}) と類似度 ${p.toFixed(2)} で重複`});break}}if(a){const c=await e.DB.prepare(`SELECT COUNT(*) AS n FROM post_queue
        WHERE account_id = ? AND link_url = ? AND status IN ('posted','approved','publishing')
          AND DATE(COALESCE(posted_at, scheduled_at, created_at)) >= DATE('now','+9 hours','-7 days')`).bind(t,a).first();((c==null?void 0:c.n)??0)>=3&&i.errors.push({code:"link_spam",message:`同一リンクを過去7日で${c==null?void 0:c.n}回使用しています`})}if(n){const c=ss(n);if(c.size>0){const{results:p}=await e.DB.prepare(`SELECT hashtags FROM post_queue
           WHERE account_id = ? AND status IN ('posted','approved','publishing') AND hashtags IS NOT NULL AND hashtags != ''
           ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 3`).bind(t).all();(p||[]).length>=3&&(p||[]).every(b=>{const T=[...ss(b.hashtags||"")].filter(A=>c.has(A)).length;return(c.size===0?0:T/c.size)>=.8})&&i.errors.push({code:"hashtag_spam",message:"同一ハッシュタグセットが 3 回連続で 80%以上一致しています"})}}return r.health_status==="risk"&&i.errors.push({code:"health_risk",message:"アカウント健全性スコアが危険域です。投稿を控えてください。"}),i.ok=i.errors.length===0,i}function ss(e){return new Set((e||"").split(/[\s,]+/).map(t=>t.trim().replace(/^#/,"").toLowerCase()).filter(Boolean))}async function ht(e,t,s,a,n){const i=await e.DB.prepare("SELECT account_health_score FROM x_accounts WHERE id = ?").bind(t).first();if(!i)return{score_after:100,status_after:"healthy"};let r=Math.max(0,Math.min(100,(i.account_health_score??100)+a));const o=r>=80?"healthy":r>=60?"caution":"risk";return await e.DB.prepare("UPDATE x_accounts SET account_health_score = ?, health_status = ?, updated_at = datetime('now','+9 hours') WHERE id = ?").bind(r,o,t).run(),await e.DB.prepare(`INSERT INTO account_health_events (account_id, event_type, delta, score_after, status_after, metadata)
     VALUES (?, ?, ?, ?, ?, ?)`).bind(t,s,a,r,o,n?JSON.stringify(n):null).run(),{score_after:r,status_after:o}}function as(e){if(!e)return Date.now();const t=e.replace(" ","T")+"+09:00",s=Date.parse(t);return Number.isNaN(s)?Date.now():s}function ns(e){return new Date(e+324e5).toISOString().replace("T"," ").slice(0,19)}async function Ln(e,t,s){const a=s.jitter_enabled!==!1,n=s.jitter_minutes??5,i=s.collision_avoidance_enabled!==!1,r=s.min_spacing_seconds??90;let o=as(t),l=0,d=0;if(a&&n>0){const f=Math.floor((Math.random()*2-1)*n*60);l=f,o+=f*1e3}if(i&&s.account_id){const f=ns(o),b=[s.account_id,f,f];let v=`
      SELECT COALESCE(effective_scheduled_at, scheduled_at) AS sat
        FROM post_queue
       WHERE account_id = ?
         AND status NOT IN ('cancelled','rejected','failed')
         AND COALESCE(effective_scheduled_at, scheduled_at) IS NOT NULL
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) >= datetime(?, '-1 hours')
         AND datetime(COALESCE(effective_scheduled_at, scheduled_at)) <= datetime(?, '+1 hours')`;s.exclude_id&&(v+=" AND id != ?",b.push(s.exclude_id)),v+=" ORDER BY sat ASC";const{results:T}=await e.DB.prepare(v).bind(...b).all();let x=!0,A=0;for(;x&&A<30;){x=!1;for(const k of T||[]){const L=as(k.sat),q=Math.abs(o-L)/1e3;if(q<r){const N=(r-q+1)*1e3*(o>=L?1:-1);o+=N,d+=Math.floor(N/1e3),x=!0}}A++}}const c=ns(o);return{effective_at:c,audit:{base_at:t,effective_at:c,jitter_applied_seconds:l,collision_adjusted_seconds:d,ruleset:{jitter_enabled:a,jitter_minutes:n,collision_avoidance_enabled:i,min_spacing_seconds:r}}}}async function Nn(e,t,s,a){await e.DB.prepare("INSERT INTO schedule_audits (post_id, account_id, audit_json) VALUES (?, ?, ?)").bind(t,s??null,JSON.stringify(a)).run()}const Mn=.7;async function $n(e){const t=[...Ct(e)].slice(0,200),s=await De(e);return JSON.stringify({bigrams:t,content_hash:s})}async function Fn(e,t,s,a){await e.DB.prepare("INSERT INTO post_fingerprints (post_id, account_id, fingerprint) VALUES (?, ?, ?)").bind(t,s??null,a).run()}async function Pn(e,t,s,a={}){const n={pass:!0,blocked_reason:null,scores:[]};if(!t||!s)return n;const i=[s];let r=`SELECT id, body FROM post_queue
              WHERE account_id = ? AND body IS NOT NULL AND body != ''
                AND status IN ('posted','approved','publishing')`;a.post_id&&(r+=" AND id != ?",i.push(a.post_id)),r+=" ORDER BY COALESCE(posted_at, scheduled_at, created_at) DESC LIMIT 5";const{results:o}=await e.DB.prepare(r).bind(...i).all();for(const l of o||[]){const d=Xs(t,l.body||"");if(n.scores.push({post_id:l.id,similarity:d}),d>=Mn){n.pass=!1,n.blocked_reason=`過去投稿(ID:${l.id})と類似度 ${d.toFixed(2)} で重複`;break}}return n}const U=new D;async function qn(e,t,s){const a=String(s??"default");let n=await e.DB.prepare("SELECT * FROM target_templates WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();n||(n=await e.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first());let i=await e.DB.prepare("SELECT * FROM brand_voice WHERE account_id = ? AND (user_id = ? OR user_id IS NULL) LIMIT 1").bind(a,t).first();return i||(i=await e.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? OR user_id IS NULL ORDER BY is_default DESC, id ASC LIMIT 1").bind(t).first()),{target:n,voice:i}}async function is(e,t){if(!(!e.TELEGRAM_BOT_TOKEN||!e.TELEGRAM_CHAT_ID))try{await fetch(`https://api.telegram.org/bot${e.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:e.TELEGRAM_CHAT_ID,text:t,parse_mode:"HTML"})})}catch{}}async function rs(e,t){try{await e.DB.prepare(`INSERT INTO post_logs
         (record_id, account_id, user_id, account_name, platform,
          source_type, generation_type, post_mode, content, content_hash, link_url,
          media_type, media_upload_status, media_id,
          thread_parent_id, thread_order, thread_total_count,
          recycle_source_post_id, recycle_rule,
          scheduled_at, executed_at, posted_at, status, error_message, api_response_summary)
       VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.record_id??null,t.account_id??null,t.user_id??null,t.account_name??"",t.source_type??"",t.generation_type??null,t.post_mode??"body",t.content??"",t.content_hash??"",t.link_url??"",t.media_type??null,t.media_upload_status??null,t.media_id??null,t.thread_parent_id??null,t.thread_order??null,t.thread_total_count??null,t.recycle_source_post_id??null,t.recycle_rule??null,t.scheduled_at??null,t.executed_at??g(),t.posted_at??null,t.status??"posted",t.error_message??null,t.api_response_summary??null).run()}catch(s){console.error("[PostLog]",s.message)}}U.get("/api/admin/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=e.req.query("post_mode"),i=parseInt(e.req.query("page")||"1",10),r=50,o=(i-1)*r;let l="WHERE pq.platform='x' AND pq.user_id = ?";const d=[t.id];s&&s!=="all"&&(l+=" AND pq.status = ?",d.push(s)),a&&(l+=" AND pq.account_id = ?",d.push(Number(a))),n&&n!=="all"&&(l+=" AND pq.post_mode = ?",d.push(n));const{results:c}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${l} ORDER BY pq.created_at DESC LIMIT ? OFFSET ?`).bind(...d,r,o).all(),p=await e.env.DB.prepare(`SELECT COUNT(*) AS total FROM post_queue pq ${l}`).bind(...d).first();return e.json({posts:c||[],total:(p==null?void 0:p.total)??0,page:i})});U.get("/api/admin/posts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       WHERE pq.id = ? AND pq.user_id = ?`).bind(s,t.id).first();return a?e.json({post:a}):e.json({error:"Not found"},404)});U.post("/api/admin/posts",m,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body is required"},400);const a=g(),n=await De(s.body);if(s.scheduled_at&&s.post_mode==="scheduled_once"){const r=await e.env.DB.prepare(`SELECT id FROM post_queue WHERE platform='x' AND user_id=? AND account_id IS ?
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
             ?, ?)`).bind(t.id,s.account_id??null,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body",s.status??"pending",s.scheduled_at??null,n,s.generation_type??null,s.source_type??"manual_post",s.recurrence_type??null,s.recurrence_rule??null,s.recurrence_end_at??null,s.next_run_at??null,s.recycle_rule??null,s.source_post_id??null,s.min_engagement_score??0,s.rewrite_mode??null,s.thread_parent_id??null,s.thread_order??0,s.thread_count??0,s.media_type??null,s.media_file_path??null,a,a).run();return e.json({success:!0,id:i.meta.last_row_id})});U.post("/api/admin/posts/generate",m,async e=>{const t=e.get("user"),s=e.env.OPENAI_API_KEY,{theme:a,keywords:n,count:i,pattern_type:r,post_mode:o,link_url:l,hashtags:d,footer_text:c,account_id:p,generation_type:f}=await e.req.json();if(!a)return e.json({error:"theme required"},400);if(!s)return e.json({error:"OPENAI_API_KEY not set"},500);let b=p??null;if(!b){const k=await e.env.DB.prepare("SELECT id FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first();b=(k==null?void 0:k.id)??null}const{target:v,voice:T}=await qn(e.env,t.id,b),x=g(),A=[];try{const k=Math.min(i||1,10);for(let L=0;L<k;L++){const q=o||"body";let N;r?N=await Vs(s,r,a,n||"",v,T,q):N=await Ks(s,a,n||"",v,T,q),c&&(N=N.trimEnd()+`

`+c.trim());const rt=await De(N),Q=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, theme, keywords, body, link_url, hashtags, post_mode, pattern_type,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`).bind(t.id,b,a,n||"",N,l||null,d||null,q,r||null,rt,f||r||"general",r?"pattern_generated_post":"ai_generated_post",x,x).run();A.push({id:Q.meta.last_row_id,body:N,link_url:l||"",post_mode:q});try{await e.env.DB.prepare(`INSERT INTO generation_logs
             (user_id, account_id, brand_voice_id, target_setting_id, post_mode, generation_type, output_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,b,(T==null?void 0:T.id)??null,(v==null?void 0:v.id)??null,q,r||"general",N.slice(0,500)).run()}catch{}}return e.json({success:!0,generated:A,count:A.length})}catch(k){return e.json({error:"AI error: "+k.message},500)}});U.post("/api/admin/posts/:id/approve",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='approved', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/reject",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='rejected', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/schedule",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),{scheduled_at:a,jitter_enabled:n=!0,jitter_minutes:i=5,collision_avoidance_enabled:r=!0,min_spacing_seconds:o=90}=await e.req.json();if(!a)return e.json({error:"scheduled_at required"},400);const l=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();if(!l)return e.json({success:!1,error:"Not found"},404);const d=await Pn(e.env,l.body||"",l.account_id??null,{post_id:l.id});if(!d.pass)return e.json({success:!1,error:"類似: "+d.blocked_reason,similarity_blocked:!0,scores:d.scores});const{effective_at:c,audit:p}=await Ln(e.env,a,{jitter_enabled:n,jitter_minutes:i,collision_avoidance_enabled:r,min_spacing_seconds:o,account_id:l.account_id,exclude_id:l.id}),f=await $n(l.body||"");return await Fn(e.env,l.id,l.account_id,f),await e.env.DB.prepare(`UPDATE post_queue SET
       status='approved', base_scheduled_at=?, effective_scheduled_at=?, scheduled_at=?,
       jitter_enabled=?, jitter_minutes=?, collision_avoidance_enabled=?, min_spacing_seconds=?,
       schedule_resolution_log=?, updated_at=?
     WHERE id=?`).bind(a,c,c,n?1:0,i,r?1:0,o,JSON.stringify(p),g(),s).run(),await Nn(e.env,l.id,l.account_id,p),e.json({success:!0,base_scheduled_at:a,effective_scheduled_at:c,scheduled_at:c,audit:p})});U.post("/api/admin/posts/:id/post-now",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=(await e.req.json().catch(()=>({}))).force_override===!0,n=await e.env.DB.prepare("SELECT * FROM post_queue WHERE id=? AND user_id=?").bind(s,t.id).first();if(!n)return e.json({success:!1,error:"Not found"},404);let i=null;if(n.account_id&&(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=? AND user_id=?").bind(n.account_id,t.id).first()),i||(i=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE user_id=? AND is_active=1 ORDER BY id ASC LIMIT 1").bind(t.id).first(),i&&await e.env.DB.prepare("UPDATE post_queue SET account_id=? WHERE id=?").bind(i.id,s).run()),!i)return e.json({success:!1,error:"No active X account"});const r=await Qs(e.env,i.id,n.body||"",n.link_url,n.hashtags),o=r.errors.filter(l=>!(a&&l.overridable));if(o.length>0){const l=r.errors.find(d=>d.overridable);return l&&!a?e.json({success:!1,error:l.message,overridable:!0,cooldown_override:!0}):e.json({success:!1,error:"Safety: "+o.map(d=>d.message).join("; ")})}if(!await Gs(e.env,i.id))return e.json({success:!1,error:"Account busy"});try{await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=?").bind(g(),s).run();const l=await Ut(e.env,i);let d=Et(n.body||"",n.post_mode);n.link_url&&(d+=`
`+n.link_url),n.hashtags&&(d+=`
`+n.hashtags);const c=[];if(n.media_json)try{const f=JSON.parse(n.media_json);for(const b of(f||[]).slice(0,4)){const v=await e.env.DB.prepare("SELECT * FROM media_assets WHERE id=? AND user_id=?").bind(b,t.id).first();v!=null&&v.x_media_id&&c.push(v.x_media_id)}}catch{}const p=c.length>0?await Ws(l,d,c,null):await Us(l,d);return await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(p.id||"",g(),g(),s).run(),await e.env.DB.prepare(`UPDATE x_accounts SET last_posted_at=?, daily_post_count=daily_post_count+1,
         last_daily_reset_date = DATE('now','+9 hours'), updated_at=? WHERE id=?`).bind(g(),g(),i.id).run(),await rs(e.env,{record_id:s,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type||"manual_post",generation_type:n.generation_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",link_url:n.link_url,posted_at:g(),status:"posted",api_response_summary:JSON.stringify({tweet_id:p.id})}),await is(e.env,`X posted @${i.x_username||i.account_name} ID:${p.id}`),e.json({success:!0,tweet_id:p.id})}catch(l){return await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(l.message,g(),s).run(),await rs(e.env,{record_id:s,account_id:i.id,user_id:t.id,account_name:i.account_name,source_type:n.source_type,post_mode:n.post_mode,content:n.body||"",content_hash:n.content_hash||"",status:"failed",error_message:l.message}),l instanceof qt?await ht(e.env,i.id,"rate_limit",-15):await ht(e.env,i.id,"error",-5,{message:l.message}),await is(e.env,`X post FAILED #${s} ${l.message}`),e.json({success:!1,error:l.message})}finally{await Zs(e.env,i.id)}});U.put("/api/admin/posts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g(),i=a.body?await De(a.body):null;return a.media_json!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET media_json=?, updated_at=? WHERE id=? AND user_id=?").bind(a.media_json,n,s,t.id).run(),e.json({success:!0})):a.account_id!==void 0&&a.body===void 0?(await e.env.DB.prepare("UPDATE post_queue SET account_id=?, updated_at=? WHERE id=? AND user_id=?").bind(a.account_id,n,s,t.id).run(),e.json({success:!0})):(await e.env.DB.prepare(`UPDATE post_queue SET
       body=?, link_url=?, hashtags=?, scheduled_at=?, post_mode=?,
       media_json=COALESCE(?, media_json), content_hash=COALESCE(?, content_hash),
       recurrence_type=COALESCE(?, recurrence_type),
       recurrence_rule=COALESCE(?, recurrence_rule),
       next_run_at=COALESCE(?, next_run_at),
       recurrence_end_at=COALESCE(?, recurrence_end_at),
       updated_at=?
     WHERE id=? AND user_id=?`).bind(a.body,a.link_url??null,a.hashtags??null,a.scheduled_at??null,a.post_mode??"body",a.media_json??null,i,a.recurrence_type??null,a.recurrence_rule??null,a.next_run_at??null,a.recurrence_end_at??null,n,s,t.id).run(),e.json({success:!0}))});U.delete("/api/admin/posts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM post_queue WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.post("/api/admin/posts/:id/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE post_queue SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});U.get("/api/admin/posts-scheduled",m,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=[t.id];let n="WHERE pq.platform='x' AND pq.user_id=? AND pq.scheduled_at IS NOT NULL AND pq.status NOT IN ('cancelled','rejected')";s&&(n+=" AND pq.account_id=?",a.push(Number(s)));const{results:i}=await e.env.DB.prepare(`SELECT pq.*, xa.account_name
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id=xa.id
       ${n} ORDER BY pq.scheduled_at ASC`).bind(...a).all(),r=[t.id];let o="WHERE aj.user_id=? AND aj.status NOT IN ('cancelled','error') AND aj.publish_at IS NOT NULL";s&&(o+=" AND aj.account_id=?",r.push(Number(s)));const{results:l}=await e.env.DB.prepare(`SELECT aj.id, aj.account_id, aj.theme AS body, aj.publish_at AS scheduled_at, aj.status,
            aj.content_mode AS post_type, 'autopilot' AS source_type, xa.account_name,
            aj.options_json AS media_json
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id=xa.id
       ${o} ORDER BY aj.publish_at ASC`).bind(...r).all(),d=(l||[]).map(p=>({...p,post_mode:"body",id:"ap-"+p.id})),c=[...i||[],...d].sort((p,f)=>(p.scheduled_at||"").localeCompare(f.scheduled_at||""));return e.json({posts:c})});U.post("/api/admin/posts/thread",m,async e=>{const t=e.get("user"),{tweets:s,link_url:a,account_id:n}=await e.req.json();if(!s||!Array.isArray(s)||s.length<2)return e.json({error:"Thread requires 2+ tweets"},400);const i=g(),r=await De(s[0].body),l=(await e.env.DB.prepare(`INSERT INTO post_queue
       (platform, user_id, account_id, body, link_url, post_mode, thread_count,
        content_hash, source_type, status, created_at, updated_at)
     VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[0].body,s[0].link_url??a??null,s.length,r,i,i).run()).meta.last_row_id,d=[l];for(let c=1;c<s.length;c++){const p=await De(s[c].body),f=await e.env.DB.prepare(`INSERT INTO post_queue
         (platform, user_id, account_id, body, link_url, post_mode,
          thread_parent_id, thread_order, content_hash, source_type, status, created_at, updated_at)
       VALUES ('x', ?, ?, ?, ?, 'thread', ?, ?, ?, 'manual_post', 'pending', ?, ?)`).bind(t.id,n??null,s[c].body,s[c].link_url??null,l,c,p,i,i).run();d.push(f.meta.last_row_id)}return e.json({success:!0,parent_id:l,ids:d})});const ea=new D,Hn=5;ea.post("/cron/tick",async e=>{const t=g(),{results:s}=await e.env.DB.prepare(`SELECT * FROM post_queue
      WHERE platform='x'
        AND status IN ('pending','approved')
        AND (
              COALESCE(effective_scheduled_at, scheduled_at) IS NULL
           OR COALESCE(effective_scheduled_at, scheduled_at) <= datetime('now','+9 hours')
        )
      ORDER BY COALESCE(effective_scheduled_at, scheduled_at, created_at) ASC
      LIMIT ?`).bind(Hn).all();let a=0,n=0,i=0;for(const r of s||[]){const o=await e.env.DB.prepare("UPDATE post_queue SET status='publishing', updated_at=? WHERE id=? AND status IN ('pending','approved')").bind(t,r.id).run();if(!(!o.success||o.meta.changes===0)){a++;try{if(!r.account_id)throw new Error("account_id is null");const l=await e.env.DB.prepare("SELECT * FROM x_accounts WHERE id=?").bind(r.account_id).first();if(!l)throw new Error("account_not_found");const d=await Qs(e.env,l.id,r.body||"",r.link_url,r.hashtags);if(!d.ok)throw new Error("safety: "+d.errors.map(c=>c.message).join("; "));if(!await Gs(e.env,l.id))throw new Error("account_busy");try{const c=await Ut(e.env,l);let p=Et(r.body||"",r.post_mode);r.link_url&&(p+=`
`+r.link_url),r.hashtags&&(p+=`
`+r.hashtags);const f=[];if(r.media_json)try{const v=JSON.parse(r.media_json);for(const T of(v||[]).slice(0,4)){const x=await e.env.DB.prepare("SELECT x_media_id FROM media_assets WHERE id=?").bind(T).first();x!=null&&x.x_media_id&&f.push(x.x_media_id)}}catch{}const b=f.length>0?await Ws(c,p,f,null):await Us(c,p);await e.env.DB.prepare("UPDATE post_queue SET status='posted', external_post_id=?, posted_at=?, updated_at=? WHERE id=?").bind(b.id||"",g(),g(),r.id).run(),await e.env.DB.prepare(`UPDATE x_accounts SET
             last_posted_at = ?,
             daily_post_count = CASE
               WHEN last_daily_reset_date != DATE('now','+9 hours') THEN 1
               ELSE daily_post_count + 1
             END,
             last_daily_reset_date = DATE('now','+9 hours'),
             updated_at = ?
           WHERE id = ?`).bind(g(),g(),l.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
             (record_id, account_id, user_id, account_name, platform, source_type, generation_type,
              post_mode, content, content_hash, link_url, posted_at, executed_at, status, api_response_summary)
           VALUES (?, ?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, 'posted', ?)`).bind(r.id,l.id,r.user_id,l.account_name,r.source_type,r.generation_type,r.post_mode,r.body||"",r.content_hash||"",r.link_url||"",g(),g(),JSON.stringify({tweet_id:b.id})).run(),await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_sent)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_sent = posts_sent + 1,
             updated_at = datetime('now','+9 hours')`).bind(l.id,r.user_id).run(),n++}finally{await Zs(e.env,l.id)}}catch(l){const d=(l==null?void 0:l.message)||"unknown_error";await e.env.DB.prepare("UPDATE post_queue SET status='failed', error_message=?, updated_at=? WHERE id=?").bind(d,g(),r.id).run(),await e.env.DB.prepare(`INSERT INTO post_logs
           (record_id, account_id, user_id, platform, source_type, post_mode, content, content_hash,
            status, error_message, executed_at)
         VALUES (?, ?, ?, 'x', ?, ?, ?, ?, 'failed', ?, ?)`).bind(r.id,r.account_id,r.user_id,r.source_type,r.post_mode,r.body||"",r.content_hash||"",d,g()).run(),r.account_id&&(l instanceof qt?await ht(e.env,r.account_id,"rate_limit",-15):await ht(e.env,r.account_id,"error",-5,{message:d})),r.account_id&&await e.env.DB.prepare(`INSERT INTO kpi_metrics (account_id, user_id, metric_date, posts_failed)
           VALUES (?, ?, date('now','+9 hours'), 1)
           ON CONFLICT(account_id, metric_date) DO UPDATE SET
             posts_failed = posts_failed + 1,
             updated_at = datetime('now','+9 hours')`).bind(r.account_id,r.user_id).run(),i++}}}return e.json({ok:!0,processed:a,success:n,failed:i,now:t})});const ve=new D;ve.get("/api/admin/autopilot/jobs",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.*, xa.account_name
       FROM autopilot_jobs aj LEFT JOIN x_accounts xa ON aj.account_id = xa.id
      WHERE aj.user_id = ?
      ORDER BY COALESCE(aj.generate_at, aj.publish_at, aj.created_at) DESC LIMIT 100`).bind(t.id).all(),{results:a}=await e.env.DB.prepare("SELECT id, account_name FROM x_accounts WHERE user_id = ? AND is_active = 1").bind(t.id).all();return e.json({jobs:s||[],accounts:a||[]})});ve.get("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).first();return s?e.json(s):e.json({error:"not found"})});ve.post("/api/admin/autopilot/jobs",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=g(),n=(s.publish_at||s.generate_at||a).slice(0,10),i=await e.env.DB.prepare(`SELECT COUNT(*) AS cnt FROM autopilot_jobs
       WHERE user_id=? AND account_id=?
         AND SUBSTR(COALESCE(publish_at, generate_at, created_at), 1, 10)=?
         AND status NOT IN ('cancelled')`).bind(t.id,s.account_id||0,n).first();if(((i==null?void 0:i.cnt)??0)>=10)return e.json({success:!1,error:"この日は既に10件の予約があります"});const r=await e.env.DB.prepare("SELECT MAX(CAST(reservation_no AS INTEGER)) AS mx FROM autopilot_jobs").first(),o=String(((r==null?void 0:r.mx)??0)+1).padStart(4,"0");let l=s.generate_at??null;if(s.publish_at&&!s.generate_at)try{const p=new Date(s.publish_at.replace(" ","T"));p.setMinutes(p.getMinutes()-2),l=p.toISOString().replace("T"," ").slice(0,19)}catch{}const d=l||s.publish_at?"configured":"draft",c=await e.env.DB.prepare(`INSERT INTO autopilot_jobs
       (reservation_no, user_id, account_id, channel_type, content_mode, theme, keywords,
        prompt_text, options_json, title_memo, link_url, generate_at, publish_at, status, created_at, updated_at)
     VALUES (?, ?, ?, 'x', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(o,t.id,s.account_id??null,s.content_mode||"problem",s.theme||"",s.keywords||"",s.prompt_text||"",s.options_json||"{}",s.title_memo||"",s.link_url||"",l,s.publish_at||null,d,a,a).run();return e.json({success:!0,id:c.meta.last_row_id,reservation_no:o})});ve.put("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json(),n=g();let i=a.generate_at??null;if(a.publish_at&&!a.generate_at)try{const o=new Date(a.publish_at.replace(" ","T"));o.setMinutes(o.getMinutes()-2),i=o.toISOString().replace("T"," ").slice(0,19)}catch{}const r=i||a.publish_at?"configured":"draft";return await e.env.DB.prepare(`UPDATE autopilot_jobs SET
       content_mode=?, theme=?, keywords=?, prompt_text=?, options_json=?, title_memo=?,
       link_url=?, generate_at=?, publish_at=?, status=?, updated_at=?
     WHERE id=? AND user_id=?`).bind(a.content_mode||"problem",a.theme||"",a.keywords||"",a.prompt_text||"",a.options_json||"{}",a.title_memo||"",a.link_url||"",i,a.publish_at||null,r,n,s,t.id).run(),e.json({success:!0})});ve.delete("/api/admin/autopilot/jobs/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM autopilot_jobs WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ve.post("/api/admin/autopilot/jobs/:id/cancel",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("UPDATE autopilot_jobs SET status='cancelled', updated_at=? WHERE id=? AND user_id=?").bind(g(),parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});ve.post("/cron/autopilot-tick",async e=>{if(!e.env.OPENAI_API_KEY)return e.json({ok:!0,skipped:"no_openai_key"});const{results:t}=await e.env.DB.prepare(`SELECT * FROM autopilot_jobs
       WHERE status = 'configured'
         AND generate_at IS NOT NULL
         AND generate_at <= datetime('now','+9 hours')
       ORDER BY generate_at ASC LIMIT 5`).all();let s=0;for(const a of t||[])try{const n=String(a.account_id??"default");let i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();i||(i=await e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(n,a.user_id).first();r||(r=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id=? ORDER BY is_default DESC LIMIT 1").bind(a.user_id).first());let o;a.content_mode&&a.content_mode!=="freetext"?o=await Vs(e.env.OPENAI_API_KEY,a.content_mode,a.theme||"",a.keywords||"",i,r,"body"):o=await Ks(e.env.OPENAI_API_KEY,a.theme||"",a.keywords||"",i,r,"body");const l=await De(o),d=g(),c=await e.env.DB.prepare(`INSERT INTO post_queue
           (platform, user_id, account_id, body, link_url, post_mode,
            scheduled_at, effective_scheduled_at, base_scheduled_at,
            content_hash, generation_type, source_type, status, created_at, updated_at)
         VALUES ('x', ?, ?, ?, ?, 'body', ?, ?, ?, ?, ?, 'autopilot', 'approved', ?, ?)`).bind(a.user_id,a.account_id,o,a.link_url,a.publish_at,a.publish_at,a.publish_at,l,a.content_mode,d,d).run();await e.env.DB.prepare("UPDATE autopilot_jobs SET status='generated', generated_post_id=?, updated_at=? WHERE id=?").bind(c.meta.last_row_id,d,a.id).run(),s++}catch(n){await e.env.DB.prepare("UPDATE autopilot_jobs SET status='error', error_message=?, updated_at=? WHERE id=?").bind((n==null?void 0:n.message)||"unknown_error",g(),a.id).run()}return e.json({ok:!0,generated:s,total:(t||[]).length})});const os={topics:[{title:"投稿の基本",keywords:["投稿","ポスト","ツイート","post","tweet"],answer:"[新規投稿] タブから本文を入力し「投稿キューへ」で予約できます。即時投稿は [今すぐ投稿] ボタンから。"},{title:"オートパイロット",keywords:["オートパイロット","autopilot","自動投稿","自動"],answer:"[オートパイロット] タブでジョブを作成すると、指定時刻に OpenAI が投稿案を生成しキューに入ります。"},{title:"アカウント連携",keywords:["連携","アカウント","追加","OAuth","トークン"],answer:"X Developer Portal で Consumer Key/Secret と Access Token/Secret を取得し、[アカウント管理] から追加してください。OAuth 1.0a User Context を使用します。"},{title:"ライセンス",keywords:["ライセンス","認証","license","VPS-GE365X"],answer:"ログイン画面の [ライセンス] タブから VPS-GE365X-XXXXXXXX 形式のキーを入力するとプランが有効化されます。"},{title:"類似度制御",keywords:["類似","重複","ブロック","similarity"],answer:"同一アカウントの直近5件と Jaccard係数 0.7 以上の類似があると投稿がブロックされます。"},{title:"投稿間隔",keywords:["間隔","時間","cooldown","spacing"],answer:"最低投稿間隔は15分、推奨は30〜120分のランダム。jitter で ±5分の微分散も付与されます。"}],default_response:"該当するトピックが見つかりませんでした。[アカウント管理][投稿][オートパイロット][ライセンス] 等のキーワードで試してください。"},Ue=new D;async function Wt(e){const t=await e.DB.prepare("SELECT json_data FROM chatbot_kb WHERE id = 1").first();if(t!=null&&t.json_data)try{return JSON.parse(t.json_data)}catch{}return await e.DB.prepare("INSERT OR IGNORE INTO chatbot_kb (id, json_data) VALUES (1, ?)").bind(JSON.stringify(os)).run(),os}Ue.get("/api/admin/chatbot/topics",m,async e=>{const t=await Wt(e.env);return e.json({topics:(t.topics||[]).map((s,a)=>({id:a,title:s.title,keywords:s.keywords}))})});Ue.post("/api/admin/chatbot/ask",m,async e=>{const t=await Wt(e.env),a=((await e.req.json().catch(()=>({}))).question||"").toLowerCase().trim();if(!a)return e.json({answer:t.default_response});let n=null,i=0;for(const r of t.topics||[]){let o=0;for(const l of r.keywords||[])a.includes(l.toLowerCase())&&(o+=l.length);o>i&&(i=o,n=r)}return n?e.json({answer:n.answer,title:n.title,matched:!0}):e.json({answer:t.default_response,matched:!1})});Ue.get("/api/admin/chatbot/topic/:id",m,async e=>{const s=((await Wt(e.env)).topics||[])[parseInt(e.req.param("id"),10)];return s?e.json({topic:s}):e.json({error:"トピック未登録"},404)});Ue.put("/api/admin/chatbot/kb",m,I,async e=>{const t=await e.req.json();return!t||!Array.isArray(t.topics)?e.json({error:"invalid_kb"},400):(await e.env.DB.prepare(`INSERT INTO chatbot_kb (id, json_data, updated_at)
     VALUES (1, ?, datetime('now','+9 hours'))
     ON CONFLICT(id) DO UPDATE SET json_data=excluded.json_data, updated_at=excluded.updated_at`).bind(JSON.stringify(t)).run(),e.json({success:!0,topic_count:t.topics.length}))});Ue.post("/api/admin/chatbot",m,async e=>{var r,o,l;const t=e.get("user"),{message:s}=await e.req.json();if(!s)return e.json({reply:"メッセージが空です"},400);const a=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key=?").bind("openai_api_key_"+t.id).first();if(!(a!=null&&a.value))return e.json({reply:"OpenAI APIキーが設定されていません。API設定ページから設定してください。"});const{decryptValue:n}=await Promise.resolve().then(()=>Hs),i=await n(a.value,e.env.ENCRYPTION_KEY);try{const p=((l=(o=(r=(await(await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+i},body:JSON.stringify({model:e.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"あなたはGrowth-engine365XのAIアシスタントです。X(Twitter)の投稿戦略、AI生成、オートパイロット設定について日本語で簡潔にアドバイスしてください。"},{role:"user",content:s}],max_tokens:500})})).json()).choices)==null?void 0:r[0])==null?void 0:o.message)==null?void 0:l.content)||"応答を取得できませんでした";return e.json({reply:p})}catch(d){return e.json({reply:"AI応答エラー: "+d.message})}});const nt=new D;nt.get("/api/admin/drafts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200`).bind(t.id).all();return e.json({drafts:s||[]})});nt.post("/api/admin/drafts",m,async e=>{const t=e.get("user"),s=await e.req.json();if(!s.body)return e.json({error:"body required"},400);const a=await e.env.DB.prepare(`INSERT INTO drafts (user_id, account_id, title, body, link_url, hashtags, post_mode)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t.id,s.account_id??null,s.title??null,s.body,s.link_url??null,s.hashtags??null,s.post_mode??"body").run();return e.json({success:!0,id:a.meta.last_row_id})});nt.put("/api/admin/drafts/:id",m,async e=>{const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.req.json();return await e.env.DB.prepare(`UPDATE drafts SET
       title = COALESCE(?, title),
       body = COALESCE(?, body),
       link_url = COALESCE(?, link_url),
       hashtags = COALESCE(?, hashtags),
       post_mode = COALESCE(?, post_mode),
       account_id = COALESCE(?, account_id),
       updated_at = ?
     WHERE id = ? AND user_id = ?`).bind(a.title??null,a.body??null,a.link_url??null,a.hashtags??null,a.post_mode??null,a.account_id??null,g(),s,t.id).run(),e.json({success:!0})});nt.delete("/api/admin/drafts/:id",m,async e=>{const t=e.get("user");return await e.env.DB.prepare("DELETE FROM drafts WHERE id=? AND user_id=?").bind(parseInt(e.req.param("id"),10),t.id).run(),e.json({success:!0})});const it=new D;it.get("/api/admin/media",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, file_type, mime_type, file_name, byte_size, storage_path, x_media_id,
            upload_status, last_error, created_at
       FROM media_assets WHERE user_id = ? ORDER BY id DESC LIMIT 200`).bind(t.id).all();return e.json({assets:s||[]})});it.post("/api/admin/media",m,async e=>{const t=e.get("user");if(!e.env.MEDIA_BUCKET)return e.json({error:"R2 bucket (MEDIA_BUCKET) not configured"},501);const a=(await e.req.parseBody()).file;if(!a)return e.json({error:"file required"},400);const n=a.type.startsWith("video/")?"video":"image",i=`u${t.id}/${Date.now()}-${a.name}`;await e.env.MEDIA_BUCKET.put(i,await a.arrayBuffer(),{httpMetadata:{contentType:a.type}});const r=await e.env.DB.prepare(`INSERT INTO media_assets (user_id, file_type, mime_type, file_name, byte_size, storage_path, upload_status)
     VALUES (?, ?, ?, ?, ?, ?, 'ready')`).bind(t.id,n,a.type,a.name,a.size,`/media/${i}`).run();return e.json({success:!0,id:r.meta.last_row_id,storage_path:`/media/${i}`})});it.delete("/api/admin/media/:id",m,async e=>{var n;const t=e.get("user"),s=parseInt(e.req.param("id"),10),a=await e.env.DB.prepare("SELECT storage_path FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).first();if((n=a==null?void 0:a.storage_path)!=null&&n.startsWith("/media/")&&e.env.MEDIA_BUCKET){const i=a.storage_path.slice(7);await e.env.MEDIA_BUCKET.delete(i).catch(()=>{})}return await e.env.DB.prepare("DELETE FROM media_assets WHERE id=? AND user_id=?").bind(s,t.id).run(),e.json({success:!0})});it.get("/media/*",async e=>{if(!e.env.MEDIA_BUCKET)return e.notFound();const t=e.req.path.replace(/^\/media\//,""),s=await e.env.MEDIA_BUCKET.get(t);if(!s)return e.notFound();const a=new Headers;return s.writeHttpMetadata(a),a.set("etag",s.httpEtag),new Response(s.body,{headers:a})});const Yt=new D;Yt.get("/api/admin/kpi",m,async e=>{const t=e.get("user"),s=e.req.query("account_id"),a=parseInt(e.req.query("days")||"30",10),n=[t.id,a];let i="WHERE km.user_id = ? AND km.metric_date >= date('now','+9 hours','-' || ? || ' days')";s&&(i+=" AND km.account_id = ?",n.push(Number(s)));const{results:r}=await e.env.DB.prepare(`SELECT km.*, xa.account_name
       FROM kpi_metrics km LEFT JOIN x_accounts xa ON xa.id = km.account_id
       ${i} ORDER BY km.metric_date DESC, km.account_id ASC`).bind(...n).all();return e.json({metrics:r||[]})});Yt.get("/api/admin/kpi/summary",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date = date('now','+9 hours')`).bind(t.id).first(),a=await e.env.DB.prepare(`SELECT SUM(posts_sent) AS sent, SUM(posts_failed) AS failed
       FROM kpi_metrics WHERE user_id = ? AND metric_date >= date('now','+9 hours','-7 days')`).bind(t.id).first();return e.json({today:{sent:(s==null?void 0:s.sent)??0,failed:(s==null?void 0:s.failed)??0},week:{sent:(a==null?void 0:a.sent)??0,failed:(a==null?void 0:a.failed)??0}})});const xt=new D;xt.get("/api/admin/logs/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("account_id"),n=[t.id];let i="WHERE pl.user_id = ?";s&&s!=="all"&&(i+=" AND pl.status = ?",n.push(s)),a&&(i+=" AND pl.account_id = ?",n.push(Number(a)));const{results:r}=await e.env.DB.prepare(`SELECT pl.*, xa.account_name AS joined_account_name
       FROM post_logs pl LEFT JOIN x_accounts xa ON pl.account_id = xa.id
       ${i} ORDER BY pl.id DESC LIMIT 300`).bind(...n).all();return e.json({logs:r||[]})});xt.get("/api/admin/logs/generations",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.*, xa.account_name
       FROM generation_logs gl LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});xt.get("/api/admin/logs/health",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT he.*, xa.account_name
       FROM account_health_events he LEFT JOIN x_accounts xa ON he.account_id = xa.id
       WHERE xa.user_id = ?
       ORDER BY he.id DESC LIMIT 200`).bind(t.id).all();return e.json({logs:s||[]})});const wt=new D;wt.get("/api/admin/target/presets",m,e=>e.json({templates:Ys}));wt.get("/api/admin/target",m,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({target:a})});wt.post("/api/admin/target",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM target_templates WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE target_templates SET
         template_key=?, label=?, age_range=?, gender=?, genre=?, occupation=?,
         pains=?, desires=?, purchase_triggers=?, problem=?, goal=?, knowledge=?,
         is_default=?, updated_at=?
       WHERE id=?`).bind(s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO target_templates
         (account_id, user_id, template_key, label, age_range, gender, genre, occupation,
          pains, desires, purchase_triggers, problem, goal, knowledge, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.template_key??null,s.label??null,s.age_range??null,s.gender??null,s.genre??null,s.occupation??null,s.pains??null,s.desires??null,s.purchase_triggers??null,s.problem??null,s.goal??null,s.knowledge??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const kt=new D;kt.get("/api/admin/voice/presets",m,e=>e.json({templates:Rn}));kt.get("/api/admin/voice",m,async e=>{const t=e.get("user"),s=e.req.query("account_id")||"default",a=await e.env.DB.prepare("SELECT * FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(s,t.id).first();return e.json({voice:a})});kt.post("/api/admin/voice",m,async e=>{const t=e.get("user"),s=await e.req.json(),a=String(s.account_id??"default"),n=g(),i=await e.env.DB.prepare("SELECT id FROM brand_voice WHERE account_id=? AND user_id=? LIMIT 1").bind(a,t.id).first();if(i)return await e.env.DB.prepare(`UPDATE brand_voice SET
         voice_key=?, label=?, tone=?, worldview=?, personal_story=?,
         prohibited_words=?, sample_posts=?, is_default=?, updated_at=?
       WHERE id=?`).bind(s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0,n,i.id).run(),e.json({success:!0,id:i.id});{const r=await e.env.DB.prepare(`INSERT INTO brand_voice
         (account_id, user_id, voice_key, label, tone, worldview, personal_story,
          prohibited_words, sample_posts, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(a,t.id,s.voice_key??null,s.label??null,s.tone??null,s.worldview??null,s.personal_story??null,s.prohibited_words??null,s.sample_posts??null,s.is_default?1:0).run();return e.json({success:!0,id:r.meta.last_row_id})}});const Ie=new D;Ie.get("/api/admin/api-settings",m,async e=>{const t=e.get("user"),s=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(t.id).first(),a=await e.env.DB.prepare("SELECT key, value FROM system_settings WHERE key IN ('openai_api_key','openai_model','telegram_bot_token','telegram_chat_id')").all(),n={};for(const d of a.results||[])n[d.key]=d.value;const i=s!=null&&s.api_key?await pt(s.api_key,e.env.ENCRYPTION_KEY):"",r=s!=null&&s.api_secret?"••••••••":"",o=n.openai_api_key?"••••••••":"",l=n.telegram_bot_token?"••••••••":"";return e.json({api_key:i,api_secret:r,openai_key:o,openai_model:n.openai_model||"gpt-4o-mini",telegram_token:l,telegram_chat_id:n.telegram_chat_id||""})});Ie.post("/api/admin/api-settings/x",m,async e=>{const t=e.get("user"),{api_key:s,api_secret:a}=await e.req.json();if(!s||s.includes("•"))return e.json({success:!1,error:"api_key required"},400);const n=await re(s.trim(),e.env.ENCRYPTION_KEY),i=a&&!a.includes("•")?await re(a.trim(),e.env.ENCRYPTION_KEY):null;return await e.env.DB.prepare("SELECT id FROM x_api_settings WHERE user_id = ?").bind(t.id).first()?i?await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, api_secret=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,i,t.id).run():await e.env.DB.prepare("UPDATE x_api_settings SET api_key=?, updated_at=datetime('now','+9 hours') WHERE user_id=?").bind(n,t.id).run():await e.env.DB.prepare("INSERT INTO x_api_settings (user_id, api_key, api_secret) VALUES (?, ?, ?)").bind(t.id,n,i||"").run(),e.json({success:!0})});Ie.post("/api/admin/api-settings/openai",m,async e=>{const{openai_key:t,openai_model:s}=await e.req.json();if(t&&!t.includes("•")){const a=await re(t.trim(),e.env.ENCRYPTION_KEY);await _t(e,"openai_api_key",a,"OpenAI API Key (AES暗号化)")}return s&&await _t(e,"openai_model",s,"OpenAI モデル名"),e.json({success:!0})});Ie.post("/api/admin/api-settings/telegram",m,async e=>{const{telegram_token:t,telegram_chat_id:s}=await e.req.json();if(t&&!t.includes("•")){const a=await re(t.trim(),e.env.ENCRYPTION_KEY);await _t(e,"telegram_bot_token",a,"Telegram Bot Token (AES暗号化)")}return s&&await _t(e,"telegram_chat_id",s,"Telegram Chat ID"),e.json({success:!0})});Ie.post("/api/admin/api-settings/:kind/test",m,async e=>{const t=e.req.param("kind"),s=e.get("user");try{if(t==="x"){const a=await e.env.DB.prepare("SELECT api_key, api_secret FROM x_api_settings WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(s.id).first();if(!(a!=null&&a.api_key))return e.json({success:!1,error:"X API Key 未設定"});const n=await pt(a.api_key,e.env.ENCRYPTION_KEY);return e.json({success:!!n,message:n?"Consumer Key 正常に復号できました":"復号失敗"})}if(t==="openai"){const a=await It(e,"openai_api_key");if(!a)return e.json({success:!1,error:"OpenAI Key 未設定"});const n=await pt(a,e.env.ENCRYPTION_KEY);if(!n)return e.json({success:!1,error:"復号失敗"});const i=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${n}`}});return i.ok?e.json({success:!0,message:"OpenAI 接続OK"}):e.json({success:!1,error:`OpenAI API ${i.status}`})}if(t==="telegram"){const a=await It(e,"telegram_bot_token"),n=await It(e,"telegram_chat_id");if(!a||!n)return e.json({success:!1,error:"Telegram 未設定"});const i=await pt(a,e.env.ENCRYPTION_KEY);if(!i)return e.json({success:!1,error:"復号失敗"});const o=await(await fetch(`https://api.telegram.org/bot${i}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:n,text:"✅ GE365x-web: Telegram 接続テスト成功"})})).json();return o!=null&&o.ok?e.json({success:!0,message:"Telegram 送信成功"}):e.json({success:!1,error:(o==null?void 0:o.description)||"Telegram 送信失敗"})}return e.json({success:!1,error:"unknown kind"},400)}catch(a){return e.json({success:!1,error:(a==null?void 0:a.message)||String(a)})}});async function _t(e,t,s,a){await e.env.DB.prepare(`INSERT INTO system_settings (key, value, description, updated_at)
     VALUES (?, ?, ?, datetime('now','+9 hours'))
     ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=datetime('now','+9 hours')`).bind(t,s,a).run()}async function It(e,t){const s=await e.env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(t).first();return(s==null?void 0:s.value)||null}async function pt(e,t){try{return await ft(e,t)}catch{return""}}Ie.post("/api/admin/api-settings/gemini",m,async e=>{const t=e.get("user"),{api_key:s,model:a}=await e.req.json();if(!s||s.includes("•"))return e.json({success:!1,error:"api_key required"},400);const{encryptValue:n}=await Promise.resolve().then(()=>Hs),i=await n(s,e.env.ENCRYPTION_KEY),r=e.env.DB;return await r.prepare("SELECT id FROM x_api_settings WHERE user_id=? AND setting_key=?").bind(t.id,"gemini_api_key").first()?await r.prepare("UPDATE x_api_settings SET setting_value=?, updated_at=datetime('now','+9 hours') WHERE user_id=? AND setting_key=?").bind(i,t.id,"gemini_api_key").run():await r.prepare("INSERT INTO x_api_settings (user_id, setting_key, setting_value) VALUES (?,?,?)").bind(t.id,"gemini_api_key",i).run(),a&&(await r.prepare("SELECT id FROM x_api_settings WHERE user_id=? AND setting_key=?").bind(t.id,"gemini_model").first()?await r.prepare("UPDATE x_api_settings SET setting_value=?, updated_at=datetime('now','+9 hours') WHERE user_id=? AND setting_key=?").bind(a,t.id,"gemini_model").run():await r.prepare("INSERT INTO x_api_settings (user_id, setting_key, setting_value) VALUES (?,?,?)").bind(t.id,"gemini_model",a).run()),e.json({success:!0})});const C=new D;function ls(e){if(e==null)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes(`
`)||t.includes("\r")?'"'+t.replace(/"/g,'""')+'"':t}function W(e,t){const a=e.map(ls).join(","),n=t.map(i=>e.map(r=>ls(i[r])).join(","));return"\uFEFF"+a+`
`+n.join(`
`)}function Y(e,t){return new Response(e,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function ta(e,t){return new Response(JSON.stringify(e,null,2),{headers:{"content-type":"application/json; charset=utf-8","content-disposition":`attachment; filename="${t}"`,"cache-control":"no-store"}})}function P(){const e=new Date,t=s=>String(s).padStart(2,"0");return`${e.getFullYear()}${t(e.getMonth()+1)}${t(e.getDate())}_${t(e.getHours())}${t(e.getMinutes())}`}C.get("/api/admin/export/posts",m,async e=>{const t=e.get("user"),s=e.req.query("status"),a=e.req.query("month");let n="WHERE pq.platform='x' AND pq.user_id = ?";const i=[t.id];s&&s!=="all"&&(n+=" AND pq.status = ?",i.push(s)),a&&(n+=" AND strftime('%Y-%m', COALESCE(pq.posted_at, pq.scheduled_at, pq.created_at)) = ?",i.push(a));const{results:r}=await e.env.DB.prepare(`SELECT pq.id, pq.body, pq.link_url, pq.hashtags, pq.post_mode, pq.status,
            pq.generation_type, pq.source_type, pq.pattern_type,
            pq.scheduled_at, pq.effective_scheduled_at, pq.posted_at,
            pq.external_post_id, pq.error_message,
            pq.recurrence_type, pq.recurrence_rule,
            pq.thread_parent_id, pq.thread_order, pq.thread_count,
            pq.media_type, pq.jitter_enabled, pq.jitter_minutes,
            pq.created_at, pq.updated_at,
            xa.account_name, xa.x_username
       FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
       ${n} ORDER BY pq.id DESC LIMIT 10000`).bind(...i).all(),l=W(["id","body","link_url","hashtags","post_mode","status","account_name","x_username","generation_type","source_type","pattern_type","scheduled_at","effective_scheduled_at","posted_at","external_post_id","error_message","recurrence_type","recurrence_rule","thread_parent_id","thread_order","thread_count","media_type","jitter_enabled","jitter_minutes","created_at","updated_at"],r||[]);return Y(l,`ge365x_posts_${P()}.csv`)});C.get("/api/admin/export/logs",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT pl.id, pl.record_id, pl.account_name, pl.platform,
            pl.source_type, pl.generation_type, pl.post_mode,
            pl.content, pl.content_hash, pl.link_url,
            pl.media_type, pl.media_upload_status, pl.media_id,
            pl.thread_parent_id, pl.thread_order, pl.thread_total_count,
            pl.scheduled_at, pl.executed_at, pl.posted_at,
            pl.status, pl.error_message, pl.api_response_summary,
            pl.created_at
       FROM post_logs pl
       WHERE pl.user_id = ?
       ORDER BY pl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","record_id","account_name","platform","source_type","generation_type","post_mode","content","content_hash","link_url","media_type","media_upload_status","media_id","thread_parent_id","thread_order","thread_total_count","scheduled_at","executed_at","posted_at","status","error_message","api_response_summary","created_at"],s||[]);return Y(n,`ge365x_post_logs_${P()}.csv`)});C.get("/api/admin/export/generations",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT gl.id, gl.account_id, xa.account_name, xa.x_username,
            gl.brand_voice_id, gl.target_setting_id,
            gl.post_mode, gl.generation_type, gl.output_text,
            gl.created_at
       FROM generation_logs gl
       LEFT JOIN x_accounts xa ON gl.account_id = xa.id
       WHERE gl.user_id = ?
       ORDER BY gl.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","brand_voice_id","target_setting_id","post_mode","generation_type","output_text","created_at"],s||[]);return Y(n,`ge365x_generation_logs_${P()}.csv`)});C.get("/api/admin/export/autopilot",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT aj.id, aj.reservation_no, aj.account_id, xa.account_name, xa.x_username,
            aj.channel_type, aj.content_mode, aj.theme, aj.keywords, aj.prompt_text,
            aj.title_memo, aj.link_url,
            aj.generate_at, aj.publish_at, aj.status,
            aj.generated_post_id, aj.external_post_id, aj.error_message,
            aj.created_at, aj.updated_at
       FROM autopilot_jobs aj
       LEFT JOIN x_accounts xa ON aj.account_id = xa.id
       WHERE aj.user_id = ?
       ORDER BY aj.id DESC LIMIT 10000`).bind(t.id).all(),n=W(["id","reservation_no","account_id","account_name","x_username","channel_type","content_mode","theme","keywords","prompt_text","title_memo","link_url","generate_at","publish_at","status","generated_post_id","external_post_id","error_message","created_at","updated_at"],s||[]);return Y(n,`ge365x_autopilot_${P()}.csv`)});C.get("/api/admin/export/drafts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, title, body, link_url, hashtags, post_mode, created_at, updated_at
       FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000`).bind(t.id).all(),n=W(["id","account_id","title","body","link_url","hashtags","post_mode","created_at","updated_at"],s||[]);return Y(n,`ge365x_drafts_${P()}.csv`)});C.get("/api/admin/export/kpi",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT km.id, km.account_id, xa.account_name, xa.x_username,
            km.metric_date, km.posts_sent, km.posts_failed,
            km.impressions, km.engagements, km.followers_gained,
            km.created_at, km.updated_at
       FROM kpi_metrics km
       LEFT JOIN x_accounts xa ON xa.id = km.account_id
       WHERE km.user_id = ?
       ORDER BY km.metric_date DESC, km.account_id ASC LIMIT 10000`).bind(t.id).all(),n=W(["id","account_id","account_name","x_username","metric_date","posts_sent","posts_failed","impressions","engagements","followers_gained","created_at","updated_at"],s||[]);return Y(n,`ge365x_kpi_${P()}.csv`)});C.get("/api/admin/export/accounts",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
            daily_post_count, daily_post_limit, last_posted_at,
            account_health_score, health_status, is_active, is_current,
            last_daily_reset_date, created_at, updated_at
       FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_name","x_user_id","x_username","daily_post_count","daily_post_limit","last_posted_at","account_health_score","health_status","is_active","is_current","last_daily_reset_date","created_at","updated_at"],s||[]);return Y(n,`ge365x_accounts_${P()}.csv`)});C.get("/api/admin/export/targets",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, template_key, label, age_range, gender, genre, occupation,
            pains, desires, purchase_triggers, problem, goal, knowledge, is_default
       FROM target_templates WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","template_key","label","age_range","gender","genre","occupation","pains","desires","purchase_triggers","problem","goal","knowledge","is_default"],s||[]);return Y(n,`ge365x_targets_${P()}.csv`)});C.get("/api/admin/export/voices",m,async e=>{const t=e.get("user"),{results:s}=await e.env.DB.prepare(`SELECT id, account_id, voice_key, label, tone, worldview, personal_story,
            prohibited_words, sample_posts, is_default
       FROM brand_voice WHERE user_id = ? ORDER BY id DESC`).bind(t.id).all(),n=W(["id","account_id","voice_key","label","tone","worldview","personal_story","prohibited_words","sample_posts","is_default"],s||[]);return Y(n,`ge365x_voices_${P()}.csv`)});C.get("/api/admin/export/all",m,async e=>{const t=e.get("user"),s=t.id,[a,n,i,r,o,l,d,c,p]=await Promise.all([e.env.DB.prepare(`SELECT pq.*, xa.account_name, xa.x_username
         FROM post_queue pq LEFT JOIN x_accounts xa ON pq.account_id = xa.id
         WHERE pq.user_id = ? ORDER BY pq.id DESC LIMIT 10000`).bind(s).all(),e.env.DB.prepare("SELECT * FROM post_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM generation_logs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM autopilot_jobs WHERE user_id = ? ORDER BY id DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare("SELECT * FROM drafts WHERE user_id = ? ORDER BY id DESC LIMIT 5000").bind(s).all(),e.env.DB.prepare("SELECT * FROM kpi_metrics WHERE user_id = ? ORDER BY metric_date DESC LIMIT 10000").bind(s).all(),e.env.DB.prepare(`SELECT id, account_name, x_user_id, x_username,
              daily_post_count, daily_post_limit, last_posted_at,
              account_health_score, health_status, is_active, is_current,
              created_at, updated_at
         FROM x_accounts WHERE user_id = ? ORDER BY id DESC`).bind(s).all(),e.env.DB.prepare("SELECT * FROM target_templates WHERE user_id = ? ORDER BY id DESC").bind(s).all(),e.env.DB.prepare("SELECT * FROM brand_voice WHERE user_id = ? ORDER BY id DESC").bind(s).all()]),f={exported_at:new Date().toISOString(),user:{id:t.id,email:t.email},posts:a.results||[],post_logs:n.results||[],generation_logs:i.results||[],autopilot_jobs:r.results||[],drafts:o.results||[],kpi_metrics:l.results||[],x_accounts:d.results||[],target_templates:c.results||[],brand_voices:p.results||[]};return ta(f,`ge365x_all_data_${P()}.json`)});C.get("/api/admin/export/admin/users",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT u.id, u.email, u.is_approved, u.is_admin,
            u.trial_start, u.trial_end, u.created_at, u.updated_at,
            s.plan_code, s.status AS sub_status, s.current_period_end
       FROM users u
       LEFT JOIN user_subscriptions s ON s.user_id = u.id
       ORDER BY u.id DESC LIMIT 10000`).all(),a=W(["id","email","is_approved","is_admin","trial_start","trial_end","created_at","updated_at","plan_code","sub_status","current_period_end"],t||[]);return Y(a,`ge365x_admin_users_${P()}.csv`)});C.get("/api/admin/export/admin/licenses",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT l.id, l.license_key, l.license_type, l.plan_code,
            l.user_id, u.email AS user_email,
            l.is_active, l.activated_at, l.expires_at,
            l.issued_by, l.note, l.created_at, l.updated_at
       FROM licenses l
       LEFT JOIN users u ON u.id = l.user_id
       ORDER BY l.id DESC LIMIT 10000`).all(),a=W(["id","license_key","license_type","plan_code","user_id","user_email","is_active","activated_at","expires_at","issued_by","note","created_at","updated_at"],t||[]);return Y(a,`ge365x_admin_licenses_${P()}.csv`)});C.get("/api/admin/export/admin/subs",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT s.id, s.user_id, u.email AS user_email,
            s.plan_code, s.status, s.started_at, s.current_period_end,
            s.cancel_at_period_end, s.created_at, s.updated_at
       FROM user_subscriptions s
       LEFT JOIN users u ON u.id = s.user_id
       ORDER BY s.updated_at DESC LIMIT 10000`).all(),a=W(["id","user_id","user_email","plan_code","status","started_at","current_period_end","cancel_at_period_end","created_at","updated_at"],t||[]);return Y(a,`ge365x_admin_subs_${P()}.csv`)});C.get("/api/admin/export/admin/audit",m,I,async e=>{const{results:t}=await e.env.DB.prepare(`SELECT id, user_id, email, event_type, ip_address, user_agent, metadata, created_at
       FROM auth_logs ORDER BY id DESC LIMIT 10000`).all(),a=W(["id","user_id","email","event_type","ip_address","user_agent","metadata","created_at"],t||[]);return Y(a,`ge365x_admin_audit_${P()}.csv`)});C.get("/api/admin/export/admin/all",m,I,async e=>{const[t,s,a,n,i,r,o]=await Promise.all([e.env.DB.prepare(`SELECT id, email, is_approved, is_admin, trial_start, trial_end, created_at, updated_at
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
         FROM x_accounts ORDER BY id DESC LIMIT 10000`).all()]),l={exported_at:new Date().toISOString(),users:t.results||[],user_subscriptions:s.results||[],licenses:a.results||[],auth_logs:n.results||[],post_queue:i.results||[],post_logs:r.results||[],x_accounts:o.results||[]};return ta(l,`ge365x_admin_all_${P()}.json`)});const S=new D;S.use("/static/*",Va({root:"./",manifest:{}}));S.get("/healthz",e=>e.json({ok:!0,service:"ge365x-web",time:new Date().toISOString()}));S.route("/",Bs);S.route("/",H);S.route("/",F);S.route("/",_e);S.route("/",ge);S.route("/",be);S.route("/",U);S.route("/",ea);S.route("/",ve);S.route("/",Ue);S.route("/",nt);S.route("/",it);S.route("/",Yt);S.route("/",xt);S.route("/",wt);S.route("/",kt);S.route("/",Ie);S.route("/",C);S.notFound(e=>e.json({error:"not_found",path:e.req.path},404));S.onError((e,t)=>(console.error("[ge365x-web] error:",e),t.json({error:"internal_error",message:e.message},500)));const Un={fetch:S.fetch,async scheduled(e,t,s){const a=e.cron;(!a||a==="*/1 * * * *")&&s.waitUntil(S.fetch(new Request("https://internal/cron/tick",{method:"POST"}),t,s).catch(n=>console.error("[tick]",n))),a==="*/5 * * * *"&&s.waitUntil(S.fetch(new Request("https://internal/cron/autopilot-tick",{method:"POST"}),t,s).catch(n=>console.error("[autopilot-tick]",n)))}},ds=new D,Wn=Object.assign({"/src/index.tsx":Un});let sa=!1;for(const[,e]of Object.entries(Wn))e&&(ds.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),ds.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),sa=!0);if(!sa)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ds as default};
