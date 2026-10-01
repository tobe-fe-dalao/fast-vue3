<script setup lang="ts">
import { api } from '@/api';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const submitting = ref(false);
const form = reactive({ name: '', email: '', subject: '', message: '' });

const contactInfo = [
  { icon: 'pi pi-envelope', label: '邮箱', value: 'support@fast-vue3.dev' },
  { icon: 'pi pi-map-marker', label: '地址', value: '中国 · 深圳' },
  { icon: 'pi pi-github', label: '开源', value: 'github.com/fast-vue3' },
];

async function handleSubmit() {
  if (!form.name || !form.email || !form.subject || !form.message) {
    toast.add({
      severity: 'warn',
      summary: '提示',
      detail: '请完善必填项',
      life: 3000,
    });
    return;
  }
  submitting.value = true;
  try {
    await api.portal.contact({
      email: form.email,
      name: form.name,
      message: `[${form.subject}] ${form.message}`,
    });
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: '演示提交成功；当前接口不会保存留言',
      life: 3000,
    });
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
  } catch {
    toast.add({
      severity: 'error',
      summary: '提交失败',
      detail: '请稍后重试',
      life: 3000,
    });
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
        <aside v-reveal:left class="site-card contact-info">
          <h3 class="info-title">联系方式</h3>
          <div v-for="c in contactInfo" :key="c.label" class="info-item">
            <span class="info-icon-wrap"
              ><i :class="c.icon" class="info-icon"></i
            ></span>
            <div>
              <div class="info-label">{{ c.label }}</div>
              <div class="info-value">{{ c.value }}</div>
            </div>
          </div>
          <p class="info-note">
            我们会在 1 个工作日内回复你的留言，企业客户可获得专属架构咨询。
          </p>
        </aside>
        <div v-reveal:right class="site-card contact-form">
          <div class="form-fields">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">姓名 *</label>
                <input
                  v-model="form.name"
                  class="form-input"
                  placeholder="请输入你的姓名"
                />
              </div>
              <div class="form-field">
                <label class="form-label">邮箱 *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="请输入邮箱"
                />
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">主题 *</label>
              <input
                v-model="form.subject"
                class="form-input"
                placeholder="请输入咨询主题"
              />
            </div>
            <div class="form-field">
              <label class="form-label">内容 *</label>
              <textarea
                v-model="form.message"
                class="form-textarea"
                rows="5"
                placeholder="请描述你的需求"
              ></textarea>
            </div>
            <div class="form-actions">
              <Button
                label="提交留言"
                :loading="submitting"
                @click="handleSubmit"
              />
            </div>
          </div>
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

.form-field {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--site-text-2);
}

.form-input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  font-size: 0.95rem;
  color: var(--site-text-1);
  background: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-sm);
}

.form-textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  font-size: 0.95rem;
  color: var(--site-text-1);
  resize: vertical;
  background: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius-sm);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
}
</style>
