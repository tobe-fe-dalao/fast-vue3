<script setup lang="ts">
import type { ConfigItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<ConfigItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const modalVisible = ref(false);
const editingRecord = ref<ConfigItem | null>(null);

const form = reactive({
  name: '',
  key: '',
  value: '',
  type: 'custom' as ConfigItem['type'],
  remark: '',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '参数名称', dataIndex: 'name', width: 200 },
  { title: '参数键', dataIndex: 'key', width: 220 },
  { title: '参数值', dataIndex: 'value', width: 120 },
  { title: '类型', dataIndex: 'type', width: 90 },
  { title: '备注', dataIndex: 'remark' },
  { title: '操作', key: 'action', width: 120, fixed: 'right' as const },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.system.configList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
  } catch {
    message.error('加载参数列表失败');
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

function openModal(record?: ConfigItem) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      key: record.key,
      value: record.value,
      type: record.type,
      remark: record.remark,
    });
  } else {
    Object.assign(form, {
      name: '',
      key: '',
      value: '',
      type: 'custom',
      remark: '',
    });
  }
  modalVisible.value = true;
}

function handleSave() {
  if (!form.name || !form.key) {
    message.warning('请填写参数名称与键');
    return;
  }
  message.success(editingRecord.value ? '参数已更新' : '参数已创建');
  modalVisible.value = false;
}

function handleDelete(record: ConfigItem) {
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
            placeholder="参数名称 / 键"
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
          <AButton type="primary" @click="openModal()">+ 新增参数</AButton>
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
          :scroll="{ x: 1000 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'key'">
              <code
                style="
                  padding: 2px 6px;
                  font-size: 0.85rem;
                  background: #f3f4f6;
                  border-radius: 4px;
                "
              >
                {{ record.key }}
              </code>
            </template>
            <template v-if="column.dataIndex === 'type'">
              <ATag :color="record.type === 'built-in' ? 'purple' : 'cyan'">
                {{ record.type === 'built-in' ? '内置' : '自定义' }}
              </ATag>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openModal(record as ConfigItem)"
              >
                编辑
              </AButton>
              <APopconfirm
                v-if="record.type !== 'built-in'"
                title="确定删除该参数？"
                @confirm="handleDelete(record as ConfigItem)"
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
      :title="editingRecord ? '编辑参数' : '新增参数'"
      :width="560"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem
          label="参数名称"
          :rules="[{ required: true, message: '请输入参数名称' }]"
        >
          <AInput v-model:value="form.name" placeholder="请输入参数名称" />
        </AFormItem>
        <AFormItem
          label="参数键"
          :rules="[{ required: true, message: '请输入参数键' }]"
        >
          <AInput
            v-model:value="form.key"
            placeholder="如 sys.user.initPassword"
          />
        </AFormItem>
        <AFormItem label="参数值">
          <AInput v-model:value="form.value" placeholder="请输入参数值" />
        </AFormItem>
        <AFormItem label="类型">
          <ARadioGroup v-model:value="form.type">
            <ARadio value="custom">自定义</ARadio>
            <ARadio value="built-in">内置</ARadio>
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
  </div>
</template>
