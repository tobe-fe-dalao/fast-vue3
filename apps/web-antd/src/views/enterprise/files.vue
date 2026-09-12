<script setup lang="ts">
import type { StoredFile } from '@/api';

import { ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const uploaded = ref<StoredFile[]>([]);
const busy = ref(false);

async function upload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  busy.value = true;
  try {
    uploaded.value.unshift(await api.file.upload(file));
    message.success('上传成功');
  } catch (error) {
    message.error((error as Error).message);
  } finally {
    busy.value = false;
    (event.target as HTMLInputElement).value = '';
  }
}

async function remove(item: StoredFile) {
  const [tenantId, filename] = item.key.split('/');
  if (!tenantId || !filename) return message.error('文件键格式错误');
  try {
    await api.file.delete(Number(tenantId), filename);
    uploaded.value = uploaded.value.filter((value) => value.key !== item.key);
    message.success('已删除');
  } catch (error) {
    message.error((error as Error).message);
  }
}

async function download(item: StoredFile) {
  const [tenantId, filename] = item.key.split('/');
  if (!tenantId || !filename) return message.error('文件键格式错误');
  try {
    const blob = await api.file.download(Number(tenantId), filename);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = item.originalName;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    message.error((error as Error).message);
  }
}
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4">文件上传</ATypographyTitle
    ><ACard :bordered="false">
      <AAlert
        message="上传记录仅保留在当前页面。下载操作使用当前登录身份访问文件。"
        type="info"
        class="mb-4"
      /><input type="file" :disabled="busy" @change="upload" /><AList
        :data-source="uploaded"
        class="mt-4"
        bordered
      >
        <template #renderItem="{ item }">
          <AListItem>
            <AButton type="link" @click="download(item)">
              {{ item.originalName }}
            </AButton>
            （{{ item.size }} 字节）
            <template #actions>
              <APopconfirm title="删除该文件？" @confirm="remove(item)">
                <AButton danger type="link">删除</AButton>
              </APopconfirm>
            </template>
          </AListItem>
        </template>
      </AList>
    </ACard>
  </div>
</template>
