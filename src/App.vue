<script setup lang="ts">
import useAppStore from './store'
const store = useAppStore();
console.log(store.name, '测试全局store')
</script>
<template>
  <router-view></router-view>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
