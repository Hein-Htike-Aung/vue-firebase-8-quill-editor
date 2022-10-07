<template lang="">
  <div class="form-wrap">
    <!-- Form -->
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'LoginView' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <i class="fa-solid fa-envelope icon"></i>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <i class="fa-solid fa-lock icon"></i>
        </div>
        <div class="error" v-show="error">{{ errorMessage }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <!-- Image -->
    <div class="background"></div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "RegisterView",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMessage = "";

        const firebaseAuth = firebase.auth();

        // create account
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        // create user
        const dataBase = db.collection("users").doc(createUser.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });

        // navigate
        this.$router.push({ name: "HomeView" });

        return;
      }
      this.error = true;
      this.errorMessage = "Please fill out all the fields";
      return;
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
