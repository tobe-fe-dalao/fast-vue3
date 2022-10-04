/**
 * @name ConfigUnocssPlugin
 * @description 监听配置文件修改自动重启Vite
 */

// Unocss
import Unocss from 'unocss/vite';

export const ConfigUnocssPlugin = () => {
  return Unocss();
};
