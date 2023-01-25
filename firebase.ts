import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZbpeZ45fk209SWALHdg56xyTzPtDmBjQ",
  authDomain: "chat-app-e06d5.firebaseapp.com",
  projectId: "chat-app-e06d5",
  storageBucket: "chat-app-e06d5.appspot.com",
  messagingSenderId: "659951694747",
  appId: "1:659951694747:web:0330b6dcba5028ed89673e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
