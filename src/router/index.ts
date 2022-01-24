/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:19:27
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-24 17:14:58
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { useSettingsOutsideStore } from "../store/modules/settings"
import Home from "@/pages/index.vue"
import HelloWorld from "@/components/HelloWorld.vue"
import GithubDemo from "@/pages/demo/GithubDemo.vue"
import routes from 'virtual:generated-pages'

const routesContext = import.meta.globEager("./modules/*.js")
//自动挂载路由方式
Object.keys(routesContext).forEach((v) => {
  routes.push(routesContext[v].default)
});
//导入生成的路由数据

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
