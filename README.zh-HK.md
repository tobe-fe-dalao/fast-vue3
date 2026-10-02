# Fast Vue3

**語言：** [English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | 繁體中文（香港） | [日本語](./README.ja.md)

示範建置：`pnpm build:demo`；本機預覽：`pnpm preview:demo`，開啟 `http://127.0.0.1:4173/fast-vue3/`。涵蓋全部 `web-*` / `site-*` 應用，使用瀏覽器內 Mock 資料。[部署說明](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/monorepo/development#多應用示範)。

Fast Vue3 是 Vue 3 + TypeScript Monorepo，在 Ant Design Vue、Arco Design、Element Plus、iDux、Naive UI、PrimeVue 及 TDesign 七套 UI 生態中提供一致的後台和公開網站功能。

線上文件：<https://tobe-fe-dalao.github.io/fast-vue3-site/> · [Spring Boot 後端文件](https://tobe-fe-dalao.github.io/fast-vue3-site/zh-HK/server/)

## 應用及結構

- `apps/web-*`：七個後台管理應用；
- `apps/site-*`：七個網站應用；
- `apps/backend-mock`：Nitro Mock API；
- `packages/effects/api`：統一業務 API 類型及客戶端；
- `packages/effects/request`：Axios、Token 及統一回應處理；
- `packages/stores`、`preferences`、`styles`：共用狀態、偏好及樣式；
- `internal`、`scripts`：Vite、Lint、TypeScript 及腳手架工具。

需要 Node.js 20.12+ 及 pnpm 9.5+。

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

Mock 預設帳戶是 `admin / 123456`，服務位於 `http://localhost:5320`。瀏覽器統一請求 `/api/v1`。

`pnpm dev:mock` 會為所選前端啟動 Nitro Mock。只啟動獨立的 Mock API 可使用 `pnpm dev:mock:api`；Mock 不會請求 Spring Boot。

## 連接 Spring Boot 後端

毋須安裝 Java，可直接啟動完整容器：

```bash
pnpm dev:server:api
```

此指令在同級 `fast-vue3-server` 項目啟動 Docker Compose。`pnpm dev:server` 只啟動所選前端，不會啟動 Nitro Mock 或 Java 服務。

OrbStack 使用相容的 `docker` CLI，同一組指令即可運作。啟動前端：

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

`pnpm dev:server` 可互動選擇應用；`VITE_FAST_VUE3_SERVER_URL` 可覆寫預設的 `http://localhost:8080`。

## 公開及登入界線

首頁、產品、功能、關於、文件、FAQ、價格、網誌、文章詳情及評論清單可匿名讀取，聯絡表格可匿名提交。只有後台 API、發表評論及建立付款訂單需要 Access Token。

價格頁可選支付寶、微信支付及信用卡，建立 `pending` 訂單並回傳示範 `checkoutUrl`，不會真正扣款。正式環境須接駁支付供應商並驗證簽署回調。

## 品質檢查

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

共享 API 單元測試及 Nitro 真實 HTTP 整合測試會驗證 Mock/Server 契約與匿名/登入界線。
