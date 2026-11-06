<script setup lang="ts">
import { api } from '@/api';

const form = reactive({ name: '', email: '', message: '' });
const sent = ref(false);
const submitting = ref(false);
const error = ref('');

async function handleSubmit() {
  if (submitting.value || !form.name.trim() || !form.message.trim()) return;
  submitting.value = true;
  error.value = '';
  try {
    const result = await api.portal.contact({ ...form });
    if (!result.accepted) throw new Error('Message was not accepted');
    sent.value = true;
  } catch {
    error.value = '发送失败，请稍后重试';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <header class="site-hero site-hero--compact">
      <h1 class="site-hero-title">联系我们</h1>
      <p class="site-hero-desc">体验留言表单的提交与校验流程</p>
    </header>
    <section class="site-section site-container">
      <div class="content-row">
        <aside class="site-card">
          <h2>联系表单演示</h2>
          <p>留言不会被保存。项目问题请在 GitHub 提交。</p>
          <a href="https://github.com/tobe-fe-dalao/fast-vue3/issues"
            >查看项目 Issues</a
          >
        </aside>
        <div class="site-card">
          <div v-if="sent" class="success-msg">
            <span>&#10003;</span>
            <h2>演示提交成功</h2>
            <p>当前接口仅确认请求，留言不会被保存。</p>
          </div>
          <form v-else @submit.prevent="handleSubmit">
            <div class="field">
              <label for="contact-name">姓名</label
              ><input
                id="contact-name"
                v-model="form.name"
                required
                placeholder="您的姓名"
              />
            </div>
            <div class="field">
              <label for="contact-email">邮箱</label
              ><input
                id="contact-email"
                v-model="form.email"
                required
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div class="field">
              <label for="contact-message">留言</label
              ><textarea
                id="contact-message"
                v-model="form.message"
                required
                rows="5"
                placeholder="请输入您的留言…"
              ></textarea>
            </div>
            <p v-if="error" role="alert">{{ error }}</p>
            <button type="submit" class="btn-submit" :disabled="submitting">
              {{ submitting ? '发送中…' : '发送留言' }}
            </button>
          </form>
        </div>
      </div>
      <div class="bottom-nav">
        <RouterLink to="/blog">&#8592; 博客动态</RouterLink>
        <RouterLink to="/">返回首页</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 48px;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
}

.field input,
.field textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.field input:focus,
.field textarea:focus {
  border-color: var(--site-brand);
  box-shadow: 0 0 0 3px rgb(22 119 255 / 10%);
}

.btn-submit {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: var(--site-brand);
  border: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: var(--site-brand-hover);
}

.success-msg {
  padding: 48px 0;
  text-align: center;
}

.success-msg span {
  font-size: 3rem;
  color: #52c41a;
}

.success-msg h2 {
  margin: 16px 0 8px;
  color: var(--site-text-1);
}

.success-msg p {
  color: var(--site-text-3);
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
}

.bottom-nav a {
  font-weight: 500;
  color: var(--site-brand);
  text-decoration: none;
}

.bottom-nav a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
