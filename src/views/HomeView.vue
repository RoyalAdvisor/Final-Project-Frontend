<template>
  <section id="home-page">
    <Landing />
    <Posts />
    <ContactView />
  </section>
</template>
<script>
import Posts from "./AllPosts.vue";
import Landing from "../components/Landing.vue";
import ContactView from "./ContactView.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Landing,
    ContactView,
  },
};
</script>

<style scoped></style>
