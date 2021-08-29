import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyvq73aC8enEy76k36I-bE-qsRBOa6se0",
  authDomain: "lolympiaden.firebaseapp.com",
  databaseURL:
    "https://lolympiaden-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lolympiaden",
  storageBucket: "lolympiaden.appspot.com",
  messagingSenderId: "861309615735",
  appId: "1:861309615735:web:60eaed50c7ea1f461a1072",
};

let app;
// Initialize Firebase
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
