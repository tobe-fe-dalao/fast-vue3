<script setup lang="ts">
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

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
  { label: 'UI 框架', value: 'PrimeVue' },
];

const dependencies = [
  { id: 1, name: 'vue', version: '3.5.x' },
  { id: 2, name: 'vue-router', version: '4.x' },
  { id: 3, name: 'pinia', version: '3.x' },
  { id: 4, name: 'primevue', version: '4.x' },
  { id: 5, name: 'echarts', version: '5.x' },
  { id: 6, name: 'axios', version: '1.x' },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <Card class="mb-4">
      <template #title>项目信息</template>
      <template #content>
        <div
          style="display: grid; grid-template-columns: 120px 1fr; gap: 8px 16px"
        >
          <template v-for="item in info" :key="item.label">
            <div style="font-weight: 500; color: #6b7280">{{ item.label }}</div>
            <div>{{ item.value }}</div>
          </template>
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #title>技术栈</template>
      <template #content>
        <div
          style="display: grid; grid-template-columns: 120px 1fr; gap: 8px 16px"
        >
          <template v-for="item in techStack" :key="item.label">
            <div style="font-weight: 500; color: #6b7280">{{ item.label }}</div>
            <div>{{ item.value }}</div>
          </template>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>生产依赖</template>
      <template #content>
        <DataTable :value="dependencies" size="small" striped-rows>
          <Column field="name" header="依赖包" />
          <Column field="version" header="版本" style="width: 120px" />
        </DataTable>
      </template>
    </Card>
  </div>
</template>
