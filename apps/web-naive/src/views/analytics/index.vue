<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';
import { NCard, NDataTable, NStatistic } from 'naive-ui';

const trendColumns = [
  { title: '日期', key: 'date' },
  { title: '访问量', key: 'visits' },
  { title: '新增用户', key: 'users' },
  { title: '订单数', key: 'orders' },
  { title: '营收', key: 'revenue' },
];

const pageColumns = [
  { title: '页面', key: 'title' },
  { title: '访问量', key: 'visits' },
  { title: '停留', key: 'avgTime' },
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
    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 16px;
      "
    >
      <NCard v-for="card in stats" :key="card.title">
        <NStatistic :label="card.title" :value="card.value">
          <template #suffix>
            <span style="font-size: 0.875rem">{{ card.suffix }}</span>
          </template>
        </NStatistic>
      </NCard>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px">
      <NCard title="近7天趋势">
        <NDataTable
          :columns="trendColumns"
          :data="trendData"
          :pagination="false"
          striped
        />
      </NCard>
      <NCard title="热门页面">
        <NDataTable
          :columns="pageColumns"
          :data="topPages"
          :pagination="false"
          striped
          size="small"
        />
      </NCard>
    </div>
  </div>
</template>
