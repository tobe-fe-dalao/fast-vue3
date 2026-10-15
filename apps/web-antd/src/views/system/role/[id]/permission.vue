<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

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
    message.error('加载角色信息失败');
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
    saving.value = false;
    message.success(`已保存「${target.name}」的权限配置（${count} 项）`);
  } catch {
    if (!isCurrent()) return;
    message.error('权限配置保存失败');
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
  <div class="admin-page">
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 flex items-center gap-3">
        <AButton aria-label="返回" type="text" class="!p-1" @click="goBack">
          <ArrowLeftOutlined class="text-lg" />
        </AButton>
      </div>
      <AButton type="primary" :loading="saving" @click="handleSave">
        <SaveOutlined />保存配置
      </AButton>
    </div>

    <ASpin :spinning="loading">
      <ARow :gutter="16">
        <ACol :span="8">
          <ACard title="角色信息" :bordered="false" class="shadow-sm">
            <ADescriptions :column="1" bordered size="small" v-if="role">
              <ADescriptionsItem label="角色名称">
                {{ role.name }}
              </ADescriptionsItem>
              <ADescriptionsItem label="角色标识">
                {{ role.code }}
              </ADescriptionsItem>
              <ADescriptionsItem label="状态">
                <ABadge
                  :status="role.status === 'active' ? 'success' : 'default'"
                  :text="role.status === 'active' ? '启用' : '禁用'"
                />
              </ADescriptionsItem>
              <ADescriptionsItem label="描述">
                {{ role.description }}
              </ADescriptionsItem>
            </ADescriptions>
          </ACard>
        </ACol>
        <ACol :span="16">
          <ACard :bordered="false" class="shadow-sm">
            <template #title>
              <div class="flex items-center justify-between">
                <span>权限分配</span>
                <ATag color="blue">已选 {{ selectedCount }} 项</ATag>
              </div>
            </template>
            <ATree
              v-model:checked-keys="checkedKeys"
              :tree-data="permissionTree"
              checkable
              default-expand-all
              :selectable="false"
            />
          </ACard>
        </ACol>
      </ARow>
    </ASpin>
  </div>
</template>
