<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <div class="nav-item" v-if="currentUser">
        <a href="#home-page">
          <router-link :to="{ path: '/' }" class="nav-link">Home</router-link>
        </a>
        <a href="#contact-page" class="nav-link">Contact</a>
        <a href="#">
          <router-link :to="{ path: '/profile' }" class="nav-link"
            >Profile</router-link
          >
        </a>
        <a class="nav-link sign-out" @click.prevent="SignOut">Sign Out</a>
      </div>
      <div class="nav-item" v-if="!currentUser">
        <a href="#home-page">
          <router-link :to="{ path: '/' }" class="nav-link">Home</router-link>
        </a>
        <a href="#contact-page" class="nav-link">Contact</a>
        <a href="#">
          <router-link :to="{ path: '/signin' }" class="nav-link"
            >Sign In</router-link
          >
        </a>
      </div>
    </div>
    <div class="menu-container">
      <button class="menu" type="button">
        <div class="bar"></div>
      </button>
    </div>
    <div class="mobile-nav">
      <nav class="m-nav" v-if="currentUser">
        <a href="#home-page" class="mobile">
          <router-link :to="{ path: '/' }" class="mobile">Home</router-link>
        </a>
        <a href="#contact-page" class="nav-link">Contact</a>
        <a href="#" class="mobile">
          <router-link :to="{ path: '/profile' }" class="mobile"
            >Profile</router-link
          >
        </a>
        <a class="mobile sign-out" @click.prevent="SignOut">Sign Out</a>
      </nav>
      <nav class="m-nav" v-if="!currentUser">
        <a href="#home-page" class="mobile">
          <router-link :to="{ path: '/' }" class="mobile">Home</router-link>
        </a>
        <a href="#contact-page" class="nav-link">Contact</a>
        <a href="#" class="mobile">
          <router-link :to="{ path: '/signin' }" class="mobile"
            >Sign In</router-link
          >
        </a>
      </nav>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
}
.nav-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1;
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
.nav-link.active {
  color: blueviolet;
}
.mobile {
  font-size: 1.3rem;
  color: #fff;
}
.sign-out {
  cursor: pointer;
}
.menu {
  display: block;
  width: 40px;
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none;
  appearance: none;
  background: none;
  border: none;
  z-index: 99;
}

.menu .bar,
.menu:before,
.menu:after {
  content: "";
  display: block;
  width: 100%;
  height: 5px;
  background-color: #fff;
  transition: 0.5s ease-in-out;
}
.bar {
  margin: 5px 0;
}
.menu.is-active:before {
  transform: rotate(45deg) translate(8px, 6px);
}

.menu.is-active:after {
  transform: rotate(-45deg) translate(8px, -6px);
}

.menu.is-active .bar {
  transform: translate(-25px, 0px);
  opacity: 0;
}
.mobile-nav {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: -100%;
  background-color: rgba(0, 0, 0, 0.95);
  width: 50%;
  height: 100%;
  z-index: 99;
  transition: 0.4s ease-in-out;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.7);
}

.m-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
  text-align: center;
  transition: 0.2s ease-in-out;
}

.m-nav a {
  text-decoration: none;
  width: 100%;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  transition: 200ms ease-in-out;
  padding: 10px;
}
.mobile-nav.is-active {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 0;
  height: 100vh;
  transition: 0.4s ease-in-out;
}
@media only screen and (max-width: 1100px) {
  .nav-wrapper {
    display: none;
  }
  .menu-container {
    background-color: rgba(0, 0, 0, 0.97);
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: flex start;
    align-items: center;
    z-index: 6;
    padding: 0;
  }
  .mobile-nav.is-active {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100vh;
    transition: 0.4s ease-in-out;
  }
}
@media only screen and (max-width: 2000px) and (min-width: 1100px) {
  .menu {
    display: none;
  }
  .mobile-nav {
    display: none;
  }
}
</style>
