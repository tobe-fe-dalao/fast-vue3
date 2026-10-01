<script setup lang="ts">
import type { ArticleItem } from '@/api';
import type { FormInstance } from 'ant-design-vue';

import { api } from '@/api';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const route = useRoute();
const router = useRouter();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);
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

async function loadCategories() {
  try {
    const list = await api.content.categoryList();
    categories.value = list.map((c) => ({ id: c.id, name: c.name }));
  } catch {
    categories.value = [];
  }
}

async function loadForEdit() {
  await loadCategories();
  if (!isEdit.value) return;
  try {
    const found = await api.content.articleDetail(editId.value);
    form.title = found.title;
    form.categoryId = found.categoryId;
    form.author = found.author;
    form.summary = found.summary;
    form.cover = found.cover;
    form.content = found.content.join('\n\n');
    form.status = found.status;
    form.tags = [...found.tags];
  } catch {
    message.error('文章加载失败');
  }
}

async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    message.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  try {
    const payload = {
      title: form.title,
      categoryId: form.categoryId,
      author: form.author,
      summary: form.summary,
      cover: form.cover,
      content: form.content.split('\n\n'),
      status: form.status,
      tags: form.tags,
    };
    if (isEdit.value) {
      await api.content.articleUpdate(editId.value, payload);
      message.success('文章已更新');
    } else {
      await api.content.articleCreate(payload);
      message.success('文章已创建');
    }
    router.push('/content/article');
  } catch {
    message.error('保存失败');
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
            <AButton type="primary" :loading="submitting" @click="handleSubmit">
              保存
            </AButton>
            <AButton aria-label="返回" @click="goBack">取消</AButton>
          </ASpace>
        </AFormItem>
      </AForm>
    </ACard>
  </div>
</template>
