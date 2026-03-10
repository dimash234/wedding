import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ВСТАВЬ СЮДА СВОЙ КОНФИГ ИЗ FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBm3Y9T-Ds8tcYr7i3I3f3ujgRIKia3kdU",
  authDomain: "wedding-70367.firebaseapp.com",
  projectId: "wedding-70367",
  storageBucket: "wedding-70367.firebasestorage.app",
  messagingSenderId: "928722208707",
  appId: "1:928722208707:web:5f31355a55940f24c71f76",
  measurementId: "G-2Q054MNNV2"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);