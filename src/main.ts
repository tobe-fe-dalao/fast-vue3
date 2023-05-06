import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';

import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';

// 支持SVG

import ElementPlus from 'element-plus'; // 引入Element Plus 所需
import 'element-plus/dist/index.css'; // 引入Element Plus 所需
import 'virtual:svg-icons-register';

//vue3的挂载方式
const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(piniaStore);
app.mount('#app');
