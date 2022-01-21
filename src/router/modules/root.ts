/*
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 18:11:32
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 18:11:32
 */
export default [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    }
]