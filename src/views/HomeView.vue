<template lang="">
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, idx) in smapleBlogPost" :key="idx" />
    <div class="blog-card-wrap">
      <h3>View More Recent Blogs</h3>
      <div class="blog-cards">
        <BlogCard
          :post="post"
          v-for="(post, idx) in sampleBlogCards"
          :key="idx"
        />
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today</h2>
        <router-link class="router-button" to="#">
          Register for Fireblogs
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";

export default {
  name: "HomeView",
  components: {
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      smapleBlogPost: [
        {
          title: "This is filter title",
          blogHTML: "This is blog html",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is filter title",
          blogHTML: "This is blog html",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
  // Retrieve data from state
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 250px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 250px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
