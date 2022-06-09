import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import './index.css'
//改为element-plus默认UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 支持SVG
import 'virtual:svg-icons-register'
createApp(App).use(router).use(ElementPlus).use(piniaStore).mount('#app')
