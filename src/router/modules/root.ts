/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 18:11:32
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 18:11:32
 */
export default [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "登录",
    },
  },
]
