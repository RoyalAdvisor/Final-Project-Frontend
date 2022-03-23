<template>
  <Landing />
  <Posts />
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6>Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>
<script>
import Posts from "./AllPosts.vue";
import Landing from "../components/Landing.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Landing,
  },
};
</script>

<style scoped>
.blog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  margin: 0;
  width: 100%;
}
h6 {
  color: #fff;
  padding: 10px;
}
</style>
