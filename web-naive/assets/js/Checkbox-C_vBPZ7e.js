import{a as e}from"./Button-BQWu1K_S.js";import{Bt as t,Dr as n,Hn as r,I as i,In as a,Ir as o,Jr as s,Lr as c,Mn as l,Pr as u,St as d,Vn as f,Vt as p,Yt as m,ar as h,cr as g,gt as _,ii as v,ir as y,lr as b,lt as x,nr as S,ri as C,rn as w,rr as T,sr as E,yt as D,zn as O}from"./index-index-Vl7atQja.js";var k=l(`n-checkbox-group`),A=u({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(t){let{mergedClsPrefixRef:r}=p(t),i=e(t),{mergedSizeRef:o,mergedDisabledRef:c}=i,l=C(t.defaultValue),u=a(n(()=>t.value),l),d=n(()=>{var e;return((e=u.value)==null?void 0:e.length)||0}),f=n(()=>Array.isArray(u.value)?new Set(u.value):new Set);function m(e,n){let{nTriggerFormInput:r,nTriggerFormChange:a}=i,{onChange:o,"onUpdate:value":s,onUpdateValue:c}=t;if(Array.isArray(u.value)){let t=Array.from(u.value),i=t.findIndex(e=>e===n);e?~i||(t.push(n),c&&w(c,t,{actionType:`check`,value:n}),s&&w(s,t,{actionType:`check`,value:n}),r(),a(),l.value=t,o&&w(o,t)):~i&&(t.splice(i,1),c&&w(c,t,{actionType:`uncheck`,value:n}),s&&w(s,t,{actionType:`uncheck`,value:n}),o&&w(o,t),l.value=t,r(),a())}else e?(c&&w(c,[n],{actionType:`check`,value:n}),s&&w(s,[n],{actionType:`check`,value:n}),o&&w(o,[n]),l.value=[n],r(),a()):(c&&w(c,[],{actionType:`uncheck`,value:n}),s&&w(s,[],{actionType:`uncheck`,value:n}),o&&w(o,[]),l.value=[],r(),a())}return s(k,{checkedCountRef:d,maxRef:v(t,`max`),minRef:v(t,`min`),valueSetRef:f,disabledRef:c,mergedSizeRef:o,toggleCheckbox:m}),{mergedClsPrefix:r}},render(){return o(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}}),j=()=>o(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},o(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),M=()=>o(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},o(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),N=S([T(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[h(`show-label`,`line-height: var(--n-label-line-height);`),S(`&:hover`,[T(`checkbox-box`,[y(`border`,`border: var(--n-border-checked);`)])]),S(`&:focus:not(:active)`,[T(`checkbox-box`,[y(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),h(`inside-table`,[T(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),h(`checked`,[T(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[T(`checkbox-icon`,[S(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),h(`indeterminate`,[T(`checkbox-box`,[T(`checkbox-icon`,[S(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),S(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),h(`checked, indeterminate`,[S(`&:focus:not(:active)`,[T(`checkbox-box`,[y(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),T(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[y(`border`,{border:`var(--n-border-checked)`})])]),h(`disabled`,{cursor:`not-allowed`},[h(`checked`,[T(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[y(`border`,{border:`var(--n-border-disabled-checked)`}),T(`checkbox-icon`,[S(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),T(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[y(`border`,`
 border: var(--n-border-disabled);
 `),T(`checkbox-icon`,[S(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),y(`label`,`
 color: var(--n-text-color-disabled);
 `)]),T(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),T(`checkbox-box`,`
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `,[y(`border`,`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `),T(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[S(`.check-icon, .line-icon`,`
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `),x({left:`1px`,top:`1px`})])]),y(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[S(`&:empty`,{display:`none`})])]),g(T(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),b(T(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),P=u({name:`Checkbox`,props:Object.assign(Object.assign({},D.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),setup(o){let s=c(k,null),l=C(null),{mergedClsPrefixRef:u,inlineThemeDisabled:f,mergedRtlRef:m,mergedComponentPropsRef:h}=p(o),g=C(o.defaultChecked),_=a(v(o,`checked`),g),y=O(()=>{if(s){let e=s.valueSetRef.value;return e&&o.value!==void 0?e.has(o.value):!1}else return _.value===o.checkedValue}),b=e(o,{mergedSize(e){var t,n;let{size:r}=o;if(r!==void 0)return r;if(s){let{value:e}=s.mergedSizeRef;if(e!==void 0)return e}if(e){let{mergedSize:t}=e;if(t!==void 0)return t.value}return((n=(t=h==null?void 0:h.value)==null?void 0:t.Checkbox)==null?void 0:n.size)||`medium`},mergedDisabled(e){let{disabled:t}=o;if(t!==void 0)return t;if(s){if(s.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=s;if(e!==void 0&&t.value>=e&&!y.value)return!0;let{minRef:{value:n}}=s;if(n!==void 0&&t.value<=n&&y.value)return!0}return e?e.disabled.value:!1}}),{mergedDisabledRef:x,mergedSizeRef:S}=b,T=D(`Checkbox`,`-checkbox`,N,i,o,u);function A(e){if(s&&o.value!==void 0)s.toggleCheckbox(!y.value,o.value);else{let{onChange:t,"onUpdate:checked":n,onUpdateChecked:r}=o,{nTriggerFormInput:i,nTriggerFormChange:a}=b,s=y.value?o.uncheckedValue:o.checkedValue;n&&w(n,s,e),r&&w(r,s,e),t&&w(t,s,e),i(),a(),g.value=s}}function j(e){x.value||A(e)}function M(e){if(!x.value)switch(e.key){case` `:case`Enter`:A(e)}}function P(e){switch(e.key){case` `:e.preventDefault()}}let F={focus:()=>{var e;(e=l.value)==null||e.focus()},blur:()=>{var e;(e=l.value)==null||e.blur()}},I=d(`Checkbox`,m,u),L=n(()=>{let{value:e}=S,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:u,border:d,borderFocus:f,borderDisabled:p,borderChecked:m,boxShadowFocus:h,textColor:g,textColorDisabled:_,checkMarkColorDisabledChecked:v,colorDisabledChecked:y,borderDisabledChecked:b,labelPadding:x,labelLineHeight:C,labelFontWeight:w,[E(`fontSize`,e)]:D,[E(`size`,e)]:O}}=T.value;return{"--n-label-line-height":C,"--n-label-font-weight":w,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":d,"--n-border-checked":m,"--n-border-focus":f,"--n-border-disabled":p,"--n-border-disabled-checked":b,"--n-box-shadow-focus":h,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":y,"--n-text-color":g,"--n-text-color-disabled":_,"--n-check-mark-color":l,"--n-check-mark-color-disabled":u,"--n-check-mark-color-disabled-checked":v,"--n-font-size":D,"--n-label-padding":x}}),R=f?t(`checkbox`,n(()=>S.value[0]),L,o):void 0;return Object.assign(b,F,{rtlEnabled:I,selfRef:l,mergedClsPrefix:u,mergedDisabled:x,renderedChecked:y,mergedTheme:T,labelId:r(),handleClick:j,handleKeyUp:M,handleKeyDown:P,cssVars:f?void 0:L,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender})},render(){var e;let{$slots:t,renderedChecked:n,mergedDisabled:r,indeterminate:i,privateInsideTable:a,cssVars:s,labelId:c,label:l,mergedClsPrefix:u,focusable:d,handleKeyUp:p,handleKeyDown:h,handleClick:g}=this;(e=this.onRender)==null||e.call(this);let v=m(t.default,e=>l||e?o(`span`,{class:`${u}-checkbox__label`,id:c},l||e):null);return o(`div`,{ref:`selfRef`,class:[`${u}-checkbox`,this.themeClass,this.rtlEnabled&&`${u}-checkbox--rtl`,n&&`${u}-checkbox--checked`,r&&`${u}-checkbox--disabled`,i&&`${u}-checkbox--indeterminate`,a&&`${u}-checkbox--inside-table`,v&&`${u}-checkbox--show-label`],tabindex:r||!d?void 0:0,role:`checkbox`,"aria-checked":i?`mixed`:n,"aria-labelledby":c,style:s,onKeyup:p,onKeydown:h,onClick:g,onMousedown:()=>{f(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},o(`div`,{class:`${u}-checkbox-box-wrapper`},`\xA0`,o(`div`,{class:`${u}-checkbox-box`},o(_,null,{default:()=>this.indeterminate?o(`div`,{key:`indeterminate`,class:`${u}-checkbox-icon`},M()):o(`div`,{key:`check`,class:`${u}-checkbox-icon`},j())}),o(`div`,{class:`${u}-checkbox-box__border`}))),v)}});export{A as n,P as t};