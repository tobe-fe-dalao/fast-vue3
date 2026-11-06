import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/site';
import '@fast-vue3/styles/themes';

import IduxCdk from '@idux/cdk';
import IduxComponents from '@idux/components';
import {
  addIconDefinitions,
  IDUX_ICON_DEPENDENCIES,
} from '@idux/components/icon';

import App from './App.vue';
import { vReveal } from './composables/reveal';
import { router } from './router';

import '@idux/components/default.full.css';

const app = createApp(App);
app.use(IduxCdk);
app.use(IduxComponents);
addIconDefinitions(IDUX_ICON_DEPENDENCIES);
app.directive('reveal', vReveal);
app.use(router);
router.isReady().then(() => app.mount('#app'));
