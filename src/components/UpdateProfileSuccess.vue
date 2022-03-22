<template>
  <div class="success-wrapper">
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
        <button class="btn btn-muted">Go to Sign In</button>
      </router-link>
    </div>
  </div>
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
