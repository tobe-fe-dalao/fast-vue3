import { ignores, javascript, oxlintConfigs } from '@fast-vue3/oxlint-config';

import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: oxlintConfigs,
  // These fields are read from the root rather than inherited.
  ignorePatterns: ignores.ignorePatterns,
  env: javascript.env,
  globals: javascript.globals,
});
