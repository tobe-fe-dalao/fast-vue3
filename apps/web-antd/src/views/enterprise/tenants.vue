<script setup lang="ts">
import type { TenantItem } from '@/api';

import { onMounted, reactive, ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const items = ref<TenantItem[]>([]);
const editing = ref<null | TenantItem>(null);
const modalOpen = ref(false);
const saving = ref(false);
const form = reactive({
  name: '',
  code: '',
  plan: 'standard',
  status: 'active' as TenantItem['status'],
  expiredAt: '',
  adminUsername: '',
  adminPassword: '',
  adminEmail: '',
});

async function load() {
  try {
    items.value = await api.tenant.list();
  } catch (error) {
    message.error((error as Error).message);
  }
}

function openModal(item?: TenantItem) {
  editing.value = item ?? null;
  Object.assign(
    form,
    item
      ? {
          name: item.name,
          code: item.code,
          plan: item.plan,
          status: item.status,
          expiredAt: item.expiredAt?.slice(0, 10) ?? '',
          adminUsername: '',
          adminPassword: '',
          adminEmail: '',
        }
      : {
          name: '',
          code: '',
          plan: 'standard',
          status: 'active',
          expiredAt: '',
          adminUsername: '',
          adminPassword: '',
          adminEmail: '',
        },
  );
  modalOpen.value = true;
}

async function save() {
  if (!form.name.trim() || !form.plan.trim())
    return message.warning('请填写名称和套餐');
  saving.value = true;
  try {
    if (editing.value)
      await api.tenant.update(editing.value.id, {
        name: form.name,
        plan: form.plan,
        status: form.status,
        expiredAt: form.expiredAt ? `${form.expiredAt}T00:00:00+08:00` : null,
      });
    else {
      if (
        !/^[a-z][a-z0-9-]{1,62}[a-z0-9]$/.test(form.code) ||
        !form.adminUsername ||
        form.adminPassword.length < 10 ||
        !form.adminEmail
      )
        return message.warning('请检查租户编码和管理员资料');
      await api.tenant.create({
        name: form.name,
        code: form.code,
        plan: form.plan,
        expiredAt: form.expiredAt ? `${form.expiredAt}T00:00:00+08:00` : null,
        adminUsername: form.adminUsername,
        adminPassword: form.adminPassword,
        adminEmail: form.adminEmail,
      });
    }
    modalOpen.value = false;
    message.success('已保存');
    await load();
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">租户管理</ATypographyTitle
      ><AButton type="primary" @click="openModal()">创建租户</AButton>
    </div>
    <ACard :bordered="false">
      <ATable :data-source="items" row-key="id">
        <ATableColumn title="名称" data-index="name" key="name" /><ATableColumn
          title="编码"
          data-index="code"
          key="code"
        /><ATableColumn
          title="状态"
          data-index="status"
          key="status"
        /><ATableColumn
          title="套餐"
          data-index="plan"
          key="plan"
        /><ATableColumn
          title="到期"
          data-index="expiredAt"
          key="expiredAt"
        /><ATableColumn title="操作" key="action">
          <template #default="{ record }">
            <AButton type="link" @click="openModal(record)"> 编辑 </AButton>
          </template>
        </ATableColumn>
      </ATable>
    </ACard>
    <AModal
      v-model:open="modalOpen"
      :title="editing ? '编辑租户' : '创建租户'"
      :confirm-loading="saving"
      @ok="save"
    >
      <AForm :model="form" layout="vertical">
        <AFormItem label="名称" required>
          <AInput v-model:value="form.name" :maxlength="128" />
        </AFormItem>
        <AFormItem v-if="!editing" label="编码" required>
          <AInput
            v-model:value="form.code"
            placeholder="小写字母、数字和连字符"
          />
        </AFormItem>
        <AFormItem label="套餐" required>
          <AInput v-model:value="form.plan" :maxlength="32" />
        </AFormItem>
        <AFormItem v-if="editing" label="状态">
          <ASelect v-model:value="form.status">
            <ASelectOption value="active">启用</ASelectOption>
            <ASelectOption value="disabled">停用</ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="到期日期">
          <AInput v-model:value="form.expiredAt" type="date" />
        </AFormItem>
        <template v-if="!editing">
          <AFormItem label="管理员用户名" required>
            <AInput v-model:value="form.adminUsername" />
          </AFormItem>
          <AFormItem label="管理员邮箱" required>
            <AInput v-model:value="form.adminEmail" type="email" />
          </AFormItem>
          <AFormItem label="管理员密码（至少 10 位）" required>
            <AInputPassword v-model:value="form.adminPassword" />
          </AFormItem>
        </template>
      </AForm>
    </AModal>
  </div>
</template>
