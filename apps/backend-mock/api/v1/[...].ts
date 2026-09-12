import type {
  CreateApprovalParams,
  CreateProjectParams,
  CreateTaskParams,
  CreateTenantParams,
  SaveDepartmentParams,
} from '@fast-vue3/api';

import { createStaticEnterpriseApi } from '@fast-vue3/api';

import { MOCK_USERS } from '~/utils/mock-data';
import { useResponseError, useResponseSuccess } from '~/utils/response';

const enterprise = createStaticEnterpriseApi();
const files = new Map<
  string,
  { bytes: Buffer; contentType: string; originalName: string }
>();

export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0] ?? '';
  const parts = path.replace(/^\/api\/v1\//, '').split('/');
  const [domain, idText, action, detail] = parts;
  const id = Number(idText);
  const method = event.method;
  const ok = <T>(value: T) => useResponseSuccess(value);

  try {
    if (domain === 'tenants') {
      if (method === 'GET' && !idText)
        return ok(await enterprise.tenant.list());
      if (method === 'POST' && !idText)
        return ok(
          await enterprise.tenant.create(
            await readBody<CreateTenantParams>(event),
          ),
        );
      if (method === 'PUT' && idText)
        return ok(await enterprise.tenant.update(id, await readBody(event)));
    }
    if (domain === 'organizations') {
      if (method === 'GET' && idText === 'current')
        return ok(await enterprise.organization.current());
      if (method === 'PUT' && idText)
        return ok(
          await enterprise.organization.update(id, await readBody(event)),
        );
    }
    if (domain === 'departments') {
      if (method === 'GET' && !idText)
        return ok(await enterprise.department.tree());
      if (method === 'GET' && action === 'members' && !detail)
        return ok(await enterprise.department.members(id));
      if (method === 'POST' && !idText)
        return ok(
          await enterprise.department.create(
            await readBody<SaveDepartmentParams>(event),
          ),
        );
      if (method === 'PUT' && action === 'members' && detail)
        return ok(await enterprise.department.assign(id, Number(detail)));
      if (method === 'DELETE' && action === 'members' && detail)
        return ok(await enterprise.department.removeMember(id, Number(detail)));
      if (method === 'PUT' && idText && !action)
        return ok(
          await enterprise.department.update(
            id,
            await readBody<SaveDepartmentParams>(event),
          ),
        );
      if (method === 'DELETE' && idText && !action)
        return ok(await enterprise.department.delete(id));
    }
    if (domain === 'projects') {
      if (method === 'GET' && !idText)
        return ok(await enterprise.project.list());
      if (method === 'POST' && !idText) {
        const key = getHeader(event, 'idempotency-key');
        if (!key) throw new Error('缺少 Idempotency-Key');
        return ok(
          await enterprise.project.create(
            await readBody<CreateProjectParams>(event),
            key,
          ),
        );
      }
      if (method === 'GET' && idText && !action)
        return ok(await enterprise.project.get(id));
      if (method === 'GET' && action === 'activities')
        return ok(await enterprise.project.activities(id));
      if (method === 'GET' && action === 'tasks')
        return ok(await enterprise.task.list(id));
      if (method === 'POST' && action === 'tasks')
        return ok(
          await enterprise.task.create(
            id,
            await readBody<CreateTaskParams>(event),
          ),
        );
      if (method === 'PUT' && action === 'archive')
        return ok(
          await enterprise.project.archive(id, Number(getQuery(event).version)),
        );
      if (method === 'PUT' && action === 'members' && detail)
        return ok(await enterprise.project.addMember(id, Number(detail)));
      if (method === 'DELETE' && action === 'members' && detail)
        return ok(await enterprise.project.removeMember(id, Number(detail)));
      if (method === 'PUT' && idText && !action)
        return ok(await enterprise.project.update(id, await readBody(event)));
    }
    if (domain === 'tasks' && idText) {
      if (method === 'GET' && !action) return ok(await enterprise.task.get(id));
      if (method === 'PUT' && !action)
        return ok(await enterprise.task.update(id, await readBody(event)));
      if (method === 'GET' && action === 'comments')
        return ok(await enterprise.task.comments(id));
      if (method === 'POST' && action === 'comments') {
        const body = await readBody<{ content: string }>(event);
        return ok(await enterprise.task.comment(id, body.content));
      }
      if (method === 'GET' && action === 'activities')
        return ok(await enterprise.task.activities(id));
    }
    if (domain === 'approvals') {
      if (method === 'GET' && !idText)
        return ok(await enterprise.approval.list());
      if (method === 'POST' && !idText)
        return ok(
          await enterprise.approval.create(
            await readBody<CreateApprovalParams>(event),
          ),
        );
      if (method === 'POST' && action === 'submit') {
        const key = getHeader(event, 'idempotency-key');
        if (!key) throw new Error('缺少 Idempotency-Key');
        return ok(await enterprise.approval.submit(id, key));
      }
      if (method === 'POST' && action === 'approve') {
        const body = await readBody<{ comment?: string }>(event);
        return ok(await enterprise.approval.approve(id, body.comment));
      }
      if (method === 'POST' && action === 'reject') {
        const body = await readBody<{ comment?: string }>(event);
        return ok(await enterprise.approval.reject(id, body.comment));
      }
      if (method === 'POST' && action === 'cancel')
        return ok(await enterprise.approval.cancel(id));
    }
    if (domain === 'notifications') {
      const username = getHeader(event, 'authorization')?.replace(
        /^Bearer mock-access-token-/,
        '',
      );
      const receiverId = MOCK_USERS.find(
        (user) => user.username === username,
      )?.id;
      const allNotifications = await enterprise.notification.list();
      const own = allNotifications.filter(
        (item) => item.receiverId === receiverId,
      );
      if (method === 'GET' && !idText) return ok(own);
      if (method === 'GET' && idText === 'unread-count')
        return ok({ count: own.filter((item) => !item.read).length });
      if (method === 'PUT' && idText === 'read-all') {
        await Promise.all(
          own.map((item) => enterprise.notification.read(item.id)),
        );
        return ok(undefined);
      }
      if (method === 'PUT' && action === 'read') {
        if (!own.some((item) => item.id === id)) throw new Error('通知不存在');
        return ok(await enterprise.notification.read(id));
      }
    }
    if (domain === 'audit' && idText === 'operations' && method === 'GET')
      return ok(await enterprise.audit.operations());
    if (domain === 'files') {
      if (method === 'POST' && !idText) {
        const parts = await readMultipartFormData(event);
        const part = parts?.find((value) => value.name === 'file');
        if (!part?.filename) throw new Error('请选择文件');
        const key = `1/${crypto.randomUUID()}`;
        files.set(key, {
          bytes: part.data,
          contentType: part.type ?? 'application/octet-stream',
          originalName: part.filename,
        });
        return ok({
          key,
          originalName: part.filename,
          contentType: part.type ?? 'application/octet-stream',
          size: part.data.length,
          url: `/api/v1/files/${key}`,
        });
      }
      if (idText && action) {
        const key = `${idText}/${action}`;
        if (method === 'DELETE') {
          files.delete(key);
          return ok(undefined);
        }
        if (method === 'GET') {
          const file = files.get(key);
          if (!file) throw new Error('文件不存在');
          setHeader(event, 'Content-Type', file.contentType);
          setHeader(
            event,
            'Content-Disposition',
            `inline; filename="${file.originalName.replaceAll('"', '')}"`,
          );
          return file.bytes;
        }
      }
    }
  } catch (error) {
    const message = (error as Error).message;
    const status = message.includes('数据已更新') ? 409 : 400;
    setResponseStatus(event, status);
    return useResponseError(message, status);
  }

  setResponseStatus(event, 404);
  return useResponseError(`接口不存在: ${path}`, 404);
});
