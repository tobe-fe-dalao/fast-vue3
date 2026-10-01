<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

interface LoginLog {
  id: number;
  username: string;
  ip: string;
  browser: string;
  os: string;
  status: string;
  message: string;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<LoginLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '用户名', dataIndex: 'username', width: 110 },
  { title: 'IP 地址', dataIndex: 'ip', width: 140 },
  { title: '浏览器', dataIndex: 'browser', width: 120 },
  { title: '操作系统', dataIndex: 'os', width: 130 },
  { title: '状态', slotName: 'status', width: 90 },
  { title: '消息', dataIndex: 'message' },
  { title: '登录时间', dataIndex: 'createdAt', width: 170 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: LoginLog[]; total: number }>({
      url: '/log/login',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    Message.error('加载登录日志失败');
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
        <a-col :span="8">
          <a-input-search
            v-model="keyword"
            placeholder="搜索用户名"
            allow-clear
            @search="handleSearch"
          />
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
