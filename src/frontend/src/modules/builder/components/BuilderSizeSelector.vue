<template>
  <label :class="`diameter__input diameter__input--${sizePizza.value}`">
    <input
      type="radio"
      name="diameter"
      :value="`${sizePizza.value}`"
      class="visually-hidden"
      @click="changeSize"
    />
    <span>{{ sizePizza.name }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    sizePizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    changeSize() {
      this.$store.commit("setSizePizza", this.sizePizza.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
