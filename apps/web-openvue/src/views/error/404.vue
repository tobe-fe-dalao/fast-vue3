<script setup lang="ts">
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div class="text-8xl font-bold text-gray-200">404</div>
    <div class="text-xl font-bold text-gray-700">页面不存在</div>
    <Button label="返回首页" icon="pi pi-home" @click="router.push('/home')" />
  </div>
</template>
