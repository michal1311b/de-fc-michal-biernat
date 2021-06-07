import { createApp, provide, h } from "vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { provideApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const defaultClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provideApolloClient(defaultClient);
  },
  render() {
    return h(App);
  },
})
  .use(store)
  .use(router)
  .mount("#app");
