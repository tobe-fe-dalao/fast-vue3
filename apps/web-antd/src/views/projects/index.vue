<script setup lang="ts">
import type { ProjectItem } from '@/api';

import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const router = useRouter();
const loading = ref(false);
const saving = ref(false);
const projects = ref<ProjectItem[]>([]);
const editing = ref<null | ProjectItem>(null);
const modalOpen = ref(false);
const form = reactive({
  name: '',
  code: '',
  description: '',
  startDate: '',
  endDate: '',
});

async function load() {
  loading.value = true;
  try {
    projects.value = await api.project.list();
    if (editing.value)
      editing.value =
        projects.value.find((item) => item.id === editing.value?.id) ?? null;
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

function openModal(project?: ProjectItem) {
  editing.value = project ?? null;
  Object.assign(
    form,
    project
      ? {
          name: project.name,
          code: project.code,
          description: project.description ?? '',
          startDate: project.startDate ?? '',
          endDate: project.endDate ?? '',
        }
      : { name: '', code: '', description: '', startDate: '', endDate: '' },
  );
  modalOpen.value = true;
}

async function save() {
  if (!form.name.trim() || !form.code.trim())
    return message.warning('请填写项目名称和编码');
  if (
    editing.value &&
    ((editing.value.startDate && !form.startDate) ||
      (editing.value.endDate && !form.endDate))
  )
    return message.warning('当前服务端接口不支持清空已有日期');
  saving.value = true;
  try {
    const data = {
      name: form.name,
      code: form.code,
      description: form.description,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
    };
    await (editing.value
      ? api.project.update(editing.value.id, {
          name: data.name,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          version: editing.value.version,
        })
      : api.project.create(data, crypto.randomUUID()));
    modalOpen.value = false;
    message.success('已保存');
    await load();
  } catch (error) {
    message.error((error as Error).message);
    await load();
  } finally {
    saving.value = false;
  }
}

async function archive(project: ProjectItem) {
  try {
    await api.project.archive(project.id, project.version);
    message.success('已归档');
    await load();
  } catch (error) {
    message.error((error as Error).message);
    await load();
  }
}

onMounted(load);
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">项目</ATypographyTitle
      ><AButton type="primary" @click="openModal()">新建项目</AButton>
    </div>
    <ACard :bordered="false">
      <ATable :data-source="projects" :loading="loading" row-key="id">
        <ATableColumn title="名称" data-index="name" key="name" />
        <ATableColumn title="编码" data-index="code" key="code" />
        <ATableColumn title="状态" data-index="status" key="status" />
        <ATableColumn title="负责人 ID" data-index="ownerId" key="ownerId" />
        <ATableColumn title="版本" data-index="version" key="version" />
        <ATableColumn title="操作" key="action">
          <template #default="{ record }">
            <ASpace>
              <AButton
                type="link"
                @click="router.push(`/projects/${record.id}`)"
              >
                任务与成员
              </AButton>
              <AButton
                v-if="record.status === 'ACTIVE'"
                type="link"
                @click="openModal(record)"
              >
                编辑
              </AButton>
              <APopconfirm
                v-if="record.status === 'ACTIVE'"
                title="确定归档项目？"
                @confirm="archive(record)"
              >
                <AButton type="link" danger>归档</AButton>
              </APopconfirm>
            </ASpace>
          </template>
        </ATableColumn>
      </ATable>
    </ACard>
    <AModal
      v-model:open="modalOpen"
      :title="editing ? '编辑项目' : '新建项目'"
      :confirm-loading="saving"
      @ok="save"
    >
      <AForm :model="form" layout="vertical">
        <AFormItem label="名称" required>
          <AInput v-model:value="form.name" :maxlength="160" />
        </AFormItem>
        <AFormItem label="编码" required>
          <AInput
            v-model:value="form.code"
            :disabled="!!editing"
            :maxlength="64"
          />
        </AFormItem>
        <AFormItem label="说明">
          <ATextarea v-model:value="form.description" :maxlength="4000" />
        </AFormItem>
        <AFormItem label="开始日期">
          <AInput v-model:value="form.startDate" type="date" />
        </AFormItem>
        <AFormItem label="结束日期">
          <AInput v-model:value="form.endDate" type="date" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
