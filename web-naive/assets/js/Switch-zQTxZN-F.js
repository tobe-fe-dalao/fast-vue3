import{a as e}from"./Button-BQWu1K_S.js";import{Bt as t,Dr as n,In as r,Ir as i,Kt as a,Pr as o,Vt as s,Wn as c,Xn as l,Yt as u,ar as d,at as f,gt as p,ii as m,ir as h,lt as g,nr as _,or as v,qn as y,ri as b,rn as x,rr as S,rt as C,s as w,sr as T,yt as E}from"./index-index-Vl7atQja.js";function D(e){let{primaryColor:t,opacityDisabled:n,borderRadius:r,textColor3:i}=e;return Object.assign(Object.assign({},w),{iconColor:i,textColor:`white`,loadingColor:t,opacityDisabled:n,railColor:`rgba(0, 0, 0, .14)`,railColorActive:t,buttonBoxShadow:`0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)`,buttonColor:`#FFF`,railBorderRadiusSmall:r,railBorderRadiusMedium:r,railBorderRadiusLarge:r,buttonBorderRadiusSmall:r,buttonBorderRadiusMedium:r,buttonBorderRadiusLarge:r,boxShadowFocus:`0 0 0 2px ${c(t,{alpha:.2})}`})}var O={name:`Switch`,common:C,self:D},k=S(`switch`,`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[h(`children-placeholder`,`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),h(`rail-placeholder`,`
 display: flex;
 flex-wrap: none;
 `),h(`button-placeholder`,`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),S(`base-loading`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[g({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),h(`checked, unchecked`,`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),h(`checked`,`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),h(`unchecked`,`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),_(`&:focus`,[h(`rail`,`
 box-shadow: var(--n-box-shadow-focus);
 `)]),d(`round`,[h(`rail`,`border-radius: calc(var(--n-rail-height) / 2);`,[h(`button`,`border-radius: calc(var(--n-button-height) / 2);`)])]),v(`disabled`,[v(`icon`,[d(`rubber-band`,[d(`pressed`,[h(`rail`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),h(`rail`,[_(`&:active`,[h(`button`,`max-width: var(--n-button-width-pressed);`)])]),d(`active`,[d(`pressed`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])]),h(`rail`,[_(`&:active`,[h(`button`,`left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));`)])])])])])]),d(`active`,[h(`rail`,[h(`button`,`left: calc(100% - var(--n-button-width) - var(--n-offset))`)])]),h(`rail`,`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[h(`button-icon`,`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[g()]),h(`button`,`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),d(`active`,[h(`rail`,`background-color: var(--n-rail-color-active);`)]),d(`loading`,[h(`rail`,`
 cursor: wait;
 `)]),d(`disabled`,[h(`rail`,`
 cursor: not-allowed;
 opacity: .5;
 `)])]),A=Object.assign(Object.assign({},E.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]}),j,M=o({name:`Switch`,props:A,slots:Object,setup(i){j===void 0&&(j=typeof CSS<`u`?CSS.supports===void 0?!1:CSS.supports(`width`,`max(1px)`):!0);let{mergedClsPrefixRef:a,inlineThemeDisabled:o,mergedComponentPropsRef:c}=s(i),u=E(`Switch`,`-switch`,k,O,i,a),d=e(i,{mergedSize(e){var t,n;return i.size===void 0?e?e.mergedSize.value:((n=(t=c==null?void 0:c.value)==null?void 0:t.Switch)==null?void 0:n.size)||`medium`:i.size}}),{mergedSizeRef:f,mergedDisabledRef:p}=d,h=b(i.defaultValue),g=r(m(i,`value`),h),_=n(()=>g.value===i.checkedValue),v=b(!1),S=b(!1),C=n(()=>{let{railStyle:e}=i;if(e)return e({focused:S.value,checked:_.value})});function w(e){let{"onUpdate:value":t,onChange:n,onUpdateValue:r}=i,{nTriggerFormInput:a,nTriggerFormChange:o}=d;t&&x(t,e),r&&x(r,e),n&&x(n,e),h.value=e,a(),o()}function D(){let{nTriggerFormFocus:e}=d;e()}function A(){let{nTriggerFormBlur:e}=d;e()}function M(){i.loading||p.value||(g.value===i.checkedValue?w(i.uncheckedValue):w(i.checkedValue))}function N(){S.value=!0,D()}function P(){S.value=!1,A(),v.value=!1}function F(e){i.loading||p.value||e.key===` `&&(g.value===i.checkedValue?w(i.uncheckedValue):w(i.checkedValue),v.value=!1)}function I(e){i.loading||p.value||e.key===` `&&(e.preventDefault(),v.value=!0)}let L=n(()=>{let{value:e}=f,{self:{opacityDisabled:t,railColor:n,railColorActive:r,buttonBoxShadow:i,buttonColor:a,boxShadowFocus:o,loadingColor:s,textColor:c,iconColor:d,[T(`buttonHeight`,e)]:p,[T(`buttonWidth`,e)]:m,[T(`buttonWidthPressed`,e)]:h,[T(`railHeight`,e)]:g,[T(`railWidth`,e)]:_,[T(`railBorderRadius`,e)]:v,[T(`buttonBorderRadius`,e)]:b},common:{cubicBezierEaseInOut:x}}=u.value,S,C,w;return j?(S=`calc((${g} - ${p}) / 2)`,C=`max(${g}, ${p})`,w=`max(${_}, calc(${_} + ${p} - ${g}))`):(S=l((y(g)-y(p))/2),C=l(Math.max(y(g),y(p))),w=y(g)>y(p)?_:l(y(_)+y(p)-y(g))),{"--n-bezier":x,"--n-button-border-radius":b,"--n-button-box-shadow":i,"--n-button-color":a,"--n-button-width":m,"--n-button-width-pressed":h,"--n-button-height":p,"--n-height":C,"--n-offset":S,"--n-opacity-disabled":t,"--n-rail-border-radius":v,"--n-rail-color":n,"--n-rail-color-active":r,"--n-rail-height":g,"--n-rail-width":_,"--n-width":w,"--n-box-shadow-focus":o,"--n-loading-color":s,"--n-text-color":c,"--n-icon-color":d}}),R=o?t(`switch`,n(()=>f.value[0]),L,i):void 0;return{handleClick:M,handleBlur:P,handleFocus:N,handleKeyup:F,handleKeydown:I,mergedRailStyle:C,pressed:v,mergedClsPrefix:a,mergedValue:g,checked:_,mergedDisabled:p,cssVars:o?void 0:L,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender}},render(){let{mergedClsPrefix:e,mergedDisabled:t,checked:n,mergedRailStyle:r,onRender:o,$slots:s}=this;o==null||o();let{checked:c,unchecked:l,icon:d,"checked-icon":m,"unchecked-icon":h}=s,g=!(a(d)&&a(m)&&a(h));return i(`div`,{role:`switch`,"aria-checked":n,class:[`${e}-switch`,this.themeClass,g&&`${e}-switch--icon`,n&&`${e}-switch--active`,t&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},i(`div`,{class:`${e}-switch__rail`,"aria-hidden":`true`,style:r},u(c,t=>u(l,n=>t||n?i(`div`,{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},i(`div`,{class:`${e}-switch__rail-placeholder`},i(`div`,{class:`${e}-switch__button-placeholder`}),t),i(`div`,{class:`${e}-switch__rail-placeholder`},i(`div`,{class:`${e}-switch__button-placeholder`}),n)):null)),i(`div`,{class:`${e}-switch__button`},u(d,t=>u(m,n=>u(h,r=>i(p,null,{default:()=>this.loading?i(f,Object.assign({key:`loading`,clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(n||t)?i(`div`,{class:`${e}-switch__button-icon`,key:n?`checked-icon`:`icon`},n||t):!this.checked&&(r||t)?i(`div`,{class:`${e}-switch__button-icon`,key:r?`unchecked-icon`:`icon`},r||t):null})))),u(c,t=>t&&i(`div`,{key:`checked`,class:`${e}-switch__checked`},t)),u(l,t=>t&&i(`div`,{key:`unchecked`,class:`${e}-switch__unchecked`},t)))))}});export{M as t};