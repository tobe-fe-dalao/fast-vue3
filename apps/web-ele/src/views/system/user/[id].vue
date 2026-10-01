<script setup lang="ts">
import { http } from '@/api/http';
import {
  ArrowLeft,
  CircleCheck,
  CircleClose,
  Edit,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
    ElMessage.error('加载用户详情失败');
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  ElMessage.info('请在用户列表中点击「编辑」');
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    ElMessage.success(`已${status === 'active' ? '启用' : '禁用'}该用户`);
  } catch {
    ElMessage.error('状态更新失败');
  }
}

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
        <el-button text :icon="ArrowLeft" @click="goBack"> 返回 </el-button>
      </div>
      <div style="display: flex; gap: 8px">
        <el-button :icon="Edit" @click="goEdit">编辑</el-button>
        <el-button
          v-if="user"
          :type="isActive ? 'danger' : 'success'"
          :icon="isActive ? CircleClose : CircleCheck"
          @click="toggleStatus"
        >
          {{ isActive ? '禁用' : '启用' }}
        </el-button>
      </div>
    </div>

    <div v-loading="loading">
      <el-empty
        v-if="!user && !loading"
        description="未找到该用户"
        style="padding: 64px 0"
      />
      <template v-if="user">
        <el-row :gutter="16">
          <!-- Main -->
          <el-col :span="16">
            <el-card shadow="never" class="mb-4">
              <el-descriptions title="基本信息" :column="2" border>
                <el-descriptions-item label="用户 ID">
                  {{ user.id }}
                </el-descriptions-item>
                <el-descriptions-item label="用户名">
                  {{ user.username }}
                </el-descriptions-item>
                <el-descriptions-item label="姓名">
                  {{ user.realName }}
                </el-descriptions-item>
                <el-descriptions-item label="部门">
                  {{ user.department }}
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  {{ user.email }}
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                  {{ user.phone }}
                </el-descriptions-item>
                <el-descriptions-item label="注册时间">
                  {{ user.createdAt }}
                </el-descriptions-item>
                <el-descriptions-item label="状态">
                  <el-tag :type="isActive ? 'success' : 'info'" size="small">
                    {{ isActive ? '启用' : '禁用' }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </el-card>

            <el-card shadow="never" title="最近活动">
              <el-table :data="activities" style="width: 100%">
                <el-table-column prop="time" label="操作时间" width="180" />
                <el-table-column prop="action" label="操作内容" />
                <el-table-column prop="ip" label="IP 地址" width="140" />
              </el-table>
            </el-card>
          </el-col>

          <!-- Side -->
          <el-col :span="8">
            <el-card shadow="never" class="mb-4">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: center;
                "
              >
                <el-avatar
                  :size="72"
                  style="font-size: 28px; color: #fff; background: #3b82f6"
                >
                  {{ user.realName?.charAt(0)?.toUpperCase() }}
                </el-avatar>
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
            </el-card>

            <el-card shadow="never" class="mb-4">
              <div style="margin-bottom: 8px; font-size: 13px; color: #9ca3af">
                当前用户所属角色
              </div>
              <el-space wrap>
                <el-tag v-for="role in user.roles" :key="role" size="small">
                  {{ roleLabel(role) }}
                </el-tag>
              </el-space>
            </el-card>

            <el-card shadow="never">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">登录状态</span>
                <el-tag type="success" size="small">在线</el-tag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">账户状态</span>
                <el-tag :type="isActive ? 'success' : 'info'" size="small">
                  {{ isActive ? '正常' : '已禁用' }}
                </el-tag>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 4px 0;
                "
              >
                <span style="color: #9ca3af">双因素认证</span>
                <el-tag type="warning" size="small">未开启</el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>
