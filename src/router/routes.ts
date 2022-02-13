import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/Home'),
    meta: {
      keepAlive: true
    }
  }
];

export default routes;
