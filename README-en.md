<p align="center" style="background:#e6e6e6;padding:20px">
    <img  src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/fast-vue3.svg" width="340" />
</p>

<p align="center">  
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white" alt="Prettier">
    <img src="https://img.shields.io/badge/-Less-1D365D?logo=less&logoColor=white" alt="Less">
    <img src="https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=Tailwind%20CSS&logoColor=white" alt="Taiwind">
</p>

An out-of-the-box Vue3+Vite2+TypeScript,etc. template framework for quickly building large-scale applications. Various plugins are integrated and optimized for modularization and lead-on-demand, so you can use it with confidence. [Update documentation click here please](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/docs/update.md)

English | [简体中文](./README.md) | [日本語](./README.ja-JP.md)

# Feature

Here is a brief introduction to some core parts and the installation part will not be discussed in detail. It is recommended that you read the official documentation or [visual warehouse](https://github1s.com/tobe-fe-dalao/fast-vue3) directly.

## 🪂Tech giants collaboration-code specification

🪁 Many tech giants teams generally use [husky](https://github.com/typicode/husky) and  [lint-staged](https://github.com/okonet/lint-staged) to constrain code specifications at present.

- Through `pre-commit` to implement lint check,unit test,code formatting,etc.。
- Combined with the VsCode（formatting automatically when saving：editor.formatOnSave: true）
- Combined with the Git hooks（execute before commit：pre-commit => npm run lint:lint-staged）
- IDE configuration（`.editorconfig`）,ESLint configuration（`.eslintrc.js`  和  `.eslintignore`）,StyleLint configuration（`.stylelintrc`  和  `.stylelintignore`）,for details, please refer to the corresponding configuration file。

🔌 Close code specification add `.eslintignore`  and  `.stylelintignore`  to `src/`  directory respectively to ignore

## Directory Structure

The following is the directory structure of the system

```
├── config
│   ├── vite             // vite configuration
│   ├── constant         // system constant
|   └── themeConfig      // theme configuration
├── docs                 // document related
├── mock                 // mock data
├── plop-tpls            // plop template
├── src
│    ├── api             // api request
│    ├── assets          // static files
│    ├── components      // Common Components
│    ├── page            // page
│    ├── router          // routing file
│    ├── store           // state management
│    ├── utils           // tools
│    ├── App.vue         // vue template entry
│    ├── main.ts         // vue template js
├── .d.ts                // type definition
├── tailwind.config.js   // tailwind global configuration
├── tsconfig.json        // ts configuration
└── vite.config.ts       // vite global configuration
```

## 💕Support JSX syntax

```json
{
    ...
    "@vitejs/plugin-vue-jsx": "^1.3.10"
    ...
}
```

## 🎸 UI components are loaded on demand and imported automatically

```typescript
//Modular writing
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
export const AutoRegistryComponents = () => {
  return Components({
    // dirs: ['src/components'],
    extensions: ['vue', 'md'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
  })
}
```

## 🧩Vite plugin modularity

In order to facilitate the management of plugins, put all `config` into `config/vite/plugins`. In the future, there will be more plugins directly divided into folders to manage very cleanly。 It is worth mentioning that `Fast-Vue3` adds unified environment variable management to distinguish dynamic opening of certain plugins.

```typescript
// vite/plugins/index.ts
/**
 * @name createVitePlugins
 * @description Encapsulate the plugins array to call uniformly
 */
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { ConfigMockPlugin } from './mock'
import { ConfigVisualizerConfig } from './visualizer'
import { ConfigCompressPlugin } from './compress'
import { ConfigPagesPlugin } from './pages'
import { ConfigMarkDownPlugin } from './markdown'
import { ConfigRestartPlugin } from './restart'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue support
    vue(),
    // JSX support
    vueJsx(),
    // Automatically import components on demand
    AutoRegistryComponents(),
    // Automatically import dependencies as needed
    AutoImportDeps(),
    // Automatically generate routes
    ConfigPagesPlugin(),
    // Enable .gz compression  rollup-plugin-gzip
    ConfigCompressPlugin(),
    // markdown support
    ConfigMarkDownPlugin(),
    // Monitor configuration file changes and restart
    ConfigRestartPlugin(),
  ]
  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))
  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild))
  // rollup-plugin-visualizer
  vitePlugins.push(ConfigVisualizerConfig())
  return vitePlugins
}
```

`vite.config.ts` is much cleaner

```typescript
import { createVitePlugins } from './config/vite/plugins'
...
return {
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // plugins
    plugins: createVitePlugins(isBuild)
}
...
```

## 📱 Support for `Pinia`, the next generation of `Vuex5`

Create a file `src/store/index.ts`

```typescript
// Supports modularization, and can be generated with one click from the command line with plop
import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'
const pinia = createPinia()
export { useAppStore, useUserStore }
export default pinia
```

Create a file `src/store/modules/user/index.ts`

```typescript
import { defineStore } from 'pinia'
import piniaStore from '@/store'
export const useUserStore = defineStore(
  // unique id
  'user',
  {
    state: () => ({}),
    getters: {},
    actions: {},
  },
)
```

## 🤖 Support `Plop` to automatically generate files

⚙️ The code files are automatically generated, providing three preset templates `pages`, `components`, `store`, you can also design more automatic generation scripts according to your needs. Generally, back-end engineer use this form, which is very efficient.。

```shell
# install plop
pnpm add plop
```

Create in the root directory `plopfile.ts`

```typescript
import { NodePlopAPI } from 'plop'
export default function (plop: NodePlopAPI) {
  plop.setWelcomeMessage('Please select the pattern you want to create')
  plop.setGenerator('page', require('./plop-tpls/page/prompt'))
  plop.setGenerator('component', require('./plop-tpls/component/prompt'))
  plop.setGenerator('store', require('./plop-tpls/store/prompt'))
}
```

```shell
# start command
pnpm run plop
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6756aebd4d6407e8545eed41b6e5864~tplv-k3u1fbpfcp-watermark.image?)

## 🖼️ Support for `SVG` icons

With the improvement of browser compatibility, the performance of SVG has gradually become prominent. Many tech giants teams are creating their own SVG management library, and the tool library will be recommended later.

```shell
#  install svg dependencies
pnpm add vite-plugin-svg-icons
```

configure `vite.config.ts`

```typescript
import viteSvgIcons from 'vite-plugin-svg-icons';
export default defineConfig({
plugins:[
...
 viteSvgIcons({
    // Specify the icon folder that needs to be cached
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // Specify symbolId format
    symbolId: 'icon-[dir]-[name]',
  }),
]
...
})
```

A simple `SvgIcon` component has been encapsulated, which can directly read the `svg` under the file, and can automatically find the file according to the folder directory.

```html
<template>
  <svg aria-hidden="true" class="svg-icon-spin" :class="calsses">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: String,
      default: 'default',
    },
  })
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
  const calsses = computed(() => {
    return {
      [`sdms-size-${props.size}`]: props.size,
    }
  })
  const fontSize = reactive({ default: '32px', small: '20px', large: '48px' })
</script>
```

## 📦 Support `axios (ts version)`

It has encapsulated mainstream interceptors, request calls and other methods, distinguishing modules `index.ts`/`status.ts`/`type.ts`

```typescript
//encapsulate src/api/user/index.ts
import request from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type'
enum URL {
  login = '/v1/user/login',
  userProfile = 'mock/api/userProfile',
}
const getUserProfile = async () => request<ReqAuth>({ url: URL.userProfile })
const login = async (data: ReqParams) => request({ url: URL.login, data })
export default { getUserProfile, login }
```

```typescript
// transfer
import userApi from '@api/user'
// Components can be directly referenced in setup mode
const res = await userApi.profile()
```

## 👽 Automatically generate `router`, filter `components` components

Supports the modularization of `vue-router4.0`, automatically generates routes by retrieving the pages folder, and supports dynamic routes

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

console.log(routes, 'print generate auto-generated routes')
// Import generated routing data
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

## 🧬 Support Mock data

Use the `vite-plugin-mock` plug-in to support automatic distinction and start-stop environment configuration

```javascript
// vite config
viteMockServe({
  ignore: /^\_/,
  mockPath: 'mock',
  localEnabled: !isBuild,
  prodEnabled: false,
  // https://github.com/anncwb/vite-plugin-mock/issues/9
  injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
       setupProdMockServer();
       `,
})
```

Create a `_createProductionServer.ts` file in the root directory, files not starting with `_` will be automatically loaded into mock files

```typescript
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// Bulk load
const modules = import.meta.globEager('./mock/*.ts')

const mockModules: Array<string> = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...modules[key].default)
})
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
```

## 🎎 Proxy

```typescript
// vite config
import proxy from '@config/vite/proxy';
export default defineConfig({
    ...
    server: {
        hmr: { overlay: false }, // Disable or configure HMR connections and set server.hmr.overlay to false to `disable` the server error masking layer
        // Service configuration
        port: VITE_PORT, // type:number Specify the server port;
        open: false, // type:boolean | string Automatically open the application in the browser when the server starts;
        cors: false, // type:boolean | CorsOptions configure CORS for the development server. Enabled by default and allows any origin
        host: '0.0.0.0', // IP configuration, support boot from IP
        proxy,
    }
    ...
})
```

```typescript
// proxy.ts
import {
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
} from '@config/constant'
import { ProxyOptions } from 'vite'
type ProxyTargetList = Record<string, ProxyOptions>

const init: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
}

export default init
```

## 🎉 Other

- 🏗 Support `vw/vh` mobile terminal layout compatibility, you can also use `plop` to configure the generated file yourself
- There are more new features added in `commiting`, if you have a better solution, welcome `PR`

# ✏️ Use

One key three links: Star or Fork or [Visual warehouse](https://github1s.com/tobe-fe-dalao/fast-vue3)

```shell
# Pull repository code
git clone  https://github.com/tobe-fe-dalao/fast-vue3.git

# enter the project folder
cd fast-vue3

# Install project dependencies
pnpm install

# run
pnpm run dev
```

If no error is reported, congratulations on your successful ignition。Otherwise，Please see the FAQ below。

If you already know this template, it is recommended that you pull the `template` branch for project development, this branch does not contain any sample code.

```
# clone  template branch
git clone -b template https://github.com/tobe-fe-dalao/fast-vue3.git
```

# Tool Library

Learn to use the appropriate tool library to make `coding` do more with less. Especially the open source tool library, it is worth everyone to learn, because this is the level you should reach. Here are some class libraries commonly used by major manufacturers, because I like new ones... The following tools can be imported directly.

## JS library

- [pnpm](https://pnpm.io/)，A tool that relies on the global management of packages, the boss no longer has to worry that my C drive is not enough. Vite official recommendation, Byte Dance official front-end team large-scale project test

![image-20220110125758056](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125758056.png)

- [mitt Global event listener library](https://github.com/developit/mitt)，Vue3 official recommendation
- [Hammer](http://hammerjs.github.io/)，Can recognize gestures made by touch, mouse and pointer events, only 7.34kb
- [outils](https://github.com/proYang/outils)，A set of functions commonly used in development, you can also use `lodash`

- [tailwindcss](https://tailwindcss.com/)，Oh my Jesus, without writing a line of CSS, a page is created in 3 minutes. It is not suitable for junior and intermediate front-ends. It is recommended to learn the basics first and then use the framework.

  ![tailwindcss-1](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-1.gif)

  ![tailwindcss-2](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-2.gif)

- [Vue I18n](https://vue-i18n.intlify.dev/) an internationalization plugin for Vue.js. If you want to make an open source framework, the preferred plugin for internationalization.

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO optimization, this project is interesting, you can play with this solution, I used to do SEO through server-side rendering before, and later learned that this can be generated directly on the Vue3 server.

- [Vitest](https://github.com/vitest-dev/vitest),The unit testing tool based on Vite, the iteration is relatively fast at present, and is sponsored by Evan You. You can continue to pay attention, and it is not recommended to use it in small projects.

  ![image-20220110125605172](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125605172.png)

# UI library

- [arco-design](https://github.com/arco-design/arco-design)，The new UI framework of the Byte Dance team has a more flexible configuration level. `fast-vue3` uses it. if you don't like it can be removed.
- [semi-design](https://github.com/DouyinFE/semi-design)，The framework from the front end of Douyin is aimed at constantly tearing UI and FE, and you can try it out.
- [nutui](https://github.com/jdf2e/nutui)，The UI framework developed by the front-end team of JD.com has been upgraded to 3.X. Personally, I think it has the highest appearance and accepts the rebuttal.
- [naive-ui](https://github.com/TuSimple/naive-ui)，Recommended by Evan You, TypeScript syntax, adjustable theme, this company is very powerful.
- That's all for now and I'll make up later.

# Reference

- Official configuration document entry[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://github.com/plopjs/plop)...
- More detailed configuration manual:https://juejin.cn/post/7036745610954801166
- vu3 writing component practice case:https://juejin.cn/post/7052717075168493598

# Contributors

This project exists thanks to all the people who contribute.

And thank you to all our backers! 🙏

<a href="https://github.com/study-vue3/fast-vue3/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=study-vue3/fast-vue3" />
</a>

# Last

- Welcome to join the group [前端水友群](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Ff2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image')，goof off, let's goof off together, and now the fan group rarely discusses technology, so let's goof off together. Welcome to pay attention to Wechat public number [扫地盲僧](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Fa08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%2522 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%22')。

- Cutting-edge technologies, technologies related to various experiences and interactions, and advance perspectives of various translations and research reports.
- Free to use, all the paid resources promised to be released, all the fan groups are free for using.Otherwise, who would have time to play with you, interesting.

<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/varqun.jpg">
</p>
<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/扫地盲僧公众号.png">
</p>
