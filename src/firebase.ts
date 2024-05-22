// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYPz2I4l5C8qTCd6lD5ZHbfWQeitkEh7E",
  authDomain: "react-task-app-9690f.firebaseapp.com",
  projectId: "react-task-app-9690f",
  storageBucket: "react-task-app-9690f.appspot.com",
  messagingSenderId: "1060443052378",
  appId: "1:1060443052378:web:61716231efa0104db7fb63",
  measurementId: "G-ZK0X9PPFVM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);