<template>
  <label :class="`diameter__input diameter__input--${sizePizza.value}`">
    <input
      type="radio"
      name="diameter"
      :value="`${sizePizza.value}`"
      class="visually-hidden"
      @click="sendNameSize"
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
    sendNameSize() {
      this.$emit("nameSizePizza", this.sizePizza);
    },
  },
};
</script>

<style lang="scss" scoped></style>
