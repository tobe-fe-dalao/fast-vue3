import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);
//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(baseURL),
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
