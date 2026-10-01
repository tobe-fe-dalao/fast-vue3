<script setup lang="ts">
import type { DictItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<DictItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const modalVisible = ref(false);
const editingRecord = ref<DictItem | null>(null);
const dataModalVisible = ref(false);
const dataRecord = ref<DictItem | null>(null);

const form = reactive({
  name: '',
  type: '',
  status: 'active' as DictItem['status'],
  remark: '',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '字典名称', dataIndex: 'name', width: 140 },
  { title: '字典类型', dataIndex: 'type', width: 180 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '备注', dataIndex: 'remark' },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 160, fixed: 'right' as const },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.system.dictList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
  } catch {
    message.error('加载字典列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openModal(record?: DictItem) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      type: record.type,
      status: record.status,
      remark: record.remark,
    });
  } else {
    Object.assign(form, { name: '', type: '', status: 'active', remark: '' });
  }
  modalVisible.value = true;
}

function openDataModal(record: DictItem) {
  dataRecord.value = record;
  dataModalVisible.value = true;
}

function handleSave() {
  if (!form.name || !form.type) {
    message.warning('请填写字典名称与类型');
    return;
  }
  message.success(editingRecord.value ? '字典已更新' : '字典已创建');
  modalVisible.value = false;
}

function handleDelete(record: DictItem) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  message.success('已删除');
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="admin-page">
    <!-- 搜索区域 -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="8">
          <AInput
            v-model:value="keyword"
            placeholder="字典名称 / 类型"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="8">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="8" style="text-align: right">
          <AButton type="primary" @click="openModal()">+ 新增字典</AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- 表格 -->
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 900 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'type'">
              <ATag color="blue">{{ record.type }}</ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '启用' : '停用' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openDataModal(record as DictItem)"
              >
                数据
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="openModal(record as DictItem)"
              >
                编辑
              </AButton>
              <APopconfirm
                title="确定删除该字典？"
                @confirm="handleDelete(record as DictItem)"
              >
                <AButton type="link" size="small" danger>删除</AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <!-- 新增/编辑 Modal -->
    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑字典' : '新增字典'"
      :width="520"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem
          label="字典名称"
          :rules="[{ required: true, message: '请输入字典名称' }]"
        >
          <AInput v-model:value="form.name" placeholder="请输入字典名称" />
        </AFormItem>
        <AFormItem
          label="字典类型"
          :rules="[{ required: true, message: '请输入字典类型' }]"
        >
          <AInput v-model:value="form.type" placeholder="如 sys_user_sex" />
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">启用</ARadio>
            <ARadio value="inactive">停用</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem label="备注">
          <ATextarea
            v-model:value="form.remark"
            :rows="2"
            placeholder="备注说明"
          />
        </AFormItem>
      </AForm>
    </AModal>

    <!-- 字典数据 Modal -->
    <AModal
      v-model:open="dataModalVisible"
      :title="`字典数据 - ${dataRecord?.name ?? ''}`"
      :footer="null"
      :width="420"
    >
      <ATable
        :data-source="dataRecord?.data ?? []"
        :columns="[
          { title: '标签', dataIndex: 'label' },
          { title: '值', dataIndex: 'value' },
        ]"
        :pagination="false"
        size="small"
      />
    </AModal>
  </div>
</template>
