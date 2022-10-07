import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import Vue3Editor from "vue3-editor";

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    createApp(App).use(store).use(Vue3Editor).use(router).mount("#app");
  }
});
