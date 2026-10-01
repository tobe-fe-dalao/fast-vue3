<script setup lang="ts">
import {
  IxButton,
  IxCard,
  IxFormItem,
  IxInput,
  IxSelect,
  IxSwitch,
  useMessage,
} from '@idux/components';

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

const pageSizeDataSource = [
  { key: 10, label: '10 条/页' },
  { key: 20, label: '20 条/页' },
  { key: 50, label: '50 条/页' },
];

const languageDataSource = [
  { key: 'zh-CN', label: '简体中文' },
  { key: 'en', label: 'English' },
];

function handleSave() {
  message.success('设置已保存');
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <IxCard title="基础设置" class="mb-4">
      <IxFormItem label="站点名称" label-col="100px">
        <IxInput v-model:value="form.siteName" />
      </IxFormItem>
      <IxFormItem label="ICP 备案号" label-col="100px">
        <IxInput v-model:value="form.icp" placeholder="选填" />
      </IxFormItem>
      <IxFormItem label="Logo 文字" label-col="100px">
        <IxInput v-model:value="form.logoText" />
      </IxFormItem>
    </IxCard>

    <IxCard title="功能开关" class="mb-4">
      <IxFormItem label="开放注册" label-col="100px">
        <IxSwitch v-model:checked="form.enableRegister" />
      </IxFormItem>
      <IxFormItem label="全局水印" label-col="100px">
        <IxSwitch v-model:checked="form.enableWatermark" />
      </IxFormItem>
      <IxFormItem label="暗黑模式" label-col="100px">
        <IxSwitch v-model:checked="form.enableDarkMode" />
      </IxFormItem>
    </IxCard>

    <IxCard title="偏好设置" class="mb-4">
      <IxFormItem label="默认分页" label-col="100px">
        <IxSelect
          v-model:value="form.pageSize"
          :data-source="pageSizeDataSource"
        />
      </IxFormItem>
      <IxFormItem label="系统语言" label-col="100px">
        <IxSelect
          v-model:value="form.language"
          :data-source="languageDataSource"
        />
      </IxFormItem>
    </IxCard>

    <IxButton mode="primary" @click="handleSave">保存设置</IxButton>
  </div>
</template>
