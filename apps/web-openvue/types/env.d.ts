// / <reference types="vite/client" />
// / <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAMESPACE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_APP_API_BASEURL: string;
  readonly VITE_COMPRESS: string;
  readonly VITE_DEV_BACKEND: 'mock' | 'server';
  readonly VITE_FAST_VUE3_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
