<template lang="">
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'HomeView' }"
            >FireBlogs</router-link
          >
          <ul>
            <li>
              <a href="" class="socialIcon">
                <i class="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="" class="socialIcon">
                <i class="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="" class="socialIcon">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="" class="socialIcon">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'HomeView' }"
              >Home</router-link
            >
            <router-link class="link" :to="{ name: 'BlogsView' }"
              >Blogs</router-link
            >

            <router-link
              v-if="admin"
              class="link"
              :to="{ name: 'CreatePostView' }"
              >Create Post</router-link
            >
            <router-link v-if="!user" class="link" :to="{ name: 'LoginView' }"
              >Login In / Register</router-link
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2022 all Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 250px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }
    > div {
      display: flex;
      flex: 1;
    }
    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }
      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }
      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }
      .col-1 {
        flex-direction: column;
        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;
          li {
            display: flex;
            align-items: center;
            .socialIcon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }
      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }
    p {
      margin-top: auto;
    }
  }
}
</style>
