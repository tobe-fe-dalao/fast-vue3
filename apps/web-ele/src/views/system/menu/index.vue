<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage } from 'element-plus';

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

const typeMap: Record<string, { label: string; type: string }> = {
  directory: { label: '目录', type: 'primary' },
  menu: { label: '菜单', type: 'success' },
  button: { label: '按钮', type: 'warning' },
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
    ElMessage.error('加载菜单数据失败');
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
      ElMessage.success('菜单已更新');
    } else {
      await http.post({ data, url: '/menus' });
      ElMessage.success('菜单已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    ElMessage.error('菜单保存失败');
  }
}

async function handleDelete(id: number) {
  try {
    await http.del({ url: `/menus/${id}` });
    ElMessage.success('已删除');
    fetchData();
  } catch {
    ElMessage.error('删除失败');
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
      <el-button type="primary" @click="openDialog()">+ 新增菜单</el-button>
    </div>
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="buildTree(dataSource)"
        stripe
        row-key="id"
        default-expand-all
      >
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="icon" label="图标" width="140" />
        <el-table-column label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="typeMap[row.type]?.type as any" size="small">
              {{ typeMap[row.type]?.label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'active' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="openDialog(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="openDialog({ ...row, parentId: row.id, id: 0 } as any)"
            >
              添加子项
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      width="520px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" style="width: 100%">
            <el-option :value="0" label="根目录" />
            <el-option
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :label="m.name"
              :value="m.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio value="directory">目录</el-radio>
            <el-radio value="menu">菜单</el-radio>
            <el-radio value="button">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item v-if="form.type !== 'button'" label="路径">
          <el-input v-model="form.path" placeholder="/system/user" />
        </el-form-item>
        <el-form-item v-if="form.type !== 'button'" label="图标">
          <el-input v-model="form.icon" placeholder="HomeOutlined" />
        </el-form-item>
        <el-form-item v-if="form.type === 'button'" label="权限标识">
          <el-input v-model="form.permission" placeholder="user:create" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="active">启用</el-radio>
            <el-radio value="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
