<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';

const form = reactive({
  siteName: 'Fast Vue3',
  icp: '',
  logoText: 'FV3',
  pageSize: 20,
  language: 'zh-CN',
  enableRegister: true,
  enableWatermark: false,
  enableDarkMode: true,
});

const pageSizeOptions = [
  { label: '10 条/页', value: 10 },
  { label: '20 条/页', value: 20 },
  { label: '50 条/页', value: 50 },
];

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
];

function handleSave() {
  MessagePlugin.success('设置已保存');
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <t-card title="基础设置" :bordered="false" class="mb-4">
      <t-form :data="form" :label-width="100">
        <t-form-item label="站点名称" name="siteName">
          <t-input v-model="form.siteName" />
        </t-form-item>
        <t-form-item label="ICP 备案号" name="icp">
          <t-input v-model="form.icp" placeholder="选填" />
        </t-form-item>
        <t-form-item label="Logo 文字" name="logoText">
          <t-input v-model="form.logoText" />
        </t-form-item>
      </t-form>
    </t-card>

    <t-card title="功能开关" :bordered="false" class="mb-4">
      <t-form :data="form" :label-width="100">
        <t-form-item label="开放注册">
          <t-switch v-model="form.enableRegister" />
        </t-form-item>
        <t-form-item label="全局水印">
          <t-switch v-model="form.enableWatermark" />
        </t-form-item>
        <t-form-item label="暗黑模式">
          <t-switch v-model="form.enableDarkMode" />
        </t-form-item>
      </t-form>
    </t-card>

    <t-card title="偏好设置" :bordered="false" class="mb-4">
      <t-form :data="form" :label-width="100">
        <t-form-item label="默认分页">
          <t-select v-model="form.pageSize" :options="pageSizeOptions" />
        </t-form-item>
        <t-form-item label="系统语言">
          <t-select v-model="form.language" :options="languageOptions" />
        </t-form-item>
      </t-form>
    </t-card>

    <t-button theme="primary" @click="handleSave">保存设置</t-button>
  </div>
</template>
