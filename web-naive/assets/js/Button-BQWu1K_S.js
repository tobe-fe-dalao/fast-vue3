import{Bt as e,Dr as t,Gn as n,Hr as r,Ir as i,Jr as a,Kt as o,Lr as s,Mn as c,Pr as l,R as u,Sn as d,St as f,U as p,Vt as m,W as h,Wn as g,Yt as _,ar as v,at as y,cn as b,gt as x,ir as S,lt as C,nr as w,or as T,ri as E,rn as D,rr as O,sr as k,st as A,yt as j,zn as M}from"./index-index-Vl7atQja.js";var N=c(`n-form-item`);function P(e,{defaultSize:n=`medium`,mergedSize:i,mergedDisabled:o}={}){let c=s(N,null);a(N,null);let l=t(i?()=>i(c):()=>{let{size:t}=e;if(t)return t;if(c){let{mergedSize:e}=c;if(e.value!==void 0)return e.value}return n}),u=t(o?()=>o(c):()=>{let{disabled:t}=e;return t===void 0?c?c.disabled.value:!1:t}),d=t(()=>{let{status:t}=e;return t||(c==null?void 0:c.mergedValidationStatus.value)});return r(()=>{c&&c.restoreValidation()}),{mergedSizeRef:l,mergedDisabledRef:u,mergedStatusRef:d,nTriggerFormBlur(){c&&c.handleContentBlur()},nTriggerFormChange(){c&&c.handleContentChange()},nTriggerFormFocus(){c&&c.handleContentFocus()},nTriggerFormInput(){c&&c.handleContentInput()}}}var F=d&&`chrome`in window;d&&navigator.userAgent.includes(`Firefox`);var I=d&&navigator.userAgent.includes(`Safari`)&&!F;function L(e){return n(e,[255,255,255,.16])}function R(e){return n(e,[0,0,0,.12])}var z=c(`n-button-group`),B=w([O(`button`,`
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
 `,[v(`color`,[S(`border`,{borderColor:`var(--n-border-color)`}),v(`disabled`,[S(`border`,{borderColor:`var(--n-border-color-disabled)`})]),T(`disabled`,[w(`&:focus`,[S(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),w(`&:hover`,[S(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),w(`&:active`,[S(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),v(`pressed`,[S(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),v(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[S(`border`,{border:`var(--n-border-disabled)`})]),T(`disabled`,[w(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[S(`state-border`,{border:`var(--n-border-focus)`})]),w(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[S(`state-border`,{border:`var(--n-border-hover)`})]),w(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[S(`state-border`,{border:`var(--n-border-pressed)`})]),v(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[S(`state-border`,{border:`var(--n-border-pressed)`})])]),v(`loading`,`cursor: wait;`),O(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[v(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),d&&`MozBoxSizing`in document.createElement(`div`).style?w(`&::moz-focus-inner`,{border:0}):null,S(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),S(`border`,`
 border: var(--n-border);
 `),S(`state-border`,`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),S(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[O(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[C({top:`50%`,originalTransform:`translateY(-50%)`})]),h()]),S(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[w(`~`,[S(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),v(`block`,`
 display: flex;
 width: 100%;
 `),v(`dashed`,[S(`border, state-border`,{borderStyle:`dashed !important`})]),v(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),w(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),w(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),V=l({name:`Button`,props:Object.assign(Object.assign({},j.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!I},spinProps:Object}),slots:Object,setup(n){let r=E(null),i=E(null),a=E(!1),o=M(()=>!n.quaternary&&!n.tertiary&&!n.secondary&&!n.text&&(!n.color||n.ghost||n.dashed)&&n.bordered),c=s(z,{}),{inlineThemeDisabled:l,mergedClsPrefixRef:d,mergedRtlRef:p,mergedComponentPropsRef:h}=m(n),{mergedSizeRef:_}=P({},{defaultSize:`medium`,mergedSize:e=>{var t,r;let{size:i}=n;if(i)return i;let{size:a}=c;if(a)return a;let{mergedSize:o}=e||{};return o?o.value:((r=(t=h==null?void 0:h.value)==null?void 0:t.Button)==null?void 0:r.size)||`medium`}}),v=t(()=>n.focusable&&!n.disabled),y=e=>{var t;v.value||e.preventDefault(),!n.nativeFocusBehavior&&(e.preventDefault(),!n.disabled&&v.value&&((t=r.value)==null||t.focus({preventScroll:!0})))},x=e=>{var t;if(!n.disabled&&!n.loading){let{onClick:r}=n;r&&D(r,e),n.text||(t=i.value)==null||t.play()}},S=e=>{switch(e.key){case`Enter`:if(!n.keyboard)return;a.value=!1}},C=e=>{switch(e.key){case`Enter`:if(!n.keyboard||n.loading){e.preventDefault();return}a.value=!0}},w=()=>{a.value=!1},T=j(`Button`,`-button`,B,u,n,d),O=f(`Button`,p,d),A=t(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseOut:t},self:r}=T.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=_.value,{dashed:l,type:u,ghost:d,text:f,color:p,round:m,circle:h,textColor:v,secondary:y,tertiary:b,quaternary:x,strong:S}=n,C={"--n-font-weight":S?s:o},w={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},E=u===`tertiary`,D=u===`default`,O=E?`default`:u;if(f){let e=v||p;w={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[k(`textColorText`,O)],"--n-text-color-hover":e?L(e):r[k(`textColorTextHover`,O)],"--n-text-color-pressed":e?R(e):r[k(`textColorTextPressed`,O)],"--n-text-color-focus":e?L(e):r[k(`textColorTextHover`,O)],"--n-text-color-disabled":e||r[k(`textColorTextDisabled`,O)]}}else if(d||l){let e=v||p;w={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":p||r[k(`rippleColor`,O)],"--n-text-color":e||r[k(`textColorGhost`,O)],"--n-text-color-hover":e?L(e):r[k(`textColorGhostHover`,O)],"--n-text-color-pressed":e?R(e):r[k(`textColorGhostPressed`,O)],"--n-text-color-focus":e?L(e):r[k(`textColorGhostHover`,O)],"--n-text-color-disabled":e||r[k(`textColorGhostDisabled`,O)]}}else if(y){let e=D?r.textColor:E?r.textColorTertiary:r[k(`color`,O)],t=p||e,n=u!==`default`&&u!==`tertiary`;w={"--n-color":n?g(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?g(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?g(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?g(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(b||x){let e=D?r.textColor:E?r.textColorTertiary:r[k(`color`,O)],t=p||e;b?(w[`--n-color`]=r.colorTertiary,w[`--n-color-hover`]=r.colorTertiaryHover,w[`--n-color-pressed`]=r.colorTertiaryPressed,w[`--n-color-focus`]=r.colorSecondaryHover,w[`--n-color-disabled`]=r.colorTertiary):(w[`--n-color`]=r.colorQuaternary,w[`--n-color-hover`]=r.colorQuaternaryHover,w[`--n-color-pressed`]=r.colorQuaternaryPressed,w[`--n-color-focus`]=r.colorQuaternaryHover,w[`--n-color-disabled`]=r.colorQuaternary),w[`--n-ripple-color`]=`#0000`,w[`--n-text-color`]=t,w[`--n-text-color-hover`]=t,w[`--n-text-color-pressed`]=t,w[`--n-text-color-focus`]=t,w[`--n-text-color-disabled`]=t}else w={"--n-color":p||r[k(`color`,O)],"--n-color-hover":p?L(p):r[k(`colorHover`,O)],"--n-color-pressed":p?R(p):r[k(`colorPressed`,O)],"--n-color-focus":p?L(p):r[k(`colorFocus`,O)],"--n-color-disabled":p||r[k(`colorDisabled`,O)],"--n-ripple-color":p||r[k(`rippleColor`,O)],"--n-text-color":v||(p?r.textColorPrimary:E?r.textColorTertiary:r[k(`textColor`,O)]),"--n-text-color-hover":v||(p?r.textColorHoverPrimary:r[k(`textColorHover`,O)]),"--n-text-color-pressed":v||(p?r.textColorPressedPrimary:r[k(`textColorPressed`,O)]),"--n-text-color-focus":v||(p?r.textColorFocusPrimary:r[k(`textColorFocus`,O)]),"--n-text-color-disabled":v||(p?r.textColorDisabledPrimary:r[k(`textColorDisabled`,O)])};let A={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};A=f?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[k(`border`,O)],"--n-border-hover":r[k(`borderHover`,O)],"--n-border-pressed":r[k(`borderPressed`,O)],"--n-border-focus":r[k(`borderFocus`,O)],"--n-border-disabled":r[k(`borderDisabled`,O)]};let{[k(`height`,c)]:j,[k(`fontSize`,c)]:M,[k(`padding`,c)]:N,[k(`paddingRound`,c)]:P,[k(`iconSize`,c)]:F,[k(`borderRadius`,c)]:I,[k(`iconMargin`,c)]:z,waveOpacity:B}=r,V={"--n-width":h&&!f?j:`initial`,"--n-height":f?`initial`:j,"--n-font-size":M,"--n-padding":h||f?`initial`:m?P:N,"--n-icon-size":F,"--n-icon-margin":z,"--n-border-radius":f?`initial`:h||m?j:I};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":e,"--n-bezier-ease-out":t,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":B},C),w),A),V)}),N=l?e(`button`,t(()=>{let e=``,{dashed:t,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:f,strong:p}=n;t&&(e+=`a`),i&&(e+=`b`),a&&(e+=`c`),s&&(e+=`d`),c&&(e+=`e`),u&&(e+=`f`),d&&(e+=`g`),f&&(e+=`h`),p&&(e+=`i`),o&&(e+=`j${b(o)}`),l&&(e+=`k${b(l)}`);let{value:m}=_;return e+=`l${m[0]}`,e+=`m${r[0]}`,e}),A,n):void 0;return{selfElRef:r,waveElRef:i,mergedClsPrefix:d,mergedFocusable:v,mergedSize:_,showBorder:o,enterPressed:a,rtlEnabled:O,handleMousedown:y,handleKeydown:C,handleBlur:w,handleKeyup:S,handleClick:x,customColorCssVars:t(()=>{let{color:e}=n;if(!e)return null;let t=L(e);return{"--n-border-color":e,"--n-border-color-hover":t,"--n-border-color-pressed":R(e),"--n-border-color-focus":t,"--n-border-color-disabled":e}}),cssVars:l?void 0:A,themeClass:N==null?void 0:N.themeClass,onRender:N==null?void 0:N.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n==null||n();let r=_(this.$slots.default,t=>t&&i(`span`,{class:`${e}-button__content`},t));return i(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,i(A,{width:!0},{default:()=>_(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&i(`span`,{class:`${e}-button__icon`,style:{margin:o(this.$slots.default)?`0`:``}},i(x,null,{default:()=>this.loading?i(y,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):i(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:i(p,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?i(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?i(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),H=V;export{P as a,N as i,H as n,I as r,V as t};