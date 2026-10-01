<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { api } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconArrowLeft, IconSave } from '@arco-design/web-vue/es/icon';

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

const loading = ref(true);
const saving = ref(false);
const role = ref<null | RoleRecord>(null);
const checkedKeys = ref<string[]>([]);
const availablePermissions = ref<PermissionItem[]>([]);

const permissionTree = [
  {
    title: '仪表盘',
    key: 'dashboard',
    children: [{ title: '查看', key: 'dashboard:view' }],
  },
  {
    title: '用户管理',
    key: 'user',
    children: [
      { title: '查看', key: 'user:list' },
      { title: '新增', key: 'user:create' },
      { title: '编辑', key: 'user:update' },
      { title: '删除', key: 'user:delete' },
    ],
  },
  {
    title: '角色管理',
    key: 'role',
    children: [
      { title: '查看', key: 'role:list' },
      { title: '配置权限', key: 'role:permission' },
    ],
  },
  {
    title: '菜单管理',
    key: 'menu',
    children: [{ title: '查看', key: 'menu:list' }],
  },
  {
    title: '内容管理',
    key: 'content',
    children: [
      { title: '查看', key: 'content:list' },
      { title: '编辑', key: 'content:update' },
    ],
  },
  {
    title: '日志中心',
    key: 'log',
    children: [{ title: '查看', key: 'log:view' }],
  },
  {
    title: '系统设置',
    key: 'settings',
    children: [{ title: '查看', key: 'settings:view' }],
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
    Message.error('加载角色信息失败');
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
    Message.success(
      `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    );
  } catch {
    Message.error('权限配置保存失败');
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
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 flex items-center gap-3">
        <a-button aria-label="返回" type="text" class="!p-1" @click="goBack">
          <template #icon><IconArrowLeft /></template>
        </a-button>
      </div>
      <a-button type="primary" :loading="saving" @click="handleSave">
        <template #icon><IconSave /></template>保存配置
      </a-button>
    </div>

    <a-spin :loading="loading">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="角色信息" :bordered="false">
            <a-descriptions :column="1" bordered size="small" v-if="role">
              <a-descriptions-item label="角色名称">
                {{ role.name }}
              </a-descriptions-item>
              <a-descriptions-item label="角色标识">
                {{ role.code }}
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                <a-tag
                  :color="role.status === 'active' ? 'green' : 'gray'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="描述">
                {{ role.description }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card :bordered="false">
            <template #title>
              <div class="flex items-center justify-between">
                <span>权限分配</span>
                <a-tag color="arcoblue">已选 {{ selectedCount }} 项</a-tag>
              </div>
            </template>
            <a-tree
              v-model:checked-keys="checkedKeys"
              :data="permissionTree"
              checkable
              default-expand-all
              :selectable="false"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>
