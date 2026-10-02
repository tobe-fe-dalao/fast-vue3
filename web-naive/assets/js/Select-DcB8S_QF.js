import{n as e,t}from"./Empty-Dznmj7D8.js";import{a as n,n as r}from"./Input-DHA4gaU6.js";import{a as i}from"./Button-BQWu1K_S.js";import{t as a}from"./use-locale-DoTEKlEi.js";import{$n as o,$r as s,An as c,Bt as l,Cn as u,Dr as d,Fn as f,G as p,Gr as m,Hr as h,In as g,Ir as _,Jr as v,K as y,Lr as b,N as x,Pn as S,Pr as C,Q as ee,Qn as w,St as T,Vt as te,Wt as E,X as ne,Xr as D,Xt as O,Y as k,Yn as A,Yt as j,Zr as M,_t as N,ar as P,at as F,bn as re,et as ie,fn as I,ii as L,ir as R,jn as z,nr as B,on as V,or as H,pn as U,q as ae,qn as W,qt as G,ri as K,rn as q,rr as J,sr as Y,tt as X,un as oe,wr as se,xn as ce,xr as le,yn as ue,yr as Z,yt as de,zn as Q,zr as fe}from"./index-index-Vl7atQja.js";function pe(e,t){t&&(m(()=>{let{value:n}=e;n&&I.registerHandler(n,t)}),D(e,(e,t)=>{t&&I.unregisterHandler(t)},{deep:!1}),h(()=>{let{value:t}=e;t&&I.unregisterHandler(t)}))}function $(e){let t=e.filter(e=>e!==void 0);if(t.length!==0)return t.length===1?t[0]:t=>{e.forEach(e=>{e&&e(t)})}}var me=C({name:`Checkmark`,render(){return _(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 16 16`},_(`g`,{fill:`none`},_(`path`,{d:`M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z`,fill:`currentColor`})))}}),he=C({props:{onFocus:Function,onBlur:Function},setup(e){return()=>_(`div`,{style:`width: 0; height: 0`,tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),ge=C({name:`NBaseSelectGroupHeader`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){let{renderLabelRef:e,renderOptionRef:t,labelFieldRef:n,nodePropsRef:r}=b(z);return{labelField:n,nodeProps:r,renderLabel:e,renderOption:t}},render(){let{clsPrefix:e,renderLabel:t,renderOption:n,nodeProps:r,tmNode:{rawNode:i}}=this,a=r==null?void 0:r(i),o=t?t(i,!1):O(i[this.labelField],i,!1),s=_(`div`,Object.assign({},a,{class:[`${e}-base-select-group-header`,a==null?void 0:a.class]}),o);return i.render?i.render({node:s,option:i}):n?n({node:s,option:i,selected:!1}):s}});function _e(e,t){return _(Z,{name:`fade-in-scale-up-transition`},{default:()=>e?_(N,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>_(me)}):null})}var ve=C({name:`NBaseSelectOption`,props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){let{valueRef:t,pendingTmNodeRef:n,multipleRef:r,valueSetRef:i,renderLabelRef:a,renderOptionRef:o,labelFieldRef:s,valueFieldRef:c,showCheckmarkRef:l,nodePropsRef:u,handleOptionClick:d,handleOptionMouseEnter:f}=b(z),p=Q(()=>{let{value:t}=n;return t?e.tmNode.key===t.key:!1});function m(t){let{tmNode:n}=e;n.disabled||d(t,n)}function h(t){let{tmNode:n}=e;n.disabled||f(t,n)}function g(t){let{tmNode:n}=e,{value:r}=p;n.disabled||r||f(t,n)}return{multiple:r,isGrouped:Q(()=>{let{tmNode:t}=e,{parent:n}=t;return n&&n.rawNode.type===`group`}),showCheckmark:l,nodeProps:u,isPending:p,isSelected:Q(()=>{let{value:n}=t,{value:a}=r;if(n===null)return!1;let o=e.tmNode.rawNode[c.value];if(a){let{value:e}=i;return e.has(o)}else return n===o}),labelField:s,renderLabel:a,renderOption:o,handleMouseMove:g,handleMouseEnter:h,handleClick:m}},render(){let{clsPrefix:e,tmNode:{rawNode:t},isSelected:n,isPending:r,isGrouped:i,showCheckmark:a,nodeProps:o,renderOption:s,renderLabel:c,handleClick:l,handleMouseEnter:u,handleMouseMove:d}=this,f=_e(n,e),p=c?[c(t,n),a&&f]:[O(t[this.labelField],t,n),a&&f],m=o==null?void 0:o(t),h=_(`div`,Object.assign({},m,{class:[`${e}-base-select-option`,t.class,m==null?void 0:m.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:i,[`${e}-base-select-option--pending`]:r,[`${e}-base-select-option--show-checkmark`]:a}],style:[(m==null?void 0:m.style)||``,t.style||``],onClick:$([l,m==null?void 0:m.onClick]),onMouseenter:$([u,m==null?void 0:m.onMouseenter]),onMousemove:$([d,m==null?void 0:m.onMousemove])}),_(`div`,{class:`${e}-base-select-option__content`},p));return t.render?t.render({node:h,option:t,selected:n}):s?s({node:h,option:t,selected:n}):h}}),ye=J(`base-select-menu`,`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[J(`scrollbar`,`
 max-height: var(--n-height);
 `),J(`virtual-list`,`
 max-height: var(--n-height);
 `),J(`base-select-option`,`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[R(`content`,`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),J(`base-select-group-header`,`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),J(`base-select-menu-option-wrapper`,`
 position: relative;
 width: 100%;
 `),R(`loading, empty`,`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),R(`loading`,`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),R(`header`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),R(`action`,`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),J(`base-select-group-header`,`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),J(`base-select-option`,`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[P(`show-checkmark`,`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),B(`&::before`,`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),B(`&:active`,`
 color: var(--n-option-text-color-pressed);
 `),P(`grouped`,`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),P(`pending`,[B(`&::before`,`
 background-color: var(--n-option-color-pending);
 `)]),P(`selected`,`
 color: var(--n-option-text-color-active);
 `,[B(`&::before`,`
 background-color: var(--n-option-color-active);
 `),P(`pending`,[B(`&::before`,`
 background-color: var(--n-option-color-active-pending);
 `)])]),P(`disabled`,`
 cursor: not-allowed;
 `,[H(`selected`,`
 color: var(--n-option-text-color-disabled);
 `),P(`selected`,`
 opacity: var(--n-option-opacity-disabled);
 `)]),R(`check`,`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[k({enterScale:`0.5`})])])]),be=C({name:`InternalSelectMenu`,props:Object.assign(Object.assign({},de.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:`medium`},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n,mergedComponentPropsRef:r}=te(e),i=T(`InternalSelectMenu`,n,t),a=de(`InternalSelectMenu`,`-internal-select-menu`,ye,ne,e,L(e,`clsPrefix`)),s=K(null),u=K(null),f=K(null),p=d(()=>e.treeMate.getFlattenedNodes()),g=d(()=>ie(p.value)),_=K(null);function y(){let{treeMate:t}=e,n=null,{value:r}=e;r===null?n=t.getFirstAvailableNode():(n=e.multiple?t.getNode((r||[])[(r||[]).length-1]):t.getNode(r),(!n||n.disabled)&&(n=t.getFirstAvailableNode())),H(n||null)}function b(){let{value:t}=_;t&&!e.treeMate.getNode(t.key)&&(_.value=null)}let x;D(()=>e.show,t=>{t?x=D(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?y():b(),fe(U)):b()},{immediate:!0}):x==null||x()},{immediate:!0}),h(()=>{x==null||x()});let S=d(()=>W(a.value.self[Y(`optionHeight`,e.size)])),C=d(()=>A(a.value.self[Y(`padding`,e.size)])),ee=d(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),w=d(()=>{let e=p.value;return e&&e.length===0}),E=d(()=>{var e,t;return(t=(e=r==null?void 0:r.value)==null?void 0:e.Select)==null?void 0:t.renderEmpty});function O(t){let{onToggle:n}=e;n&&n(t)}function k(t){let{onScroll:n}=e;n&&n(t)}function j(e){var t;(t=f.value)==null||t.sync(),k(e)}function M(){var e;(e=f.value)==null||e.sync()}function N(){let{value:e}=_;return e||null}function P(e,t){t.disabled||H(t,!1)}function F(e,t){t.disabled||O(t)}function re(t){var n;o(t,`action`)||(n=e.onKeyup)==null||n.call(e,t)}function I(t){var n;o(t,`action`)||(n=e.onKeydown)==null||n.call(e,t)}function R(t){var n;(n=e.onMousedown)==null||n.call(e,t),!e.focusable&&t.preventDefault()}function B(){let{value:e}=_;e&&H(e.getNext({loop:!0}),!0)}function V(){let{value:e}=_;e&&H(e.getPrev({loop:!0}),!0)}function H(e,t=!1){_.value=e,t&&U()}function U(){var t,n;let r=_.value;if(!r)return;let i=g.value(r.key);i!==null&&(e.virtualScroll?(t=u.value)==null||t.scrollTo({index:i}):(n=f.value)==null||n.scrollTo({index:i,elSize:S.value}))}function ae(t){var n,r;(n=s.value)!=null&&n.contains(t.target)&&((r=e.onFocus)==null||r.call(e,t))}function G(t){var n,r;(n=s.value)!=null&&n.contains(t.relatedTarget)||(r=e.onBlur)==null||r.call(e,t)}v(z,{handleOptionMouseEnter:P,handleOptionClick:F,valueSetRef:ee,pendingTmNodeRef:_,nodePropsRef:L(e,`nodeProps`),showCheckmarkRef:L(e,`showCheckmark`),multipleRef:L(e,`multiple`),valueRef:L(e,`value`),renderLabelRef:L(e,`renderLabel`),renderOptionRef:L(e,`renderOption`),labelFieldRef:L(e,`labelField`),valueFieldRef:L(e,`valueField`)}),v(c,s),m(()=>{let{value:e}=f;e&&e.sync()});let q=d(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{height:r,borderRadius:i,color:o,groupHeaderTextColor:s,actionDividerColor:c,optionTextColorPressed:l,optionTextColor:u,optionTextColorDisabled:d,optionTextColorActive:f,optionOpacityDisabled:p,optionCheckColor:m,actionTextColor:h,optionColorPending:g,optionColorActive:_,loadingColor:v,loadingSize:y,optionColorActivePending:b,[Y(`optionFontSize`,t)]:x,[Y(`optionHeight`,t)]:S,[Y(`optionPadding`,t)]:C}}=a.value;return{"--n-height":r,"--n-action-divider-color":c,"--n-action-text-color":h,"--n-bezier":n,"--n-border-radius":i,"--n-color":o,"--n-option-font-size":x,"--n-group-header-text-color":s,"--n-option-check-color":m,"--n-option-color-pending":g,"--n-option-color-active":_,"--n-option-color-active-pending":b,"--n-option-height":S,"--n-option-opacity-disabled":p,"--n-option-text-color":u,"--n-option-text-color-active":f,"--n-option-text-color-disabled":d,"--n-option-text-color-pressed":l,"--n-option-padding":C,"--n-option-padding-left":A(C,`left`),"--n-option-padding-right":A(C,`right`),"--n-loading-color":v,"--n-loading-size":y}}),{inlineThemeDisabled:J}=e,X=J?l(`internal-select-menu`,d(()=>e.size[0]),q,e):void 0,oe={selfRef:s,next:B,prev:V,getPendingTmNode:N};return pe(s,e.onResize),Object.assign({mergedTheme:a,mergedClsPrefix:t,rtlEnabled:i,virtualListRef:u,scrollbarRef:f,itemSize:S,padding:C,flattenedNodes:p,empty:w,mergedRenderEmpty:E,virtualListContainer(){let{value:e}=u;return e==null?void 0:e.listElRef},virtualListContent(){let{value:e}=u;return e==null?void 0:e.itemsElRef},doScroll:k,handleFocusin:ae,handleFocusout:G,handleKeyUp:re,handleKeyDown:I,handleMouseDown:R,handleVirtualListResize:M,handleVirtualListScroll:j,cssVars:J?void 0:q,themeClass:X==null?void 0:X.themeClass,onRender:X==null?void 0:X.onRender},oe)},render(){let{$slots:n,virtualScroll:r,clsPrefix:i,mergedTheme:a,themeClass:o,onRender:s}=this;return s==null||s(),_(`div`,{ref:`selfRef`,tabindex:this.focusable?0:-1,class:[`${i}-base-select-menu`,`${i}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${i}-base-select-menu--rtl`,o,this.multiple&&`${i}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},j(n.header,e=>e&&_(`div`,{class:`${i}-base-select-menu__header`,"data-header":!0,key:`header`},e)),this.loading?_(`div`,{class:`${i}-base-select-menu__loading`},_(F,{clsPrefix:i,strokeWidth:20})):this.empty?_(`div`,{class:`${i}-base-select-menu__empty`,"data-empty":!0},G(n.empty,()=>{var e;return[((e=this.mergedRenderEmpty)==null?void 0:e.call(this))||_(t,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty,size:this.size})]})):_(X,Object.assign({ref:`scrollbarRef`,theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:r?this.virtualListContainer:void 0,content:r?this.virtualListContent:void 0,onScroll:r?void 0:this.doScroll},this.scrollbarProps),{default:()=>r?_(e,{ref:`virtualListRef`,class:`${i}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:e})=>e.isGroup?_(ge,{key:e.key,clsPrefix:i,tmNode:e}):e.ignored?null:_(ve,{clsPrefix:i,key:e.key,tmNode:e})}):_(`div`,{class:`${i}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(e=>e.isGroup?_(ge,{key:e.key,clsPrefix:i,tmNode:e}):_(ve,{clsPrefix:i,key:e.key,tmNode:e})))}),j(n.action,e=>e&&[_(`div`,{class:`${i}-base-select-menu__action`,"data-action":!0,key:`action`},e),_(he,{onFocus:this.onTabOut,key:`focus-detector`})]))}}),xe=B([J(`base-selection`,`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[J(`base-loading`,`
 color: var(--n-loading-color);
 `),J(`base-selection-tags`,`min-height: var(--n-height);`),R(`border, state-border`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),R(`state-border`,`
 z-index: 1;
 border-color: #0000;
 `),J(`base-suffix`,`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[R(`arrow`,`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),J(`base-selection-overlay`,`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[R(`wrapper`,`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),J(`base-selection-placeholder`,`
 color: var(--n-placeholder-color);
 `,[R(`inner`,`
 max-width: 100%;
 overflow: hidden;
 `)]),J(`base-selection-tags`,`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),J(`base-selection-label`,`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[J(`base-selection-input`,`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[R(`content`,`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),R(`render-label`,`
 color: var(--n-text-color);
 `)]),H(`disabled`,[B(`&:hover`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),P(`focus`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),P(`active`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),J(`base-selection-label`,`background-color: var(--n-color-active);`),J(`base-selection-tags`,`background-color: var(--n-color-active);`)])]),P(`disabled`,`cursor: not-allowed;`,[R(`arrow`,`
 color: var(--n-arrow-color-disabled);
 `),J(`base-selection-label`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[J(`base-selection-input`,`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),R(`render-label`,`
 color: var(--n-text-color-disabled);
 `)]),J(`base-selection-tags`,`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),J(`base-selection-placeholder`,`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),J(`base-selection-input-tag`,`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[R(`input`,`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),R(`mirror`,`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),[`warning`,`error`].map(e=>P(`${e}-status`,[R(`state-border`,`border: var(--n-border-${e});`),H(`disabled`,[B(`&:hover`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),P(`active`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),J(`base-selection-label`,`background-color: var(--n-color-active-${e});`),J(`base-selection-tags`,`background-color: var(--n-color-active-${e});`)]),P(`focus`,[R(`state-border`,`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),J(`base-selection-popover`,`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),J(`base-selection-tag-wrapper`,`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[B(`&:last-child`,`padding-right: 0;`),J(`tag`,`
 font-size: 14px;
 max-width: 100%;
 `,[R(`content`,`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Se=C({name:`InternalSelection`,props:Object.assign(Object.assign({},de.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:``},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:`medium`},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){let{mergedClsPrefixRef:t,mergedRtlRef:n}=te(e),r=T(`InternalSelection`,n,t),i=K(null),a=K(null),o=K(null),s=K(null),c=K(null),u=K(null),f=K(null),h=K(null),g=K(null),_=K(null),v=K(!1),y=K(!1),b=K(!1),x=de(`InternalSelection`,`-internal-selection`,xe,p,e,L(e,`clsPrefix`)),S=d(()=>e.clearable&&!e.disabled&&(b.value||e.active)),C=d(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):O(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),ee=d(()=>{let t=e.selectedOption;if(t)return t[e.labelField]}),w=d(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function E(){var t;let{value:n}=i;if(n){let{value:r}=a;r&&(r.style.width=`${n.offsetWidth}px`,e.maxTagCount!==`responsive`&&((t=g.value)==null||t.sync({showAllItemsBeforeCalculate:!1})))}}function ne(){let{value:e}=_;e&&(e.style.display=`none`)}function k(){let{value:e}=_;e&&(e.style.display=`inline-block`)}D(L(e,`active`),e=>{e||ne()}),D(L(e,`pattern`),()=>{e.multiple&&fe(E)});function j(t){let{onFocus:n}=e;n&&n(t)}function N(t){let{onBlur:n}=e;n&&n(t)}function P(t){let{onDeleteOption:n}=e;n&&n(t)}function F(t){let{onClear:n}=e;n&&n(t)}function re(t){let{onPatternInput:n}=e;n&&n(t)}function ie(e){var t;(!e.relatedTarget||!((t=o.value)!=null&&t.contains(e.relatedTarget)))&&j(e)}function I(e){var t;(t=o.value)!=null&&t.contains(e.relatedTarget)||N(e)}function R(e){F(e)}function z(){b.value=!0}function B(){b.value=!1}function V(t){!e.active||!e.filterable||t.target!==a.value&&t.preventDefault()}function H(e){P(e)}let U=K(!1);function ae(t){if(t.key===`Backspace`&&!U.value&&!e.pattern.length){let{selectedOptions:t}=e;t!=null&&t.length&&H(t[t.length-1])}}let W=null;function G(t){let{value:n}=i;n&&(n.textContent=t.target.value,E()),e.ignoreComposition&&U.value?W=t:re(t)}function q(){U.value=!0}function J(){U.value=!1,e.ignoreComposition&&re(W),W=null}function X(t){var n;y.value=!0,(n=e.onPatternFocus)==null||n.call(e,t)}function oe(t){var n;y.value=!1,(n=e.onPatternBlur)==null||n.call(e,t)}function se(){var t,n;if(e.filterable)y.value=!1,(t=u.value)==null||t.blur(),(n=a.value)==null||n.blur();else if(e.multiple){let{value:e}=s;e==null||e.blur()}else{let{value:e}=c;e==null||e.blur()}}function ce(){var t,n,r;e.filterable?(y.value=!1,(t=u.value)==null||t.focus()):e.multiple?(n=s.value)==null||n.focus():(r=c.value)==null||r.focus()}function le(){let{value:e}=a;e&&(k(),e.focus())}function ue(){let{value:e}=a;e&&e.blur()}function Z(e){let{value:t}=f;t&&t.setTextContent(`+${e}`)}function Q(){let{value:e}=h;return e}function $(){return a.value}let me=null;function he(){me!==null&&window.clearTimeout(me)}function ge(){e.active||(he(),me=window.setTimeout(()=>{w.value&&(v.value=!0)},100))}function _e(){he()}function ve(e){e||(he(),v.value=!1)}D(w,e=>{e||(v.value=!1)}),m(()=>{M(()=>{let t=u.value;t&&(e.disabled?t.removeAttribute(`tabindex`):t.tabIndex=y.value?-1:0)})}),pe(o,e.onResize);let{inlineThemeDisabled:ye}=e,be=d(()=>{let{size:t}=e,{common:{cubicBezierEaseInOut:n},self:{fontWeight:r,borderRadius:i,color:a,placeholderColor:o,textColor:s,paddingSingle:c,paddingMultiple:l,caretColor:u,colorDisabled:d,textColorDisabled:f,placeholderColorDisabled:p,colorActive:m,boxShadowFocus:h,boxShadowActive:g,boxShadowHover:_,border:v,borderFocus:y,borderHover:b,borderActive:S,arrowColor:C,arrowColorDisabled:ee,loadingColor:w,colorActiveWarning:T,boxShadowFocusWarning:te,boxShadowActiveWarning:E,boxShadowHoverWarning:ne,borderWarning:D,borderFocusWarning:O,borderHoverWarning:k,borderActiveWarning:j,colorActiveError:M,boxShadowFocusError:N,boxShadowActiveError:P,boxShadowHoverError:F,borderError:re,borderFocusError:ie,borderHoverError:I,borderActiveError:L,clearColor:R,clearColorHover:z,clearColorPressed:B,clearSize:V,arrowSize:H,[Y(`height`,t)]:U,[Y(`fontSize`,t)]:ae}}=x.value,W=A(c),G=A(l);return{"--n-bezier":n,"--n-border":v,"--n-border-active":S,"--n-border-focus":y,"--n-border-hover":b,"--n-border-radius":i,"--n-box-shadow-active":g,"--n-box-shadow-focus":h,"--n-box-shadow-hover":_,"--n-caret-color":u,"--n-color":a,"--n-color-active":m,"--n-color-disabled":d,"--n-font-size":ae,"--n-height":U,"--n-padding-single-top":W.top,"--n-padding-multiple-top":G.top,"--n-padding-single-right":W.right,"--n-padding-multiple-right":G.right,"--n-padding-single-left":W.left,"--n-padding-multiple-left":G.left,"--n-padding-single-bottom":W.bottom,"--n-padding-multiple-bottom":G.bottom,"--n-placeholder-color":o,"--n-placeholder-color-disabled":p,"--n-text-color":s,"--n-text-color-disabled":f,"--n-arrow-color":C,"--n-arrow-color-disabled":ee,"--n-loading-color":w,"--n-color-active-warning":T,"--n-box-shadow-focus-warning":te,"--n-box-shadow-active-warning":E,"--n-box-shadow-hover-warning":ne,"--n-border-warning":D,"--n-border-focus-warning":O,"--n-border-hover-warning":k,"--n-border-active-warning":j,"--n-color-active-error":M,"--n-box-shadow-focus-error":N,"--n-box-shadow-active-error":P,"--n-box-shadow-hover-error":F,"--n-border-error":re,"--n-border-focus-error":ie,"--n-border-hover-error":I,"--n-border-active-error":L,"--n-clear-size":V,"--n-clear-color":R,"--n-clear-color-hover":z,"--n-clear-color-pressed":B,"--n-arrow-size":H,"--n-font-weight":r}}),Se=ye?l(`internal-selection`,d(()=>e.size[0]),be,e):void 0;return{mergedTheme:x,mergedClearable:S,mergedClsPrefix:t,rtlEnabled:r,patternInputFocused:y,filterablePlaceholder:C,label:ee,selected:w,showTagsPanel:v,isComposing:U,counterRef:f,counterWrapperRef:h,patternInputMirrorRef:i,patternInputRef:a,selfRef:o,multipleElRef:s,singleElRef:c,patternInputWrapperRef:u,overflowRef:g,inputTagElRef:_,handleMouseDown:V,handleFocusin:ie,handleClear:R,handleMouseEnter:z,handleMouseLeave:B,handleDeleteOption:H,handlePatternKeyDown:ae,handlePatternInputInput:G,handlePatternInputBlur:oe,handlePatternInputFocus:X,handleMouseEnterCounter:ge,handleMouseLeaveCounter:_e,handleFocusout:I,handleCompositionEnd:J,handleCompositionStart:q,onPopoverUpdateShow:ve,focus:ce,focusInput:le,blur:se,blurInput:ue,updateCounter:Z,getCounter:Q,getTail:$,renderLabel:e.renderLabel,cssVars:ye?void 0:be,themeClass:Se==null?void 0:Se.themeClass,onRender:Se==null?void 0:Se.onRender}},render(){let{status:e,multiple:t,size:n,disabled:i,filterable:a,maxTagCount:o,bordered:s,clsPrefix:c,ellipsisTagPopoverProps:l,onRender:u,renderTag:d,renderLabel:f}=this;u==null||u();let p=o===`responsive`,m=typeof o==`number`,h=p||m,g=_(E,null,{default:()=>_(r,{clsPrefix:c,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var e,t;return(t=(e=this.$slots).arrow)==null?void 0:t.call(e)}})}),v;if(t){let{labelField:e}=this,t=t=>_(`div`,{class:`${c}-base-selection-tag-wrapper`,key:t.value},d?d({option:t,handleClose:()=>{this.handleDeleteOption(t)}}):_(y,{size:n,closable:!t.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(t)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>f?f(t,!0):O(t[e],t,!0)})),r=()=>(m?this.selectedOptions.slice(0,o):this.selectedOptions).map(t),s=a?_(`div`,{class:`${c}-base-selection-input-tag`,ref:`inputTagElRef`,key:`__input-tag__`},_(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${c}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),_(`span`,{ref:`patternInputMirrorRef`,class:`${c}-base-selection-input-tag__mirror`},this.pattern)):null,u=p?()=>_(`div`,{class:`${c}-base-selection-tag-wrapper`,ref:`counterWrapperRef`},_(y,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i})):void 0,b;if(m){let e=this.selectedOptions.length-o;e>0&&(b=_(`div`,{class:`${c}-base-selection-tag-wrapper`,key:`__counter__`},_(y,{size:n,ref:`counterRef`,onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${e}`})))}let x=p?a?_(oe,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:r,counter:u,tail:()=>s}):_(oe,{ref:`overflowRef`,updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:`100%`,display:`flex`,overflow:`hidden`}},{default:r,counter:u}):m&&b?r().concat(b):r(),S=h?()=>_(`div`,{class:`${c}-base-selection-popover`},p?r():this.selectedOptions.map(t)):void 0,C=h?Object.assign({show:this.showTagsPanel,trigger:`hover`,overlap:!0,placement:`top`,width:`trigger`,onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},l):null,ee=!this.selected&&(!this.active||!this.pattern&&!this.isComposing)?_(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`},_(`div`,{class:`${c}-base-selection-placeholder__inner`},this.placeholder)):null,w=a?_(`div`,{ref:`patternInputWrapperRef`,class:`${c}-base-selection-tags`},x,p?null:s,g):_(`div`,{ref:`multipleElRef`,class:`${c}-base-selection-tags`,tabindex:i?void 0:0},x,g);v=_(se,null,h?_(ae,Object.assign({},C,{scrollable:!0,style:`max-height: calc(var(--v-target-height) * 6.6);`}),{trigger:()=>w,default:S}):w,ee)}else if(a){let e=this.pattern||this.isComposing,t=this.active?!e:!this.selected,n=this.active?!1:this.selected;v=_(`div`,{ref:`patternInputWrapperRef`,class:`${c}-base-selection-label`,title:this.patternInputFocused?void 0:V(this.label)},_(`input`,Object.assign({},this.inputProps,{ref:`patternInputRef`,class:`${c}-base-selection-input`,value:this.active?this.pattern:``,placeholder:``,readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),n?_(`div`,{class:`${c}-base-selection-label__render-label ${c}-base-selection-overlay`,key:`input`},_(`div`,{class:`${c}-base-selection-overlay__wrapper`},d?d({option:this.selectedOption,handleClose:()=>{}}):f?f(this.selectedOption,!0):O(this.label,this.selectedOption,!0))):null,t?_(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`,key:`placeholder`},_(`div`,{class:`${c}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,g)}else v=_(`div`,{ref:`singleElRef`,class:`${c}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label===void 0?_(`div`,{class:`${c}-base-selection-placeholder ${c}-base-selection-overlay`,key:`placeholder`},_(`div`,{class:`${c}-base-selection-placeholder__inner`},this.placeholder)):_(`div`,{class:`${c}-base-selection-input`,title:V(this.label),key:`input`},_(`div`,{class:`${c}-base-selection-input__content`},d?d({option:this.selectedOption,handleClose:()=>{}}):f?f(this.selectedOption,!0):O(this.label,this.selectedOption,!0))),g);return _(`div`,{ref:`selfRef`,class:[`${c}-base-selection`,this.rtlEnabled&&`${c}-base-selection--rtl`,this.themeClass,e&&`${c}-base-selection--${e}-status`,{[`${c}-base-selection--active`]:this.active,[`${c}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${c}-base-selection--disabled`]:this.disabled,[`${c}-base-selection--multiple`]:this.multiple,[`${c}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},v,s?_(`div`,{class:`${c}-base-selection__border`}):null,s?_(`div`,{class:`${c}-base-selection__state-border`}):null)}});function Ce(e){return e.type===`group`}function we(e){return e.type===`ignored`}function Te(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch(e){return!1}}function Ee(e,t){return{getIsGroup:Ce,getIgnored:we,getKey(t){return Ce(t)?t.name||t.key||`key-required`:t[e]},getChildren(e){return e[t]}}}function De(e,t,n,r){if(!t)return e;function i(e){if(!Array.isArray(e))return[];let a=[];for(let o of e)if(Ce(o)){let e=i(o[r]);e.length&&a.push(Object.assign({},o,{[r]:e}))}else if(we(o))continue;else t(n,o)&&a.push(o);return a}return i(e)}function Oe(e,t,n){let r=new Map;return e.forEach(e=>{Ce(e)?e[n].forEach(e=>{r.set(e[t],e)}):r.set(e[t],e)}),r}var ke=B([J(`select`,`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),J(`select-menu`,`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[k({originalTransition:`background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)`})])]),Ae=C({name:`Select`,props:Object.assign(Object.assign({},de.props),{to:u.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:`bottom-start`},widthMode:{type:String,default:`trigger`},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:`label`},valueField:{type:String,default:`value`},childrenField:{type:String,default:`children`},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:`show`},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),slots:Object,setup(e){let{mergedClsPrefixRef:t,mergedBorderedRef:r,namespaceRef:s,inlineThemeDisabled:c,mergedComponentPropsRef:p}=te(e),m=de(`Select`,`-select`,ke,x,e,t),h=K(e.defaultValue),_=g(L(e,`value`),h),v=K(!1),y=K(``),b=S(e,[`items`,`options`]),C=K([]),T=K([]),E=d(()=>T.value.concat(C.value).concat(b.value)),ne=d(()=>{let{filter:t}=e;if(t)return t;let{labelField:n,valueField:r}=e;return(e,t)=>{if(!t)return!1;let i=t[n];if(typeof i==`string`)return Te(e,i);let a=t[r];return typeof a==`string`?Te(e,a):typeof a==`number`?Te(e,String(a)):!1}}),O=d(()=>{if(e.remote)return b.value;{let{value:t}=E,{value:n}=y;return!n.length||!e.filterable?t:De(t,ne.value,n,e.childrenField)}}),k=d(()=>{let{valueField:t,childrenField:n}=e,r=Ee(t,n);return ee(O.value,r)}),A=d(()=>Oe(E.value,e.valueField,e.childrenField)),j=K(!1),M=g(L(e,`show`),j),N=K(null),P=K(null),F=K(null),{localeRef:re}=a(`Select`),ie=d(()=>{var t;return(t=e.placeholder)==null?re.value.placeholder:t}),I=[],R=K(new Map),z=d(()=>{let{fallbackOption:t}=e;if(t===void 0){let{labelField:t,valueField:n}=e;return e=>({[t]:String(e),[n]:e})}return t===!1?!1:e=>Object.assign(t(e),{value:e})});function B(t){let n=e.remote,{value:r}=R,{value:i}=A,{value:a}=z,o=[];return t.forEach(e=>{if(i.has(e))o.push(i.get(e));else if(n&&r.has(e))o.push(r.get(e));else if(a){let t=a(e);t&&o.push(t)}}),o}let V=d(()=>{if(e.multiple){let{value:e}=_;return Array.isArray(e)?B(e):[]}return null}),H=d(()=>{let{value:t}=_;return!e.multiple&&!Array.isArray(t)?t===null?null:B([t])[0]||null:null}),U=i(e,{mergedSize:t=>{var n,r;let{size:i}=e;if(i)return i;let{mergedSize:a}=t||{};return a!=null&&a.value?a.value:((r=(n=p==null?void 0:p.value)==null?void 0:n.Select)==null?void 0:r.size)||`medium`}}),{mergedSizeRef:ae,mergedDisabledRef:W,mergedStatusRef:G}=U;function J(t,n){let{onChange:r,"onUpdate:value":i,onUpdateValue:a}=e,{nTriggerFormChange:o,nTriggerFormInput:s}=U;r&&q(r,t,n),a&&q(a,t,n),i&&q(i,t,n),h.value=t,o(),s()}function Y(t){let{onBlur:n}=e,{nTriggerFormBlur:r}=U;n&&q(n,t),r()}function X(){let{onClear:t}=e;t&&q(t)}function oe(t){let{onFocus:n,showOnFocus:r}=e,{nTriggerFormFocus:i}=U;n&&q(n,t),i(),r&&Z()}function se(t){let{onSearch:n}=e;n&&q(n,t)}function ce(t){let{onScroll:n}=e;n&&q(n,t)}function le(){var t;let{remote:n,multiple:r}=e;if(n){let{value:n}=R;if(r){let{valueField:r}=e;(t=V.value)==null||t.forEach(e=>{n.set(e[r],e)})}else{let t=H.value;t&&n.set(t[e.valueField],t)}}}function ue(t){let{onUpdateShow:n,"onUpdate:show":r}=e;n&&q(n,t),r&&q(r,t),j.value=t}function Z(){W.value||(ue(!0),j.value=!0,e.filterable&&Le())}function Q(){ue(!1)}function fe(){y.value=``,T.value=I}let pe=K(!1);function $(){e.filterable&&(pe.value=!0)}function me(){e.filterable&&(pe.value=!1,M.value||fe())}function he(){W.value||(M.value?e.filterable?Le():Q():Z())}function ge(e){var t,n;(n=(t=F.value)==null?void 0:t.selfRef)!=null&&n.contains(e.relatedTarget)||(v.value=!1,Y(e),Q())}function _e(e){oe(e),v.value=!0}function ve(){v.value=!0}function ye(e){var t;(t=N.value)!=null&&t.$el.contains(e.relatedTarget)||(v.value=!1,Y(e),Q())}function be(){var e;(e=N.value)==null||e.focus(),Q()}function xe(e){var t;M.value&&((t=N.value)!=null&&t.$el.contains(w(e))||Q())}function Se(t){if(!Array.isArray(t))return[];if(z.value)return Array.from(t);{let{remote:n}=e,{value:r}=A;if(n){let{value:e}=R;return t.filter(t=>r.has(t)||e.has(t))}else return t.filter(e=>r.has(e))}}function Ce(e){we(e.rawNode)}function we(t){if(W.value)return;let{tag:n,remote:r,clearFilterAfterSelect:i,valueField:a}=e;if(n&&!r){let{value:e}=T,t=e[0]||null;if(t){let e=C.value;e.length?e.push(t):C.value=[t],T.value=I}}if(r&&R.value.set(t[a],t),e.multiple){let e=Se(_.value),o=e.findIndex(e=>e===t[a]);if(~o){if(e.splice(o,1),n&&!r){let e=Ae(t[a]);~e&&(C.value.splice(e,1),i&&(y.value=``))}}else e.push(t[a]),i&&(y.value=``);J(e,B(e))}else{if(n&&!r){let e=Ae(t[a]);~e?C.value=[C.value[e]]:C.value=I}Ie(),Q(),J(t[a],t)}}function Ae(t){return C.value.findIndex(n=>n[e.valueField]===t)}function je(t){M.value||Z();let{value:n}=t.target;y.value=n;let{tag:r,remote:i}=e;if(se(n),r&&!i){if(!n){T.value=I;return}let{onCreate:t}=e,r=t?t(n):{[e.labelField]:n,[e.valueField]:n},{valueField:i,labelField:a}=e;b.value.some(e=>e[i]===r[i]||e[a]===r[a])||C.value.some(e=>e[i]===r[i]||e[a]===r[a])?T.value=I:T.value=[r]}}function Me(t){t.stopPropagation();let{multiple:n,tag:r,remote:i,clearCreatedOptionsOnClear:a}=e;!n&&e.filterable&&Q(),r&&!i&&a&&(C.value=I),X(),n?J([],[]):J(null,null)}function Ne(e){!o(e,`action`)&&!o(e,`empty`)&&!o(e,`header`)&&e.preventDefault()}function Pe(e){ce(e)}function Fe(t){var r,i,a,o,s;if(!e.keyboard){t.preventDefault();return}switch(t.key){case` `:if(e.filterable)break;t.preventDefault();case`Enter`:if(!((r=N.value)!=null&&r.isComposing)){if(M.value){let t=(i=F.value)==null?void 0:i.getPendingTmNode();t?Ce(t):e.filterable||(Q(),Ie())}else if(Z(),e.tag&&pe.value){let t=T.value[0];if(t){let n=t[e.valueField],{value:r}=_;e.multiple&&Array.isArray(r)&&r.includes(n)||we(t)}}}t.preventDefault();break;case`ArrowUp`:if(t.preventDefault(),e.loading)return;M.value&&((a=F.value)==null||a.prev());break;case`ArrowDown`:if(t.preventDefault(),e.loading)return;M.value?(o=F.value)==null||o.next():Z();break;case`Escape`:M.value&&(n(t),Q()),(s=N.value)==null||s.focus();break}}function Ie(){var e;(e=N.value)==null||e.focus()}function Le(){var e;(e=N.value)==null||e.focusInput()}function Re(){var e;M.value&&((e=P.value)==null||e.syncPosition())}le(),D(L(e,`options`),le);let ze={focus:()=>{var e;(e=N.value)==null||e.focus()},focusInput:()=>{var e;(e=N.value)==null||e.focusInput()},blur:()=>{var e;(e=N.value)==null||e.blur()},blurInput:()=>{var e;(e=N.value)==null||e.blurInput()}},Be=d(()=>{let{self:{menuBoxShadow:e}}=m.value;return{"--n-menu-box-shadow":e}}),Ve=c?l(`select`,void 0,Be,e):void 0;return Object.assign(Object.assign({},ze),{mergedStatus:G,mergedClsPrefix:t,mergedBordered:r,namespace:s,treeMate:k,isMounted:f(),triggerRef:N,menuRef:F,pattern:y,uncontrolledShow:j,mergedShow:M,adjustedTo:u(e),uncontrolledValue:h,mergedValue:_,followerRef:P,localizedPlaceholder:ie,selectedOption:H,selectedOptions:V,mergedSize:ae,mergedDisabled:W,focused:v,activeWithoutMenuOpen:pe,inlineThemeDisabled:c,onTriggerInputFocus:$,onTriggerInputBlur:me,handleTriggerOrMenuResize:Re,handleMenuFocus:ve,handleMenuBlur:ye,handleMenuTabOut:be,handleTriggerClick:he,handleToggle:Ce,handleDeleteOption:we,handlePatternInput:je,handleClear:Me,handleTriggerBlur:ge,handleTriggerFocus:_e,handleKeydown:Fe,handleMenuAfterLeave:fe,handleMenuClickOutside:xe,handleMenuScroll:Pe,handleMenuKeydown:Fe,handleMenuMousedown:Ne,mergedTheme:m,cssVars:c?void 0:Be,themeClass:Ve==null?void 0:Ve.themeClass,onRender:Ve==null?void 0:Ve.onRender})},render(){return _(`div`,{class:`${this.mergedClsPrefix}-select`},_(ce,null,{default:()=>[_(re,null,{default:()=>_(Se,{ref:`triggerRef`,inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,t;return[(t=(e=this.$slots).arrow)==null?void 0:t.call(e)]}})}),_(U,{ref:`followerRef`,show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===u.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?`target`:void 0,minWidth:`target`,placement:this.placement},{default:()=>_(Z,{name:`fade-in-scale-up-transition`,appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,t,n;return this.mergedShow||this.displayDirective===`show`?((e=this.onRender)==null||e.call(this),s(_(be,Object.assign({},this.menuProps,{ref:`menuRef`,onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(t=this.menuProps)==null?void 0:t.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(n=this.menuProps)==null?void 0:n.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var e,t;return[(t=(e=this.$slots).empty)==null?void 0:t.call(e)]},header:()=>{var e,t;return[(t=(e=this.$slots).header)==null?void 0:t.call(e)]},action:()=>{var e,t;return[(t=(e=this.$slots).action)==null?void 0:t.call(e)]}}),this.displayDirective===`show`?[[le,this.mergedShow],[ue,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[ue,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{$ as a,he as i,Ee as n,be as r,Ae as t};