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
        <button class="btn btn-muted">Go to Sign In</button>
      </router-link>
    </div>
  </div>
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
  margin: 3rem 0;
  justify-content: center;
  align-items: center;
}
.success-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
}
.sign-up {
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
}
</style>
