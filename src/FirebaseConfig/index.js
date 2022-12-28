// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFMxObwLEcxD8Iu81z9knTnFhIgASz5JY",
  authDomain: "ecommerce-52b4f.firebaseapp.com",
  projectId: "ecommerce-52b4f",
  storageBucket: "ecommerce-52b4f.appspot.com",
  messagingSenderId: "767636058201",
  appId: "1:767636058201:web:abeb5f11df690bed600148"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);