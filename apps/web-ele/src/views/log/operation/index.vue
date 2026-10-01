<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage } from 'element-plus';

interface OperationLog {
  id: number;
  username: string;
  module: string;
  action: string;
  description: string;
  ip: string;
  method: string;
  status: string;
  duration: number;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<OperationLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const moduleFilter = ref('');

const modules = ['用户管理', '角色管理', '菜单管理', '系统设置', '日志管理'];

const methodType: Record<string, string> = {
  GET: 'success',
  POST: 'primary',
  PUT: 'warning',
  DELETE: 'danger',
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: OperationLog[]; total: number }>({
      url: '/log/operation',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        module: moduleFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    ElMessage.error('加载操作日志失败');
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

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input
            v-model="keyword"
            placeholder="搜索操作人 / 描述"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="moduleFilter"
            placeholder="模块"
            clearable
            style="width: 100%"
          >
            <el-option v-for="m in modules" :key="m" :label="m" :value="m" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-space>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-space>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="dataSource" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="username" label="操作人" width="100" />
        <el-table-column prop="module" label="模块" width="110" />
        <el-table-column prop="action" label="操作" width="80" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="方法" width="80">
          <template #default="{ row }">
            <el-tag :type="methodType[row.method] as any" size="small">
              {{ row.method }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP" width="130" />
        <el-table-column label="耗时" width="80">
          <template #default="{ row }">
            <span :style="{ color: row.duration > 300 ? '#f56c6c' : '#67c23a' }"
              >{{ row.duration }}ms</span
            >
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'success' ? 'success' : 'danger'"
              size="small"
            >
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="操作时间" width="170" />
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
  </div>
</template>
