<template>
  <div>
    <AppLayoutHeader />
    <slot></slot>
  </div>
</template>
<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>
<style scoped></style>
