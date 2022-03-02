import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

import './less/index.less';
import './less/home.less';

new Vue({
  render: h => h(App),
}).$mount('#app')
