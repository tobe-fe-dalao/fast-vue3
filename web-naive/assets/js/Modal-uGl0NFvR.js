import{n as e,t}from"./use-lock-html-scroll-B3yizp-h.js";import{i as n}from"./Input-DHA4gaU6.js";import{t as r}from"./Button-BQWu1K_S.js";import{n as i,r as a,t as o}from"./Card-C7KKWTcc.js";import{$r as s,$t as c,Bn as l,Bt as u,Dn as d,Dr as f,En as p,Er as m,Fn as h,Hr as g,Ir as _,Jr as v,Kr as y,Ln as b,Lr as x,Mn as S,On as C,Pr as w,Qn as T,Qt as E,Rn as D,Rr as O,S as k,St as A,Tn as j,Vn as M,Vr as N,Vt as ee,Xr as P,Xt as F,Y as te,Yn as ne,Yt as I,_t as re,an as ie,ar as L,cr as ae,ct as oe,dt as se,en as ce,ft as le,ii as R,in as ue,ir as z,it as de,ln as fe,mn as pe,ni as B,nr as V,oi as me,pt as he,qt as ge,ri as H,rn as U,rr as W,sr as _e,tr as ve,tt as ye,ut as be,vn as xe,wn as Se,x as Ce,xr as we,yn as Te,yr as Ee,yt as G,zr as De}from"./index-index-Vl7atQja.js";var K=H(null);function Oe(e){if(e.clientX>0||e.clientY>0)K.value={x:e.clientX,y:e.clientY};else{let{target:t}=e;if(t instanceof Element){let{left:e,top:n,width:r,height:i}=t.getBoundingClientRect();e>0||n>0?K.value={x:e+r/2,y:n+i/2}:K.value={x:0,y:0}}else K.value=null}}var q=0,ke=!0;function Ae(){if(!D)return B(H(null));q===0&&M(`click`,document,Oe,!0);let e=()=>{q+=1};return ke&&(ke=b())?(N(e),g(()=>{--q,q===0&&l(`click`,document,Oe,!0)})):e(),B(K)}var je=H(void 0),J=0;function Me(){je.value=Date.now()}var Ne=!0;function Pe(e){if(!D)return B(H(!1));let t=H(!1),n=null;function r(){n!==null&&window.clearTimeout(n)}function i(){r(),t.value=!0,n=window.setTimeout(()=>{t.value=!1},e)}J===0&&M(`click`,window,Me,!0);let a=()=>{J+=1,M(`click`,window,i,!0)};return Ne&&(Ne=b())?(N(a),g(()=>{--J,J===0&&l(`click`,window,Me,!0),l(`click`,window,i,!0),r()})):a(),B(t)}var Fe=S(`n-dialog-provider`),Ie=S(`n-dialog-api`),Le=S(`n-dialog-reactive-list`),Y={icon:Function,type:{type:String,default:`default`},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,titleClass:[String,Array],titleStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],actionClass:[String,Array],actionStyle:[String,Object],onPositiveClick:Function,onNegativeClick:Function,onClose:Function,closeFocusable:Boolean},Re=E(Y),ze=V([W(`dialog`,`
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[z(`icon`,`
 color: var(--n-icon-color);
 `),L(`bordered`,`
 border: var(--n-border);
 `),L(`icon-top`,[z(`close`,`
 margin: var(--n-close-margin);
 `),z(`icon`,`
 margin: var(--n-icon-margin);
 `),z(`content`,`
 text-align: center;
 `),z(`title`,`
 justify-content: center;
 `),z(`action`,`
 justify-content: center;
 `)]),L(`icon-left`,[z(`icon`,`
 margin: var(--n-icon-margin);
 `),L(`closable`,[z(`title`,`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),z(`close`,`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),z(`content`,`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[L(`last`,`margin-bottom: 0;`)]),z(`action`,`
 display: flex;
 justify-content: flex-end;
 `,[V(`> *:not(:last-child)`,`
 margin-right: var(--n-action-space);
 `)]),z(`icon`,`
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `),z(`title`,`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),W(`dialog-icon-container`,`
 display: flex;
 justify-content: center;
 `)]),ae(W(`dialog`,`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),W(`dialog`,[ve(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),Be={default:()=>_(le,null),info:()=>_(le,null),success:()=>_(se,null),warning:()=>_(be,null),error:()=>_(he,null)},X=w({name:`Dialog`,alias:[`NimbusConfirmCard`,`Confirm`],props:Object.assign(Object.assign({},G.props),Y),slots:Object,setup(e){let{mergedComponentPropsRef:t,mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=ee(e),a=A(`Dialog`,i,n),o=f(()=>{var n,r;let{iconPlacement:i}=e;return i||((r=(n=t==null?void 0:t.value)==null?void 0:n.Dialog)==null?void 0:r.iconPlacement)||`left`});function s(t){let{onPositiveClick:n}=e;n&&n(t)}function c(t){let{onNegativeClick:n}=e;n&&n(t)}function l(){let{onClose:t}=e;t&&t()}let d=G(`Dialog`,`-dialog`,ze,k,e,n),p=f(()=>{let{type:t}=e,n=o.value,{common:{cubicBezierEaseInOut:r},self:{fontSize:i,lineHeight:a,border:s,titleTextColor:c,textColor:l,color:u,closeBorderRadius:f,closeColorHover:p,closeColorPressed:m,closeIconColor:h,closeIconColorHover:g,closeIconColorPressed:_,closeIconSize:v,borderRadius:y,titleFontWeight:b,titleFontSize:x,padding:S,iconSize:C,actionSpace:w,contentMargin:T,closeSize:E,[n===`top`?`iconMarginIconTop`:`iconMargin`]:D,[n===`top`?`closeMarginIconTop`:`closeMargin`]:O,[_e(`iconColor`,t)]:k}}=d.value,A=ne(D);return{"--n-font-size":i,"--n-icon-color":k,"--n-bezier":r,"--n-close-margin":O,"--n-icon-margin-top":A.top,"--n-icon-margin-right":A.right,"--n-icon-margin-bottom":A.bottom,"--n-icon-margin-left":A.left,"--n-icon-size":C,"--n-close-size":E,"--n-close-icon-size":v,"--n-close-border-radius":f,"--n-close-color-hover":p,"--n-close-color-pressed":m,"--n-close-icon-color":h,"--n-close-icon-color-hover":g,"--n-close-icon-color-pressed":_,"--n-color":u,"--n-text-color":l,"--n-border-radius":y,"--n-padding":S,"--n-line-height":a,"--n-border":s,"--n-content-margin":T,"--n-title-font-size":x,"--n-title-font-weight":b,"--n-title-text-color":c,"--n-action-space":w}}),m=r?u(`dialog`,f(()=>`${e.type[0]}${o.value[0]}`),p,e):void 0;return{mergedClsPrefix:n,rtlEnabled:a,mergedIconPlacement:o,mergedTheme:d,handlePositiveClick:s,handleNegativeClick:c,handleCloseClick:l,cssVars:r?void 0:p,themeClass:m==null?void 0:m.themeClass,onRender:m==null?void 0:m.onRender}},render(){var e;let{bordered:t,mergedIconPlacement:n,cssVars:i,closable:a,showIcon:o,title:s,content:c,action:l,negativeText:u,positiveText:d,positiveButtonProps:f,negativeButtonProps:p,handlePositiveClick:m,handleNegativeClick:h,mergedTheme:g,loading:v,type:y,mergedClsPrefix:b}=this;(e=this.onRender)==null||e.call(this);let x=o?_(re,{clsPrefix:b,class:`${b}-dialog__icon`},{default:()=>I(this.$slots.icon,e=>e||(this.icon?F(this.icon):Be[this.type]()))}):null,S=I(this.$slots.action,e=>e||d||u||l?_(`div`,{class:[`${b}-dialog__action`,this.actionClass],style:this.actionStyle},e||(l?[F(l)]:[this.negativeText&&_(r,Object.assign({theme:g.peers.Button,themeOverrides:g.peerOverrides.Button,ghost:!0,size:`small`,onClick:h},p),{default:()=>F(this.negativeText)}),this.positiveText&&_(r,Object.assign({theme:g.peers.Button,themeOverrides:g.peerOverrides.Button,size:`small`,type:y===`default`?`primary`:y,disabled:v,loading:v,onClick:m},f),{default:()=>F(this.positiveText)})])):null);return _(`div`,{class:[`${b}-dialog`,this.themeClass,this.closable&&`${b}-dialog--closable`,`${b}-dialog--icon-${n}`,t&&`${b}-dialog--bordered`,this.rtlEnabled&&`${b}-dialog--rtl`],style:i,role:`dialog`},a?I(this.$slots.close,e=>{let t=[`${b}-dialog__close`,this.rtlEnabled&&`${b}-dialog--rtl`];return e?_(`div`,{class:t},e):_(oe,{focusable:this.closeFocusable,clsPrefix:b,class:t,onClick:this.handleCloseClick})}):null,o&&n===`top`?_(`div`,{class:`${b}-dialog-icon-container`},x):null,_(`div`,{class:[`${b}-dialog__title`,this.titleClass],style:this.titleStyle},o&&n===`left`?x:null,ge(this.$slots.header,()=>[F(s)])),_(`div`,{class:[`${b}-dialog__content`,S?``:`${b}-dialog__content--last`,this.contentClass],style:this.contentStyle},ge(this.$slots.default,()=>[F(c)])),S)}}),Ve=S(`n-modal-provider`),He=S(`n-modal-api`),Ue=S(`n-modal-reactive-list`);function We(){let e=x(He,null);return e===null&&ue(`use-modal`,`No outer <n-modal-provider /> founded.`),e}var Z=`n-draggable`;function Ge(e,t){let n,r=f(()=>e.value!==!1),i=f(()=>r.value?Z:``),a=f(()=>{let t=e.value;return t===!0||t===!1?!0:t?t.bounds!==`none`:!0});function o(e){let r=e.querySelector(`.${Z}`);if(!r||!i.value)return;let o=0,s=0,c=0,u=0,d=0,f=0,p,m=null,h=null;function g(t){t.preventDefault(),p=t;let{x:n,y:r,right:i,bottom:a}=e.getBoundingClientRect();s=n,u=r,o=window.innerWidth-i,c=window.innerHeight-a;let{left:l,top:m}=e.style;d=+m.slice(0,-2),f=+l.slice(0,-2)}function _(){h&&(e.style.top=`${h.y}px`,e.style.left=`${h.x}px`,h=null),m=null}function v(e){if(!p)return;let{clientX:t,clientY:n}=p,r=e.clientX-t,i=e.clientY-n;a.value&&(r>o?r=o:-r>s&&(r=-s),i>c?i=c:-i>u&&(i=-u)),h={x:r+f,y:i+d},m||(m=requestAnimationFrame(_))}function y(){p=void 0,m&&(cancelAnimationFrame(m),m=null),h&&(e.style.top=`${h.y}px`,e.style.left=`${h.x}px`,h=null),t.onEnd(e)}M(`mousedown`,r,g),M(`mousemove`,window,v),M(`mouseup`,window,y),n=()=>{m&&cancelAnimationFrame(m),l(`mousedown`,r,g),l(`mousemove`,window,v),l(`mouseup`,window,y)}}function s(){n&&(n(),n=void 0)}return y(s),{stopDrag:s,startDrag:o,draggableRef:r,draggableClassRef:i}}var Q=Object.assign(Object.assign({},a),Y),Ke=E(Q),qe=w({name:`ModalBody`,inheritAttrs:!1,slots:Object,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean,draggable:{type:[Boolean,Object],default:!1},maskHidden:Boolean},Q),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(e){let n=H(null),r=H(null),i=H(e.show),a=H(null),o=H(null),s=x(p),c=null;P(R(e,`show`),e=>{e&&(c=s.getMousePosition())},{immediate:!0});let{stopDrag:l,startDrag:u,draggableRef:d,draggableClassRef:m}=Ge(R(e,`draggable`),{onEnd:e=>{y(e)}}),h=f(()=>me([e.titleClass,m.value])),g=f(()=>me([e.headerClass,m.value]));P(R(e,`show`),e=>{e&&(i.value=!0)}),t(f(()=>e.blockScroll&&i.value));function _(){if(s.transformOriginRef.value===`center`)return``;let{value:e}=a,{value:t}=o;return e===null||t===null?``:r.value?`${e}px ${t+r.value.containerScrollTop}px`:``}function y(e){if(s.transformOriginRef.value===`center`||!c||!r.value)return;let t=r.value.containerScrollTop,{offsetLeft:n,offsetTop:i}=e,l=c.y;a.value=-(n-c.x),o.value=-(i-l-t),e.style.transformOrigin=_()}function b(e){De(()=>{y(e)})}function S(t){t.style.transformOrigin=_(),e.onBeforeLeave()}function w(t){let n=t;d.value&&u(n),e.onAfterEnter&&e.onAfterEnter(n)}function T(){i.value=!1,a.value=null,o.value=null,l(),e.onAfterLeave()}function E(){let{onClose:t}=e;t&&t()}function D(){e.onNegativeClick()}function O(){e.onPositiveClick()}let k=H(null);return P(k,e=>{e&&De(()=>{let t=e.el;t&&n.value!==t&&(n.value=t)})}),v(j,n),v(C,null),v(Se,null),{mergedTheme:s.mergedThemeRef,appear:s.appearRef,isMounted:s.isMountedRef,mergedClsPrefix:s.mergedClsPrefixRef,bodyRef:n,scrollbarRef:r,draggableClass:m,displayed:i,childNodeRef:k,cardHeaderClass:g,dialogTitleClass:h,handlePositiveClick:O,handleNegativeClick:D,handleCloseClick:E,handleAfterEnter:w,handleAfterLeave:T,handleBeforeLeave:S,handleEnter:b}},render(){let{$slots:e,$attrs:t,handleEnter:n,handleAfterEnter:r,handleAfterLeave:a,handleBeforeLeave:l,preset:u,mergedClsPrefix:d}=this,f=null;if(!u){if(f=ce(`default`,e.default,{draggableClass:this.draggableClass}),!f){ie(`modal`,`default slot is empty`);return}f=m(f),f.props=O({class:`${d}-modal`},t,f.props||{})}return this.displayDirective===`show`||this.displayed||this.show?s(_(`div`,{role:`none`,class:[`${d}-modal-body-wrapper`,this.maskHidden&&`${d}-modal-body-wrapper--mask-hidden`]},_(ye,{ref:`scrollbarRef`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${d}-modal-scroll-content`},{default:()=>{var t;return[(t=this.renderMask)==null?void 0:t.call(this),_(fe,{disabled:!this.trapFocus||this.maskHidden,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>{var t;return _(Ee,{name:`fade-in-scale-up-transition`,appear:(t=this.appear)==null?this.isMounted:t,onEnter:n,onAfterEnter:r,onAfterLeave:a,onBeforeLeave:l},{default:()=>{let t=[[we,this.show]],{onClickoutside:n}=this;return n&&t.push([Te,this.onClickoutside,void 0,{capture:!0}]),s(this.preset===`confirm`||this.preset===`dialog`?_(X,Object.assign({},this.$attrs,{class:[`${d}-modal`,this.$attrs.class],ref:`bodyRef`,theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},c(this.$props,Re),{titleClass:this.dialogTitleClass,"aria-modal":`true`}),e):this.preset===`card`?_(o,Object.assign({},this.$attrs,{ref:`bodyRef`,class:[`${d}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},c(this.$props,i),{headerClass:this.cardHeaderClass,"aria-modal":`true`,role:`dialog`}),e):this.childNodeRef=f,t)}})}})]}})),[[we,this.displayDirective===`if`||this.displayed||this.show]]):null}}),Je=V([W(`modal-container`,`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),W(`modal-mask`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[de({enterDuration:`.25s`,leaveDuration:`.25s`,enterCubicBezier:`var(--n-bezier-ease-out)`,leaveCubicBezier:`var(--n-bezier-ease-out)`})]),W(`modal-body-wrapper`,`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[W(`modal-scroll-content`,`
 min-height: 100%;
 display: flex;
 position: relative;
 `),L(`mask-hidden`,`pointer-events: none;`,[W(`modal-scroll-content`,[V(`> *`,`
 pointer-events: all;
 `)])])]),W(`modal`,`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[te({duration:`.25s`,enterScale:`.5`}),V(`.${Z}`,`
 cursor: move;
 user-select: none;
 `)])]),$=Object.assign(Object.assign(Object.assign(Object.assign({},G.props),{show:Boolean,showMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:`if`},transformOrigin:{type:String,default:`mouse`},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),Q),{draggable:[Boolean,Object],onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalModal:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function,unstableShowMask:{type:Boolean,default:void 0}}),Ye=w({name:`Modal`,inheritAttrs:!1,props:$,slots:Object,setup(t){let r=H(null),{mergedClsPrefixRef:i,namespaceRef:a,inlineThemeDisabled:o}=ee(t),s=G(`Modal`,`-modal`,Je,Ce,t,i),l=Pe(64),m=Ae(),g=h(),_=t.internalDialog?x(Fe,null):null,y=t.internalModal?x(d,null):null,b=e();function S(e){let{onUpdateShow:n,"onUpdate:show":r,onHide:i}=t;n&&U(n,e),r&&U(r,e),i&&!e&&i(e)}function C(){let{onClose:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&S(!1)}):S(!1)}function w(){let{onPositiveClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&S(!1)}):S(!1)}function E(){let{onNegativeClick:e}=t;e?Promise.resolve(e()).then(e=>{e!==!1&&S(!1)}):S(!1)}function D(){let{onBeforeLeave:e,onBeforeHide:n}=t;e&&U(e),n&&n()}function O(){let{onAfterLeave:e,onAfterHide:n}=t;e&&U(e),n&&n()}function k(e){var n;let{onMaskClick:i}=t;i&&i(e),t.maskClosable&&(n=r.value)!=null&&n.contains(T(e))&&S(!1)}function A(e){var r;(r=t.onEsc)==null||r.call(t),t.show&&t.closeOnEsc&&n(e)&&(b.value||S(!1))}v(p,{getMousePosition:()=>{let e=_||y;if(e){let{clickedRef:t,clickedPositionRef:n}=e;if(t.value&&n.value)return n.value}return l.value?m.value:null},mergedClsPrefixRef:i,mergedThemeRef:s,isMountedRef:g,appearRef:R(t,`internalAppear`),transformOriginRef:R(t,`transformOrigin`)});let j=f(()=>{let{common:{cubicBezierEaseOut:e},self:{boxShadow:t,color:n,textColor:r}}=s.value;return{"--n-bezier-ease-out":e,"--n-box-shadow":t,"--n-color":n,"--n-text-color":r}}),M=o?u(`theme-class`,void 0,j,t):void 0;return{mergedClsPrefix:i,namespace:a,isMounted:g,containerRef:r,presetProps:f(()=>c(t,Ke)),handleEsc:A,handleAfterLeave:O,handleClickoutside:k,handleBeforeLeave:D,doUpdateShow:S,handleNegativeClick:E,handlePositiveClick:w,handleCloseClick:C,cssVars:o?void 0:j,themeClass:M==null?void 0:M.themeClass,onRender:M==null?void 0:M.onRender}},render(){let{mergedClsPrefix:e}=this;return _(pe,{to:this.to,show:this.show},{default:()=>{var t;(t=this.onRender)==null||t.call(this);let{showMask:n}=this;return s(_(`div`,{role:`none`,ref:`containerRef`,class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},_(qe,Object.assign({style:this.overlayStyle},this.$attrs,{ref:`bodyWrapper`,displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,draggable:this.draggable,blockScroll:this.blockScroll,maskHidden:!n},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:n?void 0:this.handleClickoutside,renderMask:n?()=>{var t;return _(Ee,{name:`fade-in-transition`,key:`mask`,appear:(t=this.internalAppear)==null?this.isMounted:t},{default:()=>this.show?_(`div`,{"aria-hidden":!0,ref:`containerRef`,class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null})}:void 0}),this.$slots)),[[xe,{zIndex:this.zIndex,enabled:this.show}]])}})}});export{Ve as a,Re as c,Fe as d,Le as f,He as i,Y as l,Ae as m,$ as n,Ue as o,Pe as p,We as r,X as s,Ye as t,Ie as u};