import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  viteFileRoutesPlugin,
  viteUnpluginPlugin,
} from '@fast-vue3/vite-config';

const root = process.cwd();
const appNames = readdirSync(resolve(root, 'apps'), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      (entry.name.startsWith('web-') || entry.name.startsWith('site-')) &&
      existsSync(resolve(root, 'apps', entry.name, 'package.json')),
  )
  .map((entry) => entry.name);

for (const appName of appNames) {
  try {
    process.chdir(resolve(root, 'apps', appName));
    const autoImport = viteUnpluginPlugin({}).find(
      (plugin) => plugin.name === 'unplugin-auto-import',
    );
    if (typeof autoImport?.buildEnd !== 'function') {
      throw new TypeError('Auto import declaration generator is unavailable');
    }
    await autoImport.buildEnd();
    if (existsSync(resolve('src/views'))) {
      const router = viteFileRoutesPlugin(false);
      if (typeof router.buildStart !== 'function') {
        throw new TypeError('File route declaration generator is unavailable');
      }
      await router.buildStart();
    }
  } finally {
    process.chdir(root);
  }
}
