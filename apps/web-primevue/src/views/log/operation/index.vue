<script setup lang="ts">
import { http } from '@/api/http';
import { useToast } from 'primevue/usetoast';

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

const toast = useToast();

const loading = ref(false);
const dataSource = ref<OperationLog[]>([]);
const total = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref('');

const moduleOptions = [
  { label: '用户管理', value: '用户管理' },
  { label: '角色管理', value: '角色管理' },
  { label: '菜单管理', value: '菜单管理' },
  { label: '系统设置', value: '系统设置' },
  { label: '日志管理', value: '日志管理' },
];

const methodSeverity: Record<string, string> = {
  GET: 'success',
  POST: 'info',
  PUT: 'warn',
  DELETE: 'danger',
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: OperationLog[]; total: number }>({
      url: '/log/operation',
      params: {
        page: currentPage.value + 1,
        pageSize: pageSize.value,
        keyword: keyword.value,
        module: moduleFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载操作日志失败',
    });
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 0;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  moduleFilter.value = '';
  currentPage.value = 0;
  fetchData();
}

function onPageChange(event: { page: number; rows: number }) {
  currentPage.value = event.page;
  pageSize.value = event.rows;
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <Toast />

    <Card style="margin-bottom: 16px">
      <template #content>
        <div
          style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
        >
          <InputText
            v-model="keyword"
            placeholder="搜索操作人 / 描述"
            @keyup.enter="handleSearch"
          />
          <Select
            v-model="moduleFilter"
            :options="moduleOptions"
            option-label="label"
            option-value="value"
            placeholder="模块"
            show-clear
            style="width: 140px"
          />
          <Button label="搜索" @click="handleSearch" />
          <Button label="重置" severity="secondary" @click="handleReset" />
        </div>
      </template>
    </Card>

    <Card>
      <template #content>
        <DataTable
          :value="dataSource"
          :loading="loading"
          :paginator="true"
          :rows="pageSize"
          :total-records="total"
          :lazy="true"
          @page="onPageChange"
          striped-rows
          size="small"
          data-key="id"
        >
          <Column field="id" header="ID" style="width: 60px" />
          <Column field="username" header="操作人" style="width: 100px" />
          <Column field="module" header="模块" style="width: 110px" />
          <Column field="action" header="操作" style="width: 80px" />
          <Column field="description" header="描述" />
          <Column header="方法" style="width: 80px">
            <template #body="{ data }">
              <Tag
                :value="data.method"
                :severity="methodSeverity[data.method] as any"
              />
            </template>
          </Column>
          <Column field="ip" header="IP" style="width: 130px" />
          <Column header="耗时" style="width: 80px">
            <template #body="{ data }">
              <span
                :style="{ color: data.duration > 300 ? '#ef4444' : '#22c55e' }"
                >{{ data.duration }}ms</span
              >
            </template>
          </Column>
          <Column header="状态" style="width: 80px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'success' ? '成功' : '失败'"
                :severity="data.status === 'success' ? 'success' : 'danger'"
              />
            </template>
          </Column>
          <Column field="createdAt" header="操作时间" style="width: 170px" />
        </DataTable>
      </template>
    </Card>
  </div>
</template>
