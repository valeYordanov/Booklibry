import { auth, db } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { handleFirebaseError } from "../utils/errorFirebaseHandler";
import axios from "axios";

export const register = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/signup",
      userData
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email:email,
      password:password,
    });
    // Store the token if login is successful

   

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
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
