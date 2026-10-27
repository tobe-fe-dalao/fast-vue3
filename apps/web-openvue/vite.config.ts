import { defineConfig } from '@fast-vue3/vite-config';

import { PrimeVueResolver } from '@openvue/auto-import-resolver';

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [PrimeVueResolver()],
      uiAutoImportResolvers: [],
    },
  };
});
