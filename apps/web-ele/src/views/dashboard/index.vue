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
              { offset: 0, color: '#409EFF' },
              { offset: 1, color: '#337ecc' },
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
    <el-row :gutter="16" class="mb-4">
      <el-col v-for="card in statCards" :key="card.title" :span="6">
        <el-card shadow="never">
          <div class="text-sm text-gray-500">
            {{ card.title }}
          </div>
          <div class="text-2xl font-bold mt-1">
            {{ card.value }}{{ card.suffix }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="mb-4">
      <el-col :span="16">
        <el-card header="访问趋势（近7天）" shadow="never">
          <div ref="lineChartRef" style="height: 280px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="用户角色分布" shadow="never">
          <div ref="pieChartRef" style="height: 280px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="24">
        <el-card header="各模块使用频率" shadow="never">
          <div ref="barChartRef" style="height: 240px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
