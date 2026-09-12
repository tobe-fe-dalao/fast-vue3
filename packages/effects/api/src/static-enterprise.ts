import type {
  ApprovalItem,
  AuditOperationItem,
  DepartmentItem,
  NotificationItem,
  ProjectActivity,
  ProjectItem,
  TaskActivity,
  TaskComment,
  TaskItem,
  TenantItem,
} from './types';

import { createEnterpriseApi } from './modules/enterprise';

type EnterpriseApi = ReturnType<typeof createEnterpriseApi>;

/** In-memory enterprise fixture used by static previews and the Nitro mock. */
export function createStaticEnterpriseApi(): EnterpriseApi {
  const clone = <T>(value: T): T => structuredClone(value);
  const done = <T>(value: T): Promise<T> => Promise.resolve(clone(value));
  const timestamp = () => new Date().toISOString();
  const present = <T>(value: null | T | undefined): value is T =>
    value !== null && value !== undefined;
  const fail = (message: string): never => {
    throw new Error(message);
  };
  let sequence = 20;
  const nextId = () => ++sequence;
  const tenants: TenantItem[] = [
    {
      id: 1,
      name: 'Fast Vue3',
      code: 'default',
      status: 'active',
      plan: 'enterprise',
      expiredAt: null,
      createdAt: timestamp(),
    },
  ];
  const organization = {
    id: 1,
    tenantId: 1,
    name: 'Fast Vue3',
    code: 'FASTVUE3',
    status: 'active' as const,
  };
  const departments: DepartmentItem[] = [
    {
      id: 1,
      parentId: null,
      name: '研发部',
      code: 'RD',
      leaderId: 1,
      sort: 0,
      status: 'active',
      children: [],
    },
  ];
  const departmentMembers = new Map<number, number[]>();
  const projects: ProjectItem[] = [];
  const projectRequests = new Map<string, ProjectItem>();
  const projectActivities: ProjectActivity[] = [];
  const tasks: TaskItem[] = [];
  const taskComments: TaskComment[] = [];
  const taskActivities: TaskActivity[] = [];
  const approvals: ApprovalItem[] = [];
  const approvalSubmissions = new Map<string, ApprovalItem>();
  const notifications: NotificationItem[] = [];
  const audits: AuditOperationItem[] = [];
  const files = new Map<string, string>();

  const flatDepartments = (): DepartmentItem[] => {
    const items: DepartmentItem[] = [];
    const visit = (tree: DepartmentItem[]) => {
      for (const item of tree) {
        items.push(item);
        visit(item.children);
      }
    };
    visit(departments);
    return items;
  };
  const isDescendant = (
    ancestor: DepartmentItem,
    candidate: DepartmentItem,
  ): boolean =>
    ancestor.children.some(
      (child) => child.id === candidate.id || isDescendant(child, candidate),
    );
  const department = (id: number) =>
    flatDepartments().find((item) => item.id === id) ?? fail('部门不存在');
  const project = (id: number) =>
    projects.find((item) => item.id === id) ?? fail('项目不存在');
  const task = (id: number) =>
    tasks.find((item) => item.id === id) ?? fail('任务不存在');
  const approval = (id: number) =>
    approvals.find((item) => item.id === id) ?? fail('审批不存在');
  const checkVersion = (actual: number, supplied: number) => {
    if (actual !== supplied) fail('数据已更新，请刷新后重试');
  };
  const notify = (type: string, title: string, content: string) =>
    notifications.unshift({
      id: nextId(),
      type,
      title,
      content,
      receiverId: 1,
      read: false,
      createdAt: timestamp(),
    });
  const recordProject = (projectId: number, action: string, detail: string) =>
    projectActivities.unshift({
      id: nextId(),
      projectId,
      actorId: 1,
      action,
      detail,
      createdAt: timestamp(),
    });
  const recordTask = (
    taskId: number,
    action: string,
    fieldName: null | string,
    oldValue: null | string,
    newValue: null | string,
  ) =>
    taskActivities.unshift({
      id: nextId(),
      taskId,
      actorId: 1,
      action,
      fieldName,
      oldValue,
      newValue,
      createdAt: timestamp(),
    });
  const transitions: Record<TaskItem['status'], TaskItem['status'][]> = {
    TODO: ['IN_PROGRESS', 'CANCELLED'],
    IN_PROGRESS: ['BLOCKED', 'DONE', 'CANCELLED'],
    BLOCKED: ['IN_PROGRESS', 'CANCELLED'],
    DONE: [],
    CANCELLED: [],
  };

  return {
    tenant: {
      list: () => done(tenants),
      create: (data) => {
        const item: TenantItem = {
          id: nextId(),
          name: data.name,
          code: data.code,
          plan: data.plan,
          status: 'active',
          expiredAt: data.expiredAt ?? null,
          createdAt: timestamp(),
        };
        tenants.push(item);
        return done(item);
      },
      update: (id, data) => {
        const item =
          tenants.find((value) => value.id === id) ?? fail('租户不存在');
        Object.assign(item, data);
        return done(item);
      },
    },
    organization: {
      current: () => done(organization),
      update: (_id, data) => {
        Object.assign(organization, data);
        return done(organization);
      },
    },
    department: {
      tree: () => done(departments),
      members: (id) => {
        department(id);
        return done(
          (departmentMembers.get(id) ?? []).map((userId) => ({
            id: userId,
            username: `user${userId}`,
            nickname: `用户 ${userId}`,
            status: 'active',
          })),
        );
      },
      create: (data) => {
        const item: DepartmentItem = {
          id: nextId(),
          parentId: data.parentId ?? null,
          name: data.name,
          code: data.code,
          leaderId: data.leaderId ?? null,
          sort: data.sort ?? 0,
          status: data.status ?? 'active',
          children: [],
        };
        if (item.parentId) department(item.parentId).children.push(item);
        else departments.push(item);
        return done(item);
      },
      update: (id, data) => {
        const item = department(id);
        const nextParentId = data.parentId ?? null;
        if (nextParentId !== item.parentId) {
          const nextParent = nextParentId ? department(nextParentId) : null;
          if (
            nextParentId === id ||
            (nextParent && isDescendant(item, nextParent))
          )
            fail('部门不能移动到自身或子部门');
          const oldSiblings = item.parentId
            ? department(item.parentId).children
            : departments;
          oldSiblings.splice(oldSiblings.indexOf(item), 1);
          const newSiblings = nextParent?.children ?? departments;
          newSiblings.push(item);
        }
        Object.assign(item, data, {
          parentId: nextParentId,
          leaderId: data.leaderId ?? null,
        });
        return done(item);
      },
      assign: (id, userId) => {
        department(id);
        for (const [otherId, assigned] of departmentMembers) {
          if (otherId !== id)
            departmentMembers.set(
              otherId,
              assigned.filter((value) => value !== userId),
            );
        }
        const members = departmentMembers.get(id) ?? [];
        if (!members.includes(userId)) members.push(userId);
        departmentMembers.set(id, members);
        return done(undefined);
      },
      removeMember: (id, userId) => {
        department(id);
        departmentMembers.set(
          id,
          (departmentMembers.get(id) ?? []).filter((value) => value !== userId),
        );
        return done(undefined);
      },
      delete: (id) => {
        const item = department(id);
        if (item.children.length > 0) fail('请先删除子部门');
        const parent = item.parentId
          ? department(item.parentId).children
          : departments;
        parent.splice(parent.indexOf(item), 1);
        return done(undefined);
      },
    },
    project: {
      list: () => done(projects),
      get: (id) => done(project(id)),
      activities: (id) =>
        done(projectActivities.filter((item) => item.projectId === id)),
      create: (data, key) => {
        const replay = projectRequests.get(key);
        if (replay) return done(replay);
        const item: ProjectItem = {
          id: nextId(),
          name: data.name,
          code: data.code,
          description: data.description ?? null,
          ownerId: 1,
          status: 'ACTIVE',
          startDate: data.startDate ?? null,
          endDate: data.endDate ?? null,
          version: 0,
          memberIds: [1],
          createdAt: timestamp(),
          updatedAt: timestamp(),
        };
        projects.unshift(item);
        projectRequests.set(key, clone(item));
        recordProject(item.id, 'PROJECT_CREATED', item.name);
        return done(item);
      },
      update: (id, data) => {
        const item = project(id);
        if (item.status === 'ARCHIVED') fail('归档项目不能编辑');
        checkVersion(item.version, data.version);
        if (present(data.name)) item.name = data.name;
        if (present(data.description)) item.description = data.description;
        if (present(data.startDate)) item.startDate = data.startDate;
        if (present(data.endDate)) item.endDate = data.endDate;
        item.version++;
        item.updatedAt = timestamp();
        recordProject(id, 'PROJECT_UPDATED', item.name);
        return done(item);
      },
      archive: (id, version) => {
        const item = project(id);
        checkVersion(item.version, version);
        item.status = 'ARCHIVED';
        item.version++;
        recordProject(id, 'PROJECT_ARCHIVED', item.name);
        return done(item);
      },
      addMember: (id, userId) => {
        const item = project(id);
        if (item.status === 'ARCHIVED') fail('归档项目不能变更成员');
        if (!item.memberIds.includes(userId)) item.memberIds.push(userId);
        recordProject(id, 'PROJECT_MEMBER_ADDED', String(userId));
        return done(undefined);
      },
      removeMember: (id, userId) => {
        const item = project(id);
        if (item.status === 'ARCHIVED') fail('归档项目不能变更成员');
        if (item.ownerId === userId) fail('项目负责人不能被移出项目');
        if (
          tasks.some(
            (value) =>
              value.projectId === id &&
              value.assigneeId === userId &&
              !['CANCELLED', 'DONE'].includes(value.status),
          )
        )
          fail('该成员仍有未完成任务');
        item.memberIds = item.memberIds.filter((value) => value !== userId);
        recordProject(id, 'PROJECT_MEMBER_REMOVED', String(userId));
        return done(undefined);
      },
    },
    task: {
      list: (projectId) =>
        done(tasks.filter((item) => item.projectId === projectId)),
      get: (id) => done(task(id)),
      create: (projectId, data) => {
        const parent = project(projectId);
        if (parent.status === 'ARCHIVED') fail('归档项目不能新增任务');
        if (data.assigneeId && !parent.memberIds.includes(data.assigneeId))
          fail('用户不是项目成员');
        const item: TaskItem = {
          id: nextId(),
          projectId,
          title: data.title,
          description: data.description ?? null,
          assigneeId: data.assigneeId ?? null,
          reporterId: 1,
          priority: data.priority ?? 'MEDIUM',
          status: 'TODO',
          dueDate: data.dueDate ?? null,
          version: 0,
          createdAt: timestamp(),
          updatedAt: timestamp(),
        };
        tasks.unshift(item);
        recordTask(item.id, 'TASK_CREATED', null, null, item.title);
        if (item.assigneeId) notify('TASK_ASSIGNED', '新任务', item.title);
        return done(item);
      },
      update: (id, data) => {
        const item = task(id);
        checkVersion(item.version, data.version);
        if (['CANCELLED', 'DONE'].includes(item.status))
          fail('已完成或已取消任务不能编辑');
        if (
          data.assigneeId &&
          !project(item.projectId).memberIds.includes(data.assigneeId)
        )
          fail('用户不是项目成员');
        const oldAssigneeId = item.assigneeId;
        if (data.status && data.status !== item.status) {
          if (!transitions[item.status].includes(data.status))
            fail(`${item.status} 不能转换为 ${data.status}`);
          recordTask(id, 'STATUS_CHANGED', 'status', item.status, data.status);
        }
        if (present(data.title)) item.title = data.title;
        if (present(data.description)) item.description = data.description;
        if (present(data.assigneeId)) item.assigneeId = data.assigneeId;
        if (present(data.priority)) item.priority = data.priority;
        if (present(data.dueDate)) item.dueDate = data.dueDate;
        if (present(data.status)) item.status = data.status;
        item.version++;
        item.updatedAt = timestamp();
        if (data.assigneeId && data.assigneeId !== oldAssigneeId)
          notify('TASK_ASSIGNED', '任务指派', item.title);
        return done(item);
      },
      comments: (id) => done(taskComments.filter((item) => item.taskId === id)),
      comment: (id, content) => {
        task(id);
        const item = {
          id: nextId(),
          taskId: id,
          authorId: 1,
          content,
          createdAt: timestamp(),
        };
        taskComments.push(item);
        recordTask(id, 'COMMENT_ADDED', null, null, String(item.id));
        return done(item);
      },
      activities: (id) =>
        done(taskActivities.filter((item) => item.taskId === id)),
    },
    approval: {
      list: () => done(approvals),
      create: (data) => {
        const item: ApprovalItem = {
          id: nextId(),
          type: data.type,
          title: data.title,
          businessKey: data.businessKey ?? null,
          applicantId: 1,
          departmentId: data.departmentId ?? null,
          status: 'DRAFT',
          currentStep: 0,
          payload: data.payload ?? null,
          version: 0,
          steps: [],
          createdAt: timestamp(),
          updatedAt: timestamp(),
        };
        approvals.unshift(item);
        return done(item);
      },
      submit: (id, key) => {
        const replay = approvalSubmissions.get(`${id}:${key}`);
        if (replay) return done(replay);
        const item = approval(id);
        if (item.status !== 'DRAFT') fail('当前状态不能提交');
        const managerId = item.departmentId
          ? department(item.departmentId).leaderId
          : null;
        if (managerId === null) fail('部门必须配置负责人');
        item.status = 'PENDING';
        item.currentStep = 1;
        item.steps = [
          {
            id: nextId(),
            stepOrder: 1,
            approverType: 'DEPARTMENT_MANAGER',
            approverId: managerId,
            status: 'PENDING',
            actedAt: null,
          },
          {
            id: nextId(),
            stepOrder: 2,
            approverType: 'ADMIN',
            approverId: null,
            status: 'WAITING',
            actedAt: null,
          },
        ];
        notify('APPROVAL', '待审批', item.title);
        approvalSubmissions.set(`${id}:${key}`, clone(item));
        return done(item);
      },
      approve: (id, _comment) => {
        const item = approval(id);
        if (item.status !== 'PENDING') fail('当前状态不能审批');
        const step = item.steps.find(
          (value) => value.stepOrder === item.currentStep,
        );
        if (!step) return Promise.reject(new Error('审批步骤不存在'));
        step.status = 'APPROVED';
        step.actedAt = timestamp();
        if (item.currentStep === 1) {
          item.currentStep = 2;
          const next = item.steps[1];
          if (next) next.status = 'PENDING';
        } else item.status = 'APPROVED';
        return done(item);
      },
      reject: (id, _comment) => {
        const item = approval(id);
        if (item.status !== 'PENDING') fail('当前状态不能驳回');
        item.status = 'REJECTED';
        return done(item);
      },
      cancel: (id) => {
        const item = approval(id);
        if (!['DRAFT', 'PENDING'].includes(item.status))
          fail('当前状态不能撤销');
        item.status = 'CANCELLED';
        return done(item);
      },
    },
    notification: {
      list: () => done(notifications),
      unreadCount: () =>
        done({ count: notifications.filter((item) => !item.read).length }),
      read: (id) => {
        const item =
          notifications.find((value) => value.id === id) ?? fail('通知不存在');
        item.read = true;
        return done(undefined);
      },
      readAll: () => {
        notifications.forEach((item) => {
          item.read = true;
        });
        return done(undefined);
      },
    },
    audit: { operations: () => done(audits) },
    file: {
      upload: (file) => {
        const key = `1/${crypto.randomUUID()}`;
        const url = URL.createObjectURL(file);
        files.set(key, url);
        return done({
          key,
          originalName: file.name,
          contentType: file.type,
          size: file.size,
          url,
        });
      },
      download: async (tenantId, filename) => {
        const url = files.get(`${tenantId}/${filename}`) ?? fail('文件不存在');
        const response = await fetch(url);
        return response.blob();
      },
      delete: (tenantId, filename) => {
        const key = `${tenantId}/${filename}`;
        const url = files.get(key);
        if (url) URL.revokeObjectURL(url);
        files.delete(key);
        return done(undefined);
      },
    },
  };
}
