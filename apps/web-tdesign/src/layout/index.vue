<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { storeToRefs } from 'pinia';
import {
  FullscreenIcon,
  MoonIcon,
  NotificationIcon,
  SunnyIcon,
} from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const collapsed = ref(false);
const isFullscreen = ref(false);
const prefs = usePreferences();
const { isDark } = storeToRefs(prefs);
const notifications = [
  { id: 1, title: '系统更新 v2.1.0 已发布', time: '10 分钟前' },
  { id: 2, title: '您有 3 条未读消息', time: '1 小时前' },
  { id: 3, title: '每周数据报告已生成', time: '今天 09:00' },
];

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    isFullscreen.value = false;
  } else {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  }
}

function toggleTheme() {
  prefs.setThemeMode(isDark.value ? 'light' : 'dark');
}

const ROUTE_TITLES: Record<string, string> = {
  '/home': '首页',
  '/dashboard': '仪表盘',
  '/analytics': '数据分析',
  '/user': '用户管理',
  '/role': '角色管理',
  '/settings': '系统设置',
  '/components': '组件展示',
  '/profile': '个人中心',
  '/about': '关于项目',
  '/error/403': '403 禁止访问',
  '/error/404': '404 未找到',
  '/error/500': '500 服务错误',
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/menu': '菜单管理',
  '/content/article': '文章管理',
  '/log/login': '登录日志',
  '/log/operation': '操作日志',
  '/log/error': '错误日志',
};

const userMenuOptions = [
  { content: '个人中心', value: 'profile' },
  { content: '退出登录', value: 'logout' },
];

function resolveTitle(path: string): string | undefined {
  if (ROUTE_TITLES[path]) return ROUTE_TITLES[path];
  if (/^\/system\/user\/\d+$/.test(path)) return '用户详情';
  if (/^\/system\/role\/\d+\/permission$/.test(path)) return '角色权限配置';
  if (path === '/content/article/edit') return '编辑文章';
  return undefined;
}

const breadcrumbs = computed(() => {
  const title = resolveTitle(route.path);
  return title ? [{ path: route.path, title }] : [];
});

interface TabItem {
  path: string;
  title: string;
}
const tabs = ref<TabItem[]>([{ path: '/home', title: '首页' }]);

watch(
  () => route.path,
  (path) => {
    const title = resolveTitle(path);
    if (title && !tabs.value.some((t) => t.path === path)) {
      tabs.value.push({ path, title });
    }
  },
  { immediate: true },
);

function closeTab(path: string) {
  const idx = tabs.value.findIndex((t) => t.path === path);
  if (idx === -1) return;
  tabs.value.splice(idx, 1);
  if (route.path === path) {
    const next = tabs.value[Math.min(idx, tabs.value.length - 1)];
    router.push(next?.path ?? '/home');
  }
}

async function handleDropdown(item: {
  value?: number | Record<string, any> | string;
}) {
  const value = String(item.value ?? '');
  if (value === 'profile') router.push('/profile');
  else if (value === 'logout') {
    userStore.logout();
    await MessagePlugin.success('已退出登录');
    tabs.value = [];
    await router.push('/login');
  }
}
</script>

<template>
  <t-layout style="height: 100vh">
    <!-- Sider -->
    <t-aside
      :style="{
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column',
        width: collapsed ? '64px' : '220px',
        overflow: 'hidden',
        background: '#111827',
        transition: 'width 0.3s',
      }"
    >
      <div
        style="
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          height: 56px;
          overflow: hidden;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        "
      >
        Fast Vue3
      </div>
      <t-menu
        :value="route.path"
        :collapsed="collapsed"
        theme="dark"
        style="flex: 1; min-height: 0; overflow: hidden auto"
        @change="router.push($event as string)"
      >
        <t-menu-item value="/home"> 🏠 首页 </t-menu-item>
        <t-menu-item value="/dashboard"> 📊 仪表盘 </t-menu-item>
        <t-menu-item value="/analytics"> 📈 数据分析 </t-menu-item>
        <t-submenu title="系统管理" value="system">
          <template #icon><span>👥</span></template>
          <t-menu-item value="/system/user"> 用户管理 </t-menu-item>
          <t-menu-item value="/system/role"> 角色管理 </t-menu-item>
          <t-menu-item value="/system/menu"> 菜单管理 </t-menu-item>
        </t-submenu>
        <t-submenu title="内容管理" value="content">
          <template #icon><span>📝</span></template>
          <t-menu-item value="/content/article"> 文章管理 </t-menu-item>
        </t-submenu>
        <t-submenu title="日志中心" value="log">
          <template #icon><span>📋</span></template>
          <t-menu-item value="/log/login"> 登录日志 </t-menu-item>
          <t-menu-item value="/log/operation"> 操作日志 </t-menu-item>
          <t-menu-item value="/log/error"> 错误日志 </t-menu-item>
        </t-submenu>
        <t-menu-item value="/settings"> ⚙️ 系统设置 </t-menu-item>
        <t-menu-item value="/components"> 🧩 组件展示 </t-menu-item>
        <t-menu-item value="/profile"> 👤 个人中心 </t-menu-item>
        <t-menu-item value="/about"> ℹ️ 关于项目 </t-menu-item>
        <t-submenu title="异常页" value="error">
          <template #icon><span>⚠️</span></template>
          <t-menu-item value="/error/403"> 403 禁止访问 </t-menu-item>
          <t-menu-item value="/error/404"> 404 未找到 </t-menu-item>
          <t-menu-item value="/error/500"> 500 服务错误 </t-menu-item>
        </t-submenu>
      </t-menu>
    </t-aside>

    <!-- Right side -->
    <t-layout style="display: flex; flex-direction: column; overflow: hidden">
      <!-- Header -->
      <t-header
        style="
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 16px;
          background: #fff;
          box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
        "
      >
        <div style="display: flex; gap: 12px; align-items: center">
          <t-button
            variant="text"
            style="padding: 0"
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '▶' : '◀' }}
          </t-button>
          <t-breadcrumb>
            <t-breadcrumb-item>🏠</t-breadcrumb-item>
            <t-breadcrumb-item v-for="c in breadcrumbs" :key="c.path">
              {{ c.title }}
            </t-breadcrumb-item>
          </t-breadcrumb>
        </div>
        <div style="display: flex; gap: 4px; align-items: center">
          <!-- Notifications -->
          <t-popup trigger="click" placement="bottom">
            <t-tooltip content="通知" placement="bottom">
              <div class="header-icon-btn">
                <t-badge :count="3" :offset="[-2, 2]">
                  <NotificationIcon class="header-icon" />
                </t-badge>
              </div>
            </t-tooltip>
            <template #content>
              <div style="width: 300px; background: #fff; border-radius: 8px">
                <div
                  style="
                    padding: 12px 16px;
                    font-weight: 600;
                    border-bottom: 1px solid #f0f0f0;
                  "
                >
                  通知
                </div>
                <div
                  v-for="n in notifications"
                  :key="n.id"
                  class="notification-item"
                  style="
                    padding: 12px 16px;
                    cursor: pointer;
                    border-bottom: 1px solid #f5f5f5;
                  "
                >
                  <div style="font-size: 0.9rem; color: #111827">
                    {{ n.title }}
                  </div>
                  <div
                    style="margin-top: 4px; font-size: 0.75rem; color: #9ca3af"
                  >
                    {{ n.time }}
                  </div>
                </div>
                <div
                  style="
                    padding: 10px;
                    font-size: 0.85rem;
                    color: #0052d9;
                    text-align: center;
                    cursor: pointer;
                  "
                >
                  查看全部
                </div>
              </div>
            </template>
          </t-popup>

          <!-- Fullscreen -->
          <t-tooltip
            :content="isFullscreen ? '退出全屏' : '全屏'"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="toggleFullscreen">
              <FullscreenIcon class="header-icon" />
            </div>
          </t-tooltip>

          <!-- Theme Toggle -->
          <t-tooltip
            :content="isDark ? '亮色模式' : '暗色模式'"
            placement="bottom"
          >
            <button
              type="button"
              class="header-icon-btn"
              :aria-label="isDark ? '亮色模式' : '暗色模式'"
              @click="toggleTheme"
            >
              <MoonIcon v-if="isDark" class="header-icon" />
              <SunnyIcon v-else class="header-icon" />
            </button>
          </t-tooltip>
        </div>
        <t-dropdown :options="userMenuOptions" @click="handleDropdown">
          <div
            style="
              display: flex;
              gap: 8px;
              align-items: center;
              cursor: pointer;
            "
          >
            <t-avatar
              size="small"
              style="font-size: 13px; font-weight: 600; background: #3b82f6"
            >
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </t-avatar>
            <span style="color: #374151">{{ userStore.userName }}</span>
          </div>
        </t-dropdown>
      </t-header>

      <!-- Tabs -->
      <div
        style="
          display: flex;
          flex-shrink: 0;
          gap: 4px;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          overflow-x: auto;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
        "
      >
        <t-tag
          v-for="tab in tabs"
          :key="tab.path"
          :theme="tab.path === route.path ? 'primary' : 'default'"
          closable
          style="margin: 0 2px; cursor: pointer"
          @click="router.push(tab.path)"
          @close.stop="closeTab(tab.path)"
        >
          {{ tab.title }}
        </t-tag>
      </div>

      <!-- Content -->
      <t-content
        style="
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f5f6fa;
        "
      >
        <RouterView />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<style scoped>
.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 6px;
  transition: background 0.2s;
}

.header-icon-btn:hover {
  background: #f5f5f5;
}

.header-icon {
  font-size: 18px;
  color: #6b7280;
}

.notification-item:hover {
  background: #f8fafc;
}

.dark {
  color-scheme: dark;
}

.dark body {
  color: #e5e5e5;
  background: #1a1a2e;
}
</style>
