<script setup lang="ts">
import { http } from '@/api/http';
import { NButton, NDataTable, NTag, useMessage } from 'naive-ui';

interface MenuRecord {
  id: number;
  parentId: number;
  name: string;
  path: string;
  icon: string;
  sort: number;
  status: string;
  type: string;
  permission?: string;
  children?: MenuRecord[];
}

interface MenuApiRecord extends Omit<MenuRecord, 'children' | 'status'> {
  children?: MenuApiRecord[];
  visible: boolean;
}

type MenuForm = Omit<MenuRecord, 'children' | 'id'>;

const message = useMessage();
const loading = ref(false);
const dataSource = ref<MenuRecord[]>([]);
const showModal = ref(false);
const editingRecord = ref<MenuRecord | null>(null);

const form = ref<MenuForm>({
  parentId: 0,
  name: '',
  path: '',
  icon: '',
  sort: 0,
  status: 'active',
  type: 'menu',
  permission: '',
});

const typeMap: Record<
  string,
  { label: string; type: 'primary' | 'success' | 'warning' }
> = {
  directory: { label: '目录', type: 'primary' },
  menu: { label: '菜单', type: 'success' },
  button: { label: '按钮', type: 'warning' },
};

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '菜单名称', key: 'name' },
  { title: '路径', key: 'path' },
  { title: '图标', key: 'icon', width: 140 },
  {
    title: '类型',
    key: 'type',
    width: 100,
    render: (row: MenuRecord) =>
      h(
        NTag,
        { type: typeMap[row.type]?.type, size: 'small' },
        () => typeMap[row.type]?.label,
      ),
  },
  { title: '排序', key: 'sort', width: 80 },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (row: MenuRecord) =>
      h(
        NTag,
        {
          type: row.status === 'active' ? 'success' : 'default',
          size: 'small',
        },
        () => (row.status === 'active' ? '启用' : '禁用'),
      ),
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render: (row: MenuRecord) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openModal(row),
        },
        () => '编辑',
      ),
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openModal({ ...row, parentId: row.id, id: 0 } as any),
          style: { marginLeft: '8px' },
        },
        () => '添加子项',
      ),
      h(
        NButton,
        {
          text: true,
          type: 'error',
          size: 'small',
          onClick: () => handleDelete(row.id),
          style: { marginLeft: '8px' },
        },
        () => '删除',
      ),
    ],
  },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<MenuApiRecord[]>({ url: '/menus/tree' });
    const flatten = (items: MenuApiRecord[]): MenuRecord[] =>
      items.flatMap(({ children = [], visible, ...item }) => [
        { ...item, status: visible ? 'active' : 'inactive' },
        ...flatten(children),
      ]);
    dataSource.value = flatten(res ?? []);
  } catch {
    message.error('加载菜单数据失败');
  } finally {
    loading.value = false;
  }
}

function buildTree(list: MenuRecord[]): MenuRecord[] {
  const map = new Map<number, MenuRecord>();
  const tree: MenuRecord[] = [];
  list.forEach((item) => map.set(item.id, { ...item, children: [] }));
  list.forEach((item) => {
    const node = map.get(item.id);
    if (!node) {
      return;
    }
    if (item.parentId === 0) tree.push(node);
    else {
      const parent = map.get(item.parentId);
      if (parent) parent.children?.push(node);
    }
  });
  return tree;
}

function openModal(record?: MenuRecord) {
  editingRecord.value = record ?? null;
  form.value = record
    ? { ...record }
    : {
        parentId: 0,
        name: '',
        path: '',
        icon: '',
        sort: 0,
        status: 'active',
        type: 'menu',
        permission: '',
      };
  showModal.value = true;
}

async function handleSave() {
  const { status, ...values } = form.value;
  const data = { ...values, visible: status === 'active' };
  try {
    if (editingRecord.value?.id) {
      await http.put({ data, url: `/menus/${editingRecord.value.id}` });
      message.success('菜单已更新');
    } else {
      await http.post({ data, url: '/menus' });
      message.success('菜单已创建');
    }
    showModal.value = false;
    fetchData();
  } catch {
    message.error('菜单保存失败');
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    message.success('已删除');
    fetchData();
  } catch {
    message.error('删除失败');
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <div
      class="admin-page-actions"
      style="
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 16px;
      "
    >
      <NButton type="primary" @click="openModal()">+ 新增菜单</NButton>
    </div>
    <NCard>
      <NDataTable
        :columns="columns"
        :data="buildTree(dataSource)"
        :loading="loading"
        :pagination="false"
        size="small"
        striped
        :row-key="(row: MenuRecord) => row.id"
      />
    </NCard>

    <NModal
      v-model:show="showModal"
      preset="dialog"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      style="width: 520px"
      positive-text="确定"
      negative-text="取消"
      @positive-click="handleSave"
    >
      <div style="padding: 16px 0">
        <div style="margin-bottom: 12px">
          <span>上级菜单</span
          ><NSelect
            v-model:value="form.parentId"
            :options="[
              { label: '根目录', value: 0 },
              ...dataSource
                .filter((d) => d.type !== 'button')
                .map((m) => ({ label: m.name, value: m.id })),
            ]"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>类型</span
          ><NRadioGroup v-model:value="form.type" style="margin-top: 4px">
            <NRadio value="directory">目录</NRadio
            ><NRadio value="menu">菜单</NRadio
            ><NRadio value="button">按钮</NRadio>
          </NRadioGroup>
        </div>
        <div style="margin-bottom: 12px">
          <span>名称</span
          ><NInput
            v-model:value="form.name"
            placeholder="请输入菜单名称"
            style="margin-top: 4px"
          />
        </div>
        <div v-if="form.type !== 'button'" style="margin-bottom: 12px">
          <span>路径</span
          ><NInput
            v-model:value="form.path"
            placeholder="/system/user"
            style="margin-top: 4px"
          />
        </div>
        <div v-if="form.type !== 'button'" style="margin-bottom: 12px">
          <span>图标</span
          ><NInput
            v-model:value="form.icon"
            placeholder="HomeOutlined"
            style="margin-top: 4px"
          />
        </div>
        <div v-if="form.type === 'button'" style="margin-bottom: 12px">
          <span>权限标识</span
          ><NInput
            v-model:value="form.permission"
            placeholder="user:create"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>排序</span
          ><NInputNumber
            v-model:value="form.sort"
            :min="0"
            style="margin-top: 4px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <span>状态</span
          ><NRadioGroup v-model:value="form.status" style="margin-top: 4px">
            <NRadio value="active">启用</NRadio
            ><NRadio value="inactive">禁用</NRadio>
          </NRadioGroup>
        </div>
      </div>
    </NModal>
  </div>
</template>
