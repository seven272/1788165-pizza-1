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
        disabled
        v-on:click="
          onClickDeleteIngredient();
          deleteNameIngred();
        "
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
        v-on:click="
          onClickAddIngredient();
          sendNameIngred();
        "
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
// Импортируем JSON данные и статусы для карточек ингридиентов.
import pizza from "../../../static/pizza.json";
// import EventBus from "../../../event-bus.js";
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
      if (this.arrayQuantityIngredients.length >= 3) {
        this.$refs.buttonPlus.disabled = true;
      } else if (this.arrayQuantityIngredients.length < 3) {
        this.$refs.buttonPlus.disabled = false;
      }
      if (this.arrayQuantityIngredients.length > 0) {
        this.$refs.buttonMinus.disabled = false;
      }
      this.inputValue = this.arrayQuantityIngredients.length;
    },
    onClickDeleteIngredient() {
      this.arrayQuantityIngredients.pop();
      if (this.arrayQuantityIngredients.length === 0) {
        this.$refs.buttonMinus.disabled = true;
        this.$refs.buttonPlus.disabled = false;
      } else if (this.arrayQuantityIngredients.length < 3) {
        this.$refs.buttonPlus.disabled = false;
      }
      this.inputValue = this.arrayQuantityIngredients.length;
    },
    onDrag(evt, ingredient) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      //преобразуем обьект в строку
      const strIngredient = JSON.stringify(ingredient);
      evt.dataTransfer.setData("itemObj", strIngredient);
      this.onClickAddIngredient();
    },
  },
};
</script>

<style lang="scss" scoped></style>
