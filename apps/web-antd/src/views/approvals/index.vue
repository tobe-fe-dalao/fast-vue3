<script setup lang="ts">
import type { ApprovalItem, DepartmentItem } from '@/api';

import { computed, onMounted, reactive, ref } from 'vue';

import { useUserStore } from '@fast-vue3/stores';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const user = useUserStore();
const roles = ref<string[]>([]);
const permissions = ref<string[]>([]);
const can = (code: string) =>
  permissions.value.includes('*') || permissions.value.includes(code);
const approvals = ref<ApprovalItem[]>([]);
const departments = ref<DepartmentItem[]>([]);
const loading = ref(false);
const modalOpen = ref(false);
const saving = ref(false);
const decision = ref<null | {
  action: 'approve' | 'reject';
  item: ApprovalItem;
}>(null);
const decisionComment = ref('');
const form = reactive({
  type: 'GENERAL',
  title: '',
  businessKey: '',
  departmentId: undefined as number | undefined,
  payload: '',
});
const flatDepartments = computed(() => {
  const result: DepartmentItem[] = [];
  function visit(items: DepartmentItem[]) {
    for (const item of items) {
      result.push(item);
      visit(item.children ?? []);
    }
  }
  visit(departments.value);
  return result;
});

async function load() {
  loading.value = true;
  try {
    const [profile, list, tree] = await Promise.all([
      api.auth.me(),
      api.approval.list(),
      api.department.tree().catch(() => []),
    ]);
    user.setUserInfo({ userId: String(profile.id) });
    roles.value = profile.roles;
    permissions.value = profile.permissions;
    approvals.value = list;
    departments.value = tree;
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

async function create() {
  if (!form.title.trim() || !form.type.trim() || !form.departmentId)
    return message.warning('请填写类型、标题并选择部门');
  saving.value = true;
  try {
    await api.approval.create({
      type: form.type,
      title: form.title,
      businessKey: form.businessKey || undefined,
      departmentId: form.departmentId,
      payload: form.payload || undefined,
    });
    modalOpen.value = false;
    Object.assign(form, {
      type: 'GENERAL',
      title: '',
      businessKey: '',
      departmentId: undefined,
      payload: '',
    });
    await load();
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    saving.value = false;
  }
}

function canAct(item: ApprovalItem) {
  const step = item.steps.find(
    (value) =>
      value.stepOrder === item.currentStep && value.status === 'PENDING',
  );
  return (
    item.status === 'PENDING' &&
    can('approval:action') &&
    !!step &&
    (step.approverId === Number(user.userId) ||
      (step.approverType === 'ADMIN' &&
        roles.value.some((role) => ['admin', 'tenant-admin'].includes(role))))
  );
}

async function act(
  item: ApprovalItem,
  action: 'approve' | 'cancel' | 'reject' | 'submit',
  comment = '',
) {
  try {
    if (action === 'submit')
      await api.approval.submit(item.id, crypto.randomUUID());
    if (action === 'approve') await api.approval.approve(item.id, comment);
    if (action === 'reject') await api.approval.reject(item.id, comment);
    if (action === 'cancel') await api.approval.cancel(item.id);
    message.success('操作成功');
    await load();
    return true;
  } catch (error) {
    message.error((error as Error).message);
    await load();
    return false;
  }
}

function openDecision(item: ApprovalItem, action: 'approve' | 'reject') {
  decision.value = { item, action };
  decisionComment.value = '';
}

async function confirmDecision() {
  if (!decision.value) return;
  const { item, action } = decision.value;
  if (await act(item, action, decisionComment.value)) decision.value = null;
}

onMounted(load);
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">审批</ATypographyTitle>
      <AButton
        v-if="can('approval:create')"
        type="primary"
        @click="modalOpen = true"
      >
        新建申请
      </AButton>
    </div>
    <AAlert
      message="提交前需要为所选部门配置负责人。审批依次由部门负责人和管理员处理。"
      type="info"
      class="mb-4"
    />
    <ACard :bordered="false">
      <ATable :data-source="approvals" :loading="loading" row-key="id">
        <ATableColumn
          title="标题"
          data-index="title"
          key="title"
        /><ATableColumn
          title="类型"
          data-index="type"
          key="type"
        /><ATableColumn
          title="申请人 ID"
          data-index="applicantId"
          key="applicantId"
        /><ATableColumn
          title="状态"
          data-index="status"
          key="status"
        /><ATableColumn
          title="当前步骤"
          data-index="currentStep"
          key="currentStep"
        />
        <ATableColumn title="操作" key="action">
          <template #default="{ record }">
            <ASpace>
              <AButton
                v-if="
                  record.status === 'DRAFT' &&
                  can('approval:create') &&
                  record.applicantId === Number(user.userId)
                "
                type="link"
                @click="act(record, 'submit')"
              >
                提交
              </AButton>
              <AButton
                v-if="canAct(record)"
                type="link"
                @click="openDecision(record, 'approve')"
              >
                同意
              </AButton>
              <AButton
                v-if="canAct(record)"
                type="link"
                danger
                @click="openDecision(record, 'reject')"
              >
                驳回
              </AButton>
              <AButton
                v-if="
                  ['DRAFT', 'PENDING'].includes(record.status) &&
                  can('approval:create') &&
                  record.applicantId === Number(user.userId)
                "
                type="link"
                danger
                @click="act(record, 'cancel')"
              >
                撤销
              </AButton>
            </ASpace>
          </template>
        </ATableColumn>
        <ATableColumn title="步骤" key="steps">
          <template #default="{ record }">
            <ATag v-for="step in record.steps" :key="step.id">
              {{ step.approverType }}：{{ step.status }}
            </ATag>
          </template>
        </ATableColumn>
      </ATable>
    </ACard>
    <AModal
      v-model:open="modalOpen"
      title="新建审批申请"
      :confirm-loading="saving"
      @ok="create"
    >
      <AForm :model="form" layout="vertical">
        <AFormItem label="类型" required>
          <AInput v-model:value="form.type" :maxlength="64" />
        </AFormItem>
        <AFormItem label="标题" required>
          <AInput v-model:value="form.title" :maxlength="255" />
        </AFormItem>
        <AFormItem label="部门" required>
          <ASelect
            v-if="flatDepartments.length > 0"
            v-model:value="form.departmentId"
            placeholder="选择部门"
          >
            <ASelectOption
              v-for="item in flatDepartments"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </ASelectOption>
          </ASelect>
          <AInputNumber
            v-else
            v-model:value="form.departmentId"
            :min="1"
            placeholder="部门 ID"
            style="width: 100%"
          />
        </AFormItem>
        <AFormItem label="业务编号">
          <AInput v-model:value="form.businessKey" :maxlength="128" />
        </AFormItem>
        <AFormItem label="申请内容">
          <ATextarea v-model:value="form.payload" :maxlength="10000" />
        </AFormItem>
      </AForm>
    </AModal>
    <AModal
      :open="!!decision"
      :title="decision?.action === 'reject' ? '驳回审批' : '同意审批'"
      @ok="confirmDecision"
      @cancel="decision = null"
    >
      <ATextarea
        v-model:value="decisionComment"
        :maxlength="1000"
        :placeholder="
          decision?.action === 'reject' ? '填写驳回意见' : '审批意见（可选）'
        "
      />
    </AModal>
  </div>
</template>
