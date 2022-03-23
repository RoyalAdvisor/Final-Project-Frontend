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
              placeholder="Find blogs..."
              class="search-bar shadow"
            />
          </div>
        </div>
      </div>
      <div
        class="post-item shadow"
        v-for="post in filteredPosts.slice(0, count)"
        :key="post._id"
      >
        <div class="formatted-date">
          <cite class="text-muted">
            <span v-show="!loading && !errorMessage" class="text-muted"
              >Uploaded at:</span
            >
            {{ moment(post.createdAt).format("MMM DD, YYYY") }}
          </cite>
        </div>
        <div class="post-image">
          <img :src="post.main_image" />
        </div>
        <div class="post-content">
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
    <div>
      <div class="error-container" v-if="!loading && errorMessage">
        <h5>{{ errorMessage }}</h5>
      </div>
    </div>
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
          <form class="row create-form">
            <div class="col-md-12">
              <label for="main-image" class="form-label mt-1">Image *</label>
              <input
                type="text"
                required
                v-model="post.main_image"
                class="form-control"
                id="main-image"
              />
            </div>
            <div class="col-md-12">
              <label for="title" class="form-label">Title *</label>
              <input
                type="text"
                required
                v-model="post.title"
                class="form-control"
                id="title"
              />
            </div>
            <div class="col-md-12">
              <label for="subtitle" class="form-label">Subtitle *</label>
              <input
                type="text"
                required
                v-model="post.subtitle"
                class="form-control"
                id="subtitle"
              />
            </div>
            <div class="col-md-12">
              <label for="desc" class="form-label">Content *</label>
              <textarea
                type="text"
                required
                v-model="post.desc"
                class="form-control"
                id="desc"
              />
              <div class="col-md-12 info-message">
                <h6>Note: All fields marked with * are required.</h6>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="cancel-btn" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              class="submit-btn"
              :disabled="loading"
              @click.prevent="addPost()"
            >
              <span v-show="!loading">Create</span>
              <span v-show="loading"><Loader /></span>
            </button>
          </div>
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
      return this.posts.filter((post) => {
        return post.title.toLowerCase().match(this.search);
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
        this.errorMessage = `Oops. Seems like there was an error. Try refreshing this page.`;
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
cite {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "Cabin", sans-serif;
  font-weight: 600;
  padding: 5px 20px 0px 20px;
}
.info-message {
  margin-top: 0.5rem;
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
  margin-top: 10rem;
}
.error-container {
  margin-top: 10rem;
}
.error-container h5 {
  font-family: "Cabin", sans-serif;
  font-weight: 600;
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
  background: rgba(0, 0, 0, 0.5);
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
  background: rgba(0, 0, 0, 0.5);
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
  min-width: 120px;
  padding: 10px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.submit-btn:focus {
  background: transparent;
  color: #fff;
}
.cancel-btn {
  min-width: 120px;
  padding: 10px;
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
    width: 98%;
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
  cite {
    font-size: 12px;
    font-weight: 400;
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
