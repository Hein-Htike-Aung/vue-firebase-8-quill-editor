import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default createStore({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2022",
      },
      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2022",
      },
    ],
    editPost: null,
    // blogPosts: [],
    // postLoaded: null,
    // blogHTML: "Write your blog title here...",
    // blogTitle: "",
    // blogPhotoName: "",
    // blogPhotoFileURL: null,
    // blogPhotoPreview: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {},
  // commit will perform mutations
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
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
  // dispatch will perform actions
  actions: {
    async getCurrentUser({ commit }) {
      const docRef = doc(db, "users", getAuth().currentUser.uid);

      const result = await getDoc(docRef);

      commit("setProfileInfo", result);
      commit("setProfileInitials");
    },
    async updateUserSetting({ commit, state }) {
      const docRef = doc(db, "users", state.profileId);

      await setDoc(
        docRef,
        {
          firstName: state.profileFirstName,
          lastName: state.profileLastName,
          username: state.profileUsername,
        },
        { merge: true }
      );

      commit("setProfileInitials");
    },
  },
  modules: {},
});
