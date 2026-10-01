<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage } from 'element-plus';

interface LoginLog {
  id: number;
  username: string;
  ip: string;
  browser: string;
  os: string;
  status: string;
  message: string;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<LoginLog[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: LoginLog[]; total: number }>({
      url: '/log/login',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    ElMessage.error('加载登录日志失败');
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

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="keyword"
            placeholder="搜索用户名"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="dataSource" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="username" label="用户名" width="110" />
        <el-table-column prop="ip" label="IP 地址" width="140" />
        <el-table-column prop="browser" label="浏览器" width="120" />
        <el-table-column prop="os" label="操作系统" width="130" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'success' ? 'success' : 'danger'"
              size="small"
            >
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="消息" />
        <el-table-column prop="createdAt" label="登录时间" width="170" />
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
