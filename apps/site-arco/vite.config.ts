import { defineConfig } from '@fast-vue3/vite-config';

import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => {
  return {
    vite: {
      optimizeDeps: {
        // The resolver injects these imports after the initial dependency scan.
        include: ['@arco-design/web-vue/es/*/style/css.js'],
      },
    },
    application: {
      uiResolvers: [ArcoResolver({ sideEffect: true })],
    },
  };
});
