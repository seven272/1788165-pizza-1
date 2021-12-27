/* eslint-disable no-constant-condition */
<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="titlePizza"
      />
    </label>

    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${classDough}-${classSauce}`"
        @click="multiplyChangeClass()"
      >
        <div class="pizza__wrapper">
          <div
            :class="`pizza__filling ${element}`"
            v-for="(element, index) in classIngredients"
            v-bind:key="index"
          ></div>
        </div>
      </div>
    </div>
    <div class="content__result">
      <p>Итого: {{ price_pizza.finalPrice }} ₽</p>
      <button ref="buttonCook" type="button" class="button" disabled>
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    obj_pizza: {
      type: Object,
      default: () => {},
    },
    price_pizza: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    classDough: "big",
    classSauce: "tomato",
    classIngredients: [],
    titlePizza: "",
  }),
  components: {},
  watch: {
    "obj_pizza.dough": function () {
      if (this.obj_pizza.dough === "Толстое") {
        this.classDough = "big";
      } else if (this.obj_pizza.dough === "Тонкое") {
        this.classDough = "small";
      }
    },
    "obj_pizza.sauce": function () {
      if (this.obj_pizza.sauce === "Томатный") {
        this.classSauce = "tomato";
      } else if (this.obj_pizza.sauce === "Сливочный") {
        this.classSauce = "creamy";
      }
    },
    "obj_pizza.sortArrIngedients": function () {
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
      let mapArr = this.obj_pizza.sortArrIngedients.map((elem) => {
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
      let newArr = [];
      for (let i = 0; i < mapArr.length; i++) {
        if (mapArr[i] === mapArr[i + 2]) {
          newArr.push(`${mapArr[i]} pizza__filling--third`);
        } else if (mapArr[i] === mapArr[i + 1]) {
          newArr.push(`${mapArr[i]} pizza__filling--second`);
        } else {
          newArr.push(mapArr[i]);
        }
      }
      this.classIngredients = newArr;
    },

    classIngredients: function () {
      if (this.classIngredients.length > 0 && this.titlePizza !== "") {
        console.log(this.titlePizza);
        this.$refs.buttonCook.disabled = false;
      } else {
        this.$refs.buttonCook.disabled = true;
      }
    },

    titlePizza: function () {
      if (this.titlePizza !== "" && this.classIngredients.length > 0) {
        this.$refs.buttonCook.disabled = false;
      } else {
        this.$refs.buttonCook.disabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
