<template>
  <div class="popup" v-show="show">
    <a href="#" class="close" @click="closePopup">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button" @click="closePopup">
      <a href="#" class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Popup",
  data: () => ({
    show: false,
  }),
  computed: {},
  methods: {
    closePopup() {
      this.show = false;
    },
  },
};
</script>
<style scoped></style>
