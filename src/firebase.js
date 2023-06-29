// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPLX1D9woNHmfiSxWNrJYuv53JBpj5Lc0",
  authDomain: "instagram-d71c8.firebaseapp.com",
  projectId: "instagram-d71c8",
  storageBucket: "instagram-d71c8.appspot.com",
  messagingSenderId: "862896743239",
  appId: "1:862896743239:web:344b8a104f293f1e122262",
  measurementId: "G-5QYR5GTE76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
