import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCkZyOkSXCocuz2ZcJSs8xvLkGSM0uNbwU",
  authDomain: "nyt-clone-9a0b4.firebaseapp.com",
  projectId: "nyt-clone-9a0b4",
  storageBucket: "nyt-clone-9a0b4.firebasestorage.app",
  messagingSenderId: "43612628776",
  appId: "1:43612628776:web:8e1f3bc745a078a737d21d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);