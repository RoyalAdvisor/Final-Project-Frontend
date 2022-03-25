<template>
  <div class="success-wrapper">
    <div class="success-container">
      <header class="success-header">
        <h4>Welcome to The Mental Mind!</h4>
      </header>
      <article class="success-content">
        <p>
          Thank you for signing up to this blogsite. We hope you discover what
          it is you're looking for. But most importantly, we hope you have fun
          and enjoy being a part of our little family.
        </p>
        <p>
          Don't forget to check your email for registration confirmation,
          however you can sign in immediately. Have fun and happy blogging!
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
      <h6 class="copyright">Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>
<script>
export default {
  name: "SignupSuccess",
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
  background: blueviolet;
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
