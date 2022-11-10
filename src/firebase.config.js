import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD1CepakWLLsxS9QaTlJBNO5Q0rn7mGF8",
  authDomain: "truongxuan-fb.firebaseapp.com",
  projectId: "truongxuan-fb",
  storageBucket: "truongxuan-fb.appspot.com",
  messagingSenderId: "404423456595",
  appId: "1:404423456595:web:02aabe6b49b696e10053a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
