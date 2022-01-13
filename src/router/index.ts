import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'
import Home from '@/views/GithubNum.vue'
import HelloWorld from '@/components/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/hello',
        name: 'Hello',
        component: HelloWorld
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
