<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import {
  NButton,
  NDataTable,
  NInput,
  NPopconfirm,
  NSelect,
  NTag,
  useMessage,
} from 'naive-ui';

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
const message = useMessage();

const loading = ref(false);
const dataSource = ref<ArticleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref<null | string>(null);
const statusFilter = ref<null | string>(null);

const categoryOptions = ref<{ id: number; label: string; value: string }[]>([]);
const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];

function toRecord(article: ArticleItem): ArticleRecord {
  return { ...article, publishedAt: article.date, views: 0 };
}

async function loadCategories() {
  const categories = await api.content.categoryList();
  categoryOptions.value = categories.map(({ id, name }) => ({
    id,
    label: name,
    value: name,
  }));
}

async function fetchData() {
  loading.value = true;
  try {
    const categoryId = categoryOptions.value.find(
      (item) => item.value === categoryFilter.value,
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
    message.error('加载文章列表失败');
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
  categoryFilter.value = null;
  statusFilter.value = null;
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
    message.success('文章已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '标题',
    key: 'title',
    width: 300,
    render: (row: ArticleRecord) =>
      h('div', { style: 'display:flex;align-items:center;gap:12px' }, [
        h(
          'div',
          {
            style:
              'width:48px;height:36px;flex-shrink:0;border-radius:6px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:12px',
          },
          '封面',
        ),
        h('span', row.title),
      ]),
  },
  { title: '分类', key: 'category', width: 110 },
  { title: '作者', key: 'author', width: 90 },
  {
    title: '状态',
    key: 'status',
    width: 90,
    render: (row: ArticleRecord) =>
      h(
        NTag,
        {
          type: row.status === 'published' ? 'success' : 'default',
          size: 'small',
        },
        () => (row.status === 'published' ? '已发布' : '草稿'),
      ),
  },
  { title: '浏览量', key: 'views', width: 100 },
  { title: '发布时间', key: 'publishedAt', width: 170 },
  {
    title: '操作',
    key: 'action',
    width: 140,
    fixed: 'right' as const,
    render: (row: ArticleRecord) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => goEdit(row),
        },
        () => '编辑',
      ),
      h(
        NPopconfirm,
        { onPositiveClick: () => handleDelete(row) },
        {
          trigger: () =>
            h(
              NButton,
              {
                text: true,
                type: 'error',
                size: 'small',
                style: { marginLeft: '8px' },
              },
              () => '删除',
            ),
          default: () => '确定删除该文章？',
        },
      ),
    ],
  },
];

const pagination = computed(() => ({
  page: currentPage.value,
  pageSize: pageSize.value,
  itemCount: total.value,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onUpdatePage: handlePageChange,
  onUpdatePageSize: handleSizeChange,
}));

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
    <NCard style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <NInput
          v-model:value="keyword"
          placeholder="标题 / 作者"
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
        />
        <NSelect
          v-model:value="categoryFilter"
          placeholder="分类"
          clearable
          :options="categoryOptions"
          style="width: 140px"
        />
        <NSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          :options="statusOptions"
          style="width: 120px"
        />
        <NButton type="primary" @click="handleSearch">搜索</NButton>
        <NButton @click="handleReset">重置</NButton>
        <div style="flex: 1"></div>
        <NButton type="primary" @click="goCreate">+ 新建文章</NButton>
      </div>
    </NCard>

    <NCard>
      <NDataTable
        :columns="columns"
        :data="dataSource"
        :loading="loading"
        :pagination="pagination"
        size="small"
        striped
      />
    </NCard>
  </div>
</template>
