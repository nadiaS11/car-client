// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWAAAHX6L2vJCTzBf9-vh45b7Uvj20E9M",
  authDomain: "car-doctor-594ce.firebaseapp.com",
  projectId: "car-doctor-594ce",
  storageBucket: "car-doctor-594ce.appspot.com",
  messagingSenderId: "700177836497",
  appId: "1:700177836497:web:fdf92707e1c4f97cc258f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
