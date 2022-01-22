<!--
 * @GitHub: https://github.com/MaleWeb/fast-vue3
 * @version: 
 * @Author: 扫地盲僧
 * @Date: 2022-01-19 16:19:27
 * @LastEditors: BlindMonk
 * @LastEditTime: 2022-01-22 10:24:29
-->
<template>
  <div id="app">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>
<script setup lang="ts">
import { ref, provide, nextTick, watch } from "vue"
import { compileStyle } from "vue/compiler-sfc"
import { useSettingsStore } from "./store/modules/settings"
const settingsStore = useSettingsStore()
console.log(settingsStore.title, "测试全局store")


provide('reload', reload)
function reload() {
  isRouterAlive.value = false
  nextTick(() => (isRouterAlive.value = true))
}

const isRouterAlive = ref(true);

watch(() => settingsStore.title, () => {
  let title = settingsStore.title
  document.title = title ? `${title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE
}, {
  immediate: true
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
