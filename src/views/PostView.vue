<template>
  <div class="post-wrapper" v-if="post">
    <header class="post-header">
      <h2>{{ post.title }}</h2>
      <cite class="text-muted">
        <span>{{ post.createdAt }}</span>
      </cite>
    </header>
    <!-- LOADER -->
    <div v-if="loading">
      <div class="loading-container">
        <Loader />
      </div>
    </div>
    <div class="post-container">
      <div class="post-image">
        <img :src="post.main_image" :alt="post._id" />
      </div>
      <article class="post-content">
        <h3>{{ post.subtitle }}</h3>
        <p>
          {{ post.desc }}
        </p>
      </article>
      <div class="action-buttons" v-if="currentUser">
        <button
          type="button"
          class="btn btn-muted"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-muted"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="comment-container">
      <h5>Comments</h5>
      <form class="row create-form">
        <div class="col-md-12">
          <textarea
            type="text"
            class="form-control"
            id="comments"
            placeholder="Write a comment..."
            v-model="newComment"
          />
        </div>
        <div class="comment-btn">
          <button
            class="btn btn-muted"
            @click.prevent="addComment(this.postId)"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      <div class="comments-wrapper">
        <div class="comments-header">
          <h5>Recent Comments</h5>
        </div>
        <div
          class="comments"
          v-for="comment in post.comments"
          :key="comment._id"
        >
          <div class="comment-info">
            <h6>{{ comment.posted_by }}</h6>
            <cite>{{ comment.content }}</cite>
          </div>
          <div class="comment-action">
            <button
              class="btn btn-muted"
              @click.prevent="deleteComment(this.postId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- EDIT MODAL -->

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update post</h5>
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
              <label for="main-image" class="form-label">Image</label>
              <input
                type="text"
                v-model="updatedPost.main_image"
                class="form-control"
                id="main-image"
              />
            </div>
            <div class="col-md-12">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                v-model="updatedPost.title"
                class="form-control"
                id="title"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="subtitle" class="form-label">Subtitle</label>
              <input
                type="text"
                v-model="updatedPost.subtitle"
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
                v-model="updatedPost.catergory"
                required
              >
                <option selected>Choose...</option>
                <option>Motivation</option>
                <option>Art</option>
                <option>Lifestyle</option>
              </select>
            </div>
          </form>
          <form class="row g-2 create-form">
            <div class="col-md-12">
              <label for="desc" class="form-label">Desciption</label>
              <textarea
                type="text"
                v-model="updatedPost.desc"
                class="form-control"
                id="desc"
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
            Close
          </button>
          <button
            type="button"
            @click.prevent="updatePost(this.postId)"
            class="btn btn-muted update-btn"
            :disabled="loading"
            data-bs-dismiss="modal"
          >
            <span v-show="!loading">Save</span>
            <span v-show="loading"> <Loader /> </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- DELETE MODAL -->
  <div
    class="modal fade"
    id="staticBackdrop"
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
            Are you sure you want to delete this post?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
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
            @click.prevent="deletePost(this.postId)"
            data-bs-dismiss="modal"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostService from "../services/post.service";
import Loader from "../components/Loader.vue";
const url = "https://final-blog-api.herokuapp.com/posts/";

export default {
  name: "Postview",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      postId: this.$route.params.id,
      post: {},
      updatedPost: {
        main_image: "",
        title: "",
        subtitle: "",
        catergory: "",
        desc: "",
      },
      errorMessage: null,
      newComment: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.loading = true;
    PostService.getOnePost(this.postId).then(
      (res) => {
        this.post = res.data;
        this.loading = false;
      },
      (err) => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  },
  methods: {
    async deletePost(postId) {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).access
          }`,
        },
      };
      const postedBy = this.post.created_by;
      const new_url = `${url}${postId}`;
      const username = JSON.parse(localStorage.getItem("user")).username;
      if (username !== postedBy) {
        return alert("You cannot delete this post!");
      }
      try {
        await axios
          .delete(new_url, headers, this.post)
          .then(() => {
            alert("The post was successfully deleted.");
          })
          .then(() => {
            this.$router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
    },
    async updatePost(postId) {
      if (!localStorage.getItem("user")) {
        alert("User not found");
        return;
      }
      try {
        this.loading = true;
        fetch(`${url}${postId}`, {
          method: "PUT",
          body: JSON.stringify({
            main_image: this.updatedPost.main_image,
            title: this.updatedPost.title,
            subtitle: this.updatedPost.subtitle,
            catergory: this.updatedPost.catergory,
            desc: this.updatedPost.desc,
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
            alert("Post has been updated successfully!");
            this.loading = false;
            this.$router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
    },
    async addComment(postId) {
      if (!localStorage.getItem("user")) {
        alert("User not found");
        return;
      }
      try {
        fetch(`${url}${postId}/comments/create`, {
          method: "POST",
          body: JSON.stringify({
            content: this.newComment,
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
            alert("Your comment has been posted!");
            this.$router.push("/");
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment(postId) {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).access
          }`,
        },
      };
      const new_url = `${url}${postId}/comments/delete`;
      const username = JSON.parse(localStorage.getItem("user")).username;
      let commentList = this.post.comments;
      let commentCreator = null;
      commentList.forEach((comment) => {
        commentCreator = comment.posted_by;
      });
      let commentIndex = commentList.findIndex((comment) => comment._id);
      console.log(commentIndex);
      if (username !== commentCreator) {
        return alert("You cannot delete this comment!");
      }
      try {
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin: 3rem 0;
  justify-content: center;
  align-items: center;
}
.post-header {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  margin-top: 1rem;
}
.post-header h2 {
  font-size: 60px;
  font-weight: 700;
}
.post-content h3 {
  font-size: 32px;
  font-weight: 600;
}
.post-content p {
  font-family: "Cabin", sans-serif;
}
.post-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  row-gap: 1rem;
}
.post-image {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-image img {
  width: 100%;
  object-fit: cover;
}
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  row-gap: 1rem;
}
.action-buttons {
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
}
.form-control {
  display: flex;
  flex-basis: 100%;
}
textarea {
  min-height: 264px;
}
cite {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "Cabin", sans-serif;
  font-weight: 300;
}
.loading-container {
  margin-top: 20rem;
}
.update-btn {
  display: grid;
  place-items: center;
}
.comment-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 1rem;
  margin: 3rem 0;
  padding: 0;
}
#comments {
  min-height: 100px;
  width: 100%;
}
.create-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.comments-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 1rem;
}
.comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  row-gap: 0.5rem;
  width: 100%;
}
</style>
