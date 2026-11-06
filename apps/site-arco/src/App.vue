<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

import Layout from './layout/index.vue';
</script>

<template>
  <AConfigProvider :locale="zhCN">
    <Layout />
  </AConfigProvider>
</template>
