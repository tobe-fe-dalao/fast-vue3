<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

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
  toast.add({ severity: 'success', summary: '设置已保存', life: 2000 });
}
</script>

<template>
  <div class="admin-page" style="max-width: 720px">
    <Card class="mb-4">
      <template #title>基础设置</template>
      <template #content>
        <div class="field-row">
          <label>站点名称</label><InputText v-model="form.siteName" />
        </div>
        <div class="field-row">
          <label>ICP 备案号</label
          ><InputText v-model="form.icp" placeholder="选填" />
        </div>
        <div class="field-row">
          <label>Logo 文字</label><InputText v-model="form.logoText" />
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #title>功能开关</template>
      <template #content>
        <div class="field-row">
          <label>开放注册</label><InputSwitch v-model="form.enableRegister" />
        </div>
        <div class="field-row">
          <label>全局水印</label><InputSwitch v-model="form.enableWatermark" />
        </div>
        <div class="field-row">
          <label>暗黑模式</label><InputSwitch v-model="form.enableDarkMode" />
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #title>偏好设置</template>
      <template #content>
        <div class="field-row">
          <label>默认分页</label
          ><Select
            v-model="form.pageSize"
            :options="pageSizeOptions"
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="field-row">
          <label>系统语言</label
          ><Select
            v-model="form.language"
            :options="languageOptions"
            option-label="label"
            option-value="value"
          />
        </div>
      </template>
    </Card>

    <Button label="保存设置" @click="handleSave" />
  </div>
</template>

<style scoped>
.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.field-row label {
  font-size: 0.9rem;
  color: #374151;
}
</style>
