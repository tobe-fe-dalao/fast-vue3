<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

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
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '错误类型', colKey: 'type', width: 130 },
  { title: '错误信息', colKey: 'message' },
  { title: '页面', colKey: 'page', width: 150 },
  { title: '浏览器', colKey: 'browser', width: 110 },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '时间', colKey: 'createdAt', width: 170 },
  { title: '操作', colKey: 'actions', width: 130 },
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
    MessagePlugin.error('加载错误日志失败');
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

function openDetail(record: ErrorLog) {
  detailRecord.value = record;
  drawerVisible.value = true;
}

function handleResolve(record: ErrorLog) {
  record.status = 'resolved';
  MessagePlugin.success('已标记为已解决');
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <t-card style="margin-bottom: 16px">
      <t-row :gutter="16">
        <t-col :span="4">
          <t-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            @change="handleSearch"
          >
            <t-option label="待处理" value="pending" />
            <t-option label="已解决" value="resolved" />
          </t-select>
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
        <template #type="{ row }">
          <t-tag theme="danger" size="small">{{ row.type }}</t-tag>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'resolved' ? 'success' : 'warning'"
            size="small"
          >
            {{ row.status === 'resolved' ? '已解决' : '待处理' }}
          </t-tag>
        </template>
        <template #actions="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDetail(row)"
          >
            详情
          </t-button>
          <t-popconfirm
            v-if="row.status === 'pending'"
            content="确定标记为已解决？"
            @confirm="handleResolve(row)"
          >
            <t-button theme="primary" variant="text" size="small">
              解决
            </t-button>
          </t-popconfirm>
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

    <t-drawer
      v-model:visible="drawerVisible"
      header="错误详情"
      size="560px"
      :footer="false"
    >
      <template v-if="detailRecord">
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">错误类型</div>
          <t-tag theme="danger" size="small">{{ detailRecord.type }}</t-tag>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">错误信息</div>
          <div>{{ detailRecord.message }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">页面</div>
          <div>{{ detailRecord.page }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">浏览器</div>
          <div>{{ detailRecord.browser }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">操作系统</div>
          <div>{{ detailRecord.os }}</div>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">状态</div>
          <t-tag
            :theme="detailRecord.status === 'resolved' ? 'success' : 'warning'"
            size="small"
          >
            {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
          </t-tag>
        </div>
        <div
          style="display: flex; padding: 12px 0; border-bottom: 1px solid #eee"
        >
          <div style="width: 80px; color: #999">时间</div>
          <div>{{ detailRecord.createdAt }}</div>
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
    </t-drawer>
  </div>
</template>
