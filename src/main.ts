import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';

// 支持SVG
import 'virtual:svg-icons-register';

import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);

app.use(router);
app.use(piniaStore);
app.mount('#app');
