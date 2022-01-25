/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-22 10:58:01
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-24 17:26:57
 */
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import {
    ArcoResolver,
    VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-md'
// SVG生成插件
import viteSvgIcons from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue'
import path from "path";
// @ts-ignore
import viteCompression from 'vite-plugin-compression'
// 支持动态路由生成
import Pages from 'vite-plugin-pages'
// 引入配置文件监听插件
import Restart from 'vite-plugin-restart'

const markdownWrapperClasses = 'rounded-t-xl bg-white px-6 py-8 md:p-10 text-lg md:text-xl leading-8 md:leading-8 font-semibold text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:highlight-white/5'
export default () => {
    return [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Markdown({
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
            },
            wrapperClasses: markdownWrapperClasses,
            markdownItSetup(md) {
                md.use(require('markdown-it-anchor'))
                // md.use(require('markdown-it-prism'))
            }
        }),
        Icons({
            autoInstall: true
        }),
        Components({
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [
                IconsResolver({
                    componentPrefix: ''
                }),
                ArcoResolver(),
                VueUseComponentsResolver()
            ]
        }),
        viteSvgIcons({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
        AutoImport({
            dts: './persets/types/auto-imports.d.ts',
            imports: [
                'vue',
                'pinia',
                'vue-router',
                '@vueuse/core'
            ],
            resolvers: [ArcoResolver()]
        }),
        // gzip压缩 生产环境生成 .gz 文件
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
        //依赖关系图
        Inspect(),
        //动态生成路由
        Pages({
            pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
            extensions: ['vue', 'md'],
            exclude: ["**/components/*.vue"],
            nuxtStyle: true,
        }),
        //配置文件改动自动重启
        Restart({
            restart: ['../../vite.config.js', '../../.env.*']
        })
    ]
}