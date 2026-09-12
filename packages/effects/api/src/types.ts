/**
 * 前后端接口契约类型。
 *
 * 这里是唯一事实来源：fast-vue3-server（Java）与 backend-mock（Nitro）
 * 都必须返回与本文件完全一致的字段结构，前端页面只依赖这些类型。
 */

/** 统一分页结构 */
export interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

/** 通用分页查询参数 */
export interface PageQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

/* Enterprise domains exposed by fast-vue3-server V9. */
export interface TenantItem {
  id: number;
  name: string;
  code: string;
  status: 'active' | 'disabled';
  plan: string;
  expiredAt: null | string;
  createdAt: string;
}

export interface CreateTenantParams {
  name: string;
  code: string;
  plan: string;
  expiredAt?: null | string;
  adminUsername: string;
  adminPassword: string;
  adminEmail: string;
}

export interface OrganizationItem {
  id: number;
  tenantId: number;
  name: string;
  code: string;
  status: 'active' | 'disabled';
}

export interface DepartmentItem {
  id: number;
  parentId: null | number;
  name: string;
  code: string;
  leaderId: null | number;
  sort: number;
  status: 'active' | 'disabled';
  children: DepartmentItem[];
}

export interface SaveDepartmentParams {
  parentId?: null | number;
  name: string;
  code: string;
  leaderId?: null | number;
  sort?: number;
  status?: 'active' | 'disabled';
}

export interface DepartmentMember {
  id: number;
  username: string;
  nickname: string;
  status: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  code: string;
  description: null | string;
  ownerId: number;
  status: 'ACTIVE' | 'ARCHIVED';
  startDate: null | string;
  endDate: null | string;
  version: number;
  memberIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectParams {
  name: string;
  code: string;
  description?: string;
  startDate?: null | string;
  endDate?: null | string;
}

export interface ProjectActivity {
  id: number;
  projectId: number;
  actorId: number;
  action: string;
  detail: null | string;
  createdAt: string;
}

export type TaskPriority = 'HIGH' | 'LOW' | 'MEDIUM' | 'URGENT';
export type TaskStatus =
  | 'BLOCKED'
  | 'CANCELLED'
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export interface TaskItem {
  id: number;
  projectId: number;
  title: string;
  description: null | string;
  assigneeId: null | number;
  reporterId: number;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: null | string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskParams {
  title: string;
  description?: string;
  assigneeId?: null | number;
  priority?: TaskPriority;
  dueDate?: null | string;
}

export interface TaskComment {
  id: number;
  taskId: number;
  authorId: number;
  content: string;
  createdAt: string;
}

export interface TaskActivity {
  id: number;
  taskId: number;
  actorId: number;
  action: string;
  fieldName: null | string;
  oldValue: null | string;
  newValue: null | string;
  createdAt: string;
}

export interface ApprovalStep {
  id: number;
  stepOrder: number;
  approverType: string;
  approverId: null | number;
  status: string;
  actedAt: null | string;
}

export interface ApprovalItem {
  id: number;
  type: string;
  title: string;
  businessKey: null | string;
  applicantId: number;
  departmentId: null | number;
  status: 'APPROVED' | 'CANCELLED' | 'DRAFT' | 'PENDING' | 'REJECTED';
  currentStep: number;
  payload: null | string;
  version: number;
  steps: ApprovalStep[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateApprovalParams {
  type: string;
  title: string;
  businessKey?: string;
  departmentId?: number;
  payload?: string;
}

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  content: null | string;
  receiverId: number;
  read: boolean;
  createdAt: string;
}

export interface AuditOperationItem {
  id: number;
  requestId: string;
  tenantId: number;
  userId: null | number;
  method: string;
  path: string;
  ip: string;
  userAgent: string;
  duration: number;
  status: number;
  createdAt: string;
}

export interface StoredFile {
  key: string;
  originalName: string;
  contentType: string;
  size: number;
  url: string;
}

/** 资源状态，全站统一取值 */
export type EnableStatus = 'active' | 'inactive';

/* ------------------------------------------------------------------ */
/* 认证                                                                 */
/* ------------------------------------------------------------------ */

export interface LoginParams {
  password: string;
  username: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResult {
  email?: string;
  id: number;
  status: 'active' | 'disabled';
  username: string;
}

export interface TokenResult {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  permissions: string[];
  roles: string[];
  tenantId: number;
  username: string;
}

/* ------------------------------------------------------------------ */
/* 用户 / 角色 / 权限 / 菜单                                            */
/* ------------------------------------------------------------------ */

export interface UserItem {
  createdAt?: string;
  email?: string;
  id: number;
  nickname?: string;
  phone?: string;
  realName?: string;
  roles?: string[];
  status: 'active' | 'disabled';
  username: string;
}

export interface UserQuery extends PageQuery {
  status?: string;
}

export interface CreateUserParams {
  email?: string;
  nickname?: string;
  password: string;
  phone?: string;
  realName?: string;
  roleIds?: number[];
  status?: 'active' | 'disabled';
  username: string;
}

export interface UpdateUserParams {
  email?: string;
  nickname?: string;
  password?: string;
  phone?: string;
  realName?: string;
  roleIds?: number[];
  status?: 'active' | 'disabled';
}

export interface RoleItem {
  code: string;
  createdAt: string;
  description?: string;
  id: number;
  menuIds: number[];
  name: string;
  permissions: string[];
  updatedAt: string;
}

export type RoleQuery = PageQuery;

export interface CreateRoleParams {
  code: string;
  description?: string;
  menuIds?: number[];
  name: string;
  permissionIds?: number[];
}

export interface UpdateRoleParams {
  description?: string;
  menuIds?: number[];
  name?: string;
  permissionIds?: number[];
}

export interface PermissionItem {
  code: string;
  description?: string;
  id: number;
  name: string;
}

export type MenuType = 'button' | 'directory' | 'menu';

export interface MenuItem {
  children?: MenuItem[];
  component?: string;
  icon?: string;
  id: number;
  name: string;
  parentId: number;
  path?: string;
  permission?: string;
  sort: number;
  type: MenuType;
  visible: boolean;
}

export interface CreateMenuParams {
  component?: string;
  icon?: string;
  name: string;
  parentId?: number;
  path?: string;
  permission?: string;
  sort?: number;
  type?: MenuType;
  visible?: boolean;
}

export type UpdateMenuParams = CreateMenuParams;

/* ------------------------------------------------------------------ */
/* 仪表盘 / 数据分析                                                     */
/* ------------------------------------------------------------------ */

export interface DashboardStats {
  activeUsers: number;
  conversionRate: number;
  monthlyRevenue: number;
  recentActivities: {
    action: string;
    id: number;
    time: string;
    user: string;
  }[];
  roleDistribution: { name: string; value: number }[];
  systemUptime: number;
  todayOrders: number;
  todayVisits: number;
  topPages: { path: string; title: string; visits: number }[];
  totalUsers: number;
  weeklyGrowth: number;
  weeklyTrend: {
    days: string[];
    users: number[];
    visits: number[];
  };
}

export interface AnalyticsOverview {
  stats: {
    color: string;
    suffix: string;
    title: string;
    value: number;
  }[];
  topPages: {
    avgTime: string;
    page: string;
    title: string;
    visits: number;
  }[];
  trend: {
    date: string;
    orders: number;
    revenue: number;
    users: number;
    visits: number;
  }[];
}

export interface DataOverview {
  recent: {
    amount: string;
    date: string;
    status: string;
    type: string;
  }[];
  stats: {
    border: string;
    prefix?: string;
    suffix: string;
    title: string;
    value: number;
  }[];
}

/* ------------------------------------------------------------------ */
/* 日志                                                                 */
/* ------------------------------------------------------------------ */

export type OperationStatus = 'fail' | 'success';

export interface LoginLogItem {
  browser: string;
  createdAt: string;
  id: number;
  ip: string;
  message: string;
  os: string;
  status: OperationStatus;
  username: string;
}

export interface OperationLogItem {
  action: string;
  createdAt: string;
  description: string;
  duration: number;
  id: number;
  ip: string;
  method: string;
  module: string;
  status: OperationStatus;
  username: string;
}

export interface ErrorLogItem {
  browser: string;
  createdAt: string;
  id: number;
  message: string;
  os: string;
  page: string;
  stack: string;
  status: 'pending' | 'resolved';
  type: string;
}

export interface OperationLogQuery extends PageQuery {
  module?: string;
}

export interface ErrorLogQuery extends PageQuery {
  status?: string;
}

/* ------------------------------------------------------------------ */
/* 系统管理                                                             */
/* ------------------------------------------------------------------ */

export interface ConfigItem {
  createdAt: string;
  id: number;
  key: string;
  name: string;
  remark: string;
  type: 'built-in' | 'custom';
  value: string;
}

export interface DeptItem {
  children?: DeptItem[];
  createdAt: string;
  id: number;
  leader: string;
  name: string;
  order: number;
  status: EnableStatus;
}

export interface DictItem {
  createdAt: string;
  data: { label: string; value: string }[];
  id: number;
  name: string;
  remark: string;
  status: EnableStatus;
  type: string;
}

export interface NoticeItem {
  author: string;
  content: string;
  createdAt: string;
  id: number;
  status: EnableStatus;
  title: string;
  type: string;
}

export interface NoticeQuery extends PageQuery {
  type?: string;
}

/* ------------------------------------------------------------------ */
/* 监控                                                                 */
/* ------------------------------------------------------------------ */

export interface OnlineUserItem {
  browser: string;
  department: string;
  id: number;
  ip: string;
  loginAt: string;
  os: string;
  realName: string;
  username: string;
}

export interface ServerInfo {
  cpu: {
    cores: number;
    model: string;
    usage: number;
  };
  disk: {
    total: string;
    usage: number;
    used: string;
  };
  memory: {
    total: string;
    usage: number;
    used: string;
  };
  runtime: {
    node: string;
    os: string;
    port: number;
    uptime: string;
  };
  trend: { time: string; usage: number }[];
}

/* ------------------------------------------------------------------ */
/* 内容管理                                                             */
/* ------------------------------------------------------------------ */

export type ArticleStatus = 'draft' | 'published';

export interface ArticleItem {
  author: string;
  category: string;
  categoryId?: number;
  content: string[];
  cover: string;
  date: string;
  id: number;
  status: ArticleStatus;
  summary: string;
  tags: string[];
  title: string;
}

export interface ArticleQuery extends PageQuery {
  categoryId?: number;
  status?: ArticleStatus;
}

export interface CreateArticleParams {
  author?: string;
  categoryId?: number;
  content?: string[];
  cover?: string;
  status?: ArticleStatus;
  summary?: string;
  tags?: string[];
  title: string;
}

export type UpdateArticleParams = Partial<CreateArticleParams>;

export interface CategoryItem {
  description: string;
  id: number;
  name: string;
  slug: string;
  status: EnableStatus;
}

export interface CreateCategoryParams {
  description?: string;
  name: string;
  slug: string;
  status?: EnableStatus;
}

export type UpdateCategoryParams = Partial<CreateCategoryParams>;

/* ------------------------------------------------------------------ */
/* 门户站公开内容与登录后交互                                             */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  author: string;
  category: string;
  content: string[];
  cover: string;
  date: string;
  excerpt: string;
  id: number;
  tags: string[];
  title: string;
}

export interface BlogListResult extends PageResult<BlogPost> {
  categories: string[];
}

export interface BlogQuery extends PageQuery {
  category?: string;
}

export interface BlogComment {
  articleId: number;
  content: string;
  createdAt: string;
  id: number;
  username: string;
}

export interface CreateBlogCommentParams {
  content: string;
}

export interface FaqItem {
  answer: string;
  category: string;
  id: number;
  question: string;
}

export interface PricingPlan {
  description: string;
  features: string[];
  highlighted: boolean;
  id: number;
  name: string;
  period: string;
  price: string;
}

export type PaymentChannel = 'alipay' | 'card' | 'wechat';

export interface CreateCheckoutParams {
  channel: PaymentChannel;
  planId: number;
}

export interface PaymentOrder {
  amountCents: number;
  channel: PaymentChannel;
  checkoutUrl: string;
  createdAt: string;
  currency: 'CNY';
  expiresAt: string;
  id: number;
  orderNo: string;
  planId: number;
  planName: string;
  status: 'pending';
}

export interface FeatureItem {
  description: string;
  icon?: string;
  id: number;
  title: string;
}

export interface AboutInfo {
  intro: string;
  milestones: {
    date: string;
    description: string;
    title: string;
  }[];
  stats: { label: string; value: string }[];
  team: {
    avatar?: string;
    name: string;
    role: string;
  }[];
}

export interface ProductInfo {
  highlights: { description: string; title: string }[];
  name: string;
  slogan: string;
}

export interface DocSection {
  description?: string;
  id: number;
  items: { path: string; title: string }[];
  title: string;
}

export interface HomeInfo {
  highlights: { description: string; title: string }[];
  stats: { label: string; value: string }[];
  testimonials: { content: string; name: string; role: string }[];
}

export interface ContactParams {
  email: string;
  message?: string;
  name?: string;
}

export interface ContactResult {
  accepted: boolean;
  email: string;
  submittedAt: string;
}
