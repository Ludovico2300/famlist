// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvzxYMwn29Fo18Pe4wmLAUmf8fhQnqICI",
  authDomain: "famlist-60af1.firebaseapp.com",
  databaseURL: "https://famlist-60af1-default-rtdb.firebaseio.com",
  projectId: "famlist-60af1",
  storageBucket: "famlist-60af1.appspot.com",
  messagingSenderId: "316956706352",
  appId: "1:316956706352:web:b0705b2e81938542e7cff5",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
}

const app = initializeApp(firebaseConfig);
const databaseUser = getAuth(app);
const databaseData = getDatabase();

export { databaseUser, databaseData };
