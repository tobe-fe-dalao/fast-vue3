<script setup lang="ts">
import { http } from '@/api/http';
import { useToast } from 'primevue/usetoast';

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

type MenuForm = Omit<MenuRecord, 'id'>;

const toast = useToast();

const loading = ref(false);
const dataSource = ref<MenuRecord[]>([]);
const dialogVisible = ref(false);
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

const typeOptions = [
  { label: '目录', value: 'directory' },
  { label: '菜单', value: 'menu' },
  { label: '按钮', value: 'button' },
];

const typeSeverity: Record<string, string> = {
  directory: 'info',
  menu: 'success',
  button: 'warn',
};

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
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载菜单数据失败',
    });
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

function typeLabel(type: string) {
  return typeOptions.find((t) => t.value === type)?.label || type;
}

function openDialog(record?: MenuRecord) {
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
  dialogVisible.value = true;
}

async function handleSave() {
  if (!form.value.name) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请输入菜单名称' });
    return;
  }
  const { status, ...values } = form.value;
  const data = { ...values, visible: status === 'active' };
  try {
    if (editingRecord.value) {
      await http.put({ data, url: `/menus/${editingRecord.value.id}` });
      toast.add({ severity: 'success', summary: '成功', detail: '菜单已更新' });
    } else {
      await http.post({ data, url: '/menus' });
      toast.add({ severity: 'success', summary: '成功', detail: '菜单已创建' });
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '菜单保存失败' });
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    toast.add({ severity: 'success', summary: '成功', detail: '已删除' });
    fetchData();
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '删除失败' });
  }
}

// Parent menu options for select
function parentOptions() {
  return [
    { label: '根目录', value: 0 },
    ...dataSource.value
      .filter((d) => d.type !== 'button')
      .map((d) => ({ label: d.name, value: d.id })),
  ];
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
      <Button label="+ 新增菜单" @click="openDialog()" />
    </div>

    <Toast />

    <Card>
      <template #content>
        <DataTable
          :value="buildTree(dataSource)"
          :loading="loading"
          striped-rows
          size="small"
          data-key="id"
        >
          <Column field="id" header="ID" style="width: 60px" expander />
          <Column field="name" header="菜单名称" />
          <Column field="path" header="路径" />
          <Column field="icon" header="图标" style="width: 140px" />
          <Column header="类型" style="width: 100px">
            <template #body="{ data }">
              <Tag
                :value="typeLabel(data.type)"
                :severity="typeSeverity[data.type] as any"
              />
            </template>
          </Column>
          <Column field="sort" header="排序" style="width: 80px" />
          <Column header="状态" style="width: 100px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'active' ? '启用' : '禁用'"
                :severity="data.status === 'active' ? 'success' : 'secondary'"
              />
            </template>
          </Column>
          <Column header="操作" style="width: 200px">
            <template #body="{ data }">
              <Button
                label="编辑"
                size="small"
                text
                @click="openDialog(data)"
              />
              <Button
                label="添加子项"
                size="small"
                text
                @click="
                  openDialog({ ...data, parentId: data.id, id: 0 } as any)
                "
              />
              <Button
                label="删除"
                size="small"
                text
                severity="danger"
                @click="handleDelete(data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="dialogVisible"
      :header="editingRecord ? '编辑菜单' : '新增菜单'"
      :modal="true"
      :style="{ width: '520px' }"
    >
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >上级菜单</label
          >
          <Select
            v-model="form.parentId"
            :options="parentOptions()"
            option-label="label"
            option-value="value"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >类型</label
          >
          <div style="display: flex; gap: 16px">
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.type"
                input-id="type-directory"
                value="directory"
              />
              <label for="type-directory">目录</label>
            </div>
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.type"
                input-id="type-menu"
                value="menu"
              />
              <label for="type-menu">菜单</label>
            </div>
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.type"
                input-id="type-button"
                value="button"
              />
              <label for="type-button">按钮</label>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >名称</label
          >
          <InputText
            v-model="form.name"
            placeholder="请输入菜单名称"
            style="width: 100%"
          />
        </div>
        <div v-if="form.type !== 'button'">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >路径</label
          >
          <InputText
            v-model="form.path"
            placeholder="/system/user"
            style="width: 100%"
          />
        </div>
        <div v-if="form.type !== 'button'">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >图标</label
          >
          <InputText
            v-model="form.icon"
            placeholder="HomeOutlined"
            style="width: 100%"
          />
        </div>
        <div v-if="form.type === 'button'">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >权限标识</label
          >
          <InputText
            v-model="form.permission"
            placeholder="user:create"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >排序</label
          >
          <InputNumber v-model="form.sort" :min="0" style="width: 100%" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >状态</label
          >
          <div style="display: flex; gap: 16px">
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="menu-status-active"
                value="active"
              />
              <label for="menu-status-active">启用</label>
            </div>
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="menu-status-inactive"
                value="inactive"
              />
              <label for="menu-status-inactive">禁用</label>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="取消"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button label="确定" @click="handleSave" />
      </template>
    </Dialog>
  </div>
</template>
