<script setup lang="ts">
import type { OperationLogItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<OperationLogItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref('');

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '操作人', dataIndex: 'username', width: 100 },
  { title: '模块', dataIndex: 'module', width: 110 },
  { title: '操作', dataIndex: 'action', width: 80 },
  { title: '描述', dataIndex: 'description' },
  { title: '方法', dataIndex: 'method', width: 80 },
  { title: 'IP', dataIndex: 'ip', width: 130 },
  { title: '耗时', dataIndex: 'duration', width: 80 },
  { title: '状态', dataIndex: 'status', width: 80 },
  { title: '操作时间', dataIndex: 'createdAt', width: 170 },
];

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];

const methodColor: Record<string, string> = {
  GET: 'green',
  POST: 'blue',
  PUT: 'orange',
  DELETE: 'red',
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.log.operation({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      module: moduleFilter.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
  } catch {
    message.error('加载操作日志失败');
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

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
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
        <ACol :span="6">
          <AInput
            v-model:value="keyword"
            placeholder="搜索操作人 / 描述"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="moduleFilter"
            placeholder="模块"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption v-for="m in modules" :key="m" :value="m">
              {{ m }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
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
          :scroll="{ x: 1100 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'method'">
              <ATag
                :color="
                  methodColor[(record as OperationLogItem).method] || 'default'
                "
              >
                {{ (record as OperationLogItem).method }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'duration'">
              <span
                :style="{
                  color:
                    (record as OperationLogItem).duration > 300
                      ? '#f5222d'
                      : '#52c41a',
                }"
              >
                {{ (record as OperationLogItem).duration }}ms
              </span>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag
                :color="
                  (record as OperationLogItem).status === 'success'
                    ? 'green'
                    : 'red'
                "
              >
                {{
                  (record as OperationLogItem).status === 'success'
                    ? '成功'
                    : '失败'
                }}
              </ATag>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
