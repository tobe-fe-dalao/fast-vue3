/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver, AntDesignVueResolver, TDesignResolver } from 'unplugin-vue-components/resolvers';
import { VueRouterAutoImports } from 'unplugin-vue-router';

export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'types/auto-imports.d.ts',
    imports: [
      'vue',
      'pinia',
      {
        '@vueuse/core': [],
      },
      {
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
      VueRouterAutoImports,
    ],
    resolvers: [
      ElementPlusResolver(),
      AntDesignVueResolver(),
      TDesignResolver({
        library: 'vue-next',
      }),
      // ArcoResolver(),
    ],
  });
};
