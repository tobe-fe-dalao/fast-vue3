import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
// 批量加载
const modules = import.meta.globEager('./mock/*.ts');

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