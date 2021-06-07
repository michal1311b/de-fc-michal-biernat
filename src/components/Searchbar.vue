<template>
  <div class="searchbar">
    <div class="searchbar__contanier">
      <div class="searchbar__btn">Search by</div>
      <select class="searchbar__select">
        <option value="Name">Name</option>
        <option value="Identifier">Identifier</option>
        <option value="Episode">Episode</option>
      </select>
      <div class="searchbar__text__container">
        <input type="text" class="searchbar__text__container__input" />
        <img
          src="@/assets/images/search.svg"
          class="searchbar__text__container__icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  
};
</script>

<style></style>
