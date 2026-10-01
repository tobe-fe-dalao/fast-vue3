<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage } from 'element-plus';

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
    ElMessage.error('加载错误日志失败');
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
  ElMessage.success('已标记为已解决');
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16">
        <el-col :span="4">
          <el-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
            @change="handleSearch"
          >
            <el-option label="待处理" value="pending" />
            <el-option label="已解决" value="resolved" />
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="dataSource" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column label="错误类型" width="130">
          <template #default="{ row }">
            <el-tag type="danger" size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="错误信息" />
        <el-table-column prop="page" label="页面" width="150" />
        <el-table-column prop="browser" label="浏览器" width="110" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'resolved' ? 'success' : 'warning'"
              size="small"
            >
              {{ row.status === 'resolved' ? '已解决' : '待处理' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="时间" width="170" />
        <el-table-column label="操作" width="130">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="openDetail(row)"
            >
              详情
            </el-button>
            <el-button
              v-if="row.status === 'pending'"
              type="primary"
              link
              size="small"
              @click="handleResolve(row)"
            >
              解决
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @current-change="handlePageChange"
          @size-change="
            (s: number) => {
              pageSize = s;
              currentPage = 1;
              fetchData();
            }
          "
        />
      </div>
    </el-card>

    <el-drawer v-model="drawerVisible" title="错误详情" size="560px">
      <template v-if="detailRecord">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="错误类型">
            <el-tag type="danger" size="small">{{ detailRecord.type }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="错误信息">
            {{ detailRecord.message }}
          </el-descriptions-item>
          <el-descriptions-item label="页面">
            {{ detailRecord.page }}
          </el-descriptions-item>
          <el-descriptions-item label="浏览器">
            {{ detailRecord.browser }}
          </el-descriptions-item>
          <el-descriptions-item label="操作系统">
            {{ detailRecord.os }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag
              :type="detailRecord.status === 'resolved' ? 'success' : 'warning'"
              size="small"
            >
              {{ detailRecord.status === 'resolved' ? '已解决' : '待处理' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="时间">
            {{ detailRecord.createdAt }}
          </el-descriptions-item>
        </el-descriptions>
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
    </el-drawer>
  </div>
</template>
