import jsonPizza from "@/static/pizza.json";
export default {
  state: {
    pizza: jsonPizza,
    doughesPizza: jsonPizza.dough,
    ingredientId: [],
    ingredientIdDelete: [],
    ingredientPrice: [],
    ingredientPriceDelete: [],
    datesPizza: {
      title: "",
      dough: "Толстое",
      costDough: 300,
      sauce: "Томатный",
      costSauce: 50,
      size: "23 см",
    },
    finishPricePizza: 0,
    counterIngredients: 0,
    inputValue: 10,
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
    typeDough: (state) => {
      let value = "";
      if (state.datesPizza.dough === "Толстое") {
        value = "на толстом тесте";
      } else {
        value = "на тонком тесте";
      }
      return value;
    },
    addClassIngredient: (state) => {
      let arrIngredients = [];
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
        arrIngredients.push(objIngredients);
      });
      return arrIngredients;
    },
    getNewArrayIngredients: (state) => {
      let sortArrIngedients = [];
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
      sortArrIngedients = state.ingredientId;
      return sortArrIngedients;
    },
    calculatePricePizza(state, getters) {
      let finalPrice =
        getters.chooseSize *
        (getters.calculatePriceDough +
          getters.calculatePriceSauce +
          getters.countPriceIngredients);
      state.finishPricePizza = finalPrice;
      return finalPrice;
    },
    countPriceIngredients(state) {
      let costIngredients = 0;
      let sumPlusIngredients = state.ingredientPrice.reduce((sum, elem) => {
        return sum + elem;
      }, 0);
      let sumMinusIngredients = state.ingredientPriceDelete.reduce(
        (sum, elem) => {
          return sum + elem;
        },
        0
      );
      costIngredients = sumPlusIngredients - sumMinusIngredients;
      return costIngredients;
    },
    calculatePriceDough(state) {
      let priceDough = 0;
      if (state.datesPizza.costDough) {
        priceDough = 300;
      }
      return priceDough;
    },
    calculatePriceSauce(state) {
      let priceSauce = 0;
      if (state.datesPizza.costSauce) {
        priceSauce = 50;
      }
      return priceSauce;
    },
    chooseSize(state) {
      let multiplierSize = 0;
      if (state.datesPizza.size === "23 см") {
        multiplierSize = 1;
      } else if (state.datesPizza.size === "32 см") {
        multiplierSize = 2;
      } else if (state.datesPizza.size === "45 см") {
        multiplierSize = 3;
      }
      return multiplierSize;
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
