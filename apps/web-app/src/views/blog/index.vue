<script setup lang="ts">
import type { BlogPost } from '@/api';

import { api } from '@/api';

const posts = ref<BlogPost[]>([]);
const error = ref('');

onMounted(async () => {
  try {
    const result = await api.portal.blogList({ page: 1, pageSize: 20 });
    posts.value = result.items;
  } catch {
    error.value = '博客内容加载失败，请稍后重试';
  }
});
</script>

<template>
  <div>
    <header class="site-hero site-hero--compact">
      <h1 class="site-hero-title">博客动态</h1>
      <p class="site-hero-desc">项目更新、技术分享与最佳实践</p>
    </header>
    <section class="site-section site-container site-container--narrow">
      <div class="post-list">
        <p v-if="error" role="alert">{{ error }}</p>
        <article
          v-for="post in posts"
          :key="post.id"
          class="site-card post-card"
        >
          <div class="post-meta">
            <span class="tag">{{ post.category }}</span>
            <span class="date">{{ post.date }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
        </article>
      </div>
      <div class="bottom-nav">
        <RouterLink to="/features">&#8592; 产品特性</RouterLink>
        <RouterLink to="/contact">联系我们 &#8594;</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
}

.post-card {
  padding: 28px;
  background: var(--site-bg);
  border-radius: 12px;
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
}

.post-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.tag {
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--site-brand);
  background: #e6f4ff;
  border-radius: 4px;
}

.date {
  font-size: 0.8rem;
  color: #9ca3af;
}

.post-card h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.post-card p {
  margin: 0;
  line-height: 1.6;
  color: var(--site-text-3);
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
}

.bottom-nav a {
  font-weight: 500;
  color: var(--site-brand);
  text-decoration: none;
}

.bottom-nav a:hover {
  text-decoration: underline;
}
</style>
