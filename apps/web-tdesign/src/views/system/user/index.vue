<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

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

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '用户名', colKey: 'username', width: 110 },
  { title: '姓名', colKey: 'realName', width: 100 },
  { title: '邮箱', colKey: 'email' },
  { title: '部门', colKey: 'department', width: 100 },
  { title: '角色', colKey: 'roles', width: 150 },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '创建时间', colKey: 'createdAt', width: 170 },
  { title: '操作', colKey: 'actions', width: 220 },
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
    MessagePlugin.error('加载用户列表失败');
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

function handlePageChange(pageInfo: { current: number; pageSize: number }) {
  currentPage.value = pageInfo.current;
  pageSize.value = pageInfo.pageSize;
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
    MessagePlugin.warning('请填写必要信息');
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
      MessagePlugin.success('用户已更新');
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      MessagePlugin.success('用户已创建，初始密码为 123456');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    MessagePlugin.error('用户保存失败');
  }
}

async function handleDelete(record: UserRecord) {
  try {
    await http.del({ url: `/users/${record.id}` });
    MessagePlugin.success('已删除');
    fetchData();
  } catch {
    MessagePlugin.error('删除失败');
  }
}

async function handleToggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    MessagePlugin.success(`已${status === 'active' ? '启用' : '禁用'}`);
  } catch {
    MessagePlugin.error('状态更新失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <t-card style="margin-bottom: 16px">
      <t-row :gutter="16">
        <t-col :span="6">
          <t-input
            v-model="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            clearable
            @enter="handleSearch"
          />
        </t-col>
        <t-col :span="4">
          <t-select v-model="statusFilter" placeholder="状态" clearable>
            <t-option label="启用" value="active" />
            <t-option label="禁用" value="disabled" />
          </t-select>
        </t-col>
        <t-col :span="4">
          <t-select v-model="roleFilter" placeholder="角色" clearable>
            <t-option
              v-for="r in roleOptions"
              :key="r.value"
              :label="r.label"
              :value="r.value"
            />
          </t-select>
        </t-col>
        <t-col :span="6">
          <t-button theme="primary" @click="handleSearch">搜索</t-button>
          <t-button style="margin-left: 8px" @click="handleReset">
            重置
          </t-button>
        </t-col>
        <t-col :span="4" style="text-align: right">
          <t-button theme="primary" @click="openDialog()">+ 新增用户</t-button>
        </t-col>
      </t-row>
    </t-card>

    <!-- 表格 -->
    <t-card>
      <t-table
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        row-key="id"
        stripe
      >
        <template #roles="{ row }">
          <t-tag
            v-for="role in row.roles"
            :key="role"
            size="small"
            style="margin-right: 4px"
          >
            {{ roleOptions.find((r) => r.value === role)?.label || role }}
          </t-tag>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'active' ? 'success' : 'default'"
            size="small"
          >
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </t-tag>
        </template>
        <template #actions="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDetail(row)"
          >
            详情
          </t-button>
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDialog(row)"
          >
            编辑
          </t-button>
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="handleToggleStatus(row)"
          >
            {{ row.status === 'active' ? '禁用' : '启用' }}
          </t-button>
          <t-popconfirm content="确定删除该用户？" @confirm="handleDelete(row)">
            <t-button theme="danger" variant="text" size="small">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <t-pagination
          v-model:current="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-jumper
          @change="handlePageChange"
        />
      </div>
    </t-card>

    <!-- 新增/编辑 Dialog -->
    <t-dialog
      :visible="dialogVisible"
      :header="editingRecord ? '编辑用户' : '新增用户'"
      width="560px"
      @confirm="handleSave"
      @close="dialogVisible = false"
    >
      <t-form label-width="80px">
        <t-form-item label="用户名">
          <t-input
            v-model="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </t-form-item>
        <t-form-item label="姓名">
          <t-input v-model="form.realName" placeholder="请输入真实姓名" />
        </t-form-item>
        <t-form-item label="邮箱">
          <t-input v-model="form.email" placeholder="请输入邮箱" />
        </t-form-item>
        <t-form-item label="手机号">
          <t-input v-model="form.phone" placeholder="请输入手机号" />
        </t-form-item>
        <t-form-item label="部门">
          <t-select
            v-model="form.department"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <t-option v-for="d in departments" :key="d" :label="d" :value="d" />
          </t-select>
        </t-form-item>
        <t-form-item label="角色">
          <t-select
            v-model="form.roles"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          >
            <t-option
              v-for="r in roleOptions"
              :key="r.value"
              :label="r.label"
              :value="r.value"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="状态">
          <t-radio-group v-model="form.status">
            <t-radio value="active">启用</t-radio>
            <t-radio value="disabled">禁用</t-radio>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </t-dialog>

    <!-- 详情 Drawer -->
    <t-drawer
      v-model:visible="detailVisible"
      header="用户详情"
      size="420px"
      :footer="false"
    >
      <div v-if="detailRecord">
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">ID</div>
          <div>{{ detailRecord.id }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">用户名</div>
          <div>{{ detailRecord.username }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">姓名</div>
          <div>{{ detailRecord.realName }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">邮箱</div>
          <div>{{ detailRecord.email }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">手机号</div>
          <div>{{ detailRecord.phone }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">部门</div>
          <div>{{ detailRecord.department }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">角色</div>
          <div>
            <t-tag
              v-for="role in detailRecord.roles"
              :key="role"
              size="small"
              style="margin-right: 4px"
            >
              {{ roleOptions.find((r) => r.value === role)?.label || role }}
            </t-tag>
          </div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">状态</div>
          <t-tag
            :theme="detailRecord.status === 'active' ? 'success' : 'default'"
            size="small"
          >
            {{ detailRecord.status === 'active' ? '启用' : '禁用' }}
          </t-tag>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">创建时间</div>
          <div>{{ detailRecord.createdAt }}</div>
        </div>
      </div>
    </t-drawer>
  </div>
</template>
