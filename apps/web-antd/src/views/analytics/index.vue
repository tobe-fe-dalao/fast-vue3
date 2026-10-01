<script setup lang="ts">
import { api } from '@/api';

const stats = ref<
  { color: string; suffix: string; title: string; value: number }[]
>([]);
const trendData = ref<
  {
    date: string;
    orders: number;
    revenue: number;
    users: number;
    visits: number;
  }[]
>([]);
const topPages = ref<
  { avgTime: string; page: string; title: string; visits: number }[]
>([]);

const trendColumns = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '访问量', dataIndex: 'visits', key: 'visits' },
  { title: '新增用户', dataIndex: 'users', key: 'users' },
  { title: '订单数', dataIndex: 'orders', key: 'orders' },
  { title: '营收', dataIndex: 'revenue', key: 'revenue' },
];

const pageColumns = [
  { title: '页面路径', dataIndex: 'page', key: 'page' },
  { title: '页面名称', dataIndex: 'title', key: 'title' },
  { title: '访问量', dataIndex: 'visits', key: 'visits' },
  { title: '平均停留', dataIndex: 'avgTime', key: 'avgTime' },
];

onMounted(async () => {
  const data = await api.analytics.overview(7);
  stats.value = data.stats;
  trendData.value = data.trend;
  topPages.value = data.topPages;
});
</script>

<template>
  <div class="admin-page">
    <ARow :gutter="16" class="mb-4">
      <ACol v-for="card in stats" :key="card.title" :span="6">
        <ACard :bordered="false" class="shadow-sm">
          <AStatistic
            :title="card.title"
            :value="card.value"
            :suffix="card.suffix"
            :value-style="{ color: card.color }"
          />
        </ACard>
      </ACol>
    </ARow>

    <ARow :gutter="16">
      <ACol :span="16">
        <ACard title="近7天趋势" :bordered="false" class="shadow-sm">
          <ATable
            :data-source="trendData"
            :columns="trendColumns"
            :pagination="false"
            size="middle"
          />
        </ACard>
      </ACol>
      <ACol :span="8">
        <ACard title="热门页面" :bordered="false" class="shadow-sm">
          <ATable
            :data-source="topPages"
            :columns="pageColumns"
            :pagination="false"
            size="small"
          />
        </ACard>
      </ACol>
    </ARow>
  </div>
</template>
