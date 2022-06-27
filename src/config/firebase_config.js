// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { doc } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBILpNcrl74IW6lUtwX06YCutu-p0z-pkE",

  authDomain: "banking-app-975ef.firebaseapp.com",

  projectId: "banking-app-975ef",

  storageBucket: "banking-app-975ef.appspot.com",

  messagingSenderId: "558721829339",

  appId: "1:558721829339:web:0d1d4141fe84930d81bffe",

  measurementId: "G-3T7PDHNDHC",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
