<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div class="sheet cart__empty" v-show="isCartEmpty">
            <p>В корзине нет ни одного товара</p>
          </div>

          <ul class="cart-list sheet" v-show="!isCartEmpty">
            <CartPizzaView
              v-for="(element, index) in pizzas"
              :key="index"
              :date_pizza="element"
            />
          </ul>

          <div class="cart__additional" v-show="!isCartEmpty">
            <ul class="additional-list">
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="@/assets/img/cola.svg"
                    width="39"
                    height="60"
                    alt="Coca-Cola 0,5 литра"
                  />
                  <span>{{ additionalGoods[0].name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                      @click="sendCounterColaMinus"
                      :disabled="isDisabledButtonCola"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      :value="counterCola"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                      @click="sendCounterColaPlus"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ additionalGoods[0].price }} ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="@/assets/img/sauce.svg"
                    width="39"
                    height="60"
                    alt="Острый соус"
                  />
                  <span>{{ additionalGoods[1].name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                      @click="sendCounterSauceMinus"
                      :disabled="isDisabledButtonSauce"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      :value="counterSauce"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                      @click="sendCounterSaucePlus"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ additionalGoods[1].price }} ₽</b>
                  </div>
                </div>
              </li>
              <li class="additional-list__item sheet">
                <p class="additional-list__description">
                  <img
                    src="@/assets/img/potato.svg"
                    width="39"
                    height="60"
                    alt="Картошка из печи"
                  />
                  <span>{{ additionalGoods[2].name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                      @click="sendCounterFriesMinus"
                      :disabled="isDisabledButtonFries"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      :value="counterFries"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                      @click="sendCounterFriesPlus"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× {{ additionalGoods[2].price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select name="test" class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section class="footer">
        <router-link :to="'/'">
          <div class="footer__more" @click="multiplyMethodsForNewpizza">
            <a href="#" class="button button--border button--arrow"
              >Хочу еще одну</a
            >
          </div>
        </router-link>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ priceAllProducts }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button" @click.prevent="showModal">
            Оформить заказ
          </button>
          <Popup ref="popupWindow" />
        </div>
      </section>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Popup from "@/views/Popup.vue";
import CartPizzaView from "@/modules/cart/CartPizzaView.vue";
export default {
  data: () => ({}),
  components: {
    Popup,
    CartPizzaView,
  },
  computed: {
    ...mapState({
      pizza: (state) => state.Builder.datesPizza,
      dough: (state) => state.Builder.doughesPizza,
      counterCola: (state) => state.Cart.priceProducts.colaClick,
      counterSauce: (state) => state.Cart.priceProducts.sauceClick,
      counterFries: (state) => state.Cart.priceProducts.friesClick,
      additionalGoods: (state) => state.Cart.misc,
      pizzas: (state) => state.Cart.arrayPizzas,
    }),
    ...mapGetters({
      pricePizza: "calculatePricePizza",
      ingredients: "getNewArrayIngredients",
      pricePizzas: "plusPizza",
      priceOtherGoods: "additionalProducts",
      priceAllProducts: "finalPriceWihtAllGoods",
      priceAllPizzas: "priceAllPizzas",
    }),
    isCartEmpty() {
      let cartСontents;
      if (this.priceIngredients === 0) {
        cartСontents = true;
      } else {
        cartСontents = false;
      }
      return cartСontents;
    },
    isDisabledButtonCola() {
      let bulianButton = true;
      if (this.counterCola === 0) {
        bulianButton = true;
      } else {
        bulianButton = false;
      }
      return bulianButton;
    },
    isDisabledButtonSauce() {
      let bulianButton = true;
      if (this.counterSauce === 0) {
        bulianButton = true;
      } else {
        bulianButton = false;
      }
      return bulianButton;
    },
    isDisabledButtonFries() {
      let bulianButton = true;
      if (this.counterFries === 0) {
        bulianButton = true;
      } else {
        bulianButton = false;
      }
      return bulianButton;
    },
  },
  methods: {
    showModal() {
      this.$refs.popupWindow.show = true;
    },
    sendCounterColaPlus() {
      this.$store.commit("plusCounterCola", 1);
    },
    sendCounterColaMinus() {
      this.$store.commit("minusCounterCola", 1);
    },
    sendCounterSaucePlus() {
      this.$store.commit("plusCounterSauce", 1);
    },
    sendCounterSauceMinus() {
      this.$store.commit("minusCounterSauce", 1);
    },
    sendCounterFriesPlus() {
      this.$store.commit("plusCounterFries", 1);
    },
    sendCounterFriesMinus() {
      this.$store.commit("minusCounterFries", 1);
    },
    sendIdNewPizza() {
      this.$store.commit("setIdNewPizza");
    },
    sendChangeDateNewPizza() {
      this.$store.commit("setDatesNewPizza");
    },
    multiplyMethodsForNewpizza() {
      this.sendIdNewPizza();
      this.sendChangeDateNewPizza();
    },
  },
};
</script>
<style scoped></style>
