<script setup lang="ts">
import { api } from '@/api';

interface DocItem {
  title: string;
  desc: string;
  meta: string;
}
interface DocGroup {
  category: string;
  items: DocItem[];
}

const docGroups: DocGroup[] = [
  {
    category: '快速开始',
    items: [
      {
        title: '环境准备与安装',
        desc: 'Node.js、pnpm 版本要求与项目的初始化步骤。',
        meta: '5 分钟',
      },
      {
        title: '创建第一个项目',
        desc: '使用 CLI 选择架构、应用类型与 UI 框架生成骨架。',
        meta: '10 分钟',
      },
      {
        title: '目录结构与约定',
        desc: 'Monorepo 下应用与共享包的组织方式及文件路由约定。',
        meta: '8 分钟',
      },
      {
        title: '本地开发与调试',
        desc: '启动 dev server、热更新与调试技巧。',
        meta: '6 分钟',
      },
    ],
  },
  {
    category: '组件指南',
    items: [
      {
        title: '布局与导航',
        desc: '侧边栏、面包屑、页签的接入方式与状态管理。',
        meta: '指南',
      },
      {
        title: '表单与校验',
        desc: '基于 antd 表单的必填校验、联动与提交反馈。',
        meta: '指南',
      },
      {
        title: '表格与分页',
        desc: '列表页搜索、筛选、分页与状态标签的最佳实践。',
        meta: '指南',
      },
      {
        title: '弹窗与确认',
        desc: '新增 / 编辑共用弹窗、删除二次确认的交互范式。',
        meta: '指南',
      },
    ],
  },
  {
    category: '进阶实战',
    items: [
      {
        title: '权限与角色模型',
        desc: '如何设计角色、权限树与后端联调的接口约定。',
        meta: '实战',
      },
      {
        title: '内容管理模块',
        desc: '文章、分类的列表 / 详情 / 编辑页面复用同一份种子数据。',
        meta: '实战',
      },
      {
        title: '数据可视化',
        desc: '不引图表库，用纯 CSS 实现渠道分布条形图。',
        meta: '实战',
      },
      {
        title: '多框架一致性',
        desc: '把一套业务逻辑复制到 7 套 UI 框架的迁移清单。',
        meta: '实战',
      },
    ],
  },
  {
    category: 'API 参考',
    items: [
      {
        title: '请求层 http',
        desc: '基于 @fast-vue3/request 的 GET/POST 封装与 base 路径。',
        meta: 'API',
      },
      {
        title: '用户与状态 store',
        desc: 'useUserStore 的登录、登出与用户信息读取。',
        meta: 'API',
      },
      {
        title: '偏好设置 preferences',
        desc: '主题模式、明暗切换与持久化的使用方式。',
        meta: 'API',
      },
    ],
  },
];
const shownDocGroups = ref<DocGroup[]>(docGroups);
const loadError = ref('');

onMounted(async () => {
  try {
    const sections = await api.portal.docs();
    shownDocGroups.value = sections.map((section) => ({
      category: section.title,
      items: section.items.map((item) => ({
        title: item.title,
        desc: section.description ?? '',
        meta: '文档',
      })),
    }));
  } catch {
    loadError.value = '文档目录暂时无法更新，当前显示内置示例';
  }
});
</script>

<template>
  <p v-if="loadError" role="alert" class="site-container">{{ loadError }}</p>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">文档中心</h1>
      <p class="site-hero-desc">
        从安装到进阶实战，一份面向中文开发者的完整使用手册
      </p>
    </section>

    <section class="site-section">
      <div class="site-container site-container--narrow docs-list">
        <div
          v-for="(group, gi) in shownDocGroups"
          :key="group.category"
          v-reveal="gi * 80"
          class="docs-group"
        >
          <h3 class="docs-category">{{ group.category }}</h3>
          <div v-for="item in group.items" :key="item.title" class="docs-card">
            <div class="docs-text">
              <div class="docs-title">{{ item.title }}</div>
              <div class="docs-desc">{{ item.desc }}</div>
            </div>
            <div class="docs-right">
              <span class="docs-meta">{{ item.meta }}</span>
              <span class="docs-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.docs-list {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.docs-category {
  margin: 0 0 16px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.docs-card {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  margin-bottom: 12px;
  text-decoration: none;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  box-shadow: var(--site-shadow-sm);
  transition:
    transform var(--site-transition),
    box-shadow var(--site-transition),
    border-color var(--site-transition);
}

.docs-card:hover {
  border-color: color-mix(in srgb, var(--site-brand) 30%, transparent);
  box-shadow: var(--site-shadow);
  transform: translateY(-2px);
}

.docs-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--site-text-1);
}

.docs-desc {
  margin-top: 4px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--site-text-3);
}

.docs-right {
  display: flex;
  flex: none;
  gap: 12px;
  align-items: center;
}

.docs-meta {
  padding: 2px 12px;
  font-size: 0.8rem;
  color: var(--site-brand);
  background: var(--site-bg-soft);
  border-radius: 999px;
}

.docs-arrow {
  color: var(--site-text-4);
  transition:
    color 0.2s,
    transform 0.2s;
}

.docs-card:hover .docs-arrow {
  color: var(--site-brand);
  transform: translateX(3px);
}
</style>
