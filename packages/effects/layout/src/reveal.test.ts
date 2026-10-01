// @vitest-environment happy-dom
import { createApp, h, withDirectives } from 'vue';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { vReveal } from './reveal';

const unmounts: (() => void)[] = [];
let intersect: (visible: boolean) => void;
const observe = vi.fn();
const disconnect = vi.fn();
const observerConstructor = vi.fn(
  class {
    disconnect = disconnect;
    observe = observe;
    constructor(callback: IntersectionObserverCallback) {
      intersect = (visible) =>
        callback(
          [{ isIntersecting: visible } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
    }
  },
);

function mountReveal(arg?: string, delay?: number) {
  const root = document.createElement('div');
  const app = createApp({
    render: () => withDirectives(h('div'), [[vReveal, delay, arg]]),
  });
  app.mount(root);
  unmounts.push(() => app.unmount());
  return root.firstElementChild as HTMLElement;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('IntersectionObserver', observerConstructor);
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches: false,
  } as MediaQueryList);
});

afterEach(() => {
  unmounts.splice(0).forEach((unmount) => unmount());
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('scroll entrance directive', () => {
  it.each(['left', 'right', 'zoom', 'fade'])(
    'applies the %s variant and delay',
    (arg) => {
      const el = mountReveal(arg, 120);
      expect(el.classList.contains(`reveal-${arg}`)).toBe(true);
      expect(el.style.getPropertyValue('--reveal-delay')).toBe('120ms');
      expect(observe).toHaveBeenCalledWith(el);
    },
  );

  it('reveals once when intersecting and releases the observer', () => {
    const el = mountReveal();
    intersect(false);
    expect(el.classList.contains('is-visible')).toBe(false);
    intersect(true);
    expect(el.classList.contains('is-visible')).toBe(true);
    expect(disconnect).toHaveBeenCalledOnce();
    unmounts.pop()?.();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('disconnects when the page leaves before the element becomes visible', () => {
    mountReveal();
    unmounts.pop()?.();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('keeps content visible when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    expect(mountReveal().classList.contains('is-visible')).toBe(true);
  });

  it('honors reduced motion without creating an observer', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
    } as MediaQueryList);
    expect(mountReveal().classList.contains('is-visible')).toBe(true);
    expect(observerConstructor).not.toHaveBeenCalled();
  });

  it.each([-20, Number.NaN, Number.POSITIVE_INFINITY])(
    'ignores invalid delay %s',
    (delay) => {
      expect(
        mountReveal(undefined, delay).style.getPropertyValue('--reveal-delay'),
      ).toBe('');
    },
  );
});
