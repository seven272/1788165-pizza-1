/*eslint-disable*/
<template>
  <div>
    <body>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>
            <div class="content__dough">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>
                <div class="sheet__content dough">
                  <BuilderDoughSelector
                    v-for="dough in makeNewObjectDough()"
                    :key="dough.id"
                    :dough-pizza="dough"
                    @nameDoughPizza="getDatesDough"
                  />
                </div>
              </div>
            </div>
            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <BuilderSizeSelector
                    v-for="size in makeNewObjectSizes()"
                    :key="size.id"
                    :size-pizza="size"
                    @nameSizePizza="getDatesSize"
                  />
                </div>
              </div>
            </div>
            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">
                  Выберите ингредиенты
                </h2>
                <div class="sheet__content ingredients">
                  <div class="ingredients__sauce">
                    <p>Основной соус:</p>
                    <BuilderSauceSelector
                      v-for="sauce in makeNewObjectSauces()"
                      :key="sauce.id"
                      :sauce-pizza="sauce"
                      @nameSaucePizza="getDatesSauce"
                    />
                  </div>
                  <div class="ingredients__filling">
                    <p>Начинка:</p>
                    <ul class="ingredients__list">
                      <BuilderIngredientsSelector
                        v-for="ingred in makeNewObjectIngredients()"
                        :key="ingred.id"
                        v-bind:ingredient_pizza="ingred"
                        v-on:nameInged="getNameIngred"
                        v-on:deleteInged="getDeleteNameIngred"
                        v-on:click="makeNewArrayIngredients"
                        draggable="true"
                        @dragstart="onStartDrag($event)"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
              <BuilderPizzaView
                :face-pizza="objDatesPizza"
                :price-pizza="objDatesPizza"
                :final-price-pizza="calculatePricePizza"
              />
            </div>
          </div>
        </form>
      </main>
    </body>
  </div>
</template>

<script>
// Импортируем JSON данные и статусы для карточек ингридиентов.
import pizza from "../static/pizza.json";
//Импорт дочерних компонентов
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector.vue";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView.vue";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderSauceSelector from "../modules/builder/components/BuilderSauceSelector.vue";
export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSauceSelector,
  },
  props: {},
  data: () => ({
    newobj: pizza.ingredients[0].name,
    objSauce: pizza.sauces,
    objDough: pizza.dough,
    objSize: pizza.sizes,
    ingredientId: [],
    ingredientIdDelete: [],
    ingredientPrice: [],
    ingredientPriceDelete: [],
    arrDatesPizza: [],
    objDatesPizza: {
      dough: "Толстое",
      costDough: 300,
      sauce: "Томатный",
      costSauce: 50,
      size: "23 см",
      sortArrIngedients: [],
    },
  }),
  computed: {
    calculatePricePizza() {
      return (
        this.chooseSize *
        (this.calculatePriceDough +
          this.calculatePriceSauce +
          this.countPriceIngredients)
      );
    },
    countPriceIngredients() {
      let sumPlusIngredients = this.ingredientPrice.reduce((sum, elem) => {
        return sum + elem;
      }, 0);
      let sumMinusIngredients = this.ingredientPriceDelete.reduce(
        (sum, elem) => {
          return sum + elem;
        },
        0
      );
      let finishCostIngredients = sumPlusIngredients - sumMinusIngredients;
      return finishCostIngredients;
    },
    calculatePriceDough() {
      let priceDough = 0;
      if (this.objDatesPizza.dough) {
        priceDough = 300;
      }
      return priceDough;
    },
    calculatePriceSauce() {
      let priceSauce = 0;
      if (this.objDatesPizza.sauce) {
        priceSauce = 50;
      }
      return priceSauce;
    },
    chooseSize() {
      let multiplierSize = 0;
      if (this.objDatesPizza.size === "23 см") {
        multiplierSize = 1;
      } else if (this.objDatesPizza.size === "32 см") {
        multiplierSize = 2;
      } else if (this.objDatesPizza.size === "45 см") {
        multiplierSize = 3;
      }
      return multiplierSize;
    },
  },
  methods: {
    makeNewObjectIngredients() {
      let arrObjIngred = [];
      pizza.ingredients.forEach((element) => {
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
        arrObjIngred.push(objIngredients);
      });
      return arrObjIngred;
    },
    makeNewObjectSizes() {
      let arrSizeValues = ["small", "normal", "big"];
      let arrObjSizes = [];
      for (let i = 0; i < this.objSize.length; i++) {
        pizza.sizes[i]["value"] = arrSizeValues[i];
        arrObjSizes.push(pizza.sizes[i]);
      }
      return arrObjSizes;
    },
    makeNewObjectSauces() {
      let arrSauceValues = ["tomato", "creamy"];
      let arrObjSauces = [];
      for (let i = 0; i < this.objSauce.length; i++) {
        pizza.sauces[i]["value"] = arrSauceValues[i];
        arrObjSauces.push(pizza.sauces[i]);
      }
      return arrObjSauces;
    },
    makeNewObjectDough() {
      let arrDoughValues = ["light", "large"];
      let arrObjDoughes = [];
      for (let i = 0; i < this.objDough.length; i++) {
        pizza.dough[i]["value"] = arrDoughValues[i];
        arrObjDoughes.push(pizza.dough[i]);
      }
      return arrObjDoughes;
    },
    getNameIngred(title, price) {
      this.ingredientId.push(title);
      this.ingredientPrice.push(price);
      this.makeNewArrayIngredients();
    },
    getDeleteNameIngred(title, price) {
      this.ingredientIdDelete.push(title);
      this.ingredientPriceDelete.push(price);
      this.makeNewArrayIngredients();
    },
    //сравниваем два массива удаленных и добавленных ингридиентов и формируем новый массив
    makeNewArrayIngredients() {
      let arr1 = this.ingredientId;
      let arr2 = this.ingredientIdDelete;
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
      this.ingredientId = filterArr;
      this.objDatesPizza.sortArrIngedients = this.ingredientId;
      return this.ingredientId;
    },
    getDatesSize(dateSize) {
      this.objDatesPizza.size = dateSize.name;
    },
    getDatesDough(dateDough) {
      this.objDatesPizza.dough = dateDough.name;
    },
    getDatesSauce(dateSauce) {
      this.objDatesPizza.sauce = dateSauce.name;
    },
    onDrop(evt) {
      const ingredient = evt.dataTransfer.getData("itemObj");
      //преобразуем строку обратно в обьект
      const objIngredient = JSON.parse(ingredient);
      const ingredientName = objIngredient.name;
      const ingredientCost = objIngredient.price;
      this.ingredientPrice.push(ingredientCost);
      this.ingredientId.push(ingredientName);
      this.makeNewArrayIngredients();
    },
  },
};
</script>

<style lang="scss" scoped></style>
