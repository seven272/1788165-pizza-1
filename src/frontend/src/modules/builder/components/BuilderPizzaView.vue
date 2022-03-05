/* eslint-disable no-constant-condition */
<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="getTitle"
      />
    </label>

    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${getClassDough}-${getClassSauce}`"
      >
        <div class="pizza__wrapper">
          <div
            :class="`pizza__filling ${element}`"
            v-for="(element, index) in getClassIngredients"
            v-bind:key="index"
          ></div>
        </div>
      </div>
    </div>
    <div class="content__result">
      <p>Итого: {{ pricePizza }} ₽</p>
      <button
        ref="buttonCook"
        type="button"
        class="button"
        :disabled="isDisabledButtonCook"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "BuilderPizzaView",
  props: {},
  data: () => ({}),
  components: {},
  computed: {
    ...mapGetters({
      pricePizza: "calculatePricePizza",
      arraySortIngredients: "getNewArrayIngredients",
    }),
    ...mapState({
      nameDough: (state) => state.Builder.datesPizza.dough,
      nameSauce: (state) => state.Builder.datesPizza.sauce,
      namePizza: (state) => state.Builder.datesPizza.title,
    }),
    getTitle: {
      get() {
        return this.namePizza;
      },
      set(value) {
        this.$store.commit("setTitlePizza", value);
      },
    },
    getClassIngredients() {
      const dictionaryIngredients = {
        Грибы: "pizza__filling--mushrooms",
        Ананас: "pizza__filling--ananas",
        Бекон: "pizza__filling--bacon",
        "Блю чиз": "pizza__filling--blue_cheese",
        Чеддер: "pizza__filling--cheddar",
        Чили: "pizza__filling--chile",
        Ветчина: "pizza__filling--ham",
        Халапеньо: "pizza__filling--jalapeno",
        Моцарелла: "pizza__filling--mozzarella",
        Маслины: "pizza__filling--olives",
        Лук: "pizza__filling--onion",
        Пармезан: "pizza__filling--parmesan",
        Салями: "pizza__filling--salami",
        Лосось: "pizza__filling--salmon",
        Томаты: "pizza__filling--tomatoes",
      };
      let mapArr = this.arraySortIngredients.map((elem) => {
        if (elem === "Грибы") {
          return dictionaryIngredients.Грибы;
        } else if (elem === "Ананас") {
          return dictionaryIngredients.Ананас;
        } else if (elem === "Бекон") {
          return dictionaryIngredients.Бекон;
        } else if (elem === "Блю чиз") {
          return dictionaryIngredients["Блю чиз"];
        } else if (elem === "Чеддер") {
          return dictionaryIngredients.Чеддер;
        } else if (elem === "Чили") {
          return dictionaryIngredients.Чили;
        } else if (elem === "Ветчина") {
          return dictionaryIngredients.Ветчина;
        } else if (elem === "Халапеньо") {
          return dictionaryIngredients.Халапеньо;
        } else if (elem === "Моцарелла") {
          return dictionaryIngredients.Моцарелла;
        } else if (elem === "Маслины") {
          return dictionaryIngredients.Маслины;
        } else if (elem === "Лук") {
          return dictionaryIngredients.Лук;
        } else if (elem === "Пармезан") {
          return dictionaryIngredients.Пармезан;
        } else if (elem === "Салями") {
          return dictionaryIngredients.Салями;
        } else if (elem === "Лосось") {
          return dictionaryIngredients.Лосось;
        } else if (elem === "Томаты") {
          return dictionaryIngredients.Томаты;
        }
      });
      let newArrIngredients = [];
      for (let i = 0; i < mapArr.length; i++) {
        if (mapArr[i] === mapArr[i + 2]) {
          newArrIngredients.push(`${mapArr[i]} pizza__filling--third`);
        } else if (mapArr[i] === mapArr[i + 1]) {
          newArrIngredients.push(`${mapArr[i]} pizza__filling--second`);
        } else {
          newArrIngredients.push(mapArr[i]);
        }
      }
      return newArrIngredients;
    },
    getClassDough() {
      let classDough = "";
      if (this.nameDough === "Толстое") {
        classDough = "big";
      } else if (this.nameDough === "Тонкое") {
        classDough = "small";
      }
      return classDough;
    },
    getClassSauce() {
      let classSauce = "";
      if (this.nameSauce === "Томатный") {
        classSauce = "tomato";
      } else if (this.nameSauce === "Сливочный") {
        classSauce = "creamy";
      }
      return classSauce;
    },
    isDisabledButtonCook() {
      let bulianValueBtnCook = true;
      if (this.getClassIngredients.length > 0 && this.namePizza !== "") {
        bulianValueBtnCook = false;
      } else {
        bulianValueBtnCook = true;
      }
      return bulianValueBtnCook;
    },
  },
};
</script>

<style lang="scss" scoped></style>
