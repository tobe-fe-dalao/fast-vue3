export default [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: '登录',
    },
  },
]
