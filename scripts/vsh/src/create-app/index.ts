import type { CAC } from 'cac';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { colors, consola, findMonorepoRoot } from '@fast-vue3/node-utils';

import { cancel, isCancel, select, text } from '@clack/prompts';

type AppMode = 'admin' | 'site';
type UILibrary =
  | 'antd'
  | 'arco'
  | 'element-plus'
  | 'idux'
  | 'naive'
  | 'openvue'
  | 'tdesign';

interface UIConfig {
  cssImport: string;
  /** vite.config application 配置中追加的额外选项(每项一行) */
  extraApplicationOptions?: string;
  /** main.ts 中额外的 import 语句（UI 插件、主题等） */
  mainImports: string;
  /** main.ts 中 app.use(...) 等插件初始化代码 */
  mainSetup: string;
  packageDeps: string;
  resolverConfig: string;
  resolverImport: string;
}

interface RootPackageJson {
  scripts: Record<string, string>;
}

const UI_CONFIGS: Record<UILibrary, UIConfig> = {
  antd: {
    cssImport: "import 'ant-design-vue/dist/reset.css';",
    mainImports: '',
    mainSetup: '',
    packageDeps:
      '"ant-design-vue": "catalog:", "@ant-design/icons-vue": "catalog:"',
    resolverImport:
      "import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';",
    resolverConfig:
      'AntDesignVueResolver({ resolveIcons: true, importStyle: false })',
  },
  arco: {
    cssImport: '',
    mainImports: '',
    mainSetup: '',
    packageDeps: '"@arco-design/web-vue": "catalog:"',
    resolverImport:
      "import { ArcoResolver } from 'unplugin-vue-components/resolvers';",
    resolverConfig: 'ArcoResolver({ sideEffect: true })',
  },
  'element-plus': {
    cssImport: "import 'element-plus/dist/index.css';",
    mainImports: '',
    mainSetup: '',
    packageDeps:
      '"element-plus": "catalog:", "@element-plus/icons-vue": "catalog:"',
    resolverImport:
      "import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';",
    resolverConfig: 'ElementPlusResolver()',
  },
  naive: {
    cssImport: '',
    mainImports: '',
    mainSetup: '',
    packageDeps: '"naive-ui": "catalog:"',
    resolverImport:
      "import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';",
    resolverConfig: 'NaiveUiResolver()',
  },
  tdesign: {
    cssImport: '',
    mainImports: '',
    mainSetup: '',
    packageDeps: '"tdesign-vue-next": "catalog:"',
    resolverImport:
      "import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';",
    resolverConfig: "TDesignResolver({ library: 'vue-next' })",
  },
  openvue: {
    cssImport: "import 'primeicons/primeicons.css';",
    extraApplicationOptions: 'uiAutoImportResolvers: [],',
    mainImports: `import Aura from '@openvue/themes/aura';
import PrimeVue from 'openvue/config';
import ConfirmationService from 'openvue/confirmationservice';
import ToastService from 'openvue/toastservice';`,
    mainSetup: `app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark' },
  },
});
app.use(ToastService);
app.use(ConfirmationService);
`,
    packageDeps:
      '"@openvue/auto-import-resolver": "catalog:", "@openvue/themes": "catalog:", "primeicons": "catalog:", "openvue": "catalog:"',
    resolverImport:
      "import { PrimeVueResolver } from '@openvue/auto-import-resolver';",
    resolverConfig: 'PrimeVueResolver()',
  },
  idux: {
    cssImport: "import '@idux/components/default.full.css';",
    mainImports: `import IduxCdk from '@idux/cdk';
import IduxComponents from '@idux/components';`,
    mainSetup: `app.use(IduxCdk);
app.use(IduxComponents);
`,
    packageDeps: '"@idux/cdk": "catalog:", "@idux/components": "catalog:"',
    resolverImport: '',
    resolverConfig: '',
  },
};

function sortScripts(scripts: Record<string, string>): Record<string, string> {
  const sorted: Record<string, string> = {};
  for (const key of Object.keys(scripts).toSorted()) {
    const value = scripts[key];
    if (value !== undefined) sorted[key] = value;
  }
  return sorted;
}

function addRootAppScripts(root: string, name: string) {
  const rootPkgPath = resolve(root, 'package.json');
  const rootPkg = JSON.parse(
    readFileSync(rootPkgPath, 'utf8'),
  ) as RootPackageJson;
  const devKey = `dev:${name}`;
  const buildKey = `build:${name}`;
  const filterFlag = `@fast-vue3/${name}`;

  rootPkg.scripts[devKey] = `pnpm -F ${filterFlag} run dev`;
  rootPkg.scripts[buildKey] = `pnpm -F ${filterFlag} run build`;
  rootPkg.scripts = sortScripts(rootPkg.scripts);

  writeFileSync(rootPkgPath, `${JSON.stringify(rootPkg, null, 2)}\n`);

  return { buildKey, devKey };
}

// ─── package.json ───────────────────────────────────────────────

function generatePackageJson(
  name: string,
  mode: AppMode,
  ui: UILibrary,
): string {
  const isAdmin = mode === 'admin';
  const uiConfig = UI_CONFIGS[ui];

  const baseDeps = `
    "@fast-vue3/styles": "workspace:*",
    "@fast-vue3/preferences": "workspace:*",
    "@vueuse/core": "catalog:",
    "pinia": "catalog:",
    "pinia-plugin-persistedstate": "catalog:",
    ${uiConfig.packageDeps},
    "vue": "catalog:",
    "vue-router": "catalog:"`;

  const adminDeps = isAdmin
    ? `,
    "@fast-vue3/stores": "workspace:*",
    "@fast-vue3/utils": "workspace:*",
    "axios": "catalog:",
    "nprogress": "catalog:"`
    : '';

  return `{
  "name": "@fast-vue3/${name}",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --mode development",
    "build": "vite build --mode production",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "typecheck": "vue-tsc --build"
  },
  "dependencies": {${baseDeps}${adminDeps}
  },
  "devDependencies": {
    "@fast-vue3/vite-config": "workspace:*",
    "@types/node": "catalog:",
    "typescript": "catalog:",
    "unplugin-vue-components": "catalog:",
    "vite": "catalog:",
    "vue-tsc": "catalog:"
  }
}
`;
}

// ─── vite.config.ts ─────────────────────────────────────────────

function generateViteConfig(ui: UILibrary): string {
  const uiConfig = UI_CONFIGS[ui];
  if (!uiConfig.resolverImport) {
    return `import { defineConfig } from '@fast-vue3/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
  };
});
`;
  }

  const extraOptions = uiConfig.extraApplicationOptions
    ? `\n      ${uiConfig.extraApplicationOptions}`
    : '';

  return `import { defineConfig } from '@fast-vue3/vite-config';

${uiConfig.resolverImport}

export default defineConfig(async () => {
  return {
    application: {
      uiResolvers: [${uiConfig.resolverConfig}],${extraOptions}
    },
  };
});
`;
}

// ─── main.ts ────────────────────────────────────────────────────

function generateMainTs(ui: UILibrary): string {
  const uiConfig = UI_CONFIGS[ui];
  const cssLine = uiConfig.cssImport ? `${uiConfig.cssImport}\n` : '';
  const pluginImports = uiConfig.mainImports ? `${uiConfig.mainImports}\n` : '';
  const pluginSetup = uiConfig.mainSetup ? `${uiConfig.mainSetup}` : '';

  return `import '@fast-vue3/styles/reset';
import '@fast-vue3/styles/global';
import '@fast-vue3/styles/themes';
${cssLine}${pluginImports}
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import { router } from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
${pluginSetup}app.use(router);

router.isReady().then(() => app.mount('#app'));
`;
}

// ─── App.vue ────────────────────────────────────────────────────

function generateAppVue(): string {
  return `<template>
  <RouterView />
</template>
`;
}

// ─── router ─────────────────────────────────────────────────────

function generateRouter(mode: AppMode): string {
  if (mode === 'site') {
    return `import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('../views/home/index.vue') },
  { path: '/about', name: 'about', component: () => import('../views/about/index.vue') },
  { path: '/features', name: 'features', component: () => import('../views/features/index.vue') },
  { path: '/blog', name: 'blog', component: () => import('../views/blog/index.vue') },
  { path: '/contact', name: 'contact', component: () => import('../views/contact/index.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
`;
  }

  return `import { createRouter, createWebHistory } from 'vue-router';

import Layout from '../layout/index.vue';

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/login/index.vue') },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: () => import('../views/home/index.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('../views/dashboard/index.vue') },
      { path: 'user', name: 'user', component: () => import('../views/user/index.vue') },
      { path: 'role', name: 'role', component: () => import('../views/role/index.vue') },
      { path: 'settings', name: 'settings', component: () => import('../views/settings/index.vue') },
      { path: 'profile', name: 'profile', component: () => import('../views/profile/index.vue') },
      { path: 'analytics', name: 'analytics', component: () => import('../views/analytics/index.vue') },
      { path: 'about', name: 'about', component: () => import('../views/about/index.vue') },
      { path: 'error/403', name: '403', component: () => import('../views/error/403.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/error/404.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
`;
}

// ─── index.html ─────────────────────────────────────────────────

function generateIndexHtml(name: string): string {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fast Vue3 · ${name}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`;
}

// ─── env ────────────────────────────────────────────────────────

function generateEnvFiles(name: string): Record<string, string> {
  return {
    '.env': `# 应用标识（用于隔离 storage key）
VITE_APP_NAMESPACE=fast-vue3-${name}
`,
    '.env.development': `# 打包路径
VITE_BASE_URL=/

# 端口
VITE_PORT=3001

# API 基础路径
VITE_APP_API_BASEURL=/api/v1

# 开发后端：mock（自动启动 Nitro）或 server（fast-vue3-server）
VITE_DEV_BACKEND=mock

# fast-vue3-server 地址，仅在 VITE_DEV_BACKEND=server 时使用
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080
`,
    '.env.production': `# 打包路径
VITE_BASE_URL=/

# API 基础路径
VITE_APP_API_BASEURL=/api/v1

# 压缩格式
VITE_COMPRESS=gzip,brotli
`,
  };
}

// ─── tsconfig ───────────────────────────────────────────────────

function generateTsConfig(): { main: string; node: string } {
  return {
    main: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@fast-vue3/tsconfig/web-app.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "#/*": ["./types/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "types/**/*.d.ts"]
}
`,
    node: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@fast-vue3/tsconfig/node.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  },
  "include": ["vite.config.ts"]
}
`,
  };
}

// ═══════════════════════════════════════════════════════════════
//  Admin 模式模板
// ═══════════════════════════════════════════════════════════════

function generateAdminLayout(): string {
  return `<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);

const menuItems = [
  { path: '/home', label: '首页', icon: '&#127968;' },
  { path: '/dashboard', label: '仪表盘', icon: '&#128200;' },
  { path: '/analytics', label: '数据分析', icon: '&#128202;' },
  { path: '/user', label: '用户管理', icon: '&#128101;' },
  { path: '/role', label: '角色管理', icon: '&#128272;' },
  { path: '/settings', label: '系统设置', icon: '&#9881;' },
  { path: '/profile', label: '个人中心', icon: '&#128100;' },
  { path: '/about', label: '关于项目', icon: '&#8505;' },
];

const activeMenu = computed(() => route.path);
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar" :class="{ collapsed }">
      <div class="logo">
        <span v-if="!collapsed">Fast Vue3</span>
        <span v-else>FV3</span>
      </div>
      <nav class="menu">
        <div
          v-for="item in menuItems"
          :key="item.path"
          class="menu-item"
          :class="{ active: activeMenu === item.path }"
          @click="router.push(item.path)"
        >
          <span class="menu-icon" v-html="item.icon" />
          <span v-if="!collapsed" class="menu-label">{{ item.label }}</span>
        </div>
      </nav>
    </aside>
    <div class="main-area">
      <header class="header">
        <button class="collapse-btn" @click="collapsed = !collapsed">
          {{ collapsed ? '&#9776;' : '&#10005;' }}
        </button>
        <div class="header-right">
          <button class="header-link" @click="router.push('/')">站点</button>
          <button class="header-link" @click="router.push('/login')">退出</button>
        </div>
      </header>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout { display: flex; height: 100vh; }
.sidebar { width: 220px; background: #001529; color: #fff; display: flex; flex-direction: column; transition: width .2s; flex-shrink: 0; }
.sidebar.collapsed { width: 64px; }
.logo { height: 56px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; border-bottom: 1px solid rgb(255 255 255 / 8%); }
.menu { flex: 1; padding: 8px 0; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: background .2s; color: rgb(255 255 255 / 65%); }
.menu-item:hover { color: #fff; background: rgb(255 255 255 / 8%); }
.menu-item.active { color: #fff; background: #1677ff; border-radius: 0; }
.menu-icon { font-size: 1.1rem; flex-shrink: 0; width: 20px; text-align: center; }
.main-area { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.header { height: 56px; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; box-shadow: 0 1px 4px rgb(0 21 41 / 8%); flex-shrink: 0; }
.collapse-btn { border: none; background: none; font-size: 1.1rem; cursor: pointer; padding: 4px 8px; color: #666; }
.header-right { display: flex; gap: 12px; }
.header-link { border: none; background: none; color: #1677ff; cursor: pointer; font-size: .875rem; padding: 4px 8px; }
.content { flex: 1; overflow-y: auto; background: #f5f6fa; }
</style>
`;
}

function generateAdminHome(): string {
  return `<script setup lang="ts">
const stats = [
  { label: '总用户数', value: '12,480', icon: '&#128101;', color: '#1677ff' },
  { label: '今日访问', value: '3,256', icon: '&#128200;', color: '#52c41a' },
  { label: '活跃应用', value: '5', icon: '&#128230;', color: '#722ed1' },
  { label: '系统正常率', value: '99.9%', icon: '&#9989;', color: '#fa8c16' },
];

const quickLinks = [
  { title: '仪表盘', desc: '查看数据概览与图表', path: '/dashboard' },
  { title: '用户管理', desc: '管理用户账号与权限', path: '/user' },
  { title: '系统设置', desc: '配置系统参数', path: '/settings' },
  { title: '个人中心', desc: '查看和编辑个人信息', path: '/profile' },
];
</script>

<template>
  <div class="page">
    <div class="welcome">
      <h1>欢迎回来  </h1>
      <p>Fast Vue3 管理系统，基于 Vite + Turborepo 的 Monorepo 工程平台</p>
    </div>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-icon" v-html="s.icon" />
        <div>
          <div class="stat-value" :style="{ color: s.color }">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
    <h2 class="section-title">快速导航</h2>
    <div class="links-grid">
      <div
        v-for="link in quickLinks"
        :key="link.path"
        class="link-card"
        @click="$router.push(link.path)"
      >
        <h3>{{ link.title }}</h3>
        <p>{{ link.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.welcome { margin-bottom: 24px; }
.welcome h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin: 0 0 8px; }
.welcome p { color: #6b7280; margin: 0; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px; }
.stat-card { background: #fff; border-radius: 8px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.stat-icon { font-size: 2rem; }
.stat-value { font-size: 1.5rem; font-weight: 700; }
.stat-label { font-size: .85rem; color: #9ca3af; margin-top: 2px; }
.section-title { font-size: 1.1rem; font-weight: 600; color: #111827; margin-bottom: 16px; }
.links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.link-card { background: #fff; border-radius: 8px; padding: 20px; cursor: pointer; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); transition: box-shadow .2s, transform .2s; }
.link-card:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 10%); transform: translateY(-2px); }
.link-card h3 { margin: 0 0 6px; font-size: 1rem; font-weight: 600; color: #1677ff; }
.link-card p { margin: 0; font-size: .85rem; color: #6b7280; }
</style>
`;
}

function generateAdminDashboard(): string {
  return `<script setup lang="ts">
const chartData = [
  { day: 'Mon', pv: 820, uv: 620 },
  { day: 'Tue', pv: 932, uv: 732 },
  { day: 'Wed', pv: 1201, uv: 801 },
  { day: 'Thu', pv: 934, uv: 734 },
  { day: 'Fri', pv: 1290, uv: 1090 },
  { day: 'Sat', pv: 1330, uv: 1130 },
  { day: 'Sun', pv: 1320, uv: 1120 },
];

const maxPv = Math.max(...chartData.map(d => d.pv));

const recentActivity = [
  { user: 'Alice', action: '创建了新项目', time: '2 分钟前' },
  { user: 'Bob', action: '更新了系统设置', time: '15 分钟前' },
  { user: 'Carol', action: '导出了用户报表', time: '1 小时前' },
  { user: 'David', action: '登录了系统', time: '2 小时前' },
  { user: 'Eve', action: '修改了个人资料', time: '3 小时前' },
];
</script>

<template>
  <div class="page">
    <h1 class="page-title">仪表盘</h1>
    <div class="stats-row">
      <div class="mini-stat"><div class="mini-value" style="color:#1677ff">12,480</div><div class="mini-label">总用户</div></div>
      <div class="mini-stat"><div class="mini-value" style="color:#52c41a">3,256</div><div class="mini-label">今日 PV</div></div>
      <div class="mini-stat"><div class="mini-value" style="color:#722ed1">1,120</div><div class="mini-label">今日 UV</div></div>
      <div class="mini-stat"><div class="mini-value" style="color:#fa8c16">68%</div><div class="mini-label">转化率</div></div>
    </div>
    <div class="card">
      <h2 class="card-title">访问趋势（近 7 天）</h2>
      <div class="bar-chart">
        <div v-for="d in chartData" :key="d.day" class="bar-group">
          <div class="bars">
            <div class="bar pv" :style="{ height: (d.pv / maxPv * 100) + '%' }" />
            <div class="bar uv" :style="{ height: (d.uv / maxPv * 100) + '%' }" />
          </div>
          <span class="bar-label">{{ d.day }}</span>
        </div>
      </div>
      <div class="chart-legend">
        <span class="legend-item"><span class="dot pv" /> PV</span>
        <span class="legend-item"><span class="dot uv" /> UV</span>
      </div>
    </div>
    <div class="card">
      <h2 class="card-title">最近动态</h2>
      <div class="activity-list">
        <div v-for="(a, i) in recentActivity" :key="i" class="activity-item">
          <span class="avatar">{{ a.user.charAt(0) }}</span>
          <div class="activity-body">
            <span><strong>{{ a.user }}</strong> {{ a.action }}</span>
            <span class="activity-time">{{ a.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 20px; color: #111827; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.mini-stat { background: #fff; border-radius: 8px; padding: 16px 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.mini-value { font-size: 1.5rem; font-weight: 700; }
.mini-label { font-size: .8rem; color: #9ca3af; margin-top: 4px; }
.card { background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.card-title { font-size: 1rem; font-weight: 600; margin: 0 0 16px; color: #111827; }
.bar-chart { display: flex; align-items: flex-end; gap: 16px; height: 200px; padding: 0 8px; }
.bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
.bars { flex: 1; display: flex; align-items: flex-end; gap: 4px; width: 100%; }
.bar { flex: 1; border-radius: 4px 4px 0 0; min-width: 16px; transition: height .3s; }
.bar.pv { background: #1677ff; }
.bar.uv { background: #91caff; }
.bar-label { font-size: .75rem; color: #9ca3af; margin-top: 8px; }
.chart-legend { display: flex; gap: 16px; justify-content: center; margin-top: 12px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: .8rem; color: #6b7280; }
.dot { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
.dot.pv { background: #1677ff; }
.dot.uv { background: #91caff; }
.activity-list { display: flex; flex-direction: column; }
.activity-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
.activity-item:last-child { border-bottom: none; }
.avatar { width: 32px; height: 32px; border-radius: 50%; background: #1677ff; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: .85rem; flex-shrink: 0; }
.activity-body { flex: 1; display: flex; justify-content: space-between; align-items: center; font-size: .9rem; color: #374151; }
.activity-time { font-size: .8rem; color: #9ca3af; }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
`;
}

function generateAdminUser(): string {
  return `<script setup lang="ts">
import { computed, ref } from 'vue';

const search = ref('');
const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor', status: 'active' },
  { id: 3, name: 'Carol', email: 'carol@example.com', role: 'viewer', status: 'active' },
  { id: 4, name: 'David', email: 'david@example.com', role: 'editor', status: 'inactive' },
  { id: 5, name: 'Eve', email: 'eve@example.com', role: 'viewer', status: 'active' },
  { id: 6, name: 'Frank', email: 'frank@example.com', role: 'admin', status: 'active' },
  { id: 7, name: 'Grace', email: 'grace@example.com', role: 'viewer', status: 'inactive' },
]);

const filteredUsers = computed(() => {
  const q = search.value.toLowerCase();
  if (!q) return users.value;
  return users.value.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
});

const roleLabel: Record<string, string> = { admin: '管理员', editor: '编辑者', viewer: '访客' };
const statusLabel: Record<string, string> = { active: '启用', inactive: '禁用' };
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>用户管理</h1>
      <button class="btn-primary">+ 新增用户</button>
    </div>
    <div class="toolbar">
      <input v-model="search" class="search-input" placeholder="搜索用户名或邮箱…" />
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>用户名</th><th>邮箱</th><th>角色</th><th>状态</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="u in filteredUsers" :key="u.id">
            <td>{{ u.id }}</td>
            <td><strong>{{ u.name }}</strong></td>
            <td>{{ u.email }}</td>
            <td><span class="badge" :class="'role-' + u.role">{{ roleLabel[u.role] }}</span></td>
            <td><span class="status-dot" :class="u.status" /><span>{{ statusLabel[u.status] }}</span></td>
            <td>
              <button class="link-btn">编辑</button>
              <button class="link-btn danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h1 { font-size: 1.5rem; font-weight: 700; margin: 0; color: #111827; }
.btn-primary { background: #1677ff; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: .875rem; }
.btn-primary:hover { background: #4096ff; }
.toolbar { margin-bottom: 16px; }
.search-input { width: 320px; max-width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: .875rem; outline: none; transition: border-color .2s; }
.search-input:focus { border-color: #1677ff; box-shadow: 0 0 0 2px rgb(22 119 255 / 10%); }
.table-wrap { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 16px; text-align: left; font-size: .875rem; border-bottom: 1px solid #f3f4f6; }
th { background: #fafafa; font-weight: 600; color: #6b7280; }
.badge { padding: 2px 8px; border-radius: 4px; font-size: .75rem; font-weight: 600; }
.role-admin { background: #e6f4ff; color: #1677ff; }
.role-editor { background: #f6ffed; color: #52c41a; }
.role-viewer { background: #f5f5f5; color: #8c8c8c; }
.status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; }
.status-dot.active { background: #52c41a; }
.status-dot.inactive { background: #d9d9d9; }
.link-btn { background: none; border: none; color: #1677ff; cursor: pointer; font-size: .8rem; padding: 0; margin-right: 12px; }
.link-btn.danger { color: #ff4d4f; }
</style>
`;
}

function generateAdminSettings(): string {
  return `<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({
  siteName: 'Fast Vue3',
  icp: '',
  logoText: 'FV3',
  pageSize: 20,
  language: 'zh-CN',
  enableRegister: true,
  enableWatermark: false,
  enableDarkMode: true,
});

const saved = ref(false);
function handleSave() { saved.value = true; setTimeout(() => saved.value = false, 2000); }
</script>

<template>
  <div class="page">
    <h1 class="page-title">系统设置</h1>
    <div class="card">
      <h2 class="card-title">基础设置</h2>
      <div class="form-group"><label>站点名称</label><input v-model="form.siteName" /></div>
      <div class="form-group"><label>ICP 备案号</label><input v-model="form.icp" placeholder="选填" /></div>
      <div class="form-group"><label>Logo 文字</label><input v-model="form.logoText" /></div>
    </div>
    <div class="card">
      <h2 class="card-title">功能开关</h2>
      <div class="form-group toggle"><label>开放注册</label><input type="checkbox" v-model="form.enableRegister" /></div>
      <div class="form-group toggle"><label>全局水印</label><input type="checkbox" v-model="form.enableWatermark" /></div>
      <div class="form-group toggle"><label>暗黑模式</label><input type="checkbox" v-model="form.enableDarkMode" /></div>
    </div>
    <div class="card">
      <h2 class="card-title">偏好设置</h2>
      <div class="form-group">
        <label>默认分页</label>
        <select v-model="form.pageSize">
          <option :value="10">10 条/页</option>
          <option :value="20">20 条/页</option>
          <option :value="50">50 条/页</option>
        </select>
      </div>
      <div class="form-group">
        <label>系统语言</label>
        <select v-model="form.language">
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
    <div class="actions">
      <button class="btn-primary" @click="handleSave">保存设置</button>
      <span v-if="saved" class="saved-tip">&#10003; 已保存</span>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; max-width: 720px; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 20px; color: #111827; }
.card { background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.card-title { font-size: 1rem; font-weight: 600; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; color: #111827; }
.form-group { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; }
.form-group label { font-size: .9rem; color: #374151; }
.form-group input[type="text"], .form-group input:not([type]) { width: 280px; padding: 6px 10px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: .875rem; outline: none; }
.form-group input:focus { border-color: #1677ff; }
.form-group select { padding: 6px 10px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: .875rem; outline: none; }
.form-group.toggle { cursor: pointer; }
.form-group input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; }
.actions { display: flex; align-items: center; gap: 12px; }
.btn-primary { background: #1677ff; color: #fff; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-size: .9rem; }
.btn-primary:hover { background: #4096ff; }
.saved-tip { color: #52c41a; font-size: .875rem; }
</style>
`;
}

function generateAdminProfile(): string {
  return `<script setup lang="ts">
import { reactive, ref } from 'vue';

const editMode = ref(false);
const user = reactive({ name: 'Admin', email: 'admin@fast-vue3.com', role: '管理员', phone: '138****8888', bio: '专注于前端工程化与 Monorepo 架构' });

const logs = [
  { action: '登录系统', ip: '192.168.1.100', time: '2025-01-15 09:30' },
  { action: '修改密码', ip: '192.168.1.100', time: '2025-01-14 16:20' },
  { action: '导出报表', ip: '10.0.0.55', time: '2025-01-13 11:05' },
  { action: '登录系统', ip: '10.0.0.55', time: '2025-01-12 08:45' },
];

function toggleEdit() { editMode.value = !editMode.value; }
</script>

<template>
  <div class="page">
    <h1 class="page-title">个人中心</h1>
    <div class="top-row">
      <div class="card profile-card">
        <div class="avatar">{{ user.name.charAt(0) }}</div>
        <h2>{{ user.name }}</h2>
        <span class="role-badge">{{ user.role }}</span>
        <div class="profile-meta">
          <div>&#128231; {{ user.email }}</div>
          <div>&#128241; {{ user.phone }}</div>
        </div>
        <button class="btn-outline" @click="toggleEdit">{{ editMode ? '取消' : '编辑资料' }}</button>
      </div>
      <div class="card info-card">
        <h2 class="card-title">个人信息</h2>
        <template v-if="!editMode">
          <div class="info-row"><span class="info-label">用户名</span><span>{{ user.name }}</span></div>
          <div class="info-row"><span class="info-label">邮箱</span><span>{{ user.email }}</span></div>
          <div class="info-row"><span class="info-label">手机</span><span>{{ user.phone }}</span></div>
          <div class="info-row"><span class="info-label">角色</span><span>{{ user.role }}</span></div>
          <div class="info-row"><span class="info-label">简介</span><span>{{ user.bio }}</span></div>
        </template>
        <template v-else>
          <div class="info-row"><span class="info-label">用户名</span><input v-model="user.name" /></div>
          <div class="info-row"><span class="info-label">邮箱</span><input v-model="user.email" /></div>
          <div class="info-row"><span class="info-label">手机</span><input v-model="user.phone" /></div>
          <div class="info-row"><span class="info-label">简介</span><input v-model="user.bio" /></div>
          <button class="btn-primary" @click="editMode = false" style="margin-top:12px">保存</button>
        </template>
      </div>
    </div>
    <div class="card">
      <h2 class="card-title">登录日志</h2>
      <table>
        <thead><tr><th>操作</th><th>IP</th><th>时间</th></tr></thead>
        <tbody>
          <tr v-for="(l, i) in logs" :key="i"><td>{{ l.action }}</td><td>{{ l.ip }}</td><td>{{ l.time }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 20px; color: #111827; }
.top-row { display: grid; grid-template-columns: 280px 1fr; gap: 20px; margin-bottom: 24px; }
.card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.card-title { font-size: 1rem; font-weight: 600; margin: 0 0 16px; color: #111827; }
.profile-card { text-align: center; }
.avatar { width: 72px; height: 72px; border-radius: 50%; background: #1677ff; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto 12px; }
.profile-card h2 { margin: 0 0 6px; font-size: 1.2rem; }
.role-badge { display: inline-block; padding: 2px 12px; background: #e6f4ff; color: #1677ff; border-radius: 12px; font-size: .75rem; font-weight: 600; }
.profile-meta { margin: 16px 0; font-size: .85rem; color: #6b7280; display: flex; flex-direction: column; gap: 6px; }
.btn-outline { background: none; border: 1px solid #d9d9d9; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: .85rem; color: #374151; }
.btn-outline:hover { border-color: #1677ff; color: #1677ff; }
.btn-primary { background: #1677ff; color: #fff; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-size: .875rem; }
.info-row { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
.info-row:last-of-type { border-bottom: none; }
.info-label { width: 60px; font-size: .85rem; color: #9ca3af; flex-shrink: 0; }
.info-row input { flex: 1; padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: .875rem; outline: none; margin-left: 12px; }
.info-row input:focus { border-color: #1677ff; }
.info-row span:last-child, .info-row span:first-child + span { margin-left: 12px; font-size: .9rem; color: #374151; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 10px 12px; text-align: left; font-size: .875rem; border-bottom: 1px solid #f3f4f6; }
th { font-weight: 600; color: #6b7280; }

@media (max-width: 768px) {
  .top-row { grid-template-columns: 1fr; }
}
</style>
`;
}

function generateAdminLogin(): string {
  return `<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const form = reactive({ username: 'admin', password: '123456' });

async function onLogin() {
  if (!form.username || !form.password) return;
  loading.value = true;
  setTimeout(() => { loading.value = false; router.push('/'); }, 600);
}
</script>

<template>
  <div class="login-wrap">
    <div class="brand">
      <div class="brand-inner">
        <div class="brand-logo">&#9889;</div>
        <h1>Fast Vue3</h1>
        <p>多 UI 框架 · Monorepo 工程模板</p>
        <ul>
          <li>&#10022; Vue 3.5 + TypeScript</li>
          <li>&#10022; Vite + Turborepo</li>
          <li>&#10022; Pinia + UnoCSS</li>
          <li>&#10022; 7 套 UI 框架</li>
        </ul>
      </div>
    </div>
    <div class="panel">
      <div class="card">
        <h2>欢迎回来</h2>
        <p class="subtitle">请登录您的账号</p>
        <form @submit.prevent="onLogin">
          <div class="field">
            <label>用户名</label>
            <input v-model="form.username" placeholder="请输入用户名" />
          </div>
          <div class="field">
            <label>密码</label>
            <input v-model="form.password" type="password" placeholder="请输入密码" />
          </div>
          <button type="submit" class="btn-login" :disabled="loading">
            {{ loading ? '登录中…' : '登录' }}
          </button>
        </form>
        <p class="hint">默认账号：admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrap { display: flex; height: 100vh; }
.brand { flex: 0 0 42%; display: flex; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #1677ff, #4096ff, #69b1ff); }
.brand-inner { max-width: 380px; padding: 40px; }
.brand-logo { font-size: 64px; margin-bottom: 16px; }
.brand h1 { font-size: 2.25rem; font-weight: 700; margin: 0 0 8px; }
.brand p { opacity: .85; margin: 0 0 32px; }
.brand ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: .9rem; opacity: .9; }
.panel { flex: 1; display: flex; align-items: center; justify-content: center; background: #f5f7fa; }
.card { width: 400px; padding: 48px 40px; background: #fff; border-radius: 16px; box-shadow: 0 8px 40px rgb(0 0 0 / 8%); }
.card h2 { margin: 0 0 6px; font-size: 1.5rem; font-weight: 700; color: #1a1a2e; }
.subtitle { margin: 0 0 28px; color: #8c8c8c; font-size: .9rem; }
.field { margin-bottom: 20px; }
.field label { display: block; font-size: .85rem; font-weight: 500; color: #374151; margin-bottom: 6px; }
.field input { width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 8px; font-size: .9rem; outline: none; box-sizing: border-box; transition: border-color .2s; }
.field input:focus { border-color: #1677ff; box-shadow: 0 0 0 3px rgb(22 119 255 / 10%); }
.btn-login { width: 100%; padding: 12px; background: #1677ff; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background .2s; }
.btn-login:hover { background: #4096ff; }
.btn-login:disabled { opacity: .6; cursor: not-allowed; }
.hint { text-align: center; margin-top: 20px; font-size: .8rem; color: #bfbfbf; }

@media (max-width: 768px) {
  .brand { display: none; }
  .panel { background: linear-gradient(135deg, #1677ff, #69b1ff); }
}
</style>
`;
}

function generateAdmin403(): string {
  return `<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="error-page">
    <h1>403</h1>
    <p>抱歉，您没有权限访问该页面</p>
    <div class="actions">
      <button class="btn-primary" @click="router.push('/home')">返回首页</button>
      <button class="btn-outline" @click="router.back()">返回上页</button>
    </div>
  </div>
</template>

<style scoped>
.error-page { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; gap: 16px; background: #f5f6fa; }
.error-page h1 { font-size: 6rem; font-weight: 700; color: #d9d9d9; margin: 0; }
.error-page p { font-size: 1.1rem; color: #8c8c8c; margin: 0; }
.actions { display: flex; gap: 12px; margin-top: 8px; }
.btn-primary { padding: 8px 24px; background: #1677ff; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; }
.btn-outline { padding: 8px 24px; background: none; border: 1px solid #d9d9d9; border-radius: 6px; cursor: pointer; font-size: .9rem; color: #374151; }
</style>
`;
}

function generateAdmin404(): string {
  return `<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="error-page">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <button class="btn-primary" @click="router.push('/home')">返回首页</button>
  </div>
</template>

<style scoped>
.error-page { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; gap: 16px; background: #f5f6fa; }
.error-page h1 { font-size: 6rem; font-weight: 700; color: #d9d9d9; margin: 0; }
.error-page p { font-size: 1.1rem; color: #8c8c8c; margin: 0; }
.btn-primary { padding: 8px 24px; background: #1677ff; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: .9rem; }
</style>
`;
}

function generateAdminRole(): string {
  return `<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const search = ref('');
const showModal = ref(false);
const editingId = ref<number | null>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const roles = ref([
  { id: 1, name: '超级管理员', code: 'R_SUPER', description: '拥有所有权限', status: true },
  { id: 2, name: '管理员', code: 'R_ADMIN', description: '拥有管理权限', status: true },
  { id: 3, name: '编辑者', code: 'R_EDITOR', description: '可编辑内容', status: true },
  { id: 4, name: '访客', code: 'R_VIEWER', description: '只读权限', status: true },
  { id: 5, name: '测试角色', code: 'R_TEST', description: '测试用途', status: false },
]);

const filteredRoles = computed(() => {
  const q = search.value.toLowerCase();
  if (!q) return roles.value;
  return roles.value.filter(r => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q));
});

function openModal(record?: typeof roles.value[0]) {
  if (record) {
    editingId.value = record.id;
    form.name = record.name;
    form.code = record.code;
    form.description = record.description;
    form.status = record.status;
  } else {
    editingId.value = null;
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  showModal.value = true;
}

function handleSave() {
  if (editingId.value) {
    const r = roles.value.find(r => r.id === editingId.value);
    if (r) Object.assign(r, { ...form });
  } else {
    const id = Math.max(...roles.value.map(r => r.id)) + 1;
    roles.value.push({ id, ...form });
  }
  showModal.value = false;
}

function handleDelete(id: number) {
  roles.value = roles.value.filter(r => r.id !== id);
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>角色管理</h1>
      <button class="btn-primary" @click="openModal()">+ 新增角色</button>
    </div>
    <div class="toolbar">
      <input v-model="search" class="search-input" placeholder="搜索角色名称或编码…" />
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>角色名称</th><th>角色编码</th><th>描述</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          <tr v-for="r in filteredRoles" :key="r.id">
            <td>{{ r.id }}</td>
            <td><strong>{{ r.name }}</strong></td>
            <td><code>{{ r.code }}</code></td>
            <td>{{ r.description }}</td>
            <td><span class="status-dot" :class="r.status ? 'active' : 'inactive'" /><span>{{ r.status ? '启用' : '禁用' }}</span></td>
            <td>
              <button class="link-btn" @click="openModal(r)">编辑</button>
              <button class="link-btn danger" @click="handleDelete(r.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <h2>{{ editingId ? '编辑角色' : '新增角色' }}</h2>
        <div class="form-group"><label>角色名称</label><input v-model="form.name" /></div>
        <div class="form-group"><label>角色编码</label><input v-model="form.code" /></div>
        <div class="form-group"><label>描述</label><input v-model="form.description" /></div>
        <div class="form-group toggle"><label>状态</label><input type="checkbox" v-model="form.status" /></div>
        <div class="modal-actions">
          <button class="btn-outline" @click="showModal = false">取消</button>
          <button class="btn-primary" @click="handleSave">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h1 { font-size: 1.5rem; font-weight: 700; margin: 0; color: #111827; }
.btn-primary { background: #1677ff; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: .875rem; }
.btn-outline { background: none; border: 1px solid #d9d9d9; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.toolbar { margin-bottom: 16px; }
.search-input { width: 320px; max-width: 100%; padding: 8px 12px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: .875rem; outline: none; }
.search-input:focus { border-color: #1677ff; }
.table-wrap { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 16px; text-align: left; font-size: .875rem; border-bottom: 1px solid #f3f4f6; }
th { background: #fafafa; font-weight: 600; color: #6b7280; }
code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: .8rem; }
.status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; }
.status-dot.active { background: #52c41a; }
.status-dot.inactive { background: #d9d9d9; }
.link-btn { background: none; border: none; color: #1677ff; cursor: pointer; font-size: .8rem; margin-right: 12px; }
.link-btn.danger { color: #ff4d4f; }
.modal-overlay { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: #fff; border-radius: 12px; padding: 28px; width: 440px; box-shadow: 0 12px 40px rgb(0 0 0 / 15%); }
.modal h2 { margin: 0 0 20px; font-size: 1.2rem; }
.form-group { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.form-group label { font-size: .9rem; color: #374151; }
.form-group input:not([type="checkbox"]) { width: 260px; padding: 6px 10px; border: 1px solid #d9d9d9; border-radius: 6px; font-size: .875rem; outline: none; }
.form-group input:focus:not([type="checkbox"]) { border-color: #1677ff; }
.form-group.toggle { cursor: pointer; }
.form-group input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
</style>
`;
}

function generateAdminAnalytics(): string {
  return `<script setup lang="ts">
const stats = [
  { label: '总访问量', value: '84,260', suffix: '次', color: '#1677ff' },
  { label: '总用户数', value: '12,480', suffix: '人', color: '#52c41a' },
  { label: '总营收', value: '1,026,800', suffix: '元', color: '#722ed1' },
  { label: '系统正常率', value: '99.9', suffix: '%', color: '#fa8c16' },
];

const trendData = [
  { date: '05-18', visits: 12300, users: 1200, orders: 320, revenue: 89600 },
  { date: '05-19', visits: 11800, users: 1100, orders: 290, revenue: 81200 },
  { date: '05-20', visits: 13500, users: 1350, orders: 380, revenue: 106400 },
  { date: '05-21', visits: 14200, users: 1420, orders: 410, revenue: 114800 },
  { date: '05-22', visits: 12900, users: 1280, orders: 350, revenue: 98000 },
  { date: '05-23', visits: 15100, users: 1510, orders: 450, revenue: 126000 },
  { date: '05-24', visits: 14460, users: 1460, orders: 420, revenue: 117600 },
];

const topPages = [
  { page: '/home', title: '首页', visits: 32100 },
  { page: '/dashboard', title: '仪表盘', visits: 18400 },
  { page: '/user', title: '用户管理', visits: 12800 },
  { page: '/settings', title: '系统设置', visits: 8600 },
  { page: '/role', title: '角色管理', visits: 6300 },
];

const maxVisits = Math.max(...trendData.map(d => d.visits));
</script>

<template>
  <div class="page">
    <h1 class="page-title">数据分析</h1>
    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value" :style="{ color: s.color }">{{ s.value }} <span class="stat-suffix">{{ s.suffix }}</span></div>
      </div>
    </div>
    <div class="content-row">
      <div class="card trend-card">
        <h2 class="card-title">近 7 天趋势</h2>
        <div class="mini-chart">
          <div v-for="d in trendData" :key="d.date" class="chart-bar-group">
            <div class="chart-bar" :style="{ height: (d.visits / maxVisits * 100) + '%' }" />
            <span class="chart-label">{{ d.date }}</span>
          </div>
        </div>
        <div class="trend-table">
          <table>
            <thead><tr><th>日期</th><th>访问量</th><th>新增用户</th><th>订单数</th><th>营收</th></tr></thead>
            <tbody>
              <tr v-for="d in trendData" :key="d.date">
                <td>{{ d.date }}</td><td>{{ d.visits.toLocaleString() }}</td><td>{{ d.users }}</td><td>{{ d.orders }}</td><td>{{ d.revenue.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <h2 class="card-title">热门页面</h2>
        <div class="rank-list">
          <div v-for="(p, i) in topPages" :key="p.page" class="rank-item">
            <span class="rank-num" :class="{ top: i < 3 }">{{ i + 1 }}</span>
            <span class="rank-title">{{ p.title }}</span>
            <span class="rank-path">{{ p.page }}</span>
            <span class="rank-visits">{{ p.visits.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 20px; color: #111827; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.stat-label { font-size: .85rem; color: #9ca3af; margin-bottom: 8px; }
.stat-value { font-size: 1.75rem; font-weight: 700; }
.stat-suffix { font-size: .875rem; font-weight: 400; color: #9ca3af; }
.content-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.card-title { font-size: 1rem; font-weight: 600; margin: 0 0 16px; color: #111827; }
.mini-chart { display: flex; align-items: flex-end; gap: 12px; height: 120px; margin-bottom: 20px; padding: 0 4px; }
.chart-bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
.chart-bar { flex: 1; width: 100%; background: linear-gradient(180deg, #1677ff, #69b1ff); border-radius: 4px 4px 0 0; min-width: 20px; }
.chart-label { font-size: .7rem; color: #9ca3af; margin-top: 6px; }
.trend-table table { width: 100%; border-collapse: collapse; }
.trend-table th, .trend-table td { padding: 8px 12px; text-align: left; font-size: .8rem; border-bottom: 1px solid #f3f4f6; }
.trend-table th { font-weight: 600; color: #6b7280; }
.rank-list { display: flex; flex-direction: column; }
.rank-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
.rank-item:last-child { border-bottom: none; }
.rank-num { width: 24px; height: 24px; border-radius: 50%; background: #f3f4f6; color: #6b7280; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 600; flex-shrink: 0; }
.rank-num.top { background: #1677ff; color: #fff; }
.rank-title { font-weight: 500; font-size: .9rem; color: #111827; }
.rank-path { font-size: .75rem; color: #9ca3af; margin-left: auto; }
.rank-visits { font-size: .8rem; color: #6b7280; font-weight: 500; }

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .content-row { grid-template-columns: 1fr; }
}
</style>
`;
}

function generateAdminAbout(): string {
  return `<script setup lang="ts">
const info = [
  { label: '项目名称', value: 'Fast Vue3' },
  { label: '版本', value: '1.0.0' },
  { label: '许可证', value: 'MIT' },
  { label: '构建时间', value: new Date().toISOString().slice(0, 10) },
];

const techStack = [
  { label: '框架', value: 'Vue 3.5 + Composition API' },
  { label: '构建', value: 'Vite 8 + Turborepo 2' },
  { label: '语言', value: 'TypeScript 6' },
  { label: '样式', value: 'UnoCSS + CSS Variables' },
  { label: '状态', value: 'Pinia 3 + Persistedstate' },
  { label: '路由', value: 'Vue Router 4 + File Routes' },
];
</script>

<template>
  <div class="page">
    <h1 class="page-title">关于项目</h1>
    <div class="card">
      <h2 class="card-title">项目信息</h2>
      <div class="info-grid">
        <div v-for="item in info" :key="item.label" class="info-item">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="card-title">技术栈</h2>
      <div class="info-grid">
        <div v-for="item in techStack" :key="item.label" class="info-item">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="card-title">简介</h2>
      <p class="about-text">Fast Vue3 是一个基于 Vue 3 + pnpm Monorepo 的多 UI 框架工程平台。同时集成 7 大主流 Admin UI 框架，支持后台管理和纯页面两种开发模式，专注工程架构与长期可维护性。</p>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; max-width: 800px; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 20px; color: #111827; }
.card { background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgb(0 0 0 / 6%); }
.card-title { font-size: 1rem; font-weight: 600; margin: 0 0 16px; padding-bottom: 12px; border-bottom: 1px solid #f3f4f6; color: #111827; }
.info-grid { display: flex; flex-direction: column; }
.info-item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f9fafb; }
.info-item:last-child { border-bottom: none; }
.info-label { width: 80px; font-size: .85rem; color: #9ca3af; flex-shrink: 0; }
.info-value { font-weight: 500; color: #374151; font-size: .9rem; }
.about-text { color: #6b7280; line-height: 1.8; margin: 0; font-size: .9rem; }
</style>
`;
}

// ═══════════════════════════════════════════════════════════════
//  Site 模式模板
// ═══════════════════════════════════════════════════════════════

function generateSiteHome(): string {
  return `<script setup lang="ts">
const features = [
  { icon: '&#9889;', title: 'Vite + Turborepo', desc: '极速构建，monorepo 工程体系' },
  { icon: '&#127912;', title: '7 大 UI 框架', desc: 'Antd / Element / Naive / Arco / TDesign / OpenVue / iDux' },
  { icon: '&#127769;', title: '深色/亮色双主题', desc: '基于 CSS Variables，一键切换' },
  { icon: '&#128241;', title: '响应式布局', desc: '完美适配桌面端和移动端' },
  { icon: '&#128295;', title: 'TypeScript', desc: '完整类型安全，开箱即用' },
  { icon: '&#128230;', title: '自动按需导入', desc: 'unplugin-auto-import + Components' },
];
</script>

<template>
  <div>
    <section class="hero">
      <h1>Fast Vue3</h1>
      <p>基于 Vite + Turborepo 的多 UI 框架 Monorepo 模板</p>
      <div class="hero-actions">
        <RouterLink to="/features" class="btn-white">了解更多</RouterLink>
        <RouterLink to="/contact" class="btn-outline-white">联系我们</RouterLink>
      </div>
    </section>
    <section class="features">
      <h2>核心特性</h2>
      <div class="grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <span class="feature-icon" v-html="f.icon" />
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
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
.hero { text-align: center; padding: 120px 20px 100px; background: linear-gradient(135deg, #1677ff, #722ed1); color: #fff; }
.hero h1 { font-size: 3.5rem; margin: 0 0 16px; font-weight: 800; }
.hero p { font-size: 1.25rem; opacity: .85; margin: 0 0 40px; }
.hero-actions { display: flex; gap: 16px; justify-content: center; }
.btn-white { padding: 12px 32px; background: #fff; color: #1677ff; border-radius: 8px; font-weight: 600; text-decoration: none; transition: transform .2s; }
.btn-white:hover { transform: translateY(-2px); }
.btn-outline-white { padding: 12px 32px; background: transparent; color: #fff; border: 2px solid rgb(255 255 255 / 50%); border-radius: 8px; font-weight: 600; text-decoration: none; transition: border-color .2s; }
.btn-outline-white:hover { border-color: #fff; }
.features { padding: 80px 20px; max-width: 1100px; margin: 0 auto; text-align: center; }
.features h2 { font-size: 2rem; margin: 0 0 48px; color: #111827; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.feature-card { padding: 32px 24px; border-radius: 12px; background: #f9fafb; text-align: left; transition: box-shadow .2s, transform .2s; }
.feature-card:hover { box-shadow: 0 8px 24px rgb(0 0 0 / 8%); transform: translateY(-4px); }
.feature-icon { font-size: 2rem; display: block; margin-bottom: 12px; }
.feature-card h3 { margin: 0 0 8px; font-size: 1.1rem; font-weight: 600; color: #111827; }
.feature-card p { margin: 0; color: #6b7280; line-height: 1.6; }
.cta { text-align: center; padding: 80px 20px; background: #f9fafb; }
.cta h2 { font-size: 2rem; margin: 0 0 12px; color: #111827; }
.cta p { color: #6b7280; margin: 0 0 24px; }
.cta code { display: inline-block; padding: 12px 24px; background: #111827; color: #52c41a; border-radius: 8px; font-size: 1rem; font-family: monospace; }
</style>
`;
}

function generateSiteAbout(): string {
  return `<script setup lang="ts">
const techItems = [
  { label: 'Vue', value: 'Vue 3.5 + Composition API' },
  { label: 'Build', value: 'Vite + Turborepo' },
  { label: 'Language', value: 'TypeScript' },
  { label: 'Style', value: 'UnoCSS + CSS Variables' },
  { label: 'State', value: 'Pinia + Persistedstate' },
  { label: 'Router', value: 'Vue Router + File Routes' },
];
</script>

<template>
  <div class="about-page">
    <h1>关于项目</h1>
    <p class="desc">Fast Vue3 是一个基于 Vite + Turborepo 的多 UI 框架 Monorepo 模板项目，旨在为开发者提供开箱即用的前端工程化解决方案。同时集成 7 大主流 Admin UI 框架，支持后台管理和纯页面两种开发模式。</p>
    <h2>技术栈</h2>
    <div class="grid">
      <div v-for="item in techItems" :key="item.label" class="card">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>
    <div class="nav-links">
      <RouterLink to="/">&#8592; 返回首页</RouterLink>
      <RouterLink to="/features">查看特性 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.about-page { max-width: 800px; margin: 0 auto; padding: 80px 20px; }
.about-page h1 { font-size: 2.5rem; margin: 0 0 20px; color: #111827; }
.desc { color: #6b7280; font-size: 1.1rem; margin: 0 0 48px; line-height: 1.8; }
.about-page h2 { font-size: 1.5rem; margin: 0 0 24px; color: #111827; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px; }
.card { padding: 20px; border-radius: 8px; background: #f9fafb; transition: box-shadow .2s; }
.card:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 8%); }
.label { font-size: .8rem; color: #9ca3af; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; }
.value { font-weight: 600; color: #111827; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: #1677ff; text-decoration: none; font-weight: 500; }
.nav-links a:hover { text-decoration: underline; }
</style>
`;
}

function generateSiteFeatures(): string {
  return `<script setup lang="ts">
const features = [
  { title: '多 UI 框架集成', desc: '内置 7 大 UI 框架支持，Ant Design Vue、Element Plus、Naive UI、Arco Design、TDesign、OpenVue、iDux，通过 create-app 命令一键选择。', icon: '&#127912;' },
  { title: 'Monorepo 工程体系', desc: '基于 pnpm workspace + Turborepo，统一管理 packages、apps、internal 工具链，依赖复用、增量构建、并行编译。', icon: '&#128230;' },
  { title: 'TypeScript 全覆盖', desc: '从 tsconfig 统一继承、vue-tsc 类型检查到 auto-import 类型声明，全链路类型安全。', icon: '&#128295;' },
  { title: '自动按需导入', desc: 'unplugin-auto-import 自动导入 Vue/Router/Pinia API，unplugin-vue-components 自动注册 UI 组件，零手动 import。', icon: '&#9889;' },
  { title: '主题与样式', desc: '基于 CSS Variables 的主题系统，支持亮色/暗色模式切换，配合 UnoCSS 原子化框架实现高效样式开发。', icon: '&#127912;' },
  { title: '代码质量保障', desc: 'ESLint + Prettier + Stylelint + Commitlint + Lefthook，提交前自动检查，保证代码风格一致。', icon: '&#128736;' },
];
</script>

<template>
  <div class="features-page">
    <div class="page-header">
      <h1>产品特性</h1>
      <p>Fast Vue3 为现代前端开发提供完整的工程化解决方案</p>
    </div>
    <div class="grid">
      <div v-for="f in features" :key="f.title" class="card">
        <span class="card-icon" v-html="f.icon" />
        <h2>{{ f.title }}</h2>
        <p>{{ f.desc }}</p>
      </div>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/">&#8592; 返回首页</RouterLink>
      <RouterLink to="/blog">查看博客 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.features-page { max-width: 1100px; margin: 0 auto; padding: 80px 20px; }
.page-header { text-align: center; margin-bottom: 64px; }
.page-header h1 { font-size: 2.5rem; margin: 0 0 16px; color: #111827; }
.page-header p { font-size: 1.1rem; color: #6b7280; margin: 0; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-bottom: 48px; }
.card { padding: 32px; border-radius: 12px; background: #f9fafb; transition: box-shadow .2s, transform .2s; }
.card:hover { box-shadow: 0 8px 24px rgb(0 0 0 / 8%); transform: translateY(-2px); }
.card-icon { font-size: 2rem; display: block; margin-bottom: 16px; }
.card h2 { margin: 0 0 12px; font-size: 1.2rem; font-weight: 600; color: #111827; }
.card p { margin: 0; color: #6b7280; line-height: 1.7; }
.bottom-nav { display: flex; justify-content: space-between; }
.bottom-nav a { color: #1677ff; text-decoration: none; font-weight: 500; }
.bottom-nav a:hover { text-decoration: underline; }
</style>
`;
}

function generateSiteBlog(): string {
  return `<script setup lang="ts">
const posts = [
  { title: 'Fast Vue3 v2.0 发布', summary: '全新 Monorepo 架构重构，支持 7 大 UI 框架，引入 Turborepo 增量构建，开发体验大幅提升。', date: '2025-01-15', tag: 'Release' },
  { title: '如何选择适合你的 UI 框架', summary: '从组件丰富度、TypeScript 支持、主题定制、社区活跃度等维度对比分析 7 大 Vue 3 UI 框架。', date: '2025-01-10', tag: 'Guide' },
  { title: 'Monorepo 最佳实践', summary: '详解 pnpm workspace 配置、依赖管理策略、构建编排方案，以及在大型 Vue 项目中的落地经验。', date: '2025-01-05', tag: 'Architecture' },
  { title: 'UnoCSS 与主题系统设计', summary: '基于 CSS Variables + UnoCSS 实现亮色/暗色主题切换，零运行时开销的动态主题方案。', date: '2024-12-28', tag: 'Style' },
];
</script>

<template>
  <div class="blog-page">
    <div class="page-header">
      <h1>博客动态</h1>
      <p>项目更新、技术分享与最佳实践</p>
    </div>
    <div class="post-list">
      <article v-for="post in posts" :key="post.title" class="post-card">
        <div class="post-meta">
          <span class="tag">{{ post.tag }}</span>
          <span class="date">{{ post.date }}</span>
        </div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
      </article>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/features">&#8592; 产品特性</RouterLink>
      <RouterLink to="/contact">联系我们 &#8594;</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.blog-page { max-width: 800px; margin: 0 auto; padding: 80px 20px; }
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 2.5rem; margin: 0 0 16px; color: #111827; }
.page-header p { font-size: 1.1rem; color: #6b7280; margin: 0; }
.post-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 48px; }
.post-card { padding: 28px; border-radius: 12px; background: #f9fafb; transition: box-shadow .2s; cursor: pointer; }
.post-card:hover { box-shadow: 0 8px 24px rgb(0 0 0 / 8%); }
.post-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.tag { padding: 2px 10px; background: #e6f4ff; color: #1677ff; border-radius: 4px; font-size: .75rem; font-weight: 600; }
.date { font-size: .8rem; color: #9ca3af; }
.post-card h2 { margin: 0 0 8px; font-size: 1.25rem; font-weight: 600; color: #111827; }
.post-card p { margin: 0; color: #6b7280; line-height: 1.6; }
.bottom-nav { display: flex; justify-content: space-between; }
.bottom-nav a { color: #1677ff; text-decoration: none; font-weight: 500; }
.bottom-nav a:hover { text-decoration: underline; }
</style>
`;
}

function generateSiteContact(): string {
  return `<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({ name: '', email: '', message: '' });
const sent = ref(false);

function handleSubmit() {
  if (!form.name || !form.email || !form.message) return;
  sent.value = true;
}
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>联系我们</h1>
      <p>有任何问题或建议？欢迎随时联系我们</p>
    </div>
    <div class="content-row">
      <div class="info-side">
        <div class="info-item">
          <span class="info-icon">&#128231;</span>
          <div>
            <h3>邮箱</h3>
            <p>contact@fast-vue3.com</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">&#128187;</span>
          <div>
            <h3>GitHub</h3>
            <p>github.com/fast-vue3</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">&#128172;</span>
          <div>
            <h3>社区</h3>
            <p>加入 Discord 交流群</p>
          </div>
        </div>
      </div>
      <div class="form-side">
        <div v-if="sent" class="success-msg">
          <span>&#10003;</span>
          <h2>发送成功</h2>
          <p>感谢您的留言，我们会尽快回复！</p>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <div class="field"><label>姓名</label><input v-model="form.name" placeholder="您的姓名" /></div>
          <div class="field"><label>邮箱</label><input v-model="form.email" type="email" placeholder="your@email.com" /></div>
          <div class="field"><label>留言</label><textarea v-model="form.message" rows="5" placeholder="请输入您的留言…" /></div>
          <button type="submit" class="btn-submit">发送留言</button>
        </form>
      </div>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/blog">&#8592; 博客动态</RouterLink>
      <RouterLink to="/">返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.contact-page { max-width: 960px; margin: 0 auto; padding: 80px 20px; }
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 2.5rem; margin: 0 0 16px; color: #111827; }
.page-header p { font-size: 1.1rem; color: #6b7280; margin: 0; }
.content-row { display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; margin-bottom: 48px; }
.info-item { display: flex; gap: 16px; margin-bottom: 28px; }
.info-icon { font-size: 1.5rem; }
.info-item h3 { margin: 0 0 4px; font-size: 1rem; font-weight: 600; color: #111827; }
.info-item p { margin: 0; color: #6b7280; font-size: .9rem; }
.field { margin-bottom: 20px; }
.field label { display: block; font-size: .85rem; font-weight: 500; color: #374151; margin-bottom: 6px; }
.field input, .field textarea { width: 100%; padding: 10px 12px; border: 1px solid #d9d9d9; border-radius: 8px; font-size: .9rem; outline: none; box-sizing: border-box; font-family: inherit; transition: border-color .2s; resize: vertical; }
.field input:focus, .field textarea:focus { border-color: #1677ff; box-shadow: 0 0 0 3px rgb(22 119 255 / 10%); }
.btn-submit { width: 100%; padding: 12px; background: #1677ff; color: #fff; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background .2s; }
.btn-submit:hover { background: #4096ff; }
.success-msg { text-align: center; padding: 48px 0; }
.success-msg span { font-size: 3rem; color: #52c41a; }
.success-msg h2 { margin: 16px 0 8px; color: #111827; }
.success-msg p { color: #6b7280; }
.bottom-nav { display: flex; justify-content: space-between; }
.bottom-nav a { color: #1677ff; text-decoration: none; font-weight: 500; }
.bottom-nav a:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .content-row { grid-template-columns: 1fr; gap: 32px; }
}
</style>
`;
}

// ═══════════════════════════════════════════════════════════════
//  CLI Command
// ═══════════════════════════════════════════════════════════════

export function defineCreateAppCommand(cli: CAC) {
  cli
    .command('create-app', 'Create a new app in the monorepo')
    .action(async () => {
      consola.info(colors.cyan('Fast Vue3 - Create App'));

      // 1. App name
      const name = await text({
        message: 'Enter the app name (e.g. web-my-app):',
        placeholder: 'web-my-app',
        validate: (value) => {
          if (!value) return 'App name is required';
          if (!/^[\w-]+$/.test(value))
            return 'Only letters, numbers, hyphens allowed';
          return undefined;
        },
      });
      if (isCancel(name)) {
        cancel('Cancelled');
        process.exit(0);
      }

      // 2. App mode
      const mode = await select<AppMode>({
        message: 'Select app mode:',
        options: [
          {
            label: '后台管理系统',
            value: 'admin',
            hint: '带 layout、登录、仪表盘、用户管理等完整页面',
          },
          {
            label: '站点',
            value: 'site',
            hint: '官网/营销页面，首页、特性、博客、联系等',
          },
        ],
      });
      if (isCancel(mode)) {
        cancel('Cancelled');
        process.exit(0);
      }

      // 3. UI library
      const ui = await select<UILibrary>({
        message: 'Select UI framework:',
        options: [
          { label: 'Ant Design Vue', value: 'antd' },
          { label: 'Element Plus', value: 'element-plus' },
          { label: 'Naive UI', value: 'naive' },
          { label: 'Arco Design', value: 'arco' },
          { label: 'TDesign', value: 'tdesign' },
          { label: 'OpenVue', value: 'openvue' },
          { label: 'iDux', value: 'idux' },
        ],
      });
      if (isCancel(ui)) {
        cancel('Cancelled');
        process.exit(0);
      }

      // 4. Create app directory
      const root = await findMonorepoRoot();
      const appDir = resolve(root, 'apps', name as string);

      if (existsSync(appDir)) {
        consola.error(`Directory apps/${name} already exists!`);
        process.exit(1);
      }

      // Create directories
      const dirs = ['src/views/home', 'src/router', 'types'];
      if (mode === 'admin') {
        dirs.push(
          'src/layout',
          'src/views/login',
          'src/views/dashboard',
          'src/views/user',
          'src/views/role',
          'src/views/settings',
          'src/views/profile',
          'src/views/analytics',
          'src/views/about',
          'src/views/error',
        );
      } else {
        dirs.push(
          'src/views/about',
          'src/views/features',
          'src/views/blog',
          'src/views/contact',
        );
      }
      for (const dir of dirs) {
        mkdirSync(resolve(appDir, dir), { recursive: true });
      }

      // Write files
      const tsconfig = generateTsConfig();
      const files: Record<string, string> = {
        'package.json': generatePackageJson(name as string, mode, ui),
        'vite.config.ts': generateViteConfig(ui),
        'index.html': generateIndexHtml(name as string),
        'tsconfig.json': tsconfig.main,
        'tsconfig.node.json': tsconfig.node,
        'src/main.ts': generateMainTs(ui),
        'src/App.vue': generateAppVue(),
        'src/router/index.ts': generateRouter(mode),
        ...(mode === 'admin' ? generateEnvFiles(name as string) : {}),
      };

      if (mode === 'admin') {
        Object.assign(files, {
          'src/layout/index.vue': generateAdminLayout(),
          'src/views/home/index.vue': generateAdminHome(),
          'src/views/dashboard/index.vue': generateAdminDashboard(),
          'src/views/user/index.vue': generateAdminUser(),
          'src/views/role/index.vue': generateAdminRole(),
          'src/views/settings/index.vue': generateAdminSettings(),
          'src/views/profile/index.vue': generateAdminProfile(),
          'src/views/analytics/index.vue': generateAdminAnalytics(),
          'src/views/about/index.vue': generateAdminAbout(),
          'src/views/login/index.vue': generateAdminLogin(),
          'src/views/error/403.vue': generateAdmin403(),
          'src/views/error/404.vue': generateAdmin404(),
        });
      } else {
        Object.assign(files, {
          'src/views/home/index.vue': generateSiteHome(),
          'src/views/about/index.vue': generateSiteAbout(),
          'src/views/features/index.vue': generateSiteFeatures(),
          'src/views/blog/index.vue': generateSiteBlog(),
          'src/views/contact/index.vue': generateSiteContact(),
        });
      }

      for (const [file, content] of Object.entries(files)) {
        writeFileSync(resolve(appDir, file), content);
      }

      // 5. Add dev/build scripts to root package.json
      const { buildKey, devKey } = addRootAppScripts(root, name as string);

      // minus: package.json, vite.config, index.html, tsconfig x2, main.ts, App.vue, router
      const pageCount = Object.keys(files).filter((file) =>
        file.startsWith('src/views/'),
      ).length;
      consola.success(
        `\n${colors.green('✓')} App created at ${colors.cyan(`apps/${name}`)}\n` +
          `  Mode: ${colors.yellow(mode === 'admin' ? '后台管理系统' : '站点')}\n` +
          `  UI: ${colors.blue(ui)}\n` +
          `  Pages: ${colors.green(String(pageCount))}\n\n` +
          `  ${colors.cyan('Root scripts added:')}\n` +
          `  ${colors.dim('•')} pnpm ${devKey}\n` +
          `  ${colors.dim('•')} pnpm ${buildKey}\n\n` +
          `  Next steps:\n` +
          `  ${colors.dim('1.')} pnpm install\n` +
          `  ${colors.dim('2.')} pnpm ${devKey}\n`,
      );
    });
}
