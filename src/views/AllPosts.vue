<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="user-actions">
        <div v-if="currentUser" class="create-post">
          <button
            class="create-btn shadow-sm"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          >
            Create a new post
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
        class="post-item shadow-sm"
        v-for="post in filteredPosts.slice(0, count)"
        :key="post._id"
      >
        <div class="formatted-date">
          <cite class="text-muted">
            <span v-show="!loading && !errorMessage" class="text-muted"
              >Uploaded at:</span
            >
            {{ moment(post.createdAt).format("MMM DD, YYYY [at] HH:mm a") }}
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
      <div class="post-action">
        <button
          class="load-btn shadow"
          @click.prevent="loadMore()"
          :disabled="loading"
        >
          <span v-show="!loading">Load More</span>
          <span v-show="loading"><Loader /></span>
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
  <!-- OFFCANVAS -->
  <div
    class="offcanvas offcanvas-bottom"
    tabindex="-1"
    id="offcanvasBottom"
    aria-labelledby="offcanvasBottomLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">
        Create a blog post
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body small">
      <form class="row g-2 create-form">
        <div class="col-md-12">
          <label for="main-image" class="form-label">Image *</label>
          <input
            type="text"
            v-model="post.main_image"
            class="form-control"
            id="main-image"
          />
          <h6 class="mt-1">Recommended image resolution is 1280 x 800</h6>
        </div>
        <div class="col-md-12">
          <label for="title" class="form-label">Title *</label>
          <input
            type="text"
            v-model="post.title"
            class="form-control"
            id="title"
            required
          />
        </div>
        <div class="col-md-12">
          <label for="subtitle" class="form-label">Subtitle *</label>
          <input
            type="text"
            v-model="post.subtitle"
            class="form-control"
            id="subtitle"
            required
          />
        </div>
        <div class="col-md-12">
          <label for="catergory" class="form-label">Catergory *</label>
          <select
            id="catergory"
            class="form-select"
            v-model="post.catergory"
            required
          >
            <option selected>Choose...</option>
            <option>Motivation</option>
            <option>Art</option>
            <option>Lifestyle</option>
          </select>
        </div>
        <div class="col-12 submission">
          <button
            type="submit"
            class="submit-btn"
            @click.prevent="addPost()"
            data-bs-dismiss="offcanvas"
          >
            Submit
          </button>
          <div class="col-12">
            <h6>Note: All fields marked with * are required.</h6>
          </div>
        </div>
      </form>
      <form class="row create-form">
        <div class="col-md-12">
          <label for="desc" class="form-label">Desciption *</label>
          <textarea
            type="text"
            v-model="post.desc"
            class="form-control"
            id="desc"
            required
          />
        </div>
      </form>
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
        catergory: "",
        desc: "",
        created_by: "",
      },
      errorMessage: null,
      moment,
      search: "",
      catergory: "",
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
            alert("Your post has been created!");
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
  width: 1000px;
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
label {
  font-size: 20px;
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
/* OFFCANVAS */
.offcanvas-bottom {
  min-height: 55vh;
  overflow-y: scroll;
}
.create-form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex-basis: 50%;
  padding: 0;
}
.offcanvas-body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-basis: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}
.form-control {
  display: flex;
  flex-basis: 100%;
}
textarea {
  min-height: 322px;
}
.loading-container {
  margin-top: 20rem;
}
.error-container {
  margin-top: 20rem;
}
.error-container h5 {
  font-family: "Cabin", sans-serif;
  font-weight: 600;
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
  min-width: 200px;
  padding: 10px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.submit-btn:hover {
  background: rgba(0, 0, 0, 0.5);
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
@media only screen and (max-width: 1100px) {
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
    width: 90%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
  }
}
@media only screen and (max-width: 576px) {
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
    width: 95%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
  }
}
</style>
