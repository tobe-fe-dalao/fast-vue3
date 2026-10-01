<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const router = useRouter();

const loading = ref(false);
const dataSource = ref<ArticleItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const categoryFilter = ref<number | undefined>(undefined);
const statusFilter = ref<string | undefined>(undefined);

const categories = ref<{ id: number; name: string }[]>([]);

const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
];
const statusColorMap: Record<string, string> = {
  published: 'green',
  draft: 'default',
};

async function loadCategories() {
  try {
    const list = await api.content.categoryList();
    categories.value = list.map((c) => ({ id: c.id, name: c.name }));
  } catch {
    categories.value = [];
  }
}

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.content.articleList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      status: statusFilter.value as ArticleItem['status'] | undefined,
      categoryId: categoryFilter.value,
    });
    dataSource.value = res.items;
    total.value = res.total;
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
  categoryFilter.value = undefined;
  statusFilter.value = undefined;
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: ArticleItem) {
  router.push(`/content/article/edit?id=${record.id}`);
}
async function handleDelete(record: ArticleItem) {
  try {
    await api.content.articleDelete(record.id);
    message.success('文章已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '标题', dataIndex: 'title', width: 320 },
  { title: '分类', dataIndex: 'category', width: 110 },
  { title: '作者', dataIndex: 'author', width: 90 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '发布时间', dataIndex: 'date', width: 170 },
  { title: '操作', key: 'action', width: 140, fixed: 'right' as const },
];

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(() => {
  loadCategories();
  fetchData();
});
</script>

<template>
  <div class="admin-page">
    <!-- Search -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16" align="middle">
        <ACol :span="7">
          <AInput
            v-model:value="keyword"
            placeholder="标题 / 作者"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="categoryFilter"
            placeholder="分类"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption
              v-for="s in statusOptions"
              :key="s.value"
              :value="s.value"
            >
              {{ s.label }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="5">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="4" style="text-align: right">
          <AButton type="primary" @click="goCreate">
            <PlusOutlined />新建文章
          </AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- Table -->
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 1100 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'title'">
              <div class="flex items-center gap-3">
                <div
                  class="h-9 w-12 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs"
                >
                  封面
                </div>
                <span class="line-clamp-2">
                  {{ (record as ArticleItem).title }}
                </span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag :color="statusColorMap[(record as ArticleItem).status]">
                {{
                  (record as ArticleItem).status === 'published'
                    ? '已发布'
                    : '草稿'
                }}
              </ATag>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="goEdit(record as ArticleItem)"
              >
                <EditOutlined />编辑
              </AButton>
              <APopconfirm
                title="确定删除该文章？"
                @confirm="handleDelete(record as ArticleItem)"
              >
                <AButton type="link" size="small" danger>
                  <DeleteOutlined />删除
                </AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>
  </div>
</template>
