export default {
  state: {
    countClick: 1,
    isShowPizza: true,
    priceProducts: {
      cola: 56,
      colaClick: 0,
      sauce: 30,
      sauceClick: 0,
      fries: 56,
      friesClick: 0,
    },
  },
  getters: {
    plusPizza(state, rootGetters) {
      return rootGetters.calculatePricePizza * state.countClick;
    },
    additionalProducts(state) {
      let finalPriceProducts =
        state.priceProducts.cola * state.priceProducts.colaClick +
        state.priceProducts.sauce * state.priceProducts.sauceClick +
        state.priceProducts.fries * state.priceProducts.friesClick;
      return finalPriceProducts;
    },
    finalPriceWihtAllGoods(state, getters) {
      return getters.additionalProducts + getters.plusPizza;
    },
    // typeDough(state, getters, rootState, rootGetters) {
    //   let valueDough = rootGetters.addClassSauce;
    //   // console.log(rootState.datesPizza);
    //   console.log(rootGetters.addClassSauce);
    //   console.log(rootState.finishPricePizza);
    //   // if (rootGetters.addClassSauce.name === "Толстое") {
    //   //   valueDough = "На толстом тесте";
    //   // } else {
    //   //   valueDough = "На тонком тесте";
    //   // }
    //   return valueDough;
    // },
  },
  mutations: {
    zoomInCounter(state, count) {
      state.countClick += count;
    },
    zoomOutCounter(state, count) {
      state.countClick -= count;
      if (state.countClick === 0) {
        state.isShowPizza = false;
      }
    },
    plusCounterCola(state, count) {
      state.priceProducts.colaClick += count;
    },
    minusCounterCola(state, count) {
      state.priceProducts.colaClick -= count;
    },
    plusCounterSauce(state, count) {
      state.priceProducts.sauceClick += count;
    },
    minusCounterSauce(state, count) {
      state.priceProducts.sauceClick -= count;
    },
    plusCounterFries(state, count) {
      state.priceProducts.friesClick += count;
    },
    minusCounterFries(state, count) {
      state.priceProducts.friesClick -= count;
    },
  },
  actions: {},
};
