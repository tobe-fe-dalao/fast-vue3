<script setup lang="ts">
import { SaveOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

interface SettingsForm {
  siteName: string;
  siteDesc: string;
  language: string;
  timezone: string;
  passwordMinLength: number;
  lockThreshold: number;
  twoFactor: boolean;
  mailNotify: boolean;
  siteNotify: boolean;
  smsNotify: boolean;
  theme: string;
  primaryColor: string;
}

const saving = ref(false);

const form = reactive<SettingsForm>({
  siteName: 'Fast Vue3 管理后台',
  siteDesc:
    '基于 Monorepo 工程体系、集成 Ant Design Vue 的企业级后台解决方案。',
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
  passwordMinLength: 8,
  lockThreshold: 5,
  twoFactor: false,
  mailNotify: true,
  siteNotify: true,
  smsNotify: false,
  theme: 'system',
  primaryColor: '#1677ff',
});

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
];
const timezoneOptions = [
  { label: '(UTC+08:00) 北京 / 上海', value: 'Asia/Shanghai' },
  { label: '(UTC+09:00) 东京', value: 'Asia/Tokyo' },
  { label: '(UTC+00:00) 伦敦', value: 'Europe/London' },
  { label: '(UTC-08:00) 洛杉矶', value: 'America/Los_Angeles' },
];
const themeOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '跟随系统', value: 'system' },
];
const primaryColorOptions = [
  { label: '拂晓蓝（默认）', value: '#1677ff' },
  { label: '极客紫', value: '#722ed1' },
  { label: '薄暮红', value: '#f5222d' },
  { label: '日暮黄', value: '#fa8c16' },
  { label: '青柠绿', value: '#52c41a' },
  { label: '火山橙', value: '#fa541c' },
];

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    message.success('保存成功');
  }, 600);
}
</script>

<template>
  <div class="admin-page" style="max-width: 960px">
    <!-- 基础设置 -->
    <ACard title="基础设置" :bordered="false" class="mb-4 shadow-sm">
      <AForm :model="form" layout="vertical">
        <AFormItem label="站点名称">
          <AInput v-model:value="form.siteName" placeholder="请输入站点名称" />
        </AFormItem>
        <AFormItem label="站点描述">
          <ATextarea
            v-model:value="form.siteDesc"
            :rows="3"
            placeholder="请输入站点描述"
            show-count
            :maxlength="120"
          />
        </AFormItem>
        <ARow :gutter="16">
          <ACol :span="12">
            <AFormItem label="语言">
              <ASelect
                v-model:value="form.language"
                :options="languageOptions"
              />
            </AFormItem>
          </ACol>
          <ACol :span="12">
            <AFormItem label="时区">
              <ASelect
                v-model:value="form.timezone"
                :options="timezoneOptions"
              />
            </AFormItem>
          </ACol>
        </ARow>
      </AForm>
    </ACard>

    <!-- 安全设置 -->
    <ACard title="安全设置" :bordered="false" class="mb-4 shadow-sm">
      <AForm :model="form" layout="vertical">
        <ARow :gutter="16">
          <ACol :span="12">
            <AFormItem label="密码最小长度">
              <AInputNumber
                v-model:value="form.passwordMinLength"
                :min="6"
                :max="32"
                style="width: 100%"
              />
            </AFormItem>
          </ACol>
          <ACol :span="12">
            <AFormItem label="登录失败锁定次数">
              <AInputNumber
                v-model:value="form.lockThreshold"
                :min="1"
                :max="10"
                style="width: 100%"
              />
            </AFormItem>
          </ACol>
        </ARow>
        <AFormItem label="启用双因子认证（2FA）">
          <ASwitch v-model:checked="form.twoFactor" />
        </AFormItem>
      </AForm>
    </ACard>

    <!-- 通知设置 -->
    <ACard title="通知设置" :bordered="false" class="mb-4 shadow-sm">
      <AForm :model="form" layout="vertical">
        <AFormItem label="邮件通知">
          <ASwitch v-model:checked="form.mailNotify" />
        </AFormItem>
        <AFormItem label="站内信通知">
          <ASwitch v-model:checked="form.siteNotify" />
        </AFormItem>
        <AFormItem label="短信通知">
          <ASwitch v-model:checked="form.smsNotify" />
        </AFormItem>
      </AForm>
    </ACard>

    <!-- 外观设置 -->
    <ACard title="外观设置" :bordered="false" class="mb-4 shadow-sm">
      <AForm :model="form" layout="vertical">
        <AFormItem label="主题模式">
          <ARadioGroup v-model:value="form.theme">
            <ARadioButton
              v-for="t in themeOptions"
              :key="t.value"
              :value="t.value"
            >
              {{ t.label }}
            </ARadioButton>
          </ARadioGroup>
        </AFormItem>
        <AFormItem label="主色">
          <ASelect
            v-model:value="form.primaryColor"
            :options="primaryColorOptions"
            style="max-width: 320px"
          />
        </AFormItem>
      </AForm>
    </ACard>

    <div class="flex justify-end">
      <AButton type="primary" :loading="saving" @click="handleSave">
        <SaveOutlined />保存
      </AButton>
    </div>
  </div>
</template>
