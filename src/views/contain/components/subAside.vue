<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu :index="menu.path" v-if="menu?.children">
    <template #title>
      <!-- <el-icon v-html="menu?.meta.icon"></el-icon> -->
      <span>{{ menu?.meta.title }}</span>
    </template>
    <!-- 递归调用本身，该组件在index.ts中全局注册了 -->
    <SubAside v-for="item in menu.children" :key="item" :menu="item" :isCollapse="isCollapse" />
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item v-else :index="menu?.path">
    <!-- <el-icon v-html="menu?.meta.icon"></el-icon> -->
    <span>{{ menu?.meta.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue';
  // 拿到父组件传入的值
  import SubAside from './subAside.vue';

  defineProps({
    isCollapse: Boolean,
    menu: Object,
  });
</script>

<style lang="scss" scoped></style>
