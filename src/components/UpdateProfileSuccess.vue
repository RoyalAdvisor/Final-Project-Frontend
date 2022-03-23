<template>
  <div class="success-wrapper">
    <div class="success-container">
      <header class="success-header">
        <h4>Your account information has been updated!</h4>
      </header>
      <article class="success-content">
        <p>
          We noticed that you have updated your account credentials and have
          therefore signed you out, as your previous credentials are no longer
          valid. Please sign in again with your updated credentials.
        </p>
      </article>
      <div class="sign-up">
        <router-link :to="{ path: '/signin' }">
          <button class="signin-btn">Go to Sign In</button>
        </router-link>
      </div>
    </div>
  </div>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6>Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>
<script>
export default {
  name: "UpdateProfileSuccess",
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
.sign-up {
  display: flex;
  max-width: 600px;
  justify-content: center;
  align-items: center;
}
.signin-btn {
  min-width: 100px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.signin-btn:hover {
  background: green;
  color: #fff;
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
h6 {
  color: #fff;
  padding: 10px;
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
