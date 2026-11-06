<script setup lang="ts">
import { api } from '@/api';

const fallbackFaqGroups = [
  {
    category: '快速开始',
    items: [
      {
        q: '如何创建一个新的 Fast Vue3 项目？',
        a: '执行 pnpm create fast-vue3，按提示选择架构（Monorepo / Polyrepo）、应用类型（后台 / 门户）与 UI 框架即可生成项目骨架。',
      },
      {
        q: '生成的项目可以直接运行吗？',
        a: '可以。生成结果已接入请求层、权限与状态管理，执行 pnpm install 后 pnpm dev 即可启动开发。',
      },
      {
        q: '需要什么运行环境？',
        a: 'Node.js >= 20.12.0，包管理器使用 pnpm。',
      },
    ],
  },
  {
    category: '架构与框架',
    items: [
      {
        q: 'Monorepo 与 Polyrepo 有什么区别？',
        a: '两者能力一致，区别在代码组织方式：Monorepo 将应用与共享包统一在一个仓库，Polyrepo 将各应用拆分为独立工程。',
      },
      {
        q: '支持哪些 UI 框架？',
        a: '当前支持 Ant Design Vue、Element Plus、Naive UI、Arco Design、TDesign、OpenVue 与 iDux，共 7 种。',
      },
      {
        q: '不同 UI 框架的功能是否一致？',
        a: '是的。同一应用类型在不同 UI 框架下拥有相同的页面能力与信息架构，仅视觉实现采用各自原生组件。',
      },
    ],
  },
  {
    category: '定制与扩展',
    items: [
      {
        q: '如何自定义品牌色与主题？',
        a: '主题基于 CSS Variables 设计，可通过偏好设置或覆盖 Token 自定义品牌色、圆角与暗色模式。',
      },
      {
        q: '能否新增业务页面？',
        a: '可以。项目提供后台与门户的完整页面模板，按照现有 Design System 扩展页面即可保持风格统一。',
      },
    ],
  },
];

const faqGroups = ref(fallbackFaqGroups);

onMounted(async () => {
  try {
    const data = await api.portal.faq();
    const categories = [...new Set(data.map((item) => item.category))];
    faqGroups.value = categories.map((category) => ({
      category,
      items: data
        .filter((item) => item.category === category)
        .map((item) => ({ q: item.question, a: item.answer })),
    }));
  } catch {
    // 保留内置内容作为接口不可用时的降级展示。
  }
});
</script>

<template>
  <div>
    <section class="site-hero site-hero--compact">
      <h1 class="site-hero-title">常见问题</h1>
      <p class="site-hero-desc">关于 Fast Vue3 的使用、架构与定制的常见疑问</p>
    </section>

    <section class="site-section">
      <div class="site-container site-container--narrow faq-list">
        <div
          v-for="(group, gi) in faqGroups"
          :key="group.category"
          v-reveal="gi * 100"
          class="faq-group"
        >
          <h3 class="faq-category">{{ group.category }}</h3>
          <div class="faq-card">
            <ACollapse :bordered="false" ghost>
              <ACollapsePanel
                v-for="item in group.items"
                :key="item.q"
                :header="item.q"
              >
                <p class="faq-answer">{{ item.a }}</p>
              </ACollapsePanel>
            </ACollapse>
          </div>
        </div>

        <div v-reveal class="faq-contact">
          没有找到答案？
          <RouterLink to="/contact" class="faq-contact-link">
            联系我们 →
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.faq-category {
  margin: 0 0 14px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.faq-card {
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  box-shadow: var(--site-shadow-sm);
}

.faq-answer {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--site-text-3);
}

.faq-contact {
  padding: 24px;
  color: var(--site-text-2);
  text-align: center;
  background: var(--site-bg-soft);
  border-radius: var(--site-radius);
}

.faq-contact-link {
  margin-left: 6px;
  font-weight: 600;
  color: var(--site-brand);
  text-decoration: none;
}

.faq-contact-link:hover {
  color: var(--site-brand-hover);
}
</style>
