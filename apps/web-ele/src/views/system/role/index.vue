<script setup lang="ts">
import { http } from '@/api/http';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<RoleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const dialogVisible = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const form = reactive({
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
        page: currentPage.value,
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
    ElMessage.error('加载角色列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
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
    ElMessage.warning('请填写必要信息');
    return;
  }
  try {
    const payload = { description: form.description, name: form.name };
    if (editingRecord.value) {
      await http.put({
        data: payload,
        url: `/roles/${editingRecord.value.id}`,
      });
      ElMessage.success('角色已更新');
    } else {
      await http.post({ data: { ...payload, code: form.code }, url: '/roles' });
      ElMessage.success('角色已创建');
    }
    dialogVisible.value = false;
    fetchData();
  } catch {
    ElMessage.error('角色保存失败');
  }
}

async function handleDelete(record: RoleRecord) {
  await ElMessageBox.confirm('确定删除该角色？', '提示', { type: 'warning' });
  await http.del({ url: `/roles/${record.id}` });
  ElMessage.success('已删除');
  fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <el-card shadow="never" class="mb-4">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="keyword"
            placeholder="角色名称 / 编码"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #append>
              <el-button @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="16" style="text-align: right">
          <el-button type="primary" @click="openDialog()">+ 新增角色</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="dataSource" stripe size="default">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="角色名称" width="140" />
        <el-table-column prop="code" label="角色编码" width="140" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'active' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="170" />
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
              @click="router.push(`/system/role/${row.id}/permission`)"
            >
              权限
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑 Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input
            v-model="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
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
