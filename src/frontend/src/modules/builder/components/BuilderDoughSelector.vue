<template>
  <label v-bind:class="`dough__input dough__input--${dough_pizza.value}`">
    <input
      type="radio"
      name="dought"
      :value="`${dough_pizza.value}`"
      class="visually-hidden"
      checked
      @click="sendNameDough"
    />
    <b>{{ dough_pizza.name }}</b>
    <span>{{ dough_pizza.description }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    dough_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameDough() {
      this.$emit("nameDoughPizza", this.dough_pizza.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
