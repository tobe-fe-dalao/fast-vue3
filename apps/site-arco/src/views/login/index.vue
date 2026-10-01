<script setup lang="ts">
import { setRefreshToken, setToken } from '@fast-vue3/utils';

import { api } from '@/api';
import { Message } from '@arco-design/web-vue';

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
  remember: true,
});

async function handleLogin() {
  if (!form.username || !form.password) {
    Message.warning('请填写用户名和密码');
    return;
  }
  loading.value = true;
  try {
    const result = await api.auth.login(form);
    setToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    Message.success('登录成功');
    const requestedRedirect = route.query.redirect;
    const redirect =
      typeof requestedRedirect === 'string' && requestedRedirect.startsWith('/')
        ? requestedRedirect
        : '/';
    router.push(redirect);
  } catch {
    Message.error('登录失败，请检查用户名和密码');
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

          <a-form :model="form" layout="vertical" @submit="handleLogin">
            <a-form-item label="用户名" field="username">
              <a-input
                v-model="form.username"
                size="large"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item label="密码" field="password">
              <a-input-password
                v-model="form.password"
                size="large"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <div class="form-remember-row">
                <a-checkbox v-model="form.remember"> 记住我 </a-checkbox>
                <a class="forgot-link">忘记密码？</a>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                size="large"
                long
                :loading="loading"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>

          <a-divider>或</a-divider>

          <div class="auth-switch">
            <span class="auth-switch-text">还没有账户？</span>
            <RouterLink to="/register" class="auth-switch-link">
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

.form-remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
