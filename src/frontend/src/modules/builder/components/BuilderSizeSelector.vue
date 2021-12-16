<template>
  <label :class="`diameter__input diameter__input--${size_pizza.value}`">
    <input
      type="radio"
      name="diameter"
      :value="`${size_pizza.value}`"
      class="visually-hidden"
      @click="sendNameSize"
    />
    <span>{{ size_pizza.name }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    size_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameSize() {
      this.$emit("nameSizePizza", this.size_pizza.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
