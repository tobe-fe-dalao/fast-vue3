<script setup lang="ts">
import { http } from '@/api/http';
import {
  NButton,
  NDataTable,
  NDescriptions,
  NDescriptionsItem,
  NDrawer,
  NDrawerContent,
  NTag,
  useMessage,
} from 'naive-ui';

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

const message = useMessage();
const loading = ref(false);
const dataSource = ref<ErrorLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const statusFilter = ref<null | string>(null);

const showDetail = ref(false);
const detailRecord = ref<ErrorLog | null>(null);

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '错误类型',
    key: 'type',
    width: 130,
    render: (row: ErrorLog) =>
      h(NTag, { type: 'error', size: 'small' }, () => row.type),
  },
  { title: '错误信息', key: 'message' },
  { title: '页面', key: 'page', width: 150 },
  { title: '浏览器', key: 'browser', width: 110 },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: ErrorLog) =>
      h(
        NTag,
        {
          type: row.status === 'resolved' ? 'success' : 'warning',
          size: 'small',
        },
        () => (row.status === 'resolved' ? '已解决' : '待处理'),
      ),
  },
  { title: '时间', key: 'createdAt', width: 170 },
  {
    title: '操作',
    key: 'action',
    width: 130,
    render: (row: ErrorLog) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openDetail(row),
        },
        () => '详情',
      ),
      row.status === 'pending'
        ? h(
            NButton,
            {
              text: true,
              type: 'primary',
              size: 'small',
              onClick: () => handleResolve(row),
              style: { marginLeft: '8px' },
            },
            () => '解决',
          )
        : null,
    ],
  },
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
    message.error('加载错误日志失败');
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
  showDetail.value = true;
}
function handleResolve(record: ErrorLog) {
  record.status = 'resolved';
  message.success('已标记为已解决');
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <NCard style="margin-bottom: 16px">
      <NSelect
        v-model:value="statusFilter"
        placeholder="状态"
        clearable
        :options="[
          { label: '待处理', value: 'pending' },
          { label: '已解决', value: 'resolved' },
        ]"
        style="width: 140px"
        @update:value="handleSearch"
      />
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

    <NDrawer v-model:show="showDetail" :width="560" title="错误详情">
      <NDrawerContent>
        <template v-if="detailRecord">
          <NDescriptions :column="1" label-placement="left" bordered>
            <NDescriptionsItem label="错误类型">
              {{ detailRecord.type }}
            </NDescriptionsItem>
            <NDescriptionsItem label="错误信息">
              {{ detailRecord.message }}
            </NDescriptionsItem>
            <NDescriptionsItem label="页面">
              {{ detailRecord.page }}
            </NDescriptionsItem>
            <NDescriptionsItem label="浏览器">
              {{ detailRecord.browser }}
            </NDescriptionsItem>
            <NDescriptionsItem label="操作系统">
              {{ detailRecord.os }}
            </NDescriptionsItem>
            <NDescriptionsItem label="状态">
              {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
            </NDescriptionsItem>
            <NDescriptionsItem label="时间">
              {{ detailRecord.createdAt }}
            </NDescriptionsItem>
          </NDescriptions>
          <h4 style="margin: 16px 0 8px">堆栈信息</h4>
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
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
