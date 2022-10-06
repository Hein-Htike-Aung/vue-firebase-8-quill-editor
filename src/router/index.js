import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "../views/BlogsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import ProfileView from "../views/ProfileView.vue";
import AdminView from "../views/AdminView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "BlogsView",
    component: BlogsView,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPasswordView",
    component: ForgotPasswordView,
    meta: {
      title: "ForgotPassword",
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/admin",
    name: "AdminView",
    component: AdminView,
    meta: {
      title: "Admin",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

export default router;
