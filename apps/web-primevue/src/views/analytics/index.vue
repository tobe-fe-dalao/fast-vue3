<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

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
      <Card v-for="card in stats" :key="card.title">
        <template #content>
          <div style="margin-bottom: 4px; font-size: 0.875rem; color: #6b7280">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #9ca3af"
              >{{ card.suffix }}</span
            >
          </div>
        </template>
      </Card>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px">
      <Card>
        <template #title>近7天趋势</template>
        <template #content>
          <DataTable :value="trendData" size="small" striped-rows>
            <Column field="date" header="日期" />
            <Column field="visits" header="访问量" />
            <Column field="users" header="新增用户" />
            <Column field="orders" header="订单数" />
            <Column field="revenue" header="营收" />
          </DataTable>
        </template>
      </Card>
      <Card>
        <template #title>热门页面</template>
        <template #content>
          <DataTable :value="topPages" size="small" striped-rows>
            <Column field="title" header="页面" />
            <Column field="visits" header="访问量" />
            <Column field="avgTime" header="停留" />
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
