<script setup lang="ts">
import type { MenuItem, MenuType } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<MenuItem[]>([]);
const modalVisible = ref(false);
const editingRecord = ref<MenuItem | null>(null);

interface MenuForm {
  parentId: number;
  name: string;
  path: string;
  icon: string;
  sort: number;
  status: 'active' | 'inactive';
  type: MenuType;
  permission: string;
  visible: boolean;
}

const form = ref<MenuForm>({
  parentId: 0,
  name: '',
  path: '',
  icon: '',
  sort: 0,
  status: 'active',
  type: 'menu',
  permission: '',
  visible: true,
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '菜单名称', dataIndex: 'name' },
  { title: '路径', dataIndex: 'path' },
  { title: '图标', dataIndex: 'icon', width: 140 },
  { title: '类型', dataIndex: 'type', width: 100 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '状态', dataIndex: 'visible', width: 100 },
  { title: '操作', key: 'action', width: 180 },
];

const typeMap: Record<MenuType, { color: string; label: string }> = {
  directory: { label: '目录', color: 'blue' },
  menu: { label: '菜单', color: 'green' },
  button: { label: '按钮', color: 'orange' },
};

function getTypeMeta(type: unknown) {
  return typeMap[type as MenuType] ?? typeMap.menu;
}

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.menu.tree();
    dataSource.value = res ?? [];
  } catch {
    message.error('加载菜单数据失败');
  } finally {
    loading.value = false;
  }
}

function buildTree(list: MenuItem[]): MenuItem[] {
  const map = new Map<number, MenuItem>();
  const tree: MenuItem[] = [];
  list.forEach((item) => map.set(item.id, { ...item, children: undefined }));
  list.forEach((item) => {
    const node = map.get(item.id);
    if (!node) {
      return;
    }
    if (item.parentId === 0) {
      tree.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  });
  return tree;
}

function openModal(record?: MenuItem) {
  editingRecord.value = record ?? null;
  form.value = record
    ? {
        parentId: record.parentId,
        name: record.name,
        path: record.path ?? '',
        icon: record.icon ?? '',
        sort: record.sort,
        status: record.visible ? 'active' : 'inactive',
        type: record.type,
        permission: record.permission ?? '',
        visible: record.visible,
      }
    : {
        parentId: 0,
        name: '',
        path: '',
        icon: '',
        sort: 0,
        status: 'active',
        type: 'menu',
        permission: '',
        visible: true,
      };
  modalVisible.value = true;
}

async function handleSave() {
  try {
    const payload = {
      parentId: form.value.parentId,
      name: form.value.name,
      path: form.value.path || undefined,
      icon: form.value.icon || undefined,
      sort: form.value.sort,
      type: form.value.type,
      permission: form.value.permission || undefined,
      visible: form.value.visible,
    };
    if (editingRecord.value) {
      await api.menu.update(editingRecord.value.id, payload);
      message.success('菜单已更新');
    } else {
      await api.menu.create(payload);
      message.success('菜单已创建');
    }
    modalVisible.value = false;
    fetchData();
  } catch {
    message.error('保存菜单失败');
  }
}

async function handleDelete(id: number) {
  try {
    await api.menu.delete(id);
    message.success('已删除');
    fetchData();
  } catch {
    message.error('删除菜单失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <div class="admin-page-actions">
      <AButton type="primary" @click="openModal()">+ 新增菜单</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="buildTree(dataSource)"
          :columns="columns"
          :pagination="false"
          size="middle"
          row-key="id"
          :default-expand-all-rows="true"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'type'">
              <ATag :color="getTypeMeta(record.type).color">
                {{ getTypeMeta(record.type).label }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openModal(record as MenuItem)"
              >
                编辑
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="
                  openModal({
                    ...record,
                    parentId: record.id,
                    id: 0,
                  } as MenuItem)
                "
              >
                添加子项
              </AButton>
              <AButton
                type="link"
                size="small"
                danger
                @click="handleDelete(record.id)"
              >
                删除
              </AButton>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      @ok="handleSave"
      :width="520"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem label="上级菜单">
          <ASelect v-model:value="form.parentId">
            <ASelectOption :value="0">根目录</ASelectOption>
            <ASelectOption
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="类型">
          <ARadioGroup v-model:value="form.type">
            <ARadio value="directory">目录</ARadio>
            <ARadio value="menu">菜单</ARadio>
            <ARadio value="button">按钮</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem label="名称">
          <AInput v-model:value="form.name" placeholder="请输入菜单名称" />
        </AFormItem>
        <AFormItem v-if="form.type !== 'button'" label="路径">
          <AInput v-model:value="form.path" placeholder="/system/user" />
        </AFormItem>
        <AFormItem v-if="form.type !== 'button'" label="图标">
          <AInput v-model:value="form.icon" placeholder="HomeOutlined" />
        </AFormItem>
        <AFormItem v-if="form.type === 'button'" label="权限标识">
          <AInput v-model:value="form.permission" placeholder="user:create" />
        </AFormItem>
        <AFormItem label="排序">
          <AInputNumber v-model:value="form.sort" :min="0" />
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">启用</ARadio>
            <ARadio value="inactive">禁用</ARadio>
          </ARadioGroup>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
