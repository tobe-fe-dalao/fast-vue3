<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { storeToRefs } from 'pinia';
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
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
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/menu': '菜单管理',
  '/content/article': '文章管理',
  '/log/login': '登录日志',
  '/log/operation': '操作日志',
  '/log/error': '错误日志',
  '/error/403': '403 禁止访问',
  '/error/404': '404 未找到',
  '/error/500': '500 服务错误',
};
const menuData = [
  { key: '/home', label: '首页', type: 'item' },
  { key: '/dashboard', label: '仪表盘', type: 'item' },
  { key: '/analytics', label: '数据分析', type: 'item' },
  {
    key: 'system',
    label: '系统管理',
    type: 'sub',
    children: [
      { key: '/system/user', label: '用户管理', type: 'item' },
      { key: '/system/role', label: '角色管理', type: 'item' },
      { key: '/system/menu', label: '菜单管理', type: 'item' },
    ],
  },
  {
    key: 'content',
    label: '内容管理',
    type: 'sub',
    children: [{ key: '/content/article', label: '文章管理', type: 'item' }],
  },
  {
    key: 'log',
    label: '日志管理',
    type: 'sub',
    children: [
      { key: '/log/login', label: '登录日志', type: 'item' },
      { key: '/log/operation', label: '操作日志', type: 'item' },
      { key: '/log/error', label: '错误日志', type: 'item' },
    ],
  },
  { key: '/settings', label: '系统设置', type: 'item' },
  { key: '/components', label: '组件展示', type: 'item' },
  { key: '/profile', label: '个人中心', type: 'item' },
  { key: '/about', label: '关于项目', type: 'item' },
  {
    key: 'error',
    label: '异常页',
    type: 'sub',
    children: [
      { key: '/error/403', label: '403 禁止访问', type: 'item' },
      { key: '/error/404', label: '404 未找到', type: 'item' },
      { key: '/error/500', label: '500 服务错误', type: 'item' },
    ],
  },
];
const breadcrumbData = computed(() => {
  const title = resolveTitle(route.path);
  return title ? [{ label: '🏠' }, { label: title }] : [{ label: '🏠' }];
});

function resolveTitle(path: string): string | undefined {
  if (ROUTE_TITLES[path]) return ROUTE_TITLES[path];
  if (/^\/system\/user\/\d+$/.test(path)) return '用户详情';
  if (/^\/system\/role\/\d+\/permission$/.test(path)) return '角色权限配置';
  if (path === '/content/article/edit') return '编辑文章';
  return undefined;
}
interface TabItem {
  path: string;
  title: string;
}
const tabs = ref<TabItem[]>([{ path: '/home', title: '首页' }]);
watch(
  () => route.path,
  (path) => {
    const title = resolveTitle(path);
    if (title && !tabs.value.some((t) => t.path === path))
      tabs.value.push({ path, title });
  },
  { immediate: true },
);
function closeTab(path: string) {
  const idx = tabs.value.findIndex((t) => t.path === path);
  if (idx === -1) return;
  tabs.value.splice(idx, 1);
  if (route.path === path)
    router.push(
      tabs.value[Math.min(idx, tabs.value.length - 1)]?.path ?? '/home',
    );
}
async function handleLogout() {
  userStore.logout();
  tabs.value = [];
  await router.push('/login');
}
</script>
<template>
  <IxLayout style="height: 100vh">
    <IxLayoutSider style="background: #111827" :width="220">
      <div
        style="
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          height: 56px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        "
      >
        Fast Vue3
      </div>
      <IxMenu
        :selected-keys="[route.path]"
        theme="dark"
        :data-source="menuData"
        style="
          height: calc(100vh - 56px);
          overflow: hidden auto;
          border-right: none;
        "
        @click="(item: any) => router.push(item.key)"
      />
    </IxLayoutSider>
    <IxLayout style="display: flex; flex-direction: column; overflow: hidden">
      <IxLayoutHeader
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
          <IxBreadcrumb :data-source="breadcrumbData" />
        </div>
        <div style="display: flex; gap: 12px; align-items: center">
          <div style="display: flex; gap: 4px; align-items: center">
            <!-- Notifications -->
            <div class="header-icon-btn" style="position: relative">
              <span style="font-size: 18px">🔔</span>
              <span
                style="
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
                "
                >3</span
              >
            </div>

            <!-- Fullscreen -->
            <div class="header-icon-btn" @click="toggleFullscreen">
              <span style="font-size: 18px">⛶</span>
            </div>

            <!-- Theme Toggle -->
            <div class="header-icon-btn" @click="toggleTheme">
              <span style="font-size: 18px">{{ isDark ? '🌙' : '☀️' }}</span>
            </div>
          </div>

          <!-- User -->
          <div
            style="
              display: flex;
              gap: 8px;
              align-items: center;
              cursor: pointer;
            "
            @click.stop
          >
            <IxAvatar
              :text="userStore.userName?.charAt(0)?.toUpperCase()"
              style="
                font-size: 13px;
                font-weight: 600;
                color: #fff;
                background: #3b82f6;
              "
            />
            <span style="color: #374151">{{ userStore.userName }}</span>
            <span
              style="
                margin-left: 8px;
                font-size: 12px;
                color: #9ca3af;
                cursor: pointer;
              "
              @click="handleLogout"
              >退出</span
            >
          </div>
        </div>
      </IxLayoutHeader>
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
        <span
          v-for="tab in tabs"
          :key="tab.path"
          style="
            display: inline-flex;
            gap: 4px;
            align-items: center;
            padding: 2px 10px;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
            border: 1px solid transparent;
            border-radius: 4px;
            transition: all 0.15s;
          "
          :style="
            tab.path === route.path
              ? {
                  background: '#e0e7ff',
                  color: '#4f46e5',
                  borderColor: '#c7d2fe',
                }
              : { background: '#f3f4f6', color: '#6b7280' }
          "
          @click="router.push(tab.path)"
        >
          {{ tab.title }}
          <span
            style="margin-left: 2px; font-size: 10px"
            @click.stop="closeTab(tab.path)"
            >✕</span
          >
        </span>
      </div>
      <IxLayoutContent
        style="
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f5f6fa;
        "
      >
        <RouterView />
      </IxLayoutContent>
    </IxLayout>
  </IxLayout>
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

.dark {
  color-scheme: dark;
}

.dark body {
  color: #e5e5e5;
  background: #1a1a2e;
}
</style>
