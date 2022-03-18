<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h2>Sign In</h2>
    </header>
    <div class="form-container shadow">
      <div class="form-image">
        <img src="../assets/signin.jpg" alt="man-typing" />
      </div>
      <Form @submit="handleSignIn" :validation-schema="signInSchema">
        <div class="form-group">
          <label for="email">Email</label>
          <Field
            name="email"
            class="form-control"
            type="text"
            placeholder="Please enter email..."
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field
            name="password"
            class="form-control"
            type="text"
            placeholder="Please enter password..."
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="submit-btn btn btn-muted" :disabled="loading">
            <span v-show="!loading">Sign in</span>
            <span v-show="loading"> <Loader /> </span>
          </button>
        </div>
        <div class="form-group">
          <h5>Don't have an account?</h5>
          <router-link :to="{ path: '/signup' }"
            >Click here to Sign Up</router-link
          >
        </div>
        <div class="form-group">
          <div class="error-message" v-if="message" role="alert">
            <h5>{{ message }}</h5>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Loader from "./Loader.vue";
export default {
  name: "SignIn",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loader,
  },
  data() {
    const signInSchema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      signInSchema,
    };
  },
  computed: {
    loogedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleSignIn(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.loading = false;
          this.$router.push("/profile");
        },
        (err) => {
          this.message = err;
          this.loading = false;
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
  flex-direction: row-reverse;
  align-items: center;
  max-width: 50%;
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
</style>
