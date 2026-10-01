<script setup lang="ts">
import type { TableColumnData } from '@arco-design/web-vue';

import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

interface UserRecord {
  id: number;
  username: string;
  realName: string;
  nickname?: string;
  email: string;
  phone: string;
  roles: string[];
  status: string;
  department: string;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<UserRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const statusFilter = ref('');
const roleFilter = ref('');

const dialogVisible = ref(false);
const detailVisible = ref(false);
const editingRecord = ref<null | UserRecord>(null);
const detailRecord = ref<null | UserRecord>(null);

const form = reactive({
  username: '',
  realName: '',
  email: '',
  phone: '',
  roles: [] as string[],
  status: 'active',
  department: '',
});

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];

const departments = ['技术部', '产品部', '运营部', '设计部', '市场部'];

const columns: TableColumnData[] = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '用户名', dataIndex: 'username', width: 110 },
  { title: '姓名', dataIndex: 'realName', width: 100 },
  { title: '邮箱', dataIndex: 'email' },
  { title: '部门', dataIndex: 'department', width: 100 },
  { title: '角色', slotName: 'roles', width: 150 },
  { title: '状态', slotName: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', slotName: 'actions', width: 220, fixed: 'right' },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: UserRecord[]; total: number }>({
      url: '/users',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        status: statusFilter.value,
        role: roleFilter.value,
      },
    });
    dataSource.value = (res?.items ?? []).map((user) => ({
      ...user,
      department: user.department || '',
      realName: user.realName || user.nickname || user.username,
    }));
    total.value = res?.total ?? 0;
  } catch {
    Message.error('加载用户列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  statusFilter.value = '';
  roleFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handlePageSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

function openDialog(record?: UserRecord) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      username: record.username,
      realName: record.realName,
      email: record.email,
      phone: record.phone,
      roles: [...record.roles],
      status: record.status,
      department: record.department,
    });
  } else {
    Object.assign(form, {
      username: '',
      realName: '',
      email: '',
      phone: '',
      roles: [],
      status: 'active',
      department: '',
    });
  }
  dialogVisible.value = true;
}

function openDetail(record: UserRecord) {
  detailRecord.value = record;
  detailVisible.value = true;
}

async function handleSave() {
  if (!form.username || !form.realName) {
    Message.warning('请填写必要信息');
    return;
  }
  try {
    const data = {
      email: form.email,
      nickname: form.realName,
      phone: form.phone,
      status: form.status === 'active' ? 'active' : 'disabled',
    };
    if (editingRecord.value) {
      await http.put({ data, url: `/users/${editingRecord.value.id}` });
      Message.success('用户已更新');
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      Message.success('用户已创建，初始密码为 123456');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    Message.error('用户保存失败');
  }
}

async function handleDelete(record: UserRecord) {
  try {
    await http.del({ url: `/users/${record.id}` });
    Message.success('已删除');
    fetchData();
  } catch {
    Message.error('删除失败');
  }
}

async function handleToggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    Message.success(`已${status === 'active' ? '启用' : '禁用'}`);
  } catch {
    Message.error('状态更新失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-input
            v-model="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            allow-clear
            @press-enter="handleSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <a-option value="active" label="启用" />
            <a-option value="disabled" label="禁用" />
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="roleFilter"
            placeholder="角色"
            allow-clear
            style="width: 100%"
          >
            <a-option
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
              :label="r.label"
            />
          </a-select>
        </a-col>
        <a-col :span="6">
          <a-space>
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="primary" @click="openDialog()">+ 新增用户</a-button>
        </a-col>
      </a-row>
    </a-card>

    <!-- 表格 -->
    <a-card :bordered="false">
      <a-table
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :pagination="false"
        stripe
        row-key="id"
      >
        <template #roles="{ record }">
          <a-tag
            v-for="role in record.roles"
            :key="role"
            size="small"
            style="margin-right: 4px"
          >
            {{ roleOptions.find((r) => r.value === role)?.label || role }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <a-tag
            :color="record.status === 'active' ? 'green' : 'gray'"
            size="small"
          >
            {{ record.status === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button type="text" size="small" @click="openDetail(record)">
            详情
          </a-button>
          <a-button type="text" size="small" @click="openDialog(record)">
            编辑
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="handleToggleStatus(record)"
          >
            {{ record.status === 'active' ? '禁用' : '启用' }}
          </a-button>
          <a-popconfirm content="确定删除该用户？" @ok="handleDelete(record)">
            <a-button type="text" status="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <a-pagination
          :current="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-total
          show-jumper
          show-page-size
          @change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </a-card>

    <!-- 新增/编辑 Modal -->
    <a-modal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑用户' : '新增用户'"
      @ok="handleSave"
    >
      <a-form :model="form" auto-label-width>
        <a-form-item label="用户名">
          <a-input
            v-model="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model="form.realName" placeholder="请输入真实姓名" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="form.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model="form.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="部门">
          <a-select
            v-model="form.department"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <a-option v-for="d in departments" :key="d" :value="d" :label="d" />
          </a-select>
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            v-model="form.roles"
            :max-tag-count="3"
            placeholder="请选择角色"
            multiple
            style="width: 100%"
          >
            <a-option
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
              :label="r.label"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio value="active">启用</a-radio>
            <a-radio value="disabled">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 详情 Drawer -->
    <a-drawer v-model:visible="detailVisible" title="用户详情" :width="420">
      <a-descriptions v-if="detailRecord" :column="1" bordered>
        <a-descriptions-item label="ID">
          {{ detailRecord.id }}
        </a-descriptions-item>
        <a-descriptions-item label="用户名">
          {{ detailRecord.username }}
        </a-descriptions-item>
        <a-descriptions-item label="姓名">
          {{ detailRecord.realName }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{ detailRecord.email }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号">
          {{ detailRecord.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="部门">
          {{ detailRecord.department }}
        </a-descriptions-item>
        <a-descriptions-item label="角色">
          <a-tag
            v-for="role in detailRecord.roles"
            :key="role"
            size="small"
            style="margin-right: 4px"
          >
            {{ roleOptions.find((r) => r.value === role)?.label || role }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="状态">
          <a-tag
            :color="detailRecord.status === 'active' ? 'green' : 'gray'"
            size="small"
          >
            {{ detailRecord.status === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ detailRecord.createdAt }}
        </a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>
