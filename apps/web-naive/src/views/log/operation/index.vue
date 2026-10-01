<script setup lang="ts">
import { http } from '@/api/http';
import { NDataTable, NTag, useMessage } from 'naive-ui';

interface OperationLog {
  id: number;
  username: string;
  module: string;
  action: string;
  description: string;
  ip: string;
  method: string;
  status: string;
  duration: number;
  createdAt: string;
}

const message = useMessage();
const loading = ref(false);
const dataSource = ref<OperationLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref<null | string>(null);

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];

const methodType: Record<string, 'error' | 'primary' | 'success' | 'warning'> =
  { GET: 'success', POST: 'primary', PUT: 'warning', DELETE: 'error' };

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '操作人', key: 'username', width: 100 },
  { title: '模块', key: 'module', width: 110 },
  { title: '操作', key: 'action', width: 80 },
  { title: '描述', key: 'description' },
  {
    title: '方法',
    key: 'method',
    width: 80,
    render: (row: OperationLog) =>
      h(
        NTag,
        { type: methodType[row.method], size: 'small' },
        () => row.method,
      ),
  },
  { title: 'IP', key: 'ip', width: 130 },
  {
    title: '耗时',
    key: 'duration',
    width: 80,
    render: (row: OperationLog) =>
      h(
        'span',
        { style: { color: row.duration > 300 ? '#d03050' : '#18a058' } },
        `${row.duration}ms`,
      ),
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render: (row: OperationLog) =>
      h(
        NTag,
        { type: row.status === 'success' ? 'success' : 'error', size: 'small' },
        () => (row.status === 'success' ? '成功' : '失败'),
      ),
  },
  { title: '操作时间', key: 'createdAt', width: 170 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: OperationLog[]; total: number }>({
      url: '/log/operation',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        module: moduleFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    message.error('加载操作日志失败');
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
  moduleFilter.value = null;
  currentPage.value = 1;
  fetchData();
}
function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <NCard style="margin-bottom: 16px">
      <div style="display: flex; gap: 12px; align-items: center">
        <NInput
          v-model:value="keyword"
          placeholder="搜索操作人 / 描述"
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
        />
        <NSelect
          v-model:value="moduleFilter"
          placeholder="模块"
          clearable
          :options="modules.map((m) => ({ label: m, value: m }))"
          style="width: 140px"
        />
        <NButton type="primary" @click="handleSearch">搜索</NButton>
        <NButton @click="handleReset">重置</NButton>
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
  </div>
</template>
