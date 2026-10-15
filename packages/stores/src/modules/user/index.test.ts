import { createApp, nextTick } from 'vue';

import { expireSession } from '@fast-vue3/utils';

import { disposePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setupStore } from '../../setup';
import { useUserStore } from './index';

describe('user session lifecycle', () => {
  const cleanup: Array<() => void> = [];
  beforeEach(() => {
    const entries = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, String(value)),
      removeItem: (key: string) => entries.delete(key),
    });
    vi.stubGlobal('window', { localStorage });
  });
  afterEach(() => {
    for (const stop of cleanup.splice(0)) stop();
    vi.unstubAllGlobals();
  });

  function createStore() {
    const app = createApp({});
    vi.spyOn(app, 'onUnmount').mockImplementation((callback) => {
      cleanup.push(callback);
      return app;
    });
    const pinia = setupStore(app);
    cleanup.push(() => disposePinia(pinia));
    return useUserStore(pinia);
  }

  it('keeps the store and request authentication aligned for blank tokens', () => {
    const store = createStore();
    store.setToken('   ');
    expect(store.isLoggedIn).toBe(false);
  });

  it('hydrates the canonical token instead of a conflicting legacy persisted token', async () => {
    localStorage.setItem('fast-vue3:token', 'current');
    localStorage.setItem(
      'fast-vue3-user',
      '{"token":"legacy","userName":"Admin","role":"admin"}',
    );
    const store = createStore();
    expect(store.token).toBe('current');
    expect(store.isLoggedIn).toBe(true);
    expect(store.userName).toBe('Admin');
    expect(
      JSON.parse(localStorage.getItem('fast-vue3-user') ?? '{}'),
    ).not.toHaveProperty('token');
    store.setUserInfo({ userName: 'Updated' });
    await nextTick();
    expect(
      JSON.parse(localStorage.getItem('fast-vue3-user') ?? '{}'),
    ).not.toHaveProperty('token');
  });

  it('does not restore a stale profile as logged in without a canonical token', () => {
    localStorage.setItem(
      'fast-vue3-user',
      '{"token":{"invalid":true},"userName":"Admin","role":"admin"}',
    );
    const store = createStore();
    expect(store.isLoggedIn).toBe(false);
    expect(store.isAdmin).toBe(false);
    expect(store.userName).toBeUndefined();
  });

  it.each(['{', 'null', '[]'])(
    'keeps a valid canonical session when the profile cache contains %s',
    (persisted) => {
      localStorage.setItem('fast-vue3:token', 'current');
      localStorage.setItem('fast-vue3-user', persisted);
      const store = createStore();
      expect(store.token).toBe('current');
      expect(store.isLoggedIn).toBe(true);
      expect(store.userName).toBeUndefined();
    },
  );

  it('rolls back access, refresh and profile when profile loading fails', async () => {
    const store = createStore();
    await expect(
      store.login(
        async () => ({ accessToken: 'access', refreshToken: 'refresh' }),
        async () => {
          throw new Error('profile failed');
        },
      ),
    ).rejects.toThrow('profile failed');
    await nextTick();
    expect(store.isLoggedIn).toBe(false);
    expect(localStorage.getItem('fast-vue3:token')).toBeNull();
    expect(localStorage.getItem('fast-vue3:refresh-token')).toBeNull();
    expect(
      JSON.parse(localStorage.getItem('fast-vue3-user') ?? '{}').token,
    ).toBeUndefined();
  });

  it('clears the active store after expiry and allows a new complete login', async () => {
    const store = createStore();
    await store.login(
      async () => ({ accessToken: 'expired', refreshToken: 'refresh' }),
      async () => ({ userName: 'Old', role: 'admin' }),
    );
    expect(expireSession('Bearer expired')).toBe(true);
    expect(store.isLoggedIn).toBe(false);
    expect(store.isAdmin).toBe(false);
    await store.login(
      async () => ({ accessToken: 'new', refreshToken: 'new-refresh' }),
      async () => ({ userName: 'New', role: 'admin' }),
    );
    expect(store.token).toBe('new');
    expect(store.userName).toBe('New');
  });

  it('tries revocation with credentials intact and clears locally even when it fails', async () => {
    const store = createStore();
    store.setToken('access');
    localStorage.setItem('fast-vue3:refresh-token', 'refresh');
    const revoke = vi.fn(async () => {
      expect(localStorage.getItem('fast-vue3:refresh-token')).toBe('refresh');
      throw new Error('offline');
    });
    await store.logoutWithRevoke(revoke);
    expect(revoke).toHaveBeenCalledTimes(1);
    expect(store.isLoggedIn).toBe(false);
    expect(localStorage.getItem('fast-vue3:refresh-token')).toBeNull();
  });
  it.each(['success', 'failure'] as const)(
    'ignores an old profile %s after a newer login completes',
    async (outcome) => {
      const store = createStore();
      let finish!: (value: { userName: string }) => void;
      let fail!: (reason: Error) => void;
      const profile = new Promise<{ userName: string }>((resolve, reject) => {
        finish = resolve;
        fail = reject;
      });
      const old = store.login(
        async () => ({ accessToken: 'old', refreshToken: 'old-refresh' }),
        () => profile,
      );
      await Promise.resolve();
      await store.login(
        async () => ({ accessToken: 'new', refreshToken: 'new-refresh' }),
        async () => ({ userName: 'New' }),
      );
      if (outcome === 'success') finish({ userName: 'Old' });
      else fail(new Error('old failed'));
      const result = await old.catch(() => undefined);
      expect(store.token).toBe('new');
      expect(store.userName).toBe('New');
      expect(result).toBe(false);
      expect(localStorage.getItem('fast-vue3:refresh-token')).toBe(
        'new-refresh',
      );
    },
  );

  it('ignores an old authentication response after a newer login completes', async () => {
    const store = createStore();
    let finish!: (value: { accessToken: string; refreshToken: string }) => void;
    const credentials = new Promise<{
      accessToken: string;
      refreshToken: string;
    }>((resolve) => {
      finish = resolve;
    });
    const old = store.login(
      () => credentials,
      async () => ({ userName: 'Old' }),
    );
    await store.login(
      async () => ({ accessToken: 'new', refreshToken: 'new-refresh' }),
      async () => ({ userName: 'New' }),
    );
    finish({ accessToken: 'old', refreshToken: 'old-refresh' });
    const result = await old.catch(() => undefined);
    expect(store.token).toBe('new');
    expect(store.userName).toBe('New');
    expect(result).toBe(false);
  });

  it('does not log out a new session when an old revocation finishes', async () => {
    const store = createStore();
    store.setToken('old');
    let finish!: () => void;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const logout = store.logoutWithRevoke(() => pending);
    await store.login(
      async () => ({ accessToken: 'new', refreshToken: 'new-refresh' }),
      async () => ({ userName: 'New' }),
    );
    finish();
    const result = await logout;
    expect(store.token).toBe('new');
    expect(store.userName).toBe('New');
    expect(result).toBe(false);
  });
});
