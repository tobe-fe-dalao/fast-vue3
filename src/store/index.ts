import { defineStore } from 'pinia'

export default defineStore({
    id: 'app',
    state() {
        return {
            name: '扫地盲僧'
        }
    }
})