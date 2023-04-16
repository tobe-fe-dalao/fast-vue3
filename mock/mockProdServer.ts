import { createProdMockServer } from 'vite-plugin-mock/dist/client';
// 批量加载
const modules: Record<string, any> = import.meta.glob('./mock/*.ts', { eager: true });

const mockModules: Array<string> = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
