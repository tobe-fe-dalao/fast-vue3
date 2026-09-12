import { MOCK_USERS } from '~/utils/mock-data';
import { permissions } from '~/utils/permissions';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler((event) => {
  const username = getHeader(event, 'authorization')?.replace(
    /^Bearer mock-access-token-/,
    '',
  );
  const user =
    MOCK_USERS.find((item) => item.username === username) ?? MOCK_USERS[0];
  return useResponseSuccess({
    id: user.id,
    tenantId: 1,
    username: user.username,
    nickname: user.realName,
    roles: user.roles,
    permissions:
      user.username === 'admin'
        ? permissions.map((permission) => permission.code)
        : ['user:list'],
  });
});
