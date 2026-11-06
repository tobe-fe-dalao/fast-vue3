<script setup lang="ts">
const route = useRoute();

const menuOpen = ref(false);
const menuButton = ref<HTMLButtonElement>();

function closeMenu() {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  menuButton.value?.focus();
}

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/features', label: '特性' },
  { path: '/blog', label: '博客' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系我们' },
];
</script>

<template>
  <div class="app-layout">
    <header class="app-header site-header">
      <div class="header-inner site-header-inner" @keydown.esc="closeMenu">
        <RouterLink to="/" class="logo">Fast Vue3</RouterLink>
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
          class="nav site-nav"
          :class="{ 'site-nav--open': menuOpen }"
          aria-label="主导航"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="menuOpen = false"
            class="nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-links">
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
          <span class="dot">·</span>
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
          <span class="dot">·</span>
          <a href="https://turbo.build/" target="_blank" rel="noopener"
            >Turborepo</a
          >
        </div>
        <p class="copyright">Fast Vue3 &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgb(255 255 255 / 90%);
  border-bottom: 1px solid #f0f0f0;
  backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  padding: 0 24px;
  margin: 0 auto;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1677ff;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-link {
  padding: 6px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #1677ff;
  background: #f0f5ff;
}

.app-content {
  flex: 1;
}

.app-footer {
  padding: 24px;
  text-align: center;
  border-top: 1px solid #f0f0f0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  margin-bottom: 8px;
}

.footer-links a {
  font-size: 0.9rem;
  color: #6b7280;
  text-decoration: none;
}

.footer-links a:hover {
  color: #1677ff;
}

.dot {
  margin: 0 8px;
  color: #d1d5db;
}

.copyright {
  margin: 0;
  font-size: 0.85rem;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 16px;
  }

  .nav {
    gap: 4px;
  }

  .nav-link {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
</style>
