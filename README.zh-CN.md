# Fast Vue3

**语言：** [English](./README.md) | 简体中文 | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | [日本語](./README.ja.md)

[项目文档](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/) · [演示构建与预览](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/monorepo/development#multi-app-demo)

## 应用

| UI               | Admin         | Portal         |
| ---------------- | ------------- | -------------- |
| Ant Design Vue   | `web-antd`    | `site-antd`    |
| Arco Design      | `web-arco`    | `site-arco`    |
| Element Plus     | `web-ele`     | `site-ele`     |
| iDux             | `web-idux`    | `site-idux`    |
| Naive UI         | `web-naive`   | `site-naive`   |
| OpenVue          | `web-openvue` | `site-openvue` |
| TDesign Vue Next | `web-tdesign` | `site-tdesign` |

七套后台共用仪表盘、用户、角色、菜单、文章和日志功能。Ant Design Vue 版还提供系统配置、监控和企业业务。七套门户共用公开内容和登录流程，`web-app` 是精简门户。

## 本地开发

使用 Node.js 24（CI 使用的版本见 `.node-version`）和 pnpm 12.18.0。Nitro Mock 的账号是 `admin / 123456`。

```bash
pnpm install
pnpm dev
```

```bash
pnpm dev:web-antd
pnpm dev:site-antd
```

## Java 后端

在前端仓库运行 `pnpm dev:server:api` 启动 Java 服务。若 Java 仓库在其他目录，用 `FAST_VUE3_SERVER_DIR` 指定路径。开发账号为 `admin / admin123`。 [后端联调](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/monorepo/backend-integration)

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

## 验证

```bash
pnpm lint
pnpm typecheck
pnpm test
```

先用 `pnpm exec playwright install chromium` 安装 Chromium。演示回归先执行 `pnpm build:demo`，再执行 `pnpm test:e2e`。 [测试说明](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/monorepo/testing)
