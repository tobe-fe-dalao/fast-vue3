export default defineEventHandler(async (event) => {
  event.node.res.setHeader(
    'Access-Control-Allow-Origin',
    event.headers.get('Origin') ?? '*',
  );
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content.';
    return 'OK';
  }

  const path = event.path.split('?')[0] ?? '';
  const isPublic =
    path.startsWith('/api/v1/public/') ||
    path === '/api/v1/auth/login' ||
    path === '/api/v1/auth/register' ||
    path === '/api/v1/auth/refresh';
  if (!path.startsWith('/api/v1/') || isPublic) return;

  const authorization = getHeader(event, 'authorization');
  if (!authorization?.startsWith('Bearer mock-access-token-')) {
    setResponseStatus(event, 401);
    return {
      code: 401,
      data: null,
      message: '未登录或登录已过期',
    };
  }

  const requiresOperatingDataPermission =
    path === '/api/v1/analytics/overview' || path === '/api/v1/data/overview';
  const username = authorization.replace(/^Bearer mock-access-token-/, '');
  const requiresEnterprisePermission = [
    '/api/v1/tenants',
    '/api/v1/organizations',
    '/api/v1/departments',
    '/api/v1/projects',
    '/api/v1/tasks',
    '/api/v1/approvals',
    '/api/v1/audit',
    '/api/v1/files',
  ].some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  if (
    (requiresOperatingDataPermission || requiresEnterprisePermission) &&
    username !== 'admin'
  ) {
    setResponseStatus(event, 403);
    return {
      code: 403,
      data: null,
      message: '无权访问该资源',
    };
  }
});
