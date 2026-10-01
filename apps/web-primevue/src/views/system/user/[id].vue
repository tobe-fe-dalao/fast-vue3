<script setup lang="ts">
import { http } from '@/api/http';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

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
const toast = useToast();

const loading = ref(true);
const user = ref<null | UserRecord>(null);
const activities = ref<Activity[]>([]);

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];
const roleSeverityMap: Record<
  string,
  'danger' | 'info' | 'secondary' | 'success' | 'warn'
> = {
  admin: 'info',
  editor: 'success',
  user: 'secondary',
  guest: 'warn',
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
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载用户详情失败',
    });
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.push('/system/user');
}

function goEdit() {
  router.push('/system/user');
  toast.add({
    severity: 'info',
    summary: '提示',
    detail: '请在用户列表中点击「编辑」',
  });
}

async function toggleStatus() {
  if (!user.value) return;
  const status = isActive.value ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${user.value.id}` });
    user.value.status = status;
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: `已${status === 'active' ? '启用' : '禁用'}该用户`,
    });
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '状态更新失败' });
  }
}

const columns = [
  { field: 'time', header: '操作时间', style: { width: '180px' } },
  { field: 'action', header: '操作内容' },
  { field: 'ip', header: 'IP 地址', style: { width: '140px' } },
];

onMounted(fetchUser);
</script>

<template>
  <div class="admin-page">
    <Toast />

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
        <Button
          icon="pi pi-arrow-left"
          text
          rounded
          aria-label="返回"
          @click="goBack"
        />
      </div>
      <div style="display: flex; gap: 8px">
        <Button label="编辑" icon="pi pi-pencil" @click="goEdit" />
        <Button
          v-if="user"
          :label="isActive ? '禁用' : '启用'"
          :icon="isActive ? 'pi pi-ban' : 'pi pi-check-circle'"
          :severity="isActive ? 'danger' : 'secondary'"
          @click="toggleStatus"
        />
      </div>
    </div>

    <ProgressSpinner
      v-if="loading"
      style="display: block; width: 50px; height: 50px; margin: 80px auto"
      stroke-width="4"
    />

    <div
      v-else-if="!user"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 0;
        color: #9ca3af;
      "
    >
      <i
        class="pi pi-user"
        style="margin-bottom: 12px; font-size: 48px; opacity: 0.4"
      ></i>
      <div style="font-size: 14px">未找到该用户</div>
    </div>

    <template v-else>
      <div
        style="
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: flex-start;
        "
      >
        <!-- Main -->
        <div style="flex: 1 1 60%; min-width: 320px">
          <Card style="margin-bottom: 16px">
            <template #title>基本信息</template>
            <template #content>
              <div class="info-grid">
                <div class="info-row">
                  <span class="info-label">用户 ID</span
                  ><span class="info-value">{{ user.id }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">用户名</span
                  ><span class="info-value">{{ user.username }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">姓名</span
                  ><span class="info-value">{{ user.realName }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">部门</span
                  ><span class="info-value">{{ user.department }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">邮箱</span
                  ><span class="info-value">{{ user.email }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">手机号</span
                  ><span class="info-value">{{ user.phone }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">注册时间</span
                  ><span class="info-value">{{ user.createdAt }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">状态</span>
                  <span class="info-value">
                    <Tag
                      :value="isActive ? '启用' : '禁用'"
                      :severity="isActive ? 'success' : 'secondary'"
                    />
                  </span>
                </div>
              </div>
            </template>
          </Card>

          <Card>
            <template #title>最近活动</template>
            <template #content>
              <DataTable
                :value="activities"
                data-key="time"
                size="small"
                striped-rows
              >
                <Column
                  v-for="col in columns"
                  :key="col.field"
                  :field="col.field"
                  :header="col.header"
                  :style="col.style"
                />
              </DataTable>
            </template>
          </Card>
        </div>

        <!-- Side -->
        <div style="flex: 1 1 30%; min-width: 260px">
          <Card style="margin-bottom: 16px">
            <template #content>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                  align-items: center;
                "
              >
                <Avatar
                  :label="user.realName?.charAt(0)?.toUpperCase()"
                  style="
                    width: 72px;
                    height: 72px;
                    font-size: 28px;
                    color: #fff;
                    background: #3b82f6;
                  "
                />
                <div style="text-align: center">
                  <div style="font-size: 18px; font-weight: 700">
                    {{ user.realName }}
                  </div>
                  <div style="font-size: 14px; color: #6b7280">
                    @{{ user.username }}
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <Card style="margin-bottom: 16px">
            <template #title>角色与权限</template>
            <template #content>
              <div style="margin-bottom: 8px; font-size: 14px; color: #9ca3af">
                当前用户所属角色
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px">
                <Tag
                  v-for="role in user.roles"
                  :key="role"
                  :value="roleLabel(role)"
                  :severity="roleSeverityMap[role] ?? 'secondary'"
                />
              </div>
            </template>
          </Card>

          <Card>
            <template #title>账户状态</template>
            <template #content>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 6px 0;
                "
              >
                <span style="font-size: 14px; color: #9ca3af">登录状态</span>
                <Tag value="在线" severity="success" />
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 6px 0;
                "
              >
                <span style="font-size: 14px; color: #9ca3af">账户状态</span>
                <Tag
                  :value="isActive ? '正常' : '已禁用'"
                  :severity="isActive ? 'success' : 'secondary'"
                />
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 6px 0;
                "
              >
                <span style="font-size: 14px; color: #9ca3af">双因素认证</span>
                <Tag value="未开启" severity="warn" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.info-row {
  display: flex;
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  flex-shrink: 0;
  width: 92px;
  font-size: 14px;
  color: #9ca3af;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #111827;
}
</style>
