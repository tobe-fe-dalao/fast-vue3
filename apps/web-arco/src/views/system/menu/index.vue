<script setup lang="ts">
import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';

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
}

interface MenuApiRecord extends Omit<MenuRecord, 'status'> {
  children?: MenuApiRecord[];
  visible: boolean;
}

const loading = ref(false);
const dataSource = ref<MenuRecord[]>([]);
const dialogVisible = ref(false);
const editingRecord = ref<MenuRecord | null>(null);

const form = ref({
  parentId: 0,
  name: '',
  path: '',
  icon: '',
  sort: 0,
  status: 'active',
  type: 'menu',
  permission: '',
});

const typeMap: Record<string, { color: string; label: string }> = {
  directory: { label: '目录', color: 'arcoblue' },
  menu: { label: '菜单', color: 'green' },
  button: { label: '按钮', color: 'orange' },
};

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '菜单名称', dataIndex: 'name' },
  { title: '路径', dataIndex: 'path' },
  { title: '图标', dataIndex: 'icon', width: 140 },
  { title: '类型', slotName: 'type', width: 100 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '状态', slotName: 'status', width: 100 },
  { title: '操作', slotName: 'actions', width: 200 },
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
    Message.error('加载菜单数据失败');
  } finally {
    loading.value = false;
  }
}

function buildTree(list: MenuRecord[]) {
  const map = new Map<number, MenuRecord & { children?: MenuRecord[] }>();
  const tree: (MenuRecord & { children?: MenuRecord[] })[] = [];
  list.forEach((item) => map.set(item.id, { ...item }));
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

function openDialog(record?: MenuRecord) {
  editingRecord.value = record ?? null;
  form.value = record
    ? { ...record, permission: record.permission ?? '' }
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
  dialogVisible.value = true;
}

async function handleSave() {
  const { status, ...values } = form.value;
  const data = { ...values, visible: status === 'active' };
  try {
    if (editingRecord.value) {
      await http.put({ data, url: `/menus/${editingRecord.value.id}` });
      Message.success('菜单已更新');
    } else {
      await http.post({ data, url: '/menus' });
      Message.success('菜单已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    Message.error('菜单保存失败');
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    Message.success('已删除');
    fetchData();
  } catch {
    Message.error('删除失败');
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
      <a-button type="primary" @click="openDialog()">+ 新增菜单</a-button>
    </div>
    <a-card :bordered="false">
      <a-table
        :loading="loading"
        :columns="columns"
        :data="buildTree(dataSource)"
        :pagination="false"
        stripe
        row-key="id"
      >
        <template #type="{ record }">
          <a-tag :color="typeMap[record.type]?.color" size="small">
            {{ typeMap[record.type]?.label }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <a-tag
            :color="record.status === 'active' ? 'green' : 'gray'"
            size="small"
          >
            {{ record.status === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template #actions="{ record }">
          <a-button type="text" size="small" @click="openDialog(record)">
            编辑
          </a-button>
          <a-button
            type="text"
            size="small"
            @click="
              openDialog({ ...record, parentId: record.id, id: 0 } as any)
            "
          >
            添加子项
          </a-button>
          <a-popconfirm
            content="确定删除该菜单？"
            @ok="handleDelete(record.id)"
          >
            <a-button type="text" status="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      @ok="handleSave"
    >
      <a-form :model="form" auto-label-width>
        <a-form-item label="上级菜单">
          <a-select v-model="form.parentId" style="width: 100%">
            <a-option :value="0" label="根目录" />
            <a-option
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :value="m.id"
              :label="m.name"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model="form.type">
            <a-radio value="directory">目录</a-radio>
            <a-radio value="menu">菜单</a-radio>
            <a-radio value="button">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-model="form.name" placeholder="请输入菜单名称" />
        </a-form-item>
        <a-form-item v-if="form.type !== 'button'" label="路径">
          <a-input v-model="form.path" placeholder="/system/user" />
        </a-form-item>
        <a-form-item v-if="form.type !== 'button'" label="图标">
          <a-input v-model="form.icon" placeholder="HomeOutlined" />
        </a-form-item>
        <a-form-item v-if="form.type === 'button'" label="权限标识">
          <a-input v-model="form.permission" placeholder="user:create" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sort" :min="0" />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio value="active">启用</a-radio>
            <a-radio value="inactive">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
