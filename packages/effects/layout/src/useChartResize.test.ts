// @vitest-environment happy-dom
import { createApp, h, ref } from 'vue';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useChartResize } from './useChartResize';

const unmounts: (() => void)[] = [];
const observe = vi.fn();
const disconnect = vi.fn();
let notifyResize: () => void;
let runFrame: FrameRequestCallback;
const resize = vi.fn();

function mountCharts() {
  const app = createApp({
    setup() {
      const first = ref<HTMLElement>();
      const second = ref<HTMLElement>();
      useChartResize([first, second], resize);
      return () =>
        h('div', [h('div', { ref: first }), h('div', { ref: second })]);
    },
  });
  const root = document.createElement('div');
  app.mount(root);
  unmounts.push(() => app.unmount());
  return root;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    'ResizeObserver',
    class {
      disconnect = disconnect;
      observe = observe;
      constructor(callback: () => void) {
        notifyResize = callback;
      }
    },
  );
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn((callback: FrameRequestCallback) => {
      runFrame = callback;
      return 17;
    }),
  );
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => {
  unmounts.splice(0).forEach((unmount) => unmount());
  vi.unstubAllGlobals();
});

describe('chart container resizing', () => {
  it('observes each chart container after mounting', () => {
    const root = mountCharts();
    expect(observe.mock.calls.map(([element]) => element)).toEqual([
      ...root.querySelectorAll('div > div > div'),
    ]);
  });

  it('combines layout resize notifications into one update per frame', () => {
    mountCharts();
    notifyResize();
    notifyResize();
    expect(requestAnimationFrame).toHaveBeenCalledOnce();
    expect(resize).not.toHaveBeenCalled();
    runFrame(0);
    expect(resize).toHaveBeenCalledOnce();
    notifyResize();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it('disconnects and cancels queued work when the page unmounts', () => {
    mountCharts();
    notifyResize();
    unmounts.pop()?.();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(17);
    expect(resize).not.toHaveBeenCalled();
  });

  it('falls back to window resize and removes the listener on unmount', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    mountCharts();
    window.dispatchEvent(new Event('resize'));
    runFrame(0);
    expect(resize).toHaveBeenCalledOnce();
    unmounts.pop()?.();
    window.dispatchEvent(new Event('resize'));
    expect(requestAnimationFrame).toHaveBeenCalledOnce();
  });
});
