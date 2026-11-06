import '@fast-vue3/styles/global';
import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/site';
import '@fast-vue3/styles/themes';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import { router } from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

router.isReady().then(() => app.mount('#app'));
