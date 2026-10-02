import{a as e,c as t,d as n,f as r,i,l as a,m as o,n as s,o as c,p as l,r as u,s as d,t as f,u as p}from"./Modal-uGl0NFvR.js";import{n as m,t as h}from"./FormItem-CtVck_g-.js";import{t as g}from"./Input-DHA4gaU6.js";import{t as _}from"./Button-BQWu1K_S.js";import{$r as v,$t as y,Bt as b,Dr as x,F as S,Fn as ee,Gr as te,Hn as C,Ir as w,Jr as T,Lr as E,Mn as D,Mr as ne,Nr as O,Or as k,Pr as A,Qr as j,Qt as re,Sn as ie,Sr as ae,St as oe,Tr as se,Vt as M,Xt as N,Yn as ce,Zr as le,Zt as P,_t as ue,ai as F,an as de,ar as I,b as fe,br as pe,ct as me,dr as he,dt as ge,ft as _e,hr as ve,in as L,ir as R,it as ye,jr as be,mr as z,nr as B,oi as xe,pt as Se,qr as Ce,r as we,ri as V,rr as H,rt as Te,sr as Ee,t as De,ti as U,tt as Oe,ut as ke,v as Ae,vr as je,wr as W,xr as Me,y as Ne,yr as Pe,yt as G,zr as K}from"./index-index-Vl7atQja.js";import{t as q}from"./api-CZrqkO55.js";function Fe(){let e=E(p,null);return e===null&&L(`use-dialog`,`No outer <n-dialog-provider /> founded.`),e}var Ie=Object.assign(Object.assign({},a),{onAfterEnter:Function,onAfterLeave:Function,transformOrigin:String,blockScroll:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},internalStyle:[String,Object],maskClosable:{type:Boolean,default:!0},zIndex:Number,onPositiveClick:Function,onNegativeClick:Function,onClose:Function,onMaskClick:Function,draggable:[Boolean,Object]}),Le=A({name:`DialogEnvironment`,props:Object.assign(Object.assign({},Ie),{internalKey:{type:String,required:!0},to:[String,Object],onInternalAfterLeave:{type:Function,required:!0}}),setup(e){let t=V(!0);function n(){let{onInternalAfterLeave:t,internalKey:n,onAfterLeave:r}=e;t&&t(n),r&&r()}function r(t){let{onPositiveClick:n}=e;n?Promise.resolve(n(t)).then(e=>{e!==!1&&c()}):c()}function i(t){let{onNegativeClick:n}=e;n?Promise.resolve(n(t)).then(e=>{e!==!1&&c()}):c()}function a(){let{onClose:t}=e;t?Promise.resolve(t()).then(e=>{e!==!1&&c()}):c()}function o(t){let{onMaskClick:n,maskClosable:r}=e;n&&(n(t),r&&c())}function s(){let{onEsc:t}=e;t&&t()}function c(){t.value=!1}function l(e){t.value=e}return{show:t,hide:c,handleUpdateShow:l,handleAfterLeave:n,handleCloseClick:a,handleNegativeClick:i,handlePositiveClick:r,handleMaskClick:o,handleEsc:s}},render(){let{handlePositiveClick:e,handleUpdateShow:n,handleNegativeClick:r,handleCloseClick:i,handleAfterLeave:a,handleMaskClick:o,handleEsc:s,to:c,zIndex:l,maskClosable:u,show:p}=this;return w(f,{show:p,onUpdateShow:n,onMaskClick:o,onEsc:s,to:c,zIndex:l,maskClosable:u,onAfterEnter:this.onAfterEnter,onAfterLeave:a,closeOnEsc:this.closeOnEsc,blockScroll:this.blockScroll,autoFocus:this.autoFocus,transformOrigin:this.transformOrigin,draggable:this.draggable,internalAppear:!0,internalDialog:!0},{default:({draggableClass:n})=>w(d,Object.assign({},y(this.$props,t),{titleClass:xe([this.titleClass,n]),style:this.internalStyle,onClose:i,onNegativeClick:r,onPositiveClick:e}))})}}),Re=A({name:`DialogProvider`,props:{injectionKey:String,to:[String,Object]},setup(){let e=V([]),t={};function i(n={}){let r=C(),i=U(Object.assign(Object.assign({},n),{key:r,destroy:()=>{var e;(e=t[`n-dialog-${r}`])==null||e.hide()}}));return e.value.push(i),i}let a=[`info`,`success`,`warning`,`error`].map(e=>t=>i(Object.assign(Object.assign({},t),{type:e})));function s(t){let{value:n}=e;n.splice(n.findIndex(e=>e.key===t),1)}function c(){Object.values(t).forEach(e=>{e==null||e.hide()})}let u={create:i,destroyAll:c,info:a[0],success:a[1],warning:a[2],error:a[3]};return T(p,u),T(n,{clickedRef:l(64),clickedPositionRef:o()}),T(r,e),Object.assign(Object.assign({},u),{dialogList:e,dialogInstRefs:t,handleAfterLeave:s})},render(){var e,t;return w(W,null,[this.dialogList.map(e=>w(Le,P(e,[`destroy`,`style`],{internalStyle:e.style,to:this.to,ref:t=>{t===null?delete this.dialogInstRefs[`n-dialog-${e.key}`]:this.dialogInstRefs[`n-dialog-${e.key}`]=t},internalKey:e.key,onInternalAfterLeave:this.handleAfterLeave}))),(t=(e=this.$slots).default)==null?void 0:t.call(e)])}}),ze=D(`n-loading-bar`),Be=D(`n-loading-bar-api`);function Ve(e){let{primaryColor:t,errorColor:n}=e;return{colorError:n,colorLoading:t,height:`2px`}}var He={name:`LoadingBar`,common:Te,self:Ve},Ue=H(`loading-bar-container`,`
 z-index: 5999;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 2px;
`,[ye({enterDuration:`0.3s`,leaveDuration:`0.8s`}),H(`loading-bar`,`
 width: 100%;
 transition:
 max-width 4s linear,
 background .2s linear;
 height: var(--n-height);
 `,[I(`starting`,`
 background: var(--n-color-loading);
 `),I(`finishing`,`
 background: var(--n-color-loading);
 transition:
 max-width .2s linear,
 background .2s linear;
 `),I(`error`,`
 background: var(--n-color-error);
 transition:
 max-width .2s linear,
 background .2s linear;
 `)])]),J=function(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})};function Y(e,t){return`${t}-loading-bar ${t}-loading-bar--${e}`}var We=A({name:`LoadingBar`,props:{containerClass:String,containerStyle:[String,Object]},setup(){let{inlineThemeDisabled:e}=M(),{props:t,mergedClsPrefixRef:n}=E(ze),r=V(null),i=V(!1),a=V(!1),o=V(!1),s=V(!1),c=!1,l=V(!1),u=x(()=>{let{loadingBarStyle:e}=t;return e?e[l.value?`error`:`loading`]:``});function d(){return J(this,void 0,void 0,function*(){i.value=!1,o.value=!1,c=!1,l.value=!1,s.value=!0,yield K(),s.value=!1})}function f(){return J(this,arguments,void 0,function*(e=0,t=80,i=`starting`){if(a.value=!0,yield d(),c)return;o.value=!0,yield K();let s=r.value;s&&(s.style.maxWidth=`${e}%`,s.style.transition=`none`,s.offsetWidth,s.className=Y(i,n.value),s.style.transition=``,s.style.maxWidth=`${t}%`)})}function p(){return J(this,void 0,void 0,function*(){if(c||l.value)return;a.value&&(yield K()),c=!0;let e=r.value;e&&(e.className=Y(`finishing`,n.value),e.style.maxWidth=`100%`,e.offsetWidth,o.value=!1)})}function m(){if(!(c||l.value))if(!o.value)f(100,100,`error`).then(()=>{l.value=!0;let e=r.value;e&&(e.className=Y(`error`,n.value),e.offsetWidth,o.value=!1)});else{l.value=!0;let e=r.value;if(!e)return;e.className=Y(`error`,n.value),e.style.maxWidth=`100%`,e.offsetWidth,o.value=!1}}function h(){i.value=!0}function g(){i.value=!1}function _(){return J(this,void 0,void 0,function*(){yield d()})}let v=G(`LoadingBar`,`-loading-bar`,Ue,He,t,n),y=x(()=>{let{self:{height:e,colorError:t,colorLoading:n}}=v.value;return{"--n-height":e,"--n-color-loading":n,"--n-color-error":t}}),S=e?b(`loading-bar`,void 0,y,t):void 0;return{mergedClsPrefix:n,loadingBarRef:r,started:a,loading:o,entering:i,transitionDisabled:s,start:f,error:m,finish:p,handleEnter:h,handleAfterEnter:g,handleAfterLeave:_,mergedLoadingBarStyle:u,cssVars:e?void 0:y,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender}},render(){if(!this.started)return null;let{mergedClsPrefix:e}=this;return w(Pe,{name:`fade-in-transition`,appear:!0,onEnter:this.handleEnter,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave,css:!this.transitionDisabled},{default:()=>{var t;return(t=this.onRender)==null||t.call(this),v(w(`div`,{class:[`${e}-loading-bar-container`,this.themeClass,this.containerClass],style:this.containerStyle},w(`div`,{ref:`loadingBarRef`,class:[`${e}-loading-bar`],style:[this.cssVars,this.mergedLoadingBarStyle]})),[[Me,this.loading||!this.loading&&this.entering]])}})}}),Ge=A({name:`LoadingBarProvider`,props:Object.assign(Object.assign({},G.props),{to:{type:[String,Object,Boolean],default:void 0},containerClass:String,containerStyle:[String,Object],loadingBarStyle:{type:Object}}),setup(e){let t=ee(),n=V(null),r={start(){var e;t.value?(e=n.value)==null||e.start():K(()=>{var e;(e=n.value)==null||e.start()})},error(){var e;t.value?(e=n.value)==null||e.error():K(()=>{var e;(e=n.value)==null||e.error()})},finish(){var e;t.value?(e=n.value)==null||e.finish():K(()=>{var e;(e=n.value)==null||e.finish()})}},{mergedClsPrefixRef:i}=M(e);return T(Be,r),T(ze,{props:e,mergedClsPrefixRef:i}),Object.assign(r,{loadingBarRef:n})},render(){var e,t;return w(W,null,w(se,{disabled:this.to===!1,to:this.to||`body`},w(We,{ref:`loadingBarRef`,containerStyle:this.containerStyle,containerClass:this.containerClass})),(t=(e=this.$slots).default)==null?void 0:t.call(e))}});function Ke(){let e=E(Be,null);return e===null&&L(`use-loading-bar`,`No outer <n-loading-bar-provider /> founded.`),e}var qe=A({name:`ModalEnvironment`,props:Object.assign(Object.assign({},s),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){let t=V(!0);function n(){let{onInternalAfterLeave:t,internalKey:n,onAfterLeave:r}=e;t&&t(n),r&&r()}function r(){let{onPositiveClick:t}=e;t?Promise.resolve(t()).then(e=>{e!==!1&&c()}):c()}function i(){let{onNegativeClick:t}=e;t?Promise.resolve(t()).then(e=>{e!==!1&&c()}):c()}function a(){let{onClose:t}=e;t?Promise.resolve(t()).then(e=>{e!==!1&&c()}):c()}function o(t){let{onMaskClick:n,maskClosable:r}=e;n&&(n(t),r&&c())}function s(){let{onEsc:t}=e;t&&t()}function c(){t.value=!1}function l(e){t.value=e}return{show:t,hide:c,handleUpdateShow:l,handleAfterLeave:n,handleCloseClick:a,handleNegativeClick:i,handlePositiveClick:r,handleMaskClick:o,handleEsc:s}},render(){let{handleUpdateShow:e,handleAfterLeave:t,handleMaskClick:n,handleEsc:r,show:i}=this;return w(f,Object.assign({},this.$props,{show:i,onUpdateShow:e,onMaskClick:n,onEsc:r,onAfterLeave:t,internalAppear:!0,internalModal:!0}),this.$slots)}}),Je=A({name:`ModalProvider`,props:{to:[String,Object]},setup(){let t=V([]),n={};function r(e={}){let r=C(),i=U(Object.assign(Object.assign({},e),{key:r,destroy:()=>{var e;(e=n[`n-modal-${r}`])==null||e.hide()}}));return t.value.push(i),i}function a(e){let{value:n}=t;n.splice(n.findIndex(t=>t.key===e),1)}function s(){Object.values(n).forEach(e=>{e==null||e.hide()})}let u={create:r,destroyAll:s};return T(i,u),T(e,{clickedRef:l(64),clickedPositionRef:o()}),T(c,t),Object.assign(Object.assign({},u),{modalList:t,modalInstRefs:n,handleAfterLeave:a})},render(){var e,t;return w(W,null,[this.modalList.map(e=>{var t;return w(qe,P(e,[`destroy`,`render`],{to:(t=e.to)==null?this.to:t,ref:t=>{t===null?delete this.modalInstRefs[`n-modal-${e.key}`]:this.modalInstRefs[`n-modal-${e.key}`]=t},internalKey:e.key,onInternalAfterLeave:this.handleAfterLeave}),{default:e.render})}),(t=(e=this.$slots).default)==null?void 0:t.call(e)])}}),X=D(`n-notification-provider`),Ye=A({name:`NotificationContainer`,props:{scrollable:{type:Boolean,required:!0},placement:{type:String,required:!0}},setup(){let{mergedThemeRef:e,mergedClsPrefixRef:t,wipTransitionCountRef:n}=E(X),r=V(null);return le(()=>{var e,t;n.value>0?(e=r==null?void 0:r.value)==null||e.classList.add(`transitioning`):(t=r==null?void 0:r.value)==null||t.classList.remove(`transitioning`)}),{selfRef:r,mergedTheme:e,mergedClsPrefix:t,transitioning:n}},render(){let{$slots:e,scrollable:t,mergedClsPrefix:n,mergedTheme:r,placement:i}=this;return w(`div`,{ref:`selfRef`,class:[`${n}-notification-container`,t&&`${n}-notification-container--scrollable`,`${n}-notification-container--${i}`]},t?w(Oe,{theme:r.peers.Scrollbar,themeOverrides:r.peerOverrides.Scrollbar,contentStyle:{overflow:`hidden`}},e):e)}}),Xe={info:()=>w(_e,null),success:()=>w(ge,null),warning:()=>w(ke,null),error:()=>w(Se,null),default:()=>null},Z={closable:{type:Boolean,default:!0},type:{type:String,default:`default`},avatar:Function,title:[String,Function],description:[String,Function],content:[String,Function],meta:[String,Function],action:[String,Function],onClose:{type:Function,required:!0},keepAliveOnHover:Boolean,onMouseenter:Function,onMouseleave:Function},Ze=re(Z),Qe=A({name:`Notification`,props:Z,setup(e){let{mergedClsPrefixRef:t,mergedThemeRef:n,props:r}=E(X),{inlineThemeDisabled:i,mergedRtlRef:a}=M(),o=oe(`Notification`,a,t),s=x(()=>{let{type:t}=e,{self:{color:r,textColor:i,closeIconColor:a,closeIconColorHover:o,closeIconColorPressed:s,headerTextColor:c,descriptionTextColor:l,actionTextColor:u,borderRadius:d,headerFontWeight:f,boxShadow:p,lineHeight:m,fontSize:h,closeMargin:g,closeSize:_,width:v,padding:y,closeIconSize:b,closeBorderRadius:x,closeColorHover:S,closeColorPressed:ee,titleFontSize:te,metaFontSize:C,descriptionFontSize:w,[Ee(`iconColor`,t)]:T},common:{cubicBezierEaseOut:E,cubicBezierEaseIn:D,cubicBezierEaseInOut:ne}}=n.value,{left:O,right:k,top:A,bottom:j}=ce(y);return{"--n-color":r,"--n-font-size":h,"--n-text-color":i,"--n-description-text-color":l,"--n-action-text-color":u,"--n-title-text-color":c,"--n-title-font-weight":f,"--n-bezier":ne,"--n-bezier-ease-out":E,"--n-bezier-ease-in":D,"--n-border-radius":d,"--n-box-shadow":p,"--n-close-border-radius":x,"--n-close-color-hover":S,"--n-close-color-pressed":ee,"--n-close-icon-color":a,"--n-close-icon-color-hover":o,"--n-close-icon-color-pressed":s,"--n-line-height":m,"--n-icon-color":T,"--n-close-margin":g,"--n-close-size":_,"--n-close-icon-size":b,"--n-width":v,"--n-padding-left":O,"--n-padding-right":k,"--n-padding-top":A,"--n-padding-bottom":j,"--n-title-font-size":te,"--n-meta-font-size":C,"--n-description-font-size":w}}),c=i?b(`notification`,x(()=>e.type[0]),s,r):void 0;return{mergedClsPrefix:t,showAvatar:x(()=>e.avatar||e.type!==`default`),handleCloseClick(){e.onClose()},rtlEnabled:o,cssVars:i?void 0:s,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;let{mergedClsPrefix:t}=this;return(e=this.onRender)==null||e.call(this),w(`div`,{class:[`${t}-notification-wrapper`,this.themeClass],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:this.cssVars},w(`div`,{class:[`${t}-notification`,this.rtlEnabled&&`${t}-notification--rtl`,this.themeClass,{[`${t}-notification--closable`]:this.closable,[`${t}-notification--show-avatar`]:this.showAvatar}],style:this.cssVars},this.showAvatar?w(`div`,{class:`${t}-notification__avatar`},this.avatar?N(this.avatar):this.type===`default`?null:w(ue,{clsPrefix:t},{default:()=>Xe[this.type]()})):null,this.closable?w(me,{clsPrefix:t,class:`${t}-notification__close`,onClick:this.handleCloseClick}):null,w(`div`,{ref:`bodyRef`,class:`${t}-notification-main`},this.title?w(`div`,{class:`${t}-notification-main__header`},N(this.title)):null,this.description?w(`div`,{class:`${t}-notification-main__description`},N(this.description)):null,this.content?w(`pre`,{class:`${t}-notification-main__content`},N(this.content)):null,this.meta||this.action?w(`div`,{class:`${t}-notification-main-footer`},this.meta?w(`div`,{class:`${t}-notification-main-footer__meta`},N(this.meta)):null,this.action?w(`div`,{class:`${t}-notification-main-footer__action`},N(this.action)):null):null)))}}),$e=Object.assign(Object.assign({},Z),{duration:Number,onClose:Function,onLeave:Function,onAfterEnter:Function,onAfterLeave:Function,onHide:Function,onAfterShow:Function,onAfterHide:Function}),et=A({name:`NotificationEnvironment`,props:Object.assign(Object.assign({},$e),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){let{wipTransitionCountRef:t}=E(X),n=V(!0),r=null;function i(){n.value=!1,r&&window.clearTimeout(r)}function a(e){t.value++,K(()=>{e.style.height=`${e.offsetHeight}px`,e.style.maxHeight=`0`,e.style.transition=`none`,e.offsetHeight,e.style.transition=``,e.style.maxHeight=e.style.height})}function o(n){t.value--,n.style.height=``,n.style.maxHeight=``;let{onAfterEnter:r,onAfterShow:i}=e;r&&r(),i&&i()}function s(e){t.value++,e.style.maxHeight=`${e.offsetHeight}px`,e.style.height=`${e.offsetHeight}px`,e.offsetHeight}function c(t){let{onHide:n}=e;n&&n(),t.style.maxHeight=`0`,t.offsetHeight}function l(){t.value--;let{onAfterLeave:n,onInternalAfterLeave:r,onAfterHide:i,internalKey:a}=e;n&&n(),r(a),i&&i()}function u(){let{duration:t}=e;t&&(r=window.setTimeout(i,t))}function d(e){e.currentTarget===e.target&&r!==null&&(window.clearTimeout(r),r=null)}function f(e){e.currentTarget===e.target&&u()}function p(){let{onClose:t}=e;t?Promise.resolve(t()).then(e=>{e!==!1&&i()}):i()}return te(()=>{e.duration&&(r=window.setTimeout(i,e.duration))}),{show:n,hide:i,handleClose:p,handleAfterLeave:l,handleLeave:c,handleBeforeLeave:s,handleAfterEnter:o,handleBeforeEnter:a,handleMouseenter:d,handleMouseleave:f}},render(){return w(Pe,{name:`notification-transition`,appear:!0,onBeforeEnter:this.handleBeforeEnter,onAfterEnter:this.handleAfterEnter,onBeforeLeave:this.handleBeforeLeave,onLeave:this.handleLeave,onAfterLeave:this.handleAfterLeave},{default:()=>this.show?w(Qe,Object.assign({},y(this.$props,Ze),{onClose:this.handleClose,onMouseenter:this.duration&&this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.duration&&this.keepAliveOnHover?this.handleMouseleave:void 0})):null})}}),tt=B([H(`notification-container`,`
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `,[B(`>`,[H(`scrollbar`,`
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[B(`>`,[H(`scrollbar-container`,`
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[H(`scrollbar-content`,`
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]),I(`top, top-right, top-left`,`
 top: 12px;
 `,[B(`&.transitioning >`,[H(`scrollbar`,[B(`>`,[H(`scrollbar-container`,`
 min-height: 100vh !important;
 `)])])])]),I(`bottom, bottom-right, bottom-left`,`
 bottom: 12px;
 `,[B(`>`,[H(`scrollbar`,[B(`>`,[H(`scrollbar-container`,[H(`scrollbar-content`,`
 padding-bottom: 12px;
 `)])])])]),H(`notification-wrapper`,`
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]),I(`top, bottom`,`
 left: 50%;
 transform: translateX(-50%);
 `,[H(`notification-wrapper`,[B(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 transform: scale(0.85);
 `),B(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 transform: scale(1);
 `)])]),I(`top`,[H(`notification-wrapper`,`
 transform-origin: top center;
 `)]),I(`bottom`,[H(`notification-wrapper`,`
 transform-origin: bottom center;
 `)]),I(`top-right, bottom-right`,[H(`notification`,`
 margin-left: 28px;
 margin-right: 16px;
 `)]),I(`top-left, bottom-left`,[H(`notification`,`
 margin-left: 16px;
 margin-right: 28px;
 `)]),I(`top-right`,`
 right: 0;
 `,[Q(`top-right`)]),I(`top-left`,`
 left: 0;
 `,[Q(`top-left`)]),I(`bottom-right`,`
 right: 0;
 `,[Q(`bottom-right`)]),I(`bottom-left`,`
 left: 0;
 `,[Q(`bottom-left`)]),I(`scrollable`,[I(`top-right`,`
 top: 0;
 `),I(`top-left`,`
 top: 0;
 `),I(`bottom-right`,`
 bottom: 0;
 `),I(`bottom-left`,`
 bottom: 0;
 `)]),H(`notification-wrapper`,`
 margin-bottom: 12px;
 `,[B(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),B(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 opacity: 1;
 `),B(`&.notification-transition-leave-active`,`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),B(`&.notification-transition-enter-active`,`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]),H(`notification`,`
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 max-width: calc(100vw - 16px - 16px);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `,[R(`avatar`,[H(`icon`,`
 color: var(--n-icon-color);
 `),H(`base-icon`,`
 color: var(--n-icon-color);
 `)]),I(`show-avatar`,[H(`notification-main`,`
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]),I(`closable`,[H(`notification-main`,[B(`> *:first-child`,`
 padding-right: 20px;
 `)]),R(`close`,`
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),R(`avatar`,`
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[H(`icon`,`transition: color .3s var(--n-bezier);`)]),H(`notification-main`,`
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `,[H(`notification-main-footer`,`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `,[R(`meta`,`
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),R(`action`,`
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]),R(`header`,`
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),R(`description`,`
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),R(`content`,`
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `,[B(`&:first-child`,`margin: 0;`)])])])])]);function Q(e){return H(`notification-wrapper`,[B(`&.notification-transition-enter-from, &.notification-transition-leave-to`,`
 transform: translate(${e.split(`-`)[1]===`left`?`calc(-100%)`:`calc(100%)`}, 0);
 `),B(`&.notification-transition-leave-from, &.notification-transition-enter-to`,`
 transform: translate(0, 0);
 `)])}var nt=D(`n-notification-api`),rt=A({name:`NotificationProvider`,props:Object.assign(Object.assign({},G.props),{containerClass:String,containerStyle:[String,Object],to:[String,Object],scrollable:{type:Boolean,default:!0},max:Number,placement:{type:String,default:`top-right`},keepAliveOnHover:Boolean}),setup(e){let{mergedClsPrefixRef:t}=M(e),n=V([]),r={},i=new Set;function a(t){let a=C(),o=()=>{i.add(a),r[a]&&r[a].hide()},s=U(Object.assign(Object.assign({},t),{key:a,destroy:o,hide:o,deactivate:o})),{max:c}=e;if(c&&n.value.length-i.size>=c){let e=!1,t=0;for(let a of n.value){if(!i.has(a.key)){r[a.key]&&(a.destroy(),e=!0);break}t++}e||n.value.splice(t,1)}return n.value.push(s),s}let o=[`info`,`success`,`warning`,`error`].map(e=>t=>a(Object.assign(Object.assign({},t),{type:e})));function s(e){i.delete(e),n.value.splice(n.value.findIndex(t=>t.key===e),1)}let c=G(`Notification`,`-notification`,tt,Ae,e,t),l={create:a,info:o[0],success:o[1],warning:o[2],error:o[3],open:d,destroyAll:f},u=V(0);T(nt,l),T(X,{props:e,mergedClsPrefixRef:t,mergedThemeRef:c,wipTransitionCountRef:u});function d(e){return a(e)}function f(){Object.values(n.value).forEach(e=>{e.hide()})}return Object.assign({mergedClsPrefix:t,notificationList:n,notificationRefs:r,handleAfterLeave:s},l)},render(){var e,t,n;let{placement:r}=this;return w(W,null,(t=(e=this.$slots).default)==null?void 0:t.call(e),this.notificationList.length?w(se,{to:(n=this.to)==null?`body`:n},w(Ye,{class:this.containerClass,style:this.containerStyle,scrollable:this.scrollable&&r!==`top`&&r!==`bottom`,placement:r},{default:()=>this.notificationList.map(e=>w(et,Object.assign({ref:t=>{let n=e.key;t===null?delete this.notificationRefs[n]:this.notificationRefs[n]=t}},P(e,[`destroy`,`hide`,`deactivate`]),{internalKey:e.key,onInternalAfterLeave:this.handleAfterLeave,keepAliveOnHover:e.keepAliveOnHover===void 0?this.keepAliveOnHover:e.keepAliveOnHover})))})):null)}});function it(){let e=E(nt,null);return e===null&&L(`use-notification`,"No outer `n-notification-provider` found."),e}var at=A({name:`InjectionExtractor`,props:{onSetup:Function},setup(e,{slots:t}){var n;return(n=e.onSetup)==null||n.call(e),()=>{var e;return(e=t.default)==null?void 0:e.call(t)}}}),ot={message:Ne,notification:it,loadingBar:Ke,dialog:Fe,modal:u};function st({providersAndProps:e,configProviderProps:t}){let n=pe(i),r={app:n};function i(){return w(S,F(t),{default:()=>e.map(({type:e,Provider:t,props:n})=>w(t,F(n),{default:()=>w(at,{onSetup:()=>r[e]=ot[e]()})}))})}let a;return ie&&(a=document.createElement(`div`),document.body.appendChild(a),n.mount(a)),Object.assign({unmount:()=>{var e;if(n===null||a===null){de(`discrete`,`unmount call no need because discrete app has been unmounted`);return}n.unmount(),(e=a.parentNode)==null||e.removeChild(a),a=null,n=null}},r)}function ct(e,{configProviderProps:t,messageProviderProps:n,dialogProviderProps:r,notificationProviderProps:i,loadingBarProviderProps:a,modalProviderProps:o}={}){let s=[];return e.forEach(e=>{switch(e){case`message`:s.push({type:e,Provider:fe,props:n});break;case`notification`:s.push({type:e,Provider:rt,props:i});break;case`dialog`:s.push({type:e,Provider:Re,props:r});break;case`loadingBar`:s.push({type:e,Provider:Ge,props:a});break;case`modal`:s.push({type:e,Provider:Je,props:o})}}),st({providersAndProps:s,configProviderProps:t})}var $={login:q.auth.login,logout:()=>{var e;return q.auth.logout((e=z())==null?``:e)},refresh:()=>{var e;return q.auth.refresh((e=z())==null?``:e)},getProfile:function(){var e=je(function*(){var e;let t=yield q.auth.me();return{avatar:``,role:(e=t.roles[0])==null?``:e,userName:t.nickname||t.username}});return function(){return e.apply(this,arguments)}}()},lt={class:`login-wrap`},ut={class:`login-panel`},dt={class:`login-card`},ft=De(A({__name:`index`,setup(e){let{message:t}=ct([`message`]),n=we(),r=he(),i=V(),a=V(!1),o=U({username:`admin`,password:`123456`}),s={username:{required:!0,message:`请输入用户名`,trigger:`blur`},password:{required:!0,message:`请输入密码`,trigger:`blur`}};function c(){return l.apply(this,arguments)}function l(){return l=je(function*(){var e;yield(e=i.value)==null?void 0:e.validate(),a.value=!0;try{let e=yield $.login(o);r.setToken(e.accessToken),ve(e.refreshToken);let i=yield $.getProfile();r.setUserInfo(i),t.success(`登录成功`);let a=n.currentRoute.value.query.redirect||`/`;yield n.push(a)}catch(e){t.error((e==null?void 0:e.message)||`登录失败，请稍后重试`)}finally{a.value=!1}}),l.apply(this,arguments)}return(e,t)=>{let n=g,r=h,l=_,u=m;return Ce(),be(`div`,lt,[t[5]||(t[5]=k(`div`,{class:`login-brand`},[k(`div`,{class:`brand-inner`},[k(`div`,{class:`brand-logo`},`⚡`),k(`h1`,null,`Fast Vue3`),k(`p`,null,`多 UI 框架 · Monorepo 工程模板`),k(`ul`,{class:`brand-list`},[k(`li`,null,`✦ Vue 3.5 + TypeScript`),k(`li`,null,`✦ Vite 7 + Turborepo`),k(`li`,null,`✦ Pinia + UnoCSS`),k(`li`,null,`✦ 7 套 UI 框架`)])])],-1)),k(`div`,ut,[k(`div`,dt,[t[3]||(t[3]=k(`div`,{class:`login-header`},[k(`span`,{class:`ui-badge`},`Naive UI`),k(`h2`,null,`欢迎回来`),k(`p`,null,`请登录您的账号`)],-1)),O(u,{ref_key:`formRef`,ref:i,model:F(o),rules:s,"label-placement":`top`},{default:j(()=>[O(r,{label:`用户名`,path:`username`},{default:j(()=>[O(n,{value:F(o).username,"onUpdate:value":t[0]||(t[0]=e=>F(o).username=e),size:`large`,placeholder:`请输入用户名（admin）`,onKeyup:ae(c,[`enter`])},null,8,[`value`])]),_:1}),O(r,{label:`密码`,path:`password`},{default:j(()=>[O(n,{value:F(o).password,"onUpdate:value":t[1]||(t[1]=e=>F(o).password=e),type:`password`,size:`large`,"show-password-on":`click`,placeholder:`请输入密码（123456）`,onKeyup:ae(c,[`enter`])},null,8,[`value`])]),_:1}),O(l,{type:`primary`,size:`large`,loading:F(a),block:``,class:`login-btn`,onClick:c},{default:j(()=>[...t[2]||(t[2]=[ne(` 登录 `,-1)])]),_:1},8,[`loading`])]),_:1},8,[`model`]),t[4]||(t[4]=k(`p`,{class:`login-hint`},`默认账号：admin / 123456`,-1))])])])}}}),[[`__scopeId`,`data-v-8681456f`]]);export{ft as default};