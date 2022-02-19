import Vue from "vue";
import App from "./App.vue";
import "@/plugins/ui.js";
import VueRouter from "vue-router";
import router from "./router/routes.js";
import store from "@/store";

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
