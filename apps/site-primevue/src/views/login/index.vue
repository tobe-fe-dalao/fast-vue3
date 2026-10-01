<script setup lang="ts">
import { setRefreshToken, setToken } from '@fast-vue3/utils';

import { api } from '@/api';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const loading = ref(false);
const form = reactive({ username: '', password: '', remember: true });

async function handleLogin() {
  if (!form.username || !form.password) {
    toast.add({
      severity: 'warn',
      summary: '提示',
      detail: '请填写用户名和密码',
      life: 3000,
    });
    return;
  }
  loading.value = true;
  try {
    const result = await api.auth.login(form);
    setToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: '登录成功',
      life: 3000,
    });
    const requestedRedirect = route.query.redirect;
    const redirect =
      typeof requestedRedirect === 'string' && requestedRedirect.startsWith('/')
        ? requestedRedirect
        : '/';
    router.push(redirect);
  } catch {
    toast.add({
      severity: 'error',
      summary: '登录失败',
      detail: '请检查用户名和密码',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="auth-page">
    <div v-reveal:zoom class="auth-container">
      <div class="auth-side">
        <div class="brand">
          <h1 class="brand-title">Fast Vue3</h1>
          <p class="brand-desc">企业级多 UI 框架前端解决方案</p>
        </div>
        <div class="illustration">
          <div class="ill-circle ill-1"></div>
          <div class="ill-circle ill-2"></div>
          <div class="ill-circle ill-3"></div>
        </div>
      </div>
      <div class="auth-body">
        <div class="auth-form-wrapper">
          <h2 class="form-title">欢迎回来</h2>
          <p class="form-subtitle">登录您的账户以继续</p>
          <div class="form-fields">
            <div class="form-field">
              <label class="form-label">用户名</label
              ><input
                v-model="form.username"
                class="form-input"
                placeholder="请输入用户名"
              />
            </div>
            <div class="form-field">
              <label class="form-label">密码</label
              ><input
                v-model="form.password"
                type="password"
                class="form-input"
                placeholder="请输入密码"
              />
            </div>
            <div class="form-remember-row">
              <div class="remember-check">
                <Checkbox v-model="form.remember" binary /><span
                  class="remember-text"
                  >记住我</span
                >
              </div>
              <a class="forgot-link">忘记密码？</a>
            </div>
            <Button
              label="登录"
              :loading="loading"
              style="width: 100%"
              @click="handleLogin"
            />
          </div>
          <Divider>或</Divider>
          <div class="auth-switch">
            <span class="auth-switch-text">还没有账户？</span
            ><RouterLink to="/register" class="auth-switch-link">
              立即注册
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--site-header-h) - 120px);
  padding: 40px 24px;
  background: var(--site-bg);
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 960px;
  overflow: hidden;
  background: var(--site-surface);
  border-radius: var(--site-radius-lg);
  box-shadow: var(--site-shadow);
}

.auth-side {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 60px 48px;
  overflow: hidden;
  background: var(--site-gradient);
}

.brand-title {
  margin: 0 0 12px;
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
}

.brand-desc {
  margin: 0;
  font-size: 1.1rem;
  color: rgb(255 255 255 / 80%);
}

.illustration {
  position: absolute;
  right: -20px;
  bottom: -20px;
}

.ill-circle {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0.1;
}

.ill-1 {
  right: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
}

.ill-2 {
  right: 100px;
  bottom: 80px;
  width: 120px;
  height: 120px;
}

.ill-3 {
  right: 200px;
  bottom: 40px;
  width: 60px;
  height: 60px;
}

.auth-body {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 60px 48px;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.form-title {
  margin: 0 0 8px;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.form-subtitle {
  margin: 0 0 32px;
  color: var(--site-text-3);
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

.form-remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.remember-check {
  display: flex;
  gap: 8px;
  align-items: center;
}

.remember-text {
  font-size: 0.92rem;
  color: var(--site-text-2);
}

.forgot-link {
  font-size: 0.9rem;
  color: var(--site-brand);
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.auth-switch {
  text-align: center;
}

.auth-switch-text {
  color: var(--site-text-3);
}

.auth-switch-link {
  margin-left: 4px;
  font-weight: 600;
  color: var(--site-brand);
  text-decoration: none;
}

.auth-switch-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .auth-side {
    min-height: 160px;
    padding: 40px 24px;
  }

  .auth-body {
    padding: 40px 24px;
  }
}
</style>
