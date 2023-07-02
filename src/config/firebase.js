// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFIpZzd-Dz0JdMqHCj9f1hY_aSRllP1us",
  authDomain: "fir-tutorial-d6c67.firebaseapp.com",
  projectId: "fir-tutorial-d6c67",
  storageBucket: "fir-tutorial-d6c67.appspot.com",
  messagingSenderId: "608667280956",
  appId: "1:608667280956:web:e9c7b2f87d235faf5d0539",
  measurementId: "G-N3E8V3RGCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);