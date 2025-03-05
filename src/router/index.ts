import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//导入生成的路由数据
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
