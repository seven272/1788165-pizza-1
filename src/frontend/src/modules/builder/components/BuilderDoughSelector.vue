<template>
  <label v-bind:class="`dough__input dough__input--${doughPizza.value}`">
    <input
      type="radio"
      name="dought"
      :value="`${doughPizza.value}`"
      class="visually-hidden"
      checked
      @click="sendNameDough"
    />
    <b>{{ doughPizza.name }}</b>
    <span>{{ doughPizza.description }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughPizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameDough() {
      this.$emit("nameDoughPizza", this.doughPizza.name, this.doughPizza.price);
    },
  },
};
</script>

<style lang="scss" scoped></style>
