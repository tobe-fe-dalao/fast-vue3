<script setup lang="ts">
import type { LoginLogItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<LoginLogItem[]>([]);
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
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '消息', dataIndex: 'message' },
  { title: '登录时间', dataIndex: 'createdAt', width: 170 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.log.login({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
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

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="8">
          <AInputSearch
            v-model:value="keyword"
            placeholder="搜索用户名"
            allow-clear
            @search="handleSearch"
          />
        </ACol>
      </ARow>
    </ACard>

    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 1000 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              <ATag
                :color="
                  (record as LoginLogItem).status === 'success'
                    ? 'green'
                    : 'red'
                "
              >
                {{
                  (record as LoginLogItem).status === 'success'
                    ? '成功'
                    : '失败'
                }}
              </ATag>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
