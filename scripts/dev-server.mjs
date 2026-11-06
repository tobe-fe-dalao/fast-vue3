import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const sibling = '../fast-vue3-server';
const previousLocation = '../../../../backend/java/fast-vue3-server';
const defaultLocation = existsSync(join(sibling, 'compose.yml'))
  ? sibling
  : previousLocation;
const server = resolve(process.env.FAST_VUE3_SERVER_DIR || defaultLocation);
const compose = join(server, 'compose.yml');

if (!existsSync(compose)) {
  console.error(
    `No compose.yml found in ${server}. Set FAST_VUE3_SERVER_DIR to the Java repository.`,
  );
  process.exit(1);
}

const result = spawnSync(
  'docker',
  [
    'compose',
    '-f',
    compose,
    '--project-directory',
    server,
    '--profile',
    'app',
    'up',
    '-d',
    '--build',
  ],
  { stdio: 'inherit' },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
