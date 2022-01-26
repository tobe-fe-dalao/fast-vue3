import { defineStore } from 'pinia'
import piniaStore from '@/store'

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