export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('../views/login/index.vue'),
  },

  {
    path: '/',
    name: 'layout',
    meta: {
      title: '导航页',
    },
    children: [
      {
        path: '/contain',
        name: 'menu',
        meta: {
          title: '导航页',
        },
        component: () => import('../views/contain/index.vue'),
      },
    ],
  },
];
