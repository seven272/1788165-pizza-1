import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Index.vue";
import Cart from "@/views/Cart.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Order from "@/views/Orders.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutOther",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutOther",
    },
  },
  {
    path: "/orders",
    name: "Order",
    component: Order,
    meta: {
      layout: "AppLayoutOther",
    },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
