<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { useToast } from 'openvue/usetoast';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const toast = useToast();
const userMenuRef = ref();
const isFullscreen = ref(false);
const prefs = usePreferences();
const { isDark } = storeToRefs(prefs);

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

function resolveTitle(path: string): string | undefined {
  if (ROUTE_TITLES[path]) return ROUTE_TITLES[path];
  if (/^\/system\/user\/\d+$/.test(path)) return '用户详情';
  if (/^\/system\/role\/\d+\/permission$/.test(path)) return '角色权限配置';
  if (path === '/content/article/edit') return '编辑文章';
  return undefined;
}

const menuItems = [
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/dashboard', label: '仪表盘', icon: '📊' },
  { path: '/analytics', label: '数据分析', icon: '📈' },
  { path: '/components', label: '组件展示', icon: '🧩' },
  { path: '/profile', label: '个人中心', icon: '👤' },
  { path: '/about', label: '关于项目', icon: 'ℹ️' },
];

interface MenuGroup {
  label: string;
  icon: string;
  children: { label: string; path: string }[];
}

const systemGroup: MenuGroup = {
  label: '系统管理',
  icon: '⚙️',
  children: [
    { path: '/system/user', label: '用户管理' },
    { path: '/system/role', label: '角色管理' },
    { path: '/system/menu', label: '菜单管理' },
  ],
};

const contentGroup: MenuGroup = {
  label: '内容管理',
  icon: '📝',
  children: [{ path: '/content/article', label: '文章管理' }],
};

const logGroup: MenuGroup = {
  label: '日志中心',
  icon: '📋',
  children: [
    { path: '/log/login', label: '登录日志' },
    { path: '/log/operation', label: '操作日志' },
    { path: '/log/error', label: '错误日志' },
  ],
};

const errorGroup: MenuGroup = {
  label: '异常页',
  icon: '⚠️',
  children: [
    { path: '/error/403', label: '403 禁止访问' },
    { path: '/error/404', label: '404 未找到' },
    { path: '/error/500', label: '500 服务错误' },
  ],
};

const menuGroups = [systemGroup, contentGroup, logGroup, errorGroup];

const expandedGroups = ref<string[]>([]);

function isGroupActive(group: MenuGroup) {
  return group.children.some((c) => route.path === c.path);
}

function toggleGroup(label: string) {
  const idx = expandedGroups.value.indexOf(label);
  if (idx === -1) {
    expandedGroups.value.push(label);
  } else {
    expandedGroups.value.splice(idx, 1);
  }
}

// Auto-expand groups that contain the current route
watch(
  () => route.path,
  (path) => {
    for (const group of menuGroups) {
      if (
        group.children.some((c) => c.path === path) &&
        !expandedGroups.value.includes(group.label)
      ) {
        expandedGroups.value.push(group.label);
      }
    }
  },
  { immediate: true },
);

const breadcrumbItems = computed(() => {
  const title = resolveTitle(route.path);
  return title ? [{ label: '🏠' }, { label: title }] : [{ label: '🏠' }];
});

const userMenuItems = [
  {
    label: '个人中心',
    icon: 'pi pi-user',
    command: () => router.push('/profile'),
  },
  { separator: true },
  { label: '退出登录', icon: 'pi pi-sign-out', command: handleLogout },
];

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
  toast.add({
    severity: 'success',
    summary: '成功',
    detail: '已退出登录',
    life: 2000,
  });
  tabs.value = [];
  await router.push('/login');
}
</script>

<template>
  <div class="admin-shell">
    <!-- Sider -->
    <div class="admin-sidebar">
      <div class="sidebar-brand">Fast Vue3</div>
      <nav class="sidebar-nav">
        <!-- Flat menu items -->
        <a
          v-for="item in menuItems"
          :key="item.path"
          :href="`#${item.path}`"
          class="sidebar-link"
          :class="{ 'is-active': route.path === item.path }"
          @click.prevent="router.push(item.path)"
        >
          <span>{{ item.icon }}</span
          >{{ item.label }}
        </a>

        <!-- Collapsible groups -->
        <div v-for="group in menuGroups" :key="group.label">
          <div
            class="sidebar-link sidebar-group"
            :class="{ 'is-active': isGroupActive(group) }"
            @click="toggleGroup(group.label)"
          >
            <span>{{ group.icon }}</span>
            <span class="sidebar-group-label">{{ group.label }}</span>
            <i
              class="pi sidebar-chevron"
              :class="
                expandedGroups.includes(group.label)
                  ? 'pi-chevron-down'
                  : 'pi-chevron-right'
              "
            ></i>
          </div>
          <div
            v-show="expandedGroups.includes(group.label)"
            class="sidebar-children"
          >
            <a
              v-for="child in group.children"
              :key="child.path"
              :href="`#${child.path}`"
              class="sidebar-link sidebar-child"
              :class="{ 'is-active': route.path === child.path }"
              @click.prevent="router.push(child.path)"
            >
              {{ child.label }}
            </a>
          </div>
        </div>
      </nav>
    </div>

    <!-- Right side -->
    <div class="min-w-0 admin-main">
      <!-- Header -->
      <div class="admin-header">
        <div class="header-breadcrumbs">
          <Breadcrumb :model="breadcrumbItems" class="header-breadcrumb" />
        </div>
        <div class="header-actions">
          <!-- Notifications -->
          <div class="header-icon-btn header-notifications">
            <i class="pi pi-bell header-icon"></i>
            <span class="notification-badge">3</span>
          </div>

          <!-- Fullscreen -->
          <div class="header-icon-btn" @click="toggleFullscreen">
            <i
              class="pi header-icon"
              :class="isFullscreen ? 'pi-arrows-alt' : 'pi-arrows-alt'"
            ></i>
          </div>

          <!-- Theme Toggle -->
          <div class="header-icon-btn" @click="toggleTheme">
            <i
              class="pi header-icon"
              :class="isDark ? 'pi-moon' : 'pi-sun'"
            ></i>
          </div>
        </div>
        <div class="header-account" @click="userMenuRef.toggle($event)">
          <Avatar
            :label="userStore.userName?.charAt(0)?.toUpperCase()"
            class="account-avatar"
          />
          <span class="account-name">{{ userStore.userName }}</span>
        </div>
        <TieredMenu ref="userMenuRef" :model="userMenuItems" popup />
      </div>

      <!-- Tabs -->
      <div class="admin-tabs">
        <Tag
          v-for="tab in tabs"
          :key="tab.path"
          :severity="tab.path === route.path ? 'primary' : 'secondary'"
          class="admin-tab"
          @click="router.push(tab.path)"
        >
          {{ tab.title }}
          <i class="pi pi-times tab-close" @click.stop="closeTab(tab.path)"></i>
        </Tag>
      </div>

      <!-- Content -->
      <div class="admin-content">
        <div class="admin-workspace">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
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
  background: var(--app-bg-hover);
}

.admin-shell {
  --openvue-content-bg: #f5f6fa;

  display: flex;
  height: 100dvh;
  overflow: hidden;
}

.admin-sidebar {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: var(--app-sidebar-width);
  overflow: hidden;
  background: #111827;
}

.sidebar-brand {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: var(--app-header-height);
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.sidebar-nav {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-height: 0;
  padding: 8px;
  overflow-y: auto;
}

.sidebar-link {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  font-size: 14px;
  color: #9ca3af;
  text-decoration: none;
  border-radius: 6px;
  transition:
    background 0.15s,
    color 0.15s;
}

.sidebar-group {
  cursor: pointer;
  user-select: none;
}

.sidebar-group-label {
  flex: 1;
}

.sidebar-chevron {
  font-size: 11px;
  transition: transform 0.2s;
}

.sidebar-children {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block-start: 2px;
  padding-inline-start: 16px;
  overflow: hidden;
}

.sidebar-child {
  padding: 8px 12px;
  font-size: 13px;
}

.admin-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  height: var(--app-header-height);
  padding: 0 16px;
  background: var(--app-bg-color);
  border-bottom: 1px solid var(--app-border-color);
  box-shadow: var(--app-shadow-sm);
}

.header-breadcrumbs {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

.header-breadcrumb {
  font-size: 14px;
  white-space: nowrap;
}

.header-actions {
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  align-items: center;
}

.header-notifications {
  position: relative;
}

.header-icon {
  font-size: 18px;
  color: var(--app-text-secondary);
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  background: #ef4444;
  border-radius: 8px;
}

.header-account {
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}

.account-avatar {
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: #3b82f6;
}

.account-name {
  font-size: 14px;
  color: var(--app-text-color);
}

.admin-tabs {
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  overflow-x: auto;
  background: var(--app-bg-color);
  border-bottom: 1px solid var(--app-border-color);
}

.admin-tab {
  flex-shrink: 0;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}

.tab-close {
  margin-left: 4px;
  font-size: 10px;
  cursor: pointer;
}

.admin-content {
  flex: 1;
  min-height: 0;
  padding: 16px;
  overflow-y: auto;
  background: var(--openvue-content-bg);
}

.sidebar-link.is-active {
  color: #818cf8;
  background: rgb(99 102 241 / 15%);
}

.dark .admin-shell {
  --openvue-content-bg: #0f172a;
}

@media (max-width: 767px) {
  .admin-sidebar {
    width: 112px;
  }

  .sidebar-brand {
    font-size: 13px;
  }

  .sidebar-nav {
    padding: 4px;
  }

  .sidebar-link,
  .sidebar-child {
    gap: 4px;
    padding: 8px 4px;
    font-size: 12px;
  }

  .sidebar-children {
    padding-inline-start: 8px;
  }

  .admin-header,
  .admin-tabs,
  .admin-content {
    padding-inline: 8px;
  }
}

@media (max-width: 480px) {
  .admin-header {
    gap: 8px;
  }

  .header-actions {
    gap: 2px;
  }

  .header-icon-btn {
    width: 28px;
  }

  .account-name {
    display: none;
  }
}
</style>
