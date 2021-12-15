<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label class="diameter__input diameter__input--small">
          <input
            type="radio"
            name="diameter"
            value="small"
            class="visually-hidden"
          />
          <span>23 см</span>
        </label>
        <label class="diameter__input diameter__input--normal">
          <input
            type="radio"
            name="diameter"
            value="normal"
            class="visually-hidden"
            checked
          />
          <span>32 см</span>
        </label>
        <label class="diameter__input diameter__input--big">
          <input
            type="radio"
            name="diameter"
            value="big"
            class="visually-hidden"
          />
          <span>45 см</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderSizeSelector",
};
</script>

<style lang="scss" scoped></style>
