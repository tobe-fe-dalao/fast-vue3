<script setup lang="ts">
import { IxMessage } from '@idux/components';

const loading = ref(false);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref(undefined);
const switchVal = ref(true);
const progressVal = ref(60);
const textareaVal = ref('');

const options = [
  { key: 'vue', label: 'Vue 3' },
  { key: 'react', label: 'React' },
  { key: 'angular', label: 'Angular' },
];

const columns = [
  { title: '姓名', dataKey: 'name' },
  { title: '年龄', dataKey: 'age' },
  { title: '地址', dataKey: 'address' },
  { title: '角色', dataKey: 'role' },
];

const tableData = [
  { key: 1, name: 'Alice', age: 28, address: '北京市朝阳区', role: 'admin' },
  { key: 2, name: 'Bob', age: 32, address: '上海市浦东新区', role: 'user' },
  { key: 3, name: 'Carol', age: 25, address: '广州市天河区', role: 'user' },
  { key: 4, name: 'David', age: 35, address: '深圳市南山区', role: 'admin' },
  { key: 5, name: 'Eve', age: 29, address: '杭州市西湖区', role: 'user' },
  { key: 6, name: 'Frank', age: 41, address: '成都市锦江区', role: 'user' },
];

function triggerLoading() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    IxMessage.success('加载完成！');
  }, 1500);
}
</script>

<template>
  <div class="components-page">
    <!-- 按钮 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">按钮 Button</span>
      </template>
      <div class="flex flex-wrap gap-2">
        <IxButton> 默认按钮 </IxButton>
        <IxButton mode="primary"> 主要按钮 </IxButton>
        <IxButton mode="primary" danger> 危险按钮 </IxButton>
        <IxButton :loading="loading" mode="primary" @click="triggerLoading">
          加载按钮
        </IxButton>
        <IxButton disabled> 禁用按钮 </IxButton>
      </div>
    </IxCard>

    <!-- 标签 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">标签 Tag</span>
      </template>
      <div class="flex flex-wrap gap-2">
        <IxTag label="Default" />
        <IxTag label="Primary" color="primary" />
        <IxTag label="Success" color="success" />
        <IxTag label="Warning" color="warning" />
        <IxTag label="Danger" color="error" />
      </div>
    </IxCard>

    <!-- 输入框 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">输入框 Input</span>
      </template>
      <IxRow gutter="16">
        <IxCol span="8">
          <IxInput v-model:value="inputVal" placeholder="基础输入框" />
        </IxCol>
        <IxCol span="8">
          <IxInputNumber
            v-model:value="numVal"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </IxCol>
        <IxCol span="8">
          <IxTextarea
            v-model:value="textareaVal"
            placeholder="多行文本"
            :rows="2"
          />
        </IxCol>
      </IxRow>
    </IxCard>

    <!-- 选择器 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">选择器 Select</span>
      </template>
      <IxRow gutter="16">
        <IxCol span="8">
          <IxSelect
            v-model:value="selectVal"
            :data-source="options"
            placeholder="请选择"
            style="width: 100%"
          />
        </IxCol>
        <IxCol span="8">
          <IxSwitch v-model:checked="switchVal" />
          <span class="ml-2">{{ switchVal ? '开启' : '关闭' }}</span>
        </IxCol>
        <IxCol span="8">
          <IxSlider v-model:value="progressVal" />
        </IxCol>
      </IxRow>
    </IxCard>

    <!-- 进度条 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">进度条 Progress</span>
      </template>
      <IxProgress :percent="progressVal" />
    </IxCard>

    <!-- 表格 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">表格 Table</span>
      </template>
      <IxTable
        :columns="columns"
        :data-source="tableData"
        :pagination="{ pageSize: 5 }"
      />
    </IxCard>

    <!-- 通知反馈 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">通知反馈</span>
      </template>
      <div class="flex gap-2">
        <IxButton @click="IxMessage.success('操作成功！')"> 成功消息 </IxButton>
        <IxButton @click="IxMessage.error('操作失败！')"> 错误消息 </IxButton>
        <IxButton @click="IxMessage.warn('请注意！')"> 警告消息 </IxButton>
        <IxButton @click="IxMessage.info('提示信息')"> 普通消息 </IxButton>
      </div>
    </IxCard>
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
