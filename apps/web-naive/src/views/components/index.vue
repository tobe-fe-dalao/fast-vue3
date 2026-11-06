<script setup lang="ts">
import { useMessage } from 'naive-ui';

const message = useMessage();
const { isPending: loading, start: triggerLoading } = useTimeoutFn(
  () => {},
  1200,
  { immediate: false },
);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref('vue');
const switchVal = ref(true);
const progressVal = ref(60);

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
  <section class="component-gallery" aria-labelledby="component-gallery-title">
    <header class="component-gallery__heading">
      <h1 id="component-gallery-title">组件展示</h1>
      <p>试用常见控件，查看表单、表格和操作反馈在实际界面中的表现。</p>
    </header>
    <!-- 按钮 -->
    <n-card title="按钮 Button">
      <div class="component-gallery__samples">
        <n-button type="primary"> 主要按钮 </n-button>
        <n-button type="info"> 信息按钮 </n-button>
        <n-button type="success"> 成功按钮 </n-button>
        <n-button type="warning"> 警告按钮 </n-button>
        <n-button type="error"> 错误按钮 </n-button>
        <n-button ghost> 幽灵按钮 </n-button>
        <n-button dashed> 虚线按钮 </n-button>
        <n-button type="primary" :loading="loading" @click="triggerLoading()">
          加载按钮
        </n-button>
        <n-button type="primary" disabled> 禁用按钮 </n-button>
      </div>
    </n-card>

    <!-- 标签 -->
    <n-card title="标签 Tag">
      <div class="component-gallery__samples">
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
      </div>
    </n-card>

    <!-- 输入框 -->
    <n-card title="输入框 Input">
      <div class="component-gallery__controls">
        <div>
          <n-input v-model:value="inputVal" placeholder="基础输入框" />
        </div>
        <div>
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
        </div>
        <div>
          <n-input-number
            v-model:value="numVal"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </div>
      </div>
    </n-card>

    <!-- 选择器 -->
    <n-card title="选择器 Select + DatePicker + Switch">
      <div class="component-gallery__controls">
        <div>
          <n-select
            v-model:value="selectVal"
            :options="selectOptions"
            placeholder="请选择"
          />
        </div>
        <div>
          <n-date-picker type="date" style="width: 100%" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <n-switch v-model:value="switchVal" />
            <span>{{ switchVal ? '开启' : '关闭' }}</span>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 进度条 -->
    <n-card title="进度条 Progress + Slider">
      <div class="component-gallery__controls">
        <div>
          <n-progress
            type="line"
            :percentage="progressVal"
            indicator-placement="inside"
          />
          <n-slider v-model:value="progressVal" :step="1" class="mt-4" />
        </div>
        <div>
          <div class="flex justify-center">
            <n-progress type="circle" :percentage="progressVal" />
          </div>
        </div>
      </div>
    </n-card>

    <!-- 通知反馈 -->
    <n-card title="通知反馈">
      <div class="component-gallery__samples">
        <n-button @click="message.success('操作成功！')"> 成功消息 </n-button>
        <n-button @click="message.error('操作失败！')"> 错误消息 </n-button>
        <n-button @click="message.warning('请注意！')"> 警告消息 </n-button>
        <n-button @click="message.info('提示信息')"> 普通消息 </n-button>
      </div>
    </n-card>

    <!-- 表格 -->
    <n-card title="表格 Table" class="component-gallery__wide">
      <div
        class="component-gallery__table"
        role="region"
        aria-label="表格示例"
        tabindex="0"
      >
        <n-data-table
          :columns="columns"
          :data="tableData"
          :bordered="true"
          :single-line="false"
          size="medium"
        />
      </div>
    </n-card>
  </section>
</template>
