<script setup lang="ts">
import { api } from '@/api';
import { IxButton } from '@idux/components/button';
import { IxCollapse, IxCollapsePanel } from '@idux/components/collapse';
import { IxTag } from '@idux/components/tag';

const router = useRouter();

function scrollToFeatures() {
  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
}
function scrollToNext() {
  document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' });
}

const stats = [
  { icon: '🎨', value: '7', label: 'UI 框架' },
  { icon: '🧩', value: '50+', label: '内置页面' },
  { icon: '💎', value: 'TS 6', label: 'TypeScript' },
  { icon: '⚡', value: 'Vite 8', label: '构建工具' },
];

const features = [
  {
    icon: '⚡',
    title: 'Vite 8 + Turborepo',
    desc: '基于 Vite 8 极速构建引擎，配合 Turborepo 实现增量构建与远程缓存，毫秒级热更新，开发体验丝滑流畅。',
  },
  {
    icon: '🎨',
    title: '7 大 UI 框架',
    desc: 'Ant Design Vue / Element Plus / Naive UI / Arco Design / TDesign / PrimeVue / iDux，一站式覆盖主流组件库。',
  },
  {
    icon: '🌗',
    title: '深色 / 亮色主题',
    desc: '基于 CSS Variables 的主题系统，支持明暗模式无缝切换，可自定义品牌色与全局 Token。',
  },
  {
    icon: '📱',
    title: '后台 + 站点双模式',
    desc: '同一套工程体系同时输出后台管理应用与纯页面站点，按需选择，灵活切换。',
  },
  {
    icon: '🔧',
    title: 'TypeScript 6',
    desc: '全面拥抱 TypeScript 6，严格的类型推导与泛型约束，从编码阶段捕获潜在错误。',
  },
  {
    icon: '📦',
    title: '自动按需导入',
    desc: 'unplugin-auto-import + unplugin-vue-components 实现 API 与组件的按需自动导入，告别手动 import。',
  },
];

const testimonials = [
  {
    avatar: '🧑‍💻',
    name: '李明',
    role: '某互联网公司 · 前端负责人',
    quote:
      '用 Fast Vue3 同时维护 3 个不同 UI 框架的中后台项目，共享层代码完全复用，团队效率提升了一倍。',
  },
  {
    avatar: '👩‍💼',
    name: '王芳',
    role: '独立开发者',
    quote:
      'create-app 一条命令就能生成新应用，官网和后台一起搞定，是我见过工程化最完整的 Vue3 模板。',
  },
  {
    avatar: '👨‍🔬',
    name: '张伟',
    role: '全栈工程师',
    quote:
      '主题系统和偏好配置做得非常细腻，暗色模式、色弱模式开箱即用，交付给客户时特别有面子。',
  },
];

const techStack = [
  { name: 'Vue 3.5', tag: '渐进式框架', color: 'green' },
  { name: 'Vite 8', tag: '构建工具', color: 'purple' },
  { name: 'TypeScript 6', tag: '类型系统', color: 'blue' },
  { name: 'Pinia 3', tag: '状态管理', color: 'orange' },
  { name: 'Vue Router 4', tag: '路由管理', color: 'cyan' },
  { name: 'Tailwind CSS', tag: '原子化样式', color: 'default' },
];

const faqs = [
  {
    q: 'Fast Vue3 适合什么场景？',
    a: '企业中后台管理系统、SaaS 产品官网、多 UI 框架技术选型对比，以及需要长期维护的大型前端工程。',
  },
  {
    q: '可以只使用其中一个 UI 框架吗？',
    a: '可以。通过 create-app 脚手架创建应用时选择任意一套 UI 框架即可，其余框架不会进入你的项目。',
  },
  {
    q: '是否支持私有化部署与二次开发？',
    a: '完全支持。项目基于 MIT 协议开源，所有代码可自由修改，共享包与应用层解耦，方便按需裁剪。',
  },
  {
    q: '如何从现有项目迁移？',
    a: '文档中提供了目录结构说明与共享包接入指南，你可以按模块逐步将业务代码迁移到对应应用中。',
  },
];
const shownStats = ref<typeof stats>(stats);
const shownFeatures = ref<typeof features>(features);
const shownTestimonials = ref<typeof testimonials>(testimonials);
const shownFaqs = ref<typeof faqs>(faqs);
const loadError = ref('');

onMounted(async () => {
  try {
    const [home, featureItems, faqItems] = await Promise.all([
      api.portal.home(),
      api.portal.features(),
      api.portal.faq(),
    ]);
    shownStats.value = home.stats.map((item, index) => ({
      ...item,
      icon: ['🎨', '🧩', '💎', '⚡'][index % 4] ?? '✨',
    }));
    shownFeatures.value = featureItems.map((item, index) => ({
      icon: ['⚡', '🎨', '🌗', '📱', '🔧', '📦'][index % 6] ?? '✨',
      title: item.title,
      desc: item.description,
    }));
    shownTestimonials.value = home.testimonials.map((item, index) => ({
      avatar: ['🧑‍💻', '👩‍💼', '👨‍🔬'][index % 3] ?? '👤',
      name: item.name,
      role: item.role,
      quote: item.content,
    }));
    shownFaqs.value = faqItems
      .slice(0, 4)
      .map((item) => ({ q: item.question, a: item.answer }));
  } catch {
    loadError.value = '首页内容暂时无法更新，当前显示内置示例';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert" class="site-container">{{ loadError }}</p>
  <div class="home-page">
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-badge">🚀 Vue 3.5 · Vite 8 · TypeScript 6</div>
        <h1 class="hero-title">Fast Vue3</h1>
        <p class="hero-subtitle">基于 Vue 3 的多 UI 框架 Monorepo 工程平台</p>
        <p class="hero-desc">
          集成 7 大主流 UI 框架，支持后台管理 +
          门户站点双模式，专注工程架构与长期可维护性
        </p>
        <div class="site-btn-row">
          <IxButton mode="primary" class="hero-btn" @click="scrollToFeatures">
            快速开始
          </IxButton>
          <IxButton class="hero-btn-outline" @click="router.push('/docs')">
            查看文档
          </IxButton>
        </div>
      </div>
      <button
        type="button"
        class="hero-scroll-hint"
        title="向下滚动"
        @click="scrollToNext"
      >
        <span class="hero-scroll-arrow">↓</span>
      </button>
    </section>

    <section id="stats" class="stats-section">
      <div class="site-container site-container--narrow">
        <div class="site-grid" style="--site-grid-cols: 4">
          <div
            v-for="(s, i) in shownStats"
            :key="s.label"
            v-reveal="i * 80"
            class="site-card stat-card"
          >
            <div class="stat-icon">{{ s.icon }}</div>
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="site-section">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">核心特性</h2>
          <p class="site-section-desc">
            从工程架构到开发体验，Fast Vue3 为你提供全方位的最佳实践
          </p>
        </div>
        <div class="site-grid">
          <article
            v-for="(f, i) in shownFeatures"
            :key="f.title"
            v-reveal="(i % 3) * 100"
            class="site-card site-card--hoverable feature-card"
          >
            <div class="feature-icon">{{ f.icon }}</div>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="site-section site-section--alt">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">开发者声音</h2>
          <p class="site-section-desc">来自一线团队的真实反馈</p>
        </div>
        <div class="site-grid">
          <figure
            v-for="(t, i) in shownTestimonials"
            :key="t.name"
            v-reveal="i * 120"
            class="site-card testimonial-card"
          >
            <blockquote class="testimonial-quote">"{{ t.quote }}"</blockquote>
            <figcaption class="testimonial-author">
              <span class="testimonial-avatar">{{ t.avatar }}</span
              ><span
                ><span class="testimonial-name">{{ t.name }}</span
                ><span class="testimonial-role">{{ t.role }}</span></span
              >
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">技术栈</h2>
          <p class="site-section-desc">拥抱最新的 Vue 生态工具链</p>
        </div>
        <div class="site-grid" style="--site-grid-cols: 6">
          <div
            v-for="(t, i) in techStack"
            :key="t.name"
            v-reveal="i * 60"
            class="site-card site-card--hoverable tech-card"
          >
            <div class="tech-name">{{ t.name }}</div>
            <IxTag :color="t.color" style="margin-top: 8px">{{ t.tag }}</IxTag>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section site-section--soft">
      <div class="site-container site-container--narrow">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">快速开始</h2>
          <p class="site-section-desc">三步启动你的项目</p>
        </div>
        <div v-reveal class="site-card quickstart-card">
          <ol class="steps">
            <li class="step-item">
              <span class="step-num">1</span>
              <div>
                <div class="step-title">克隆并安装依赖</div>
                <div class="step-desc">git clone ... && pnpm install</div>
              </div>
            </li>
            <li class="step-item">
              <span class="step-num">2</span>
              <div>
                <div class="step-title">启动开发服务</div>
                <div class="step-desc">pnpm dev</div>
              </div>
            </li>
            <li class="step-item">
              <span class="step-num">3</span>
              <div>
                <div class="step-title">构建部署</div>
                <div class="step-desc">pnpm build</div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="site-section site-section--alt">
      <div class="site-container site-container--narrow">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">常见问题</h2>
          <p class="site-section-desc">你关心的，我们都想到了</p>
        </div>
        <div v-reveal class="faq-panel">
          <IxCollapse>
            <IxCollapsePanel
              v-for="item in shownFaqs"
              :key="item.q"
              :header="item.q"
            >
              <p class="faq-answer">{{ item.a }}</p>
            </IxCollapsePanel>
          </IxCollapse>
          <div class="faq-more">
            <RouterLink to="/faq" class="faq-more-link">
              查看更多问题 →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner" v-reveal:zoom>
        <h2 class="cta-title">开始使用 Fast Vue3</h2>
        <p class="cta-desc">一行命令，即可启动你的下一个项目</p>
        <div class="cta-code">pnpm create fast-vue3</div>
        <div class="site-btn-row" style="margin-top: 24px">
          <IxButton class="cta-btn" @click="router.push('/docs')">
            阅读文档
          </IxButton>
          <IxButton class="cta-btn-outline" @click="router.push('/contact')">
            联系我们
          </IxButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  background: var(--site-bg);
}

.hero {
  position: relative;
  padding: 110px 24px 130px;
  text-align: center;
  background: var(--site-gradient);
}

.hero-inner {
  max-width: var(--site-container-narrow);
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 24px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: rgb(255 255 255 / 16%);
  border-radius: 999px;
}

.hero-title {
  margin: 0 0 16px;
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
}

.hero-subtitle {
  margin: 0 0 12px;
  font-size: 1.5rem;
  color: rgb(255 255 255 / 95%);
}

.hero-desc {
  max-width: 560px;
  margin: 0 auto 36px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgb(255 255 255 / 78%);
}

.hero-btn {
  height: 48px !important;
  padding: 0 32px !important;
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-brand) !important;
  background: #fff !important;
  border-color: #fff !important;
  border-radius: var(--site-radius-sm) !important;
}

.hero-btn:hover {
  color: var(--site-accent) !important;
}

.hero-btn-outline {
  height: 48px !important;
  padding: 0 32px !important;
  font-size: 1rem;
  font-weight: 600;
  color: #fff !important;
  background: transparent !important;
  border-color: rgb(255 255 255 / 60%) !important;
  border-radius: var(--site-radius-sm) !important;
}

.hero-btn-outline:hover {
  color: #fff !important;
  border-color: #fff !important;
}

.hero-scroll-hint {
  position: absolute;
  bottom: 64px;
  left: 50%;
  color: rgb(255 255 255 / 85%);
  cursor: pointer;
  background: transparent;
  border: none;
  transform: translateX(-50%);
}

.hero-scroll-arrow {
  display: inline-block;
  font-size: 1.4rem;
  animation: hero-bounce 1.6s ease-in-out infinite;
}

@keyframes hero-bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

.stats-section {
  padding: 0 24px;
  margin-top: -56px;
}

.stat-card {
  padding: 20px 16px;
  text-align: center;
}

.stat-icon {
  margin-bottom: 6px;
  font-size: 1.6rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--site-text-3);
}

.feature-card {
  height: 100%;
  text-align: center;
}

.feature-icon {
  margin-bottom: 16px;
  font-size: 2.5rem;
}

.feature-title {
  margin: 0 0 12px;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.feature-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  margin: 0;
}

.testimonial-quote {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--site-text-2);
}

.testimonial-author {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: auto;
}

.testimonial-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  font-size: 1.3rem;
  background: var(--site-bg-soft);
  border-radius: 50%;
}

.testimonial-name {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.testimonial-role {
  display: block;
  font-size: 0.8rem;
  color: var(--site-text-4);
}

.tech-card {
  padding: 20px 12px;
  text-align: center;
}

.tech-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.quickstart-card {
  padding: 40px;
}

.steps {
  padding: 0;
  margin: 0;
  list-style: none;
}

.step-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid var(--site-border);
}

.step-item:last-child {
  border-bottom: none;
}

.step-num {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  background: var(--site-brand);
  border-radius: 50%;
}

.step-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.step-desc {
  margin-top: 4px;
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 0.88rem;
  color: var(--site-text-3);
}

.faq-panel {
  background: var(--site-bg);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
}

.faq-answer {
  margin: 0;
  line-height: 1.7;
  color: var(--site-text-3);
}

.faq-more {
  padding: 16px 24px;
  text-align: center;
}

.faq-more-link {
  font-weight: 500;
  color: var(--site-brand);
  text-decoration: none;
}

.faq-more-link:hover {
  color: var(--site-brand-hover);
}

.cta-section {
  padding: var(--site-section-py) 24px;
  text-align: center;
  background: var(--site-gradient);
}

.cta-inner {
  max-width: 640px;
  margin: 0 auto;
}

.cta-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.cta-desc {
  margin: 0 0 24px;
  font-size: 1.1rem;
  color: rgb(255 255 255 / 82%);
}

.cta-code {
  display: inline-block;
  padding: 12px 28px;
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 1rem;
  color: #fff;
  background: rgb(0 0 0 / 25%);
  border-radius: var(--site-radius-sm);
}

.cta-btn {
  height: 46px !important;
  padding: 0 28px !important;
  font-weight: 600;
  color: var(--site-brand) !important;
  background: #fff !important;
  border-color: #fff !important;
  border-radius: var(--site-radius-sm) !important;
}

.cta-btn:hover {
  color: var(--site-accent) !important;
}

.cta-btn-outline {
  height: 46px !important;
  padding: 0 28px !important;
  font-weight: 600;
  color: #fff !important;
  background: transparent !important;
  border-color: rgb(255 255 255 / 60%) !important;
  border-radius: var(--site-radius-sm) !important;
}

.cta-btn-outline:hover {
  border-color: #fff !important;
}

@media (max-width: 640px) {
  .hero {
    padding: 72px 20px 96px;
  }

  .hero-title {
    font-size: 2.4rem;
  }
}
</style>
