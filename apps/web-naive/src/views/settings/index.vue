<script setup lang="ts">
import { useMessage } from 'naive-ui';

const message = useMessage();

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
  message.success('设置已保存');
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <NCard title="基础设置" class="mb-4">
      <NForm :model="form" label-placement="left" label-width="100">
        <NFormItem label="站点名称">
          <NInput v-model:value="form.siteName" />
        </NFormItem>
        <NFormItem label="ICP 备案号">
          <NInput v-model:value="form.icp" placeholder="选填" />
        </NFormItem>
        <NFormItem label="Logo 文字">
          <NInput v-model:value="form.logoText" />
        </NFormItem>
      </NForm>
    </NCard>

    <NCard title="功能开关" class="mb-4">
      <NForm :model="form" label-placement="left" label-width="100">
        <NFormItem label="开放注册">
          <NSwitch v-model:value="form.enableRegister" />
        </NFormItem>
        <NFormItem label="全局水印">
          <NSwitch v-model:value="form.enableWatermark" />
        </NFormItem>
        <NFormItem label="暗黑模式">
          <NSwitch v-model:value="form.enableDarkMode" />
        </NFormItem>
      </NForm>
    </NCard>

    <NCard title="偏好设置" class="mb-4">
      <NForm :model="form" label-placement="left" label-width="100">
        <NFormItem label="默认分页">
          <NSelect v-model:value="form.pageSize" :options="pageSizeOptions" />
        </NFormItem>
        <NFormItem label="系统语言">
          <NSelect v-model:value="form.language" :options="languageOptions" />
        </NFormItem>
      </NForm>
    </NCard>

    <NButton type="primary" @click="handleSave">保存设置</NButton>
  </div>
</template>
