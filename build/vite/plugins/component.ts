/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */

import Components from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  AntDesignVueResolver,
  TDesignResolver,
  NaiveUiResolver,
  // ArcoResolver,
  DevUiResolver,
  IduxResolver,
} from 'unplugin-vue-components/resolvers';

export const AutoRegistryComponents = () => {
  return Components({
    dirs: ['src/components'],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      ElementPlusResolver(),
      VueUseComponentsResolver(),
      AntDesignVueResolver({ resolveIcons: true }),
      TDesignResolver({
        library: 'vue-next',
      }),
      // ArcoResolver({
      //   sideEffect: true,
      // }),
      NaiveUiResolver(),
      DevUiResolver({ importStyle: true }),
      IduxResolver({ importStyle: 'css', importStyleTheme: 'default' }),
    ],
  });
};
