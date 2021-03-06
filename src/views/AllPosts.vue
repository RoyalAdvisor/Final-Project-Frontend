<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="user-actions">
        <div v-if="currentUser" class="create-post">
          <button
            class="create-btn shadow-sm"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
          >
            Create new blog
          </button>
        </div>
        <div class="search-actions">
          <div class="search">
            <label for="search">Search</label>
            <input
              type="text"
              v-model="search"
              name="search"
              placeholder="Search blogs..."
              class="search-bar shadow"
            />
          </div>
        </div>
      </div>
      <header class="about-header">
        <h3>Recent Posts</h3>
      </header>
      <div
        class="post-item shadow"
        v-for="post in filteredPosts.slice(0, count)"
        :key="post._id"
      >
        <div class="post-image">
          <img :src="post.main_image" />
        </div>
        <div class="post-content">
          <div class="formatted-date">
            <h6 class="text-muted updated">
              <span v-show="!loading && !errorMessage" class="text-muted"
                >Uploaded at</span
              >
              {{ moment(post.createdAt).format("MMM DD, YYYY") }}
            </h6>
          </div>
          <h3>{{ post.title }}</h3>
          <h4>{{ post.subtitle }}</h4>
          <div class="buttons">
            <router-link :to="{ path: `/post/${post._id}` }">
              <button class="read-btn" type="button">Read More...</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="post-action" :disabled="loading">
        <button
          class="load-btn shadow"
          @click.prevent="loadMore()"
          v-show="!loading && !errorMessage"
        >
          Load More
        </button>
      </div>
    </div>
    <!-- ERROR MESSAGE -->
    <div
      class="error-container"
      v-if="!loading && errorMessage"
      :innerHTML="errorMessage"
    ></div>
    <!-- LOADER -->
    <div v-if="loading">
      <div class="loading-container">
        <Loader />
      </div>
    </div>
  </div>

  <!-- CREATE MODAL -->

  <!-- Button trigger modal -->

  <div
    class="modal fade"
    id="updateModal"
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
            Create a new blog post.
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addPost()" class="row create-form">
            <div class="col-md-12">
              <label for="main-image" class="form-label mt-1">Image *</label>
              <input
                required
                type="text"
                v-model="post.main_image"
                class="form-control"
                placeholder="Insert image link..."
                id="main-image"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Images should be uploaded using image links. Example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com... Recommended image size is 1200 x 800."
              />
            </div>
            <div class="col-md-12">
              <label for="title" class="form-label">Title *</label>
              <input
                required
                type="text"
                v-model="post.title"
                class="form-control"
                id="title"
              />
            </div>
            <div class="col-md-12">
              <label for="subtitle" class="form-label">Subtitle *</label>
              <input
                required
                type="text"
                v-model="post.subtitle"
                class="form-control"
                id="subtitle"
              />
            </div>
            <div class="col-md-12">
              <label for="desc" class="form-label">Content *</label>
              <textarea
                required
                type="text"
                v-model="post.desc"
                class="form-control"
                id="desc"
              />
              <div class="col-md-12 info-message">
                <h6>Note: All fields marked with * are required.</h6>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="cancel-btn shadow-sm"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button class="submit-btn shadow-sm" :disabled="loading">
                <span v-show="!loading">Create</span>
                <span v-show="loading">Uploading...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../services/post.service";
import Loader from "../components/Loader.vue";
import moment from "moment";
const url = "https://final-blog-api.herokuapp.com/posts/";
export default {
  name: "AllPosts",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      posts: [],
      count: 2,
      post: {
        main_image: "",
        title: "",
        subtitle: "",
        desc: "",
        created_by: "",
      },
      errorMessage: null,
      moment,
      search: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredPosts() {
      return this.posts.reverse().filter((post) => {
        return post.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.loading = true;
    PostService.getAllPosts()
      .then((res) => {
        this.posts = res.data;
        this.loading = false;
      })
      .catch((err) => {
        this.errorMessage = `
        <h1>Oops!</h1>
        <p>Seems like there was an error. Try refreshing this page or checking your internet connection.</p>
        `;
        this.loading = false;
      });
  },
  methods: {
    async addPost() {
      try {
        this.loading = true;
        fetch(`${url}create`, {
          method: "POST",
          body: JSON.stringify({
            main_image: this.post.main_image,
            title: this.post.title,
            subtitle: this.post.subtitle,
            catergory: this.post.catergory,
            desc: this.post.desc,
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
            this.loading = false;
            location.reload();
          });
      } catch (error) {
        console.error(error);
      }
    },
    loadMore() {
      this.loading = true;
      this.count += 2;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin&family=Oswald:wght@600&family=Poppins&display=swap");
.home-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
}
.about-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.about-header h3 {
  font-size: 32px;
  font-weight: 600;
  margin: 0;
}
.about-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  row-gap: 1rem;
}
.about-content h5,
p {
  text-align: center;
}
.home-container {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  row-gap: 3rem;
}
.post-item {
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
}
.post-image {
  width: 100%;
}
img {
  width: 100%;
}
.post-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
h3 {
  font-size: 32px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
h4 {
  font-size: 24px;
  margin: 0;
  padding: 0;
}
.updated {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-family: "Cabin", sans-serif;
  column-gap: 1rem;
  font-weight: 300;
}
.info-message {
  margin-top: 0.5rem;
}
.info-message h6 {
  margin-bottom: 0;
}
textarea {
  min-height: 264px;
  padding: 10px;
}
.username {
  padding: 0;
}
.formatted-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
}
.loading-container {
  margin-top: 8rem;
}
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 8rem;
  width: 60%;
  font-family: "Cabin", sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 0 !important;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.submission {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
}
.search-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  column-gap: 2rem;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  column-gap: 1rem;
}
.create-post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  column-gap: 1rem;
}
.create-btn {
  min-width: 200px;
  padding: 10px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.create-btn:hover {
  background: blueviolet;
  color: #fff;
}
.load-btn {
  min-width: 200px;
  padding: 10px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.load-btn:hover {
  background: blueviolet;
  color: #fff;
}
.read-btn {
  min-width: 120px;
  padding: 10px;
  outline: none;
  border: none;
  background: none;
  color: rgba(0, 0, 0, 0.95);
  border-bottom: 2px solid rgba(0, 0, 0, 0.95);
}
.submit-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.submit-btn:hover {
  background: blueviolet;
  color: #fff;
}
.cancel-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.cancel-btn:hover {
  background: red;
  color: #fff;
}
.user-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  row-gap: 2rem;
  flex-direction: column-reverse;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
}
.search-bar {
  min-width: 200px;
  padding: 10px;
  border: none;
}
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 98%;
  margin: 0;
  padding: 0;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  margin: 0;
  padding: 0;
}
.col {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  margin: 0;
  padding: 0;
}
.col input {
  width: 100%;
}
@media only screen and (max-width: 770px) {
  .about-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 95%;
    row-gap: 1rem;
  }
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 10rem;
    width: 95%;
    font-family: "Cabin", sans-serif;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .home-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 5rem;
  }
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    row-gap: 3rem;
  }
  .post-item {
    display: flex;
    width: 95%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  h3 {
    font-size: 25px;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }
  h4 {
    font-size: 15px;
    margin: 0;
    padding: 0;
  }
  .updated {
    font-size: 12px;
    font-weight: 300;
  }
  .read-btn {
    width: 60px;
    font-size: 12px;
    padding: 10px;
    outline: none;
    border: none;
    background: none;
    color: rgba(0, 0, 0, 0.95);
    border-bottom: 2px solid rgba(0, 0, 0, 0.95);
  }
  .load-btn {
    min-width: 150px;
    padding: 5px;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    transition: ease-in-out 500ms;
  }
  .create-btn {
    min-width: 150px;
    padding: 5px;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    transition: ease-in-out 500ms;
  }
  .submit-btn {
    min-width: 80px;
    padding: 5px;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    transition: ease-in-out 500ms;
  }
  .cancel-btn {
    min-width: 80px;
    padding: 5px;
    outline: none;
    border: none;
    background: rgba(0, 0, 0, 0.95);
    color: #fff;
    transition: ease-in-out 500ms;
  }
  .search-bar {
    min-width: 300px;
    padding: 10px;
    border: none;
  }
}
</style>
