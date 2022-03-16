<p style="font-size: 32px" align="center">
    研华前端技术文档
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
    <img src="" alt="">
<p>    


研华前端技术架构主要采用当前比较主流的Vue3.X+Vite2.X+TypeScript+Pinia等和Vue相关的技术开发体系及技术栈，目的是：提供开箱即用的脚手架（前端模板工程），快速跳过各种配置，让开发人员专注于业务的技术实现。架构本身所涉及的配置本身并没有什么难度，后面在实际开发
中用到再慢慢阅读相关文档即可。同时，架构集成了各类插件、工具类等，并进行了模块化和按需加载的优化，大大提升了模板的可扩展性、性能及安全。

# 一.准备工作
### 1.[Node.js](https://nodejs.org/zh-cn/)官网安装node
`Vite 需要 Node.js 版本 >= 12.0.0`
```shell
# 查看node版本以及是否安装成功
PS D:\project\adv-base-front> node -v
v17.0.1

# 查看npm版本
PS D:\project\adv-base-front> npm -v
8.1.0
```


### 2.[安装pnpm](https://www.pnpm.cn/installation)节省磁盘空间并提升安装速度
```shell
# 通过 npm 安装 pnpm（_文档后面有详细介绍_）
npm install -g pnpm

# 查看pnpm版本
PS D:\project\adv-base-front> pnpm -v
6.28.0
```

# 二.如何使用

```shell
# 拉取仓库代码
git clone  '代码仓库地址'

# 进入项目文件夹
cd 'adv-base-front'

# 安装项目依赖
pnpm install

# 运行
pnpm run dev
```
<font color=red>安装依赖，执行pnpm install/i安装所需组件</font>

```typescript
PS D:\project\adv-base-front> pnpm i
Scope: all 4 workspace projects
packages/juejin-maths-vue                |  WARN  deprecated babel-eslint@10.1.0

   ╭──────────────────────────────────────────────────────────────────╮
   │                                                                  │
   │                Update available! 6.28.0 → 6.32.3.                │
   │   Changelog: https://github.com/pnpm/pnpm/releases/tag/v6.32.3   │
   │                 Run pnpm add -g pnpm to update.                  │
   │                                                                  │
   │      Follow @pnpmjs for updates: https://twitter.com/pnpmjs      │
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

packages/juejin-maths-vue                |  WARN  deprecated @hapi/hoek@8.5.1
packages/juejin-maths-vue                |  WARN  deprecated chokidar@2.1.8
packages/juejin-maths-vue                |  WARN  deprecated source-map-resolve@0.5.3
packages/juejin-maths-vue                |  WARN  deprecated svgo@1.3.2
packages/juejin-maths-vue                |  WARN  deprecated source-map-url@0.4.1
packages/juejin-maths-vue                |  WARN  deprecated urix@0.1.0
packages/juejin-maths-vue                |  WARN  deprecated resolve-url@0.2.1
Packages: +2161
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: D:\.pnpm-store\v3
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 2196, reused 1088, downloaded 1072, added 2161, done
node_modules/.pnpm/core-js@2.6.12/node_modules/core-js: Running postinstall script, done in 614ms
node_modules/.pnpm/core-js@3.21.1/node_modules/core-js: Running postinstall script, done in 751ms
node_modules/.pnpm/ejs@2.7.4/node_modules/ejs: Running postinstall script, done in 808ms
node_modules/.pnpm/yorkie@2.0.0/node_modules/yorkie: Running install script, done in 700ms
node_modules/.pnpm/registry.npmmirror.com+esbuild@0.11.3/node_modules/esbuild: Running postinstall script, done in 11.3s
node_modules/.pnpm/registry.npmmirror.com+vue-demi@0.12.1_vue@3.2.29/node_modules/vue-demi: Running postinstall script, done in 463ms
node_modules/.pnpm/esbuild@0.14.21/node_modules/esbuild: Running postinstall script, done in 2.9s
node_modules/.pnpm/registry.npmmirror.com+esbuild@0.13.15/node_modules/esbuild: Running postinstall script, done in 806ms
. prepare$ husky install
│ husky - Git hooks installed
└─ Done in 987ms             

dependencies:                 
+ @arco-design/web-vue 2.16.1 
+ @vitejs/plugin-vue-jsx 1.3.3
+ @vueuse/components 7.5.4    
+ @vueuse/core 7.5.4          
+ axios 0.20.0-0              
+ highlight.js 11.4.0         
+ markdown-it 12.3.2          
+ markdown-it-anchor 8.4.1
+ markdown-it-prism 2.2.2
+ mockjs 1.1.0
+ nprogress 0.2.0
+ pinia 2.0.9
+ plop 3.0.5
+ postcss-px-to-viewport 1.1.1
+ prismjs 1.26.0
+ qs 6.10.3
+ rollup-plugin-visualizer 5.5.4
+ vite-plugin-mock 2.9.6
+ vue 3.2.29
+ vue-router 4.0.12

devDependencies:
+ @commitlint/config-conventional 16.0.0
+ @types/node 17.0.10
+ @types/nprogress 0.2.0
+ @types/qs 6.9.7
+ @typescript-eslint/eslint-plugin 5.10.0
+ @typescript-eslint/parser 5.10.0
+ @vitejs/plugin-vue 2.1.0
+ autoprefixer 10.4.2
+ commitizen 4.2.4
+ commitlint 16.1.0
+ cz-conventional-changelog 3.3.0
+ eslint 8.7.0
+ eslint-config-prettier 8.3.0
+ eslint-define-config 1.2.3
+ eslint-plugin-prettier 4.0.0
+ eslint-plugin-vue 8.3.0
+ husky 7.0.4
+ import 0.0.6
packages/juejin-maths-vue
└─┬ less-loader
  └── ✕ missing peer webpack@"^4.0.0 || ^5.0.0"
Peer dependencies that should be installed:
  webpack@"^4.0.0 || ^5.0.0"
PS D:\project\adv-base-front>

```

<font color="red">依赖安装完成，执行pnpm run dev启动项目</font>

```typescript
PS D:\project\adv-base-front> pnpm run dev

> adv-base-front@0.1.1 dev D:\project\adv-base-front
> vite --mode development

serve development
Pre-bundling dependencies:    
  vue
  @arco-design/web-vue        
  @arco-design/web-vue/es/icon
  vue-router
  pinia
  (...and 1 more)
(this will be run only when your dependencies or config have changed)

  vite v2.7.13 dev server running at:

  > Network:  http://172.21.81.100:3000/
  > Local:    http://localhost:3000/

  ready in 7973ms.
```

如果不报错，恭喜你启动成功，可以在浏览器中打开上面的地址查看。
    
# 三.框架介绍
这部分介绍一些核心功能

### 1.🪂 代码规范
🪁 使用[husky](https://typicode.github.io/husky/#/)和 [lint-staged](https://github.com/okonet/lint-staged)  来约束代码规范
- 通过`pre-commit`实现lint检查、单元测试、代码格式化
- lint-staged 只检测git add . 中暂存区的文件，对过滤出的文件执行脚本
- 保存时自动执行格式化：editor.formatOnSave: true
- 配合Git hooks钩子（commit前或提交前执行：pre-commit => npm run lint:lint-staged）
- IDE 配置（`.editorconfig`）、ESLint 配置（`.eslintrc.js` 和 `.eslintignore`）、StyleLint 配置（`.stylelintrc` 和 `.stylelintignore`），详细请看对应的配置文件  

🔌关闭代码规范  
将 `src/` 目录分别加入 `.eslintignore` 和 `.stylelintignore` 进行忽略即可。 


### 2.💕 目录结构

以下是系统的目录结构

```typescript
├── config
│   ├── vite             // vite配置
│   ├── constant         // 系统常量 
|   └── themeConfig      // 主题配置
├── docs                 // 文档相关
├── mock                 // mock数据    
├── plop-tpls            // plop模板   
├── src     
│    ├── api             // api请求   
│    ├── assets          // 静态文件   
│    ├── components      // 业务通用组件   
│    ├── page            // 业务页面 
│    ├── router          // 路由文件   
│    ├── store           // 状态管理   
│    ├── utils           // 工具类   
│    ├── App.vue         // vue模板入口   
│    ├── main.ts         // vue模板js
├── .d.ts                // 类型定义   
├── tailwind.config.js   // tailwind全局配置   
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置  
```

### 3.🎸 UI组件按需加载，自动导入
```typescript
//模块化写法
import Components from 'unplugin-vue-components/vite'
export const AutoRegistryComponents = () => {
    return Components({
        extensions: ['vue', 'md'],
        deep: true,
        dts: 'src/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
          ArcoResolver({ importStyle: 'less' }),//根据你需要增加UI框架
          VueUseComponentsResolver(),//默认使用VueUse组件
        ],
    })
}
```

### 4.🧩 Vite插件模块化
为了方便管理插件，将所有的`config`统一放入`config/vite/plugins`里面，未来还会有更多插件直接分文件夹管理。
`adv-base-front`增加了统一环境变量管理，来区分动态开启某些插件。
```typescript
// vite/plugins/index.ts
/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigSvgIconsPlugin } from './svgIcons';
import { AutoRegistryComponents } from './component';
import { AutoImportDeps } from './autoImport';
import { ConfigMockPlugin } from './mock';
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigCompressPlugin } from './compress';
import { ConfigPagesPlugin } from './pages'
import { ConfigMarkDownPlugin } from './markdown'
import { ConfigRestartPlugin } from './restart'

export function createVitePlugins(isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [
        // vue支持
        vue(),
        // JSX支持
        vueJsx(),
        // 自动按需引入组件
        AutoRegistryComponents(),
        // 自动按需引入依赖
        AutoImportDeps(),
        // 自动生成路由
        ConfigPagesPlugin(),
        // 开启.gz压缩  rollup-plugin-gzip
        ConfigCompressPlugin(),
        //支持markdown
        ConfigMarkDownPlugin(),
        // 监听配置文件改动重启
        ConfigRestartPlugin(),
    ];
    // vite-plugin-svg-icons
    vitePlugins.push(ConfigSvgIconsPlugin(isBuild));
    // vite-plugin-mock
    vitePlugins.push(ConfigMockPlugin(isBuild));
    // rollup-plugin-visualizer
    vitePlugins.push(ConfigVisualizerConfig());
    return vitePlugins;
}
```
这样`vite.config.ts`便干净多了
```typescript
import { createVitePlugins } from './config/vite/plugins'
...
return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        '@config': path.resolve(__dirname, './config'),
        "@components": path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
      }
    },
    // plugins
    plugins: createVitePlugins(isBuild)
}
...
```
### 5.📱 支持`Pinia`（一个用于 Vue 的状态管理库） ,下一代`Vuex5`
Pinia 优势
_符合直觉，易于学习
极轻， 仅有 1 KB
模块化设计，便于拆分状态_

创建文件`src/store/index.ts`
```typescript
// 支持模块化，配合plop可以通过命令行一键生成
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
const pinia = createPinia();
export { useAppStore, useUserStore };
export default pinia;
```
创建文件`src/store/modules/user/index.ts`

```typescript
import { defineStore } from 'pinia'
import piniaStore from '@/store'
export const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({}),
        getters: {},
        actions: {}
    }
)
```
### 6.🤖 支持`Plop`自动生成文件
 ⚙️ 代码文件自动生成，提供三种预设模板`pages`,`components`,`store`，也可以根据自己需要设计更多自动生成脚本。一般后端同事惯用此形式，十分高效。

```shell
# 安装plop
pnpm add plop
```
根目录创建`plopfile.ts`
```typescript
import { NodePlopAPI } from 'plop';
export default function (plop: NodePlopAPI) {
    plop.setWelcomeMessage('请选择需要创建的模式：')
    plop.setGenerator('page', require('./plop-tpls/page/prompt'))
    plop.setGenerator('component', require('./plop-tpls/component/prompt'))
    plop.setGenerator('store', require('./plop-tpls/store/prompt'))
}
```

```shell
# 启动命令
PS D:\project\adv-base-front> pnpm run plop

> adv-base-front@0.1.1 plop D:\project\adv-base-front
> plop

? 请选择需要创建的模式： (Use arrow keys)
> page - 创建页面
  component - 创建组件
  store - 创建全局模块化状态

? 请选择需要创建的模式： page - 创建页面
? 请选择页面创建目录 src/pages/demo
? 请输入文件名 test
√  ++ \src\pages\demo\test.vue
PS D:\project\adv-base-front>
```

### 7.🖼️ 支持`SVG`图标
随着浏览器兼容性的提升，SVG的性能逐渐凸显，很多团队都在创建自己的SVG管理库，后面第四部分工具库会有推荐。
```shell
# 安装svg依赖
pnpm add vite-plugin-svg-icons
```
配置`vite.config.ts`
```typescript
import viteSvgIcons from 'vite-plugin-svg-icons';
export default defineConfig({
plugins:[
...
 viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  }),
]
...
})
```

已封装一个简单的`SvgIcon`组件，可以直接读取文件下的`svg`，可以根据文件夹目录自动查找文件。

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
### 8.📦 支持`axios(ts版)`
已封装了主流的拦截器，请求调用等方法，区分了模块`index.ts`/`status.ts`/`type.ts`
```typescript
//封装src/api/user/index.ts
import request from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type';
enum URL {
    login = '/v1/user/login',
    permission = '/v1/user/permission',
    userProfile = 'mock/api/userProfile'
}
const getUserProfile = async () => request<ReqAuth>({ url: URL.userProfile });
const login = async (data: ReqParams) => request({ url: URL.login, data });
const permission = async () => request<ReqAuth>({ url: URL.permission });
export default { getUserProfile, login, permission };
```
```typescript
//调用
import userApi from "@api/user"
// setup模式下组件可以直接引用
const res = await userApi.profile()
```
### 9.👽 自动生成`router`，过滤`components`组件
支持`vue-router4.0`的模块化，通过检索pages文件夹可自动生成路由，并支持动态路由

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

console.log(routes,'打印生成自动生成的路由')
//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```
### 10.🧬 支持Mock数据
使用`vite-plugin-mock`插件，支持自动区分和启停的环境配置  

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
       `
    })
```
根目录下创建 `_createProductionServer.ts`文件,非`_`开头文件会被自动加载成mock文件

```typescript
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
// 批量加载
const modules = import.meta.globEager('./mock/*.ts');

const mockModules: Array<string> = [];
Object.keys(modules).forEach((key) => {
    if (key.includes('/_')) {
        return;
    }
    mockModules.push(...modules[key].default);
});
export function setupProdMockServer() {
    createProdMockServer(mockModules);
}
```
### 11.🎎 Proxy代理
```typescript
// vite config
import proxy from '@config/vite/proxy';
export default defineConfig({
    ...
    server: {
        hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        // 服务配置
        port: VITE_PORT, // 类型： number 指定服务器端口;
        open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
        cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        host: '0.0.0.0', // IP配置，支持从IP启动
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
} from '@config/constant';
import { ProxyOptions } from 'vite';
type ProxyTargetList = Record<string, ProxyOptions>;

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
};

export default init;

```

### 12.🎉 其他

- 🏗 支持`vw/vh`移动端布局兼容，也可以使用`plop`自己配置生成文件
- 持续集成更多功能




# 四.工具库
学会使用适当的工具库，让`coding`事半功倍。尤其是开源的工具库，值得每个开发人员学习，这里推荐一些常用的均可直接引入类库。

### 1.JS常用的库
- [pnpm](https://pnpm.io/)，一个依赖包全局管理的工具，节约磁盘空间并提升安装速度
  
![image-20220110125758056](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125758056.png)
- [mitt 全局事件监听库](https://github.com/developit/mitt)，Vue3官方推荐
- [Hammer](http://hammerjs.github.io/)，可以识别由触摸、鼠标和指针事件做出的手势，大小7.34kb
- [outils](https://github.com/proYang/outils)，开发中常用的函数集，也可以使用`lodash`

- [tailwindcss](https://tailwindcss.com/)，一行css不写，3分钟出一个页面。适合中高级前端，不适合初中级前端，建议先踏实学基础再用框架。

  ![tailwindcss-1](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-1.gif)

  ![tailwindcss-2](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-2.gif)

- [Vue I18n](https://vue-i18n.intlify.dev/) 是 Vue.js 的国际化插件，如果你想做开源框架，国际化首选插件。

- [Vitest](https://github.com/vitest-dev/vitest) 基于Vite的单元测试工具，目前迭代比较快。 
### 2.UI库
- [arco-design](https://arco.design/vue/docs/start)，字节团队新出的UI框架,配置层面更为灵活,`adv-base-front`使用的就是这个UI，可以根据自身业务更换UI框架
- [semi-design](https://semi.design/zh-CN/)，抖音前端出的框架全面、易用、优质的企业级产品设计系统
- [nutui](https://nutui.jd.com/#/)，京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
- [naive-ui](https://www.naiveui.com/zh-CN/os-theme)，一个 Vue 3 组件库比较完整，主题可调，使用 TypeScript
- [element-plus](https://element-plus.org/zh-CN/)，基于 Vue 3，面向设计师和开发者的组件库
- [Ant Design](https://next.antdv.com/docs/vue/introduce-cn)，提供了大量的UI组件来丰富Web应用程序，服务于企业级后台产品


# 资料
- 官方配置文档入口[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://plopjs.com/)
