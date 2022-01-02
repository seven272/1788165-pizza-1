<template>
  <label class="radio ingredients__input" @click="sendNameSauce">
    <input type="radio" name="sauce" :value="`${saucePizza.value}`" checked />
    <span>{{ saucePizza.name }}</span>
  </label>
</template>
<script>
export default {
  name: "BuilderSauceSelector",
  data: () => ({}),
  props: {
    saucePizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    sendNameSauce() {
      this.$emit("nameSaucePizza", this.saucePizza);
    },
  },
};
</script>

<style lang="scss" scoped></style>
