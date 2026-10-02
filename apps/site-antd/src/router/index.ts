import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: { title: 'Fast Vue3 - 企业级多 UI 框架前端平台' },
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/product/index.vue'),
    meta: { title: '产品功能 - Fast Vue3' },
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('../views/docs/index.vue'),
    meta: { title: '文档 - Fast Vue3' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue'),
    meta: { title: '关于 - Fast Vue3' },
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('../views/features/index.vue'),
    meta: { title: '特性 - Fast Vue3' },
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('../views/pricing/index.vue'),
    meta: { title: '价格 - Fast Vue3' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/faq/index.vue'),
    meta: { title: '常见问题 - Fast Vue3' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog/index.vue'),
    meta: { title: '博客 - Fast Vue3' },
  },
  {
    path: '/blog/:id',
    name: 'blog-detail',
    component: () => import('../views/blog/detail.vue'),
    meta: { title: '博客详情 - Fast Vue3' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact/index.vue'),
    meta: { title: '联系我们 - Fast Vue3' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录 - Fast Vue3' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue'),
    meta: { title: '注册 - Fast Vue3' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  // Use Vite's base for deployments under a subpath.
  history:
    import.meta.env.VITE_STATIC_MOCK === 'true'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  const title = (to.meta as any)?.title;
  if (title) document.title = title;
});
