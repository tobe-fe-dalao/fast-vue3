import{_ as p,u as f,w as b,B as $}from"./base-DbvRI_mB.js";import{H as B}from"./index-CbSz96Kp.js";import C from"./layout-C8WCyJOa.js";import H from"./main-CkCoIu0F.js";import{d as n,a2 as k,g as v,c as i,o as _,i as m,n as h,u as o,Z as g,a as l,a0 as d,a1 as N}from"./index-spk0dfYj.js";import"./el-popper-B2JnIm-O.js";import"./el-button-ClgHlyZV.js";import"./index-YU3Gfoup.js";import"./subAside.vue_vue_type_script_setup_true_lang-BZi89UPe.js";import"./typescript-QNWfR3u7.js";import"./vnode-BlvdYoaY.js";const V=n({name:"ElContainer"}),M=n({...V,props:{direction:{type:String}},setup(a){const t=a,e=k(),s=f("container"),r=v(()=>t.direction==="vertical"?!0:t.direction==="horizontal"?!1:e&&e.default?e.default().some(u=>{const y=u.type.name;return y==="ElHeader"||y==="ElFooter"}):!1);return(c,u)=>(_(),i("section",{class:h([o(s).b(),o(s).is("vertical",o(r))])},[m(c.$slots,"default")],2))}});var z=p(M,[["__file","container.vue"]]);const A=n({name:"ElAside"}),F=n({...A,props:{width:{type:String,default:null}},setup(a){const t=a,e=f("aside"),s=v(()=>t.width?e.cssVarBlock({width:t.width}):{});return(r,c)=>(_(),i("aside",{class:h(o(e).b()),style:g(o(s))},[m(r.$slots,"default")],6))}});var E=p(F,[["__file","aside.vue"]]);const I=n({name:"ElFooter"}),L=n({...I,props:{height:{type:String,default:null}},setup(a){const t=a,e=f("footer"),s=v(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,c)=>(_(),i("footer",{class:h(o(e).b()),style:g(o(s))},[m(r.$slots,"default")],6))}});var w=p(L,[["__file","footer.vue"]]);const Z=n({name:"ElHeader"}),j=n({...Z,props:{height:{type:String,default:null}},setup(a){const t=a,e=f("header"),s=v(()=>t.height?e.cssVarBlock({height:t.height}):{});return(r,c)=>(_(),i("header",{class:h(o(e).b()),style:g(o(s))},[m(r.$slots,"default")],6))}});var x=p(j,[["__file","header.vue"]]);const q=n({name:"ElMain"}),D=n({...q,setup(a){const t=f("main");return(e,s)=>(_(),i("main",{class:h(o(t).b())},[m(e.$slots,"default")],2))}});var S=p(D,[["__file","main.vue"]]);const G=b(z,{Aside:E,Footer:w,Header:x,Main:S}),J=$(E);$(w);const K=$(x),O=$(S),P={class:"common-layout"},Q=n({__name:"index",setup(a){return(t,e)=>{const s=J,r=K,c=O,u=G;return _(),i("div",P,[l(u,null,{default:d(()=>[l(s,{width:"180px"},{default:d(()=>[l(C)]),_:1}),l(u,null,{default:d(()=>[l(r,null,{default:d(()=>[l(B)]),_:1}),l(c,null,{default:d(()=>[l(H)]),_:1})]),_:1})]),_:1})])}}}),ae=N(Q,[["__scopeId","data-v-790e4cfb"]]);export{ae as default};
