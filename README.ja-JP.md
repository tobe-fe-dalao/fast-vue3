# FastVue3 


![Vue](https://img.shields.io/badge/-Vue3-34495e?logo=vue.js)
![Vite](https://img.shields.io/badge/-Vite2.7-646cff?logo=vite&logoColor=white) 
![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white)
![ESLint](https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white)
![Pnpm](https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white)
![Prettier](https://img.shields.io/badge/-Prettier-ef9421?logo=Prettier&logoColor=white)
![Less](https://img.shields.io/badge/-Less-1D365D?logo=less&logoColor=white) 
![Taiwind](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=Tailwind%20CSS&logoColor=white)

すぐに使えるVue3 + Vite2 + TypeScriptなど。 大規模なアプリケーションを迅速に構築するためのテンプレートフレームワーク。 さまざまなプラグインが統合され、モジュール化とリードオンデマンド用に最適化されているため、自信を持って使用できます。 [ドキュメントを更新するには、ここをクリックしてください](https://github.com/MaleWeb/fast-vue3/blob/main/docs/update.md)

[English](./README.md) |  [简体中文](./README-zh_CN.md) | 日本語

# 特徴
ここでは、いくつかのコアパーツの簡単な紹介を示しますが、インストールパーツについては詳しく説明しません。 公式ドキュメントまたは[ビジュアルウェアハウス]（https://github1s.com/MaleWeb/fast-vue3）を直接読むことをお勧めします。

## 🪂技術巨人のコラボレーション-コード仕様
🪁 現在、多くのハイテク巨人チームは、一般的に [husky](https://github.com/typicode/husky) と [lint-staged](https://github.com/okonet/lint-staged)を使用してコード仕様を制約しています。
- `pre-commit`を介して、lintチェック、単体テスト、コードフォーマットなどを実装します。 
- VsCodeと組み合わせる（保存時に自動的にフォーマットする：editor.formatOnSave：true）
- Gitフックと組み合わせる（コミット前に実行：pre-commit => npm run lint：lint-staged）
- IDE構成（ `.editorconfig`）、ESLint構成（` .eslintrc.js`和 `.eslintignore`）、StyleLint構成（` .stylelintrc`和 `.stylelintignore`）、詳細については、対応する構成ファイルを参照してください.

🔌 コード仕様を閉じる
`.eslintignore` と ` .stylelintignore`をそれぞれ `src /`ディレクトリに追加して無視します.


## ディレクトリ構造

システムのディレクトリ構造は次のとおりです

```
├── config
│   ├── vite             // vite 構成
│   ├── constant         // システム定数
|   └── themeConfig      // theme 構成
├── docs                 // ドキュメント関連
├── mock                 // モックデータ    
├── plop-tpls            // plopテンプレート
├── src     
│    ├── api             // APIリクエスト   
│    ├── assets          // 静的ファイル  
│    ├── components      // コンポーネント 
│    ├── page            // ページ
│    ├── router          // ルーティングファイル   
│    ├── store           // 状態管理   
│    ├── utils           // ツール   
│    ├── App.vue         // vue テンプレート エントリ 
│    ├── main.ts         // vue テンプレート js
├── .d.ts                // タイプ定義
├── tailwind.config.js   // tailwind グローバル構成 
├── tsconfig.json        // ts 構成
└── vite.config.ts       // vite グローバル構成  
```

## 💕JSX構文をサポートする

```json
{
    ...
    "@vitejs/plugin-vue-jsx": "^1.3.3"
    ...
}
```
## 🎸 UIコンポーネントはオンデマンドで読み込まれ、自動的にインポートされます
```typescript
// モジュラーライティング
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
            ArcoResolver({ importStyle: 'less' }),// 必要に応じてUIフレームワークを追加します
            VueUseComponentsResolver(),// VueUseコンポーネントがデフォルトで使用されます
        ],
    })
}
```

## 🧩Viteプラグインのモジュール性
プラグインの管理を容易にするために、すべての `config`を` config / vite / plugins`に入れてください。 将来的には、非常にクリーンに管理するために、フォルダーに直接分割されたプラグインが増える予定です。
`Fast-Vue3`は、特定のプラグインの動的なオープンを区別するために、統合された環境変数管理を追加することは言及する価値があります。
```typescript
// vite/plugins/index.ts
/**
 * @name createVitePlugins
 * @description Encapsulate the plugins array to call uniformly
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
        // vueサポート
        vue(),
        // JSXサポート
        vueJsx(),
        // コンポーネントをオンデマンドで自動的にインポート
        AutoRegistryComponents(),
        // 必要に応じて依存関係を自動的にインポートします
        AutoImportDeps(),
        // ルートを自動的に生成する
        ConfigPagesPlugin(),
        // .gz圧縮を有効にする  rollup-plugin-gzip
        ConfigCompressPlugin(),
        // markdownサポート
        ConfigMarkDownPlugin(),
        // 構成ファイルの変更を監視して再起動します
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
`vite.config.ts` is much cleaner
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
## 📱 Support for `Pinia`, the next generation of `Vuex5`
ファイルを作成する `src/store/index.ts`
```typescript
// モジュール化をサポートし、plopを使用してコマンドラインからワンクリックで生成できます
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
const pinia = createPinia();
export { useAppStore, useUserStore };
export default pinia;
```
ファイルを作成する `src/store/modules/user/index.ts`

```typescript
import { defineStore } from 'pinia'
import piniaStore from '@/store'
export const useUserStore = defineStore(
    // unique id
    'user',
    {
        state: () => ({}),
        getters: {},
        actions: {}
    }
)
```
## 🤖 ファイルを自動的に生成するための `Plop`をサポート
 ⚙️ コードファイルは自動的に生成され、3つのプリセットテンプレート `pages`、` components`、 `store`を提供します。また、必要に応じて、より多くの自動生成スクリプトを設計することもできます。 通常、バックエンドエンジニアはこのフォームを使用します。これは非常に効率的です。。

```shell
# install plop
pnpm add plop
```
ルートディレクトリ `plopfile.ts`に作成します
```typescript
import { NodePlopAPI } from 'plop';
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


## 🖼️ `SVG`アイコンのサポート
ブラウザの互換性の向上に伴い、SVGのパフォーマンスは徐々に顕著になりました。 多くの技術大手チームが独自のSVG管理ライブラリを作成しており、ツールライブラリは後で推奨されます。
```shell
#  svg依存関係をインストールします
pnpm add vite-plugin-svg-icons
```
設定 `vite.config.ts`
```typescript
import viteSvgIcons from 'vite-plugin-svg-icons';
export default defineConfig({
plugins:[
...
 viteSvgIcons({
    // キャッシュする必要のあるアイコンフォルダを指定します
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // symbolId形式を指定します
    symbolId: 'icon-[dir]-[name]',
  }),
]
...
})
```

単純な `SvgIcon`コンポーネントがカプセル化されており、ファイルの下の` svg`を直接読み取ることができ、フォルダーディレクトリに従ってファイルを自動的に見つけることができます。

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
## 📦 サポート `axios (ts version)`
主流のインターセプター、リクエスト呼び出し、その他のメソッドをカプセル化し、モジュール `index.ts` /` status.ts` / `type.ts`を区別しています。
```typescript
// カプセル化 src/api/user/index.ts
import request from '@utils/http/axios'
import { IResponse } from '@utils/http/axios/type'
import { ReqAuth, ReqParams, ResResult } from './type';
enum URL {
    login = '/v1/user/login',
    userProfile = 'mock/api/userProfile'
}
const getUserProfile = async () => request<ReqAuth>({ url: URL.userProfile });
const login = async (data: ReqParams) => request({ url: URL.login, data });
export default { getUserProfile, login };
```
```typescript
// 移行
import userApi from "@api/user"
// コンポーネントは、セットアップモードで直接参照できます
const res = await userApi.profile()
```
## 👽 Automatically generate `router`, filter `components` components
`vue-router4.0`のモジュール化をサポートし、pagesフォルダーを取得してルートを自動的に生成し、動的ルートをサポートします

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

console.log(routes,'print generate auto-generated routes')
// 生成されたルーティングデータをインポートする
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```
## 🧬 サポート Mock data
`vite-plugin-mock`プラグインを使用して、自動識別と開始-停止環境構成をサポートします

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
ルートディレクトリに `_createProductionServer.ts`ファイルを作成します。`_`で始まらないファイルは自動的にモックファイルにロードされます

```typescript
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
// Bulk load
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

## 🎉 Other

- 🏗 `vw / vh`モバイル端末レイアウトの互換性をサポートします。`plop`を使用して、生成されたファイルを自分で構成することもできます
- `commiting`にはさらに多くの新機能が追加されています。より良い解決策がある場合は、` PR`を歓迎します。


# 使用 
One key three links: Star or Fork or [Visual warehouse](https://github1s.com/MaleWeb/fast-vue3) 

```shell
# Pull repository code
git clone  https://github.com/MaleWeb/fast-vue3.git

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
git clone -b template https://github.com/MaleWeb/fast-vue3.git
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

- [Vue I18n](https://vue-i18n.intlify.dev/)  an internationalization plugin for Vue.js. If you want to make an open source framework, the preferred plugin for internationalization.

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO optimization, this project is interesting, you can play with this solution, I used to do SEO through server-side rendering before, and later learned that this can be generated directly on the Vue3 server.

- [Vitest](https://github.com/vitest-dev/vitest),The unit testing tool based on Vite, the iteration is relatively fast at present, and is sponsored by Evan You. You can continue to pay attention, and it is not recommended to use it in small projects.

  ![image-20220110125605172](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125605172.png)


# UI library
- [arco-design](https://github.com/arco-design/arco-design)，The new UI framework of the Byte Dance team has a more flexible configuration level.  `fast-vue3` uses it. if you don't like it can be removed.
- [semi-design](https://github.com/DouyinFE/semi-design)，The framework from the front end of Douyin is aimed at constantly tearing UI and FE, and you can try it out.
- [nutui](https://github.com/jdf2e/nutui)，The UI framework developed by the front-end team of JD.com has been upgraded to 3.X. Personally, I think it has the highest appearance and accepts the rebuttal.
- [naive-ui](https://github.com/TuSimple/naive-ui)，Recommended by Evan You, TypeScript syntax, adjustable theme, this company is very powerful.
- That's all for now and I'll make up later.

# Reference
- Official configuration document entry[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://github.com/plopjs/plop)...
- More detailed configuration manual:https://juejin.cn/post/7036745610954801166
- vu3 writing component practice case:https://juejin.cn/post/7052717075168493598

# Last

-   Welcome to join the group [前端水友群](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Ff2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image")，goof off, let's goof off together, and now the fan group rarely discusses technology, so let's goof off together. Welcome to pay attention to Wechat public number [扫地盲僧](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Fa08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%2522 "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%22")。  
  
-   Cutting-edge technologies, technologies related to various experiences and interactions, and advance perspectives of various translations and research reports.
-   Free to use, all the paid resources promised to be released, all the fan groups are free for using.Otherwise, who would have time to play with you, interesting.


<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/varqun.jpg">
</p>
<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/扫地盲僧公众号.png">
</p>
