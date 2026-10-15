import { describe, expect, it } from 'vitest';

import { createStaticMockApi } from './static-mock';

describe('static mock api', () => {
  it('supports the documented preview login', async () => {
    const api = createStaticMockApi();

    await expect(
      api.auth.login({ username: 'admin', password: '123456' }),
    ).resolves.toMatchObject({
      accessToken: 'mock-access-token-admin',
      refreshToken: 'mock-refresh-token-admin',
    });
    await expect(
      api.auth.login({ username: 'admin', password: 'wrong' }),
    ).rejects.toThrow('用户名或密码错误');
  });

  it('keeps mutations in the current mock instance', async () => {
    const api = createStaticMockApi();
    const isolatedApi = createStaticMockApi();

    await api.user.create({
      username: 'preview-user',
      password: '123456',
      realName: '预览用户',
    });

    await expect(
      api.user.list({ keyword: 'preview-user' }),
    ).resolves.toMatchObject({ total: 1 });
    await expect(
      isolatedApi.user.list({ keyword: 'preview-user' }),
    ).resolves.toMatchObject({ total: 0 });
  });

  it('provides content required by both preview applications', async () => {
    const api = createStaticMockApi();

    await expect(api.analytics.dashboardStats()).resolves.toMatchObject({
      todayVisits: 3256,
    });
    await expect(api.portal.blogList()).resolves.toMatchObject({
      total: 3,
    });
    await expect(api.system.deptList()).resolves.toHaveLength(1);
  });

  it('combines user role, status and keyword filters before pagination', async () => {
    const api = createStaticMockApi();
    await expect(
      api.user.list({
        role: 'editor',
        status: 'active',
        keyword: 'zhang',
        pageSize: 1,
      }),
    ).resolves.toMatchObject({ total: 1, items: [{ username: 'zhangsan' }] });
    await expect(
      api.user.list({ role: 'editor', status: 'disabled' }),
    ).resolves.toMatchObject({ total: 0 });
    await expect(api.user.list({ role: 'missing' })).resolves.toMatchObject({
      total: 0,
    });
  });

  it('applies the shared page bounds to static user, role and log lists', () => {
    const api = createStaticMockApi();
    for (const list of [
      api.user.list,
      api.role.list,
      api.log.login,
      api.log.operation,
      api.log.error,
    ]) {
      for (const query of [
        { page: 0 },
        { page: -1 },
        { page: 1.5 },
        { page: 10_001 },
        { pageSize: 0 },
        { pageSize: 101 },
        { pageSize: Number.POSITIVE_INFINITY },
      ]) {
        expect(() => list(query)).toThrow('Invalid pagination');
      }
    }
  });

  it('preserves legacy list defaults and returns the requested final page', async () => {
    const api = createStaticMockApi();
    await expect(api.log.login()).resolves.toMatchObject({
      page: 1,
      pageSize: 10,
      total: 18,
    });
    const finalPage = await api.log.login({ page: 2, pageSize: 10 });
    expect(finalPage).toMatchObject({
      page: 2,
      pageSize: 10,
      total: 18,
      items: expect.any(Array),
    });
    expect(finalPage.items).toHaveLength(8);
    await expect(
      api.user.list({ page: 10_000, pageSize: 100 }),
    ).resolves.toMatchObject({ items: [], total: 3 });
  });

  it('maps user role IDs on create and update without retaining request fields', async () => {
    const api = createStaticMockApi();
    const created = await api.user.create({
      username: 'role-user',
      password: 'secret',
      roleIds: [2],
    });
    expect(created.roles).toEqual(['2']);
    expect(created).not.toHaveProperty('password');
    await api.user.update(created.id, { realName: 'New name' });
    const renamed = await api.user.detail(created.id);
    expect(renamed.roles).toEqual(['2']);
    const updated = await api.user.update(created.id, {
      roleIds: [],
      password: 'new-secret',
    });
    expect(updated.roles).toEqual([]);
    expect(updated).not.toHaveProperty('roleIds');
    expect(updated).not.toHaveProperty('password');
  });

  it('initializes a searchable real name when only a username is provided', async () => {
    const api = createStaticMockApi();
    const created = await api.user.create({
      username: 'new-person',
      password: '123456',
    });
    expect(created.realName).toBe('new-person');
    expect(created.nickname).toBe('new-person');
    await api.user.update(created.id, { realName: '更新姓名' });
    await expect(api.user.list({ keyword: '更新姓名' })).resolves.toMatchObject(
      { total: 1 },
    );
  });

  it('isolates role menu IDs from caller-owned input and output arrays', async () => {
    const api = createStaticMockApi();
    const menuIds = [1];
    const role = await api.role.create({
      name: 'Test role',
      code: 'test',
      menuIds,
    });
    menuIds.push(2);
    role.menuIds.push(3);
    const stored = await api.role.detail(role.id);
    expect(stored.menuIds).toEqual([1]);
    const updatedMenuIds = [4];
    await api.role.update(role.id, { menuIds: updatedMenuIds });
    updatedMenuIds.push(5);
    const updated = await api.role.detail(role.id);
    expect(updated.menuIds).toEqual([4]);
  });

  it('keeps enterprise idempotency, versions and activities in one preview session', async () => {
    const api = createStaticMockApi();
    const created = await api.project.create(
      { name: '演示项目', code: 'DEMO' },
      'create-1',
    );
    const replay = await api.project.create(
      { name: '演示项目', code: 'DEMO' },
      'create-1',
    );
    expect(replay.id).toBe(created.id);
    expect(await api.project.list()).toHaveLength(1);

    const task = await api.task.create(created.id, {
      title: '演示任务',
      assigneeId: 1,
    });
    expect(() =>
      api.task.update(task.id, { status: 'DONE', version: task.version }),
    ).toThrow('不能转换');
    const updated = await api.task.update(task.id, {
      status: 'IN_PROGRESS',
      version: task.version,
    });
    expect(updated.version).toBe(task.version + 1);
    expect(() =>
      api.task.update(task.id, { status: 'DONE', version: task.version }),
    ).toThrow('数据已更新');
    expect(await api.task.activities(task.id)).toHaveLength(2);
    expect(await api.notification.unreadCount()).toMatchObject({ count: 1 });
  });
});
