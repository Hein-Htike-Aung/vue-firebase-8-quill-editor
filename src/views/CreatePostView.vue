<template>
  <div class="create-post">
    <!-- Loading -->
    <Loading v-show="loading" />
    <!-- Modal -->
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <div class="container">
      <!-- Error Message -->
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span> {{ errorMessage }}</p>
      </div>
      <!-- Top -->
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
            @click="openPreview"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <!-- Editor -->
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          useCustomImageHandler
          v-model="blogHTML"
          @image-added="imageHandler"
        />
      </div>
      <!-- Buttons -->
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreviewView' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
import firebase from "firebase/app";
import "firebase/storage";
import Loading from "@/components/Loading.vue";
import db from "../firebase/firebaseInit";

export default {
  name: "CreatePostView",
  data() {
    return {
      file: null,
      error: false,
      errorMessage: "",
      loading: false,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      // Upload photo to firebase using vue-editor
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
        },
        (err) => {
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    uploadBlog() {
      if (this.blogTitle !== 0 && this.blogHTML !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`
          );
          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
            },
            (err) => {
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = Date.now();
              const dataBase = db.collection("blogPosts").doc();

              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                profileId: this.profileId,
                date: timestamp,
              });
              this.$store.dispatch("getPosts");
              this.loading = false;
              this.$router.push({
                name: "ViewBlog",
                params: { blogId: dataBase.id },
              });
            }
          );
          return;
        } else {
          this.error = true;
          this.errorMessage = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.error = true;
        this.errorMessage =
          "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
  components: { BlogCoverPreview, Loading },
};
</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 150px 60px;
  }

  /* Error styling */
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;

      .ql-container {
        display: flex;
        flex-direction: column;
        background-color: red;
        height: 100%;
        overflow: scroll;

        .ql-editor {
          padding: 20px 16px 30px;
        }
      }
    }
  }

  .blog-actions {
    margin-top: 80px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
