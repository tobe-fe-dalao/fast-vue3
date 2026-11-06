<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';

const loading = ref(false);
const inputVal = ref('');
const numVal = ref(50);
const selectVal = ref('vue');
const switchVal = ref(true);
const progressVal = ref(60);
const sliderVal = ref(40);

const columns = [
  { title: '姓名', colKey: 'name' },
  { title: '年龄', colKey: 'age' },
  { title: '地址', colKey: 'address' },
  { title: '角色', colKey: 'role' },
];

const tableData = [
  { key: 1, name: 'Alice', age: 28, address: '北京市朝阳区', role: 'admin' },
  { key: 2, name: 'Bob', age: 32, address: '上海市浦东新区', role: 'user' },
  { key: 3, name: 'Carol', age: 25, address: '广州市天河区', role: 'user' },
  { key: 4, name: 'David', age: 35, address: '深圳市南山区', role: 'admin' },
  { key: 5, name: 'Eve', age: 29, address: '杭州市西湖区', role: 'user' },
  { key: 6, name: 'Frank', age: 41, address: '成都市锦江区', role: 'user' },
];

const selectOptions = [
  { label: 'Vue 3', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
];

function triggerLoading() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    MessagePlugin.success('加载完成！');
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
    <t-card title="按钮 Button" :bordered="false" class="shadow-sm">
      <div class="component-gallery__samples">
        <t-button theme="primary"> 主要按钮 </t-button>
        <t-button>默认按钮</t-button>
        <t-button theme="danger"> 危险按钮 </t-button>
        <t-button variant="dashed"> 虚线按钮 </t-button>
        <t-button variant="outline"> 描边按钮 </t-button>
        <t-button variant="text"> 文本按钮 </t-button>
        <t-button theme="primary" :loading="loading" @click="triggerLoading">
          加载按钮
        </t-button>
        <t-button theme="primary" disabled> 禁用按钮 </t-button>
      </div>
    </t-card>

    <!-- 标签 -->
    <t-card title="标签 Tag" :bordered="false" class="shadow-sm">
      <div class="component-gallery__samples">
        <t-tag>Default</t-tag>
        <t-tag theme="primary"> Primary </t-tag>
        <t-tag theme="success"> Success </t-tag>
        <t-tag theme="warning"> Warning </t-tag>
        <t-tag theme="danger"> Danger </t-tag>
      </div>
    </t-card>

    <!-- 输入框 -->
    <t-card title="输入框 Input" :bordered="false" class="shadow-sm">
      <div class="component-gallery__controls">
        <div>
          <t-input v-model="inputVal" placeholder="基础输入框" />
        </div>
        <div>
          <t-input-number
            v-model="numVal"
            :min="0"
            :max="100"
            style="width: 100%"
          />
        </div>
        <div>
          <t-slider v-model="sliderVal" />
        </div>
      </div>
    </t-card>

    <!-- 选择器 -->
    <t-card title="选择器 Select" :bordered="false" class="shadow-sm">
      <div class="component-gallery__controls">
        <div>
          <t-select
            v-model="selectVal"
            placeholder="请选择"
            style="width: 100%"
          >
            <t-option
              v-for="opt in selectOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </t-select>
        </div>
        <div>
          <t-date-picker placeholder="请选择日期" style="width: 100%" />
        </div>
        <div>
          <t-switch v-model="switchVal" />
          <span class="ml-2">{{ switchVal ? '开启' : '关闭' }}</span>
        </div>
      </div>
    </t-card>

    <!-- 进度条 -->
    <t-card title="进度条 Progress" :bordered="false" class="shadow-sm">
      <div class="component-gallery__controls">
        <div>
          <t-progress :percentage="progressVal" />
          <t-slider v-model="progressVal" class="mt-4" />
        </div>
        <div>
          <t-progress theme="circle" :percentage="progressVal" />
        </div>
      </div>
    </t-card>

    <!-- 通知反馈 -->
    <t-card title="通知反馈" :bordered="false" class="shadow-sm">
      <div class="component-gallery__samples">
        <t-button @click="MessagePlugin.success('操作成功！')">
          成功消息
        </t-button>
        <t-button @click="MessagePlugin.error('操作失败！')">
          错误消息
        </t-button>
        <t-button @click="MessagePlugin.warning('请注意！')">
          警告消息
        </t-button>
        <t-button @click="MessagePlugin.info('提示信息')"> 普通消息 </t-button>
      </div>
    </t-card>

    <!-- 表格 -->
    <t-card
      title="表格 Table"
      :bordered="false"
      class="component-gallery__wide shadow-sm"
    >
      <div
        class="component-gallery__table"
        role="region"
        aria-label="表格示例"
        tabindex="0"
      >
        <t-table
          :data="tableData"
          :columns="columns"
          :pagination="{ pageSize: 5 }"
          size="medium"
          row-key="key"
        />
      </div>
    </t-card>
  </section>
</template>
