import { type App } from 'vue';

import '@idux/cdk/index.css';
import '@idux/components/style/core/reset.default.css';
import '@idux/components/style/core/reset-scroll.default.css';

import { createGlobalConfig } from '@idux/components/config';
import { IDUX_ICON_DEPENDENCIES, addIconDefinitions } from '@idux/components/icon';

addIconDefinitions(IDUX_ICON_DEPENDENCIES);

const loadIconDynamically = (iconName: string) => {
  return fetch(`/idux-icons/${iconName}.svg`).then((res) => res.text());
};

const customConfig = { icon: { loadIconDynamically } };
// 如果是 seer 主题
// customConfig = merge(seerConfig, { icon: { loadIconDynamically } })
const globalConfig = createGlobalConfig(customConfig);

const install = (app: App): void => {
  app.use(globalConfig);
};

export default { install };
