<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInstanceFunctions, FormRules } from 'tdesign-vue-next';

import { api } from '@/api';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const route = useRoute();
const router = useRouter();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);
const formRef = ref<FormInstanceFunctions>();

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

const rules: FormRules = {
  title: [{ required: true, message: '请输入文章标题', type: 'error' }],
  categoryId: [{ required: true, message: '请选择分类', type: 'error' }],
};

async function loadForEdit() {
  try {
    const categories = await api.content.categoryList();
    categoryOptions.value = categories.map(({ id, name }) => ({ id, name }));
    if (!isEdit.value) return;
    const article = await api.content.articleDetail(editId.value);
    form.title = article.title;
    form.categoryId = article.categoryId;
    form.author = article.author;
    form.summary = article.summary;
    form.cover = article.cover;
    form.content = article.content.join('\n\n');
    form.status = article.status;
    form.tags = [...article.tags];
  } catch {
    MessagePlugin.error('文章加载失败');
  }
}

async function handleSubmit() {
  const result = await formRef.value?.validate();
  if (result !== true) {
    MessagePlugin.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  try {
    const payload = {
      author: form.author,
      categoryId: form.categoryId,
      content: form.content.split('\n\n'),
      cover: form.cover,
      status: form.status,
      summary: form.summary,
      tags: form.tags,
      title: form.title,
    };
    await (isEdit.value
      ? api.content.articleUpdate(editId.value, payload)
      : api.content.articleCreate(payload));
    MessagePlugin.success(isEdit.value ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  } catch {
    MessagePlugin.error('保存失败');
  } finally {
    submitting.value = false;
  }
}

function goBack() {
  router.push('/content/article');
}

onMounted(loadForEdit);
</script>

<template>
  <div class="admin-page" style="max-width: 880px">
    <!-- Page Header -->
    <div
      class="mb-4"
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <t-button
        aria-label="返回"
        theme="default"
        variant="text"
        shape="square"
        @click="goBack"
      >
        <ChevronLeftIcon />
      </t-button>
    </div>

    <t-card :bordered="false">
      <t-form ref="formRef" :data="form" :rules="rules" label-width="80px">
        <t-form-item label="标题" name="title">
          <t-input v-model="form.title" placeholder="请输入文章标题" />
        </t-form-item>
        <t-form-item label="分类" name="categoryId">
          <t-select
            v-model="form.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <t-option
              v-for="c in categoryOptions"
              :key="c.id"
              :label="c.name"
              :value="c.id"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="作者" name="author">
          <t-input v-model="form.author" placeholder="请输入作者" />
        </t-form-item>
        <t-form-item label="标签" name="tags">
          <t-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <t-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </t-select>
        </t-form-item>
        <t-form-item label="封面图" name="cover">
          <t-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </t-form-item>
        <t-form-item label="摘要" name="summary">
          <t-textarea
            v-model="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            :maxlength="120"
            :show-limit="true"
          />
        </t-form-item>
        <t-form-item label="正文" name="content">
          <t-textarea
            v-model="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </t-form-item>
        <t-form-item label="状态" name="status">
          <t-radio-group v-model="form.status">
            <t-radio value="draft">草稿</t-radio>
            <t-radio value="published">发布</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item>
          <t-space>
            <t-button
              theme="primary"
              :loading="submitting"
              @click="handleSubmit"
            >
              保存
            </t-button>
            <t-button theme="default" @click="goBack"> 取消 </t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>
