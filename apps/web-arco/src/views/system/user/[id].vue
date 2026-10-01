<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';
import {
  IconArrowLeft,
  IconCheckCircle,
  IconEdit,
  IconStop,
} from '@arco-design/web-vue/es/icon';

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
const roleColorMap: Record<string, string> = {
  admin: 'arcoblue',
  editor: 'green',
  user: 'gray',
  guest: 'gray',
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
    Message.error('加载用户详情失败');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  Message.info('请在用户列表中点击「编辑」');
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    Message.success(`已${status === 'active' ? '启用' : '禁用'}该用户`);
  } catch {
    Message.error('状态更新失败');
  }
}

const columns = [
  { title: '操作时间', dataIndex: 'time', width: 180 },
  { title: '操作内容', dataIndex: 'action' },
  { title: 'IP 地址', dataIndex: 'ip', width: 140 },
];

onMounted(fetchUser);
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 flex items-center gap-3">
        <a-button aria-label="返回" type="text" class="!p-1" @click="goBack">
          <template #icon><IconArrowLeft /></template>
        </a-button>
      </div>
      <a-space>
        <a-button @click="goEdit">
          <template #icon><IconEdit /></template>编辑
        </a-button>
        <a-button
          v-if="user"
          :status="isActive ? 'danger' : 'normal'"
          @click="toggleStatus"
        >
          <template #icon>
            <IconStop v-if="isActive" />
            <IconCheckCircle v-else />
          </template>
          {{ isActive ? '禁用' : '启用' }}
        </a-button>
      </a-space>
    </div>

    <a-spin :loading="loading">
      <a-empty
        v-if="!user && !loading"
        description="未找到该用户"
        class="py-16"
      />
      <template v-if="user">
        <a-row :gutter="16">
          <!-- Main -->
          <a-col :span="16">
            <a-card title="基本信息" :bordered="false" class="mb-4">
              <a-descriptions :column="2" bordered size="small">
                <a-descriptions-item label="用户 ID">
                  {{ user.id }}
                </a-descriptions-item>
                <a-descriptions-item label="用户名">
                  {{ user.username }}
                </a-descriptions-item>
                <a-descriptions-item label="姓名">
                  {{ user.realName }}
                </a-descriptions-item>
                <a-descriptions-item label="部门">
                  {{ user.department }}
                </a-descriptions-item>
                <a-descriptions-item label="邮箱">
                  {{ user.email }}
                </a-descriptions-item>
                <a-descriptions-item label="手机号">
                  {{ user.phone }}
                </a-descriptions-item>
                <a-descriptions-item label="注册时间">
                  {{ user.createdAt }}
                </a-descriptions-item>
                <a-descriptions-item label="状态">
                  <a-tag :color="isActive ? 'green' : 'gray'" size="small">
                    {{ isActive ? '启用' : '禁用' }}
                  </a-tag>
                </a-descriptions-item>
              </a-descriptions>
            </a-card>

            <a-card title="最近活动" :bordered="false">
              <a-table
                :data="activities"
                :columns="columns"
                :pagination="false"
                size="medium"
                row-key="time"
              />
            </a-card>
          </a-col>

          <!-- Side -->
          <a-col :span="8">
            <a-card :bordered="false" class="mb-4">
              <div class="flex flex-col items-center gap-3">
                <a-avatar
                  :size="72"
                  style="font-size: 28px; background: #165dff"
                >
                  {{ user.realName?.charAt(0)?.toUpperCase() }}
                </a-avatar>
                <div class="text-center">
                  <div style="font-size: 1.125rem; font-weight: 700">
                    {{ user.realName }}
                  </div>
                  <div style="font-size: 0.875rem; color: #86909c">
                    @{{ user.username }}
                  </div>
                </div>
              </div>
            </a-card>

            <a-card title="角色与权限" :bordered="false" class="mb-4">
              <div
                style="margin-bottom: 8px; font-size: 0.875rem; color: #86909c"
              >
                当前用户所属角色
              </div>
              <a-space wrap>
                <a-tag
                  v-for="role in user.roles"
                  :key="role"
                  :color="roleColorMap[role] || 'gray'"
                >
                  {{ roleLabel(role) }}
                </a-tag>
              </a-space>
            </a-card>

            <a-card title="账户状态" :bordered="false">
              <div class="flex items-center justify-between py-1">
                <span style="color: #86909c">登录状态</span>
                <a-tag color="green" size="small">在线</a-tag>
              </div>
              <div class="flex items-center justify-between py-1">
                <span style="color: #86909c">账户状态</span>
                <a-tag :color="isActive ? 'green' : 'gray'" size="small">
                  {{ isActive ? '正常' : '已禁用' }}
                </a-tag>
              </div>
              <div class="flex items-center justify-between py-1">
                <span style="color: #86909c">双因素认证</span>
                <a-tag color="orange" size="small">未开启</a-tag>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </template>
    </a-spin>
  </div>
</template>
