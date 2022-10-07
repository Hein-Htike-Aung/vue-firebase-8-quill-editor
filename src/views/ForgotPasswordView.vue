<template>
  <div class="reset-password">
    <!-- Modal -->
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />
    <!-- Loading -->
    <Loading v-if="loading" />
    <div class="form-wrap">
      <!-- Form -->
      <form class="reset">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'LoginView' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <i class="fa-solid fa-envelope icon"></i>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <!-- Image -->
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: "",
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  components: { Modal, Loading },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    resetPassword() {
      this.loading = true;

      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive a email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
