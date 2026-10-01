<script setup lang="ts">
import { NCard, NDataTable, NDescriptions, NDescriptionsItem } from 'naive-ui';

const info = [
  { label: '项目名称', value: 'Fast Vue3' },
  { label: '版本', value: '1.0.0' },
  { label: '许可证', value: 'MIT' },
  { label: '构建时间', value: '2026-05-24' },
];

const techStack = [
  { label: '框架', value: 'Vue 3.5 + Composition API' },
  { label: '构建', value: 'Vite 8 + Turborepo 2' },
  { label: '语言', value: 'TypeScript 6' },
  { label: '样式', value: 'UnoCSS + CSS Variables' },
  { label: '状态', value: 'Pinia 3 + Persistedstate' },
  { label: '路由', value: 'Vue Router 4 + File Routes' },
  { label: 'UI 框架', value: 'Naive UI' },
];

const dependencies = [
  { id: 1, name: 'vue', version: '3.5.x' },
  { id: 2, name: 'vue-router', version: '4.x' },
  { id: 3, name: 'pinia', version: '3.x' },
  { id: 4, name: 'naive-ui', version: '2.x' },
  { id: 5, name: 'echarts', version: '5.x' },
  { id: 6, name: 'axios', version: '1.x' },
];

const depColumns = [
  { title: '依赖包', key: 'name' },
  { title: '版本', key: 'version', width: 120 },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <NCard title="项目信息" class="mb-4">
      <NDescriptions :column="2" label-placement="left">
        <NDescriptionsItem
          v-for="item in info"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>

    <NCard title="技术栈" class="mb-4">
      <NDescriptions :column="1" label-placement="left">
        <NDescriptionsItem
          v-for="item in techStack"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>

    <NCard title="生产依赖">
      <NDataTable
        :columns="depColumns"
        :data="dependencies"
        :pagination="false"
        size="small"
      />
    </NCard>
  </div>
</template>
