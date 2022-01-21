/*
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:19:27
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 18:06:05
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import './index.css'
import ArcoVue from '@arco-design/web-vue';
// 支持markdown 语法高亮
import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'
// 支持SVG
import 'virtual:svg-icons-register';

createApp(App).use(router).use(ArcoVue).use(piniaStore).mount('#app');
