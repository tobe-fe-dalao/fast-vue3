import type { Page, Route } from 'playwright/test';

import { expect, test } from 'playwright/test';

import {
  createStaticMockApi,
  createStaticMockRequest,
} from '../../packages/effects/api/src';

function deferred() {
  let resolve: () => void = () => {};
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function fulfill(route: Route, data: unknown, status = 200) {
  await route.fulfill({
    status,
    json: {
      code: status === 200 ? 0 : status,
      data,
      message: status === 200 ? 'ok' : 'request failed',
    },
  });
}

async function mockApi(page: Page) {
  const api = createStaticMockApi();
  const legacy = createStaticMockRequest(api);
  await page.route('**/api/v1/**', async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname.replace('/api/v1', '');
    const method = route.request().method();
    const id = Number(path.split('/').at(-1));
    let data: unknown;
    switch (path) {
      case '/content/articles': {
        data = await api.content.articleList(
          Object.fromEntries(url.searchParams),
        );
        break;
      }
      case '/content/categories': {
        data = await api.content.categoryList();
        break;
      }
      case '/notifications': {
        data = await api.notification.list();
        break;
      }
      case '/notifications/unread-count': {
        data = await api.notification.unreadCount();
        break;
      }
      case '/public/blog': {
        data = await api.portal.blogList(Object.fromEntries(url.searchParams));
        break;
      }
      default: {
        if (/^\/content\/articles\/\d+$/.test(path))
          data = await api.content.articleDetail(id);
        else if (/^\/public\/blog\/\d+$/.test(path))
          data = await api.portal.blog(id);
        else if (/^\/public\/blog\/\d+\/comments$/.test(path))
          data = await api.portal.blogComments(Number(path.split('/')[3]));
        else if (path === '/public/contact')
          data = await api.portal.contact(route.request().postDataJSON());
        else if (/^\/blog\/\d+\/comments$/.test(path))
          data = await api.portal.createBlogComment(
            Number(path.split('/')[2]),
            route.request().postDataJSON(),
          );
        else if (path.startsWith('/auth/'))
          data = await legacy.request({
            url: path,
            method,
            data: route.request().postDataJSON(),
          });
        else {
          await fulfill(route, null, 404);
          return;
        }
      }
    }
    await fulfill(route, data);
  });
  return api;
}

async function login(page: Page, path = '/content/article') {
  await page.goto(`/#/login?redirect=${encodeURIComponent(path)}`);
  await page.getByPlaceholder('请输入用户名').fill('admin');
  await page.getByPlaceholder('请输入密码').fill('123456');
  await page.getByRole('button', { name: /^登\s*录$/ }).click();
  await expect(page).toHaveURL(
    new RegExp(`#${path.replaceAll('?', String.raw`\?`)}$`),
  );
}

test('profile failure rolls back the entire login session', async ({
  page,
}) => {
  await mockApi(page);
  await page.route('**/api/v1/auth/me', (route) => fulfill(route, null, 500));
  await page.goto('/#/login');
  await page.getByPlaceholder('请输入用户名').fill('admin');
  await page.getByPlaceholder('请输入密码').fill('123456');
  await page.getByRole('button', { name: /^登\s*录$/ }).click();
  await expect(page.getByText('request failed', { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => [
      localStorage.getItem('fast-vue3:token'),
      localStorage.getItem('fast-vue3:refresh-token'),
    ]),
  ).toEqual([null, null]);
  await page.reload();
  await expect(page.getByRole('button', { name: /^登\s*录$/ })).toBeVisible();
});

for (const status of [401, 403]) {
  test(`HTTP ${status} ${status === 401 ? 'expires' : 'preserves'} the session`, async ({
    page,
  }) => {
    await mockApi(page);
    await login(page, '/content/article/edit?id=1');
    await expect(page.getByPlaceholder('请输入文章标题')).toHaveValue(
      'Fast Vue3 多应用能力介绍',
    );
    await page.route('**/api/v1/content/articles/2', (route) =>
      fulfill(route, null, status),
    );
    await page.evaluate(() => {
      window.location.hash = '/content/article/edit?id=2';
    });
    if (status === 401) {
      await expect(page).toHaveURL(/#\/login\?redirect=/);
      expect(
        await page.evaluate(() => localStorage.getItem('fast-vue3:token')),
      ).toBeNull();
      await expect(
        page.getByRole('button', { name: /^登\s*录$/ }),
      ).toBeVisible();
    } else {
      await expect(
        page.getByText('文章加载失败', { exact: true }),
      ).toBeVisible();
      expect(
        await page.evaluate(() => localStorage.getItem('fast-vue3:token')),
      ).toBeTruthy();
      await expect(page).toHaveURL(/#\/content\/article\/edit\?id=2$/);
    }
  });
}

test('late search responses do not overwrite the latest result', async ({
  page,
}) => {
  const api = await mockApi(page);
  const held = deferred();
  const started = deferred();
  await login(page);
  await expect(
    page.getByText('Fast Vue3 多应用能力介绍', { exact: true }),
  ).toBeVisible();
  await page.route('**/api/v1/content/articles?**', async (route) => {
    const keyword =
      new URL(route.request().url()).searchParams.get('keyword') ?? '';
    const data = await api.content.articleList({ keyword });
    if (keyword === 'Fast Vue3') {
      started.resolve();
      await held.promise;
    }
    await fulfill(route, data);
  });
  try {
    await page.getByPlaceholder('标题 / 作者').fill('Fast Vue3');
    await page.getByRole('button', { name: /^搜\s*索$/ }).click();
    await started.promise;
    await page.getByPlaceholder('标题 / 作者').fill('Monorepo');
    await page.getByRole('button', { name: /^搜\s*索$/ }).click();
    await expect(
      page.getByText('Vue 3 Monorepo 工程实践', { exact: true }),
    ).toBeVisible();
    const response = page.waitForResponse((item) =>
      item.url().includes('keyword=Fast'),
    );
    held.resolve();
    const completedResponse = await response;
    await completedResponse.finished();
    await page.getByPlaceholder('标题 / 作者').focus();
    await expect(
      page.getByText('Vue 3 Monorepo 工程实践', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Fast Vue3 多应用能力介绍', { exact: true }),
    ).toHaveCount(0);
  } finally {
    held.resolve();
  }
});

test('a slow contact response preserves a newly edited draft', async ({
  page,
}) => {
  await mockApi(page);
  const held = deferred();
  const started = deferred();
  await page.route('**/api/v1/public/contact', async (route) => {
    started.resolve();
    await held.promise;
    await fulfill(route, { success: true });
  });
  try {
    await page.goto('http://127.0.0.1:4178/contact');
    await page.getByPlaceholder('请输入你的姓名').fill('浏览器测试');
    await page.getByPlaceholder('请输入邮箱').fill('browser@example.com');
    await page.getByPlaceholder('请输入咨询主题').fill('产品咨询');
    await page.getByPlaceholder('请描述你的需求').fill('第一份留言');
    await page.getByRole('button', { name: '提交留言' }).click();
    await started.promise;
    await page.getByPlaceholder('请描述你的需求').fill('请求期间新写的草稿');
    held.resolve();
    await expect(
      page.getByText('演示提交成功；当前接口不会保存留言', { exact: true }),
    ).toBeVisible();
    await expect(page.getByPlaceholder('请描述你的需求')).toHaveValue(
      '请求期间新写的草稿',
    );
  } finally {
    held.resolve();
  }
});

test('a late comment response cannot leak into another article', async ({
  page,
}) => {
  await mockApi(page);
  const held = deferred();
  const started = deferred();
  await page.addInitScript(() =>
    localStorage.setItem('fast-vue3:token', 'mock-access-token-admin'),
  );
  await page.route('**/api/v1/blog/1/comments', async (route) => {
    started.resolve();
    await held.promise;
    await fulfill(route, {
      id: 99,
      username: 'admin',
      content: '旧文章的评论',
      createdAt: '2026-10-23',
    });
  });
  try {
    await page.goto('http://127.0.0.1:4178/blog/1');
    await expect(
      page.getByRole('heading', {
        name: '如何用 Fast Vue3 在一天内搭好企业后台',
      }),
    ).toBeVisible();
    await page.getByPlaceholder('分享你的看法…').fill('旧文章的评论');
    await page.getByRole('button', { name: '发布评论' }).click();
    await started.promise;
    // Exercise history-mode same-record reuse through real navigation history.
    await page.evaluate(() => {
      history.pushState({}, '', '/blog/2');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await expect(
      page.getByRole('heading', { name: '7 套 UI 框架，同一套业务能力的秘密' }),
    ).toBeVisible();
    await page.getByPlaceholder('分享你的看法…').fill('第二篇的新草稿');
    const response = page.waitForResponse('**/api/v1/blog/1/comments');
    held.resolve();
    const completedResponse = await response;
    await completedResponse.finished();
    await page.getByPlaceholder('分享你的看法…').focus();
    await expect(page.getByPlaceholder('分享你的看法…')).toHaveValue(
      '第二篇的新草稿',
    );
    await expect(page.getByText('旧文章的评论', { exact: true })).toHaveCount(
      0,
    );
  } finally {
    held.resolve();
  }
});

test('logout revokes the refresh token and clears local session state', async ({
  page,
}) => {
  await mockApi(page);
  await login(page);
  const revoked = page.waitForRequest('**/api/v1/auth/logout');
  await page.getByText('管理员', { exact: true }).hover();
  await page.getByRole('menuitem', { name: '退出登录' }).click();
  const request = await revoked;
  expect(request.postDataJSON()).toEqual({
    refreshToken: 'mock-refresh-token-admin',
  });
  await expect(page).toHaveURL(/#\/login$/);
  expect(
    await page.evaluate(() => [
      localStorage.getItem('fast-vue3:token'),
      localStorage.getItem('fast-vue3:refresh-token'),
    ]),
  ).toEqual([null, null]);
});

test('portal blog retries a failed load and opens the article from its title', async ({
  page,
}) => {
  await mockApi(page);
  await page.route(
    '**/api/v1/public/blog?**',
    (route) => fulfill(route, null, 500),
    { times: 1 },
  );
  await page.goto('http://127.0.0.1:4178/blog');
  await expect(page.getByRole('alert')).toContainText('文章列表加载失败');
  const retry = page.waitForRequest('**/api/v1/public/blog?**');
  await page.getByRole('button', { name: '重试' }).click();
  const request = await retry;
  expect(new URL(request.url()).searchParams.get('pageSize')).toBe('6');
  const title = '如何用 Fast Vue3 在一天内搭好企业后台';
  await page.getByRole('link', { name: title }).press('Enter');
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
});
