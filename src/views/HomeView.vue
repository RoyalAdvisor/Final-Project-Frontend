<template>
  <Landing />
  <Posts />
</template>
<script>
import Posts from "../components/Posts.vue";
import Landing from "../components/Landing.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Landing,
  },
};
</script>

<style></style>
