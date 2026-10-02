import{Bt as e,Ct as t,Jt as n,Qt as r,Ut as i,ht as a,w as o}from"./index-index-CU8LOYKL.js";import{n as s}from"./inputtext-CwmQAUFm.js";var c=o.extend({name:`radiobutton`,style:`
    .p-radiobutton {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
    }

    .p-radiobutton-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .p-radiobutton-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid dt('radiobutton.border.color');
        background: dt('radiobutton.background');
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
        transition:
            background dt('radiobutton.transition.duration'),
            color dt('radiobutton.transition.duration'),
            border-color dt('radiobutton.transition.duration'),
            box-shadow dt('radiobutton.transition.duration'),
            outline-color dt('radiobutton.transition.duration');
        outline-color: transparent;
        box-shadow: dt('radiobutton.shadow');
    }

    .p-radiobutton-icon {
        transition-duration: dt('radiobutton.transition.duration');
        background: transparent;
        font-size: dt('radiobutton.icon.size');
        width: dt('radiobutton.icon.size');
        height: dt('radiobutton.icon.size');
        border-radius: 50%;
        backface-visibility: hidden;
        transform: translateZ(0) scale(0.1);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.hover.border.color');
    }

    .p-radiobutton-checked .p-radiobutton-box {
        border-color: dt('radiobutton.checked.border.color');
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.color');
        transform: translateZ(0) scale(1, 1);
        visibility: visible;
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.hover.border.color');
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.hover.color');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.focus.border.color');
        box-shadow: dt('radiobutton.focus.ring.shadow');
        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');
        outline-offset: dt('radiobutton.focus.ring.offset');
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.focus.border.color');
    }

    .p-radiobutton.p-invalid > .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }

    .p-radiobutton.p-variant-filled .p-radiobutton-box {
        background: dt('radiobutton.filled.background');
    }

    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton.p-disabled {
        opacity: 1;
    }

    .p-radiobutton.p-disabled .p-radiobutton-box {
        background: dt('radiobutton.disabled.background');
        border-color: dt('radiobutton.checked.disabled.border.color');
    }

    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.disabled.color');
    }

    .p-radiobutton-sm,
    .p-radiobutton-sm .p-radiobutton-box {
        width: dt('radiobutton.sm.width');
        height: dt('radiobutton.sm.height');
    }

    .p-radiobutton-sm .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.sm.size');
        width: dt('radiobutton.icon.sm.size');
        height: dt('radiobutton.icon.sm.size');
    }

    .p-radiobutton-lg,
    .p-radiobutton-lg .p-radiobutton-box {
        width: dt('radiobutton.lg.width');
        height: dt('radiobutton.lg.height');
    }

    .p-radiobutton-lg .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.lg.size');
        width: dt('radiobutton.icon.lg.size');
        height: dt('radiobutton.icon.lg.size');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-radiobutton p-component`,{"p-radiobutton-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$pcRadioButtonGroup?t.$pcRadioButtonGroup.$invalid:t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-radiobutton-sm p-inputfield-sm":n.size===`small`,"p-radiobutton-lg p-inputfield-lg":n.size===`large`}]},box:`p-radiobutton-box`,input:`p-radiobutton-input`,icon:`p-radiobutton-icon`}}),l={name:`BaseRadioButton`,extends:s,props:{value:null,binary:Boolean,readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:c,provide:function(){return{$pcRadioButton:this,$parentInstance:this}}};function u(e){"@babel/helpers - typeof";return u=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},u(e)}function d(e,t,n){return(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){var t=p(e,`string`);return u(t)==`symbol`?t:t+``}function p(e,t){if(u(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(u(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var m={name:`RadioButton`,extends:l,inheritAttrs:!1,emits:[`change`,`focus`,`blur`],inject:{$pcRadioButtonGroup:{default:void 0}},methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var t=this.binary?!this.checked:this.value;this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.writeValue(t,e):this.writeValue(t,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{groupName:function(){return this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.groupName:this.$formName},checked:function(){var e=this.$pcRadioButtonGroup?this.$pcRadioButtonGroup.d_value:this.d_value;return e!=null&&(this.binary?!!e:t(e,this.value))},dataP:function(){return a(d({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant===`filled`},this.size,this.size))}}},h=[`data-p-checked`,`data-p-disabled`,`data-p`],g=[`id`,`value`,`name`,`checked`,`tabindex`,`disabled`,`readonly`,`aria-labelledby`,`aria-label`,`aria-invalid`],_=[`data-p`],v=[`data-p`];function y(t,a,o,s,c,l){return r(),i(`div`,n({class:t.cx(`root`)},l.getPTOptions(`root`),{"data-p-checked":l.checked,"data-p-disabled":t.disabled,"data-p":l.dataP}),[e(`input`,n({id:t.inputId,type:`radio`,class:[t.cx(`input`),t.inputClass],style:t.inputStyle,value:t.value,name:l.groupName,checked:l.checked,tabindex:t.tabindex,disabled:t.disabled,readonly:t.readonly,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-invalid":t.invalid||void 0,onFocus:a[0]||(a[0]=function(){return l.onFocus&&l.onFocus.apply(l,arguments)}),onBlur:a[1]||(a[1]=function(){return l.onBlur&&l.onBlur.apply(l,arguments)}),onChange:a[2]||(a[2]=function(){return l.onChange&&l.onChange.apply(l,arguments)})},l.getPTOptions(`input`)),null,16,g),e(`div`,n({class:t.cx(`box`)},l.getPTOptions(`box`),{"data-p":l.dataP}),[e(`div`,n({class:t.cx(`icon`)},l.getPTOptions(`icon`),{"data-p":l.dataP}),null,16,v)],16,_)],16,h)}m.render=y;export{m as t};