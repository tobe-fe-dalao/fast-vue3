<script setup lang="ts">
import { api } from '@/api';
import { useMessage } from 'naive-ui';

const message = useMessage();
const router = useRouter();
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
    message.warning('请填写完整信息');
    return;
  }
  if (form.password !== form.confirmPassword) {
    message.error('两次密码输入不一致');
    return;
  }
  if (!form.agree) {
    message.warning('请先同意服务条款');
    return;
  }
  loading.value = true;
  try {
    await api.auth.register({
      email: form.email,
      password: form.password,
      username: form.username,
    });
    message.success('注册成功，请登录');
    router.push('/login');
  } catch {
    message.error('注册失败，用户名可能已存在');
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

          <NForm
            :model="form"
            label-placement="top"
            @submit.prevent="handleRegister"
          >
            <div class="form-row">
              <NFormItem label="用户名">
                <NInput
                  v-model:value="form.username"
                  size="large"
                  placeholder="请输入用户名"
                />
              </NFormItem>
              <NFormItem label="邮箱">
                <NInput
                  v-model:value="form.email"
                  size="large"
                  placeholder="请输入邮箱"
                />
              </NFormItem>
            </div>
            <NFormItem label="密码">
              <NInput
                v-model:value="form.password"
                type="password"
                show-password-on="click"
                size="large"
                placeholder="至少 6 位密码"
              />
            </NFormItem>
            <NFormItem label="确认密码">
              <NInput
                v-model:value="form.confirmPassword"
                type="password"
                show-password-on="click"
                size="large"
                placeholder="请再次输入密码"
              />
            </NFormItem>
            <NFormItem>
              <NCheckbox v-model:checked="form.agree">
                我已阅读并同意 <a class="terms-link">服务条款</a> 和
                <a class="terms-link">隐私政策</a>
              </NCheckbox>
            </NFormItem>
            <NFormItem>
              <NButton
                type="primary"
                attr-type="submit"
                size="large"
                block
                :loading="loading"
              >
                注册
              </NButton>
            </NFormItem>
          </NForm>

          <div class="auth-switch">
            <span class="auth-switch-text">已有账户？</span>
            <RouterLink to="/login" class="auth-switch-link">
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
