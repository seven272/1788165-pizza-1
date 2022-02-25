<template>
  <li
    class="ingredients__item"
    :draggable="isDisabledDraggble"
    @dragstart="onDrag($event, ingredient_pizza)"
  >
    <span class="filling" :class="`filling--${ingredient_pizza.style}`">{{
      ingredient_pizza.name
    }}</span>

    <div class="counter counter--orange ingredients__counter">
      <button
        ref="buttonMinus"
        type="button"
        class="counter__button counter__button--minus"
        :disabled="isDisabledButtonMinus"
        @click="multiplyMehtodsDeleteIngredient()"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        ref="inputCounter"
        type="text"
        name="counter"
        class="counter__input"
        :value="inputValue"
      />
      <button
        ref="buttonPlus"
        type="button"
        class="counter__button counter__button--plus"
        :disabled="isDisabledButtonPlus"
        @click="multiplyMehtodsAddIngredient()"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "BuilderIngredientsSelector",
  data: () => ({
    inputValue: 0,
    counterIngredients: 0,
  }),
  props: {
    ingredient_pizza: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    //методы для хранилища
    sendNameAndPrice() {
      this.$store.commit("setNewNameAndPriceIngredient", this.ingredient_pizza);
    },
    sendDeleteNameAndPrice() {
      this.$store.commit(
        "setDeleteNameAndPriceIngredient",
        this.ingredient_pizza
      );
    },
    //конец методов для хранилища
    onClickAddIngredient() {
      this.counterIngredients++;
      this.inputValue = this.counterIngredients;
    },
    onClickDeleteIngredient() {
      this.counterIngredients--;
      this.inputValue = this.counterIngredients;
    },
    multiplyMehtodsDeleteIngredient() {
      this.onClickDeleteIngredient();
      this.sendDeleteNameAndPrice();
    },
    multiplyMehtodsAddIngredient() {
      this.onClickAddIngredient();
      this.sendNameAndPrice();
    },
    onDrag(evt, ingredient) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      //преобразуем обьект в строку
      const strIngredient = JSON.stringify(ingredient);
      evt.dataTransfer.setData("itemObj", strIngredient);
      this.onClickAddIngredient();
    },
  },
  computed: {
    isDisabledButtonPlus() {
      let bulianValueBtnPlus = false;
      if (this.counterIngredients >= 3) {
        bulianValueBtnPlus = true;
      } else if (this.counterIngredients < 3) {
        bulianValueBtnPlus = false;
      }
      return bulianValueBtnPlus;
    },
    isDisabledButtonMinus() {
      let bulianValueBtnMinus = true;
      if (this.counterIngredients === 0) {
        bulianValueBtnMinus = true;
      } else if (this.counterIngredients > 0 || this.counterIngredients < 3) {
        bulianValueBtnMinus = false;
      }
      return bulianValueBtnMinus;
    },
    isDisabledDraggble() {
      let bulianValueDraggble = true;
      if (this.counterIngredients >= 3) {
        bulianValueDraggble = false;
      } else {
        bulianValueDraggble = true;
      }
      return bulianValueDraggble;
    },
  },
};
</script>

<style lang="scss" scoped></style>
