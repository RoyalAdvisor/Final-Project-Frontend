<template>
  <Navbar />
  <router-view />
</template>
<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Poppins&display=swap");
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #1f1f1f;
  font-family: "Oswald", sans-serif;
}
</style>
