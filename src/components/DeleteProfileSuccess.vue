<template>
  <div class="success-wrapper">
    <header class="success-header">
      <h4>Your account has been deleted!</h4>
    </header>
    <article class="success-content">
      <p>
        Your account has been successfully deleted. We hate to see you go but we
        understand that all good journey's eventually come to an end. Should you
        change your mind in the near future, you're more than welcome to sign up
        again. Hope so see you again someday. And thank you for blogging with
        The Mental Mind!
      </p>
    </article>
  </div>
  <Footer />
</template>
<script>
import Footer from "../components/Footer.vue";
export default {
  name: "DeleteProfileSuccess",
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
