import { effectScope } from 'vue';

import { describe, expect, it } from 'vitest';

import { useLatestRequest } from './useLatestRequest';

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function createRequests() {
  const scope = effectScope();
  const requests = scope.run(() => useLatestRequest());
  if (!requests) throw new Error('Expected an active effect scope');
  return { scope, requests };
}

describe('useLatestRequest', () => {
  it('keeps the newest result and loading state when an older response finishes first', async () => {
    const { scope, requests } = createRequests();
    let value = '';
    let loading = false;
    async function load(response: Promise<string>) {
      const isCurrent = requests.start();
      loading = true;
      try {
        const result = await response;
        if (isCurrent()) value = result;
      } finally {
        if (isCurrent()) loading = false;
      }
    }
    const old = deferred<string>();
    const latest = deferred<string>();
    const first = load(old.promise);
    const second = load(latest.promise);
    old.resolve('old');
    await first;
    expect(value).toBe('');
    expect(loading).toBe(true);
    latest.resolve('new');
    await second;
    expect(value).toBe('new');
    expect(loading).toBe(false);
    scope.stop();
  });

  it('ignores a late old result after the latest result has arrived', async () => {
    const { scope, requests } = createRequests();
    let value = '';
    async function load(response: Promise<string>) {
      const isCurrent = requests.start();
      const result = await response;
      if (isCurrent()) value = result;
    }
    const old = deferred<string>();
    const first = load(old.promise);
    await load(Promise.resolve('new'));
    old.resolve('old');
    await first;
    expect(value).toBe('new');
    scope.stop();
  });

  it('invalidates mutations on route resets and on scope disposal', () => {
    const { scope, requests } = createRequests();
    const old = requests.start();
    requests.invalidate();
    expect(old()).toBe(false);
    const current = requests.start();
    expect(current()).toBe(true);
    scope.stop();
    expect(current()).toBe(false);
    expect(requests.start()()).toBe(false);
  });
});
