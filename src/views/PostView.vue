<template>
  <div class="post-wrapper" v-if="post">
    <!-- LOADER -->
    <div v-if="loading">
      <div class="loading-container">
        <Loader />
      </div>
    </div>
    <!-- ERROR MESSAGE -->
    <div>
      <div class="error-container" v-if="!loading && errorMessage">
        {{ errorMessage }}
      </div>
    </div>
    <div class="post-container">
      <header class="post-header">
        <h2>{{ post.title }}</h2>
      </header>
      <h6 class="text-muted updated">
        <img
          :src="currentUser.profile"
          alt="user-profile"
          class="user-profile"
        />
        <span v-show="!loading && !errorMessage">{{ post.created_by }}</span>

        <span v-show="!loading && !errorMessage">
          {{ moment(post.updatedAt).format("MMM DD, YYYY") }}</span
        >
      </h6>
      <div class="post-image">
        <img :src="post.main_image" />
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
          class="edit-btn"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          v-if="currentUser.username == post.created_by"
        >
          Edit
        </button>
        <button
          type="button"
          class="delete-btn"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          v-if="currentUser.username == post.created_by"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="comment-container">
      <h5 v-if="currentUser" v-show="!loading && !errorMessage">Comments</h5>
      <div class="text-container" v-if="currentUser">
        <textarea
          type="text"
          class="form-control"
          id="comments"
          placeholder="Write a comment..."
          v-model="newComment"
          v-show="!loading && !errorMessage"
          required
        />
      </div>
      <div class="comment-btn" v-if="currentUser">
        <button
          class="comment-post-btn"
          @click.prevent="addComment(this.postId)"
          type="submit"
          v-show="!loading && !errorMessage"
          :disabled="loading"
        >
          <span v-show="!loading">Post</span>
          <span v-show="loading">Posting...</span>
        </button>
      </div>
      <div class="comments-header">
        <h5 v-show="!loading && !errorMessage">Recent Comments</h5>
      </div>
      <div class="comments-wrapper">
        <div
          class="comments"
          v-for="comment in post.comments"
          :key="comment._id"
        >
          <div class="comment-info">
            <div class="comment-content">
              <h6>{{ comment.posted_by }}</h6>
              <p class="comment-content text-muted">{{ comment.content }}</p>
            </div>
            <div class="comment-action" v-if="currentUser">
              <button
                class="comment-delete-btn"
                @click.prevent="deleteComment(this.postId, comment._id)"
                v-if="currentUser.username == comment.posted_by"
                :disabled="loading"
              >
                <span v-show="!loading">Delete</span>
                <span v-show="loading">Deleting...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="post.comments == 0">
        <h6 class="text-muted">No comments have been posted</h6>
      </div>
    </div>
  </div>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6>Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>

  <!-- EDIT MODAL -->

  <div
    class="modal fade"
    id="editModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Updated post.</h5>
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
                v-model="updatedPost.main_image"
                class="form-control"
                id="main-image"
              />
            </div>
            <div class="col-md-12">
              <label for="title" class="form-label">Title *</label>
              <input
                type="text"
                v-model="updatedPost.title"
                class="form-control"
                id="title"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="subtitle" class="form-label">Subtitle *</label>
              <input
                type="text"
                v-model="updatedPost.subtitle"
                class="form-control"
                id="subtitle"
                required
              />
            </div>
            <div class="col-md-12">
              <label for="desc" class="form-label">Content *</label>
              <textarea
                type="text"
                v-model="updatedPost.desc"
                class="form-control"
                id="desc"
                required
              />
              <div class="col-md-12 info-message">
                <h6>Note: All fields marked with * are required.</h6>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="cancel-btn"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  @click.prevent="updatePost(this.postId)"
                  class="update-btn"
                  :disabled="loading"
                  data-bs-dismiss="modal"
                >
                  <span v-show="!loading">Update</span>
                  <span v-show="loading">Updating...</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- DELETE MODAL -->
  <div
    class="modal fade"
    id="deleteModal"
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
          <button type="button" class="cancel-btn" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="post-delete-btn"
            @click.prevent="deletePost(this.postId)"
            data-bs-dismiss="modal"
            :disabled="loading"
          >
            <span v-show="!loading">Understood</span>
            <span v-show="loading">Deleting...</span>
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
import moment from "moment";
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
        desc: "",
      },
      errorMessage: null,
      newComment: "",
      moment,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.moment = moment;
    this.loading = true;
    PostService.getOnePost(this.postId)
      .then((res) => {
        this.post = res.data;
        this.loading = false;
      })
      .catch((err) => {
        this.errorMessage = `
        <h5>Oops!</h5>
        <h5>Seems like there was an error.</h5>
        <p>Try refreshing this page or checking your internet connection.</p>
        `;
        this.loading = false;
      });
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
        await axios.delete(new_url, headers, this.post).then(() => {
          this.$router.push("/");
        });
      } catch (error) {
        console.error(error);
      }
    },
    async updatePost(postId) {
      const postedBy = this.post.created_by;
      const username = JSON.parse(localStorage.getItem("user")).username;
      if (username !== postedBy) {
        return alert("You cannot update this post!");
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
            this.loading = false;
            location.reload();
          });
      } catch (error) {
        console.error(error);
      }
    },
    async addComment(postId) {
      try {
        this.loading = true;
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
            this.loading = false;
            location.reload();
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment(postId, commentId) {
      try {
        this.loading = true;
        fetch(`${url}${postId}/comments/delete/${commentId}`, {
          method: "DELETE",
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
  },
};
</script>

<style scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin: 5rem 0;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.post-header {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 60%;
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
  width: 60%;
  row-gap: 1rem;
}
.post-image {
  width: 60%;
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
  width: 60%;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
}
.form-control {
  display: flex;
  flex-basis: 100%;
}
.text-container {
  padding: 0;
  width: 50%;
}
textarea {
  min-height: 264px;
  padding: 10px;
}
.updated {
  display: flex;
  width: 60%;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 1rem;
  align-items: center;
  font-family: "Cabin", sans-serif;
  font-weight: 300;
  padding: 0;
  margin: 0;
}
.comment-content p {
  font-family: "Cabin", sans-serif;
  font-style: italic;
  font-size: 14px;
}
.loading-container {
  margin-top: 10rem;
}
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 10rem;
  width: 60%;
  font-family: "Cabin", sans-serif;
  font-weight: 600;
}
.comment-container {
  width: 60%;
  min-width: 20%;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 0;
}
.modal-body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
}
.info-message {
  padding: 0;
  margin-top: 0.5rem;
}
.info-message h6 {
  color: #1f1f1f;
  padding: 0;
}
.comments-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 1rem;
  padding: 0;
}
.comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 50%;
}
.comment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.comment-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
}
.comment-post-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.comment-post-btn:hover {
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
}
.comment-delete-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.comment-delete-btn:hover {
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
}
.edit-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.edit-btn:hover {
  background: green;
  color: #fff;
}
.delete-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.delete-btn:hover {
  background: red;
  color: #fff;
}
.post-delete-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.post-delete-btn:hover {
  background: green;
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
.update-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.95);
  color: #fff;
  transition: ease-in-out 500ms;
}
.update-btn:hover {
  background: green;
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
h6 {
  color: #fff;
  padding: 10px;
}
.comment-content h6 {
  color: #1f1f1f;
  padding: 0;
}
.user-profile {
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
@media only screen and (max-width: 770px) {
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
  }
  .updated {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    padding: 0;
    margin: 0;
  }
  .post-header h2 {
    font-size: 25px;
    font-weight: 600;
    margin: 0;
  }
  .post-content h3 {
    font-size: 20px;
  }
  .post-content p {
    font-size: 14px;
  }
  .post-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    margin: 3.5rem 0;
    justify-content: center;
    align-items: center;
  }
  .post-header {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin: 0;
  }
  .post-content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 0;
    row-gap: 1rem;
  }
  .post-image {
    width: 100%;
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
    width: 95%;
    row-gap: 1rem;
  }
  .action-buttons {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    column-gap: 1rem;
  }
  .comments-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 1rem;
    padding: 0;
  }
  .comments {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
  }
  .comment-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }
  .comment-container {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 1rem;
    margin: 2rem 0;
    padding: 0;
  }
  .text-container {
    width: 95%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #comments {
    width: 100%;
  }
  .comment-btn {
    width: 95%;
  }
  .comment-content p {
    font-family: "Cabin", sans-serif;
    font-style: italic;
    font-size: 12px;
  }
}
</style>
