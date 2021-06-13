import { createStore } from "vuex";

export default createStore({
  state: {
    characters: null,
    favorites: [],
    characterRecords: 0,
    favoriteRecords: 0,
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setFavoriteCharacter(state, payload) {
      const result : string[] = state.favorites;
      result.push(payload);
    },
    removeFavoriteCharacter(state, payload) {
      const result : string[] = state.favorites;
      result.splice(payload, 1);
    },
    setCharacterRecords(state, payload) {
      state.characterRecords = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCharacters(state) {
      return state.characters;
    },
    getFavoritesCharacters(state) {
      return state.favorites;
    },
    getFavoritesRecords(state) {
      return state.favorites.length;
    }
  },
});
