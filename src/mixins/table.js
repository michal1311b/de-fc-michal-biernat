import { useQuery, useResult } from "@vue/apollo-composable";
import { allCharacters } from "@/graphql/allCharacters.query.gql";
import { filterCharacters } from "@/graphql/filterCharacters.query.gql";
import { filterCharacterByID } from "@/graphql/filterCharacterByID.query.gql";
export const tableMixin = {
  data() {
    return {
      page: 1,
      itemsNumber: 0,
      favoritesNumber: 0,
      searchText: "",
      searchType: "name",
    };
  },
  methods: {
    changePage(number, filter = "", searchType = "") {
      this.submitting = true;
      let page = (this.page = number);
      let data, query;

      if (filter) {
        console.log(searchType)
        data = {
          page,
          filter,
        };
        query = this.chooseFilterQuery(searchType);
      } else {
        data = {
          page,
        };
        query = allCharacters;
      }

      let { result } = useQuery(query, data);
      const characters = useResult(result, null, (data) => {
        return data.characters.results;
      });
      const itemsNumber = useResult(result, null, (data) => {
        return data.characters.info.count;
      });

      this.$store.commit("setCharacters", characters);
      this.$store.commit("setCharacterRecords", itemsNumber);

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
      const index = this.listOfFavorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        this.$store.commit("setFavoriteCharacter", item);
      } else {
        this.$store.commit("removeFavoriteCharacter", index);
      }
      this.favoritesNumber = this.listOfFavorites.length;
    },
    isFavorite(item) {
      const index = this.listOfFavorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    },
    chooseFavoriteStar(item) {
      const index = this.listOfFavorites.findIndex(
        (favorite) => favorite.id === item.id
      );
      if (index === -1) {
        return require("@/assets/images/star.svg");
      } else {
        return require("@/assets/images/star-light.svg");
      }
    },
    findCharacter() {
      if(!this.searchText) {
        return;
      }

      const entries = new Map([[this.searchType, this.searchText]]);
      const filter = Object.fromEntries(entries);

      this.changePage(1, filter, this.searchType);
    },
    chooseFilterQuery(searchType) {
      if(searchType === 'name') {
        return filterCharacters;
      } else if(searchType === 'id') {
        return filterCharacterByID;
      }
    }
  },
};
