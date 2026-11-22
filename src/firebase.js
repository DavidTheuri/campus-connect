import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBDqGdNfPzAsZljiHBS_kiTUZLPioY-hY",
  authDomain: "campus-connect-54bf1.firebaseapp.com",
  projectId: "campus-connect-54bf1",
  storageBucket: "campus-connect-54bf1.firebasestorage.app",
  messagingSenderId: "468845331379",
  appId: "1:468845331379:web:f134abc09e2a5fba1581c6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();