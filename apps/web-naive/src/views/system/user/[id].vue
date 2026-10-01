<script setup lang="ts">
import { http } from '@/api/http';
import {
  NAvatar,
  NButton,
  NCard,
  NDataTable,
  NDescriptions,
  NDescriptionsItem,
  NEmpty,
  NSpin,
  NTag,
  useMessage,
} from 'naive-ui';

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
const message = useMessage();

const loading = ref(true);
const user = ref<null | UserRecord>(null);
const activities = ref<Activity[]>([]);

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];
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
    message.error('加载用户详情失败');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  message.info('请在用户列表中点击「编辑」');
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    message.success(`已${status === 'active' ? '启用' : '禁用'}该用户`);
  } catch {
    message.error('状态更新失败');
  }
}

const activityColumns = [
  { title: '操作时间', key: 'time', width: 180 },
  { title: '操作内容', key: 'action' },
  { title: 'IP 地址', key: 'ip', width: 140 },
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
        <NButton aria-label="返回" text @click="goBack">← 返回</NButton>
      </div>
      <div style="display: flex; gap: 8px">
        <NButton @click="goEdit">编辑</NButton>
        <NButton
          v-if="user"
          :type="isActive ? 'warning' : 'success'"
          @click="toggleStatus"
        >
          {{ isActive ? '禁用' : '启用' }}
        </NButton>
      </div>
    </div>

    <NSpin :show="loading">
      <NEmpty
        v-if="!user && !loading"
        description="未找到该用户"
        style="padding: 64px 0"
      />
      <template v-if="user">
        <div style="display: flex; flex-wrap: wrap; gap: 16px">
          <!-- Main -->
          <div style="flex: 1 1 60%; min-width: 320px">
            <NCard title="基本信息" style="margin-bottom: 16px">
              <NDescriptions :column="2" label-placement="left" bordered>
                <NDescriptionsItem label="用户 ID">
                  {{ user.id }}
                </NDescriptionsItem>
                <NDescriptionsItem label="用户名">
                  {{ user.username }}
                </NDescriptionsItem>
                <NDescriptionsItem label="姓名">
                  {{ user.realName }}
                </NDescriptionsItem>
                <NDescriptionsItem label="部门">
                  {{ user.department }}
                </NDescriptionsItem>
                <NDescriptionsItem label="邮箱">
                  {{ user.email }}
                </NDescriptionsItem>
                <NDescriptionsItem label="手机号">
                  {{ user.phone }}
                </NDescriptionsItem>
                <NDescriptionsItem label="注册时间">
                  {{ user.createdAt }}
                </NDescriptionsItem>
                <NDescriptionsItem label="状态">
                  <NTag :type="isActive ? 'success' : 'default'" size="small">
                    {{ isActive ? '启用' : '禁用' }}
                  </NTag>
                </NDescriptionsItem>
              </NDescriptions>
            </NCard>
            <NCard title="最近活动">
              <NDataTable
                :columns="activityColumns"
                :data="activities"
                :pagination="false"
                size="small"
              />
            </NCard>
          </div>

          <!-- Side -->
          <div style="flex: 1 1 30%; min-width: 260px">
            <NCard style="margin-bottom: 16px">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: center;
                "
              >
                <NAvatar
                  :size="72"
                  style="font-size: 28px; color: #fff; background: #3b82f6"
                >
                  {{ user.realName?.charAt(0)?.toUpperCase() }}
                </NAvatar>
                <div style="text-align: center">
                  <div
                    style="font-size: 18px; font-weight: 700; color: #111827"
                  >
                    {{ user.realName }}
                  </div>
                  <div style="font-size: 13px; color: #9ca3af">
                    @{{ user.username }}
                  </div>
                </div>
              </div>
            </NCard>

            <NCard title="角色与权限" style="margin-bottom: 16px">
              <div style="margin-bottom: 8px; font-size: 13px; color: #9ca3af">
                当前用户所属角色
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px">
                <NTag v-for="role in user.roles" :key="role" size="small">
                  {{ roleLabel(role) }}
                </NTag>
              </div>
            </NCard>

            <NCard title="账户状态">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">登录状态</span>
                <NTag type="success" size="small">在线</NTag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">账户状态</span>
                <NTag :type="isActive ? 'success' : 'default'" size="small">
                  {{ isActive ? '正常' : '已禁用' }}
                </NTag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">双因素认证</span>
                <NTag type="warning" size="small">未开启</NTag>
              </div>
            </NCard>
          </div>
        </div>
      </template>
    </NSpin>
  </div>
</template>
