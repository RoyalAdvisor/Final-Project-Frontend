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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  position: fixed;
  bottom: 0;
  margin-top: 5rem;
  width: 100%;
}
h6 {
  color: #fff;
  padding: 10px;
}
</style>
