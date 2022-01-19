<!--
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:29:46
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-19 22:24:11
-->
<script setup lang="ts">
import Header from "@/components/Header.vue"
import { version } from "../../package.json"
import SvgIcon from "@/components/SvgIcon/index.vue"
import request from '@/utils/http/axios/index.ts'
import getGithubVersion from '@/utils/index.ts'
import { ref, onMounted, reactive } from 'vue'

const vue3Version = ref('');
const data = reactive([
    {
        content: '支持最新的Vue3.X版本🎆<br/> 配套新版Vue Router 4.X<br/> Proxy、Setup、Hooks等特性超前体验加强对TS的支持，还有什么可犹豫的？快来开箱使用吧🤣',
        avatar: 'https://v3.cn.vuejs.org/logo.png', title: 'Vue3', version: 'https://api.github.com/repos/vuejs/core/releases', github: 'https://github.com/vuejs/vue',
        color: 'from-green-400 to-cyan-500',
        position: 'transform: rotate(-2deg)translateZ(0px);'
    },
    {
        content: '号称新一代前端开发与构建工具🎆，极速启动、原生ESM、HMR热重载、TS支持<br/>Rollup插件、2022超火生态还等什么？💕',
        avatar: 'https://vitejs.cn/logo.svg', title: 'Vue3', version: 'https://api.github.com/repos/vuejs/core/releases', github: 'https://github.com/vuejs/vue',
        color: 'from-orange-400 to-purple-600',
        position: 'transform: rotate(1deg)translateZ(0px);'
    }
])
async function getversion(url: string) {
    await getGithubVersion(url).then(res => {
        console.log(res.data[0].tag_name, 'oooooooooo')
        return res.data[0].tag_name;
    });
}
</script>

<template>
    <Header />
    <main class="max-w-5xl mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 xl:max-w-6xl">
        <div class="pt-16 pb-9 sm:pb-16 sm:text-center">
            <h1
                class="relative mb-4 text-9xl sm:text-7xl tracking-tight text-slate-900 font-blimone dark:text-slate-200"
            >
                Vue3+Vite2.x+Ts+Pinia大厂开发必备
                <span
                    class="version tracking-wide absolute text-4xl bg-gradient-to-br from-fuchsia-500 to-purple-600"
                >{{ `V${version}` }}</span>
            </h1>
            <p class="text-2xl text-slate-300 dark:text-slate-400">最新Vue3技术流，超全配置，大厂协作规范，大佬必备神器</p>
        </div>
        <article class="space-y-16 flex overflow-hidden -my-8">
            <ul class="flex items-center w-full py-8">
                <li class="px-3 md:px-4 flex-none" v-for="(item,index) in data" :key="index * 1.1">
                    <figure
                        class="shadow-lg rounded-xl flex-none w-80 md:w-xl"
                        :style="item.position"
                    >
                        <blockquote
                            class="rounded-t-xl bg-white px-6 py-8 md:p-10 text-lg md:text-xl leading-8 md:leading-8 font-semibold text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:highlight-white/5"
                        >
                            <SvgIcon name="svg-marks" />
                            <p v-html="item.content"></p>
                        </blockquote>
                        <figcaption
                            class="flex items-center space-x-4 p-6 md:px-10 md:py-6 bg-gradient-to-br rounded-b-xl leading-6 text-white"
                            :class="item.color"
                        >
                            <div
                                class="flex-none w-14 h-14 bg-white rounded-full flex items-center justify-center"
                            >
                                <img
                                    :src="item.avatar"
                                    alt
                                    class="w-12 h-12 rounded-full"
                                    loading="lazy"
                                />
                            </div>
                            <div class="flex-auto">
                                <div
                                    class="text-base font-semibold dark:text-slate-300"
                                >{{ item.title }}</div>
                                <br />
                                <div class="mt-0.5">当前版本{{ getversion(item.version) }}</div>
                            </div>
                        </figcaption>
                    </figure>
                </li>
            </ul>
        </article>
    </main>
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
