import type { RequestClient } from '@fast-vue3/request';

import { createAnalyticsApi } from './modules/analytics';
import { createAuthApi } from './modules/auth';
import { createContentApi } from './modules/content';
import { createEnterpriseApi } from './modules/enterprise';
import { createLogApi } from './modules/log';
import { createMenuApi } from './modules/menu';
import { createMonitorApi } from './modules/monitor';
import { createPermissionApi } from './modules/permission';
import { createPortalApi } from './modules/portal';
import { createRoleApi } from './modules/role';
import { createSystemApi } from './modules/system';
import { createUserApi } from './modules/user';

/**
 * 按业务域组织的全部接口。
 *
 * 各 app 用自己的 http 客户端（baseURL 由 VITE_APP_API_BASEURL 决定）调用一次，
 * 即可在任意页面复用同一套接口定义，切换 mock / 真实后端无需改动业务代码。
 */
export function createApi(http: RequestClient) {
  const enterprise = createEnterpriseApi(http);
  return {
    ...enterprise,
    analytics: createAnalyticsApi(http),
    auth: createAuthApi(http),
    content: createContentApi(http),
    log: createLogApi(http),
    menu: createMenuApi(http),
    monitor: createMonitorApi(http),
    permission: createPermissionApi(http),
    portal: createPortalApi(http),
    role: createRoleApi(http),
    system: createSystemApi(http),
    user: createUserApi(http),
  };
}

export type Api = ReturnType<typeof createApi>;

export { createStaticEnterpriseApi } from './static-enterprise';
export { createStaticMockApi } from './static-mock';

export * from './types';
