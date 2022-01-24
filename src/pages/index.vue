<!--
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:29:46
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-24 17:15:27
-->
<script setup lang="ts">
import Header from "@/components/Header.vue"
import { version } from "../../package.json"
import SvgIcon from "@/components/SvgIcon/index.vue"
import request from "../utils/http/axios"
import getGithubVersion from "../utils"
import { ref, onMounted, reactive, watchEffect } from "vue"

const vue3Version = ref([]);
const data = reactive([
  {
    content:
      "支持最新的Vue3.X版本🎆 配套新版Vue Router 4.X Proxy、Setup、Hooks等特性超前体验加强对TS的支持，快来开箱使用吧🤣",
    avatar: "https://v3.cn.vuejs.org/logo.png",
    title: "Vue3",
    version: "https://api.github.com/repos/vuejs/core/releases",
    github: "https://github.com/vuejs/vue",
    color: "from-green-400 to-cyan-500",
    author: "尤大作品",
  },
  {
    content:
      "号称新一代前端开发与构建工具🎆，极速启动、原生ESM、HMR热重载、TS支持、Rollup插件等等<br>2022超火生态还等什么？💕",
    avatar: "https://vitejs.cn/logo.svg",
    title: "Vite2.7",
    version: "https://api.github.com/repos/vitejs/vite/releases",
    github: "https://github.com/vitejs/vite",
    color: "from-orange-400 to-purple-600",
    author: "新一代构建工具",
  },
  {
    content:
      "2021全球语言持续霸榜，始于JavaScript，归于JavaScript🎆，构建大型应用程序、先进的JS语法支持、大厂前端必备基础🛵",
    avatar:
      "https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png",
    title: "TypeScript4.5",
    version: "https://api.github.com/repos/Microsoft/TypeScript/releases",
    github: "https://github.com/Microsoft/TypeScript",
    color: "from-cyan-400 to-light-blue-500",
    author: "JS的超集",
  },
  {
    content:
      "只有1kb经典之作支持、Vue devtools 挂钩🎆、类型安全、模块化设计、关联本地存储的响应等等更多新特性🍡<br>学不动？Come on 卷起来",
    avatar: "https://pinia.vuejs.org/logo.svg",
    title: "Pinia",
    version: "https://api.github.com/repos/vuejs/pinia/releases",
    github: "https://github.com/vuejs/pinia",
    color: " from-yellow-400 to-orange-500",
    author: "Vuex最佳替代品",
  },
])
</script>
<template>
  <Header />
  <main class="max-w-5xl mx-auto px-4 pb-22 sm:px-6 md:px-8 xl:px-12 xl:max-w-6xl">
    <div class="pt-16 pb-9 sm:pb-16 sm:text-center">
      <h1
        class="relative mb-4 font-blimone text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-slate-200"
      >
        Vue3+Vite2.x+Ts+Pinia大厂开发必备
        <span
          class="version tracking-wide absolute text-4xl bg-gradient-to-br from-fuchsia-500 to-purple-600"
        >{{ `V${version}` }}</span>
      </h1>
      <p class="text-2xl text-slate-300 dark:text-slate-400">最新Vue3技术流，超全配置，大厂协作规范，大佬必备神器</p>
    </div>
  </main>
  <article
    class="max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44"
  >
    <ul class="flex items-center w-full py-8">
      <li v-for="(item, index) in data" :key="index * 1.1" class="px-3 md:px-4 flex-none">
        <figure class="shadow-lg rounded-xl flex-none w-80 md:w-xl">
          <blockquote
            class="rounded-t-xl bg-white px-6 py-8 md:p-5 text-lg md:text-base leading-8 md:leading-8 font-semibold text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:highlight-white/5"
          >
            <SvgIcon name="svg-marks" />
            <p v-html="item.content"></p>
          </blockquote>
          <figcaption
            class="flex items-center space-x-4 p-6 md:px-10 md:py-6 bg-gradient-to-br rounded-b-xl leading-6 text-white"
            :class="item.color"
          >
            <div class="flex-none w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <img :src="item.avatar" class="w-12 h-12 rounded-full" loading="lazy" />
            </div>
            <div class="flex-auto">
              <div class="text-base font-semibold dark:text-slate-200">
                {{ item.title }}
                <p>{{ item.author }}</p>
              </div>
            </div>
            <cite class="flex">
              <a
                :href="item.github"
                class="opacity-50 hover:opacity-75 transition-opacity duration-200"
              >
                <SvgIcon name="svg-github" />
              </a>
            </cite>
          </figcaption>
        </figure>
      </li>
    </ul>
  </article>
  <!-- Readme -->
</template>

<style lang="less" scoped>
.version {
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px;
  margin-left: 6px;
  border-radius: 10px;
}
</style>
