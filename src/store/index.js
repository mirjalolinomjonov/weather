import { createStore } from "vuex";
import axios from "@/plugns/axios.js";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    api_key: "7f8eb92dd49872de1b58298955efeacc",
    weather: {},
    regions: [
      "fergana",
      "andijon",
      "namangan",
      "tashkent",
      "qashqadaryo",
      "samarkand",
    ],
  },
  getters: {},
  mutations: {
    SET_WEATHER(state, payload) {
      console.log("payload", payload);
      state.weather = payload;
    },
  },
  actions: {
    async fetchWeather({ state, commit }, { query }) {
      return await new Promise((resolve, reject) => {
        this.$axios
          .get(`weather?q=${query}&units=metric&APPID=${state.api_key}`)
          .then((res) => {
            commit("SET_WEATHER", res.data);
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },
  },
  modules: {},
  plugins: [axiosPlugin],
});
