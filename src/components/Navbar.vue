<template>
  <div class="navbar">
    <img src="@/assets/images/logo.png" />
    <Searchbar />
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar.vue";
export default {
  name: "Navbar",
  components: {
    Searchbar,
  },
};
</script>
