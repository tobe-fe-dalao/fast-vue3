<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

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

const methodType: Record<string, string> = {
  GET: 'green',
  POST: 'arcoblue',
  PUT: 'orange',
  DELETE: 'red',
};

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '操作人', dataIndex: 'username', width: 100 },
  { title: '模块', dataIndex: 'module', width: 110 },
  { title: '操作', dataIndex: 'action', width: 80 },
  { title: '描述', dataIndex: 'description' },
  { title: '方法', slotName: 'method', width: 80 },
  { title: 'IP', dataIndex: 'ip', width: 130 },
  { title: '耗时', slotName: 'duration', width: 80 },
  { title: '状态', slotName: 'status', width: 80 },
  { title: '操作时间', dataIndex: 'createdAt', width: 170 },
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
    Message.error('加载操作日志失败');
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

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handlePageSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-input
            v-model="keyword"
            placeholder="搜索操作人 / 描述"
            allow-clear
            @press-enter="handleSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="moduleFilter"
            placeholder="模块"
            allow-clear
            style="width: 100%"
          >
            <a-option v-for="m in modules" :key="m" :value="m" :label="m" />
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-space>
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
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
        <template #method="{ record }">
          <a-tag :color="methodType[record.method]" size="small">
            {{ record.method }}
          </a-tag>
        </template>
        <template #duration="{ record }">
          <span
            :style="{ color: record.duration > 300 ? '#f53f3f' : '#00b42a' }"
            >{{ record.duration }}ms</span
          >
        </template>
        <template #status="{ record }">
          <a-tag
            :color="record.status === 'success' ? 'green' : 'red'"
            size="small"
          >
            {{ record.status === 'success' ? '成功' : '失败' }}
          </a-tag>
        </template>
      </a-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <a-pagination
          :current="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-total
          show-jumper
          show-page-size
          @change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </a-card>
  </div>
</template>
