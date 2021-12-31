<template>
  <li
    class="ingredients__item"
    draggable="true"
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
        @click="multiplyMehtodsDeleteIngredient()"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        ref="inputCounter"
        type="text"
        name="counter"
        class="counter__input"
        :value="inputValue"
      />
      <button
        ref="buttonPlus"
        type="button"
        class="counter__button counter__button--plus"
        :disabled="isDisabledButtonPlus"
        @click="multiplyMehtodsAddIngredient()"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
// Импортируем JSON данные и статусы для карточек ингридиентов.
import pizza from "../../../static/pizza.json";
export default {
  name: "BuilderIngredientsSelector",
  data: () => ({
    newobj: pizza.ingredients,
    arrayQuantityIngredients: [],
    inputValue: 0,
  }),
  props: {
    ingredient_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameIngred() {
      this.$emit(
        "nameInged",
        this.ingredient_pizza.name,
        this.ingredient_pizza.price
      );
    },
    deleteNameIngred() {
      this.$emit(
        "deleteInged",
        this.ingredient_pizza.name,
        this.ingredient_pizza.price
      );
    },
    onClickAddIngredient() {
      this.arrayQuantityIngredients.push(this.ingredient_pizza.name);
      this.inputValue = this.arrayQuantityIngredients.length;
    },
    onClickDeleteIngredient() {
      this.arrayQuantityIngredients.pop();
      this.inputValue = this.arrayQuantityIngredients.length;
    },
    multiplyMehtodsDeleteIngredient() {
      this.deleteNameIngred();
      this.onClickDeleteIngredient();
    },
    multiplyMehtodsAddIngredient() {
      this.onClickAddIngredient();
      this.sendNameIngred();
    },
    onDrag(evt, ingredient) {
      //преобразуем обьект в строку
      const strIngredient = JSON.stringify(ingredient);
      evt.dataTransfer.setData("itemObj", strIngredient);
      this.onClickAddIngredient();
      //отменяем действие по умолчанию если больше 3-х ингридиентов, чтобы запретить перетаскивание
      if (this.arrayQuantityIngredients.length > 3) {
        evt.preventDefault();
        this.arrayQuantityIngredients.length = 3;
        this.inputValue = 3;
      } else {
        evt.dataTransfer.dropEffect = "move";
        evt.dataTransfer.effectAllowed = "move";
      }
    },
  },
  computed: {
    isDisabledButtonPlus() {
      let bulianValueBtnPlus = false;
      if (this.arrayQuantityIngredients.length >= 3) {
        bulianValueBtnPlus = true;
      } else if (this.arrayQuantityIngredients.length < 3) {
        bulianValueBtnPlus = false;
      }
      return bulianValueBtnPlus;
    },
    isDisabledButtonMinus() {
      let bulianValueBtnMinus = true;
      if (this.arrayQuantityIngredients.length === 0) {
        bulianValueBtnMinus = true;
      } else if (
        this.arrayQuantityIngredients.length > 0 ||
        this.arrayQuantityIngredients.length < 3
      ) {
        bulianValueBtnMinus = false;
      }
      return bulianValueBtnMinus;
    },
  },
};
</script>

<style lang="scss" scoped></style>
