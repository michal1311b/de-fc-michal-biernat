import { useQuery, useResult } from "@vue/apollo-composable";
import { allCharacters } from "@/graphql/allCharacters.query.gql";
import { filterCharacters } from "@/graphql/filterCharacters.query.gql";

export const tableMixin = {
  data() {
    return {
      page: 1,
      characters: null,
      itemsNumber: 0,
      favoritesNumber: 0,
      favorites: [],
      searchText: "",
      searchType: "name",
    };
  },
  methods: {
    changePage(number, filter = "") {
      this.submitting = true;
      let page = (this.page = number);
      let data, query;

      if (filter) {
        data = {
          page,
          filter,
        };
        query = filterCharacters;
      } else {
        data = {
          page,
        };
        query = allCharacters;
      }

      let { result } = useQuery(query, data);
      let characters = useResult(result, null, (data) => {
        return data.characters.results;
      });
      this.itemsNumber = useResult(result, null, (data) => {
        return data.characters.info.count;
      });

      this.$store.commit("setCharacters", characters);

      this.submitting = false;
    },
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
    findCharacter() {
      const entries = new Map([[this.searchType, this.searchText]]);
      const filter = Object.fromEntries(entries);

      this.changePage(1, filter);
    },
  },
};
