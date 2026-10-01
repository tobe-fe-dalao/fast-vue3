<script setup lang="ts">
import type { UserItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<UserItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const statusFilter = ref('');
const roleFilter = ref('');

const modalVisible = ref(false);
const editingRecord = ref<null | UserItem>(null);

const router = useRouter();

const form = reactive({
  username: '',
  realName: '',
  email: '',
  phone: '',
  department: '',
  roles: [] as string[],
  status: 'active' as UserItem['status'],
});

const departments = ['技术部', '产品部', '运营部', '设计部', '市场部'];

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '用户名', dataIndex: 'username', width: 110 },
  { title: '姓名', dataIndex: 'realName', width: 100 },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', dataIndex: 'roles', width: 120 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 200, fixed: 'right' as const },
];

const roleColorMap: Record<string, string> = {
  admin: 'blue',
  editor: 'green',
  user: 'default',
  guest: 'gray',
  '*': 'purple',
};

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.user.list({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      status: statusFilter.value || undefined,
    });
    dataSource.value = res.items.map((user) => ({
      ...user,
      realName: user.realName ?? user.nickname ?? user.username,
    }));
    total.value = res.total;
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
  statusFilter.value = '';
  roleFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openModal(record?: UserItem) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      username: record.username,
      realName: record.realName ?? '',
      email: record.email ?? '',
      phone: record.phone ?? '',
      department: '',
      roles: [...(record.roles ?? [])],
      status: record.status,
    });
  } else {
    Object.assign(form, {
      username: '',
      realName: '',
      email: '',
      phone: '',
      department: '',
      roles: [],
      status: 'active',
    });
  }
  modalVisible.value = true;
}

async function handleSave() {
  if (!form.username) {
    message.warning('请填写用户名');
    return;
  }
  try {
    if (editingRecord.value) {
      await api.user.update(editingRecord.value.id, {
        realName: form.realName,
        email: form.email,
        phone: form.phone,
        roleIds: [],
        status: form.status,
      });
      message.success('用户已更新');
    } else {
      await api.user.create({
        username: form.username,
        realName: form.realName,
        email: form.email,
        phone: form.phone,
        password: 'changeme',
        status: form.status,
      });
      message.success('用户已创建');
    }
    modalVisible.value = false;
    fetchData();
  } catch {
    message.error('保存失败');
  }
}

async function handleDelete(record: UserItem) {
  try {
    await api.user.delete(record.id);
    message.success('已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}

async function handleToggleStatus(record: UserItem) {
  try {
    const next: UserItem['status'] =
      record.status === 'active' ? 'disabled' : 'active';
    await api.user.update(record.id, { status: next });
    record.status = next;
    message.success(`已${next === 'active' ? '启用' : '禁用'}`);
  } catch {
    message.error('状态切换失败');
  }
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="6">
          <AInput
            v-model:value="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption value="active">启用</ASelectOption>
            <ASelectOption value="disabled">禁用</ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="roleFilter"
            placeholder="角色"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="6">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="4" style="text-align: right">
          <AButton type="primary" @click="openModal()">+ 新增用户</AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- 表格 -->
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 1100 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'roles'">
              <ATag
                v-for="role in record.roles"
                :key="role"
                :color="roleColorMap[role] || 'default'"
              >
                {{ roleOptions.find((r) => r.value === role)?.label || role }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="router.push(`/system/user/${record.id}`)"
              >
                详情
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="openModal(record as UserItem)"
              >
                编辑
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="handleToggleStatus(record as UserItem)"
              >
                {{ record.status === 'active' ? '禁用' : '启用' }}
              </AButton>
              <APopconfirm
                title="确定删除该用户？"
                @confirm="handleDelete(record as UserItem)"
              >
                <AButton type="link" size="small" danger>删除</AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <!-- 新增/编辑 Modal -->
    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑用户' : '新增用户'"
      @ok="handleSave"
      :width="560"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <AInput
            v-model:value="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </AFormItem>
        <AFormItem
          label="姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
          <AInput v-model:value="form.realName" placeholder="请输入真实姓名" />
        </AFormItem>
        <AFormItem label="邮箱">
          <AInput v-model:value="form.email" placeholder="请输入邮箱" />
        </AFormItem>
        <AFormItem label="手机号">
          <AInput v-model:value="form.phone" placeholder="请输入手机号" />
        </AFormItem>
        <AFormItem label="部门">
          <ASelect v-model:value="form.department" placeholder="请选择部门">
            <ASelectOption v-for="d in departments" :key="d" :value="d">
              {{ d }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="角色">
          <ASelect
            v-model:value="form.roles"
            mode="multiple"
            placeholder="请选择角色"
          >
            <ASelectOption
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">启用</ARadio>
            <ARadio value="disabled">禁用</ARadio>
          </ARadioGroup>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
