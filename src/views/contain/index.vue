<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px"> <Layout /> </el-aside>
      <el-container>
        <el-header> <Header /></el-header>
        <el-main> <Main /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/Header/index.vue';
  import Layout from './components/layout.vue';
  import Main from './components/main.vue';
</script>

<style lang="less" scoped>
  .common-layout {
    height: 100%;

    .el-container {
      height: 100%;
    }

    .el-header {
      padding: 0;
    }
  }
</style>
