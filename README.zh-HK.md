# Fast Vue3

**語言：** [English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | 繁體中文（香港） | [日本語](./README.ja.md)

[項目文件](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/) · [示範建置與預覽](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/monorepo/development#multi-app-demo)

## 應用

| UI               | Admin         | Portal         |
| ---------------- | ------------- | -------------- |
| Ant Design Vue   | `web-antd`    | `site-antd`    |
| Arco Design      | `web-arco`    | `site-arco`    |
| Element Plus     | `web-ele`     | `site-ele`     |
| iDux             | `web-idux`    | `site-idux`    |
| Naive UI         | `web-naive`   | `site-naive`   |
| OpenVue          | `web-openvue` | `site-openvue` |
| TDesign Vue Next | `web-tdesign` | `site-tdesign` |

七套後台共用儀表板、用戶、角色、選單、文章及日誌。Ant Design Vue 版另外提供系統設定、監控及企業功能。`web-app` 是精簡入口網站。

## 本機開發

使用 Node.js 24（CI 使用的版本見 `.node-version`）及 pnpm 12.18.0。Nitro Mock 帳戶為 `admin / 123456`。

```bash
pnpm install
pnpm dev
```

```bash
pnpm dev:web-antd
pnpm dev:site-antd
```

## Java 後端

在前端項目執行 `pnpm dev:server:api` 啟動 Java 服務。若 Java 項目位於其他目錄，請用 `FAST_VUE3_SERVER_DIR` 指定路徑。開發帳戶為 `admin / admin123`。 [後端連接](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/monorepo/backend-integration)

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

## 驗證

```bash
pnpm lint
pnpm typecheck
pnpm test
```

先以 `pnpm exec playwright install chromium` 安裝 Chromium。測試示範應用請先執行 `pnpm build:demo`，再執行 `pnpm test:e2e`。 [測試說明](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/monorepo/testing)
