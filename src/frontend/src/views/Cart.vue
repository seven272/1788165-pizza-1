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
            <li class="cart-list__item">
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Капричоза"
                />
                <div class="product__text">
                  <h2>{{ pizza.title }}</h2>
                  <ul>
                    <li>{{ pizza.size }}, на тонком тесте</li>
                    <li>Соус: томатный</li>
                    <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  value="1"
                />
                <button
                  type="button"
                  class="
                    counter__button
                    counter__button--plus
                    counter__button--orange
                  "
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>

              <div class="cart-list__price">
                <b>{{ pricePizza }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button type="button" class="cart-list__edit">Изменить</button>
              </div>
            </li>
            <!-- <li class="cart-list__item">
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  alt="Любимая пицца"
                />
                <div class="product__text">
                  <h2>Любимая пицца</h2>
                  <ul>
                    <li>30 см, на тонком тесте</li>
                    <li>Соус: томатный</li>
                    <li>
                      Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю
                      чиз
                    </li>
                  </ul>
                </div>
              </div>

              <div class="counter cart-list__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  value="2"
                />
                <button
                  type="button"
                  class="
                    counter__button
                    counter__button--plus
                    counter__button--orange
                  "
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>

              <div class="cart-list__price">
                <b>782 ₽</b>
              </div>

              <div class="cart-list__button">
                <button type="button" class="cart-list__edit">Изменить</button>
              </div>
            </li> -->
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
                  <span>Coca-Cola 0,5 литра</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
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
                  <span>Острый соус</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 30 ₽</b>
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
                  <span>Картошка из печи</span>
                </p>

                <div class="additional-list__wrapper">
                  <div class="counter additional-list__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="2"
                    />
                    <button
                      type="button"
                      class="
                        counter__button
                        counter__button--plus
                        counter__button--orange
                      "
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>

                  <div class="additional-list__price">
                    <b>× 56 ₽</b>
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
        <div class="footer__more">
          <a href="#" class="button button--border button--arrow"
            >Хочу еще одну</a
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ pricePizza }} ₽</b>
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
export default {
  data: () => ({}),
  components: {
    Popup,
  },
  computed: {
    ...mapState({
      pizza: (state) => state.Builder.datesPizza,
    }),
    ...mapGetters({
      pricePizza: "calculatePricePizza",
      priceIngredients: "getCostIngredients",
    }),
    isCartEmpty() {
      let cartСontents;
      if (this.priceIngredients === 0) {
        console.log(this.priceIngredients);
        cartСontents = true;
      } else {
        cartСontents = false;
      }
      return cartСontents;
    },
  },
  methods: {
    showModal() {
      this.$refs.popupWindow.show = true;
    },
  },
};
</script>
<style scoped></style>
