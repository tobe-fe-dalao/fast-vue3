<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

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

const loading = ref(false);
const dataSource = ref<ErrorLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const statusFilter = ref('');

const drawerVisible = ref(false);
const detailRecord = ref<ErrorLog | null>(null);

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '错误类型', slotName: 'type', width: 130 },
  { title: '错误信息', dataIndex: 'message' },
  { title: '页面', dataIndex: 'page', width: 150 },
  { title: '浏览器', dataIndex: 'browser', width: 110 },
  { title: '状态', slotName: 'status', width: 90 },
  { title: '时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', slotName: 'actions', width: 130 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: ErrorLog[]; total: number }>({
      url: '/log/error',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        status: statusFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    Message.error('加载错误日志失败');
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

function openDetail(record: ErrorLog) {
  detailRecord.value = record;
  drawerVisible.value = true;
}

function handleResolve(record: ErrorLog) {
  record.status = 'resolved';
  Message.success('已标记为已解决');
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16">
        <a-col :span="4">
          <a-select
            v-model="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
            @change="handleSearch"
          >
            <a-option value="pending" label="待处理" />
            <a-option value="resolved" label="已解决" />
          </a-select>
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
        <template #type="{ record }">
          <a-tag color="red" size="small">{{ record.type }}</a-tag>
        </template>
        <template #status="{ record }">
          <a-tag
            :color="record.status === 'resolved' ? 'green' : 'orange'"
            size="small"
          >
            {{ record.status === 'resolved' ? '已解决' : '待处理' }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button type="text" size="small" @click="openDetail(record)">
            详情
          </a-button>
          <a-button
            v-if="record.status === 'pending'"
            type="text"
            size="small"
            @click="handleResolve(record)"
          >
            解决
          </a-button>
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

    <a-drawer v-model:visible="drawerVisible" title="错误详情" :width="560">
      <template v-if="detailRecord">
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="错误类型">
            <a-tag color="red" size="small">{{ detailRecord.type }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="错误信息">
            {{ detailRecord.message }}
          </a-descriptions-item>
          <a-descriptions-item label="页面">
            {{ detailRecord.page }}
          </a-descriptions-item>
          <a-descriptions-item label="浏览器">
            {{ detailRecord.browser }}
          </a-descriptions-item>
          <a-descriptions-item label="操作系统">
            {{ detailRecord.os }}
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-tag
              :color="detailRecord.status === 'resolved' ? 'green' : 'orange'"
              size="small"
            >
              {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="时间">
            {{ detailRecord.createdAt }}
          </a-descriptions-item>
        </a-descriptions>
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
    </a-drawer>
  </div>
</template>
