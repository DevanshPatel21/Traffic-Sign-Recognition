// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfxhfkBcv47ZmhFZXmETm7NU4z1rNqm4g",
  authDomain: "traffic-app-30da2.firebaseapp.com",
  projectId: "traffic-app-30da2",
  storageBucket: "traffic-app-30da2.appspot.com", // ✅ fixed typo here
  messagingSenderId: "45228363565",
  appId: "1:45228363565:web:c693441adb082f115d4da4",
  measurementId: "G-DCBYXPCBEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ Google provider

export { auth, provider };
