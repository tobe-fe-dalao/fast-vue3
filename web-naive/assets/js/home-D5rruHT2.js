import{n as e,t}from"./Grid-02HJicTT.js";import{t as n}from"./Card-C7KKWTcc.js";import{t as r}from"./Space-DnuAzDnI.js";import{t as i}from"./Statistic-Djqk_p_S.js";import{Ar as a,Bt as o,Dr as s,Gr as c,Ir as l,K as u,Mr as d,Nr as f,Or as p,Pn as m,Pr as h,Qr as g,Vt as _,Yr as v,_ as y,a as b,ai as x,ar as S,ci as C,gr as w,ir as T,jr as E,kr as D,nr as O,or as k,qr as A,r as j,ri as M,rr as N,si as P,sr as F,vr as I,wr as L,yt as R}from"./index-index-Vl7atQja.js";import{t as z}from"./api-CZrqkO55.js";var B=N(`divider`,`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[k(`vertical`,`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[k(`no-title`,`
 display: flex;
 align-items: center;
 `)]),T(`title`,`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),S(`title-position-left`,[T(`line`,[S(`left`,{width:`28px`})])]),S(`title-position-right`,[T(`line`,[S(`right`,{width:`28px`})])]),S(`dashed`,[T(`line`,`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),S(`vertical`,`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),T(`line`,`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),k(`dashed`,[T(`line`,{backgroundColor:`var(--n-color)`})]),S(`dashed`,[T(`line`,{borderColor:`var(--n-color)`})]),S(`vertical`,{backgroundColor:`var(--n-color)`})]),V=h({name:`Divider`,props:Object.assign(Object.assign({},R.props),{titlePlacement:{type:String,default:`center`},dashed:Boolean,vertical:Boolean}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=R(`Divider`,`-divider`,B,y,e,t),i=s(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,textColor:n,fontWeight:i}}=r.value;return{"--n-bezier":e,"--n-color":t,"--n-text-color":n,"--n-font-weight":i}}),a=n?o(`divider`,void 0,i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var e;let{$slots:t,titlePlacement:n,vertical:r,dashed:i,cssVars:a,mergedClsPrefix:o}=this;return(e=this.onRender)==null||e.call(this),l(`div`,{role:`separator`,class:[`${o}-divider`,this.themeClass,{[`${o}-divider--vertical`]:r,[`${o}-divider--no-title`]:!t.default,[`${o}-divider--dashed`]:i,[`${o}-divider--title-position-${n}`]:t.default&&n}],style:a},r?null:l(`div`,{class:`${o}-divider__line ${o}-divider__line--left`}),!r&&t.default?l(L,null,l(`div`,{class:`${o}-divider__title`},this.$slots),l(`div`,{class:`${o}-divider__line ${o}-divider__line--right`})):null)}}),H=N(`h`,`
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[O(`&:first-child`,{marginTop:0}),S(`prefix-bar`,{position:`relative`,paddingLeft:`var(--n-prefix-width)`},[S(`align-text`,{paddingLeft:0},[O(`&::before`,{left:`calc(-1 * var(--n-prefix-width))`})]),O(`&::before`,`
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `),O(`&::before`,{backgroundColor:`var(--n-bar-color)`})])]),U=Object.assign(Object.assign({},R.props),{type:{type:String,default:`default`},prefix:String,alignText:Boolean}),W=e=>h({name:`H${e}`,props:U,setup(t){let{mergedClsPrefixRef:n,inlineThemeDisabled:r}=_(t),i=R(`Typography`,`-h`,H,b,t,n),a=s(()=>{let{type:n}=t,{common:{cubicBezierEaseInOut:r},self:{headerFontWeight:a,headerTextColor:o,[F(`headerPrefixWidth`,e)]:s,[F(`headerFontSize`,e)]:c,[F(`headerMargin`,e)]:l,[F(`headerBarWidth`,e)]:u,[F(`headerBarColor`,n)]:d}}=i.value;return{"--n-bezier":r,"--n-font-size":c,"--n-margin":l,"--n-bar-color":d,"--n-bar-width":u,"--n-font-weight":a,"--n-text-color":o,"--n-prefix-width":s}}),c=r?o(`h${e}`,s(()=>t.type[0]),a,t):void 0;return{mergedClsPrefix:n,cssVars:r?void 0:a,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var t;let{prefix:n,alignText:r,mergedClsPrefix:i,cssVars:a,$slots:o}=this;return(t=this.onRender)==null||t.call(this),l(`h${e}`,{class:[`${i}-h`,`${i}-h${e}`,this.themeClass,{[`${i}-h--prefix-bar`]:n,[`${i}-h--align-text`]:r}],style:a},o)}});W(`1`);var G=W(`2`);W(`3`),W(`4`),W(`5`),W(`6`);var K=N(`p`,`
 box-sizing: border-box;
 transition: color .3s var(--n-bezier);
 margin: var(--n-margin);
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 color: var(--n-text-color);
`,[O(`&:first-child`,`margin-top: 0;`),O(`&:last-child`,`margin-bottom: 0;`)]),q=h({name:`P`,props:Object.assign(Object.assign({},R.props),{depth:[String,Number]}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=R(`Typography`,`-p`,K,b,e,t),i=s(()=>{let{depth:t}=e,n=t||`1`,{common:{cubicBezierEaseInOut:i},self:{pFontSize:a,pLineHeight:o,pMargin:s,pTextColor:c,[`pTextColor${n}Depth`]:l}}=r.value;return{"--n-bezier":i,"--n-font-size":a,"--n-line-height":o,"--n-margin":s,"--n-text-color":t===void 0?c:l}}),a=n?o(`p`,s(()=>`${e.depth||``}`),i,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:i,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var e;return(e=this.onRender)==null||e.call(this),l(`p`,{class:[`${this.mergedClsPrefix}-p`,this.themeClass],style:this.cssVars},this.$slots)}}),J=N(`text`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[S(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),S(`italic`,{fontStyle:`italic`}),S(`underline`,{textDecoration:`underline`}),S(`code`,`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),Y=h({name:`Text`,props:Object.assign(Object.assign({},R.props),{code:Boolean,type:{type:String,default:`default`},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=R(`Typography`,`-text`,J,b,e,t),i=s(()=>{let{depth:t,type:n}=e,i=n===`default`?t===void 0?`textColor`:`textColor${t}Depth`:F(`textColor`,n),{common:{fontWeightStrong:a,fontFamilyMono:o,cubicBezierEaseInOut:s},self:{codeTextColor:c,codeBorderRadius:l,codeColor:u,codeBorder:d,[i]:f}}=r.value;return{"--n-bezier":s,"--n-text-color":f,"--n-font-weight-strong":a,"--n-font-famliy-mono":o,"--n-code-border-radius":l,"--n-code-text-color":c,"--n-code-color":u,"--n-code-border":d}}),a=n?o(`text`,s(()=>`${e.type[0]}${e.depth||``}`),i,e):void 0;return{mergedClsPrefix:t,compitableTag:m(e,[`as`,`tag`]),cssVars:n?void 0:i,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){var e,t,n;let{mergedClsPrefix:r}=this;(e=this.onRender)==null||e.call(this);let i=[`${r}-text`,this.themeClass,{[`${r}-text--code`]:this.code,[`${r}-text--delete`]:this.delete,[`${r}-text--strong`]:this.strong,[`${r}-text--italic`]:this.italic,[`${r}-text--underline`]:this.underline}],a=(n=(t=this.$slots).default)==null?void 0:n.call(t);return this.code?l(`code`,{class:i,style:this.cssVars},this.delete?l(`del`,null,a):a):this.delete?l(`del`,{class:i,style:this.cssVars},a):l(this.compitableTag||`span`,{class:i,style:this.cssVars},a)}}),X={key:0,role:`alert`},Z={style:{padding:`24px`}},Q={style:{"margin-bottom":`24px`}},$={style:{"margin-bottom":`8px`,"font-size":`32px`}},ee=h({__name:`index`,setup(o){let s=j(),l=[{label:`总用户`,value:12480,type:`info`},{label:`今日访问`,value:3256,type:`success`},{label:`活跃应用`,value:5,type:`warning`},{label:`系统正常率`,value:`99.9%`,type:`error`}],m=[{emoji:`📊`,label:`仪表盘`,path:`/dashboard`},{emoji:`👥`,label:`用户管理`,path:`/user`},{emoji:`🧩`,label:`组件展示`,path:`/components`},{emoji:`👤`,label:`个人中心`,path:`/profile`},{emoji:`⚙️`,label:`系统设置`,path:`/settings`},{emoji:`📖`,label:`关于项目`,path:`/about`}],h=[{name:`Vue 3.5`,type:`success`},{name:`Naive UI`,type:`info`},{name:`Vite 8`,type:`warning`},{name:`TypeScript 6`,type:`default`},{name:`Pinia 3`,type:`error`},{name:`Vue Router 4`,type:`success`}],_=M(l),y=M(``);return c(I(function*(){try{let e=yield z.analytics.dashboardStats(),t=[e.totalUsers,e.todayVisits,e.activeUsers,e.systemUptime],n=[`总用户`,`今日访问`,`活跃用户`,`系统正常率`];_.value=l.map((e,r)=>{var i,a;return w(w({},e),{},{label:(i=n[r])==null?`统计`:i,value:r===3?`${t[r]}%`:(a=t[r])==null?0:a})})}catch(e){y.value=`首页统计暂时无法更新，当前显示内置示例`}})),(o,c)=>{let l=G,b=q,S=V,w=i,T=n,O=e,k=t,j=Y,M=u,N=r;return A(),E(L,null,[x(y)?(A(),E(`p`,X,C(x(y)),1)):a(``,!0),p(`div`,Z,[p(`div`,Q,[f(l,null,{default:g(()=>[...c[0]||(c[0]=[d(`欢迎回来`,-1)])]),_:1}),f(b,{depth:`3`},{default:g(()=>[...c[1]||(c[1]=[d(` 基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板 `,-1)])]),_:1}),f(S)]),f(k,{cols:4,"x-gap":16,"y-gap":16,style:{"margin-bottom":`24px`}},{default:g(()=>[(A(!0),E(L,null,v(x(_),e=>(A(),D(O,{key:e.label},{default:g(()=>[f(T,{embedded:``,bordered:!1,style:P([{"padding-left":`8px`,"border-left":`4px solid`},{borderLeftColor:e.type===`info`?`#2080f0`:e.type===`success`?`#18a058`:e.type===`warning`?`#f0a020`:`#d03050`}])},{default:g(()=>[f(w,{label:e.label},{default:g(()=>[p(`span`,{style:P({color:e.type===`info`?`#2080f0`:e.type===`success`?`#18a058`:e.type===`warning`?`#f0a020`:`#d03050`,fontSize:`28px`,fontWeight:600})},C(e.value),5)]),_:2},1032,[`label`])]),_:2},1032,[`style`])]),_:2},1024))),128))]),_:1}),f(T,{title:`快捷操作`,style:{"margin-bottom":`24px`}},{default:g(()=>[f(k,{cols:3,"x-gap":16,"y-gap":16},{default:g(()=>[(A(),E(L,null,v(m,e=>f(O,{key:e.path},{default:g(()=>[f(T,{hoverable:``,style:{"text-align":`center`,cursor:`pointer`},onClick:t=>x(s).push(e.path)},{default:g(()=>[p(`div`,$,C(e.emoji),1),f(j,null,{default:g(()=>[d(C(e.label),1)]),_:2},1024)]),_:2},1032,[`onClick`])]),_:2},1024)),64))]),_:1})]),_:1}),f(T,{title:`技术栈`},{default:g(()=>[f(N,{wrap:``},{default:g(()=>[(A(),E(L,null,v(h,e=>f(M,{key:e.name,type:e.type,size:`medium`},{default:g(()=>[d(C(e.name),1)]),_:2},1032,[`type`])),64))]),_:1})]),_:1})])],64)}}});export{ee as default};