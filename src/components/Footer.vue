<template>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6>Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.blog-footer {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f;
  margin-top: 5rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
h6 {
  color: #fff;
}
</style>
