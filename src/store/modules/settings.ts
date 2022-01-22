/*
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 17:06:03
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-22 10:43:44
 */
import { defineStore } from "pinia"
import piniaStore from "../index"

export const useSettingsStore = defineStore(
  // 唯一ID
  "settings",
  {
    state: () => ({
      title: "FastVue3,一个快速开箱即用的Vue3+Vite模板",
    }),
    actions: {
      // 设置网页标题
      setTitle(title: string) {
        this.title = title
      },
    },
  }
)

export function useSettingsOutsideStore() {
  return useSettingsStore(piniaStore)
}
