import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { init as initChart, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

export type { ECharts } from 'echarts/core';
export { graphic } from 'echarts/core';

/** Register only dashboard features; keep registration reachable when tree shaking. */
export function init(...args: Parameters<typeof initChart>) {
  use([
    BarChart,
    LineChart,
    PieChart,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    CanvasRenderer,
  ]);
  return initChart(...args);
}
