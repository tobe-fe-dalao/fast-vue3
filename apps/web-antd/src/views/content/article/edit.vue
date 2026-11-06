<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInstance } from 'ant-design-vue';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

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

const categories = ref<{ id: number; name: string }[]>([]);
const tagOptions = [
  'Vue',
  'TypeScript',
  'Vite',
  '架构',
  '教程',
  '发布',
  '协议',
  '团队',
];

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
    const list = await api.content.categoryList();
    if (!isCurrent()) return;
    categories.value = list.map((c) => ({ id: c.id, name: c.name }));
    if (id === 0) {
      loadedId.value = 0;
      return;
    }
    const found = await api.content.articleDetail(id);
    if (!isCurrent()) return;
    form.title = found.title;
    form.categoryId = found.categoryId;
    form.author = found.author;
    form.summary = found.summary;
    form.cover = found.cover;
    form.content = found.content.join('\n\n');
    form.status = found.status;
    form.tags = [...found.tags];
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
      title: form.title,
      categoryId: form.categoryId,
      author: form.author,
      summary: form.summary,
      cover: form.cover,
      content: form.content.split('\n\n'),
      status: form.status,
      tags: [...form.tags],
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
  <div class="admin-page admin-page--narrow" style="max-width: 880px">
    <!-- Page Header -->
    <div class="mb-4 flex items-center gap-3">
      <AButton aria-label="返回" type="text" class="!p-1" @click="goBack">
        <ArrowLeftOutlined class="text-lg" />
      </AButton>
    </div>

    <ACard :bordered="false" class="shadow-sm">
      <AForm
        ref="formRef"
        :model="form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        layout="horizontal"
      >
        <AFormItem
          label="标题"
          name="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <AInput v-model:value="form.title" placeholder="请输入文章标题" />
        </AFormItem>
        <AFormItem
          label="分类"
          name="categoryId"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <ASelect
            v-model:value="form.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <ASelectOption v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="作者" name="author">
          <AInput v-model:value="form.author" placeholder="请输入作者" />
        </AFormItem>
        <AFormItem label="标签" name="tags">
          <ASelect
            v-model:value="form.tags"
            mode="multiple"
            placeholder="请选择标签"
            style="width: 100%"
          >
            <ASelectOption v-for="t in tagOptions" :key="t" :value="t">
              {{ t }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="封面图" name="cover">
          <AInput v-model:value="form.cover" placeholder="封面图 URL（选填）" />
        </AFormItem>
        <AFormItem label="摘要" name="summary">
          <ATextarea
            v-model:value="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            show-count
            :maxlength="120"
          />
        </AFormItem>
        <AFormItem label="正文" name="content">
          <ATextarea
            v-model:value="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </AFormItem>
        <AFormItem label="状态" name="status">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="draft">草稿</ARadio>
            <ARadio value="published">发布</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem :wrapper-col="{ offset: 4, span: 18 }">
          <ASpace>
            <AButton
              type="primary"
              :loading="submitting"
              :disabled="loading || loadedId !== editId"
              @click="handleSubmit"
            >
              保存
            </AButton>
            <AButton aria-label="返回" @click="goBack">取消</AButton>
          </ASpace>
        </AFormItem>
      </AForm>
    </ACard>
  </div>
</template>
