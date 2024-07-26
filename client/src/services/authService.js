import { auth, db } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { handleFirebaseError } from "../utils/errorFirebaseHandler";
import { showToast } from "../utils/toaster";

export const register = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const token = await getIdToken(user);

    await set(ref(db, "users/" + user.uid), {
      email,
      ...additionalData,
    });

    return {
      token,
      uid: user.uid,
      email: user.email,
      username: additionalData.username,
    };
  } catch (error) {
    throw new Error(handleFirebaseError(error));
    
  }
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
