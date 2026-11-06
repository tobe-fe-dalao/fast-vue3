<script setup lang="ts">
import type { FormInst } from 'naive-ui';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { useMessage } from 'naive-ui';

const message = useMessage();

const submitting = ref(false);
const submitRequests = useLatestRequest();
const formRef = ref<FormInst>();
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const contactInfo = [
  { icon: '📧', label: '邮箱', value: 'support@fast-vue3.dev' },
  { icon: '📍', label: '地址', value: '中国 · 深圳' },
  { icon: '🔗', label: '开源', value: 'github.com/fast-vue3' },
];

async function handleSubmit() {
  if (submitting.value) return;
  const isCurrent = submitRequests.start();
  submitting.value = true;
  try {
    try {
      await formRef.value?.validate();
    } catch {
      if (!isCurrent()) return;
      message.warning('请完善必填项');
      return;
    }
    if (!isCurrent()) return;
    const submitted = { ...form };
    await api.portal.contact({
      email: submitted.email,
      name: submitted.name,
      message: `[${submitted.subject}] ${submitted.message}`,
    });
    if (!isCurrent()) return;
    message.success('演示提交成功；当前接口不会保存留言');
    if (
      Object.entries(submitted).every(
        ([key, value]) => form[key as keyof typeof form] === value,
      )
    ) {
      Object.assign(form, { name: '', email: '', subject: '', message: '' });
      formRef.value?.restoreValidation();
    }
  } catch {
    if (!isCurrent()) return;
    message.error('提交失败，请稍后重试');
  } finally {
    if (isCurrent()) submitting.value = false;
  }
}
</script>

<template>
  <div>
    <section class="site-hero site-hero--compact">
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
              <span class="info-icon">{{ c.icon }}</span>
            </span>
            <div>
              <div class="info-label">{{ c.label }}</div>
              <div class="info-value">{{ c.value }}</div>
            </div>
          </div>
          <p class="info-note">此表单用于演示提交，留言不会被保存。</p>
        </aside>

        <!-- Form -->
        <div v-reveal:right class="site-card contact-form">
          <NForm ref="formRef" :model="form" label-placement="top">
            <div class="form-row">
              <NFormItem
                path="name"
                label="姓名"
                :rule="{ required: true, message: '请输入姓名' }"
              >
                <NInput
                  v-model:value="form.name"
                  placeholder="请输入你的姓名"
                />
              </NFormItem>
              <NFormItem
                path="email"
                label="邮箱"
                :rule="{
                  required: true,
                  type: 'email',
                  message: '请输入有效邮箱',
                }"
              >
                <NInput v-model:value="form.email" placeholder="请输入邮箱" />
              </NFormItem>
            </div>
            <NFormItem
              path="subject"
              label="主题"
              :rule="{ required: true, message: '请输入主题' }"
            >
              <NInput
                v-model:value="form.subject"
                placeholder="请输入咨询主题"
              />
            </NFormItem>
            <NFormItem
              path="message"
              label="内容"
              :rule="{ required: true, message: '请输入留言内容' }"
            >
              <NInput
                v-model:value="form.message"
                type="textarea"
                :rows="5"
                placeholder="请描述你的需求"
              />
            </NFormItem>
            <div class="form-actions">
              <NButton
                type="primary"
                size="large"
                :loading="submitting"
                @click="handleSubmit"
              >
                提交留言
              </NButton>
            </div>
          </NForm>
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
