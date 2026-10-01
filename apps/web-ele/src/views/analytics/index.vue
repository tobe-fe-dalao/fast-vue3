<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';

const stats = ref<AnalyticsOverview['stats']>([]);
const trendData = ref<AnalyticsOverview['trend']>([]);
const topPages = ref<AnalyticsOverview['topPages']>([]);
const loadError = ref('');

onMounted(async () => {
  try {
    const data = await api.analytics.overview(7);
    stats.value = data.stats;
    trendData.value = data.trend;
    topPages.value = data.topPages;
  } catch {
    loadError.value = '数据分析加载失败，请稍后重试';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert">{{ loadError }}</p>
  <div class="admin-page">
    <el-row :gutter="16" class="mb-4">
      <el-col v-for="card in stats" :key="card.title" :span="6">
        <el-card shadow="never">
          <div style="margin-bottom: 8px; font-size: 0.875rem; color: #909399">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #909399"
              >{{ card.suffix }}</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>近7天趋势</template>
          <el-table :data="trendData" stripe size="default" style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="visits" label="访问量" />
            <el-table-column prop="users" label="新增用户" />
            <el-table-column prop="orders" label="订单数" />
            <el-table-column prop="revenue" label="营收" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>热门页面</template>
          <el-table :data="topPages" stripe size="small" style="width: 100%">
            <el-table-column prop="title" label="页面" />
            <el-table-column prop="visits" label="访问量" width="100" />
            <el-table-column prop="avgTime" label="停留" width="80" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
