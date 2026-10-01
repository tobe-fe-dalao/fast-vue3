<script setup lang="ts">
import type { RoleItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const searchText = ref('');
const loading = ref(false);
const modalVisible = ref(false);
const editingRecord = ref<null | RoleItem>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色编码', dataIndex: 'code', key: 'code' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 160 },
];

const dataSource = ref<RoleItem[]>([]);
const pagination = reactive({ current: 1, pageSize: 5, total: 0 });

async function load(page = 1) {
  loading.value = true;
  try {
    const res = await api.role.list({
      page,
      pageSize: pagination.pageSize,
      keyword: searchText.value || undefined,
    });
    dataSource.value = res.items;
    pagination.current = res.page;
    pagination.total = res.total;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load());

function onSearch() {
  load(1);
}

function onTableChange(p: { current?: number; pageSize?: number }) {
  pagination.pageSize = p.pageSize ?? pagination.pageSize;
  load(p.current ?? 1);
}

function openModal(record?: RoleItem) {
  editingRecord.value = record ?? null;
  if (record) {
    form.name = record.name;
    form.code = record.code;
    form.description = record.description ?? '';
    form.status = true;
  } else {
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  modalVisible.value = true;
}

async function handleSave() {
  try {
    if (editingRecord.value) {
      await api.role.update(editingRecord.value.id, {
        name: form.name,
        description: form.description,
      });
      message.success('角色已更新');
    } else {
      await api.role.create({
        name: form.name,
        code: form.code,
        description: form.description,
      });
      message.success('角色已创建');
    }
    modalVisible.value = false;
    load(pagination.current);
  } catch {
    message.error('保存失败');
  }
}

async function handleDelete(id: number) {
  await api.role.delete(id);
  message.success('已删除');
  load(pagination.current);
}
</script>

<template>
  <div class="admin-page">
    <div class="admin-page-actions">
      <AButton type="primary" @click="openModal()">+ 新增角色</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <AInputSearch
          v-model:value="searchText"
          placeholder="搜索角色名称或编码…"
          style="width: 320px"
          allow-clear
          @search="onSearch"
        />
      </div>
      <ATable
        :data-source="dataSource"
        :columns="columns"
        :loading="loading"
        :pagination="{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }"
        size="middle"
        row-key="id"
        @change="onTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <AButton
              type="link"
              size="small"
              @click="openModal(record as RoleItem)"
            >
              编辑
            </AButton>
            <AButton
              type="link"
              size="small"
              danger
              @click="handleDelete((record as RoleItem).id)"
            >
              删除
            </AButton>
          </template>
        </template>
      </ATable>
    </ACard>

    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <AFormItem label="角色名称">
          <AInput v-model:value="form.name" />
        </AFormItem>
        <AFormItem label="角色编码">
          <AInput v-model:value="form.code" :disabled="!!editingRecord" />
        </AFormItem>
        <AFormItem label="描述">
          <AInput v-model:value="form.description" />
        </AFormItem>
        <AFormItem label="状态">
          <ASwitch v-model:checked="form.status" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
