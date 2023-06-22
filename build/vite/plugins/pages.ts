/**
 * @name ConfigPagesPlugin
 * @description 动态生成路由
 */
import VueRouter from 'unplugin-vue-router/vite';

export const ConfigPagesPlugin = () => {
  return VueRouter({
    routesFolder: ['src/views'],
    dts: 'types/typed-router.d.ts',
    dataFetching: true,
    extensions: ['.page.vue', '.vue', '.md'],
  });
};
