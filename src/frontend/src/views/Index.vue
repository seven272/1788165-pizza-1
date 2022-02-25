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
                    v-for="dough in objectDoughWithClass"
                    :key="dough.id"
                    :dough-pizza="dough"
                  />
                </div>
              </div>
            </div>
            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <BuilderSizeSelector
                    v-for="size in objectSizeWithClass"
                    :key="size.id"
                    :size-pizza="size"
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
                      v-for="sauce in objectSauceWithClass"
                      :key="sauce.id"
                      :sauce-pizza="sauce"
                    />
                  </div>
                  <div class="ingredients__filling">
                    <p>Начинка:</p>
                    <ul class="ingredients__list">
                      <BuilderIngredientsSelector
                        v-for="ingred in objectIngredientsWithClass"
                        :key="ingred.id"
                        v-bind:ingredient_pizza="ingred"
                        draggable="true"
                        @dragstart="onStartDrag($event)"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
              <BuilderPizzaView />
            </div>
          </div>
        </form>
      </main>
    </body>
  </div>
</template>

<script>
//Импорт дочерних компонентов
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector.vue";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView.vue";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderSauceSelector from "../modules/builder/components/BuilderSauceSelector.vue";
//импорт гетееров из vuex
import { mapGetters, mapState } from "vuex";
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
  data: () => ({}),
  computed: {
    //получаем геттеры из vuex
    ...mapGetters({
      objectSauceWithClass: "addClassSauce",
      objectDoughWithClass: "addClassDough",
      objectSizeWithClass: "addClassSize",
      objectIngredientsWithClass: "addClassIngredient",
      // idIngred: "getIdIngred",
      // priceIngred: "getPriceIngred",
      idIngredDelete: "getDeleteIdIngred",
      priceIngredDelete: "getDeletePriceIngred",
      arraySortIngredients: "getNewArrayIngredients",
    }),
    ...mapState({
      pizza: (state) => state.Builder.pizza,
      doughPiz: (state) => state.Builder.datesPizza,
      priceIngred: (state) => state.Builder.ingredientPrice,
      idIngred: (state) => state.Builder.ingredientId,
      // objectSauceWithClass: (state) => state.Builder.arrSauces,
    }),
  },
  methods: {
    onDrop(evt) {
      const ingredient = evt.dataTransfer.getData("itemObj");
      //преобразуем строку обратно в обьект
      const objIngredient = JSON.parse(ingredient);
      const ingredientName = objIngredient.name;
      const ingredientCost = objIngredient.price;
      this.priceIngred.push(ingredientCost);
      this.idIngred.push(ingredientName);
    },
  },
};
</script>

<style lang="scss" scoped></style>
