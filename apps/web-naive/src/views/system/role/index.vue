<script setup lang="ts">
import { http } from '@/api/http';
import { NButton, NDataTable, NTag, useMessage } from 'naive-ui';

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

type RoleForm = Omit<RoleRecord, 'createdAt' | 'id' | 'permissions'>;

const message = useMessage();
const loading = ref(false);
const dataSource = ref<RoleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const showModal = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const form = reactive<RoleForm>({
  name: '',
  code: '',
  description: '',
  status: 'active',
});

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '角色名称', key: 'name', width: 140 },
  { title: '角色编码', key: 'code', width: 140 },
  { title: '描述', key: 'description' },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: RoleRecord) =>
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
    render: (row: RoleRecord) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openModal(row),
        },
        () => '编辑',
      ),
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => router.push(`/system/role/${row.id}/permission`),
          style: { marginLeft: '8px' },
        },
        () => '权限',
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
    message.error('加载角色列表失败');
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

function openModal(record?: RoleRecord) {
  editingRecord.value = record ?? null;
  if (record)
    Object.assign(form, {
      name: record.name,
      code: record.code,
      description: record.description,
      status: record.status,
    });
  else
    Object.assign(form, {
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
  showModal.value = true;
}

async function handleSave() {
  if (!form.name || !form.code) {
    message.warning('请填写必要信息');
    return;
  }
  try {
    const payload = { description: form.description, name: form.name };
    if (editingRecord.value) {
      await http.put({
        data: payload,
        url: `/roles/${editingRecord.value.id}`,
      });
      message.success('角色已更新');
    } else {
      await http.post({ data: { ...payload, code: form.code }, url: '/roles' });
      message.success('角色已创建');
    }
    showModal.value = false;
    fetchData();
  } catch {
    message.error('角色保存失败');
  }
}

async function handleDelete(record: RoleRecord) {
  try {
    await http.del({ url: `/roles/${record.id}` });
    message.success('已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <NCard style="margin-bottom: 16px">
      <div style="display: flex; gap: 12px; align-items: center">
        <NInput
          v-model:value="keyword"
          placeholder="角色名称 / 编码"
          clearable
          style="width: 240px"
          @keyup.enter="handleSearch"
        >
          <template #suffix>
            <NButton text size="small" @click="handleSearch"> 搜索 </NButton>
          </template>
        </NInput>
        <div style="flex: 1"></div>
        <NButton type="primary" @click="openModal()">+ 新增角色</NButton>
      </div>
    </NCard>
    <NCard>
      <NDataTable
        :columns="columns"
        :data="dataSource"
        :loading="loading"
        :pagination="{ page: currentPage, pageSize, itemCount: total }"
        :on-update:page="handlePageChange"
        size="small"
        striped
      />
    </NCard>

    <NModal
      v-model:show="showModal"
      preset="dialog"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      style="width: 500px"
      positive-text="确定"
      negative-text="取消"
      @positive-click="handleSave"
    >
      <div style="padding: 16px 0">
        <div style="margin-bottom: 12px">
          <span>角色名称</span
          ><NInput
            v-model:value="form.name"
            placeholder="请输入角色名称"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>角色编码</span
          ><NInput
            v-model:value="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>描述</span
          ><NInput
            v-model:value="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>状态</span
          ><NRadioGroup v-model:value="form.status" style="margin-top: 4px">
            <NRadio value="active">启用</NRadio
            ><NRadio value="inactive">禁用</NRadio>
          </NRadioGroup>
        </div>
      </div>
    </NModal>
  </div>
</template>
