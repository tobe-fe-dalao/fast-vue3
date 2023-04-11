<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 将渲染导航每一项传给子组件渲染，item代表要渲染每一项 -->
    <SubAside :isCollapse="isCollapse" v-for="item in navs" :key="item.path" :menu="item" :index="item.path" />
  </el-menu>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import * as router from '../../../router/root';
  import SubAside from './subAside.vue'; // 将子组件引入
  console.log(router.default);
  const navs = router.default; // 过滤拿到数据
  console.log(navs);

  const isCollapse = ref(false); // 是否收起，默认不收起

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>
<style lang="less" scoped>
  .el-menu-vertical-demo {
    height: 100%;
  }
</style>
