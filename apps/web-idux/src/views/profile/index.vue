<script setup lang="ts">
import { useUserStore } from '@fast-vue3/stores';
const userStore = useUserStore();
const editVisible = ref(false);
const lastLogin = new Date().toLocaleString('zh-CN');
const form = reactive({ userName: userStore.userName ?? '' });
const descData = computed(() => [
  { label: '用户名', content: userStore.userName },
  { label: '角色', content: userStore.role },
  { label: '最后登录', content: lastLogin },
]);
function handleSave() {
  userStore.setUserInfo({ userName: form.userName });
  editVisible.value = false;
}
</script>
<template>
  <div class="admin-page">
    <div class="grid grid-cols-3 gap-4">
      <div
        style="
          padding: 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
        "
      >
        <div class="flex flex-col items-center gap-4">
          <IxAvatar
            :text="userStore.userName?.charAt(0)?.toUpperCase()"
            size="xl"
            style="
              font-size: 24px;
              font-weight: 600;
              color: #fff;
              background: #6366f1;
            "
          />
          <div class="text-center">
            <div style="font-size: 18px; font-weight: 700">
              {{ userStore.userName }}
            </div>
            <IxTag
              :label="userStore.role"
              color="primary"
              style="margin-top: 4px"
            />
          </div>
          <IxButton mode="primary" @click="editVisible = true">
            编辑资料
          </IxButton>
        </div>
      </div>
      <div
        class="col-span-2"
        style="
          padding: 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
        "
      >
        <h3 style="margin-bottom: 16px; font-weight: 600">个人信息</h3>
        <IxDescriptions :data-source="descData" />
      </div>
    </div>
    <IxModal v-model:visible="editVisible" header="编辑资料" @ok="handleSave">
      <IxForm layout="vertical">
        <IxFormItem label="用户名">
          <IxInput v-model:value="form.userName" />
        </IxFormItem>
      </IxForm>
    </IxModal>
  </div>
</template>
