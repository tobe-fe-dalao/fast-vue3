<script setup lang="ts">
import { api } from '@/api';

const features = ref<{ desc: string; icon: string; title: string }[]>([]);
const error = ref('');

onMounted(async () => {
  try {
    const items = await api.portal.features();
    features.value = items.map((item, index) => ({
      icon: ['🎨', '📦', '🔧', '⚡', '🌗', '🔒'][index % 6] ?? '✨',
      title: item.title,
      desc: item.description,
    }));
  } catch {
    error.value = '功能特性加载失败，请稍后重试';
  }
});
</script>

<template>
  <div>
    <header class="site-hero site-hero--compact">
      <h1 class="site-hero-title">产品特性</h1>
      <p class="site-hero-desc">
        Fast Vue3 为现代前端开发提供完整的工程化解决方案
      </p>
    </header>
    <section class="site-section site-container">
      <p v-if="error" role="alert">{{ error }}</p>

      <div class="site-grid grid">
        <div v-for="f in features" :key="f.title" class="site-card card">
          <span class="card-icon">{{ f.icon }}</span>
          <h2>{{ f.title }}</h2>
          <p>{{ f.desc }}</p>
        </div>
      </div>
      <div class="bottom-nav">
        <RouterLink to="/">&#8592; 返回首页</RouterLink>
        <RouterLink to="/blog">查看博客 &#8594;</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grid {
  margin-bottom: 32px;
}

.card {
  padding: 32px;
  background: var(--site-bg);
  border-radius: 12px;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  transform: translateY(-2px);
}

.card-icon {
  display: block;
  margin-bottom: 16px;
  font-size: 2rem;
}

.card h2 {
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.card p {
  margin: 0;
  line-height: 1.7;
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
</style>
