import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      optimizeDeps: {
        // OpenVue is ESM and the resolver can introduce new subpaths on navigation.
        exclude: ['openvue'],
      },
    },
    application: {},
  };
});
