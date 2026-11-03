import type { RoleType } from '@fast-vue3/shared';

import { getRefreshToken } from '@fast-vue3/utils';

import { api } from '../index';

export interface Profile {
  avatar: string;
  role: RoleType;
  userName: string;
}

/**
 * 兼容旧调用方的 userApi：login / logout / getProfile。
 * 实际接口定义见 `@fast-vue3/api`。
 */
export const userApi = {
  login: api.auth.login,
  logout: () => api.auth.logout(getRefreshToken() ?? ''),
  refresh: () => api.auth.refresh(getRefreshToken() ?? ''),
  getProfile: async (): Promise<Profile> => {
    const info = await api.auth.me();
    return {
      avatar: '',
      role: (info.roles[0] as RoleType) ?? '',
      userName: info.nickname || info.username,
    };
  },
};
