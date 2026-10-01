<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';

const trendColumns = [
  { title: '日期', dataIndex: 'date' },
  { title: '访问量', dataIndex: 'visits' },
  { title: '新增用户', dataIndex: 'users' },
  { title: '订单数', dataIndex: 'orders' },
  { title: '营收', dataIndex: 'revenue' },
];

const pageColumns = [
  { title: '页面路径', dataIndex: 'page' },
  { title: '页面名称', dataIndex: 'title' },
  { title: '访问量', dataIndex: 'visits' },
  { title: '平均停留', dataIndex: 'avgTime' },
];

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
    <a-row :gutter="16" :style="{ marginBottom: '16px' }">
      <a-col v-for="card in stats" :key="card.title" :span="6">
        <a-card :bordered="false" class="shadow-sm">
          <a-statistic
            :title="card.title"
            :value="card.value"
            :suffix="card.suffix"
            :value-style="{ color: card.color }"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="16">
        <a-card title="近7天趋势" :bordered="false" class="shadow-sm">
          <a-table
            :data="trendData"
            :columns="trendColumns"
            :pagination="false"
            size="medium"
          />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="热门页面" :bordered="false" class="shadow-sm">
          <a-table
            :data="topPages"
            :columns="pageColumns"
            :pagination="false"
            size="small"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
