# Fast Vue3

**语言：** [English](./README.md) | 简体中文 | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | [日本語](./README.ja.md)

> 基于 Vue3 + Monorepo 的多 UI 生态工程平台，集成 7 大主流 Vue UI 框架，提供后台管理（admin）与门户（site）两类应用模板，专注工程架构与长期可维护性。

在线文档：<https://tobe-fe-dalao.github.io/fast-vue3-site/> · [Spring Boot 后端文档](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/server/)

演示构建：`pnpm build:demo`；本地预览：`pnpm preview:demo`，访问 `http://127.0.0.1:4173/fast-vue3/`。包含全部 `web-*` / `site-*` 应用，使用浏览器内 Mock 数据。[演示部署说明](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/monorepo/development#多应用演示)。

---

## 📦 项目概览

| UI 框架          | 后台应用       | 门户应用        |
| ---------------- | -------------- | --------------- |
| Ant Design Vue 4 | `web-antd`     | `site-antd`     |
| Arco Design Vue  | `web-arco`     | `site-arco`     |
| Element Plus 2   | `web-ele`      | `site-ele`      |
| iDux 2           | `web-idux`     | `site-idux`     |
| Naive UI 2       | `web-naive`    | `site-naive`    |
| PrimeVue 4       | `web-primevue` | `site-primevue` |
| TDesign Vue Next | `web-tdesign`  | `site-tdesign`  |

14 个框架应用共享同一份 API 契约。后台覆盖仪表盘、用户、角色、菜单、内容、日志、系统配置和监控；门户覆盖首页、博客、产品、价格、FAQ、登录和联系表单。

## 🏗️ 工程架构

```
fast-vue3/
├── apps/                 # 各 UI 框架对应的应用
│   ├── web-antd/         # Ant Design Vue
│   ├── web-arco/         # Arco Design
│   ├── web-ele/          # Element Plus
│   ├── web-idux/         # iDux
│   ├── web-naive/        # Naive UI
│   ├── web-primevue/     # PrimeVue
│   └── web-tdesign/      # TDesign
├── packages/             # 共享包
│   ├── @core/shared/     # 核心共享逻辑
│   ├── constants/        # 全局常量
│   ├── effects/          # 副作用层（access/layout/request）
│   │   └── api/          # 前端唯一 API 契约与业务域客户端
│   ├── locales/          # 国际化
│   ├── preferences/      # 主题与偏好配置
│   ├── stores/           # Pinia stores
│   ├── styles/           # 全局样式（reset/global/themes）
│   ├── types/            # 共享类型定义
│   └── utils/            # 工具函数
├── internal/             # 内部工具包
│   ├── lint-configs/     # ESLint/Prettier/Stylelint/OxLint 配置
│   ├── node-utils/       # Node.js 工具函数
│   ├── tsconfig/         # TypeScript 基础配置
│   └── vite-config/      # Vite 共享配置
└── scripts/              # 脚本工具
    ├── turbo-run/        # 交互式选择启动应用
    └── vsh/              # 项目脚手架 & CLI 工具
```

---

## ⚡ 快速开始

### 环境要求

| 工具    | 版本要求   |
| ------- | ---------- |
| Node.js | >= 20.12.0 |
| pnpm    | >= 9.5.0   |
| Git     | >= 2.30    |

### 克隆与安装

```bash
git clone https://github.com/tobe-fe-dalao/fast-vue3.git
cd fast-vue3
pnpm install
```

### 启动开发服务器

```bash
# 交互式选择要启动的应用
pnpm dev

# 明确使用内置 Nitro Mock（默认行为）
pnpm dev:mock

# 使用本机 fast-vue3-server
pnpm dev:server

# 或直接指定应用（web 与 site 名称不会混淆）
pnpm dev:web-antd
pnpm dev:web-ele
pnpm dev:web-naive
pnpm dev:web-arco
pnpm dev:web-tdesign
pnpm dev:web-primevue
pnpm dev:web-idux
pnpm dev:site-antd
```

开发环境统一通过 `/api/v1` 访问接口。共享 Vite 配置会根据 `VITE_DEV_BACKEND` 自动设置代理并控制 Nitro Mock：

- `mock`：启动 Nitro Mock，并代理到 `http://localhost:5320`。
- `server`：不启动 Mock，并代理到 `VITE_FAST_VUE3_SERVER_URL`，默认 `http://localhost:8080`。

`pnpm dev:mock` 会为选中的前端启动独立的 Nitro Mock。只运行 5320 端口的 Mock API 可用 `pnpm dev:mock:api`（`pnpm dev:backend-mock` 是别名）；Mock 不会请求 Spring Boot。

也可以只对指定应用临时切换：

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

如需覆盖真实后端地址：

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

真实后端联调时，不安装本机 Java 也可以用 Docker Desktop 或 OrbStack 启动 PostgreSQL、Redis 与 Spring Boot；两者使用相同的 Compose 命令：

```bash
pnpm dev:server:api

# 另开终端启动一个指定前端；site 应用同理替换名称
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

`pnpm dev:server:api` 在同级 `fast-vue3-server` 仓库运行 Docker Compose；`pnpm dev:server` 只启动所选前端，不启动 Nitro Mock 或 Java 服务。

如果本机已有 JDK 21，也可以在同级 `fast-vue3-server` 目录先用 `docker compose up -d` 启动 PostgreSQL 与 Redis，再执行 `./mvnw spring-boot:run`。

后端健康检查为 `http://localhost:8080/actuator/health`，Swagger 为 `http://localhost:8080/swagger-ui.html`。真实后端开发账号是 `admin / admin123`；Nitro Mock 账号是 `admin / 123456`。

页面只调用 `@fast-vue3/api`，不区分 Nitro Mock 与 Java 后端。两端均使用统一响应信封：

```json
{ "code": 0, "message": "success", "data": {} }
```

分页数据统一为 `{ items, page, pageSize, total }`。新增接口时应同步更新：

1. `packages/effects/api/src/types.ts` 的请求/响应类型；
2. `packages/effects/api/src/modules/` 的业务域方法；
3. `apps/backend-mock/api/v1/` 的 Nitro 实现；
4. `fast-vue3-server` 对应 Controller/Service；
5. API 契约单测与服务端集成测试。

### Site 鉴权边界

首页、产品、特性、关于、文档、FAQ、价格、博客列表、博客详情、评论列表和联系表单均为公开内容，不要求登录。

只有用户交互接口需要 Bearer Token：

- `POST /blog/{id}/comments`：发表评论；
- `POST /payments/checkout`：创建支付订单。

价格页支持支付宝、微信支付和银行卡渠道选择，并创建 `pending` 状态订单；博客详情公开显示评论，匿名用户点击发布时会跳转登录，登录成功后返回原页面。

内置支付流程是安全的演示适配器：会持久化订单并返回 `checkoutUrl`，但不会真实扣款。生产环境应接入支付提供商，并验证异步回调签名。

### 创建新应用

```bash
pnpm run create-app
```

支持两种应用模式：

- **Admin（后台管理）**：带 layout、路由守卫、登录页
- **Site（门户 / 官网）**：轻量营销 / 产品门户页面

支持 7 种 UI 框架可选。

### 默认账号

Mock 默认账号：

- **用户名：** `admin`
- **密码：** `123456`

`fast-vue3-server` 开发环境默认账号为 `admin` / `admin123`。

---

## 🛠️ 技术栈

| 分类     | 技术                                                              |
| -------- | ----------------------------------------------------------------- |
| 框架     | Vue 3.5 + TypeScript 6                                            |
| 构建     | Vite 8 + Turborepo 2 + tsdown                                     |
| 路由     | Vue Router 4 + unplugin-vue-router（文件路由）                    |
| 状态     | Pinia 3 + pinia-plugin-persistedstate                             |
| 样式     | Tailwind CSS v4 + CSS Variables 主题系统                          |
| HTTP     | Axios 1 + `@fast-vue3/request` + `@fast-vue3/api`                 |
| Mock     | Nitro Mock 服务（开发期自动拉起，端口 5320）                      |
| 自动导入 | unplugin-auto-import + unplugin-vue-components                    |
| 代码质量 | ESLint 10 + Prettier + Stylelint + OxLint + Lefthook + Commitlint |
| 主题     | `@fast-vue3/preferences`（深色模式 / 主色 / 布局偏好）            |

---

## 🎨 主题配置

所有应用支持：

- 亮色 / 暗色 / 跟随系统 三种主题模式
- 自定义主色调
- 侧边栏折叠 / 宽度配置
- 标签页 / 面包屑开关
- 色弱模式 / 灰色模式

偏好设置通过 `@fast-vue3/preferences` 包管理，自动持久化到 localStorage。

---

## 📋 开发规范

```bash
# 代码检查
pnpm lint

# 自动格式化并修复
pnpm format

# 类型检查
pnpm typecheck

# 单元测试 + Nitro API 集成测试
pnpm test

# 构建全部应用
pnpm build

# 规范提交（交互式）
pnpm commit
```

单独验证某一层：

```bash
pnpm -F @fast-vue3/api test
pnpm -F @fast-vue3/backend-mock test
pnpm build:site-antd
pnpm build:web-antd
```

---

## 📄 License

[MIT](./LICENSE)
