<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const {
  success: messageSuccess,
  info: messageInfo,
  error: messageError,
} = useMessage();

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
  editor: 'success',
  user: 'default',
  guest: 'default',
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
    messageError('加载用户详情失败');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  messageInfo('请在用户列表中点击「编辑」');
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    messageSuccess(`已${status === 'active' ? '启用' : '禁用'}该用户`);
  } catch {
    messageError('状态更新失败');
  }
}

const activityColumns = [
  { title: '操作时间', dataKey: 'time', width: 180 },
  { title: '操作内容', dataKey: 'action' },
  { title: 'IP 地址', dataKey: 'ip', width: 140 },
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
        <IxButton mode="text" @click="goBack"> ← 返回 </IxButton>
      </div>
      <div style="display: flex; gap: 8px">
        <IxButton mode="primary" @click="goEdit">编辑</IxButton>
        <IxButton v-if="user" :danger="isActive" @click="toggleStatus">
          {{ isActive ? '禁用' : '启用' }}
        </IxButton>
      </div>
    </div>

    <IxSpin :spinning="loading">
      <IxEmpty
        v-if="!user && !loading"
        description="未找到该用户"
        style="padding: 64px 0"
      />
      <template v-if="user">
        <IxRow :gutter="16">
          <!-- Main -->
          <IxCol :span="16">
            <IxCard title="基本信息" shadow="never" style="margin-bottom: 16px">
              <IxDesc>
                <IxDescItem label="用户 ID">{{ user.id }}</IxDescItem>
                <IxDescItem label="用户名">{{ user.username }}</IxDescItem>
                <IxDescItem label="姓名">{{ user.realName }}</IxDescItem>
                <IxDescItem label="部门">{{ user.department }}</IxDescItem>
                <IxDescItem label="邮箱">{{ user.email }}</IxDescItem>
                <IxDescItem label="手机号">{{ user.phone }}</IxDescItem>
                <IxDescItem label="注册时间">{{ user.createdAt }}</IxDescItem>
                <IxDescItem label="状态">
                  <IxTag :color="isActive ? 'success' : 'default'">
                    {{ isActive ? '启用' : '禁用' }}
                  </IxTag>
                </IxDescItem>
              </IxDesc>
            </IxCard>

            <IxCard title="最近活动" shadow="never">
              <IxTable
                :columns="activityColumns"
                :data-source="activities"
                :pagination="false"
                :borderless="false"
                stripe
              />
            </IxCard>
          </IxCol>

          <!-- Side -->
          <IxCol :span="8">
            <IxCard shadow="never" style="margin-bottom: 16px">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: center;
                "
              >
                <IxAvatar
                  :text="user.realName?.charAt(0)?.toUpperCase()"
                  size="lg"
                  style="
                    font-size: 24px;
                    font-weight: 600;
                    color: #fff;
                    background: #3b82f6;
                  "
                />
                <div style="text-align: center">
                  <div style="font-size: 18px; font-weight: 700">
                    {{ user.realName }}
                  </div>
                  <div style="font-size: 14px; color: #9ca3af">
                    @{{ user.username }}
                  </div>
                </div>
              </div>
            </IxCard>

            <IxCard
              title="角色与权限"
              shadow="never"
              style="margin-bottom: 16px"
            >
              <div style="margin-bottom: 8px; font-size: 14px; color: #9ca3af">
                当前用户所属角色
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px">
                <IxTag
                  v-for="role in user.roles"
                  :key="role"
                  :color="roleColorMap[role] || 'default'"
                >
                  {{ roleLabel(role) }}
                </IxTag>
              </div>
            </IxCard>

            <IxCard title="账户状态" shadow="never">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 8px 0;
                "
              >
                <span style="color: #9ca3af">登录状态</span>
                <IxTag color="success">在线</IxTag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 8px 0;
                "
              >
                <span style="color: #9ca3af">账户状态</span>
                <IxTag :color="isActive ? 'success' : 'default'">
                  {{ isActive ? '正常' : '已禁用' }}
                </IxTag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 8px 0;
                "
              >
                <span style="color: #9ca3af">双因素认证</span>
                <IxTag color="warning">未开启</IxTag>
              </div>
            </IxCard>
          </IxCol>
        </IxRow>
      </template>
    </IxSpin>
  </div>
</template>
