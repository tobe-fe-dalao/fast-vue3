<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInstance } from 'element-plus';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
    ElMessage.error('文章加载失败');
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
      if (isCurrent()) ElMessage.warning('请完善必填项');
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
    ElMessage.success(id > 0 ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  } catch {
    if (!isCurrent()) return;
    ElMessage.error('保存失败');
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
      <el-button text :icon="ArrowLeft" @click="goBack"> 返回 </el-button>
    </div>

    <el-card shadow="never">
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item
          label="标题"
          prop="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item
          label="分类"
          prop="categoryId"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <el-select
            v-model="form.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="c in categoryOptions"
              :key="c.id"
              :label="c.name"
              :value="c.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <el-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
          <el-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            maxlength="120"
            show-word-limit
            placeholder="请输入文章摘要"
          />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio value="draft">草稿</el-radio>
            <el-radio value="published">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-space>
            <el-button
              type="primary"
              :loading="submitting"
              :disabled="loading || loadedId !== editId"
              @click="handleSubmit"
            >
              保存
            </el-button>
            <el-button @click="goBack">取消</el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
