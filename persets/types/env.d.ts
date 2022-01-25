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
