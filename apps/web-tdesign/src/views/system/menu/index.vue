<script setup lang="ts">
import { http } from '@/api/http';
import { MessagePlugin } from 'tdesign-vue-next';

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

const typeMap: Record<string, { label: string; theme: string }> = {
  directory: { label: '目录', theme: 'primary' },
  menu: { label: '菜单', theme: 'success' },
  button: { label: '按钮', theme: 'warning' },
};

const columns = [
  { title: 'ID', colKey: 'id', width: 60 },
  { title: '菜单名称', colKey: 'name' },
  { title: '路径', colKey: 'path' },
  { title: '图标', colKey: 'icon', width: 140 },
  { title: '类型', colKey: 'type', width: 100 },
  { title: '排序', colKey: 'sort', width: 80 },
  { title: '状态', colKey: 'status', width: 100 },
  { title: '操作', colKey: 'actions', width: 200 },
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
    MessagePlugin.error('加载菜单数据失败');
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
      MessagePlugin.success('菜单已更新');
    } else {
      await http.post({ data, url: '/menus' });
      MessagePlugin.success('菜单已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    MessagePlugin.error('菜单保存失败');
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    MessagePlugin.success('已删除');
    fetchData();
  } catch {
    MessagePlugin.error('删除失败');
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
      <t-button theme="primary" @click="openDialog()">+ 新增菜单</t-button>
    </div>
    <t-card>
      <t-table
        :loading="loading"
        :columns="columns"
        :data="buildTree(dataSource)"
        row-key="id"
        stripe
      >
        <template #type="{ row }">
          <t-tag
            :theme="(typeMap[row.type]?.theme as any) || 'default'"
            size="small"
          >
            {{ typeMap[row.type]?.label }}
          </t-tag>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'active' ? 'success' : 'default'"
            size="small"
          >
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </t-tag>
        </template>
        <template #actions="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDialog(row)"
          >
            编辑
          </t-button>
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDialog({ ...row, parentId: row.id, id: 0 } as any)"
          >
            添加子项
          </t-button>
          <t-popconfirm
            content="确定删除该菜单？"
            @confirm="handleDelete(row.id)"
          >
            <t-button theme="danger" variant="text" size="small">删除</t-button>
          </t-popconfirm>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      :visible="dialogVisible"
      :header="editingRecord ? '编辑菜单' : '新增菜单'"
      width="520px"
      @confirm="handleSave"
      @close="dialogVisible = false"
    >
      <t-form label-width="80px">
        <t-form-item label="上级菜单">
          <t-select v-model="form.parentId" style="width: 100%">
            <t-option :value="0" label="根目录" />
            <t-option
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :label="m.name"
              :value="m.id"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="类型">
          <t-radio-group v-model="form.type">
            <t-radio value="directory">目录</t-radio>
            <t-radio value="menu">菜单</t-radio>
            <t-radio value="button">按钮</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="名称">
          <t-input v-model="form.name" placeholder="请输入菜单名称" />
        </t-form-item>
        <t-form-item v-if="form.type !== 'button'" label="路径">
          <t-input v-model="form.path" placeholder="/system/user" />
        </t-form-item>
        <t-form-item v-if="form.type !== 'button'" label="图标">
          <t-input v-model="form.icon" placeholder="HomeOutlined" />
        </t-form-item>
        <t-form-item v-if="form.type === 'button'" label="权限标识">
          <t-input v-model="form.permission" placeholder="user:create" />
        </t-form-item>
        <t-form-item label="排序">
          <t-input v-model="form.sort" placeholder="0" />
        </t-form-item>
        <t-form-item label="状态">
          <t-radio-group v-model="form.status">
            <t-radio value="active">启用</t-radio>
            <t-radio value="inactive">禁用</t-radio>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
