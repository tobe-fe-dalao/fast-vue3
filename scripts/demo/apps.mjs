import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function findDemoApps(appsRoot) {
  const entries = await readdir(appsRoot, { withFileTypes: true });
  const apps = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || !/^(?:web|site)-[\w-]+$/.test(entry.name))
      continue;

    let manifest;
    try {
      manifest = JSON.parse(
        await readFile(join(appsRoot, entry.name, 'package.json'), 'utf8'),
      );
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    if (
      manifest.name === `@fast-vue3/${entry.name}` &&
      manifest.scripts?.build
    ) {
      apps.push(entry.name);
    }
  }
  return apps.toSorted();
}
