<script setup lang="ts">
import type { NotificationItem } from '@/api';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const items = ref<NotificationItem[]>([]);
const loading = ref(false);

async function load() {
  loading.value = true;
  try {
    items.value = await api.notification.list();
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

async function read(id: number) {
  try {
    await api.notification.read(id);
    await load();
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function readAll() {
  try {
    await api.notification.readAll();
    await load();
  } catch (error) {
    message.error((error as Error).message);
  }
}

onMounted(load);
</script>

<template>
  <div class="admin-page">
    <div class="admin-page-actions">
      <AButton @click="readAll">全部标为已读</AButton>
    </div>
    <ACard :bordered="false">
      <AList :data-source="items" :loading="loading" bordered>
        <template #renderItem="{ item }">
          <AListItem>
            <AListItemMeta
              :title="item.title"
              :description="`${item.content || ''} · ${item.createdAt}`"
            /><template #actions>
              <ATag v-if="!item.read" color="blue">未读</ATag
              ><AButton v-if="!item.read" type="link" @click="read(item.id)">
                标为已读
              </AButton>
            </template>
          </AListItem>
        </template>
      </AList>
    </ACard>
  </div>
</template>
