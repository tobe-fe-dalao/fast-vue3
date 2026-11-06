# Fast Vue3

**Languages:** English | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | [日本語](./README.ja.md)

[Documentation](https://tobe-fe-dalao.github.io/fast-vue3-site/en/) · [Demo build and preview](https://tobe-fe-dalao.github.io/fast-vue3-site/en/monorepo/development#multi-app-demo)

## Applications

| UI               | Admin         | Portal         |
| ---------------- | ------------- | -------------- |
| Ant Design Vue   | `web-antd`    | `site-antd`    |
| Arco Design      | `web-arco`    | `site-arco`    |
| Element Plus     | `web-ele`     | `site-ele`     |
| iDux             | `web-idux`    | `site-idux`    |
| Naive UI         | `web-naive`   | `site-naive`   |
| OpenVue          | `web-openvue` | `site-openvue` |
| TDesign Vue Next | `web-tdesign` | `site-tdesign` |

Seven admin apps share dashboard, user, role, menu, article and log workflows. Ant Design Vue also includes system configuration, monitoring and enterprise screens. The portals share public content and sign-in flows. `web-app` is a smaller portal.

## Local development

Use Node.js 24 (see `.node-version` for the version used in CI) and pnpm 12.18.0. Nitro Mock uses `admin / 123456`.

```bash
pnpm install
pnpm dev
```

```bash
pnpm dev:web-antd
pnpm dev:site-antd
```

## Java API

From the frontend repository, start the Java API with `pnpm dev:server:api`. If it is checked out elsewhere, set `FAST_VUE3_SERVER_DIR` to its directory. The development account is `admin / admin123`. [Backend setup](https://tobe-fe-dalao.github.io/fast-vue3-site/en/monorepo/backend-integration)

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
```

Install Chromium with `pnpm exec playwright install chromium`. For the browser-only demo, run `pnpm build:demo` and then `pnpm test:e2e`. [Testing](https://tobe-fe-dalao.github.io/fast-vue3-site/en/monorepo/testing)
