<template>
  <div class="echart">
    <div id="my-echartsbar"></div>
    <div id="my-echartsline"></div>
  </div>
</template>

<script setup lang="ts">
  import echarts from '../../../common/echarts';

  const changeBar = (bar) => {
    const myEChart = echarts.init(bar);
    const option = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25],
        },
      ],
    };
    myEChart.setOption(option);
    // 根据页面大小自动响应图表大小
    window.addEventListener('resize', function () {
      myEChart.resize();
    });
  };
  // 折线图
  const changeLine = (line) => {
    // 获取组件实例
    const myEChart = echarts.init(line);
    // 设置配置项
    const option = {
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'line',
          stack: 'x',
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'line',
          stack: 'x',
        },
      ],
    };
    // 复制
    myEChart.setOption(option);
    // 根据页面大小自动响应图表大小
    window.addEventListener('resize', function () {
      myEChart.resize();
    });
  };
  onMounted(() => {
    var bar = document.getElementById('my-echartsbar');
    var line = document.getElementById('my-echartsline');
    changeBar(bar);
    changeLine(line);
  });
</script>

<style scoped>
  #my-echartsbar {
    height: 300px;
  }

  #my-echartsline {
    height: 300px;
  }
</style>
