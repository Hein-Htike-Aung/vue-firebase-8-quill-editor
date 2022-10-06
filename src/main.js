import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getAuth } from "firebase/auth";

let app;
getAuth().onAuthStateChanged(() => {
  if (!app) {
    createApp(App).use(store).use(router).mount("#app");
  }
});
