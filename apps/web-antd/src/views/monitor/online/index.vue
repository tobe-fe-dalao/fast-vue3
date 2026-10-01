<script setup lang="ts">
import type { OnlineUserItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<OnlineUserItem[]>([]);

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '用户名', dataIndex: 'username', width: 110 },
  { title: '姓名', dataIndex: 'realName', width: 100 },
  { title: '部门', dataIndex: 'department', width: 100 },
  { title: '登录 IP', dataIndex: 'ip', width: 140 },
  { title: '浏览器', dataIndex: 'browser', width: 120 },
  { title: '操作系统', dataIndex: 'os', width: 130 },
  { title: '登录时间', dataIndex: 'loginAt', width: 170 },
  { title: '操作', key: 'action', width: 100, fixed: 'right' as const },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.monitor.online();
    dataSource.value = res.items;
  } catch {
    message.error('加载在线用户失败');
  } finally {
    loading.value = false;
  }
}

function handleForceLogout(record: OnlineUserItem) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  message.success(`已强制下线 ${record.username}`);
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="false"
          size="middle"
          row-key="id"
          :scroll="{ x: 1000 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'username'">
              <span style="display: inline-flex; gap: 6px; align-items: center">
                <ABadge status="success" />
                {{ record.username }}
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <APopconfirm
                title="确定强制该用户下线？"
                @confirm="handleForceLogout(record as OnlineUserItem)"
              >
                <AButton type="link" size="small" danger>强退</AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
