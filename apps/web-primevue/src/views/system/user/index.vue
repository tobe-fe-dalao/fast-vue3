<script setup lang="ts">
import { http } from '@/api/http';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

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

const toast = useToast();
const confirm = useConfirm();

const loading = ref(false);
const dataSource = ref<UserRecord[]>([]);
const total = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const keyword = ref('');
const statusFilter = ref('');
const roleFilter = ref('');

const dialogVisible = ref(false);
const detailVisible = ref(false);
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

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: UserRecord[]; total: number }>({
      url: '/users',
      params: {
        page: currentPage.value + 1,
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
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载用户列表失败',
    });
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 0;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  statusFilter.value = '';
  roleFilter.value = '';
  currentPage.value = 0;
  fetchData();
}

function onPageChange(event: { page: number; rows: number }) {
  currentPage.value = event.page;
  pageSize.value = event.rows;
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
    toast.add({ severity: 'warn', summary: '提示', detail: '请填写必要信息' });
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
      toast.add({ severity: 'success', summary: '成功', detail: '用户已更新' });
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      toast.add({
        severity: 'success',
        summary: '成功',
        detail: '用户已创建，初始密码为 123456',
      });
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '用户保存失败' });
  }
}

function handleDelete(record: UserRecord) {
  confirm.require({
    message: '确定删除该用户？',
    header: '确认',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: '取消',
    acceptLabel: '确定',
    accept: async () => {
      try {
        await http.del({ url: `/users/${record.id}` });
        toast.add({ severity: 'success', summary: '成功', detail: '已删除' });
        fetchData();
      } catch {
        toast.add({ severity: 'error', summary: '错误', detail: '删除失败' });
      }
    },
  });
}

async function handleToggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: `已${status === 'active' ? '启用' : '禁用'}`,
    });
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '状态更新失败' });
  }
}

function roleLabel(value: string) {
  return roleOptions.find((r) => r.value === value)?.label || value;
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <Toast />
    <ConfirmDialog />

    <!-- 搜索区域 -->
    <Card style="margin-bottom: 16px">
      <template #content>
        <div
          style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
        >
          <InputText
            v-model="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            @keyup.enter="handleSearch"
          />
          <Select
            v-model="statusFilter"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            placeholder="状态"
            show-clear
            style="width: 140px"
          />
          <Select
            v-model="roleFilter"
            :options="roleOptions"
            option-label="label"
            option-value="value"
            placeholder="角色"
            show-clear
            style="width: 140px"
          />
          <Button label="搜索" @click="handleSearch" />
          <Button label="重置" severity="secondary" @click="handleReset" />
          <Button
            label="+ 新增用户"
            @click="openDialog()"
            style="margin-left: auto"
          />
        </div>
      </template>
    </Card>

    <!-- 表格 -->
    <Card>
      <template #content>
        <DataTable
          :value="dataSource"
          :loading="loading"
          :paginator="true"
          :rows="pageSize"
          :total-records="total"
          :lazy="true"
          @page="onPageChange"
          striped-rows
          size="small"
          data-key="id"
        >
          <Column field="id" header="ID" style="width: 60px" />
          <Column field="username" header="用户名" style="width: 110px" />
          <Column field="realName" header="姓名" style="width: 100px" />
          <Column field="email" header="邮箱" />
          <Column field="department" header="部门" style="width: 100px" />
          <Column header="角色" style="width: 150px">
            <template #body="{ data }">
              <Tag
                v-for="role in data.roles"
                :key="role"
                :value="roleLabel(role)"
                severity="info"
                style="margin-right: 4px"
              />
            </template>
          </Column>
          <Column header="状态" style="width: 90px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'active' ? '启用' : '禁用'"
                :severity="data.status === 'active' ? 'success' : 'secondary'"
              />
            </template>
          </Column>
          <Column field="createdAt" header="创建时间" style="width: 170px" />
          <Column
            header="操作"
            style="width: 220px"
            frozen
            align-frozen="right"
          >
            <template #body="{ data }">
              <Button
                label="详情"
                size="small"
                text
                @click="openDetail(data)"
              />
              <Button
                label="编辑"
                size="small"
                text
                @click="openDialog(data)"
              />
              <Button
                :label="data.status === 'active' ? '禁用' : '启用'"
                size="small"
                text
                @click="handleToggleStatus(data)"
              />
              <Button
                label="删除"
                size="small"
                text
                severity="danger"
                @click="handleDelete(data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- 新增/编辑 Dialog -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="editingRecord ? '编辑用户' : '新增用户'"
      :modal="true"
      :style="{ width: '560px' }"
    >
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >用户名</label
          >
          <InputText
            v-model="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >姓名</label
          >
          <InputText
            v-model="form.realName"
            placeholder="请输入真实姓名"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >邮箱</label
          >
          <InputText
            v-model="form.email"
            placeholder="请输入邮箱"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >手机号</label
          >
          <InputText
            v-model="form.phone"
            placeholder="请输入手机号"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >部门</label
          >
          <Select
            v-model="form.department"
            :options="departments"
            placeholder="请选择部门"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色</label
          >
          <Select
            v-model="form.roles"
            :options="roleOptions"
            option-label="label"
            option-value="value"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >状态</label
          >
          <div style="display: flex; gap: 16px">
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="status-active"
                value="active"
              />
              <label for="status-active">启用</label>
            </div>
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="status-disabled"
                value="disabled"
              />
              <label for="status-disabled">禁用</label>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="取消"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button label="确定" @click="handleSave" />
      </template>
    </Dialog>

    <!-- 详情 Drawer -->
    <Drawer
      v-model:visible="detailVisible"
      header="用户详情"
      :style="{ width: '420px' }"
    >
      <div
        v-if="detailRecord"
        style="display: flex; flex-direction: column; gap: 12px"
      >
        <div><strong>ID：</strong>{{ detailRecord.id }}</div>
        <div><strong>用户名：</strong>{{ detailRecord.username }}</div>
        <div><strong>姓名：</strong>{{ detailRecord.realName }}</div>
        <div><strong>邮箱：</strong>{{ detailRecord.email }}</div>
        <div><strong>手机号：</strong>{{ detailRecord.phone }}</div>
        <div><strong>部门：</strong>{{ detailRecord.department }}</div>
        <div>
          <strong>角色：</strong>
          <Tag
            v-for="role in detailRecord.roles"
            :key="role"
            :value="roleLabel(role)"
            severity="info"
            style="margin-right: 4px"
          />
        </div>
        <div>
          <strong>状态：</strong>
          <Tag
            :value="detailRecord.status === 'active' ? '启用' : '禁用'"
            :severity="
              detailRecord.status === 'active' ? 'success' : 'secondary'
            "
          />
        </div>
        <div><strong>创建时间：</strong>{{ detailRecord.createdAt }}</div>
      </div>
    </Drawer>
  </div>
</template>
