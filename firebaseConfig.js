import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCV2KdspmuoClGa1xFDgsgo-eGC-5Jdbc",
  authDomain: "notes-app-c0c16.firebaseapp.com",
  projectId: "notes-app-c0c16",
  storageBucket: "notes-app-c0c16.firebasestorage.app",
  messagingSenderId: "777316595802",
  appId: "1:777316595802:web:a833c9ba7c10f6fbd74063",
  measurementId: "G-4PEH4KBK3S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
