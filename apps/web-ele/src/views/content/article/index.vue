<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import { Delete, Edit, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

interface ArticleRecord {
  id: number;
  title: string;
  category: string;
  author: string;
  status: string;
  views: number;
  cover: string;
  summary: string;
  publishedAt: string;
}

const router = useRouter();

const loading = ref(false);
const dataSource = ref<ArticleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');

const categoryOptions = ref<{ id: number; name: string }[]>([]);
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];

function toRecord(article: ArticleItem): ArticleRecord {
  return { ...article, publishedAt: article.date, views: 0 };
}

async function loadCategories() {
  const categories = await api.content.categoryList();
  categoryOptions.value = categories.map(({ id, name }) => ({ id, name }));
}

async function fetchData() {
  loading.value = true;
  try {
    const categoryId = categoryOptions.value.find(
      (item) => item.name === categoryFilter.value,
    )?.id;
    const result = await api.content.articleList({
      categoryId,
      keyword: keyword.value || undefined,
      page: currentPage.value,
      pageSize: pageSize.value,
      status: statusFilter.value as ArticleItem['status'] | undefined,
    });
    dataSource.value = result.items.map((article) => toRecord(article));
    total.value = result.total;
  } catch {
    ElMessage.error('加载文章列表失败');
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
  categoryFilter.value = '';
  statusFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: ArticleRecord) {
  router.push(`/content/article/edit?id=${record.id}`);
}
async function handleDelete(record: ArticleRecord) {
  try {
    await api.content.articleDelete(record.id);
    ElMessage.success('文章已删除');
    fetchData();
  } catch {
    ElMessage.error('删除失败');
  }
}

onMounted(async () => {
  try {
    await loadCategories();
  } finally {
    fetchData();
  }
});
</script>

<template>
  <div class="admin-page">
    <!-- Search -->
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16" align="middle">
        <el-col :span="7">
          <el-input
            v-model="keyword"
            placeholder="标题 / 作者"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="categoryFilter"
            placeholder="分类"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="c in categoryOptions"
              :key="c.id"
              :label="c.name"
              :value="c.name"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="s in statusOptions"
              :key="s.value"
              :label="s.label"
              :value="s.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-space>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-space>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button type="primary" :icon="Plus" @click="goCreate">
            新建文章
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- Table -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="dataSource"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column label="标题" width="300">
          <template #default="{ row }">
            <div style="display: flex; gap: 12px; align-items: center">
              <div
                style="
                  display: flex;
                  flex-shrink: 0;
                  align-items: center;
                  justify-content: center;
                  width: 48px;
                  height: 36px;
                  font-size: 12px;
                  color: #9ca3af;
                  background: #f3f4f6;
                  border-radius: 6px;
                "
              >
                封面
              </div>
              <span>{{ row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="110" />
        <el-table-column prop="author" label="作者" width="90" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'published' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="100" />
        <el-table-column prop="publishedAt" label="发布时间" width="170" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="goEdit(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-popconfirm
              title="确定删除该文章？"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button type="danger" link size="small">
                  <el-icon><Delete /></el-icon>删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>
