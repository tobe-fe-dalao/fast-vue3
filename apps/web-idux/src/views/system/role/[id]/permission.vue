<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { api } from '@/api';
import { useMessage } from '@idux/components/message';

const { success: messageSuccess, error: messageError } = useMessage();

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

function getCheckedKeys(found: RoleRecord, permissions: PermissionItem[]) {
  if (found.permissions.includes('*')) {
    return permissions.map(({ code }) => code);
  }
  return [...found.permissions];
}

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
    checkedKeys.value = getCheckedKeys(role.value, permissions);
  } catch {
    messageError('加载角色信息失败');
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
    messageSuccess(
      `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    );
  } catch {
    messageError('权限配置保存失败');
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
        <IxButton mode="text" @click="goBack"> ← 返回 </IxButton>
      </div>
      <IxButton mode="primary" :loading="saving" @click="handleSave">
        保存配置
      </IxButton>
    </div>

    <IxSpin :spinning="loading">
      <IxRow :gutter="16">
        <IxCol :span="8">
          <IxCard title="角色信息" shadow="never">
            <IxDesc v-if="role">
              <IxDescItem label="角色名称">{{ role.name }}</IxDescItem>
              <IxDescItem label="角色标识">{{ role.code }}</IxDescItem>
              <IxDescItem label="状态">
                <IxTag
                  :color="role.status === 'active' ? 'success' : 'default'"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </IxTag>
              </IxDescItem>
              <IxDescItem label="描述">{{ role.description }}</IxDescItem>
            </IxDesc>
          </IxCard>
        </IxCol>
        <IxCol :span="16">
          <IxCard shadow="never">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
              "
            >
              <span style="font-weight: 600">权限分配</span>
              <IxTag color="blue">已选 {{ selectedCount }} 项</IxTag>
            </div>
            <IxTree
              v-model:checked-keys="checkedKeys"
              :data-source="permissionTree"
              checkable
              cascader-strategy="all"
              default-expanded-all
              label-key="title"
            />
          </IxCard>
        </IxCol>
      </IxRow>
    </IxSpin>
  </div>
</template>
