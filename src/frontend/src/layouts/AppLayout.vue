<template>
  <div>
    <component :is="changeLayout"> </component>
  </div>
</template>
<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar.vue";
export default {
  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },
  computed: {
    changeLayout() {
      let layout = "AppLayoutHeader";
      if (this.$route.meta === "header") {
        layout = "AppLayoutHeader";
      } else if (this.$route.meta === "sidebar") {
        layout = "AppLayoutSidebar";
      }
      return layout;
    },
  },
};
</script>
