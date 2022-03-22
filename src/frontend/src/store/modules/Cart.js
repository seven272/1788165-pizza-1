import jsonMisc from "@/static/misc.json";
export default {
  state: {
    misc: jsonMisc,
    isShowPizza: true,
    priceProducts: {
      cola: jsonMisc[0].price,
      colaClick: 0,
      sauce: jsonMisc[1].price,
      sauceClick: 0,
      fries: jsonMisc[2].price,
      friesClick: 0,
    },
    arrayPizzas: [],
    // counterPizza: 1,
    // price: 11,
    // arrayPricesPizzas: [],
    idPizza: 0,
  },
  getters: {
    additionalProducts(state) {
      let finalPriceProducts =
        state.priceProducts.cola * state.priceProducts.colaClick +
        state.priceProducts.sauce * state.priceProducts.sauceClick +
        state.priceProducts.fries * state.priceProducts.friesClick;
      return finalPriceProducts;
    },
    priceAllPizzas(state) {
      let sum = 0;
      state.arrayPizzas.forEach((elem) => {
        sum += elem.pricePizza;
      });
      return sum;
    },
    finalPriceWihtAllGoods(state, getters) {
      return getters.additionalProducts + getters.priceAllPizzas;
    },
    // eslint-disable-next-line no-unused-vars
    addNewPizza(state, getters, rootState, rootGetters) {
      let objectPizza = {};
      objectPizza.idPizza =
        rootState.Builder.datesPizza.title
          .toLowerCase()
          .charCodeAt(0)
          .toString() +
        rootState.Builder.datesPizza.title
          .toLowerCase()
          .charCodeAt(1)
          .toString();
      // objectPizza.idPizza = Math.ceil(Math.random() * 998) + 1;
      objectPizza.namePizza = rootState.Builder.datesPizza.title;
      objectPizza.sizePizza = rootState.Builder.datesPizza.size;
      if (rootState.Builder.datesPizza.dough === "Толстое") {
        objectPizza.doughPizza = "на толстом тесте";
      } else {
        objectPizza.doughPizza = "на тонком тесте";
      }
      objectPizza.hiddenDoughPizza = rootState.Builder.datesPizza.dough;
      objectPizza.saucePizza = rootState.Builder.datesPizza.sauce.toLowerCase();
      //подставляю значения ингридиентов из геттера в модуле Builder
      objectPizza.hiddenIngredientesPizza = rootGetters.getNewArrayIngredients;
      // objectPizza.hiddenIngredientesPizza = rootState.Builder.ingredientId;
      console.log(
        "Данные из создаваемого обьектa:  " +
          objectPizza.hiddenIngredientesPizza
      );
      objectPizza.hiddenPriceIngredientes = rootState.Builder.ingredientPrice;
      objectPizza.hiddenPriceDeleteIngredientes =
        rootState.Builder.ingredientPriceDelete;
      objectPizza.ingredientPizza = rootGetters.getNewArrayIngredients
        .join(", ")
        .toLowerCase();
      // objectPizza.сounterPizza = 1;
      objectPizza.pricePizza = rootGetters.calculatePricePizza;
      objectPizza.priceForCalculate = rootGetters.calculatePricePizza;

      return objectPizza;
    },
  },
  mutations: {
    pricesPizzas(state, date) {
      console.log(date.keyId);
      let counter = date.keyCounter;
      let priceForCalc = date.keyPriceForCalc;
      let result = counter * priceForCalc;
      for (let i = 0; i < state.arrayPizzas.length; i++) {
        if (state.arrayPizzas[i].idPizza === date.keyId) {
          state.arrayPizzas[i].pricePizza = result;
        }
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
      console.log(count);
    },
    setNewPizza(state) {
      if (state.idPizza === 0) {
        state.arrayPizzas.push(this.getters.addNewPizza);
      } else {
        for (let i = 0; i < state.arrayPizzas.length; i++) {
          if (state.arrayPizzas[i].idPizza === state.idPizza) {
            state.arrayPizzas[i] = this.getters.addNewPizza;
          }
        }
      }
    },
    setIdPizza(state, date) {
      state.idPizza = date.idPizza;
    },
    setIdNewPizza(state) {
      state.idPizza = 0;
    },
  },
  actions: {},
};
