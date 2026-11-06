import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { expect, it } from 'vitest';

import { findDemoApps } from '../../scripts/demo/apps.mjs';

it('discovers runnable frontend packages and skips retired build folders', async () => {
  const root = await mkdtemp(join(tmpdir(), 'fast-vue3-apps-'));
  try {
    for (const name of [
      'web-antd',
      'site-openvue',
      'backend-mock',
      'site-primevue',
    ]) {
      await mkdir(join(root, name));
      if (name !== 'site-primevue') {
        await writeFile(
          join(root, name, 'package.json'),
          JSON.stringify({
            name: `@fast-vue3/${name}`,
            scripts: { build: 'vite build' },
          }),
        );
      }
    }
    await mkdir(join(root, 'site-primevue', 'dist'));
    expect(await findDemoApps(root)).toEqual(['site-openvue', 'web-antd']);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
