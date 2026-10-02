import { createApi } from '@fast-vue3/api';

import { http, staticApi } from './http';

export const api = staticApi ?? createApi(http);

export * from '@fast-vue3/api';
