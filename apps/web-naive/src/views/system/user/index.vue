<script setup lang="ts">
import { http } from '@/api/http';
import { NButton, NDataTable, NTag, useMessage } from 'naive-ui';

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

type UserForm = Omit<UserRecord, 'createdAt' | 'id'>;

const message = useMessage();
const loading = ref(false);
const dataSource = ref<UserRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const statusFilter = ref<null | string>(null);
const roleFilter = ref<null | string>(null);

const showModal = ref(false);
const showDetail = ref(false);
const editingRecord = ref<null | UserRecord>(null);
const detailRecord = ref<null | UserRecord>(null);

const form = reactive<UserForm>({
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

const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'disabled' },
];

const departments = ['技术部', '产品部', '运营部', '设计部', '市场部'];

const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  user: '普通用户',
  guest: '访客',
};

function getRoleTagType(role: string) {
  if (role === 'admin') return 'primary';
  if (role === 'editor') return 'success';
  return 'default';
}

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '用户名', key: 'username', width: 110 },
  { title: '姓名', key: 'realName', width: 100 },
  { title: '邮箱', key: 'email' },
  { title: '部门', key: 'department', width: 100 },
  {
    title: '角色',
    key: 'roles',
    width: 150,
    render: (row: UserRecord) =>
      row.roles.map((r) =>
        h(
          NTag,
          {
            type: getRoleTagType(r),
            size: 'small',
            style: { marginRight: '4px' },
          },
          () => roleLabel[r] || r,
        ),
      ),
  },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: UserRecord) =>
      h(
        NTag,
        {
          type: row.status === 'active' ? 'success' : 'default',
          size: 'small',
        },
        () => (row.status === 'active' ? '启用' : '禁用'),
      ),
  },
  { title: '创建时间', key: 'createdAt', width: 170 },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right' as const,
    render: (row: UserRecord) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openDetail(row),
        },
        () => '详情',
      ),
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openModal(row),
          style: { marginLeft: '8px' },
        },
        () => '编辑',
      ),
      h(
        NButton,
        {
          text: true,
          type: row.status === 'active' ? 'warning' : 'success',
          size: 'small',
          onClick: () => toggleStatus(row),
          style: { marginLeft: '8px' },
        },
        () => (row.status === 'active' ? '禁用' : '启用'),
      ),
      h(
        NButton,
        {
          text: true,
          type: 'error',
          size: 'small',
          onClick: () => handleDelete(row),
          style: { marginLeft: '8px' },
        },
        () => '删除',
      ),
    ],
  },
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
    message.error('加载用户列表失败');
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
  statusFilter.value = null;
  roleFilter.value = null;
  currentPage.value = 1;
  fetchData();
}
function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function openModal(record?: UserRecord) {
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
  showModal.value = true;
}

function openDetail(record: UserRecord) {
  detailRecord.value = record;
  showDetail.value = true;
}

async function handleSave() {
  if (!form.username || !form.realName) {
    message.warning('请填写必要信息');
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
      message.success('用户已更新');
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      message.success('用户已创建，初始密码为 123456');
    }
    showModal.value = false;
    fetchData();
  } catch {
    message.error('用户保存失败');
  }
}

async function handleDelete(record: UserRecord) {
  try {
    await http.del({ url: `/users/${record.id}` });
    message.success('已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}
async function toggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    message.success(`已${status === 'active' ? '启用' : '禁用'}`);
  } catch {
    message.error('状态更新失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <NCard style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <NInput
          v-model:value="keyword"
          placeholder="用户名 / 姓名 / 邮箱"
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
        />
        <NSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          :options="statusOptions"
          style="width: 120px"
        />
        <NSelect
          v-model:value="roleFilter"
          placeholder="角色"
          clearable
          :options="roleOptions"
          style="width: 140px"
        />
        <NButton type="primary" @click="handleSearch">搜索</NButton>
        <NButton @click="handleReset">重置</NButton>
        <div style="flex: 1"></div>
        <NButton type="primary" @click="openModal()">+ 新增用户</NButton>
      </div>
    </NCard>
    <NCard>
      <NDataTable
        :columns="columns"
        :data="dataSource"
        :loading="loading"
        :pagination="{
          page: currentPage,
          pageSize,
          itemCount: total,
          showSizePicker: true,
          pageSizes: [10, 20, 50],
        }"
        :on-update:page="handlePageChange"
        size="small"
        striped
      />
    </NCard>

    <NModal
      v-model:show="showModal"
      preset="dialog"
      :title="editingRecord ? '编辑用户' : '新增用户'"
      style="width: 560px"
      positive-text="确定"
      negative-text="取消"
      @positive-click="handleSave"
    >
      <div style="padding: 16px 0">
        <div style="margin-bottom: 12px">
          <span>用户名</span
          ><NInput
            v-model:value="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>姓名</span
          ><NInput
            v-model:value="form.realName"
            placeholder="请输入真实姓名"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>邮箱</span
          ><NInput
            v-model:value="form.email"
            placeholder="请输入邮箱"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>手机号</span
          ><NInput
            v-model:value="form.phone"
            placeholder="请输入手机号"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>部门</span
          ><NSelect
            v-model:value="form.department"
            placeholder="请选择部门"
            :options="departments.map((d) => ({ label: d, value: d }))"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>角色</span
          ><NSelect
            v-model:value="form.roles"
            multiple
            placeholder="请选择角色"
            :options="roleOptions"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>状态</span
          ><NRadioGroup v-model:value="form.status" style="margin-top: 4px">
            <NRadio value="active">启用</NRadio
            ><NRadio value="disabled">禁用</NRadio>
          </NRadioGroup>
        </div>
      </div>
    </NModal>

    <NDrawer v-model:show="showDetail" :width="420" title="用户详情">
      <NDrawerContent>
        <NDescriptions
          v-if="detailRecord"
          :column="1"
          label-placement="left"
          bordered
        >
          <NDescriptionsItem label="ID">
            {{ detailRecord.id }}
          </NDescriptionsItem>
          <NDescriptionsItem label="用户名">
            {{ detailRecord.username }}
          </NDescriptionsItem>
          <NDescriptionsItem label="姓名">
            {{ detailRecord.realName }}
          </NDescriptionsItem>
          <NDescriptionsItem label="邮箱">
            {{ detailRecord.email }}
          </NDescriptionsItem>
          <NDescriptionsItem label="手机号">
            {{ detailRecord.phone }}
          </NDescriptionsItem>
          <NDescriptionsItem label="部门">
            {{ detailRecord.department }}
          </NDescriptionsItem>
          <NDescriptionsItem label="状态">
            {{ detailRecord.status === 'active' ? '启用' : '禁用' }}
          </NDescriptionsItem>
          <NDescriptionsItem label="创建时间">
            {{ detailRecord.createdAt }}
          </NDescriptionsItem>
        </NDescriptions>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
