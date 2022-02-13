// import store from '@/store';
// import { useTitle } from '@vueuse/core';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';

// const { VITE_TOKEN_KEY, VITE_TITLE } = import.meta.env;

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
