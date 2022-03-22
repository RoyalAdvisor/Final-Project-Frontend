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
  min-height: 40vh;
  margin: 0;
  padding: 0;
}
.landing-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.landing-header h2 {
  font-size: 60px;
  font-weight: 700;
}
</style>
