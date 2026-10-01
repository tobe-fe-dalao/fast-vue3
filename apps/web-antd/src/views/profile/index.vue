<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';

import { message } from 'ant-design-vue';

const userStore = useUserStore();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });

function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  message.success('保存成功');
  editVisible.value = false;
}
</script>

<template>
  <div class="admin-page">
    <ARow :gutter="16">
      <ACol :span="8">
        <ACard :bordered="false" class="shadow-sm">
          <div class="flex flex-col items-center gap-4">
            <AAvatar :size="80" class="bg-blue-500 text-2xl">
              {{ userStore.userName?.charAt(0)?.toUpperCase() }}
            </AAvatar>
            <div class="text-center">
              <div class="text-xl font-bold">
                {{ userStore.userName }}
              </div>
              <ATag
                :color="userStore.role === 'admin' ? 'blue' : 'green'"
                class="mt-1"
              >
                {{ userStore.role === 'admin' ? '管理员' : '普通用户' }}
              </ATag>
            </div>
            <AButton type="primary" @click="editVisible = true">
              编辑资料
            </AButton>
          </div>
        </ACard>
      </ACol>
      <ACol :span="16">
        <ACard title="个人信息" :bordered="false" class="shadow-sm">
          <ADescriptions :column="2" bordered>
            <ADescriptionsItem label="用户名">
              {{ userStore.userName }}
            </ADescriptionsItem>
            <ADescriptionsItem label="角色">
              {{ userStore.role }}
            </ADescriptionsItem>
            <ADescriptionsItem label="登录状态">
              <ABadge status="success" text="在线" />
            </ADescriptionsItem>
            <ADescriptionsItem label="最后登录">
              {{ lastLogin }}
            </ADescriptionsItem>
          </ADescriptions>
          <ADivider />
          <ADescriptions title="安全设置" :column="1" bordered>
            <ADescriptionsItem label="账户密码">
              <div class="flex-between">
                <span>已设置</span>
                <AButton size="small" @click="message.info('功能开发中')">
                  修改
                </AButton>
              </div>
            </ADescriptionsItem>
          </ADescriptions>
        </ACard>
      </ACol>
    </ARow>

    <AModal v-model:open="editVisible" title="编辑资料" @ok="handleSave">
      <AForm :model="form" :label-col="{ span: 4 }">
        <AFormItem label="用户名">
          <AInput v-model:value="form.userName" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
