import { createStore } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default createStore({
  state: {
    editPost: null,
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,

    /* User */
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  /* commit will perform mutations */
  mutations: {
    // Blog Mutation
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((p) => p.blogID !== payload);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    // User Mutations
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      // if the name Aung Aung, profileInitials will be AA
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  /* dispatch will perform actions */
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();

      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");

      // const token = await user.getIdTokenResult();
      // const admin = await token.claims.admin;
      const admin = true;

      commit("setProfileAdmin", admin);
    },
    async updateUserSetting({ commit, state }) {
      const dataBase = db.collection("users").doc(state.profileId);

      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });

      commit("setProfileInitials");
    },
    async getPosts({ state }) {
      const dataBase = db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();

      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });

      state.postLoaded = true;
    },
    async deletePost({ commit }, payload) {
      // delete post
      const post = await db.collection("blogPosts").doc(payload);
      await post.delete();

      // delete from store
      commit("filterBlogPost", payload);
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);

      await dispatch("getPosts");
    },
  },
  modules: {},
});
