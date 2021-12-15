<template>
<main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">

          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label class="dough__input dough__input--light">
                <input type="radio" name="dought" value="light" class="visually-hidden" checked>
                <b>Тонкое</b>
                <span>Из твердых сортов пшеницы</span>
              </label>

            <label class="dough__input dough__input--large">
                <input type="radio" name="dought" value="large" class="visually-hidden">
                <b>Толстое</b>
                <span>Из твердых сортов пшеницы</span>
            </label>
            </div>

          </div>

        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label class="diameter__input diameter__input--small">
                <input type="radio" name="diameter" value="small" class="visually-hidden">
                <span>23 см</span>
              </label>
              <label class="diameter__input diameter__input--normal">
                <input type="radio" name="diameter" value="normal" class="visually-hidden" checked>
                <span>32 см</span>
              </label>
              <label class="diameter__input diameter__input--big">
                <input type="radio" name="diameter" value="big" class="visually-hidden">
                <span>45 см</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label class="radio ingredients__input">
                  <input type="radio" name="sauce" value="tomato" checked>
                  <span>Томатный</span>
                </label>
                <label class="radio ingredients__input">
                  <input type="radio" name="sauce" value="creamy">
                  <span>Сливочный</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li class="ingredients__item" v-for="({id, name, style}) in makeNewObjectIngredients" :key="id">
                    <span class="filling" :class = "`filling--${style}`">{{name}}</span>

                    <div class="counter counter--orange ingredients__counter">
                      <button type="button" class="counter__button counter__button--minus" disabled>
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input type="text" name="counter" class="counter__input" value="0">
                      <button type="button" class="counter__button counter__button--plus">
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                   
                </ul>

              </div>

            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input type="text" name="pizza_name" placeholder="Введите название пиццы">
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
  </main>
</template>

<script>
// Импортируем JSON данные и статусы для карточек ингридиентов.
import pizza from '../static/pizza.json';
export default {
  name: "AppLayoutBody",
  data: () => ({
    namePizza: "Мухоморы",
    newobj: pizza.ingredients,
  }),
  computed: {
    makeNewObjectIngredients() {
      let arrObjIngred = []
      pizza.ingredients.forEach(element => {
        //преобразуем на каждой итерации цикла обькт в массив
        const values = Object.values(element)
        //далее с помощью цепочки методов получаем из адресса изображение название стиля для иконки в списке
        const newVal = values.slice(2,3).toString().split('/').slice(4).toString().split('.').slice(0,1)
        //создаем массив обьектов с нужными ключами и значениями
        let objIngredients = {}
        objIngredients["id"] = element.id;
        objIngredients["name"] = element.name;
        objIngredients["style"] = newVal[0];
        arrObjIngred.push(objIngredients)
      })
      return arrObjIngred
     
    },
  }
};

</script>

<style lang="scss" scoped>

</style>
