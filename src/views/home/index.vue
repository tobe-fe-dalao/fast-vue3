<template>
  <nut-button type="info">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>
  <div>{{ getUserInfo }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useUserStore } from '@/store/modules/user';

export default defineComponent({
  name: 'Button',
  setup() {
    const userStore = useUserStore();
    const getUserInfo = computed(() => {
      const { name = '' } = userStore.getUserInfo || {};
      return name;
    });
    return {
      getUserInfo
    };
  }
});
</script>
