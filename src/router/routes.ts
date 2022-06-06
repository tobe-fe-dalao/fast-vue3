const routes = [
  {
    name: 'root',
    path: '/',
    redirect: '/home',
    component: () => import('/@/components/Basic/index.vue'),
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: '',
          keepAlive: true,
        },
      },
      {
        name: 'List',
        path: 'list',
        component: () => import('/@/views/list/index.vue'),
        meta: {
          title: '',
          keepAlive: true,
        },
      },
      {
        name: 'Member',
        path: 'member',
        component: () => import('/@/views/member/index.vue'),
        meta: {
          title: '',
          keepAlive: true,
        },
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
];

export default routes;
