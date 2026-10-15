<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { userApi } from '@/api/user';
import { useMessage } from '@idux/components/message';

const router = useRouter();
const message = useMessage();
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
    message.success('登录成功');
    const redirect =
      (router.currentRoute.value.query.redirect as string) || '/';
    await router.push(redirect);
  } catch (error: any) {
    message.error(error?.message || '登录失败，请稍后重试');
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
          <span class="ui-badge">iDux</span>
          <h2>欢迎回来</h2>
          <p>请登录您的账号</p>
        </div>
        <IxForm layout="vertical">
          <IxFormItem label="用户名">
            <IxInput
              v-model:value="form.username"
              size="lg"
              placeholder="请输入用户名（admin）"
              @keyup.enter="onLogin"
            />
          </IxFormItem>
          <IxFormItem label="密码">
            <IxInput
              v-model:value="form.password"
              type="password"
              size="lg"
              placeholder="请输入密码（123456）"
              @keyup.enter="onLogin"
            />
          </IxFormItem>
          <IxButton
            :loading="loading"
            mode="primary"
            size="lg"
            block
            @click="onLogin"
          >
            登录
          </IxButton>
        </IxForm>
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
  background: linear-gradient(135deg, #1960e2 0%, #3a7bd5 50%, #6fa3e0 100%);
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
  color: #1960e2;
  background: #e8f0fb;
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
    background: linear-gradient(135deg, #1960e2, #6fa3e0);
  }
}
</style>
