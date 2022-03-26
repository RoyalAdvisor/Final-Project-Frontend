<template>
  <section id="home-page">
    <Landing />
    <AboutView />
    <Posts />
    <ContactView />
  </section>
</template>
<script>
import Posts from "./AllPosts.vue";
import Landing from "../components/Landing.vue";
import ContactView from "./ContactView.vue";
import AboutView from "./AboutView.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Landing,
    ContactView,
    AboutView,
  },
};
</script>

<style scoped>
#home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
