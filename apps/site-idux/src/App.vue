<script setup lang="ts">
import { IxMessageProvider } from '@idux/components/message';

import Layout from './layout/index.vue';
</script>

<template>
  <IxMessageProvider :top="16">
    <Layout />
  </IxMessageProvider>
</template>
