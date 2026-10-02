import{t as e}from"./get-slot-6kXJmSMP.js";import{Bt as t,C as n,Dr as r,Ir as i,Pn as a,Pr as o,Un as s,Vt as c,ar as l,cr as u,ir as d,lr as f,nr as p,or as m,rr as h,sr as g,tn as _,yt as v}from"./index-index-Vl7atQja.js";function y(e,t=`default`,n=[]){let{children:r}=e;if(typeof r==`object`&&r&&!Array.isArray(r)){let e=r[t];if(typeof e==`function`)return e()}return n}var b=p([h(`descriptions`,{fontSize:`var(--n-font-size)`},[h(`descriptions-separator`,`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),h(`descriptions-table-wrapper`,[h(`descriptions-table`,[h(`descriptions-table-row`,[h(`descriptions-table-header`,{padding:`var(--n-th-padding)`}),h(`descriptions-table-content`,{padding:`var(--n-td-padding)`})])])]),m(`bordered`,[h(`descriptions-table-wrapper`,[h(`descriptions-table`,[h(`descriptions-table-row`,[p(`&:last-child`,[h(`descriptions-table-content`,{paddingBottom:0})])])])])]),l(`left-label-placement`,[h(`descriptions-table-content`,[p(`> *`,{verticalAlign:`top`})])]),l(`left-label-align`,[p(`th`,{textAlign:`left`})]),l(`center-label-align`,[p(`th`,{textAlign:`center`})]),l(`right-label-align`,[p(`th`,{textAlign:`right`})]),l(`bordered`,[h(`descriptions-table-wrapper`,`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[h(`descriptions-table`,[h(`descriptions-table-row`,[p(`&:not(:last-child)`,[h(`descriptions-table-content`,{borderBottom:`1px solid var(--n-merged-border-color)`}),h(`descriptions-table-header`,{borderBottom:`1px solid var(--n-merged-border-color)`})]),h(`descriptions-table-header`,`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})]),h(`descriptions-table-content`,[p(`&:not(:last-child)`,{borderRight:`1px solid var(--n-merged-border-color)`})])])])])]),h(`descriptions-header`,`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),h(`descriptions-table-wrapper`,`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[h(`descriptions-table`,`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[h(`descriptions-table-row`,`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[h(`descriptions-table-header`,`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),h(`descriptions-table-content`,`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[d(`content`,`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),d(`label`,`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),h(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),u(h(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),f(h(`descriptions-table-wrapper`,`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),x=`DESCRIPTION_ITEM_FLAG`;function S(e){return typeof e==`object`&&e&&!Array.isArray(e)?e.type&&e.type.DESCRIPTION_ITEM_FLAG:!1}var C=o({name:`Descriptions`,props:Object.assign(Object.assign({},v.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:`top`},labelAlign:{type:String,default:`left`},separator:{type:String,default:`:`},size:String,bordered:Boolean,labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]}),slots:Object,setup(e){let{mergedClsPrefixRef:i,inlineThemeDisabled:o,mergedComponentPropsRef:s}=c(e),l=r(()=>{var t,n;return e.size||((n=(t=s==null?void 0:s.value)==null?void 0:t.Descriptions)==null?void 0:n.size)||`medium`}),u=v(`Descriptions`,`-descriptions`,b,n,e,i),d=r(()=>{let{bordered:t}=e,n=l.value,{common:{cubicBezierEaseInOut:r},self:{titleTextColor:i,thColor:a,thColorModal:o,thColorPopover:s,thTextColor:c,thFontWeight:d,tdTextColor:f,tdColor:p,tdColorModal:m,tdColorPopover:h,borderColor:_,borderColorModal:v,borderColorPopover:y,borderRadius:b,lineHeight:x,[g(`fontSize`,n)]:S,[g(t?`thPaddingBordered`:`thPadding`,n)]:C,[g(t?`tdPaddingBordered`:`tdPadding`,n)]:w}}=u.value;return{"--n-title-text-color":i,"--n-th-padding":C,"--n-td-padding":w,"--n-font-size":S,"--n-bezier":r,"--n-th-font-weight":d,"--n-line-height":x,"--n-th-text-color":c,"--n-td-text-color":f,"--n-th-color":a,"--n-th-color-modal":o,"--n-th-color-popover":s,"--n-td-color":p,"--n-td-color-modal":m,"--n-td-color-popover":h,"--n-border-radius":b,"--n-border-color":_,"--n-border-color-modal":v,"--n-border-color-popover":y}}),f=o?t(`descriptions`,r(()=>{let t=``,{bordered:n}=e;return n&&(t+=`a`),t+=l.value[0],t}),d,e):void 0;return{mergedClsPrefix:i,cssVars:o?void 0:d,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender,compitableColumn:a(e,[`columns`,`column`]),inlineThemeDisabled:o,mergedSize:l}},render(){let t=this.$slots.default,n=t?_(t()):[];n.length;let{contentClass:r,labelClass:a,compitableColumn:o,labelPlacement:c,labelAlign:l,mergedSize:u,bordered:d,title:f,cssVars:p,mergedClsPrefix:m,separator:h,onRender:g}=this;g==null||g();let v=n.filter(e=>S(e)),b=v.reduce((e,t,n)=>{let s=t.props||{},l=v.length-1===n,u=[`label`in s?s.label:y(t,`label`)],f=[y(t)],p=s.span||1,g=e.span;e.span+=p;let _=s.labelStyle||s[`label-style`]||this.labelStyle,b=s.contentStyle||s[`content-style`]||this.contentStyle;if(c===`left`)d?e.row.push(i(`th`,{class:[`${m}-descriptions-table-header`,a],colspan:1,style:_},u),i(`td`,{class:[`${m}-descriptions-table-content`,r],colspan:l?(o-g)*2+1:p*2-1,style:b},f)):e.row.push(i(`td`,{class:`${m}-descriptions-table-content`,colspan:l?(o-g)*2:p*2},i(`span`,{class:[`${m}-descriptions-table-content__label`,a],style:_},[...u,h&&i(`span`,{class:`${m}-descriptions-separator`},h)]),i(`span`,{class:[`${m}-descriptions-table-content__content`,r],style:b},f)));else{let t=l?(o-g)*2:p*2;e.row.push(i(`th`,{class:[`${m}-descriptions-table-header`,a],colspan:t,style:_},u)),e.secondRow.push(i(`td`,{class:[`${m}-descriptions-table-content`,r],colspan:t,style:b},f))}return(e.span>=o||l)&&(e.span=0,e.row.length&&(e.rows.push(e.row),e.row=[]),c!==`left`&&e.secondRow.length&&(e.rows.push(e.secondRow),e.secondRow=[])),e},{span:0,row:[],secondRow:[],rows:[]}).rows.map(e=>i(`tr`,{class:`${m}-descriptions-table-row`},e));return i(`div`,{style:p,class:[`${m}-descriptions`,this.themeClass,`${m}-descriptions--${c}-label-placement`,`${m}-descriptions--${l}-label-align`,`${m}-descriptions--${u}-size`,d&&`${m}-descriptions--bordered`]},f||this.$slots.header?i(`div`,{class:`${m}-descriptions-header`},f||e(this,`header`)):null,i(`div`,{class:`${m}-descriptions-table-wrapper`},i(`table`,{class:`${m}-descriptions-table`},i(`tbody`,null,c===`top`&&i(`tr`,{class:`${m}-descriptions-table-row`,style:{visibility:`collapse`}},s(o*2,i(`td`,null))),b))))}}),w={label:String,span:{type:Number,default:1},labelClass:String,labelStyle:[Object,String],contentClass:String,contentStyle:[Object,String]},T=o({name:`DescriptionsItem`,[x]:!0,props:w,slots:Object,render(){return null}});export{C as n,T as t};