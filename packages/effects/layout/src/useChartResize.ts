import type { Ref } from 'vue';

import { onBeforeUnmount, onMounted } from 'vue';

/** Resize charts with their containers, including sidebar/layout transitions. */
export function useChartResize(
  containers: readonly Readonly<Ref<HTMLElement | undefined>>[],
  resize: () => void,
) {
  let observer: ResizeObserver | undefined;
  let frame: number | undefined;

  function scheduleResize() {
    if (frame !== undefined) return;
    frame = requestAnimationFrame(() => {
      frame = undefined;
      resize();
    });
  }

  onMounted(() => {
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', scheduleResize);
      return;
    }
    observer = new ResizeObserver(scheduleResize);
    for (const container of containers) {
      if (container.value) observer.observe(container.value);
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    window.removeEventListener('resize', scheduleResize);
    if (frame !== undefined) cancelAnimationFrame(frame);
  });
}
