# Fast Vue3

**言語：** [English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | 日本語

[ドキュメント](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/) · [デモのビルドとプレビュー](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/monorepo/development#multi-app-demo)

## アプリケーション

| UI               | Admin         | Portal         |
| ---------------- | ------------- | -------------- |
| Ant Design Vue   | `web-antd`    | `site-antd`    |
| Arco Design      | `web-arco`    | `site-arco`    |
| Element Plus     | `web-ele`     | `site-ele`     |
| iDux             | `web-idux`    | `site-idux`    |
| Naive UI         | `web-naive`   | `site-naive`   |
| OpenVue          | `web-openvue` | `site-openvue` |
| TDesign Vue Next | `web-tdesign` | `site-tdesign` |

7 種類の管理画面でダッシュボード、ユーザー、ロール、メニュー、記事、ログを利用できます。設定、監視、企業向け機能は Ant Design Vue 版にあります。`web-app` は小規模な公開サイトです。

## ローカル開発

Node.js 24（CI で使うバージョンは `.node-version` を参照）と pnpm 12.18.0 を使用します。Nitro Mock のアカウントは `admin / 123456` です。

```bash
pnpm install
pnpm dev
```

```bash
pnpm dev:web-antd
pnpm dev:site-antd
```

## Java API

フロントエンドで `pnpm dev:server:api` を実行します。Java リポジトリが別の場所にある場合は `FAST_VUE3_SERVER_DIR` で指定します。開発用アカウントは `admin / admin123` です。 [バックエンド連携](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/monorepo/backend-integration)

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
```

## 検証

```bash
pnpm lint
pnpm typecheck
pnpm test
```

`pnpm exec playwright install chromium` で Chromium をインストールします。デモは `pnpm build:demo` の後に `pnpm test:e2e` で検証します。 [テストガイド](https://tobe-fe-dalao.github.io/fast-vue3-site/ja/monorepo/testing)
