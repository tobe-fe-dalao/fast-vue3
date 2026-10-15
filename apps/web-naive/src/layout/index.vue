<script setup lang="ts">
import type { MenuOption } from 'naive-ui';

import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { userApi } from '@/api/user';
import { NIcon, useMessage } from 'naive-ui';

// Use dynamic import for fluent-system-icons if available, fallback to text
const MenuFold20Filled: any = { render: () => h('span', '◀') };
const MenuUnfold20Filled: any = { render: () => h('span', '▶') };
const BellOutlined: any = {
  render: () => h('span', { style: 'font-size:18px' }, '🔔'),
};
const FullscreenOutlined: any = {
  render: () => h('span', { style: 'font-size:18px' }, '⛶'),
};
const BulbOutlined: any = {
  render: () => h('span', { style: 'font-size:18px' }, '💡'),
};
try {
  // Try to use icons if available
} catch {}

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const collapsed = ref(false);
const msg = useMessage();

const isFullscreen = ref(false);
const prefs = usePreferences();
const { isDark } = storeToRefs(prefs);
const { setThemeMode } = prefs;
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
  setThemeMode(isDark.value ? 'light' : 'dark');
}

const ROUTE_TITLES: Record<string, string> = {
  '/home': '首页',
  '/dashboard': '仪表盘',
  '/analytics': '数据分析',
  '/user': '用户管理',
  '/role': '角色管理',
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/menu': '菜单管理',
  '/content/article': '文章管理',
  '/log/login': '登录日志',
  '/log/operation': '操作日志',
  '/log/error': '错误日志',
  '/settings': '系统设置',
  '/components': '组件展示',
  '/profile': '个人中心',
  '/about': '关于项目',
  '/error/403': '403 禁止访问',
  '/error/404': '404 未找到',
  '/error/500': '500 服务错误',
};

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: '/home',
    icon: () => h('span', { style: 'font-size:16px' }, '🏠'),
  },
  {
    label: '仪表盘',
    key: '/dashboard',
    icon: () => h('span', { style: 'font-size:16px' }, '📊'),
  },
  {
    label: '数据分析',
    key: '/analytics',
    icon: () => h('span', { style: 'font-size:16px' }, '📈'),
  },
  {
    label: '系统管理',
    key: 'system',
    icon: () => h('span', { style: 'font-size:16px' }, '⚙️'),
    children: [
      { label: '用户管理', key: '/system/user' },
      { label: '角色管理', key: '/system/role' },
      { label: '菜单管理', key: '/system/menu' },
    ],
  },
  {
    label: '内容管理',
    key: 'content',
    icon: () => h('span', { style: 'font-size:16px' }, '📝'),
    children: [{ label: '文章管理', key: '/content/article' }],
  },
  {
    label: '日志中心',
    key: 'log',
    icon: () => h('span', { style: 'font-size:16px' }, '📋'),
    children: [
      { label: '登录日志', key: '/log/login' },
      { label: '操作日志', key: '/log/operation' },
      { label: '错误日志', key: '/log/error' },
    ],
  },
  {
    label: '系统设置',
    key: '/settings',
    icon: () => h('span', { style: 'font-size:16px' }, '⚙️'),
  },
  {
    label: '组件展示',
    key: '/components',
    icon: () => h('span', { style: 'font-size:16px' }, '🧩'),
  },
  {
    label: '个人中心',
    key: '/profile',
    icon: () => h('span', { style: 'font-size:16px' }, '👤'),
  },
  {
    label: '关于项目',
    key: '/about',
    icon: () => h('span', { style: 'font-size:16px' }, 'ℹ️'),
  },
  {
    label: '异常页',
    key: 'error',
    icon: () => h('span', { style: 'font-size:16px' }, '⚠️'),
    children: [
      { label: '403 禁止访问', key: '/error/403' },
      { label: '404 未找到', key: '/error/404' },
      { label: '500 服务错误', key: '/error/500' },
    ],
  },
];

const userMenuOptions = [
  { label: '个人中心', key: 'profile' },
  { label: '退出登录', key: 'logout' },
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

async function handleDropdown(key: string) {
  if (key === 'profile') router.push('/profile');
  else if (key === 'logout') {
    if (!(await userStore.logoutWithRevoke(userApi.logout))) return;
    msg.success('已退出登录');
    tabs.value = [];
    router.push('/login');
  }
}
</script>

<template>
  <n-message-provider>
    <n-layout has-sider style="height: 100vh">
      <!-- Sider -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        :collapsed="collapsed"
        show-trigger
        style="background: #111827"
        @collapse="collapsed = true"
        @expand="collapsed = false"
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
        <n-menu
          :collapsed="collapsed"
          :value="route.path"
          :options="menuOptions"
          :collapsed-width="64"
          :indent="20"
          style="--n-item-color-active-hover: rgb(99 102 241 / 15%)"
          @update:value="router.push($event as string)"
        />
      </n-layout-sider>

      <!-- Right side -->
      <n-layout style="display: flex; flex-direction: column; overflow: hidden">
        <!-- Header -->
        <n-layout-header
          bordered
          style="
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: space-between;
            height: 56px;
            padding: 0 16px;
          "
        >
          <div style="display: flex; gap: 12px; align-items: center">
            <NIcon
              size="18"
              class="cursor-pointer"
              style="color: #6b7280"
              @click="collapsed = !collapsed"
            >
              <MenuUnfold20Filled v-if="collapsed" />
              <MenuFold20Filled v-else />
            </NIcon>
            <n-breadcrumb>
              <n-breadcrumb-item>🏠</n-breadcrumb-item>
              <n-breadcrumb-item v-for="c in breadcrumbs" :key="c.path">
                {{ c.title }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
          <div style="display: flex; gap: 4px; align-items: center">
            <!-- Notifications -->
            <n-popover trigger="click" placement="bottom" :width="300">
              <template #trigger>
                <n-tooltip placement="bottom">
                  <template #trigger>
                    <div class="header-icon-btn">
                      <n-badge :value="3" :offset="[-2, 2]">
                        <NIcon size="18" style="color: #6b7280">
                          <BellOutlined />
                        </NIcon>
                      </n-badge>
                    </div>
                  </template>
                  通知
                </n-tooltip>
              </template>
              <div style="margin: -12px -16px">
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
                    color: #2080f0;
                    text-align: center;
                    cursor: pointer;
                  "
                >
                  查看全部
                </div>
              </div>
            </n-popover>

            <!-- Fullscreen -->
            <n-tooltip placement="bottom">
              <template #trigger>
                <div class="header-icon-btn" @click="toggleFullscreen">
                  <NIcon size="18" style="color: #6b7280">
                    <FullscreenOutlined />
                  </NIcon>
                </div>
              </template>
              {{ isFullscreen ? '退出全屏' : '全屏' }}
            </n-tooltip>

            <!-- Theme Toggle -->
            <n-tooltip placement="bottom">
              <template #trigger>
                <div class="header-icon-btn" @click="toggleTheme">
                  <NIcon size="18" style="color: #6b7280">
                    <BulbOutlined />
                  </NIcon>
                </div>
              </template>
              {{ isDark ? '亮色模式' : '暗色模式' }}
            </n-tooltip>
          </div>
          <n-dropdown :options="userMenuOptions" @select="handleDropdown">
            <div
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                cursor: pointer;
              "
            >
              <n-avatar
                round
                :size="30"
                style="font-size: 13px; font-weight: 600; background: #3b82f6"
              >
                {{ userStore.userName?.charAt(0)?.toUpperCase() }}
              </n-avatar>
              <span style="color: #374151">{{ userStore.userName }}</span>
            </div>
          </n-dropdown>
        </n-layout-header>

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
          <n-tag
            v-for="tab in tabs"
            :key="tab.path"
            :type="tab.path === route.path ? 'primary' : 'default'"
            closable
            style="margin: 0 2px; cursor: pointer"
            @click="router.push(tab.path)"
            @close.stop="closeTab(tab.path)"
          >
            {{ tab.title }}
          </n-tag>
        </div>

        <!-- Content -->
        <n-layout-content
          style="
            flex: 1;
            min-height: 0;
            padding: 16px;
            overflow-y: auto;
            background: #f5f6fa;
          "
        >
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-message-provider>
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
