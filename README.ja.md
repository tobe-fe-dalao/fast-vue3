# Fast Vue3

**言語：** [English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | 日本語

デモのビルドは `pnpm build:demo`、ローカル確認は `pnpm preview:demo` で、`http://127.0.0.1:4173/fast-vue3/` を開きます。すべての `web-*` / `site-*` アプリでブラウザー内 Mock を使用します。[公開手順](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/monorepo/development#複数アプリのデモ)。

> 7 種類の Vue UI エコシステムで、同じ管理画面と公開サイト体験を提供する Vue 3 + TypeScript モノレポです。

オンラインドキュメント: <https://tobe-fe-dalao.github.io/fast-vue3-site/> · [Spring Boot サーバーガイド](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/server/)

## アプリケーション

| UI               | 管理画面       | サイト          |
| ---------------- | -------------- | --------------- |
| Ant Design Vue   | `web-antd`     | `site-antd`     |
| Arco Design      | `web-arco`     | `site-arco`     |
| Element Plus     | `web-ele`      | `site-ele`      |
| iDux             | `web-idux`     | `site-idux`     |
| Naive UI         | `web-naive`    | `site-naive`    |
| PrimeVue         | `web-primevue` | `site-primevue` |
| TDesign Vue Next | `web-tdesign`  | `site-tdesign`  |

14 個のアプリは同じ型付き API 契約を利用します。管理画面にはダッシュボード、ユーザー、ロール、メニュー、コンテンツ、ログ、設定、監視を、サイトにはホーム、製品、価格、FAQ、ブログ、認証、お問い合わせを用意しています。

## リポジトリ構成

```text
fast-vue3/
├── apps/
│   ├── web-*              # 7 種類の管理画面
│   ├── site-*             # 7 種類の公開サイト
│   ├── web-app            # 汎用サイトアプリ
│   └── backend-mock       # Nitro Mock API
├── packages/
│   ├── effects/api        # 正式な API 型とドメインクライアント
│   ├── effects/request    # Axios とレスポンス変換
│   ├── stores             # Pinia ストア
│   ├── preferences        # テーマ・レイアウト設定
│   └── styles, types, utils, locales, constants
├── internal/              # Vite、Lint、TypeScript の共通設定
└── scripts/               # ランチャーとスキャフォールド CLI
```

## 必要環境

- Node.js >= 20.12.0
- pnpm >= 9.5.0
- Git >= 2.30

```bash
pnpm install
```

## Nitro Mock で開発

Mock が既定です。

```bash
pnpm dev
# Mock モードを明示して対話選択
pnpm dev:mock

# アプリを直接起動
pnpm dev:web-antd
pnpm dev:site-antd
```

他の UI は `antd` を `arco`、`ele`、`idux`、`naive`、`primevue`、`tdesign` に置き換えます。Mock のアカウントは `admin / 123456` です。

`pnpm dev:mock` は選択したフロントエンド用に Nitro Mock を起動します。Mock API のみをポート 5320 で起動する場合は `pnpm dev:mock:api` を使用します。Mock は Spring Boot を呼び出しません。

## Spring Boot バックエンドと連携

ローカルに Java がなくても、Docker Desktop または OrbStack で PostgreSQL、Redis、API をまとめて起動できます。どちらも同じ Docker Compose CLI を利用します。

```bash
pnpm dev:server:api
```

このコマンドは隣接する `fast-vue3-server` で Docker Compose を実行します。`pnpm dev:server` は選択したフロントエンドだけを起動し、Nitro Mock や Java サービスは起動しません。

JDK 21 をローカルで使う場合は、隣接する `fast-vue3-server` ディレクトリで `docker compose up -d` を実行して PostgreSQL と Redis を起動し、続けて `./mvnw spring-boot:run` を実行します。

2 つ目のターミナルでフロントエンドを起動します。

```bash
cd /Users/fong/Workspace/personal/frontend/vue/fast-vue3/fast-vue3
VITE_DEV_BACKEND=server pnpm dev:web-antd
# または
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

対話選択は `pnpm dev:server`、接続先の上書きは次のとおりです。

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

- Health: `http://localhost:8080/actuator/health`
- Swagger: `http://localhost:8080/swagger-ui.html`
- 開発アカウント: `admin / admin123`

## Site の認証境界

ホーム、製品、特性、概要、ドキュメント、FAQ、価格、ブログ一覧・詳細、コメント一覧、お問い合わせはログインなしで利用できます。

Bearer Token が必要なのはユーザー操作だけです。

- `POST /blog/{id}/comments`：コメント投稿
- `POST /payments/checkout`：支払い注文作成

価格ページでは Alipay、WeChat Pay、カードを選択し、`pending` の注文を作成します。ブログコメントは公開で読めますが、投稿時はログイン画面へ移動し、成功後に元の URL へ戻ります。

内蔵の支払い処理は安全なデモアダプターです。注文と `checkoutUrl` は生成しますが、実際の課金は行いません。本番では決済プロバイダーを接続し、非同期コールバックの署名を検証してください。

## API 契約

`packages/effects/api/src/types.ts` がフロントエンドの唯一の契約ソースです。Nitro Mock と Spring Boot は共通の形式を返します。

```json
{ "code": 0, "message": "success", "data": {} }
```

ページング形式は `{ items, page, pageSize, total }` です。新しい API では共有型、API クライアント、Nitro ルート、Spring Controller/Service、テストを同時に更新します。

## 品質コマンド

```bash
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm build
```

個別ビルドは `pnpm build:web-antd` または `pnpm build:site-antd` を使用します。

## アプリ作成

```bash
pnpm create-app
```

7 種類の UI から管理画面またはサイトを生成し、`dev:<app-name>` と `build:<app-name>` を追加します。

## ライセンス

[MIT](./LICENSE)
