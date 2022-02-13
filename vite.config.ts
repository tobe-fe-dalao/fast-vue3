import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport, {
  NutuiResolve,
  VantResolve
} from 'vite-plugin-style-import';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default function ({ command }: ConfigEnv): UserConfigExport {
  return {
    server: {
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        fix: true
      }),
      styleImport({
        libs: [NutuiResolve(), VantResolve()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    }
  };
}
