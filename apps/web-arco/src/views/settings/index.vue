<script setup lang="ts">
import { Message } from '@arco-design/web-vue';

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

function handleSave() {
  Message.success('设置已保存');
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <a-card title="基础设置" :bordered="false" class="mb-4 shadow-sm">
      <a-form
        :model="form"
        :label-col-props="{ span: 5 }"
        :wrapper-col-props="{ span: 14 }"
      >
        <a-form-item field="siteName" label="站点名称">
          <a-input v-model="form.siteName" />
        </a-form-item>
        <a-form-item field="icp" label="ICP 备案号">
          <a-input v-model="form.icp" placeholder="选填" />
        </a-form-item>
        <a-form-item field="logoText" label="Logo 文字">
          <a-input v-model="form.logoText" />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card title="功能开关" :bordered="false" class="mb-4 shadow-sm">
      <a-form
        :model="form"
        :label-col-props="{ span: 5 }"
        :wrapper-col-props="{ span: 14 }"
      >
        <a-form-item field="enableRegister" label="开放注册">
          <a-switch v-model="form.enableRegister" />
        </a-form-item>
        <a-form-item field="enableWatermark" label="全局水印">
          <a-switch v-model="form.enableWatermark" />
        </a-form-item>
        <a-form-item field="enableDarkMode" label="暗黑模式">
          <a-switch v-model="form.enableDarkMode" />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card title="偏好设置" :bordered="false" class="mb-4 shadow-sm">
      <a-form
        :model="form"
        :label-col-props="{ span: 5 }"
        :wrapper-col-props="{ span: 14 }"
      >
        <a-form-item field="pageSize" label="默认分页">
          <a-select v-model="form.pageSize">
            <a-option :value="10">10 条/页</a-option>
            <a-option :value="20">20 条/页</a-option>
            <a-option :value="50">50 条/页</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="language" label="系统语言">
          <a-select v-model="form.language">
            <a-option value="zh-CN">简体中文</a-option>
            <a-option value="en">English</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>

    <a-button type="primary" @click="handleSave">保存设置</a-button>
  </div>
</template>
