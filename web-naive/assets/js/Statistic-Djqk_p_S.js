import{Bt as e,Dr as t,Ir as n,Pr as r,St as i,Vt as a,Yt as o,c as s,ir as c,rr as l,yt as u}from"./index-index-Vl7atQja.js";var d=l(`statistic`,[c(`label`,`
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `),l(`statistic-value`,`
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `,[c(`prefix`,`
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `,[l(`icon`,{verticalAlign:`-0.125em`})]),c(`content`,`
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `),c(`suffix`,`
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `,[l(`icon`,{verticalAlign:`-0.125em`})])])]),f=r({name:`Statistic`,props:Object.assign(Object.assign({},u.props),{tabularNums:Boolean,label:String,value:[String,Number]}),slots:Object,setup(n){let{mergedClsPrefixRef:r,inlineThemeDisabled:o,mergedRtlRef:c}=a(n),l=u(`Statistic`,`-statistic`,d,s,n,r),f=i(`Statistic`,c,r),p=t(()=>{let{self:{labelFontWeight:e,valueFontSize:t,valueFontWeight:n,valuePrefixTextColor:r,labelTextColor:i,valueSuffixTextColor:a,valueTextColor:o,labelFontSize:s},common:{cubicBezierEaseInOut:c}}=l.value;return{"--n-bezier":c,"--n-label-font-size":s,"--n-label-font-weight":e,"--n-label-text-color":i,"--n-value-font-weight":n,"--n-value-font-size":t,"--n-value-prefix-text-color":r,"--n-value-suffix-text-color":a,"--n-value-text-color":o}}),m=o?e(`statistic`,void 0,p,n):void 0;return{rtlEnabled:f,mergedClsPrefix:r,cssVars:o?void 0:p,themeClass:m==null?void 0:m.themeClass,onRender:m==null?void 0:m.onRender}},render(){var e;let{mergedClsPrefix:t,$slots:{default:r,label:i,prefix:a,suffix:s}}=this;return(e=this.onRender)==null||e.call(this),n(`div`,{class:[`${t}-statistic`,this.themeClass,this.rtlEnabled&&`${t}-statistic--rtl`],style:this.cssVars},o(i,e=>n(`div`,{class:`${t}-statistic__label`},this.label||e)),n(`div`,{class:`${t}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?`tabular-nums`:``}},o(a,e=>e&&n(`span`,{class:`${t}-statistic-value__prefix`},e)),this.value===void 0?o(r,e=>e&&n(`span`,{class:`${t}-statistic-value__content`},e)):n(`span`,{class:`${t}-statistic-value__content`},this.value),o(s,e=>e&&n(`span`,{class:`${t}-statistic-value__suffix`},e))))}});export{f as t};