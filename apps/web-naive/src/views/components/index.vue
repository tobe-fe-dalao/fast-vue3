<script setup lang="ts">
import { useMessage } from 'naive-ui';

const message = useMessage();
const loading = ref(false);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref('vue');
const switchVal = ref(true);
const progressVal = ref(60);
const sliderVal = ref(45);

const selectOptions = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
];

const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  { title: '角色', key: 'role' },
];

const tableData = [
  { key: 1, name: 'Alice', age: 28, address: '北京市朝阳区', role: 'admin' },
  { key: 2, name: 'Bob', age: 32, address: '上海市浦东新区', role: 'user' },
  { key: 3, name: 'Carol', age: 25, address: '广州市天河区', role: 'user' },
  { key: 4, name: 'David', age: 35, address: '深圳市南山区', role: 'admin' },
  { key: 5, name: 'Eve', age: 29, address: '杭州市西湖区', role: 'user' },
  { key: 6, name: 'Frank', age: 41, address: '成都市锦江区', role: 'user' },
];
</script>

<template>
  <div class="components-page">
    <!-- 按钮 -->
    <n-card title="按钮 Button">
      <n-space wrap>
        <n-button type="primary"> 主要按钮 </n-button>
        <n-button type="info"> 信息按钮 </n-button>
        <n-button type="success"> 成功按钮 </n-button>
        <n-button type="warning"> 警告按钮 </n-button>
        <n-button type="error"> 错误按钮 </n-button>
        <n-button ghost> 幽灵按钮 </n-button>
        <n-button dashed> 虚线按钮 </n-button>
        <n-button type="primary" :loading="loading" @click="loading = !loading">
          加载按钮
        </n-button>
        <n-button type="primary" disabled> 禁用按钮 </n-button>
      </n-space>
    </n-card>

    <!-- 标签 -->
    <n-card title="标签 Tag">
      <n-space wrap>
        <n-tag>Default</n-tag>
        <n-tag type="success"> Success </n-tag>
        <n-tag type="warning"> Warning </n-tag>
        <n-tag type="error"> Error </n-tag>
        <n-tag type="info"> Info </n-tag>
        <n-tag :bordered="false"> No Border </n-tag>
        <n-tag type="success" round> Round Success </n-tag>
        <n-tag type="warning" round> Round Warning </n-tag>
        <n-tag type="error" round> Round Error </n-tag>
        <n-tag type="info" round> Round Info </n-tag>
      </n-space>
    </n-card>

    <!-- 输入框 -->
    <n-card title="输入框 Input">
      <n-grid :cols="3" :x-gap="16">
        <n-gi>
          <n-input v-model:value="inputVal" placeholder="基础输入框" />
        </n-gi>
        <n-gi>
          <n-input
            v-model:value="inputVal"
            type="text"
            placeholder="搜索输入框"
            clearable
          >
            <template #prefix>
              <n-icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </n-icon>
            </template>
          </n-input>
        </n-gi>
        <n-gi>
          <n-input-number
            v-model:value="numVal"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 选择器 -->
    <n-card title="选择器 Select + DatePicker + Switch">
      <n-grid :cols="3" :x-gap="16">
        <n-gi>
          <n-select
            v-model:value="selectVal"
            :options="selectOptions"
            placeholder="请选择"
          />
        </n-gi>
        <n-gi>
          <n-date-picker type="date" style="width: 100%" />
        </n-gi>
        <n-gi>
          <div class="flex items-center gap-2">
            <n-switch v-model:value="switchVal" />
            <span>{{ switchVal ? '开启' : '关闭' }}</span>
          </div>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 进度条 -->
    <n-card title="进度条 Progress + Slider">
      <n-grid :cols="2" :x-gap="16">
        <n-gi>
          <n-progress
            type="line"
            :percentage="progressVal"
            indicator-placement="inside"
          />
          <n-slider v-model:value="sliderVal" :step="1" class="mt-4" />
        </n-gi>
        <n-gi>
          <div class="flex justify-center">
            <n-progress type="circle" :percentage="progressVal" />
          </div>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 表格 -->
    <n-card title="表格 Table">
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="true"
        :single-line="false"
        size="medium"
      />
    </n-card>

    <!-- 通知反馈 -->
    <n-card title="通知反馈">
      <n-space>
        <n-button @click="message.success('操作成功！')"> 成功消息 </n-button>
        <n-button @click="message.error('操作失败！')"> 错误消息 </n-button>
        <n-button @click="message.warning('请注意！')"> 警告消息 </n-button>
        <n-button @click="message.info('提示信息')"> 普通消息 </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<style scoped>
.components-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 8px;
}

@media (max-width: 767px) {
  .components-page {
    padding: 0;
  }
}
</style>
