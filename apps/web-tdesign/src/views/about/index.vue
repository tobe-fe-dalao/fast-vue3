<script setup lang="ts">
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
  { label: 'UI 框架', value: 'TDesign Vue Next' },
];

const dependencies = [
  { name: 'vue', version: '3.5.x' },
  { name: 'vue-router', version: '4.x' },
  { name: 'pinia', version: '3.x' },
  { name: 'tdesign-vue-next', version: '1.x' },
  { name: 'echarts', version: '5.x' },
  { name: 'axios', version: '1.x' },
];

const depColumns = [
  { colKey: 'name', title: '依赖包' },
  { colKey: 'version', title: '版本', width: 120 },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <t-card title="项目信息" :bordered="false" class="mb-4">
      <t-descriptions :column="2">
        <t-descriptions-item
          v-for="item in info"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </t-descriptions-item>
      </t-descriptions>
    </t-card>

    <t-card title="技术栈" :bordered="false" class="mb-4">
      <t-descriptions :column="1">
        <t-descriptions-item
          v-for="item in techStack"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </t-descriptions-item>
      </t-descriptions>
    </t-card>

    <t-card title="生产依赖" :bordered="false">
      <t-table :data="dependencies" :columns="depColumns" size="small" />
    </t-card>
  </div>
</template>
