<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import { MessagePlugin } from 'tdesign-vue-next';

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
    MessagePlugin.error('加载文章列表失败');
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

function handlePageChange(pageInfo: { current: number; pageSize: number }) {
  currentPage.value = pageInfo.current;
  pageSize.value = pageInfo.pageSize;
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
    MessagePlugin.success('文章已删除');
    fetchData();
  } catch {
    MessagePlugin.error('删除失败');
  }
}

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '标题', colKey: 'title', width: 280 },
  { title: '分类', colKey: 'category', width: 110 },
  { title: '作者', colKey: 'author', width: 90 },
  { title: '状态', colKey: 'status', width: 90 },
  { title: '浏览量', colKey: 'views', width: 100 },
  { title: '发布时间', colKey: 'publishedAt', width: 170 },
  { title: '操作', colKey: 'actions', width: 140, fixed: 'right' as const },
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
    <t-card :bordered="false" style="margin-bottom: 16px">
      <t-row :gutter="16" align="middle">
        <t-col :span="7">
          <t-input
            v-model="keyword"
            placeholder="标题 / 作者"
            clearable
            @enter="handleSearch"
          />
        </t-col>
        <t-col :span="4">
          <t-select
            v-model="categoryFilter"
            placeholder="分类"
            clearable
            style="width: 100%"
          >
            <t-option
              v-for="c in categoryOptions"
              :key="c.id"
              :label="c.name"
              :value="c.name"
            />
          </t-select>
        </t-col>
        <t-col :span="4">
          <t-select
            v-model="statusFilter"
            placeholder="状态"
            clearable
            style="width: 100%"
          >
            <t-option
              v-for="s in statusOptions"
              :key="s.value"
              :label="s.label"
              :value="s.value"
            />
          </t-select>
        </t-col>
        <t-col :span="5">
          <t-space>
            <t-button theme="primary" @click="handleSearch">搜索</t-button>
            <t-button theme="default" @click="handleReset">重置</t-button>
          </t-space>
        </t-col>
        <t-col :span="4" style="text-align: right">
          <t-button theme="primary" @click="goCreate">新建文章</t-button>
        </t-col>
      </t-row>
    </t-card>

    <!-- Table -->
    <t-card :bordered="false">
      <t-table
        :loading="loading"
        :data="dataSource"
        :columns="columns"
        row-key="id"
        size="medium"
        stripe
      >
        <template #title="{ row }">
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
                color: #bbb;
                background: #f3f3f3;
                border-radius: 4px;
              "
            >
              封面
            </div>
            <span>{{ row.title }}</span>
          </div>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'published' ? 'success' : 'default'"
            size="small"
          >
            {{ row.status === 'published' ? '已发布' : '草稿' }}
          </t-tag>
        </template>
        <template #actions="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="goEdit(row)"
          >
            编辑
          </t-button>
          <t-popconfirm content="确定删除该文章？" @confirm="handleDelete(row)">
            <t-button theme="danger" variant="text" size="small">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <t-pagination
          v-model:current="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-size-options="[10, 20, 50]"
          show-jumper
          @change="handlePageChange"
        />
      </div>
    </t-card>
  </div>
</template>
