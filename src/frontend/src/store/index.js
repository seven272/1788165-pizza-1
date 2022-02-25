import Vue from "vue";
import Vuex from "vuex";
import Cart from "@/store/modules/Cart.js";
import Builder from "@/store/modules/Builder.js";
import Orders from "@/store/modules/Orders.js";
import Auth from "@/store/modules/Auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Cart,
    Builder,
    Orders,
    Auth,
  },
});
