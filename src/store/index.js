import { createStore } from 'vuex'
import axiosConfig from '@/apis/axiosConfig';

export default createStore({
  state: {
    userId: "",
    authToken: "",
  },
  getters: {
    getUserId(state, getters) {
      return state.userId;
    },
    getAuthToken(state, getter) {
      return state.authToken;
    }
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload;
    },
    setAuthToken(state, payload) {
      state.authToken = payload;
    }
  },
  actions: {
    saveAuth(context, payload) {
      context.commit("setUserId", payload.userId);
      context.commit("setAuthToken", payload.authToken);
      axiosConfig.addAuthHeader(payload.authToken);
    },

    deleteAuth(context, payload) {
      context.commit("setUserId", "");
      context.commit("setAuthToken", "");
      axiosConfig.removeAuthHeader();
    }

  },
  modules: {
  }
})
