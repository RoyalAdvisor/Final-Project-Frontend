import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import PostView from "../views/PostView.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import SignupSuccess from "../components/SignupSuccess.vue";
import UpdateProfileSuccess from "../components/UpdateProfileSuccess.vue";
import DeleteProfileSuccess from "../components/DeleteProfileSuccess.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/success",
    name: "success",
    component: SignupSuccess,
  },
  {
    path: "/profile/updated",
    name: "updated",
    component: UpdateProfileSuccess,
  },
  {
    path: "/profile/deleted",
    name: "deleted",
    component: DeleteProfileSuccess,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
