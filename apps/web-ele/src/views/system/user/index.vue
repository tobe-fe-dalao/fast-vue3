<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage, ElMessageBox } from 'element-plus';

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
    ElMessage.error('加载用户列表失败');
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

function handleSizeChange(size: number) {
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
    ElMessage.warning('请填写必要信息');
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
      ElMessage.success('用户已更新');
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      ElMessage.success('用户已创建，初始密码为 123456');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    ElMessage.error('用户保存失败');
  }
}

async function handleDelete(record: UserRecord) {
  await ElMessageBox.confirm('确定删除该用户？', '提示', { type: 'warning' });
  await http.del({ url: `/users/${record.id}` });
  ElMessage.success('已删除');
  fetchData();
}

async function handleToggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    ElMessage.success(`已${status === 'active' ? '启用' : '禁用'}`);
  } catch {
    ElMessage.error('状态更新失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input
            v-model="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
          >
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="roleFilter"
            placeholder="角色"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="r in roleOptions"
              :key="r.value"
              :label="r.label"
              :value="r.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-space>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-space>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button type="primary" @click="openDialog()">+ 新增用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格 -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="dataSource"
        stripe
        size="default"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="username" label="用户名" width="110" />
        <el-table-column prop="realName" label="姓名" width="100" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="department" label="部门" width="100" />
        <el-table-column label="角色" width="150">
          <template #default="{ row }">
            <el-tag
              v-for="role in row.roles"
              :key="role"
              size="small"
              style="margin-right: 4px"
            >
              {{ roleOptions.find((r) => r.value === role)?.label || role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'active' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="170" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="openDetail(row)"
            >
              详情
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="openDialog(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 'active' ? '禁用' : '启用' }}
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑 Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingRecord ? '编辑用户' : '新增用户'"
      width="560px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="form.department"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <el-option
              v-for="d in departments"
              :key="d"
              :label="d"
              :value="d"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="form.roles"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="r in roleOptions"
              :key="r.value"
              :label="r.label"
              :value="r.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="active">启用</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>

    <!-- 详情 Drawer -->
    <el-drawer v-model="detailVisible" title="用户详情" size="420px">
      <el-descriptions v-if="detailRecord" :column="1" border>
        <el-descriptions-item label="ID">
          {{ detailRecord.id }}
        </el-descriptions-item>
        <el-descriptions-item label="用户名">
          {{ detailRecord.username }}
        </el-descriptions-item>
        <el-descriptions-item label="姓名">
          {{ detailRecord.realName }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ detailRecord.email }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ detailRecord.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="部门">
          {{ detailRecord.department }}
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag
            v-for="role in detailRecord.roles"
            :key="role"
            size="small"
            style="margin-right: 4px"
          >
            {{ roleOptions.find((r) => r.value === role)?.label || role }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag
            :type="detailRecord.status === 'active' ? 'success' : 'info'"
            size="small"
          >
            {{ detailRecord.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ detailRecord.createdAt }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
