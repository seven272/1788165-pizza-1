import Vue from "vue";
import Vuex from "vuex";
import Cart from "@/store/modules/Cart.js";
import Builder from "@/store/modules/Builder.js";
import Orders from "@/store/modules/Orders.js";
import Auth from "@/store/modules/Auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: "Корневой модуль VUEX в файле index.js",
  },
  getters: {
    INFO: (state) => {
      return state.info;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    Cart,
    Builder,
    Orders,
    Auth,
  },
});
