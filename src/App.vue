<template>
  <ConfigProvider :theme-vars="{ blue: '#6476FF', navBarArrowSize: '1.4rem' }">
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component
              v-if="route.meta && route.meta.keepAlive"
              :is="Component"
              :key="route.meta.usePathKey ? route.fullPath : undefined"
            />
          </keep-alive>
          <component
            v-if="!(route.meta && route.meta.keepAlive)"
            :is="Component"
            :key="route.meta.usePathKey ? route.fullPath : undefined"
          />
        </router-view>
      </template>
      <template #fallback>Loading...</template>
    </Suspense>
  </ConfigProvider>
</template>
<script setup>
import { ConfigProvider } from 'vant';
</script>
