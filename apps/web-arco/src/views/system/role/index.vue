<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
  createdAt: string;
}

const router = useRouter();

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
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '角色名称', dataIndex: 'name', width: 140 },
  { title: '角色编码', dataIndex: 'code', width: 140 },
  { title: '描述', dataIndex: 'description' },
  { title: '状态', slotName: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', slotName: 'actions', width: 200 },
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
    Message.error('加载角色列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
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
    Message.warning('请填写必要信息');
    return;
  }
  try {
    const payload = { name: form.name, description: form.description };
    if (editingRecord.value) {
      await http.put({
        data: payload,
        url: `/roles/${editingRecord.value.id}`,
      });
      Message.success('角色已更新');
    } else {
      await http.post({ data: { ...payload, code: form.code }, url: '/roles' });
      Message.success('角色已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    Message.error('角色保存失败');
  }
}

async function handleDelete(record: RoleRecord) {
  try {
    await http.del({ url: `/roles/${record.id}` });
    Message.success('已删除');
    fetchData();
  } catch {
    Message.error('删除失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-input-search
            v-model="keyword"
            placeholder="角色名称 / 编码"
            allow-clear
            @search="handleSearch"
          />
        </a-col>
        <a-col :span="16" style="text-align: right">
          <a-button type="primary" @click="openDialog()">+ 新增角色</a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false">
      <a-table
        :loading="loading"
        :columns="columns"
        :data="dataSource"
        :pagination="false"
        stripe
        row-key="id"
      >
        <template #status="{ record }">
          <a-tag
            :color="record.status === 'active' ? 'green' : 'gray'"
            size="small"
          >
            {{ record.status === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button type="text" size="small" @click="openDialog(record)">
            编辑
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="router.push(`/system/role/${record.id}/permission`)"
          >
            权限
          </a-button>
          <a-popconfirm content="确定删除该角色？" @ok="handleDelete(record)">
            <a-button type="text" status="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <a-pagination
          :current="currentPage"
          :page-size="pageSize"
          :total="total"
          show-total
          @change="handlePageChange"
        />
      </div>
    </a-card>

    <!-- 新增/编辑 Modal -->
    <a-modal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
    >
      <a-form :model="form" auto-label-width>
        <a-form-item label="角色名称">
          <a-input v-model="form.name" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="角色编码">
          <a-input
            v-model="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
          />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea
            v-model="form.description"
            :auto-size="{ minRows: 3 }"
            placeholder="请输入描述"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio value="active">启用</a-radio>
            <a-radio value="inactive">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
