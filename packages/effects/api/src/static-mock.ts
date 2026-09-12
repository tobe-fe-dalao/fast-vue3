import type { Api } from './index';
import type {
  ArticleItem,
  BlogComment,
  BlogPost,
  CategoryItem,
  ConfigItem,
  DeptItem,
  DictItem,
  ErrorLogItem,
  LoginLogItem,
  MenuItem,
  NoticeItem,
  OperationLogItem,
  PageQuery,
  PermissionItem,
  PricingPlan,
  RoleItem,
  UserItem,
} from './types';

import { createStaticEnterpriseApi } from './static-enterprise';

const clone = <T>(value: T): T => structuredClone(value);
const resolved = <T>(value: T) => Promise.resolve(clone(value));
const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);

function paginate<T>(items: T[], query: PageQuery = {}) {
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const start = (page - 1) * pageSize;
  return {
    items: clone(items.slice(start, start + pageSize)),
    page,
    pageSize,
    total: items.length,
  };
}

function filterKeyword<T>(
  items: T[],
  keyword: string | undefined,
  fields: (item: T) => Array<string | undefined>,
) {
  const normalized = keyword?.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) =>
    fields(item).some((field) => field?.toLowerCase().includes(normalized)),
  );
}

function requireRecord<T extends { id: number }>(items: T[], id: number) {
  const record = items.find((item) => item.id === id);
  if (!record) throw new Error('记录不存在');
  return record;
}

function removeRecord<T extends { id: number }>(items: T[], id: number) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('记录不存在');
  items.splice(index, 1);
  return Promise.resolve(undefined);
}

const seedPermissions: PermissionItem[] = [
  { id: 1, code: 'user:list', name: '用户查询', description: '查看用户列表' },
  { id: 2, code: 'user:create', name: '用户创建', description: '新增用户' },
  { id: 3, code: 'user:update', name: '用户更新', description: '修改用户' },
  { id: 4, code: 'user:delete', name: '用户删除', description: '删除用户' },
  { id: 5, code: 'role:list', name: '角色查询', description: '查看角色列表' },
  {
    id: 6,
    code: 'role:permission',
    name: '角色授权',
    description: '配置角色权限',
  },
  { id: 7, code: 'menu:list', name: '菜单查询', description: '查看菜单' },
  { id: 8, code: 'content:list', name: '内容查询', description: '查看内容' },
  { id: 9, code: 'log:view', name: '日志查看', description: '查看系统日志' },
  {
    id: 10,
    code: 'analytics:view',
    name: '数据分析',
    description: '查看经营分析',
  },
  ...[
    'tenant:list',
    'department:list',
    'department:manage',
    'project:list',
    'project:create',
    'project:update',
    'task:create',
    'task:update',
    'approval:create',
    'approval:action',
    'audit:view',
    'file:upload',
  ].map((code, index) => ({ id: index + 11, code, name: code })),
];

const seedUsers: UserItem[] = [
  {
    id: 1,
    username: 'admin',
    realName: '管理员',
    nickname: '管理员',
    email: 'admin@fast-vue3.com',
    phone: '13800000001',
    roles: ['admin'],
    status: 'active',
    createdAt: '2026-01-01 08:00:00',
  },
  {
    id: 2,
    username: 'zhangsan',
    realName: '张三',
    nickname: '张三',
    email: 'zhangsan@fast-vue3.com',
    phone: '13800000002',
    roles: ['editor'],
    status: 'active',
    createdAt: '2026-02-15 10:30:00',
  },
  {
    id: 3,
    username: 'lisi',
    realName: '李四',
    nickname: '李四',
    email: 'lisi@fast-vue3.com',
    phone: '13800000003',
    roles: ['user'],
    status: 'disabled',
    createdAt: '2026-03-20 14:00:00',
  },
];

const seedRoles: RoleItem[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    permissions: ['*'],
    menuIds: [1, 2, 3, 4, 5, 6, 7],
    createdAt: '2026-01-01 08:00:00',
    updatedAt: '2026-01-01 08:00:00',
  },
  {
    id: 2,
    name: '编辑者',
    code: 'editor',
    description: '可管理内容与查看数据',
    permissions: ['content:list', 'analytics:view'],
    menuIds: [1, 2, 7],
    createdAt: '2026-02-01 08:00:00',
    updatedAt: '2026-02-01 08:00:00',
  },
];

const seedMenus: MenuItem[] = [
  {
    id: 1,
    parentId: 0,
    name: '首页',
    path: '/home',
    icon: 'HomeOutlined',
    sort: 1,
    type: 'menu',
    visible: true,
  },
  {
    id: 2,
    parentId: 0,
    name: '仪表盘',
    path: '/dashboard',
    icon: 'DashboardOutlined',
    sort: 2,
    type: 'menu',
    visible: true,
  },
  {
    id: 3,
    parentId: 0,
    name: '系统管理',
    path: '/system',
    icon: 'SettingOutlined',
    sort: 3,
    type: 'directory',
    visible: true,
  },
  {
    id: 4,
    parentId: 3,
    name: '用户管理',
    path: '/system/user',
    icon: 'UserOutlined',
    sort: 1,
    type: 'menu',
    visible: true,
  },
  {
    id: 5,
    parentId: 3,
    name: '角色管理',
    path: '/system/role',
    icon: 'LockOutlined',
    sort: 2,
    type: 'menu',
    visible: true,
  },
  {
    id: 6,
    parentId: 3,
    name: '菜单管理',
    path: '/system/menu',
    icon: 'MenuOutlined',
    sort: 3,
    type: 'menu',
    visible: true,
  },
  {
    id: 7,
    parentId: 0,
    name: '数据分析',
    path: '/analytics',
    icon: 'BarChartOutlined',
    sort: 4,
    type: 'menu',
    visible: true,
  },
];

const seedCategories: CategoryItem[] = [
  {
    id: 1,
    name: '产品动态',
    slug: 'product',
    description: '版本发布与产品演进。',
    status: 'active',
  },
  {
    id: 2,
    name: '技术博客',
    slug: 'tech',
    description: '架构实践与源码解析。',
    status: 'active',
  },
];

const seedArticles: ArticleItem[] = [
  {
    id: 1,
    title: 'Fast Vue3 多应用预览正式上线',
    author: 'Fast Vue3 Team',
    category: '产品动态',
    categoryId: 1,
    tags: ['发布', 'GitHub Pages'],
    cover: '',
    summary: '同一个 GitHub Pages 站点同时预览门户与管理后台。',
    content: ['门户应用部署在项目根路径。', '管理后台部署在子路径。'],
    status: 'published',
    date: '2026-09-06 10:00:00',
  },
  {
    id: 2,
    title: 'Vue 3 Monorepo 工程实践',
    author: '张明',
    category: '技术博客',
    categoryId: 2,
    tags: ['Vue', 'Monorepo'],
    cover: '',
    summary: '共享工程能力，同时保留各 UI 框架的原生体验。',
    content: ['共享包负责请求、状态与主题能力。'],
    status: 'published',
    date: '2026-08-12 10:24:00',
  },
];

const seedBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '如何用 Fast Vue3 在一天内搭好企业后台',
    author: '张明',
    date: '2026-08-12',
    category: '实战教程',
    cover: '',
    excerpt: '从脚手架到权限、内容管理，走完可投产后台的最短路径。',
    tags: ['教程', '后台'],
    content: ['Fast Vue3 把通用工程能力沉淀进共享包。'],
  },
  {
    id: 2,
    title: '7 套 UI 框架，同一套业务能力的秘密',
    author: '李雪',
    date: '2026-08-06',
    category: '架构解析',
    cover: '',
    excerpt: '框架改变视觉，不改变业务能力与信息架构。',
    tags: ['架构', 'UI'],
    content: ['业务逻辑由共享包承载，UI 层使用原生组件完成渲染。'],
  },
  {
    id: 3,
    title: '文件路由让新增页面变成建文件',
    author: '王浩',
    date: '2026-07-29',
    category: '工程实践',
    cover: '',
    excerpt: '目录即路由，动态参数用方括号表达。',
    tags: ['路由', '工程化'],
    content: ['文件路由让目录结构成为路由配置的事实来源。'],
  },
];

const seedFaqs = [
  {
    id: 1,
    category: '入门',
    question: 'Fast Vue3 适合什么规模的团队？',
    answer: '从个人项目到中大型团队都适用。',
  },
  {
    id: 2,
    category: '功能',
    question: '是否支持暗色模式与文件路由？',
    answer: '支持，并且所有 UI 框架变体保持一致能力。',
  },
  {
    id: 3,
    category: '部署',
    question: '这个预览需要独立后端吗？',
    answer: '不需要，GitHub Pages 预览使用浏览器内静态 Mock。',
  },
];

const seedPricing: PricingPlan[] = [
  {
    id: 1,
    name: '开源版',
    description: '完整工程能力免费使用。',
    price: '免费',
    period: '永久',
    highlighted: false,
    features: ['Monorepo 脚手架', '7 套 UI 框架', '文件路由与暗色模式'],
  },
  {
    id: 2,
    name: '团队版',
    description: '面向中小团队的协作能力。',
    price: '¥199',
    period: '每人/年',
    highlighted: true,
    features: ['包含开源版能力', '业务区块', '角色权限矩阵'],
  },
  {
    id: 3,
    name: '企业版',
    description: '私有部署与定制服务。',
    price: '定制',
    period: '联系销售',
    highlighted: false,
    features: ['私有化部署', '设计 Token 定制', '技术顾问'],
  },
];

const departments: DeptItem[] = [
  {
    id: 1,
    name: 'Fast Vue3 团队',
    leader: '管理员',
    order: 0,
    status: 'active',
    createdAt: '2026-01-01 08:00:00',
    children: [
      {
        id: 2,
        name: '技术部',
        leader: '张三',
        order: 1,
        status: 'active',
        createdAt: '2026-01-05 09:00:00',
      },
      {
        id: 3,
        name: '产品部',
        leader: '李四',
        order: 2,
        status: 'active',
        createdAt: '2026-01-08 09:30:00',
      },
    ],
  },
];

const dicts: DictItem[] = [
  {
    id: 1,
    name: '用户状态',
    type: 'sys_user_status',
    status: 'active',
    remark: '用户状态列表',
    createdAt: '2026-01-05 09:00:00',
    data: [
      { label: '正常', value: 'active' },
      { label: '停用', value: 'disabled' },
    ],
  },
  {
    id: 2,
    name: '通知类型',
    type: 'sys_notice_type',
    status: 'active',
    remark: '通知类型列表',
    createdAt: '2026-01-06 10:00:00',
    data: [
      { label: '通知', value: 'notice' },
      { label: '公告', value: 'announcement' },
    ],
  },
];

const configs: ConfigItem[] = [
  {
    id: 1,
    name: '账号注册开关',
    key: 'sys.account.registerUser',
    value: 'true',
    type: 'built-in',
    remark: '是否开放用户注册',
    createdAt: '2026-01-05 09:00:00',
  },
  {
    id: 2,
    name: '用户初始密码',
    key: 'sys.user.initPassword',
    value: '123456',
    type: 'built-in',
    remark: '新用户默认密码',
    createdAt: '2026-01-06 10:00:00',
  },
];

const notices: NoticeItem[] = [
  {
    id: 1,
    title: 'GitHub Pages 预览上线',
    type: '公告',
    status: 'active',
    author: '管理员',
    createdAt: '2026-09-06 10:00:00',
    content: '门户站点与后台管理应用已支持在线预览。',
  },
  {
    id: 2,
    title: '演示数据说明',
    type: '通知',
    status: 'active',
    author: '技术组',
    createdAt: '2026-09-06 10:10:00',
    content: '演示数据仅保存在浏览器内存中，刷新后恢复。',
  },
];

function makeLoginLogs(): LoginLogItem[] {
  return Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    username: index % 3 === 0 ? 'admin' : 'demo-user',
    ip: `192.168.1.${index + 10}`,
    browser: 'Chrome',
    os: index % 2 === 0 ? 'macOS' : 'Windows 11',
    status: 'success',
    message: '登录成功',
    createdAt: `2026-09-${String((index % 6) + 1).padStart(2, '0')} 09:30:00`,
  }));
}

function makeOperationLogs(): OperationLogItem[] {
  return Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    username: 'admin',
    module: index % 2 === 0 ? '用户管理' : '内容管理',
    action: index % 2 === 0 ? '查询' : '编辑',
    description: '操作演示数据',
    duration: 30 + index,
    ip: `192.168.1.${index + 20}`,
    method: index % 2 === 0 ? 'GET' : 'POST',
    status: 'success',
    createdAt: `2026-09-${String((index % 6) + 1).padStart(2, '0')} 10:00:00`,
  }));
}

function makeErrorLogs(): ErrorLogItem[] {
  return Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    type: 'TypeError',
    message: '演示错误日志',
    page: '/dashboard',
    stack: 'Error: demo error at Component.setup',
    browser: 'Chrome',
    os: 'macOS',
    status: index % 2 === 0 ? 'resolved' : 'pending',
    createdAt: `2026-09-${String((index % 6) + 1).padStart(2, '0')} 11:00:00`,
  }));
}

/**
 * Create an in-browser API implementation for static previews.
 * Mutations are intentionally kept in memory and reset on page reload.
 */
export function createStaticMockApi(): Api {
  const permissions = clone(seedPermissions);
  const users = clone(seedUsers);
  const roles = clone(seedRoles);
  const menus = clone(seedMenus);
  const categories = clone(seedCategories);
  const articles = clone(seedArticles);
  const blogPosts = clone(seedBlogPosts);
  const blogComments: BlogComment[] = [
    {
      articleId: 1,
      content: '示例很清楚，期待更多案例。',
      createdAt: '2026-08-13 09:30:00',
      id: 1,
      username: 'admin',
    },
  ];
  const loginLogs = makeLoginLogs();
  const operationLogs = makeOperationLogs();
  const errorLogs = makeErrorLogs();
  let idSequence = 100;
  const nextId = () => ++idSequence;

  const articleDetail = (id: number) => resolved(requireRecord(articles, id));
  const articleList = (query: PageQuery = {}) =>
    resolved(
      paginate(
        filterKeyword(articles, query.keyword, (item) => [
          item.title,
          item.author,
          item.summary,
        ]),
        query,
      ),
    );
  const categoryList = () => resolved(categories);

  const api = {
    ...createStaticEnterpriseApi(),
    analytics: {
      dashboardStats: () =>
        resolved({
          todayVisits: 3256,
          totalUsers: 12_480,
          activeUsers: 8934,
          todayOrders: 156,
          weeklyGrowth: 12.5,
          monthlyRevenue: 284_600,
          conversionRate: 3.8,
          systemUptime: 99.9,
          recentActivities: [
            { id: 1, user: '张三', action: '创建了新用户', time: '2 分钟前' },
            {
              id: 2,
              user: '管理员',
              action: '更新了系统配置',
              time: '1 小时前',
            },
          ],
          roleDistribution: [
            { name: '管理员', value: 3 },
            { name: '编辑者', value: 21 },
            { name: '普通用户', value: 860 },
          ],
          weeklyTrend: {
            days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            visits: [1200, 1380, 1520, 1290, 1680, 890, 720],
            users: [320, 380, 420, 350, 460, 210, 180],
          },
          topPages: [
            { path: '/dashboard', title: '仪表盘', visits: 4520 },
            { path: '/user', title: '用户管理', visits: 3180 },
            { path: '/analytics', title: '数据分析', visits: 2860 },
          ],
        }),
      dataOverview: () =>
        resolved({
          recent: [
            {
              type: '收入',
              amount: '+¥12,800',
              date: '2026-09-05',
              status: '成功',
            },
            {
              type: '退款',
              amount: '-¥1,150',
              date: '2026-09-04',
              status: '处理中',
            },
          ],
          stats: [
            {
              title: '本月营收',
              value: 284_600,
              suffix: '元',
              border: '#1677ff',
              prefix: '¥',
            },
            {
              title: '订单总数',
              value: 1560,
              suffix: '笔',
              border: '#52c41a',
            },
            {
              title: '活跃用户',
              value: 8934,
              suffix: '人',
              border: '#faad14',
            },
            {
              title: '转化率',
              value: 3.8,
              suffix: '%',
              border: '#eb2f96',
            },
          ],
        }),
      overview: (days = 7) => {
        const trend = Array.from({ length: days }, (_, index) => {
          const date = new Date(Date.now() - (days - index - 1) * 86_400_000);
          return {
            date: date.toISOString().slice(0, 10),
            visits: 800 + index * 40,
            users: 200 + index * 12,
            orders: 30 + index * 3,
            revenue: 5000 + index * 200,
          };
        });
        return resolved({
          stats: [
            {
              title: '总访问量',
              value: 86_420,
              suffix: '',
              color: '#1677ff',
            },
            {
              title: '独立用户',
              value: 23_150,
              suffix: '',
              color: '#52c41a',
            },
            {
              title: '订单数',
              value: 4820,
              suffix: '',
              color: '#faad14',
            },
          ],
          topPages: [
            {
              page: '/dashboard',
              title: '仪表盘',
              visits: 4520,
              avgTime: '2m 18s',
            },
            {
              page: '/user',
              title: '用户管理',
              visits: 3180,
              avgTime: '3m 05s',
            },
          ],
          trend,
        });
      },
    },
    auth: {
      login: ({ password, username }) => {
        if (!['admin', 'user'].includes(username) || password !== '123456') {
          return Promise.reject(new Error('用户名或密码错误'));
        }
        return resolved({
          accessToken: `mock-access-token-${username}`,
          expiresIn: 7200,
          refreshToken: `mock-refresh-token-${username}`,
        });
      },
      logout: () => Promise.resolve(undefined),
      me: () =>
        resolved({
          id: 1,
          tenantId: 1,
          username: 'admin',
          nickname: '管理员',
          roles: ['admin'],
          permissions: permissions.map((item) => item.code),
        }),
      refresh: () =>
        resolved({
          accessToken: 'mock-access-token-admin',
          expiresIn: 7200,
          refreshToken: 'mock-refresh-token-admin',
        }),
      register: ({ email, password, username }) => {
        if (!username || !email || password.length < 6) {
          return Promise.reject(
            new Error('用户名、邮箱不能为空，密码至少 6 位'),
          );
        }
        if (users.some((item) => item.username === username)) {
          return Promise.reject(new Error('用户名已存在'));
        }
        const user: UserItem = {
          id: nextId(),
          username,
          email,
          nickname: username,
          realName: username,
          roles: ['user'],
          status: 'active',
          createdAt: now(),
        };
        users.unshift(user);
        return resolved({ id: user.id, username, email, status: 'active' });
      },
    },
    content: {
      article: articleDetail,
      articleCreate: (body) => {
        const category = categories.find((item) => item.id === body.categoryId);
        const record: ArticleItem = {
          id: nextId(),
          title: body.title,
          author: body.author ?? '管理员',
          category: category?.name ?? '未分类',
          categoryId: body.categoryId,
          content: body.content ?? [],
          cover: body.cover ?? '',
          date: now(),
          status: body.status ?? 'draft',
          summary: body.summary ?? '',
          tags: body.tags ?? [],
        };
        articles.unshift(record);
        return resolved(record);
      },
      articleDelete: (id) => removeRecord(articles, id),
      articleDetail,
      articleList,
      articleUpdate: (id, body) => {
        const record = requireRecord(articles, id);
        Object.assign(record, body);
        const category = categories.find((item) => item.id === body.categoryId);
        if (category) record.category = category.name;
        return resolved(record);
      },
      articles: articleList,
      categories: categoryList,
      categoryCreate: (body) => {
        const record: CategoryItem = {
          id: nextId(),
          name: body.name,
          slug: body.slug,
          description: body.description ?? '',
          status: body.status ?? 'active',
        };
        categories.push(record);
        return resolved(record);
      },
      categoryDelete: (id) => removeRecord(categories, id),
      categoryList,
      categoryUpdate: (id, body) => {
        const record = requireRecord(categories, id);
        Object.assign(record, body);
        return resolved(record);
      },
    },
    log: {
      error: (query = {}) => {
        const filtered = query.status
          ? errorLogs.filter((item) => item.status === query.status)
          : errorLogs;
        return resolved(paginate(filtered, query));
      },
      login: (query = {}) =>
        resolved(
          paginate(
            filterKeyword(loginLogs, query.keyword, (item) => [
              item.username,
              item.message,
            ]),
            query,
          ),
        ),
      operation: (query = {}) => {
        const byModule = query.module
          ? operationLogs.filter((item) => item.module === query.module)
          : operationLogs;
        return resolved(
          paginate(
            filterKeyword(byModule, query.keyword, (item) => [
              item.username,
              item.description,
            ]),
            query,
          ),
        );
      },
    },
    menu: {
      create: (body) => {
        const record: MenuItem = {
          id: nextId(),
          name: body.name,
          parentId: body.parentId ?? 0,
          path: body.path,
          component: body.component,
          icon: body.icon,
          permission: body.permission,
          sort: body.sort ?? 0,
          type: body.type ?? 'menu',
          visible: body.visible ?? true,
        };
        menus.push(record);
        return resolved(record);
      },
      delete: (id) => removeRecord(menus, id),
      detail: (id) => resolved(requireRecord(menus, id)),
      mine: () => resolved(menus),
      tree: () => resolved(menus),
      update: (id, body) => {
        const record = requireRecord(menus, id);
        Object.assign(record, body);
        return resolved(record);
      },
    },
    monitor: {
      online: () => {
        const items = users.slice(0, 3).map((item, index) => ({
          id: item.id,
          username: item.username,
          realName: item.realName ?? item.username,
          department: index === 0 ? '技术部' : '产品部',
          ip: `192.168.1.${index + 10}`,
          browser: 'Chrome',
          os: 'macOS',
          loginAt: '2026-09-06 09:00:00',
        }));
        return resolved({ items, total: items.length });
      },
      server: () =>
        resolved({
          cpu: { usage: 42.6, cores: 8, model: 'GitHub Pages Mock' },
          memory: { total: '16 GB', used: '8.2 GB', usage: 51.2 },
          disk: { total: '100 GB', used: '42 GB', usage: 42 },
          runtime: {
            node: 'Browser Mock',
            os: globalThis.navigator?.platform ?? 'Browser',
            uptime: '静态预览',
            port: 443,
          },
          trend: [
            { time: '09:00', usage: 32 },
            { time: '10:00', usage: 41 },
            { time: '11:00', usage: 38 },
            { time: '12:00', usage: 47 },
          ],
        }),
    },
    permission: {
      create: (body) => {
        const record = { ...body, id: nextId() };
        permissions.push(record);
        return resolved(record);
      },
      delete: (id) => removeRecord(permissions, id),
      list: () => resolved(permissions),
      update: (id, body) => {
        const record = requireRecord(permissions, id);
        Object.assign(record, body);
        return resolved(record);
      },
    },
    portal: {
      about: () =>
        resolved({
          intro: 'Fast Vue3 是 Vue 3 + TypeScript 多应用工程平台。',
          milestones: [
            {
              date: '2026',
              title: '多应用平台',
              description: '后台与门户模板统一升级。',
            },
          ],
          stats: [{ label: '应用模板', value: '15' }],
          team: [{ name: 'Fast Vue3 Team', role: 'Maintainer' }],
        }),
      blog: (id) => resolved(requireRecord(blogPosts, id)),
      blogComments: (id) =>
        resolved(blogComments.filter((item) => item.articleId === id)),
      blogList: (query = {}) => {
        const filtered =
          query.category && query.category !== '全部'
            ? blogPosts.filter((item) => item.category === query.category)
            : blogPosts;
        return resolved({
          ...paginate(filtered, query),
          categories: [
            '全部',
            ...new Set(blogPosts.map((item) => item.category)),
          ],
        });
      },
      checkout: ({ channel, planId }) => {
        const plan = requireRecord(seedPricing, planId);
        const createdAt = new Date();
        return resolved({
          id: nextId(),
          orderNo: `DEMO${Date.now()}`,
          planId,
          planName: plan.name,
          amountCents: planId === 2 ? 19_900 : 99_900,
          currency: 'CNY',
          channel,
          status: 'pending',
          checkoutUrl: '#demo-checkout',
          createdAt: createdAt.toISOString(),
          expiresAt: new Date(createdAt.getTime() + 30 * 60_000).toISOString(),
        });
      },
      contact: ({ email }) =>
        resolved({ accepted: true, email, submittedAt: now() }),
      createBlogComment: (articleId, { content }) => {
        if (!content.trim()) {
          return Promise.reject(new Error('评论内容不能为空'));
        }
        const record: BlogComment = {
          articleId,
          content: content.trim(),
          createdAt: now(),
          id: nextId(),
          username: 'admin',
        };
        blogComments.push(record);
        return resolved(record);
      },
      docs: () =>
        resolved([
          {
            id: 1,
            title: '快速开始',
            description: '安装与运行',
            items: [
              {
                title: '在线文档',
                path: 'https://tobe-fe-dalao.github.io/fast-vue3-site/',
              },
            ],
          },
        ]),
      faq: () => resolved(seedFaqs),
      features: () =>
        resolved([
          { id: 1, title: '文件路由', description: '目录即路由。' },
          { id: 2, title: '主题系统', description: '支持暗色与品牌色。' },
        ]),
      home: () =>
        resolved({
          highlights: [
            { title: '多 UI 框架', description: '一套能力，多种原生体验。' },
          ],
          stats: [{ label: 'UI 框架', value: '7' }],
          testimonials: [
            {
              name: '演示用户',
              role: '前端工程师',
              content: '开箱即用。',
            },
          ],
        }),
      pricing: () => resolved(seedPricing),
      product: () =>
        resolved({
          name: 'Fast Vue3',
          slogan: '多 UI 框架前端工程平台',
          highlights: [
            { title: '一致能力', description: '后台与门户功能对齐。' },
          ],
        }),
    },
    role: {
      create: (body) => {
        const record: RoleItem = {
          id: nextId(),
          name: body.name,
          code: body.code,
          description: body.description,
          menuIds: body.menuIds ?? [],
          permissions: permissions
            .filter((item) => body.permissionIds?.includes(item.id))
            .map((item) => item.code),
          createdAt: now(),
          updatedAt: now(),
        };
        roles.unshift(record);
        return resolved(record);
      },
      delete: (id) => removeRecord(roles, id),
      detail: (id) => resolved(requireRecord(roles, id)),
      list: (query = {}) =>
        resolved(
          paginate(
            filterKeyword(roles, query.keyword, (item) => [
              item.name,
              item.code,
            ]),
            query,
          ),
        ),
      update: (id, body) => {
        const record = requireRecord(roles, id);
        Object.assign(record, body, { updatedAt: now() });
        if (body.permissionIds) {
          record.permissions = permissions
            .filter((item) => body.permissionIds?.includes(item.id))
            .map((item) => item.code);
        }
        return resolved(record);
      },
    },
    system: {
      configList: (query = {}) =>
        resolved(
          paginate(
            filterKeyword(configs, query.keyword, (item) => [
              item.name,
              item.key,
            ]),
            query,
          ),
        ),
      deptList: () => resolved(departments),
      dictList: (query = {}) =>
        resolved(
          paginate(
            filterKeyword(dicts, query.keyword, (item) => [
              item.name,
              item.type,
            ]),
            query,
          ),
        ),
      noticeList: (query = {}) => {
        const byType = query.type
          ? notices.filter((item) => item.type === query.type)
          : notices;
        return resolved(
          paginate(
            filterKeyword(byType, query.keyword, (item) => [
              item.title,
              item.content,
            ]),
            query,
          ),
        );
      },
    },
    user: {
      create: (body) => {
        const record: UserItem = {
          id: nextId(),
          username: body.username,
          email: body.email,
          nickname: body.nickname,
          phone: body.phone,
          realName: body.realName,
          roles: ['user'],
          status: body.status ?? 'active',
          createdAt: now(),
        };
        users.unshift(record);
        return resolved(record);
      },
      delete: (id) => removeRecord(users, id),
      detail: (id) => resolved(requireRecord(users, id)),
      list: (query = {}) => {
        const byStatus = query.status
          ? users.filter((item) => item.status === query.status)
          : users;
        return resolved(
          paginate(
            filterKeyword(byStatus, query.keyword, (item) => [
              item.username,
              item.realName,
              item.email,
            ]),
            query,
          ),
        );
      },
      update: (id, body) => {
        const record = requireRecord(users, id);
        Object.assign(record, body);
        return resolved(record);
      },
    },
  } satisfies Api;

  return api;
}
