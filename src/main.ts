import { createApp } from 'vue';
// import App from './App.vue';
import App from './App.vue';
import { nutuiComponents } from './plugins/nutUI';
// import { i18n } from './i18n';
import router from './router';
// import store from './store';

const app = createApp(App);
app.use(router);
// app.use(store);
// app.use(i18n);
app.mount('#app');

nutuiComponents.forEach((item) => {
  app.use(item);
});
