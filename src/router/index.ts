import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
