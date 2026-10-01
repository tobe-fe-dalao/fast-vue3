<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const { error: messageError } = useMessage();

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

const methodColor: Record<string, string> = {
  GET: 'success',
  POST: 'blue',
  PUT: 'warning',
  DELETE: 'error',
};

const columns = [
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '操作人', dataKey: 'username', width: 100 },
  { title: '模块', dataKey: 'module', width: 110 },
  { title: '操作', dataKey: 'action', width: 80 },
  { title: '描述', dataKey: 'description' },
  { title: '方法', key: 'method', width: 80, customCell: true },
  { title: 'IP', dataKey: 'ip', width: 130 },
  { title: '耗时', key: 'duration', width: 80, customCell: true },
  { title: '状态', key: 'status', width: 80, customCell: true },
  { title: '操作时间', dataKey: 'createdAt', width: 170 },
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
    messageError('加载操作日志失败');
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

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <IxInput
          v-model:value="keyword"
          placeholder="搜索操作人 / 描述"
          style="width: 220px"
          @keyup.enter="handleSearch"
        />
        <IxSelect
          v-model:value="moduleFilter"
          placeholder="模块"
          clearable
          style="width: 140px"
        >
          <IxSelectOption v-for="m in modules" :key="m" :label="m" :value="m" />
        </IxSelect>
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
        <IxButton @click="handleReset">重置</IxButton>
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
          <template v-if="column.key === 'method'">
            <IxTag :color="methodColor[record.method] as any">
              {{ record.method }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'duration'">
            <span
              :style="{ color: record.duration > 300 ? '#f56c6c' : '#67c23a' }"
              >{{ record.duration }}ms</span
            >
          </template>
          <template v-else-if="column.key === 'status'">
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
