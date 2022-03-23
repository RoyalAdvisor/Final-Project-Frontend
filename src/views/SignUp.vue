<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h2>Sign Up</h2>
    </header>

    <div class="form-container shadow-sm">
      <div class="form-image">
        <img src="../assets/signin.jpg" alt="man-typing" />
      </div>
      <Form @submit="handleSignUp" :validation-schema="signUpSchema">
        <div v-if="!successful" class="form-block">
          <div class="form-group">
            <label for="username">Username</label>
            <Field
              name="username"
              type="text"
              class="form-control"
              placeholder="Please enter username..."
            />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field
              name="email"
              type="text"
              class="form-control"
              placeholder="Please enter email..."
            />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field
              name="password"
              type="text"
              class="form-control"
              placeholder="Please enter password..."
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-muted" :disabled="loading">
              <span v-show="!loading">Sign up</span>
              <span v-show="loading"> <Loader /> </span>
            </button>
          </div>
          <div
            v-if="message"
            class="message"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            <h5>{{ message }}</h5>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <Footer />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loader from "../components/Loader.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "SignUp",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loader,
    Footer,
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
  margin: 3rem 0;
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
  width: 50%;
}
.form-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  max-width: 600px;
  padding: 0;
  margin: 3rem 0;
}
.form-image {
  width: 50%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  object-fit: cover;
  margin: 0;
}
Form {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
}
.form-block {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 1rem;
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
.message {
  padding: 20px;
  border: 1px solid red;
  border-radius: 10px;
}
@media only screen and (max-width: 770px) {
  .form-header h2 {
    font-size: 35px;
    font-weight: 700;
  }
  .form-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    max-width: 95%;
    padding: 0;
    margin: 3rem 0;
  }
}
</style>
