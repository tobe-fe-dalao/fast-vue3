import { spawnSync } from 'node:child_process';

// Keep network-mode artifacts separate from the fifteen-app static demo.
for (const app of ['web-antd', 'site-antd']) {
  const result = spawnSync(
    'pnpm',
    [
      '--filter',
      `@fast-vue3/${app}`,
      'exec',
      'vite',
      'build',
      '--outDir',
      `../../dist/e2e-http/${app}`,
    ],
    {
      env: {
        ...process.env,
        VITE_BASE_URL: '/',
        VITE_APP_API_BASEURL: '/api/v1',
        VITE_STATIC_MOCK: 'false',
        VITE_COMPRESS: '',
        VITE_ARCHIVER: 'false',
        VITE_PWA: 'false',
      },
      shell: process.platform === 'win32',
      stdio: 'inherit',
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`HTTP E2E build failed: ${app}`);
}
