<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { ElMessage } from 'element-plus';
const userStore = useUserStore();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  ElMessage.success('保存成功');
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card shadow="never">
          <div class="flex flex-col items-center gap-4">
            <el-avatar :size="80" class="bg-blue-500 text-2xl">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </el-avatar>
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <el-tag
                :type="userStore.role === 'admin' ? 'primary' : 'success'"
                class="mt-1"
              >
                {{ userStore.role }}
              </el-tag>
            </div>
            <el-button type="primary" @click="editVisible = true">
              编辑资料
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card header="个人信息" shadow="never">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户名">
              {{ userStore.userName }}
            </el-descriptions-item>
            <el-descriptions-item label="角色">
              {{ userStore.role }}
            </el-descriptions-item>
            <el-descriptions-item label="登录状态">
              <el-badge is-dot type="success" />&nbsp;在线
            </el-descriptions-item>
            <el-descriptions-item label="最后登录">
              {{ lastLogin }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="editVisible" title="编辑资料" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handleSave"> 保存 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
