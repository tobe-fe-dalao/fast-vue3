<script setup lang="ts">
import { IxCard, IxTable } from '@idux/components';

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
  { label: 'UI 框架', value: 'iDux' },
];

const dependencies = [
  { name: 'vue', version: '3.5.x' },
  { name: 'vue-router', version: '4.x' },
  { name: 'pinia', version: '3.x' },
  { name: '@idux/components', version: '2.x' },
  { name: 'echarts', version: '5.x' },
  { name: 'axios', version: '1.x' },
];

const depColumns = [
  { title: '依赖包', dataKey: 'name' },
  { title: '版本', dataKey: 'version', width: 120 },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <IxCard title="项目信息" class="mb-4">
      <div class="info-list">
        <div v-for="item in info" :key="item.label" class="info-row">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </div>
    </IxCard>

    <IxCard title="技术栈" class="mb-4">
      <div class="info-list">
        <div v-for="item in techStack" :key="item.label" class="info-row">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </div>
    </IxCard>

    <IxCard title="生产依赖">
      <IxTable
        :columns="depColumns"
        :data-source="dependencies"
        :pagination="false"
      />
    </IxCard>
  </div>
</template>

<style scoped>
.info-list {
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  flex-shrink: 0;
  width: 80px;
  font-size: 0.875rem;
  color: #9ca3af;
}

.info-value {
  font-weight: 500;
  color: #374151;
}
</style>
