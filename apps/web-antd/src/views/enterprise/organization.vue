<script setup lang="ts">
import type { OrganizationItem } from '@/api';

import { onMounted, ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const organization = ref<null | OrganizationItem>(null);
const name = ref('');
const status = ref<'active' | 'disabled'>('active');
const saving = ref(false);

async function load() {
  try {
    organization.value = await api.organization.current();
    name.value = organization.value.name;
    status.value = organization.value.status;
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function save() {
  if (!organization.value || !name.value.trim()) return;
  saving.value = true;
  try {
    await api.organization.update(organization.value.id, {
      name: name.value,
      status: status.value,
    });
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
    <ATypographyTitle :level="4">组织信息</ATypographyTitle>
    <ACard v-if="organization" :bordered="false">
      <AForm layout="vertical" style="max-width: 480px">
        <AFormItem label="组织编码">
          <AInput :value="organization.code" disabled />
        </AFormItem>
        <AFormItem label="组织名称">
          <AInput v-model:value="name" :maxlength="128" />
        </AFormItem>
        <AFormItem label="状态">
          <ASelect v-model:value="status">
            <ASelectOption value="active">启用</ASelectOption>
            <ASelectOption value="disabled">停用</ASelectOption>
          </ASelect>
        </AFormItem>
        <AButton type="primary" :loading="saving" @click="save"> 保存 </AButton>
      </AForm>
    </ACard>
  </div>
</template>
