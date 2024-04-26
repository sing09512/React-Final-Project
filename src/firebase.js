import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGf4Sqj5xJ2J1k6GgTP_iOd7BKgf_58Uc",
  authDomain: "hotel-app-fewd10g2.firebaseapp.com",
  databaseURL: "https://hotel-app-fewd10g2-default-rtdb.firebaseio.com",
  projectId: "hotel-app-fewd10g2",
  storageBucket: "hotel-app-fewzd10g2.appspot.com",
  messagingSenderId: "650979967676",
  appId: "1:650979967676:web:b6bc01b5c0f277d89646b9",
  measurementId: "G-V6CJM93NLJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
