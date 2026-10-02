<script setup lang="ts">
import { usePreferences } from '@fast-vue3/preferences';

import { darkTheme, dateZhCN, zhCN } from 'naive-ui';

const prefs = usePreferences();
const { isDark, preferences } = storeToRefs(prefs);

const naiveTheme = computed(() => (isDark.value ? darkTheme : null));
const naiveOverrides = computed(() => ({
  common: {
    primaryColor: preferences.value.primaryColor,
    primaryColorHover: preferences.value.primaryColor,
    primaryColorPressed: preferences.value.primaryColor,
    primaryColorSuppl: preferences.value.primaryColor,
  },
}));
</script>

<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="naiveTheme"
    :theme-overrides="naiveOverrides"
  >
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
