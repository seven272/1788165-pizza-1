/* eslint-disable */
<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label class="radio ingredients__input">
            <input type="radio" name="sauce" value="tomato" checked />
            <span>Томатный</span>
          </label>
          <label class="radio ingredients__input">
            <input type="radio" name="sauce" value="creamy" />
            <span>Сливочный</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="{ id, name, style } in makeNewObjectIngredients"
              :key="id"
            >
              <span class="filling" :class="`filling--${style}`">{{
                name
              }}</span>

              <div class="counter counter--orange ingredients__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  disabled
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  value="0"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Импортируем JSON данные и статусы для карточек ингридиентов.
import pizza from "../../../static/pizza.json";
export default {
  name: "BuilderIngredientsSelector",
  data: () => ({
    namePizza: "Мухоморы",
    newobj: pizza.ingredients,
  }),
  computed: {
    makeNewObjectIngredients() {
      let arrObjIngred = [];
      pizza.ingredients.forEach((element) => {
        //преобразуем на каждой итерации цикла обькт в массив
        const values = Object.values(element);
        //далее с помощью цепочки методов получаем из адресса изображение название стиля для иконки в списке
        const newVal = values
          .slice(2, 3)
          .toString()
          .split("/")
          .slice(4)
          .toString()
          .split(".")
          .slice(0, 1);
        //создаем массив обьектов с нужными ключами и значениями
        let objIngredients = {};
        objIngredients["id"] = element.id;
        objIngredients["name"] = element.name;
        objIngredients["style"] = newVal[0];
        arrObjIngred.push(objIngredients);
      });
      return arrObjIngred;
    },
  },
};
</script>

<style lang="scss" scoped></style>
