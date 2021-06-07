<template>
  <div>
    <Loader v-if="submitting" />
    <div v-else>
      <div class="tabs">
        <div class="tab__container">
          <span
            @click="activeTab = 'allCharacters'"
            class="tab"
            :class="{ 'tab--active': activeTab === 'allCharacters' }"
            >All Characters</span
          >
        </div>
        <div class="tab__container">
          <span
            @click="activeTab = 'Favorites'"
            class="tab"
            :class="{ 'tab--active': activeTab === 'Favorites' }"
            >Favorites</span
          >
        </div>
      </div>
      <div v-if="activeTab === 'allCharacters'">
        <table class="table">
          <thead class="table__head">
            <th class="table__label">Photo</th>
            <th class="table__label">Charackter ID</th>
            <th class="table__label">Name</th>
            <th class="table__label">Gender</th>
            <th class="table__label">Species</th>
            <th class="table__label">Last Episode</th>
            <th class="table__label">Add To Favorites</th>
          </thead>
          <tbody>
            <tr
              class="table__row"
              v-for="(item, index) in characters"
              :key="index"
            >
              <th>
                <img :src="item.image" :alt="item.name" class="table__avatar" />
              </th>
              <td class="table__cell">{{ item.id }}</td>
              <td class="table__cell">{{ item.name }}</td>
              <td class="table__cell table__cell--gender">
                <img :src="getGenderImg(item.gender)" />
                {{ item.gender }}
              </td>
              <td class="table__cell">{{ item.species }}</td>
              <td class="table__cell">{{ lastEpisode(item.episode) }}</td>
              <td class="table__cell">
                <div
                  class="favorite-btn__container"
                  :class="{
                    'favorite-btn__container--isFavorite': isFavorite(item),
                  }"
                  @click="addToFavorite(item)"
                >
                  <img
                    :src="chooseFavoriteStar(item)"
                    class="favorite-btn__star"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination
          class="pagination__margin"
          v-if="records"
          v-model="page"
          :records="records"
          :per-page="20"
          @paginate="changePage"
        >
        </pagination>
      </div>
      <div v-else>
        <div v-if="favorites.length">
          <table class="table">
            <thead class="table__head">
              <th class="table__label">Photo</th>
              <th class="table__label">Charackter ID</th>
              <th class="table__label">Name</th>
              <th class="table__label">Gender</th>
              <th class="table__label">Species</th>
              <th class="table__label">Last Episode</th>
              <th class="table__label">Add To Favorites</th>
            </thead>
            <tbody>
              <tr
                class="table__row"
                v-for="(item, index) in favorites"
                :key="index"
              >
                <th>
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="table__avatar"
                  />
                </th>
                <td class="table__cell">{{ item.id }}</td>
                <td class="table__cell">{{ item.name }}</td>
                <td class="table__cell table__cell--gender">
                  <img :src="getGenderImg(item.gender)" />
                  {{ item.gender }}
                </td>
                <td class="table__cell">{{ item.species }}</td>
                <td class="table__cell">{{ lastEpisode(item.episode) }}</td>
                <td class="table__cell">
                  <div
                    class="favorite-btn__container"
                    :class="{
                      'favorite-btn__container--isFavorite': isFavorite(item),
                    }"
                    @click="addToFavorite(item)"
                  >
                    <img
                      :src="chooseFavoriteStar(item)"
                      class="favorite-btn__star"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination
            class="pagination__margin"
            v-if="records"
            v-model="page"
            :records="favoriteRecords"
            :per-page="20"
            @paginate="changePage"
          >
          </pagination>
        </div>
        <div v-else>There are no favorites chatacters.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import { allCharacters } from "@/graphql/allCharacters.query.gql";
import Pagination from "v-pagination-3";
import Loader from "@/components/Loader.vue";

export default {
  name: "TableData",
  data() {
    return {
      submitting: false,
      page: 1,
      characters: null,
      itemsNumber: 0,
      favoritesNumber: 0,
      favorites: [],
      activeTab: "allCharacters",
    };
  },
  components: {
    Pagination,
    Loader,
  },
  created() {
    this.changePage(this.page);
  },
  computed: {
    records() {
      return this.itemsNumber;
    },
    favoriteRecords() {
      return this.favoritesNumber;
    },
  },
  methods: {
    getGenderImg(type) {
      if (type === "Female") {
        return require("@/assets/images/Female.svg");
      } else if (type === "Male") {
        return require("@/assets/images/Male.svg");
      } else if (type === "unknown") {
        return require("@/assets/images/remove.svg");
      } else if (type === "Genderless") {
        return require("@/assets/images/close.svg");
      }
    },
    lastEpisode(episodes) {
      return episodes[episodes.length - 1].episode;
    },
    changePage(number) {
      this.submitting = true;
      let page = (this.page = number);
      const { result } = useQuery(allCharacters, {
        page,
      });
      this.characters = useResult(result, null, (data) => {
        return data.characters.results;
      });
      this.itemsNumber = useResult(result, null, (data) => {
        return data.characters.info.count;
      });
      this.submitting = false;
    },
    addToFavorite(item) {
      const index = this.favorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        this.favorites.push(item);
      } else {
        this.favorites.splice(index, 1);
      }
      this.favoritesNumber = this.favorites.length;
    },
    isFavorite(item) {
      const index = this.favorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    },
    chooseFavoriteStar(item) {
      const index = this.favorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        return require("@/assets/images/star.svg");
      } else {
        return require("@/assets/images/star-light.svg");
      }
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
};
</script>
