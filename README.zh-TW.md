# Fast Vue3

**語言：** [English](./README.md) | [简体中文](./README.zh-CN.md) | 繁體中文（台灣） | [繁體中文（香港）](./README.zh-HK.md) | [日本語](./README.ja.md)

示範建置：`pnpm build:demo`；本機預覽：`pnpm preview:demo`，開啟 `http://127.0.0.1:4173/fast-vue3/`。包含全部 `web-*` / `site-*` 應用，使用瀏覽器內 Mock 資料。[部署說明](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-TW/monorepo/development#多應用示範)。

Fast Vue3 是 Vue 3 + TypeScript Monorepo，在 Ant Design Vue、Arco Design、Element Plus、iDux、Naive UI、PrimeVue 與 TDesign 七套 UI 生態中提供一致的後台與公開網站功能。

線上文件：<https://tobe-fe-dalao.github.io/fast-vue3-site/> · [Spring Boot 後端文件](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-TW/server/)

## 應用與結構

- `apps/web-*`：七個後台管理應用；
- `apps/site-*`：七個入口網站應用；
- `apps/backend-mock`：Nitro Mock API；
- `packages/effects/api`：唯一的業務 API 型別與用戶端；
- `packages/effects/request`：Axios、Token 與統一回應處理；
- `packages/stores`、`preferences`、`styles`：共用狀態、偏好與樣式；
- `internal`、`scripts`：Vite、Lint、TypeScript 與腳手架工具。

需求：Node.js 20.12+、pnpm 9.5+。

```bash
pnpm install
```

## 使用 Nitro Mock 開發

```bash
pnpm dev:mock
# 或啟動指定應用
pnpm dev:web-antd
pnpm dev:site-antd
```

Mock 預設帳號為 `admin / 123456`。Mock API 預設位於 `http://localhost:5320`，瀏覽器仍統一請求 `/api/v1`。

`pnpm dev:mock` 會為所選前端啟動 Nitro Mock。只啟動獨立的 Mock API 可使用 `pnpm dev:mock:api`；Mock 不會請求 Spring Boot。

## 與 Spring Boot 後端聯調

不安裝 Java 也可以直接啟動完整後端：

```bash
pnpm dev:server:api
```

此指令在同級 `fast-vue3-server` 專案啟動 Docker Compose。`pnpm dev:server` 只啟動所選前端，不會啟動 Nitro Mock 或 Java 服務。

OrbStack 提供相容的 `docker` CLI，因此使用相同指令即可。啟動前端：

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

互動式選擇可使用 `pnpm dev:server`。後端預設為 `http://localhost:8080`，可用 `VITE_FAST_VUE3_SERVER_URL` 覆寫。

## 公開與登入邊界

首頁、產品、功能、關於、文件、FAQ、價格、部落格、文章詳情與評論列表都可匿名讀取；聯絡表單可匿名送出。只有後台 API、發表評論與建立付款訂單需要 Access Token。

價格頁支援支付寶、微信支付與信用卡管道選擇，建立 `pending` 訂單並回傳示範 `checkoutUrl`，不會真的扣款。正式環境需串接支付服務商並驗證簽章回呼。

## 品質檢查

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

共享 API 單元測試與 Nitro 真實 HTTP 整合測試會驗證 Mock/Server 契約與匿名/登入邊界。
