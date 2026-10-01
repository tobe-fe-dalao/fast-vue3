import type { Router } from 'vue-router';

import { useUserStore } from '@fast-vue3/stores';

export interface AccessGuardOptions {
  /** 白名单路由（不需要登录即可访问） */
  whiteList?: string[];
  /** 登录页路由名称 */
  loginRoute?: string;
}

const DEFAULT_WHITE_LIST = ['/login', '/404', '/403'];

/**
 * 注册路由级权限守卫
 * 各 app 在 router/index.ts 中调用此函数
 */
export function setupAccessGuard(
  router: Router,
  options: AccessGuardOptions = {},
): void {
  const { whiteList = DEFAULT_WHITE_LIST, loginRoute = '/login' } = options;

  router.beforeEach((to) => {
    const userStore = useUserStore();
    const isLoggedIn = userStore.isLoggedIn;

    // 白名单直接放行
    if (whiteList.some((path) => to.path.startsWith(path))) {
      return true;
    }

    // 未登录跳转登录页
    if (!isLoggedIn) {
      return { path: loginRoute, query: { redirect: to.fullPath } };
    }

    return true;
  });
}

/** 权限指令（v-access）用于控制元素级权限 */
export const accessDirective = {
  mounted(el: HTMLElement, binding: { value: string | string[] }) {
    const userStore = useUserStore();
    const requiredRole = binding.value;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(userStore.role as string)) {
      el.style.display = 'none';
    }
  },
};
