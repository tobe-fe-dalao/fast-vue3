import{d as _,o as i,f as w,S,g as m,h as V,c as F,p as B,i as b,b as t,u as k,j as E,k as q,r as h,E as L,l as N,m as R,q as U,t as j,a as s,w as a,s as D,v as A,x as M}from"./index.0db444bb.js";const T=_({__name:"index",setup(e){return(c,l)=>(i(),w(S,{name:"svg-github",size:"24",style:{"margin-right":"10px"}}))}});const z=m(T,[["__scopeId","data-v-cca7408f"]]),X="/assets/login-banner.426fb77f.png",G="/assets/qunerweima.f98dd09a.jpg",H="/assets/banner2.84a48f34.svg",J=_({setup(){return{carouselItem:V(()=>[{slogan:"Vue3+Vite2.X+TypeScript+...",subSlogan:"2022\u5E74\u6700\u65B0Vue\u6280\u672F\u6808\uFF0C\u6700\u5F3A\u914D\u7F6E",image:X},{slogan:"\u5F00\u7BB1\u5373\u7528\uFF0C\u591A\u79CD\u63D2\u4EF6\uFF0C\u52A8\u6001\u52A0\u8F7D",subSlogan:"\u53EF\u652F\u6301\u5927\u578B\u4E2D\u540E\u53F0\u5E94\u7528\u6216\u8F7B\u91CF\u7EA7\u65E0\u7EBF\u7AEF\u5E94\u7528",image:H},{slogan:"\u793E\u533A\u7EF4\u62A4\uFF0C\u6765\u829C\u6E56\u56DB\u6D77\u5927\u5382\u6838\u5FC3\u5927\u725B",subSlogan:"\u626B\u7801\u8FDB\u5165\u793E\u533A\u5FAE\u4FE1\u7FA4",image:G}])}}});const K=e=>(B("data-v-ace20908"),e=e(),b(),e),O={class:"banner"},P=K(()=>t("div",{class:"banner-inner"},null,-1)),Q=[P];function W(e,c,l,p,n,d){return i(),F("div",O,Q)}const Y=m(J,[["render",W],["__scopeId","data-v-ace20908"]]);const x=e=>(B("data-v-951d784f"),e=e(),b(),e),Z={class:"login-form-wrapper"},ee=x(()=>t("div",{class:"login-form-title"},"\u6B22\u8FCE\u767B\u5F55Fast-Vue3",-1)),se=x(()=>t("div",{class:"login-form-sub-title"},"\u4E00\u4E2A\u5F00\u7BB1\u5373\u7528\u7684Vue3+Vite+...\u6A21\u677F",-1)),ue={class:"login-form-error-msg"},te=D("\u767B\u5F55"),oe=D("\u91CD\u7F6E"),ne=_({__name:"login-form",setup(e){const c=k(),l=E(""),p=q(),n=h({username:"test",password:"test"}),d=E(),$=h({username:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"}],password:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"}]}),y=async o=>{console.log(o),o&&await o.validate(u=>{u?(A.success("\u6B22\u8FCE\u4F7F\u7528"),c.push("/"),p.info()):A.error("\u9519\u8BEF\u4FE1\u606F")})},C=o=>{!o||o.resetFields()};return(o,u)=>{const f=L,g=N,v=R,I=U;return i(),F("div",Z,[ee,se,t("div",ue,j(l.value),1),s(I,{ref_key:"ruleFormRef",ref:d,model:n,class:"login-form",layout:"vertical",rules:$},{default:a(()=>[s(g,{field:"username",rules:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"}],"validate-trigger":["change","blur"],"hide-label":""},{default:a(()=>[s(f,{modelValue:n.username,"onUpdate:modelValue":u[0]||(u[0]=r=>n.username=r),placeholder:"saodimangseng"},null,8,["modelValue"])]),_:1}),s(g,{field:"password",rules:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"}],"validate-trigger":["change","blur"],"hide-label":""},{default:a(()=>[s(f,{modelValue:n.password,"onUpdate:modelValue":u[1]||(u[1]=r=>n.password=r),placeholder:"\u5BC6\u7801\uFF1Asaodimangseng","allow-clear":""},null,8,["modelValue"])]),_:1}),s(g,null,{default:a(()=>[s(v,{type:"primary",onClick:u[2]||(u[2]=r=>y(d.value))},{default:a(()=>[te]),_:1}),s(v,{onClick:u[3]||(u[3]=r=>C(d.value))},{default:a(()=>[oe]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}});const ae=m(ne,[["__scopeId","data-v-951d784f"]]),re="/assets/logo.db578899.svg",ce={class:"container"},le={class:"logo"},de=["src"],_e={class:"content"},ie={class:"content-inner"},me={class:"footer"},pe=_({__name:"index",setup(e){return localStorage.getItem("theme")=="dark"?(document.documentElement.classList.add("dark"),document.body.setAttribute("arco-theme","dark")):(document.documentElement.classList.remove("dark"),document.body.removeAttribute("arco-theme")),(l,p)=>(i(),F("div",ce,[t("div",le,[t("img",{src:M(re),width:"240"},null,8,de)]),s(Y),t("div",_e,[t("div",ie,[s(ae)]),t("div",me,[s(z)])])]))}});const Fe=m(pe,[["__scopeId","data-v-fc1fce69"]]);export{Fe as default};