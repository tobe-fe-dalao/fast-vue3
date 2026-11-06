import type { PlaywrightTestConfig } from 'playwright/test';

import { env } from 'node:process';

import { defineConfig, devices } from 'playwright/test';

function suiteConfig(suite: string): PlaywrightTestConfig {
  switch (suite) {
    case 'demo': {
      const baseURL = 'http://127.0.0.1:4176/fast-vue3/';
      return {
        testMatch: 'demo.spec.ts',
        outputDir: 'test-results/demo',
        use: { baseURL },
        webServer: {
          command: 'pnpm preview:demo --port 4176 --strictPort',
          url: baseURL,
          reuseExistingServer: false,
        },
      };
    }
    case 'http': {
      return {
        testMatch: 'http.spec.ts',
        outputDir: 'test-results/http',
        use: { baseURL: 'http://127.0.0.1:4177' },
        webServer: [
          { app: 'web-antd', port: 4177 },
          { app: 'site-antd', port: 4178 },
        ].map(({ app, port }) => ({
          command: previewCommand(app, `../../dist/e2e-http/${app}`, port),
          url: `http://127.0.0.1:${port}`,
          reuseExistingServer: false,
        })),
      };
    }
    case 'server': {
      const ui = env.FAST_VUE3_TEST_UI ?? 'antd';
      const adapters = [
        'antd',
        'arco',
        'ele',
        'idux',
        'naive',
        'openvue',
        'tdesign',
      ];
      if (!adapters.includes(ui)) {
        throw new Error(`Invalid FAST_VUE3_TEST_UI: ${ui}`);
      }

      return {
        testMatch: 'server.spec.ts',
        outputDir: `test-results/server/${ui}`,
        use: { baseURL: 'http://127.0.0.1:4181' },
        webServer: [
          { app: `web-${ui}`, port: 4181 },
          { app: `site-${ui}`, port: 4182 },
          { app: 'web-app', port: 4183 },
        ].map(({ app, port }) => {
          const outDir = `../../dist/e2e-server/${app}`;
          return {
            command: `pnpm --filter @fast-vue3/${app} exec vite build --outDir ${outDir} --emptyOutDir && ${previewCommand(app, outDir, port)}`,
            env: {
              VITE_APP_API_BASEURL: '/api/v1',
              VITE_ARCHIVER: 'false',
              VITE_BASE_URL: '/',
              VITE_COMPRESS: '',
              VITE_DEV_BACKEND: 'server',
              VITE_FAST_VUE3_SERVER_URL:
                env.VITE_FAST_VUE3_SERVER_URL ?? 'http://127.0.0.1:8080',
              VITE_PWA: 'false',
              VITE_STATIC_MOCK: 'false',
            },
            url: `http://127.0.0.1:${port}`,
            reuseExistingServer: false,
            timeout: 90_000,
          };
        }),
      };
    }
    default: {
      throw new Error(
        `Invalid PLAYWRIGHT_SUITE: ${suite}. Expected demo, http, or server.`,
      );
    }
  }
}

function previewCommand(app: string, outDir: string, port: number) {
  return `pnpm --filter @fast-vue3/${app} exec vite preview --outDir ${outDir} --host 127.0.0.1 --port ${port} --strictPort`;
}

export default defineConfig(
  {
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!env.CI,
    retries: 0,
    workers: 2,
    reporter: 'list',
    use: {
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
    },
    projects: [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
          ...(env.PW_CHANNEL ? { channel: env.PW_CHANNEL } : {}),
        },
      },
      { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
      { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
  },
  suiteConfig(env.PLAYWRIGHT_SUITE ?? 'demo'),
);
