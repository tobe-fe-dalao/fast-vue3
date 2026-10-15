import type { Pinia } from 'pinia';

import type { App } from 'vue';

import { onSessionExpired } from '@fast-vue3/utils';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { useUserStore } from './modules/user';

let _pinia: Pinia;

export function setupStore(app: App): Pinia {
  _pinia = createPinia();
  _pinia.use(piniaPluginPersistedstate);
  app.use(_pinia);
  const userStore = useUserStore(_pinia);
  userStore.$persist();
  const stop = onSessionExpired(() => userStore.logout());
  app.onUnmount(stop);
  return _pinia;
}

export function getPinia(): Pinia {
  return _pinia;
}
