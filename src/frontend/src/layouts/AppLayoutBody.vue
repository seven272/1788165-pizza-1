<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1
          class="title title--big"
          @drop="onDrop($event, 1)"
          @dragover.prevent
          @dragenter.prevent
        >
          Конструктор пиццы
        </h1>
        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <BuilderDoughSelector
                v-for="dough in makeNewObjectDough"
                :key="dough.id"
                v-bind:dough_pizza="dough"
                v-on:nameDoughPizza="getDatesDough"
              />
            </div>
          </div>
        </div>
        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <BuilderSizeSelector
                v-for="size in makeNewObjectSizes"
                :key="size.id"
                :size_pizza="size"
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
                  v-for="sauce in makeNewObjectSauces"
                  :key="sauce.id"
                  v-bind:sauce_pizza="sauce"
                  @nameSaucePizza="getDatesSauce"
                />
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <BuilderIngredientsSelector
                    v-for="ingred in makeNewObjectIngredients"
                    :key="ingred.id"
                    v-bind:ingredient_pizza="ingred"
                    v-on:nameInged="getNameIngred"
                    v-on:deleteInged="getDeleteNameIngred"
                    v-on:click="makeNewArrayIngredients"
                    draggable="true"
                    @dragstart="onStartDrag($event, ingred)"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <BuilderPizzaView
          v-bind:obj_pizza="objDatesPizza"
          v-bind:price_pizza="costPizza"
          @drop.native="onDrop($event, objSize)"
          @dragover.prevent
          @dragenter.prevent
        />
      </div>
    </form>
  </main>
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
// import AppDrag from "../common/components.AppDrag.vue";
export default {
  name: "AppLayoutBody",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSauceSelector,
    // AppDrag,
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
      sauce: "Томатный",
      sortArrIngedients: [],
    },
    costPizza: {
      costDough: 300,
      costSauce: 50,
      multiplierSize: 1,
      costIngredients: 0,
      finalPrice: 0,
    },
  }),
  computed: {
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
      // console.log(arrObjIngred);
      return arrObjIngred;
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
    makeNewObjectSizes() {
      let arrSizeValues = ["small", "normal", "big"];
      let arrObjSizes = [];
      for (let i = 0; i < this.objSize.length; i++) {
        pizza.sizes[i]["value"] = arrSizeValues[i];
        arrObjSizes.push(pizza.sizes[i]);
      }
      return arrObjSizes;
    },
  },
  methods: {
    getNameIngred(title, price) {
      this.ingredientId.push(title);
      this.ingredientPrice.push(price);
      // console.log(this.ingredientPrice);
      this.makeNewArrayIngredients();
      this.countPriceIngredients();
      this.calculatePricePizza();
    },
    getDeleteNameIngred(title, price) {
      this.ingredientIdDelete.push(title);
      this.ingredientPriceDelete.push(price);
      this.makeNewArrayIngredients();
      this.countPriceIngredients();
      this.calculatePricePizza();
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
      this.costPizza.costIngredients = finishCostIngredients;
      // console.log(this.costPizza.costIngredients);
      return this.costPizza.costIngredients;
    },
    getDatesSize(title, multiplier) {
      this.objDatesPizza.size = title;
      this.costPizza.multiplierSize = multiplier;
      // console.log(this.costPizza.multiplierSize);
      this.calculatePricePizza();
    },
    getDatesDough(title, price) {
      this.objDatesPizza.dough = title;
      this.costPizza.costDough = price;
      this.calculatePricePizza();
    },
    getDatesSauce(title, price) {
      this.objDatesPizza.sauce = title;
      this.costPizza.costSauce = price;
      this.calculatePricePizza();
    },
    calculatePricePizza() {
      let price =
        this.costPizza.multiplierSize *
        (this.costPizza.costDough +
          this.costPizza.costSauce +
          this.costPizza.costIngredients);
      this.costPizza.finalPrice = price;
      console.log(this.costPizza.finalPrice);
      return this.costPizza.finalPrice;
    },
    onStartDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id.toString());
      // let bbb = evt.dataTransfer.setData("ingredID", ingred.id);
      // console.log(evt);
    },
    // eslint-disable-next-line no-unused-vars
    onDrop(evt, list) {
      const ingredID = evt.dataTransfer.getData("itemID");
      console.log(ingredID);
      // console.log(list);
      // const item = this.makeNewObjectIngredients.find((item) => item.id == 3);
      // console.log(item);
      // item.list = list;
      // console.log(list);
    },
  },
};
</script>

<style lang="scss" scoped></style>
