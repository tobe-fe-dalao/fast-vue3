import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resovePath("src"),
      "@views": resovePath("src/views"),
    },
  },
  css: {
    preprocessorOptions: {
      // sass variable and mixin
      // scss: {
      // additionalData: `@import "./src/plugins/klComponent/assets/css/constant.scss";`,
      // },
      less: {
        javascriptEnabled: true,
        // 这样就能全局使用 src/assets/styles/base.less 定义的 变量
        additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "192.168.10.10:3002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
});
function resovePath(paths) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths);
}


