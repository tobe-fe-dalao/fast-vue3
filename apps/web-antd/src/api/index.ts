import type { Api } from '@fast-vue3/api';

import { createApi } from '@fast-vue3/api';

import { http, staticApi } from './http';

/**
 * 共享接口实例。
 *
 * 该 app 用自己的 http 客户端（baseURL 由 VITE_APP_API_BASEURL 决定），
 * 把请求派发到 Nitro mock（开发）或 Java 后端（生产）。
 */
export const api: Api = staticApi ?? createApi(http);

export * from '@fast-vue3/api';
