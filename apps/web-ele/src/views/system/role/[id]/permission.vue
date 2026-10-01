<script setup lang="ts">
import type { PermissionItem } from '@/api';

import { api } from '@/api';
import { ArrowLeft, Select } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
    ElMessage.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function onCheck(_node: unknown, info: { checkedKeys: (number | string)[] }) {
  checkedKeys.value = info.checkedKeys as string[];
}

async function handleSave() {
  if (!role.value) return;
  saving.value = true;
  try {
    const selected = new Set(checkedKeys.value);
    const permissionIds = availablePermissions.value
      .filter(({ code }) => selected.has(code))
      .map(({ id }) => id);
    await api.role.update(role.value.id, { permissionIds });
    ElMessage.success(
      `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    );
  } catch {
    ElMessage.error('权限配置保存失败');
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
        <el-button text :icon="ArrowLeft" @click="goBack"> 返回 </el-button>
      </div>
      <el-button
        type="primary"
        :icon="Select"
        :loading="saving"
        @click="handleSave"
      >
        保存配置
      </el-button>
    </div>

    <div v-loading="loading">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-card shadow="never">
            <el-descriptions title="角色信息" :column="1" border v-if="role">
              <el-descriptions-item label="角色名称">
                {{ role.name }}
              </el-descriptions-item>
              <el-descriptions-item label="角色标识">
                {{ role.code }}
              </el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag
                  :type="role.status === 'active' ? 'success' : 'info'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="描述">
                {{ role.description }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never">
            <template #header>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span>权限分配</span>
                <el-tag type="primary">已选 {{ selectedCount }} 项</el-tag>
              </div>
            </template>
            <el-tree
              :data="permissionTree"
              show-checkbox
              node-key="key"
              :default-checked-keys="checkedKeys"
              default-expand-all
              @check="onCheck"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
