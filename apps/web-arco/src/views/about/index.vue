<script setup lang="ts">
const info = {
  name: 'Fast Vue3',
  version: '1.0.0',
  license: 'MIT',
  buildTime: '2026-05-24',
};

const techStack = [
  { label: '框架', value: 'Vue 3.5 + Composition API' },
  { label: '构建', value: 'Vite 8 + Turborepo 2' },
  { label: '语言', value: 'TypeScript 6' },
  { label: '样式', value: 'UnoCSS + CSS Variables' },
  { label: '状态', value: 'Pinia 3 + Persistedstate' },
  { label: '路由', value: 'Vue Router 4 + File Routes' },
  { label: 'UI 框架', value: 'Arco Design Vue' },
];

const dependencies = [
  { name: 'vue', version: '3.5.x' },
  { name: 'vue-router', version: '4.x' },
  { name: 'pinia', version: '3.x' },
  { name: '@arco-design/web-vue', version: '2.x' },
  { name: 'echarts', version: '5.x' },
  { name: 'axios', version: '1.x' },
];

const depColumns = [
  { title: '依赖包', dataIndex: 'name' },
  { title: '版本', dataIndex: 'version', width: 120 },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <a-card title="项目信息" :bordered="false" class="mb-4 shadow-sm">
      <a-descriptions :column="2">
        <a-descriptions-item label="项目名称">
          {{ info.name }}
        </a-descriptions-item>
        <a-descriptions-item label="版本">
          {{ info.version }}
        </a-descriptions-item>
        <a-descriptions-item label="许可证">
          {{ info.license }}
        </a-descriptions-item>
        <a-descriptions-item label="构建时间">
          {{ info.buildTime }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="技术栈" :bordered="false" class="mb-4 shadow-sm">
      <a-descriptions :column="1">
        <a-descriptions-item
          v-for="item in techStack"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="生产依赖" :bordered="false" class="shadow-sm">
      <a-table
        :data="dependencies"
        :columns="depColumns"
        :pagination="false"
        size="small"
      />
    </a-card>
  </div>
</template>
