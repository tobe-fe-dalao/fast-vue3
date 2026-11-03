import { createStaticMockApi, createStaticMockRequest } from '@fast-vue3/api';
import { createHttpClient, createRequest } from '@fast-vue3/request';

export const staticApi =
  import.meta.env.VITE_STATIC_MOCK === 'true'
    ? createStaticMockApi()
    : undefined;

export const http = staticApi
  ? createStaticMockRequest(staticApi)
  : createRequest(
      createHttpClient(import.meta.env.VITE_APP_API_BASEURL ?? '/api/v1'),
    );
