import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';

const pinia = createPinia();

export { useAppStore, useUserStore };
export default pinia;
