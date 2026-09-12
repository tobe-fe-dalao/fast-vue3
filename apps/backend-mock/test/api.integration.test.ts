import type { ChildProcess } from 'node:child_process';

import { spawn } from 'node:child_process';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

const port = 49_191;
const baseUrl = `http://127.0.0.1:${port}/api/v1`;
let server: ChildProcess;
let accessToken = '';

async function waitUntilReady() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/public/home`);
      if (response.ok) return;
    } catch {
      // 服务仍在启动。
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Nitro mock server did not become ready in time');
}

async function request<T>(
  path: string,
  init?: RequestInit,
  authenticated = true,
) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...(authenticated && accessToken
        ? { authorization: `Bearer ${accessToken}` }
        : {}),
      'content-type': 'application/json',
      ...init?.headers,
    },
  });
  expect(response.ok).toBe(true);
  return (await response.json()) as ApiResponse<T>;
}

describe('nitro v1 API integration', () => {
  beforeAll(async () => {
    server = spawn(process.execPath, ['.output/server/index.mjs'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        HOST: '127.0.0.1',
        PORT: String(port),
      },
      stdio: 'ignore',
    });
    await waitUntilReady();
    const response = await fetch(`${baseUrl}/auth/login`, {
      body: JSON.stringify({ password: '123456', username: 'admin' }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const body = (await response.json()) as ApiResponse<{
      accessToken: string;
    }>;
    accessToken = body.data.accessToken;
  }, 15_000);

  afterAll(() => {
    server.kill('SIGTERM');
  });

  it('serves portal list/detail data using the common response envelope', async () => {
    const list = await request<
      PageResult<{ id: number; title: string }> & { categories: string[] }
    >('/public/blog?page=1&pageSize=2', undefined, false);

    expect(list.code).toBe(0);
    expect(list.data.items).toHaveLength(2);
    expect(list.data.categories).toContain('全部');

    const detail = await request<{ id: number; title: string }>(
      `/public/blog/${list.data.items[0]?.id}`,
      undefined,
      false,
    );
    expect(detail.data.title).toBe(list.data.items[0]?.title);
  });

  it('accepts contact submissions', async () => {
    const response = await request<{ accepted: boolean; email: string }>(
      '/public/contact',
      {
        method: 'POST',
        body: JSON.stringify({
          email: 'integration@example.com',
          name: '集成测试',
          message: 'hello',
        }),
      },
      false,
    );

    expect(response.data).toMatchObject({
      accepted: true,
      email: 'integration@example.com',
    });
  });

  it('registers a public site user and exposes it to management queries', async () => {
    const username = `site-user-${Date.now()}`;
    const registered = await request<{
      email: string;
      id: number;
      status: string;
      username: string;
    }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({
          email: `${username}@example.com`,
          password: '123456',
          username,
        }),
      },
      false,
    );

    expect(registered.data).toMatchObject({ status: 'active', username });
    const users = await request<PageResult<{ username: string }>>(
      `/users?keyword=${username}`,
    );
    expect(users.data.items.some((user) => user.username === username)).toBe(
      true,
    );
  });

  it('persists user CRUD changes during a running mock session', async () => {
    const created = await request<{ id: number; username: string }>('/users', {
      method: 'POST',
      body: JSON.stringify({
        password: 'test-password',
        status: 'active',
        username: 'integration-user',
      }),
    });

    const detail = await request<{ id: number; username: string }>(
      `/users/${created.data.id}`,
    );
    expect(detail.data.username).toBe('integration-user');

    await request<undefined>(`/users/${created.data.id}`, { method: 'DELETE' });
    const list = await request<PageResult<{ username: string }>>(
      '/users?keyword=integration-user',
    );
    expect(list.data.total).toBe(0);
  });

  it('persists article, menu and role-permission changes', async () => {
    const article = await request<{ id: number; title: string }>(
      '/content/articles',
      {
        method: 'POST',
        body: JSON.stringify({
          categoryId: 1,
          content: ['integration content'],
          status: 'draft',
          title: 'integration article',
        }),
      },
    );
    const updatedArticle = await request<{ status: string }>(
      `/content/articles/${article.data.id}`,
      { method: 'PUT', body: JSON.stringify({ status: 'published' }) },
    );
    expect(updatedArticle.data.status).toBe('published');
    await request<undefined>(`/content/articles/${article.data.id}`, {
      method: 'DELETE',
    });

    const menu = await request<{ id: number; name: string }>('/menus', {
      method: 'POST',
      body: JSON.stringify({ name: '集成测试菜单', type: 'menu' }),
    });
    expect(menu.data.name).toBe('集成测试菜单');
    await request<undefined>(`/menus/${menu.data.id}`, { method: 'DELETE' });

    const updatedRole = await request<{ permissions: string[] }>('/roles/3', {
      method: 'PUT',
      body: JSON.stringify({ permissionIds: [1, 13, 17] }),
    });
    expect(updatedRole.data.permissions).toEqual([
      'user:list',
      'content:list',
      'dashboard:view',
    ]);
  });

  it('serves the enterprise project, task, approval and notification workflow', async () => {
    const project = await request<{ id: number; version: number }>(
      '/projects',
      {
        method: 'POST',
        headers: { 'Idempotency-Key': 'integration-project-1' },
        body: JSON.stringify({ name: '集成项目', code: 'INTEGRATION' }),
      },
    );
    const task = await request<{ id: number; status: string; version: number }>(
      `/projects/${project.data.id}/tasks`,
      { method: 'POST', body: JSON.stringify({ title: '接入任务' }) },
    );
    expect(task.data.status).toBe('TODO');

    const updated = await request<{ status: string; version: number }>(
      `/tasks/${task.data.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          status: 'IN_PROGRESS',
          version: task.data.version,
        }),
      },
    );
    expect(updated.data.status).toBe('IN_PROGRESS');
    const comment = await request<{ content: string }>(
      `/tasks/${task.data.id}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ content: '开始处理' }),
      },
    );
    expect(comment.data.content).toBe('开始处理');

    const stale = await fetch(`${baseUrl}/tasks/${task.data.id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status: 'DONE', version: task.data.version }),
    });
    expect(stale.status).toBe(409);

    const approval = await request<{ id: number; status: string }>(
      '/approvals',
      {
        method: 'POST',
        body: JSON.stringify({
          type: 'GENERAL',
          title: '审批接入',
          departmentId: 1,
        }),
      },
    );
    const submitted = await request<{ status: string }>(
      `/approvals/${approval.data.id}/submit`,
      {
        method: 'POST',
        headers: { 'Idempotency-Key': 'integration-approval-1' },
      },
    );
    expect(submitted.data.status).toBe('PENDING');
    const unread = await request<{ count: number }>(
      '/notifications/unread-count',
    );
    expect(unread.data.count).toBeGreaterThan(0);
    await request<undefined>('/notifications/read-all', { method: 'PUT' });
    const readCount = await request<{ count: number }>(
      '/notifications/unread-count',
    );
    expect(readCount.data.count).toBe(0);
    const otherUser = await fetch(`${baseUrl}/notifications`, {
      headers: { authorization: 'Bearer mock-access-token-user' },
    });
    const otherBody = (await otherUser.json()) as ApiResponse<unknown[]>;
    expect(otherBody.data).toEqual([]);
  });

  it('uploads and downloads a private file with the bearer token', async () => {
    const data = new FormData();
    data.append(
      'file',
      new File(['hello'], 'note.txt', { type: 'text/plain' }),
    );
    const upload = await fetch(`${baseUrl}/files`, {
      method: 'POST',
      headers: { authorization: `Bearer ${accessToken}` },
      body: data,
    });
    expect(upload.status).toBe(200);
    const body = (await upload.json()) as ApiResponse<{ url: string }>;
    const anonymous = await fetch(new URL(body.data.url, baseUrl));
    expect(anonymous.status).toBe(401);
    const download = await fetch(new URL(body.data.url, baseUrl), {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    expect(await download.text()).toBe('hello');
  });

  it('enforces operating-data permissions for non-admin users', async () => {
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      body: JSON.stringify({ password: '123456', username: 'user' }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const loginBody = (await loginResponse.json()) as ApiResponse<{
      accessToken: string;
    }>;

    const response = await fetch(`${baseUrl}/analytics/overview`, {
      headers: {
        authorization: `Bearer ${loginBody.data.accessToken}`,
      },
    });
    const body = (await response.json()) as ApiResponse<null>;

    expect(response.status).toBe(403);
    expect(body.code).toBe(403);
  });

  it('keeps content public while protecting comments and checkout', async () => {
    const pricing = await fetch(`${baseUrl}/public/pricing`);
    const comments = await fetch(`${baseUrl}/public/blog/1/comments`);
    expect(pricing.status).toBe(200);
    expect(comments.status).toBe(200);

    const unauthorizedComment = await fetch(`${baseUrl}/blog/1/comments`, {
      body: JSON.stringify({ content: 'anonymous' }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    const unauthorizedCheckout = await fetch(`${baseUrl}/payments/checkout`, {
      body: JSON.stringify({ channel: 'alipay', planId: 2 }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });
    expect(unauthorizedComment.status).toBe(401);
    expect(unauthorizedCheckout.status).toBe(401);

    const comment = await request<{ content: string; username: string }>(
      '/blog/1/comments',
      { body: JSON.stringify({ content: '登录后评论' }), method: 'POST' },
    );
    expect(comment.data).toMatchObject({
      content: '登录后评论',
      username: 'admin',
    });

    const checkout = await request<{
      amountCents: number;
      orderNo: string;
      status: string;
    }>('/payments/checkout', {
      body: JSON.stringify({ channel: 'alipay', planId: 2 }),
      method: 'POST',
    });
    expect(checkout.data.amountCents).toBe(29_900);
    expect(checkout.data.orderNo).toMatch(/^FV/);
    expect(checkout.data.status).toBe('pending');
  });
});
