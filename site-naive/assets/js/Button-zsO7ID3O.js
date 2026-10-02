import{i as e,r as t,t as n}from"./browser-CZMe5eFA.js";import{$ as r,Bt as i,Dt as a,Ft as o,Ht as s,Lt as c,Rt as l,Sn as u,_n as d,an as f,at as p,b as m,bn as h,c as g,d as _,dn as v,et as y,f as b,fn as x,ft as S,gn as C,gt as w,h as T,in as E,l as D,lt as O,mt as k,nt as A,v as j,x as M,xn as N,y as P,yn as F}from"./index-index-CZYP7cqP.js";var{cubicBezierEaseInOut:I}=m;function L({duration:e=`.2s`,delay:t=`.1s`}={}){return[C(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),C(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),C(`&.fade-in-width-expand-transition-leave-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${I},
 max-width ${e} ${I} ${t},
 margin-left ${e} ${I} ${t},
 margin-right ${e} ${I} ${t};
 `),C(`&.fade-in-width-expand-transition-enter-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${I} ${t},
 max-width ${e} ${I},
 margin-left ${e} ${I},
 margin-right ${e} ${I};
 `)]}var R=d(`base-wave`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),z=o({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){P(`-base-wave`,R,f(e,`clsPrefix`));let t=E(null),n=E(!1),r=null;return s(()=>{r!==null&&window.clearTimeout(r)}),{active:n,selfRef:t,play(){r!==null&&(window.clearTimeout(r),n.value=!1,r=null),i(()=>{var e;(e=t.value)==null||e.offsetHeight,n.value=!0,r=window.setTimeout(()=>{n.value=!1,r=null},1e3)})}}},render(){let{clsPrefix:e}=this;return c(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}});function B(e){return x(e,[255,255,255,.16])}function V(e){return x(e,[0,0,0,.12])}var H=k(`n-button-group`),U={paddingTiny:`0 6px`,paddingSmall:`0 10px`,paddingMedium:`0 14px`,paddingLarge:`0 18px`,paddingRoundTiny:`0 10px`,paddingRoundSmall:`0 14px`,paddingRoundMedium:`0 18px`,paddingRoundLarge:`0 22px`,iconMarginTiny:`6px`,iconMarginSmall:`6px`,iconMarginMedium:`6px`,iconMarginLarge:`6px`,iconSizeTiny:`14px`,iconSizeSmall:`18px`,iconSizeMedium:`18px`,iconSizeLarge:`20px`,rippleDuration:`.6s`};function W(e){let{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadius:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,textColor2:d,textColor3:f,primaryColorHover:p,primaryColorPressed:m,borderColor:h,primaryColor:g,baseColor:_,infoColor:v,infoColorHover:y,infoColorPressed:b,successColor:x,successColorHover:S,successColorPressed:C,warningColor:w,warningColorHover:T,warningColorPressed:E,errorColor:D,errorColorHover:O,errorColorPressed:k,fontWeight:A,buttonColor2:j,buttonColor2Hover:M,buttonColor2Pressed:N,fontWeightStrong:P}=e;return Object.assign(Object.assign({},U),{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadiusTiny:a,borderRadiusSmall:a,borderRadiusMedium:a,borderRadiusLarge:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,colorOpacitySecondary:`0.16`,colorOpacitySecondaryHover:`0.22`,colorOpacitySecondaryPressed:`0.28`,colorSecondary:j,colorSecondaryHover:M,colorSecondaryPressed:N,colorTertiary:j,colorTertiaryHover:M,colorTertiaryPressed:N,colorQuaternary:`#0000`,colorQuaternaryHover:M,colorQuaternaryPressed:N,color:`#0000`,colorHover:`#0000`,colorPressed:`#0000`,colorFocus:`#0000`,colorDisabled:`#0000`,textColor:d,textColorTertiary:f,textColorHover:p,textColorPressed:m,textColorFocus:p,textColorDisabled:d,textColorText:d,textColorTextHover:p,textColorTextPressed:m,textColorTextFocus:p,textColorTextDisabled:d,textColorGhost:d,textColorGhostHover:p,textColorGhostPressed:m,textColorGhostFocus:p,textColorGhostDisabled:d,border:`1px solid ${h}`,borderHover:`1px solid ${p}`,borderPressed:`1px solid ${m}`,borderFocus:`1px solid ${p}`,borderDisabled:`1px solid ${h}`,rippleColor:g,colorPrimary:g,colorHoverPrimary:p,colorPressedPrimary:m,colorFocusPrimary:p,colorDisabledPrimary:g,textColorPrimary:_,textColorHoverPrimary:_,textColorPressedPrimary:_,textColorFocusPrimary:_,textColorDisabledPrimary:_,textColorTextPrimary:g,textColorTextHoverPrimary:p,textColorTextPressedPrimary:m,textColorTextFocusPrimary:p,textColorTextDisabledPrimary:d,textColorGhostPrimary:g,textColorGhostHoverPrimary:p,textColorGhostPressedPrimary:m,textColorGhostFocusPrimary:p,textColorGhostDisabledPrimary:g,borderPrimary:`1px solid ${g}`,borderHoverPrimary:`1px solid ${p}`,borderPressedPrimary:`1px solid ${m}`,borderFocusPrimary:`1px solid ${p}`,borderDisabledPrimary:`1px solid ${g}`,rippleColorPrimary:g,colorInfo:v,colorHoverInfo:y,colorPressedInfo:b,colorFocusInfo:y,colorDisabledInfo:v,textColorInfo:_,textColorHoverInfo:_,textColorPressedInfo:_,textColorFocusInfo:_,textColorDisabledInfo:_,textColorTextInfo:v,textColorTextHoverInfo:y,textColorTextPressedInfo:b,textColorTextFocusInfo:y,textColorTextDisabledInfo:d,textColorGhostInfo:v,textColorGhostHoverInfo:y,textColorGhostPressedInfo:b,textColorGhostFocusInfo:y,textColorGhostDisabledInfo:v,borderInfo:`1px solid ${v}`,borderHoverInfo:`1px solid ${y}`,borderPressedInfo:`1px solid ${b}`,borderFocusInfo:`1px solid ${y}`,borderDisabledInfo:`1px solid ${v}`,rippleColorInfo:v,colorSuccess:x,colorHoverSuccess:S,colorPressedSuccess:C,colorFocusSuccess:S,colorDisabledSuccess:x,textColorSuccess:_,textColorHoverSuccess:_,textColorPressedSuccess:_,textColorFocusSuccess:_,textColorDisabledSuccess:_,textColorTextSuccess:x,textColorTextHoverSuccess:S,textColorTextPressedSuccess:C,textColorTextFocusSuccess:S,textColorTextDisabledSuccess:d,textColorGhostSuccess:x,textColorGhostHoverSuccess:S,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:S,textColorGhostDisabledSuccess:x,borderSuccess:`1px solid ${x}`,borderHoverSuccess:`1px solid ${S}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${S}`,borderDisabledSuccess:`1px solid ${x}`,rippleColorSuccess:x,colorWarning:w,colorHoverWarning:T,colorPressedWarning:E,colorFocusWarning:T,colorDisabledWarning:w,textColorWarning:_,textColorHoverWarning:_,textColorPressedWarning:_,textColorFocusWarning:_,textColorDisabledWarning:_,textColorTextWarning:w,textColorTextHoverWarning:T,textColorTextPressedWarning:E,textColorTextFocusWarning:T,textColorTextDisabledWarning:d,textColorGhostWarning:w,textColorGhostHoverWarning:T,textColorGhostPressedWarning:E,textColorGhostFocusWarning:T,textColorGhostDisabledWarning:w,borderWarning:`1px solid ${w}`,borderHoverWarning:`1px solid ${T}`,borderPressedWarning:`1px solid ${E}`,borderFocusWarning:`1px solid ${T}`,borderDisabledWarning:`1px solid ${w}`,rippleColorWarning:w,colorError:D,colorHoverError:O,colorPressedError:k,colorFocusError:O,colorDisabledError:D,textColorError:_,textColorHoverError:_,textColorPressedError:_,textColorFocusError:_,textColorDisabledError:_,textColorTextError:D,textColorTextHoverError:O,textColorTextPressedError:k,textColorTextFocusError:O,textColorTextDisabledError:d,textColorGhostError:D,textColorGhostHoverError:O,textColorGhostPressedError:k,textColorGhostFocusError:O,textColorGhostDisabledError:D,borderError:`1px solid ${D}`,borderHoverError:`1px solid ${O}`,borderPressedError:`1px solid ${k}`,borderFocusError:`1px solid ${O}`,borderDisabledError:`1px solid ${D}`,rippleColorError:D,waveOpacity:`0.6`,fontWeight:A,fontWeightStrong:P})}var G={name:`Button`,common:g,self:W},K=C([d(`button`,`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[h(`color`,[F(`border`,{borderColor:`var(--n-border-color)`}),h(`disabled`,[F(`border`,{borderColor:`var(--n-border-color-disabled)`})]),N(`disabled`,[C(`&:focus`,[F(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),C(`&:hover`,[F(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),C(`&:active`,[F(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),h(`pressed`,[F(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),h(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[F(`border`,{border:`var(--n-border-disabled)`})]),N(`disabled`,[C(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[F(`state-border`,{border:`var(--n-border-focus)`})]),C(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[F(`state-border`,{border:`var(--n-border-hover)`})]),C(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[F(`state-border`,{border:`var(--n-border-pressed)`})]),h(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[F(`state-border`,{border:`var(--n-border-pressed)`})])]),h(`loading`,`cursor: wait;`),d(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[h(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),e&&`MozBoxSizing`in document.createElement(`div`).style?C(`&::moz-focus-inner`,{border:0}):null,F(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),F(`border`,`
 border: var(--n-border);
 `),F(`state-border`,`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),F(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[d(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[b({top:`50%`,originalTransform:`translateY(-50%)`})]),L()]),F(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[C(`~`,[F(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),h(`block`,`
 display: flex;
 width: 100%;
 `),h(`dashed`,[F(`border, state-border`,{borderStyle:`dashed !important`})]),h(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),C(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),C(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),q=o({name:`Button`,props:Object.assign(Object.assign({},j.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!n},spinProps:Object}),slots:Object,setup(e){let n=E(null),i=E(null),o=E(!1),s=w(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),c=l(H,{}),{inlineThemeDisabled:d,mergedClsPrefixRef:f,mergedRtlRef:p,mergedComponentPropsRef:m}=y(e),{mergedSizeRef:h}=t({},{defaultSize:`medium`,mergedSize:t=>{var n,r;let{size:i}=e;if(i)return i;let{size:a}=c;if(a)return a;let{mergedSize:o}=t||{};return o?o.value:((r=(n=m==null?void 0:m.value)==null?void 0:n.Button)==null?void 0:r.size)||`medium`}}),g=a(()=>e.focusable&&!e.disabled),_=t=>{var r;g.value||t.preventDefault(),!e.nativeFocusBehavior&&(t.preventDefault(),!e.disabled&&g.value&&((r=n.value)==null||r.focus({preventScroll:!0})))},b=t=>{var n;if(!e.disabled&&!e.loading){let{onClick:r}=e;r&&O(r,t),e.text||(n=i.value)==null||n.play()}},x=t=>{switch(t.key){case`Enter`:if(!e.keyboard)return;o.value=!1}},C=t=>{switch(t.key){case`Enter`:if(!e.keyboard||e.loading){t.preventDefault();return}o.value=!0}},T=()=>{o.value=!1},D=j(`Button`,`-button`,K,G,e,f),k=M(`Button`,p,f),A=a(()=>{let{common:{cubicBezierEaseInOut:t,cubicBezierEaseOut:n},self:r}=D.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=h.value,{dashed:l,type:d,ghost:f,text:p,color:m,round:g,circle:_,textColor:y,secondary:b,tertiary:x,quaternary:S,strong:C}=e,w={"--n-font-weight":C?s:o},T={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},E=d===`tertiary`,O=d===`default`,k=E?`default`:d;if(p){let e=y||m;T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[u(`textColorText`,k)],"--n-text-color-hover":e?B(e):r[u(`textColorTextHover`,k)],"--n-text-color-pressed":e?V(e):r[u(`textColorTextPressed`,k)],"--n-text-color-focus":e?B(e):r[u(`textColorTextHover`,k)],"--n-text-color-disabled":e||r[u(`textColorTextDisabled`,k)]}}else if(f||l){let e=y||m;T={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":m||r[u(`rippleColor`,k)],"--n-text-color":e||r[u(`textColorGhost`,k)],"--n-text-color-hover":e?B(e):r[u(`textColorGhostHover`,k)],"--n-text-color-pressed":e?V(e):r[u(`textColorGhostPressed`,k)],"--n-text-color-focus":e?B(e):r[u(`textColorGhostHover`,k)],"--n-text-color-disabled":e||r[u(`textColorGhostDisabled`,k)]}}else if(b){let e=O?r.textColor:E?r.textColorTertiary:r[u(`color`,k)],t=m||e,n=d!==`default`&&d!==`tertiary`;T={"--n-color":n?v(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?v(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?v(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?v(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(x||S){let e=O?r.textColor:E?r.textColorTertiary:r[u(`color`,k)],t=m||e;x?(T[`--n-color`]=r.colorTertiary,T[`--n-color-hover`]=r.colorTertiaryHover,T[`--n-color-pressed`]=r.colorTertiaryPressed,T[`--n-color-focus`]=r.colorSecondaryHover,T[`--n-color-disabled`]=r.colorTertiary):(T[`--n-color`]=r.colorQuaternary,T[`--n-color-hover`]=r.colorQuaternaryHover,T[`--n-color-pressed`]=r.colorQuaternaryPressed,T[`--n-color-focus`]=r.colorQuaternaryHover,T[`--n-color-disabled`]=r.colorQuaternary),T[`--n-ripple-color`]=`#0000`,T[`--n-text-color`]=t,T[`--n-text-color-hover`]=t,T[`--n-text-color-pressed`]=t,T[`--n-text-color-focus`]=t,T[`--n-text-color-disabled`]=t}else T={"--n-color":m||r[u(`color`,k)],"--n-color-hover":m?B(m):r[u(`colorHover`,k)],"--n-color-pressed":m?V(m):r[u(`colorPressed`,k)],"--n-color-focus":m?B(m):r[u(`colorFocus`,k)],"--n-color-disabled":m||r[u(`colorDisabled`,k)],"--n-ripple-color":m||r[u(`rippleColor`,k)],"--n-text-color":y||(m?r.textColorPrimary:E?r.textColorTertiary:r[u(`textColor`,k)]),"--n-text-color-hover":y||(m?r.textColorHoverPrimary:r[u(`textColorHover`,k)]),"--n-text-color-pressed":y||(m?r.textColorPressedPrimary:r[u(`textColorPressed`,k)]),"--n-text-color-focus":y||(m?r.textColorFocusPrimary:r[u(`textColorFocus`,k)]),"--n-text-color-disabled":y||(m?r.textColorDisabledPrimary:r[u(`textColorDisabled`,k)])};let A={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};A=p?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[u(`border`,k)],"--n-border-hover":r[u(`borderHover`,k)],"--n-border-pressed":r[u(`borderPressed`,k)],"--n-border-focus":r[u(`borderFocus`,k)],"--n-border-disabled":r[u(`borderDisabled`,k)]};let{[u(`height`,c)]:j,[u(`fontSize`,c)]:M,[u(`padding`,c)]:N,[u(`paddingRound`,c)]:P,[u(`iconSize`,c)]:F,[u(`borderRadius`,c)]:I,[u(`iconMargin`,c)]:L,waveOpacity:R}=r,z={"--n-width":_&&!p?j:`initial`,"--n-height":p?`initial`:j,"--n-font-size":M,"--n-padding":_||p?`initial`:g?P:N,"--n-icon-size":F,"--n-icon-margin":L,"--n-border-radius":p?`initial`:_||g?j:I};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":t,"--n-bezier-ease-out":n,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":R},w),T),A),z)}),N=d?r(`button`,a(()=>{let t=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:f,strong:p}=e;n&&(t+=`a`),i&&(t+=`b`),a&&(t+=`c`),s&&(t+=`d`),c&&(t+=`e`),u&&(t+=`f`),d&&(t+=`g`),f&&(t+=`h`),p&&(t+=`i`),o&&(t+=`j${S(o)}`),l&&(t+=`k${S(l)}`);let{value:m}=h;return t+=`l${m[0]}`,t+=`m${r[0]}`,t}),A,e):void 0;return{selfElRef:n,waveElRef:i,mergedClsPrefix:f,mergedFocusable:g,mergedSize:h,showBorder:s,enterPressed:o,rtlEnabled:k,handleMousedown:_,handleKeydown:C,handleBlur:T,handleKeyup:x,handleClick:b,customColorCssVars:a(()=>{let{color:t}=e;if(!t)return null;let n=B(t);return{"--n-border-color":t,"--n-border-color-hover":n,"--n-border-color-pressed":V(t),"--n-border-color-focus":n,"--n-border-color-disabled":t}}),cssVars:d?void 0:A,themeClass:N==null?void 0:N.themeClass,onRender:N==null?void 0:N.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n==null||n();let r=p(this.$slots.default,t=>t&&c(`span`,{class:`${e}-button__content`},t));return c(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,c(_,{width:!0},{default:()=>p(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&c(`span`,{class:`${e}-button__icon`,style:{margin:A(this.$slots.default)?`0`:``}},c(T,null,{default:()=>this.loading?c(D,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):c(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:c(z,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?c(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?c(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}});export{q as t};