import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserProfile, LoginData } from '/@/api/user/index';
import { setToken, clearToken } from '/@/utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_name: undefined,
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    blogJuejin: undefined,
    blogZhihu: undefined,
    blogGithub: undefined,
    profileBio: undefined,
    devLanguages: undefined,
    role: '',
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'user' : 'admin';
        resolve(this.role);
      });
    },
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    async login(loginForm: LoginData) {
      const result = await userLogin(loginForm);
      const token = result?.token;
      if (token) {
        setToken(token);
      }
      return result;
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      // location.reload();
    },
  },
});
