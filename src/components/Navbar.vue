<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="nav-item" v-if="currentUser">
        <a href="#">
          <router-link :to="{ path: '/' }" class="nav-link">Home</router-link>
        </a>
        <a href="#">
          <router-link :to="{ path: '/profile' }" class="nav-link"
            >Profile</router-link
          >
        </a>
        <a class="nav-link sign-out" @click.prevent="SignOut">Sign Out</a>
      </div>
      <div class="nav-item" v-if="!currentUser">
        <a href="#">
          <router-link :to="{ path: '/' }" class="nav-link">Home</router-link>
        </a>
        <a href="#">
          <router-link :to="{ path: '/signin' }" class="nav-link"
            >Sign In</router-link
          >
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    SignOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.navbar {
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  background-color: #1f1f1f;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
}
.nav-wrapper {
  width: 100%;
  background-color: 1f1f1f;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
a {
  text-decoration: none;
}
.nav-link {
  font-size: 1.3rem;
  color: #fff;
}
.sign-out {
  cursor: pointer;
}
</style>
