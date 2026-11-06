<script setup lang="ts">
import { useMessage } from '@idux/components/message';

const message = useMessage();

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
    message.success('加载完成！');
  }, 1500);
}
</script>

<template>
  <section class="component-gallery" aria-labelledby="component-gallery-title">
    <header class="component-gallery__heading">
      <h1 id="component-gallery-title">组件展示</h1>
      <p>试用常见控件，查看表单、表格和操作反馈在实际界面中的表现。</p>
    </header>
    <!-- 按钮 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">按钮 Button</span>
      </template>
      <div class="component-gallery__samples">
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
      <div class="component-gallery__samples">
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
      <div class="component-gallery__controls">
        <div>
          <IxInput v-model:value="inputVal" placeholder="基础输入框" />
        </div>
        <div>
          <IxInputNumber
            v-model:value="numVal"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </div>
        <div>
          <IxTextarea
            v-model:value="textareaVal"
            placeholder="多行文本"
            :rows="2"
          />
        </div>
      </div>
    </IxCard>

    <!-- 选择器 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">选择器 Select</span>
      </template>
      <div class="component-gallery__controls">
        <div>
          <IxSelect
            v-model:value="selectVal"
            :data-source="options"
            placeholder="请选择"
            style="width: 100%"
          />
        </div>
        <div>
          <IxSwitch v-model:checked="switchVal" />
          <span class="ml-2">{{ switchVal ? '开启' : '关闭' }}</span>
        </div>
        <div>
          <IxSlider v-model:value="progressVal" />
        </div>
      </div>
    </IxCard>

    <!-- 进度条 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">进度条 Progress</span>
      </template>
      <IxProgress :percent="progressVal" />
    </IxCard>

    <!-- 通知反馈 -->
    <IxCard class="shadow-sm">
      <template #header>
        <span class="font-semibold">通知反馈</span>
      </template>
      <div class="component-gallery__samples">
        <IxButton @click="message.success('操作成功！')"> 成功消息 </IxButton>
        <IxButton @click="message.error('操作失败！')"> 错误消息 </IxButton>
        <IxButton @click="message.warning('请注意！')"> 警告消息 </IxButton>
        <IxButton @click="message.info('提示信息')"> 普通消息 </IxButton>
      </div>
    </IxCard>

    <!-- 表格 -->
    <IxCard class="component-gallery__wide shadow-sm">
      <template #header>
        <span class="font-semibold">表格 Table</span>
      </template>
      <div
        class="component-gallery__table"
        role="region"
        aria-label="表格示例"
        tabindex="0"
      >
        <IxTable
          :columns="columns"
          :data-source="tableData"
          :pagination="{ pageSize: 5 }"
        />
      </div>
    </IxCard>
  </section>
</template>
