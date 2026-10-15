import { defineConfig } from 'playwright/test';

import demoConfig from './playwright.config';

export default defineConfig({
  ...demoConfig,
  testMatch: 'http.spec.ts',
  outputDir: 'test-results/http',
  use: { ...demoConfig.use, baseURL: 'http://127.0.0.1:4177' },
  webServer: [
    {
      command:
        'pnpm --filter @fast-vue3/web-antd exec vite preview --outDir ../../dist/e2e-http/web-antd --host 127.0.0.1 --port 4177 --strictPort',
      url: 'http://127.0.0.1:4177',
      reuseExistingServer: false,
    },
    {
      command:
        'pnpm --filter @fast-vue3/site-antd exec vite preview --outDir ../../dist/e2e-http/site-antd --host 127.0.0.1 --port 4178 --strictPort',
      url: 'http://127.0.0.1:4178',
      reuseExistingServer: false,
    },
  ],
});
