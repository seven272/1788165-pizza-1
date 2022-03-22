import jsonUser from "@/static/user.json";
export default {
  state: {
    user: jsonUser,
  },
  getters: {
    NAME_MODULE_AUTH: (state) => {
      return state.user.name;
    },
  },
  mutations: {},
  actions: {},
};
