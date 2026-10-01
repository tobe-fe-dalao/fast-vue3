<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const {
  success: messageSuccess,
  warning: messageWarning,
  error: messageError,
} = useMessage();

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
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '用户名', dataKey: 'username', width: 110 },
  { title: '姓名', dataKey: 'realName', width: 100 },
  { title: '邮箱', dataKey: 'email' },
  { title: '部门', dataKey: 'department', width: 100 },
  { title: '角色', key: 'roles', width: 150, customCell: true },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '创建时间', dataKey: 'createdAt', width: 170 },
  { title: '操作', key: 'actions', width: 220, customCell: true },
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
    messageError('加载用户列表失败');
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
    messageWarning('请填写必要信息');
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
      messageSuccess('用户已更新');
    } else {
      await http.post({
        data: { ...data, password: '123456', username: form.username },
        url: '/users',
      });
      messageSuccess('用户已创建，初始密码为 123456');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    messageError('用户保存失败');
  }
}

async function handleDelete(record: UserRecord) {
  try {
    await http.del({ url: `/users/${record.id}` });
    messageSuccess('已删除');
    fetchData();
  } catch {
    messageError('删除失败');
  }
}

async function handleToggleStatus(record: UserRecord) {
  const status = record.status === 'active' ? 'disabled' : 'active';
  try {
    await http.put({ data: { status }, url: `/users/${record.id}` });
    record.status = status;
    messageSuccess(`已${status === 'active' ? '启用' : '禁用'}`);
  } catch {
    messageError('状态更新失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <IxInput
          v-model:value="keyword"
          placeholder="用户名 / 姓名 / 邮箱"
          style="width: 220px"
          @keyup.enter="handleSearch"
        />
        <IxSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          style="width: 140px"
        >
          <IxSelectOption label="启用" value="active" />
          <IxSelectOption label="禁用" value="disabled" />
        </IxSelect>
        <IxSelect
          v-model:value="roleFilter"
          placeholder="角色"
          clearable
          style="width: 140px"
        >
          <IxSelectOption
            v-for="r in roleOptions"
            :key="r.value"
            :label="r.label"
            :value="r.value"
          />
        </IxSelect>
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
        <IxButton @click="handleReset">重置</IxButton>
        <div style="flex: 1"></div>
        <IxButton mode="primary" @click="openDialog()">+ 新增用户</IxButton>
      </div>
    </IxCard>

    <!-- 表格 -->
    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'roles'">
            <IxTag
              v-for="role in record.roles"
              :key="role"
              color="blue"
              style="margin-right: 4px"
            >
              {{ roleOptions.find((r) => r.value === role)?.label || role }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'status'">
            <IxTag :color="record.status === 'active' ? 'success' : 'info'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton mode="link" size="sm" @click="openDetail(record)">
              详情
            </IxButton>
            <IxButton mode="link" size="sm" @click="openDialog(record)">
              编辑
            </IxButton>
            <IxButton mode="link" size="sm" @click="handleToggleStatus(record)">
              {{ record.status === 'active' ? '禁用' : '启用' }}
            </IxButton>
            <IxPopconfirm
              title="确定删除该用户？"
              @confirm="handleDelete(record)"
            >
              <IxButton mode="link" size="sm" danger>删除</IxButton>
            </IxPopconfirm>
          </template>
        </template>
      </IxTable>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <IxPagination
          v-model:page-index="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          show-total
          show-quick-jumper
          @change="handlePageChange"
        />
      </div>
    </IxCard>

    <!-- 新增/编辑 Modal -->
    <IxModal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑用户' : '新增用户'"
      width="560px"
    >
      <IxForm :label-col="{ span: 6 }" :control-col="{ span: 18 }">
        <IxFormItem label="用户名">
          <IxInput
            v-model:value="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </IxFormItem>
        <IxFormItem label="姓名">
          <IxInput v-model:value="form.realName" placeholder="请输入真实姓名" />
        </IxFormItem>
        <IxFormItem label="邮箱">
          <IxInput v-model:value="form.email" placeholder="请输入邮箱" />
        </IxFormItem>
        <IxFormItem label="手机号">
          <IxInput v-model:value="form.phone" placeholder="请输入手机号" />
        </IxFormItem>
        <IxFormItem label="部门">
          <IxSelect
            v-model:value="form.department"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="d in departments"
              :key="d"
              :label="d"
              :value="d"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="角色">
          <IxSelect
            v-model:value="form.roles"
            multiple
            placeholder="请选择角色"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="r in roleOptions"
              :key="r.value"
              :label="r.label"
              :value="r.value"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="状态">
          <IxRadioGroup v-model:value="form.status">
            <IxRadio value="active">启用</IxRadio>
            <IxRadio value="disabled">禁用</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
      </IxForm>
      <template #footer>
        <IxButton @click="dialogVisible = false">取消</IxButton>
        <IxButton mode="primary" @click="handleSave">确定</IxButton>
      </template>
    </IxModal>

    <!-- 详情 Drawer -->
    <IxDrawer
      v-model:visible="detailVisible"
      title="用户详情"
      width="420px"
      placement="right"
    >
      <template v-if="detailRecord">
        <div style="padding: 8px 0">
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">ID</span
            ><span>{{ detailRecord.id }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">用户名</span
            ><span>{{ detailRecord.username }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">姓名</span
            ><span>{{ detailRecord.realName }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">邮箱</span
            ><span>{{ detailRecord.email }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">手机号</span
            ><span>{{ detailRecord.phone }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">部门</span
            ><span>{{ detailRecord.department }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">角色</span>
            <span>
              <IxTag
                v-for="role in detailRecord.roles"
                :key="role"
                color="blue"
                style="margin-right: 4px"
              >
                {{ roleOptions.find((r) => r.value === role)?.label || role }}
              </IxTag>
            </span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">状态</span>
            <span>
              <IxTag
                :color="detailRecord.status === 'active' ? 'success' : 'info'"
              >
                {{ detailRecord.status === 'active' ? '启用' : '禁用' }}
              </IxTag>
            </span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
            "
          >
            <span style="color: #666">创建时间</span
            ><span>{{ detailRecord.createdAt }}</span>
          </div>
        </div>
      </template>
    </IxDrawer>
  </div>
</template>
