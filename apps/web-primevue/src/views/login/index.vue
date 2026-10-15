<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { userApi } from '@/api/user';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const loading = ref(false);
const form = reactive({ username: 'admin', password: '123456' });

async function onLogin() {
  if (loading.value) return;
  if (!form.username || !form.password) return;
  loading.value = true;
  try {
    const loggedIn = await userStore.login(
      () => userApi.login({ ...form }),
      userApi.getProfile,
    );
    if (!loggedIn) return;
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: '登录成功',
      life: 2000,
    });
    const redirect =
      (router.currentRoute.value.query.redirect as string) || '/';
    await router.push(redirect);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : '登录失败';
    toast.add({ severity: 'error', summary: '错误', detail: msg, life: 3000 });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="login-brand">
      <div class="brand-inner">
        <div class="brand-logo">⚡</div>
        <h1>Fast Vue3</h1>
        <p>多 UI 框架 · Monorepo 工程模板</p>
        <ul class="brand-list">
          <li>✦ Vue 3.5 + TypeScript</li>
          <li>✦ Vite 7 + Turborepo</li>
          <li>✦ Pinia + UnoCSS</li>
          <li>✦ 7 套 UI 框架</li>
        </ul>
      </div>
    </div>
    <div class="login-panel">
      <div class="login-card">
        <div class="login-header">
          <span class="ui-badge">PrimeVue 4</span>
          <h2>欢迎回来</h2>
          <p>请登录您的账号</p>
        </div>
        <div class="form-group">
          <label>用户名</label>
          <InputText
            v-model="form.username"
            size="large"
            placeholder="请输入用户名（admin）"
            class="w-full"
            @keyup.enter="onLogin"
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <Password
            v-model="form.password"
            placeholder="请输入密码（123456）"
            class="w-full"
            toggle-mask
            :feedback="false"
            input-class="w-full"
            @keyup.enter="onLogin"
          />
        </div>
        <Button
          label="登录"
          size="large"
          :loading="loading"
          class="w-full login-btn"
          @click="onLogin"
        />
        <p class="login-hint">默认账号：admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrap {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.login-brand {
  display: flex;
  flex: 0 0 42%;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%);
}

.brand-inner {
  max-width: 380px;
  padding: 40px;
}

.brand-logo {
  margin-bottom: 16px;
  font-size: 64px;
}

.brand-inner h1 {
  margin: 0 0 8px;
  font-size: 36px;
  font-weight: 700;
}

.brand-inner p {
  margin: 0 0 32px;
  font-size: 16px;
  opacity: 0.85;
}

.brand-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.brand-list li {
  font-size: 14px;
  opacity: 0.9;
}

.login-panel {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}

.login-card {
  width: 420px;
  padding: 48px 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgb(0 0 0 / 8%);
}

.login-header {
  margin-bottom: 32px;
}

.ui-badge {
  display: inline-block;
  padding: 3px 12px;
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6366f1;
  background: #eef2ff;
  border-radius: 20px;
}

.login-header h2 {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
}

.login-header p {
  margin: 0;
  font-size: 14px;
  color: #8c8c8c;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.login-btn {
  margin-top: 8px;
}

.login-hint {
  margin-top: 20px;
  font-size: 12px;
  color: #bfbfbf;
  text-align: center;
}

@media (max-width: 768px) {
  .login-brand {
    display: none;
  }

  .login-panel {
    background: linear-gradient(135deg, #6366f1, #a5b4fc);
  }
}
</style>
