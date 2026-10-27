import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import Aura from '@openvue/themes/aura';
import PrimeVue from 'openvue/config';
import ConfirmationService from 'openvue/confirmationservice';
import ToastService from 'openvue/toastservice';

import App from './App.vue';
import zhCN from './locale/zh-CN';
import { setupRouter } from './router';

import 'primeicons/primeicons.css';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  app.use(PrimeVue, {
    locale: zhCN,
    theme: {
      preset: Aura,
      options: { darkModeSelector: '.dark' },
    },
  });
  app.use(ToastService);
  app.use(ConfirmationService);

  const router = setupRouter(app);
  await router.isReady();

  app.mount('#app');
}

bootstrap();
