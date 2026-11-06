import { setupStore } from '@fast-vue3/stores';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/themes';

import IduxCdk from '@idux/cdk';
import IduxComponents from '@idux/components';
import {
  addIconDefinitions,
  IDUX_ICON_DEPENDENCIES,
} from '@idux/components/icon';

import App from './App.vue';
import { setupRouter } from './router';

import '@idux/components/default.full.css';

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);
  app.use(IduxCdk);
  app.use(IduxComponents);
  addIconDefinitions(IDUX_ICON_DEPENDENCIES);

  const router = setupRouter(app);
  await router.isReady();

  app.mount('#app');
}

bootstrap();
