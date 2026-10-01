import type { ObjectDirective } from 'vue';

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

/** Scroll entrance animation: v-reveal:left="delayInMs" (styles/site.css). */
export const vReveal: ObjectDirective<HTMLElement, number | undefined> = {
  mounted(el, { arg, value }) {
    el.classList.add('reveal');
    if (arg) el.classList.add(`reveal-${arg}`);
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
      el.style.setProperty('--reveal-delay', `${value}ms`);
    }

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add('is-visible');
          observer.disconnect();
          observers.delete(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observers.set(el, observer);
    observer.observe(el);
  },
  beforeUnmount(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
