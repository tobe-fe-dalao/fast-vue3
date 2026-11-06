<script setup lang="ts">
import { api } from '@/api';
import { IxTag } from '@idux/components/tag';

const projectInfo = [
  { label: '项目名称', value: '@fast-vue3/site-idux' },
  { label: '版本', value: '1.0.0' },
  { label: '协议', value: 'MIT' },
  { label: '构建工具', value: 'Vite 8' },
  { label: '包管理', value: 'pnpm 9' },
  { label: 'Monorepo', value: 'Turborepo 2' },
];

const techItems = [
  {
    icon: '💚',
    name: 'Vue 3.5',
    version: '3.5+',
    desc: '渐进式 JavaScript 框架，Composition API',
  },
  {
    icon: '⚡',
    name: 'Vite 8',
    version: '8.x',
    desc: '下一代前端构建工具，极速 HMR',
  },
  {
    icon: '💎',
    name: 'TypeScript',
    version: '6.x',
    desc: '类型安全的 JavaScript 超集',
  },
  {
    icon: '🍍',
    name: 'Pinia',
    version: '3.x',
    desc: 'Vue 官方推荐的状态管理库',
  },
  {
    icon: '🛣️',
    name: 'Vue Router',
    version: '4.x',
    desc: 'Vue.js 官方路由，支持文件路由',
  },
  { icon: '🎨', name: 'Tailwind CSS', version: 'v4', desc: '原子化 CSS 引擎' },
];

const architecture = [
  {
    title: 'apps/',
    icon: '📱',
    items: [
      { name: 'web-antd', desc: 'Ant Design Vue 后台管理应用' },
      { name: 'web-element', desc: 'Element Plus 后台管理应用' },
      { name: 'web-naive', desc: 'Naive UI 后台管理应用' },
      { name: 'site-antd', desc: 'Ant Design Vue 门户站点' },
      { name: 'site-naive', desc: 'Naive UI 门户站点' },
      { name: 'backend-mock', desc: 'Nitro API Mock 服务' },
    ],
  },
  {
    title: 'packages/',
    icon: '📦',
    items: [
      { name: 'styles', desc: '全局样式、主题变量、门户样式系统' },
      { name: 'utils', desc: '通用工具函数与类型定义' },
      { name: 'preferences', desc: '主题与偏好设置' },
    ],
  },
  {
    title: 'internal/',
    icon: '🔧',
    items: [
      { name: 'vite-config', desc: '共享 Vite 配置与插件预设' },
      { name: 'tsconfig', desc: '共享 TypeScript 配置' },
      { name: 'lint-configs', desc: '共享 ESLint / Stylelint 规则集' },
    ],
  },
];
const aboutInfo = ref<Awaited<ReturnType<typeof api.portal.about>> | null>(
  null,
);
const loadError = ref('');

onMounted(async () => {
  try {
    aboutInfo.value = await api.portal.about();
  } catch {
    loadError.value = '关于信息暂时无法更新，当前显示项目信息';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert" class="site-container">{{ loadError }}</p>
  <div>
    <section class="site-hero site-hero--compact">
      <h1 class="site-hero-title">关于 Fast Vue3</h1>
      <p class="site-hero-desc">
        基于 Vue 3 + pnpm Monorepo 的多 UI 框架工程平台， 集成 7
        大主流组件库，支持后台管理 + 门户站点双模式
      </p>
    </section>
    <section class="site-section">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">项目信息</h2>
        </div>
        <div v-reveal class="site-card info-card">
          <div class="info-grid">
            <div
              v-for="item in projectInfo"
              :key="item.label"
              class="info-item"
            >
              <div class="info-label">{{ item.label }}</div>
              <div class="info-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="site-section site-section--alt">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">技术栈</h2>
          <p class="site-section-desc">
            Fast Vue3 采用业界领先的技术方案，为开发者提供极致体验
          </p>
        </div>
        <div class="site-grid">
          <div
            v-for="(t, i) in techItems"
            :key="t.name"
            v-reveal="(i % 3) * 100"
            class="site-card site-card--hoverable tech-card"
          >
            <div class="tech-icon">{{ t.icon }}</div>
            <div class="tech-header">
              <span class="tech-name">{{ t.name }}</span
              ><IxTag color="blue" style="margin-left: 8px">
                {{ t.version }}
              </IxTag>
            </div>
            <p class="tech-desc">{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="site-section">
      <div class="site-container">
        <div class="site-section-head" v-reveal>
          <h2 class="site-section-title">项目架构</h2>
          <p class="site-section-desc">
            基于 pnpm Workspace + Turborepo 的 Monorepo
            架构，统一管理多个应用与共享包
          </p>
        </div>
        <div class="site-grid">
          <div
            v-for="(group, i) in architecture"
            :key="group.title"
            v-reveal="i * 120"
            class="site-card arch-card"
          >
            <div class="arch-header">
              <span class="arch-icon">{{ group.icon }}</span
              ><span class="arch-title">{{ group.title }}</span>
            </div>
            <div v-for="item in group.items" :key="item.name" class="arch-item">
              <div class="arch-item-name">{{ item.name }}</div>
              <div class="arch-item-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="aboutInfo" class="site-section site-section--alt">
      <div class="site-container">
        <div class="site-section-head">
          <h2 class="site-section-title">关于我们</h2>
          <p class="site-section-desc">{{ aboutInfo.intro }}</p>
        </div>
        <div class="site-grid">
          <div
            v-for="item in aboutInfo.stats"
            :key="item.label"
            class="site-card"
            style="padding: 24px"
          >
            <strong>{{ item.value }}</strong>
            <p>{{ item.label }}</p>
          </div>
        </div>
        <div class="site-grid" style="margin-top: 24px">
          <div
            v-for="person in aboutInfo.team"
            :key="person.name"
            class="site-card"
            style="padding: 24px"
          >
            <strong>{{ person.name }}</strong>
            <p>{{ person.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.info-card {
  padding: 8px 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 8px;
  border-bottom: 1px solid var(--site-border);
}

.info-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.info-label {
  flex: none;
  width: 96px;
  font-size: 0.92rem;
  color: var(--site-text-3);
}

.info-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.tech-card {
  height: 100%;
  text-align: center;
}

.tech-icon {
  margin-bottom: 12px;
  font-size: 2.2rem;
}

.tech-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.tech-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.tech-desc {
  margin: 8px 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--site-text-3);
}

.arch-card {
  height: 100%;
}

.arch-header {
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--site-border);
}

.arch-icon {
  font-size: 1.5rem;
}

.arch-title {
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.arch-item {
  padding: 8px 0;
}

.arch-item-name {
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--site-brand);
}

.arch-item-desc {
  margin-top: 2px;
  font-size: 0.8rem;
  color: var(--site-text-3);
}
</style>
