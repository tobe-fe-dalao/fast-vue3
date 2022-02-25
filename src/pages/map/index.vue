<script setup lang="ts">
  import AMapLoader from '@amap/amap-jsapi-loader'
  AMapLoader.load({
    key: '2ca53d20f1bfb28cb96e32c699fbdea6', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      const map = new AMap.Map('container', {
        zoom: 5, //初始化地图级别
      })
    })
    .catch((e) => {
      console.log(e)
    })
</script>

<template>
  <div id="container"> </div>
</template>

<style scoped>
  #container {
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
  }
</style>
