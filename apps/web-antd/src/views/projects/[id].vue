<script setup lang="ts">
import type {
  ProjectActivity,
  ProjectItem,
  TaskActivity,
  TaskComment,
  TaskItem,
  TaskPriority,
  TaskStatus,
} from '@/api';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const route = useRoute();
const projectId = computed(() => Number(route.params.id));
const project = ref<null | ProjectItem>(null);
const tasks = ref<TaskItem[]>([]);
const projectActivities = ref<ProjectActivity[]>([]);
const taskActivities = ref<TaskActivity[]>([]);
const comments = ref<TaskComment[]>([]);
const selectedTask = ref<null | TaskItem>(null);
const memberId = ref<number | undefined>(undefined);
const commentText = ref('');
const modalOpen = ref(false);
const editing = ref<null | TaskItem>(null);
const saving = ref(false);
const form = reactive({
  title: '',
  description: '',
  priority: 'MEDIUM' as TaskPriority,
  assigneeId: undefined as number | undefined,
  dueDate: '',
});
const transitions: Record<TaskStatus, TaskStatus[]> = {
  TODO: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['BLOCKED', 'DONE', 'CANCELLED'],
  BLOCKED: ['IN_PROGRESS', 'CANCELLED'],
  DONE: [],
  CANCELLED: [],
};

async function load() {
  if (!Number.isSafeInteger(projectId.value) || projectId.value < 1) return;
  try {
    [project.value, tasks.value, projectActivities.value] = await Promise.all([
      api.project.get(projectId.value),
      api.task.list(projectId.value),
      api.project.activities(projectId.value),
    ]);
    if (editing.value)
      editing.value =
        tasks.value.find((item) => item.id === editing.value?.id) ?? null;
    if (selectedTask.value) await selectTask(selectedTask.value.id);
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function selectTask(id: number) {
  try {
    [selectedTask.value, comments.value, taskActivities.value] =
      await Promise.all([
        api.task.get(id),
        api.task.comments(id),
        api.task.activities(id),
      ]);
  } catch (error) {
    message.error((error as Error).message);
  }
}

function openTask(task?: TaskItem) {
  editing.value = task ?? null;
  Object.assign(
    form,
    task
      ? {
          title: task.title,
          description: task.description ?? '',
          priority: task.priority,
          assigneeId: task.assigneeId,
          dueDate: task.dueDate ?? '',
        }
      : {
          title: '',
          description: '',
          priority: 'MEDIUM',
          assigneeId: undefined,
          dueDate: '',
        },
  );
  modalOpen.value = true;
}

async function saveTask() {
  if (!form.title.trim()) return message.warning('请填写任务标题');
  if (
    editing.value &&
    ((editing.value.assigneeId && !form.assigneeId) ||
      (editing.value.dueDate && !form.dueDate))
  )
    return message.warning('当前服务端接口不支持清空已有负责人或到期日');
  saving.value = true;
  try {
    const data = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      assigneeId: form.assigneeId,
      dueDate: form.dueDate || null,
    };
    await (editing.value
      ? api.task.update(editing.value.id, {
          ...data,
          version: editing.value.version,
        })
      : api.task.create(projectId.value, data));
    modalOpen.value = false;
    await load();
  } catch (error) {
    message.error((error as Error).message);
    await load();
  } finally {
    saving.value = false;
  }
}

async function setStatus(task: TaskItem, status: TaskStatus) {
  try {
    await api.task.update(task.id, { status, version: task.version });
    await load();
  } catch (error) {
    message.error((error as Error).message);
    await load();
  }
}

async function addMember() {
  if (!memberId.value) return;
  try {
    await api.project.addMember(projectId.value, memberId.value);
    memberId.value = undefined;
    await load();
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function removeMember(id: number) {
  try {
    await api.project.removeMember(projectId.value, id);
    await load();
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function addComment() {
  if (!selectedTask.value || !commentText.value.trim()) return;
  try {
    await api.task.comment(selectedTask.value.id, commentText.value.trim());
    commentText.value = '';
    await selectTask(selectedTask.value.id);
  } catch (error) {
    message.error((error as Error).message);
  }
}

onMounted(load);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4">
      {{ project?.name ?? '项目详情' }}
    </ATypographyTitle>
    <AAlert
      v-if="project?.status === 'ARCHIVED'"
      message="项目已归档，只读"
      type="info"
      class="mb-4"
    />
    <ACard title="成员" :bordered="false" class="mb-4">
      <ASpace v-if="project?.status === 'ACTIVE'" class="mb-3">
        <AInputNumber
          v-model:value="memberId"
          :min="1"
          placeholder="用户 ID"
        /><AButton @click="addMember">添加成员</AButton>
      </ASpace>
      <ASpace wrap>
        <ATag v-for="id in project?.memberIds ?? []" :key="id">
          用户 {{ id }}
          <AButton
            v-if="project?.status === 'ACTIVE'"
            type="link"
            size="small"
            @click="removeMember(id)"
          >
            移除
          </AButton>
        </ATag>
      </ASpace>
    </ACard>
    <ACard title="任务" :bordered="false" class="mb-4">
      <template #extra>
        <AButton
          v-if="project?.status === 'ACTIVE'"
          type="primary"
          @click="openTask()"
        >
          新增任务
        </AButton>
      </template>
      <ATable :data-source="tasks" row-key="id">
        <ATableColumn
          title="标题"
          data-index="title"
          key="title"
        /><ATableColumn
          title="优先级"
          data-index="priority"
          key="priority"
        /><ATableColumn
          title="状态"
          data-index="status"
          key="status"
        /><ATableColumn
          title="负责人 ID"
          data-index="assigneeId"
          key="assigneeId"
        /><ATableColumn title="到期日" data-index="dueDate" key="dueDate" />
        <ATableColumn title="操作" key="action">
          <template #default="{ record }">
            <ASpace>
              <AButton type="link" @click="selectTask(record.id)">详情</AButton>
              <AButton
                v-if="
                  project?.status === 'ACTIVE' &&
                  transitions[record.status as TaskStatus].length > 0
                "
                type="link"
                @click="openTask(record)"
              >
                编辑
              </AButton>
              <ADropdown
                v-if="
                  project?.status === 'ACTIVE' &&
                  transitions[record.status as TaskStatus].length > 0
                "
              >
                <AButton type="link">流转</AButton>
                <template #overlay>
                  <AMenu>
                    <AMenuItem
                      v-for="status in transitions[record.status as TaskStatus]"
                      :key="status"
                      @click="setStatus(record, status)"
                    >
                      {{ status }}
                    </AMenuItem>
                  </AMenu>
                </template>
              </ADropdown>
            </ASpace>
          </template>
        </ATableColumn>
      </ATable>
    </ACard>
    <ACard
      v-if="selectedTask"
      :title="`任务：${selectedTask.title}`"
      :bordered="false"
      class="mb-4"
    >
      <p>{{ selectedTask.description || '暂无描述' }}</p>
      <ADivider>评论</ADivider
      ><AList :data-source="comments" bordered>
        <template #renderItem="{ item }">
          <AListItem>
            {{ item.authorId }}：{{ item.content }}
            <span class="ml-2 text-gray-400">{{ item.createdAt }}</span>
          </AListItem>
        </template>
      </AList>
      <ASpace class="mt-3">
        <AInput
          v-model:value="commentText"
          placeholder="添加评论"
          :maxlength="2000"
          style="width: 360px"
        /><AButton type="primary" @click="addComment">发送</AButton>
      </ASpace>
      <ADivider>任务动态</ADivider
      ><AList :data-source="taskActivities" size="small">
        <template #renderItem="{ item }">
          <AListItem>
            {{ item.action }} {{ item.fieldName }} {{ item.oldValue }} →
            {{ item.newValue }} · {{ item.createdAt }}
          </AListItem>
        </template>
      </AList>
    </ACard>
    <ACard title="项目动态" :bordered="false">
      <AList :data-source="projectActivities" size="small">
        <template #renderItem="{ item }">
          <AListItem>
            {{ item.action }} · {{ item.detail }} ·
            {{ item.createdAt }}
          </AListItem>
        </template>
      </AList>
    </ACard>
    <AModal
      v-model:open="modalOpen"
      :title="editing ? '编辑任务' : '新增任务'"
      :confirm-loading="saving"
      @ok="saveTask"
    >
      <AForm :model="form" layout="vertical">
        <AFormItem label="标题" required>
          <AInput v-model:value="form.title" :maxlength="255" />
        </AFormItem>
        <AFormItem label="描述">
          <ATextarea v-model:value="form.description" :maxlength="8000" />
        </AFormItem>
        <AFormItem label="优先级">
          <ASelect v-model:value="form.priority">
            <ASelectOption
              v-for="value in ['LOW', 'MEDIUM', 'HIGH', 'URGENT']"
              :key="value"
              :value="value"
            >
              {{ value }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="负责人用户 ID">
          <AInputNumber v-model:value="form.assigneeId" :min="1" />
        </AFormItem>
        <AFormItem label="到期日">
          <AInput v-model:value="form.dueDate" type="date" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
