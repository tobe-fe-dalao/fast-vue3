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
    <img src="" alt="">
</p>

すぐに使える Vue3 + Vite2 + TypeScript など。 大規模なアプリケーションを迅速に構築するためのテンプレートフレームワーク。 さまざまなプラグインが統合され、モジュール化とリードオンデマンド用に最適化されているため、自信を持って使用できます。 [ドキュメントを更新するには、ここをクリックしてください](https://github.com/tobe-fe-dalao/fast-vue3/blob/main/docs/update.md)

[English](./README-en.md) | [简体中文](./README.md) | 日本語

# 特徴

ここでは、いくつかのコアパーツの簡単な紹介を示しますが、インストールパーツについては詳しく説明しません。 公式ドキュメントまたは[ビジュアルウェアハウス]（https://github1s.com/tobe-fe-dalao/fast-vue3）を直接読むことをお勧めします。

## 🪂 技術巨人のコラボレーション-コード仕様

🪁 現在、多くのハイテク巨人チームは、一般的に [husky](https://github.com/typicode/husky) と [lint-staged](https://github.com/okonet/lint-staged)を使用してコード仕様を制約しています。

- `pre-commit`を介して、lint チェック、単体テスト、コードフォーマットなどを実装します。
- VsCode と組み合わせる（保存時に自動的にフォーマットする：editor.formatOnSave：true）
- Git フックと組み合わせる（コミット前に実行：pre-commit => npm run lint：lint-staged）
- IDE 構成（ `.editorconfig`）、ESLint 構成（` .eslintrc.js`和 `.eslintignore`）、StyleLint 構成（` .stylelintrc`和 `.stylelintignore`）、詳細については、対応する構成ファイルを参照してください.

🔌 コード仕様を閉じる `.eslintignore` と ` .stylelintignore`をそれぞれ `src /`ディレクトリに追加して無視します.

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

## 💕JSX 構文をサポートする

```json
{
    ...
    "@vitejs/plugin-vue-jsx": "^1.3.10"
    ...
}
```

## 🎸 UI コンポーネントはオンデマンドで読み込まれ、自動的にインポートされます

```typescript
// モジュラーライティング
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

## 🧩Vite プラグインのモジュール性

プラグインの管理を容易にするために、すべての `config`を` config / vite / plugins`に入れてください。 将来的には、非常にクリーンに管理するために、フォルダーに直接分割されたプラグインが増える予定です。 `Fast-Vue3`は、特定のプラグインの動的なオープンを区別するために、統合された環境変数管理を追加することは言及する価値があります。

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

## 📱 `Pinia`のサポート、次世代の`Vuex5 である

ファイルを作成する `src/store/index.ts`

```typescript
// モジュール化をサポートし、plopを使用してコマンドラインからワンクリックで生成できます
import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'
const pinia = createPinia()
export { useAppStore, useUserStore }
export default pinia
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
    actions: {},
  },
)
```

## 🤖 ファイルを自動的に生成するための `Plop`をサポート

⚙️ コードファイルは自動的に生成され、3 つのプリセットテンプレート `pages`、` components`、 `store`を提供します。また、必要に応じて、より多くの自動生成スクリプトを設計することもできます。 通常、バックエンドエンジニアはこのフォームを使用します。これは非常に効率的です。。

```shell
# install plop
pnpm add plop
```

ルートディレクトリ `plopfile.ts`に作成します

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

## 🖼️ `SVG`アイコンのサポート

ブラウザの互換性の向上に伴い、SVG のパフォーマンスは徐々に顕著になりました。 多くの技術大手チームが独自の SVG 管理ライブラリを作成しており、ツールライブラリは後で推奨されます。

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
// 移行
import userApi from '@api/user'
// コンポーネントは、セットアップモードで直接参照できます
const res = await userApi.profile()
```

## 👽 自動生成 `router`、 コンポーネントをフィルタリングします

`vue-router4.0`のモジュール化をサポートし、pages フォルダーを取得してルートを自動的に生成し、動的ルートをサポートします

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

console.log(routes, 'print generate auto-generated routes')
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
       `,
})
```

ルートディレクトリに `_createProductionServer.ts`ファイルを作成します。`_`で始まらないファイルは自動的にモックファイルにロードされます

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

## 🎎 プロキシー

```typescript
// vite 構成
import proxy from '@config/vite/proxy';
export default defineConfig({
    ...
    server: {
        hmr: { overlay: false }, // HMR接続を無効または構成し、server.hmr.overlayをfalseに設定して、サーバーエラーマスキングレイヤーを「無効」にします
        // サービス構成
        port: VITE_PORT, // type:number サーバーポートを指定します；
        open: false, // type:boolean | string サーバーの起動時にブラウザでアプリケーションを自動的に開きます；
        cors: false, // type:boolean | CorsOptionsは、開発サーバーのCORSを構成します.デフォルトで有効になっており、任意のオリジンを許可します
        host: '0.0.0.0', // IP構成、IPからの起動をサポート
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

## 🎉 そのた

- 🏗 `vw / vh`モバイル端末レイアウトの互換性をサポートします。`plop`を使用して、生成されたファイルを自分で構成することもできます
- `commiting`にはさらに多くの新機能が追加されています。より良い解決策がある場合は、` PR`を歓迎します。

# 使用する

スターとフォロー：スターまたはフォークまたは[ビジュアルウェアハウス](https://github1s.com/tobe-fe-dalao/fast-vue3)

```shell
# リポジトリコードをプルする
git clone  https://github.com/tobe-fe-dalao/fast-vue3.git

# プロジェクトフォルダに入る
cd fast-vue3

# プロジェクトの依存関係をインストールする
pnpm install

# ラン
pnpm run dev
```

エラーが報告されない場合は、点火に成功しました。それ以外の場合は、以下の FAQ を参照してください.

このテンプレートをすでに知っている場合は、プロジェクト開発のために `テンプレート`ブランチをプルすることをお勧めします。このブランチには、サンプルコードは含まれていません。

```
# テンプレートブランチのクローン
git clone -b template https://github.com/tobe-fe-dalao/fast-vue3.git
```

# ツール ライブラリ

適切なツールライブラリを使用して、 `コーディング`がより少ないリソースでより多くのことを実行できるようにする方法を学びます。 特にオープンソースツールライブラリは、到達すべきレベルであるため、誰もが学ぶ価値があります。 新しいものが好きなので、主要なメーカーで一般的に使用されているクラスライブラリをいくつか示します...次のツールを直接インポートできます。

## JS ライブラリ

- [pnpm](https://pnpm.io/)，パッケージのグローバル管理に依存するツールである上司は、私の C ドライブが十分でないことを心配する必要がなくなりました。 Vite 公式推奨、ByteDance 公式フロントエンドチーム大規模プロジェクトテスト

![image-20220110125758056](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125758056.png)

- [mitt Global event listener library](https://github.com/developit/mitt)，Vue3 の公式推奨
- [Hammer](http://hammerjs.github.io/)，タッチ、マウス、ポインターのイベントによって行われたジェスチャを認識できます。わずか 7.34kb
- [outils](https://github.com/proYang/outils)，開発で一般的に使用される関数のセットで、 `lodash`を使用することもできます

- [tailwindcss](https://tailwindcss.com/)，ああ、私のイエス様、CSS の行を書かなくても、ページは 3 分で作成されます。 ジュニアおよび中間のフロントエンドには適していません。 最初に基本を学び、次にフレームワークを使用することをお勧めします。

  ![tailwindcss-1](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-1.gif)

  ![tailwindcss-2](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-2.gif)

- [Vue I18n](https://vue-i18n.intlify.dev/)，Vue.js の国際化プラグイン。 オープンソースフレームワークを作成したい場合は、国際化に適したプラグインです。

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO 最適化、このプロジェクトは興味深いです。このソリューションで遊ぶことができます。以前はサーバー側のレンダリングで SEO を実行していましたが、後で Vue3 サーバーで直接生成できることを学びました。

- [Vitest](https://github.com/vitest-dev/vitest),Vite に基づく単体テストツールである反復は、現在比較的高速であり、EvanYou が後援しています。 引き続き注意を払うことができますが、小さなプロジェクトで使用することはお勧めしません。

  ![image-20220110125605172](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125605172.png)

# UI ライブラリ

- [arco-design](https://github.com/arco-design/arco-design)，Byte Dance チームの新しい UI フレームワークには、より柔軟な構成レベルがあります。 `fast-vue3`はそれを使用します。 気に入らない場合は削除できます。
- [semi-design](https://github.com/DouyinFE/semi-design)，Douyin のフロントエンドのフレームワークは、UI と FE を絶えず引き裂くことを目的としており、試してみることができます。
- [nutui](https://github.com/jdf2e/nutui)，JD のフロントエンドチームによって開発された UI フレームワークが 3.X にアップグレードされました。 個人的には見た目が一番高く、反論も受けられると思います。
- [naive-ui](https://github.com/TuSimple/naive-ui)，Evan You が推奨する、TypeScript 構文、調整可能なテーマ、この会社は非常に強力です。
- 今のところこれですべてです。後で補います。

# 参考

- 公式の構成ドキュメントエントリ[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://github.com/plopjs/plop)...
- より詳細な構成マニュアル:https://juejin.cn/post/7036745610954801166
- vu3 ライティングコンポーネントの練習ケース:https://juejin.cn/post/7052717075168493598

# 最後

- グループへようこそ [前端水友群](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Ff2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image')，さぼる、一緒にさぼるしましょう。今ではファングループがテクノロジーについて話し合うことはめったにないので、一緒にさぼるしましょう。 Wechat 公開番号に注目することを歓迎します [扫地盲僧](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Fa08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%2522 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%22')。
- 最先端のテクノロジー、さまざまな経験や相互作用に関連するテクノロジー、さまざまな翻訳や調査レポートの高度な視点。
- 無料で使用でき、すべての有料リソースがリリースされることが約束されており、すべてのファングループが無料で使用できます。それ以外の場合は、あなたと遊ぶ時間があります。本当に面白い。

<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/varqun.jpg">
</p>
<p>
<img width="360" src="https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/扫地盲僧公众号.png">
</p>
