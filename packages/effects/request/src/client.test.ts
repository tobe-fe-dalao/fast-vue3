import { getToken, onSessionExpired, setToken } from '@fast-vue3/utils';

import { AxiosError, AxiosHeaders } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createHttpClient, createRequest } from './client';

describe('http session failures', () => {
  beforeEach(() => {
    const entries = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
      removeItem: (key: string) => entries.delete(key),
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it.each([401, 403, 500])(
    'preserves status %s and only expires authenticated 401 sessions',
    async (status) => {
      setToken('access');
      const expired = vi.fn();
      const stop = onSessionExpired(expired);
      const client = createHttpClient('/api/v1');
      client.defaults.adapter = async (config) => {
        expect(config.headers.authorization).toBe('Bearer access');
        throw new AxiosError('failed', undefined, config, undefined, {
          config,
          data: { code: status, message: 'server message' },
          headers: new AxiosHeaders(),
          status,
          statusText: 'failed',
        });
      };
      await expect(
        createRequest(client).get({ url: '/auth/me' }),
      ).rejects.toMatchObject({
        message: 'server message',
        status,
      });
      expect(getToken()).toBe(status === 401 ? null : 'access');
      expect(expired).toHaveBeenCalledTimes(status === 401 ? 1 : 0);
      stop();
    },
  );

  it('does not clear a new session after a late authenticated 401', async () => {
    setToken('old');
    const client = createHttpClient('/api/v1');
    client.defaults.adapter = async (config) => {
      setToken('new');
      throw new AxiosError('expired', undefined, config, undefined, {
        config,
        data: { message: 'expired' },
        headers: new AxiosHeaders(),
        status: 401,
        statusText: 'Unauthorized',
      });
    };
    await expect(
      createRequest(client).get({ url: '/data' }),
    ).rejects.toMatchObject({ status: 401 });
    expect(getToken()).toBe('new');
  });

  it('notifies once for concurrent 401s and ignores anonymous login failures', async () => {
    const expired = vi.fn();
    const stop = onSessionExpired(expired);
    const client = createHttpClient('/api/v1');
    client.defaults.adapter = async (config) => {
      throw new AxiosError('expired', undefined, config, undefined, {
        config,
        data: { message: 'expired' },
        headers: new AxiosHeaders(),
        status: 401,
        statusText: 'Unauthorized',
      });
    };
    const request = createRequest(client);
    await expect(request.post({ url: '/auth/login' })).rejects.toMatchObject({
      status: 401,
    });
    expect(expired).not.toHaveBeenCalled();
    setToken('access');
    await Promise.allSettled([
      request.get({ url: '/a' }),
      request.get({ url: '/b' }),
    ]);
    expect(expired).toHaveBeenCalledTimes(1);
    stop();
  });
});
