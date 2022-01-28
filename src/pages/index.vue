<script setup lang="ts">
import Header from "@components/Header.vue"
import { version } from "../../package.json"
import SvgIcon from "@components/SvgIcon/index.vue"
import { useAppStore } from '@/store/modules/app'
import { framework } from "./data"

const appStore = useAppStore()
const data = ref(framework)

// const user = await userApi.getUserProfile()
// console.log(user, '获取用户信息')
</script>
<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">
    <Header />
    <main class="max-w-5xl px-4 mx-auto pb-22 sm:px-6 md:px-8 xl:px-12 xl:max-w-6xl">
      <div class="pt-8 pb-7 sm:pb-8 sm:text-center">
        <h1
          class="relative mb-4 text-4xl tracking-tight font-blimone sm:text-5xl lg:text-6xl text-slate-900 dark:text-slate-200"
        >
          {{ appStore.h1 }}
          <span
            class="absolute text-2xl tracking-wide version lg:text-4xl bg-gradient-to-br from-fuchsia-500 to-purple-600"
          >{{ `V${version}` }}</span>
        </h1>
        <p class="text-2xl text-slate-800 dark:text-slate-400">最新Vue3技术流，超全配置，大厂协作规范，大佬必备神器</p>
      </div>
    </main>
    <article class="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44">
      <ul
        class="flex flex-wrap items-center justify-center py-6 sm:px-20 lg:px-36 xl:px-52 sm:justify-start lg:justify-start"
      >
        <li
          v-for="(item, index) in data"
          :key="index * 1.1"
          class="px-3 pt-4 md:px-4 sm:pt-5 md:pb-8"
        >
          <figure class="flex-none shadow-lg rounded-xl w-80 md:w-xl">
            <blockquote
              class="px-6 py-8 text-lg font-semibold leading-8 bg-white rounded-t-xl md:p-5 md:text-base md:leading-8 text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:highlight-white/5"
            >
              <SvgIcon name="svg-marks" />
              <p v-html="item.content"></p>
            </blockquote>
            <figcaption
              class="flex items-center p-6 space-x-4 leading-6 text-white md:px-10 md:py-6 bg-gradient-to-br rounded-b-xl"
              :class="item.color"
            >
              <div
                class="flex items-center justify-center flex-none bg-white rounded-full w-14 h-14"
              >
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
                  class="transition-opacity duration-200 opacity-50 hover:opacity-75"
                >
                  <SvgIcon name="svg-github" />
                </a>
              </cite>
            </figcaption>
          </figure>
        </li>
      </ul>
    </article>
  </div>

  <!-- Readme -->
</template>

<style lang="less" scoped>
.version {
  display: inline-block;
  padding: 6px;
  margin-left: 6px;
  border-radius: 10px;
}
</style>
