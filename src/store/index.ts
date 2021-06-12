import { createStore } from "vuex";

export default createStore({
  state: {
    characters: null,
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getCharacters(state) {
      return state.characters;
    },
  },
});
