/*
 * @GitHub: https://github.com/MaleWeb/vvtp
 * @version:
 * @Author: 扫地盲僧
 * @Date: 2022-01-21 17:06:03
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-21 18:07:02
 */
import { defineStore } from "pinia"
import piniaStore from "../index"

export const useSettingsStore = defineStore(
  // 唯一ID
  "settings",
  {
    state: () => ({
      title: "VVTP-Vue3+Vite2.7+TS+...",
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
