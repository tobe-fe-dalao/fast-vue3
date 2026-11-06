import type { APIResponse } from 'playwright/test';

import { expect, test } from 'playwright/test';

const apiRoot = '/api/v1';
const adminPassword = process.env.FAST_VUE3_TEST_ADMIN_PASSWORD ?? 'admin123';

async function readData<T>(
  response: Pick<APIResponse, 'json' | 'ok' | 'url'>,
): Promise<T> {
  expect(response.ok(), response.url()).toBe(true);
  const body = await response.json();
  expect(body.code, response.url()).toBe(0);
  expect(body.data, response.url()).not.toBeNull();
  return body.data;
}

test('Java returns data for admin, content, monitoring and enterprise domains', async ({
  request,
}) => {
  const { accessToken } = await readData<{ accessToken: string }>(
    await request.post(`${apiRoot}/auth/login`, {
      data: { username: 'admin', password: adminPassword },
    }),
  );
  const headers = { Authorization: `Bearer ${accessToken}` };
  const paths = [
    '/auth/me',
    '/dashboard/stats',
    '/analytics/overview?days=7',
    '/data/overview',
    '/users',
    '/roles',
    '/permissions',
    '/menus/tree',
    '/content/articles',
    '/content/categories',
    '/log/login',
    '/log/operation',
    '/log/error',
    '/config/list',
    '/dict/list',
    '/notice/list',
    '/departments',
    '/monitor/online',
    '/monitor/server',
    '/approvals',
    '/audit/operations',
    '/notifications',
    '/notifications/unread-count',
    '/organizations/current',
    '/projects',
    '/tenants',
  ];
  for (const path of paths) {
    await test.step(path, async () => {
      await readData(await request.get(`${apiRoot}${path}`, { headers }));
    });
  }
});

test('Java public content and contact work without an access token', async ({
  request,
}) => {
  const base = 'http://127.0.0.1:4182/api/v1/public';
  for (const path of [
    'home',
    'features',
    'product',
    'about',
    'docs',
    'faq',
    'pricing',
  ]) {
    await test.step(path, async () => {
      await readData(await request.get(`${base}/${path}`));
    });
  }
  const blog = await readData<{ items: { id: number }[] }>(
    await request.get(`${base}/blog?page=1&pageSize=100`),
  );
  const [firstPost] = blog.items;
  if (!firstPost) throw new Error('The development API has no blog posts');
  const { id } = firstPost;
  await readData(await request.get(`${base}/blog/${id}`));
  await readData(await request.get(`${base}/blog/${id}/comments`));
  const contact = await readData<{ accepted: boolean }>(
    await request.post(`${base}/contact`, {
      data: {
        name: 'Browser test',
        email: 'browser@example.com',
        message: 'Local verification',
      },
    }),
  );
  expect(contact.accepted).toBe(true);
});

test('admin pages load server data after logging in through Vite', async ({
  page,
}) => {
  await page.goto('/#/login?redirect=%2Fsystem%2Fuser');
  await expect(page.getByPlaceholder('请输入密码')).toHaveValue('');
  await page.getByPlaceholder(/请输入用户名/).fill('admin');
  await page.getByPlaceholder(/请输入密码/).fill(adminPassword);
  const users = page.waitForResponse((response) =>
    new URL(response.url()).pathname.endsWith('/api/v1/users'),
  );
  await page.getByRole('button', { name: /^登\s*录$/ }).click();
  const data = await readData<{ items: { username: string }[] }>(await users);
  expect(data.items.map((item) => item.username)).toContain('admin');
  await expect(page.getByText('admin', { exact: true }).first()).toBeVisible();

  const routes: [string, string][] = [
    ['/home', '/dashboard/stats'],
    ['/dashboard', '/dashboard/stats'],
    ['/analytics', '/analytics/overview'],
    ['/system/role', '/roles'],
    ['/system/menu', '/menus/tree'],
    ['/content/article', '/content/articles'],
    ['/content/article/edit?id=1', '/content/articles/1'],
    ['/log/login', '/log/login'],
    ['/log/operation', '/log/operation'],
    ['/log/error', '/log/error'],
  ];
  if ((process.env.FAST_VUE3_TEST_UI ?? 'antd') === 'antd') {
    routes.push(
      ['/data', '/data/overview'],
      ['/system/config', '/config/list'],
      ['/system/dept', '/departments'],
      ['/system/dict', '/dict/list'],
      ['/system/notice', '/notice/list'],
      ['/content/category', '/content/categories'],
      ['/monitor/online', '/monitor/online'],
      ['/monitor/server', '/monitor/server'],
      ['/approvals', '/approvals'],
      ['/notifications', '/notifications'],
      ['/projects', '/projects'],
      ['/enterprise/audit', '/audit/operations'],
      ['/enterprise/organization', '/organizations/current'],
      ['/enterprise/tenants', '/tenants'],
    );
  }

  for (const [route, endpoint] of routes) {
    await test.step(route, async () => {
      const data = page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === `${apiRoot}${endpoint}`,
      );
      await page.evaluate((path) => {
        window.location.hash = path;
      }, route);
      await readData(await data);
    });
  }
});

test('portal pages fetch their public Java data', async ({ page }) => {
  const routes: [string, string][] = [
    ['/', 'home'],
    ['/features', 'features'],
    ['/product', 'product'],
    ['/about', 'about'],
    ['/docs', 'docs'],
    ['/faq', 'faq'],
    ['/pricing', 'pricing'],
    ['/blog/1', 'blog/1'],
  ];
  for (const [route, endpoint] of routes) {
    await test.step(route, async () => {
      const data = page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === `${apiRoot}/public/${endpoint}`,
      );
      await page.goto(`http://127.0.0.1:4182${route}`);
      await readData(await data);
    });
  }
});

for (const port of [4182, 4183]) {
  test(`portal on ${port} renders the Java blog list`, async ({ page }) => {
    const blogs = page.waitForResponse((response) =>
      new URL(response.url()).pathname.endsWith('/api/v1/public/blog'),
    );
    await page.goto(`http://127.0.0.1:${port}/blog`);
    const { items } = await readData<{ items: { title: string }[] }>(
      await blogs,
    );
    const [firstPost] = items;
    if (!firstPost) throw new Error('The development API has no blog posts');
    await expect(
      page.getByText(firstPost.title, { exact: true }),
    ).toBeVisible();
  });
}
