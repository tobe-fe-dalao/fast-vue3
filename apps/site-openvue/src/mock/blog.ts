// 门户博客共享种子数据（无后端，本地驱动）

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  cover: string;
  excerpt: string;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '如何用 Fast Vue3 在一天内搭好企业后台',
    author: '张明',
    date: '2026-08-12',
    category: '实战教程',
    cover: '',
    excerpt: '从脚手架到权限、内容管理，带你走完一个可投产后台的最短路径。',
    tags: ['教程', '后台', 'CLI'],
    content: [
      '很多企业后台的痛点不是功能，而是从 0 到 1 的启动成本。Fast Vue3 的目标，就是把这个成本压到一天以内。',
      '本文以一个「订单管理后台」为例：先用 CLI 生成 Monorepo 骨架，再启用文件路由自动注册页面，最后接入共享的请求层与状态管理。你会发现，真正需要写的业务代码少得惊人。',
      '当你跑通第一条列表到详情的链路，剩下的页面都只是同一套模式的复制。',
    ],
  },
  {
    id: 2,
    title: '7 套 UI 框架，同一套业务能力的秘密',
    author: '李雪',
    date: '2026-08-06',
    category: '架构解析',
    cover: '',
    excerpt: '我们如何在不牺牲各框架原生体验的前提下，做到页面能力完全对齐。',
    tags: ['架构', 'UI', 'Design System'],
    content: [
      '「功能对齐」是 Fast Vue3 的核心约束：无论你用 Ant Design Vue 还是 Naive UI，后台都拥有相同的页面与信息架构。',
      '实现方式并不神秘——我们把业务逻辑沉淀在共享包里，UI 层只负责把同一份数据结构渲染成各自原生的组件。框架变了，视觉变了，能力不变。',
    ],
  },
  {
    id: 3,
    title: '文件路由让新增页面变成「建文件」',
    author: '王浩',
    date: '2026-07-29',
    category: '工程实践',
    cover: '',
    excerpt: '告别手写路由表，目录即路由，动态参数用方括号表达。',
    tags: ['路由', '工程化'],
    content: [
      '在大型后台里，路由表往往是最容易腐化的文件。文件路由把路由声明交还给目录结构，新增页面只需要新建一个 .vue 文件。',
      '动态参数用方括号文件名表达，例如 blog/[id].vue 对应 /blog/:id。配合侧边栏的目录分组，路由与导航始终一致。',
    ],
  },
  {
    id: 4,
    title: '暗色模式不只是换肤：设计 Token 的正确打开方式',
    author: '陈思',
    date: '2026-07-21',
    category: '设计',
    cover: '',
    excerpt: '把颜色抽象为语义 Token，让组件在明暗主题间无缝切换。',
    tags: ['主题', 'CSS', 'Design Token'],
    content: [
      '暗色模式翻车，多半是因为把颜色写死在了组件里。正确的做法是用 CSS Variables 表达品牌色、背景色、文本色等语义 Token。',
      '切换主题时只改变量，组件全部跟着响应。这让我们可以在不改业务代码的前提下，为所有页面统一接入暗色能力。',
    ],
  },
  {
    id: 5,
    title: 'Turborepo 远程缓存：让 CI 快到飞起',
    author: '刘洋',
    date: '2026-07-14',
    category: '工程实践',
    cover: '',
    excerpt: '任务编排 + 远程缓存 + affected 检测，构建时间从分钟到秒。',
    tags: ['Turborepo', '构建', 'Monorepo'],
    content: [
      '当工程里同时存在 7 套框架变体，全量构建不可接受。Turborepo 通过任务图谱只重建受影响的包，其余命中缓存。',
      '把缓存推到远程，团队内任何人的构建结果都能复用，CI 平均时间从分钟级降到秒级。',
    ],
  },
  {
    id: 6,
    title: '真实中文内容：为什么我们不写 Lorem Ipsum',
    author: '赵敏',
    date: '2026-07-08',
    category: '团队观点',
    cover: '',
    excerpt:
      '占位文本会掩盖真实的排版与信息密度问题，我们用真实业务内容填充模板。',
    tags: ['内容', '团队'],
    content: [
      'Lorem Ipsum 看起来「中立」，却会掩盖真实的排版问题：中文与英文的行高、断行、标点都不同，占位文本给不出可信的视觉效果。',
      '所以我们坚持用真实中文业务内容填充每一个模板页面，让开发者拿到手就能判断「这一屏到底装不装得下」。',
    ],
  },
  {
    id: 7,
    title: '从 PR 到独立负责模块：我们的实习生培养路径',
    author: '周凯',
    date: '2026-06-30',
    category: '团队故事',
    cover: '',
    excerpt: '小步反馈 + 可信任的脚手架，让新人三个月交付完整模块。',
    tags: ['成长', '招聘'],
    content: [
      '我们不让实习生从第一天就接大需求。先是从修文案错别字开始，逐步过渡到列表筛选、再到独立负责一个完整模块。',
      '变化的不是天赋，而是持续的小步反馈，以及一套让人敢放手去改的脚手架。',
    ],
  },
  {
    id: 8,
    title: '组件市场来了：把业务区块装进一行命令',
    author: '李雪',
    date: '2026-06-22',
    category: '产品动态',
    cover: '',
    excerpt: '30+ 生产验证的业务区块，安装即适配所选 UI 框架。',
    tags: ['组件市场', '效率'],
    content: [
      '组件市场首批上线了 30 多个经过生产验证的业务区块，覆盖高级搜索表单、可拖拽看板、角色权限矩阵等高频场景。',
      '一行命令安装，自动适配框架设计语言，附带真实中文示例数据，开箱即跑。',
    ],
  },
  {
    id: 9,
    title: '开源协议变更：从 MIT 到 Apache-2.0 意味着什么',
    author: '王浩',
    date: '2026-06-12',
    category: '公告',
    cover: '',
    excerpt: '更明确的专利授权与商业保障，使用方式不变。',
    tags: ['开源', '协议'],
    content: [
      '自 v3.0 起，核心共享包协议调整为 Apache-2.0，提供更明确的专利授权与商业使用保障，使用负担不增反降。',
      '个人与商业项目均可免费使用，修改后的源码无需公开，仅涉及专利条款细化。',
    ],
  },
];

export const blogCategories: string[] = [
  '全部',
  ...new Set(blogPosts.map((p) => p.category)),
];
