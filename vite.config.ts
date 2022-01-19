/*
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:19:27
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-19 20:59:53
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// 按需加载插件
import styleImport from 'vite-plugin-style-import'
// markdown渲染插件
import Markdown from 'vite-plugin-md'
// SVG生成插件
import viteSvgIcons from 'vite-plugin-svg-icons';

export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/, /\.md$/], // 引入兼容md文件
  }),
  styleImport({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // css
          return `@arco-design/web-vue/es/${name}/style/css.js`
          // less
          return `@arco-design/web-vue/es/${name}/style/index.js`
        },
      }
    ]
  }),
  Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
    },
    markdownItSetup(md) {
      // md.use(require('markdown-it-anchor'))
      md.use(require('markdown-it-prism'))
    },
    wrapperClasses: 'markdown-sdms'
  }),
  viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  }),
  ],
  resolve: {
    alias: {
      "@": resovePath("src"),
      "@views": resovePath("src/views"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 这样就能全局使用 src/assets/styles/base.less 定义的 变量
        additionalData: `@import "${resovePath('src/assets/styles/base.less')}";`
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "127.0.0:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 生产环境去除console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 环境变量
  define: {
    'process.env': {}
  }
});
function resovePath(paths) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths);
}