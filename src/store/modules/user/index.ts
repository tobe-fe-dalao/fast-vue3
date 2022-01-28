import { defineStore } from 'pinia';
import {
    login as userLogin,
    logout as userLogout,
    getUserProfile,
    LoginData
} from '@/api/user/index';
import { setToken, clearToken } from '@/utils/auth';
import { UserState } from './types'

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
        }
    },
    actions: {
        switchRoles() {
            return new Promise((resolve) => {
                this.role = this.role === 'user' ? 'user' : 'admin';
                resolve(this.role);
            })
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
            const res = await getUserProfile();
            this.setInfo(res.data.result);
        },
        // 异步登录并存储token
        async login(loginForm: LoginData) {
            const res = await userLogin(loginForm);
            if (res.data && res.data.result) {
                setToken(res.data.result.token);
            }
            return res.data;
        },
        // Logout
        async logout() {
            await userLogout();
            this.resetInfo();
            clearToken();
            // 路由表重置
            // location.reload();
        }
    }
})