import type { UserState } from './types';

import {
  clearToken,
  getToken,
  setRefreshToken,
  setToken,
} from '@fast-vue3/utils';

import { defineStore } from 'pinia';

// Operation ownership belongs to each store, outside persisted user state.
const operations = new WeakMap<object, number>();

function nextOperation(store: object) {
  const operation = (operations.get(store) ?? 0) + 1;
  operations.set(store, operation);
  return operation;
}

export const useUserStore = defineStore('fast-vue3-user', {
  state: (): UserState => ({
    userId: undefined,
    userName: undefined,
    avatar: undefined,
    email: undefined,
    role: '',
    token: getToken() ?? undefined,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
  },
  actions: {
    setUserInfo(info: Partial<UserState>) {
      Object.assign(this, info);
    },
    setToken(token: string) {
      nextOperation(this);
      setToken(token);
      this.token = getToken() ?? undefined;
    },
    async login(
      authenticate: () => Promise<{
        accessToken: string;
        refreshToken: string;
      }>,
      getProfile: () => Promise<Partial<UserState>>,
    ) {
      this.logout();
      const operation = nextOperation(this);
      let ownedToken = getToken();
      const isCurrent = () =>
        operations.get(this) === operation && getToken() === ownedToken;
      try {
        const tokens = await authenticate();
        if (!isCurrent()) return false;
        this.$reset();
        setToken(tokens.accessToken);
        ownedToken = getToken();
        this.token = ownedToken ?? undefined;
        if (!ownedToken) throw new Error('登录响应缺少有效令牌');
        setRefreshToken(tokens.refreshToken);
        const profile = await getProfile();
        if (!isCurrent()) return false;
        this.setUserInfo(profile);
        return true;
      } catch (error) {
        if (!isCurrent()) return false;
        this.logout();
        throw error;
      }
    },
    async logoutWithRevoke(revoke: () => Promise<unknown>) {
      const operation = nextOperation(this);
      const token = getToken();
      try {
        await revoke();
      } catch {
        // Local logout must also work while the server is unavailable.
      }
      if (operations.get(this) !== operation || getToken() !== token)
        return false;
      this.logout();
      return true;
    },
    logout() {
      nextOperation(this);
      clearToken();
      this.$reset();
    },
  },
  persist: {
    pick: ['userName', 'avatar', 'role'],
    afterHydrate: ({ store }) => {
      store.token = getToken() ?? undefined;
      if (!store.token) store.$reset();
    },
  },
});
