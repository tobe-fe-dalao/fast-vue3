import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { AppState } from './types';

export const useAppStore = defineStore(
    // 唯一ID
    'app',
    {
        state: () => ({
            title: "FastVue3,一个快速开箱即用的Vue3+Vite模板",
            h1: 'Vue3+Vite2.x+Ts+Pinia大厂开发必备',
            theme: 'dark'
        }),
        getters: {},
        actions: {
            // Update app settings
            updateSettings(partial: Partial<AppState>) {
                // @ts-ignore-next-line
                this.$patch(partial);
            },

            // Change theme color
            toggleTheme(dark: boolean) {
                if (dark) {
                    this.theme = 'dark';
                    document.documentElement.classList.add('dark');
                    document.body.setAttribute('arco-theme', 'dark');
                } else {
                    this.theme = 'light';
                    document.documentElement.classList.remove('dark');
                    document.body.removeAttribute('arco-theme');
                }
            },
        }
    }
)

export function useAppOutsideStore() {
    return useAppStore(piniaStore)
}