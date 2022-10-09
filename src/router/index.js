import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "../views/BlogsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import ProfileView from "../views/ProfileView.vue";
import AdminView from "../views/AdminView.vue";
import CreatePostView from "../views/CreatePostView.vue";
import BlogPreviewView from "../views/BlogPreviewView.vue";
import ViewBlogView from "../views/ViewBlogView.vue";
import EditPostView from "../views/EditPostView.vue";
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/blogs",
    name: "BlogsView",
    component: BlogsView,
    meta: {
      title: "Blogs",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPasswordView",
    component: ForgotPasswordView,
    meta: {
      title: "ForgotPassword",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "AdminView",
    component: AdminView,
    meta: {
      title: "Admin",
      requiresAuth: false,
      requiresAdmin: true,
    },
  },
  {
    path: "/create-post",
    name: "CreatePostView",
    component: CreatePostView,
    meta: {
      title: "CreatePost",
      requiresAuth: false,
      requiresAdmin: true,
    },
  },
  {
    path: "/edit-post/:blogId",
    name: "EditPostView",
    component: EditPostView,
    meta: {
      title: "EditBlog",
      requiresAuth: false,
      requiresAdmin: true,
    },
  },
  {
    path: "/blog-preview",
    name: "BlogPreviewView",
    component: BlogPreviewView,
    meta: {
      title: "BlogPreview",
      requiresAuth: false,
      requiresAdmin: true,
    },
  },
  {
    path: "/view-blog/:blogId",
    name: "ViewBlogView",
    component: ViewBlogView,
    meta: {
      title: "ViewBlog",
      requiresAuth: false,
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

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let admin = null;

  if (user) {
    let token = await user.getIdTokenResult();
    // admin = token.claims.admin;
    admin = true;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      // if the user authenticated
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          // if the user is admin
          return next();
        }
        return next({ name: "HomeView" });
      }
      return next();
    }
    return next({ name: "HomeView" });
  }
  return next();
});

export default router;
