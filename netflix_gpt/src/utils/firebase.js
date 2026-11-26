// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl1lcwEIQrKscPVuHmrVV1IVeMKHgqiBA",
  authDomain: "netflixai-7aa9c.firebaseapp.com",
  projectId: "netflixai-7aa9c",
  storageBucket: "netflixai-7aa9c.firebasestorage.app",
  messagingSenderId: "53188109020",
  appId: "1:53188109020:web:c4d6ee4ca9b349876a8a19",
  measurementId: "G-MENJ9GRXXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);