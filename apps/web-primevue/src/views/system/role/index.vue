<script setup lang="ts">
import { http } from '@/api/http';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
  createdAt: string;
}

type RoleForm = Omit<RoleRecord, 'createdAt' | 'id' | 'permissions'>;

const toast = useToast();
const confirm = useConfirm();

const loading = ref(false);
const dataSource = ref<RoleRecord[]>([]);
const total = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const keyword = ref('');

const dialogVisible = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const router = useRouter();

const form = reactive<RoleForm>({
  name: '',
  code: '',
  description: '',
  status: 'active',
});

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: RoleRecord[]; total: number }>({
      url: '/roles',
      params: {
        page: currentPage.value + 1,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = (res?.items ?? []).map((item) => ({
      ...item,
      status: 'active',
    }));
    total.value = res?.total ?? 0;
  } catch {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载角色列表失败',
    });
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 0;
  fetchData();
}

function onPageChange(event: { page: number }) {
  currentPage.value = event.page;
  fetchData();
}

function openDialog(record?: RoleRecord) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      code: record.code,
      description: record.description,
      status: record.status,
    });
  } else {
    Object.assign(form, {
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
  }
  dialogVisible.value = true;
}

async function handleSave() {
  if (!form.name || !form.code) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请填写必要信息' });
    return;
  }
  try {
    const payload = { description: form.description, name: form.name };
    if (editingRecord.value) {
      await http.put({
        data: payload,
        url: `/roles/${editingRecord.value.id}`,
      });
      toast.add({ severity: 'success', summary: '成功', detail: '角色已更新' });
    } else {
      await http.post({ data: { ...payload, code: form.code }, url: '/roles' });
      toast.add({ severity: 'success', summary: '成功', detail: '角色已创建' });
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    toast.add({ severity: 'error', summary: '错误', detail: '角色保存失败' });
  }
}

function handleDelete(record: RoleRecord) {
  confirm.require({
    message: '确定删除该角色？',
    header: '确认',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: '取消',
    acceptLabel: '确定',
    accept: async () => {
      try {
        await http.del({ url: `/roles/${record.id}` });
        toast.add({ severity: 'success', summary: '成功', detail: '已删除' });
        fetchData();
      } catch {
        toast.add({ severity: 'error', summary: '错误', detail: '删除失败' });
      }
    },
  });
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <Toast />
    <ConfirmDialog />

    <Card style="margin-bottom: 16px">
      <template #content>
        <div style="display: flex; gap: 12px; align-items: center">
          <InputText
            v-model="keyword"
            placeholder="角色名称 / 编码"
            @keyup.enter="handleSearch"
          />
          <Button label="搜索" @click="handleSearch" />
          <Button
            label="+ 新增角色"
            @click="openDialog()"
            style="margin-left: auto"
          />
        </div>
      </template>
    </Card>

    <Card>
      <template #content>
        <DataTable
          :value="dataSource"
          :loading="loading"
          :paginator="true"
          :rows="pageSize"
          :total-records="total"
          :lazy="true"
          @page="onPageChange"
          striped-rows
          size="small"
          data-key="id"
        >
          <Column field="id" header="ID" style="width: 60px" />
          <Column field="name" header="角色名称" style="width: 140px" />
          <Column field="code" header="角色编码" style="width: 140px" />
          <Column field="description" header="描述" />
          <Column header="状态" style="width: 90px">
            <template #body="{ data }">
              <Tag
                :value="data.status === 'active' ? '启用' : '禁用'"
                :severity="data.status === 'active' ? 'success' : 'secondary'"
              />
            </template>
          </Column>
          <Column field="createdAt" header="创建时间" style="width: 170px" />
          <Column header="操作" style="width: 200px">
            <template #body="{ data }">
              <Button
                label="编辑"
                size="small"
                text
                @click="openDialog(data)"
              />
              <Button
                label="权限"
                size="small"
                text
                @click="router.push(`/system/role/${data.id}/permission`)"
              />
              <Button
                label="删除"
                size="small"
                text
                severity="danger"
                @click="handleDelete(data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- 新增/编辑 Dialog -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="editingRecord ? '编辑角色' : '新增角色'"
      :modal="true"
      :style="{ width: '500px' }"
    >
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色名称</label
          >
          <InputText
            v-model="form.name"
            placeholder="请输入角色名称"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色编码</label
          >
          <InputText
            v-model="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >描述</label
          >
          <Textarea
            v-model="form.description"
            :rows="3"
            placeholder="请输入描述"
            style="width: 100%"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >状态</label
          >
          <div style="display: flex; gap: 16px">
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="role-status-active"
                value="active"
              />
              <label for="role-status-active">启用</label>
            </div>
            <div style="display: flex; gap: 4px; align-items: center">
              <RadioButton
                v-model="form.status"
                input-id="role-status-inactive"
                value="inactive"
              />
              <label for="role-status-inactive">禁用</label>
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
