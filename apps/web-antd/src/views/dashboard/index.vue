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

const statCards = ref<
  { color: string; suffix: string; title: string; value: number }[]
>([
  { title: '今日访问', value: 0, suffix: '次', color: '#1890ff' },
  { title: '总用户数', value: 0, suffix: '人', color: '#52c41a' },
  { title: '活跃用户', value: 0, suffix: '人', color: '#722ed1' },
  { title: '系统正常率', value: 0, suffix: '%', color: '#fa8c16' },
]);

const loadError = ref('');
let disposed = false;

onMounted(async () => {
  let data;
  try {
    data = await api.analytics.dashboardStats();
  } catch {
    if (!disposed) loadError.value = '仪表盘加载失败，请稍后重试';
    return;
  }
  if (disposed) return;
  statCards.value = [
    {
      title: '今日访问',
      value: data.todayVisits,
      suffix: '次',
      color: '#1890ff',
    },
    {
      title: '总用户数',
      value: data.totalUsers,
      suffix: '人',
      color: '#52c41a',
    },
    {
      title: '活跃用户',
      value: data.activeUsers,
      suffix: '人',
      color: '#722ed1',
    },
    {
      title: '系统正常率',
      value: data.systemUptime,
      suffix: '%',
      color: '#fa8c16',
    },
  ];

  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value);
    lineChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['访问量', '用户数'] },
      xAxis: { type: 'category', data: data.weeklyTrend.days },
      yAxis: { type: 'value' },
      series: [
        {
          name: '访问量',
          type: 'line',
          smooth: true,
          data: data.weeklyTrend.visits,
          areaStyle: { opacity: 0.1 },
        },
        {
          name: '用户数',
          type: 'line',
          smooth: true,
          data: data.weeklyTrend.users,
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
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
          data: data.roleDistribution,
        },
      ],
    });
  }
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: data.topPages.map((p) => p.title),
      },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: data.topPages.map((p) => p.visits),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#1890ff' },
              { offset: 1, color: '#096dd9' },
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
  <div class="admin-page">
    <p v-if="loadError" role="alert">{{ loadError }}</p>
    <ARow :gutter="16" class="mb-4">
      <ACol v-for="card in statCards" :key="card.title" :span="6">
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
    <ARow :gutter="16" class="mb-4">
      <ACol :span="16">
        <ACard title="访问趋势（近7天）" :bordered="false" class="shadow-sm">
          <div ref="lineChartRef" style="height: 280px"></div>
        </ACard>
      </ACol>
      <ACol :span="8">
        <ACard title="用户角色分布" :bordered="false" class="shadow-sm">
          <div ref="pieChartRef" style="height: 280px"></div>
        </ACard>
      </ACol>
    </ARow>
    <ARow :gutter="16">
      <ACol :span="24">
        <ACard title="各模块使用频率" :bordered="false" class="shadow-sm">
          <div ref="barChartRef" style="height: 240px"></div>
        </ACard>
      </ACol>
    </ARow>
  </div>
</template>
