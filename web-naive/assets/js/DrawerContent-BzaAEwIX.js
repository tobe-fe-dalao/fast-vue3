import{n as e,t}from"./use-lock-html-scroll-B3yizp-h.js";import{i as n}from"./Input-DHA4gaU6.js";import{$r as r,Bt as i,Dr as a,Fn as o,Hr as s,In as c,Ir as l,Jr as u,Lr as d,On as f,Pr as p,Rr as m,St as h,Tn as g,Vt as _,Xr as v,Zr as y,ar as b,ct as x,g as S,ii as C,in as w,ir as T,it as E,kn as D,ln as O,mn as k,nr as A,ri as j,rn as M,rr as N,sn as P,tt as F,vn as I,wn as L,xr as R,xt as z,yn as B,yr as V,yt as H}from"./index-index-Vl7atQja.js";var U=p({name:`NDrawerContent`,inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){let n=j(!!e.show),r=j(null),i=d(D),o=0,c=``,l=null,p=j(!1),m=j(!1),b=a(()=>e.placement===`top`||e.placement===`bottom`),{mergedClsPrefixRef:x,mergedRtlRef:S}=_(e),C=h(`Drawer`,S,x),w=F,T=e=>{m.value=!0,o=b.value?e.clientY:e.clientX,c=document.body.style.cursor,document.body.style.cursor=b.value?`ns-resize`:`ew-resize`,document.body.addEventListener(`mousemove`,P),document.body.addEventListener(`mouseleave`,w),document.body.addEventListener(`mouseup`,F)},E=()=>{l!==null&&(window.clearTimeout(l),l=null),m.value?p.value=!0:l=window.setTimeout(()=>{p.value=!0},300)},O=()=>{l!==null&&(window.clearTimeout(l),l=null),p.value=!1},{doUpdateHeight:k,doUpdateWidth:A}=i,M=t=>{let{maxWidth:n}=e;if(n&&t>n)return n;let{minWidth:r}=e;return r&&t<r?r:t},N=t=>{let{maxHeight:n}=e;if(n&&t>n)return n;let{minHeight:r}=e;return r&&t<r?r:t};function P(t){var n,i;if(m.value)if(b.value){let i=((n=r.value)==null?void 0:n.offsetHeight)||0,a=o-t.clientY;i+=e.placement===`bottom`?a:-a,i=N(i),k(i),o=t.clientY}else{let n=((i=r.value)==null?void 0:i.offsetWidth)||0,a=o-t.clientX;n+=e.placement===`right`?a:-a,n=M(n),A(n),o=t.clientX}}function F(){m.value&&(o=0,m.value=!1,document.body.style.cursor=c,document.body.removeEventListener(`mousemove`,P),document.body.removeEventListener(`mouseup`,F),document.body.removeEventListener(`mouseleave`,w))}y(()=>{e.show&&(n.value=!0)}),v(()=>e.show,e=>{e||F()}),s(()=>{F()});let I=a(()=>{let{show:t}=e,n=[[R,t]];return e.showMask||n.push([B,e.onClickoutside,void 0,{capture:!0}]),n});function z(){var t;n.value=!1,(t=e.onAfterLeave)==null||t.call(e)}return t(a(()=>e.blockScroll&&n.value)),u(f,r),u(L,null),u(g,null),{bodyRef:r,rtlEnabled:C,mergedClsPrefix:i.mergedClsPrefixRef,isMounted:i.isMountedRef,mergedTheme:i.mergedThemeRef,displayed:n,transitionName:a(()=>({right:`slide-in-from-right-transition`,left:`slide-in-from-left-transition`,top:`slide-in-from-top-transition`,bottom:`slide-in-from-bottom-transition`})[e.placement]),handleAfterLeave:z,bodyDirectives:I,handleMousedownResizeTrigger:T,handleMouseenterResizeTrigger:E,handleMouseleaveResizeTrigger:O,isDragging:m,isHoverOnResizeTrigger:p}},render(){let{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective===`show`||this.displayed||this.show?r(l(`div`,{role:`none`},l(O,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>l(V,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>r(l(`div`,m(this.$attrs,{role:`dialog`,ref:`bodyRef`,"aria-modal":`true`,class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?l(`div`,{class:[`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?l(`div`,{class:[`${t}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:`none`},e):l(F,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${t}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[R,this.displayDirective===`if`||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:W,cubicBezierEaseOut:G}=z;function K({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-bottom`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${W}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${G}`}),A(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateY(100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateY(100%)`})]}var{cubicBezierEaseIn:q,cubicBezierEaseOut:J}=z;function Y({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-left`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${q}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${J}`}),A(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateX(-100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateX(-100%)`})]}var{cubicBezierEaseIn:X,cubicBezierEaseOut:Z}=z;function Q({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-right`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${X}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${Z}`}),A(`&.${n}-transition-enter-to`,{transform:`translateX(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateX(100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateX(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateX(100%)`})]}var{cubicBezierEaseIn:$,cubicBezierEaseOut:ee}=z;function te({duration:e=`0.3s`,leaveDuration:t=`0.2s`,name:n=`slide-in-from-top`}={}){return[A(`&.${n}-transition-leave-active`,{transition:`transform ${t} ${$}`}),A(`&.${n}-transition-enter-active`,{transition:`transform ${e} ${ee}`}),A(`&.${n}-transition-enter-to`,{transform:`translateY(0)`}),A(`&.${n}-transition-enter-from`,{transform:`translateY(-100%)`}),A(`&.${n}-transition-leave-from`,{transform:`translateY(0)`}),A(`&.${n}-transition-leave-to`,{transform:`translateY(-100%)`})]}var ne=A([N(`drawer`,`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[Q(),Y(),te(),K(),b(`unselectable`,`
 user-select: none; 
 -webkit-user-select: none;
 `),b(`native-scrollbar`,[N(`drawer-content-wrapper`,`
 overflow: auto;
 height: 100%;
 `)]),T(`resize-trigger`,`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[b(`hover`,`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),N(`drawer-content-wrapper`,`
 box-sizing: border-box;
 `),N(`drawer-content`,`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[b(`native-scrollbar`,[N(`drawer-body-content-wrapper`,`
 height: 100%;
 overflow: auto;
 `)]),N(`drawer-body`,`
 flex: 1 0 0;
 overflow: hidden;
 `),N(`drawer-body-content-wrapper`,`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),N(`drawer-header`,`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[T(`main`,`
 flex: 1;
 `),T(`close`,`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),N(`drawer-footer`,`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),b(`right-placement`,`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),b(`left-placement`,`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),b(`top-placement`,`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),b(`bottom-placement`,`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[T(`resize-trigger`,`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),A(`body`,[A(`>`,[N(`drawer-container`,`
 position: fixed;
 `)])]),N(`drawer-container`,`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[A(`> *`,`
 pointer-events: all;
 `)]),N(`drawer-mask`,`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[b(`invisible`,`
 background-color: rgba(0, 0, 0, 0)
 `),E({enterDuration:`0.2s`,leaveDuration:`0.2s`,enterCubicBezier:`var(--n-bezier-in)`,leaveCubicBezier:`var(--n-bezier-out)`})])]),re=p({name:`Drawer`,inheritAttrs:!1,props:Object.assign(Object.assign({},H.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:`right`},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:`if`},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),setup(t){let{mergedClsPrefixRef:r,namespaceRef:s,inlineThemeDisabled:l}=_(t),d=o(),f=H(`Drawer`,`-drawer`,ne,S,t,r),p=j(t.defaultWidth),m=j(t.defaultHeight),h=c(C(t,`width`),p),g=c(C(t,`height`),m),v=a(()=>{let{placement:e}=t;return e===`top`||e===`bottom`?``:P(h.value)}),y=a(()=>{let{placement:e}=t;return e===`left`||e===`right`?``:P(g.value)}),b=e=>{let{onUpdateWidth:n,"onUpdate:width":r}=t;n&&M(n,e),r&&M(r,e),p.value=e},x=e=>{let{onUpdateHeight:n,"onUpdate:width":r}=t;n&&M(n,e),r&&M(r,e),m.value=e},w=a(()=>[{width:v.value,height:y.value},t.drawerStyle||``]);function T(e){let{onMaskClick:n,maskClosable:r}=t;r&&A(!1),n&&n(e)}function E(e){T(e)}let O=e();function k(e){var r;(r=t.onEsc)==null||r.call(t),t.show&&t.closeOnEsc&&n(e)&&(O.value||A(!1))}function A(e){let{onHide:n,onUpdateShow:r,"onUpdate:show":i}=t;r&&M(r,e),i&&M(i,e),n&&!e&&M(n,e)}u(D,{isMountedRef:d,mergedThemeRef:f,mergedClsPrefixRef:r,doUpdateShow:A,doUpdateHeight:x,doUpdateWidth:b});let N=a(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseIn:t,cubicBezierEaseOut:n},self:{color:r,textColor:i,boxShadow:a,lineHeight:o,headerPadding:s,footerPadding:c,borderRadius:l,bodyPadding:u,titleFontSize:d,titleTextColor:p,titleFontWeight:m,headerBorderBottom:h,footerBorderTop:g,closeIconColor:_,closeIconColorHover:v,closeIconColorPressed:y,closeColorHover:b,closeColorPressed:x,closeIconSize:S,closeSize:C,closeBorderRadius:w,resizableTriggerColorHover:T}}=f.value;return{"--n-line-height":o,"--n-color":r,"--n-border-radius":l,"--n-text-color":i,"--n-box-shadow":a,"--n-bezier":e,"--n-bezier-out":n,"--n-bezier-in":t,"--n-header-padding":s,"--n-body-padding":u,"--n-footer-padding":c,"--n-title-text-color":p,"--n-title-font-size":d,"--n-title-font-weight":m,"--n-header-border-bottom":h,"--n-footer-border-top":g,"--n-close-icon-color":_,"--n-close-icon-color-hover":v,"--n-close-icon-color-pressed":y,"--n-close-size":C,"--n-close-color-hover":b,"--n-close-color-pressed":x,"--n-close-icon-size":S,"--n-close-border-radius":w,"--n-resize-trigger-color-hover":T}}),F=l?i(`drawer`,void 0,N,t):void 0;return{mergedClsPrefix:r,namespace:s,mergedBodyStyle:w,handleOutsideClick:E,handleMaskClick:T,handleEsc:k,mergedTheme:f,cssVars:l?void 0:N,themeClass:F==null?void 0:F.themeClass,onRender:F==null?void 0:F.onRender,isMounted:d}},render(){let{mergedClsPrefix:e}=this;return l(k,{to:this.to,show:this.show},{default:()=>{var t;return(t=this.onRender)==null||t.call(this),r(l(`div`,{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:`none`},this.showMask?l(V,{name:`fade-in-transition`,appear:this.isMounted},{default:()=>this.show?l(`div`,{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask===`transparent`&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,l(U,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[I,{zIndex:this.zIndex,enabled:this.show}]])}})}}),ie=p({name:`DrawerContent`,props:{title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},slots:Object,setup(){let e=d(D,null);e||w(`drawer-content`,"`n-drawer-content` must be placed inside `n-drawer`.");let{doUpdateShow:t}=e;function n(){t(!1)}return{handleCloseClick:n,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){let{title:e,mergedClsPrefix:t,nativeScrollbar:n,mergedTheme:r,bodyClass:i,bodyStyle:a,bodyContentClass:o,bodyContentStyle:s,headerClass:c,headerStyle:u,footerClass:d,footerStyle:f,scrollbarProps:p,closable:m,$slots:h}=this;return l(`div`,{role:`none`,class:[`${t}-drawer-content`,n&&`${t}-drawer-content--native-scrollbar`]},h.header||e||m?l(`div`,{class:[`${t}-drawer-header`,c],style:u,role:`none`},l(`div`,{class:`${t}-drawer-header__main`,role:`heading`,"aria-level":`1`},h.header===void 0?e:h.header()),m&&l(x,{onClick:this.handleCloseClick,clsPrefix:t,class:`${t}-drawer-header__close`,absolute:!0})):null,n?l(`div`,{class:[`${t}-drawer-body`,i],style:a,role:`none`},l(`div`,{class:[`${t}-drawer-body-content-wrapper`,o],style:s,role:`none`},h)):l(F,Object.assign({themeOverrides:r.peerOverrides.Scrollbar,theme:r.peers.Scrollbar},p,{class:`${t}-drawer-body`,contentClass:[`${t}-drawer-body-content-wrapper`,o],contentStyle:s}),h),h.footer?l(`div`,{class:[`${t}-drawer-footer`,d],style:f,role:`none`},h.footer()):null)}});export{re as n,ie as t};