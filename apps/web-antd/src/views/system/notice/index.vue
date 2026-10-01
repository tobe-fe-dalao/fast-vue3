<script setup lang="ts">
import type { NoticeItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<NoticeItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const typeFilter = ref('');

const modalVisible = ref(false);
const detailVisible = ref(false);
const editingRecord = ref<NoticeItem | null>(null);
const detailRecord = ref<NoticeItem | null>(null);

const form = reactive({
  title: '',
  type: '通知',
  status: 'active' as NoticeItem['status'],
  content: '',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '标题', dataIndex: 'title' },
  { title: '类型', dataIndex: 'type', width: 90 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '发布人', dataIndex: 'author', width: 110 },
  { title: '发布时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 160, fixed: 'right' as const },
];

const typeColorMap: Record<string, string> = {
  通知: 'blue',
  公告: 'gold',
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.system.noticeList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: keyword.value || undefined,
      type: typeFilter.value || undefined,
    });
    dataSource.value = res.items;
    total.value = res.total;
  } catch {
    message.error('加载通知列表失败');
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
  typeFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openModal(record?: NoticeItem) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      title: record.title,
      type: record.type,
      status: record.status,
      content: record.content,
    });
  } else {
    Object.assign(form, {
      title: '',
      type: '通知',
      status: 'active',
      content: '',
    });
  }
  modalVisible.value = true;
}

function openDetail(record: NoticeItem) {
  detailRecord.value = record;
  detailVisible.value = true;
}

function handleSave() {
  if (!form.title || !form.content) {
    message.warning('请填写标题与内容');
    return;
  }
  message.success(editingRecord.value ? '通知已更新' : '通知已发布');
  modalVisible.value = false;
}

function handleDelete(record: NoticeItem) {
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
        <ACol :span="6">
          <AInput
            v-model:value="keyword"
            placeholder="通知标题"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="typeFilter"
            placeholder="类型"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption value="通知">通知</ASelectOption>
            <ASelectOption value="公告">公告</ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="6">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="8" style="text-align: right">
          <AButton type="primary" @click="openModal()">+ 发布通知</AButton>
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
              <ATag :color="typeColorMap[record.type] ?? 'default'">
                {{ record.type }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '已发布' : '草稿' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openDetail(record as NoticeItem)"
              >
                查看
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="openModal(record as NoticeItem)"
              >
                编辑
              </AButton>
              <APopconfirm
                title="确定删除该通知？"
                @confirm="handleDelete(record as NoticeItem)"
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
      :title="editingRecord ? '编辑通知' : '发布通知'"
      :width="640"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
        <AFormItem
          label="标题"
          :rules="[{ required: true, message: '请输入标题' }]"
        >
          <AInput v-model:value="form.title" placeholder="请输入通知标题" />
        </AFormItem>
        <AFormItem label="类型">
          <ARadioGroup v-model:value="form.type">
            <ARadio value="通知">通知</ARadio>
            <ARadio value="公告">公告</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">发布</ARadio>
            <ARadio value="inactive">存为草稿</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem
          label="内容"
          :rules="[{ required: true, message: '请输入内容' }]"
        >
          <ATextarea
            v-model:value="form.content"
            :rows="5"
            placeholder="请输入通知内容"
          />
        </AFormItem>
      </AForm>
    </AModal>

    <!-- 详情 Modal -->
    <AModal
      v-model:open="detailVisible"
      :title="detailRecord?.title"
      :footer="null"
      :width="560"
    >
      <div style="margin-bottom: 16px; font-size: 0.85rem; color: #6b7280">
        {{ detailRecord?.author }} · {{ detailRecord?.createdAt }}
      </div>
      <p style="line-height: 1.8; color: #374151">
        {{ detailRecord?.content }}
      </p>
    </AModal>
  </div>
</template>
