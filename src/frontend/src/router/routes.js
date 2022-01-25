import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Index.vue";
import Cart from "../views/Cart.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Order from "../views/Orders.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/orders",
    name: "Order",
    component: Order,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
