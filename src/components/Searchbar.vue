<template>
  <div class="searchbar">
    <div class="searchbar__contanier">
      <div class="searchbar__btn">Search by</div>
      <select class="searchbar__select" v-model="searchType">
        <option value="name">Name</option>
        <option value="identifier">Identifier</option>
        <option value="episode">Episode</option>
      </select>
      <div class="searchbar__text__container">
        <input
          type="text"
          class="searchbar__text__container__input"
          v-model="searchText"
        />
        <img
          src="@/assets/images/search.svg"
          class="searchbar__text__container__icon"
          @click="findCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { tableMixin } from "@/mixins/table";
export default {
  name: "Searchbar",
  mixins: [tableMixin],
};
</script>

<style></style>
