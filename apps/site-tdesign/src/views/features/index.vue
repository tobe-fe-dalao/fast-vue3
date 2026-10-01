<script setup lang="ts">
import { api } from '@/api';

const featureGroups = [
  {
    icon: '⚡',
    title: '极速工程体系',
    desc: 'Vite 8 构建引擎配合 Turborepo 增量构建与远程缓存，毫秒级热更新，开发体验丝滑流畅。',
    items: ['Vite 8 + Turborepo', '增量构建 / 远程缓存', '毫秒级 HMR'],
  },
  {
    icon: '🎨',
    title: '7 大 UI 框架',
    desc: 'Ant Design Vue / Element Plus / Naive UI / Arco / TDesign / PrimeVue / iDux，开箱即用，原生设计语言。',
    items: ['统一的功能能力', '各自原生视觉', '一键切换'],
  },
  {
    icon: '🧩',
    title: 'Monorepo / Polyrepo',
    desc: '同一套能力既可组织为 Monorepo 统一工程，也可拆分为 Polyrepo 独立仓库，按需选择。',
    items: ['Monorepo 主版本', 'Polyrepo 独立工程', 'CLI 一致生成'],
  },
  {
    icon: '🌗',
    title: '明暗主题',
    desc: '基于 CSS Variables 的主题系统，支持明暗无缝切换，可自定义品牌色与全局 Token。',
    items: ['CSS Variables', '品牌色自定义', '组件级暗色'],
  },
  {
    icon: '📦',
    title: '后台 + 门户双模式',
    desc: '同一工程体系同时输出后台管理应用与营销门户站点，模板真实可用。',
    items: ['后台管理模板', '门户站点模板', '统一 Design System'],
  },
  {
    icon: '🔒',
    title: '类型安全',
    desc: '全面拥抱 TypeScript，严格类型推导与泛型约束，从编码阶段捕获潜在错误。',
    items: ['TypeScript 6', '严格类型约束', 'Composition API'],
  },
];

const whyItems = [
  {
    title: '真正可启动',
    desc: 'CLI 生成的项目直接 pnpm install && pnpm dev 即可开始写业务，而非一堆示例碎片。',
  },
  {
    title: '功能对齐',
    desc: '不同 UI 框架拥有完全一致的页面能力与信息架构，切换框架不丢功能。',
  },
  {
    title: '长期可维护',
    desc: '业务逻辑与 UI 解耦，共享包统一管理，工程结构清晰，易于扩展。',
  },
];
const shownFeatureGroups = ref<typeof featureGroups>(featureGroups);
const loadError = ref('');

onMounted(async () => {
  try {
    const features = await api.portal.features();
    shownFeatureGroups.value = features.map((item, index) => ({
      icon: ['⚡', '🎨', '🧩', '🌗', '📦', '🔒'][index % 6] ?? '✨',
      title: item.title,
      desc: item.description,
      items: [],
    }));
  } catch {
    loadError.value = '功能特性暂时无法更新，当前显示内置示例';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert" class="site-container">{{ loadError }}</p>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">核心特性</h1>
      <p class="site-hero-desc">
        从工程架构到开发体验，Fast Vue3 为你提供企业级最佳实践
      </p>
    </section>

    <!-- Features Grid -->
    <section class="site-section">
      <div class="site-container">
        <div class="site-grid">
          <article
            v-for="(f, i) in shownFeatureGroups"
            :key="f.title"
            v-reveal="(i % 3) * 100"
            class="site-card site-card--hoverable feature-card"
          >
            <div class="feature-icon">{{ f.icon }}</div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
            <ul class="feature-items">
              <li v-for="item in f.items" :key="item">
                <span class="feature-check">✓</span>{{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Why choose -->
    <section class="site-section site-section--alt">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">为什么选择 Fast Vue3</h2>
        </div>
        <div class="site-grid">
          <div
            v-for="(w, i) in whyItems"
            :key="w.title"
            v-reveal="i * 120"
            class="why-item"
          >
            <div class="why-index">0{{ i + 1 }}</div>
            <h4 class="why-title">{{ w.title }}</h4>
            <p class="why-desc">{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="page-cta">
      <div class="page-cta-inner" v-reveal:zoom>
        <h2 class="page-cta-title">开始使用 Fast Vue3</h2>
        <div class="site-btn-row" style="margin-top: 20px">
          <t-button size="large" class="cta-btn">
            pnpm create fast-vue3
          </t-button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.feature-card {
  height: 100%;
}

.feature-icon {
  margin-bottom: 14px;
  font-size: 2.2rem;
}

.feature-title {
  margin: 0 0 10px;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.feature-desc {
  margin: 0 0 14px;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

.feature-items {
  padding: 0;
  margin: 0;
  list-style: none;
}

.feature-items li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 3px 0;
  font-size: 0.88rem;
  color: var(--site-text-2);
}

.feature-check {
  font-weight: 700;
  color: #52c41a;
}

/* ── Why ── */
.why-item {
  padding: 28px;
  background: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
}

.why-index {
  margin-bottom: 12px;
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--site-brand);
}

.why-title {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.why-desc {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

/* ── CTA ── */
.page-cta {
  padding: var(--site-section-py) 24px;
  text-align: center;
  background: var(--site-gradient);
}

.page-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.page-cta-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.cta-btn {
  height: 48px !important;
  padding: 0 32px !important;
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-brand) !important;
  background: #fff !important;
  border-color: #fff !important;
  border-radius: var(--site-radius-sm) !important;
}

.cta-btn:hover {
  color: var(--site-accent) !important;
}
</style>
