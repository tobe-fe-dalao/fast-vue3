<template>
  <div id="app">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>
<script setup lang="ts">
import { useSettingsStore } from './store/modules/settings'
import { ref, provide, nextTick, watch } from 'vue'
const settingsStore = useSettingsStore()
// @ts-ignore
console.log(settingsStore.title, '测试全局store')

provide('reload', reload)
function reload() {
  isRouterAlive.value = false
  nextTick(() => (isRouterAlive.value = true))
}

const isRouterAlive = ref(true)

watch(
  () => settingsStore.title,
  () => {
    const title: string = settingsStore.title
    document.title = title
      ? `${title} - ${import.meta.env.VITE_APP_TITLE}`
      : import.meta.env.VITE_APP_TITLE
  },
  {
    immediate: true,
  }
)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
