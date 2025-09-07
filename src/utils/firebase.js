// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB20YLzrY3e1JHeYgJMGydBPdv6zYI7vE",
  authDomain: "let-stud-ies.firebaseapp.com",
  projectId: "let-stud-ies",
  storageBucket: "let-stud-ies.firebasestorage.app",
  messagingSenderId: "376302564638",
  appId: "1:376302564638:web:ded76af48e1daf6419450f",
  measurementId: "G-K3H2295QNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);