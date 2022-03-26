<template>
  <div class="profile-wrapper">
    <header class="profile-header">
      <h2>Profile</h2>
    </header>
    <div class="profile-container">
      <div class="card shadow">
        <div class="card-image">
          <img :src="currentUser.profile" alt="user-image" />
        </div>
        <div class="card-body">
          <h2 class="card-title">User Info</h2>
          <h5>Status:</h5>
          <p class="card-text" style="color: green">Online</p>
          <h5>Username:</h5>
          <p class="card-text">
            {{ currentUser.username }}
          </p>
          <h5>Email:</h5>
          <p class="card-text">
            {{ currentUser.email }}
          </p>
          <div class="user-actions">
            <button
              type="button"
              class="update-profile-btn shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#updateUser"
            >
              Update
            </button>
            <button
              type="button"
              class="delete-profile-btn shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#deleteUser"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6 class="copyright">Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>

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
              <label for="profile" class="form-label">Profile Image *</label>
              <input
                type="text"
                v-model="updatedUser.profile"
                class="form-control"
                id="profile"
                placeholder="Insert image link..."
                required
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Images should be uploaded using image links. Example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com... Recommended image size is 800 x 800."
              />
            </div>
            <div class="col-md-12">
              <label for="username" class="form-label">Username *</label>
              <input
                type="text"
                v-model="updatedUser.username"
                class="form-control"
                id="username"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="email" class="form-label">Email *</label>
              <input
                type="text"
                v-model="updatedUser.email"
                class="form-control"
                id="email"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="password" class="form-label">Password *</label>
              <input
                type="text"
                v-model="updatedUser.password"
                class="form-control"
                id="password"
                required
              />
            </div>
            <div class="col-md-12 info-message">
              <h6>Note: All fields marked with * are required.</h6>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="delete-profile-btn shadow-sm"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="update-profile-btn shadow-sm"
            data-bs-dismiss="modal"
            @click.prevent="updateUser(this.currentUser._id)"
            :disabled="loading"
          >
            <span v-show="!loading">Update</span>
            <span v-show="loading">Updating...</span>
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
            class="delete-profile-btn shadow-sm"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="update-profile-btn shadow-sm"
            @click.prevent="deleteUser(this.currentUser._id)"
            :disabled="loading"
          >
            <span v-show="!loading">Delete</span>
            <span v-show="loading">Deleting...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = "https://final-blog-api.herokuapp.com/users/";
import axios from "axios";
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      updatedUser: {
        profile: "",
        username: "",
        email: "",
        password: "",
      },
      loading: false,
      errorMessage: null,
    };
  },
  methods: {
    async updateUser(userId) {
      try {
        this.loading = true;
        fetch(`${url}${userId}`, {
          method: "PUT",
          body: JSON.stringify({
            username: this.updatedUser.username,
            email: this.updatedUser.email,
            profile: this.updatedUser.profile,
            password: this.updatedUser.password,
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
            this.$store.dispatch("auth/logout");
            this.loading = false;
            this.$router.push("/profile/updated");
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
        this.loading = true;
        await axios.delete(new_url, headers, this.currentUser).then(() => {
          this.$store.dispatch("auth/logout");
          this.loading = false;
          this.$router.push("/profile/deleted");
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
  min-height: 100vh;
}
.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.profile-header h2 {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 2rem;
}
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
}
.bi-person-circle {
  width: 200px;
}
.card {
  border: none;
  width: 25rem;
  background: transparent;
}
.card-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.user-actions {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 1rem;
}
.card-image img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
}
.update-profile-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.update-profile-btn:hover {
  background: blueviolet;
  color: #fff;
}
.delete-profile-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.delete-profile-btn:hover {
  background: red;
  color: #fff;
}
.blog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  margin: 0;
  width: 100%;
}
.footer-copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
}
.copyright {
  color: #fff;
  font-size: 12px;
  margin: 0;
}
.modal-body h6 {
  color: #1f1f1f;
}
.info-message h6 {
  margin-bottom: 0;
}
@media only screen and (max-width: 770px) {
  .profile-header h2 {
    font-size: 35px;
    font-weight: 700;
  }
  .card {
    border: none;
    width: 95%;
  }
}
</style>
