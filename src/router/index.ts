/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:19:27
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 19:24:14
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { useSettingsOutsideStore } from "../store/modules/settings"
import Home from "@/views/index.vue"
import HelloWorld from "@/components/HelloWorld.vue"
import GithubDemo from "@/views/demo/GithubDemo.vue"

const routesContext = import.meta.globEager("./modules/*.js")
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Home,
  },
  {
    path: "/demo",
    name: "GithubDemo",
    component: GithubDemo,
  },
]
//自动挂载路由方式
Object.keys(routesContext).forEach((v) => {
  routes.push(routesContext[v].default)
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
