import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEhxSzkejm96_ZnIj1GU0uhTYcQiRWfo8",
  authDomain: "facebook-truongxuan.firebaseapp.com",
  projectId: "facebook-truongxuan",
  storageBucket: "facebook-truongxuan.appspot.com",
  messagingSenderId: "827987944827",
  appId: "1:827987944827:web:b34633eb6cbf214e9449de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
