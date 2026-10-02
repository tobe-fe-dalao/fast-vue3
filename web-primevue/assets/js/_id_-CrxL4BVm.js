import{$t as e,Bt as t,Gt as n,Ht as ee,Jt as r,Kt as i,Pt as a,Qt as o,Rt as s,Ut as c,Vt as l,Xt as te,an as u,d,f,l as p,ln as m,mn as h,p as g,pn as _,qt as v,r as y,u as ne,un as b,w as x,x as re,y as S,zt as ie}from"./index-index-CU8LOYKL.js";import{t as C}from"./card-CKTyxTNJ.js";import{i as w,t as T}from"./datatable-B4cNdTCD.js";import{t as E}from"./button-FQ-nKxNp.js";import{t as D}from"./http-D_XHyKlR.js";var O=x.extend({name:`progressspinner`,style:`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`,classes:{root:`p-progressspinner`,spin:`p-progressspinner-spin`,circle:`p-progressspinner-circle`}}),k={name:`ProgressSpinner`,extends:{name:`BaseProgressSpinner`,extends:S,props:{strokeWidth:{type:String,default:`2`},fill:{type:String,default:`none`},animationDuration:{type:String,default:`2s`}},style:O,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},A=[`fill`,`stroke-width`];function j(e,n,ee,i,a,s){return o(),c(`div`,r({class:e.cx(`root`),role:`progressbar`},e.ptmi(`root`)),[(o(),c(`svg`,r({class:e.cx(`spin`),viewBox:`25 25 50 50`,style:s.svgStyle},e.ptm(`spin`)),[t(`circle`,r({class:e.cx(`circle`),cx:`50`,cy:`50`,r:`20`,fill:e.fill,"stroke-width":e.strokeWidth,strokeMiterlimit:`10`},e.ptm(`circle`)),null,16,A)],16))],16)}k.render=j;var M={class:`admin-page`},N={style:{display:`flex`,"align-items":`center`,"justify-content":`space-between`,"margin-bottom":`16px`}},P={class:`mb-4`,style:{display:`flex`,gap:`12px`,"align-items":`center`}},F={style:{display:`flex`,gap:`8px`}},I={key:1,style:{display:`flex`,"flex-direction":`column`,"align-items":`center`,"justify-content":`center`,padding:`80px 0`,color:`#9ca3af`}},L={key:2,style:{display:`flex`,"flex-wrap":`wrap`,gap:`16px`,"align-items":`flex-start`}},R={style:{flex:`1 1 60%`,"min-width":`320px`}},z={class:`info-grid`},B={class:`info-row`},V={class:`info-value`},H={class:`info-row`},U={class:`info-value`},W={class:`info-row`},G={class:`info-value`},K={class:`info-row`},q={class:`info-value`},J={class:`info-row`},Y={class:`info-value`},ae={class:`info-row`},oe={class:`info-value`},se={class:`info-row`},ce={class:`info-value`},le={class:`info-row`},ue={class:`info-value`},de={style:{flex:`1 1 30%`,"min-width":`260px`}},fe={style:{display:`flex`,"flex-direction":`column`,gap:`12px`,"align-items":`center`}},pe={style:{"text-align":`center`}},me={style:{"font-size":`18px`,"font-weight":`700`}},he={style:{"font-size":`14px`,color:`#6b7280`}},ge={style:{display:`flex`,"flex-wrap":`wrap`,gap:`6px`}},_e={style:{display:`flex`,"align-items":`center`,"justify-content":`space-between`,padding:`6px 0`}},ve={style:{display:`flex`,"align-items":`center`,"justify-content":`space-between`,padding:`6px 0`}},ye={style:{display:`flex`,"align-items":`center`,"justify-content":`space-between`,padding:`6px 0`}},X=f(v({__name:`[id]`,setup(r){let f=ne(),v=d(),x=re(),S=m(!0),O=m(null),A=m([]),j=[{label:`管理员`,value:`admin`},{label:`编辑者`,value:`editor`},{label:`普通用户`,value:`user`},{label:`访客`,value:`guest`}],X={admin:`info`,editor:`success`,user:`secondary`,guest:`warn`},be=e=>{var t,n;return(t=(n=j.find(t=>t.value===e))==null?void 0:n.label)==null?e:t},Z=ie(()=>{var e;return((e=O.value)==null?void 0:e.status)===`active`});function xe(){return Q.apply(this,arguments)}function Q(){return Q=a(function*(){S.value=!0;try{let e=Number(f.params.id),t=yield D.get({url:`/users/${e}`});O.value=t,t&&(A.value=[{time:t.createdAt,action:`创建账户`,ip:`127.0.0.1`},{time:`2026-08-10 09:24:11`,action:`登录系统`,ip:`192.168.1.20`},{time:`2026-08-09 14:02:33`,action:`修改个人资料`,ip:`192.168.1.20`},{time:`2026-08-08 21:45:09`,action:`切换角色权限`,ip:`10.0.0.5`}])}catch(e){x.add({severity:`error`,summary:`错误`,detail:`加载用户详情失败`})}finally{S.value=!1}}),Q.apply(this,arguments)}function Se(){v.push(`/system/user`)}function Ce(){v.push(`/system/user`),x.add({severity:`info`,summary:`提示`,detail:`请在用户列表中点击「编辑」`})}function we(){return $.apply(this,arguments)}function $(){return $=a(function*(){if(!O.value)return;let e=Z.value?`disabled`:`active`;try{yield D.put({data:{status:e},url:`/users/${O.value.id}`}),O.value.status=e,x.add({severity:`success`,summary:`成功`,detail:`已${e===`active`?`启用`:`禁用`}该用户`})}catch(e){x.add({severity:`error`,summary:`错误`,detail:`状态更新失败`})}}),$.apply(this,arguments)}let Te=[{field:`time`,header:`操作时间`,style:{width:`180px`}},{field:`action`,header:`操作内容`},{field:`ip`,header:`IP 地址`,style:{width:`140px`}}];return te(xe),(r,a)=>(o(),c(`div`,M,[i(b(g)),t(`div`,N,[t(`div`,P,[i(b(E),{icon:`pi pi-arrow-left`,text:``,rounded:``,"aria-label":`返回`,onClick:Se})]),t(`div`,F,[i(b(E),{label:`编辑`,icon:`pi pi-pencil`,onClick:Ce}),b(O)?(o(),l(b(E),{key:0,label:b(Z)?`禁用`:`启用`,icon:b(Z)?`pi pi-ban`:`pi pi-check-circle`,severity:b(Z)?`danger`:`secondary`,onClick:we},null,8,[`label`,`icon`,`severity`])):ee(``,!0)])]),b(S)?(o(),l(b(k),{key:0,style:{display:`block`,width:`50px`,height:`50px`,margin:`80px auto`},"stroke-width":`4`})):b(O)?(o(),c(`div`,L,[t(`div`,R,[i(b(C),{style:{"margin-bottom":`16px`}},{title:u(()=>[...a[1]||(a[1]=[n(`基本信息`,-1)])]),content:u(()=>[t(`div`,z,[t(`div`,B,[a[2]||(a[2]=t(`span`,{class:`info-label`},`用户 ID`,-1)),t(`span`,V,h(b(O).id),1)]),t(`div`,H,[a[3]||(a[3]=t(`span`,{class:`info-label`},`用户名`,-1)),t(`span`,U,h(b(O).username),1)]),t(`div`,W,[a[4]||(a[4]=t(`span`,{class:`info-label`},`姓名`,-1)),t(`span`,G,h(b(O).realName),1)]),t(`div`,K,[a[5]||(a[5]=t(`span`,{class:`info-label`},`部门`,-1)),t(`span`,q,h(b(O).department),1)]),t(`div`,J,[a[6]||(a[6]=t(`span`,{class:`info-label`},`邮箱`,-1)),t(`span`,Y,h(b(O).email),1)]),t(`div`,ae,[a[7]||(a[7]=t(`span`,{class:`info-label`},`手机号`,-1)),t(`span`,oe,h(b(O).phone),1)]),t(`div`,se,[a[8]||(a[8]=t(`span`,{class:`info-label`},`注册时间`,-1)),t(`span`,ce,h(b(O).createdAt),1)]),t(`div`,le,[a[9]||(a[9]=t(`span`,{class:`info-label`},`状态`,-1)),t(`span`,ue,[i(b(p),{value:b(Z)?`启用`:`禁用`,severity:b(Z)?`success`:`secondary`},null,8,[`value`,`severity`])])])])]),_:1}),i(b(C),null,{title:u(()=>[...a[10]||(a[10]=[n(`最近活动`,-1)])]),content:u(()=>[i(b(T),{value:b(A),"data-key":`time`,size:`small`,"striped-rows":``},{default:u(()=>[(o(),c(s,null,e(Te,e=>i(b(w),{key:e.field,field:e.field,header:e.header,style:_(e.style)},null,8,[`field`,`header`,`style`])),64))]),_:1},8,[`value`])]),_:1})]),t(`div`,de,[i(b(C),{style:{"margin-bottom":`16px`}},{content:u(()=>{var e;return[t(`div`,fe,[i(b(y),{label:(e=b(O).realName)==null||(e=e.charAt(0))==null?void 0:e.toUpperCase(),style:{width:`72px`,height:`72px`,"font-size":`28px`,color:`#fff`,background:`#3b82f6`}},null,8,[`label`]),t(`div`,pe,[t(`div`,me,h(b(O).realName),1),t(`div`,he,` @`+h(b(O).username),1)])])]}),_:1}),i(b(C),{style:{"margin-bottom":`16px`}},{title:u(()=>[...a[11]||(a[11]=[n(`角色与权限`,-1)])]),content:u(()=>[a[12]||(a[12]=t(`div`,{style:{"margin-bottom":`8px`,"font-size":`14px`,color:`#9ca3af`}},` 当前用户所属角色 `,-1)),t(`div`,ge,[(o(!0),c(s,null,e(b(O).roles,e=>{var t;return o(),l(b(p),{key:e,value:be(e),severity:(t=X[e])==null?`secondary`:t},null,8,[`value`,`severity`])}),128))])]),_:1}),i(b(C),null,{title:u(()=>[...a[13]||(a[13]=[n(`账户状态`,-1)])]),content:u(()=>[t(`div`,_e,[a[14]||(a[14]=t(`span`,{style:{"font-size":`14px`,color:`#9ca3af`}},`登录状态`,-1)),i(b(p),{value:`在线`,severity:`success`})]),t(`div`,ve,[a[15]||(a[15]=t(`span`,{style:{"font-size":`14px`,color:`#9ca3af`}},`账户状态`,-1)),i(b(p),{value:b(Z)?`正常`:`已禁用`,severity:b(Z)?`success`:`secondary`},null,8,[`value`,`severity`])]),t(`div`,ye,[a[16]||(a[16]=t(`span`,{style:{"font-size":`14px`,color:`#9ca3af`}},`双因素认证`,-1)),i(b(p),{value:`未开启`,severity:`warn`})])]),_:1})])])):(o(),c(`div`,I,[...a[0]||(a[0]=[t(`i`,{class:`pi pi-user`,style:{"margin-bottom":`12px`,"font-size":`48px`,opacity:`0.4`}},null,-1),t(`div`,{style:{"font-size":`14px`}},`未找到该用户`,-1)])]))]))}}),[[`__scopeId`,`data-v-7a2279f3`]]);export{X as default};