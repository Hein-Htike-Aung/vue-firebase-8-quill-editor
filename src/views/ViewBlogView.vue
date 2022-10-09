<template>
  <div class="post-view" v-if="this.currentBlog.length > 0">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0].blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(currentBlog[0].blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img :src="currentBlog[0].blogCoverPhoto" alt="" />
      <div
        class="post-content ql-editor"
        v-html="currentBlog[0].blogHTML"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlogView",
  data() {
    return {
      currentBlog: [],
    };
  },
  /*
    mounted hook can be used to run code
    after the component has finished the initial rendering and created the DOM nodes
  */
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((p) => {
      return p.blogID === this.$route.params.blogId;
    });
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
