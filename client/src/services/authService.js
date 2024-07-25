import { auth, db } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const register = async (email, password, additionalData) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return set(ref(db, "users/" + userCredential.user.uid), {
        email,
        ...additionalData,
      });
    }
  );
};

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  try {
    console.log("Signing out...");
    await signOut(auth);
    console.log("Signed out successfully");
  } catch (error) {
    console.log(error);
  }
};

export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

export const getUserData = (uid) => {
  return ref(db, "users/" + uid)
    .once("value")
    .then((snapshot) => snapshot.val());
};
