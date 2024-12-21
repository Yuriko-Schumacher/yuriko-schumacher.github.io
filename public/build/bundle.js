var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let l,a;function o(t,e){return l||(l=document.createElement("a")),l.href=e,t===l.href}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function h(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function d(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function p(){return m(" ")}function v(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){e=""+e,t.data!==e&&(t.data=e)}class k{constructor(t=!1){this.is_svg=!1,this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,e,n=null){var s;this.e||(this.is_svg?this.e=(s=e.nodeName,document.createElementNS("http://www.w3.org/2000/svg",s)):this.e=d(11===e.nodeType?"TEMPLATE":e.nodeName),this.t="TEMPLATE"!==e.tagName?e:e.content,this.c(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from("TEMPLATE"===this.e.nodeName?this.e.content.childNodes:this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)u(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(f)}}function _(t){a=t}function b(){if(!a)throw new Error("Function called outside component initialization");return a}const y=[],$=[];let w=[];const x=[],z=Promise.resolve();let C=!1;function T(t){w.push(t)}const E=new Set;let S=0;function A(){if(0!==S)return;const t=a;do{try{for(;S<y.length;){const t=y[S];S++,_(t),j(t.$$)}}catch(t){throw y.length=0,S=0,t}for(_(null),y.length=0,S=0;$.length;)$.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];E.has(e)||(E.add(e),e())}w.length=0}while(y.length);for(;x.length;)x.pop()();C=!1,E.clear(),_(t)}function j(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(T)}}const q=new Set;let N;function M(){N={r:0,c:[],p:N}}function U(){N.r||s(N.c),N=N.p}function R(t,e){t&&t.i&&(q.delete(t),t.i(e))}function Y(t,e,n,s){if(t&&t.o){if(q.has(t))return;q.add(t),N.c.push((()=>{q.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}else s&&s()}function I(t,e){const n=e.token={};function s(t,s,r,i){if(e.token!==n)return;e.resolved=i;let l=e.ctx;void 0!==r&&(l=l.slice(),l[r]=i);const a=t&&(e.current=t)(l);let o=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==s&&t&&(M(),Y(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),U())})):e.block.d(1),a.c(),R(a,1),a.m(e.mount(),e.anchor),o=!0),e.block=a,e.blocks&&(e.blocks[s]=a),o&&A()}if(!(r=t)||"object"!=typeof r&&"function"!=typeof r||"function"!=typeof r.then){if(e.current!==e.then)return s(e.then,1,e.value,t),!0;e.resolved=t}else{const n=b();if(t.then((t=>{_(n),s(e.then,1,e.value,t),_(null)}),(t=>{if(_(n),s(e.catch,2,e.error,t),_(null),!e.hasCatch)throw t})),e.current!==e.pending)return s(e.pending,0),!0}var r}function L(t){t&&t.c()}function H(t,n,i,l){const{fragment:a,after_update:o}=t.$$;a&&a.m(n,i),l||T((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):s(n),t.$$.on_mount=[]})),o.forEach(T)}function O(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];w.forEach((s=>-1===t.indexOf(s)?e.push(s):n.push(s))),n.forEach((t=>t())),w=e}(n.after_update),s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(y.push(t),C||(C=!0,z.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function P(e,r,i,l,o,c,u,h=[-1]){const d=a;_(e);const m=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:o,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:n(),dirty:h,skip_bound:!1,root:r.target||d.$$.root};u&&u(m.root);let p=!1;if(m.ctx=i?i(e,r.props||{},((t,n,...s)=>{const r=s.length?s[0]:n;return m.ctx&&o(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),p&&D(e,t)),n})):[],m.update(),p=!0,s(m.before_update),m.fragment=!!l&&l(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(f)}else m.fragment&&m.fragment.c();r.intro&&R(e.$$.fragment),H(e,r.target,r.anchor,r.customElement),A()}_(d)}class X{$destroy(){O(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const t=s.indexOf(n);-1!==t&&s.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var B={},F={};function Z(t){return new Function("d","return {"+t.map((function(t,e){return JSON.stringify(t)+": d["+e+'] || ""'})).join(",")+"}")}function G(t){var e=Object.create(null),n=[];return t.forEach((function(t){for(var s in t)s in e||n.push(e[s]=s)})),n}function J(t,e){var n=t+"",s=n.length;return s<e?new Array(e-s+1).join(0)+n:n}function V(t){var e,n=t.getUTCHours(),s=t.getUTCMinutes(),r=t.getUTCSeconds(),i=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":((e=t.getUTCFullYear())<0?"-"+J(-e,6):e>9999?"+"+J(e,6):J(e,4))+"-"+J(t.getUTCMonth()+1,2)+"-"+J(t.getUTCDate(),2)+(i?"T"+J(n,2)+":"+J(s,2)+":"+J(r,2)+"."+J(i,3)+"Z":r?"T"+J(n,2)+":"+J(s,2)+":"+J(r,2)+"Z":s||n?"T"+J(n,2)+":"+J(s,2)+"Z":"")}var W=function(t){var e=new RegExp('["'+t+"\n\r]"),n=t.charCodeAt(0);function s(t,e){var s,r=[],i=t.length,l=0,a=0,o=i<=0,c=!1;function u(){if(o)return F;if(c)return c=!1,B;var e,s,r=l;if(34===t.charCodeAt(r)){for(;l++<i&&34!==t.charCodeAt(l)||34===t.charCodeAt(++l););return(e=l)>=i?o=!0:10===(s=t.charCodeAt(l++))?c=!0:13===s&&(c=!0,10===t.charCodeAt(l)&&++l),t.slice(r+1,e-1).replace(/""/g,'"')}for(;l<i;){if(10===(s=t.charCodeAt(e=l++)))c=!0;else if(13===s)c=!0,10===t.charCodeAt(l)&&++l;else if(s!==n)continue;return t.slice(r,e)}return o=!0,t.slice(r,i)}for(10===t.charCodeAt(i-1)&&--i,13===t.charCodeAt(i-1)&&--i;(s=u())!==F;){for(var f=[];s!==B&&s!==F;)f.push(s),s=u();e&&null==(f=e(f,a++))||r.push(f)}return r}function r(e,n){return e.map((function(e){return n.map((function(t){return l(e[t])})).join(t)}))}function i(e){return e.map(l).join(t)}function l(t){return null==t?"":t instanceof Date?V(t):e.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,e){var n,r,i=s(t,(function(t,s){if(n)return n(t,s-1);r=t,n=e?function(t,e){var n=Z(t);return function(s,r){return e(n(s),r,t)}}(t,e):Z(t)}));return i.columns=r||[],i},parseRows:s,format:function(e,n){return null==n&&(n=G(e)),[n.map(l).join(t)].concat(r(e,n)).join("\n")},formatBody:function(t,e){return null==e&&(e=G(t)),r(t,e).join("\n")},formatRows:function(t){return t.map(i).join("\n")},formatRow:i,formatValue:l}}(","),Q=W.parse;function K(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}var tt,et=(tt=Q,function(t,e,n){return 2===arguments.length&&"function"==typeof e&&(n=e,e=void 0),function(t,e){return fetch(t,e).then(K)}(t,e).then((function(t){return tt(t,n)}))});function nt(t,e,n){this.k=t,this.x=e,this.y=n}function st(e){let n;return{c(){n=d("div"),n.innerHTML='<div class="nav__container svelte-164agi8"><nav class="svelte-164agi8"><ul class="nav__logo svelte-164agi8"><li class="svelte-164agi8"><a href="#about" class="svelte-164agi8"><strong>Yuriko Schumacher</strong></a></li></ul> \n      <ul class="nav__menu svelte-164agi8"><li class="svelte-164agi8"><a href="#about">About</a></li> \n        <li class="svelte-164agi8"><a href="#work">Work</a></li></ul></nav></div>',v(n,"id","nav"),v(n,"class","svelte-164agi8")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}nt.prototype={constructor:nt,scale:function(t){return 1===t?this:new nt(this.k*t,this.x,this.y)},translate:function(t,e){return 0===t&0===e?this:new nt(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}},new nt(1,0,0),nt.prototype;class rt extends X{constructor(t){super(),P(this,t,null,st,i,{})}}var it=new RegExp(/\s+([^\s]*)\s*$/);function lt(t,e){return void 0===e&&(e=" "),function(t){return null==t}(t)?"":String(t).replace(it,e+"$1")}function at(e){let n,s,r,i,l,a,o,h,g,k,_,b,y,$,w,x,z,C,T,E,S,A,j,q,N,M,U,R,Y,I,L,H,O,D,P=lt("important stories.")+"",X=lt("on projects!")+"";return{c(){n=d("div"),s=d("div"),r=d("div"),r.innerHTML='<img src="./image/yuriko.png" alt="" width="350" class="svelte-ivrt5s"/>',i=p(),l=d("div"),a=d("h1"),a.textContent="Hi, I'm Yuriko.",o=p(),h=d("p"),g=m("Currently, I work as a "),k=d("a"),k.textContent="data visuals designer/developer",_=m(" at the Texas Tribune. I am passionate about designing and producing meaningful (and beautiful ✨) graphics/data tools that tell "),b=m(P),y=p(),$=d("p"),w=m("My skills currently include: front-end development with frameworks like "),x=d("span"),x.textContent="React",z=m(" and "),C=d("span"),C.textContent="Svelte",T=m(", JavaScript libraries including "),E=d("span"),E.textContent="d3.js",S=m(" and "),A=d("span"),A.textContent="three.js",j=m(", data analysis and statistical analysis in "),q=d("span"),q.textContent="R",N=m(", GIS analysis and production using "),M=d("span"),M.textContent="QGIS",U=m(", design tools like "),R=d("span"),R.textContent="figma",Y=m(", and graphics prodution with "),I=d("span"),I.textContent="Illustrator",L=m(". I'm constantly exploring new technologies as I pursue the best ways to execute "),H=m(X),O=p(),D=d("div"),D.innerHTML='<ul class="about__list contact-info svelte-ivrt5s"><li class="font--special svelte-ivrt5s"><a href="mailto:yuriko.schumacher@gmail.com"><i class="far fa-envelope"></i>\n              yuriko.schumacher@gmail.com</a></li> \n          <li class="font--special svelte-ivrt5s"><a href="tel:6466680656"><i class="fas fa-phone"></i> 646-668-0656</a></li></ul> \n        <ul class="about__list svelte-ivrt5s"><li class="font--special svelte-ivrt5s"><a href="https://github.com/Yuriko-Schumacher/yuriko-schumacher.github.io/blob/main/public/pdf/resume.pdf" target="_blank">Resume</a></li> \n          <li class="font--special svelte-ivrt5s"><a href="#work">Work</a></li> \n          <li class="svelte-ivrt5s"><a href="https://x.com/yuriko_a_s" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li> \n          <li class="svelte-ivrt5s"><a href="https://github.com/Yuriko-Schumacher" target="_blank"><i class="fab fa-github"></i></a></li> \n          <li class="svelte-ivrt5s"><a href="https://www.linkedin.com/in/yuriko-schumacher/?locale=en_US" target="_blank"><i class="fab fa-linkedin"></i></a></li></ul>',v(r,"class","about__img svelte-ivrt5s"),v(k,"href","https://www.texastribune.org/about/staff/yuriko-schumacher/"),v(k,"target","_blank"),v(h,"class","svelte-ivrt5s"),v(x,"class","skill svelte-ivrt5s"),v(C,"class","skill svelte-ivrt5s"),v(E,"class","skill svelte-ivrt5s"),v(A,"class","skill svelte-ivrt5s"),v(q,"class","skill svelte-ivrt5s"),v(M,"class","skill svelte-ivrt5s"),v(R,"class","skill svelte-ivrt5s"),v(I,"class","skill svelte-ivrt5s"),v($,"class","svelte-ivrt5s"),v(D,"class","about__lists svelte-ivrt5s"),v(l,"class","about__info svelte-ivrt5s"),v(s,"class","about__container svelte-ivrt5s"),v(n,"class","about svelte-ivrt5s"),v(n,"id","about")},m(t,e){u(t,n,e),c(n,s),c(s,r),c(s,i),c(s,l),c(l,a),c(l,o),c(l,h),c(h,g),c(h,k),c(h,_),c(h,b),c(l,y),c(l,$),c($,w),c($,x),c($,z),c($,C),c($,T),c($,E),c($,S),c($,A),c($,j),c($,q),c($,N),c($,M),c($,U),c($,R),c($,Y),c($,I),c($,L),c($,H),c(l,O),c(l,D)},p:t,i:t,o:t,d(t){t&&f(n)}}}class ot extends X{constructor(t){super(),P(this,t,null,at,i,{})}}function ct(t,e,n){const s=t.slice();return s[2]=e[n],s}function ut(t,e,n){const s=t.slice();return s[5]=e[n],s}function ft(t,e,n){const s=t.slice();return s[8]=e[n],s}function ht(t){let e;return{c(){e=d("i"),v(e,"class","fa-solid fa-star svelte-4zr9mq")},m(t,n){u(t,e,n)},d(t){t&&f(e)}}}function dt(t){let e,n,s=t[8]+"";return{c(){e=d("li"),n=m(s),v(e,"class","svelte-4zr9mq")},m(t,s){u(t,e,s),c(e,n)},p(t,e){1&e&&s!==(s=t[8]+"")&&g(n,s)},d(t){t&&f(e)}}}function mt(t){let e,n,s=t[5]+"";return{c(){e=d("li"),n=m(s),v(e,"class","svelte-4zr9mq")},m(t,s){u(t,e,s),c(e,n)},p(t,e){1&e&&s!==(s=t[5]+"")&&g(n,s)},d(t){t&&f(e)}}}function pt(t){let e,n,s=t[0].viz,r=[];for(let e=0;e<s.length;e+=1)r[e]=vt(ct(t,s,e));return{c(){e=d("ul"),n=m("Visualization types:\n            ");for(let t=0;t<r.length;t+=1)r[t].c();v(e,"class","works__tools svelte-4zr9mq")},m(t,s){u(t,e,s),c(e,n);for(let t=0;t<r.length;t+=1)r[t]&&r[t].m(e,null)},p(t,n){if(1&n){let i;for(s=t[0].viz,i=0;i<s.length;i+=1){const l=ct(t,s,i);r[i]?r[i].p(l,n):(r[i]=vt(l),r[i].c(),r[i].m(e,null))}for(;i<r.length;i+=1)r[i].d(1);r.length=s.length}},d(t){t&&f(e),h(r,t)}}}function vt(t){let e,n,s=t[2]+"";return{c(){e=d("li"),n=m(s),v(e,"class","svelte-4zr9mq")},m(t,s){u(t,e,s),c(e,n)},p(t,e){1&e&&s!==(s=t[2]+"")&&g(n,s)},d(t){t&&f(e)}}}function gt(e){let n,s,r,i,l,a,_,b,y,$,w,x,z,C,T,E,S,A,j,q,N,M,U,R,Y,I,L,H,O=e[1](e[0].date)+"",D=e[0].media+"",P=e[0].title+"",X=lt(e[0].description)+"",B="TRUE"==e[0].is_featured&&ht(),F=e[0].skill,Z=[];for(let t=0;t<F.length;t+=1)Z[t]=dt(ft(e,F,t));let G=e[0].role,J=[];for(let t=0;t<G.length;t+=1)J[t]=mt(ut(e,G,t));let V=0!=e[0].viz.length&&pt(e);return{c(){n=d("a"),s=d("div"),r=d("div"),i=d("img"),_=p(),b=d("div"),y=d("div"),$=d("div"),w=m(O),x=p(),z=d("div"),C=m(D),T=p(),E=d("h2"),S=m(P),B&&B.c(),A=p(),j=new k(!1),q=p(),N=d("div"),M=d("ul"),U=m("Skills:\n          ");for(let t=0;t<Z.length;t+=1)Z[t].c();R=p(),Y=d("ul"),I=m("Roles:\n          ");for(let t=0;t<J.length;t+=1)J[t].c();L=p(),V&&V.c(),v(i,"class"," svelte-4zr9mq"),o(i.src,l="./image/"+e[0].id+"."+e[0].img)||v(i,"src",l),v(i,"width","400"),v(i,"alt",a=e[0].title),v(r,"class","works__img svelte-4zr9mq"),v($,"class","works__date font--special svelte-4zr9mq"),v(z,"class","works__media font--special"),v(y,"class","works__info works__info__top svelte-4zr9mq"),v(E,"class","svelte-4zr9mq"),j.a=q,v(M,"class","works__tools svelte-4zr9mq"),v(Y,"class","works__tools svelte-4zr9mq"),v(N,"class","works__info works__info__bottom svelte-4zr9mq"),v(b,"class","works__description"),v(s,"class","works__work svelte-4zr9mq"),v(n,"href",H=e[0].link),v(n,"target","_blank"),v(n,"class","svelte-4zr9mq")},m(t,e){u(t,n,e),c(n,s),c(s,r),c(r,i),c(s,_),c(s,b),c(b,y),c(y,$),c($,w),c(y,x),c(y,z),c(z,C),c(b,T),c(b,E),c(E,S),B&&B.m(E,null),c(b,A),j.m(X,b),c(b,q),c(b,N),c(N,M),c(M,U);for(let t=0;t<Z.length;t+=1)Z[t]&&Z[t].m(M,null);c(N,R),c(N,Y),c(Y,I);for(let t=0;t<J.length;t+=1)J[t]&&J[t].m(Y,null);c(N,L),V&&V.m(N,null)},p(t,[e]){if(1&e&&!o(i.src,l="./image/"+t[0].id+"."+t[0].img)&&v(i,"src",l),1&e&&a!==(a=t[0].title)&&v(i,"alt",a),1&e&&O!==(O=t[1](t[0].date)+"")&&g(w,O),1&e&&D!==(D=t[0].media+"")&&g(C,D),1&e&&P!==(P=t[0].title+"")&&g(S,P),"TRUE"==t[0].is_featured?B||(B=ht(),B.c(),B.m(E,null)):B&&(B.d(1),B=null),1&e&&X!==(X=lt(t[0].description)+"")&&j.p(X),1&e){let n;for(F=t[0].skill,n=0;n<F.length;n+=1){const s=ft(t,F,n);Z[n]?Z[n].p(s,e):(Z[n]=dt(s),Z[n].c(),Z[n].m(M,null))}for(;n<Z.length;n+=1)Z[n].d(1);Z.length=F.length}if(1&e){let n;for(G=t[0].role,n=0;n<G.length;n+=1){const s=ut(t,G,n);J[n]?J[n].p(s,e):(J[n]=mt(s),J[n].c(),J[n].m(Y,null))}for(;n<J.length;n+=1)J[n].d(1);J.length=G.length}0!=t[0].viz.length?V?V.p(t,e):(V=pt(t),V.c(),V.m(N,null)):V&&(V.d(1),V=null),1&e&&H!==(H=t[0].link)&&v(n,"href",H)},i:t,o:t,d(t){t&&f(n),B&&B.d(),h(Z,t),h(J,t),V&&V.d()}}}function kt(t,e,n){let{data:s}=e;return t.$$set=t=>{"data"in t&&n(0,s=t.data)},[s,t=>{const[e,n]=t.split("-");return new Date(n,e-1).toLocaleString("en-US",{month:"long",year:"numeric"})}]}class _t extends X{constructor(t){super(),P(this,t,kt,gt,i,{data:0})}}function bt(t,e,n){const s=t.slice();return s[1]=e[n],s}function yt(t){let e,n;return e=new _t({props:{data:t[1]}}),{c(){L(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},p(t,n){const s={};1&n&&(s.data=t[1]),e.$set(s)},i(t){n||(R(e.$$.fragment,t),n=!0)},o(t){Y(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function $t(t){let e,n,s,r,i,l,a,o,g,k,_,b,y,$,w=lt("by date.")+"",x=t[0],z=[];for(let e=0;e<x.length;e+=1)z[e]=yt(bt(t,x,e));const C=t=>Y(z[t],1,1,(()=>{z[t]=null}));return{c(){e=d("div"),n=d("div"),s=d("h1"),s.textContent="My work:",r=p(),i=d("p"),l=m("This selection showcases some of my best work, ranging from my projects at Northeastern University to my recent contributions at the Texas Tribune. Stars "),a=d("i"),o=m(" indicate the selection of work that I'm the most proud of. Other ones are sorted "),g=m(w),k=p(),_=d("p"),_.textContent="Each card represents a project and contains the publication date, the organization I worked with, a brief description, the skills applied, my roles, and the types of visualizations used in the project.",b=p(),y=d("div");for(let t=0;t<z.length;t+=1)z[t].c();v(s,"class","svelte-6rzdab"),v(a,"class","fa-solid fa-star"),v(i,"class","svelte-6rzdab"),v(_,"class","svelte-6rzdab"),v(n,"class","work__intro svelte-6rzdab"),v(y,"class","work-cards svelte-6rzdab"),v(e,"id","work"),v(e,"class","svelte-6rzdab")},m(t,f){u(t,e,f),c(e,n),c(n,s),c(n,r),c(n,i),c(i,l),c(i,a),c(i,o),c(i,g),c(n,k),c(n,_),c(e,b),c(e,y);for(let t=0;t<z.length;t+=1)z[t]&&z[t].m(y,null);$=!0},p(t,[e]){if(1&e){let n;for(x=t[0],n=0;n<x.length;n+=1){const s=bt(t,x,n);z[n]?(z[n].p(s,e),R(z[n],1)):(z[n]=yt(s),z[n].c(),R(z[n],1),z[n].m(y,null))}for(M(),n=x.length;n<z.length;n+=1)C(n);U()}},i(t){if(!$){for(let t=0;t<x.length;t+=1)R(z[t]);$=!0}},o(t){z=z.filter(Boolean);for(let t=0;t<z.length;t+=1)Y(z[t]);$=!1},d(t){t&&f(e),h(z,t)}}}function wt(t,e,n){let{data:s}=e;return t.$$set=t=>{"data"in t&&n(0,s=t.data)},[s]}class xt extends X{constructor(t){super(),P(this,t,wt,$t,i,{data:0})}}function zt(e){let n;return{c(){n=d("footer"),n.innerHTML='<div class="footer__info"><div class="about__lists svelte-avky4g"><ul class="about__list contact-info svelte-avky4g"><li class="font--special svelte-avky4g"><a href="mailto:yuriko.schumacher@gmail.com"><i class="far fa-envelope"></i> yuriko.schumacher@gmail.com</a></li> \n        <li class="font--special svelte-avky4g"><a href="tel:6466680656"><i class="fas fa-phone"></i> 646-668-0656</a></li></ul> \n      <ul class="about__list svelte-avky4g"><li class="font--special svelte-avky4g"><a href="https://github.com/Yuriko-Schumacher/yuriko-schumacher.github.io/blob/main/public/pdf/resume.pdf" target="_blank">Resume</a></li> \n        <li class="svelte-avky4g"><a href="https://x.com/yuriko_a_s" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li> \n        <li class="svelte-avky4g"><a href="https://github.com/Yuriko-Schumacher" target="_blank"><i class="fab fa-github"></i></a></li> \n        <li class="svelte-avky4g"><a href="https://www.linkedin.com/in/yuriko-schumacher/?locale=en_US" target="_blank"><i class="fab fa-linkedin"></i></a></li></ul></div></div> \n  <div class="credit"><p class="font--special">© Yuriko Schumacher 2024</p></div>'},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class Ct extends X{constructor(t){super(),P(this,t,null,zt,i,{})}}function Tt(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function Et(t){let e,n;return e=new xt({props:{data:t[0][0]}}),{c(){L(e.$$.fragment)},m(t,s){H(e,t,s),n=!0},p(t,n){const s={};1&n&&(s.data=t[0][0]),e.$set(s)},i(t){n||(R(e.$$.fragment,t),n=!0)},o(t){Y(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function St(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function At(t){let e,n,s,r,i,l,a,o;n=new rt({}),r=new ot({});let h={ctx:t,current:null,token:null,hasCatch:!1,pending:St,then:Et,catch:Tt,value:3,blocks:[,,,]};return I(t[1],h),a=new Ct({}),{c(){e=d("main"),L(n.$$.fragment),s=p(),L(r.$$.fragment),i=p(),h.block.c(),l=p(),L(a.$$.fragment)},m(t,f){u(t,e,f),H(n,e,null),c(e,s),H(r,e,null),c(e,i),h.block.m(e,h.anchor=null),h.mount=()=>e,h.anchor=l,c(e,l),H(a,e,null),o=!0},p(e,[n]){!function(t,e,n){const s=e.slice(),{resolved:r}=t;t.current===t.then&&(s[t.value]=r),t.current===t.catch&&(s[t.error]=r),t.block.p(s,n)}(h,t=e,n)},i(t){o||(R(n.$$.fragment,t),R(r.$$.fragment,t),R(h.block),R(a.$$.fragment,t),o=!0)},o(t){Y(n.$$.fragment,t),Y(r.$$.fragment,t);for(let t=0;t<3;t+=1){Y(h.blocks[t])}Y(a.$$.fragment,t),o=!1},d(t){t&&f(e),O(n),O(r),h.block.d(),h.token=null,h=null,O(a)}}}function jt(t,e,n){let{datasets:s=[]}=e,r=async function(){let t=await et("data/work.csv");t=t.sort(((t,e)=>t.is_featured-e.is_featured)),t=t.map((t=>{const e={};return e.date=t.date,e.description=t.description,e.id=t.id,e.img=t.img,e.is_featured=t.is_featured,e.is_interactive=t.is_interactive,e.link=t.link,e.media=t.media,e.role=[t.role_1,t.role_2,t.role_3,t.role_4].filter((t=>""!=t)),e.skill=[t.skill_1,t.skill_2,t.skill_3].filter((t=>""!=t)),e.viz=[t.viz_1,t.viz_2,t.viz_3,t.viz_4,t.viz_5].filter((t=>""!=t)),e.title=t.title,e}));let e=await et("data/other.csv");n(0,s=[t,e])}();return t.$$set=t=>{"datasets"in t&&n(0,s=t.datasets)},[s,r]}return new class extends X{constructor(t){super(),P(this,t,jt,At,i,{datasets:0})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
