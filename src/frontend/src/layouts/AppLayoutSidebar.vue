<template>
  <div>
    <div class="layout__sidebar sidebar">
      <a href="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
      <!-- У router-link есть класс по умолчанию "router-link-exact-active", который добавляется атрибуту если он активен, чтобы изменить его локально нужно exact-active-class присвоить нужный нам класс "layout__link--active", а глобально в экземпляре routes ключу linkExactActiveClass:"layout__link--active". В данном случае меням локально  -->
      <router-link
        class="layout__link"
        exact-active-class="layout__link--active"
        exact
        :to="'/orders'"
        >История заказов</router-link
      >
      <router-link
        class="layout__link"
        exact-active-class="layout__link--active"
        :to="'/profile'"
        >Мои данные</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "AppLayoutSidebar",
  data: () => ({}),
};
</script>
