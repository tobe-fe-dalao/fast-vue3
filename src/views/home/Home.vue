<template>
  <nut-button type="info" @click="onSubmit">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import store from '@/store';

export default defineComponent({
  name: 'Button',
  setup() {
    const onSubmit = () => {
      store.dispatch('user/login').then((value) => {
        console.log(value);
      });
    };
    return {
      onSubmit
    };
  }
});
</script>
