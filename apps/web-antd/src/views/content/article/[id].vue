<script setup lang="ts">
import type { ArticleItem } from '@/api';

import { api } from '@/api';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const article = ref<ArticleItem | null>(null);

const coverText = computed(() =>
  (article.value?.category ?? '封面').slice(0, 2),
);

onMounted(async () => {
  loading.value = true;
  const id = Number(route.params.id);
  try {
    const found = await api.content.articleDetail(id);
    article.value = found;
  } catch {
    article.value = null;
    message.warning('未找到对应文章');
  } finally {
    loading.value = false;
  }
});

function goBack() {
  router.push('/content/article');
}
function goEdit() {
  if (!article.value) return;
  router.push(`/content/article/edit?id=${article.value.id}`);
}
</script>

<template>
  <div class="admin-page">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-4 flex items-center gap-3">
        <AButton aria-label="返回" type="text" class="!p-1" @click="goBack">
          <ArrowLeftOutlined class="text-lg" />
        </AButton>
      </div>
      <AButton v-if="article" type="primary" @click="goEdit">
        <EditOutlined />编辑
      </AButton>
    </div>

    <ASpin :spinning="loading">
      <AEmpty
        v-if="!article && !loading"
        description="未找到该文章"
        class="py-16"
      />
      <template v-if="article">
        <ARow :gutter="16">
          <!-- Main -->
          <ACol :span="17">
            <ACard :bordered="false" class="mb-4 shadow-sm">
              <div
                class="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-3xl font-bold text-white"
              >
                {{ coverText }} 封面
              </div>
              <ATypographyTitle :level="3" style="margin-top: 0">
                {{ article.title }}
              </ATypographyTitle>
              <div
                class="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500"
              >
                <span>作者：{{ article.author }}</span>
                <ATag color="blue">{{ article.category }}</ATag>
                <ATag v-for="t in article.tags" :key="t" color="default">
                  {{ t }}
                </ATag>
                <ATag
                  :color="article.status === 'published' ? 'green' : 'orange'"
                >
                  {{ article.status === 'published' ? '已发布' : '草稿' }}
                </ATag>
                <span>{{ article.date }}</span>
              </div>
              <ATypographyParagraph
                v-for="(p, i) in article.content"
                :key="i"
                style="font-size: 0.95rem; line-height: 1.9; color: #374151"
              >
                {{ p }}
              </ATypographyParagraph>
            </ACard>
          </ACol>

          <!-- Side -->
          <ACol :span="7">
            <ACard title="元信息" :bordered="false" class="mb-4 shadow-sm">
              <ADescriptions :column="1" bordered size="small">
                <ADescriptionsItem label="文章 ID">
                  {{ article.id }}
                </ADescriptionsItem>
                <ADescriptionsItem label="作者">
                  {{ article.author }}
                </ADescriptionsItem>
                <ADescriptionsItem label="分类">
                  <ATag color="blue">{{ article.category }}</ATag>
                </ADescriptionsItem>
                <ADescriptionsItem label="状态">
                  <ATag
                    :color="article.status === 'published' ? 'green' : 'orange'"
                  >
                    {{ article.status === 'published' ? '已发布' : '草稿' }}
                  </ATag>
                </ADescriptionsItem>
                <ADescriptionsItem label="发布时间">
                  {{ article.date }}
                </ADescriptionsItem>
              </ADescriptions>
            </ACard>

            <ACard title="标签" :bordered="false" class="shadow-sm">
              <ASpace wrap>
                <ATag v-for="t in article.tags" :key="t" color="blue">
                  {{ t }}
                </ATag>
              </ASpace>
            </ACard>
          </ACol>
        </ARow>
      </template>
    </ASpin>
  </div>
</template>
