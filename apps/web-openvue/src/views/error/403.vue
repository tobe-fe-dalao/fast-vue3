<script setup lang="ts">
const router = useRouter();
</script>
<template>
  <div class="flex-center h-screen flex-col gap-4">
    <div class="text-8xl font-bold text-red-200">403</div>
    <div class="text-xl font-bold text-gray-700">无权限访问</div>
    <div class="flex gap-2">
      <Button
        label="返回首页"
        icon="pi pi-home"
        @click="router.push('/home')"
      />
      <Button
        label="返回上页"
        icon="pi pi-arrow-left"
        severity="secondary"
        @click="router.back()"
      />
    </div>
  </div>
</template>
