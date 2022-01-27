import { defineStore } from 'pinia'
import piniaStore from '@/store'
import {
    login as userLogin,
    logout as userLogout,
    getUserProfile,
    permission,
    LoginData
} from '@/api/user/index'

export const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({}),
        getters: {},
        actions: {}
    }
)

export function useUserOutsideStore() {
    return useUserStore(piniaStore)
}