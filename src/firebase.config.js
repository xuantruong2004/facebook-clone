import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdGG4BnF2Sxo5x0W7QP714591y8C2L4qg",
  authDomain: "truongxuan-facebook.firebaseapp.com",
  projectId: "truongxuan-facebook",
  storageBucket: "truongxuan-facebook.appspot.com",
  messagingSenderId: "852557901911",
  appId: "1:852557901911:web:961a9e4ad4829fb3883312",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
