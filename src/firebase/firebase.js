import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_-hBM5ONp6TIKBMxuGJhYctQhFlR5efA",
  authDomain: "smart-study-planner-9141c.firebaseapp.com",
  projectId: "smart-study-planner-9141c",
  storageBucket: "smart-study-planner-9141c.firebasestorage.app",
  messagingSenderId: "56373385686",
  appId: "1:56373385686:web:e961189ea18ded6d052c77"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);