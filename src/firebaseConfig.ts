// import firebase from "firebase/app";
// import { getFirestore, Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuHoNyDHTiF_5WNdrLC9F39XdiypQIu5k",
    authDomain: "squarewords-ca842.firebaseapp.com",
    projectId: "squarewords-ca842",
    storageBucket: "squarewords-ca842.appspot.com",
    messagingSenderId: "96123992580",
    appId: "1:96123992580:web:2a768c091e8191cb349351",
    measurementId: "G-7VYS48D3CJ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);