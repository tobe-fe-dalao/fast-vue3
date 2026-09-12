import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { getAuthHeader, getHttpStatusMessage } from '@fast-vue3/utils';

import axios from 'axios';

/**
 * 后端统一响应信封：code === 0 表示成功。
 * 同时兼容 Java 后端（fast-vue3-server）与 Nitro Mock 服务。
 */
export interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface RequestOptions {
  /** 是否处理响应结果，默认 true */
  isTransformResponse?: boolean;
}

/**
 * 创建 axios 实例
 * 各 app 调用此函数，传入 baseURL 创建专属 http 客户端
 */
export function createHttpClient(
  baseURL: string,
  timeout = 10_000,
): AxiosInstance {
  const service = axios.create({ baseURL, timeout });

  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authHeader = getAuthHeader();
      if (authHeader) {
        config.headers.authorization = authHeader;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  service.interceptors.response.use(
    (response: AxiosResponse) => {
      // HTTP 层错误（非 2xx）交给错误分支处理；此处直接放行 2xx
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;
      if (response) {
        const data = response.data as IResponse;
        const msg = data?.message || getHttpStatusMessage(response.status);
        return Promise.reject(new Error(msg));
      }
      return Promise.reject(new Error('网络连接异常，请稍后再试！'));
    },
  );

  return service;
}

/**
 * 基于 axios 实例创建类型安全的请求方法集合
 */
export function createRequest(client: AxiosInstance) {
  function request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      client
        .request<any, AxiosResponse<IResponse<T>>>(config)
        .then((res) => {
          const body = res.data;
          // 业务层错误（HTTP 200 但 code !== 0）
          if (body && typeof body.code === 'number' && body.code !== 0) {
            reject(new Error(body.message || '请求失败'));
            return;
          }
          resolve(body?.data as T);
        })
        .catch(reject);
    });
  }

  return {
    /** Authenticated binary response, such as a private file download. */
    download: async (config: AxiosRequestConfig): Promise<Blob> => {
      const response = await client.request<Blob>({
        ...config,
        method: 'GET',
        responseType: 'blob',
      });
      return response.data;
    },
    get: <T = any>(config: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'GET' }),
    post: <T = any>(config: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'POST' }),
    put: <T = any>(config: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'PUT' }),
    del: <T = any>(config: AxiosRequestConfig) =>
      request<T>({ ...config, method: 'DELETE' }),
    request,
  };
}
