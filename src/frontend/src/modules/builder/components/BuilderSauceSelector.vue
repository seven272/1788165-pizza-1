<template>
  <label class="radio ingredients__input" @click="sendNameSauce">
    <input type="radio" name="sauce" :value="`${sauce_pizza.value}`" checked />
    <span>{{ sauce_pizza.name }}</span>
  </label>
</template>
<script>
export default {
  name: "BuilderSauceSelector",
  data: () => ({}),
  props: {
    sauce_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameSauce() {
      this.$emit(
        "nameSaucePizza",
        this.sauce_pizza.name,
        this.sauce_pizza.price
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
