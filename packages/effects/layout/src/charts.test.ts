// @vitest-environment happy-dom
import { use } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { describe, expect, it, vi } from 'vitest';

import { graphic, init } from './charts';

describe('dashboard chart modules', () => {
  it.each(['line', 'pie', 'bar'])(
    'renders %s with the registered modules',
    (type) => {
      // SVG allows exercising the real chart engine without a native canvas dependency.
      use(SVGRenderer);
      const error = vi.spyOn(console, 'error');
      const root = document.createElement('div');
      const chart = init(root, undefined, {
        renderer: 'svg',
        width: 400,
        height: 240,
      });
      try {
        chart.setOption({
          animation: false,
          tooltip: { trigger: 'item' },
          legend: { data: ['Visits'] },
          ...(type === 'pie'
            ? {}
            : { xAxis: { data: ['Monday', 'Tuesday'] }, yAxis: {} }),
          series: [
            {
              name: 'Visits',
              type,
              data: [12, 18],
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#1890ff' },
                  { offset: 1, color: '#096dd9' },
                ]),
              },
            },
          ],
        });
        expect(root.querySelector('svg path')).not.toBeNull();
        expect(error).not.toHaveBeenCalled();
      } finally {
        chart.dispose();
        error.mockRestore();
      }
    },
  );
});
