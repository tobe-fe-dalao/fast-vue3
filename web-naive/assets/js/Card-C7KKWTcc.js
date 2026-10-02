import{Bt as e,Dr as t,Gt as n,Ir as r,L as i,Pr as a,Qt as o,St as s,Vt as c,Yn as l,Yt as u,ar as d,cr as f,ct as p,ir as m,lr as h,nr as g,rn as _,rr as v,sr as y,tr as b,tt as x,yt as S}from"./index-index-Vl7atQja.js";var C=v(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),w=g([v(`card`,`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[b({background:`var(--n-color-modal)`}),d(`hoverable`,[g(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),d(`content-segmented`,[g(`>`,[v(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),m(`content-scrollbar`,[g(`>`,[v(`scrollbar-container`,[g(`>`,[v(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),d(`content-soft-segmented`,[g(`>`,[v(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),m(`content-scrollbar`,[g(`>`,[v(`scrollbar-container`,[g(`>`,[v(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),d(`footer-segmented`,[g(`>`,[m(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),d(`footer-soft-segmented`,[g(`>`,[m(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),g(`>`,[v(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[m(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),m(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),m(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),m(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),C,v(`card-content`,[g(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),m(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[g(`>`,[v(`scrollbar-container`,[g(`>`,[C])])]),g(`&:first-child >`,[v(`scrollbar-container`,[g(`>`,[v(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),m(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[g(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),m(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),v(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[g(`img`,`
 display: block;
 width: 100%;
 `)]),d(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[g(`&:target`,`border-color: var(--n-color-target);`)]),d(`action-segmented`,[g(`>`,[m(`action`,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`content-segmented, content-soft-segmented`,[g(`>`,[v(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),m(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`footer-segmented, footer-soft-segmented`,[g(`>`,[m(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),d(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),f(v(`card`,`
 background: var(--n-color-modal);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),h(v(`card`,`
 background: var(--n-color-popover);
 `,[d(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),T={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},E=o(T),D=a({name:`Card`,props:Object.assign(Object.assign({},S.props),T),slots:Object,setup(n){let r=()=>{let{onClose:e}=n;e&&_(e)},{inlineThemeDisabled:a,mergedClsPrefixRef:o,mergedRtlRef:u,mergedComponentPropsRef:d}=c(n),f=S(`Card`,`-card`,w,i,n,o),p=s(`Card`,u,o),m=t(()=>{var e,t;return n.size||((t=(e=d==null?void 0:d.value)==null?void 0:e.Card)==null?void 0:t.size)||`medium`}),h=t(()=>{let e=m.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:o,borderColor:s,actionColor:c,borderRadius:u,lineHeight:d,closeIconColor:p,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:_,closeColorPressed:v,closeBorderRadius:b,closeIconSize:x,closeSize:S,boxShadow:C,colorPopover:w,colorEmbedded:T,colorEmbeddedModal:E,colorEmbeddedPopover:D,[y(`padding`,e)]:O,[y(`fontSize`,e)]:k,[y(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=f.value,{top:M,left:N,bottom:P}=l(O);return{"--n-bezier":j,"--n-border-radius":u,"--n-color":t,"--n-color-modal":n,"--n-color-popover":w,"--n-color-embedded":T,"--n-color-embedded-modal":E,"--n-color-embedded-popover":D,"--n-color-target":r,"--n-text-color":i,"--n-line-height":d,"--n-action-color":c,"--n-title-text-color":a,"--n-title-font-weight":o,"--n-close-icon-color":p,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":g,"--n-close-color-hover":_,"--n-close-color-pressed":v,"--n-border-color":s,"--n-box-shadow":C,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":S,"--n-close-icon-size":x,"--n-close-border-radius":b}}),g=a?e(`card`,t(()=>m.value[0]),h,n):void 0;return{rtlEnabled:p,mergedClsPrefix:o,mergedTheme:f,handleCloseClick:r,cssVars:a?void 0:h,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender}},render(){let{segmented:e,bordered:t,hoverable:i,mergedClsPrefix:a,rtlEnabled:o,onRender:s,embedded:c,tag:l,$slots:d}=this;return s==null||s(),r(l,{class:[`${a}-card`,this.themeClass,c&&`${a}-card--embedded`,{[`${a}-card--rtl`]:o,[`${a}-card--content-scrollable`]:this.contentScrollable,[`${a}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${a}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${a}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${a}-card--bordered`]:t,[`${a}-card--hoverable`]:i}],style:this.cssVars,role:this.role},u(d.cover,e=>{let t=this.cover?n([this.cover()]):e;return t&&r(`div`,{class:`${a}-card-cover`,role:`none`},t)}),u(d.header,e=>{let{title:t}=this,i=t?n(typeof t==`function`?[t()]:[t]):e;return i||this.closable?r(`div`,{class:[`${a}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},r(`div`,{class:`${a}-card-header__main`,role:`heading`},i),u(d[`header-extra`],e=>{let t=this.headerExtra?n([this.headerExtra()]):e;return t&&r(`div`,{class:[`${a}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&r(p,{clsPrefix:a,class:`${a}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),u(d.default,e=>{let{content:t}=this,i=t?n(typeof t==`function`?[t()]:[t]):e;return i?this.contentScrollable?r(x,{class:`${a}-card__content-scrollbar`,contentClass:[`${a}-card-content`,this.contentClass],contentStyle:this.contentStyle},i):r(`div`,{class:[`${a}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},i):null}),u(d.footer,e=>{let t=this.footer?n([this.footer()]):e;return t&&r(`div`,{class:[`${a}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),u(d.action,e=>{let t=this.action?n([this.action()]):e;return t&&r(`div`,{class:`${a}-card__action`,role:`none`},t)}))}});export{E as n,T as r,D as t};