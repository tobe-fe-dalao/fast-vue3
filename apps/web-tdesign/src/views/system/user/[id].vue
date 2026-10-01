<script setup lang="ts">
import type { TagProps } from 'tdesign-vue-next';

import { http } from '@/api/http';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

interface UserRecord {
  id: number;
  username: string;
  realName: string;
  email: string;
  phone: string;
  roles: string[];
  status: string;
  department: string;
  createdAt: string;
}

interface Activity {
  time: string;
  action: string;
  ip: string;
}

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const user = ref<null | UserRecord>(null);
const activities = ref<Activity[]>([]);

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];
const roleThemeMap: Record<string, TagProps['theme']> = {
  admin: 'primary',
  editor: 'success',
  user: 'default',
  guest: 'warning',
};

const roleLabel = (value: string) =>
  roleOptions.find((r) => r.value === value)?.label ?? value;

const isActive = computed(() => user.value?.status === 'active');

async function fetchUser() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const found = await http.get<UserRecord>({ url: `/users/${id}` });
    user.value = found;
    if (found) {
      activities.value = [
        { time: found.createdAt, action: '创建账户', ip: '127.0.0.1' },
        { time: '2026-08-10 09:24:11', action: '登录系统', ip: '192.168.1.20' },
        {
          time: '2026-08-09 14:02:33',
          action: '修改个人资料',
          ip: '192.168.1.20',
        },
        { time: '2026-08-08 21:45:09', action: '切换角色权限', ip: '10.0.0.5' },
      ];
    }
  } catch {
    MessagePlugin.error('加载用户详情失败');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  MessagePlugin.info('请在用户列表中点击「编辑」');
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    MessagePlugin.success(`已${status === 'active' ? '启用' : '禁用'}该用户`);
  } catch {
    MessagePlugin.error('状态更新失败');
  }
}

const columns = [
  { title: '操作时间', colKey: 'time', width: 180 },
  { title: '操作内容', colKey: 'action' },
  { title: 'IP 地址', colKey: 'ip', width: 140 },
];

onMounted(fetchUser);
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      "
    >
      <div class="mb-4" style="display: flex; gap: 12px; align-items: center">
        <t-button
          aria-label="返回"
          theme="default"
          variant="text"
          shape="square"
          @click="goBack"
        >
          <ChevronLeftIcon />
        </t-button>
      </div>
      <t-space>
        <t-button @click="goEdit">编辑</t-button>
        <t-button
          v-if="user"
          :theme="isActive ? 'danger' : 'primary'"
          @click="toggleStatus"
        >
          {{ isActive ? '禁用' : '启用' }}
        </t-button>
      </t-space>
    </div>

    <t-loading :loading="loading" size="large" show-overlay>
      <t-empty
        v-if="!user && !loading"
        description="未找到该用户"
        style="padding: 64px 0"
      />
      <template v-else-if="user">
        <t-row :gutter="16">
          <!-- Main -->
          <t-col :span="16">
            <t-card
              title="基本信息"
              :bordered="false"
              style="margin-bottom: 16px"
            >
              <t-descriptions :column="2" bordered>
                <t-descriptions-item label="用户 ID">
                  {{ user.id }}
                </t-descriptions-item>
                <t-descriptions-item label="用户名">
                  {{ user.username }}
                </t-descriptions-item>
                <t-descriptions-item label="姓名">
                  {{ user.realName }}
                </t-descriptions-item>
                <t-descriptions-item label="部门">
                  {{ user.department }}
                </t-descriptions-item>
                <t-descriptions-item label="邮箱">
                  {{ user.email }}
                </t-descriptions-item>
                <t-descriptions-item label="手机号">
                  {{ user.phone }}
                </t-descriptions-item>
                <t-descriptions-item label="注册时间">
                  {{ user.createdAt }}
                </t-descriptions-item>
                <t-descriptions-item label="状态">
                  <t-tag :theme="isActive ? 'success' : 'default'" size="small">
                    {{ isActive ? '启用' : '禁用' }}
                  </t-tag>
                </t-descriptions-item>
              </t-descriptions>
            </t-card>

            <t-card title="最近活动" :bordered="false">
              <t-table
                :data="activities"
                :columns="columns"
                row-key="time"
                size="medium"
                stripe
              />
            </t-card>
          </t-col>

          <!-- Side -->
          <t-col :span="8">
            <t-card :bordered="false" style="margin-bottom: 16px">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: center;
                "
              >
                <t-avatar
                  size="72px"
                  style="font-size: 28px; background: #0052d9"
                >
                  {{ user.realName?.charAt(0)?.toUpperCase() }}
                </t-avatar>
                <div style="text-align: center">
                  <div style="font-size: 18px; font-weight: 700">
                    {{ user.realName }}
                  </div>
                  <div style="font-size: 14px; color: #9ca3af">
                    @{{ user.username }}
                  </div>
                </div>
              </div>
            </t-card>

            <t-card
              title="角色与权限"
              :bordered="false"
              style="margin-bottom: 16px"
            >
              <div style="margin-bottom: 8px; font-size: 14px; color: #9ca3af">
                当前用户所属角色
              </div>
              <t-space break-line>
                <t-tag
                  v-for="role in user.roles"
                  :key="role"
                  :theme="roleThemeMap[role] || 'default'"
                >
                  {{ roleLabel(role) }}
                </t-tag>
              </t-space>
            </t-card>

            <t-card title="账户状态" :bordered="false">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">登录状态</span>
                <t-tag theme="success" size="small">在线</t-tag>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">账户状态</span>
                <t-tag :theme="isActive ? 'success' : 'default'" size="small">
                  {{ isActive ? '正常' : '已禁用' }}
                </t-tag>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">双因素认证</span>
                <t-tag theme="warning" size="small">未开启</t-tag>
              </div>
            </t-card>
          </t-col>
        </t-row>
      </template>
    </t-loading>
  </div>
</template>
