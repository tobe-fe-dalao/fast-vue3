import { InjectionKey } from 'vue';
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore
} from 'vuex';
import { modules } from './modules';
const { DEV } = import.meta.env;

export interface State {
  [key: string]: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  modules,
  strict: true,
  plugins: DEV ? [createLogger()] : []
});

export function useStore() {
  // return baseUseStore(key);
  return baseUseStore();
}

// 热重载
// if (import.meta.hot) {
//     import.meta.hot?.accept(Object.keys(context), () => {
//         const { modules } = loadModules()
//         store.hotUpdate({
//             modules
//         })
//     })
// }

export default store;
