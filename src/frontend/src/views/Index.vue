/*eslint-disable*/
<template>
  <body>
    <AppLayoutHeader />
    <AppLayoutBody />
  </body>
</template>

<script>
import AppLayoutHeader from "../layouts/AppLayoutHeader.vue";
import AppLayoutBody from "../layouts/AppLayoutBody.vue";
export default {
  name: "Index",
  components: {
    AppLayoutHeader,
    AppLayoutBody,
  },
};
</script>

<style lang="scss" scoped></style>
