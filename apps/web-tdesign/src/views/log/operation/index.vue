<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

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

const loading = ref(false);
const dataSource = ref<OperationLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref('');

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];

const methodTheme: Record<string, string> = {
  GET: 'success',
  POST: 'primary',
  PUT: 'warning',
  DELETE: 'danger',
};

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '操作人', colKey: 'username', width: 100 },
  { title: '模块', colKey: 'module', width: 110 },
  { title: '操作', colKey: 'action', width: 80 },
  { title: '描述', colKey: 'description' },
  { title: '方法', colKey: 'method', width: 80 },
  { title: 'IP', colKey: 'ip', width: 130 },
  { title: '耗时', colKey: 'duration', width: 80 },
  { title: '状态', colKey: 'status', width: 80 },
  { title: '操作时间', colKey: 'createdAt', width: 170 },
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
    MessagePlugin.error('加载操作日志失败');
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
  moduleFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(pageInfo: { current: number; pageSize: number }) {
  currentPage.value = pageInfo.current;
  pageSize.value = pageInfo.pageSize;
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <t-card style="margin-bottom: 16px">
      <t-row :gutter="16">
        <t-col :span="6">
          <t-input
            v-model="keyword"
            placeholder="搜索操作人 / 描述"
            clearable
            @enter="handleSearch"
          />
        </t-col>
        <t-col :span="4">
          <t-select v-model="moduleFilter" placeholder="模块" clearable>
            <t-option v-for="m in modules" :key="m" :label="m" :value="m" />
          </t-select>
        </t-col>
        <t-col :span="4">
          <t-button theme="primary" @click="handleSearch">搜索</t-button>
          <t-button style="margin-left: 8px" @click="handleReset">
            重置
          </t-button>
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
        <template #method="{ row }">
          <t-tag
            :theme="(methodTheme[row.method] as any) || 'default'"
            size="small"
          >
            {{ row.method }}
          </t-tag>
        </template>
        <template #duration="{ row }">
          <span :style="{ color: row.duration > 300 ? '#e34d59' : '#00a870' }"
            >{{ row.duration }}ms</span
          >
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'success' ? 'success' : 'danger'"
            size="small"
          >
            {{ row.status === 'success' ? '成功' : '失败' }}
          </t-tag>
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
  </div>
</template>
