<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
