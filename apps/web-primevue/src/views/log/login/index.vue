<script setup lang="ts">
import { http } from '@/api/http';
import { useToast } from 'primevue/usetoast';

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

const toast = useToast();

const loading = ref(false);
const dataSource = ref<LoginLog[]>([]);
const total = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const keyword = ref('');

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: LoginLog[]; total: number }>({
      url: '/log/login',
      params: {
        page: currentPage.value + 1,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载登录日志失败',
    });
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
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
        <div style="display: flex; gap: 12px; align-items: center">
          <InputText
            v-model="keyword"
            placeholder="搜索用户名"
            @keyup.enter="handleSearch"
          />
          <Button label="搜索" @click="handleSearch" />
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
          <Column field="username" header="用户名" style="width: 110px" />
          <Column field="ip" header="IP 地址" style="width: 140px" />
          <Column field="browser" header="浏览器" style="width: 120px" />
          <Column field="os" header="操作系统" style="width: 130px" />
          <Column header="状态" style="width: 90px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'success' ? '成功' : '失败'"
                :severity="data.status === 'success' ? 'success' : 'danger'"
              />
            </template>
          </Column>
          <Column field="message" header="消息" />
          <Column field="createdAt" header="登录时间" style="width: 170px" />
        </DataTable>
      </template>
    </Card>
  </div>
</template>
