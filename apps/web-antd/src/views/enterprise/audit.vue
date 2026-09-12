<script setup lang="ts">
import type { AuditOperationItem } from '@/api';

import { onMounted, ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const items = ref<AuditOperationItem[]>([]);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    items.value = await api.audit.operations();
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}
onMounted(load);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4">操作审计</ATypographyTitle
    ><ACard :bordered="false">
      <ATable
        :data-source="items"
        :loading="loading"
        row-key="id"
        :scroll="{ x: 1000 }"
      >
        <ATableColumn
          title="时间"
          data-index="createdAt"
          key="createdAt"
        /><ATableColumn
          title="请求 ID"
          data-index="requestId"
          key="requestId"
        /><ATableColumn
          title="用户 ID"
          data-index="userId"
          key="userId"
        /><ATableColumn
          title="方法"
          data-index="method"
          key="method"
        /><ATableColumn
          title="路径"
          data-index="path"
          key="path"
        /><ATableColumn
          title="HTTP 状态"
          data-index="status"
          key="status"
        /><ATableColumn
          title="耗时 (ms)"
          data-index="duration"
          key="duration"
        />
      </ATable>
    </ACard>
  </div>
</template>
