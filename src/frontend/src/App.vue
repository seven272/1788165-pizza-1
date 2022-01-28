/* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <AppLayout>
      <router-view></router-view>
    </AppLayout>
  </div>
</template>
<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
