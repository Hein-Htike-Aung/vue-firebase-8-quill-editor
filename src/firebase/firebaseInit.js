import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArt_mU7iiVgsdKRsWF5TulMvM9j02qrKk",

  authDomain: "vue-blog-52d0d.firebaseapp.com",

  projectId: "vue-blog-52d0d",

  storageBucket: "vue-blog-52d0d.appspot.com",

  messagingSenderId: "206679491251",

  appId: "1:206679491251:web:2c1ac5849385b3b588a6c6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
