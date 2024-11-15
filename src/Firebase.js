// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJTUiv8v2moL2WYeIenGaWQxuOnvhYfbE",
  authDomain: "portofirebase.firebaseapp.com",
  projectId: "portofirebase",
  storageBucket: "portofirebase.firebasestorage.app",
  messagingSenderId: "107124792327",
  appId: "1:107124792327:web:f654de66d11c453b965ea2",
  measurementId: "G-88RW2YPR4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };