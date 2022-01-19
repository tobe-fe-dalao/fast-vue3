import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'
import Home from '@/views/index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import GithubDemo from '@/views/demo/GithubDemo.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/demo',
        name: 'GithubDemo',
        component: GithubDemo
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
