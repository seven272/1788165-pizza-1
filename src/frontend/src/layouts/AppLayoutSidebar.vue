<template>
  <div>
    <AppLayoutHeader />
    <div class="layout__sidebar sidebar">
      <a href="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>

      <router-link class="layout__link layout__link--active" :to="'/orders'"
        >История заказов</router-link
      >
      <router-link class="layout__link" :to="'/profile'"
        >Мои данные</router-link
      >
    </div>
  </div>
</template>
<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
export default {
  components: {
    AppLayoutHeader,
  },
};
</script>
