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
        <div v-if="listOfCharacters && listOfCharacters.length">
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
                v-for="item in listOfCharacters"
                :key="item.id"
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
            :records="records"
            :per-page="20"
            @paginate="changePage"
          >
          </pagination>
        </div>
        <div v-else>There are no chatacters.</div>
      </div>
      <div v-else>
        <div v-if="listOfFavorites && listOfFavorites.length">
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
                v-for="(item, index) in listOfFavorites"
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
import { tableMixin } from "@/mixins/table";
import Pagination from "v-pagination-3";
import Loader from "@/components/Loader.vue";

export default {
  name: "TableData",
  mixins: [tableMixin],
  data() {
    return {
      submitting: false,
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
      return this.$store.state.characterRecords;
    },
    favoriteRecords() {
      return this.$store.state.favorites.length;
    },
    listOfCharacters() {
      return this.$store.state.characters;
    },
    listOfFavorites() {
      return this.$store.state.favorites;
    },
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
};
</script>
