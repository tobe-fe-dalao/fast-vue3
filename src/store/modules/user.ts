import { loginPassword } from '@/api';
import { mutateState } from '@/utils';
import { useCookies } from '@vueuse/integrations/useCookies';
import { watch } from 'vue';
import { Module } from 'vuex';

const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  user: AnyObject;
}

const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
      token: token,
      user: {}
    };
  },
  mutations: {
    mutateState(state, payload) {
      mutateState(state, payload);
    }
  },
  actions: {
    login(context, payload: AnyObject) {
      return new Promise((resolve, reject) => {
        const { data, error } = loginPassword();
        watch(data, () => {
          context.commit('mutateState', data.value);
          // useCookies().set(VITE_TOKEN_KEY as string, data.value.token);
          resolve(data.value);
        });

        watch(error, () => {
          reject(error.value);
        });
      });
    }
  }
};

export default store;
