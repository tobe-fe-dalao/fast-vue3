<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { TableColumnData } from '@arco-design/web-vue';

import { api } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconDelete, IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';

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
const statusColorMap: Record<string, string> = {
  published: 'green',
  draft: 'gray',
};

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
    Message.error('加载文章列表失败');
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

function handlePageSizeChange(size: number) {
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
    Message.success('文章已删除');
    fetchData();
  } catch {
    Message.error('删除失败');
  }
}

const columns: TableColumnData[] = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '标题', dataIndex: 'title', width: 280, slotName: 'title' },
  { title: '分类', dataIndex: 'category', width: 110 },
  { title: '作者', dataIndex: 'author', width: 90 },
  { title: '状态', dataIndex: 'status', width: 90, slotName: 'status' },
  { title: '浏览量', dataIndex: 'views', width: 100 },
  { title: '发布时间', dataIndex: 'publishedAt', width: 170 },
  { title: '操作', slotName: 'actions', width: 140, fixed: 'right' as const },
];

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
    <a-card :bordered="false" class="mb-4">
      <a-row :gutter="16" align="center">
        <a-col :span="7">
          <a-input
            v-model="keyword"
            placeholder="标题 / 作者"
            allow-clear
            @press-enter="handleSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="categoryFilter"
            placeholder="分类"
            allow-clear
            style="width: 100%"
          >
            <a-option
              v-for="c in categoryOptions"
              :key="c.id"
              :value="c.name"
              :label="c.name"
            />
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select
            v-model="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <a-option
              v-for="s in statusOptions"
              :key="s.value"
              :value="s.value"
              :label="s.label"
            />
          </a-select>
        </a-col>
        <a-col :span="5">
          <a-space>
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="primary" @click="goCreate">
            <template #icon><IconPlus /></template>新建文章
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <!-- Table -->
    <a-card :bordered="false">
      <a-table
        :loading="loading"
        :data="dataSource"
        :columns="columns"
        :pagination="false"
        size="medium"
        row-key="id"
        :scroll="{ x: 1100 }"
        stripe
      >
        <template #title="{ record }">
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center text-gray-400 text-xs"
              style="
                flex-shrink: 0;
                width: 48px;
                height: 36px;
                background: #f2f3f5;
                border-radius: 4px;
              "
            >
              封面
            </div>
            <span class="line-clamp-2">{{
              (record as ArticleRecord).title
            }}</span>
          </div>
        </template>
        <template #status="{ record }">
          <a-tag :color="statusColorMap[(record as ArticleRecord).status]">
            {{
              (record as ArticleRecord).status === 'published'
                ? '已发布'
                : '草稿'
            }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button
            type="text"
            size="small"
            @click="goEdit(record as ArticleRecord)"
          >
            <template #icon><IconEdit /></template>编辑
          </a-button>
          <a-popconfirm
            content="确定删除该文章？"
            @ok="handleDelete(record as ArticleRecord)"
          >
            <a-button type="text" status="danger" size="small">
              <template #icon><IconDelete /></template>删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <a-pagination
          :current="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-total
          show-jumper
          show-page-size
          @change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </a-card>
  </div>
</template>
