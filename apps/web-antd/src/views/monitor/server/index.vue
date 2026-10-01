<script setup lang="ts">
import type { ServerInfo } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const info = ref<null | ServerInfo>(null);

async function fetchData() {
  loading.value = true;
  try {
    info.value = await api.monitor.server();
  } catch {
    message.error('加载服务器信息失败');
  } finally {
    loading.value = false;
  }
}

function usageStatus(usage: number): 'exception' | 'normal' | 'success' {
  if (usage >= 80) return 'exception';
  if (usage >= 60) return 'normal';
  return 'success';
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <ASpin :spinning="loading">
      <ARow :gutter="[16, 16]">
        <!-- CPU -->
        <ACol :xs="24" :md="8">
          <ACard :bordered="false" class="shadow-sm" title="CPU">
            <div class="gauge-value">{{ info?.cpu.usage ?? 0 }}%</div>
            <AProgress
              :percent="info?.cpu.usage ?? 0"
              :status="usageStatus(info?.cpu.usage ?? 0)"
              :show-info="false"
            />
            <div class="meta-list">
              <div class="meta-row">
                <span>核心数</span><span>{{ info?.cpu.cores ?? '-' }}</span>
              </div>
              <div class="meta-row">
                <span>型号</span><span>{{ info?.cpu.model ?? '-' }}</span>
              </div>
            </div>
          </ACard>
        </ACol>

        <!-- Memory -->
        <ACol :xs="24" :md="8">
          <ACard :bordered="false" class="shadow-sm" title="内存">
            <div class="gauge-value">{{ info?.memory.usage ?? 0 }}%</div>
            <AProgress
              :percent="info?.memory.usage ?? 0"
              :status="usageStatus(info?.memory.usage ?? 0)"
              :show-info="false"
            />
            <div class="meta-list">
              <div class="meta-row">
                <span>总量</span><span>{{ info?.memory.total ?? '-' }}</span>
              </div>
              <div class="meta-row">
                <span>已用</span><span>{{ info?.memory.used ?? '-' }}</span>
              </div>
            </div>
          </ACard>
        </ACol>

        <!-- Disk -->
        <ACol :xs="24" :md="8">
          <ACard :bordered="false" class="shadow-sm" title="磁盘">
            <div class="gauge-value">{{ info?.disk.usage ?? 0 }}%</div>
            <AProgress
              :percent="info?.disk.usage ?? 0"
              :status="usageStatus(info?.disk.usage ?? 0)"
              :show-info="false"
            />
            <div class="meta-list">
              <div class="meta-row">
                <span>总量</span><span>{{ info?.disk.total ?? '-' }}</span>
              </div>
              <div class="meta-row">
                <span>已用</span><span>{{ info?.disk.used ?? '-' }}</span>
              </div>
            </div>
          </ACard>
        </ACol>

        <!-- Runtime -->
        <ACol :span="24">
          <ACard :bordered="false" class="shadow-sm" title="运行环境">
            <ADescriptions :column="{ xs: 1, sm: 2, md: 4 }" size="small">
              <ADescriptionsItem label="Node 版本">
                {{ info?.runtime.node ?? '-' }}
              </ADescriptionsItem>
              <ADescriptionsItem label="操作系统">
                {{ info?.runtime.os ?? '-' }}
              </ADescriptionsItem>
              <ADescriptionsItem label="服务端口">
                {{ info?.runtime.port ?? '-' }}
              </ADescriptionsItem>
              <ADescriptionsItem label="运行时长">
                {{ info?.runtime.uptime ?? '-' }}
              </ADescriptionsItem>
            </ADescriptions>
          </ACard>
        </ACol>

        <!-- Trend -->
        <ACol :span="24">
          <ACard :bordered="false" class="shadow-sm" title="资源使用趋势">
            <div class="trend-chart">
              <div
                v-for="point in info?.trend ?? []"
                :key="point.time"
                class="trend-col"
              >
                <div class="trend-bars">
                  <div
                    class="trend-bar trend-bar--cpu"
                    :style="{ height: `${point.usage}%` }"
                    :title="`使用率 ${point.usage}%`"
                  ></div>
                </div>
                <div class="trend-time">{{ point.time }}</div>
              </div>
            </div>
            <div class="trend-legend">
              <span><i class="dot dot--cpu"></i>CPU</span>
              <span><i class="dot dot--mem"></i>内存</span>
            </div>
          </ACard>
        </ACol>
      </ARow>
    </ASpin>
  </div>
</template>

<style scoped>
.gauge-value {
  margin-bottom: 8px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
}

.meta-list {
  margin-top: 12px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.meta-row span:last-child {
  color: #111827;
}

.trend-chart {
  display: flex;
  gap: 24px;
  align-items: flex-end;
  height: 160px;
  padding: 8px 4px 0;
}

.trend-col {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.trend-bars {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  height: 130px;
}

.trend-bar {
  width: 14px;
  border-radius: 4px 4px 0 0;
  transition: height 0.4s ease;
}

.trend-bar--cpu {
  background: #1677ff;
}

.trend-bar--mem {
  background: #722ed1;
}

.trend-time {
  margin-top: 8px;
  font-size: 0.75rem;
  color: #9ca3af;
}

.trend-legend {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 12px;
  font-size: 0.8rem;
  color: #6b7280;
}

.trend-legend .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
}

.dot--cpu {
  background: #1677ff;
}

.dot--mem {
  background: #722ed1;
}
</style>
