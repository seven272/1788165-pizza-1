<template>
  <li class="cart-list__item" v-show="isShowPizza">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ date_pizza.namePizza }}</h2>
        <ul>
          <li>{{ date_pizza.sizePizza }}, {{ date_pizza.doughPizza }}</li>
          <li>Соус: {{ date_pizza.saucePizza }}</li>
          <li>Начинка: {{ date_pizza.ingredientPizza }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="multiplyMethodsMinus"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="counter"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="multiplyMethodsPlus"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ date_pizza.pricePizza }} ₽</b>
    </div>

    <div class="cart-list__button">
      <router-link :to="'/'">
        <button
          type="button"
          class="cart-list__edit"
          @click="multiplyMethodsDateSPizza(date_pizza)"
        >
          Изменить
        </button>
      </router-link>
    </div>
  </li>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters } from "vuex";
export default {
  name: "CartPizzaView",
  props: {
    date_pizza: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    counter: 1,
    isShowPizza: true,
  }),
  computed: {
    ...mapState({
      showThisPizza: (state) => state.Cart.isShowPizza,
    }),
    ...mapGetters({
      priceAllPizzas: "priceAllPizzas",
      pricePizza: "calculatePricePizza",
    }),
  },
  methods: {
    sendIdPizza(date) {
      this.$store.commit("setIdPizza", date);
    },
    sendDatesForPizza(date) {
      this.$store.commit("setDatesForPizza", date);
    },
    sendCounterPlusValue() {
      this.counter++;
    },
    sendCounterMinusValue() {
      this.counter--;
      if (this.counter === 0) {
        this.isShowPizza = false;
      }
    },
    sendPricePizza() {
      this.$store.commit("pricesPizzas", {
        keyId: this.date_pizza.idPizza,
        keyCounter: this.counter,
        keyPriceForCalc: this.date_pizza.priceForCalculate,
      });
    },
    multiplyMethodsPlus() {
      this.sendCounterPlusValue();
      this.sendPricePizza();
    },
    multiplyMethodsMinus() {
      this.sendCounterMinusValue();
      this.sendPricePizza();
    },
    multiplyMethodsDateSPizza(date) {
      this.sendIdPizza(date);
      this.sendDatesForPizza(date);
    },
  },
};
</script>

<style lang="scss" scoped></style>
