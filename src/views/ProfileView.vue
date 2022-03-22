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
      <div class="user-info shadow-sm">
        <div class="user-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
            />
          </svg>
        </div>
        <div class="info-item">
          <h5>Name:</h5>
          <span>{{ currentUser.username }}</span>
        </div>
        <div class="info-item">
          <h5>Email:</h5>
          <span>{{ currentUser.email }}</span>
        </div>
        <div class="user-actions">
          <button
            type="button"
            class="btn btn-muted"
            data-bs-toggle="modal"
            data-bs-target="#updateUser"
          >
            Update Profile
          </button>
          <button
            type="button"
            class="btn btn-muted"
            data-bs-toggle="modal"
            data-bs-target="#deleteUser"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Update User Modal -->
  <div
    class="modal fade"
    id="updateUser"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Update profile.</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-2 create-form">
            <div class="col-md-12">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                v-model="updatedUser.username"
                class="form-control"
                id="username"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                v-model="updatedUser.email"
                class="form-control"
                id="email"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-muted"
            data-bs-dismiss="modal"
            @click.prevent="updateUser(this.currentUser._id)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete User Modal -->
  <div
    class="modal fade"
    id="deleteUser"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Are you sure you want to delete your profile?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h6>This cannot be undone</h6>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click.prevent="deleteUser(this.currentUser._id)"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = "https://final-blog-api.herokuapp.com/users/";
import Loader from "../components/Loader.vue";
import axios from "axios";
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
      updatedUser: {
        username: "",
        email: "",
      },
      loading: false,
      errorMessage: null,
    };
  },
  methods: {
    async updateUser(userId) {
      try {
        fetch(`${url}${userId}`, {
          method: "PUT",
          body: JSON.stringify({
            username: this.updatedUser.username,
            email: this.updatedUser.email,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).access
            }`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            alert("Your profile has been updated successfully!");
            this.$store.dispatch("auth/logout");
            this.$router.push("/signin");
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(userId) {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).access
          }`,
        },
      };
      const new_url = `${url}${userId}`;
      try {
        await axios.delete(new_url, headers, this.currentUser).then(() => {
          alert("Profile has been deleted!");
          this.$store.dispatch("auth/logout");
          this.$router.push("/signin");
        });
      } catch (error) {
        console.error(error);
      }
    },
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
  margin-top: 1rem;
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
  width: 40%;
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
.user-actions {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 1rem;
}
.user-actions button {
  padding: 0;
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
