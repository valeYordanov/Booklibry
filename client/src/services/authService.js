import { auth, db } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { handleFirebaseError } from "../utils/errorFirebaseHandler";

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
      
    };
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const token = await getIdToken(user);
    return {
      token,
      uid: user.uid,
      email: user.email,
    };
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
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
