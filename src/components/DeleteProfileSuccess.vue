<template>
  <div class="success-wrapper">
    <div class="success-container">
      <header class="success-header">
        <h4>Leaving so soon?</h4>
      </header>
      <article class="success-content">
        <p>
          We hate to see you go but we understand that all good journey's
          eventually come to an end. Should you change your mind in the near
          future, you're more than welcome to sign up again. Hope so see you
          again someday. And thank you for blogging with The Mental Mind!
        </p>
      </article>
    </div>
  </div>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6 class="copyright">Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>
<script>
export default {
  name: "DeleteProfileSuccess",
};
</script>

<style scoped>
.success-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin: 0;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
}
.success-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
}
p {
  text-align: center;
}
.blog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  margin: 0;
  width: 100%;
}
.footer-copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
}
.copyright {
  color: #fff;
  font-size: 12px;
  margin: 0;
}
@media only screen and (max-width: 770px) {
  .form-header h2 {
    font-size: 35px;
    font-weight: 700;
  }
  .success-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
  .success-container {
    width: 95%;
  }
}
</style>
