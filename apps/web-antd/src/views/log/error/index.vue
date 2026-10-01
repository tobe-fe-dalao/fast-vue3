<script setup lang="ts">
import type { ErrorLogItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<ErrorLogItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const statusFilter = ref('');

const detailVisible = ref(false);
const detailRecord = ref<ErrorLogItem | null>(null);

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '错误类型', dataIndex: 'type', width: 130 },
  { title: '错误信息', dataIndex: 'message' },
  { title: '页面', dataIndex: 'page', width: 150 },
  { title: '浏览器', dataIndex: 'browser', width: 110 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 130 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.log.error({
      page: currentPage.value,
      pageSize: pageSize.value,
      status: statusFilter.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
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

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openDetail(record: ErrorLogItem) {
  detailRecord.value = record;
  detailVisible.value = true;
}

function handleResolve(record: ErrorLogItem) {
  record.status = 'resolved';
  message.success('已标记为已解决');
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
        <ACol :span="4">
          <ASelect
            v-model:value="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
            @change="handleSearch"
          >
            <ASelectOption value="pending">待处理</ASelectOption>
            <ASelectOption value="resolved">已解决</ASelectOption>
          </ASelect>
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
            <template v-if="column.dataIndex === 'type'">
              <ATag color="red">{{ record.type }}</ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag :color="record.status === 'resolved' ? 'green' : 'orange'">
                {{ record.status === 'resolved' ? '已解决' : '待处理' }}
              </ATag>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openDetail(record as ErrorLogItem)"
              >
                > 详情
              </AButton>
              <AButton
                v-if="record.status === 'pending'"
                type="link"
                size="small"
                @click="handleResolve(record as ErrorLogItem)"
              >
                解决
              </AButton>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <!-- 错误详情 -->
    <ADrawer v-model:open="detailVisible" title="错误详情" :width="560">
      <template v-if="detailRecord">
        <ADescriptions :column="1" bordered size="small" class="mb-4">
          <ADescriptionsItem label="错误类型">
            <ATag color="red">{{ detailRecord.type }}</ATag>
          </ADescriptionsItem>
          <ADescriptionsItem label="错误信息">
            {{ detailRecord.message }}
          </ADescriptionsItem>
          <ADescriptionsItem label="页面">
            {{ detailRecord.page }}
          </ADescriptionsItem>
          <ADescriptionsItem label="浏览器">
            {{ detailRecord.browser }}
          </ADescriptionsItem>
          <ADescriptionsItem label="操作系统">
            {{ detailRecord.os }}
          </ADescriptionsItem>
          <ADescriptionsItem label="状态">
            <ATag
              :color="detailRecord.status === 'resolved' ? 'green' : 'orange'"
            >
              {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
            </ATag>
          </ADescriptionsItem>
          <ADescriptionsItem label="时间">
            {{ detailRecord.createdAt }}
          </ADescriptionsItem>
        </ADescriptions>
        <ATypographyTitle :level="5">堆栈信息</ATypographyTitle>
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
    </ADrawer>
  </div>
</template>
