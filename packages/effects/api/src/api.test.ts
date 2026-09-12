import type { RequestClient } from '@fast-vue3/request';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createApi } from './index';

const get = vi.fn();
const post = vi.fn();
const put = vi.fn();
const del = vi.fn();
const request = vi.fn();

const http = { del, get, post, put, request } as unknown as RequestClient;
const api = createApi(http);

describe('createApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps authentication and management calls to the canonical v1 paths', async () => {
    await api.auth.login({ username: 'admin', password: '123456' });
    await api.auth.register({
      email: 'new@example.com',
      password: '123456',
      username: 'new-user',
    });
    await api.user.list({ page: 2, pageSize: 20 });
    await api.role.update(8, { name: '运营' });
    await api.menu.delete(9);

    expect(post).toHaveBeenCalledWith({
      data: { username: 'admin', password: '123456' },
      url: '/auth/login',
    });
    expect(post).toHaveBeenCalledWith({
      data: {
        email: 'new@example.com',
        password: '123456',
        username: 'new-user',
      },
      url: '/auth/register',
    });
    expect(get).toHaveBeenCalledWith({
      params: { page: 2, pageSize: 20 },
      url: '/users',
    });
    expect(put).toHaveBeenCalledWith({
      data: { name: '运营' },
      url: '/roles/8',
    });
    expect(del).toHaveBeenCalledWith({ url: '/menus/9' });
  });

  it('keeps the content compatibility aliases on the same implementation', async () => {
    await api.content.articleDetail(3);
    await api.content.articleList({ keyword: 'Vue' });
    await api.content.categoryList();

    expect(get).toHaveBeenNthCalledWith(1, { url: '/content/articles/3' });
    expect(get).toHaveBeenNthCalledWith(2, {
      params: { keyword: 'Vue' },
      url: '/content/articles',
    });
    expect(get).toHaveBeenNthCalledWith(3, {
      url: '/content/categories',
    });
  });

  it('maps portal reads and contact submission to public endpoints', async () => {
    await api.portal.blogList({ category: '工程实践', page: 1 });
    await api.portal.blog(12);
    await api.portal.blogComments(12);
    await api.portal.contact({
      email: 'dev@example.com',
      name: '开发者',
      message: '希望了解部署方案',
    });

    expect(get).toHaveBeenNthCalledWith(1, {
      params: { category: '工程实践', page: 1 },
      url: '/public/blog',
    });
    expect(get).toHaveBeenNthCalledWith(2, { url: '/public/blog/12' });
    expect(get).toHaveBeenNthCalledWith(3, {
      url: '/public/blog/12/comments',
    });
    expect(post).toHaveBeenCalledWith({
      data: {
        email: 'dev@example.com',
        name: '开发者',
        message: '希望了解部署方案',
      },
      url: '/public/contact',
    });
  });

  it('maps authenticated site interactions outside the public namespace', async () => {
    await api.portal.createBlogComment(7, { content: '很有帮助' });
    await api.portal.checkout({ channel: 'alipay', planId: 2 });

    expect(post).toHaveBeenNthCalledWith(1, {
      data: { content: '很有帮助' },
      url: '/blog/7/comments',
    });
    expect(post).toHaveBeenNthCalledWith(2, {
      data: { channel: 'alipay', planId: 2 },
      url: '/payments/checkout',
    });
  });

  it('maps dashboard, system, log and monitor queries', async () => {
    await api.analytics.overview(30);
    await api.system.noticeList({ page: 2, type: 'notice' });
    await api.log.operation({ module: '用户管理' });
    await api.monitor.server();

    expect(get).toHaveBeenNthCalledWith(1, {
      params: { days: 30 },
      url: '/analytics/overview',
    });
    expect(get).toHaveBeenNthCalledWith(2, {
      params: { page: 2, type: 'notice' },
      url: '/notice/list',
    });
    expect(get).toHaveBeenNthCalledWith(3, {
      params: { module: '用户管理' },
      url: '/log/operation',
    });
    expect(get).toHaveBeenNthCalledWith(4, { url: '/monitor/server' });
  });

  it('sends enterprise idempotency keys, versions and nested routes', async () => {
    await api.project.create({ name: 'Project', code: 'P1' }, 'request-1');
    await api.project.archive(7, 3);
    await api.task.update(12, { status: 'IN_PROGRESS', version: 2 });
    await api.task.comment(12, 'started');
    await api.approval.submit(5, 'request-2');
    await api.department.assign(4, 9);
    await api.notification.readAll();

    expect(post).toHaveBeenCalledWith({
      data: { name: 'Project', code: 'P1' },
      headers: { 'Idempotency-Key': 'request-1' },
      url: '/projects',
    });
    expect(put).toHaveBeenCalledWith({
      params: { version: 3 },
      url: '/projects/7/archive',
    });
    expect(put).toHaveBeenCalledWith({
      data: { status: 'IN_PROGRESS', version: 2 },
      url: '/tasks/12',
    });
    expect(post).toHaveBeenCalledWith({
      data: { content: 'started' },
      url: '/tasks/12/comments',
    });
    expect(post).toHaveBeenCalledWith({
      headers: { 'Idempotency-Key': 'request-2' },
      url: '/approvals/5/submit',
    });
    expect(put).toHaveBeenCalledWith({ url: '/departments/4/members/9' });
    expect(put).toHaveBeenCalledWith({ url: '/notifications/read-all' });
  });
});
