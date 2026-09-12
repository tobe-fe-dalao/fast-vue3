<script setup lang="ts">
import type {
  DepartmentItem,
  DepartmentMember,
  SaveDepartmentParams,
} from '@/api';

import { onMounted, reactive, ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const saving = ref(false);
const departments = ref<DepartmentItem[]>([]);
const members = ref<DepartmentMember[]>([]);
const selected = ref<DepartmentItem | null>(null);
const editing = ref<DepartmentItem | null>(null);
const modalOpen = ref(false);
const memberUserId = ref<number | undefined>(undefined);
const form = reactive<
  Omit<SaveDepartmentParams, 'leaderId' | 'parentId'> & {
    leaderId?: number;
    parentId?: number;
  }
>({
  name: '',
  code: '',
  parentId: undefined,
  leaderId: undefined,
  sort: 0,
  status: 'active',
});

function findDepartment(
  tree: DepartmentItem[],
  id: number,
): DepartmentItem | null {
  for (const item of tree) {
    if (item.id === id) return item;
    const found = findDepartment(item.children ?? [], id);
    if (found) return found;
  }
  return null;
}

async function load() {
  loading.value = true;
  try {
    departments.value = await api.department.tree();
    if (selected.value) {
      selected.value = findDepartment(departments.value, selected.value.id);
      members.value = selected.value
        ? await api.department.members(selected.value.id)
        : [];
    }
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

async function selectDepartment(item: DepartmentItem) {
  selected.value = item;
  try {
    members.value = await api.department.members(item.id);
  } catch (error) {
    message.error((error as Error).message);
  }
}

function openModal(item?: DepartmentItem, parent?: DepartmentItem) {
  editing.value = item ?? null;
  Object.assign(
    form,
    item
      ? {
          name: item.name,
          code: item.code,
          parentId: item.parentId ?? undefined,
          leaderId: item.leaderId ?? undefined,
          sort: item.sort,
          status: item.status,
        }
      : {
          name: '',
          code: '',
          parentId: parent?.id,
          leaderId: undefined,
          sort: 0,
          status: 'active',
        },
  );
  modalOpen.value = true;
}

async function save() {
  if (!form.name.trim() || !form.code.trim())
    return message.warning('请填写部门名称和编码');
  saving.value = true;
  try {
    await (editing.value
      ? api.department.update(editing.value.id, { ...form })
      : api.department.create({ ...form }));
    modalOpen.value = false;
    message.success('已保存');
    await load();
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    saving.value = false;
  }
}

async function remove(item: DepartmentItem) {
  try {
    await api.department.delete(item.id);
    if (selected.value?.id === item.id) {
      selected.value = null;
      members.value = [];
    }
    message.success('已删除');
    await load();
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function assignMember() {
  if (!selected.value || !memberUserId.value) return;
  try {
    await api.department.assign(selected.value.id, memberUserId.value);
    memberUserId.value = undefined;
    await selectDepartment(selected.value);
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function removeMember(userId: number) {
  if (!selected.value) return;
  try {
    await api.department.removeMember(selected.value.id, userId);
    await selectDepartment(selected.value);
  } catch (error) {
    message.error((error as Error).message);
  }
}

onMounted(load);
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">部门管理</ATypographyTitle>
      <AButton type="primary" @click="openModal()">新增部门</AButton>
    </div>
    <ACard :bordered="false">
      <ATable
        :data-source="departments"
        :loading="loading"
        :pagination="false"
        row-key="id"
        :default-expand-all-rows="true"
      >
        <ATableColumn title="部门" data-index="name" key="name" />
        <ATableColumn title="编码" data-index="code" key="code" />
        <ATableColumn title="负责人 ID" data-index="leaderId" key="leaderId" />
        <ATableColumn title="状态" data-index="status" key="status" />
        <ATableColumn title="操作" key="action">
          <template #default="{ record }">
            <ASpace>
              <AButton type="link" @click="selectDepartment(record)">
                成员
              </AButton>
              <AButton type="link" @click="openModal(undefined, record)">
                新增子部门
              </AButton>
              <AButton type="link" @click="openModal(record)">编辑</AButton>
              <APopconfirm title="确定删除该部门？" @confirm="remove(record)">
                <AButton type="link" danger>删除</AButton>
              </APopconfirm>
            </ASpace>
          </template>
        </ATableColumn>
      </ATable>
    </ACard>
    <ACard
      v-if="selected"
      :title="`${selected.name} · 成员`"
      :bordered="false"
      class="mt-4"
    >
      <ASpace class="mb-4">
        <AInputNumber
          v-model:value="memberUserId"
          :min="1"
          placeholder="用户 ID"
        />
        <AButton type="primary" @click="assignMember">加入部门</AButton>
      </ASpace>
      <AList :data-source="members" bordered>
        <template #renderItem="{ item }">
          <AListItem>
            {{ item.nickname || item.username }}（{{ item.username }}）
            <template #actions>
              <APopconfirm
                title="移出该部门？"
                @confirm="removeMember(item.id)"
              >
                <AButton type="link" danger>移出</AButton>
              </APopconfirm>
            </template>
          </AListItem>
        </template>
      </AList>
    </ACard>
    <AModal
      v-model:open="modalOpen"
      :title="editing ? '编辑部门' : '新增部门'"
      :confirm-loading="saving"
      @ok="save"
    >
      <AForm :model="form" layout="vertical">
        <AFormItem label="部门名称" required>
          <AInput v-model:value="form.name" :maxlength="128" />
        </AFormItem>
        <AFormItem label="部门编码" required>
          <AInput v-model:value="form.code" :maxlength="64" />
        </AFormItem>
        <AFormItem label="上级部门 ID">
          <AInputNumber
            v-model:value="form.parentId"
            :min="1"
            style="width: 100%"
          />
        </AFormItem>
        <AFormItem label="负责人用户 ID">
          <AInputNumber
            v-model:value="form.leaderId"
            :min="1"
            style="width: 100%"
          />
        </AFormItem>
        <AFormItem label="排序">
          <AInputNumber v-model:value="form.sort" style="width: 100%" />
        </AFormItem>
        <AFormItem label="状态">
          <ASelect v-model:value="form.status">
            <ASelectOption value="active">启用</ASelectOption
            ><ASelectOption value="disabled">停用</ASelectOption>
          </ASelect>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
