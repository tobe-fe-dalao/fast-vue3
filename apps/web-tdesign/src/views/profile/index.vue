<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { MessagePlugin } from 'tdesign-vue-next';
const userStore = useUserStore();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  MessagePlugin.success('保存成功');
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <t-row :gutter="16">
      <t-col :span="4">
        <t-card :bordered="false">
          <div class="flex flex-col items-center gap-4">
            <t-avatar size="80px" class="bg-blue-500">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </t-avatar>
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <t-tag
                :theme="userStore.role === 'admin' ? 'primary' : 'success'"
                class="mt-1"
              >
                {{ userStore.role }}
              </t-tag>
            </div>
            <t-button theme="primary" @click="editVisible = true">
              编辑资料
            </t-button>
          </div>
        </t-card>
      </t-col>
      <t-col :span="8">
        <t-card title="个人信息" :bordered="false">
          <t-descriptions title="" :column="2" bordered>
            <t-descriptions-item label="用户名">
              {{ userStore.userName }}
            </t-descriptions-item>
            <t-descriptions-item label="角色">
              {{ userStore.role }}
            </t-descriptions-item>
            <t-descriptions-item label="最后登录">
              {{ lastLogin }}
            </t-descriptions-item>
          </t-descriptions>
        </t-card>
      </t-col>
    </t-row>
    <t-dialog
      v-model:visible="editVisible"
      header="编辑资料"
      @confirm="handleSave"
    >
      <t-form :data="form">
        <t-form-item label="用户名" name="userName">
          <t-input v-model="form.userName" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
