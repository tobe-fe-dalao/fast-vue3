<script setup lang="ts">
import { http } from '@/api/http';
import { useToast } from 'primevue/usetoast';

interface ErrorLog {
  id: number;
  type: string;
  message: string;
  page: string;
  stack: string;
  browser: string;
  os: string;
  status: string;
  createdAt: string;
}

const toast = useToast();

const loading = ref(false);
const dataSource = ref<ErrorLog[]>([]);
const total = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const statusFilter = ref('');

const detailVisible = ref(false);
const detailRecord = ref<ErrorLog | null>(null);

const statusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '已解决', value: 'resolved' },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: ErrorLog[]; total: number }>({
      url: '/log/error',
      params: {
        page: currentPage.value + 1,
        pageSize: pageSize.value,
        status: statusFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载错误日志失败',
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

function openDetail(record: ErrorLog) {
  detailRecord.value = record;
  detailVisible.value = true;
}

function handleResolve(record: ErrorLog) {
  record.status = 'resolved';
  toast.add({ severity: 'success', summary: '成功', detail: '已标记为已解决' });
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <Toast />

    <Card style="margin-bottom: 16px">
      <template #content>
        <div style="display: flex; gap: 12px; align-items: center">
          <Select
            v-model="statusFilter"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            placeholder="状态"
            show-clear
            style="width: 140px"
            @change="handleSearch"
          />
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
          <Column header="错误类型" style="width: 130px">
            <template #body="{ data }">
              <Tag :value="data.type" severity="danger" />
            </template>
          </Column>
          <Column field="message" header="错误信息" />
          <Column field="page" header="页面" style="width: 150px" />
          <Column field="browser" header="浏览器" style="width: 110px" />
          <Column header="状态" style="width: 90px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'resolved' ? '已解决' : '待处理'"
                :severity="data.status === 'resolved' ? 'success' : 'warn'"
              />
            </template>
          </Column>
          <Column field="createdAt" header="时间" style="width: 170px" />
          <Column header="操作" style="width: 130px">
            <template #body="{ data }">
              <Button
                label="详情"
                size="small"
                text
                @click="openDetail(data)"
              />
              <Button
                v-if="data.status === 'pending'"
                label="解决"
                size="small"
                text
                @click="handleResolve(data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- 详情 Drawer -->
    <Drawer
      v-model:visible="detailVisible"
      header="错误详情"
      :style="{ width: '560px' }"
    >
      <template v-if="detailRecord">
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div>
            <strong>错误类型：</strong>
            <Tag :value="detailRecord.type" severity="danger" />
          </div>
          <div><strong>错误信息：</strong>{{ detailRecord.message }}</div>
          <div><strong>页面：</strong>{{ detailRecord.page }}</div>
          <div><strong>浏览器：</strong>{{ detailRecord.browser }}</div>
          <div><strong>操作系统：</strong>{{ detailRecord.os }}</div>
          <div>
            <strong>状态：</strong>
            <Tag
              :value="detailRecord.status === 'resolved' ? '已解决' : '待处理'"
              :severity="
                detailRecord.status === 'resolved' ? 'success' : 'warn'
              "
            />
          </div>
          <div><strong>时间：</strong>{{ detailRecord.createdAt }}</div>
        </div>
        <h5 style="margin: 16px 0 8px">堆栈信息</h5>
        <pre
          style="
            padding: 12px;
            overflow-x: auto;
            font-size: 12px;
            white-space: pre-wrap;
            background: #f5f5f5;
            border-radius: 6px;
          "
          >{{ detailRecord.stack }}</pre
        >
      </template>
    </Drawer>
  </div>
</template>
