<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

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
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '用户名', colKey: 'username', width: 110 },
  { title: 'IP 地址', colKey: 'ip', width: 140 },
  { title: '浏览器', colKey: 'browser', width: 120 },
  { title: '操作系统', colKey: 'os', width: 130 },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '消息', colKey: 'message' },
  { title: '登录时间', colKey: 'createdAt', width: 170 },
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
    MessagePlugin.error('加载登录日志失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
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
        <t-col :span="8">
          <t-input
            v-model="keyword"
            placeholder="搜索用户名"
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
