<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

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

interface PermissionNode {
  key: string;
  title: string;
  children?: PermissionNode[];
}
const permissionTree: PermissionNode[] = [
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

const detailRequests = useLatestRequest();
const saveRequests = useLatestRequest();

async function fetchRole() {
  const isCurrent = detailRequests.start();
  saveRequests.invalidate();
  saving.value = false;
  role.value = null;
  checkedKeys.value = [];
  availablePermissions.value = [];
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const [found, permissions] = await Promise.all([
      api.role.detail(id),
      api.permission.list(),
    ]);
    if (!isCurrent()) return;
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
    if (!isCurrent()) return;
    MessagePlugin.error('加载角色信息失败');
  } finally {
    if (isCurrent()) loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

async function handleSave() {
  if (!role.value || loading.value || saving.value) return;
  const target = role.value;
  const count = selectedCount.value;
  const isCurrent = saveRequests.start();
  saving.value = true;
  try {
    const selected = new Set(checkedKeys.value);
    const permissionIds = availablePermissions.value
      .filter(({ code }) => selected.has(code))
      .map(({ id }) => id);
    await api.role.update(target.id, { permissionIds });
    if (!isCurrent()) return;
    MessagePlugin.success(`已保存「${target.name}」的权限配置（${count} 项）`);
  } catch {
    if (!isCurrent()) return;
    MessagePlugin.error('权限配置保存失败');
  } finally {
    if (isCurrent()) saving.value = false;
  }
}

function goBack() {
  router.push('/system/role');
}

watch(() => route.params.id, fetchRole, { immediate: true, flush: 'sync' });
</script>

<template>
  <div class="admin-page admin-page--narrow">
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
      <t-button theme="primary" :loading="saving" @click="handleSave">
        保存配置
      </t-button>
    </div>

    <t-loading :loading="loading" size="large" show-overlay>
      <t-row :gutter="16">
        <t-col :span="8">
          <t-card title="角色信息" :bordered="false">
            <t-descriptions :column="1" bordered v-if="role">
              <t-descriptions-item label="角色名称">
                {{ role.name }}
              </t-descriptions-item>
              <t-descriptions-item label="角色标识">
                {{ role.code }}
              </t-descriptions-item>
              <t-descriptions-item label="状态">
                <t-tag
                  :theme="role.status === 'active' ? 'success' : 'default'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </t-tag>
              </t-descriptions-item>
              <t-descriptions-item label="描述">
                {{ role.description }}
              </t-descriptions-item>
            </t-descriptions>
          </t-card>
        </t-col>
        <t-col :span="16">
          <t-card :bordered="false">
            <template #title>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span>权限分配</span>
                <t-tag theme="primary">已选 {{ selectedCount }} 项</t-tag>
              </div>
            </template>
            <t-tree
              v-model="checkedKeys"
              :data="permissionTree"
              checkable
              :keys="{ value: 'key', label: 'title', children: 'children' }"
              :default-expand-all="true"
              :activable="false"
            />
          </t-card>
        </t-col>
      </t-row>
    </t-loading>
  </div>
</template>
