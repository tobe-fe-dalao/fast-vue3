<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { Space, Button, Switch } from '@arco-design/web-vue'
import { IconPlus, IconDelete } from '@arco-design/web-vue/es/icon'
import SvgIcon from '@/components/SvgIcon/index.vue'

const title = ref('I want to study typescript')
// 检测浏览器系统主题
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

const ThemeChange = (val: boolean) => {
    if (!val) {
        document.documentElement.classList.add('dark')
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme')
        document.documentElement.classList.remove('dark')
    }
}
</script>

<template>
    <header class="Male antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <div
            class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
        >
            <div class="max-w-8xl mx-auto">
                <div
                    class="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4"
                >
                    <div class="relative flex items-center">
                        <a
                            class="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto text-ms leading-6 font-semibold dark:text-slate-200"
                            href="https://github.com/MaleWeb"
                        >扫地盲僧</a>
                        <div class="relative hidden lg:flex items-center ml-auto">
                            <nav
                                class="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200"
                            >
                                <ul class="flex space-x-8">
                                    <li>
                                        <a
                                            class="hover:text-sky-500 dark:hover:text-sky-400"
                                            href="/"
                                        >Docs</a>
                                    </li>
                                    <li>
                                        <a
                                            href="/demo"
                                            class="hover:text-sky-500 dark:hover:text-sky-400"
                                        >Components</a>
                                    </li>
                                    <li>
                                        <a
                                            class="hover:text-sky-500 dark:hover:text-sky-400"
                                            href="/blog"
                                        >Blog</a>
                                    </li>
                                </ul>
                            </nav>
                            <div
                                class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800"
                            >
                                <Space size="large">
                                    <Switch
                                        type="round"
                                        checked-color="#86909c"
                                        unchecked-color="#253250"
                                        @change="ThemeChange"
                                    />
                                </Space>
                                <a
                                    href="https://github.com/MaleWeb/vvtp"
                                    target="_bank"
                                    class="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                                >
                                    <SvgIcon name="svg-github" size="small" color="#999999" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="less">
.prose {
    color: #334155;
    font-size: 0.875em;
    font-variant-ligatures: none;
    code {
        color: #0f172a;
        font-family: Fira Code VF, ui-monospace, SFMono-Regular, Menlo, Monaco,
            Consolas, Liberation Mono, Courier New, monospace;
        &::before {
            content: "`";
        }
        &::after {
            content: "`";
        }
    }
    &.dark\:prose-dark {
        color: #94a3b8;
        code {
            color: #e2e8f0;
        }
    }
}
</style>
