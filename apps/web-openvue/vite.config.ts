import { defineConfig } from '@fast-vue3/vite-config';

import { PrimeVueResolver } from '@openvue/auto-import-resolver';

export default defineConfig(async () => {
  return {
    vite: {
      optimizeDeps: {
        // OpenVue is ESM and the resolver can introduce new subpaths on navigation.
        exclude: ['openvue'],
      },
    },
    application: {
      uiResolvers: [PrimeVueResolver()],
      uiAutoImportResolvers: [],
    },
  };
});
