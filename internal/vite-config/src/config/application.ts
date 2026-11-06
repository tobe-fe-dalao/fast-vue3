import type { UserConfig } from 'vite';

import type { DefineApplicationOptions } from '../typing';

import { defineConfig, loadEnv, mergeConfig } from 'vite';

import { defaultImportmapOptions, getDefaultPwaOptions } from '../options';
import { loadApplicationPlugins } from '../plugins';
import { loadAndConvertEnv } from '../utils/env';
import { getCommonConfig } from './common';

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);
    const { apiTarget, appTitle, base, devBackend, port, ...envConfig } =
      await loadAndConvertEnv();
    const { command, mode } = config;
    const { application = {}, vite = {} } = options || {};
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);
    const plugins = await loadApplicationPlugins({
      archiver: true,
      archiverPluginOptions: {},
      compress: false,
      compressTypes: ['brotli', 'gzip'],
      devtools: true,
      env,
      extraAppConfig: true,
      html: true,
      i18n: false,
      importmapOptions: defaultImportmapOptions,
      injectAppLoading: true,
      injectMetadata: true,
      isBuild,
      license: true,
      mode,
      nitroMock: !isBuild,
      nitroMockOptions: {},
      print: !isBuild,
      printInfoMap: {
        'API backend': `${devBackend} (${apiTarget})`,
      },
      pwa: false,
      pwaOptions: getDefaultPwaOptions(appTitle),
      tailwind: true,
      ...envConfig,
      ...application,
    });

    const applicationConfig: UserConfig = {
      base,
      build: {
        rolldownOptions: {
          output: {
            assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/index-[name]-[hash].js',
            minify: isBuild ? { compress: { dropDebugger: true } } : false,
          },
        },
        target: 'es2015',
      },
      plugins,
      server: {
        host: true,
        port,
        proxy: {
          '/api': {
            changeOrigin: true,
            target: apiTarget,
            ws: true,
          },
        },
        warmup: {
          clientFiles: [
            './index.html',
            './src/main.ts',
            './src/{views,layout,router,stores,api}/*',
          ],
        },
      },
    };

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig,
    );
    return mergeConfig(mergedCommonConfig, vite);
  });
}

export { defineApplicationConfig };
