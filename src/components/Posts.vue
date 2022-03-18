<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div v-if="currentUser">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          Create a new post
        </button>
      </div>
      <div class="post-item shadow" v-for="post in posts" :key="post._id">
        <div class="post-image">
          <img :src="post.main_image" />
        </div>
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <h4>{{ post.subtitle }}</h4>
          <cite class="text-muted"
            ><span>By - </span>{{ post.created_by }}
          </cite>
          <div class="buttons">
            <router-link :to="{ path: `/post/${post._id}` }">
              <button class="btn btn-muted" type="button">Read More</button>
            </router-link>
          </div>
        </div>
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
          <label for="main-image" class="form-label">Image</label>
          <input
            type="text"
            v-model="post.main_image"
            class="form-control"
            id="main-image"
          />
        </div>
        <div class="col-md-12">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            v-model="post.title"
            class="form-control"
            id="title"
            required
          />
        </div>
        <div class="col-md-12">
          <label for="subtitle" class="form-label">Subtitle</label>
          <input
            type="text"
            v-model="post.subtitle"
            class="form-control"
            id="subtitle"
            required
          />
        </div>
        <div class="col-md-12">
          <label for="catergory" class="form-label">Catergory</label>
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
        <div class="col-12">
          <button
            type="submit"
            class="btn btn-muted"
            @click.prevent="addPost()"
            data-bs-dismiss="offcanvas"
          >
            Submit
          </button>
        </div>
      </form>
      <form class="row create-form">
        <div class="col-md-12">
          <label for="desc" class="form-label">Desciption</label>
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
import Loader from "./Loader.vue";
const url = "https://final-blog-api.herokuapp.com/posts/";
export default {
  name: "Posts",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      posts: [],
      post: {
        main_image: "",
        title: "",
        subtitle: "",
        catergory: "",
        desc: "",
        created_by: "",
      },
      errorMessage: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.loading = true;
    PostService.getAllPosts().then(
      (res) => {
        this.posts = res.data;
        this.loading = false;
      },
      (err) => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  },
  methods: {
    async addPost() {
      if (!localStorage.getItem("user")) {
        alert("User not found");
        return;
      }
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
            this.$router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
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
  margin: 3rem 0;
}
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  row-gap: 2rem;
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
  font-size: 15px;
  font-weight: 200;
  margin: 0;
  padding: 0;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
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
  min-height: 264px;
}
.loading-container {
  margin-top: 20rem;
}
</style>
