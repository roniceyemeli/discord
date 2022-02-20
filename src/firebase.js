import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4GcmKnSuEeGFuoORUgDSAoL4v1P8vN14",
  authDomain: "discord-edc95.firebaseapp.com",
  projectId: "discord-edc95",
  storageBucket: "discord-edc95.appspot.com",
  messagingSenderId: "578545259441",
  appId: "1:578545259441:web:35d9c998894f097d2de390",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db, firebase };
