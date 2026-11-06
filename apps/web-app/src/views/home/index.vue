<script setup lang="ts">
import { api } from '@/api';

const features = ref<{ desc: string; icon: string; title: string }[]>([]);
const stats = ref<{ label: string; value: string }[]>([]);
const error = ref('');

onMounted(async () => {
  try {
    const [home, items] = await Promise.all([
      api.portal.home(),
      api.portal.features(),
    ]);
    stats.value = home.stats;
    features.value = items.map((item, index) => ({
      icon: ['⚡', '🎨', '🌗', '📱', '🔧', '📦'][index % 6] ?? '✨',
      title: item.title,
      desc: item.description,
    }));
  } catch {
    error.value = '首页内容加载失败，请稍后重试';
  }
});
</script>

<template>
  <div>
    <p v-if="error" role="alert">{{ error }}</p>
    <section class="hero">
      <h1>Fast Vue3</h1>
      <p>基于 Vite + Turborepo 的多 UI 框架 Monorepo 模板</p>
      <div class="site-btn-row">
        <RouterLink to="/features" class="btn-white">了解更多</RouterLink>
        <RouterLink to="/contact" class="btn-outline-white">
          联系我们
        </RouterLink>
      </div>
    </section>
    <section class="site-container site-section features">
      <h2>核心特性</h2>
      <div class="site-grid">
        <div
          v-for="f in features"
          :key="f.title"
          class="site-card feature-card"
        >
          <span class="feature-icon">{{ f.icon }}</span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>
    <section
      v-if="stats.length > 0"
      class="site-container site-section features"
    >
      <div class="site-grid site-grid--stats">
        <div
          v-for="item in stats"
          :key="item.label"
          class="site-card feature-card"
        >
          <h3>{{ item.value }}</h3>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </section>
    <section class="cta">
      <h2>立即开始</h2>
      <p>只需一行命令，创建你的项目</p>
      <code>pnpm create-app</code>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: clamp(56px, 9vw, 120px) 24px;
  color: #fff;
  text-align: center;
  background: var(--site-gradient);
}

.hero h1 {
  margin: 0 0 16px;
  font-size: clamp(2.25rem, 7vw, 3.5rem);
  font-weight: 800;
}

.hero p {
  margin: 0 0 40px;
  font-size: 1.25rem;
  opacity: 0.85;
}

.btn-white {
  padding: 12px 32px;
  font-weight: 600;
  color: var(--site-brand);
  text-decoration: none;
  background: #fff;
  border-radius: 8px;
  transition: transform 0.2s;
}

.btn-white:hover {
  transform: translateY(-2px);
}

.btn-outline-white {
  padding: 12px 32px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: transparent;
  border: 2px solid rgb(255 255 255 / 50%);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.btn-outline-white:hover {
  border-color: #fff;
}

.features {
  text-align: center;
}

.features h2 {
  margin: 0 0 48px;
  font-size: 2rem;
  color: var(--site-text-1);
}

.feature-card {
  padding: 32px 24px;
  text-align: left;
  background: var(--site-bg);
  border-radius: 12px;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  transform: translateY(-4px);
}

.feature-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 2rem;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.feature-card p {
  margin: 0;
  line-height: 1.6;
  color: var(--site-text-3);
}

.cta {
  padding: 80px 20px;
  text-align: center;
  background: var(--site-bg);
}

.cta h2 {
  margin: 0 0 12px;
  font-size: 2rem;
  color: var(--site-text-1);
}

.cta p {
  margin: 0 0 24px;
  color: var(--site-text-3);
}

.cta code {
  display: inline-block;
  padding: 12px 24px;
  font-family: monospace;
  font-size: 1rem;
  color: #52c41a;
  background: var(--site-text-1);
  border-radius: 8px;
}
</style>
