<script setup lang="ts">
import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const { success: messageSuccess, error: messageError } = useMessage();

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
  directory: { label: '目录', color: 'blue' },
  menu: { label: '菜单', color: 'success' },
  button: { label: '按钮', color: 'warning' },
};

const columns = [
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '菜单名称', dataKey: 'name' },
  { title: '路径', dataKey: 'path' },
  { title: '图标', dataKey: 'icon', width: 140 },
  { title: '类型', key: 'type', width: 100, customCell: true },
  { title: '排序', dataKey: 'sort', width: 80 },
  { title: '状态', key: 'status', width: 100, customCell: true },
  { title: '操作', key: 'actions', width: 200, customCell: true },
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
    messageError('加载菜单数据失败');
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
      messageSuccess('菜单已更新');
    } else {
      await http.post({ data, url: '/menus' });
      messageSuccess('菜单已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    messageError('菜单保存失败');
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    messageSuccess('已删除');
    fetchData();
  } catch {
    messageError('删除失败');
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
      <IxButton mode="primary" @click="openDialog()">+ 新增菜单</IxButton>
    </div>

    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="buildTree(dataSource)"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        children-key="children"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'type'">
            <IxTag :color="typeMap[record.type]?.color as any">
              {{ typeMap[record.type]?.label }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'status'">
            <IxTag :color="record.status === 'active' ? 'success' : 'info'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton mode="link" size="sm" @click="openDialog(record)">
              编辑
            </IxButton>
            <IxButton
              mode="link"
              size="sm"
              @click="
                openDialog({ ...record, parentId: record.id, id: 0 } as any)
              "
            >
              添加子项
            </IxButton>
            <IxPopconfirm title="确定删除？" @confirm="handleDelete(record.id)">
              <IxButton mode="link" size="sm" danger>删除</IxButton>
            </IxPopconfirm>
          </template>
        </template>
      </IxTable>
    </IxCard>

    <!-- 新增/编辑 Modal -->
    <IxModal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      width="520px"
    >
      <IxForm :label-col="{ span: 6 }" :control-col="{ span: 18 }">
        <IxFormItem label="上级菜单">
          <IxSelect v-model:value="form.parentId" style="width: 100%">
            <IxSelectOption label="根目录" :value="0" />
            <IxSelectOption
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :label="m.name"
              :value="m.id"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="类型">
          <IxRadioGroup v-model:value="form.type">
            <IxRadio value="directory">目录</IxRadio>
            <IxRadio value="menu">菜单</IxRadio>
            <IxRadio value="button">按钮</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
        <IxFormItem label="名称">
          <IxInput v-model:value="form.name" placeholder="请输入菜单名称" />
        </IxFormItem>
        <IxFormItem v-if="form.type !== 'button'" label="路径">
          <IxInput v-model:value="form.path" placeholder="/system/user" />
        </IxFormItem>
        <IxFormItem v-if="form.type !== 'button'" label="图标">
          <IxInput v-model:value="form.icon" placeholder="HomeOutlined" />
        </IxFormItem>
        <IxFormItem v-if="form.type === 'button'" label="权限标识">
          <IxInput v-model:value="form.permission" placeholder="user:create" />
        </IxFormItem>
        <IxFormItem label="排序">
          <IxInputNumber v-model:value="form.sort" :min="0" />
        </IxFormItem>
        <IxFormItem label="状态">
          <IxRadioGroup v-model:value="form.status">
            <IxRadio value="active">启用</IxRadio>
            <IxRadio value="inactive">禁用</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
      </IxForm>
      <template #footer>
        <IxButton @click="dialogVisible = false">取消</IxButton>
        <IxButton mode="primary" @click="handleSave">确定</IxButton>
      </template>
    </IxModal>
  </div>
</template>
