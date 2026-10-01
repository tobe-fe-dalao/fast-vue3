<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { useMessage } from 'naive-ui';
const userStore = useUserStore();
const msg = useMessage();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  msg.success('保存成功');
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <n-grid :cols="3" :x-gap="16">
      <n-gi>
        <n-card>
          <div class="flex flex-col items-center gap-4">
            <n-avatar :size="80" round class="bg-blue-500 text-2xl">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </n-avatar>
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <n-tag
                :type="userStore.role === 'admin' ? 'info' : 'success'"
                class="mt-1"
              >
                {{ userStore.role }}
              </n-tag>
            </div>
            <n-button type="primary" @click="editVisible = true">
              编辑资料
            </n-button>
          </div>
        </n-card>
      </n-gi>
      <n-gi :span="2">
        <n-card title="个人信息">
          <n-descriptions label-placement="left" bordered :column="2">
            <n-descriptions-item label="用户名">
              {{ userStore.userName }}
            </n-descriptions-item>
            <n-descriptions-item label="角色">
              {{ userStore.role }}
            </n-descriptions-item>
            <n-descriptions-item label="登录状态">
              <n-badge dot type="success" /> 在线
            </n-descriptions-item>
            <n-descriptions-item label="最后登录">
              {{ lastLogin }}
            </n-descriptions-item>
          </n-descriptions>
        </n-card>
      </n-gi>
    </n-grid>
    <n-modal
      v-model:show="editVisible"
      title="编辑资料"
      preset="dialog"
      positive-text="保存"
      negative-text="取消"
      @positive-click="handleSave"
    >
      <n-form :model="form">
        <n-form-item label="用户名">
          <n-input v-model:value="form.userName" />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>
