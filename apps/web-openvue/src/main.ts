import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import { definePreset, palette } from '@openvue/themes';
import Aura from '@openvue/themes/aura';
import OpenVue from 'openvue/config';
import ConfirmationService from 'openvue/confirmationservice';
import ToastService from 'openvue/toastservice';

import App from './App.vue';
import zhCN from './locale/zh-CN';
import { setupRouter } from './router';

import 'primeicons/primeicons.css';

const theme = definePreset(Aura, {
  semantic: { primary: palette('{blue}') },
});

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  app.use(OpenVue, {
    locale: zhCN,
    theme: {
      preset: theme,
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
