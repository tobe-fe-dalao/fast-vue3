<script setup lang="ts">
import { http } from '@/api/http';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EditOutlined,
  StopOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

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
  admin: 'blue',
  editor: 'green',
  user: 'default',
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
        <AButton aria-label="返回" type="text" class="!p-1" @click="goBack">
          <ArrowLeftOutlined class="text-lg" />
        </AButton>
      </div>
      <ASpace>
        <AButton @click="goEdit"> <EditOutlined />编辑 </AButton>
        <AButton v-if="user" :danger="isActive" @click="toggleStatus">
          <StopOutlined v-if="isActive" /><CheckCircleOutlined v-else />
          {{ isActive ? '禁用' : '启用' }}
        </AButton>
      </ASpace>
    </div>

    <ASpin :spinning="loading">
      <AEmpty
        v-if="!user && !loading"
        description="未找到该用户"
        class="py-16"
      />
      <template v-if="user">
        <ARow :gutter="16">
          <!-- Main -->
          <ACol :span="16">
            <ACard title="基本信息" :bordered="false" class="mb-4 shadow-sm">
              <ADescriptions :column="2" bordered size="small">
                <ADescriptionsItem label="用户 ID">
                  {{ user.id }}
                </ADescriptionsItem>
                <ADescriptionsItem label="用户名">
                  {{ user.username }}
                </ADescriptionsItem>
                <ADescriptionsItem label="姓名">
                  {{ user.realName }}
                </ADescriptionsItem>
                <ADescriptionsItem label="部门">
                  {{ user.department }}
                </ADescriptionsItem>
                <ADescriptionsItem label="邮箱">
                  {{ user.email }}
                </ADescriptionsItem>
                <ADescriptionsItem label="手机号">
                  {{ user.phone }}
                </ADescriptionsItem>
                <ADescriptionsItem label="注册时间">
                  {{ user.createdAt }}
                </ADescriptionsItem>
                <ADescriptionsItem label="状态">
                  <ABadge
                    :status="isActive ? 'success' : 'default'"
                    :text="isActive ? '启用' : '禁用'"
                  />
                </ADescriptionsItem>
              </ADescriptions>
            </ACard>

            <ACard title="最近活动" :bordered="false" class="shadow-sm">
              <ATable
                :data-source="activities"
                :columns="columns"
                :pagination="false"
                size="middle"
                row-key="time"
              />
            </ACard>
          </ACol>

          <!-- Side -->
          <ACol :span="8">
            <ACard :bordered="false" class="mb-4 shadow-sm">
              <div class="flex flex-col items-center gap-3">
                <AAvatar :size="72" class="bg-blue-500 text-2xl">
                  {{ user.realName?.charAt(0)?.toUpperCase() }}
                </AAvatar>
                <div class="text-center">
                  <div class="text-lg font-bold">
                    {{ user.realName }}
                  </div>
                  <div class="text-gray-500 text-sm">@{{ user.username }}</div>
                </div>
              </div>
            </ACard>

            <ACard title="角色与权限" :bordered="false" class="mb-4 shadow-sm">
              <div class="mb-2 text-gray-500 text-sm">当前用户所属角色</div>
              <ASpace wrap>
                <ATag
                  v-for="role in user.roles"
                  :key="role"
                  :color="roleColorMap[role] || 'default'"
                >
                  {{ roleLabel(role) }}
                </ATag>
              </ASpace>
            </ACard>

            <ACard title="账户状态" :bordered="false" class="shadow-sm">
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-500">登录状态</span>
                <ABadge status="success" text="在线" />
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-500">账户状态</span>
                <ABadge
                  :status="isActive ? 'success' : 'default'"
                  :text="isActive ? '正常' : '已禁用'"
                />
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-500">双因素认证</span>
                <ATag color="orange">未开启</ATag>
              </div>
            </ACard>
          </ACol>
        </ARow>
      </template>
    </ASpin>
  </div>
</template>
