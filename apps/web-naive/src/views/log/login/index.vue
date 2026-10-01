<script setup lang="ts">
import { http } from '@/api/http';
import { NDataTable, NTag, useMessage } from 'naive-ui';

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

const message = useMessage();
const loading = ref(false);
const dataSource = ref<LoginLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '用户名', key: 'username', width: 110 },
  { title: 'IP 地址', key: 'ip', width: 140 },
  { title: '浏览器', key: 'browser', width: 120 },
  { title: '操作系统', key: 'os', width: 130 },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: LoginLog) =>
      h(
        NTag,
        { type: row.status === 'success' ? 'success' : 'error', size: 'small' },
        () => (row.status === 'success' ? '成功' : '失败'),
      ),
  },
  { title: '消息', key: 'message' },
  { title: '登录时间', key: 'createdAt', width: 170 },
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
    message.error('加载登录日志失败');
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

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <NCard style="margin-bottom: 16px">
      <NInput
        v-model:value="keyword"
        placeholder="搜索用户名"
        clearable
        style="width: 240px"
        @keyup.enter="handleSearch"
      >
        <template #suffix>
          <NButton text size="small" @click="handleSearch"> 搜索 </NButton>
        </template>
      </NInput>
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
