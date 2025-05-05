// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO77dHcT-jCJPlh8WqrI46ub_8xRphyl8",
  authDomain: "traffic-app-f6704.firebaseapp.com",
  projectId: "traffic-app-f6704",
  storageBucket: "traffic-app-f6704.appspot.com",
  messagingSenderId: "90115832266",
  appId: "1:90115832266:web:7fffa978fe72a28c60f733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
