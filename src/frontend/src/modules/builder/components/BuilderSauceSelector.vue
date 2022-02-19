<template>
  <label class="radio ingredients__input" @click="changeSauce">
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
    changeSauce() {
      this.$store.commit("setSaucePizza", this.saucePizza.name);
    },
  },
};
</script>

<style lang="scss" scoped></style>
