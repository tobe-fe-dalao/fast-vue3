<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

const router = useRouter();

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<RoleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const dialogVisible = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const form = reactive({
  name: '',
  code: '',
  description: '',
  status: 'active',
});

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '角色名称', colKey: 'name', width: 140 },
  { title: '角色编码', colKey: 'code', width: 140 },
  { title: '描述', colKey: 'description' },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '创建时间', colKey: 'createdAt', width: 170 },
  { title: '操作', colKey: 'actions', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: RoleRecord[]; total: number }>({
      url: '/roles',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = (res?.items ?? []).map((item) => ({
      ...item,
      status: 'active',
    }));
    total.value = res?.total ?? 0;
  } catch {
    MessagePlugin.error('加载角色列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(pageInfo: { current: number }) {
  currentPage.value = pageInfo.current;
  fetchData();
}

function openDialog(record?: RoleRecord) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      code: record.code,
      description: record.description,
      status: record.status,
    });
  } else {
    Object.assign(form, {
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
  }
  dialogVisible.value = true;
}

async function handleSave() {
  if (!form.name || !form.code) {
    MessagePlugin.warning('请填写必要信息');
    return;
  }
  try {
    const payload = { description: form.description, name: form.name };
    if (editingRecord.value) {
      await http.put({
        data: payload,
        url: `/roles/${editingRecord.value.id}`,
      });
      MessagePlugin.success('角色已更新');
    } else {
      await http.post({ data: { ...payload, code: form.code }, url: '/roles' });
      MessagePlugin.success('角色已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    MessagePlugin.error('角色保存失败');
  }
}

async function handleDelete(record: RoleRecord) {
  try {
    await http.del({ url: `/roles/${record.id}` });
    MessagePlugin.success('已删除');
    fetchData();
  } catch {
    MessagePlugin.error('删除失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <t-card style="margin-bottom: 16px">
      <t-row :gutter="16">
        <t-col :span="8">
          <t-input
            v-model="keyword"
            placeholder="角色名称 / 编码"
            clearable
            @enter="handleSearch"
          >
            <template #suffix>
              <t-button theme="primary" variant="text" @click="handleSearch">
                搜索
              </t-button>
            </template>
          </t-input>
        </t-col>
        <t-col :span="16" style="text-align: right">
          <t-button theme="primary" @click="openDialog()">+ 新增角色</t-button>
        </t-col>
      </t-row>
    </t-card>

    <t-card>
      <t-table
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        row-key="id"
        stripe
      >
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
            @click="openDialog(row)"
          >
            编辑
          </t-button>
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="router.push(`/system/role/${row.id}/permission`)"
          >
            权限
          </t-button>
          <t-popconfirm content="确定删除该角色？" @confirm="handleDelete(row)">
            <t-button theme="danger" variant="text" size="small">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <t-pagination
          v-model:current="currentPage"
          :page-size="pageSize"
          :total="total"
          @change="handlePageChange"
        />
      </div>
    </t-card>

    <!-- 新增/编辑 Dialog -->
    <t-dialog
      :visible="dialogVisible"
      :header="editingRecord ? '编辑角色' : '新增角色'"
      width="500px"
      @confirm="handleSave"
      @close="dialogVisible = false"
    >
      <t-form label-width="80px">
        <t-form-item label="角色名称">
          <t-input v-model="form.name" placeholder="请输入角色名称" />
        </t-form-item>
        <t-form-item label="角色编码">
          <t-input
            v-model="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
          />
        </t-form-item>
        <t-form-item label="描述">
          <t-textarea
            v-model="form.description"
            :rows="3"
            placeholder="请输入描述"
          />
        </t-form-item>
        <t-form-item label="状态">
          <t-radio-group v-model="form.status">
            <t-radio value="active">启用</t-radio>
            <t-radio value="inactive">禁用</t-radio>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
