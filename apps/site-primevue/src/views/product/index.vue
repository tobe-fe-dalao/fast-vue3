<script setup lang="ts">
import { api } from '@/api';
import Button from 'primevue/button';

const useCases = [
  {
    title: '企业后台管理',
    desc: '快速搭建企业级后台管理系统，内置权限管理、数据可视化、表单处理等核心能力。',
    icon: '🏢',
  },
  {
    title: 'SaaS 产品平台',
    desc: '支持多租户架构，灵活的插件体系，一套代码适配多种业务场景。',
    icon: '☁️',
  },
  {
    title: '数据中台',
    desc: '集成 ECharts 图表库，支持大屏展示与实时数据可视化，打造高效数据决策平台。',
    icon: '📊',
  },
  {
    title: '低代码搭建',
    desc: '组件化架构天然支持拖拽式页面构建，快速配置生成业务页面。',
    icon: '🧱',
  },
];

const features = [
  {
    title: '多 UI 框架支持',
    desc: '同时支持 7 大主流 Vue 3 UI 框架，团队可按偏好自由选择，无需重新学习。',
    icon: '🎨',
  },
  {
    title: '权限管理系统',
    desc: '完整的 RBAC 权限体系，支持菜单权限、按钮权限、数据权限多维度控制。',
    icon: '🔐',
  },
  {
    title: '国际化支持',
    desc: '内置 i18n 国际化方案，支持中文、英文、日文等多语言切换。',
    icon: '🌍',
  },
  {
    title: '主题定制',
    desc: '基于 CSS Variables 的主题系统，支持品牌色、圆角、间距等全局 Token 自定义。',
    icon: '🎭',
  },
  {
    title: '高性能构建',
    desc: 'Vite 8 + Turborepo 增量构建，开发环境毫秒级热更新，生产环境极致优化。',
    icon: '⚡',
  },
  {
    title: '完整类型系统',
    desc: 'TypeScript 全覆盖，严格类型推导与泛型约束，IDE 智能提示零延迟。',
    icon: '📝',
  },
  {
    title: '动态路由',
    desc: '支持后端动态下发路由配置，结合权限系统实现菜单级别精确控制。',
    icon: '🗺️',
  },
  {
    title: '请求封装',
    desc: '统一的 HTTP 请求层，内置拦截器、错误处理、Token 刷新、重试机制。',
    icon: '🔗',
  },
];
const shownFeatures = ref<typeof features>(features);
const productSlogan = ref('Fast Vue3 提供完整的企业级前端解决方案');
const loadError = ref('');

onMounted(async () => {
  try {
    const product = await api.portal.product();
    productSlogan.value = product.slogan;
    shownFeatures.value = product.highlights.map((item, index) => ({
      icon: ['🎨', '🔐', '🌍', '🎭', '⚡', '📝', '🗺️', '🔗'][index % 8] ?? '✨',
      title: item.title,
      desc: item.description,
    }));
  } catch {
    loadError.value = '产品信息暂时无法更新，当前显示内置示例';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert" class="site-container">{{ loadError }}</p>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">产品功能</h1>
      <p class="site-hero-desc">
        {{ productSlogan }}
      </p>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">核心功能</h2>
          <p class="site-section-desc">
            覆盖企业级应用开发的方方面面，开箱即用
          </p>
        </div>
        <div class="site-grid" style="--site-grid-cols: 4">
          <article
            v-for="(f, i) in shownFeatures"
            :key="f.title"
            v-reveal="(i % 4) * 90"
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
          <h2 class="site-section-title">使用场景</h2>
          <p class="site-section-desc">
            无论你的业务形态如何，Fast Vue3 都能为你提供最佳实践
          </p>
        </div>
        <div class="site-grid" style="--site-grid-cols: 2">
          <article
            v-for="(c, i) in useCases"
            :key="c.title"
            v-reveal="(i % 2) * 120"
            class="site-card case-card"
          >
            <div class="case-icon">{{ c.icon }}</div>
            <div>
              <h3 class="case-title">{{ c.title }}</h3>
              <p class="case-desc">{{ c.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="page-cta">
      <div class="page-cta-inner" v-reveal:zoom>
        <h2 class="page-cta-title">立即体验</h2>
        <p class="page-cta-desc">只需一条命令，即可启动完整后台管理系统</p>
        <div class="site-btn-row" style="margin-top: 24px">
          <Button
            label="查看方案"
            class="cta-btn-primary"
            @click="$router.push('/pricing')"
          />
          <Button label="GitHub" variant="outlined" class="cta-btn-ghost" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.feature-card {
  height: 100%;
  text-align: center;
}

.feature-icon {
  margin-bottom: 12px;
  font-size: 2.2rem;
}

.feature-title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.feature-desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--site-text-3);
}

.case-card {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  height: 100%;
}

.case-icon {
  flex: none;
  font-size: 2.5rem;
}

.case-title {
  margin: 0 0 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.case-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

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
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.page-cta-desc {
  margin: 0;
  font-size: 1.1rem;
  color: rgb(255 255 255 / 82%);
}

.cta-btn-primary {
  height: 46px !important;
  padding: 0 28px !important;
  font-weight: 600;
  color: var(--site-brand) !important;
  background: #fff !important;
  border-color: #fff !important;
  border-radius: var(--site-radius-sm) !important;
}

.cta-btn-primary:hover {
  color: var(--site-accent) !important;
}

.cta-btn-ghost {
  height: 46px !important;
  padding: 0 28px !important;
  font-weight: 600;
  color: #fff !important;
  border-color: rgb(255 255 255 / 70%) !important;
  border-radius: var(--site-radius-sm) !important;
}

.cta-btn-ghost:hover {
  color: #fff !important;
  border-color: #fff !important;
}
</style>
