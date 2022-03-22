<template>
  <section class="landing-section">
    <header class="landing-header">
      <h2>THE MENTAL MIND</h2>
      <h4>Discover | Activate | Surpass</h4>
    </header>
  </section>
</template>

<script>
export default {
  name: "Landing",
};
</script>

<style scoped>
.landing-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  margin: 0;
  padding: 0;
  background-image: url("../assets/landing-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.landing-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
  background: rgba(0, 0, 0, 80%);
}
.landing-header h2 {
  font-size: 60px;
  font-weight: 700;
  color: #fff;
}
.landing-header h4 {
  color: #fff;
}
@media only screen and (max-width: 576px) {
  .landing-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    min-height: 50vh;
    background: rgba(0, 0, 0, 80%);
  }
  .landing-header h2 {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
  }
  .landing-header h4 {
    color: #fff;
  }
}
</style>
