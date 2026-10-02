import{Bt as e,Ct as t,Et as n,Ht as r,Jt as i,Qt as a,Ut as o,Vt as s,_ as c,dn as l,en as u,ht as d,tn as f,v as p,w as m}from"./index-index-CU8LOYKL.js";import{n as h}from"./inputtext-CwmQAUFm.js";var g={name:`MinusIcon`,extends:p};function _(e){return x(e)||b(e)||y(e)||v()}function v(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function y(e,t){if(e){if(typeof e==`string`)return S(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}function b(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function x(e){if(Array.isArray(e))return S(e)}function S(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function C(t,n,r,s,c,l){return a(),o(`svg`,i({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},t.pti()),_(n[0]||(n[0]=[e(`path`,{d:`M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z`,fill:`currentColor`},null,-1)])),16)}g.render=C;var w=m.extend({name:`checkbox`,style:`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-checkbox p-component`,{"p-checkbox-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$pcCheckboxGroup?t.$pcCheckboxGroup.$invalid:t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-checkbox-sm p-inputfield-sm":n.size===`small`,"p-checkbox-lg p-inputfield-lg":n.size===`large`}]},box:`p-checkbox-box`,input:`p-checkbox-input`,icon:`p-checkbox-icon`}}),T={name:`BaseCheckbox`,extends:h,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:w,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function E(e){"@babel/helpers - typeof";return E=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},E(e)}function D(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=k(e,`string`);return E(t)==`symbol`?t:t+``}function k(e,t){if(E(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(E(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function A(e){return P(e)||N(e)||M(e)||j()}function j(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(e,t){if(e){if(typeof e==`string`)return F(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?F(e,t):void 0}}function N(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function P(e){if(Array.isArray(e))return F(e)}function F(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var I={name:`Checkbox`,extends:T,inheritAttrs:!1,emits:[`change`,`focus`,`blur`,`update:indeterminate`],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(e){this.d_indeterminate=e,this.updateIndeterminate()}},mounted:function(){this.updateIndeterminate()},updated:function(){this.updateIndeterminate()},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(e){var n=this;if(!this.disabled&&!this.readonly){var r=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,i=this.binary?this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?r.filter(function(e){return!t(e,n.value)}):r?[].concat(A(r),[this.value]):[this.value];this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit(`update:indeterminate`,this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(i,e):this.writeValue(i,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)},updateIndeterminate:function(){this.$refs.input&&(this.$refs.input.indeterminate=this.d_indeterminate)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var e=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?e===this.trueValue:n(this.value,e)},dataP:function(){return d(D({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant===`filled`},this.size,this.size))}},components:{CheckIcon:c,MinusIcon:g}},L=[`data-p-checked`,`data-p-indeterminate`,`data-p-disabled`,`data-p`],R=[`id`,`value`,`name`,`checked`,`tabindex`,`disabled`,`readonly`,`required`,`aria-labelledby`,`aria-label`,`aria-invalid`],z=[`data-p`];function B(t,n,c,d,p,m){var h=f(`CheckIcon`),g=f(`MinusIcon`);return a(),o(`div`,i({class:t.cx(`root`)},m.getPTOptions(`root`),{"data-p-checked":m.checked,"data-p-indeterminate":p.d_indeterminate||void 0,"data-p-disabled":t.disabled,"data-p":m.dataP}),[e(`input`,i({ref:`input`,id:t.inputId,type:`checkbox`,class:[t.cx(`input`),t.inputClass],style:t.inputStyle,value:t.value,name:m.groupName,checked:m.checked,tabindex:t.tabindex,disabled:t.disabled,readonly:t.readonly,required:t.required,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-invalid":t.invalid||void 0,onFocus:n[0]||(n[0]=function(){return m.onFocus&&m.onFocus.apply(m,arguments)}),onBlur:n[1]||(n[1]=function(){return m.onBlur&&m.onBlur.apply(m,arguments)}),onChange:n[2]||(n[2]=function(){return m.onChange&&m.onChange.apply(m,arguments)})},m.getPTOptions(`input`)),null,16,R),e(`div`,i({class:t.cx(`box`)},m.getPTOptions(`box`),{"data-p":m.dataP}),[u(t.$slots,`icon`,{checked:m.checked,indeterminate:p.d_indeterminate,class:l(t.cx(`icon`)),dataP:m.dataP},function(){return[m.checked?(a(),s(h,i({key:0,class:t.cx(`icon`)},m.getPTOptions(`icon`),{"data-p":m.dataP}),null,16,[`class`,`data-p`])):p.d_indeterminate?(a(),s(g,i({key:1,class:t.cx(`icon`)},m.getPTOptions(`icon`),{"data-p":m.dataP}),null,16,[`class`,`data-p`])):r(``,!0)]})],16,z)],16,L)}I.render=B;export{g as n,I as t};