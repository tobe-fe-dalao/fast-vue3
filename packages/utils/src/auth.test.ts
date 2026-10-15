import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  clearToken,
  expireSession,
  getAuthHeader,
  getToken,
  onSessionExpired,
  setToken,
} from './auth';

describe('canonical authentication storage', () => {
  beforeEach(() => {
    const entries = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
      removeItem: (key: string) => entries.delete(key),
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('ignores legacy persisted tokens and rejects blank canonical tokens', () => {
    localStorage.setItem('fast-vue3-user', '{"token":"legacy"}');
    localStorage.setItem('fast-vue3:token', '   ');
    expect(getToken()).toBeNull();
    expect(getAuthHeader()).toBeNull();
    setToken('current');
    expect(getAuthHeader()).toBe('Bearer current');
  });

  it('expires one current session once and ignores late failures from old requests', () => {
    const expired = vi.fn();
    const stop = onSessionExpired(expired);
    setToken('current');
    localStorage.setItem('fast-vue3:refresh-token', 'refresh');
    expect(expireSession('Bearer old')).toBe(false);
    expect(getToken()).toBe('current');
    expect(expireSession('Bearer current')).toBe(true);
    expect(expireSession('Bearer current')).toBe(false);
    expect(expired).toHaveBeenCalledTimes(1);
    expect(getToken()).toBeNull();
    expect(localStorage.getItem('fast-vue3:refresh-token')).toBeNull();
    stop();
    clearToken();
  });
});
