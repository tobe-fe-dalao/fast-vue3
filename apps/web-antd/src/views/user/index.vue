<script setup lang="ts">
import type { UserItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const searchText = ref('');
const loading = ref(false);

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'roles', key: 'roles', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 160 },
];

const dataSource = ref<UserItem[]>([]);
const pagination = reactive({ current: 1, pageSize: 5, total: 0 });

const roleColor: Record<string, string> = {
  admin: 'blue',
  editor: 'green',
  viewer: 'default',
  user: 'green',
  '*': 'blue',
};
const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
  user: '普通用户',
  '*': '超管',
};

async function load(page = 1) {
  loading.value = true;
  try {
    const res = await api.user.list({
      page,
      pageSize: pagination.pageSize,
      keyword: searchText.value || undefined,
    });
    dataSource.value = res.items;
    pagination.current = res.page;
    pagination.total = res.total;
  } finally {
    loading.value = false;
  }
}

onMounted(() => load());

function onSearch() {
  load(1);
}

function onTableChange(p: { current?: number; pageSize?: number }) {
  pagination.pageSize = p.pageSize ?? pagination.pageSize;
  load(p.current ?? 1);
}

async function handleDelete(id: number) {
  await api.user.delete(id);
  message.success('已删除');
  load(pagination.current);
}
</script>

<template>
  <div class="admin-page">
    <div class="admin-page-actions">
      <AButton type="primary">+ 新增用户</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <AInputSearch
          v-model:value="searchText"
          placeholder="搜索用户名或邮箱…"
          style="width: 320px"
          allow-clear
          @search="onSearch"
        />
      </div>
      <ATable
        :data-source="dataSource"
        :columns="columns"
        :loading="loading"
        :pagination="{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }"
        size="middle"
        row-key="id"
        @change="onTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'roles'">
            <ATag
              v-for="r in (record as UserItem).roles || []"
              :key="r"
              :color="roleColor[r]"
            >
              {{ roleLabel[r] || r }}
            </ATag>
          </template>
          <template v-if="column.key === 'status'">
            <ABadge
              :status="
                (record as UserItem).status === 'active' ? 'success' : 'default'
              "
            />
            <span>
              {{ (record as UserItem).status === 'active' ? '启用' : '禁用' }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <AButton
              type="link"
              size="small"
              @click="message.info(`编辑 ${(record as UserItem).username}`)"
            >
              编辑
            </AButton>
            <AButton
              type="link"
              size="small"
              danger
              @click="handleDelete((record as UserItem).id)"
            >
              删除
            </AButton>
          </template>
        </template>
      </ATable>
    </ACard>
  </div>
</template>
