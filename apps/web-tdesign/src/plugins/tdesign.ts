import type { App } from 'vue';

import { watch } from 'vue';

import { usePreferences } from '@fast-vue3/preferences';

export function setupTDesign(app: App) {
  const prefs = usePreferences();
  const stop = watch(
    () => prefs.isDark,
    (dark) => {
      document.documentElement.setAttribute(
        'theme-mode',
        dark ? 'dark' : 'light',
      );
    },
    { immediate: true },
  );
  app.onUnmount(stop);
}
