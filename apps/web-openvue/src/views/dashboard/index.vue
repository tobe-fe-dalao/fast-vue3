<script setup lang="ts">
import { useChartResize } from '@fast-vue3/layout';
import * as echarts from '@fast-vue3/layout/charts';

import { api } from '@/api';
const lineChartRef = ref<HTMLElement>();
const pieChartRef = ref<HTMLElement>();
const barChartRef = ref<HTMLElement>();
let lineChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;
let barChart: echarts.ECharts | null = null;
const statCards = ref([
  { title: '今日访问', value: 0, suffix: '次', color: '#1890ff' },
  { title: '总用户数', value: 0, suffix: '人', color: '#52c41a' },
  { title: '活跃用户', value: 0, suffix: '人', color: '#722ed1' },
  { title: '系统正常率', value: 0, suffix: '%', color: '#fa8c16' },
]);
const loadError = ref('');
let disposed = false;

onMounted(async () => {
  let dashboard;
  try {
    dashboard = await api.analytics.dashboardStats();
  } catch {
    if (!disposed) loadError.value = '仪表盘加载失败，请稍后重试';
    return;
  }
  if (disposed) return;
  statCards.value = [
    {
      title: '今日访问',
      value: dashboard.todayVisits,
      suffix: '次',
      color: '#1890ff',
    },
    {
      title: '总用户数',
      value: dashboard.totalUsers,
      suffix: '人',
      color: '#52c41a',
    },
    {
      title: '活跃用户',
      value: dashboard.activeUsers,
      suffix: '人',
      color: '#722ed1',
    },
    {
      title: '系统正常率',
      value: dashboard.systemUptime,
      suffix: '%',
      color: '#fa8c16',
    },
  ];

  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value);
    lineChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { containLabel: true },
      legend: { data: ['PV', 'UV'] },
      xAxis: { type: 'category', data: dashboard.weeklyTrend.days },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'PV',
          type: 'line',
          smooth: true,
          data: dashboard.weeklyTrend.visits,
          areaStyle: { opacity: 0.1 },
        },
        {
          name: 'UV',
          type: 'line',
          smooth: true,
          data: dashboard.weeklyTrend.users,
          areaStyle: { opacity: 0.1 },
        },
      ],
    });
  }
  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value);
    pieChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          type: 'pie',
          radius: ['40%', '65%'],
          label: { show: false },
          emphasis: { label: { show: true } },
          data: dashboard.roleDistribution,
        },
      ],
    });
  }
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { containLabel: true },
      xAxis: {
        type: 'category',
        data: dashboard.topPages.map((page) => page.title),
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: dashboard.topPages.map((page) => page.visits),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6366f1' },
              { offset: 1, color: '#4f46e5' },
            ]),
          },
        },
      ],
    });
  }
});
useChartResize([lineChartRef, pieChartRef, barChartRef], () => {
  lineChart?.resize();
  pieChart?.resize();
  barChart?.resize();
});
onUnmounted(() => {
  disposed = true;
  lineChart?.dispose();
  pieChart?.dispose();
  barChart?.dispose();
});
</script>
<template>
  <p v-if="loadError" role="alert">{{ loadError }}</p>
  <div class="admin-page dashboard">
    <div class="dashboard-stats">
      <Card v-for="card in statCards" :key="card.title">
        <template #content>
          <div class="dashboard-stat-label text-sm">
            {{ card.title }}
          </div>
          <div class="text-2xl font-bold mt-1">
            {{ card.value }}{{ card.suffix }}
          </div>
        </template>
      </Card>
    </div>
    <div class="dashboard-overview">
      <Card>
        <template #title> 访问趋势（近7天） </template>
        <template #content>
          <div ref="lineChartRef" class="admin-dashboard-chart"></div>
        </template>
      </Card>
      <Card>
        <template #title> 用户角色分布 </template>
        <template #content>
          <div ref="pieChartRef" class="admin-dashboard-chart"></div>
        </template>
      </Card>
    </div>
    <Card>
      <template #title> 各模块使用频率 </template>
      <template #content>
        <div
          ref="barChartRef"
          class="admin-dashboard-chart admin-dashboard-chart--compact"
        ></div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-stat-label {
  color: var(--app-text-secondary);
}

.dashboard-stats,
.dashboard-overview {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}

@media (min-width: 640px) {
  .dashboard-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .dashboard-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .dashboard-overview {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
}
</style>
