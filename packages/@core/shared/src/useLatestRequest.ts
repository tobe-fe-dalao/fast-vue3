import { getCurrentScope, onScopeDispose } from 'vue';

/** Ignore superseded responses and invalidate pending work when its scope ends. */
export function useLatestRequest() {
  let generation = 0;
  let disposed = false;

  function invalidate() {
    generation += 1;
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      disposed = true;
      invalidate();
    });
  }

  return {
    invalidate,
    start() {
      const current = ++generation;
      return () => !disposed && current === generation;
    },
  };
}
