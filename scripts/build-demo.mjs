import { spawnSync } from 'node:child_process';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'dist/demo');
const base = process.env.DEMO_BASE || '/fast-vue3/';

// Only local absolute paths: no URL, traversal, query, or HTML interpolation.
if (!/^\/(?:[\w-]+\/)*$/.test(base)) {
  throw new Error('DEMO_BASE must be / or a path such as /fast-vue3/.');
}

const labels = {
  antd: 'Ant Design Vue',
  app: '通用站点',
  arco: 'Arco Design',
  ele: 'Element Plus',
  idux: 'iDux',
  naive: 'Naive UI',
  primevue: 'PrimeVue',
  tdesign: 'TDesign',
};
const entries = await readdir(join(root, 'apps'), { withFileTypes: true });
const apps = entries
  .filter(
    (entry) => entry.isDirectory() && /^(?:web|site)-[\w-]+$/.test(entry.name),
  )
  .map((entry) => entry.name)
  .toSorted();

function run(args, env = {}) {
  const result = spawnSync('pnpm', args, {
    cwd: root,
    env: { ...process.env, ...env },
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`pnpm ${args.join(' ')} failed (${result.status}).`);
  }
}

// Never publish a partial build left by a previous run.
await rm(output, { force: true, recursive: true });
run(['exec', 'node', 'scripts/generate-auto-import-types.mjs']);
for (const app of apps) {
  console.log(`\nBuilding demo: ${app}`);
  run(['--filter', `@fast-vue3/${app}`, 'run', 'build'], {
    VITE_BASE_URL: `${base}${app}/`,
    VITE_STATIC_MOCK: 'true',
    VITE_COMPRESS: '',
    VITE_ARCHIVER: 'false',
    VITE_PWA: 'false',
  });
  // Require an actual app entry before assembling its output.
  await readFile(join(root, 'apps', app, 'dist/index.html'));
}

await mkdir(output, { recursive: true });
for (const app of apps) {
  await cp(join(root, 'apps', app, 'dist'), join(output, app), {
    recursive: true,
  });
}

const frameworks = [
  ...new Set(apps.map((app) => app.replace(/^(?:web|site)-/, ''))),
];
const cards = frameworks
  .map((framework) => {
    const links = ['web', 'site'].flatMap((kind) => {
      const app = `${kind}-${framework}`;
      if (!apps.includes(app)) return [];
      const title =
        kind === 'site' || framework === 'app' ? '门户演示' : '后台演示';
      return [
        `<a href="${base}${app}/" target="_blank" rel="noopener">${title} <span>${app} ↗</span></a>`,
      ];
    });
    return `<article><h2>${labels[framework] || framework}</h2><div class="links">${links.join('')}</div></article>`;
  })
  .join('\n');

const template = await readFile(join(root, 'scripts/demo/index.html'), 'utf8');
const html = template
  .replace('<!-- DEMO_CARDS -->', cards)
  .replaceAll('{{APP_COUNT}}', String(apps.length));
await writeFile(join(output, 'index.html'), html);
await writeFile(join(output, '404.html'), html);
await writeFile(join(output, '.nojekyll'), '');
console.log(`\nDemo ready: ${output} (${apps.length} apps, base ${base})`);
