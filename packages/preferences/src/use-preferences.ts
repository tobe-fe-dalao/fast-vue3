import type { AppPreferences, ThemeMode } from './types';

import { computed, ref, watch } from 'vue';

import { usePreferredDark } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

const defaultPreferences: AppPreferences = {
  themeMode: 'light',
  primaryColor: '#1677ff',
  sidebarCollapsed: false,
  sidebarWidth: 220,
  headerHeight: 56,
  contentCompact: false,
  enableTabs: true,
  enableBreadcrumb: true,
  locale: 'zh-CN',
  colorWeakMode: false,
  colorGrayMode: false,
};

export const usePreferences = defineStore(
  'app-preferences',
  () => {
    const preferences = ref<AppPreferences>({ ...defaultPreferences });
    const preferredDark = usePreferredDark();

    const isDark = computed(() => {
      if (preferences.value.themeMode === 'auto') {
        return preferredDark.value;
      }
      return preferences.value.themeMode === 'dark';
    });

    function setThemeMode(mode: ThemeMode) {
      preferences.value.themeMode = mode;
    }

    function setPrimaryColor(color: string) {
      preferences.value.primaryColor = color;
    }

    function toggleSidebar() {
      preferences.value.sidebarCollapsed = !preferences.value.sidebarCollapsed;
    }

    function resetPreferences() {
      preferences.value = { ...defaultPreferences };
    }

    // Apply theme to DOM
    watch(
      isDark,
      (dark) => {
        document.documentElement.classList.toggle('dark', dark);
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      },
      { immediate: true },
    );

    // Apply primary color as CSS variable
    watch(
      () => preferences.value.primaryColor,
      (color) => {
        document.documentElement.style.setProperty(
          '--app-primary-color',
          color,
        );
      },
      { immediate: true },
    );

    // Both modes share one CSS property, so apply them together.
    watch(
      () => [preferences.value.colorWeakMode, preferences.value.colorGrayMode],
      ([weak, gray]) => {
        document.documentElement.style.filter = [
          weak && 'invert(80%)',
          gray && 'grayscale(100%)',
        ]
          .filter(Boolean)
          .join(' ');
      },
      { immediate: true },
    );

    return {
      preferences,
      isDark,
      setThemeMode,
      setPrimaryColor,
      toggleSidebar,
      resetPreferences,
    };
  },
  {
    persist: {
      key: 'fast-vue3-preferences',
      pick: ['preferences'],
    },
  },
);

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePreferences, import.meta.hot));
}
