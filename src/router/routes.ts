const routes = [
  {
    path: '/',
    component: () => import('@/components/Basic/index.vue'),
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        name: 'List',
        path: 'list',
        component: () => import('@/views/List/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        name: 'Member',
        path: 'member',
        component: () => import('@/views/Member/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
];

export default routes;
