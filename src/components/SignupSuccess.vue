<template>
  <div class="success-wrapper">
    <header class="success-header">
      <h4>You have successfully signed up!</h4>
    </header>
    <article class="success-content">
      <p>
        Thank you for signing up to The Mental Mind.This is a platform for self
        expression so feel free to write about anything. Don't forget to check
        your email for registration confirmation.
      </p>
    </article>
    <div class="sign-up">
      <router-link :to="{ path: '/signin' }">
        <button class="signin-btn">Go to Sign In</button>
      </router-link>
    </div>
  </div>
  <Footer />
</template>
<script>
import Footer from "../components/Footer.vue";
export default {
  name: "SignupSuccess",
  components: {
    Footer,
  },
};
</script>

<style scoped>
.success-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin: 3rem 0;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.success-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
@media only screen and (max-width: 750px) {
  .form-header h2 {
    font-size: 35px;
    font-weight: 700;
  }
  .success-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 95%;
    margin: 3rem 0;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
