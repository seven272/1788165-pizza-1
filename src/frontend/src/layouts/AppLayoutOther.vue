<template>
  <div>
    <AppLayoutHeader />
    <AppLayoutSidebar />
    <slot></slot>
  </div>
</template>
<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar.vue";
export default {
  name: "AppLayoutOther",
  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },
};
</script>
<style scoped></style>
