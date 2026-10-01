<script setup lang="ts">
import type { AnalyticsOverview } from '@/api';

import { api } from '@/api';

const trendColumns = [
  { colKey: 'date', title: '日期' },
  { colKey: 'visits', title: '访问量' },
  { colKey: 'users', title: '新增用户' },
  { colKey: 'orders', title: '订单数' },
  { colKey: 'revenue', title: '营收' },
];

const pageColumns = [
  { colKey: 'title', title: '页面' },
  { colKey: 'visits', title: '访问量' },
  { colKey: 'avgTime', title: '停留' },
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
    <t-row :gutter="[16, 16]" class="mb-4">
      <t-col v-for="card in stats" :key="card.title" :span="3">
        <t-card :bordered="false" hover-shadow>
          <div style="margin-bottom: 4px; font-size: 0.875rem; color: #909399">
            {{ card.title }}
          </div>
          <div
            :style="{ fontSize: '1.75rem', fontWeight: 700, color: card.color }"
          >
            {{ card.value.toLocaleString() }}
            <span
              style="font-size: 0.875rem; font-weight: 400; color: #c0c4cc"
              >{{ card.suffix }}</span
            >
          </div>
        </t-card>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 16]">
      <t-col :span="8">
        <t-card title="近7天趋势" :bordered="false">
          <t-table :data="trendData" :columns="trendColumns" size="small" />
        </t-card>
      </t-col>
      <t-col :span="4">
        <t-card title="热门页面" :bordered="false">
          <t-table :data="topPages" :columns="pageColumns" size="small" />
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
