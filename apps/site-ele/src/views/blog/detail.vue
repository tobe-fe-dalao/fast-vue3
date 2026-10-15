<script setup lang="ts">
import type { BlogComment, BlogPost } from '@/api';

import { useLatestRequest } from '@fast-vue3/shared';
import { isLoggedIn } from '@fast-vue3/utils';

import { api } from '@/api';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const post = ref<BlogPost | null>(null);

const comments = ref<BlogComment[]>([]);
const commentsLoading = ref(false);
const commentContent = ref('');
const commentSubmitting = ref(false);
const commentError = ref('');

const postRequests = useLatestRequest();
const commentsRequests = useLatestRequest();
const commentRequests = useLatestRequest();

async function loadComments() {
  const isCurrent = commentsRequests.start();
  commentsLoading.value = true;
  try {
    const result = await api.portal.blogComments(Number(route.params.id));
    if (isCurrent()) comments.value = result;
  } catch {
    if (!isCurrent()) return;
    commentError.value = '评论加载失败，请稍后重试';
  } finally {
    if (isCurrent()) commentsLoading.value = false;
  }
}

async function submitComment() {
  if (
    commentSubmitting.value ||
    loading.value ||
    commentsLoading.value ||
    !post.value
  )
    return;
  const id = Number(route.params.id);
  const draft = commentContent.value;
  if (!isLoggedIn()) {
    await router.push({
      path: '/login',
      query: { redirect: route.fullPath },
    });
    return;
  }
  const content = commentContent.value.trim();
  if (!content) {
    commentError.value = '请输入评论内容';
    return;
  }
  const isCurrent = commentRequests.start();
  commentSubmitting.value = true;
  commentError.value = '';
  try {
    const comment = await api.portal.createBlogComment(id, { content });
    if (!isCurrent()) return;
    comments.value.unshift(comment);
    if (commentContent.value === draft) commentContent.value = '';
  } catch (error) {
    if (!isCurrent()) return;
    commentError.value =
      error instanceof Error ? error.message : '评论发布失败';
  } finally {
    if (isCurrent()) commentSubmitting.value = false;
  }
}

const coverText = computed(() => (post.value?.category ?? '封面').slice(0, 2));

async function loadPost() {
  const isCurrent = postRequests.start();
  loading.value = true;
  const id = Number(route.params.id);
  try {
    const result = await api.portal.blog(id);
    if (isCurrent()) post.value = result;
  } catch {
    if (!isCurrent()) return;
    post.value = null;
  } finally {
    if (isCurrent()) loading.value = false;
  }
}

watch(
  () => route.params.id,
  () => {
    commentRequests.invalidate();
    commentSubmitting.value = false;
    commentError.value = '';
    commentContent.value = '';
    comments.value = [];
    post.value = null;
    void loadPost();
    void loadComments();
  },
  { immediate: true, flush: 'sync' },
);

function goBack() {
  router.push('/blog');
}
</script>

<template>
  <div>
    <section class="site-hero detail-hero">
      <ElButton text class="back-btn" @click="goBack">
        ← 返回博客列表
      </ElButton>
      <div v-loading="loading">
        <template v-if="post">
          <h1 class="site-hero-title">{{ post.title }}</h1>
          <div class="hero-meta">
            <span>{{ post.author }}</span>
            <span class="dot">·</span>
            <span>{{ post.date }}</span>
            <ElTag type="primary" class="hero-tag">{{ post.category }}</ElTag>
          </div>
        </template>
        <h1 v-else-if="!loading" class="site-hero-title">未找到该文章</h1>
      </div>
    </section>

    <section class="site-section detail-section">
      <div class="site-container site-container--narrow">
        <ElEmpty
          v-if="!post && !loading"
          description="未找到该文章"
          style="padding: 64px 0"
        />

        <article v-if="post" v-reveal class="site-card detail-card">
          <div class="detail-cover">{{ coverText }} 封面</div>
          <p v-for="(p, i) in post.content" :key="i" class="detail-paragraph">
            {{ p }}
          </p>
          <ElDivider />
          <div class="detail-tags">
            <span class="detail-tags-label">标签：</span>
            <ElTag v-for="t in post.tags" :key="t" type="primary">
              {{ t }}
            </ElTag>
          </div>
        </article>

        <section class="comment-section">
          <div class="comment-heading">
            <div>
              <span class="comment-eyebrow">DISCUSSION</span>
              <h2>
                评论 {{ comments.length > 0 ? `(${comments.length})` : '' }}
              </h2>
            </div>
            <span class="comment-privacy">阅读公开 · 发布需登录</span>
          </div>
          <textarea
            v-model="commentContent"
            class="comment-input"
            rows="4"
            maxlength="1000"
            placeholder="分享你的看法…"
          ></textarea>
          <div class="comment-actions">
            <span v-if="commentError" class="comment-error">{{
              commentError
            }}</span>
            <button
              class="comment-submit"
              type="button"
              :disabled="
                commentSubmitting || loading || commentsLoading || !post
              "
              @click="submitComment"
            >
              {{
                commentSubmitting
                  ? '发布中…'
                  : isLoggedIn()
                    ? '发布评论'
                    : '登录后评论'
              }}
            </button>
          </div>
          <div v-if="commentsLoading" class="comment-empty">正在加载评论…</div>
          <div v-else-if="comments.length > 0" class="comment-list">
            <article
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <div class="comment-avatar">
                {{ comment.username.slice(0, 1).toUpperCase() }}
              </div>
              <div>
                <div class="comment-meta">
                  <strong>{{ comment.username }}</strong>
                  <time>{{ comment.createdAt }}</time>
                </div>
                <p>{{ comment.content }}</p>
              </div>
            </article>
          </div>
          <div v-else class="comment-empty">
            还没有评论，登录后来发表第一条吧。
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-hero {
  padding-block: 64px 48px;
}

.back-btn {
  margin-bottom: 16px;
  color: rgb(255 255 255 / 85%) !important;
}

.back-btn:hover {
  color: #fff !important;
}

.hero-meta {
  font-size: 0.95rem;
  color: rgb(255 255 255 / 80%);
}

.hero-meta .dot {
  margin: 0 8px;
}

.hero-tag {
  margin-left: 10px;
}

.detail-section {
  padding-block: 48px;
}

.detail-card {
  padding: 40px;
}

.detail-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  margin-bottom: 28px;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  background: var(--site-gradient);
  border-radius: var(--site-radius-sm);
}

.detail-paragraph {
  margin: 0 0 18px;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--site-text-2);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.detail-tags-label {
  font-size: 0.9rem;
  color: var(--site-text-3);
}
</style>
