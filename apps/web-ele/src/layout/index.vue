<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import {
  Bell,
  DataBoard,
  Document,
  Expand,
  Fold,
  FullScreen,
  Grid,
  House,
  InfoFilled,
  Lock,
  Moon,
  Setting,
  Sunny,
  TrendCharts,
  User,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';

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

function handleDropdown(cmd: string) {
  if (cmd === 'profile') router.push('/profile');
  else if (cmd === 'logout') {
    userStore.logout();
    ElMessage.success('已退出登录');
    tabs.value = [];
    router.push('/login');
  }
}
</script>

<template>
  <el-container style="height: 100vh">
    <!-- Sider -->
    <el-aside
      :width="collapsed ? '64px' : '220px'"
      style="
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #111827;
        transition: width 0.2s;
      "
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
      <el-menu
        :default-active="route.path"
        background-color="#111827"
        text-color="#9ca3af"
        active-text-color="#409EFF"
        :collapse="collapsed"
        style="
          flex: 1;
          min-height: 0;
          overflow: hidden auto;
          border-right: none;
        "
        @select="router.push($event)"
      >
        <el-menu-item index="/home">
          <el-icon><House /></el-icon><span>首页</span>
        </el-menu-item>
        <el-menu-item index="/dashboard">
          <el-icon><DataBoard /></el-icon><span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/analytics">
          <el-icon><TrendCharts /></el-icon><span>数据分析</span>
        </el-menu-item>
        <el-sub-menu index="system">
          <template #title>
            <el-icon><Setting /></el-icon><span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">
            <el-icon><User /></el-icon><span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/system/role">
            <el-icon><Lock /></el-icon><span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system/menu">
            <el-icon><Grid /></el-icon><span>菜单管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="content">
          <template #title>
            <el-icon><Document /></el-icon><span>内容管理</span>
          </template>
          <el-menu-item index="/content/article">
            <el-icon><Document /></el-icon><span>文章管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="log">
          <template #title>
            <el-icon><DataBoard /></el-icon><span>日志中心</span>
          </template>
          <el-menu-item index="/log/login">登录日志</el-menu-item>
          <el-menu-item index="/log/operation">操作日志</el-menu-item>
          <el-menu-item index="/log/error">错误日志</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon><span>系统设置</span>
        </el-menu-item>
        <el-menu-item index="/components">
          <el-icon><Grid /></el-icon><span>组件展示</span>
        </el-menu-item>
        <el-menu-item index="/profile">
          <el-icon><User /></el-icon><span>个人中心</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon><InfoFilled /></el-icon><span>关于项目</span>
        </el-menu-item>
        <el-sub-menu index="error">
          <template #title>
            <el-icon><Lock /></el-icon><span>异常页</span>
          </template>
          <el-menu-item index="/error/403">
            <span>403 禁止访问</span>
          </el-menu-item>
          <el-menu-item index="/error/404">
            <span>404 未找到</span>
          </el-menu-item>
          <el-menu-item index="/error/500">
            <span>500 服务错误</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- Right side -->
    <el-container
      style="display: flex; flex-direction: column; overflow: hidden"
    >
      <!-- Header -->
      <el-header
        height="56px"
        style="
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          background: #fff;
          box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
        "
      >
        <div style="display: flex; gap: 12px; align-items: center">
          <el-icon
            class="cursor-pointer text-lg text-gray-500 hover:text-blue-500 transition-colors"
            @click="collapsed = !collapsed"
          >
            <Fold v-if="!collapsed" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <el-icon><House /></el-icon>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="c in breadcrumbs" :key="c.path">
              {{ c.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="display: flex; gap: 4px; align-items: center">
          <!-- Notifications -->
          <el-popover placement="bottom" :width="300" trigger="click">
            <template #reference>
              <el-tooltip content="通知" placement="bottom">
                <div class="header-icon-btn">
                  <el-badge :value="3" :offset="[-2, 2]">
                    <el-icon class="header-icon"><Bell /></el-icon>
                  </el-badge>
                </div>
              </el-tooltip>
            </template>
            <div style="min-width: 280px; margin: -12px">
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
                  color: #409eff;
                  text-align: center;
                  cursor: pointer;
                "
              >
                查看全部
              </div>
            </div>
          </el-popover>

          <!-- Fullscreen -->
          <el-tooltip
            :content="isFullscreen ? '退出全屏' : '全屏'"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="toggleFullscreen">
              <el-icon class="header-icon"><FullScreen /></el-icon>
            </div>
          </el-tooltip>

          <!-- Theme Toggle -->
          <el-tooltip
            :content="isDark ? '亮色模式' : '暗色模式'"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="toggleTheme">
              <el-icon class="header-icon">
                <Moon v-if="isDark" />
                <Sunny v-else />
              </el-icon>
            </div>
          </el-tooltip>
        </div>
        <el-dropdown @command="handleDropdown">
          <div
            style="
              display: flex;
              gap: 8px;
              align-items: center;
              cursor: pointer;
            "
          >
            <el-avatar
              :size="30"
              style="font-size: 13px; font-weight: 600; background: #3b82f6"
            >
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </el-avatar>
            <span style="color: #374151">{{ userStore.userName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile"> 个人中心 </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

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
        <el-tag
          v-for="tab in tabs"
          :key="tab.path"
          :type="tab.path === route.path ? undefined : 'info'"
          closable
          style="margin: 0 2px; cursor: pointer"
          @click="router.push(tab.path)"
          @close.stop="closeTab(tab.path)"
        >
          {{ tab.title }}
        </el-tag>
      </div>

      <!-- Content -->
      <el-main
        style="
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f5f6fa;
        "
      >
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
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
