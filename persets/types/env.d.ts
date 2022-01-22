/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-22 11:21:52
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-22 11:23:15
 */

declare module '*.vue' {
    import { App, defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent> & {
        install(app: App): void
    }
    export default component
}

declare module '*.md' {
    import { ComponentOptions } from 'vue'
    const Component: ComponentOptions
    export default Component
}
