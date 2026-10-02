import type { RequestClient } from '@fast-vue3/request';

import type { Api } from './index';

type RequestConfig = Parameters<RequestClient['get']>[0];

/** Route legacy page-level HTTP calls to the same in-memory API as modern pages. */
export function createStaticMockRequest(api: Api): RequestClient {
  async function request<T>(config: RequestConfig): Promise<T> {
    const method = (config.method ?? 'GET').toUpperCase();
    const path = (config.url ?? '').split('?')[0] ?? '';
    const [, domain, idText] = path.split('/');
    const id = Number(idText);
    const params = config.params;
    const data = config.data;
    let result: unknown;

    switch (domain) {
      case 'auth': {
        if (method === 'POST' && idText === 'login')
          result = await api.auth.login(data);
        else if (method === 'POST' && idText === 'logout')
          result = await api.auth.logout(data?.refreshToken ?? '');
        else if (method === 'POST' && idText === 'refresh')
          result = await api.auth.refresh(data?.refreshToken ?? '');
        else if (method === 'GET' && idText === 'me')
          result = await api.auth.me();
        else throw new Error(`Unsupported demo request: ${method} ${path}`);

        break;
      }
      case 'menus': {
        if (method === 'GET' && idText === 'tree')
          result = await api.menu.tree();
        else if (method === 'GET' && !idText) result = await api.menu.mine();
        else if (method === 'GET' && idText) result = await api.menu.detail(id);
        else if (method === 'POST' && !idText)
          result = await api.menu.create(data);
        else if (method === 'PUT' && idText)
          result = await api.menu.update(id, data);
        else if (method === 'DELETE' && idText)
          result = await api.menu.delete(id);
        else throw new Error(`Unsupported demo request: ${method} ${path}`);

        break;
      }
      case 'roles':
      case 'users': {
        const resource = domain === 'users' ? api.user : api.role;
        if (method === 'GET' && !idText) result = await resource.list(params);
        else if (method === 'GET' && idText) result = await resource.detail(id);
        else if (method === 'POST' && !idText)
          result = await resource.create(data);
        else if (method === 'PUT' && idText)
          result = await resource.update(id, data);
        else if (method === 'DELETE' && idText)
          result = await resource.delete(id);
        else throw new Error(`Unsupported demo request: ${method} ${path}`);

        break;
      }
      default: {
        if (
          domain === 'log' &&
          method === 'GET' &&
          (idText === 'error' || idText === 'login' || idText === 'operation')
        ) {
          result = await api.log[idText](params);
        } else {
          // Never silently fall back to a real backend from a static demo.
          throw new Error(`Unsupported demo request: ${method} ${path}`);
        }
      }
    }

    return result as T;
  }

  return {
    del: (config) => request({ ...config, method: 'DELETE' }),
    download: async () => {
      throw new Error('Use the demo file API to download simulated files.');
    },
    get: (config) => request({ ...config, method: 'GET' }),
    post: (config) => request({ ...config, method: 'POST' }),
    put: (config) => request({ ...config, method: 'PUT' }),
    request,
  };
}
