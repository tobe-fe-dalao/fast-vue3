<script setup lang="ts">
import type { DataOverview } from '@/api';

import { api } from '@/api';
import { DownloadOutlined } from '@ant-design/icons-vue';

interface RecentItem {
  amount: string;
  date: string;
  status: string;
  type: string;
}

const loading = ref(true);

const stats = ref<DataOverview['stats']>([]);
const recentData = ref<RecentItem[]>([]);

const channels = [
  { name: '官网直访', percent: 38 },
  { name: '搜索引擎', percent: 27 },
  { name: '社交媒体', percent: 18 },
  { name: '邮件营销', percent: 9 },
  { name: '合作渠道', percent: 8 },
];

const statusColorMap: Record<string, string> = {
  已完成: 'green',
  待支付: 'orange',
  已退款: 'red',
  成功: 'green',
  处理中: 'orange',
};

const recentColumns = [
  { title: '日期', dataIndex: 'date', width: 130 },
  { title: '业务类型', dataIndex: 'type' },
  { title: '金额', dataIndex: 'amount', width: 140 },
  { title: '状态', dataIndex: 'status', width: 110 },
];

onMounted(async () => {
  try {
    const data = await api.analytics.dataOverview();
    stats.value = data.stats;
    recentData.value = data.recent;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="admin-page">
    <ASpin :spinning="loading">
      <!-- Stats -->
      <ARow :gutter="16" class="mb-4">
        <ACol v-for="s in stats" :key="s.title" :span="6">
          <ACard
            :bordered="false"
            class="shadow-sm"
            :style="{ borderLeft: `4px solid ${s.border}` }"
          >
            <AStatistic
              :title="s.title"
              :value="s.value"
              :precision="s.suffix === '万' ? 1 : 0"
              :prefix="s.prefix"
              :suffix="s.suffix"
            />
          </ACard>
        </ACol>
      </ARow>

      <ARow :gutter="16">
        <!-- Recent business data -->
        <ACol :span="15">
          <ACard title="近期业务数据" :bordered="false" class="shadow-sm">
            <template #extra>
              <AButton size="small"> <DownloadOutlined />导出 </AButton>
            </template>
            <ATable
              :data-source="recentData"
              :columns="recentColumns"
              :pagination="false"
              size="middle"
              row-key="date"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'status'">
                  <ATag :color="statusColorMap[(record as RecentItem).status]">
                    {{ (record as RecentItem).status }}
                  </ATag>
                </template>
              </template>
            </ATable>
          </ACard>
        </ACol>

        <!-- Channel distribution -->
        <ACol :span="9">
          <ACard title="渠道分布" :bordered="false" class="shadow-sm">
            <div v-for="c in channels" :key="c.name" class="mb-3">
              <div class="mb-1 flex items-center justify-between text-sm">
                <span class="text-gray-600">{{ c.name }}</span>
                <span class="text-gray-500">{{ c.percent }}%</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded bg-gray-100">
                <div
                  class="h-full rounded bg-blue-500"
                  :style="{ width: `${c.percent}%` }"
                ></div>
              </div>
            </div>
          </ACard>
        </ACol>
      </ARow>
    </ASpin>
  </div>
</template>
