<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
// import { useAppStore } from './store/modules/app'
// const appStore = useAppStore()


// provide('reload', reload)
// function reload() {
//   isRouterAlive.value = false
//   nextTick(() => (isRouterAlive.value = true))
// }

// const isRouterAlive = ref(true)

// watch(
//   () => appStore.title,
//   () => {
//     const title: string = appStore.title
//     document.title = title
//       ? `${title} - ${import.meta.env.VITE_APP_TITLE}`
//       : import.meta.env.VITE_APP_TITLE
//   },
//   {
//     immediate: true,
//   }
// )
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
