<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${ingredient_pizza.style}`">{{
      ingredient_pizza.name
    }}</span>

    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        disabled
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="0" />
      <button
        type="button"
        class="counter__button counter__button--plus"
        v-on:click="sendNameIngred"
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
  }),
  props: {
    ingredient_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameIngred() {
      this.$emit("nameInged", this.ingredient_pizza.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
