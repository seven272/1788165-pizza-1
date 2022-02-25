import jsonPizza from "@/static/pizza.json";
export default {
  state: {
    pizza: jsonPizza,
    doughesPizza: jsonPizza.dough,
    arrIngredients: [],
    ingredientId: [],
    ingredientIdDelete: [],
    ingredientPrice: [],
    ingredientPriceDelete: [],
    multiplierSize: 0,
    datesPizza: {
      title: "",
      dough: "Толстое",
      costDough: 300,
      sauce: "Томатный",
      costSauce: 50,
      size: "23 см",
      sortArrIngedients: [],
      costIngredients: 0,
      finishPricePizza: 1,
    },
    finishPricePizza: 0,
  },
  getters: {
    addClassSauce: (state) => {
      let arrSauces = [];
      let arrSauceValues = ["tomato", "creamy"];
      for (let i = 0; i < state.pizza.sauces.length; i++) {
        state.pizza.sauces[i]["value"] = arrSauceValues[i];
        arrSauces.push(state.pizza.sauces[i]);
      }
      return arrSauces;
    },
    addClassDough: (state) => {
      let arrDoughes = [];
      let arrDoughValues = ["light", "large"];
      for (let i = 0; i < state.pizza.dough.length; i++) {
        state.pizza.dough[i]["value"] = arrDoughValues[i];
        arrDoughes.push(state.pizza.dough[i]);
      }
      return arrDoughes;
    },
    addClassSize: (state) => {
      let arrSizes = [];
      let arrSizeValues = ["small", "normal", "big"];
      for (let i = 0; i < state.pizza.sizes.length; i++) {
        state.pizza.sizes[i]["value"] = arrSizeValues[i];
        arrSizes.push(state.pizza.sizes[i]);
      }
      return arrSizes;
    },
    addClassIngredient: (state) => {
      state.pizza.ingredients.forEach((element) => {
        //преобразуем на каждой итерации цикла обькт в массив
        const values = Object.values(element);
        //далее с помощью цепочки методов получаем из адресса изображение название стиля для иконки в списке
        const newVal = values
          .slice(2, 3)
          .toString()
          .split("/")
          .slice(4)
          .toString()
          .split(".")
          .slice(0, 1);
        //создаем массив обьектов с нужными ключами и значениями
        let objIngredients = {};
        objIngredients["id"] = element.id;
        objIngredients["name"] = element.name;
        objIngredients["price"] = element.price;
        objIngredients["style"] = newVal[0];
        state.arrIngredients.push(objIngredients);
      });
      return state.arrIngredients;
    },
    getNewArrayIngredients: (state) => {
      let arr1 = state.ingredientId;
      let arr2 = state.ingredientIdDelete;
      let newArr = arr1.map((elem) => {
        for (let i = 0; i < arr2.length; i++) {
          if (elem === arr2[i]) {
            elem = "";
            delete arr2[i];
          }
        }
        return elem;
      });
      let filterArr = newArr
        .filter((elem) => {
          if (elem !== "") {
            return true;
          }
        })
        .sort();
      state.ingredientId = filterArr;
      state.datesPizza.sortArrIngedients = state.ingredientId;
      return state.datesPizza.sortArrIngedients;
    },
    calculatePricePizza(state, getters) {
      let finalPrice =
        getters.chooseSize *
        (getters.calculatePriceDough +
          getters.calculatePriceSauce +
          getters.countPriceIngredients);
      state.finishPricePizza = finalPrice;
      console.log(state.datesPizza);
      return finalPrice;
    },
    countPriceIngredients(state) {
      let sumPlusIngredients = state.ingredientPrice.reduce((sum, elem) => {
        return sum + elem;
      }, 0);
      let sumMinusIngredients = state.ingredientPriceDelete.reduce(
        (sum, elem) => {
          return sum + elem;
        },
        0
      );
      state.datesPizza.costIngredients =
        sumPlusIngredients - sumMinusIngredients;
      return state.datesPizza.costIngredients;
    },
    calculatePriceDough(state) {
      if (state.datesPizza.costDough) {
        state.datesPizza.costDough = 300;
      }
      return state.datesPizza.costDough;
    },
    calculatePriceSauce(state) {
      if (state.datesPizza.costSauce) {
        state.datesPizza.costSauce = 50;
      }
      return state.datesPizza.costSauce;
    },
    chooseSize(state) {
      if (state.datesPizza.size === "23 см") {
        state.multiplierSize = 1;
      } else if (state.datesPizza.size === "32 см") {
        state.multiplierSize = 2;
      } else if (state.datesPizza.size === "45 см") {
        state.multiplierSize = 3;
      }
      return state.multiplierSize;
    },
  },
  mutations: {
    setDoughPizza: (state, payload) => {
      state.datesPizza.dough = payload;
    },
    setSaucePizza: (state, payload) => {
      state.datesPizza.sauce = payload;
    },
    setSizePizza: (state, payload) => {
      state.datesPizza.size = payload;
    },
    setNewNameAndPriceIngredient: (state, { name, price }) => {
      state.ingredientId.push(name);
      state.ingredientPrice.push(price);
    },
    setDeleteNameAndPriceIngredient: (state, { name, price }) => {
      state.ingredientIdDelete.push(name);
      state.ingredientPriceDelete.push(price);
    },
    setTitlePizza: (state, title) => {
      state.datesPizza.title = title;
    },
  },
  actions: {},
};
