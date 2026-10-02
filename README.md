# Fast Vue3

**Languages:** English | [简体中文](./README.zh-CN.md) | [繁體中文（台灣）](./README.zh-TW.md) | [繁體中文（香港）](./README.zh-HK.md) | [日本語](./README.ja.md)

Demo build: `pnpm build:demo`; preview: `pnpm preview:demo` at `http://127.0.0.1:4173/fast-vue3/`. All `web-*` / `site-*` apps use browser-only Mock data. [Deployment guide](https://tobe-fe-dalao.github.io/fast-vue3-site/en/monorepo/development#multi-app-demo).

> A Vue 3 + TypeScript monorepo that delivers the same admin and public-site experience across seven Vue UI ecosystems.

Documentation: <https://tobe-fe-dalao.github.io/fast-vue3-site/> · [Spring Boot server guide](https://tobe-fe-dalao.github.io/fast-vue3-site/en/server/)

## Applications

| UI ecosystem     | Admin app      | Site app        |
| ---------------- | -------------- | --------------- |
| Ant Design Vue   | `web-antd`     | `site-antd`     |
| Arco Design      | `web-arco`     | `site-arco`     |
| Element Plus     | `web-ele`      | `site-ele`      |
| iDux             | `web-idux`     | `site-idux`     |
| Naive UI         | `web-naive`    | `site-naive`    |
| PrimeVue         | `web-primevue` | `site-primevue` |
| TDesign Vue Next | `web-tdesign`  | `site-tdesign`  |

All 14 framework apps consume the same typed API contract. Admin apps include dashboards, users, roles, menus, content, logs, configuration, and monitoring. Site apps include home, product, pricing, FAQ, blog, authentication, and contact pages.

## Repository layout

```text
fast-vue3/
├── apps/
│   ├── web-*              # Seven admin applications
│   ├── site-*             # Seven public-site applications
│   ├── web-app            # Generic site-style application
│   └── backend-mock       # Nitro API mock
├── packages/
│   ├── effects/api        # Canonical API types and domain clients
│   ├── effects/request    # Axios client and response-envelope handling
│   ├── stores             # Pinia stores
│   ├── preferences        # Theme and layout preferences
│   ├── styles             # Shared admin/site styles
│   └── types, utils, locales, constants
├── internal/              # Shared Vite, lint, tsconfig, and Node tooling
└── scripts/               # App launcher and scaffolding CLI
```

## Requirements

| Tool    | Version    |
| ------- | ---------- |
| Node.js | >= 20.12.0 |
| pnpm    | >= 9.5.0   |
| Git     | >= 2.30    |

```bash
pnpm install
```

## Development with Nitro Mock

Mock mode is the default. Select an application interactively:

```bash
pnpm dev
# or explicitly
pnpm dev:mock
```

Start a specific app:

```bash
pnpm dev:web-antd
pnpm dev:web-arco
pnpm dev:web-ele
pnpm dev:web-idux
pnpm dev:web-naive
pnpm dev:web-primevue
pnpm dev:web-tdesign

pnpm dev:site-antd
pnpm dev:site-arco
pnpm dev:site-ele
pnpm dev:site-idux
pnpm dev:site-naive
pnpm dev:site-primevue
pnpm dev:site-tdesign
```

Mock credentials: `admin / 123456`.

`pnpm dev:mock` starts the selected frontend with its own Nitro Mock. To run only the standalone Mock API on port 5320, use `pnpm dev:mock:api` (`pnpm dev:backend-mock` is an alias). The Mock does not call the Spring Boot service.

## Development with the Spring Boot backend

Without installing Java locally, start PostgreSQL, Redis, and the API server with Docker Desktop or OrbStack (both provide the same Docker Compose CLI):

```bash
pnpm dev:server:api
```

This command runs Docker Compose from the sibling `fast-vue3-server` repository. `pnpm dev:server` starts only the selected frontend in server mode; it does not start or use Nitro Mock.

For local JDK 21 development, run `docker compose up -d` for PostgreSQL and Redis, then `./mvnw spring-boot:run`, both from the sibling `fast-vue3-server` directory.

Then start any frontend in server mode:

```bash
cd /Users/fong/Workspace/personal/frontend/vue/fast-vue3/fast-vue3
VITE_DEV_BACKEND=server pnpm dev:web-antd
# or
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

`pnpm dev:server` opens the interactive selector in server mode. Override the API host when needed:

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

- Health: `http://localhost:8080/actuator/health`
- Swagger: `http://localhost:8080/swagger-ui.html`
- Development credentials: `admin / admin123`

Frontend requests always use `/api/v1`; shared Vite configuration proxies them to Nitro (`mock`) or Spring Boot (`server`).

## Site authentication boundary

Content remains public and does not redirect users to login:

- `GET /public/home`, `/product`, `/features`, `/about`, `/docs`, `/faq`, `/pricing`
- `GET /public/blog` and `/public/blog/{id}`
- `GET /public/blog/{id}/comments`
- `POST /public/contact`

Only user interactions require a Bearer access token:

- `POST /blog/{id}/comments`
- `POST /payments/checkout`

The pricing page opens a checkout dialog for purchasable plans, supports Alipay, WeChat Pay, and card channel selection, and creates a pending payment order. The blog detail page shows comments publicly and sends anonymous users to login before posting. The login page returns users to the originating pricing or blog URL.

The bundled checkout is intentionally a safe demo adapter: it persists an order and returns `checkoutUrl`, but does not charge real money. Production deployments should exchange that URL through their payment-provider integration and implement signed callback verification.

## API contract

`packages/effects/api/src/types.ts` is the frontend source of truth. Both Nitro Mock and `fast-vue3-server` return:

```json
{ "code": 0, "message": "success", "data": {} }
```

Paginated data uses `{ items, page, pageSize, total }`. When adding an endpoint, update the shared types/client, Nitro route, Spring controller/service, and contract/integration tests together.

## Quality commands

```bash
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm build
```

Build one application with `pnpm build:web-antd` or `pnpm build:site-antd`.

## Create an application

```bash
pnpm create-app
```

The CLI creates an admin or site app for one of the seven supported UI ecosystems and adds canonical `dev:<app-name>` and `build:<app-name>` scripts.

## License

[MIT](./LICENSE)
