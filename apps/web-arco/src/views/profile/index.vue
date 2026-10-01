<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { Message } from '@arco-design/web-vue';
const userStore = useUserStore();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  Message.success('保存成功');
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :bordered="false">
          <div class="flex flex-col items-center gap-4">
            <a-avatar :size="80" class="bg-blue-500">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </a-avatar>
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <a-tag
                :color="userStore.role === 'admin' ? 'arcoblue' : 'green'"
                class="mt-1"
              >
                {{ userStore.role }}
              </a-tag>
            </div>
            <a-button type="primary" @click="editVisible = true">
              编辑资料
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card title="个人信息" :bordered="false">
          <a-descriptions :column="2" bordered>
            <a-descriptions-item label="用户名">
              {{ userStore.userName }}
            </a-descriptions-item>
            <a-descriptions-item label="角色">
              {{ userStore.role }}
            </a-descriptions-item>
            <a-descriptions-item label="最后登录">
              {{ lastLogin }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model:visible="editVisible" title="编辑资料" @ok="handleSave">
      <a-form :model="form">
        <a-form-item label="用户名">
          <a-input v-model="form.userName" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
