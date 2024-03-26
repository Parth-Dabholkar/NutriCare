// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nutricare-114f4.firebaseapp.com",
  projectId: "nutricare-114f4",
  storageBucket: "nutricare-114f4.appspot.com",
  messagingSenderId: "618289433854",
  appId: "1:618289433854:web:0f0c556b4658b416ca69af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);