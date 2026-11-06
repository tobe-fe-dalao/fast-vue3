import type { Page } from 'playwright/test';

import { expect, test } from 'playwright/test';

const frameworks = [
  'antd',
  'arco',
  'ele',
  'idux',
  'naive',
  'openvue',
  'tdesign',
];
const firstArticle = 'Fast Vue3 多应用能力介绍';
const secondArticle = 'Vue 3 Monorepo 工程实践';
const firstBlog = '如何用 Fast Vue3 在一天内搭好企业后台';
const secondBlog = '7 套 UI 框架，同一套业务能力的秘密';

async function navigateWithinApp(page: Page, path: string) {
  // A real hash navigation reuses the matched Vue route component.
  await page.evaluate((value) => {
    window.location.hash = value;
  }, path);
}

async function login(page: Page, framework: string, redirect = '/home') {
  await page.goto(
    `web-${framework}/#/login?redirect=${encodeURIComponent(redirect)}`,
  );
  await page.getByPlaceholder(/请输入用户名/).fill('admin');
  await page.getByPlaceholder(/请输入密码/).fill('123456');
  await page.getByRole('button', { name: /^登\s*录$/ }).click();
  await expect(page).toHaveURL(
    new RegExp(`#${redirect.replaceAll(/[?]/g, String.raw`\?`)}$`),
  );
}

test('demo hub exposes all fifteen applications under the repository base', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: /演示/ })).toHaveCount(15);
  for (const framework of frameworks) {
    await expect(
      page.locator(`a[href="/fast-vue3/web-${framework}/"]`),
    ).toHaveCount(1);
    await expect(
      page.locator(`a[href="/fast-vue3/site-${framework}/"]`),
    ).toHaveCount(1);
  }
});

test('generic web application renders its portal content and mobile navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('web-app/');
  await expect(
    page.getByRole('heading', { name: 'Fast Vue3', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '核心特性', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
  const menu = page.getByRole('button', { name: '菜单' });
  await menu.click();
  const navigation = page.getByRole('navigation', { name: '主导航' });
  await navigation.getByRole('link', { name: '博客' }).focus();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

for (const framework of ['idux', 'openvue']) {
  test(`${framework} component messages use the active provider`, async ({
    page,
  }) => {
    await login(page, framework, '/components');
    await page.getByRole('button', { name: '成功消息' }).click();
    await expect(page.getByText('操作成功！', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: '警告消息' }).click();
    await expect(page.getByText('请注意！', { exact: true })).toBeVisible();
  });
}

test('iDux native table slots render management actions and log status', async ({
  page,
}) => {
  await login(page, 'idux', '/system/user');
  await expect(
    page.getByRole('button', { name: /^详\s*情$/ }).first(),
  ).toBeVisible();
  await navigateWithinApp(page, '/system/role');
  await expect(
    page.getByRole('button', { name: /^权\s*限$/ }).first(),
  ).toBeVisible();
  await navigateWithinApp(page, '/system/menu');
  await expect(
    page.getByRole('button', { name: '添加子项' }).first(),
  ).toBeVisible();
  await navigateWithinApp(page, '/log/login');
  await expect(
    page.getByRole('table').getByText('成功', { exact: true }).first(),
  ).toBeVisible();
  await navigateWithinApp(page, '/log/operation');
  await expect(
    page.getByRole('table').getByText('GET', { exact: true }).first(),
  ).toBeVisible();
  await navigateWithinApp(page, '/log/error');
  await expect(
    page.getByRole('button', { name: /^详\s*情$/ }).first(),
  ).toBeVisible();
});

test('iDux registration renders editable password inputs', async ({ page }) => {
  await page.goto('site-idux/#/register');
  await page
    .getByPlaceholder('请输入用户名', { exact: true })
    .fill('browser_regression_user');
  await page.getByPlaceholder('请输入邮箱').fill('browser@example.com');
  await page.getByPlaceholder('至少 6 位密码').fill('123456');
  await page.getByPlaceholder('请再次输入密码').fill('123456');
  await page.getByRole('checkbox').first().click();
  await page.getByRole('button', { name: /注册/ }).click();
  await expect(page).toHaveURL(/#\/login$/);
  await expect(
    page.getByPlaceholder('请输入密码', { exact: true }),
  ).toBeEditable();
});

for (const framework of frameworks) {
  test.describe(framework, () => {
    test('component examples share space on desktop and fit on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 960 });
      await login(page, framework, '/components');
      await expect(
        page.getByRole('heading', { name: '组件展示' }),
      ).toBeVisible();
      const grid = page.locator('.component-gallery');
      const buttons = grid.getByText('按钮 Button', { exact: true });
      const tags = grid.getByText('标签 Tag', { exact: true });
      const table = grid.getByRole('region', { name: '表格示例' });
      await expect(table).toBeVisible();
      const desktopButtons = await buttons.boundingBox();
      const desktopTags = await tags.boundingBox();
      if (!desktopButtons || !desktopTags)
        throw new Error('Missing example cards');
      expect(Math.abs(desktopTags.y - desktopButtons.y)).toBeLessThan(8);
      expect(desktopTags.x).toBeGreaterThan(desktopButtons.x);

      await page.setViewportSize({ width: 390, height: 844 });
      await expect
        .poll(async () => {
          const first = await buttons.boundingBox();
          const second = await tags.boundingBox();
          return first && second ? second.y - first.y : 0;
        })
        .toBeGreaterThan(0);
      await expect
        .poll(() =>
          grid.evaluate((element) => {
            return element.getBoundingClientRect().right;
          }),
        )
        .toBeLessThanOrEqual(390);
      await expect
        .poll(() =>
          grid.evaluate((element) => element.scrollWidth - element.clientWidth),
        )
        .toBeLessThanOrEqual(1);
    });

    test('portal detail pages keep the heading and content in view on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`site-${framework}/`);
      const menu = page.getByRole('button', { name: '菜单' });
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await menu.click();
      const nav = page.getByRole('navigation', { name: '主导航' });
      await nav.getByRole('link', { name: '常见问题' }).click();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      const title = page.getByRole('heading', { level: 1, name: '常见问题' });
      await expect(title).toBeVisible();
      await expect(title.locator('..')).toHaveClass(/site-hero--compact/);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(390);
    });

    test('guard and requests share canonical session state', async ({
      page,
    }) => {
      await page.addInitScript(() => {
        localStorage.setItem(
          'fast-vue3-user',
          JSON.stringify({ token: 'stale-persisted-token' }),
        );
      });
      await page.goto(`web-${framework}/#/content/article/edit?id=2`);
      await expect(page).toHaveURL(/#\/login\?redirect=/);
      await page.getByPlaceholder(/请输入用户名/).fill('admin');
      await page.getByPlaceholder(/请输入密码/).fill('123456');
      await page.getByRole('button', { name: /^登\s*录$/ }).click();
      await expect(page.getByPlaceholder('请输入文章标题')).toHaveValue(
        secondArticle,
      );
      await page.evaluate(() => localStorage.removeItem('fast-vue3-user'));
      await page.reload();
      await expect(page.getByPlaceholder('请输入文章标题')).toHaveValue(
        secondArticle,
      );
    });

    test('article edit follows query changes and saves the displayed record only', async ({
      page,
    }) => {
      await login(page, framework, '/content/article/edit?id=1');
      const title = page.getByPlaceholder('请输入文章标题');
      await expect(title).toHaveValue(firstArticle);
      await navigateWithinApp(page, '/content/article/edit?id=2');
      await expect(title).toHaveValue(secondArticle);
      await title.fill('第二篇修改后的标题');
      await page.getByRole('button', { name: /^保\s*存$/ }).click();
      await expect(page).toHaveURL(/#\/content\/article$/);
      await expect(
        page.getByText('第二篇修改后的标题', { exact: true }).first(),
      ).toBeVisible();
      await navigateWithinApp(page, '/content/article/edit?id=1');
      await expect(title).toHaveValue(firstArticle);
      await navigateWithinApp(page, '/content/article/edit');
      await expect(title).toHaveValue('');
    });

    test('user and role details follow parameter changes', async ({ page }) => {
      await login(page, framework, '/system/user/1');
      await expect(
        page.getByText('admin', { exact: true }).first(),
      ).toBeVisible();
      await navigateWithinApp(page, '/system/user/2');
      await expect(
        page.getByText('zhangsan', { exact: true }).first(),
      ).toBeVisible();
      await navigateWithinApp(page, '/system/role/1/permission');
      await expect(
        page.getByText('超级管理员', { exact: true }).first(),
      ).toBeVisible();
      await navigateWithinApp(page, '/system/role/2/permission');
      await expect(
        page.getByText('editor', { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /保存配置/ }),
      ).toBeEnabled();
    });

    test('blog details follow parameters and anonymous comments preserve redirect', async ({
      page,
    }) => {
      await page.goto(`site-${framework}/#/blog`);
      await page.getByRole('link', { name: firstBlog }).click();
      await expect(
        page.getByRole('heading', { name: firstBlog }),
      ).toBeVisible();
      await navigateWithinApp(page, '/blog/2');
      await expect(
        page.getByRole('heading', { name: secondBlog }),
      ).toBeVisible();
      await page.getByPlaceholder('分享你的看法…').fill('新的文章评论');
      await page.getByRole('button', { name: '登录后评论' }).click();
      await expect(page).toHaveURL(/#\/login\?redirect=/);
      await page
        .getByPlaceholder('请输入用户名', { exact: true })
        .fill('admin');
      await page.getByPlaceholder('请输入密码', { exact: true }).fill('123456');
      await page.getByRole('button', { name: /^登\s*录$/ }).click();
      await expect(
        page.getByRole('heading', { name: secondBlog }),
      ).toBeVisible();
      await page.getByPlaceholder('分享你的看法…').fill('当前文章的评论');
      await page.getByRole('button', { name: '发布评论' }).click();
      await expect(
        page.getByText('当前文章的评论', { exact: true }),
      ).toBeVisible();
      await navigateWithinApp(page, '/blog/1');
      await expect(
        page.getByRole('heading', { name: firstBlog }),
      ).toBeVisible();
      await expect(
        page.getByText('当前文章的评论', { exact: true }),
      ).toHaveCount(0);
    });

    test('contact form validates and submits without reloading', async ({
      page,
    }) => {
      await page.goto(`site-${framework}/#/contact`);
      const submit = page.getByRole('button', { name: /提交|发送/ });
      await submit.click();
      await expect(page.getByPlaceholder('请输入你的姓名')).toHaveValue('');
      await page.getByPlaceholder('请输入你的姓名').fill('浏览器测试');
      await page.getByPlaceholder('请输入邮箱').fill('browser@example.com');
      await page.getByPlaceholder('请输入咨询主题').fill('产品咨询');
      await page
        .getByPlaceholder('请描述你的需求')
        .fill('验证联系表单的提交流程');
      await submit.click();
      await expect(page.getByPlaceholder('请描述你的需求')).toHaveValue('');
      await expect(page).toHaveURL(/#\/contact$/);
    });
  });
}
