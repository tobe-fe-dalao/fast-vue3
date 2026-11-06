import type { Linter } from 'eslint';

import { ignores, oxlintConfig } from '@fast-vue3/oxlint-config';

import oxlint from 'eslint-plugin-oxlint';

const scriptFiles = '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}';

function oxlintCompatibility(): Linter.Config[] {
  const { ignorePatterns: _ignorePatterns, ...rules } = oxlintConfig;
  return oxlint.buildFromOxlintConfig(rules).map((config) => ({
    ...config,
    files: config.files?.map((pattern) =>
      Array.isArray(pattern)
        ? [...pattern, scriptFiles]
        : [pattern, scriptFiles],
    ) ?? [scriptFiles],
    ignores: [...(config.ignores ?? []), ...(ignores.ignorePatterns ?? [])],
  }));
}

export { oxlintCompatibility };
