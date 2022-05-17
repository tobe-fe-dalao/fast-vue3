import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 支持SVG
import 'virtual:svg-icons-register'
createApp(App).use(router).use().use(piniaStore).mount('#app')
