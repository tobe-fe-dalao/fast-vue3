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
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue'),
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('../views/features/index.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog/index.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact/index.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history:
    import.meta.env.VITE_STATIC_MOCK === 'true'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
