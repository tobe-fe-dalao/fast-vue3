import { Recoverable } from 'repl';

// 返回统一格式的接口数据类型定义
export function successResult<T = Recoverable>(result: T, { message = 'Request success' } = {}) {
  return {
    code: 200,
    result,
    message,
    status: 'ok',
  };
}
export function errorResult(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    status: 'fail',
  };
}

//返回分页数据
export function pageSuccessResult<T = any>(page: number, pageSize: number, list: T[], { message = 'ok' } = {}) {
  const pageData = pagination(page, pageSize, list);
  return {
    ...successResult({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

// 封装分页数据
export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const res =
    offset + Number(pageSize) >= array.length ? array.slice(offset, array.length) : array.slice(offset, offset + Number(pageSize));
  return res;
}

// 返回参数类型定义
export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @name  getRequestToken
 * @description 通过request数据中获取token，具体情况根据接口规范修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
