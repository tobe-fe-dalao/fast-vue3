import{a as e,t}from"./api-6DLT1LYT.js";import{n,t as r}from"./Checkmark-CXkwtHyJ.js";import{n as i,t as a}from"./CollapseItem-kICT3iPp.js";import{t as o}from"./Button-zsO7ID3O.js";import{$ as s,$t as c,At as l,Ct as u,Dt as d,Ft as f,Gt as p,Kt as m,Lt as h,Nt as g,Ot as _,Pt as v,Rt as y,Sn as b,Wt as x,Xt as ee,Yt as S,_n as C,an as w,at as T,bn as E,c as D,cn as O,en as k,et as A,f as j,g as M,gn as N,h as P,in as F,jt as I,kt as L,lt as R,mt as z,on as B,p as te,qt as V,r as ne,rt as H,s as U,t as W,un as G,ut as K,v as q,x as J,xn as Y,yn as X}from"./index-index-CZYP7cqP.js";function Z(e,t=`default`,n=[]){let r=e.$slots[t];return r===void 0?n:r()}var re={stepHeaderFontSizeSmall:`14px`,stepHeaderFontSizeMedium:`16px`,indicatorIndexFontSizeSmall:`14px`,indicatorIndexFontSizeMedium:`16px`,indicatorSizeSmall:`22px`,indicatorSizeMedium:`28px`,indicatorIconSizeSmall:`14px`,indicatorIconSizeMedium:`18px`};function ie(e){let{fontWeightStrong:t,baseColor:n,textColorDisabled:r,primaryColor:i,errorColor:a,textColor1:o,textColor2:s}=e;return Object.assign(Object.assign({},re),{stepHeaderFontWeight:t,indicatorTextColorProcess:n,indicatorTextColorWait:r,indicatorTextColorFinish:i,indicatorTextColorError:a,indicatorBorderColorProcess:i,indicatorBorderColorWait:r,indicatorBorderColorFinish:i,indicatorBorderColorError:a,indicatorColorProcess:i,indicatorColorWait:`#0000`,indicatorColorFinish:`#0000`,indicatorColorError:`#0000`,splitorColorProcess:r,splitorColorWait:r,splitorColorFinish:i,splitorColorError:r,headerTextColorProcess:o,headerTextColorWait:r,headerTextColorFinish:r,headerTextColorError:a,descriptionTextColorProcess:s,descriptionTextColorWait:r,descriptionTextColorFinish:r,descriptionTextColorError:a})}var ae={name:`Steps`,common:D,self:ie},oe=C(`steps`,`
 width: 100%;
 display: flex;
`,[C(`step`,`
 position: relative;
 display: flex;
 flex: 1;
 `,[E(`disabled`,`cursor: not-allowed`),E(`clickable`,`
 cursor: pointer;
 `),N(`&:last-child`,[C(`step-splitor`,`display: none;`)])]),C(`step-splitor`,`
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),C(`step-content`,`flex: 1;`,[C(`step-content-header`,`
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[X(`title`,`
 white-space: nowrap;
 flex: 0;
 `)]),X(`description`,`
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),C(`step-indicator`,`
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[C(`step-indicator-slot`,`
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `,[X(`index`,`
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 white-space: nowrap;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()]),C(`icon`,`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()]),C(`base-icon`,`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[j()])])]),E(`vertical`,`flex-direction: column;`,[Y(`show-description`,[N(`>`,[C(`step`,`padding-bottom: 8px;`)])]),N(`>`,[C(`step`,`margin-bottom: 16px;`,[N(`&:last-child`,`margin-bottom: 0;`),N(`>`,[C(`step-indicator`,[N(`>`,[C(`step-splitor`,`
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]),C(`step-content`,[X(`description`,`margin-top: 8px;`)])])])])]),E(`content-bottom`,[Y(`vertical`,[N(`>`,[C(`step`,`flex-direction: column`,[N(`>`,[C(`step-line`,`display: flex;`,[N(`>`,[C(`step-splitor`,`
 margin-top: 0;
 align-self: center;
 `)])])]),N(`>`,[C(`step-content`,`margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);`,[C(`step-content-header`,`
 margin-left: 0;
 `),C(`step-content__description`,`
 margin-left: 0;
 `)])])])])])])]);function se(e,t){return typeof e!=`object`||!e||Array.isArray(e)?null:(e.props||(e.props={}),e.props.internalIndex=t+1,e)}function ce(e){return e.map((e,t)=>se(e,t))}var le=Object.assign(Object.assign({},q.props),{current:Number,status:{type:String,default:`process`},size:{type:String,default:`medium`},vertical:Boolean,contentPlacement:{type:String,default:`right`},"onUpdate:current":[Function,Array],onUpdateCurrent:[Function,Array]}),Q=z(`n-steps`),ue=f({name:`Steps`,props:le,slots:Object,setup(e,{slots:t}){let{mergedClsPrefixRef:n,mergedRtlRef:r}=A(e),i=J(`Steps`,r,n);return m(Q,{props:e,mergedThemeRef:q(`Steps`,`-steps`,oe,ae,e,n),mergedClsPrefixRef:n,stepsSlots:t}),{mergedClsPrefix:n,rtlEnabled:i}},render(){let{mergedClsPrefix:e}=this;return h(`div`,{class:[`${e}-steps`,this.rtlEnabled&&`${e}-steps--rtl`,this.vertical&&`${e}-steps--vertical`,this.contentPlacement===`bottom`&&`${e}-steps--content-bottom`]},ce(n(Z(this))))}}),de=f({name:`Step`,props:{status:String,title:String,description:String,disabled:Boolean,internalIndex:{type:Number,default:0}},slots:Object,setup(e){let t=y(Q,null);t||K(`step`,"`n-step` must be placed inside `n-steps`.");let{inlineThemeDisabled:n}=A(),{props:r,mergedThemeRef:i,mergedClsPrefixRef:a,stepsSlots:o}=t,c=w(r,`vertical`),l=w(r,`contentPlacement`),u=d(()=>{let{status:t}=e;if(t)return t;{let{internalIndex:t}=e,{current:n}=r;if(n===void 0)return`process`;if(t<n)return`finish`;if(t===n)return r.status||`process`;if(t>n)return`wait`}return`process`}),f=d(()=>{let{value:e}=u,{size:t}=r,{common:{cubicBezierEaseInOut:n},self:{stepHeaderFontWeight:a,[b(`stepHeaderFontSize`,t)]:o,[b(`indicatorIndexFontSize`,t)]:s,[b(`indicatorSize`,t)]:c,[b(`indicatorIconSize`,t)]:l,[b(`indicatorTextColor`,e)]:d,[b(`indicatorBorderColor`,e)]:f,[b(`headerTextColor`,e)]:p,[b(`splitorColor`,e)]:m,[b(`indicatorColor`,e)]:h,[b(`descriptionTextColor`,e)]:g}}=i.value;return{"--n-bezier":n,"--n-description-text-color":g,"--n-header-text-color":p,"--n-indicator-border-color":f,"--n-indicator-color":h,"--n-indicator-icon-size":l,"--n-indicator-index-font-size":s,"--n-indicator-size":c,"--n-indicator-text-color":d,"--n-splitor-color":m,"--n-step-header-font-size":o,"--n-step-header-font-weight":a}}),p=n?s(`step`,d(()=>{let{value:e}=u,{size:t}=r;return`${e[0]}${t[0]}`}),f,r):void 0;return{stepsSlots:o,mergedClsPrefix:a,vertical:c,mergedStatus:u,handleStepClick:d(()=>{if(e.disabled)return;let{onUpdateCurrent:t,"onUpdate:current":n}=r;return t||n?()=>{t&&R(t,e.internalIndex),n&&R(n,e.internalIndex)}:void 0}),cssVars:n?void 0:f,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender,contentPlacement:l}},render(){let{mergedClsPrefix:e,onRender:t,handleStepClick:n,disabled:i,contentPlacement:a,vertical:o}=this,s=T(this.$slots.default,t=>{let n=t||this.description;return n?h(`div`,{class:`${e}-step-content__description`},n):null}),c=h(`div`,{class:`${e}-step-splitor`}),l=h(`div`,{class:`${e}-step-indicator`,key:a},h(`div`,{class:`${e}-step-indicator-slot`},h(P,null,{default:()=>T(this.$slots.icon,t=>{let{mergedStatus:n,stepsSlots:i}=this;return n===`finish`||n===`error`?n===`finish`?h(M,{clsPrefix:e,key:`finish`},{default:()=>H(i[`finish-icon`],()=>[h(r,null)])}):n===`error`?h(M,{clsPrefix:e,key:`error`},{default:()=>H(i[`error-icon`],()=>[h(te,null)])}):null:t||h(`div`,{key:this.internalIndex,class:`${e}-step-indicator-slot__index`},this.internalIndex)})})),o?c:null),d=h(`div`,{class:`${e}-step-content`},h(`div`,{class:`${e}-step-content-header`},h(`div`,{class:`${e}-step-content-header__title`},H(this.$slots.title,()=>[this.title])),!o&&a===`right`?c:null),s),f;return f=!o&&a===`bottom`?h(u,null,h(`div`,{class:`${e}-step-line`},l,c),d):h(u,null,l,d),t==null||t(),h(`div`,{class:[`${e}-step`,i&&`${e}-step--disabled`,!i&&n&&`${e}-step--clickable`,this.themeClass,s&&`${e}-step--show-description`,`${e}-step--${this.mergedStatus}-status`],style:this.cssVars,onClick:n},f)}}),fe={key:0,role:`alert`,class:`site-container`},pe={class:`home-page`},me={class:`hero`},he={class:`hero-inner`},ge={class:`site-btn-row`},_e={id:`stats`,class:`stats-section`},ve={class:`site-container site-container--narrow`},ye={class:`site-grid`,style:{"--site-grid-cols":`4`}},be={class:`stat-icon`},xe={class:`stat-value`},Se={class:`stat-label`},Ce={id:`features`,class:`site-section`},we={class:`site-container`},Te={class:`site-section-head`},Ee={class:`site-grid`},De={class:`feature-icon`},Oe={class:`feature-title`},ke={class:`feature-desc`},Ae={class:`site-section site-section--alt`},je={class:`site-container`},Me={class:`site-section-head`},Ne={class:`site-grid`},Pe={class:`testimonial-quote`},Fe={class:`testimonial-author`},Ie={class:`testimonial-avatar`},Le={class:`testimonial-name`},Re={class:`testimonial-role`},ze={class:`site-section`},Be={class:`site-container`},Ve={class:`site-section-head`},$={class:`site-grid`,style:{"--site-grid-cols":`6`}},He={class:`tech-name`},Ue={class:`site-section site-section--soft`},We={class:`site-container site-container--narrow`},Ge={class:`site-section-head`},Ke={class:`site-card quickstart-card`},qe={class:`site-section site-section--alt`},Je={class:`site-container site-container--narrow`},Ye={class:`site-section-head`},Xe={class:`faq-panel`},Ze={class:`faq-answer`},Qe={class:`faq-more`},$e={class:`cta-section`},et={class:`cta-inner`},tt={class:`site-btn-row`,style:{"margin-top":`24px`}},nt=W(f({__name:`index`,setup(n){let r=ne();function s(){var e;(e=document.querySelector(`#features`))==null||e.scrollIntoView({behavior:`smooth`})}function d(){var e;(e=document.querySelector(`#stats`))==null||e.scrollIntoView({behavior:`smooth`})}let f=[{icon:`🎨`,value:`7`,label:`UI 框架`},{icon:`🧩`,value:`50+`,label:`内置页面`},{icon:`💎`,value:`TS 6`,label:`TypeScript`},{icon:`⚡`,value:`Vite 8`,label:`构建工具`}],m=[{icon:`⚡`,title:`Vite 8 + Turborepo`,desc:`基于 Vite 8 极速构建引擎，配合 Turborepo 实现增量构建与远程缓存，毫秒级热更新，开发体验丝滑流畅。`},{icon:`🎨`,title:`7 大 UI 框架`,desc:`Ant Design Vue / Element Plus / Naive UI / Arco Design / TDesign / PrimeVue / iDux，一站式覆盖主流组件库。`},{icon:`🌗`,title:`深色 / 亮色主题`,desc:`基于 CSS Variables 的主题系统，支持明暗模式无缝切换，可自定义品牌色与全局 Token。`},{icon:`📱`,title:`后台 + 站点双模式`,desc:`同一套工程体系同时输出后台管理应用与纯页面站点，按需选择，灵活切换。`},{icon:`🔧`,title:`TypeScript 6`,desc:`全面拥抱 TypeScript 6，严格的类型推导与泛型约束，从编码阶段捕获潜在错误。`},{icon:`📦`,title:`自动按需导入`,desc:`unplugin-auto-import + unplugin-vue-components 实现 API 与组件的按需自动导入，告别手动 import。`}],h=[{avatar:`🧑‍💻`,name:`李明`,role:`某互联网公司 · 前端负责人`,quote:`用 Fast Vue3 同时维护 3 个不同 UI 框架的中后台项目，共享层代码完全复用，团队效率提升了一倍。`},{avatar:`👩‍💼`,name:`王芳`,role:`独立开发者`,quote:`create-app 一条命令就能生成新应用，官网和后台一起搞定，是我见过工程化最完整的 Vue3 模板。`},{avatar:`👨‍🔬`,name:`张伟`,role:`全栈工程师`,quote:`主题系统和偏好配置做得非常细腻，暗色模式、色弱模式开箱即用，交付给客户时特别有面子。`}],y=[{name:`Vue 3.5`,tag:`渐进式框架`,type:`success`},{name:`Vite 8`,tag:`构建工具`,type:`default`},{name:`TypeScript 6`,tag:`类型系统`,type:`info`},{name:`Pinia 3`,tag:`状态管理`,type:`warning`},{name:`Vue Router 4`,tag:`路由管理`,type:`info`},{name:`Tailwind CSS`,tag:`原子化样式`,type:`default`}],b=[{q:`Fast Vue3 适合什么场景？`,a:`企业中后台管理系统、SaaS 产品官网、多 UI 框架技术选型对比，以及需要长期维护的大型前端工程。`},{q:`可以只使用其中一个 UI 框架吗？`,a:`可以。通过 create-app 脚手架创建应用时选择任意一套 UI 框架即可，其余框架不会进入你的项目。`},{q:`是否支持私有化部署与二次开发？`,a:`完全支持。项目基于 MIT 协议开源，所有代码可自由修改，共享包与应用层解耦，方便按需裁剪。`},{q:`如何从现有项目迁移？`,a:`文档中提供了目录结构说明与共享包接入指南，你可以按模块逐步将业务代码迁移到对应应用中。`}],C=F(f),w=F(m),T=F(h),E=F(b),D=F(``);return x(G(function*(){try{let[n,r,i]=yield Promise.all([t.portal.home(),t.portal.features(),t.portal.faq()]);C.value=n.stats.map((t,n)=>{var r;return e(e({},t),{},{icon:(r=[`🎨`,`🧩`,`💎`,`⚡`][n%4])==null?`✨`:r})}),w.value=r.map((e,t)=>{var n;return{icon:(n=[`⚡`,`🎨`,`🌗`,`📱`,`🔧`,`📦`][t%6])==null?`✨`:n,title:e.title,desc:e.description}}),T.value=n.testimonials.map((e,t)=>{var n;return{avatar:(n=[`🧑‍💻`,`👩‍💼`,`👨‍🔬`][t%3])==null?`👤`:n,name:e.name,role:e.role,quote:e.content}}),E.value=i.slice(0,4).map(e=>({q:e.question,a:e.answer}))}catch(e){D.value=`首页内容暂时无法更新，当前显示内置示例`}})),(e,t)=>{let n=o,f=U,m=de,h=ue,b=a,x=i,A=S(`RouterLink`),j=ee(`reveal`);return p(),I(u,null,[B(D)?(p(),I(`p`,fe,O(B(D)),1)):l(``,!0),_(`div`,pe,[_(`section`,me,[_(`div`,he,[t[5]||(t[5]=_(`div`,{class:`hero-badge`},`🚀 Vue 3.5 · Vite 8 · TypeScript 6`,-1)),t[6]||(t[6]=_(`h1`,{class:`hero-title`},`Fast Vue3`,-1)),t[7]||(t[7]=_(`p`,{class:`hero-subtitle`},`基于 Vue 3 的多 UI 框架 Monorepo 工程平台`,-1)),t[8]||(t[8]=_(`p`,{class:`hero-desc`},` 集成 7 大主流 UI 框架，支持后台管理 + 门户站点双模式， 专注工程架构与长期可维护性 `,-1)),_(`div`,ge,[v(n,{size:`large`,class:`hero-btn`,onClick:s},{default:c(()=>[...t[3]||(t[3]=[g(` 快速开始 `,-1)])]),_:1}),v(n,{size:`large`,ghost:``,class:`hero-btn-outline`,onClick:t[0]||(t[0]=e=>B(r).push(`/docs`))},{default:c(()=>[...t[4]||(t[4]=[g(` 查看文档 `,-1)])]),_:1})])]),_(`button`,{type:`button`,class:`hero-scroll-hint`,title:`向下滚动`,onClick:d},[...t[9]||(t[9]=[_(`span`,{class:`hero-scroll-arrow`},`↓`,-1)])])]),_(`section`,_e,[_(`div`,ve,[_(`div`,ye,[(p(!0),I(u,null,V(B(C),(e,t)=>k((p(),I(`div`,{key:e.label,class:`site-card stat-card`},[_(`div`,be,O(e.icon),1),_(`div`,xe,O(e.value),1),_(`div`,Se,O(e.label),1)])),[[j,t*80]])),128))])])]),_(`section`,Ce,[_(`div`,we,[k((p(),I(`div`,Te,[...t[10]||(t[10]=[_(`h2`,{class:`site-section-title`},`核心特性`,-1),_(`p`,{class:`site-section-desc`},` 从工程架构到开发体验，Fast Vue3 为你提供全方位的最佳实践 `,-1)])])),[[j]]),_(`div`,Ee,[(p(!0),I(u,null,V(B(w),(e,t)=>k((p(),I(`article`,{key:e.title,class:`site-card site-card--hoverable feature-card`},[_(`div`,De,O(e.icon),1),_(`h3`,Oe,O(e.title),1),_(`p`,ke,O(e.desc),1)])),[[j,t%3*100]])),128))])])]),_(`section`,Ae,[_(`div`,je,[k((p(),I(`div`,Me,[...t[11]||(t[11]=[_(`h2`,{class:`site-section-title`},`开发者声音`,-1),_(`p`,{class:`site-section-desc`},`来自一线团队的真实反馈`,-1)])])),[[j]]),_(`div`,Ne,[(p(!0),I(u,null,V(B(T),(e,t)=>k((p(),I(`figure`,{key:e.name,class:`site-card testimonial-card`},[_(`blockquote`,Pe,`"`+O(e.quote)+`"`,1),_(`figcaption`,Fe,[_(`span`,Ie,O(e.avatar),1),_(`span`,null,[_(`span`,Le,O(e.name),1),_(`span`,Re,O(e.role),1)])])])),[[j,t*120]])),128))])])]),_(`section`,ze,[_(`div`,Be,[k((p(),I(`div`,Ve,[...t[12]||(t[12]=[_(`h2`,{class:`site-section-title`},`技术栈`,-1),_(`p`,{class:`site-section-desc`},`拥抱最新的 Vue 生态工具链`,-1)])])),[[j]]),_(`div`,$,[(p(),I(u,null,V(y,(e,t)=>k(_(`div`,{key:e.name,class:`site-card site-card--hoverable tech-card`},[_(`div`,He,O(e.name),1),v(f,{type:e.type,size:`small`,style:{"margin-top":`8px`}},{default:c(()=>[g(O(e.tag),1)]),_:2},1032,[`type`])]),[[j,t*60]])),64))])])]),_(`section`,Ue,[_(`div`,We,[k((p(),I(`div`,Ge,[...t[13]||(t[13]=[_(`h2`,{class:`site-section-title`},`快速开始`,-1),_(`p`,{class:`site-section-desc`},`三步启动你的项目`,-1)])])),[[j]]),k((p(),I(`div`,Ke,[v(h,{vertical:``,current:3},{default:c(()=>[v(m,{title:`克隆并安装依赖`,description:`git clone ... && pnpm install`}),v(m,{title:`启动开发服务`,description:`pnpm dev`}),v(m,{title:`构建部署`,description:`pnpm build`})]),_:1})])),[[j]])])]),_(`section`,qe,[_(`div`,Je,[k((p(),I(`div`,Ye,[...t[14]||(t[14]=[_(`h2`,{class:`site-section-title`},`常见问题`,-1),_(`p`,{class:`site-section-desc`},`你关心的，我们都想到了`,-1)])])),[[j]]),k((p(),I(`div`,Xe,[v(x,null,{default:c(()=>[(p(!0),I(u,null,V(B(E),e=>(p(),L(b,{key:e.q,title:e.q,name:e.q},{default:c(()=>[_(`p`,Ze,O(e.a),1)]),_:2},1032,[`title`,`name`]))),128))]),_:1}),_(`div`,Qe,[v(A,{to:`/faq`,class:`faq-more-link`},{default:c(()=>[...t[15]||(t[15]=[g(` 查看更多问题 → `,-1)])]),_:1})])])),[[j]])])]),_(`section`,$e,[k((p(),I(`div`,et,[t[18]||(t[18]=_(`h2`,{class:`cta-title`},`开始使用 Fast Vue3`,-1)),t[19]||(t[19]=_(`p`,{class:`cta-desc`},`一行命令，即可启动你的下一个项目`,-1)),t[20]||(t[20]=_(`div`,{class:`cta-code`},`pnpm create fast-vue3`,-1)),_(`div`,tt,[v(n,{size:`large`,class:`cta-btn`,onClick:t[1]||(t[1]=e=>B(r).push(`/docs`))},{default:c(()=>[...t[16]||(t[16]=[g(` 阅读文档 `,-1)])]),_:1}),v(n,{size:`large`,ghost:``,class:`cta-btn-outline`,onClick:t[2]||(t[2]=e=>B(r).push(`/contact`))},{default:c(()=>[...t[17]||(t[17]=[g(` 联系我们 `,-1)])]),_:1})])])),[[j,void 0,`zoom`]])])])],64)}}}),[[`__scopeId`,`data-v-03081787`]]);export{nt as default};