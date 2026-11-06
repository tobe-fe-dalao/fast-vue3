<script setup lang="ts">
import type { BlogPost } from '@/api';

import { useLatestRequest } from '@fast-vue3/shared';

import { api } from '@/api';

const currentPage = ref(1);
const pageSize = 6;
const categoryFilter = ref<string>('全部');
const blogPosts = ref<BlogPost[]>([]);
const blogCategories = ref<string[]>(['全部']);
const total = ref(0);
const loading = ref(true);
const loadFailed = ref(false);
const requests = useLatestRequest();

async function loadPosts() {
  const isCurrent = requests.start();
  loading.value = true;
  loadFailed.value = false;
  try {
    const result = await api.portal.blogList({
      category: categoryFilter.value,
      page: currentPage.value,
      pageSize,
    });
    if (!isCurrent()) return;
    blogPosts.value = result.items;
    blogCategories.value = [
      '全部',
      ...result.categories.filter((category) => category !== '全部'),
    ];
    total.value = result.total;
  } catch {
    if (isCurrent()) loadFailed.value = true;
  } finally {
    if (isCurrent()) loading.value = false;
  }
}

watch([categoryFilter, currentPage], loadPosts, { immediate: true });

function handleCategoryChange() {
  currentPage.value = 1;
}
</script>

<template>
  <div>
    <section class="site-hero site-hero--compact">
      <h1 class="site-hero-title">博客</h1>
      <p class="site-hero-desc">
        工程实践、架构解析与团队故事，来自 Fast Vue3 一线开发者
      </p>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="blog-toolbar" v-reveal>
          <t-select
            v-model="categoryFilter"
            style="width: 200px"
            @change="handleCategoryChange"
          >
            <t-option
              v-for="c in blogCategories"
              :key="c"
              :value="c"
              :label="c"
            />
          </t-select>
          <span class="blog-count">共 {{ total }} 篇</span>
        </div>

        <p v-if="loading" class="site-list-status" role="status">
          正在加载文章…
        </p>
        <div v-else-if="loadFailed" class="site-list-status" role="alert">
          文章列表加载失败。
          <button class="site-text-button" type="button" @click="loadPosts">
            重试
          </button>
        </div>
        <p
          v-else-if="blogPosts.length === 0"
          class="site-list-status"
          role="status"
        >
          暂无文章
        </p>
        <div v-else class="site-grid">
          <article
            v-for="(post, i) in blogPosts"
            :key="post.id"
            v-reveal="(i % 3) * 100"
            class="site-card blog-card"
          >
            <div class="blog-cover">{{ post.category }}</div>
            <h2 class="blog-title">
              <RouterLink class="site-card-link" :to="`/blog/${post.id}`">
                {{ post.title }}
              </RouterLink>
            </h2>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <div class="blog-meta">
              <span>{{ post.author }}</span>
              <span class="blog-dot">·</span>
              <span>{{ post.date }}</span>
            </div>
            <div class="blog-tags">
              <t-tag
                v-for="t in post.tags"
                :key="t"
                theme="primary"
                variant="light"
              >
                {{ t }}
              </t-tag>
            </div>
          </article>
        </div>

        <div v-if="total > pageSize && !loadFailed" class="blog-pagination">
          <t-pagination
            v-model:current="currentPage"
            :page-size="pageSize"
            :total="total"
            :show-page-size="false"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.blog-count {
  font-size: 0.9rem;
  color: var(--site-text-3);
}

.blog-card {
  position: relative;
  overflow: hidden;
}

.blog-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  margin: -32px -32px 20px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  background: var(--site-gradient);
}

.blog-title {
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--site-text-1);
}

.blog-excerpt {
  min-height: 46px;
  margin: 0 0 12px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

.blog-meta {
  font-size: 0.82rem;
  color: var(--site-text-4);
}

.blog-dot {
  margin: 0 6px;
}

.blog-tags {
  margin-top: 12px;
}

.blog-pagination {
  margin-top: 36px;
  text-align: center;
}
</style>
