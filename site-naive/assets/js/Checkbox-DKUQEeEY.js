import{v as e}from"./Input-Btsa2OYD.js";import{t}from"./use-merged-state-DSdlJP8B.js";import{r as n}from"./browser-CZMe5eFA.js";import{$ as r,Cn as i,Dt as a,Ft as o,Kt as s,Lt as c,Rt as l,Sn as u,_n as d,an as f,at as p,bn as m,c as h,dn as g,et as _,f as v,gn as y,gt as b,h as x,in as S,ln as C,lt as w,mt as T,v as E,wn as D,x as O,yn as k}from"./index-index-CZYP7cqP.js";var A={sizeSmall:`14px`,sizeMedium:`16px`,sizeLarge:`18px`,labelPadding:`0 8px`,labelFontWeight:`400`};function j(e){let{baseColor:t,inputColorDisabled:n,cardColor:r,modalColor:i,popoverColor:a,textColorDisabled:o,borderColor:s,primaryColor:c,textColor2:l,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,borderRadiusSmall:p,lineHeight:m}=e;return Object.assign(Object.assign({},A),{labelLineHeight:m,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,borderRadius:p,color:t,colorChecked:c,colorDisabled:n,colorDisabledChecked:n,colorTableHeader:r,colorTableHeaderModal:i,colorTableHeaderPopover:a,checkMarkColor:t,checkMarkColorDisabled:o,checkMarkColorDisabledChecked:o,border:`1px solid ${s}`,borderDisabled:`1px solid ${s}`,borderDisabledChecked:`1px solid ${s}`,borderChecked:`1px solid ${c}`,borderFocus:`1px solid ${c}`,boxShadowFocus:`0 0 0 2px ${g(c,{alpha:.3})}`,textColor:l,textColorDisabled:o})}var M={name:`Checkbox`,common:h,self:j},N=T(`n-checkbox-group`);o({name:`CheckboxGroup`,props:{min:Number,max:Number,size:String,value:Array,defaultValue:{type:Array,default:null},disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]},setup(e){let{mergedClsPrefixRef:r}=_(e),i=n(e),{mergedSizeRef:o,mergedDisabledRef:c}=i,l=S(e.defaultValue),u=t(a(()=>e.value),l),d=a(()=>{var e;return((e=u.value)==null?void 0:e.length)||0}),p=a(()=>Array.isArray(u.value)?new Set(u.value):new Set);function m(t,n){let{nTriggerFormInput:r,nTriggerFormChange:a}=i,{onChange:o,"onUpdate:value":s,onUpdateValue:c}=e;if(Array.isArray(u.value)){let e=Array.from(u.value),i=e.findIndex(e=>e===n);t?~i||(e.push(n),c&&w(c,e,{actionType:`check`,value:n}),s&&w(s,e,{actionType:`check`,value:n}),r(),a(),l.value=e,o&&w(o,e)):~i&&(e.splice(i,1),c&&w(c,e,{actionType:`uncheck`,value:n}),s&&w(s,e,{actionType:`uncheck`,value:n}),o&&w(o,e),l.value=e,r(),a())}else t?(c&&w(c,[n],{actionType:`check`,value:n}),s&&w(s,[n],{actionType:`check`,value:n}),o&&w(o,[n]),l.value=[n],r(),a()):(c&&w(c,[],{actionType:`uncheck`,value:n}),s&&w(s,[],{actionType:`uncheck`,value:n}),o&&w(o,[]),l.value=[],r(),a())}return s(N,{checkedCountRef:d,maxRef:f(e,`max`),minRef:f(e,`min`),valueSetRef:p,disabledRef:c,mergedSizeRef:o,toggleCheckbox:m}),{mergedClsPrefix:r}},render(){return c(`div`,{class:`${this.mergedClsPrefix}-checkbox-group`,role:`group`},this.$slots)}});var P=()=>c(`svg`,{viewBox:`0 0 64 64`,class:`check-icon`},c(`path`,{d:`M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z`})),F=()=>c(`svg`,{viewBox:`0 0 100 100`,class:`line-icon`},c(`path`,{d:`M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z`})),I=y([d(`checkbox`,`
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `,[m(`show-label`,`line-height: var(--n-label-line-height);`),y(`&:hover`,[d(`checkbox-box`,[k(`border`,`border: var(--n-border-checked);`)])]),y(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),m(`inside-table`,[d(`checkbox-box`,`
 background-color: var(--n-merged-color-table);
 `)]),m(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 `,[d(`checkbox-icon`,[y(`.check-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),m(`indeterminate`,[d(`checkbox-box`,[d(`checkbox-icon`,[y(`.check-icon`,`
 opacity: 0;
 transform: scale(.5);
 `),y(`.line-icon`,`
 opacity: 1;
 transform: scale(1);
 `)])])]),m(`checked, indeterminate`,[y(`&:focus:not(:active)`,[d(`checkbox-box`,[k(`border`,`
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),d(`checkbox-box`,`
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `,[k(`border`,{border:`var(--n-border-checked)`})])]),m(`disabled`,{cursor:`not-allowed`},[m(`checked`,[d(`checkbox-box`,`
 background-color: var(--n-color-disabled-checked);
 `,[k(`border`,{border:`var(--n-border-disabled-checked)`}),d(`checkbox-icon`,[y(`.check-icon, .line-icon`,{fill:`var(--n-check-mark-color-disabled-checked)`})])])]),d(`checkbox-box`,`
 background-color: var(--n-color-disabled);
 `,[k(`border`,`
 border: var(--n-border-disabled);
 `),d(`checkbox-icon`,[y(`.check-icon, .line-icon`,`
 fill: var(--n-check-mark-color-disabled);
 `)])]),k(`label`,`
 color: var(--n-text-color-disabled);
 `)]),d(`checkbox-box-wrapper`,`
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `),d(`checkbox-box`,`
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
 `,[k(`border`,`
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
 `),d(`checkbox-icon`,`
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `,[y(`.check-icon, .line-icon`,`
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
 `),v({left:`1px`,top:`1px`})])]),k(`label`,`
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `,[y(`&:empty`,{display:`none`})])]),i(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-modal);
 `)),D(d(`checkbox`,`
 --n-merged-color-table: var(--n-color-table-popover);
 `))]),L=o({name:`Checkbox`,props:Object.assign(Object.assign({},E.props),{size:String,checked:{type:[Boolean,String,Number],default:void 0},defaultChecked:{type:[Boolean,String,Number],default:!1},value:[String,Number],disabled:{type:Boolean,default:void 0},indeterminate:Boolean,label:String,focusable:{type:Boolean,default:!0},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},"onUpdate:checked":[Function,Array],onUpdateChecked:[Function,Array],privateInsideTable:Boolean,onChange:[Function,Array]}),setup(e){let i=l(N,null),o=S(null),{mergedClsPrefixRef:s,inlineThemeDisabled:c,mergedRtlRef:d,mergedComponentPropsRef:p}=_(e),m=S(e.defaultChecked),h=t(f(e,`checked`),m),g=b(()=>{if(i){let t=i.valueSetRef.value;return t&&e.value!==void 0?t.has(e.value):!1}else return h.value===e.checkedValue}),v=n(e,{mergedSize(t){var n,r;let{size:a}=e;if(a!==void 0)return a;if(i){let{value:e}=i.mergedSizeRef;if(e!==void 0)return e}if(t){let{mergedSize:e}=t;if(e!==void 0)return e.value}return((r=(n=p==null?void 0:p.value)==null?void 0:n.Checkbox)==null?void 0:r.size)||`medium`},mergedDisabled(t){let{disabled:n}=e;if(n!==void 0)return n;if(i){if(i.disabledRef.value)return!0;let{maxRef:{value:e},checkedCountRef:t}=i;if(e!==void 0&&t.value>=e&&!g.value)return!0;let{minRef:{value:n}}=i;if(n!==void 0&&t.value<=n&&g.value)return!0}return t?t.disabled.value:!1}}),{mergedDisabledRef:y,mergedSizeRef:x}=v,T=E(`Checkbox`,`-checkbox`,I,M,e,s);function D(t){if(i&&e.value!==void 0)i.toggleCheckbox(!g.value,e.value);else{let{onChange:n,"onUpdate:checked":r,onUpdateChecked:i}=e,{nTriggerFormInput:a,nTriggerFormChange:o}=v,s=g.value?e.uncheckedValue:e.checkedValue;r&&w(r,s,t),i&&w(i,s,t),n&&w(n,s,t),a(),o(),m.value=s}}function k(e){y.value||D(e)}function A(e){if(!y.value)switch(e.key){case` `:case`Enter`:D(e)}}function j(e){switch(e.key){case` `:e.preventDefault()}}let P={focus:()=>{var e;(e=o.value)==null||e.focus()},blur:()=>{var e;(e=o.value)==null||e.blur()}},F=O(`Checkbox`,d,s),L=a(()=>{let{value:e}=x,{common:{cubicBezierEaseInOut:t},self:{borderRadius:n,color:r,colorChecked:i,colorDisabled:a,colorTableHeader:o,colorTableHeaderModal:s,colorTableHeaderPopover:c,checkMarkColor:l,checkMarkColorDisabled:d,border:f,borderFocus:p,borderDisabled:m,borderChecked:h,boxShadowFocus:g,textColor:_,textColorDisabled:v,checkMarkColorDisabledChecked:y,colorDisabledChecked:b,borderDisabledChecked:S,labelPadding:C,labelLineHeight:w,labelFontWeight:E,[u(`fontSize`,e)]:D,[u(`size`,e)]:O}}=T.value;return{"--n-label-line-height":w,"--n-label-font-weight":E,"--n-size":O,"--n-bezier":t,"--n-border-radius":n,"--n-border":f,"--n-border-checked":h,"--n-border-focus":p,"--n-border-disabled":m,"--n-border-disabled-checked":S,"--n-box-shadow-focus":g,"--n-color":r,"--n-color-checked":i,"--n-color-table":o,"--n-color-table-modal":s,"--n-color-table-popover":c,"--n-color-disabled":a,"--n-color-disabled-checked":b,"--n-text-color":_,"--n-text-color-disabled":v,"--n-check-mark-color":l,"--n-check-mark-color-disabled":d,"--n-check-mark-color-disabled-checked":y,"--n-font-size":D,"--n-label-padding":C}}),R=c?r(`checkbox`,a(()=>x.value[0]),L,e):void 0;return Object.assign(v,P,{rtlEnabled:F,selfRef:o,mergedClsPrefix:s,mergedDisabled:y,renderedChecked:g,mergedTheme:T,labelId:C(),handleClick:k,handleKeyUp:A,handleKeyDown:j,cssVars:c?void 0:L,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender})},render(){var t;let{$slots:n,renderedChecked:r,mergedDisabled:i,indeterminate:a,privateInsideTable:o,cssVars:s,labelId:l,label:u,mergedClsPrefix:d,focusable:f,handleKeyUp:m,handleKeyDown:h,handleClick:g}=this;(t=this.onRender)==null||t.call(this);let _=p(n.default,e=>u||e?c(`span`,{class:`${d}-checkbox__label`,id:l},u||e):null);return c(`div`,{ref:`selfRef`,class:[`${d}-checkbox`,this.themeClass,this.rtlEnabled&&`${d}-checkbox--rtl`,r&&`${d}-checkbox--checked`,i&&`${d}-checkbox--disabled`,a&&`${d}-checkbox--indeterminate`,o&&`${d}-checkbox--inside-table`,_&&`${d}-checkbox--show-label`],tabindex:i||!f?void 0:0,role:`checkbox`,"aria-checked":a?`mixed`:r,"aria-labelledby":l,style:s,onKeyup:m,onKeydown:h,onClick:g,onMousedown:()=>{e(`selectstart`,window,e=>{e.preventDefault()},{once:!0})}},c(`div`,{class:`${d}-checkbox-box-wrapper`},`\xA0`,c(`div`,{class:`${d}-checkbox-box`},c(x,null,{default:()=>this.indeterminate?c(`div`,{key:`indeterminate`,class:`${d}-checkbox-icon`},F()):c(`div`,{key:`check`,class:`${d}-checkbox-icon`},P())}),c(`div`,{class:`${d}-checkbox-box__border`}))),_)}});export{L as t};