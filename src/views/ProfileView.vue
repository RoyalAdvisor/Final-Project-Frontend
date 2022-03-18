<template>
  <div class="profile-wrapper">
    <header class="profile-header">
      <h2>Profile</h2>
    </header>
    <div v-if="loading">
      <div class="loading-container">
        <Loader />
      </div>
    </div>
    <div class="profile-container">
      <div class="user-info shadow">
        <div class="user-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
            />
          </svg>
        </div>
        <div class="info-item">
          <h3>Name:</h3>
          <span>{{ currentUser.username }}</span>
        </div>
        <div class="info-item">
          <h3>Email:</h3>
          <span>{{ currentUser.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
export default {
  name: "Profile",
  components: {
    Loader,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      loading: false,
      errorMessage: null,
    };
  },
};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin: 3rem 0;
  justify-content: center;
  align-items: center;
}
.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
}
.profile-header h2 {
  font-size: 60px;
  font-weight: 700;
}
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 3rem 0;
}
.user-info {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
  padding: 20px;
}
.info-item {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}
.user-svg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.user-svg svg {
  min-width: 30%;
}
.loading-container {
  margin-top: 20rem;
}
</style>
