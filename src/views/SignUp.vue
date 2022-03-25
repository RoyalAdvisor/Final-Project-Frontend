<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h2>Welcome to The Mental Mind!</h2>
    </header>

    <div class="form-container shadow" v-if="!successful">
      <Form @submit="handleSignUp" :validation-schema="signUpSchema">
        <div class="signin-image">
          <img src="../assets/mentalmindlogo.svg" alt="mental-mind-logo" />
        </div>
        <header class="form-header">
          <h2>Sign Up</h2>
        </header>
        <div class="form-group">
          <label for="profile">Profile</label>
          <Field
            name="profile"
            type="text"
            class="form-control shadow-sm"
            placeholder="Please enter your image link..."
          />
          <ErrorMessage name="profile" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <Field
            name="username"
            type="text"
            class="form-control shadow-sm"
            placeholder="Please enter username..."
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <Field
            name="email"
            type="text"
            class="form-control shadow-sm"
            placeholder="Please enter email..."
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field
            name="password"
            type="password"
            class="form-control shadow-sm"
            placeholder="Please enter password..."
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="submit-btn shadow-sm"
            :disabled="loading"
          >
            <span v-show="!loading">Sign up</span>
            <span v-show="loading">Signing up...</span>
          </button>
        </div>
        <div
          v-if="message"
          class="message"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          <h5>{{ message }}</h5>
        </div>
      </Form>
    </div>
  </div>
  <footer class="blog-footer">
    <div class="footer-copyright">
      <h6 class="copyright">Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loader from "../components/Loader.vue";

export default {
  name: "SignUp",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loader,
  },
  data() {
    const signUpSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be at least 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!"),
      profile: yup
        .string()
        .required("Profile is required!")
        .max(200, "Can not exceed 200 characters!"),
    });
    return {
      loading: false,
      successful: false,
      message: "",
      signUpSchema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleSignUp(user) {
      this.loading = true;
      this.successful = false;
      this.$store.dispatch("auth/register", user).then(
        () => {
          this.successful = true;
          this.loading = false;
          this.$router.push("/success");
        },
        (err) => {
          err =
            "Seems like that username is already in use, try using a different one.";
          this.message = err;
          this.loading = false;
          this.successful = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 0;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.form-header h2 {
  font-size: 60px;
  font-weight: 700;
}
.form-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
}
.form-container {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  align-items: center;
  width: 800px;
  padding: 20px;
}
Form {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
}
.form-group {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
  row-gap: 0.5rem;
}
.form-control {
  border: none;
}
.signin-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
  row-gap: 0.5rem;
}
.signin-image img {
  width: 150px;
}
.message {
  padding: 20px;
  border: 1px solid red;
  border-radius: 10px;
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
.submit-btn:focus {
  background: blueviolet;
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
@media only screen and (max-width: 770px) {
  .form-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    margin-bottom: 0;
  }
  .form-header h2 {
    font-size: 35px;
    font-weight: 700;
  }
  .form-header {
    width: 95%;
    text-align: center;
    margin: 0;
  }
  .form-container {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
    width: 95%;
    padding: 0;
    margin: 3rem 0;
  }
  Form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
    padding: 20px;
  }
  .form-group {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 0;
    margin: 0;
    row-gap: 0.5rem;
  }
}
</style>
