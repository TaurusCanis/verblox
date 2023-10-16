// import firebase from "firebase/app";
// import { getFirestore, Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw66B-rpQHDb6fstv58YbVYFZp2E8GO5M",
  authDomain: "squarewords-ca842.firebaseapp.com",
  projectId: "squarewords-ca842",
  storageBucket: "squarewords-ca842.appspot.com",
  messagingSenderId: "96123992580",
  appId: "1:96123992580:web:e81267e986bfcd7c349351",
  measurementId: "G-L21B9NFLPY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);