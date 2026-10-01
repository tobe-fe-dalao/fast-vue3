// @vitest-environment happy-dom
import type { Pinia } from 'pinia';

import { createApp, nextTick } from 'vue';

import { createPinia, disposePinia, setActivePinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { usePreferences } from './use-preferences';

const { systemDark } = vi.hoisted(() => ({ systemDark: { value: false } }));
vi.mock('@vueuse/core', () => ({ usePreferredDark: () => systemDark }));

let pinia: Pinia;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('style');
  document.documentElement.className = '';
  systemDark.value = false;
  pinia = createPinia();
  pinia.use(persistedState);
  createApp({}).use(pinia);
  setActivePinia(pinia);
});

afterEach(() => {
  disposePinia(pinia);
  localStorage.clear();
});

describe('preferences DOM effects', () => {
  it('combines accessibility filters and preserves the remaining mode', async () => {
    const store = usePreferences();
    store.preferences.colorWeakMode = true;
    store.preferences.colorGrayMode = true;
    await nextTick();
    expect(document.documentElement.style.filter).toBe(
      'invert(80%) grayscale(100%)',
    );
    store.preferences.colorGrayMode = false;
    await nextTick();
    expect(document.documentElement.style.filter).toBe('invert(80%)');
    store.preferences.colorGrayMode = true;
    store.preferences.colorWeakMode = false;
    await nextTick();
    expect(document.documentElement.style.filter).toBe('grayscale(100%)');
  });

  it('restores saved theme and filters through the actual persistence plugin', async () => {
    localStorage.setItem(
      'fast-vue3-preferences',
      JSON.stringify({
        preferences: {
          themeMode: 'dark',
          colorWeakMode: true,
          colorGrayMode: true,
        },
      }),
    );
    usePreferences();
    await nextTick();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.style.filter).toBe(
      'invert(80%) grayscale(100%)',
    );
  });

  it('saves theme changes for the next page load', async () => {
    usePreferences().setThemeMode('dark');
    await nextTick();
    expect(
      JSON.parse(localStorage.getItem('fast-vue3-preferences') ?? '{}')
        .preferences.themeMode,
    ).toBe('dark');
  });

  it('resets theme, primary color and filters together', async () => {
    const store = usePreferences();
    store.setThemeMode('dark');
    store.setPrimaryColor('#123456');
    store.preferences.colorGrayMode = true;
    await nextTick();
    store.resetPreferences();
    await nextTick();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(
      document.documentElement.style.getPropertyValue('--app-primary-color'),
    ).toBe('#1677ff');
    expect(document.documentElement.style.filter).toBe('');
  });
});
