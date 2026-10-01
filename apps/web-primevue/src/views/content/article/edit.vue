<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);

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
const tagOptions = [
  { label: 'Vue', value: 'Vue' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Vite', value: 'Vite' },
  { label: '架构', value: '架构' },
  { label: '教程', value: '教程' },
  { label: '公告', value: '公告' },
];

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
    toast.add({ severity: 'error', summary: '错误', detail: '文章加载失败' });
  }
}

async function handleSubmit() {
  if (!form.title) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请输入文章标题' });
    return;
  }
  if (!form.categoryId) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请选择分类' });
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
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: isEdit.value ? '文章已更新' : '文章已创建',
    });
    router.push('/content/article');
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '保存失败' });
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
    <Toast />

    <div
      class="mb-4"
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <Button
        icon="pi pi-arrow-left"
        text
        rounded
        aria-label="返回"
        @click="goBack"
      />
    </div>

    <Card>
      <template #content>
        <div style="display: flex; flex-direction: column; gap: 16px">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >标题 <span style="color: #ef4444">*</span></label
            >
            <InputText
              v-model="form.title"
              placeholder="请输入文章标题"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >分类 <span style="color: #ef4444">*</span></label
            >
            <Select
              v-model="form.categoryId"
              :options="categoryOptions"
              option-label="name"
              option-value="id"
              placeholder="请选择分类"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >作者</label
            >
            <InputText
              v-model="form.author"
              placeholder="请输入作者"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >标签</label
            >
            <Select
              v-model="form.tags"
              :options="tagOptions"
              option-label="label"
              option-value="value"
              multiple
              placeholder="请选择标签"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >封面图</label
            >
            <InputText
              v-model="form.cover"
              placeholder="封面图 URL（选填）"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >摘要</label
            >
            <Textarea
              v-model="form.summary"
              :rows="3"
              placeholder="请输入文章摘要"
              style="width: 100%"
              :maxlength="120"
              show-count
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >正文</label
            >
            <Textarea
              v-model="form.content"
              :rows="8"
              placeholder="请输入文章正文"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >状态</label
            >
            <div style="display: flex; gap: 16px">
              <div style="display: flex; gap: 4px; align-items: center">
                <RadioButton
                  v-model="form.status"
                  input-id="article-draft"
                  value="draft"
                />
                <label for="article-draft">草稿</label>
              </div>
              <div style="display: flex; gap: 4px; align-items: center">
                <RadioButton
                  v-model="form.status"
                  input-id="article-published"
                  value="published"
                />
                <label for="article-published">发布</label>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px">
            <Button
              label="保存"
              icon="pi pi-check"
              :loading="submitting"
              @click="handleSubmit"
            />
            <Button
              aria-label="返回"
              label="取消"
              severity="secondary"
              @click="goBack"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
