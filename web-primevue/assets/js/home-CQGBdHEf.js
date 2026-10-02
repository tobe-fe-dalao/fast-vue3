import{$t as e,Bt as t,Gt as n,Ht as r,Jt as i,Kt as a,Nt as o,Pt as s,Qt as c,Rt as l,Ut as u,Vt as d,Xt as f,an as p,d as m,en as h,ht as g,l as _,ln as v,mn as y,pn as b,qt as x,un as S,w as C,y as w}from"./index-index-CU8LOYKL.js";import{t as T}from"./card-CKTyxTNJ.js";import{t as E}from"./api-CzeHh0QK.js";var D=C.extend({name:`divider`,style:`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`,classes:{root:function(e){var t=e.props;return[`p-divider p-component`,`p-divider-`+t.layout,`p-divider-`+t.type,{"p-divider-left":t.layout===`horizontal`&&(!t.align||t.align===`left`)},{"p-divider-center":t.layout===`horizontal`&&t.align===`center`},{"p-divider-right":t.layout===`horizontal`&&t.align===`right`},{"p-divider-top":t.layout===`vertical`&&t.align===`top`},{"p-divider-center":t.layout===`vertical`&&(!t.align||t.align===`center`)},{"p-divider-bottom":t.layout===`vertical`&&t.align===`bottom`}]},content:`p-divider-content`},inlineStyles:{root:function(e){var t=e.props;return{justifyContent:t.layout===`horizontal`?t.align===`center`||t.align===null?`center`:t.align===`left`?`flex-start`:t.align===`right`?`flex-end`:null:null,alignItems:t.layout===`vertical`?t.align===`center`||t.align===null?`center`:t.align===`top`?`flex-start`:t.align===`bottom`?`flex-end`:null:null}}}}),O={name:`BaseDivider`,extends:w,props:{align:{type:String,default:null},layout:{type:String,default:`horizontal`},type:{type:String,default:`solid`}},style:D,provide:function(){return{$pcDivider:this,$parentInstance:this}}};function k(e){"@babel/helpers - typeof";return k=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},k(e)}function A(e,t,n){return(t=j(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e){var t=M(e,`string`);return k(t)==`symbol`?t:t+``}function M(e,t){if(k(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(k(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var N={name:`Divider`,extends:O,inheritAttrs:!1,computed:{dataP:function(){return g(A(A(A({},this.align,this.align),this.layout,this.layout),this.type,this.type))}}},P=[`aria-orientation`,`data-p`],F=[`data-p`];function I(e,t,n,a,o,s){return c(),u(`div`,i({class:e.cx(`root`),style:e.sx(`root`),role:`separator`,"aria-orientation":e.layout,"data-p":s.dataP},e.ptmi(`root`)),[e.$slots.default?(c(),u(`div`,i({key:0,class:e.cx(`content`),"data-p":s.dataP},e.ptm(`content`)),[h(e.$slots,`default`)],16,F)):r(``,!0)],16,P)}N.render=I;var L={key:0,role:`alert`},R={style:{padding:`24px`,"margin-bottom":`24px`}},z={style:{display:`grid`,"grid-template-columns":`repeat(4, 1fr)`,gap:`16px`,"margin-bottom":`24px`}},B={style:{"text-align":`center`}},V={style:{"margin-top":`8px`,color:`#666`}},H={style:{display:`grid`,"grid-template-columns":`repeat(3, 1fr)`,gap:`16px`}},U={style:{"font-size":`32px`}},W={style:{"margin-top":`8px`}},G={style:{display:`flex`,"flex-wrap":`wrap`,gap:`8px`}},K=x({__name:`index`,setup(i){let h=m(),g=[{label:`总用户`,value:`12,480`,color:`#3B82F6`},{label:`今日访问`,value:`3,256`,color:`#22C55E`},{label:`活跃应用`,value:`5`,color:`#722ed1`},{label:`系统正常率`,value:`99.9%`,color:`#F59E0B`}],x=[{emoji:`📊`,label:`仪表盘`,path:`/dashboard`},{emoji:`👥`,label:`用户管理`,path:`/user`},{emoji:`🧩`,label:`组件展示`,path:`/components`},{emoji:`👤`,label:`个人中心`,path:`/profile`},{emoji:`⚙️`,label:`系统设置`,path:`/settings`},{emoji:`📖`,label:`关于项目`,path:`/about`}],C=[{label:`Vue 3.5`,severity:`success`},{label:`PrimeVue`,severity:`info`},{label:`Vite 8`,severity:`warn`},{label:`TypeScript 6`,severity:void 0},{label:`Pinia 3`,severity:`danger`},{label:`Vue Router 4`,severity:`success`}],w=v(g),D=v(``);return f(s(function*(){try{let e=yield E.analytics.dashboardStats(),t=[e.totalUsers,e.todayVisits,e.activeUsers,e.systemUptime],n=[`总用户`,`今日访问`,`活跃用户`,`系统正常率`];w.value=g.map((e,r)=>{var i,a;return o(o({},e),{},{label:(i=n[r])==null?`统计`:i,value:r===3?`${t[r]}%`:((a=t[r])==null?0:a).toLocaleString()})})}catch(e){D.value=`首页统计暂时无法更新，当前显示内置示例`}})),(i,o)=>{let s=N,f=T,m=_;return c(),u(l,null,[S(D)?(c(),u(`p`,L,y(S(D)),1)):r(``,!0),t(`div`,R,[o[2]||(o[2]=t(`h2`,{style:{"margin-bottom":`8px`}},`欢迎回来`,-1)),o[3]||(o[3]=t(`p`,{style:{"margin-bottom":`16px`,color:`#888`}},` 基于 Monorepo 工程平台，集成五大 UI 生态的 Vue3 管理后台模板 `,-1)),a(s),t(`div`,z,[(c(!0),u(l,null,e(S(w),e=>(c(),d(f,{key:e.label,style:b([{"border-left":`4px solid`},{borderLeftColor:e.color}])},{content:p(()=>[t(`div`,B,[t(`div`,{style:b({color:e.color,fontSize:`28px`,fontWeight:`bold`})},y(e.value),5),t(`div`,V,y(e.label),1)])]),_:2},1032,[`style`]))),128))]),a(f,null,{title:p(()=>[...o[0]||(o[0]=[n(`快捷操作`,-1)])]),content:p(()=>[t(`div`,H,[(c(),u(l,null,e(x,e=>a(f,{key:e.label,style:{"text-align":`center`,cursor:`pointer`},onClick:t=>S(h).push(e.path)},{content:p(()=>[t(`div`,U,y(e.emoji),1),t(`div`,W,y(e.label),1)]),_:2},1032,[`onClick`])),64))])]),_:1}),a(f,{style:{"margin-top":`24px`}},{title:p(()=>[...o[1]||(o[1]=[n(`技术栈`,-1)])]),content:p(()=>[t(`div`,G,[(c(),u(l,null,e(C,e=>a(m,{key:e.label,value:e.label,severity:e.severity},null,8,[`value`,`severity`])),64))])]),_:1})])],64)}}});export{K as default};