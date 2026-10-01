<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { Message } from '@arco-design/web-vue';
import {
  IconApps,
  IconDashboard,
  IconFullscreen,
  IconFullscreenExit,
  IconHome,
  IconInfoCircle,
  IconLock,
  IconMenu,
  IconMenuFold,
  IconMenuUnfold,
  IconNotification,
  IconSettings,
  IconStorage,
  IconSun,
  IconUser,
} from '@arco-design/web-vue/es/icon';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const collapsed = ref(false);
const isFullscreen = ref(false);
const prefs = usePreferences();
const { isDark } = storeToRefs(prefs);
const openKeys = ref<string[]>([]);
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

// Auto-open submenu based on current route
watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/system') && !openKeys.value.includes('system')) {
      openKeys.value = [...openKeys.value, 'system'];
    }
    if (path.startsWith('/content') && !openKeys.value.includes('content')) {
      openKeys.value = [...openKeys.value, 'content'];
    }
    if (path.startsWith('/log') && !openKeys.value.includes('log')) {
      openKeys.value = [...openKeys.value, 'log'];
    }
    if (path.startsWith('/error') && !openKeys.value.includes('error')) {
      openKeys.value = [...openKeys.value, 'error'];
    }
  },
  { immediate: true },
);

const ROUTE_TITLES: Record<string, string> = {
  '/home': '首页',
  '/dashboard': '仪表盘',
  '/analytics': '数据分析',
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/menu': '菜单管理',
  '/content/article': '文章管理',
  '/log/login': '登录日志',
  '/log/operation': '操作日志',
  '/log/error': '错误日志',
  '/user': '用户管理(旧)',
  '/role': '角色管理(旧)',
  '/settings': '系统设置',
  '/components': '组件展示',
  '/profile': '个人中心',
  '/about': '关于项目',
  '/error/403': '403 禁止访问',
  '/error/404': '404 未找到',
  '/error/500': '500 服务错误',
};

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

async function handleLogout() {
  userStore.logout();
  Message.success('已退出登录');
  tabs.value = [];
  await router.push('/login');
}
</script>

<template>
  <a-layout style="height: 100vh">
    <!-- Sider -->
    <a-layout-sider
      :width="220"
      :collapsed-width="64"
      :collapsed="collapsed"
      collapsible
      :hide-trigger="true"
      style="overflow: hidden; background: #111827"
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
        {{ collapsed ? 'FV3' : 'Fast Vue3' }}
      </div>
      <a-menu
        :selected-keys="[route.path]"
        :open-keys="openKeys"
        theme="dark"
        style="
          height: calc(100vh - 56px);
          overflow: hidden auto;
          border-right: none;
        "
        @menu-item-click="router.push($event)"
        @sub-menu-click="
          (key: string) => {
            if (!openKeys.includes(key)) openKeys = [...openKeys, key];
            else openKeys = openKeys.filter((k) => k !== key);
          }
        "
      >
        <a-menu-item key="/home">
          <template #icon><IconHome /></template>
          首页
        </a-menu-item>
        <a-menu-item key="/dashboard">
          <template #icon><IconDashboard /></template>
          仪表盘
        </a-menu-item>
        <a-menu-item key="/analytics">
          <template #icon><IconStorage /></template>
          数据分析
        </a-menu-item>
        <a-sub-menu key="system">
          <template #icon><IconSettings /></template>
          <template #title>系统管理</template>
          <a-menu-item key="/system/user">
            <template #icon><IconUser /></template>
            用户管理
          </a-menu-item>
          <a-menu-item key="/system/role">
            <template #icon><IconLock /></template>
            角色管理
          </a-menu-item>
          <a-menu-item key="/system/menu">
            <template #icon><IconMenu /></template>
            菜单管理
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="content">
          <template #icon><IconStorage /></template>
          <template #title>内容管理</template>
          <a-menu-item key="/content/article">
            <template #icon><IconMenu /></template>
            文章管理
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="log">
          <template #icon><IconStorage /></template>
          <template #title>日志中心</template>
          <a-menu-item key="/log/login">登录日志</a-menu-item>
          <a-menu-item key="/log/operation">操作日志</a-menu-item>
          <a-menu-item key="/log/error">错误日志</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/settings">
          <template #icon><IconSettings /></template>
          系统设置
        </a-menu-item>
        <a-menu-item key="/components">
          <template #icon><IconApps /></template>
          组件展示
        </a-menu-item>
        <a-menu-item key="/profile">
          <template #icon><IconUser /></template>
          个人中心
        </a-menu-item>
        <a-menu-item key="/about">
          <template #icon><IconInfoCircle /></template>
          关于项目
        </a-menu-item>
        <a-sub-menu key="error">
          <template #icon><IconLock /></template>
          <template #title>异常页</template>
          <a-menu-item key="/error/403">403 禁止访问</a-menu-item>
          <a-menu-item key="/error/404">404 未找到</a-menu-item>
          <a-menu-item key="/error/500">500 服务错误</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <!-- Right side -->
    <a-layout style="display: flex; flex-direction: column; overflow: hidden">
      <!-- Header -->
      <a-layout-header
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
          <a-button
            type="text"
            style="padding: 0"
            @click="collapsed = !collapsed"
          >
            <template #icon>
              <IconMenuUnfold v-if="collapsed" />
              <IconMenuFold v-else />
            </template>
          </a-button>
          <a-breadcrumb>
            <a-breadcrumb-item>
              <IconHome />
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for="c in breadcrumbs" :key="c.path">
              {{ c.title }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div style="display: flex; gap: 4px; align-items: center">
          <!-- Notifications -->
          <a-dropdown trigger="click">
            <a-tooltip content="通知" position="bottom">
              <div class="header-icon-btn">
                <a-badge :count="3" :offset="[-2, 2]">
                  <IconNotification class="header-icon" />
                </a-badge>
              </div>
            </a-tooltip>
            <template #content>
              <div
                style="
                  width: 300px;
                  background: #fff;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
                "
              >
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
                    color: #1677ff;
                    text-align: center;
                    cursor: pointer;
                  "
                >
                  查看全部
                </div>
              </div>
            </template>
          </a-dropdown>

          <!-- Fullscreen -->
          <a-tooltip
            :content="isFullscreen ? '退出全屏' : '全屏'"
            position="bottom"
          >
            <div class="header-icon-btn" @click="toggleFullscreen">
              <IconFullscreenExit v-if="isFullscreen" class="header-icon" />
              <IconFullscreen v-else class="header-icon" />
            </div>
          </a-tooltip>

          <!-- Theme Toggle -->
          <a-tooltip
            :content="isDark ? '亮色模式' : '暗色模式'"
            position="bottom"
          >
            <div class="header-icon-btn" @click="toggleTheme">
              <IconSun class="header-icon" />
            </div>
          </a-tooltip>
        </div>
        <a-dropdown>
          <div
            style="
              display: flex;
              gap: 8px;
              align-items: center;
              cursor: pointer;
            "
          >
            <a-avatar
              style="font-size: 13px; font-weight: 600; background: #3b82f6"
            >
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </a-avatar>
            <span style="color: #374151">{{ userStore.userName }}</span>
          </div>
          <template #content>
            <a-doption @click="router.push('/profile')"> 个人中心 </a-doption>
            <a-doption @click="handleLogout"> 退出登录 </a-doption>
          </template>
        </a-dropdown>
      </a-layout-header>

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
        <a-tag
          v-for="tab in tabs"
          :key="tab.path"
          :color="tab.path === route.path ? 'arcoblue' : ''"
          closable
          style="margin: 0 2px; cursor: pointer"
          @click="router.push(tab.path)"
          @close.stop="closeTab(tab.path)"
        >
          {{ tab.title }}
        </a-tag>
      </div>

      <!-- Content -->
      <a-layout-content
        style="
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f5f6fa;
        "
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
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
