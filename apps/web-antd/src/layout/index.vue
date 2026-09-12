<script setup lang="ts">
import type { NotificationItem } from '@/api';

import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { usePreferences } from '@fast-vue3/preferences';
import { useUserStore } from '@fast-vue3/stores';

import { api } from '@/api';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  BookOutlined,
  BulbOutlined,
  ControlOutlined,
  DashboardOutlined,
  DesktopOutlined,
  FileTextOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LockOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  SettingOutlined,
  StopOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const prefs = usePreferences();
const { isDark } = storeToRefs(prefs);
const { setThemeMode } = prefs;

const collapsed = ref(false);
const permissions = ref<string[]>([]);
const hasPermission = (code: string) =>
  permissions.value.includes('*') || permissions.value.includes(code);
const selectedKeys = computed(() => [route.path]);
const openKeys = ref<string[]>([]);

function handleOpenChange(keys: Array<number | string>) {
  openKeys.value = keys.map(String);
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
    if (path.startsWith('/data') && !openKeys.value.includes('data')) {
      openKeys.value = [...openKeys.value, 'data'];
    }
    if (path.startsWith('/log') && !openKeys.value.includes('log')) {
      openKeys.value = [...openKeys.value, 'log'];
    }
    if (path.startsWith('/monitor') && !openKeys.value.includes('monitor')) {
      openKeys.value = [...openKeys.value, 'monitor'];
    }
    if (path.startsWith('/error') && !openKeys.value.includes('error')) {
      openKeys.value = [...openKeys.value, 'error'];
    }
    if (
      (path.startsWith('/enterprise') ||
        path.startsWith('/projects') ||
        path.startsWith('/approvals')) &&
      !openKeys.value.includes('enterprise')
    ) {
      openKeys.value = [...openKeys.value, 'enterprise'];
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
  '/system/dept': '部门管理',
  '/system/dict': '字典管理',
  '/system/notice': '通知公告',
  '/system/config': '参数设置',
  '/monitor/online': '在线用户',
  '/monitor/server': '服务器监控',
  '/content/article': '文章管理',
  '/content/category': '分类管理',
  '/content/article/edit': '文章编辑',
  '/data': '数据业务',
  '/log/login': '登录日志',
  '/log/operation': '操作日志',
  '/log/error': '错误日志',
  '/settings': '系统设置',
  '/components': '组件展示',
  '/profile': '个人中心',
  '/about': '关于项目',
  '/user': '用户管理(旧)',
  '/role': '角色管理(旧)',
  '/projects': '项目管理',
  '/approvals': '审批',
  '/notifications': '我的通知',
  '/enterprise/organization': '组织信息',
  '/enterprise/tenants': '租户管理',
  '/enterprise/audit': '操作审计',
  '/enterprise/files': '文件管理',
  '/error/403': '403 禁止访问',
  '/error/404': '404 未找到',
  '/error/500': '500 服务错误',
};

function resolveTitle(path: string): string {
  if (ROUTE_TITLES[path]) return ROUTE_TITLES[path];
  if (/^\/system\/user\/\d+$/.test(path)) return '用户详情';
  if (/^\/content\/article\/\d+$/.test(path)) return '文章详情';
  if (/^\/system\/role\/\d+\/permission$/.test(path)) return '权限配置';
  if (/^\/projects\/\d+$/.test(path)) return '项目详情';
  if (path === '/content/article/edit') return '文章编辑';
  return '';
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

const isFullscreen = ref(false);
const notifications = ref<NotificationItem[]>([]);
const unreadCount = ref(0);

async function loadNotifications() {
  try {
    const [items, unread] = await Promise.all([
      api.notification.list(),
      api.notification.unreadCount(),
    ]);
    notifications.value = items;
    unreadCount.value = unread.count;
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function markNotificationRead(id: number) {
  try {
    await api.notification.read(id);
    await loadNotifications();
  } catch (error) {
    message.error((error as Error).message);
  }
}

onMounted(() => {
  loadNotifications();
  api.auth
    .me()
    .then((profile) => {
      permissions.value = profile.permissions;
      userStore.setUserInfo({ userId: String(profile.id) });
    })
    .catch((error: Error) => message.error(error.message));
});

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

async function handleLogout() {
  userStore.logout();
  message.success('已退出登录');
  tabs.value = [];
  await router.push('/login');
}
</script>

<template>
  <ALayout style="height: 100vh">
    <!-- Sider -->
    <ALayoutSider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      width="220"
      style="overflow: hidden"
      theme="dark"
    >
      <div
        class="h-16 flex items-center justify-center font-bold text-white text-base overflow-hidden px-4 select-none"
      >
        <span v-if="!collapsed">Fast Vue3</span>
        <span v-else>FV3</span>
      </div>
      <AMenu
        v-model:selected-keys="selectedKeys"
        :open-keys="openKeys"
        theme="dark"
        mode="inline"
        :style="{
          borderRight: 0,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }"
        @click="(e: any) => router.push(e.key)"
        @open-change="handleOpenChange"
      >
        <AMenuItem key="/home">
          <template #icon> <HomeOutlined /> </template>首页
        </AMenuItem>
        <AMenuItem key="/dashboard">
          <template #icon> <DashboardOutlined /> </template>仪表盘
        </AMenuItem>
        <AMenuItem key="/analytics">
          <template #icon> <BarChartOutlined /> </template>数据分析
        </AMenuItem>
        <ASubMenu key="system">
          <template #icon> <SettingOutlined /> </template>
          <template #title>系统管理</template>
          <AMenuItem key="/system/user">
            <template #icon> <UserOutlined /> </template>用户管理
          </AMenuItem>
          <AMenuItem key="/system/role">
            <template #icon> <LockOutlined /> </template>角色管理
          </AMenuItem>
          <AMenuItem key="/system/menu">
            <template #icon> <MenuOutlined /> </template>菜单管理
          </AMenuItem>
          <AMenuItem key="/system/dept">
            <template #icon> <ApartmentOutlined /> </template>部门管理
          </AMenuItem>
          <AMenuItem key="/system/dict">
            <template #icon> <BookOutlined /> </template>字典管理
          </AMenuItem>
          <AMenuItem key="/system/notice">
            <template #icon> <NotificationOutlined /> </template>通知公告
          </AMenuItem>
          <AMenuItem key="/system/config">
            <template #icon> <ControlOutlined /> </template>参数设置
          </AMenuItem>
        </ASubMenu>
        <ASubMenu
          v-if="
            hasPermission('project:list') ||
            hasPermission('approval:create') ||
            hasPermission('approval:action') ||
            hasPermission('department:list') ||
            hasPermission('file:upload')
          "
          key="enterprise"
        >
          <template #icon><ApartmentOutlined /></template>
          <template #title>企业协作</template>
          <AMenuItem v-if="hasPermission('project:list')" key="/projects">
            项目任务
          </AMenuItem>
          <AMenuItem
            v-if="
              hasPermission('approval:create') ||
              hasPermission('approval:action')
            "
            key="/approvals"
          >
            审批
          </AMenuItem>
          <AMenuItem
            v-if="hasPermission('department:list')"
            key="/enterprise/organization"
          >
            组织信息
          </AMenuItem>
          <AMenuItem
            v-if="userStore.isAdmin && hasPermission('tenant:list')"
            key="/enterprise/tenants"
          >
            租户管理
          </AMenuItem>
          <AMenuItem v-if="hasPermission('audit:view')" key="/enterprise/audit">
            操作审计
          </AMenuItem>
          <AMenuItem
            v-if="hasPermission('file:upload')"
            key="/enterprise/files"
          >
            文件上传
          </AMenuItem>
        </ASubMenu>
        <ASubMenu key="monitor">
          <template #icon> <DesktopOutlined /> </template>
          <template #title>系统监控</template>
          <AMenuItem key="/monitor/online">
            <template #icon> <TeamOutlined /> </template>在线用户
          </AMenuItem>
          <AMenuItem key="/monitor/server">
            <template #icon> <DashboardOutlined /> </template>服务器监控
          </AMenuItem>
        </ASubMenu>
        <ASubMenu key="content">
          <template #icon> <FileTextOutlined /> </template>
          <template #title>内容管理</template>
          <AMenuItem key="/content/article">
            <template #icon> <FileTextOutlined /> </template>文章管理
          </AMenuItem>
          <AMenuItem key="/content/category">
            <template #icon> <AppstoreOutlined /> </template>分类管理
          </AMenuItem>
        </ASubMenu>
        <AMenuItem key="/data">
          <template #icon> <BarChartOutlined /> </template>数据业务
        </AMenuItem>
        <ASubMenu key="log">
          <template #icon> <FileTextOutlined /> </template>
          <template #title>日志中心</template>
          <AMenuItem key="/log/login">登录日志</AMenuItem>
          <AMenuItem key="/log/operation">操作日志</AMenuItem>
          <AMenuItem key="/log/error">错误日志</AMenuItem>
        </ASubMenu>
        <AMenuItem key="/settings">
          <template #icon> <ToolOutlined /> </template>系统设置
        </AMenuItem>
        <AMenuItem key="/components">
          <template #icon> <AppstoreOutlined /> </template>组件展示
        </AMenuItem>
        <AMenuItem key="/profile">
          <template #icon> <UserOutlined /> </template>个人中心
        </AMenuItem>
        <AMenuItem key="/about">
          <template #icon> <InfoCircleOutlined /> </template>关于项目
        </AMenuItem>
        <ASubMenu key="error">
          <template #icon> <StopOutlined /> </template>
          <template #title>异常页</template>
          <AMenuItem key="/error/403">403 禁止访问</AMenuItem>
          <AMenuItem key="/error/404">404 未找到</AMenuItem>
          <AMenuItem key="/error/500">500 服务错误</AMenuItem>
        </ASubMenu>
      </AMenu>
    </ALayoutSider>

    <!-- Right side -->
    <ALayout style="display: flex; flex-direction: column; overflow: hidden">
      <!-- Header -->
      <ALayoutHeader
        style="
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          padding: 0 16px;
          line-height: 56px;
          background: #fff;
          box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        "
      >
        <div style="display: flex; gap: 12px; align-items: center">
          <component
            :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
            class="text-lg cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
            @click="collapsed = !collapsed"
          />
          <ABreadcrumb>
            <ABreadcrumbItem><HomeOutlined /></ABreadcrumbItem>
            <ABreadcrumbItem v-for="crumb in breadcrumbs" :key="crumb.path">
              {{ crumb.title }}
            </ABreadcrumbItem>
          </ABreadcrumb>
        </div>
        <div style="display: flex; gap: 4px; align-items: center">
          <!-- Notifications -->
          <ADropdown
            trigger="click"
            @open-change="(open: boolean) => open && loadNotifications()"
          >
            <ATooltip title="通知" placement="bottom">
              <div class="header-icon-btn">
                <ABadge :count="unreadCount" :offset="[-2, 2]">
                  <BellOutlined class="header-icon" />
                </ABadge>
              </div>
            </ATooltip>
            <template #overlay>
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
                  v-for="n in notifications.slice(0, 5)"
                  :key="n.id"
                  style="
                    padding: 12px 16px;
                    cursor: pointer;
                    border-bottom: 1px solid #f5f5f5;
                    transition: background 0.2s;
                  "
                  class="notification-item"
                  @click="markNotificationRead(n.id)"
                >
                  <div style="font-size: 0.9rem; color: #111827">
                    {{ n.title }}
                  </div>
                  <div
                    style="margin-top: 4px; font-size: 0.75rem; color: #9ca3af"
                  >
                    {{ n.createdAt }}{{ n.read ? '' : ' · 未读' }}
                  </div>
                </div>
                <div
                  v-if="notifications.length === 0"
                  style="padding: 12px 16px"
                >
                  暂无通知
                </div>
                <div
                  style="
                    padding: 10px;
                    font-size: 0.85rem;
                    color: #1677ff;
                    text-align: center;
                    cursor: pointer;
                  "
                  @click="router.push('/notifications')"
                >
                  查看全部
                </div>
              </div>
            </template>
          </ADropdown>

          <!-- Fullscreen -->
          <ATooltip
            :title="isFullscreen ? '退出全屏' : '全屏'"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="toggleFullscreen">
              <component
                :is="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
                class="header-icon"
              />
            </div>
          </ATooltip>

          <!-- Theme Toggle -->
          <ATooltip
            :title="isDark ? '亮色模式' : '暗色模式'"
            placement="bottom"
          >
            <div class="header-icon-btn" @click="toggleTheme">
              <BulbOutlined class="header-icon" />
            </div>
          </ATooltip>
        </div>
        <ADropdown>
          <div class="flex items-center gap-2 cursor-pointer select-none">
            <AAvatar :size="30" class="bg-blue-500 text-sm font-semibold">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </AAvatar>
            <span class="text-gray-700">{{ userStore.userName }}</span>
          </div>
          <template #overlay>
            <AMenu>
              <AMenuItem key="profile" @click="router.push('/profile')">
                个人中心
              </AMenuItem>
              <ADivider style="margin: 4px 0" />
              <AMenuItem key="logout" @click="handleLogout">
                退出登录
              </AMenuItem>
            </AMenu>
          </template>
        </ADropdown>
      </ALayoutHeader>

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
          border-bottom: 1px solid #f0f0f0;
        "
      >
        <ATag
          v-for="tab in tabs"
          :key="tab.path"
          :color="tab.path === route.path ? 'blue' : undefined"
          closable
          style="margin: 0 2px; cursor: pointer; user-select: none"
          @click="router.push(tab.path)"
          @close.stop="closeTab(tab.path)"
        >
          {{ tab.title }}
        </ATag>
      </div>

      <!-- Content -->
      <ALayoutContent
        style="
          flex: 1;
          min-height: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f5f6fa;
        "
      >
        <RouterView />
      </ALayoutContent>
    </ALayout>
  </ALayout>
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
</style>
