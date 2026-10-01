<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const { success: messageSuccess, error: messageError } = useMessage();

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
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '错误类型', key: 'type', width: 130, customCell: true },
  { title: '错误信息', dataKey: 'message' },
  { title: '页面', dataKey: 'page', width: 150 },
  { title: '浏览器', dataKey: 'browser', width: 110 },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '时间', dataKey: 'createdAt', width: 170 },
  { title: '操作', key: 'actions', width: 130, customCell: true },
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
    messageError('加载错误日志失败');
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

function openDetail(record: ErrorLog) {
  detailRecord.value = record;
  drawerVisible.value = true;
}

function handleResolve(record: ErrorLog) {
  record.status = 'resolved';
  messageSuccess('已标记为已解决');
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div style="display: flex; gap: 12px; align-items: center">
        <IxSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          style="width: 140px"
          @change="handleSearch"
        >
          <IxSelectOption label="待处理" value="pending" />
          <IxSelectOption label="已解决" value="resolved" />
        </IxSelect>
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
          <template v-if="column.key === 'type'">
            <IxTag color="error">{{ record.type }}</IxTag>
          </template>
          <template v-else-if="column.key === 'status'">
            <IxTag
              :color="record.status === 'resolved' ? 'success' : 'warning'"
            >
              {{ record.status === 'resolved' ? '已解决' : '待处理' }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton mode="link" size="sm" @click="openDetail(record)">
              详情
            </IxButton>
            <IxButton
              v-if="record.status === 'pending'"
              mode="link"
              size="sm"
              @click="handleResolve(record)"
            >
              解决
            </IxButton>
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

    <!-- 详情 Drawer -->
    <IxDrawer
      v-model:visible="drawerVisible"
      title="错误详情"
      width="560px"
      placement="right"
    >
      <template v-if="detailRecord">
        <div style="padding: 8px 0">
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">错误类型</span>
            <IxTag color="error">{{ detailRecord.type }}</IxTag>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">错误信息</span
            ><span>{{ detailRecord.message }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">页面</span
            ><span>{{ detailRecord.page }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">浏览器</span
            ><span>{{ detailRecord.browser }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">操作系统</span
            ><span>{{ detailRecord.os }}</span>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">状态</span>
            <IxTag
              :color="
                detailRecord.status === 'resolved' ? 'success' : 'warning'
              "
            >
              {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
            </IxTag>
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #f0f0f0;
            "
          >
            <span style="color: #666">时间</span
            ><span>{{ detailRecord.createdAt }}</span>
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
        </div>
      </template>
    </IxDrawer>
  </div>
</template>
