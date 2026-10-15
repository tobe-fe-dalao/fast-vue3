<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInstance } from '@arco-design/web-vue';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconArrowLeft } from '@arco-design/web-vue/es/icon';

const route = useRoute();
const router = useRouter();

const editId = computed(() => Number(route.query.id) || 0);

const submitting = ref(false);
const loading = ref(true);
const loadedId = ref<null | number>(null);
const detailRequests = useLatestRequest();
const saveRequests = useLatestRequest();
const formRef = ref<FormInstance>();

interface ArticleForm {
  title: string;
  categoryId: number | undefined;
  author: string;
  summary: string;
  cover: string;
  content: string;
  status: ArticleItem['status'];
  tags: string[];
}

const form = reactive<ArticleForm>({
  title: '',
  categoryId: undefined,
  author: '',
  summary: '',
  cover: '',
  content: '',
  status: 'draft',
  tags: [],
});

const categoryOptions = ref<{ id: number; name: string }[]>([]);
const tagOptions = ['Vue', 'TypeScript', 'Vite', '架构', '教程', '公告'];

async function loadForEdit() {
  const id = editId.value;
  const isCurrent = detailRequests.start();
  saveRequests.invalidate();
  submitting.value = false;
  loading.value = true;
  loadedId.value = null;
  Object.assign(form, {
    title: '',
    categoryId: undefined,
    author: '',
    summary: '',
    cover: '',
    content: '',
    status: 'draft',
    tags: [],
  });
  try {
    const categories = await api.content.categoryList();
    if (!isCurrent()) return;
    categoryOptions.value = categories.map(({ id, name }) => ({ id, name }));
    if (id === 0) {
      loadedId.value = 0;
      return;
    }
    const article = await api.content.articleDetail(id);
    if (!isCurrent()) return;
    form.title = article.title;
    form.categoryId = article.categoryId;
    form.author = article.author;
    form.summary = article.summary;
    form.cover = article.cover;
    form.content = article.content.join('\n\n');
    form.status = article.status;
    form.tags = [...article.tags];
    loadedId.value = id;
  } catch {
    if (!isCurrent()) return;
    Message.error('文章加载失败');
  } finally {
    if (isCurrent()) loading.value = false;
  }
}

async function handleSubmit() {
  if (submitting.value || loading.value || loadedId.value !== editId.value)
    return;
  const id = editId.value;
  const isCurrent = saveRequests.start();
  submitting.value = true;
  try {
    if (!formRef.value) return;
    try {
      const errors = await formRef.value.validate();
      if (errors) {
        Message.warning('请完善必填项');
        return;
      }
    } catch {
      if (isCurrent()) Message.warning('请完善必填项');
      return;
    }
    if (!isCurrent() || loadedId.value !== id || editId.value !== id) return;
    const payload = {
      author: form.author,
      categoryId: form.categoryId,
      content: form.content.split('\n\n'),
      cover: form.cover,
      status: form.status,
      summary: form.summary,
      tags: [...form.tags],
      title: form.title,
    };
    await (id > 0
      ? api.content.articleUpdate(id, payload)
      : api.content.articleCreate(payload));
    if (!isCurrent()) return;
    Message.success(id > 0 ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  } catch {
    if (!isCurrent()) return;
    Message.error('保存失败');
  } finally {
    if (isCurrent()) submitting.value = false;
  }
}

function goBack() {
  router.push('/content/article');
}

watch(editId, loadForEdit, { immediate: true, flush: 'sync' });
</script>

<template>
  <div class="admin-page" style="max-width: 880px">
    <!-- Page Header -->
    <div class="mb-4 flex items-center gap-3">
      <a-button aria-label="返回" type="text" class="!p-1" @click="goBack">
        <template #icon><IconArrowLeft /></template>
      </a-button>
    </div>

    <a-card :bordered="false">
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item
          label="标题"
          field="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <a-input v-model="form.title" placeholder="请输入文章标题" />
        </a-form-item>
        <a-form-item
          label="分类"
          field="categoryId"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <a-select
            v-model="form.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <a-option
              v-for="c in categoryOptions"
              :key="c.id"
              :value="c.id"
              :label="c.name"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="作者" field="author">
          <a-input v-model="form.author" placeholder="请输入作者" />
        </a-form-item>
        <a-form-item label="标签" field="tags">
          <a-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <a-option v-for="t in tagOptions" :key="t" :value="t" :label="t" />
          </a-select>
        </a-form-item>
        <a-form-item label="封面图" field="cover">
          <a-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </a-form-item>
        <a-form-item label="摘要" field="summary">
          <a-textarea
            v-model="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            show-word-limit
            :max-length="120"
          />
        </a-form-item>
        <a-form-item label="正文" field="content">
          <a-textarea
            v-model="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-radio-group v-model="form.status">
            <a-radio value="draft">草稿</a-radio>
            <a-radio value="published">发布</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button
              type="primary"
              :loading="submitting"
              :disabled="loading || loadedId !== editId"
              @click="handleSubmit"
            >
              保存
            </a-button>
            <a-button aria-label="返回" @click="goBack">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
