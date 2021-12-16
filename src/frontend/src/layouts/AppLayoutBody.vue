<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <BuilderDoughSelector
                v-for="dough in makeNewObjectDough"
                :key="dough.id"
                v-bind:dough_pizza="dough"
                v-on:nameDoughPizza="showNameDough"
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
                @nameSizePizza="showNameSize"
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
                  @nameSaucePizza="showNameSauce"
                />
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                  <BuilderIngredientsSelector
                    v-for="ingred in makeNewObjectIngredients"
                    :key="ingred.id"
                    v-bind:ingredient_pizza="ingred"
                    v-on:nameInged="showNameIngred"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <BuilderPizzaView />
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
export default {
  name: "AppLayoutBody",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSauceSelector,
  },
  props: {},
  data: () => ({
    newobj: pizza.ingredients,
    objSauce: pizza.sauces,
    objDough: pizza.dough,
    objSize: pizza.sizes,
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
        objIngredients["style"] = newVal[0];
        arrObjIngred.push(objIngredients);
      });
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
      console.log(arrObjSizes);
      return arrObjSizes;
    },
  },
  methods: {
    showNameIngred(data) {
      console.log(data);
    },
    showNameSize(data) {
      console.log(data);
    },
    showNameDough(data) {
      console.log(data);
    },
    showNameSauce(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
