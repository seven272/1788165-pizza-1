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
      listIngredients: ["Лук", "Лук", "Лук"],
    },
    finishPricePizza: 0,
  },
  getters: {
    addClassSauce: (state) => {
      let sauces = state.pizza.sauces;
      let arrSauces = [];
      let arrSauceValues = ["tomato", "creamy"];
      for (let i = 0; i < sauces.length; i++) {
        sauces[i]["value"] = arrSauceValues[i];
        arrSauces.push(sauces[i]);
      }
      return arrSauces;
    },
    addClassDough: (state) => {
      let doughes = state.pizza.dough;
      let arrDoughes = [];
      let arrDoughValues = ["light", "large"];
      for (let i = 0; i < doughes.length; i++) {
        doughes[i]["value"] = arrDoughValues[i];
        arrDoughes.push(doughes[i]);
      }
      return arrDoughes;
    },
    addClassSize: (state) => {
      let sizes = state.pizza.sizes;
      let arrSizes = [];
      let arrSizeValues = ["small", "normal", "big"];
      for (let i = 0; i < sizes.length; i++) {
        sizes[i]["value"] = arrSizeValues[i];
        arrSizes.push(sizes[i]);
      }
      return arrSizes;
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
      // console.log("удаленные ингридиенты до " + state.ingredientIdDelete);
      let arr1 = state.ingredientId;
      let arr2 = state.ingredientIdDelete;
      let newArr = arr1.map((elem) => {
        for (let i = 0; i < arr2.length; i++) {
          if (elem === arr2[i]) {
            elem = "";
            arr2.pop(arr2[i]);
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
      //заменяем массив в стейте отсортированными ингридиентами
      state.ingredientId.splice(0, state.ingredientId.length, ...filterArr);
      // state.ingredientId = filterArr;
      // console.log("Стейт " + state.ingredientId);
      // console.log("внутри геттера " + filterArr);
      // console.log("удаленные ингридиенты поссле  " + state.ingredientIdDelete);
      return filterArr;
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
    setFinalPrice: (state) => {
      state.finishPricePizza = this.calculatePricePizza;
    },
    setDatesForPizza: (
      state,
      {
        idPizza,
        namePizza,
        sizePizza,
        saucePizza,
        hiddenDoughPizza,
        // priceForCalculate,
        hiddenPriceIngredientes,
        hiddenPriceDeleteIngredientes,
        hiddenIngredientesPizza,
      }
    ) => {
      state.datesPizza.title = namePizza;
      state.datesPizza.size = sizePizza;
      state.datesPizza.sauce =
        saucePizza.charAt(0).toUpperCase() + saucePizza.slice(1);
      state.datesPizza.dough = hiddenDoughPizza;
      //заменяю названия ингридиентов
      state.ingredientId.splice(
        0,
        state.ingredientId.length,
        ...hiddenIngredientesPizza
      );
      //заменяю массив с ценами ингридиентов
      state.ingredientPrice.splice(
        0,
        state.ingredientPrice.length,
        ...hiddenPriceIngredientes
      );
      //заменяю массив с ценами удаленных ингридиентов
      state.ingredientPriceDelete.splice(
        0,
        state.ingredientPriceDelete.length,
        ...hiddenPriceDeleteIngredientes
      );
      console.log(
        "Данные из уже созданного обьекта, после нажатия на изменить: " +
          hiddenIngredientesPizza
      );
      console.log("цены добавленных ингридиентов: " + hiddenPriceIngredientes);
      console.log(
        "цены удаленных ингридиентов: " + hiddenPriceDeleteIngredientes
      );
      console.log("ID this object " + idPizza);
    },
    setDatesNewPizza: (state) => {
      state.ingredientId.length = 0;
      state.ingredientPrice.length = 0;
      state.ingredientPriceDelete.length = 0;
      state.ingredientIdDelete.length = 0;
      state.datesPizza.title = "";
      state.datesPizza.size = "23 см";
      state.datesPizza.sauce = "Томатный";
      state.datesPizza.dough = "Толстое";
      console.log(state.ingredientPrice);
    },
  },
  actions: {},
};
