import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';

// import 'virtual:windi-base.css';
// import 'virtual:windi-components.css';
// import 'virtual:windi-utilities.css';

// 支持SVG
import 'virtual:svg-icons-register';

createApp(App).use(router).use(piniaStore).mount('#app');
