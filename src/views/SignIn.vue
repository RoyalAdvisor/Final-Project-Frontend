<template>
  <div class="form-wrapper">
    <header class="form-header">
      <h2>Welcome Back!</h2>
    </header>
    <div class="form-container shadow">
      <Form @submit="handleSignIn" :validation-schema="signInSchema">
        <div class="signin-image">
          <img src="../assets/mentalmindlogo.svg" alt="mental-mind-logo" />
        </div>
        <header class="form-header">
          <h2>Sign In</h2>
        </header>
        <div class="form-group">
          <label for="email">Email</label>
          <Field
            name="email"
            class="form-control shadow-sm"
            type="text"
            placeholder="Please enter email..."
            required
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field
            class="form-control shadow-sm"
            name="password"
            type="password"
            placeholder="Please enter password..."
            required
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="submit-btn shadow-sm" :disabled="loading">
            <span v-show="!loading">Sign in</span>
            <span v-show="loading" class="load">Signing in...</span>
          </button>
        </div>
        <div class="form-group">
          <h5>Don't have an account?</h5>
          <router-link :to="{ path: '/signup' }" class="link"
            >Click here to Sign Up</router-link
          >
        </div>
        <div class="form-group">
          <div class="message" v-if="message" :class="'alert-danger'">
            <h5>{{ message }}</h5>
          </div>
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
      this.$router.push("/");
    }
  },
  methods: {
    handleSignIn(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.loading = false;
          this.$router.push("/");
        },
        (err) => {
          err =
            "Seems like there was an error, try checking your sign-in credentials.";
          this.message = err;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.link {
  color: blueviolet;
}
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
.form-control {
  border: none;
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
