<template>
  <Landing />
  <Posts />
  <Footer />
</template>
<script>
import Posts from "./AllPosts.vue";
import Landing from "../components/Landing.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Landing,
    Footer,
  },
};
</script>

<style></style>
