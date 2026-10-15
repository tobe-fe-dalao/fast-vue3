<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInst } from 'naive-ui';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect,
  useMessage,
} from 'naive-ui';

const route = useRoute();
const router = useRouter();
const message = useMessage();

const editId = computed(() => Number(route.query.id) || 0);

const submitting = ref(false);
const loading = ref(true);
const loadedId = ref<null | number>(null);
const detailRequests = useLatestRequest();
const saveRequests = useLatestRequest();
const formRef = ref<FormInst | null>(null);

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

const categoryOptions = ref<{ label: string; value: number }[]>([]);
const tagOptions = ['Vue', 'TypeScript', 'Vite', '架构', '教程', '公告'].map(
  (t) => ({ label: t, value: t }),
);

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
    categoryOptions.value = categories.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
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
    message.error('文章加载失败');
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
      await formRef.value.validate();
    } catch {
      if (isCurrent()) message.warning('请完善必填项');
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
    message.success(id > 0 ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  } catch {
    if (!isCurrent()) return;
    message.error('保存失败');
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
    <div
      class="mb-4"
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <NButton text @click="goBack">← 返回</NButton>
    </div>

    <NCard>
      <NForm
        ref="formRef"
        :model="form"
        label-placement="left"
        :label-width="80"
      >
        <NFormItem
          label="标题"
          path="title"
          :rule="{
            required: true,
            message: '请输入文章标题',
            trigger: ['input', 'blur'],
          }"
        >
          <NInput v-model:value="form.title" placeholder="请输入文章标题" />
        </NFormItem>
        <NFormItem
          label="分类"
          path="categoryId"
          :rule="{
            type: 'number',
            required: true,
            message: '请选择分类',
            trigger: ['change', 'blur'],
          }"
        >
          <NSelect
            v-model:value="form.categoryId"
            placeholder="请选择分类"
            :options="categoryOptions"
          />
        </NFormItem>
        <NFormItem label="作者" path="author">
          <NInput v-model:value="form.author" placeholder="请输入作者" />
        </NFormItem>
        <NFormItem label="标签" path="tags">
          <NSelect
            v-model:value="form.tags"
            multiple
            placeholder="请选择标签"
            :options="tagOptions"
          />
        </NFormItem>
        <NFormItem label="封面图" path="cover">
          <NInput v-model:value="form.cover" placeholder="封面图 URL（选填）" />
        </NFormItem>
        <NFormItem label="摘要" path="summary">
          <NInput
            v-model:value="form.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
            show-count
            :maxlength="120"
          />
        </NFormItem>
        <NFormItem label="正文" path="content">
          <NInput
            v-model:value="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NRadioGroup v-model:value="form.status">
            <NRadio value="draft">草稿</NRadio>
            <NRadio value="published">发布</NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem>
          <NButton
            type="primary"
            :loading="submitting"
            :disabled="loading || loadedId !== editId"
            @click="handleSubmit"
          >
            保存
          </NButton>
          <NButton style="margin-left: 12px" @click="goBack"> 取消 </NButton>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>
