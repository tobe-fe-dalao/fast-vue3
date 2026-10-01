<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { api } from '@/api';
import {
  NButton,
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NSpin,
  NTree,
  useMessage,
} from 'naive-ui';

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
}

const route = useRoute();
const router = useRouter();
const message = useMessage();

const loading = ref(true);
const saving = ref(false);
const role = ref<null | RoleRecord>(null);
const checkedKeys = ref<string[]>([]);
const availablePermissions = ref<PermissionItem[]>([]);

const permissionTree = [
  {
    label: '仪表盘',
    key: 'dashboard',
    children: [{ label: '查看', key: 'dashboard:view' }],
  },
  {
    label: '用户管理',
    key: 'user',
    children: [
      { label: '查看', key: 'user:list' },
      { label: '新增', key: 'user:create' },
      { label: '编辑', key: 'user:update' },
      { label: '删除', key: 'user:delete' },
    ],
  },
  {
    label: '角色管理',
    key: 'role',
    children: [
      { label: '查看', key: 'role:list' },
      { label: '配置权限', key: 'role:permission' },
    ],
  },
  {
    label: '菜单管理',
    key: 'menu',
    children: [{ label: '查看', key: 'menu:list' }],
  },
  {
    label: '内容管理',
    key: 'content',
    children: [
      { label: '查看', key: 'content:list' },
      { label: '编辑', key: 'content:update' },
    ],
  },
  {
    label: '日志中心',
    key: 'log',
    children: [{ label: '查看', key: 'log:view' }],
  },
  {
    label: '系统设置',
    key: 'settings',
    children: [{ label: '查看', key: 'settings:view' }],
  },
];

async function fetchRole() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const [found, permissions] = await Promise.all([
      api.role.detail(id),
      api.permission.list(),
    ]);
    availablePermissions.value = permissions;
    role.value = {
      ...found,
      description: found.description ?? '',
      status: 'active',
    };
    checkedKeys.value = found.permissions.includes('*')
      ? permissions.map(({ code }) => code)
      : [...found.permissions];
  } catch {
    message.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

async function handleSave() {
  if (!role.value) return;
  saving.value = true;
  try {
    const selected = new Set(checkedKeys.value);
    const permissionIds = availablePermissions.value
      .filter(({ code }) => selected.has(code))
      .map(({ id }) => id);
    await api.role.update(role.value.id, { permissionIds });
    message.success(
      `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    );
  } catch {
    message.error('权限配置保存失败');
  } finally {
    saving.value = false;
  }
}

function goBack() {
  router.push('/system/role');
}

onMounted(fetchRole);
</script>

<template>
  <div class="admin-page">
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
      <NButton type="primary" :loading="saving" @click="handleSave">
        保存配置
      </NButton>
    </div>

    <NSpin :show="loading">
      <div style="display: flex; flex-wrap: wrap; gap: 16px">
        <div style="flex: 1 1 30%; min-width: 260px">
          <NCard v-if="role">
            <NDescriptions :column="1" label-placement="left" bordered>
              <NDescriptionsItem label="角色名称">
                {{ role.name }}
              </NDescriptionsItem>
              <NDescriptionsItem label="角色标识">
                {{ role.code }}
              </NDescriptionsItem>
              <NDescriptionsItem label="状态">
                <NTag
                  :type="role.status === 'active' ? 'success' : 'default'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </NTag>
              </NDescriptionsItem>
              <NDescriptionsItem label="描述">
                {{ role.description }}
              </NDescriptionsItem>
            </NDescriptions>
          </NCard>
        </div>
        <div style="flex: 1 1 60%; min-width: 320px">
          <NCard title="权限分配">
            <template #header-extra>
              <NTag type="primary">已选 {{ selectedCount }} 项</NTag>
            </template>
            <NTree
              :data="permissionTree"
              checkable
              :default-expand-all="true"
              v-model:checked-keys="checkedKeys"
            />
          </NCard>
        </div>
      </div>
    </NSpin>
  </div>
</template>
