import{Bt as e,Dr as t,Ir as n,Pn as r,Pr as i,Vt as a,Xn as o,Zr as s,ar as c,at as l,it as u,l as d,nr as f,ot as p,ri as m,rr as h,sr as g,yr as _,yt as v}from"./index-index-Vl7atQja.js";var y=f([f(`@keyframes spin-rotate`,`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),h(`spin-container`,`
 position: relative;
 `,[h(`spin-body`,`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[u()])]),h(`spin-body`,`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),h(`spin`,`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[c(`rotate`,`
 animation: spin-rotate 2s linear infinite;
 `)]),h(`spin-description`,`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),h(`spin-content`,`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[c(`spinning`,`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),b={small:20,medium:18,large:16},x=i({name:`Spin`,props:Object.assign(Object.assign(Object.assign({},v.props),{contentClass:String,contentStyle:[Object,String],description:String,size:{type:[String,Number],default:`medium`},show:{type:Boolean,default:!0},rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),p),slots:Object,setup(n){let{mergedClsPrefixRef:i,inlineThemeDisabled:c}=a(n),l=v(`Spin`,`-spin`,y,d,n,i),u=t(()=>{let{size:e}=n,{common:{cubicBezierEaseInOut:t},self:r}=l.value,{opacitySpinning:i,color:a,textColor:s}=r;return{"--n-bezier":t,"--n-opacity-spinning":i,"--n-size":typeof e==`number`?o(e):r[g(`size`,e)],"--n-color":a,"--n-text-color":s}}),f=c?e(`spin`,t(()=>{let{size:e}=n;return typeof e==`number`?String(e):e[0]}),u,n):void 0,p=r(n,[`spinning`,`show`]),h=m(!1);return s(e=>{let t;if(p.value){let{delay:r}=n;if(r){t=window.setTimeout(()=>{h.value=!0},r),e(()=>{clearTimeout(t)});return}}h.value=p.value}),{mergedClsPrefix:i,active:h,mergedStrokeWidth:t(()=>{let{strokeWidth:e}=n;if(e!==void 0)return e;let{size:t}=n;return b[typeof t==`number`?`medium`:t]}),cssVars:c?void 0:u,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender}},render(){var e,t;let{$slots:r,mergedClsPrefix:i,description:a}=this,o=r.icon&&this.rotate,s=(a||r.description)&&n(`div`,{class:`${i}-spin-description`},a||((e=r.description)==null?void 0:e.call(r))),c=r.icon?n(`div`,{class:[`${i}-spin-body`,this.themeClass]},n(`div`,{class:[`${i}-spin`,o&&`${i}-spin--rotate`],style:r.default?``:this.cssVars},r.icon()),s):n(`div`,{class:[`${i}-spin-body`,this.themeClass]},n(l,{clsPrefix:i,style:r.default?``:this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,radius:this.radius,scale:this.scale,class:`${i}-spin`}),s);return(t=this.onRender)==null||t.call(this),r.default?n(`div`,{class:[`${i}-spin-container`,this.themeClass],style:this.cssVars},n(`div`,{class:[`${i}-spin-content`,this.active&&`${i}-spin-content--spinning`,this.contentClass],style:this.contentStyle},r),n(_,{name:`fade-in-transition`},{default:()=>this.active?c:null})):c}});export{x as t};