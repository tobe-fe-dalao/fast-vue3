<script setup lang="ts">
import { api } from '@/api';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();
const loading = ref(false);
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
});

async function handleRegister() {
  if (!form.username || !form.email || !form.password) {
    toast.add({
      severity: 'warn',
      summary: '提示',
      detail: '请填写完整信息',
      life: 3000,
    });
    return;
  }
  if (form.password !== form.confirmPassword) {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '两次密码输入不一致',
      life: 3000,
    });
    return;
  }
  if (!form.agree) {
    toast.add({
      severity: 'warn',
      summary: '提示',
      detail: '请先同意服务条款',
      life: 3000,
    });
    return;
  }
  loading.value = true;
  try {
    await api.auth.register({
      email: form.email,
      password: form.password,
      username: form.username,
    });
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: '注册成功，请登录',
      life: 3000,
    });
    router.push('/login');
  } catch {
    toast.add({
      severity: 'error',
      summary: '注册失败',
      detail: '用户名可能已存在',
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
          <h1 class="brand-title">加入 Fast Vue3</h1>
          <p class="brand-desc">创建你的账户，开始构建现代 Web 应用</p>
        </div>
        <div class="features-list">
          <div class="feat-item">✓ 7 大 UI 框架支持</div>
          <div class="feat-item">✓ 完整权限管理系统</div>
          <div class="feat-item">✓ TypeScript 全覆盖</div>
          <div class="feat-item">✓ 持续更新维护</div>
        </div>
      </div>
      <div class="auth-body">
        <div class="auth-form-wrapper">
          <h2 class="form-title">创建账户</h2>
          <p class="form-subtitle">填写以下信息完成注册</p>
          <div class="form-fields">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">用户名</label
                ><input
                  v-model="form.username"
                  class="form-input"
                  placeholder="请输入用户名"
                />
              </div>
              <div class="form-field">
                <label class="form-label">邮箱</label
                ><input
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="请输入邮箱"
                />
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">密码</label
              ><input
                v-model="form.password"
                type="password"
                class="form-input"
                placeholder="至少 6 位密码"
              />
            </div>
            <div class="form-field">
              <label class="form-label">确认密码</label
              ><input
                v-model="form.confirmPassword"
                type="password"
                class="form-input"
                placeholder="请再次输入密码"
              />
            </div>
            <div class="form-agree">
              <Checkbox v-model="form.agree" binary />
              <span class="agree-text"
                >我已阅读并同意 <a class="terms-link">服务条款</a> 和
                <a class="terms-link">隐私政策</a></span
              >
            </div>
            <Button
              label="注册"
              :loading="loading"
              style="width: 100%"
              @click="handleRegister"
            />
          </div>
          <div class="auth-switch">
            <span class="auth-switch-text">已有账户？</span
            ><RouterLink to="/login" class="auth-switch-link">
              去登录
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
  max-width: 1000px;
  overflow: hidden;
  background: var(--site-surface);
  border-radius: var(--site-radius-lg);
  box-shadow: var(--site-shadow);
}

.auth-side {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 60px 48px;
  background: var(--site-gradient);
}

.brand-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.brand-desc {
  margin: 0 0 40px;
  font-size: 1rem;
  color: rgb(255 255 255 / 80%);
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feat-item {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(255 255 255 / 90%);
}

.auth-body {
  display: flex;
  flex: 1.2;
  align-items: center;
  padding: 48px;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.form-subtitle {
  margin: 0 0 24px;
  color: var(--site-text-3);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.form-agree {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
}

.agree-text {
  font-size: 0.92rem;
  color: var(--site-text-2);
}

.terms-link {
  color: var(--site-brand);
}

.auth-switch {
  margin-top: 16px;
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
    padding: 32px 24px;
  }

  .auth-body {
    padding: 32px 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
