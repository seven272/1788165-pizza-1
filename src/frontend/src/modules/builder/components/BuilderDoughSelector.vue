<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label class="dough__input dough__input--light">
          <input
            type="radio"
            name="dought"
            value="light"
            class="visually-hidden"
            checked
          />
          <b>Тонкое</b>
          <span>Из твердых сортов пшеницы</span>
        </label>

        <label class="dough__input dough__input--large">
          <input
            type="radio"
            name="dought"
            value="large"
            class="visually-hidden"
          />
          <b>Толстое</b>
          <span>Из твердых сортов пшеницы</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
};
</script>

<style lang="scss" scoped></style>
