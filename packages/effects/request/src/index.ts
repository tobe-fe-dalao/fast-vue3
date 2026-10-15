import type { createRequest } from './client';

export type { IResponse, RequestOptions } from './client';
export { createHttpClient, createRequest, HttpRequestError } from './client';

/** createRequest 返回的请求方法集合，供上层 api 包复用 */
export type RequestClient = ReturnType<typeof createRequest>;
