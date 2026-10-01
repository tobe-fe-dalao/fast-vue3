<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';
import { IxCard, IxStatistic, IxTable } from '@idux/components';

const trendColumns = [
  { title: '日期', dataKey: 'date' },
  { title: '访问量', dataKey: 'visits' },
  { title: '新增用户', dataKey: 'users' },
  { title: '订单数', dataKey: 'orders' },
  { title: '营收', dataKey: 'revenue' },
];

const pageColumns = [
  { title: '页面', dataKey: 'title' },
  { title: '访问量', dataKey: 'visits' },
  { title: '停留', dataKey: 'avgTime' },
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
      <IxCard v-for="card in stats" :key="card.title">
        <IxStatistic
          :title="card.title"
          :value="card.value"
          :suffix="card.suffix"
        />
      </IxCard>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px">
      <IxCard title="近7天趋势">
        <IxTable
          :columns="trendColumns"
          :data-source="trendData"
          :pagination="false"
        />
      </IxCard>
      <IxCard title="热门页面">
        <IxTable
          :columns="pageColumns"
          :data-source="topPages"
          :pagination="false"
        />
      </IxCard>
    </div>
  </div>
</template>
