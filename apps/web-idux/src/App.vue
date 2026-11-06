<script setup lang="ts">
import { IxMessageProvider } from '@idux/components/message';
</script>

<template>
  <IxMessageProvider :top="16">
    <RouterView />
  </IxMessageProvider>
</template>
