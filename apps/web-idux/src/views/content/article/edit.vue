<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import { useMessage } from '@idux/components/message';

const {
  error: messageError,
  success: messageSuccess,
  warning: messageWarning,
} = useMessage();

const route = useRoute();
const router = useRouter();

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
const tagOptions = ['Vue', 'TypeScript', 'Vite', '架构', '教程', '公告'];

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
    messageError('文章加载失败');
  }
}

async function handleSubmit() {
  if (!form.title) {
    messageWarning('请输入文章标题');
    return;
  }
  if (!form.categoryId) {
    messageWarning('请选择分类');
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
    messageSuccess(isEdit.value ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  } catch {
    messageError('保存失败');
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
      <IxButton mode="text" @click="goBack">← 返回</IxButton>
    </div>

    <IxCard shadow="never">
      <IxForm :label-col="{ span: 4 }" :control-col="{ span: 18 }">
        <IxFormItem label="标题">
          <IxInput v-model:value="form.title" placeholder="请输入文章标题" />
        </IxFormItem>
        <IxFormItem label="分类">
          <IxSelect
            v-model:value="form.categoryId"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="c in categoryOptions"
              :key="c.id"
              :label="c.name"
              :value="c.id"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="作者">
          <IxInput v-model:value="form.author" placeholder="请输入作者" />
        </IxFormItem>
        <IxFormItem label="标签">
          <IxSelect
            v-model:value="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="t in tagOptions"
              :key="t"
              :label="t"
              :value="t"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="封面图">
          <IxInput
            v-model:value="form.cover"
            placeholder="封面图 URL（选填）"
          />
        </IxFormItem>
        <IxFormItem label="摘要">
          <IxTextarea
            v-model:value="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            show-count
            :maxlength="120"
          />
        </IxFormItem>
        <IxFormItem label="正文">
          <IxTextarea
            v-model:value="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </IxFormItem>
        <IxFormItem label="状态">
          <IxRadioGroup v-model:value="form.status">
            <IxRadio value="draft">草稿</IxRadio>
            <IxRadio value="published">发布</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
        <IxFormItem :label-col="{ span: 4 }" :control-col="{ span: 18 }">
          <IxButton mode="primary" :loading="submitting" @click="handleSubmit">
            保存
          </IxButton>
          <IxButton style="margin-left: 8px" @click="goBack"> 取消 </IxButton>
        </IxFormItem>
      </IxForm>
    </IxCard>
  </div>
</template>
