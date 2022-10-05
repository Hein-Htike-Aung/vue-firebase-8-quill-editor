<template>
  <div class="reset-password">
    <!-- Modal -->
    <Modal v-if="modalActive" @close-modal="closeModal" />
    <!-- Loading -->
    <Loading v-if="loading" />
    <div class="form-wrap">
      <!-- Form -->
      <form class="reset">
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <i class="fa-solid fa-envelope icon"></i>
          </div>
        </div>
        <button>Reset</button>
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
