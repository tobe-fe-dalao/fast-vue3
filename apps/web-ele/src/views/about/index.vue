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
  { label: 'UI 框架', value: 'Element Plus' },
];

const dependencies = [
  { name: 'vue', version: '3.5.x' },
  { name: 'vue-router', version: '4.x' },
  { name: 'pinia', version: '3.x' },
  { name: 'element-plus', version: '2.x' },
  { name: 'echarts', version: '5.x' },
  { name: 'axios', version: '1.x' },
];
</script>

<template>
  <div class="admin-page" style="max-width: 800px">
    <el-card shadow="never" class="mb-4">
      <template #header>项目信息</template>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="item in info"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never" class="mb-4">
      <template #header>技术栈</template>
      <el-descriptions :column="1" border>
        <el-descriptions-item
          v-for="item in techStack"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>生产依赖</template>
      <el-table :data="dependencies" stripe size="small" style="width: 100%">
        <el-table-column prop="name" label="依赖包" />
        <el-table-column prop="version" label="版本" width="120" />
      </el-table>
    </el-card>
  </div>
</template>
