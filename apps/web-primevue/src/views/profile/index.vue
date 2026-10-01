<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { useToast } from 'primevue/usetoast';
const userStore = useUserStore();
const toast = useToast();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  toast.add({
    severity: 'success',
    summary: '成功',
    detail: '保存成功',
    life: 2000,
  });
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <div class="grid grid-cols-3 gap-4">
      <Card>
        <template #content>
          <div class="flex flex-col items-center gap-4">
            <Avatar
              :label="userStore.userName?.charAt(0)?.toUpperCase()"
              size="xlarge"
              style="
                width: 80px;
                height: 80px;
                font-size: 24px;
                color: #fff;
                background: #6366f1;
              "
            />
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <Tag :value="userStore.role" severity="info" class="mt-1" />
            </div>
            <Button
              label="编辑资料"
              icon="pi pi-pencil"
              @click="editVisible = true"
            />
          </div>
        </template>
      </Card>
      <Card class="col-span-2">
        <template #title> 个人信息 </template>
        <template #content>
          <table class="w-full text-sm">
            <tr class="border-b">
              <td class="py-2 text-gray-500 w-24">用户名</td>
              <td>{{ userStore.userName }}</td>
            </tr>
            <tr class="border-b">
              <td class="py-2 text-gray-500">角色</td>
              <td>{{ userStore.role }}</td>
            </tr>
            <tr>
              <td class="py-2 text-gray-500">最后登录</td>
              <td>{{ lastLogin }}</td>
            </tr>
          </table>
        </template>
      </Card>
    </div>
    <Dialog
      v-model:visible="editVisible"
      header="编辑资料"
      :style="{ width: '400px' }"
      modal
    >
      <div class="flex flex-col gap-3 py-2">
        <label class="text-sm font-medium">用户名</label>
        <InputText v-model="form.userName" class="w-full" />
      </div>
      <template #footer>
        <Button
          label="取消"
          severity="secondary"
          @click="editVisible = false"
        />
        <Button label="保存" @click="handleSave" />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>
