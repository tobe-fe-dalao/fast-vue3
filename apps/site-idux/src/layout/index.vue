<script setup lang="ts">
import { IxDivider } from '@idux/components/divider';
import { IxTag } from '@idux/components/tag';

const route = useRoute();

const menuOpen = ref(false);
const menuButton = ref<HTMLButtonElement>();

function closeMenu() {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  menuButton.value?.focus();
}

// 滚动状态：导航栏投影 + 返回顶部按钮
const isScrolled = ref(false);
const showBackTop = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 8;
  showBackTop.value = window.scrollY > 400;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const navItems = [
  { path: '/', label: '首页' },
  { path: '/product', label: '产品' },
  { path: '/features', label: '特性' },
  { path: '/pricing', label: '价格' },
  { path: '/docs', label: '文档' },
  { path: '/blog', label: '博客' },
  { path: '/faq', label: '常见问题' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' },
];

const isActive = (path: string) =>
  path === '/'
    ? route.path === '/'
    : route.path === path || route.path.startsWith(`${path}/`);

const year = computed(() => new Date().getFullYear());

const footerGroups = [
  {
    title: '产品',
    links: [
      { label: '核心特性', href: '/features' },
      { label: '价格方案', href: '/pricing' },
      { label: '更新日志', href: '/blog' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '开发文档', href: '/docs' },
      { label: '常见问题', href: '/faq' },
      { label: '关于我们', href: '/about' },
    ],
  },
  {
    title: '生态链接',
    links: [
      { label: 'Vue 3', href: 'https://vuejs.org/' },
      { label: 'iDux', href: 'https://idux.site/' },
      { label: 'Vite', href: 'https://vitejs.dev/' },
    ],
  },
];
</script>

<template>
  <div class="site-layout">
    <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="site-header-inner" @keydown.esc="closeMenu">
        <RouterLink to="/" class="site-logo">
          <span class="logo-mark">F</span>
          <span class="logo-text">Fast Vue3</span>
          <IxTag color="blue" class="logo-tag">iDux</IxTag>
        </RouterLink>
        <button
          ref="menuButton"
          type="button"
          class="site-nav-toggle"
          :aria-expanded="menuOpen"
          aria-controls="site-navigation"
          @click="menuOpen = !menuOpen"
        >
          菜单
        </button>
        <nav
          id="site-navigation"
          class="site-nav"
          :class="{ 'site-nav--open': menuOpen }"
          aria-label="主导航"
        >
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="menuOpen = false"
            class="nav-link"
            :class="{ active: isActive(item.path) }"
          >
            {{ item.label }}
          </RouterLink>
          <RouterLink to="/login" class="nav-cta" @click="menuOpen = false">
            登录
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="site-content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">Fast Vue3</div>
            <p class="footer-slogan">
              基于 Vue 3 的多 UI 框架 Monorepo 工程平台， 集成 7
              大主流组件库，开箱即用。
            </p>
          </div>
          <div
            v-for="group in footerGroups"
            :key="group.title"
            class="footer-group"
          >
            <div class="footer-group-title">{{ group.title }}</div>
            <template v-for="link in group.links" :key="link.label">
              <RouterLink
                v-if="link.href.startsWith('/')"
                :to="link.href"
                class="footer-link"
              >
                {{ link.label }}
              </RouterLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="footer-link"
              >
                {{ link.label }}
              </a>
            </template>
          </div>
        </div>
        <IxDivider style="margin: 24px 0 16px" />
        <div class="footer-copyright">
          Fast Vue3 &copy; {{ year }} &middot; iDux 生态模板
        </div>
      </div>
    </footer>

    <Transition name="backtop">
      <button
        v-show="showBackTop"
        type="button"
        class="site-backtop"
        title="返回顶部"
        @click="scrollToTop"
      >
        <span class="site-backtop-icon">↑</span>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.site-layout {
  min-height: 100vh;
  background: var(--site-bg);
}

/* ── Header ── */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--site-header-h);
  background: color-mix(in srgb, var(--site-surface) 92%, transparent);
  backdrop-filter: blur(8px);
  transition: box-shadow var(--site-transition);
}

.site-header.is-scrolled {
  box-shadow: 0 2px 12px rgb(17 24 39 / 8%);
}

.site-header-inner {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  max-width: var(--site-container);
  height: 100%;
  padding: 0 24px;
  margin: 0 auto;
}

.site-logo {
  display: flex;
  flex: none;
  gap: 10px;
  align-items: center;
  text-decoration: none;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  background: var(--site-gradient);
  border-radius: 8px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.logo-tag {
  font-size: 11px;
}

/* ── Nav ── */
.site-nav {
  display: flex;
  gap: 4px;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
}

.site-nav::-webkit-scrollbar {
  display: none;
}

.nav-link {
  flex: none;
  padding: 6px 14px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--site-text-2);
  text-decoration: none;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
}

.nav-link:hover {
  color: var(--site-brand);
  background: var(--site-bg-soft);
}

.nav-link.active {
  font-weight: 600;
  color: var(--site-brand);
  background: var(--site-bg-soft);
}

.nav-cta {
  flex: none;
  padding: 6px 20px;
  margin-left: 8px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  background: var(--site-brand);
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-cta:hover {
  color: #fff;
  background: var(--site-brand-hover);
}

/* ── Content ── */
.site-content {
  min-height: calc(100vh - var(--site-header-h) - 120px);
}

/* ── Footer ── */
.site-footer {
  padding: 48px 24px 24px;
  background: var(--site-surface);
  border-top: 1px solid var(--site-border);
}

.footer-inner {
  max-width: var(--site-container);
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.footer-logo {
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.footer-slogan {
  max-width: 320px;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--site-text-3);
}

.footer-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-group-title {
  margin-bottom: 2px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.footer-link {
  font-size: 0.9rem;
  color: var(--site-text-3);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--site-brand);
}

.footer-copyright {
  font-size: 0.85rem;
  color: var(--site-text-4);
  text-align: center;
}

/* ── Back to top ── */
.site-backtop {
  position: fixed;
  right: 32px;
  bottom: 40px;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 1.1rem;
  color: var(--site-text-2);
  cursor: pointer;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 50%;
  box-shadow: var(--site-shadow);
  transition:
    color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.site-backtop:hover {
  color: var(--site-brand);
  border-color: var(--site-brand);
  transform: translateY(-2px);
}

.backtop-enter-active,
.backtop-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.backtop-enter-from,
.backtop-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
