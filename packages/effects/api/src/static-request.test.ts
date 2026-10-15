import { describe, expect, it } from 'vitest';

import { createStaticMockApi } from './static-mock';
import { createStaticMockRequest } from './static-request';

describe('legacy requests in static demos', () => {
  it('supports the legacy TDesign login and profile flow', async () => {
    const http = createStaticMockRequest(createStaticMockApi());
    await expect(
      http.post({
        url: '/auth/login',
        data: { username: 'admin', password: '123456' },
      }),
    ).resolves.toMatchObject({ accessToken: 'mock-access-token-admin' });
    await expect(http.get({ url: '/auth/me' })).resolves.toMatchObject({
      username: 'admin',
      roles: ['admin'],
    });
    await expect(
      http.post({
        url: '/auth/login',
        data: { username: 'admin', password: 'wrong' },
      }),
    ).rejects.toThrow('用户名或密码错误');
    await expect(
      http.post({
        url: '/auth/refresh',
        data: { refreshToken: 'mock-refresh-token-admin' },
      }),
    ).resolves.toMatchObject({ accessToken: 'mock-access-token-admin' });
    await expect(
      http.post({
        url: '/auth/logout',
        data: { refreshToken: 'mock-refresh-token-admin' },
      }),
    ).resolves.toBeUndefined();
  });
  it('shares user mutations and filtering with the app API', async () => {
    const api = createStaticMockApi();
    const http = createStaticMockRequest(api);
    const user = await http.post<{ id: number }>({
      data: { username: 'demo-user', realName: 'Before', password: '123456' },
      url: '/users',
    });
    await expect(api.user.detail(user.id)).resolves.toMatchObject({
      realName: 'Before',
    });
    await http.put({ url: `/users/${user.id}`, data: { realName: 'After' } });
    await expect(api.user.list({ keyword: 'After' })).resolves.toMatchObject({
      total: 1,
    });
    await expect(
      http.get({ url: '/users', params: { keyword: 'demo-user' } }),
    ).resolves.toMatchObject({ total: 1 });
    await http.del({ url: `/users/${user.id}` });
    await expect(
      api.user.list({ keyword: 'demo-user' }),
    ).resolves.toMatchObject({ total: 0 });
  });

  it('supports role, menu and log pages without a server', async () => {
    const api = createStaticMockApi();
    const http = createStaticMockRequest(api);
    await expect(http.get({ url: '/roles' })).resolves.toMatchObject({
      total: 2,
    });
    await expect(http.get({ url: '/menus/tree' })).resolves.toEqual(
      await api.menu.tree(),
    );
    for (const kind of ['login', 'operation', 'error']) {
      await expect(
        http.get({ url: `/log/${kind}`, params: { pageSize: 1 } }),
      ).resolves.toMatchObject({ page: 1, pageSize: 1 });
    }
  });

  it('rejects unsupported routes and propagates missing record errors', async () => {
    const http = createStaticMockRequest(createStaticMockApi());
    await expect(http.get({ url: '/unsupported' })).rejects.toThrow(
      'Unsupported demo request',
    );
    await expect(http.post({ url: '/log/login' })).rejects.toThrow(
      'Unsupported demo request',
    );
    await expect(http.get({ url: '/users/999999' })).rejects.toThrow(
      '记录不存在',
    );
  });

  it('rejects malformed mutation paths without deleting existing records', async () => {
    const api = createStaticMockApi();
    const http = createStaticMockRequest(api);
    for (const domain of ['users', 'roles', 'menus']) {
      for (const suffix of ['1/extra', '/1', '1.0', '1e0', '-1', 'NaN']) {
        await expect(http.del({ url: `/${domain}/${suffix}` })).rejects.toThrow(
          'Unsupported demo request',
        );
      }
    }
    await expect(api.user.detail(1)).resolves.toMatchObject({
      username: 'admin',
    });
    await expect(api.role.detail(1)).resolves.toMatchObject({
      code: 'super_admin',
    });
    await expect(api.menu.detail(1)).resolves.toMatchObject({ name: '首页' });
    await expect(http.get({ url: '/auth/me/extra' })).rejects.toThrow(
      'Unsupported demo request',
    );
    await expect(http.get({ url: '/log/login/extra' })).rejects.toThrow(
      'Unsupported demo request',
    );
  });

  it('reads URL query parameters and lets explicit params override them', async () => {
    const http = createStaticMockRequest(createStaticMockApi());
    await expect(
      http.get({ url: '/users?role=editor&pageSize=1' }),
    ).resolves.toMatchObject({
      total: 1,
      pageSize: 1,
      items: [{ username: 'zhangsan' }],
    });
    await expect(
      http.get({
        url: '/users?role=editor&pageSize=1',
        params: { role: 'user', pageSize: 2 },
      }),
    ).resolves.toMatchObject({
      total: 1,
      pageSize: 2,
      items: [{ username: 'lisi' }],
    });
    await expect(
      http.get({
        url: '/users',
        params: new URLSearchParams({ role: 'editor' }),
      }),
    ).resolves.toMatchObject({ total: 1, items: [{ username: 'zhangsan' }] });
  });
});
