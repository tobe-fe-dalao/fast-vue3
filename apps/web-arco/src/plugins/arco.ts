import type { App } from 'vue';

import { usePreferences } from '@fast-vue3/preferences';

export function setupArco(app: App) {
  // Arco Design 通过 unplugin-vue-components + ArcoResolver 自动按需引入
  // Arco's component variables are scoped to body[arco-theme='dark'].
  const { isDark } = storeToRefs(usePreferences());

  const applyArcoTheme = (dark: boolean) => {
    document.body.setAttribute('arco-theme', dark ? 'dark' : 'light');
  };

  const stop = watch(isDark, applyArcoTheme, { immediate: true });
  app.onUnmount(stop);
}
