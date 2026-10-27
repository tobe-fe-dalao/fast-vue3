<script setup lang="ts">
import type { BlogComment, BlogPost } from '@/api';

import { isLoggedIn } from '@fast-vue3/utils';

import { api } from '@/api';
import Button from 'openvue/button';
import Divider from 'openvue/divider';
import ProgressSpinner from 'openvue/progressspinner';
import Tag from 'openvue/tag';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const post = ref<BlogPost | null>(null);

const comments = ref<BlogComment[]>([]);
const commentsLoading = ref(false);
const commentContent = ref('');
const commentSubmitting = ref(false);
const commentError = ref('');

async function loadComments() {
  commentsLoading.value = true;
  try {
    comments.value = await api.portal.blogComments(Number(route.params.id));
  } catch {
    commentError.value = '评论加载失败，请稍后重试';
  } finally {
    commentsLoading.value = false;
  }
}

async function submitComment() {
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
  commentSubmitting.value = true;
  commentError.value = '';
  try {
    const comment = await api.portal.createBlogComment(
      Number(route.params.id),
      { content },
    );
    comments.value.unshift(comment);
    commentContent.value = '';
  } catch (error) {
    commentError.value =
      error instanceof Error ? error.message : '评论发布失败';
  } finally {
    commentSubmitting.value = false;
  }
}

onMounted(loadComments);

const coverText = computed(() => (post.value?.category ?? '封面').slice(0, 2));

onMounted(async () => {
  const id = Number(route.params.id);
  try {
    post.value = await api.portal.blog(id);
  } catch {
    post.value = null;
  } finally {
    loading.value = false;
  }
});

function goBack() {
  router.push('/blog');
}
</script>

<template>
  <div>
    <section class="site-hero detail-hero">
      <Button variant="text" class="back-btn" @click="goBack">
        <i class="pi pi-arrow-left" style="margin-right: 6px"></i>返回博客列表
      </Button>
      <div
        v-if="loading"
        style="display: flex; justify-content: center; padding: 40px"
      >
        <ProgressSpinner />
      </div>
      <template v-if="!loading && post">
        <h1 class="site-hero-title">{{ post.title }}</h1>
        <div class="hero-meta">
          <span>{{ post.author }}</span
          ><span class="dot">·</span><span>{{ post.date }}</span>
          <Tag :value="post.category" severity="info" class="hero-tag" />
        </div>
      </template>
      <h1 v-if="!loading && !post" class="site-hero-title">未找到该文章</h1>
    </section>

    <section class="site-section detail-section">
      <div class="site-container site-container--narrow">
        <div
          v-if="!post && !loading"
          style="padding: 64px 0; color: var(--site-text-3); text-align: center"
        >
          未找到该文章
        </div>
        <article v-if="post" v-reveal class="site-card detail-card">
          <div class="detail-cover">{{ coverText }} 封面</div>
          <p v-for="(p, i) in post.content" :key="i" class="detail-paragraph">
            {{ p }}
          </p>
          <Divider />
          <div class="detail-tags">
            <span class="detail-tags-label">标签：</span>
            <Tag v-for="t in post.tags" :key="t" :value="t" severity="info" />
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
              :disabled="commentSubmitting"
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
