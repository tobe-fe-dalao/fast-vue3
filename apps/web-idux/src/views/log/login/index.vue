<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const { error: messageError } = useMessage();

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
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '用户名', dataKey: 'username', width: 110 },
  { title: 'IP 地址', dataKey: 'ip', width: 140 },
  { title: '浏览器', dataKey: 'browser', width: 120 },
  { title: '操作系统', dataKey: 'os', width: 130 },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '消息', dataKey: 'message' },
  { title: '登录时间', dataKey: 'createdAt', width: 170 },
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
    messageError('加载登录日志失败');
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
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div style="display: flex; gap: 12px; align-items: center">
        <IxInput
          v-model:value="keyword"
          placeholder="搜索用户名"
          style="width: 280px"
          @keyup.enter="handleSearch"
        />
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
      </div>
    </IxCard>

    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'status'">
            <IxTag :color="record.status === 'success' ? 'success' : 'error'">
              {{ record.status === 'success' ? '成功' : '失败' }}
            </IxTag>
          </template>
        </template>
      </IxTable>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <IxPagination
          v-model:page-index="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          show-total
          @change="handlePageChange"
        />
      </div>
    </IxCard>
  </div>
</template>
