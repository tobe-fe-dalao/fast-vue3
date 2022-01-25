<!--
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-17 16:21:01
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-24 17:45:38
-->


# FastVue3 

`fast-vue3`，是`Vue3+Vite2.7+TypeScript+Pinia`等Vue的开发工具链。融入了当前比较主流的工具链，可以直接开箱使用，方便小伙伴学习，最好的学习方式——`边用边学边学边用`~ 

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1221b496334f4bd6bf8f8c51426a0eeb~tplv-k3u1fbpfcp-watermark.image?) 


# 特点

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

- 💕 `fast-vue3`就不赘述了，框架基座支持`Vue3+Vite2.7+TypeScript+Pinia`
- 🔌 支持[husky](https://github.com/typicode/husky)和 [lint-staged](https://github.com/okonet/lint-staged)，大厂团队代码规范协作必备
- 🖼️ 支持`svg`图标，已封装一个简单的`SvgIcon`组件，可以直接读取文件下的`svg` 
- ⚙️ 支持`Plop`，代码文件自动生成，提供三种预设模板`pages`,`components`,`store`等可自定义 
- 📦 支持`axios(ts版)`,已封装了主流的拦截器，请求调用等方法  
- 👽 支持`router,store`模块化，内置生成路由钩子
- 🏗 支持`vw/vh`移动端布局兼容，也可以使用`plop`自己配置生成文件

# 使用 
一键三连: Star 或 Fork 或 [可视化仓库](https://github1s.com/MaleWeb/fast-vue3) 

```shell
# 拉取仓库代码
git clone  https://github.com/MaleWeb/fast-vue3.git

# 进入项目文件夹
cd fast-vue3 

# 安装项目依赖
pnpm install

# 运行
pnpm run dev
```
如果不报错，恭喜你点火成功。否则，请看下面常见问题。

如果你已经了解本模板，建议你拉取 `template` 分支进行项目开发，该分支不含任何示例代码。

```
# clone  template 分支
git clone -b template https://github.com/MaleWeb/fast-vue3.git
```
# 配置
为了方便其他小伙伴了解配置，这里简单介绍一些核心部分。资料部分也有详细的配置，建议大家直接阅读官方文档。关于`vite vue pinia`的配置见[可视化仓库](https://github1s.com/MaleWeb/fast-vue3)
## TypeScript
`TS`几乎已然成为了大厂必备技能，这两年也频繁出现在面试题与高级前端考核中。所以，我果断默认了`TS`。可能对一些小伙伴比较残忍，学吧。

```shell
   # 安装ts相关依赖
   pnpm add @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
根目录配置`tsconfig.json` 
```json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": [
      "esnext",
      "dom"
    ],
    "types": [
      "node"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "**/*.ts"
  ]
}
```
## 代码规范
目前多数大厂团队使用```husky + lint-staged```来约束代码规范，通过`pre-commit`实现lint检查、单元测试、代码格式化等。 IDE 配置（`.editorconfig`）、ESLint 配置（`.eslintrc.js` 和 `.eslintignore`）、StyleLint 配置（`.stylelintrc` 和 `.stylelintignore`），详细请看对应的配置文件。  

**关闭代码规范**  
如果不想使用，将 `src/` 目录分别加入 `.eslintignore` 和 `.stylelintignore` 进行忽略即可。 

## SVG支持
随着浏览器兼容性的提升，SVG的性能逐渐凸显，很多大厂团队都在创建自己的SVG管理库，后面工具库会有推荐。

这里将svg组件化，正好算是一个小`demo`。创建文件夹`src/asstes/icons/svg`，将svg图标放在`svg`下面，通过`name`即可使用。
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
封装`SvgIcon`组件
```javascript
<template>
    <svg aria-hidden="true" class="svg-icon-spin" :class="calsses">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
const props = defineProps({
    prefix: {
        type: String,
        default: 'icon'
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#333'
    },
    size: {
        type: String,
        default: 'default'
    }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const calsses = computed(() => {
    return {
        [`sdms-size-${props.size}`]: props.size
    }
})
const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
</script>
<style lang="less" scoped>
.svg-icon-spin {
    width: v-bind("fontSize.default");
    height: v-bind("fontSize.default");
    fill: v-bind(color);
    vertical-align: middle;
    color: v-bind(color);
    &.sdms-size-small {
        font-size: v-bind("fontSize.small");
        height: v-bind("fontSize.small");
    }
    &.sdms-size-large {
        font-size: v-bind("fontSize.large");
        height: v-bind("fontSize.large");
    }
}
</style>
```
调用svg组件
```javascript
import SvgIcon from '@/components/SvgIcon'
<SvgIcon name="svg-github" size="small" color="#999999" />
```
## Plop自动生成
`plop`是一个脚手架工具，其实大厂为了进一步规范团队协作，自动生成是最好的`init`初始化选择。这其实在后端早已屡见不鲜，比如`CURD`Api的自动生成，甚至`controll、module`都是可视化或命令行生成。又如流行的数据库迁移工具`migration`，也是进一步规范多人协作数据表管理。由此可见，技术发展的终点是一个圆，也说明前端还有很长一段路要走。

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
在根目录下创建`plop-tpls/page`文件夹，并创建`index.hbs`和`prompt.js`
```javascript
// index.hbs 一种模板文件
<template>
    <div>
        <!-- Your content -->
    </div>
</template>

<script setup name="{{ properCase componentName }}">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
</script>

<style lang="less" scoped>

</style>
```
```javascript
// prompt.js执行函数
const path = require('path')
const fs = require('fs')

function getFolder(path) {
    let components = []
    const files = fs.readdirSync(path)
    files.forEach(function (item) {
        let stat = fs.lstatSync(path + '/' + item)
        if (stat.isDirectory() === true && item != 'components') {
            components.push(path + '/' + item)
            components.push.apply(components, getFolder(path + '/' + item))
        }
    })
    return components
}

module.exports = {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'path',
            message: '请选择页面创建目录',
            choices: getFolder('src/pages')
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: data => {
        let relativePath = path.relative('src/pages', data.path)
        const actions = [
            {
                type: 'add',
                path: `${data.path}/{{dotCase name}}.vue`,
                templateFile: 'plop-tpls/page/index.hbs',
                data: {
                    componentName: `${relativePath} ${data.name}`
                }
            }
        ]
        return actions
    }
}
```
**运行调试**
```json
// 在package.json里面配置启动命令行
"scripts": {
...
"plop": "plop"
...
}
```
```shell
// 启动命令
pnpm run plop
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6756aebd4d6407e8545eed41b6e5864~tplv-k3u1fbpfcp-watermark.image?)
## 移动端的支持
移动端默认集成[postcss-px-to-viewport](https://www.npmjs.com/package/postcss-px-to-viewport) 插件，使用时将`.postcss.config.js`文件修改为`postcss.config.js`即可。开发正常使用`px`，最终转化为`vw`。

# 工具库
学会使用适当的工具库，让`coding`事半功倍。尤其是开源的工具库，值得每个人学习，因为这本身就是你应该达到的层次。这里推荐一些大厂常用的类库，因为我喜新...，以下工具均可直接引入。

## JS库
- [pnpm](https://pnpm.io/)，一个依赖包全局管理的工具，老板再也不用担心我的C盘不够用。Vite官方推荐，字节官方前端团队大规模项目考验
  
![image-20220110125758056](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125758056.png)
- [mitt 全局事件监听库](https://github.com/developit/mitt)，Vue3官方推荐
- [Hammer](http://hammerjs.github.io/)，可以识别由触摸、鼠标和指针事件做出的手势,只有 7.34kb
- [outils](https://github.com/proYang/outils)，开发中常用的函数集，也可以使用`lodash`

- [tailwindcss](https://tailwindcss.com/)，艾玛香的一塌糊涂，一行css不写，3分钟出一个页面。不适合初中级前端，建议还是先踏实学基础再用框架。

  ![tailwindcss-1](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-1.gif)

  ![tailwindcss-2](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/tailwindcss-2.gif)

- [Vue I18n](https://vue-i18n.intlify.dev/)  是 Vue.js 的国际化插件，如果你想做开源框架，国际化首选插件。

- [ViteSSG](https://github.com/antfu/vite-ssg)，SEO优化，这个项目有点意思，大家可以玩玩这个方案，之前我都是通过服务端渲染搞SEO，后来了解到这个可以直接在Vue3的服务器上生成。

- [Vitest](https://github.com/vitest-dev/vitest),基于Vite的单元测试工具，目前迭代比较快，尤大金牌赞助。可以持续关注，不建议使用在小项目中。

  ![image-20220110125605172](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/image-20220110125605172.png)


## UI库
- [arco-design](https://github.com/arco-design/arco-design)，字节团队新出的UI框架,配置层面更为灵活,`fast-vue3`使用的就是这个,不喜欢的小伙伴可以移除
- [semi-design](https://github.com/DouyinFE/semi-design)，抖音前端出的框架，面向经常撕逼UI和FE，可以尝鲜玩玩
- [nutui](https://github.com/jdf2e/nutui)，京东前端团队出的UI框架，已升级到3.X，个人认为颜值最高并接受反驳
- [naive-ui](https://github.com/TuSimple/naive-ui)，尤大推荐，TypeScript语法，主题可调，这家公司挺厉害 
- 暂时就这些吧，困了,回头再补

# 资料
- 官方配置文档入口[vite](https://vitejs.cn/config/)、[pinia](https://pinia.vuejs.org/introduction.html)、[vue-router4](https://next.router.vuejs.org/zh/introduction.html)、[plop](https://github.com/plopjs/plop)...
- 更详细的配置手册:https://juejin.cn/post/7036745610954801166
- vu3写组件实践案例:https://juejin.cn/post/7052717075168493598

# 最后

-   欢迎加群[前端水友群](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Ff2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2747d1a5fcf4d9894e997b140b8a0d8~tplv-k3u1fbpfcp-zoom-1.image")，划水，大家一起划水，现在粉丝群甚少讨论技术，那么我们就一起水吧。欢迎关注我的公众号[扫地盲僧](https://link.juejin.cn?target=https%3A%2F%2Fp3-juejin.byteimg.com%2Ftos-cn-i-k3u1fbpfcp%2Fa08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%2522 "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08fd56556654baa86975b2a5ba6a8f0~tplv-k3u1fbpfcp-watermark.image%22")。  
  
-   前沿技术，各类体验、互动相关的技术，各类译文、研报的提前透视。
-   白嫖，承诺发布的所有付费资源，粉丝群统统免费白嫖，不然大家谁有时间跟你玩，嘿嘿。
![](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/varqun.jpg) 
![](https://cdn.jsdelivr.net/gh/MaleWeb/picture/images/techblog/扫地盲僧公众号.png)
