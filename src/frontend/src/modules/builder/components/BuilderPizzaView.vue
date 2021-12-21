/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div
        :class="`pizza pizza--foundation--${changeClassDough}-${classSauce}`"
        @click="multiplyChangeClass()"
      >
        <div class="pizza__wrapper">
          <!-- <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div> -->
          <div
            :class="`pizza__filling ${element}`"
            v-for="(element, index) in classIngredients"
            v-bind:key="index"
          ></div>
        </div>
      </div>
    </div>
    <BuilderPriceCounter />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter.vue";
export default {
  name: "BuilderPizzaView",
  props: {
    obj_pizza: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    classDough: "big",
    classSauce: "tomato",
    classIngredients: [],
  }),
  components: {
    BuilderPriceCounter,
  },
  computed: {
    changeClassDough() {
      let a = "big";
      if (this.obj_pizza.dough === "Толстое") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        a = "big";
      } else if (this.obj_pizza.dough === "Тонкое") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        a = "small";
      }
      console.log(a);
      return a;
    },
  },
  methods: {
    // changeClassDough() {
    //   if (this.obj_pizza.dough === "Толстое") {
    //     this.classDough = "big";
    //   } else if (this.obj_pizza.dough === "Тонкое") {
    //     this.classDough = "small";
    //   }
    //   return this.classDough;
    // },
    changeClassSauce() {
      if (this.obj_pizza.sauce === "Томатный") {
        this.classSauce = "tomato";
      } else if (this.obj_pizza.sauce === "Сливочный") {
        this.classSauce = "creamy";
      }
      console.log(this.classSauce);
      return this.classSauce;
    },
    changeClassIngredient() {
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
      for (let i = 0; i < this.obj_pizza.ingredientId.length; i++) {
        switch (this.obj_pizza.ingredientId[i]) {
          case "Грибы":
            this.classIngredients.push(dictionaryIngredients.Грибы);
            break;
          case "Ананас":
            this.classIngredients.push(dictionaryIngredients.Ананас);
            break;
          case "Бекон":
            this.classIngredients.push(dictionaryIngredients.Бекон);
            break;
          case "Блю чиз":
            this.classIngredients.push(dictionaryIngredients["Блю чиз"]);
            break;
          case "Чеддер":
            this.classIngredients.push(dictionaryIngredients.Чеддер);
            break;
          case "Чили":
            this.classIngredients.push(dictionaryIngredients.Чили);
            break;
          case "Ветчина":
            this.classIngredients.push(dictionaryIngredients.Ветчина);
            break;
          case "Халапеньо":
            this.classIngredients.push(dictionaryIngredients.Халапеньо);
            break;
          case "Моцарелла":
            this.classIngredients.push(dictionaryIngredients.Моцарелла);
            break;
          case "Маслины":
            this.classIngredients.push(dictionaryIngredients.Маслины);
            break;
          case "Лук":
            this.classIngredients.push(dictionaryIngredients.Лук);
            break;
          case "Пармезан":
            this.classIngredients.push(dictionaryIngredients.Пармезан);
            break;
          case "Салями":
            this.classIngredients.push(dictionaryIngredients.Салями);
            break;
          case "Лосось":
            this.classIngredients.push(dictionaryIngredients.Лосось);
            break;
          case "Томаты":
            this.classIngredients.push(dictionaryIngredients.Томаты);
            break;
        }
      }
      console.log(this.classIngredients);
    },
    multiplyChangeClass() {
      this.changeClassSauce();
      // this.changeClassDough();
      this.changeClassIngredient();
    },
  },
};
</script>

<style lang="scss" scoped></style>
