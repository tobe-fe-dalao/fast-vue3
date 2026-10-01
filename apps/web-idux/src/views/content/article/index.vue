<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import { useMessage } from '@idux/components/message';

const { error: messageError, success: messageSuccess } = useMessage();

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
  published: 'success',
  draft: 'default',
};
const statusLabelMap: Record<string, string> = {
  published: '已发布',
  draft: '草稿',
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
    messageError('加载文章列表失败');
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

function goCreate() {
  router.push('/content/article/edit');
}
function goEdit(record: ArticleRecord) {
  router.push(`/content/article/edit?id=${record.id}`);
}
async function handleDelete(record: ArticleRecord) {
  try {
    await api.content.articleDelete(record.id);
    messageSuccess('文章已删除');
    fetchData();
  } catch {
    messageError('删除失败');
  }
}

const columns = [
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '标题', key: 'title', width: 300, customCell: true },
  { title: '分类', dataKey: 'category', width: 110 },
  { title: '作者', dataKey: 'author', width: 90 },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '浏览量', dataKey: 'views', width: 100 },
  { title: '发布时间', dataKey: 'publishedAt', width: 170 },
  { title: '操作', key: 'actions', width: 140, customCell: true },
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
    <IxCard shadow="never" style="margin-bottom: 16px">
      <div
        style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center"
      >
        <IxInput
          v-model:value="keyword"
          placeholder="标题 / 作者"
          style="width: 220px"
          @keyup.enter="handleSearch"
        />
        <IxSelect
          v-model:value="categoryFilter"
          placeholder="分类"
          clearable
          style="width: 160px"
        >
          <IxSelectOption
            v-for="c in categoryOptions"
            :key="c.id"
            :label="c.name"
            :value="c.name"
          />
        </IxSelect>
        <IxSelect
          v-model:value="statusFilter"
          placeholder="状态"
          clearable
          style="width: 160px"
        >
          <IxSelectOption
            v-for="s in statusOptions"
            :key="s.value"
            :label="s.label"
            :value="s.value"
          />
        </IxSelect>
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
        <IxButton @click="handleReset">重置</IxButton>
        <div style="flex: 1"></div>
        <IxButton mode="primary" @click="goCreate">+ 新建文章</IxButton>
      </div>
    </IxCard>

    <!-- Table -->
    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'title'">
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
              <span>{{ (record as ArticleRecord).title }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <IxTag :color="statusColorMap[(record as ArticleRecord).status]">
              {{ statusLabelMap[(record as ArticleRecord).status] }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton
              mode="link"
              size="sm"
              @click="goEdit(record as ArticleRecord)"
            >
              编辑
            </IxButton>
            <IxPopconfirm
              title="确定删除该文章？"
              @confirm="handleDelete(record as ArticleRecord)"
            >
              <IxButton mode="link" size="sm" danger>删除</IxButton>
            </IxPopconfirm>
          </template>
        </template>
      </IxTable>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <IxPagination
          v-model:page-index="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          show-total
          show-quick-jumper
          @change="handlePageChange"
        />
      </div>
    </IxCard>
  </div>
</template>
