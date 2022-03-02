<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import home from './components/home';

export default {
  name: 'App',
  components: {
    home,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
