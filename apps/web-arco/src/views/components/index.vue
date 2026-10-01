<script setup lang="ts">
import type { TableData } from '@arco-design/web-vue';

import { Message } from '@arco-design/web-vue';

const loading = ref(false);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref('vue');
const switchVal = ref(true);
const progressVal = ref(60);

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '角色', dataIndex: 'role' },
];

const tableData: TableData[] = [
  { key: '1', name: 'Alice', age: 28, address: '北京市朝阳区', role: 'admin' },
  { key: '2', name: 'Bob', age: 32, address: '上海市浦东新区', role: 'user' },
  { key: '3', name: 'Carol', age: 25, address: '广州市天河区', role: 'user' },
  { key: '4', name: 'David', age: 35, address: '深圳市南山区', role: 'admin' },
  { key: '5', name: 'Eve', age: 29, address: '杭州市西湖区', role: 'user' },
  { key: '6', name: 'Frank', age: 41, address: '成都市锦江区', role: 'user' },
];
</script>

<template>
  <div class="components-page">
    <!-- 按钮 -->
    <a-card title="按钮 Button" :bordered="false" class="shadow-sm">
      <a-space wrap>
        <a-button type="primary">主要按钮</a-button>
        <a-button>默认按钮</a-button>
        <a-button type="dashed">虚线按钮</a-button>
        <a-button type="text">文本按钮</a-button>
        <a-button type="outline">边框按钮</a-button>
        <a-button status="danger">危险按钮</a-button>
        <a-button type="primary" :loading="loading" @click="loading = !loading">
          加载按钮
        </a-button>
        <a-button type="primary" disabled>禁用按钮</a-button>
      </a-space>
    </a-card>

    <!-- 标签 -->
    <a-card title="标签 Tag" :bordered="false" class="shadow-sm">
      <a-space wrap>
        <a-tag>Default</a-tag>
        <a-tag color="green">Green</a-tag>
        <a-tag color="arcoblue">Arcoblue</a-tag>
        <a-tag color="red">Red</a-tag>
        <a-tag color="orangered">Orangered</a-tag>
        <a-tag color="orange">Orange</a-tag>
        <a-tag color="gold">Gold</a-tag>
        <a-tag color="cyan">Cyan</a-tag>
        <a-tag color="purple">Purple</a-tag>
        <a-tag color="pinkpurple">Pinkpurple</a-tag>
      </a-space>
    </a-card>

    <!-- 输入框 -->
    <a-card title="输入框 Input" :bordered="false" class="shadow-sm">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-input v-model="inputVal" placeholder="基础输入框" />
        </a-col>
        <a-col :span="8">
          <a-input-search
            v-model="inputVal"
            placeholder="搜索输入框"
            search-button
          />
        </a-col>
        <a-col :span="8">
          <a-input-number v-model="numVal" :min="0" :max="100" class="w-full" />
        </a-col>
      </a-row>
    </a-card>

    <!-- 选择器 -->
    <a-card
      title="选择器 Select + DatePicker + Switch"
      :bordered="false"
      class="shadow-sm"
    >
      <a-row :gutter="16">
        <a-col :span="8">
          <a-select v-model="selectVal" class="w-full" placeholder="请选择">
            <a-option value="vue">Vue 3</a-option>
            <a-option value="react">React</a-option>
            <a-option value="angular">Angular</a-option>
          </a-select>
        </a-col>
        <a-col :span="8">
          <a-date-picker class="w-full" />
        </a-col>
        <a-col :span="8">
          <a-switch v-model="switchVal" />
          <span class="ml-2">{{ switchVal ? '开启' : '关闭' }}</span>
        </a-col>
      </a-row>
    </a-card>

    <!-- 进度条 -->
    <a-card
      title="进度条 Progress + Slider"
      :bordered="false"
      class="shadow-sm"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-progress :percent="progressVal / 100" :show-text="true" />
          <a-slider v-model="progressVal" class="mt-4" />
        </a-col>
        <a-col :span="12">
          <a-progress
            type="circle"
            :percent="progressVal / 100"
            :show-text="true"
          />
        </a-col>
      </a-row>
    </a-card>

    <!-- 表格 -->
    <a-card title="表格 Table" :bordered="false" class="shadow-sm">
      <a-table
        :data="tableData"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
      />
    </a-card>

    <!-- 通知反馈 -->
    <a-card title="通知反馈" :bordered="false" class="shadow-sm">
      <a-space>
        <a-button @click="Message.success('操作成功！')">成功消息</a-button>
        <a-button @click="Message.error('操作失败！')">错误消息</a-button>
        <a-button @click="Message.warning('请注意！')">警告消息</a-button>
        <a-button @click="Message.info('提示信息')">普通消息</a-button>
      </a-space>
    </a-card>
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
