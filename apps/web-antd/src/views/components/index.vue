<script setup lang="ts">
import { message } from 'ant-design-vue';

const loading = ref(false);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref('vue');
const switchVal = ref(true);
const progressVal = ref(60);

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '角色', dataIndex: 'role', key: 'role' },
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
    <ACard title="按钮 Button" :bordered="false" class="shadow-sm">
      <ASpace wrap>
        <AButton type="primary"> 主要按钮 </AButton>
        <AButton>默认按钮</AButton>
        <AButton type="dashed"> 虚线按钮 </AButton>
        <AButton type="text"> 文本按钮 </AButton>
        <AButton type="link"> 链接按钮 </AButton>
        <AButton type="primary" danger> 危险按钮 </AButton>
        <AButton type="primary" :loading="loading" @click="loading = !loading">
          加载按钮
        </AButton>
        <AButton type="primary" disabled> 禁用按钮 </AButton>
      </ASpace>
    </ACard>

    <!-- 标签 -->
    <ACard title="标签 Tag" :bordered="false" class="shadow-sm">
      <ASpace wrap>
        <ATag>Default</ATag>
        <ATag color="success"> Success </ATag>
        <ATag color="processing"> Processing </ATag>
        <ATag color="error"> Error </ATag>
        <ATag color="warning"> Warning </ATag>
        <ATag color="magenta"> Magenta </ATag>
        <ATag color="volcano"> Volcano </ATag>
        <ATag color="orange"> Orange </ATag>
        <ATag color="gold"> Gold </ATag>
        <ATag color="cyan"> Cyan </ATag>
        <ATag color="blue"> Blue </ATag>
        <ATag color="geekblue"> Geekblue </ATag>
        <ATag color="purple"> Purple </ATag>
      </ASpace>
    </ACard>

    <!-- 输入框 -->
    <ACard title="输入框 Input" :bordered="false" class="shadow-sm">
      <ARow :gutter="16">
        <ACol :span="8">
          <AInput v-model:value="inputVal" placeholder="基础输入框" />
        </ACol>
        <ACol :span="8">
          <AInputSearch
            v-model:value="inputVal"
            placeholder="搜索输入框"
            enter-button
          />
        </ACol>
        <ACol :span="8">
          <AInputNumber
            v-model:value="numVal"
            :min="0"
            :max="100"
            class="w-full"
          />
        </ACol>
      </ARow>
    </ACard>

    <!-- 选择器 -->
    <ACard title="选择器 Select" :bordered="false" class="shadow-sm">
      <ARow :gutter="16">
        <ACol :span="8">
          <ASelect
            v-model:value="selectVal"
            class="w-full"
            placeholder="请选择"
          >
            <ASelectOption value="vue"> Vue 3 </ASelectOption>
            <ASelectOption value="react"> React </ASelectOption>
            <ASelectOption value="angular"> Angular </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="8">
          <ADatePicker class="w-full" />
        </ACol>
        <ACol :span="8">
          <ASwitch v-model:checked="switchVal" />
          <span class="ml-2">{{ switchVal ? '开启' : '关闭' }}</span>
        </ACol>
      </ARow>
    </ACard>

    <!-- 进度条 -->
    <ACard title="进度条 Progress" :bordered="false" class="shadow-sm">
      <ARow :gutter="16">
        <ACol :span="12">
          <AProgress :percent="progressVal" />
          <ASlider v-model:value="progressVal" class="mt-4" />
        </ACol>
        <ACol :span="12">
          <AProgress type="circle" :percent="progressVal" />
        </ACol>
      </ARow>
    </ACard>

    <!-- 表格 -->
    <ACard title="表格 Table" :bordered="false" class="shadow-sm">
      <ATable
        :data-source="tableData"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="middle"
      />
    </ACard>

    <!-- 通知反馈 -->
    <ACard title="通知反馈" :bordered="false" class="shadow-sm">
      <ASpace>
        <AButton @click="message.success('操作成功！')"> 成功消息 </AButton>
        <AButton @click="message.error('操作失败！')"> 错误消息 </AButton>
        <AButton @click="message.warning('请注意！')"> 警告消息 </AButton>
        <AButton @click="message.info('提示信息')"> 普通消息 </AButton>
      </ASpace>
    </ACard>
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
