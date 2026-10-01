<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';

import { api } from '@/api';
import {
  EnvironmentOutlined,
  GithubOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const submitting = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const contactInfo = [
  { icon: MailOutlined, label: '邮箱', value: 'support@fast-vue3.dev' },
  { icon: EnvironmentOutlined, label: '地址', value: '中国 · 深圳' },
  { icon: GithubOutlined, label: '开源', value: 'github.com/fast-vue3' },
];

async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    message.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  try {
    await api.portal.contact({
      email: form.email,
      name: form.name,
      message: `[${form.subject}] ${form.message}`,
    });
    message.success('演示提交成功；当前接口不会保存留言');
    formRef.value?.resetFields();
  } catch {
    message.error('提交失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">联系我们</h1>
      <p class="site-hero-desc">
        有疑问或合作意向？填写表单，或直接通过以下方式联系我们
      </p>
    </section>

    <section class="site-section">
      <div class="site-container contact-layout">
        <!-- Info -->
        <aside v-reveal:left class="site-card contact-info">
          <h3 class="info-title">联系方式</h3>
          <div v-for="c in contactInfo" :key="c.label" class="info-item">
            <span class="info-icon-wrap">
              <component :is="c.icon" class="info-icon" />
            </span>
            <div>
              <div class="info-label">{{ c.label }}</div>
              <div class="info-value">{{ c.value }}</div>
            </div>
          </div>
          <p class="info-note">
            我们会在 1 个工作日内回复你的留言，企业客户可获得专属架构咨询。
          </p>
        </aside>

        <!-- Form -->
        <div v-reveal:right class="site-card contact-form">
          <AForm ref="formRef" :model="form" layout="vertical">
            <div class="form-row">
              <AFormItem
                name="name"
                label="姓名"
                :rules="[{ required: true, message: '请输入姓名' }]"
              >
                <AInput
                  v-model:value="form.name"
                  placeholder="请输入你的姓名"
                />
              </AFormItem>
              <AFormItem
                name="email"
                label="邮箱"
                :rules="[
                  { required: true, type: 'email', message: '请输入有效邮箱' },
                ]"
              >
                <AInput v-model:value="form.email" placeholder="请输入邮箱" />
              </AFormItem>
            </div>
            <AFormItem
              name="subject"
              label="主题"
              :rules="[{ required: true, message: '请输入主题' }]"
            >
              <AInput
                v-model:value="form.subject"
                placeholder="请输入咨询主题"
              />
            </AFormItem>
            <AFormItem
              name="message"
              label="内容"
              :rules="[{ required: true, message: '请输入留言内容' }]"
            >
              <ATextarea
                v-model:value="form.message"
                :rows="5"
                placeholder="请描述你的需求"
              />
            </AFormItem>
            <div class="form-actions">
              <AButton
                type="primary"
                size="large"
                :loading="submitting"
                @click="handleSubmit"
              >
                提交留言
              </AButton>
            </div>
          </AForm>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 32px;
  max-width: 1000px;
}

@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

/* ── Info ── */
.info-title {
  margin: 0 0 20px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.info-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 22px;
}

.info-icon-wrap {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: var(--site-bg-soft);
  border-radius: 10px;
}

.info-icon {
  font-size: 1.1rem;
  color: var(--site-brand);
}

.info-label {
  font-size: 0.82rem;
  color: var(--site-text-4);
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--site-text-1);
}

.info-note {
  padding-top: 16px;
  margin: 8px 0 0;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--site-text-3);
  border-top: 1px solid var(--site-border);
}

/* ── Form ── */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
}
</style>
