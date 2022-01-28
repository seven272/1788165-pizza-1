<template>
  <div>
    <component :is="changeLayout">
      <slot></slot>
    </component>
  </div>
</template>
<script>
//шаблон по умолчанию (гдобальня область видимости )сох-ем в переменную, шаблоны для страниц импортируем непосредственно в вычисляемом свойстве
const defaultLayout = "AppLayoutDefault";
export default {
  computed: {
    changeLayout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
