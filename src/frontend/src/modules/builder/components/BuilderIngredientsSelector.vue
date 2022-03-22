/* eslint-disable vue/return-in-computed-property */
<template>
  <li
    class="ingredients__item"
    :draggable="isDisabledDraggble"
    @dragstart="onDrag($event, ingredient_pizza)"
  >
    <span class="filling" :class="`filling--${ingredient_pizza.style}`">{{
      ingredient_pizza.name
    }}</span>

    <div class="counter counter--orange ingredients__counter">
      <button
        ref="buttonMinus"
        type="button"
        class="counter__button counter__button--minus"
        :disabled="isDisabledButtonMinus"
        @click="sendDeleteNameAndPrice()"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        ref="inputCounter"
        type="text"
        name="counter"
        class="counter__input"
        :value="lengthIngredients >= 1 ? lengthIngredients : 0"
      />
      <button
        ref="buttonPlus"
        type="button"
        class="counter__button counter__button--plus"
        :disabled="isDisabledButtonPlus"
        @click="sendNameAndPrice()"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredient_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    //методы для хранилища
    sendNameAndPrice() {
      this.$store.commit("setNewNameAndPriceIngredient", this.ingredient_pizza);
    },
    sendDeleteNameAndPrice() {
      this.$store.commit(
        "setDeleteNameAndPriceIngredient",
        this.ingredient_pizza
      );
    },
    //конец методов для хранилища
    onDrag(evt, ingredient) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      //преобразуем обьект в строку
      const strIngredient = JSON.stringify(ingredient);
      evt.dataTransfer.setData("itemObj", strIngredient);
    },
  },
  computed: {
    ...mapGetters({
      // arrayIngredients: "getNewArrayIngredients",
    }),
    ...mapState({
      arrayPizzas: (state) => state.Cart.arrayPizzas,
      idPizza: (state) => state.Cart.idPizza,
      arrayIngredients: (state) => state.Builder.ingredientId,
    }),

    lengthIngredients() {
      let length = 0;
      let ingredients = [];
      if (this.arrayIngredients.includes(this.ingredient_pizza.name)) {
        let ingred = this.ingredient_pizza.name;
        ingredients = this.arrayIngredients.filter(function (elem) {
          return elem === ingred;
        });
      }
      length = ingredients.length;
      return length;
    },
    isDisabledButtonPlus() {
      let bulianValueBtnPlus = false;
      if (this.lengthIngredients >= 3) {
        bulianValueBtnPlus = true;
      } else if (this.lengthIngredients < 3) {
        bulianValueBtnPlus = false;
      }
      return bulianValueBtnPlus;
    },
    isDisabledButtonMinus() {
      let bulianValueBtnMinus = true;
      if (this.lengthIngredients === 0) {
        bulianValueBtnMinus = true;
      } else if (this.lengthIngredients > 0 || this.lengthIngredients < 3) {
        bulianValueBtnMinus = false;
      }
      return bulianValueBtnMinus;
    },
    isDisabledDraggble() {
      let bulianValueDraggble = true;
      if (this.lengthIngredients >= 3) {
        bulianValueDraggble = false;
      } else {
        bulianValueDraggble = true;
      }
      return bulianValueDraggble;
    },
  },
};
</script>

<style lang="scss" scoped></style>
