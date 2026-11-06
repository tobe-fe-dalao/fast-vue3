import { defineConfig } from '@fast-vue3/vite-config';

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [ElementPlusResolver({ importStyle: false })],
    },
  };
});
