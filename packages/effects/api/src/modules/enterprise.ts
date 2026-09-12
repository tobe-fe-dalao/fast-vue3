import type { RequestClient } from '@fast-vue3/request';

import type {
  ApprovalItem,
  AuditOperationItem,
  CreateApprovalParams,
  CreateProjectParams,
  CreateTaskParams,
  CreateTenantParams,
  DepartmentItem,
  DepartmentMember,
  NotificationItem,
  OrganizationItem,
  ProjectActivity,
  ProjectItem,
  SaveDepartmentParams,
  StoredFile,
  TaskActivity,
  TaskComment,
  TaskItem,
  TenantItem,
} from '../types';

export function createEnterpriseApi(http: RequestClient) {
  return {
    tenant: {
      list: () => http.get<TenantItem[]>({ url: '/tenants' }),
      create: (data: CreateTenantParams) =>
        http.post<TenantItem>({ data, url: '/tenants' }),
      update: (
        id: number,
        data: Partial<
          Pick<TenantItem, 'expiredAt' | 'name' | 'plan' | 'status'>
        >,
      ) => http.put<TenantItem>({ data, url: `/tenants/${id}` }),
    },
    organization: {
      current: () =>
        http.get<OrganizationItem>({ url: '/organizations/current' }),
      update: (
        id: number,
        data: Partial<Pick<OrganizationItem, 'name' | 'status'>>,
      ) => http.put<OrganizationItem>({ data, url: `/organizations/${id}` }),
    },
    department: {
      tree: () => http.get<DepartmentItem[]>({ url: '/departments' }),
      members: (id: number) =>
        http.get<DepartmentMember[]>({ url: `/departments/${id}/members` }),
      create: (data: SaveDepartmentParams) =>
        http.post<DepartmentItem>({ data, url: '/departments' }),
      update: (id: number, data: SaveDepartmentParams) =>
        http.put<DepartmentItem>({ data, url: `/departments/${id}` }),
      assign: (id: number, userId: number) =>
        http.put<undefined>({ url: `/departments/${id}/members/${userId}` }),
      removeMember: (id: number, userId: number) =>
        http.del<undefined>({ url: `/departments/${id}/members/${userId}` }),
      delete: (id: number) =>
        http.del<undefined>({ url: `/departments/${id}` }),
    },
    project: {
      list: () => http.get<ProjectItem[]>({ url: '/projects' }),
      get: (id: number) => http.get<ProjectItem>({ url: `/projects/${id}` }),
      activities: (id: number) =>
        http.get<ProjectActivity[]>({ url: `/projects/${id}/activities` }),
      create: (data: CreateProjectParams, key: string) =>
        http.post<ProjectItem>({
          data,
          headers: { 'Idempotency-Key': key },
          url: '/projects',
        }),
      update: (
        id: number,
        data: Partial<Omit<CreateProjectParams, 'code'>> & { version: number },
      ) => http.put<ProjectItem>({ data, url: `/projects/${id}` }),
      archive: (id: number, version: number) =>
        http.put<ProjectItem>({
          params: { version },
          url: `/projects/${id}/archive`,
        }),
      addMember: (id: number, userId: number) =>
        http.put<undefined>({ url: `/projects/${id}/members/${userId}` }),
      removeMember: (id: number, userId: number) =>
        http.del<undefined>({ url: `/projects/${id}/members/${userId}` }),
    },
    task: {
      list: (projectId: number) =>
        http.get<TaskItem[]>({ url: `/projects/${projectId}/tasks` }),
      get: (id: number) => http.get<TaskItem>({ url: `/tasks/${id}` }),
      create: (projectId: number, data: CreateTaskParams) =>
        http.post<TaskItem>({ data, url: `/projects/${projectId}/tasks` }),
      update: (
        id: number,
        data: Partial<CreateTaskParams> & {
          status?: TaskItem['status'];
          version: number;
        },
      ) => http.put<TaskItem>({ data, url: `/tasks/${id}` }),
      comments: (id: number) =>
        http.get<TaskComment[]>({ url: `/tasks/${id}/comments` }),
      comment: (id: number, content: string) =>
        http.post<TaskComment>({
          data: { content },
          url: `/tasks/${id}/comments`,
        }),
      activities: (id: number) =>
        http.get<TaskActivity[]>({ url: `/tasks/${id}/activities` }),
    },
    approval: {
      list: () => http.get<ApprovalItem[]>({ url: '/approvals' }),
      create: (data: CreateApprovalParams) =>
        http.post<ApprovalItem>({ data, url: '/approvals' }),
      submit: (id: number, key: string) =>
        http.post<ApprovalItem>({
          headers: { 'Idempotency-Key': key },
          url: `/approvals/${id}/submit`,
        }),
      approve: (id: number, comment = '') =>
        http.post<ApprovalItem>({
          data: { comment },
          url: `/approvals/${id}/approve`,
        }),
      reject: (id: number, comment = '') =>
        http.post<ApprovalItem>({
          data: { comment },
          url: `/approvals/${id}/reject`,
        }),
      cancel: (id: number) =>
        http.post<ApprovalItem>({ url: `/approvals/${id}/cancel` }),
    },
    notification: {
      list: () => http.get<NotificationItem[]>({ url: '/notifications' }),
      unreadCount: () =>
        http.get<{ count: number }>({ url: '/notifications/unread-count' }),
      read: (id: number) =>
        http.put<undefined>({ url: `/notifications/${id}/read` }),
      readAll: () => http.put<undefined>({ url: '/notifications/read-all' }),
    },
    audit: {
      operations: () =>
        http.get<AuditOperationItem[]>({ url: '/audit/operations' }),
    },
    file: {
      upload: (file: File) => {
        const data = new FormData();
        data.append('file', file);
        return http.post<StoredFile>({ data, url: '/files' });
      },
      download: (tenantId: number, filename: string) =>
        http.download({
          url: `/files/${tenantId}/${encodeURIComponent(filename)}`,
        }),
      delete: (tenantId: number, filename: string) =>
        http.del<undefined>({
          url: `/files/${tenantId}/${encodeURIComponent(filename)}`,
        }),
    },
  };
}
