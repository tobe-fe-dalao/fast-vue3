/**
 * @name ConfigUnocssPlugin
 * @description 监听配置文件修改自动重启Vite
 */

// 引入unocss
import unoCss from 'unocss/vite';

export const ConfigUnocssPlugin = () => {
  return unoCss();
};
